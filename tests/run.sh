#!/bin/sh
# run.sh <тест.js> [бюджет мс] — копирует игру во временную папку, вставляет тест и печатает <pre id="out">
T=$(cd "$(dirname "$0")" && pwd);G=$(dirname "$T");W=${TMPDIR:-/tmp}/sshibka-test
mkdir -p $W && rsync -a --delete --exclude .git --exclude tests "$G/" "$W/"
n=$(basename $1 .js)
python3 -c "import sys;s=open('$W/index.html').read();open('$W/test_$n.html','w').write(s.replace('</body>',open('$T/$n.js').read()))"
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --allow-file-access-from-files --user-data-dir=$W/profile --virtual-time-budget=${2:-30000} --dump-dom file://$W/test_$n.html 2>/dev/null | python3 -c "import sys,re;m=re.search(r'<pre id=\"out\"[^>]*>(.*?)</pre>',sys.stdin.read(),re.S);print(m.group(1) if m else 'NO OUTPUT')"
rm -rf $W/profile
