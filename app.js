'use strict';
(() => {
 const key='entangled-park-watched-v1';
 const rows=[...document.querySelectorAll('.video')];
 const list=document.querySelector('#videos');
 const search=document.querySelector('#search');
 const sort=document.querySelector('#sort');
 const hide=document.querySelector('#hide-watched');
 let saved=new Set(), storageAvailable=true, filter='all';
 try{const data=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(data))saved=new Set(data.filter(id=>rows.some(r=>r.dataset.id===id)));}catch{storageAvailable=false;}
 const inputs=[...document.querySelectorAll('[data-watch]')];
 for(const input of inputs)input.checked=saved.has(input.dataset.watch);
 function progress(){
  for(const row of rows)row.classList.toggle('is-watched',saved.has(row.dataset.id));
  document.querySelector('#progress-text').textContent=`${saved.size} / ${rows.length} 완료`;
  const chronological=[...rows].sort((a,b)=>Number(a.dataset.order)-Number(b.dataset.order));
  const next=chronological.find(r=>!saved.has(r.dataset.id));
  const link=document.querySelector('#next-link');
  document.querySelector('#resume-heading').textContent=next?(saved.size?'다음 영상을 이어보세요':'첫 영상부터 시작하세요'):'모든 영상을 시청했습니다';
  document.querySelector('#next-title').textContent=next?next.querySelector('.video-title a').textContent:'17편의 여정을 마쳤어요.';
  document.querySelector('#next-meta').textContent=next?`${next.querySelector('.duration').textContent} · ${next.querySelector('time').textContent}`:'필요한 강의를 다시 찾아보세요.';
  if(next){link.href=next.querySelector('a').href;link.textContent='YouTube에서 시청';link.target='_blank';link.rel='noopener noreferrer';}
  else{link.href='#library';link.textContent='전체 목록 보기';link.removeAttribute('target');}
  document.querySelector('#reset-progress').hidden=saved.size===0;
  if(!storageAvailable)document.querySelector('#storage-note').textContent='브라우저 저장이 제한되어 이번 방문 중에만 기록됩니다.';
 }
 function render(){
  const query=search.value.trim().toLocaleLowerCase().normalize('NFKC');
  const ordered=[...rows].sort((a,b)=>sort.value==='lecture'?Number(a.dataset.lecture)-Number(b.dataset.lecture):sort.value==='newest'?Number(b.dataset.order)-Number(a.dataset.order):Number(a.dataset.order)-Number(b.dataset.order));
  let count=0;
  for(const row of ordered){row.hidden=!(row.dataset.search.normalize('NFKC').includes(query)&&(filter==='all'||row.dataset.group===filter)&&(!hide.checked||!saved.has(row.dataset.id)));if(!row.hidden)count++;list.append(row);}
  document.querySelector('#result').textContent=count===rows.length?`${count}편`:`${count} / ${rows.length}편`;
  document.querySelector('#empty').hidden=count>0;
  document.querySelector('#clear').hidden=!(query||filter!=='all'||hide.checked);
  for(const button of document.querySelectorAll('[data-filter]')){const active=button.dataset.filter===filter;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));}
 }
 function reset(){search.value='';filter='all';hide.checked=false;render();}
 for(const input of inputs)input.addEventListener('change',()=>{input.checked?saved.add(input.dataset.watch):saved.delete(input.dataset.watch);try{localStorage.setItem(key,JSON.stringify([...saved]));}catch{storageAvailable=false;}progress();render();});
 search.addEventListener('input',render);sort.addEventListener('change',render);hide.addEventListener('change',render);
 for(const button of document.querySelectorAll('[data-filter]'))button.addEventListener('click',()=>{filter=button.dataset.filter;render();});
 for(const button of document.querySelectorAll('[data-path]'))button.addEventListener('click',()=>{filter=button.dataset.path;search.value='';hide.checked=false;render();document.querySelector('#library').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});search.focus({preventScroll:true});});
 document.querySelector('#clear').addEventListener('click',reset);document.querySelector('#reset').addEventListener('click',reset);
 document.querySelector('#reset-progress').addEventListener('click',()=>{if(!confirm('이 브라우저의 시청 완료 기록을 모두 지울까요?'))return;saved.clear();for(const input of inputs)input.checked=false;try{localStorage.removeItem(key);}catch{storageAvailable=false;}progress();render();});
 document.querySelector('#controls').hidden=false;document.querySelector('#filter-bar').hidden=false;
 progress();render();
})();
