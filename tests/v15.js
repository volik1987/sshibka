<pre id="out"></pre><script>
// v15: яд, огненная стрела, домики, вулкан, поединок королей
setTimeout(()=>{const out=[];const L=s=>out.push(s);
try{
  OPTS.mode='pvp';G.mode='pvp';newGame();
  L('volcano cells: '+G.terr.flat().filter(t=>t==='volcano').length);
  const step=(n,dt=1/60)=>{for(let i=0;i<n;i++){update(dt);if(!D)break}};
  const duel=(a,b,ter)=>{const A=G.units.find(u=>u.side==='dawn'&&!TYPES[u.t].leader),B=G.units.find(u=>u.side==='ash'&&!TYPES[u.t].leader);A.t=a;B.t=b;A.hp=TYPES[a].hp;B.hp=TYPES[b].hp;
    G.terr[B.r][B.c]=ter||'plain';startDuel(A,B);closeModal();D.phase='fight';return D};
  // яд копится
  duel('ratnik','ratnik');D.obs=[];D.mobs=[];let t=D.f[1];t.hp=t.max=999;
  addPoison(t,3,3,D.f[0]);step(60);const d1=999-t.hp;t.hp=999;for(let i=0;i<4;i++)addPoison(t,3,3,D.f[0]);step(60);const d5=999-t.hp;
  L(`poison 1 stack ${d1.toFixed(1)}/s, 5 stacks ${d5.toFixed(1)}/s, pois=${t.pois}`);
  // огненная и отравленная стрелы
  duel('luchnica','goblin');D.obs=[];D.mobs=[];let a=D.f[0],e=D.f[1];a.x=1000;a.y=1000;a.face=0;e.x=1300;e.y=1000;e.hp=e.max=999;use(a,1);step(60);
  L(`fire arrow dmg ${(999-e.hp).toFixed(1)} fires ${D.fires.length}`);
  a.hp=a.max=999;e.x=1300;e.face=Math.PI;use(e,1);step(40);L(`poison arrow: pois=${a.pois} dmg ${(999-a.hp).toFixed(1)}`);
  // портал не лечит отравленного
  // домик
  duel('elf','ratnik');D.mobs=[];a=D.f[0];e=D.f[1];D.obs=[{x:1000,y:1000,r:70,kind:'house1',rot:0,hp:99}];a.x=1000;a.y=1000;step(2);
  L('in house: '+(a.house===D.obs[0]));e.x=1300;e.y=1000;e.hp=e.max=999;a.face=0;a.cd[1]=0;use(a,1);step(60);L('shot from house dmg '+(999-e.hp).toFixed(1));
  // вулкан
  duel('ratnik','ratnik','volcano');D.mobs=[];a=D.f[0];a.hp=a.max=999;D.f[1].hp=D.f[1].max=999;step(60*14);
  L(`volcano: loc ${D.loc.n}, dmg me ${(999-a.hp).toFixed(1)}, foe ${(999-D.f[1].hp).toFixed(1)}`);
  draw();L('draw volcano ok');
  // портал короля в обычном бою
  {const A=G.units.find(u=>u.t==='arhangel'),B=G.units.find(u=>u.side==='ash'&&!TYPES[u.t].leader);B.t='ratnik';B.hp=TYPES.ratnik.hp;A.hp=maxHp(A);G.terr[B.r][B.c]='plain';
   startDuel(A,B);closeModal();D.phase='fight';D.obs=[];D.mobs=[];const k=D.f[0],e=D.f[1];k.x=1000;k.y=1000;e.x=1350;e.y=1000;e.hp=e.max=999;k.face=0;
   keys.add('KeyZ');step(2);keys.delete('KeyZ');step(60);const al=D.mobs.filter(m=>m.ally==='dawn').length;
   keys.add('KeyZ');step(2);keys.delete('KeyZ');step(2);L(`summon: allies ${al}, second press allies ${D.mobs.filter(m=>m.ally).length} sumCd ${k.sumCd.toFixed(1)} st ${k.st.toFixed(0)}`);
   k.cd[1]=0;use(k,1);step(2);L('own wave spared allies: '+D.mobs.filter(m=>!m.dead).length);
   step(60*5);L(`allies hurt enemy ${(999-e.hp).toFixed(1)}`);e.face=Math.PI;const m0=D.mobs.find(m=>!m.dead);if(m0){m0.x=e.x-40;m0.y=e.y;e.cd[0]=0;use(e,0);step(10);L('enemy hits ally: '+(m0.hp<m0.max))}
   step(60*8);L('after 13s allies left '+D.mobs.filter(m=>!m.dead).length);
   draw();finishDuel()}
  {const B=G.units.find(u=>u.side==='ash'&&!TYPES[u.t].leader),A=G.units.find(u=>u.side==='dawn'&&!TYPES[u.t].leader);startDuel(A,B);closeModal();D.phase='fight';const f=D.f[0];
   for(const c of ['KeyS','KeyW','KeyS']){keys.add(c);step(2);keys.delete(c);step(2)}keys.add('KeyF');step(2);keys.delete('KeyF');step(5);L('non-king dd+F allies: '+D.mobs.filter(m=>m.ally).length+' cd0 '+(f.cd[0]>0));finishDuel()}
  // поединок королей
  const K1=G.units.find(u=>u.t==='arhangel'),K2=G.units.find(u=>u.t==='demon');
  startDuel(K1,K2);L('kings mode: '+!!D.kings+' modal combos '+document.querySelectorAll('.kl tr').length);closeModal();D.phase='fight';
  a=D.f[0];e=D.f[1];a.x=500;e.x=640;
  const press=(k,n=3)=>{keys.add(k);step(n);keys.delete(k);step(3)};
  const hp0=e.hp;press('KeyF');step(30);L(`strike ${(hp0-e.hp).toFixed(1)}`);
  e.stun=0;a.x=400;e.x=900;a.seq=[];press('KeyA');press('KeyD');L('seq '+JSON.stringify(a.seq)+' face '+a.face+' spc '+a.spc);press('KeyF');L('atk '+JSON.stringify(a.atk)+' proj '+D.proj.length);step(80);L(`bf+a cast: proj ${D.proj.length} hp ${e.hp.toFixed(0)}`);
  // защита
  e.stun=0;a.x=500;e.x=640;keys.add('KeyS');step(3);const h1=a.hp;e.face=-1;e.atk=null;keys.add('Slash');step(3);keys.delete('Slash');step(40);keys.delete('KeyS');
  L(`blocked kick took ${(h1-a.hp).toFixed(2)}, block=${a.block}`);
  // добивание
  a.x=500;e.x=640;e.hp=1;a.atk=null;a.stun=0;a.spc=0;press('KeyF');step(30);L('phase after KO hit: '+D.phase);
  a.seq=[];press('KeyD');press('KeyD');press('KeyS');press('KeyF');L('fin: '+D.phase+' '+(D.fin&&D.fin.n));step(60*5);L('after fatal: '+D.phase+' dead '+e.dead);
  draw();step(60*2);L('phase '+D.phase+' modal '+(ovc.textContent.slice(0,40)));
  // компьютер против компьютера
  finishDuel();
  OPTS.mode='cpu';newGame();G.mode='cpu';G.human='dawn';G.diff='hard';const K3=G.units.find(u=>u.t==='arhangel'),K4=G.units.find(u=>u.t==='demon');
  if(K3&&K4){K3.hp=maxHp(K3);K4.hp=maxHp(K4);startDuel(K3,K4);closeModal();D.phase='fight';D.f[0].ai={P:DIFF.hard,t:.3,o:{mx:0,my:0,a:false,b:false,blk:false},fw:0};
    let n=0;while(D&&D.phase!=='done'&&n<60*100){update(1/60);if(n%10===0)draw();n++}L(`ai vs ai: ${n/60|0}s phase ${D&&D.phase} hp ${D&&D.f.map(f=>Math.ceil(f.hp)).join('/')} fin ${D&&D.fin&&D.fin.n}`)}
  else L('kings missing after first duel');
}catch(err){L('ERR '+err.message+' '+err.stack)}
document.getElementById('out').textContent=out.join('\n')},500)
</script></body>
