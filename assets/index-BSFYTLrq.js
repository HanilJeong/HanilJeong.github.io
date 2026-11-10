(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`VOID/OS 98`,t=`0.1.0 (build 1999.13)`,n=`HANIL JEONG`,r=[{id:`grey`,name:`Retro Grey`},{id:`dark`,name:`Dark Menubar`},{id:`gradient`,name:`Gradient`}],i=[{name:`Teal Static`,css:`radial-gradient(#2c8a84 1px, transparent 1.5px) 0 0 / 4px 4px, #1f6f6b`},{name:`Sunset 1999`,css:`linear-gradient(#2b1055 0%, #7a1d6e 45%, #d53369 75%, #ffb36b 100%)`},{name:`Bubblegum Checker`,css:`repeating-conic-gradient(#f4a6c6 0 25%, #f9c9dc 0 50%) 0 0 / 16px 16px`},{name:`Grid Abyss`,css:`linear-gradient(#4cc9f033 1px, transparent 1px) 0 0 / 32px 32px, linear-gradient(90deg, #4cc9f033 1px, transparent 1px) 0 0 / 32px 32px, #0a0a1a`}],a=`https://pub-cf301a052334496f8c6e51e2142883fa.r2.dev`,o=e=>a+e,s={id:`about`,title:`About ${e}`,desktopLabel:`About`,icon:`/icons/void.svg`,width:420,height:260,minWidth:300,minHeight:220,singleInstance:!0,mount(n){n.innerHTML=`
      <div class="about">
        <img class="about-logo" src="/icons/void.svg" alt="" width="64" height="64" />
        <div>
          <h1 class="about-name">${e}</h1>
          <p class="about-version">Version ${t}</p>
          <p>
            Welcome. This is an operating system that never existed, running
            inside a web page that might not exist either.
          </p>
          <p>
            Placeholder text: the story of ${e} will be written here
            one day, when the system remembers it.
          </p>
          <div class="about-memory">
            <span>Memory:</span>
            <div class="about-meter bevel-in"><div class="about-meter-fill"></div></div>
            <span>640K / &infin;</span>
          </div>
        </div>
      </div>
    `}};function c(e,t,n){return Math.min(Math.max(e,t),n)}var l=(e,t=[])=>({type:`folder`,name:e,children:t}),u=(e,t)=>({type:`file`,name:e,content:t}),d=l(`C:`,[l(`System`,[u(`kernel.void`,`BINARY DATA

01110110 01101111 01101001 01100100

(it is looking back at you)`),u(`boot.log`,`[ OK ] Mounted dreams
[ OK ] Started clock (approximate)
[WARN] Mouse has feelings
[ OK ] Ready.`),l(`Drivers`,[u(`mouse_feelings.sys`,`Driver for mice that would rather not be clicked so hard.`),u(`speaker_whispers.drv`,`Lowers the volume of things you were not meant to hear.`)])]),l(`My Documents`,[u(`todo.txt`,`1. Water the pixels
2. Defragment feelings
3. Find where the Recycle Bin goes`),u(`letter_to_future.txt`,`Dear future,

Are windows still square?

Yours, 1999`),l(`Poems`,[u(`haiku.txt`,`blue screen at midnight
the cursor blinks, then it waits
so do I, so do I`)])]),l(`Secrets`,[u(`do_not_open.txt`,`You opened it.

That is fine. Nobody is watching.

Probably.`),l(`Deeper`,[l(`Deepest`,[u(`nothing.txt`,``)])])]),l(`Recycle Bin`),u(`readme.txt`,`Thank you for choosing VOID/OS 98.

No warranty is given, implied, or understood.`)]),f={id:`file-explorer`,title:`File Explorer`,icon:`/icons/computer.svg`,width:540,height:380,minWidth:320,minHeight:220,mount(e,{setTitle:t}){let n=[d];e.innerHTML=`
      <div class="explorer">
        <div class="explorer-toolbar">
          <button class="btn" data-action="up">&uarr; Up</button>
          <label class="explorer-address">
            <span>Address</span>
            <input class="bevel-in" data-testid="explorer-path" readonly />
          </label>
        </div>
        <div class="explorer-main">
          <ul class="explorer-items bevel-in" data-testid="explorer-items"></ul>
          <section class="explorer-preview bevel-in" hidden>
            <header class="explorer-preview-name"></header>
            <pre class="explorer-preview-content"></pre>
          </section>
        </div>
        <div class="explorer-status bevel-in"></div>
      </div>
    `;let r=e.querySelector(`[data-action="up"]`),i=e.querySelector(`.explorer-address input`),a=e.querySelector(`.explorer-items`),o=e.querySelector(`.explorer-preview`),s=e.querySelector(`.explorer-status`);r.addEventListener(`click`,()=>{n.length>1&&n.pop(),l()});function c(e){e.type===`folder`?(n.push(e),l()):(o.hidden=!1,o.querySelector(`.explorer-preview-name`).textContent=e.name,o.querySelector(`.explorer-preview-content`).textContent=e.content||`(this file is empty, or pretending to be)`)}function l(){let e=n.at(-1);i.value=n.map(e=>e.name).join(`\\`)+`\\`,r.disabled=n.length===1,o.hidden=!0,t(`File Explorer - ${e.name}`);let l=e.children.map(e=>{let t=document.createElement(`li`),n=document.createElement(`button`);return n.className=`explorer-item`,n.innerHTML=`<img src="/icons/${e.type}.svg" alt="" width="32" height="32" /><span></span>`,n.querySelector(`span`).textContent=e.name,n.addEventListener(`click`,()=>u(n)),n.addEventListener(`dblclick`,()=>c(e)),n.addEventListener(`keydown`,t=>{t.key===`Enter`&&c(e)}),t.append(n),t});if(l.length===0){let e=document.createElement(`li`);e.className=`explorer-empty`,e.textContent=`This folder is empty. Or is it?`,l.push(e)}a.replaceChildren(...l),s.textContent=`${e.children.length} object(s)`}function u(e){for(let t of a.querySelectorAll(`.explorer-item`))t.classList.toggle(`is-selected`,t===e)}l()}},p=`Hanil Jeong`,m=(e,t,n)=>({type:`track`,title:e,artist:t,src:o(n)}),h=l(`Music`,[l(`Tracks`,[m(`Start Happy`,p,`/audio/tracks/start-happy.m4a`),m(`Middle Delusion`,p,`/audio/tracks/middle-delusion.m4a`),m(`Ending Sad`,p,`/audio/tracks/ending-sad.m4a`),m(`SpeedCore Voice`,p,`/audio/tracks/speedcore-voice.m4a`),m(`Speed Parade 2025`,p,`/audio/tracks/speed-parade-2025.m4a`),m(`Mardi Gras`,p,`/audio/tracks/mardi-gras.m4a`),m(`Hanil Jeong & Charlie Waridel`,p,`/audio/tracks/hanil-jeong-and-charlie-waridel.m4a`)]),l(`Riceboy Dreams`,[m(`Granddad`,p,`/audio/riceboy-dreams/granddad.m4a`),m(`Mom Child Dream`,p,`/audio/riceboy-dreams/mom-child-dream.m4a`),m(`Milk UN`,p,`/audio/riceboy-dreams/milk-un.m4a`),m(`The Knight`,p,`/audio/riceboy-dreams/the-knight.m4a`),m(`Riceboy`,p,`/audio/riceboy-dreams/riceboy.m4a`),m(`Ending`,p,`/audio/riceboy-dreams/ending.m4a`)]),l(`Live Performances`,[m(`Live Unsorted`,p,`/audio/live-performances/live-unsorted.m4a`),m(`DASDASDAS`,p,`/audio/live-performances/dasdasdas.m4a`),m(`Live Praha`,p,`/audio/live-performances/live-praha.m4a`)]),l(`Mixes`,[m(`Computer Cadet 8`,p,`/audio/mixes/computer-cadet-8.m4a`),m(`Hanil B2B Pris`,p,`/audio/mixes/hanil-b2b-pris.m4a`),m(`VGM Eulogy Part 1`,p,`/audio/mixes/vgm-eulogy-part-1.m4a`),m(`VGM Mixes Curation`,p,`/audio/mixes/vgm-mixes-curation.m4a`),m(`SESH`,p,`/audio/mixes/sesh.m4a`),m(`DAS`,p,`/audio/mixes/das.m4a`),m(`Render 5`,p,`/audio/mixes/render-5.m4a`)]),l(`Podcasts`,[m(`Interview`,p,`/audio/podcasts/interview.m4a`)]),l(`Others`,[m(`Ridge Racers 2 Special Megamix`,`Various`,`/audio/others/ridge-racers-2-special-megamix.m4a`),m(`DJ Mixed by Hiroshi Okubo`,`Various`,`/audio/others/dj-mixed-by-hiroshi-okubo.m4a`),m(`Lucy In The Sky With Dynamites`,`Various`,`/audio/others/lucy-in-the-sky-with-dynamites.m4a`)])]),g=ee([`#ff71ce`,`#b967ff`,`#01cdfe`,`#05ffa1`,`#fffb96`]),_=new WeakMap;function v(e,t,{cx:n,cy:r,warp:i,light:a}){let{width:o,height:s}=e.canvas,c=_.get(e);c&&c.width===o&&c.height===s||(c=e.createImageData(o,s),_.set(e,c));let l=c.data;for(let e=0;e<s;e++)for(let s=0;s<o;s++){let c=Math.sin(s*.18+t)+Math.sin(e*.22-t*1.3)+Math.sin((s+e)*.12+t*.7)+Math.sin(Math.hypot(s-n,e-r)*i-t*2.5),[u,d,f]=g[Math.floor((c+4)*32+t*40)&255],p=(e*o+s)*4;l[p]=u*a,l[p+1]=d*a,l[p+2]=f*a,l[p+3]=255}e.putImageData(c,0,0)}function ee(e){let t=e.map(e=>[1,3,5].map(t=>parseInt(e.slice(t,t+2),16)));return Array.from({length:256},(e,n)=>{let r=n/256*t.length,i=t[Math.floor(r)],a=t[(Math.floor(r)+1)%t.length],o=r%1;return i.map((e,t)=>e+(a[t]-e)*o)})}var y=[`#ff71ce`,`#b967ff`,`#01cdfe`,`#05ffa1`,`#fffb96`],b=`#050a08`,x=[{name:`PLASMA`,draw:w},{name:`BARS`,draw:re},{name:`SCOPE`,draw:E},{name:`RINGS`,draw:ie}],S=e=>e.length/2,C=e=>(e[0]+e[1]+e[2]+e[3])/1020;function te(e,t,n){let{width:r,height:i}=e.canvas;e.globalAlpha=t?1:n,e.fillStyle=b,e.fillRect(0,0,r,i),e.globalAlpha=1}function w(e,t,n,r){let{width:i,height:a}=e.canvas,o=n?C(n.bins):0;if(v(e,t,{cx:i/2,cy:a/2,warp:.25+o*.4,light:r?.3:.55+o*.6}),!n)return;e.fillStyle=`#ffffffb0`;let s=S(n.bins);for(let t=0;t<i;t+=2){let r=n.bins[Math.floor(Math.abs(t-i/2)/(i/2)*s)]/255,o=Math.round(r*a/2);e.fillRect(t,a/2-o,1,o*2)}}var T=new WeakMap,ne=new WeakMap;function re(e,t,n,r){let{width:i,height:a}=e.canvas,o=Math.floor(i/5);T.has(e)||T.set(e,new Float32Array(o));let s=T.get(e);te(e,!0),e.fillStyle=`#ffffff0c`;for(let t=a-2;t>0;t-=3)e.fillRect(0,t,i,1);if(!ne.has(e)){let t=e.createLinearGradient(0,a,0,0);y.slice(0,3).forEach((e,n)=>t.addColorStop(n/2,e)),ne.set(e,t)}let c=ne.get(e),l=n?S(n.bins):0;for(let t=0;t<o;t++){let i=0;if(n){let e=Math.floor((t/o)**1.6*l),r=Math.max(e+1,Math.floor(((t+1)/o)**1.6*l));for(let t=e;t<r;t++)i=Math.max(i,n.bins[t]/255)}let u=Math.round(i*(a-2));s[t]=Math.max(s[t]-.6,u);let d=t*5+1;e.globalAlpha=r?.3:1,e.fillStyle=c,e.fillRect(d,a-u,4,u),e.fillStyle=`#fffb96`,e.fillRect(d,a-Math.round(s[t])-2,4,1),e.globalAlpha=1}}function E(e,t,n,r){let{width:i,height:a}=e.canvas;te(e,r,.35),e.fillStyle=`#7dff6b18`;for(let t=0;t<i;t+=10)e.fillRect(t,0,1,a);e.fillRect(0,a/2,i,1),e.fillStyle=r?`#7dff6b66`:`#7dff6b`;let o=a/2;for(let t=0;t<i;t++){let r=n?n.wave[Math.floor(t/i*n.wave.length)]:128,s=Math.round(r/255*(a-1)),c=Math.min(s,o);e.fillRect(t,c,1,Math.abs(s-o)+1),o=s}}function ie(e,t,n,r){let{width:i,height:a}=e.canvas;te(e,r,.3);let o=6+(n?C(n.bins):0)*6,s=t*.4;e.globalAlpha=r?.35:1;for(let t=0;t<32;t++){let r=t<16?t:31-t,c=n?n.bins[Math.floor(r/16*S(n.bins))]/255:0,l=t/32*Math.PI*2+s,u=1+c*(a/2-o);e.fillStyle=y[t%y.length];for(let t=o;t<o+u;t++)e.fillRect(Math.round(i/2+Math.cos(l)*t),Math.round(a/2+Math.sin(l)*t),1,1)}e.globalAlpha=1}var ae=(e,t)=>20*1e3**(e/(t-1)),oe=e=>Math.log(e/20)/Math.log(1e3);function se(e,t,n,r,i){let{width:a,height:o}=e.canvas;te(e,!0),e.fillStyle=`#ffffff14`,e.fillRect(0,Math.floor(o/2),a,1);for(let t of[100,1e3,1e4])e.fillRect(Math.round(oe(t)*(a-1)),0,1,o);if(t){let r=n/2;for(let n=0;n<a;n+=3){let i=Math.min(t.bins.length-1,Math.round(ae(n,a)/r*t.bins.length)),s=Math.round(t.bins[i]/255*o);e.fillStyle=y[1+Math.floor(n/a*3)]+`99`,e.fillRect(n,o-s,2,s)}}e.fillStyle=i?`#ff71ce`:`#ff71ce55`;let s=e=>Math.round(o/2-Math.max(-12,Math.min(12,e))/12*(o/2-2)),c=s(r[0]);for(let t=0;t<a;t++){let n=s(r[t]);e.fillRect(t,Math.min(n,c),1,Math.abs(n-c)+1),c=n}}var D={prev:`<svg viewBox="0 0 9 9" width="9" height="9"><path d="M0 0h2v9H0zM8 0h1v9H8V8H7V7H6V6H5V5H4V4h1V3h1V2h1V1h1z"/></svg>`,play:`<svg viewBox="0 0 6 9" width="6" height="9"><path d="M0 0h1v1h1v1h1v1h1v1h1v1H4v1H3v1H2v1H1v1H0z"/></svg>`,pause:`<svg viewBox="0 0 7 9" width="7" height="9"><path d="M0 0h2v9H0zM5 0h2v9H5z"/></svg>`,stop:`<svg viewBox="0 0 8 8" width="8" height="8"><path d="M0 0h8v8H0z"/></svg>`,next:`<svg viewBox="0 0 9 9" width="9" height="9"><path d="M7 0h2v9H7zM0 0h1v1h1v1h1v1h1v1h1v1H4v1H3v1H2v1H1v1H0z"/></svg>`},ce=[{key:`bass`,label:`Bass`,type:`lowshelf`,frequency:250},{key:`mid`,label:`Mid`,type:`peaking`,frequency:1e3,q:.9},{key:`high`,label:`High`,type:`highshelf`,frequency:4e3}],le=new Set,O=null,k=[],A=0,j=`STOPPED`,M=null,ue={on:!0,bass:0,mid:0,high:0};function N(){return{track:k[A]??null,index:A,queue:k,status:j,currentTime:O?.currentTime??0,duration:O?.duration||0,volume:O?.volume??1,eq:{...ue}}}function de(){return M}function fe(e){return le.add(e),()=>le.delete(e)}function P(e){for(let t of le)t(e)}function F(e){j=e,P(`state`)}function pe(e,t,n){k=e,I(t,n)}function I(e,t){A=e,z().src=k[A].src,t?L():F(`STOPPED`),P(`track`)}function L(){k.length&&(j===`ERROR`&&O.load(),B(),F(`LOADING`),O.play().catch(e=>{e.name!==`AbortError`&&(e.name===`NotAllowedError`?F(O.currentTime?`PAUSED`:`STOPPED`):F(`ERROR`))}))}function me(){O?.pause()}function he(){O&&(O.pause(),O.currentTime=0,F(`STOPPED`))}function ge(){k.length&&(O.currentTime>3||A===0?O.currentTime=0:I(A-1,!O.paused))}function R(){k.length&&I((A+1)%k.length,!O.paused)}function _e(e){O?.duration&&(O.currentTime=e*O.duration)}function ve(e){z().volume=e,P(`volume`)}function ye(){he(),k=[],A=0,O?.removeAttribute(`src`),P(`track`)}function z(){return O||(O=new Audio,O.preload=`metadata`,O.crossOrigin=`anonymous`,O.addEventListener(`playing`,()=>F(`PLAYING`)),O.addEventListener(`waiting`,()=>{j===`PLAYING`&&F(`LOADING`)}),O.addEventListener(`pause`,()=>{O.paused&&(j===`PLAYING`||j===`LOADING`)&&F(`PAUSED`)}),O.addEventListener(`error`,()=>{k.length&&F(`ERROR`)}),O.addEventListener(`ended`,()=>{A<k.length-1?I(A+1,!0):he()}),O.addEventListener(`timeupdate`,()=>P(`time`)),O.addEventListener(`durationchange`,()=>P(`time`))),O}function B(){if(!M){let e=new AudioContext,t=ce.map(t=>V(e,t)),n=e.createAnalyser();n.fftSize=256,[e.createMediaElementSource(z()),...t,n,e.destination].reduce((e,t)=>e.connect(t)),M={context:e,filters:t,analyser:n,bins:new Uint8Array(n.frequencyBinCount),wave:new Uint8Array(n.fftSize)},xe()}M.context.resume().catch(()=>{})}function be(e){Object.assign(ue,e),xe(),P(`eq`)}function xe(){M&&ce.forEach((e,t)=>M.filters[t].gain.value=ue.on?ue[e.key]:0)}function V(e,{type:t,frequency:n,q:r}){let i=e.createBiquadFilter();return i.type=t,i.frequency.value=n,r&&(i.Q.value=r),i}function Se(e){let t=Math.floor(e/3600),n=Math.floor(e%3600/60),r=Math.floor(e%60),i=`${String(n).padStart(2,`0`)}:${String(r).padStart(2,`0`)}`;return t?`${t}:${i}`:i}var Ce=80,H={x:120,y:30},we=24,Te=[`n`,`s`,`e`,`w`,`ne`,`nw`,`se`,`sw`],Ee={minimize:`<svg viewBox="0 0 8 7" width="8" height="7"><rect x="1" y="5" width="6" height="2"/></svg>`,maximize:`<svg viewBox="0 0 9 8" width="9" height="8"><path fill-rule="evenodd" d="M0 0h9v8H0zM1 2v5h7V2z"/></svg>`,restore:`<svg viewBox="0 0 9 9" width="9" height="9"><path fill-rule="evenodd" d="M2 0h7v6H7V2H2zM0 3h7v6H0zM1 5v3h5V5z"/><rect x="3" y="2" width="5" height="1"/></svg>`,close:`<svg viewBox="0 0 8 7" width="8" height="7"><path d="M0 0h2v1h1v1h2V1h1V0h2v1H7v1H6v1H5v1h1v1h1v1h1v1H6V6H5V5H3v1H2v1H0V6h1V5h1V4h1V3H2V2H1V1H0z"/></svg>`},U=new Map,De=new Set,W=null,Oe=1,G=0,ke=null,Ae=0;function je(e){W=e,window.addEventListener(`resize`,()=>{for(let e of U.values())qe(e,Je(e,e.rect))})}function Me(){return[...U.values()]}function Ne(){return ke}function Pe(e){return De.add(e),()=>De.delete(e)}function K(){for(let e of De)e()}function Fe({appId:e,title:t,icon:n,width:r=400,height:i=300,minWidth:a=200,minHeight:o=120,fill:s=null,className:c=``,mount:l,props:u={}}){let d=`win-${Oe++}`,f=Ue(t,n);c&&f.classList.add(c),W.append(f);let p={id:d,appId:e,title:t,icon:n,el:f,body:f.querySelector(`.window-body`),titleBar:f.querySelector(`.window-titlebar`),rect:null,minWidth:a,minHeight:o,minimized:!1,maximized:!1,cleanup:null};if(U.set(d,p),s){let e=Math.round(W.clientWidth*s),t=Math.round(W.clientHeight*s);qe(p,{x:Math.round((W.clientWidth-e)/2),y:Math.round((W.clientHeight-t)/2),w:e,h:t})}else{let e=Ae++%8*we,t=Math.min(r,W.clientWidth),n=Math.min(i,W.clientHeight);qe(p,Je(p,{x:H.x+e,y:H.y+e,w:t,h:n}))}return qe(p,Ye(p,p.rect)),f.classList.add(`is-opening`),f.addEventListener(`animationend`,()=>f.classList.remove(`is-opening`),{once:!0}),f.addEventListener(`pointerdown`,()=>Re(d),{capture:!0}),We(p),Ge(p),p.cleanup=l?.(p.body,{windowId:d,setTitle:e=>Le(d,e),close:()=>Ie(d),props:u})??null,Re(d),d}function Ie(e){let t=U.get(e);if(t){try{t.cleanup?.()}catch(e){console.error(`Cleanup failed for ${t.appId}:`,e)}t.el.remove(),U.delete(e),ke===e&&Ve(He()?.id??null),K()}}function Le(e,t){let n=U.get(e);n&&(n.title=t,n.el.querySelector(`.window-title`).textContent=t,n.el.setAttribute(`aria-label`,t),K())}function Re(e){let t=U.get(e);t&&(ke!==e||t.minimized)&&(t.minimized=!1,t.el.classList.remove(`is-minimized`),t.el.style.zIndex=String(++G),Ve(e),K())}function ze(e){let t=U.get(e);t&&(t.minimized=!0,t.el.classList.add(`is-minimized`),ke===e&&Ve(He()?.id??null),K())}function Be(e){let t=U.get(e);if(!t)return;t.maximized=!t.maximized,t.el.classList.toggle(`is-maximized`,t.maximized);let n=t.el.querySelector(`[data-action="maximize"]`);n.innerHTML=t.maximized?Ee.restore:Ee.maximize,n.setAttribute(`aria-label`,t.maximized?`Restore`:`Maximize`),t.maximized||qe(t,Je(t,t.rect)),Re(e)}function Ve(e){ke=e;for(let t of U.values())t.el.classList.toggle(`is-active`,t.id===e)}function He(){return Me().filter(e=>!e.minimized).sort((e,t)=>Number(t.el.style.zIndex)-Number(e.el.style.zIndex))[0]}function Ue(e,t){let n=document.createElement(`section`);return n.className=`window bevel-out`,n.setAttribute(`role`,`dialog`),n.setAttribute(`aria-label`,e),n.dataset.testid=`window`,n.innerHTML=`
    <header class="window-titlebar">
      <img class="window-icon" src="${t}" alt="" width="16" height="16" />
      <span class="window-title"></span>
      <div class="window-controls">
        <button class="window-btn btn" data-action="minimize" aria-label="Minimize">${Ee.minimize}</button>
        <button class="window-btn btn" data-action="maximize" aria-label="Maximize">${Ee.maximize}</button>
        <button class="window-btn btn" data-action="close" aria-label="Close">${Ee.close}</button>
      </div>
    </header>
    <div class="window-body"></div>
    ${Te.map(e=>`<div class="resize-handle" data-dir="${e}"></div>`).join(``)}
  `,n.querySelector(`.window-title`).textContent=e,n}function We(e){let t=e.titleBar;t.addEventListener(`click`,t=>{let n=t.target.closest(`button`)?.dataset.action;n===`minimize`&&ze(e.id),n===`maximize`&&Be(e.id),n===`close`&&Ie(e.id)}),t.addEventListener(`dblclick`,t=>{t.target.closest(`button`)||Be(e.id)}),t.addEventListener(`pointerdown`,n=>{if(n.button!==0||e.maximized||n.target.closest(`button`))return;let r={...e.rect};Ke(t,n,(t,n)=>{qe(e,Je(e,{...r,x:r.x+t,y:r.y+n}))})})}function Ge(e){for(let t of e.el.querySelectorAll(`.resize-handle`))t.addEventListener(`pointerdown`,n=>{if(n.button!==0||e.maximized)return;let r=t.dataset.dir,i={...e.rect};Ke(t,n,(t,n)=>{let a={...i};if(r.includes(`e`)&&(a.w=Math.max(e.minWidth,i.w+t)),r.includes(`w`)&&(a.w=Math.max(e.minWidth,i.w-t),a.x=i.x+i.w-a.w),r.includes(`s`)&&(a.h=Math.max(e.minHeight,Math.min(i.h+n,W.clientHeight-i.y))),r.includes(`n`)){let t=Math.max(0,Math.min(i.y+n,i.y+i.h-e.minHeight));a.y=t,a.h=i.y+i.h-t}qe(e,a)})})}function Ke(e,t,n,r){let i=t.clientX,a=t.clientY;e.setPointerCapture(t.pointerId),document.body.classList.add(`is-busy`);let o=e=>n(e.clientX-i,e.clientY-a),s=t=>{e.removeEventListener(`pointermove`,o),e.removeEventListener(`pointerup`,s),e.removeEventListener(`pointercancel`,s),document.body.classList.remove(`is-busy`),r?.(t.clientX-i,t.clientY-a)};e.addEventListener(`pointermove`,o),e.addEventListener(`pointerup`,s),e.addEventListener(`pointercancel`,s)}function qe(e,t){e.rect=t,Object.assign(e.el.style,{left:`${t.x}px`,top:`${t.y}px`,width:`${t.w}px`,height:`${t.h}px`})}function Je(e,t){let n=e.titleBar.offsetHeight||20;return{...t,x:c(t.x,Ce-t.w,W.clientWidth-Ce),y:c(t.y,0,W.clientHeight-n-4)}}function Ye(e,t){let n=(e,t)=>e.x===t.x&&e.y===t.y&&e.w===t.w&&e.h===t.h,r=t=>Me().some(r=>r!==e&&n(r.rect,t));for(let i=0;i<U.size&&r(t);i++){let r=Je(e,{...t,x:t.x+we,y:t.y+we});t=n(r,t)?Je(e,{...t,x:t.x-we,y:t.y-we}):r}return t}function Xe(e,t){let n=!1;return e.addEventListener(`pointerdown`,r=>{if(r.button!==0||!N().duration)return;let i=e.getBoundingClientRect(),a=e=>c((e-i.left)/i.width,0,1);n=!0,e.classList.add(`is-seeking`),t(a(r.clientX)),Ke(e,r,e=>t(a(r.clientX+e)),t=>{n=!1,e.classList.remove(`is-seeking`),_e(a(r.clientX+t))})}),()=>n}var Ze=2,Qe=`#5a5380`,$e=`#01cdfe`,et=new Map;function tt(e){let t=e.getContext(`2d`),n=null,r=null,i=0;function a(e){e!==n&&(n=e,r=null,o(0),n&&(et.has(n)||et.set(n,nt(n)),et.get(n).then(t=>{n===e&&(r=t,o(i))})))}function o(n){i=n;let a=e.clientWidth,o=e.clientHeight;if(!a)return;let s=devicePixelRatio;e.width!==Math.round(a*s)&&(e.width=Math.round(a*s)),e.height!==Math.round(o*s)&&(e.height=Math.round(o*s)),t.setTransform(s,0,0,s,0,0),t.clearRect(0,0,a,o);let c=t.createLinearGradient(0,0,a,0);c.addColorStop(0,`#ff71ce`),c.addColorStop(.5,`#b967ff`),c.addColorStop(1,`#01cdfe`);let l=Math.round(o*.66),u=Math.floor(a/3),d=Math.round(i*a);for(let e=0;e<u;e++){let n=e*3,i=r?rt(r,e,u)/100:.08;t.fillStyle=n+Ze/2<d?c:Qe;let a=Math.max(1,Math.round(i*(l-2)));t.fillRect(n,l-a,Ze,a),t.globalAlpha=.45,t.fillRect(n,l+1,Ze,Math.round(i*(o-l-2))),t.globalAlpha=1}t.fillStyle=$e,t.fillRect(d,0,1,o),t.fillStyle=`#0a0910`,t.fillRect(d-4,l-5,9,9),t.fillStyle=$e,t.fillRect(d-3,l-4,7,7)}return{load:a,draw:o}}function nt(e){return fetch(e.replace(/\.[^.]+$/,`.peaks.json`)).then(e=>e.ok?e.json():null).catch(()=>null)}function rt(e,t,n){let r=Math.floor(t*e.length/n),i=Math.max(r+1,Math.floor((t+1)*e.length/n)),a=0;for(let t=r;t<i;t++)a=Math.max(a,e[t]);return a}var it={id:`media-player`,title:`Media Player`,icon:`/icons/tape.svg`,width:460,height:500,minWidth:340,minHeight:400,singleInstance:!0,mount(e){e.innerHTML=`
      <div class="player">
        <div class="player-strip">
          <span class="player-leds"><i></i><i></i><i></i></span>
          <span class="player-strip-title">MEDIA PLAYER</span>
          <span class="player-strip-rule"></span>
        </div>
        <div class="player-top">
          <div class="player-lcd">
            <div class="player-time" data-testid="player-time">00:00</div>
            <div class="player-marquee"><span class="player-title" data-testid="player-title"></span></div>
            <div class="player-status" data-testid="player-status">STOPPED</div>
            <div class="player-info">
              <span class="player-format"></span>
              <span class="player-mode" data-testid="player-vis-mode"></span>
              <span class="player-lamp" data-testid="player-eq-lamp">EQ</span>
            </div>
          </div>
          <div class="player-vis-box">
            <canvas class="player-vis" width="80" height="48" data-testid="player-visualizer"></canvas>
            <button class="player-btn player-btn-small" data-action="vis" aria-label="Visualizer">VIS &#9656;</button>
          </div>
        </div>
        <div class="player-wave-box" role="progressbar" aria-label="Progress"
             aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
          <canvas class="player-wave" data-testid="player-waveform"></canvas>
        </div>
        <div class="player-controls">
          <button class="player-btn" data-action="prev" aria-label="Previous">${D.prev}</button>
          <button class="player-btn" data-action="play" aria-label="Play">${D.play}</button>
          <button class="player-btn" data-action="pause" aria-label="Pause">${D.pause}</button>
          <button class="player-btn" data-action="stop" aria-label="Stop">${D.stop}</button>
          <button class="player-btn" data-action="next" aria-label="Next">${D.next}</button>
          <button class="player-btn player-btn-text is-pressed" data-action="eq" aria-label="Equalizer" aria-pressed="true">EQ</button>
          <label class="player-volume">VOL
            <input type="range" min="0" max="1" step="0.01" value="1" aria-label="Volume" />
          </label>
        </div>
        <div class="player-eq" data-testid="player-eq">
          <div class="player-eq-side">
            <button class="player-btn player-btn-small" data-action="eq-on" aria-label="EQ on" aria-pressed="false">ON</button>
            <button class="player-btn player-btn-small" data-action="eq-reset" aria-label="Reset EQ">RESET</button>
          </div>
          <div class="player-eq-bands">
            ${ce.map(e=>`
              <label class="player-eq-band">
                <output data-testid="player-eq-${e.key}">0 dB</output>
                <input type="range" min="-12" max="12" step="1" value="0" data-band="${e.key}" aria-label="${e.label}" />
                <span>${e.label.toUpperCase()}</span>
              </label>`).join(``)}
          </div>
          <div class="player-eq-display">
            <canvas class="player-eq-vis" width="120" height="48" data-testid="player-eq-visualizer"></canvas>
            <div class="player-eq-scale">
              ${[100,1e3,1e4].map(e=>`<span style="left: ${oe(e)*100}%">${e<1e3?e:`${e/1e3}k`}</span>`).join(``)}
            </div>
          </div>
        </div>
        <div class="player-browser" data-testid="player-browser">
          <div class="player-browser-bar">
            <button class="player-btn" data-action="up" aria-label="Up">..</button>
            <span class="player-path" data-testid="player-path"></span>
          </div>
          <ul class="player-list"></ul>
        </div>
      </div>
    `;let t=t=>e.querySelector(t),n=t(`[data-action="play"]`),r=t(`[data-action="pause"]`),i=t(`[data-action="up"]`),a=t(`.player-time`),o=t(`.player-title`),s=t(`.player-status`),c=t(`.player-wave-box`),l=t(`.player-wave`),u=tt(l),d=t(`.player-volume input`),f=t(`.player-path`),p=t(`.player-list`),m=t(`.player-vis`).getContext(`2d`),g=t(`.player-mode`),_=t(`.player-format`),v=t(`.player-lamp`),ee=t(`[data-action="eq"]`),y=t(`[data-action="eq-on"]`),b=t(`.player-eq`),S=t(`.player-eq-vis`).getContext(`2d`),C=[h],te=e=>e.children.filter(e=>e.type===`track`),w=0,T=0,ne=new Map;n.addEventListener(`click`,()=>{N().track?L():pe(te(h.children[0]),0,!0)}),r.addEventListener(`click`,me),t(`[data-action="stop"]`).addEventListener(`click`,he),t(`[data-action="prev"]`).addEventListener(`click`,ge),t(`[data-action="next"]`).addEventListener(`click`,R),d.addEventListener(`input`,()=>ve(Number(d.value)));let re=Xe(l,e=>{u.draw(e),a.textContent=Se(e*N().duration)}),E=fe(e=>{e===`time`?k():e===`state`?le():e===`track`?ie():e===`volume`?O():e===`eq`&&ye()});function ie(){let{track:e,index:t}=N();o.textContent=e?`${t+1}. ${e.title} - ${e.artist}`:``,u.load(e?.src??null);for(let[t,n]of ne)t.classList.toggle(`is-playing`,n===e);k()}function le(){let t=N().status;s.textContent=t,e.querySelector(`.player`).dataset.state=t,n.classList.toggle(`is-pressed`,t===`PLAYING`||t===`LOADING`),r.classList.toggle(`is-pressed`,t===`PAUSED`),t===`PLAYING`?xe():Ce(),k()}function O(){d.value=String(N().volume)}function k(){let{currentTime:e,duration:t}=N();if(_.textContent=t?Se(t):`--:--`,re())return;let n=t?e/t:0;u.draw(n),c.setAttribute(`aria-valuenow`,String(Math.round(n*100))),a.textContent=Se(e)}i.addEventListener(`click`,()=>{C.length>1&&C.pop(),j()});function A(e){if(e.type===`folder`)C.push(e),j();else{let t=te(C.at(-1));pe(t,t.indexOf(e),!0)}}function j(){let e=C.at(-1),t=N().track;f.textContent=C.map(e=>e.name).join(` / `),i.disabled=C.length===1,ne.clear(),p.replaceChildren(...e.children.map(e=>{let n=document.createElement(`li`),r=document.createElement(`button`);return r.className=`player-row`,ne.set(r,e),r.classList.toggle(`is-playing`,e===t),r.innerHTML=`<img src="${e.type===`folder`?`/icons/folder.svg`:`/icons/tape.svg`}" alt="" width="16" height="16" /><span></span><small></small>`,r.querySelector(`span`).textContent=e.type===`folder`?e.name:e.title,r.querySelector(`small`).textContent=e.type===`folder`?`${e.children.length} item(s)`:e.artist,r.addEventListener(`click`,()=>{for(let e of p.querySelectorAll(`.player-row`))e.classList.toggle(`is-selected`,e===r)}),r.addEventListener(`dblclick`,()=>A(e)),r.addEventListener(`keydown`,t=>{t.key===`Enter`&&A(e)}),n.append(r),n}))}let M=new OfflineAudioContext(1,1,44100),ue=ce.map(e=>V(M,e)),P=Float32Array.from({length:S.canvas.width},(e,t)=>ae(t,S.canvas.width)),F=new Float32Array(P.length),I=new Float32Array(P.length),_e=new Float32Array(P.length);ee.addEventListener(`click`,()=>{b.hidden=!b.hidden,ee.setAttribute(`aria-pressed`,String(!b.hidden)),ee.classList.toggle(`is-pressed`,!b.hidden),z()}),y.addEventListener(`click`,()=>be({on:!N().eq.on})),t(`[data-action="eq-reset"]`).addEventListener(`click`,()=>be(Object.fromEntries(ce.map(e=>[e.key,0]))));for(let t of e.querySelectorAll(`[data-band]`))t.addEventListener(`input`,()=>be({[t.dataset.band]:Number(t.value)}));function ye(){let{eq:t}=N();ce.forEach((n,r)=>{ue[r].gain.value=t[n.key];let i=e.querySelector(`[data-band="${n.key}"]`);i.value=String(t[n.key]),i.previousElementSibling.textContent=`${t[n.key]>0?`+`:``}${t[n.key]} dB`}),y.setAttribute(`aria-pressed`,String(t.on)),y.classList.toggle(`is-pressed`,t.on),v.classList.toggle(`is-lit`,t.on),F.fill(0);for(let e of ue)e.getFrequencyResponse(P,I,_e),I.forEach((e,t)=>F[t]+=20*Math.log10(e));z()}function z(e){if(b.hidden)return;let t=de();se(S,e?t:null,t?.context.sampleRate??44100,F,N().eq.on)}function B(){T=(T+1)%x.length,g.textContent=x[T].name,N().status!==`PLAYING`&&Ce()}t(`[data-action="vis"]`).addEventListener(`click`,B),m.canvas.addEventListener(`click`,B);function xe(){if(w)return;let e=t=>{let n=de();n&&(n.analyser.getByteFrequencyData(n.bins),n.analyser.getByteTimeDomainData(n.wave)),x[T].draw(m,t/1e3,n,!1),z(!0),w=requestAnimationFrame(e)};w=requestAnimationFrame(e)}function Ce(){cancelAnimationFrame(w),w=0,x[T].draw(m,N().currentTime,null,!0),z()}N().track||pe(te(h.children[0]),0,!1),g.textContent=x[T].name,j(),ye(),O(),ie(),le();let H=new ResizeObserver(k);return H.observe(c),()=>{E(),H.disconnect(),cancelAnimationFrame(w)}}},at=new Map;function ot(e){for(let t of e)at.set(t.id,t)}function st(){return[...at.values()]}function q(e,t={}){let n=at.get(e);if(!n)return console.warn(`Unknown app: ${e}`),null;if(n.singleInstance){let t=Me().find(t=>t.appId===e);if(t)return Re(t.id),t.id}return Fe({appId:n.id,title:n.title,icon:n.icon,width:n.width,height:n.height,minWidth:n.minWidth,minHeight:n.minHeight,fill:n.fill,className:n.className,mount:n.mount,props:t})}var ct=[{appId:`space-shooter`,name:`Space Shooter`,icon:`/icons/ship.svg`},{appId:`dream-pool`,name:`Dream Pool`,icon:`/icons/swirl.svg`},{appId:`lenia`,name:`Lenia`,icon:`/icons/lenia.svg`},{appId:`wobble-world`,name:`Wobble World`,icon:`/icons/blob.svg`}],lt={id:`games`,title:`Games`,icon:`/icons/games.svg`,width:420,height:280,minWidth:260,minHeight:180,singleInstance:!0,mount(e){e.innerHTML=`
      <div class="explorer">
        <ul class="explorer-items bevel-in" data-testid="games-items"></ul>
        <div class="explorer-status bevel-in"></div>
      </div>
    `;let t=e.querySelector(`.explorer-items`);for(let e of ct){let n=document.createElement(`li`),r=document.createElement(`button`);r.className=`explorer-item`,r.innerHTML=`<img src="${e.icon}" alt="" width="32" height="32" /><span></span>`,r.querySelector(`span`).textContent=e.name,r.addEventListener(`click`,()=>{for(let e of t.querySelectorAll(`.explorer-item`))e.classList.toggle(`is-selected`,e===r)}),r.addEventListener(`dblclick`,()=>q(e.appId)),r.addEventListener(`keydown`,t=>{t.key===`Enter`&&q(e.appId)}),n.append(r),t.append(n)}e.querySelector(`.explorer-status`).textContent=`${ct.length} game(s)`}},J=320,ut=240,dt=`voidos.shooter.best`,ft=130,pt=260,mt=.18,ht=1.5,gt=3,_t={k:`#141414`,w:`#ffffff`,c:`#4cc9f0`,p:`#3a0ca3`,m:`#f72585`,y:`#ffd23f`},vt={player:[`.....w.....`,`....wcw....`,`....wcw....`,`...wwwww...`,`..pwwmwwp..`,`.ppwwmwwpp.`,`pppwwwwwppp`,`pp.wwwww.pp`,`p...m.m...p`,`....y.y....`],small:[`m.......m`,`mm.....mm`,`.mmpppmm.`,`..pwppwp.`,`..ppppp..`,`...m.m...`],big:[`..mm.....mm..`,`.mmmm...mmmm.`,`mmpppppppppmm`,`mpppwwpwwpppm`,`mpppkwpkwpppm`,`.ppppppppppp.`,`..pmpmpmpmp..`,`...m.....m...`]},yt={small:{sprite:vt.small,hp:1,points:10,speed:[45,75]},big:{sprite:vt.big,hp:3,points:30,speed:[25,40]}},bt={id:`space-shooter`,title:`Space Shooter`,icon:`/icons/ship.svg`,width:660,height:520,minWidth:260,minHeight:230,singleInstance:!0,hidden:!0,mount(e){e.innerHTML=`<div class="shooter"><canvas tabindex="0" data-testid="shooter"></canvas></div>`;let t=e.querySelector(`canvas`);t.width=J,t.height=ut;let n=t.getContext(`2d`),r=new Set,i=Array.from({length:60},()=>({x:Math.random()*J,y:Math.random()*ut,speed:10+Math.random()*50})),a=null,o=`title`,s=!1,l=St(),u=0,d=performance.now();function f(e){o=e,t.dataset.state=e}function p(e){s=e,t.dataset.paused=String(e),e&&r.clear()}function m(){a={player:{x:J/2,y:218,cooldown:0,invulnerable:0},bullets:[],enemies:[],particles:[],lives:gt,score:0,time:0,spawnIn:1},p(!1),f(`playing`)}function h(){a.score>l&&(l=a.score,Ct(l)),f(`gameover`)}t.addEventListener(`keydown`,e=>{let t=e.key.toLowerCase();if([` `,`arrowup`,`arrowdown`,`arrowleft`,`arrowright`].includes(t)&&e.preventDefault(),o!==`playing`)(t===`enter`||t===` `)&&m();else{if(t===`escape`||t===`p`)return p(!s);s?(t===`enter`||t===` `)&&p(!1):r.add(t)}}),t.addEventListener(`keyup`,e=>r.delete(e.key.toLowerCase())),t.addEventListener(`blur`,()=>{o===`playing`&&p(!0)}),t.addEventListener(`pointerdown`,()=>{t.focus(),o===`playing`?s&&p(!1):m()});let g=(...e)=>e.some(e=>r.has(e));function _(e){let{player:t}=a;a.time+=e;let n=+!!g(`arrowright`,`d`)-!!g(`arrowleft`,`a`),r=+!!g(`arrowdown`,`s`)-!!g(`arrowup`,`w`);t.x=c(t.x+n*ft*e,6,314),t.y=c(t.y+r*ft*e,ut/2,232),t.cooldown-=e,t.invulnerable-=e,g(` `)&&t.cooldown<=0&&(a.bullets.push({x:t.x,y:t.y-6}),t.cooldown=mt);for(let t of a.bullets)t.y-=pt*e;a.bullets=a.bullets.filter(e=>e.y>-4),a.spawnIn-=e,a.spawnIn<=0&&(v(),a.spawnIn=Math.max(.3,1.1-a.time*.012)*(.6+Math.random()*.8));for(let t of a.enemies)t.y+=t.speed*e,t.x=t.baseX+Math.sin(a.time*2+t.phase)*t.drift;for(let t of a.enemies){for(let e of a.bullets)e.hit||t.hp<=0||!xt(t,e.x,e.y,1,3)||(e.hit=!0,t.hp--,t.flash=.08,t.hp<=0&&(a.score+=t.points,ee(t.x,t.y,`#f72585`)));t.flash=Math.max(0,(t.flash??0)-e)}a.bullets=a.bullets.filter(e=>!e.hit);for(let e of a.enemies)e.hp<=0||t.invulnerable>0||xt(e,t.x,t.y,4,4)&&(e.hp=0,ee(t.x,t.y,`#4cc9f0`),a.lives--,t.invulnerable=ht,a.lives<=0&&h());a.enemies=a.enemies.filter(e=>e.hp>0&&e.y<252);for(let t of a.particles)t.x+=t.vx*e,t.y+=t.vy*e,t.life-=e;a.particles=a.particles.filter(e=>e.life>0)}function v(){let e=Math.random()<Math.min(.3,a.time*.005)?yt.big:yt.small,t=e.sprite[0].length,n=t+Math.random()*(J-2*t);a.enemies.push({sprite:e.sprite,w:t,h:e.sprite.length,hp:e.hp,points:e.points,speed:e.speed[0]+Math.random()*(e.speed[1]-e.speed[0])+a.time*.5,x:n,baseX:n,y:-10,drift:Math.random()*30,phase:Math.random()*Math.PI*2})}function ee(e,t,n){for(let r=0;r<14;r++){let r=Math.random()*Math.PI*2,i=20+Math.random()*70;a.particles.push({x:e,y:t,vx:Math.cos(r)*i,vy:Math.sin(r)*i,life:.3+Math.random()*.4,color:Math.random()<.5?n:`#ffd23f`})}}function y(){n.fillStyle=`#0a0a1a`,n.fillRect(0,0,J,ut);for(let e of i)n.fillStyle=e.speed>40?`#ffffff`:`#7c776b`,n.fillRect(Math.round(e.x),Math.round(e.y),1,1);if(a){for(let e of a.enemies)b(e.sprite,e.x,e.y,e.flash>0);n.fillStyle=`#ffd23f`;for(let e of a.bullets)n.fillRect(Math.round(e.x),Math.round(e.y),1,3);for(let e of a.particles)n.fillStyle=e.color,n.fillRect(Math.round(e.x),Math.round(e.y),1,1);let{player:e}=a,t=e.invulnerable>0&&Math.floor(e.invulnerable*10)%2==0;o===`playing`&&!t&&b(vt.player,e.x,e.y),x(`SCORE ${a.score}`,4,12,`#ffffff`,`left`),x(`BEST ${Math.max(l,a.score)}`,J/2,12,`#7c776b`),x(`♥`.repeat(Math.max(0,a.lives)),316,12,`#f72585`,`right`)}o===`title`?(x(`SPACE SHOOTER`,J/2,96,`#f72585`,`center`,20),x(`ARROWS / WASD  MOVE     SPACE  SHOOT`,J/2,124,`#4cc9f0`),x(`PRESS ENTER OR CLICK TO START`,J/2,150,S()?`#ffffff`:`#7c776b`),l&&x(`BEST ${l}`,J/2,172,`#7c776b`)):o===`gameover`?(x(`GAME OVER`,J/2,104,`#f72585`,`center`,20),x(`SCORE ${a.score}`,J/2,128,`#ffffff`),x(`PRESS ENTER OR CLICK TO PLAY AGAIN`,J/2,152,S()?`#ffffff`:`#7c776b`)):s&&(x(`PAUSED`,J/2,112,`#ffffff`,`center`,20),x(`CLICK OR PRESS ENTER TO RESUME`,J/2,134,`#4cc9f0`))}function b(e,t,r,i=!1){let a=Math.round(t-e[0].length/2),o=Math.round(r-e.length/2);e.forEach((e,t)=>{for(let r=0;r<e.length;r++){let s=e[r];s!==`.`&&(n.fillStyle=i?`#ffffff`:_t[s],n.fillRect(a+r,o+t,1,1))}})}function x(e,t,r,i,a=`center`,o=10){n.font=`bold ${o}px "Courier New", monospace`,n.textAlign=a,n.fillStyle=i,n.fillText(e,t,r)}let S=()=>Math.floor(performance.now()/500)%2==0;function C(e){let t=Math.min((e-d)/1e3,.05);if(d=e,!s){for(let e of i)e.y+=e.speed*t,e.y>ut&&(e.y=0,e.x=Math.random()*J);o===`playing`&&_(t)}y(),u=requestAnimationFrame(C)}return f(`title`),p(!1),u=requestAnimationFrame(C),t.focus(),()=>cancelAnimationFrame(u)}};function xt(e,t,n,r,i){return Math.abs(e.x-t)<e.w/2+r&&Math.abs(e.y-n)<e.h/2+i}function St(){try{return Number(localStorage.getItem(dt))||0}catch{return 0}}function Ct(e){try{localStorage.setItem(dt,String(e))}catch{}}var wt=`HIRE ME
=======

ABOUT ME
--------
Placeholder: a few lines about who I am, where I come from and
what I care about when I make things.

WHAT I CAN DO
-------------
- Placeholder: sound design for games, film and interactive work
- Placeholder: music composition and production
- Placeholder: visual and web experiments like this one

TOOLS
-----
Placeholder: the software, instruments and gear I work with.

CONTACT
-------
Email:     placeholder@example.com
Portfolio: you are standing in it.
`,Tt={id:`hire-me`,title:`Hire Me.txt - Notepad`,desktopLabel:`Hire Me.txt`,icon:`/icons/file.svg`,width:540,height:400,minWidth:260,minHeight:180,singleInstance:!0,mount(e){e.innerHTML=`
      <div class="notepad">
        <div class="notepad-menu" aria-hidden="true">
          <span><u>F</u>ile</span><span><u>E</u>dit</span><span><u>S</u>earch</span><span><u>H</u>elp</span>
        </div>
        <pre class="notepad-text bevel-in" data-testid="notepad-text" tabindex="0"></pre>
      </div>
    `,e.querySelector(`.notepad-text`).textContent=wt}},Et=160,Dt=120,Ot=.1,kt=3,At={id:`dream-pool`,title:`Dream Pool`,icon:`/icons/swirl.svg`,width:480,height:380,minWidth:200,minHeight:160,singleInstance:!0,hidden:!0,mount(e){e.innerHTML=`<div class="dream-pool"><canvas data-testid="dream-pool"></canvas></div>`;let t=e.querySelector(`canvas`);t.width=Et,t.height=Dt;let n=t.getContext(`2d`),r={x:Et/2,y:Dt/2},i=0,a=0,o=0,s=0;function c(e){let t=Math.min(e-s,100)/1e3;s=e,a*=Ot**t,i+=t*(.6+a),v(n,i,{cx:r.x,cy:r.y,warp:.3+a*.1,light:.65+a*.15}),o=requestAnimationFrame(c)}function l(){v(n,i,{cx:r.x,cy:r.y,warp:.3,light:.35})}return t.addEventListener(`pointerenter`,()=>{t.dataset.state=`moving`,s=performance.now(),cancelAnimationFrame(o),o=requestAnimationFrame(c)}),t.addEventListener(`pointerleave`,()=>{t.dataset.state=`still`,cancelAnimationFrame(o),a=0,l()}),t.addEventListener(`pointermove`,e=>{let n=t.getBoundingClientRect(),i=Math.max(n.width/Et,n.height/Dt),o=(e.clientX-n.left-(n.width-Et*i)/2)/i,s=(e.clientY-n.top-(n.height-Dt*i)/2)/i;a=Math.min(a+Math.hypot(o-r.x,s-r.y)*.02,kt),r.x=o,r.y=s}),t.dataset.state=`still`,l(),()=>cancelAnimationFrame(o)}},Y=128,X=96,jt=13,Mt=10,Nt=.15,Pt=.017,Ft=[.25,.5,1,2],It=3,Lt=10,Rt=90,zt=.04,Bt=[`#0a0a1a`,`#3a0ca3`,`#b967ff`,`#ff71ce`,`#01cdfe`,`#05ffa1`,`#fffb96`],Vt=ee(Bt),Ht=Math.floor(256*(Bt.length-1)/Bt.length),Ut=[[0,0,0,0,0,0,10,14,10,0,0,3,3,0,0,30,0,0,0,0],[0,0,0,0,0,8,24,30,30,18,14,15,16,15,9,20,0,0,0,0],[0,0,0,0,0,15,34,44,46,38,18,14,11,13,19,18,45,0,0,0],[0,0,0,0,6,13,39,50,50,37,6,0,0,0,2,16,68,0,0,0],[0,0,0,11,17,17,33,40,38,28,14,0,0,0,0,0,18,42,0,0],[0,0,9,18,13,6,8,26,32,32,27,0,0,0,0,0,0,82,0,0],[27,0,16,12,0,0,0,25,38,44,45,34,0,0,0,0,0,22,17,0],[0,7,20,2,0,0,0,31,48,57,60,57,0,0,0,0,0,0,49,0],[0,59,19,0,0,0,0,20,57,69,76,76,49,0,0,0,0,0,36,0],[0,58,19,0,0,0,0,0,67,83,90,92,87,12,0,0,0,0,22,7],[0,0,46,0,0,0,0,0,70,93,100,100,100,61,0,0,0,0,18,11],[0,0,82,0,0,0,0,0,47,100,100,98,100,96,27,0,0,0,19,10],[0,0,46,0,0,0,0,0,25,100,100,84,92,97,54,14,4,10,21,5],[0,0,0,40,0,0,0,0,9,80,100,82,80,85,63,31,18,19,20,1],[0,0,0,36,10,0,0,0,5,54,86,79,74,72,60,39,28,24,13,0],[0,0,0,1,30,7,0,0,8,36,64,70,64,60,51,39,29,19,4,0],[0,0,0,0,10,24,14,10,15,29,45,53,52,46,40,31,21,8,0,0],[0,0,0,0,0,8,21,21,22,29,36,39,37,33,26,18,9,0,0,0],[0,0,0,0,0,0,3,13,19,22,24,24,23,18,13,5,0,0,0,0],[0,0,0,0,0,0,0,0,2,6,8,9,7,5,1,0,0,0,0,0]],Wt=Xt(),Gt=Ut.flat().reduce((e,t)=>e+t)/100,Kt={id:`lenia`,title:`Lenia`,icon:`/icons/lenia.svg`,width:480,height:380,minWidth:200,minHeight:160,singleInstance:!0,hidden:!0,mount(e){e.innerHTML=`
      <div class="lenia">
        <canvas data-testid="lenia"></canvas>
        <div class="lenia-speed" role="group" aria-label="Speed"></div>
      </div>
    `;let t=e.querySelector(`canvas`);t.width=Y,t.height=X;let n=t.getContext(`2d`),r=n.createImageData(Y,X),i=new Float32Array(12288),a=new Float32Array(12288),o=new Float32Array(12288),s=new Uint8Array(12288),c=1,l=0,u=0,d=0,f=e.querySelector(`.lenia-speed`);for(let e of Ft){let t=document.createElement(`button`);t.textContent=`${e===.25?`¼`:e===.5?`½`:e}×`,t.setAttribute(`aria-label`,`Speed ${e}x`),t.setAttribute(`aria-pressed`,String(e===c)),t.addEventListener(`click`,()=>{c=e;for(let e of f.children)e.setAttribute(`aria-pressed`,String(e===t))}),f.append(t)}function p(e){a.fill(0);for(let[e,t,n]of Wt){let r=(e+Y)%Y,o=Y-r;for(let e=0;e<X;e++){let s=(e+t+X)%X*Y,c=e*Y;for(let e=0;e<o;e++)a[c+e]+=n*i[s+e+r];for(let e=o;e<Y;e++)a[c+e]+=n*i[s+e-o]}}for(let t=0;t<i.length;t++){if(s[t]){i[t]=Math.max(i[t]-zt*e,0),i[t]===0&&(s[t]=0);continue}let n=a[t]-Nt,r=2*Math.exp(-n*n/(2*Pt*Pt))-1;i[t]=Math.min(Math.max(i[t]+r*e/Mt,0),1)}++l%Lt===0&&m(),t.dataset.generation=l}function m(){let e=0;for(let t of Jt(i))if(t.mass>Gt*1.8)for(let e of t.cells)s[e]=1;else t.mass>Gt*.5&&e++;if(e<It&&l-u>Rt){let e=Yt(i,s);e&&(Zt(i,e.x,e.y,Math.floor(Math.random()*8)),u=l)}}function h(){for(let e=0;e<i.length;e++){let t=i[e];o[e]+=(t-o[e])*(t>o[e]?.5:.12);let[n,a,s]=Vt[Math.floor(o[e]*Ht)];r.data[e*4]=n,r.data[e*4+1]=a,r.data[e*4+2]=s,r.data[e*4+3]=255}n.putImageData(r,0,0)}function g(){for(let e=0;e<Math.max(c,1);e++)p(Math.min(c,1));h(),d=requestAnimationFrame(g)}t.addEventListener(`click`,e=>{let n=t.getBoundingClientRect(),r=Math.max(n.width/Y,n.height/X),a=(e.clientX-n.left-(n.width-Y*r)/2)/r,o=(e.clientY-n.top-(n.height-X*r)/2)/r;Zt(i,a,o,Math.floor(Math.random()*8))});for(let[e,t]of[[1,1],[3,1],[2,3]])Zt(i,e*Y/4+(Math.random()-.5)*12,t*X/4+(Math.random()-.5)*12,Math.floor(Math.random()*8));return d=requestAnimationFrame(g),()=>cancelAnimationFrame(d)}},qt=[[1,0],[-1,0],[0,1],[0,-1]];function Jt(e){let t=new Uint8Array(12288),n=[];for(let r=0;r<e.length;r++){if(t[r]||e[r]<.02)continue;let i=[r],a=0;t[r]=1;for(let n=0;n<i.length;n++){let r=i[n];a+=e[r];let o=r%Y,s=(r-o)/Y;for(let[n,r]of qt){let a=(s+r+X)%X*Y+(o+n+Y)%Y;!t[a]&&e[a]>=.02&&(t[a]=1,i.push(a))}}n.push({cells:i,mass:a})}return n}function Yt(e,t){for(let n=0;n<20;n++){let n=Math.floor(Math.random()*Y),r=Math.floor(Math.random()*X),i=!0;for(let a=-24;a<=24&&i;a+=2)for(let o=-24;o<=24&&i;o+=2){let s=(r+a+X)%X*Y+(n+o+Y)%Y;(e[s]>.01||t[s])&&(i=!1)}if(i)return{x:n,y:r}}return null}function Xt(){let e=[],t=0;for(let n=-13;n<=jt;n++)for(let r=-13;r<=jt;r++){let i=Math.hypot(r,n)/jt;if(i<=0||i>=1)continue;let a=Math.exp(4-1/(i*(1-i)));e.push([r,n,a]),t+=a}for(let n of e)n[2]/=t;return e}function Zt(e,t,n,r){let i=Ut.length;for(let a=0;a<i;a++)for(let o=0;o<i;o++){let[s,c]=r&4?[i-1-o,a]:[o,a];for(let e=0;e<(r&3);e++)[s,c]=[i-1-c,s];let l=(Math.floor(t+s-i/2)+Y)%Y,u=(Math.floor(n+c-i/2)+X)%X;e[u*Y+l]=Math.max(e[u*Y+l],Ut[a][o]/100)}}var Qt=` .:-=+*#%@`,$t=`
  uniform float uTime;
  uniform float uGlitch;
  uniform vec2 uSnap;
  float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }
  float hash13(vec3 p) {
    p = fract(p * 0.1031);
    p += dot(p, p.zyx + 31.32);
    return fract((p.x + p.y) * p.z);
  }
  // A cosine rainbow, for the psychedelic bits.
  vec3 pal(float t) {
    return 0.5 + 0.5 * cos(6.2832 * (t + vec3(0.0, 0.33, 0.67)));
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash12(i), hash12(i + vec2(1.0, 0.0)), f.x),
               mix(hash12(i + vec2(0.0, 1.0)), hash12(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  // During glitches a few vertices shoot out along their normals.
  vec3 vertexBug(vec3 p, vec3 n) {
    float h = hash13(p * 7.0 + floor(uTime * 14.0));
    return p + n * step(1.0 - uGlitch * 0.02, h) * (0.2 + h * 0.8);
  }
  // PS1-style: snap vertices to a coarse screen grid.
  vec4 snapVertex(vec4 clip) {
    clip.xy = floor(clip.xy / clip.w * uSnap + 0.5) / uSnap * clip.w;
    return clip;
  }
`;function en(e,t,{head:n=``,vertex:r=``}={}){return e.onBeforeCompile=e=>{Object.assign(e.uniforms,t),e.vertexShader=$t+n+e.vertexShader.replace(`#include <project_vertex>`,`${r}
      transformed = vertexBug(transformed, normal);
      #include <project_vertex>
      gl_Position = snapVertex(gl_Position);`)},e.customProgramCacheKey=()=>`glitch:${r}`,e}function tn(e){let t=document.createElement(`canvas`);t.width=160,t.height=16;let n=t.getContext(`2d`);n.fillStyle=`#000`,n.fillRect(0,0,t.width,t.height),n.fillStyle=`#fff`,n.font=`bold 16px "Courier New", monospace`,n.textAlign=`center`,n.textBaseline=`middle`,[...Qt].forEach((e,t)=>n.fillText(e,t*16+8,9));let r=new e.CanvasTexture(t);return r.generateMipmaps=!1,r.minFilter=e.LinearFilter,r}var nn=`
  ${$t}
  varying vec3 vWorld;
  varying float vTear;
  void main() {
    vec3 p = position;
    // Strips of ground jump up and down while glitching.
    float row = floor(p.z * 0.5);
    float tick = floor(uTime * 10.0);
    vTear = step(1.0 - uGlitch * 0.15, hash13(vec3(row, tick, 1.0)));
    p.y += sin(p.x * 0.7 + uTime) * cos(p.z * 0.6 - uTime * 0.8) * 0.08;
    p.y += vTear * (hash13(vec3(row, 2.0, tick)) - 0.3) * 1.5;
    p = vertexBug(p, normal);
    vWorld = (modelMatrix * vec4(p, 1.0)).xyz;
    gl_Position = snapVertex(projectionMatrix * viewMatrix * vec4(vWorld, 1.0));
  }
`,rn=`
  ${$t}
  uniform vec2 uPlayer;
  uniform vec3 uFog;
  varying vec3 vWorld;
  varying float vTear;
  void main() {
    float camDist = distance(vWorld, cameraPosition);
    float n = noise(vWorld.xz * 0.4 + uTime * 0.05) * 0.6 + noise(vWorld.xz * 1.7) * 0.4;
    float d = distance(vWorld.xz, uPlayer);
    vec3 col = mix(vec3(0.04, 0.01, 0.08), pal(n * 0.7 + d * 0.03 - uTime * 0.04) * 0.6, 0.3 + n * 0.7);

    // Faceted light from the screen-space normal.
    vec3 normal = normalize(cross(dFdx(vWorld), dFdy(vWorld)));
    col *= 0.45 + 0.55 * max(dot(normal, normalize(vec3(0.4, 1.0, 0.3))), 0.0);

    // A thin grid, fading with distance.
    vec2 g = abs(fract(vWorld.xz * 0.5) - 0.5) / fwidth(vWorld.xz * 0.5);
    float line = 1.0 - min(min(g.x, g.y), 1.0);
    col += pal(camDist * 0.04 + uTime * 0.1) * line * 0.6 * (1.0 - smoothstep(6.0, 28.0, camDist));

    // Scan rings pulsing out from the player.
    float ring = smoothstep(0.03, 0.0, abs(fract(d * 0.12 - uTime * 0.25) - 0.5));
    col += pal(d * 0.05 - uTime * 0.2 + 0.5) * ring * 0.8 * (1.0 - smoothstep(4.0, 20.0, d));

    col = mix(col, pal(uTime * 0.5 + vWorld.z * 0.1), vTear * 0.5);
    col = mix(col, uFog, smoothstep(12.0, 36.0, camDist));
    gl_FragColor = vec4(pow(col, vec3(2.2)), 1.0);
  }
`,an=`
  varying vec3 vDir;
  void main() {
    vDir = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,on=`
  ${$t}
  uniform vec3 uFog;
  varying vec3 vDir;
  void main() {
    vec3 dir = normalize(vDir);
    float a = atan(dir.z, dir.x);
    vec3 col = mix(uFog, vec3(0.01, 0.0, 0.03), smoothstep(0.0, 0.6, dir.y));
    // Drifting aurora bands.
    float bands = noise(vec2(a * 3.0 + uTime * 0.05, dir.y * 18.0 - uTime * 0.3));
    col += pal(a * 0.3 + dir.y + uTime * 0.03) * smoothstep(0.55, 1.0, bands) * (1.0 - dir.y) * 0.8;
    // Slow scan bars.
    col += vec3(0.1, 0.05, 0.15) * step(0.985, fract(dir.y * 12.0 - uTime * 0.1));
    // Flickering dead pixels.
    vec2 cell = floor(vec2(a * 60.0, dir.y * 60.0));
    float star = step(0.996, hash12(cell)) * step(0.3, hash12(cell + floor(uTime * 6.0)));
    col += pal(hash12(cell + 3.0)) * star * smoothstep(0.05, 0.3, dir.y);
    gl_FragColor = vec4(pow(col, vec3(2.2)), 1.0);
  }
`,sn=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,cn=`
  ${$t}
  uniform sampler2D tScene;
  uniform sampler2D tDepth;
  uniform sampler2D tGlyphs;
  uniform vec2 uRtSize;
  uniform float uHue;
  uniform float cameraNear;
  uniform float cameraFar;
  varying vec2 vUv;

  const float GLYPHS = 10.0;
  const float CELL = 6.0; // ASCII cell, in scene pixels
  const float LEVELS = 6.0; // colour steps per channel

  float bayer2(vec2 a) { a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
  float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }

  vec3 hueShift(vec3 c, float a) {
    const vec3 k = vec3(0.57735);
    float ca = cos(a);
    return c * ca + cross(k, c) * sin(a) + k * dot(k, c) * (1.0 - ca);
  }

  vec3 sceneAt(vec2 uv) { return pow(texture2D(tScene, uv).rgb, vec3(1.0 / 2.2)); }

  float viewDepth(vec2 uv) {
    float ndc = texture2D(tDepth, uv).x * 2.0 - 1.0;
    return 2.0 * cameraNear * cameraFar / (cameraFar + cameraNear - ndc * (cameraFar - cameraNear));
  }

  void main() {
    vec2 px = vUv * uRtSize;
    float tick = floor(uTime * 20.0);

    // Slices of the screen tear sideways.
    float slice = floor(px.y / 4.0);
    float tear = step(1.0 - uGlitch * 0.25, hash12(vec2(slice, tick)));
    vec2 shift = vec2(tear * (hash12(vec2(slice, tick + 7.0)) - 0.5) * 0.15 * uGlitch, 0.0);
    vec2 uv = vUv + shift;

    // RGB split.
    float split = 0.0015 + uGlitch * 0.01;
    vec3 col = vec3(sceneAt(uv + vec2(split, 0.0)).r, sceneAt(uv).g, sceneAt(uv - vec2(split, 0.0)).b);

    // ASCII: the far world, the sky and corrupted blocks turn to text.
    vec2 cell = floor(px / CELL);
    vec3 cellCol = sceneAt((cell + 0.5) * CELL / uRtSize + shift);
    float lum = dot(cellCol, vec3(0.299, 0.587, 0.114));
    float index = floor(clamp(lum * 1.8, 0.0, 0.999) * GLYPHS);
    vec2 inCell = fract(px / CELL);
    float glyph = texture2D(tGlyphs, vec2((index + inCell.x) / GLYPHS, inCell.y)).r;
    vec3 tint = pal(dot(cell, vec2(0.013, 0.021)) + uTime * 0.08) * (0.4 + lum * 1.5);
    vec3 ascii = mix(cellCol * 0.15, mix(cellCol * 1.8, tint, 0.55) + 0.05, glyph);
    float corrupt = step(1.0 - uGlitch * 0.1, hash12(floor(px / vec2(32.0, 10.0)) + tick));
    col = mix(col, ascii, max(smoothstep(16.0, 30.0, viewDepth(uv)), corrupt));

    // Psychedelic: the hue drifts across the screen and over time, and
    // colours are pushed past their saturation. A light pull toward a
    // violet ramp keeps it all of a piece.
    float drift = uHue + uTime * 0.02 + sin(vUv.x * 3.0 + uTime * 0.3) * 0.08 + sin(vUv.y * 4.0 - uTime * 0.25) * 0.08;
    col = hueShift(col, drift * 6.2832);
    lum = dot(col, vec3(0.299, 0.587, 0.114));
    col = max(mix(vec3(lum), col, 1.4), 0.0);
    vec3 ramp = lum < 0.5
      ? mix(vec3(0.02, 0.0, 0.05), vec3(0.35, 0.1, 0.5), lum * 2.0)
      : mix(vec3(0.35, 0.1, 0.5), vec3(1.0, 0.78, 0.95), lum * 2.0 - 1.0);
    col = mix(col, ramp, 0.1);

    // Grain, scanlines and the odd noise bar.
    col += (hash12(px + fract(uTime) * 100.0) - 0.5) * 0.07;
    col *= 0.88 + 0.12 * step(0.5, fract(px.y * 0.5));
    float bar = step(0.996 - uGlitch * 0.03, hash12(vec2(floor(px.y / 2.0), tick)));
    col = mix(col, vec3(hash12(px + tick)), bar * 0.6);

    // Ordered dither down to a few levels.
    col = floor(col * LEVELS + bayer4(px)) / LEVELS;
    gl_FragColor = vec4(col, 1.0);
  }
`,ln=`
  ${$t}
  uniform float uScale;
  attribute vec3 aColor;
  attribute float aLife;
  varying vec3 vColor;
  varying float vLife;
  void main() {
    vColor = aColor;
    vLife = aLife;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = uScale * (0.3 + aLife * 0.7) / -mv.z;
    gl_Position = snapVertex(projectionMatrix * mv);
  }
`,un=`
  varying vec3 vColor;
  varying float vLife;
  void main() {
    gl_FragColor = vec4(pow(vColor * min(vLife * 1.5, 1.0), vec3(2.2)), 1.0);
  }
`,dn=`
  ${$t}
  uniform sampler2D tScene;
  uniform sampler2D tPrev;
  uniform vec2 uRtSize;
  uniform vec2 uFlow;
  uniform float uMosh;
  varying vec2 vUv;

  const float BLOCK = 8.0;

  float luma(vec2 uv) { return dot(texture2D(tScene, uv).rgb, vec3(0.299, 0.587, 0.114)); }

  void main() {
    vec2 block = floor(vUv * uRtSize / BLOCK);
    vec3 cur = texture2D(tScene, vUv).rgb;
    if (hash12(block + floor(uTime * 8.0) * 17.0) >= uMosh) {
      gl_FragColor = vec4(cur, 1.0);
      return;
    }
    // Each block's motion: the camera's, a drift of its own, and a push
    // along the edges in the new frame.
    vec2 texel = 1.0 / uRtSize;
    vec2 centre = (block + 0.5) * BLOCK * texel;
    vec2 edge = vec2(
      luma(centre + vec2(texel.x * 4.0, 0.0)) - luma(centre - vec2(texel.x * 4.0, 0.0)),
      luma(centre + vec2(0.0, texel.y * 4.0)) - luma(centre - vec2(0.0, texel.y * 4.0)));
    vec2 drift = (vec2(hash12(block + 3.1), hash12(block + 7.7)) - 0.5) * 3.0 * texel;
    vec3 prev = texture2D(tPrev, vUv - (uFlow + drift + edge * 6.0 * texel)).rgb;
    // The old pixels slowly take on the new frame.
    gl_FragColor = vec4(prev + (cur - prev) * 0.06, 1.0);
  }
`,fn=500,pn=-1e3;function mn(e,t,n){let r=new Float32Array(fn*3).fill(pn),i=new Float32Array(fn*3),a=new Float32Array(fn),o=new Float32Array(fn*3),s=new Float32Array(fn),c=new e.BufferGeometry,l=new e.BufferAttribute(r,3).setUsage(e.DynamicDrawUsage),u=new e.BufferAttribute(i,3).setUsage(e.DynamicDrawUsage),d=new e.BufferAttribute(a,1).setUsage(e.DynamicDrawUsage);c.setAttribute(`position`,l),c.setAttribute(`aColor`,u),c.setAttribute(`aLife`,d);let f={value:100},p=new e.Points(c,new e.ShaderMaterial({uniforms:{...t,uScale:f},vertexShader:ln,fragmentShader:un,transparent:!0,depthWrite:!1,blending:e.AdditiveBlending}));p.frustumCulled=!1;let m=0,h=!1;function g(e,t,n,c,l,d,{up:f=1,flat:p=!1}={}){for(let u=0;u<c;u++){let c=m;m=(m+1)%fn;let u=Math.random()*Math.PI*2,h=p?Math.random()*.3:Math.random()*2-.4,g=l*(.4+Math.random()*.6);r.set([e,t,n],c*3),o.set([Math.cos(u)*g,(h+f*.5)*g,Math.sin(u)*g],c*3);let _=d[Math.random()*d.length|0];i.set([(_>>16&255)/255,(_>>8&255)/255,(_&255)/255],c*3),a[c]=1,s[c]=1/(.5+Math.random()*.9)}u.needsUpdate=!0,h=!0}function _(e){if(!h)return;h=!1;let t=Math.exp(-1.5*e);for(let i=0;i<fn;i++){if(a[i]<=0)continue;h=!0;let c=i*3;o[c]*=t,o[c+1]=o[c+1]*t-9*e,o[c+2]*=t,r[c]+=o[c]*e,r[c+1]+=o[c+1]*e,r[c+2]+=o[c+2]*e;let l=n(r[c],r[c+2])+.05;r[c+1]<l&&(r[c+1]=l,o[c+1]*=-.5,o[c]*=.7,o[c+2]*=.7),a[i]-=s[i]*e,a[i]<=0&&(a[i]=0,r[c+1]=pn)}l.needsUpdate=!0,d.needsUpdate=!0}function v(e){f.value=e*.12}return{points:p,burst:g,update:_,setScale:v}}var hn=`modulepreload`,gn=function(e){return`/`+e},_n={},vn=function(e){return e.pathname.endsWith(`.css`)},yn=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},bn=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=gn(t,n);let r=s(t),i=vn(r);return yn(_n,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:hn,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},xn=2756688,Sn=30,Cn=12,wn=14,Tn=[12150783,16740814,118270,393121,16776086],En=.5,Dn=30,On=6,kn=8,An=22,jn=10,Mn=.6,Nn=3,Pn=10,Fn=2,In=5,Ln=.15;function Z(e,t){return .8*Math.sin(e*.18)*Math.cos(t*.15)+.4*Math.sin((e+t)*.31)+.3*Math.cos(t*.4-e*.1)}function Rn(e,t){let n=.1,r=(Z(e-n,t)-Z(e+n,t))/(2*n),i=(Z(e,t-n)-Z(e,t+n))/(2*n),a=Math.hypot(r,1,i);return[r/a,1/a,i/a]}var Q={nx:0,ny:0,nz:0};function zn(e,t,n,r){let i=n.x-e.x,a=n.y+r-(e.y+t),o=n.z-e.z,s=Math.hypot(i,a,o),c=e.r+n.r;if(s>=c||s===0)return 0;let l=i/s,u=a/s,d=o/s;Q.nx=l,Q.ny=u,Q.nz=d;let f=c-s,p=n.m/(e.m+n.m);e.x-=l*f*p,e.y-=u*f*p,e.z-=d*f*p,n.x+=l*f*(1-p),n.y+=u*f*(1-p),n.z+=d*f*(1-p);let m=(n.vx-e.vx)*l+(n.vy-e.vy)*u+(n.vz-e.vz)*d;if(m>=0)return 0;let h=-1.6*m/(1/e.m+1/n.m);return e.vx-=h*l/e.m,e.vy-=h*u/e.m,e.vz-=h*d/e.m,n.vx+=h*l/n.m,n.vy+=h*u/n.m,n.vz+=h*d/n.m,-m}function Bn(e,t,n,r,i,a,o){let s=e.y+t,c=e.x-n,l=o===void 0?s-r:0;if(o!==void 0&&s-e.r>o)return 0;let u=e.z-i,d=Math.hypot(c,l,u);if(d>=e.r+a||d===0)return 0;c/=d,l/=d,u/=d,Q.nx=c,Q.ny=l,Q.nz=u;let f=e.r+a-d;e.x+=c*f,e.y+=l*f,e.z+=u*f;let p=e.vx*c+e.vy*l+e.vz*u;return p>=0?0:(e.vx-=1.6*p*c,e.vy-=1.6*p*l,e.vz-=1.6*p*u,-p)}var Vn=`
  uniform vec3 uJiggle;
  uniform float uRipple;
`,Hn=`
  float lift = clamp((position.y + 0.6) / 1.2, 0.0, 1.0);
  transformed += uJiggle * lift * lift;
  transformed += normal * uRipple * (
    sin(position.y * 9.0 - uTime * 7.0 + position.x * 4.0) * 0.03 +
    sin(position.z * 7.0 + uTime * 5.0) * 0.02);
`,Un={id:`wobble-world`,title:`Wobble World`,icon:`/icons/blob.svg`,width:520,height:400,minWidth:240,minHeight:180,singleInstance:!0,hidden:!0,mount(e){e.innerHTML=`
      <div class="wobble">
        <canvas tabindex="0" data-testid="wobble"></canvas>
        <div class="wobble-juice" data-testid="wobble-juice">juice 0</div>
        <div class="wobble-hint">WASD / arrows · space to jump · drag to look</div>
      </div>
    `;let t=e.querySelector(`.wobble`),n=e.querySelector(`canvas`),r=e.querySelector(`.wobble-juice`),i=null,a=!1;return bn(()=>import(`./three.module-CDJkRhUe.js`).then(e=>{a||(i=Wn(e,t,n,r))}),[]),()=>{a=!0,i?.()}}};function Wn(e,t,n,r){let i=new e.WebGLRenderer({canvas:n});i.setPixelRatio(Math.min(devicePixelRatio,1.5));let a=new e.Scene;a.fog=new e.Fog(xn,14,38);let o=new e.PerspectiveCamera(60,1,.1,200),s=new e.Vector3(42/255,16/255,80/255),c={uTime:{value:0},uGlitch:{value:0},uSnap:{value:new e.Vector2(100,100)},uFog:{value:s}},l=t=>en(new e.MeshToonMaterial({color:t}),c),u=new e.WebGLRenderTarget(1,1,{minFilter:e.NearestFilter,magFilter:e.NearestFilter,depthTexture:new e.DepthTexture(1,1)}),d=tn(e),f=new e.Mesh(new e.PlaneGeometry(2,2),new e.ShaderMaterial({uniforms:{...c,tScene:{value:null},tDepth:{value:u.depthTexture},tGlyphs:{value:d},uRtSize:{value:new e.Vector2(1,1)},uHue:{value:0},cameraNear:{value:o.near},cameraFar:{value:o.far}},vertexShader:sn,fragmentShader:cn,depthTest:!1}));f.frustumCulled=!1;let p=new e.Scene;p.add(f);let m=new e.OrthographicCamera(-1,1,1,-1,0,1),h=[0,1].map(()=>new e.WebGLRenderTarget(1,1,{minFilter:e.NearestFilter,magFilter:e.NearestFilter,depthBuffer:!1})),g=new e.Mesh(new e.PlaneGeometry(2,2),new e.ShaderMaterial({uniforms:{...c,tScene:{value:u.texture},tPrev:{value:null},uRtSize:f.material.uniforms.uRtSize,uFlow:{value:new e.Vector2},uMosh:{value:0}},vertexShader:sn,fragmentShader:dn,depthTest:!1}));g.frustumCulled=!1;let _=new e.Scene;_.add(g);let v=0,ee=new e.Mesh(new e.SphereGeometry(100,32,16),new e.ShaderMaterial({uniforms:c,vertexShader:an,fragmentShader:on,side:e.BackSide,depthWrite:!1}));ee.renderOrder=-1,a.add(ee);let y=new e.PlaneGeometry(90,90,80,80);y.rotateX(-Math.PI/2);let b=y.attributes.position;for(let e=0;e<b.count;e++)b.setY(e,Z(b.getX(e),b.getZ(e)));y.computeVertexNormals();let x=new e.Mesh(y,new e.ShaderMaterial({uniforms:{...c,uPlayer:{value:new e.Vector2}},vertexShader:nn,fragmentShader:rn}));a.add(x),a.add(new e.HemisphereLight(16777215,5909130,1.6));let S=new e.DirectionalLight(16777215,1.6);S.position.set(4,10,3),a.add(S);let C=new e.Object3D,te=[{geometry:new e.IcosahedronGeometry(.7,0),material:l(16777215),colors:Tn},{geometry:new e.TorusGeometry(.6,.22,8,20),material:en(new e.MeshBasicMaterial({wireframe:!0}),c),colors:[393121,118270,16740814]},{geometry:new e.BoxGeometry(.4,3,.4),material:l(16777215),colors:[3804323,1706554,16740814],monolith:!0}].map(({geometry:t,material:n,colors:r,monolith:i})=>{let o=new e.InstancedMesh(t,n,wn),s=[];for(let t=0;t<wn;t++){let n=Math.random()*Math.PI*2,a=6+Math.random()*30,c=Math.cos(n)*a,l=Math.sin(n)*a,u=.7+Math.random()*1.3,d=i?1.5*u-.3:t<5?1.9+Math.random()*.5:2+Math.random()*6;s.push({x:c,z:l,y:Z(c,l)+d,size:u,r:(i?.28:.75)*u,spin:(Math.random()-.5)*(i?.3:2),phase:Math.random()*10,offset:[0,0,0],push:[0,0,0],boost:0,shake:0,color:r[t%r.length]}),o.setColorAt(t,new e.Color(r[t%r.length]))}return a.add(o),{mesh:o,items:s,monolith:i}}),w=new e.SphereGeometry(.3,12,8),T=new e.SphereGeometry(.55,12,8),ne=[];for(let t=0;t<Cn;t++){let n=Tn[t%Tn.length],r=new e.Mesh(w,en(new e.MeshBasicMaterial({color:n,fog:!1}),c)),i=new e.Mesh(T,new e.MeshBasicMaterial({color:n,transparent:!0,opacity:.35,blending:e.AdditiveBlending,depthWrite:!1}));r.add(i),a.add(r),ne.push({mesh:r,glow:i,pop:0,phase:Math.random()*10}),ae(ne[t])}let re=new e.IcosahedronGeometry(1,2),E=[];for(let t=0;t<jn;t++){let n=Tn[(t+2)%Tn.length],r=t===0?.6:.4+Math.random()*.5,i=Math.random()*Math.PI*2,o=5+Math.random()*20,s=t===0?0:Math.cos(i)*o,l=t===0?-3.5:Math.sin(i)*o,u=new e.Group,d=new e.Mesh(re,en(new e.MeshLambertMaterial({color:n,flatShading:!0}),c));d.scale.setScalar(r),u.add(d),a.add(u),E.push({holder:u,mesh:d,color:n,r,m:r**3*4,x:s,y:Z(s,l)+r,z:l,vx:0,vy:0,vz:0,squash:[0,0]})}let ie=mn(e,c,Z);a.add(ie.points);function ae(e){let t=Math.random()*Math.PI*2,n=4+Math.random()*24;e.x=Math.cos(t)*n,e.z=Math.sin(t)*n,e.pop=0,e.mesh.scale.setScalar(1)}let oe=new e.Group,se=new e.Group;oe.add(se),a.add(oe);let D={...c,uJiggle:{value:new e.Vector3},uRipple:{value:0}},ce=new e.Mesh(new e.SphereGeometry(.6,40,30),en(new e.MeshToonMaterial({color:16740814}),D,{head:Vn,vertex:Hn}));ce.position.y=.6,se.add(ce);let le=new e.CylinderGeometry(.035,.05,.32,6);le.translate(0,.16,0);let O=new e.SphereGeometry(.17,16,12),k=new e.SphereGeometry(.08,10,8),A=new e.MeshBasicMaterial({color:657946}),j=[-1,1].map(t=>{let n=new e.Group;n.position.set(t*.22,1,.25),n.add(new e.Mesh(le,l(16740814)));let r=new e.Mesh(O,l(16777215));r.position.set(0,.36,.05);let i=new e.Mesh(k,A);return i.position.z=.12,r.add(i),n.add(r),se.add(n),{pivot:n,pupil:i,side:t,x:[0,0],z:[0,0]}}),M=new e.Group;M.position.set(0,1.15,-.15);let ue=new e.Mesh(new e.CylinderGeometry(.03,.03,.45,6),l(12150783));ue.position.y=.22;let N=new e.Mesh(new e.SphereGeometry(.1,12,10),en(new e.MeshToonMaterial({color:16776086,emissive:16776086,emissiveIntensity:.6}),c));N.position.y=.48,M.add(ue,N),se.add(M);let de=new e.CapsuleGeometry(.11,.2,4,8);de.translate(0,-.15,0);let fe=[-1,1].map(t=>{let n=new e.Mesh(de,l(12150783));return n.position.set(t*.25,.22,0),oe.add(n),n}),P=l(16740814),F=[-1,1].map(t=>{let n=new e.Object3D;n.position.set(t*.55,.55,0),se.add(n);let r=[];for(let t=0;t<In;t++){let n=new e.Mesh(new e.SphereGeometry(.14-t*.018,10,8),P);a.add(n),r.push({mesh:n,pos:new e.Vector3,prev:new e.Vector3})}return{shoulder:n,beads:r,side:t}}),pe=new e.Mesh(new e.CircleGeometry(.6,24),new e.MeshBasicMaterial({color:0,transparent:!0,opacity:.3,depthWrite:!1}));pe.rotation.x=-Math.PI/2,a.add(pe);let I={x:0,y:Z(0,0),z:0,vx:0,vy:0,vz:0,r:Mn,m:Nn,grounded:!0,facing:0},L=[0,0],me=[0,0],he=[0,0],ge=[0,0],R=[0,0],_e=[0,0],ve=0,ye=0,z=0,B=.35,be=0,xe=0,V=0,Se=2,Ce=1,H=0,we=3,Te=0,Ee=B,U=0,De=0,W=0,Oe=!1;function G(e,t,n,r,i){e[1]+=((t-e[0])*n-e[1]*r)*i,e[0]+=e[1]*i}let ke=new Set;n.addEventListener(`keydown`,e=>{let t=e.key.toLowerCase();[` `,`arrowup`,`arrowdown`,`arrowleft`,`arrowright`].includes(t)&&e.preventDefault(),t===` `&&I.grounded&&(I.vy=kn,I.grounded=!1,L[1]+=6,R[1]-=4),ke.add(t)}),n.addEventListener(`keyup`,e=>ke.delete(e.key.toLowerCase())),n.addEventListener(`blur`,()=>ke.clear());let Ae=(...e)=>e.some(e=>ke.has(e)),je=null;n.addEventListener(`pointerdown`,e=>{n.focus(),n.setPointerCapture(e.pointerId),je={x:e.clientX,y:e.clientY}}),n.addEventListener(`pointermove`,e=>{je&&=(z-=(e.clientX-je.x)*.008,B=Math.min(1.1,Math.max(.1,B+(e.clientY-je.y)*.005)),{x:e.clientX,y:e.clientY})}),n.addEventListener(`pointerup`,()=>je=null),n.addEventListener(`pointercancel`,()=>je=null);let Me=new ResizeObserver(()=>{let{clientWidth:e,clientHeight:n}=t;if(!e||!n)return;i.setSize(e,n,!1),o.aspect=e/n,o.updateProjectionMatrix();let r=Math.max(1,Math.round(e*i.getPixelRatio()*En)),a=Math.max(1,Math.round(n*i.getPixelRatio()*En));u.setSize(r,a);for(let e of h)e.setSize(r,a);f.material.uniforms.uRtSize.value.set(r,a),c.uSnap.value.set(r/5,a/5),ie.setScale(a/(2*Math.tan(o.fov*Math.PI/360)))});Me.observe(t);let Ne=new e.Vector3,Pe=new e.Vector3,K=new e.Vector3;function Fe(e){se.updateMatrixWorld();for(let{shoulder:t,beads:n,side:r}of F){t.getWorldPosition(Ne),Pe.set(r*Math.cos(I.facing),0,-r*Math.sin(I.facing)),Oe||(n.forEach((e,t)=>e.pos.copy(Ne).addScaledVector(Pe,Ln*(t+1))),n.forEach(e=>e.prev.copy(e.pos)));let i=Ne;n.forEach((t,n)=>{K.copy(t.pos).sub(t.prev).multiplyScalar(.9),t.prev.copy(t.pos),t.pos.add(K),t.pos.y-=3*e*e,K.copy(i).addScaledVector(Pe,Ln).sub(t.pos),t.pos.addScaledVector(K,.12),K.copy(t.pos).sub(i).setLength(Ln),t.pos.copy(i).add(K),t.pos.y=Math.max(t.pos.y,Z(t.pos.x,t.pos.z)+.06),t.mesh.position.copy(t.pos),t.mesh.scale.setScalar(1+Math.sin(W*9+n+r)*.1),i=t.pos})}Oe=!0}function Ie(e,t,r,i,a,o){i<Fn||(ie.burst(e,t,r,Math.min(50,i*5)|0,i*.7,a),V=Math.max(V,Math.min(.9,i*.07)),H=Math.max(H,Math.min(.7,i*.05)),o&&(De+=1,n.dataset.hits=De,L[1]-=i*.5,ge[1]+=(Math.random()-.5)*i,R[1]+=(Math.random()-.5)*i,ve+=i*.1))}let Le=te.find(e=>e.monolith).items,Re=te.filter(e=>!e.monolith).flatMap(e=>e.items),ze=e=>Math.sin(W+e.phase)*.5;function Be(e){for(let t of E){t.vy-=An*e,t.x+=t.vx*e,t.y+=t.vy*e,t.z+=t.vz*e;let n=Z(t.x,t.z)+t.r;if(t.y<n){t.y=n;let[r,i,a]=Rn(t.x,t.z),o=t.vx*r+t.vy*i+t.vz*a;if(o<0){let e=-o>3?.5:0;t.vx-=(1+e)*o*r,t.vy-=(1+e)*o*i,t.vz-=(1+e)*o*a,e&&(t.squash[1]+=o*.6,Ie(t.x,t.y-t.r,t.z,-o,[t.color],!1))}if(i>.95&&Math.hypot(t.vx,t.vy,t.vz)<.5)t.vx=t.vy=t.vz=0;else{let n=Math.exp(-.8*e);t.vx*=n,t.vz*=n}}let r=Math.hypot(t.x,t.z);if(r>Sn){let e=t.x/r,n=t.z/r;t.x=e*Sn,t.z=n*Sn;let i=t.vx*e+t.vz*n;i>0&&(t.vx-=2*i*e,t.vz-=2*i*n)}for(let e of Le){let n=Bn(t,0,e.x,0,e.z,e.r,e.y+1.5*e.size);n&&(e.shake=1,t.squash[1]-=n*.5,Ie(t.x-Q.nx*t.r,t.y,t.z-Q.nz*t.r,n,[t.color,e.color],!1))}}for(let e=0;e<E.length;e++)for(let t=e+1;t<E.length;t++){let n=E[e],r=E[t],i=zn(n,0,r,0);i&&(n.squash[1]-=i*.4,r.squash[1]-=i*.4,Ie(n.x+Q.nx*n.r,n.y+Q.ny*n.r,n.z+Q.nz*n.r,i,[n.color,r.color],!1))}for(let e of E){let t=!I.grounded&&I.vy<-1,n=zn(I,Mn,e,0);n&&(t&&Q.ny<-.6?(I.vy=Pn,I.grounded=!1,L[1]+=6):I.grounded&&(I.vy=0),e.squash[1]-=n*.6,Ie(I.x+Q.nx*Mn,I.y+Mn+Q.ny*Mn,I.z+Q.nz*Mn,n,[e.color,16740814],!0))}for(let e of Le){let t=Bn(I,Mn,e.x,0,e.z,e.r,e.y+1.5*e.size);t&&(e.shake=1,Ie(I.x-Q.nx*Mn,I.y+Mn,I.z-Q.nz*Mn,t,[16740814,e.color,393121],!0))}for(let e of Re){let t=e.x+e.offset[0],n=e.y+ze(e)+e.offset[1],r=e.z+e.offset[2],i=Bn(I,.9,t,n,r,e.r);i&&(I.grounded&&(I.vy=0),e.push[0]-=Q.nx*i*1.5,e.push[1]-=Q.ny*i*1.5,e.push[2]-=Q.nz*i*1.5,e.boost+=i,Ie(t+Q.nx*e.r,n+Q.ny*e.r,r+Q.nz*e.r,i,[e.color,16776086],!0))}}let Ve=new e.Vector3,He=new e.Vector3;function Ue(e){W+=e;let t=Ae(`d`,`arrowright`)-Ae(`a`,`arrowleft`),i=Ae(`w`,`arrowup`)-Ae(`s`,`arrowdown`),a=-Math.sin(z),s=-Math.cos(z),l=a*i+-s*t,u=s*i+a*t,d=Math.hypot(l,u);d?(l/=d,u/=d,I.vx+=l*Dn*e,I.vz+=u*Dn*e):(I.vx*=Math.exp(-6*e),I.vz*=Math.exp(-6*e));let p=Math.hypot(I.vx,I.vz);p>On&&(I.vx*=On/p,I.vz*=On/p),I.x+=I.vx*e,I.z+=I.vz*e;let m=Math.hypot(I.x,I.z);m>Sn&&(I.x*=Sn/m,I.z*=Sn/m);let h=Z(I.x,I.z);if(I.grounded)I.y=h;else if(I.vy-=An*e,I.y+=I.vy*e,I.y<=h){let e=Math.min(-I.vy,14);L[1]-=e,R[1]+=e*.5,ve+=e*.15,e>8&&(V=Math.max(V,.6)),e>4&&ie.burst(I.x,h+.1,I.z,24,e*.5,[12150783,118270,16740814],{flat:!0}),I.y=h,I.vy=0,I.grounded=!0}if(Be(e),p>.3){let t=Math.atan2(I.vx,I.vz)-I.facing;t=Math.atan2(Math.sin(t),Math.cos(t)),I.facing+=t*Math.min(1,e*10)}if(Ce-=e,Ce<0){Ce=1+Math.random()*2.5,ge[1]+=(Math.random()-.5)*6,R[1]+=(Math.random()-.5)*6;let e=j[Math.random()<.5?0:1];e.x[1]+=(Math.random()-.5)*12,L[1]+=(Math.random()-.3)*2}let _=Math.min(p/On,1);ye+=e*(4+p*2.2);let v=Math.sin(I.facing),y=Math.cos(I.facing),b=d?l*y-u*v:0,S=d?l*v+u*y:0;G(L,I.grounded?Math.sin(ye*2)*.08*_:.14,150,4.5,e),G(me,S*.18+_*.08,110,6,e),G(he,-b*.18+Math.sin(ye)*.06*_,110,6,e),G(ge,-b*.25+Math.sin(ye)*.08*_,70,3,e),G(R,-S*.25,70,3,e),G(_e,-me[0]*2-R[0]*2,60,2.5,e),ve+=(.3+_*.7-ve)*Math.min(1,e*2),oe.position.set(I.x,I.y,I.z),oe.rotation.y=I.facing;let w=1+L[0];se.scale.set(1/Math.sqrt(w),w,1/Math.sqrt(w)),se.rotation.set(me[0],0,he[0]),D.uJiggle.value.set(ge[0],0,R[0]),D.uRipple.value=ve,M.rotation.set(_e[0],0,-he[0]*2-ge[0]);for(let t of j)G(t.x,R[0]*1.6+Math.sin(W*3+t.side)*.05,50+t.side*12,2.2,e),G(t.z,-ge[0]*1.6+t.side*.2,50-t.side*12,2.2,e),t.pivot.rotation.set(t.x[0],0,t.z[0]),t.pupil.position.set(-t.z[0]*.1,t.x[0]*.1,.12);fe.forEach((e,t)=>{let n=ye+t*Math.PI+Math.sin(ye*.5)*.4;e.rotation.x=I.grounded?Math.sin(n)*.9*_:-.6,e.rotation.z=(t?1:-1)*(.1+Math.cos(n)*.15*_)}),Fe(e);let T=I.y-h;pe.position.set(I.x,h+.05,I.z),pe.scale.setScalar(1/(1+T*.3)),pe.material.opacity=.3/(1+T*.5),V*=Math.exp(-3*e),Se-=e,Se<0&&(Se=2+Math.random()*4,V=Math.max(V,.3+Math.random()*.5));for(let t of ne)t.pop>0?(t.pop+=e*4,t.mesh.scale.setScalar(Math.max(0,1+t.pop-t.pop*t.pop*1.5)),t.pop>1.2&&ae(t)):Math.hypot(t.x-I.x,t.z-I.z)<1&&Math.abs(t.mesh.position.y-I.y-.6)<1.4&&(t.pop=.01,U+=1,xe+=.17,L[1]+=4,ve+=1,V=1.5,H=.95,ie.burst(t.x,t.mesh.position.y,t.z,80,7,Tn,{up:1.5}),r.textContent=`juice ${U}`,n.dataset.juice=U),t.mesh.position.set(t.x,Z(t.x,t.z)+1+Math.sin(W*2+t.phase)*.25,t.z),t.glow.material.opacity=.3+Math.sin(W*5+t.phase)*.08+(Math.random()<V*.3?.4:0);for(let{mesh:t,items:n,monolith:r}of te)n.forEach((n,i)=>{for(let t=0;t<3;t++)n.push[t]+=(-n.offset[t]*20-n.push[t]*3)*e,n.offset[t]+=n.push[t]*e;n.boost*=Math.exp(-1.5*e),n.phase+=n.boost*e*2,n.shake*=Math.exp(-4*e),C.position.set(n.x+n.offset[0],n.y+(r?0:ze(n))+n.offset[1],n.z+n.offset[2]),r&&Math.random()<.02+V*.3+n.shake&&(C.position.x+=(Math.random()-.5)*.4,C.position.y+=(Math.random()-.5)*.3),C.rotation.set(r?0:W*n.spin,W*n.spin*.7+n.phase,0),C.scale.setScalar(n.size),C.updateMatrix(),t.setMatrixAt(i,C.matrix)}),t.instanceMatrix.needsUpdate=!0;for(let t of E){G(t.squash,0,120,5,e);let n=Math.max(.4,1+t.squash[0]);t.holder.position.set(t.x,t.y,t.z),t.holder.scale.set(1/Math.sqrt(n),n,1/Math.sqrt(n));let r=Math.hypot(t.vx,t.vz);r>.01&&(Ve.set(t.vz,0,-t.vx).normalize(),t.mesh.rotateOnWorldAxis(Ve,r*e/t.r))}ie.update(e),He.set(I.x+Math.sin(z)*Math.cos(B)*6,I.y+1+Math.sin(B)*6,I.z+Math.cos(z)*Math.cos(B)*6),He.y=Math.max(He.y,Z(He.x,He.z)+.5),o.position.lerp(He,Math.min(1,e*6)),o.lookAt(I.x,I.y+1,I.z),ee.position.copy(o.position),H*=Math.exp(-1.5*e),we-=e,we<0&&(we=3+Math.random()*5,H=Math.max(H,.6+Math.random()*.35));let re=z-Te,ce=B-Ee;Te=z,Ee=B;let le=I.vx*Math.cos(z)-I.vz*Math.sin(z),O=-(I.vx*Math.sin(z)+I.vz*Math.cos(z));g.material.uniforms.uFlow.value.set(re*.3-le*e*.025,-ce*.3-O*e*.02),g.material.uniforms.uMosh.value=Math.min(.97,.1+H+Math.min(.3,Math.abs(re)/Math.max(e,.001)*.1)),be+=(xe-be)*Math.min(1,e*2),c.uTime.value=W,c.uGlitch.value=V+.04,f.material.uniforms.uHue.value=be,x.material.uniforms.uPlayer.value.set(I.x,I.z),n.dataset.x=I.x.toFixed(2),n.dataset.z=I.z.toFixed(2)}let We=0,Ge=performance.now();function Ke(e){Ue(Math.min(e-Ge,50)/1e3),Ge=e,i.setRenderTarget(u),i.render(a,o);let t=h[v];v=1-v;let n=h[v];g.material.uniforms.tPrev.value=t.texture,i.setRenderTarget(n),i.render(_,m),f.material.uniforms.tScene.value=n.texture,i.setRenderTarget(null),i.render(p,m),We=requestAnimationFrame(Ke)}return o.position.set(0,4,6),n.dataset.juice=0,n.dataset.hits=0,n.dataset.ready=`true`,n.focus(),We=requestAnimationFrame(Ke),()=>{cancelAnimationFrame(We),Me.disconnect();for(let e of h)e.dispose();for(let e of[a,p,_])e.traverse(e=>{e.geometry?.dispose(),e.material?.dispose(),e.isInstancedMesh&&e.dispose()});u.depthTexture.dispose(),u.dispose(),d.dispose(),i.dispose(),i.forceContextLoss()}}var Gn=(e,t,n=`svg`)=>Array.from({length:t},(t,r)=>({src:o(`/projects/${e}/${String(r+1).padStart(2,`0`)}.${n}`)})),Kn=(e,t)=>t.flatMap(t=>[`l`,`r`].map(n=>({src:o(`/projects/${e}/${String(t).padStart(2,`0`)}-${n}.jpg`)}))),qn=(e,t)=>Array.from({length:t-e+1},(t,n)=>e+n),Jn=(e,t)=>qn(1,t).map(t=>{let n=o(`/projects/${e}/${String(t).padStart(2,`0`)}`);return{src:`${n}.jpg`,thumb:`${n}-s.jpg`}}),Yn=[{slug:`borderlife`,category:`art`,title:`Borderlife`,year:2019,medium:`Photography book`,place:`South Korea`,thumb:o(`/projects/borderlife/book-photo.jpg`),layout:`book`,cover:o(`/projects/borderlife/cover.jpg`),pageAspect:3543/2/1654,media:Kn(`borderlife`,[1,...qn(3,37)]),object:{src:o(`/projects/borderlife/book-photo.jpg`),caption:`The printed book, 2019`},text:`Nine years after our last visit, I am returning with my mother to her home country: South Korea. This reporting work deals with the existence of borders. The nationality border, in relation to my mother, who went to live abroad, and who is no longer seen as a Korean in Korea, nor as a Swiss in Switzerland. The second border is that of the territory where I document the life of a part of my family who lives in the last town before the demilitarized zone between the two Koreas.

Borderlife is my diploma work, at the end of my training as a photographer.`},{slug:`yellow-vests`,category:`art`,title:`Yellow Vests`,year:2018,medium:`Photojournalism`,place:`Paris`,thumb:o(`/projects/yellow-vests/02.svg`),layout:`reportage`,media:Gn(`yellow-vests`,6).map((e,t)=>({...e,caption:`Placeholder caption ${t+1}: place, date, what is happening.`})),text:`Pictures taken during the yellow vests protests in Paris, while I was working as a photojournalist.

Placeholder: more about those days on the streets.`},{slug:`alzheimer`,category:`art`,title:`Alzheimer`,year:2017,medium:`Photography book`,thumb:o(`/projects/alzheimer/book-photo.jpg`),layout:`book`,cover:o(`/projects/alzheimer/cover.jpg`),back:o(`/projects/alzheimer/back.jpg`),pageAspect:10/9,media:Gn(`alzheimer`,14,`jpg`),object:{src:o(`/projects/alzheimer/book-photo.jpg`),caption:`The printed book, 2017`},text:`Photography book, published in 2017.

Placeholder: a few lines about the book.`},{slug:`auratorio`,category:`commercial`,title:`Auratorio`,subtitle:`The Nocturnal Path`,logo:o(`/projects/auratorio/logo.png`),year:2021,medium:`Visual concept, branding, 3D showroom`,place:`Lausanne`,thumb:o(`/projects/auratorio/thumb.jpg`),layout:`showcase`,background:o(`/projects/auratorio/ambient.mp4`),media:[{src:o(`/projects/auratorio/4106.jpg`),width:1600,height:1066,hero:!0},{src:o(`/projects/auratorio/4024.jpg`),width:1600,height:1066},{src:o(`/projects/auratorio/4126.jpg`),width:1600,height:1066},{src:o(`/projects/auratorio/4176.jpg`),width:1066,height:1600},{text:`Placeholder: the 3D showroom, the Oasis, open only at night.`},{src:o(`/projects/auratorio/4236.jpg`),width:1066,height:1600},{src:o(`/projects/auratorio/4186.jpg`),width:1600,height:1066},{video:o(`/projects/auratorio/ad.mp4`),poster:o(`/projects/auratorio/thumb.jpg`)},{text:`The visual concept was backed by market studies and research. The concept, censored: its content belongs to the brand.`,pages:Jn(`auratorio/concept`,53)}],text:`A visual concept for Auratorio, a clothing brand from Lausanne.

Placeholder: what the project is and how it came about.`}];function Xn(e,t){if(!t.logo){e.textContent=t.title;return}let n=document.createElement(`img`);n.className=`project-logo`,n.src=t.logo,n.alt=t.title,n.draggable=!1,e.replaceChildren(n)}var Zn=.12;function Qn(e,t,n){e.innerHTML=`
    <div class="index" data-testid="projects-index">
      <ol class="index-list"></ol>
      <div class="index-preview" aria-hidden="true"><img alt="" /></div>
    </div>
  `;let r=e.querySelector(`.index`),i=r.querySelector(`.index-list`),a=r.querySelector(`.index-preview`),o=a.querySelector(`img`);for(let[e,r]of[...t].sort((e,t)=>t.year-e.year).entries()){let t=document.createElement(`li`);t.innerHTML=`
      <button class="index-row" data-slug="${r.slug}">
        <span class="index-num">${String(e+1).padStart(2,`0`)}</span>
        <span class="index-title"></span>
        <span class="index-meta"><span class="index-medium"></span><span class="index-year">${r.year}</span></span>
      </button>
    `,Xn(t.querySelector(`.index-title`),r),t.querySelector(`.index-medium`).textContent=r.medium??``;let a=t.querySelector(`.index-row`);a.addEventListener(`click`,()=>n(r)),a.addEventListener(`pointerenter`,()=>l(r)),a.addEventListener(`focus`,()=>l(r)),i.append(t)}let s=null,c=0;function l(e){r.classList.add(`is-hovering`);for(let t of i.querySelectorAll(`.index-row`))t.classList.toggle(`is-active`,t.dataset.slug===e.slug);clearTimeout(c),s===e?a.classList.add(`is-visible`):(a.classList.remove(`is-visible`),c=setTimeout(()=>{o.src=e.thumb,s=e,a.classList.add(`is-visible`)},120))}i.addEventListener(`pointerleave`,()=>{r.classList.remove(`is-hovering`),a.classList.remove(`is-visible`),clearTimeout(c)});let u={x:0,y:0},d={x:0,y:0},f=0;function p(){d.x+=(u.x-d.x)*Zn,d.y+=(u.y-d.y)*Zn,a.style.transform=`translate(${d.x}px, ${d.y}px) translate(-50%, -50%)`,f=Math.abs(u.x-d.x)<.5&&Math.abs(u.y-d.y)<.5?0:requestAnimationFrame(p)}return r.addEventListener(`pointermove`,e=>{let t=r.getBoundingClientRect();u.x=e.clientX-t.left,u.y=e.clientY-t.top,f||=requestAnimationFrame(p)}),()=>{cancelAnimationFrame(f),clearTimeout(c)}}var $n=5,er=240;function tr(e){e.addEventListener(`wheel`,t=>{t.ctrlKey||Math.abs(t.deltaY)<=Math.abs(t.deltaX)||(t.preventDefault(),e.scrollLeft+=t.deltaY)},{passive:!1});let t=null,n=!1;e.addEventListener(`pointerdown`,n=>{n.button!==0||n.target.closest(`video`)||(t={id:n.pointerId,startX:n.clientX,startScroll:e.scrollLeft,dragging:!1})}),e.addEventListener(`pointermove`,n=>{if(n.pointerId!==t?.id)return;if(!(n.buttons&1)){t=null;return}let r=n.clientX-t.startX;!t.dragging&&Math.abs(r)>$n&&(t.dragging=!0,e.setPointerCapture(n.pointerId)),t.dragging&&(e.scrollLeft=t.startScroll-r)}),e.addEventListener(`pointerup`,e=>{e.pointerId===t?.id&&(t.dragging&&(n=!0,setTimeout(()=>n=!1)),t=null)});for(let n of[`pointercancel`,`lostpointercapture`])e.addEventListener(n,e=>{e.pointerId===t?.id&&(t=null)});e.addEventListener(`click`,e=>{n&&(n=!1,e.stopPropagation(),e.preventDefault())},{capture:!0}),e.addEventListener(`keydown`,t=>{if(t.defaultPrevented||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey||t.target.closest(`video, input, textarea, select, [contenteditable]`))return;let n=t.key===`ArrowRight`?er:t.key===`ArrowLeft`?-240:0;n&&(t.preventDefault(),e.scrollBy({left:n,behavior:`smooth`}))})}function nr(e,t,n){let r=document.createElement(`div`);r.className=`timeline`,r.dataset.testid=`projects-timeline`,r.tabIndex=0;let i=document.createElement(`div`);i.className=`timeline-track`,r.append(i);let a=t.map(e=>e.year),o=0;for(let e=Math.min(...a);e<=Math.max(...a);e++){let n=t.filter(t=>t.year===e),r=document.createElement(`section`);r.className=`timeline-year`,r.classList.toggle(`is-empty`,n.length===0),r.innerHTML=`
      <div class="timeline-lane timeline-lane--above"></div>
      <h2 class="timeline-label">${e}</h2>
      <div class="timeline-lane timeline-lane--below"></div>
    `;let[a,c]=r.querySelectorAll(`.timeline-lane`);for(let e of n)(o++%2==0?a:c).append(s(e));r.classList.toggle(`has-above`,a.children.length>0&&c.children.length===0),r.classList.toggle(`has-below`,c.children.length>0&&a.children.length===0),i.append(r)}e.append(r),tr(r);function s(e){let t=document.createElement(`button`);return t.className=`timeline-work`,t.innerHTML=`
      <img src="${e.thumb}" alt="" draggable="false" />
      <span class="timeline-work-title"></span>
      <span class="timeline-work-medium"></span>
    `,Xn(t.querySelector(`.timeline-work-title`),e),t.querySelector(`.timeline-work-medium`).textContent=e.medium??``,t.addEventListener(`click`,()=>n(e)),t}}var rr={index:{label:`Index`,render:Qn},timeline:{label:`Timeline`,render:nr}};function ir(e){e.layout.startsWith(`app:`)?q(e.layout.slice(4)):q(`project`,{slug:e.slug})}function ar(e){try{let t=localStorage.getItem(e);return Object.hasOwn(rr,t)?t:`index`}catch{return`index`}}function or(e,t){try{localStorage.setItem(e,t)}catch{}}function sr({id:e,title:t,icon:n,category:r}){let i=Yn.filter(e=>e.category===r),a=`void-${e}-view`;return{id:e,title:t,icon:n,minWidth:320,minHeight:260,fill:.92,className:`window--gallery`,singleInstance:!0,mount(e){e.innerHTML=`
        <div class="projects">
          <div class="projects-content"></div>
          <nav class="projects-switch" aria-label="View">
            ${Object.entries(rr).map(([e,t])=>`<button class="projects-view-button" data-view="${e}">${t.label}</button>`).join(`<span aria-hidden="true">/</span>`)}
          </nav>
          <p class="projects-count">${i.length} ${i.length===1?`work`:`works`}</p>
        </div>
      `;let t=e.querySelector(`.projects-content`),n=null;function r(r){for(let t of e.querySelectorAll(`.projects-view-button`))t.setAttribute(`aria-pressed`,String(t.dataset.view===r));n?.(),t.replaceChildren(),n=rr[r].render(t,i,ir)??null,or(a,r)}for(let t of e.querySelectorAll(`.projects-view-button`))t.addEventListener(`click`,()=>r(t.dataset.view));return r(ar(a)),()=>n?.()}}}var cr=sr({id:`projects`,title:`Art Portfolio`,icon:`/icons/projects.svg`,category:`art`}),lr=sr({id:`commercial`,title:`Commercial`,icon:`/icons/commercial.svg`,category:`commercial`});function ur(e,t){e.innerHTML=`
    <div class="layout-images">
      <div class="images-stage"><img class="images-main" alt="" /></div>
      <div class="images-bar">
        <button class="images-prev" aria-label="Previous">&lt;</button>
        <span class="images-caption"></span>
        <button class="images-next" aria-label="Next">&gt;</button>
      </div>
      <div class="images-strip"></div>
    </div>
  `;let n=e.querySelector(`.images-main`),r=e.querySelector(`.images-caption`),i=e.querySelector(`.images-strip`),a=0,o=t.media.map((e,t)=>{let n=document.createElement(`button`);return n.className=`images-thumb`,n.innerHTML=`<img src="${e.src}" alt="" />`,n.addEventListener(`click`,()=>s(t)),i.append(n),n});function s(e){a=(e+t.media.length)%t.media.length;let i=t.media[a];n.src=i.src,n.alt=i.caption??``,r.textContent=`${i.caption??``} (${a+1}/${t.media.length})`,o.forEach((e,t)=>e.classList.toggle(`is-selected`,t===a))}e.querySelector(`.images-prev`).addEventListener(`click`,()=>s(a-1)),e.querySelector(`.images-next`).addEventListener(`click`,()=>s(a+1)),e.tabIndex=0,e.addEventListener(`keydown`,e=>{e.key===`ArrowLeft`&&s(a-1),e.key===`ArrowRight`&&s(a+1)}),s(0)}function dr(e,t){let{src:n,poster:r}=t.media[0];if(!n){e.innerHTML=`<div class="layout-missing">Video file not added yet.</div>`;return}let i=document.createElement(`video`);return i.className=`layout-video`,i.controls=!0,i.playsInline=!0,i.preload=`metadata`,r&&(i.poster=r),i.src=n,e.append(i),()=>i.pause()}function fr(e,t){e.innerHTML=`
    <div class="layout-audio">
      <img class="audio-cover" src="${t.thumb}" alt="" />
      <div class="audio-side">
        <ol class="audio-tracks"></ol>
      </div>
    </div>
  `;let n=e.querySelector(`.audio-tracks`),r=t.media.filter(e=>e.src).map(e=>({title:e.title,artist:t.title,src:e.src})),i=new Map;for(let e of t.media){let t=document.createElement(`li`),a=document.createElement(`button`);a.className=`audio-track`,a.textContent=e.src?e.title:`${e.title} (not added yet)`,a.disabled=!e.src,a.addEventListener(`click`,()=>{pe(r,r.findIndex(t=>t.src===e.src),!0)}),e.src&&i.set(e.src,a),t.append(a),n.append(t)}let a=()=>{let e=N().track?.src;for(let[t,n]of i)n.classList.toggle(`is-selected`,t===e)};return a(),fe(e=>{e===`track`&&a()})}function pr(e,t){e.append(mr(t.text??``))}function mr(e){let t=document.createElement(`div`);t.className=`project-text`;for(let n of e.split(/\n\s*\n/)){let e=document.createElement(`p`);e.textContent=n,t.append(e)}return t}var hr=700;function gr(e,t){let n=[[null,t.cover]];for(let e=0;e<t.media.length;e+=2)n.push([t.media[e].src,t.media[e+1]?.src??null]);t.back&&n.push([t.back,null]);let r=t.back?n.length-1:-1;if(e.innerHTML=`
    <div class="layout-book">
      <div class="book-stage">
        <div class="book">
          <div class="book-page book-page--left"></div>
          <div class="book-page book-page--right"></div>
        </div>
      </div>
      <div class="book-bar">
        <button class="book-prev" aria-label="Previous page">&larr;</button>
        <span class="book-counter"></span>
        <button class="book-next" aria-label="Next page">&rarr;</button>
        <button class="book-fullscreen">Full screen</button>
      </div>
    </div>
  `,t.text&&e.append(mr(t.text)),t.object){let n=document.createElement(`figure`);n.className=`book-object`,n.innerHTML=`<img src="${t.object.src}" alt="" loading="lazy" /><figcaption></figcaption>`,n.querySelector(`figcaption`).textContent=t.object.caption??``,e.append(n)}let i=e.querySelector(`.book`);i.style.setProperty(`--page-aspect`,t.pageAspect??4/5);let a=e.querySelector(`.book-page--left`),o=e.querySelector(`.book-page--right`),s=e.querySelector(`.book-counter`),c=e.querySelector(`.book-prev`),l=e.querySelector(`.book-next`),u=t.media.length,d=0,f=!1;function p(e,n){if(e.replaceChildren(),e.classList.toggle(`is-blank`,!n),e.classList.toggle(`is-cover`,n===t.cover),n){let t=document.createElement(`img`);t.src=n,t.alt=``,t.draggable=!1,e.append(t)}}function m(){i.classList.toggle(`is-closed`,d===0),i.classList.toggle(`is-closed-back`,d===r);let e=d*2-1;d===0?s.textContent=`Cover`:d===r?s.textContent=`Back cover`:s.textContent=`${e}${e<u?`–${Math.min(e+1,u)}`:``} / ${u}`,c.disabled=d===0,l.disabled=d===n.length-1;for(let e of[...n[d-1]??[],...n[d+1]??[]])e&&(new Image().src=e)}function h(e){let t=d+e;if(f||t<0||t>=n.length)return;let[r,s]=n[d],[c,l]=n[t],u=e>0,h=document.createElement(`div`);h.className=`book-leaf book-leaf--${u?`right`:`left`}`,h.innerHTML=`<div class="book-page book-leaf-front"></div><div class="book-page book-leaf-back"></div>`,p(h.querySelector(`.book-leaf-front`),u?s:r),p(h.querySelector(`.book-leaf-back`),u?c:l),u?p(o,l):p(a,c),i.append(h),f=!0,d=t,m(),h.animate([{transform:`rotateY(0deg)`},{transform:`rotateY(${u?-180:180}deg)`}],{duration:hr,easing:`cubic-bezier(0.45, 0, 0.2, 1)`}).finished.then(()=>{u?p(a,c):p(o,l)}).catch(()=>{}).finally(()=>{h.remove(),f=!1})}i.addEventListener(`click`,e=>{let t=i.getBoundingClientRect();h(e.clientX>t.left+t.width/2?1:-1)});let g=e.querySelector(`.layout-book`),_=e.querySelector(`.book-fullscreen`);_.hidden=!document.fullscreenEnabled,_.addEventListener(`click`,()=>{document.fullscreenElement===g?document.exitFullscreen():g.requestFullscreen()}),g.addEventListener(`fullscreenchange`,()=>{_.textContent=document.fullscreenElement===g?`Exit full screen`:`Full screen`}),c.addEventListener(`click`,()=>h(-1)),l.addEventListener(`click`,()=>h(1)),e.tabIndex=0,e.addEventListener(`keydown`,e=>{e.key===`ArrowRight`&&h(1),e.key===`ArrowLeft`&&h(-1)}),p(a,n[0][0]),p(o,n[0][1]),m()}function _r(e,t){let n=document.createElement(`div`);n.className=`layout-reportage`;let r=[...mr(t.text??``).children];t.media.forEach((e,t)=>{let i=document.createElement(`figure`);if(i.className=`reportage-figure`,i.innerHTML=`<img src="${e.src}" alt="" loading="lazy" /><figcaption><span class="reportage-num">${String(t+1).padStart(2,`0`)}</span><span class="reportage-caption"></span></figcaption>`,i.querySelector(`.reportage-caption`).textContent=e.caption??``,n.append(i),t%2==0&&r.length){let e=r.shift();e.className=`reportage-text`,n.append(e)}});for(let e of r)e.className=`reportage-text`,n.append(e);e.append(n)}var vr=3;function yr(e,t){e.innerHTML=`
    <div class="layout-showcase">
      <div class="showcase-scroller" tabindex="0" data-testid="showcase">
        <div class="showcase-track"></div>
      </div>
      <div class="showcase-lightbox" role="dialog" aria-modal="true" tabindex="-1" hidden><img alt="" /></div>
    </div>
  `;let n=e.querySelector(`.layout-showcase`),r=n.querySelector(`.showcase-scroller`),i=n.querySelector(`.showcase-track`),a=n.querySelector(`.showcase-lightbox`);tr(r);let o=null,s=[];t.background&&(o=document.createElement(`video`),o.className=`showcase-ambient`,Object.assign(o,{muted:!0,loop:!0,autoplay:!0,playsInline:!0}),o.setAttribute(`aria-hidden`,`true`),e.closest(`.project`).prepend(o));let c=[...t.media];t.text&&c.splice(+!!c[0]?.hero,0,{text:t.text});for(let e of c)i.append(l(e));if(o){let e=()=>{o.src=t.background},n=i.querySelector(`.showcase-hero img`);!n||n.complete?e():(n.addEventListener(`load`,e,{once:!0}),n.addEventListener(`error`,e,{once:!0}))}function l(e){if(e.pages)return u(e);if(e.video){let t=br(`div`,`showcase-panel showcase-video`),n=document.createElement(`video`);return Object.assign(n,{src:e.video,controls:!0,playsInline:!0,preload:`none`}),e.poster&&(n.poster=e.poster),s.push(n),t.append(n),t}if(e.text){let t=br(`div`,`showcase-panel showcase-text`);return t.append(mr(e.text)),t}let n=br(`figure`,`showcase-panel showcase-photo${e.hero?` showcase-hero`:``}`),r=document.createElement(`img`);if(Object.assign(r,{src:e.src,alt:``,draggable:!1,decoding:`async`}),e.width&&Object.assign(r,{width:e.width,height:e.height}),e.hero||(r.loading=`lazy`),n.append(r),e.hero&&t.subtitle){let e=br(`figcaption`,`showcase-hero-title`);e.textContent=t.subtitle,n.append(e)}return n}function u(e){let t=br(`section`,`showcase-panel showcase-research`),n=br(`p`,`showcase-research-text`);n.textContent=e.text??``;let r=br(`div`,`showcase-pages`);return r.style.gridTemplateColumns=`repeat(${Math.ceil(e.pages.length/vr)}, auto)`,e.pages.forEach((e,t)=>{let n=br(`button`,`showcase-page`);n.setAttribute(`aria-label`,`Open page ${t+1}`),n.innerHTML=`<img src="${e.thumb}" alt="" draggable="false" loading="lazy" />`,n.addEventListener(`click`,()=>f(e,t,n)),r.append(n)}),t.append(n,r),t}let d=null;function f(e,t,n){let i=a.querySelector(`img`);i.src=e.src,i.alt=`Page ${t+1}`,a.setAttribute(`aria-label`,`Page ${t+1}`),a.hidden=!1,r.inert=!0,d=n,a.focus()}function p(){a.hidden||(a.hidden=!0,r.inert=!1,d?.focus())}a.addEventListener(`click`,p),n.addEventListener(`keydown`,e=>{e.key===`Escape`&&p()});let m=new IntersectionObserver(([e])=>{if(e.isIntersecting)o?.play().catch(()=>{});else{o?.pause();for(let e of s)e.pause()}});return m.observe(n),()=>{m.disconnect(),o?.pause();for(let e of s)e.pause()}}function br(e,t){let n=document.createElement(e);return n.className=t,n}var xr={book:gr,reportage:_r,showcase:yr,images:ur,video:dr,audio:fr,text:pr},Sr=new Set([`text`,`reportage`,`book`,`showcase`]),Cr=[s,Tt,cr,lr,{id:`project`,title:`Project`,icon:`/icons/projects.svg`,minWidth:320,minHeight:260,fill:.92,className:`window--gallery`,hidden:!0,mount(e,{props:t,setTitle:n}){let r=Yn.find(e=>e.slug===t.slug);if(!r){e.textContent=`This project could not be found.`;return}n(`${r.title} (${r.year})`),e.innerHTML=`
      <div class="project" data-layout="${r.layout}" data-slug="${r.slug}">
        <header class="project-head">
          <h1 class="project-title"></h1>
          <p class="project-meta"></p>
        </header>
        <div class="project-work"></div>
      </div>
    `,Xn(e.querySelector(`.project-title`),r),e.querySelector(`.project-meta`).textContent=[r.medium,r.place,r.year].filter(Boolean).join(`  ·  `);let i=xr[r.layout](e.querySelector(`.project-work`),r);return r.text&&!Sr.has(r.layout)&&e.querySelector(`.project`).append(mr(r.text)),i}},f,it,lt,bt,At,Kt,Un],$=null;function wr(){$=document.createElement(`ul`),$.className=`context-menu`,$.setAttribute(`role`,`menu`),$.dataset.testid=`context-menu`,$.hidden=!0,document.body.append($),document.addEventListener(`contextmenu`,e=>{e.target.closest(`input, textarea`)||e.preventDefault()}),document.addEventListener(`pointerdown`,e=>{$.contains(e.target)||Er()},{capture:!0}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&Er()}),window.addEventListener(`blur`,Er)}function Tr(e,t,n){$.replaceChildren(...n.map(Dr)),$.hidden=!1;let{width:r,height:i}=$.getBoundingClientRect();$.style.left=`${e+r>innerWidth?Math.max(0,e-r):e}px`,$.style.top=`${t+i>innerHeight?Math.max(0,t-i):t}px`}function Er(){$&&($.hidden=!0)}function Dr(e){let t=document.createElement(`li`);if(e===`separator`)return t.className=`context-menu-separator`,t.setAttribute(`role`,`separator`),t;let n=document.createElement(`button`);return n.className=`context-menu-item`,n.setAttribute(`role`,`menuitem`),n.textContent=e.label,n.disabled=!!e.disabled,n.addEventListener(`click`,()=>{Er(),e.onSelect()}),t.append(n),t}var Or=`voidos.wallpaper`,kr=`voidos.iconPositions`,Ar={w:90,h:92},jr=10,Mr=6,Nr=4,Pr=0,Fr=null;function Ir(e,t,{menuItems:n=[]}={}){Fr=t,$r(ti()),Lr(t),Wr(t),window.addEventListener(`resize`,()=>Wr(t)),e.addEventListener(`pointerdown`,n=>{n.target.closest(`.desktop-icon, .window`)||(Rr(t,[]),n.button===0&&Br(e,t,n))}),e.addEventListener(`contextmenu`,e=>{if(e.target.closest(`.window`))return;let r=e.target.closest(`.desktop-icon`);r?(r.classList.contains(`is-selected`)||Rr(t,[r]),Tr(e.clientX,e.clientY,[{label:`Open`,onSelect:()=>zr(t).forEach(e=>q(e.dataset.appId))}])):Tr(e.clientX,e.clientY,[{label:`Arrange Icons`,onSelect:Gr},...n])})}function Lr(e){for(let t of st().filter(e=>!e.hidden)){let n=document.createElement(`li`);n.dataset.appId=t.id;let r=document.createElement(`button`);r.className=`desktop-icon`,r.dataset.appId=t.id,r.innerHTML=`<img src="${t.icon}" alt="" width="32" height="32" draggable="false" /><span></span>`,r.querySelector(`span`).textContent=t.desktopLabel??t.title,r.addEventListener(`dblclick`,()=>q(t.id)),r.addEventListener(`keydown`,e=>{e.key===`Enter`&&q(t.id)}),r.addEventListener(`pointerdown`,t=>{t.button===0&&(t.ctrlKey||t.metaKey?r.classList.toggle(`is-selected`):(r.classList.contains(`is-selected`)||Rr(e,[r]),Yr(e,n,t)))}),n.append(r),e.append(n)}}function Rr(e,t){for(let n of e.querySelectorAll(`.desktop-icon`))n.classList.toggle(`is-selected`,t.includes(n))}function zr(e){return[...e.querySelectorAll(`.desktop-icon.is-selected`)]}function Br(e,t,n){let r=t.getBoundingClientRect(),i=n.clientX-r.left,a=n.clientY-r.top,o=document.createElement(`div`);o.className=`selection-rect`,o.dataset.testid=`selection-rect`,t.append(o);let s=[...t.querySelectorAll(`.desktop-icon`)].map(e=>{let t=e.getBoundingClientRect();return{icon:e,x:t.left-r.left,y:t.top-r.top,w:t.width,h:t.height}});Ke(e,n,(e,n)=>{let r=Math.min(i,i+e),c=Math.min(a,a+n),l=Math.abs(e),u=Math.abs(n);Object.assign(o.style,{left:`${r}px`,top:`${c}px`,width:`${l}px`,height:`${u}px`}),Rr(t,s.filter(({x:e,y:t,w:n,h:i})=>e<r+l&&e+n>r&&t<c+u&&t+i>c).map(({icon:e})=>e))},()=>o.remove())}function Vr(e){return{cols:Math.max(1,Math.floor((e.clientWidth-20+Mr)/Ar.w)),rows:Math.max(1,Math.floor((e.clientHeight-20+Mr)/Ar.h))}}var Hr=e=>`${e.col},${e.row}`;function Ur(e,t){for(let n=0;;n++){let r={col:Math.floor(n/t),row:n%t};if(!e.has(Hr(r)))return r}}function Wr(e){let{cols:t,rows:n}=Vr(e),r=Qr(),i=new Set,a=[];for(let o of Kr(e)){let e=r[o.dataset.appId];e&&e.col<t&&e.row<n&&!i.has(Hr(e))?(Jr(o,e),i.add(Hr(e))):a.push(o)}for(let e of a){let t=Ur(i,n);Jr(e,t),i.add(Hr(t))}}function Gr(){try{localStorage.removeItem(kr)}catch{}Wr(Fr)}function Kr(e){return[...e.querySelectorAll(`:scope > li`)]}function qr(e){return{col:Number(e.dataset.col),row:Number(e.dataset.row)}}function Jr(e,{col:t,row:n}){e.dataset.col=t,e.dataset.row=n,e.style.left=`${jr+t*Ar.w}px`,e.style.top=`${jr+n*Ar.h}px`}function Yr(e,t,n){let r=n.currentTarget,i=zr(e).map(e=>e.parentElement),a=i.map(e=>({left:e.offsetLeft,top:e.offsetTop})),o=!1;Ke(r,n,(e,t)=>{!o&&Math.hypot(e,t)<Nr||(o=!0,i.forEach((n,r)=>{n.classList.add(`is-dragging`),n.style.left=`${a[r].left+e}px`,n.style.top=`${a[r].top+t}px`}))},()=>{if(!o){Rr(e,[r]);return}i.forEach(e=>e.classList.remove(`is-dragging`));let{cols:n,rows:a}=Vr(e),s=qr(t),l={col:c(Math.round((t.offsetLeft-jr)/Ar.w),0,n-1),row:c(Math.round((t.offsetTop-jr)/Ar.h),0,a-1)};if(i.length===1){let n=Kr(e).find(e=>e!==t&&Number(e.dataset.col)===l.col&&Number(e.dataset.row)===l.row);n&&Jr(n,s),Jr(t,l)}else Xr(e,i,l.col-s.col,l.row-s.row,n,a);Zr(e)})}function Xr(e,t,n,r,i,a){let o=new Set,s=[],l=t.map(e=>{let t=qr(e);return{col:c(t.col+n,0,i-1),row:c(t.row+r,0,a-1)}});t.forEach((e,t)=>{if(o.has(Hr(l[t])))return s.push(e);Jr(e,l[t]),o.add(Hr(l[t]))});for(let n of Kr(e).filter(e=>!t.includes(e)))o.has(Hr(qr(n)))?s.push(n):o.add(Hr(qr(n)));for(let e of s){let t=Ur(o,a);Jr(e,t),o.add(Hr(t))}}function Zr(e){let t={};for(let n of Kr(e))t[n.dataset.appId]=qr(n);try{localStorage.setItem(kr,JSON.stringify(t))}catch{}}function Qr(){try{return JSON.parse(localStorage.getItem(kr))??{}}catch{return{}}}function $r(e){Pr=(e+i.length)%i.length,document.documentElement.style.setProperty(`--wallpaper`,i[Pr].css);try{localStorage.setItem(Or,String(Pr))}catch{}}function ei(){$r(Pr+1)}function ti(){try{return Number(localStorage.getItem(Or))||0}catch{return 0}}function ni(e){e.innerHTML=`
    <button class="start-button btn" aria-haspopup="menu" aria-expanded="false">
      <img src="/icons/void.svg" alt="" width="16" height="16" />
      <span>Start</span>
    </button>
    <div class="taskbar-divider"></div>
    <div class="taskbar-windows" data-testid="taskbar-windows"></div>
    <div class="taskbar-tray bevel-in">
      <time class="taskbar-clock" data-testid="clock">
        <span class="taskbar-time" data-testid="clock-time"></span>
        <span class="taskbar-date" data-testid="clock-date"></span>
      </time>
    </div>
  `;let t=e.querySelector(`.taskbar-windows`);return Pe(()=>ri(t)),ii(e.querySelector(`.taskbar-clock`)),e.querySelector(`.start-button`)}function ri(e){let t=Ne(),n=Me().map(e=>{let n=document.createElement(`button`);return n.className=`taskbar-item btn`,n.classList.toggle(`is-pressed`,e.id===t),n.title=e.title,n.innerHTML=`<img src="${e.icon}" alt="" width="16" height="16" /><span></span>`,n.querySelector(`span`).textContent=e.title,n.addEventListener(`click`,()=>{e.id===Ne()?ze(e.id):Re(e.id)}),n});e.replaceChildren(...n)}function ii(e){let t=e.querySelector(`.taskbar-time`),n=e.querySelector(`.taskbar-date`),r=()=>{let r=new Date;t.textContent=r.toLocaleTimeString([],{hour:`numeric`,minute:`2-digit`}),n.textContent=r.toLocaleDateString([],{year:`numeric`,month:`2-digit`,day:`2-digit`}),e.dateTime=r.toISOString(),e.title=r.toLocaleDateString([],{dateStyle:`full`})};r(),setInterval(r,1e3)}function ai(t,n,r=[]){t.innerHTML=`
    <div class="start-menu-banner"><span></span></div>
    <ul class="start-menu-list" role="menu"></ul>
  `,t.querySelector(`.start-menu-banner span`).textContent=e;let i=t.querySelector(`.start-menu-list`),a=st().filter(e=>!e.hidden).map(e=>({label:e.title,icon:e.icon,onSelect:()=>q(e.id)}));for(let e of a)i.append(c(e));r.length&&i.append(oi());for(let e of r)i.append(c(e));function o(){t.hidden=!1,n.classList.add(`is-pressed`),n.setAttribute(`aria-expanded`,`true`)}function s(){t.hidden=!0,n.classList.remove(`is-pressed`),n.setAttribute(`aria-expanded`,`false`)}function c({label:e,icon:t,onSelect:n}){let r=document.createElement(`li`),i=document.createElement(`button`);return i.className=`start-menu-item`,i.setAttribute(`role`,`menuitem`),i.innerHTML=`<img src="${t}" alt="" width="32" height="32" /><span></span>`,i.querySelector(`span`).textContent=e,i.addEventListener(`click`,()=>{s(),n()}),r.append(i),r}n.addEventListener(`click`,()=>t.hidden?o():s()),document.addEventListener(`pointerdown`,e=>{t.hidden||t.contains(e.target)||n.contains(e.target)||s()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&!t.hidden&&s()})}function oi(){let e=document.createElement(`li`);return e.className=`start-menu-separator`,e.setAttribute(`role`,`separator`),e}var si=`voidos.topbar`,ci=null,li=0;function ui(e){ci=e,ci.innerHTML=`<span class="topbar-name"></span>`,ci.querySelector(`.topbar-name`).textContent=n,di(pi())}function di(e){li=(e+r.length)%r.length,ci.dataset.style=r[li].id;try{localStorage.setItem(si,String(li))}catch{}}function fi(){di(li+1)}function pi(){try{return Number(localStorage.getItem(si))||0}catch{return 0}}var mi=28,hi=260,gi=[``,``,`...`,`?`,`~`,`!?`,`*hum*`],_i={right:`( o.o)`,left:`(o.o )`,blink:`( -.-)`,sleep:`( u.u)`},vi=`/|_|\\`,yi={a:` / \\ `,b:` | | `,sit:` === `};function bi(e){let t=document.createElement(`pre`);t.className=`wanderer`,t.dataset.testid=`wanderer`,t.setAttribute(`aria-hidden`,`true`),e.insertBefore(t,document.getElementById(`windows`));let n={x:e.clientWidth*Math.random(),y:e.clientHeight*Math.random()},r=u(),i=`walk`,a=`right`,o=0,s=!1,c=``,l=performance.now();function u(){return{x:Math.random()*d(),y:Math.random()*f()}}function d(){return Math.max(0,e.clientWidth-t.offsetWidth)}function f(){return Math.max(0,e.clientHeight-t.offsetHeight)}function p(e){let h=Math.min(e-l,100)/1e3;if(l=e,i===`walk`){let t=r.x-n.x,l=r.y-n.y,u=Math.hypot(t,l);if(u<1)i=`idle`,o=e+1e3+Math.random()*3e3,s=Math.random()<.3,c=s&&Math.random()<.5?`zzz`:xi(gi);else{let e=Math.min(u,mi*h);n.x+=t/u*e,n.y+=l/u*e,Math.abs(t)>1&&(a=t>0?`right`:`left`)}}else e>o&&(i=`walk`,c=``,r=u());n.x=Math.min(n.x,d()),n.y=Math.min(n.y,f());let g=m(e);t.textContent!==g&&(t.textContent=g),t.style.transform=`translate(${Math.round(n.x)}px, ${Math.round(n.y)}px)`,requestAnimationFrame(p)}function m(e){let t=_i[a],n=yi[Math.floor(e/hi)%2?`a`:`b`];return i===`idle`&&(n=s?yi.sit:yi.a,c===`zzz`?t=_i.sleep:e%3e3<160&&(t=_i.blink)),[`  ${c}`,t,` ${vi}`,n].join(`
`)}requestAnimationFrame(p)}function xi(e){return e[Math.floor(Math.random()*e.length)]}var Si=`<svg viewBox="0 0 9 8" width="9" height="8"><path fill-rule="evenodd" d="M0 0h9v8H0zM1 2v5h7V2z"/></svg>`,Ci=`<svg viewBox="0 0 8 7" width="8" height="7"><path d="M0 0h2v1h1v1h2V1h1V0h2v1H7v1H6v1H5v1h1v1h1v1h1v1H6V6H5V5H3v1H2v1H0V6h1V5h1V4h1V3H2V2H1V1H0z"/></svg>`;function wi(e){e.classList.add(`player`,`mini-player`),e.innerHTML=`
    <div class="mini-player-head">
      <span class="player-leds"><i></i><i></i><i></i></span>
      <div class="player-marquee"><span class="player-title" data-testid="mini-player-title"></span></div>
      <button class="player-btn player-btn-small" data-action="expand" aria-label="Open Media Player">${Si}</button>
      <button class="player-btn player-btn-small" data-action="close" aria-label="Close mini player">${Ci}</button>
    </div>
    <div class="mini-player-lcd">
      <span class="mini-player-time" data-testid="mini-player-time">00:00</span>
      <div class="player-progress" role="progressbar" aria-label="Progress"
           aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
        <div class="player-progress-fill"><span class="player-progress-handle"></span></div>
      </div>
    </div>
    <div class="player-controls">
      <button class="player-btn" data-action="prev" aria-label="Previous">${D.prev}</button>
      <button class="player-btn" data-action="toggle" aria-label="Play">${D.play}</button>
      <button class="player-btn" data-action="stop" aria-label="Stop">${D.stop}</button>
      <button class="player-btn" data-action="next" aria-label="Next">${D.next}</button>
      <label class="player-volume">VOL
        <input type="range" min="0" max="1" step="0.01" value="1" aria-label="Volume" />
      </label>
    </div>
  `;let t=t=>e.querySelector(t),n=t(`.player-title`),r=t(`.mini-player-time`),i=t(`.player-progress`),a=t(`.player-progress-fill`),o=t(`[data-action="toggle"]`),s=t(`.player-volume input`);o.addEventListener(`click`,()=>{let{status:e}=N();e===`PLAYING`||e===`LOADING`?me():L()}),t(`[data-action="prev"]`).addEventListener(`click`,ge),t(`[data-action="next"]`).addEventListener(`click`,R),t(`[data-action="stop"]`).addEventListener(`click`,he),t(`[data-action="expand"]`).addEventListener(`click`,()=>q(`media-player`)),t(`[data-action="close"]`).addEventListener(`click`,ye),s.addEventListener(`input`,()=>ve(Number(s.value)));let c=Xe(i,e=>{a.style.width=`${e*100}%`,r.textContent=Se(e*N().duration)});function l(t){let n=e.hidden,r=Me().some(e=>e.appId===`media-player`&&!e.minimized);if(e.hidden=!N().track||r,e.hidden)return;let i=n||t===void 0;(i||t===`track`)&&u(),(i||t===`state`)&&d(),(i||t===`volume`)&&(s.value=String(N().volume)),(i||t===`time`||t===`state`||t===`track`)&&f()}function u(){let{track:e}=N();n.textContent=`${e.title} - ${e.artist}`}function d(){let{status:t}=N();e.dataset.state=t;let n=t===`PLAYING`||t===`LOADING`;o.innerHTML=n?D.pause:D.play,o.setAttribute(`aria-label`,n?`Pause`:`Play`),o.classList.toggle(`is-pressed`,n)}function f(){if(c())return;let{status:e,currentTime:t,duration:n}=N(),o=n?t/n*100:0;a.style.width=`${o}%`,i.setAttribute(`aria-valuenow`,String(Math.round(o))),r.textContent=e===`ERROR`?`ERROR`:Se(t)}fe(l),Pe(l),l()}ot(Cr),wr(),ui(document.getElementById(`topbar`)),je(document.getElementById(`windows`)),Ir(document.getElementById(`desktop`),document.getElementById(`desktop-icons`),{menuItems:[{label:`Change Wallpaper`,onSelect:ei},{label:`Change Top Bar`,onSelect:fi},`separator`,{label:`About ${e}`,onSelect:()=>q(`about`)}]}),bi(document.getElementById(`desktop`)),wi(document.getElementById(`mini-player`));var Ti=ni(document.getElementById(`taskbar`));ai(document.getElementById(`start-menu`),Ti,[{label:`Change Wallpaper`,icon:`/icons/paint.svg`,onSelect:ei},{label:`Change Top Bar`,icon:`/icons/paint.svg`,onSelect:fi}]);