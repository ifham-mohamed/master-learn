"""Publish the warehouse curriculum to Learnspace, learning folders, and offline HTML."""

import argparse
import json
import re
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'sources/warehouse-dispatch'
DATA = ROOT / 'src/data/warehouse-path.json'
PHASES = [
    (1, 4, 'Terminal and domain', 'Create, find and summarize shipments in the terminal.'),
    (5, 7, 'Spring and React', 'Create and find shipments in the browser through a tested HTTP API.'),
    (8, 10, 'PostgreSQL and reservation', 'Persist shipments and prove that concurrent requests cannot oversell stock.'),
    (11, 14, 'Secure warehouse workflow', 'Sign in, reserve, pick and dispatch with tested permissions and balances.'),
    (15, 20, 'Operational readiness', 'Measure the application, test safe retries, and rehearse staging recovery.'),
    (21, 24, 'Independent demonstration', 'Repeat a change under time and give a demo another person can run.'),
]
FIRST_STEPS = ['G02', 'JA05', 'JA06'] + [f'B{week:02}' for week in range(1, 25)]
ENTRY_PREREQUISITES = {'JA05': 'G02', 'JA06': 'JA05', 'B01': 'JA06'}
HOURS_PER_DAY = 5
BUILD_TITLES = [
    'Run the first shipment CLI', 'Model shipments and client states', 'Refine lookup and mapping',
    'Summarize shipments and trace async work', 'Start Spring Boot and the React client',
    'Build shipment endpoints and routes', 'Connect React to the validated shipment API',
    'Persist shipments and receive stock in PostgreSQL', 'Measure and fix shipment-list queries',
    'Reserve and release stock safely under contention', 'Secure the warehouse workflow',
    'Receive, pick and dispatch from React', 'Strengthen the regression suite',
    'Run PostgreSQL integration tests and CI', 'Measure performance and trace failures',
    'Stage a release and test rate limits', 'Design delivery and dispatch exceptions',
    'Build the delivery and exception workflow', 'Make dispatch safe to retry',
    'Release, restore and verify the system', 'Practice timed Java, SQL and debugging',
    'Fix a task in an unfamiliar repository', 'Rehearse the engineering walkthrough',
    'Run final simulations and package the demo',
]
ACTIVE_TITLES = {
    **{f'B{i:02}': title for i, title in enumerate(BUILD_TITLES, 1)},
    'PF01': 'Compare Project ONE experience with Warehouse Dispatch',
    'PF02': 'Warehouse reservation concurrency lab', 'PF03': 'Independent repository debugging lab',
    'PF04': 'Spring Boot and PostgreSQL backend showcase', 'PF05': 'React dispatch client showcase',
    'M06': 'Spring MVC, React routes and binary search trees',
    'M11': 'Last-unit reservation, transactions and isolation',
    'M36': 'Timed independent repository verification',
    'M38': 'Timed warehouse workflow design', 'M40': 'TypeScript runtime, types and React client design',
}
MANAGED = '<!-- Managed by export_warehouse_plan.py -->'

ALGORITHM_PRACTICE = (
    ('HackerRank interview practice', 'https://www.hackerrank.com/interview/interview-preparation-kit',
     'Choose a challenge in the matching topic, solve it in Java and save its link or ID.'),
    ('VisuAlgo', 'https://visualgo.net/en', 'Predict the next operation on a relevant structure, then step through the animation.'),
)


def slug(category):
    return re.sub(r'[^a-z0-9]+', '-', category.lower().replace('&', 'and')).strip('-')


def workbook_quote(value):
    if not value:
        return 'The workbook leaves this cell blank.'
    lines = value.split('\n')
    quote = []
    for index, line in enumerate(lines):
        if not line:
            quote.append('>')
            continue
        line = re.sub(r'([\\`*_\[\]<>~])', r'\\\1', line)
        line = re.sub(r'^(\d*)([.)#+=-])(?=\s|$)', r'\1\\\2', line)
        line = re.sub(r'&(?=[a-zA-Z#])', r'\\&', line)
        line_break = '\\' if index + 1 < len(lines) and lines[index + 1] else ''
        quote.append(f'> {line}{line_break}')
    return '\n'.join(quote)


