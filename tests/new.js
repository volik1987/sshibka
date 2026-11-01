<pre id="out"></pre><script>
setTimeout(()=>{const out=[];const L=s=>out.push(s);
try{
  OPTS.mode='pvp';G.mode='pvp';
  // выбор армий
  OPTS.army={dawn:['mohnach','elf'],ash:[]};newGame();
  const row=G.units.filter(u=>u.side==='dawn'&&!u.pawn).map(u=>u.t);L('dawn row: '+row.join(','));
  L('army ok: '+(row.includes('mohnach')&&row.includes('elf')));
  showArmy(false);L('army modal picks: '+document.querySelectorAll('.pick').length);armyToggle('ash','x',false);closeModal();
  showMenu(false);L('menu has army: '+(ovc.innerHTML.includes('Выбрать бойцов')));closeModal();
  const step=(n,dt=1/60)=>{for(let i=0;i<n;i++){update(dt);if(!D)break}};
  const duel=(a,b,ter)=>{const A=G.units.find(u=>u.side==='dawn'),B=G.units.find(u=>u.side==='ash');A.t=a;B.t=b;A.hp=TYPES[a].hp;B.hp=TYPES[b].hp;
    G.terr[B.r][B.c]=ter||'plain';startDuel(A,B);closeModal();D.phase='fight';return D};
  // выносливость
  duel('ratnik','ratnik');D.obs=[];D.mobs=[];let f=D.f[0];f.x=600;f.y=1280;keys.add('KeyD');const x0=f.x;step(60);const v1=f.x-x0;
  f.st=0;const x1=f.x;step(60);const v2=f.x-x1;keys.clear();L(`stamina fresh ${v1.toFixed(0)} tired ${v2.toFixed(0)} st=${f.st.toFixed(0)}`);
  step(120);L('regen st='+f.st.toFixed(1));
  // приёмы
  const combo=(seq,btn)=>{duel('ratnik','ratnik');D.obs=[];D.mobs=[];const a=D.f[0],e=D.f[1];a.x=1000;a.y=1000;e.x=1050;e.y=1000;e.hp=e.max=9999;
    const K={l:'KeyA',r:'KeyD',u:'KeyW',d:'KeyS'};for(const c of seq){keys.add(K[c]);step(2);keys.delete(K[c]);step(2)}
    a.face=0;a.x=1000;a.y=1000;e.x=1050;e.y=1000;keys.add(btn);step(2);const bl=a.blockT;keys.delete(btn);step(60);return {dmg:9999-e.hp,st:a.st,block:bl}};
  const base=combo('','KeyF');L('base dmg '+base.dmg.toFixed(1));
  for(const [s,b] of [['lr','KeyF'],['lrlr','KeyF'],['lurd','KeyF'],['lr','KeyG']]){const r=combo(s,b);L(`${s}+${b}: dmg ${r.dmg.toFixed(1)} st ${r.st.toFixed(0)} block ${r.block.toFixed(2)}`)}
  for(const k of ['KeyE','KeyR','KeyT','KeyQ','KeyU']){const r=combo('',k);L(`btn ${k}: dmg ${r.dmg.toFixed(1)} st ${r.st.toFixed(0)} block ${r.block.toFixed(2)}`)}
  {duel('ratnik','ratnik');D.obs=[];D.mobs=[];const a=D.f[0];a.x=1000;a.y=1000;a.face=0;D.f[1].x=2300;D.f[1].y=2300;keys.add('ShiftLeft');step(2);keys.delete('ShiftLeft');step(20);L(`dash moved ${(a.x-1000).toFixed(0)} st ${a.st.toFixed(0)}`)}
  // дальний снаряд
  duel('elf','ratnik');D.obs=[];D.mobs=[];f=D.f[0];f.x=200;f.y=1280;f.face=0;D.f[1].x=2400;D.f[1].y=1280;D.f[1].hp=D.f[1].max=999;use(f,1);const pl=D.proj[0]&&D.proj[0].life;step(300);L(`far life ${pl} hit far enemy: ${(999-D.f[1].hp).toFixed(1)}`);
  // разрушение
  duel('ratnik','ratnik');D.mobs=[];f=D.f[0];f.x=1000;f.y=1000;f.face=0;D.f[1].x=2300;D.f[1].y=2300;
  D.obs=[{x:1060,y:1000,r:30,kind:'boulder',rot:0,hp:4}];let n=0;while(D.obs.length&&n<10){f.cd[0]=0;use(f,0);step(40);n++}L('boulder broke after '+n+' hits, left '+D.obs.length);
  // локации
  const cnt={};for(let i=0;i<40;i++){const ter=['plain','forest','rock','well'][i%4];const ar=genArena(ter);cnt[ar.loc.k]=(cnt[ar.loc.k]||0)+1;
    if(ar.loc.k==='maze'&&!cnt.mz){cnt.mz=ar.obs.length}}
  L('locs '+JSON.stringify(cnt));
  // мобы
  let mk=0,mh=0;for(let t=0;t<20&&!mk;t++){duel('ratnik','ratnik','plain');if(D.mobs.length){mk=D.mobs.length;const m=D.mobs[0];f=D.f[0];f.x=m.x-60;f.y=m.y;f.face=0;const hp0=f.hp;step(240);mh=hp0-f.hp;
    let k=0;while(!m.dead&&k<20){f.x=m.x-50;f.y=m.y;f.face=0;f.cd[0]=0;use(f,0);step(30);k++}L(`mobs ${mk} (${D.loc.n}) hurt me ${mh.toFixed(1)}, killed in ${k}: ${m.dead}`)}}
  // Мохнач
  duel('mohnach','ratnik');D.obs=[];D.mobs=[];f=D.f[0];const e=D.f[1];f.x=1000;f.y=1000;f.face=0;e.x=1200;e.y=1000;e.hp=e.max=999;use(f,1);step(60);L('jump dmg '+(999-e.hp).toFixed(1)+' cd '+f.cd[1].toFixed(1));
  e.x=1040;e.y=1000;f.x=1000;f.face=0;const h2=e.hp;use(f,0);step(30);L(`paw dmg ${(h2-e.hp).toFixed(1)}`);
  draw();L('draw ok');
}catch(err){L('ERR '+err.message+' '+err.stack)}
document.getElementById('out').textContent=out.join('\n')},500)
</script></body>
