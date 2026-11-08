"""Publish the warehouse curriculum to Learnspace, learning folders, and offline HTML."""

import argparse
import json
import re
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'sources/warehouse-dispatch'
DATA = ROOT / 'src/data/warehouse-path.json'
BRIEF_NAME = '00-warehouse-practice.md'
PHASES = [
    (1, 4, 'Terminal and domain', 'Create, find and summarize shipments in the terminal.'),
    (5, 7, 'Spring and React', 'Create and find shipments in the browser through a tested HTTP API.'),
    (8, 10, 'PostgreSQL and reservation', 'Persist shipments and prove that concurrent requests cannot oversell stock.'),
    (11, 14, 'Secure warehouse workflow', 'Sign in, reserve, pick and dispatch with tested permissions and balances.'),
    (15, 20, 'Operational readiness', 'Measure the application, test safe retries, and rehearse staging recovery.'),
    (21, 24, 'Independent demonstration', 'Repeat a change under time and give a demo another person can run.'),
]
FIRST_STEPS = ['G02', 'JA05', 'JA06'] + [f'B{week:02}' for week in range(1, 25)]
HOURS_PER_DAY = 5


def slug(category):
    return re.sub(r'[^a-z0-9]+', '-', category.lower().replace('&', 'and')).strip('-')


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
            f'Solve {dsa_targets[week]} new problems from the Practice Bank. Revisit one prior error and use a warehouse scenario only where it fits the pattern.',
            'Record problem IDs, a failed case, corrected complexity, and one successful unaided reattempt.',
        )
    if category == 'Review':
        return (
            f'Recall the week {week} concept and explain the trade-off from B{week:02}.',
            f'Rerun one check from B{week:02}, revisit one mistake and compare actual time with your study plan.',
            'Record the run, one skill you can repeat, and the next gap you will address.',
        )
    if category == 'Mock interviews':
        return (
            f'Recall {task["title"]} and the assumptions that affect your answer.',
            f'Attempt the original timed prompt unaided. Use an actual B{week:02} artifact if it illustrates the topic, or a self-contained fixture when it does not.',
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

    tracker = json.loads((ROOT / 'src/data/tracker.json').read_text(encoding='utf-8'))
    source_tasks = tracker['tasks']
    dsa_targets = {int(week['week']): int(week['dsaTarget']) for week in tracker['weeks']}
    known = {task['id'] for task in source_tasks}
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
        'Start with the [project requirements](../../projects/warehouse-dispatch/README.md) and [JA05](../../learning/java-and-spring/JA05/notes/00-warehouse-practice.md). Study for five hours per selected day. Write and verify the project code yourself.',
        '[Offline HTML](index.html) · [Excel tracker](../Final%20Tracker.xlsx) · [Original curriculum](../markdown/categories/README.md)',
    ]
    weeks = {}
    for task in source_tasks:
        task_id = task['id']
        week = int(task['startWeek'])
        title, category, scope = task['title'], task['category'], task['scope']
        focus, build, verify = briefs[task_id] if task_id in briefs else fallback(task, week, dsa_targets)
        checkpoint = f'B{week:02}'
        records[task_id] = dict(title=title, week=week, category=category, scope=scope,
                                checkpoint=checkpoint, focus=focus, build=build, verify=verify)
        folder = f'learning/{slug(category)}/{task_id}'
        path = f'{folder}/notes/{BRIEF_NAME}'
        weeks.setdefault(week, []).append((task_id, records[task_id], path))
        publish(ROOT / path, f'''# {task_id} — {title}

Week {week} · {scope} · Warehouse checkpoint {checkpoint}

## Review and learn

{focus}

## Do the work

{build}

## Pass check

{verify}

Write the implementation and checks yourself. Use documentation, the debugger and actual runs. Save what you ran, what happened, and your next action in [Results](../results/evidence.md) or record it in Learnspace. Include a commit or result path when useful.
''')

    sections = []
    for week, rows in sorted(weeks.items()):
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
    publish(DATA, json.dumps(dict(hoursPerDay=HOURS_PER_DAY, order=FIRST_STEPS,
                                  phases=phases, tasks=records), ensure_ascii=False, indent=2))
    publish(SOURCE / 'README.md', '\n\n'.join(markdown))
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
</body></html>''')
    print(f'{"Verified" if check else "Published"} {len(records)} task briefs and {len(phases)} phases.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true')
    main(parser.parse_args().check)
