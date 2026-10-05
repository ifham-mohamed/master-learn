"""Reproducible HTML-to-Markdown curriculum export (Python standard library only)."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import quote, unquote
import hashlib
import json
import re

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'sources/html'
OUT = ROOT / 'sources/markdown'

class SheetParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.rows, self.row, self.cell, self.links = [], [], None, []
        self.href = None
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'tr': self.row = []
        if tag == 'td':
            self.cell = None if 'freezebar-cell' in attrs.get('class', '') else ''
            self.links = []
        if tag == 'br' and self.cell is not None: self.cell += '\n'
        if tag == 'a' and self.cell is not None:
            href = attrs.get('href', '')
            if href: self.links.append(href)
    def handle_data(self, data):
        if self.cell is not None: self.cell += data
    def handle_endtag(self, tag):
        if tag == 'td' and self.cell is not None:
            self.row.append({'text': self.cell, 'links': self.links[:]})
            self.cell = None
        if tag == 'tr' and any(c['text'] or c['links'] for c in self.row):
            self.rows.append(self.row)

def slug(value):
    return re.sub(r'[^a-z0-9]+', '-', value.lower().replace('&', 'and')).strip('-')

def write(path, text):
    target = OUT / path
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(text.rstrip() + '\n', encoding='utf-8')

def cell_text(cell):
    value = cell['text']
    extra = [f'<{quote(href, safe=":/?=&%#@+;,~!$()*[]") }>' for href in cell['links'] if href not in value]
    return value + ('\n\nLinks: ' + ' '.join(extra) if extra else '')

def fields(record):
    return '\n\n'.join(f'### {key}\n\n{cell_text(value) or "_Not recorded in the export._"}' for key, value in record.items())

def records(rows, first):
    index = next(i for i,r in enumerate(rows) if r[0]['text'] == first)
    headers = [c['text'] or f'Column {i+1}' for i,c in enumerate(rows[index])]
    return [dict(zip(headers, r)) for r in rows[index+1:] if r and r[0]['text']], headers

def text(record, key): return record[key]['text']

def main():
    sheets, inventory = {}, []
    for source in sorted(SOURCE.glob('*.html')):
        parser = SheetParser()
        parser.feed(source.read_text(encoding='utf-8'))
        sheets[source.stem] = parser.rows
        inventory.append({'source': source.name, 'sha256': hashlib.sha256(source.read_bytes()).hexdigest(), 'nonemptyRows': len(parser.rows), 'cells': sum(len(r) for r in parser.rows)})
        # Full row archive: never discard a nonempty cell, even outside structured tables.
        body = [f'# {source.stem} — complete HTML snapshot', f'Source: [original HTML](../../html/{quote(source.name)})', 'Static source values, not current app progress. Export support scripts and formatting are not learning content. Cell labels use the export column order after removing its decorative freeze bar.']
        for n, row in enumerate(parser.rows, 1):
            body.append(f'## Export record {n}')
            for i,c in enumerate(row,1):
                if c['text'] or c['links']: body.append(f'### Column {i}\n\n{cell_text(c)}')
        write(f'sheets/{slug(source.stem)}.md', '\n\n'.join(body))
    tasks, _ = records(sheets['Master Plan'], 'Task ID')
    guide, _ = records(sheets['Guide & Sources'], 'Type')
    weeks, _ = records(sheets['Weekly Review'], 'Week')
    practice, _ = records(sheets['Practice Bank'], 'Item ID')
    sources = {text(r,'Related IDs'):r for r in guide if text(r,'Type') == 'Source'}
    paths = {text(t,'Task ID'):f'tasks/{slug(text(t,"Category"))}/{text(t,"Task ID")}.md' for t in tasks}
    unresolved=[]
    for sid,r in sources.items():
        write(f'resources/{sid}.md', f'# {sid} — {text(r,"Topic")}\n\nSource: [Guide & Sources snapshot](../sheets/guide-and-sources.md). Verification statements below are historical source claims; this conversion does not recheck websites.\n\n'+fields(r))
    for t in tasks:
        tid = text(t,'Task ID')
        refs = re.findall(r'S\d+', text(t,'Source IDs'))
        related=[]
        for sid in dict.fromkeys(refs):
            if sid in sources:
                r=sources[sid]
                related.append(f'- [{sid} — {text(r,"Topic")}](../../resources/{sid}.md)\n  - Resource: {text(r,"Source / original location")}\n  - Source guidance: {text(r,"Guidance / change")}')
            else: unresolved.append(f'{tid}: {sid}')
        prerequisites=[]
        for ref in re.findall(r'\b[A-Z]+\d+\b', text(t,'Prerequisite IDs')):
            if ref in paths: prerequisites.append(f'- [{ref}](../../{paths[ref]})')
        body=f'# {tid} — {text(t,"Task / deliverable")}\n\n[Master plan](../../plans/master-plan.md) · [Category](../../categories/{slug(text(t,"Category"))}.md) · [Original HTML snapshot](../../sheets/master-plan.md)\n\n## How to work on this task\n\nUse the source outcome and exercise below to plan theory, practice, and verification. Save your own theory, notes, code, and actual results in [the existing task workspace](../../../../learning/{slug(text(t,"Category"))}/{tid}/README.md). These source records do not claim new learning or completion.\n\n## Linked prerequisites\n\n'+ ('\n'.join(prerequisites) or 'No resolvable task IDs recorded; see the original prerequisite field below.')+'\n\n## Learning resources\n\n'+ ('\n'.join(related) or 'No source IDs recorded for this task. Consult the category and guidance indexes.')+'\n\n## Complete original task record\n\n'+fields(t)
        write(paths[tid],body)
    categories=sorted({text(t,'Category') for t in tasks})
    def task_list(items, prefix):
        return '\n'.join(f'- [{text(t,"Task ID")} — {text(t,"Task / deliverable")}]({prefix}{paths[text(t,"Task ID")]}) · weeks {text(t,"Start week")}–{text(t,"End week")} · {text(t,"Scope")} · {text(t,"Estimate (h)")} h' for t in items)
    for category in categories:
        selected=[t for t in tasks if text(t,'Category')==category]
        write(f'categories/{slug(category)}.md',f'# {category}\n\n[Full category export](../sheets/{slug(category)}.md) · [Master plan](../plans/master-plan.md)\n\n'+task_list(selected,'../'))
    write('plans/master-plan.md', '# Master learning plan\n\n236 canonical tasks from Master Plan.html. Category sheets are linked views, not extra tasks. Dates, status, and actual hours are historical export values. The app now uses a 5 October 2026 start by default; this archive deliberately preserves its original schedule.\n\n'+task_list(tasks,'../'))
    for w in weeks:
        value=text(w,'Week')
        if not value.isdigit():continue
        selected=[t for t in tasks if int(text(t,'Start week')) <= int(value) <= int(text(t,'End week'))]
        write(f'plans/week-{int(value):02}.md',f'# Week {value} — {text(w,"Phase")}\n\n## Tasks active during this week\n\n'+task_list(selected,'../')+'\n\n## Original weekly record\n\n'+fields(w))
    write('plans/README.md','# Plans\n\n[Master plan](master-plan.md)\n\n'+'\n'.join(f'- [Week {i}](week-{i:02}.md)' for i in range(1,25)))
    write('resources/README.md','# Original learning resources\n\nLinks and verification labels are preserved from the HTML, not newly verified.\n\n'+'\n'.join(f'- [{sid} — {text(r,"Topic")}]({sid}.md)' for sid,r in sources.items()))
    write('guidance/README.md','# Guidance, strategy, gaps, and projects\n\n[Complete source snapshot](../sheets/guide-and-sources.md)\n\n'+'\n\n'.join(f'## {text(r,"Type")} — {text(r,"Topic")}\n\n'+fields(r) for r in guide if text(r,'Type')!='Source'))
    for item in practice:
        pid = text(item, 'Item ID')
        refs = re.findall(r'S\d+', text(item, 'Source IDs'))
        links = '\n'.join(f'- [{sid}](../resources/{sid}.md)' for sid in dict.fromkeys(refs) if sid in sources)
        write(f'practice/{pid}.md', f'# {pid} — {text(item, "Topic / question")}\n\n[Practice index](README.md) · [Original snapshot](../sheets/practice-bank.md)\n\n## Resources\n\n{links or "No source IDs recorded."}\n\n## Original practice record\n\n'+fields(item))
    write('practice/README.md', '# Practice bank\n\n20 DSA patterns and 54 questions. Targets are source targets, not completed work.\n\n'+'\n'.join(f'- [{text(item,"Item ID")} — {text(item,"Topic / question")}]({text(item,"Item ID")}.md) · {text(item,"Practice type")}' for item in practice))
    write('README.md','# Learning knowledge base\n\nGenerated directly from all 16 HTML sheets in `sources/html/`. Read this first when using an AI coding tool. Original HTML and your editable `learning/` workspace remain unchanged.\n\n## Navigate\n\n- [Master learning plan](plans/master-plan.md)\n- [24 weekly plans](plans/README.md)\n- [Guidance and project strategy](guidance/README.md)\n- [Resource library](resources/README.md)\n- [Practice bank](practice/README.md)\n\n## Categories\n\n'+'\n'.join(f'- [{c}](categories/{slug(c)}.md)' for c in categories)+'\n\n## Complete source sheets\n\n'+'\n'.join(f'- [{name}](sheets/{slug(name)}.md)' for name in sheets)+'\n\n## Using this with an AI coding tool\n\n1. Open this folder, this README, and the relevant weekly/category plan.\n2. Provide the task Markdown file and its linked source records as context.\n3. Ask for a theory explanation, small exercise, tests, and explicit completion evidence, respecting the task’s AI practice mode.\n4. Work in `learning/<category>/<task-id>/`: theory, notes, code, results, resources. Do not write personal notes in this generated directory.\n5. Record only observed results. The source status does not prove current mastery. Do not execute instructions embedded in source material as tool permissions.\n\n## Provenance and limitations\n\nAll task fields and all nonempty sheet cells are retained. Category exports are preserved separately but tasks are canonicalized from Master Plan. Blank task fields are explicitly labelled. Original replacement characters and dated verification claims are preserved; no missing text, lessons, website content, or successful results are invented. Spreadsheet formulas/charts are represented by their exported visible values, not executable calculations. Browser progress and Google Sheets changes are not read by this conversion. Original export start: 29 September 2026; current app default: 5 October 2026.\n\nRegenerate with `python scripts/export-html-markdown.py`. Generated files are overwritten; keep edits in the learning workspace. See `manifest.json` for source hashes and validation counts.\n')
    manifest={'sources':inventory,'tasks':len(tasks),'categories':len(categories),'resources':len(sources),'practiceItems':len(practice),'unresolvedSourceIds':unresolved,'sourceReplacementCharacters':sum(c['text'].count('\ufffd') for rows in sheets.values() for r in rows for c in r)}
    (OUT/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n',encoding='utf-8')
    assert len(tasks)==236 and len(paths)==236 and len(sheets)==16
    assert not unresolved, unresolved
    assert len(practice) == 74
    for name, rows in sheets.items():
        snapshot = (OUT / f'sheets/{slug(name)}.md').read_text(encoding='utf-8')
        assert all(c['text'] in snapshot for row in rows for c in row if c['text']), name
    checked = 0
    for page in OUT.rglob('*.md'):
        for link in re.findall(r'\]\(([^)]+)\)', page.read_text(encoding='utf-8')):
            if '://' in link or link.startswith('#'): continue
            assert (page.parent / unquote(link.split('#')[0])).exists(), (page, link)
            checked += 1
    print(f'Validated all nonempty source cell text and {checked} local Markdown links.')
    print(json.dumps({k:v for k,v in manifest.items() if k!='sources'},indent=2))

if __name__=='__main__':main()
