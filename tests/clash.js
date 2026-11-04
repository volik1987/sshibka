<pre id="out"></pre><script>
setTimeout(()=>{const out=[];const L=s=>out.push(s);
try{OPTS.mode='pvp';G.mode='pvp';newGame();
  const duel=(ta,tb)=>{const A=G.units.find(u=>u.side==='dawn'),B=G.units.find(u=>u.side==='ash');A.t=ta;B.t=tb;A.hp=TYPES[ta].hp;B.hp=TYPES[tb].hp;
    G.terr[B.r][B.c]='plain';startDuel(A,B);closeModal();D.phase='fight';D.obs=[];D.mobs=[];D.zones=[];D.bonus=[];return D};
  const shoot=(f,mul)=>{f.cd=[0,0];f.superArm=mul;use(f,0);f.superArm=0};
  for(const [ma,mb] of [[1,1],[5,1],[1,4],[2,1]]){
    duel('luchnica','goblin');const a=D.f[0],b=D.f[1];a.x=800;a.y=1000;a.face=0;b.x=1500;b.y=1000;b.face=Math.PI;a.home=b.home=false;a.dmgK=b.dmgK=1;
    a.hp=a.max=b.hp=b.max=9999;shoot(a,ma);shoot(b,mb);const n0=D.proj.length;const d0=D.proj.map(p=>p.dmg.toFixed(1)).join('/');
    let met=null;for(let i=0;i<120;i++){update(1/60);if(!met&&D.proj.length<n0)met={left:D.proj.map(p=>(p.owner===a?'A':'B')+p.dmg.toFixed(1)).join(',')}}
    L(`A×${ma} vs B×${mb}: dmg ${d0} -> after clash ${met?met.left||'none':'no clash'}; A lost ${(9999-a.hp).toFixed(1)} B lost ${(9999-b.hp).toFixed(1)}`)}
}catch(e){L('ERR '+e.stack)}document.getElementById('out').textContent=out.join('\n')},1500)
</script></body>
