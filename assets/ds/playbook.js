/* Playbook reader — shared behavior for the field-playbook pages.
   Progressive enhancement over the .pb-panel track: magazine mode with
   snap-scrolled panels, prev/next, progress, long-read toggle, and print.
   Same contract as the inline original in governing-ai-in-regulated-workflows.html
   (untouched); pages need #pbTrack, .pb-panel sections, and the #pbChrome bar. */
(function(){
  var body=document.body, track=document.getElementById('pbTrack');
  if(!track) return;
  body.classList.add('js');
  var panels=[].slice.call(track.querySelectorAll('.pb-panel'));
  var bar=document.getElementById('pbBar'), ind=document.getElementById('pbInd');
  var i=0;
  function isReader(){return body.classList.contains('pb-reader');}
  function curIndex(){ if(!isReader()) return i; var w=track.clientWidth||1; return Math.round(track.scrollLeft/w); }
  function update(){ var c=curIndex(); i=c; if(bar) bar.style.width=(((c+1)/panels.length)*100)+'%'; if(ind) ind.textContent=(panels[c].getAttribute('data-label')||'')+'  ·  '+(c+1)+' / '+panels.length; }
  function go(n){ n=Math.max(0,Math.min(panels.length-1,n)); i=n; if(isReader()){ panels[n].scrollIntoView({behavior:'smooth',inline:'start',block:'nearest'}); } else { panels[n].scrollIntoView({behavior:'smooth',block:'start'}); } setTimeout(update,40); }
  function setReader(on){ if(on) body.classList.add('pb-reader'); else body.classList.remove('pb-reader'); update(); }
  document.getElementById('pbPrev').onclick=function(){go(i-1);};
  document.getElementById('pbNext').onclick=function(){go(i+1);};
  document.getElementById('pbLong').onclick=function(){ var c=curIndex(); setReader(false); setTimeout(function(){ if(panels[c]) panels[c].scrollIntoView({block:'start'}); },20); };
  document.getElementById('pbEnter').onclick=function(){ setReader(true); go(i); };
  document.getElementById('pbDl').onclick=function(){ var was=isReader(); if(was) body.classList.remove('pb-reader'); window.print(); if(was) setTimeout(function(){ body.classList.add('pb-reader'); update(); },400); };
  var t; track.addEventListener('scroll',function(){ if(!isReader())return; clearTimeout(t); t=setTimeout(update,70); });
  document.addEventListener('keydown',function(e){ if(!isReader())return; if(e.key==='ArrowRight'||e.key==='PageDown'){e.preventDefault();go(i+1);} else if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();go(i-1);} });
  [].slice.call(document.querySelectorAll('a[href^="#"]')).forEach(function(a){ a.addEventListener('click',function(e){ var id=a.getAttribute('href').slice(1); if(!id) return; var el=document.getElementById(id); if(!el) return; var p=el.classList.contains('pb-panel')?el:el.closest('.pb-panel'); if(p && panels.indexOf(p)>=0){ e.preventDefault(); go(panels.indexOf(p)); } }); });
  setReader(window.innerWidth>=760);
  update();
})();
