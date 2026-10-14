#!/usr/bin/env python3
"""Skriver ut all synlig text på en sajt (och ordlistan i js/i18n.js om den finns) så att språket kan granskas.
Kör: python3 ~/.claude/omdesign/extract-text.py <sajtmapp>"""
import re, sys, html, os, glob, json
root = sys.argv[1]
seen = set()
for f in sorted(glob.glob(os.path.join(root, '*.html'))):
    t = open(f, encoding='utf8').read()
    m = re.search(r'<main[^>]*>(.*)</main>', t, re.S)
    b = m.group(1) if m else t
    b = re.sub(r'<script.*?</script>|<style.*?</style>|<svg.*?</svg>', '', b, flags=re.S)
    b = re.sub(r'<br\s*/?>', ' ', b)
    print('---', os.path.basename(f))
    for s in re.split(r'<[^>]+>', b):
        s = html.unescape(re.sub(r'\s+', ' ', s)).strip()
        if len(s) > 2 and s not in seen:
            seen.add(s); print(s)
    for a in re.findall(r'(?:alt|title|aria-label|content)="([^"]{12,})"', t):
        a = html.unescape(a)
        if a not in seen: seen.add(a); print('[attr]', a)
jp = os.path.join(root, 'js', 'i18n.js')
if os.path.exists(jp):
    d = open(jp, encoding='utf8').read()
    m = re.search(r'var DICT = (\{.*?\});\n', d, re.S)
    if m:
        data = json.loads(m.group(1))
        for lang in ('sv', 'en'):
            print('=== ordlista', lang)
            for k, v in data[lang].items(): print(k, '=', html.unescape(re.sub(r'<[^>]+>', ' ', v)))
