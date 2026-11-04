<pre id="out"></pre><script>
setTimeout(()=>{const out=[];const L=s=>out.push(s);
try{
  OPTS.mode='pvp';G.mode='pvp';newGame();
  const step=(n,dt=1/60)=>{for(let i=0;i<n;i++){update(dt);draw&&draw();if(!D)break}};
  const duel=()=>{const A=G.units.find(u=>u.side==='dawn'),B=G.units.find(u=>u.side==='ash');A.t='ratnik';B.t='ratnik';A.hp=TYPES.ratnik.hp;B.hp=TYPES.ratnik.hp;
    G.terr[B.r][B.c]='plain';startDuel(A,B);closeModal();D.phase='fight';D.obs=[];D.mobs=[];D.zones=[];return D};
  const K={l:'KeyA',r:'KeyD',u:'KeyW',d:'KeyS'};
  const type=s=>{for(const c of s){keys.add(K[c]);step(3);keys.delete(K[c]);step(3)}};
  const hitNow=btn=>{const a=D.f[0],e=D.f[1];a.face=0;a.x=1000;a.y=1000;e.x=1050;e.y=1000;const h0=e.hp;keys.add(btn);step(2);const bl=a.blockT;keys.delete(btn);step(40);return {dmg:h0-e.hp,bl}};
  const run=sec=>{keys.add('KeyD');step(sec*30);keys.delete('KeyD');keys.add('KeyW');step(sec*30);keys.delete('KeyW')};
  // базовый удар
  duel();let a=D.f[0];D.f[1].hp=D.f[1].max=99999;const base=hitNow('KeyF').dmg;L('base '+base.toFixed(1));
  for(const [s,m] of [['lr',2],['lrlr',4],['lurd',5]]){duel();a=D.f[0];D.f[1].hp=D.f[1].max=99999;a.cd=[0,0];type(s);const ch=a.chA&&a.chA.mul;
    run(3);const st0=a.st;const r=hitNow('KeyF');L(`${s}: charged ${ch} after run still ${!!a.chA===false} dmg x${(r.dmg/base).toFixed(1)} want ${m} stam -${(st0-a.st).toFixed(0)}`)}
  // без заряда — обычный удар
  duel();a=D.f[0];D.f[1].hp=D.f[1].max=99999;run(1);L('plain after run x'+(hitNow('KeyF').dmg/base).toFixed(1));
  // блок
  duel();a=D.f[0];type('du');L('block charged '+!!a.chB);run(2);L('blockT before '+a.blockT.toFixed(2));const rb=hitNow('KeyG');L('blockT on press '+rb.bl.toFixed(2)+' chB left '+!!a.chB);
  // ×2 потом ×4 = апгрейд
  duel();a=D.f[0];type('lr');const c1=a.chA.mul;type('lr');L(`upgrade ${c1} -> ${a.chA&&a.chA.mul}`);
  // ×5 не понижается до ×2
  duel();a=D.f[0];type('lurd');type('lr');L('no downgrade '+(a.chA&&a.chA.mul));
  // истечение
  duel();a=D.f[0];type('lr');step(60*(CHARGE_T+0.5));L('expired '+(a.chA===null));
  // мало сил
  duel();a=D.f[0];a.st=5;type('lurd');L('no stamina charge '+!!a.chA);
}catch(e){L('ERR '+e.stack)}
document.getElementById('out').textContent=out.join('\n')},1500)
</script></body>