def fallback(task, week, dsa_targets):
    category = task['category']
    if category == 'DSA':
        patterns = [
            'arrays and hash maps', 'two pointers and hash maps', 'sliding windows and prefix sums',
            'binary search and stacks', 'linked lists and trees', 'tree traversal and binary search trees',
            'heaps and intervals', 'graph traversal', 'topological ordering', 'graphs and union-find',
            'backtracking', 'greedy choices and intervals', 'mixed review', 'one-dimensional dynamic programming',
            'two-dimensional dynamic programming', 'timed pattern selection', 'mixed timed practice',
            'graph and tree review', 'mixed recall', 'weakest patterns', 'timed Java practice',
            'previously failed problems', 'mixed interview sets', 'final timed review',
        ]
        return (
            f'Practice {patterns[week - 1]}. State the invariant and time and space costs before coding.',
            f'Use the Practice Bank to choose topics. Solve {dsa_targets[week]} new problems and retry one earlier mistake. Apply a warehouse example where the pattern fits.',
            'Record problem IDs, a failed case, corrected complexity, and one successful unaided reattempt.',
        )
    if category == 'Review':
        return (
            f'Recall the week {week} concept and explain the trade-off from B{week:02}.',
            f'Rerun one check from B{week:02}, revisit one mistake and compare actual time with your study plan.',
            'Record the run, one skill you can repeat, and the next gap you will address.',
        )
    if category == 'Mock interviews':
        prompt = 'the workbook prompt below' if task['prompt'] else 'a timed question on the topics in the task title'
        return (
            f'Recall {ACTIVE_TITLES.get(task["id"], task["title"])} and the assumptions that affect your answer.',
            f'Attempt {prompt} unaided. Use an actual B{week:02} artifact if it illustrates the topic, or create a small fixture.',
            'Record time, result, both scores, one specific improvement, and an unaided retry.',
        )
    raise ValueError(f'Write a brief for {task["id"]}')


