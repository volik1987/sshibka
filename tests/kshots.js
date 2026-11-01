<pre id="out"></pre><script>
// кадры поединка королей: печатает dataURL холста по одному на строку (tests/run.sh tests/kshots.js | ...)
setTimeout(()=>{const out=[];
try{
  OPTS.mode='pvp';newGame();closeModal();
  const shot=()=>{draw();out.push(cv.toDataURL('image/jpeg',.8))};
  const st=n=>{for(let i=0;i<n;i++)update(1/60)};
  for(const [fin,t] of [[null,0],[1,.9],[2,1.6],[6,1.0],[8,.7]]){
    const a=G.units.find(u=>u.t==='arhangel'),d=G.units.find(u=>u.t==='demon');a.hp=maxHp(a);d.hp=maxHp(d);
    startDuel(a,d);closeModal();D.phase='fight';const A=D.f[0],E=D.f[1];A.x=W*.4;E.x=W*.6;
    if(fin==null){A.atk={k:'kick',t:.2,hit:true};E.block=true;E.pose=4;st(1);A.atk={k:'kick',t:.2,hit:true};D.f[1].pose=4;draw();out.push(cv.toDataURL('image/jpeg',.8));continue}
    E.hp=0;D.phase='finish';A.x=fin===6?W*.15:W*.4;kFinish(A,E,KFIN[fin]);st(Math.round(t*60));shot()}
  // портал короля в обычном бою (вид сверху)
  for(const tt of [.5,2.5]){const A=G.units.find(u=>u.t==='demon'),B=G.units.find(u=>u.side==='dawn'&&!TYPES[u.t].leader);A.hp=maxHp(A);G.terr[A.r][A.c]='plain';startDuel(B,A);closeModal();D.phase='fight';D.mobs=[];
    const k=D.f[1],e=D.f[0];k.x=1280;k.y=1280;e.x=1560;e.y=1280;k.face=0;e.face=Math.PI;doSuper(k,SUPER.sum,0);st(Math.round(tt*60));D.solo=true;k.away=false;e.away=true;shot()}
}catch(err){out.push('ERR '+err.message+' '+err.stack)}
document.getElementById('out').textContent=out.join('\n')},1500)
</script></body>
