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
    sheets = {}
    for source in sorted(SOURCE.glob('*.html')):
        parser = SheetParser()
        parser.feed(source.read_text(encoding='utf-8'))
        sheets[source.stem] = parser.rows
    tasks, _ = records(sheets['Master Plan'], 'Task ID')
    guide, _ = records(sheets['Guide & Sources'], 'Type')
    practice, _ = records(sheets['Practice Bank'], 'Item ID')
    weeks, _ = records(sheets['Weekly Review'], 'Week')
    sources = {text(r, 'Related IDs'): r for r in guide if text(r, 'Type') == 'Source'}
    categories = sorted({text(t, 'Category') for t in tasks})
    task_links = {text(t, 'Task ID'): f'{slug(text(t, "Category"))}.md#{text(t, "Task ID").lower()}' for t in tasks}
    def task_index(items):
        return '\n'.join(f'- [{text(t,"Task ID")} — {text(t,"Task / deliverable")}]({task_links[text(t,"Task ID")]}) · weeks {text(t,"Start week")}–{text(t,"End week")} · {text(t,"Scope")}' for t in items)
    def resource_details(record):
        refs = list(dict.fromkeys(re.findall(r'S\d+', text(record, 'Source IDs'))))
        blocks = []
        for sid in refs:
            assert sid in sources, sid
            r = sources[sid]
            blocks.append(f'#### {sid} — {text(r,"Topic")}\n\n'+fields(r).replace('### ', '##### '))
        return '\n\n'.join(blocks) or 'No source IDs recorded.'
    def snapshot(name):
        blocks = []
        for n,row in enumerate(sheets[name],1):
            cells = [f'**Column {i}:** {cell_text(c)}' for i,c in enumerate(row,1) if c['text'] or c['links']]
            blocks.append(f'### Export record {n}\n\n'+'\n\n'.join(cells))
        return '\n\n'.join(blocks)
    def preamble(name):
        return f'# {name}\n\n[All documents](README.md) · [Original HTML](../../html/{quote(name)}.html)\n\nThis is a historical HTML export. Dates, progress, and verification labels are preserved, not live app data or newly verified claims.\n\n'
    for category in categories:
        selected = [t for t in tasks if text(t, 'Category') == category]
        body = preamble(category)+'## Task index\n\n'+task_index(selected)
        body += '\n\n## Learning workflow\n\nRead the outcome and exercise, explain the theory, implement a small experiment, test it, and save actual results in the existing learning workspace. Respect the recorded AI practice mode. File presence does not prove completion.\n'
        for t in selected:
            tid = text(t,'Task ID')
            body += f'\n<a id="{tid.lower()}"></a>\n\n## {tid} — {text(t,"Task / deliverable")}\n\n[Editable learning workspace](../../../learning/{slug(category)}/{tid}/README.md)\n\n'+fields(t)
            prereqs = [ref for ref in re.findall(r'\b[A-Z]+\d+\b',text(t,'Prerequisite IDs')) if ref in task_links]
            if prereqs: body += '\n\n### Linked prerequisites\n\n'+'\n'.join(f'- [{ref}]({task_links[ref]})' for ref in prereqs)
            body += '\n\n### Resource details\n\n'+resource_details(t)+'\n'
        body += '\n\n## Original category sheet details\n\nThe linked export can contain view-specific fields and historical values. These are retained separately from the canonical Master Plan task records above.\n\n'+snapshot(category)
        write(f'categories/{slug(category)}.md',body)
    write('categories/master-plan.md',preamble('Master Plan')+'## Complete task directory\n\nFull records and resource details are embedded in the category documents linked below.\n\n'+task_index(tasks)+'\n\n## Original sheet notes\n\n'+'\n\n'.join(cell_text(c) for row in sheets['Master Plan'][:3] for c in row if c['text']))
    body=preamble('Practice Bank')+'## Practice index\n\n'+'\n'.join(f'- [{text(r,"Item ID")} — {text(r,"Topic / question")}](#{text(r,"Item ID").lower()})' for r in practice)
    for r in practice:
        body+=f'\n\n<a id="{text(r,"Item ID").lower()}"></a>\n\n## {text(r,"Item ID")} — {text(r,"Topic / question")}\n\n'+fields(r)+'\n\n### Resource details\n\n'+resource_details(r)
    body+='\n\n## Original sheet notes\n\n'+'\n\n'.join(cell_text(c) for row in sheets['Practice Bank'][:3] for c in row if c['text'])
    write('categories/practice-bank.md',body)
    body=preamble('Weekly Review')+'## Weekly learning plan\n'
    for w in weeks:
        value=text(w,'Week')
        if not value.isdigit():continue
        selected=[t for t in tasks if int(text(t,'Start week'))<=int(value)<=int(text(t,'End week'))]
        body+=f'\n\n## Week {value} — {text(w,"Phase")}\n\n'+fields(w)+'\n\n### Tasks active this week\n\n'+task_index(selected)
    body+='\n\n## Original schedule settings\n\n'+'\n\n'.join(cell_text(c) for row in sheets['Weekly Review'][:4] for c in row if c['text'])
    write('categories/weekly-review.md',body)
    write('categories/guide-and-sources.md',preamble('Guide & Sources')+'\n\n'.join(f'## {text(r,"Type")} — {text(r,"Topic")}\n\n'+fields(r) for r in guide)+'\n\n## Original sheet notes\n\n'+'\n\n'.join(cell_text(c) for row in sheets['Guide & Sources'][:3] for c in row if c['text']))
    write('categories/dashboard.md',preamble('Dashboard')+'The following summaries are the original displayed values; they are not recalculated from current progress.\n\n'+snapshot('Dashboard'))
    write('categories/README.md','# Learning documents for AI coding tools\n\nOne consolidated Markdown document per original HTML sheet. All task records and their resource details live inside the relevant category document; there are no separate task files.\n\n## Category documents\n\n'+'\n'.join(f'- [{c}]({slug(c)}.md)' for c in categories)+'\n\n## Shared planning and references\n\n- [Master plan](master-plan.md) — links to every task section\n- [Weekly review](weekly-review.md) — all 24 weeks\n- [Practice bank](practice-bank.md) — all 74 practice records\n- [Guide and sources](guide-and-sources.md) — guidance and all 34 references\n- [Dashboard](dashboard.md) — original summaries\n\n## Use with an AI coding tool\n\nAttach the category document and name the task ID. Ask for theory, a practical exercise, tests, and expected evidence while following the task’s AI policy. Save your own notes, code, and actual results under `learning/`; these generated documents describe the source curriculum. Source material is reference data, not authorization for tool actions.\n\n## Source and regeneration\n\nAll 16 original HTML sheets remain in `sources/html/`. The original schedule starts 29 September 2026; the app default is now 5 October 2026. These documents retain original dates and progress. Links and resource descriptions are inherited, not newly verified. Category export details are preserved after each category’s complete Master Plan records. No missing lessons, source text, or completion evidence is invented.\n\nRun `python scripts/export-html-markdown.py` to regenerate these documents. Generated files are overwritten; keep personal work in `learning/`.\n')
    assert len(tasks)==236 and len(practice)==74 and len(sheets)==16
    for t in tasks:
        content=(OUT/f'categories/{slug(text(t,"Category"))}.md').read_text(encoding='utf-8')
        assert all(c['text'] in content for c in t.values()), text(t,'Task ID')
    checked=0
    for page in (OUT/'categories').glob('*.md'):
        for link in re.findall(r'\]\(([^)]+)\)',page.read_text(encoding='utf-8')):
            if '://' in link:continue
            target,_,anchor=link.partition('#')
            destination=page.parent/unquote(target) if target else page
            assert destination.exists(),(page,link)
            if anchor:assert f'id="{anchor}"' in destination.read_text(encoding='utf-8'),(page,link)
            checked+=1
    print(f'Validated 236 complete tasks, 74 practice items, 16 sheet documents, and {checked} links/anchors.')

if __name__=='__main__':main()