def main(check):
    def publish(file, text):
        text = text.rstrip() + '\n'
        if check:
            if not file.exists() or file.read_text(encoding='utf-8') != text:
                raise ValueError(f'Out of date: {file.relative_to(ROOT)}')
        elif not file.exists() or file.read_text(encoding='utf-8') != text:
            file.parent.mkdir(parents=True, exist_ok=True)
            file.write_text(text, encoding='utf-8')

    def refresh_scaffold(file, starter, text):
        existing = file.read_text(encoding='utf-8') if file.exists() else ''
        if not existing or existing.startswith(MANAGED) or starter in existing:
            publish(file, f'{MANAGED}\n\n{text}')

    tracker = json.loads((ROOT / 'src/data/tracker.json').read_text(encoding='utf-8'))
    source_tasks = tracker['tasks']
    dsa_targets = {int(week['week']): int(week['dsaTarget']) for week in tracker['weeks']}
    tasks_by_id = {task['id']: task for task in source_tasks}
    known = set(tasks_by_id)

    def task_link(task_id):
        if task_id not in tasks_by_id:
            return task_id
        track = slug(tasks_by_id[task_id]['category'])
        return f'[{task_id}](../../{track}/{task_id}/README.md)'

    resources = {}
    for line in (SOURCE / 'task-resources.txt').read_text(encoding='utf-8').splitlines():
        if not line.strip() or line.startswith('#'):
            continue
        ids, label, url, exercise = [field.strip() for field in line.split('|')]
        if not ids or not label or not exercise or not url.startswith('https://'):
            raise ValueError(f'Invalid learning resource: {line}')
        for task_id in ids.split():
            resource = (label, url, exercise)
            entries = resources.setdefault(task_id, [])
            if task_id not in known or any(entry[1] == url for entry in entries):
                raise ValueError(f'Invalid or duplicate resource for {task_id}: {url}')
            entries.append(resource)

    labs = json.loads((SOURCE / 'architecture-labs.json').read_text(encoding='utf-8'))
    project = (ROOT / 'projects/warehouse-dispatch/README.md').read_text(encoding='utf-8')
    requirements = project.split('## Business workflow\n', 1)[1].split('\n## How the project grows', 1)[0].strip()
    if len({lab['id'] for lab in labs}) != len(labs) or any(
        lab['after'] not in FIRST_STEPS or not set(lab['tasks']) <= known for lab in labs
    ):
        raise ValueError('Architecture labs must point to valid checkpoints and tasks')
    briefs = {}
    for line in (SOURCE / 'task-briefs.txt').read_text(encoding='utf-8').splitlines():
        if not line.strip() or line.startswith('#'):
            continue
        task_id, focus, build, verify = [field.strip() for field in line.split('|')]
        if task_id not in known or task_id in briefs or not all((focus, build, verify)):
            raise ValueError(f'Invalid brief for {task_id}')
        briefs[task_id] = (focus, build, verify)

    records = {}
    markdown = [
        '# Warehouse Dispatch learning plan',
        'Start with the [project requirements](../../projects/warehouse-dispatch/README.md) and [JA05](../../learning/java-and-spring/JA05/README.md). Study for five hours per selected day. Write and verify the project code yourself.',
        '[Offline HTML](index.html) · [Excel tracker](../Final%20Tracker.xlsx) · [Original curriculum](../markdown/categories/README.md)',
    ]
    weeks = {}
    for task in source_tasks:
        task_id = task['id']
        week = int(task['startWeek'])
        title, category, scope = ACTIVE_TITLES.get(task_id, task['title']), task['category'], task['scope']
        focus, build, verify = briefs[task_id] if task_id in briefs else fallback(task, week, dsa_targets)
        checkpoint = f'B{week:02}'
        requires = re.findall(r'[A-Z]+\d+', task['prerequisites'])
        if task_id in ENTRY_PREREQUISITES:
            requires.append(ENTRY_PREREQUISITES[task_id])
        requires = list(dict.fromkeys(requires))
        linked_labs = [lab for lab in labs if task_id in lab['tasks']]
        records[task_id] = dict(title=title, week=week, category=category, scope=scope,
                                checkpoint=checkpoint, focus=focus, build=build, verify=verify,
                                requires=requires, labs=[lab['id'] for lab in linked_labs])
        folder = f'learning/{slug(category)}/{task_id}'
        path = f'{folder}/README.md'
        weeks.setdefault(week, []).append((task_id, records[task_id], path))
        lab_notes = ''
        if linked_labs:
            lab_notes = '## Further architecture practice\n\n' + '\n'.join(
                f'- **{lab["title"]}.** {lab["verify"]} Start after {task_link(lab["after"])}.' for lab in linked_labs
            )
        before = '\n\nBefore you begin, complete ' + ', '.join(map(task_link, requires)) + '.' if requires else ''
        reading = resources.get(task_id, ALGORITHM_PRACTICE if category == 'DSA' else ())
        practice = [f'- {exercise} [{label}]({url})' for label, url, exercise in reading]
        if category in ('DSA', 'Mock interviews', 'Review'):
            action = 'Use the pattern rows to plan which topics to practice and check your targets.' if category == 'DSA' else (
                'Select a relevant question and answer it aloud before checking the notes.' if category == 'Mock interviews' else
                'Select one due question. Answer from memory and then check your reasoning.'
            )
            practice.append(f'- {action} [Practice Bank](../../../sources/markdown/categories/practice-bank.md)')
        reading_notes = '## Read and practice\n\n' + '\n'.join(practice) if practice else ''
        lab_refs = dict.fromkeys((ref['label'], ref['url']) for lab in linked_labs for ref in lab['references'])
        if lab_refs:
            lab_notes += '\n\n' + ' · '.join(f'[{label}]({url})' for label, url in lab_refs)
        coaching = (SOURCE / 'ja05-coaching.md').read_text(encoding='utf-8').strip() if task_id == 'JA05' else ''
        worked_example = '''
## Earlier SQL worked example

For a separate SQLite demonstration, see the [JOIN walkthrough](theory/01-worked-example.md), [run instructions](code/01-run-example.md), and [recorded example results](results/evidence.md). Write your own PostgreSQL warehouse queries for the current task.
''' if task_id == 'CS12' else ''
        supplemental = ''.join('\n\n' + part.strip() for part in (reading_notes, worked_example, lab_notes, coaching) if part)
        mock_notes = ' In Learnspace, record technical and communication scores and the mock result.' if task['workType'] == 'Mock' else ''
        publish(ROOT / path, f'''{MANAGED}

# {task_id} — {title}

Week {week} · {scope} · Warehouse checkpoint {task_link(checkpoint) if task_id != checkpoint else checkpoint}{before}

## Review and learn

{focus}

## Do the work

{build}

## Pass check

{verify}{supplemental}

## Workbook criteria

Use the warehouse steps above for the current build. The wording below comes from Master Plan row {task['sourceRow']}. [Final Tracker.xlsx](../../../sources/Final%20Tracker.xlsx)

### Done when

{workbook_quote(task['doneWhen'])}

### Exercise / interview prompt

{workbook_quote(task['prompt'])}

## Record one entry

Use your [learning log](notes/journal.md) for what you learned, what you tried and observed, and your next step.{mock_notes} Put shared project code in `projects/warehouse-dispatch/`. Create `code/` for an isolated experiment or `results/` for a separate output file only when you have something to keep.

[Project requirements](../../../projects/warehouse-dispatch/README.md) · [Original task record](../../../sources/markdown/categories/{slug(category)}.md#{task_id.lower()})
''')
        journal = ROOT / folder / 'notes/journal.md'
        # Migrate only the original empty template. The log belongs to the learner.
        old_log = journal.read_text(encoding='utf-8').strip() if journal.exists() else ''
        empty_template = re.fullmatch(
            rf'# {task_id} learning journal\n\n> Starter template\. Record your own session; no work is claimed here\.\n\n'
            r'## Session\n\n- Date:\n- Goal: [^\n]+\n- Time spent:\n- Tools / AI policy: [^\n]+\n\n'
            r'## What I understood\n\nExplain the concept in your own words\.\n\n'
            r'## Attempts and mistakes\n\nWhat did you try\? What failed, and why\?\n\n'
            r'## Next action\n\nWrite one concrete next step\.', old_log,
        )
        if not check and (not journal.exists() or empty_template):
            publish(journal, f'''# {task_id} learning log

Add one short entry per session. Date each entry and repeat the three prompts below.

## What I learned

## What I tried and what happened

## Next step
''')

    reinforcement = {'DSA', 'Review', 'Career', 'Mock interviews'}
    checkpoints = []
    for week, rows in sorted(weeks.items()):
        checkpoint = f'B{week:02}'
        prepare, reflect = [], []
        for task_id, record, _ in rows:
            if task_id == checkpoint:
                continue
            after = task_id != 'G01' and (record['category'] in reinforcement or task_id.startswith('PF') or task_id == 'G09')
            (reflect if after else prepare).append(task_id)
        if week == 1:
            first = ['G01', 'G02', 'JA05', 'JA06']
            prepare = first + [task_id for task_id in prepare if task_id not in first]
        checkpoints.append(dict(week=week, id=checkpoint, prepare=prepare, reflect=reflect))

    sections = []
    ordered_rows = []
    for week, rows in sorted(weeks.items()):
        checkpoint = checkpoints[week - 1]
        by_id = {row[0]: row for row in rows}
        rows = [by_id[tid] for tid in [*checkpoint['prepare'], checkpoint['id'], *checkpoint['reflect']]]
        ordered_rows.extend(rows)
        markdown.append(f'## Week {week}\n\n' + '\n'.join(
            f'- [{task_id} — {brief["title"]}](../../{path}) · {brief["scope"]}'
            for task_id, brief, path in rows
        ))
        cards = []
        for task_id, brief, path in rows:
            cards.append(f'''<details><summary><strong>{task_id}</strong> {escape(brief['title'])} <small>{escape(brief['scope'])}</small></summary>
<dl id="{task_id}"><dt>Review and learn</dt><dd>{escape(brief['focus'])}</dd><dt>Do the work</dt><dd>{escape(brief['build'])}</dd><dt>Pass check</dt><dd>{escape(brief['verify'])}</dd></dl>
<a href="../../{path}">Task notes</a></details>''')
        sections.append(f'<section id="week-{week}"><h2>Week {week}</h2>' + '\n'.join(cards) + '</section>')

    phases = [dict(start=start, end=end, title=title, outcome=outcome)
              for start, end, title, outcome in PHASES]
    for category in dict.fromkeys(record['category'] for record in records.values()):
        links = '\n'.join(
            f'- [{tid} — {brief["title"]}]({tid}/README.md) · Week {brief["week"]} · {brief["scope"]}'
            for tid, brief, _ in ordered_rows if brief['category'] == category
        )
        refresh_scaffold(ROOT / f'learning/{slug(category)}/README.md', '\n## Tasks\n\n- [', f'''# {category}

Each task opens with a Warehouse Dispatch practice brief. Use the [full build order](../../sources/warehouse-dispatch/README.md) to see the checkpoint and the [advanced labs](../../sources/warehouse-dispatch/architecture.md) for later architecture practice.

## Tasks in plan order

{links}
''')
    publish(DATA, json.dumps(dict(hoursPerDay=HOURS_PER_DAY, order=FIRST_STEPS,
                                  phases=phases, checkpoints=checkpoints, labs=labs, requirements=requirements,
                                  tasks=records), ensure_ascii=False, indent=2))
    markdown.insert(3, '[Advanced architecture labs](architecture.md) · [Ordered checkpoint guide](../../projects/warehouse-dispatch/README.md#how-the-project-grows)')
    publish(SOURCE / 'README.md', '\n\n'.join(markdown))
    lab_md = ['# Advanced warehouse architecture labs', 'Work through the listed checkpoints first. Labs extend the capstone and use the existing task IDs for evidence.']
    lab_html = []
    for lab in labs:
        tasks = ', '.join(f'[{tid}](index.html#{tid})' for tid in lab['tasks'])
        refs = '\n'.join(f'- [{ref["label"]}]({ref["url"]})' for ref in lab['references'])
        lab_md.append(f'## {lab["title"]}\n\nAfter [{lab["after"]}](index.html#{lab["after"]}) · Related tasks {tasks}\n\n**Build.** {lab["build"]}\n\n**Check.** {lab["verify"]}\n\n{refs}'.rstrip())
        lab_html.append(f'<li><strong>{escape(lab["title"])}</strong> · after <a href="#{lab["after"]}">{lab["after"]}</a><p>{escape(lab["build"])}</p><p>{escape(lab["verify"])}</p></li>')
    publish(SOURCE / 'architecture.md', '\n\n'.join(lab_md))
    navigation = ' '.join(f'<a href="#week-{week}">{week}</a>' for week in sorted(weeks))
    phase_list = ''.join(f'<li><a href="#week-{phase["start"]}">{phase["title"]}</a> · {phase["outcome"]}</li>' for phase in phases)
    publish(SOURCE / 'index.html', f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Warehouse Dispatch learning plan</title><style>
:root{{color-scheme:light dark;font:100%/1.55 system-ui}}
body{{max-width:56rem;margin:auto;padding:1rem 1.25rem 4rem}}
a{{text-underline-offset:.2em}} nav a{{display:inline-block;padding:.3rem .45rem}}
section{{margin-top:2.5rem}} details{{border-top:1px solid GrayText;padding:.6rem 0}}
summary{{cursor:pointer}} small{{margin-inline-start:.5rem}} dt{{font-weight:700}} dd{{margin:0 0 .6rem}}
</style></head><body>
<h1>Warehouse Dispatch learning plan</h1>
<p>Study five hours per selected day. Write your own code and tests. Keep a short record of what you ran, what happened, and what comes next.</p>
<p><a href="#JA05">Start with JA05</a> · <a href="../../projects/warehouse-dispatch/README.md">Project requirements</a> · <a href="../Final%20Tracker.xlsx">Excel tracker</a></p>
<h2>Phases</h2><ol>{phase_list}</ol><nav aria-label="Jump to week">Week {navigation}</nav>
{chr(10).join(sections)}
<section id="architecture"><h2>Advanced architecture labs</h2><p><a href="architecture.md">Task links and references</a></p><ol>{''.join(lab_html)}</ol></section>
</body></html>''')
    print(f'{"Verified" if check else "Published"} {len(records)} task briefs and {len(phases)} phases.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true')
    main(parser.parse_args().check)
