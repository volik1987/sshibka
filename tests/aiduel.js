<pre id="out"></pre><script>
setTimeout(()=>{const out=[];const L=s=>out.push(s);
try{
  OPTS.mode='cpu';newGame();G.mode='cpu';G.human='none';G.diff='normal';
  const res={};let errs=0;
  for(let i=0;i<40;i++){const ter=['plain','forest','rock','well'][i%4];
    const A=G.units.filter(u=>u.side==='dawn')[i%8],B=G.units.filter(u=>u.side==='ash')[(i*3)%8];
    G.terr[B.r][B.c]=ter;startDuel(A,B);closeModal();D.phase='fight';const loc=D.loc.k;let t=0;
    while(D&&D.phase!=='done'&&t<95){update(1/30);t+=1/30}
    const r=res[loc]=res[loc]||{n:0,ko:0,t:0,mobsKilled:0,obsBroken:0};r.n++;
    if(D){if(!D.timeout)r.ko++;r.t+=D.t;r.mobsKilled+=D.mobs.filter(m=>m.dead).length}
    closeModal();D=null;document.getElementById('duel').classList.remove('on')}
  for(const [k,r] of Object.entries(res))L(`${k}: ${r.n} duels, KO ${r.ko}, avg ${(r.t/r.n).toFixed(0)}s, mobs killed ${r.mobsKilled}`);
}catch(err){L('ERR '+err.message+' '+err.stack)}
document.getElementById('out').textContent=out.join('\n')},500)
</script></body>
