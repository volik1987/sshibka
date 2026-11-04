<pre id="out"></pre><script>
setTimeout(()=>{const out=[];const L=s=>out.push(s);
try{OPTS.mode='pvp';G.mode='pvp';newGame();
  const duel=(t)=>{const A=G.units.find(u=>u.side==='dawn'),B=G.units.find(u=>u.side==='ash');A.t=t;A.hp=TYPES[t].hp;
    G.terr[B.r][B.c]='plain';startDuel(A,B);closeModal();D.phase='fight';D.mobs=[];D.zones=[];D.bonus=[];D.f[1].x=2400;D.f[1].y=2400;return D};
  for(const t of ['ratnik','luchnica'])for(const mul of [1,2,4,5]){duel(t);const a=D.f[0];a.x=1000;a.y=1000;a.face=0;
    const o={x:a.x+(t==='ratnik'?a.r+30:300),y:1000,r:26,kind:'boulder',rot:0,hp:OBS_HP.boulder};D.obs=[o];D.nav=null;
    a.cd=[0,0];a.superArm=mul;use(a,0);a.superArm=0;for(let i=0;i<90;i++)update(1/60);
    L(`${t} ×${mul}: boulder hp ${OBS_HP.boulder} -> ${o.gone?'сломан':o.hp}`)}
}catch(e){L('ERR '+e.stack)}document.getElementById('out').textContent=out.join('\n')},1500)
</script></body>
