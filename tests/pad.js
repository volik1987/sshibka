<pre id="out"></pre><script>
setTimeout(()=>{const out=[];try{
  const pad=on=>({axes:[0,0,0,0],buttons:[...Array(17)].map((_,i)=>({pressed:i===on}))});
  for(const [n,b] of [['✕',0],['○',1],['□',2],['△',3],['L1',4],['R1',5],['L2',6],['R2',7]]){PADS=[pad(b),null];const r=padInput(0);out.push(n+': '+Object.entries(r).filter(([k,v])=>v===true).map(([k])=>k).join(','))}
}catch(e){out.push('ERR '+e.message)}document.getElementById('out').textContent=out.join('\n')},400)
</script></body>
