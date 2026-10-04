"""Check HTTP availability, not the truth of inherited claims."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import json
import urllib.request
import urllib.error
import argparse
from datetime import datetime, timezone, timedelta

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--checked-date', default=datetime.now(timezone(timedelta(hours=5, minutes=30))).date().isoformat())
checked_date = parser.parse_args().checked_date
data = json.loads((ROOT / 'src/data/tracker.json').read_text(encoding='utf-8'))
links = [(r['relatedIds'], r['source']) for r in data['guide'] if r['type'] == 'Source']
links += [(r['id'], r['url']) for r in json.loads((ROOT / 'src/data/additional-resources.json').read_text())]

def check(pair):
    id, url = pair
    result = {'id': id, 'url': url, 'checked': checked_date}
    try:
        request = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (compatible; LearningAtlasLinkCheck/1.0)'})
        with urllib.request.urlopen(request, timeout=18) as response:
            result.update(status=response.status, finalUrl=response.url, state='Reachable')
    except urllib.error.HTTPError as error:
        result.update(status=error.code, state='Unavailable' if error.code in (404, 410) else 'Check restricted', detail=str(error))
    except Exception as error:
        result.update(status=None, state='Could not verify', detail=str(error))
    return result

with ThreadPoolExecutor(max_workers=8) as pool:
    results = list(pool.map(check, links))
(ROOT / 'src/data/resource-checks.json').write_text(json.dumps(results, indent=2), encoding='utf-8')
for row in results: print(row['id'], row['state'], row.get('status'))
