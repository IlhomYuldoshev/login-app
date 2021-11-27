(()=>{"use strict";const e="https://login-app-dce29-default-rtdb.firebaseio.com/";class t{static create(i){return fetch(`${e}questions.json`,{method:"POST",body:JSON.stringify(i),headers:{"Content-Type":"application/json"}}).then((e=>e.json())).then((e=>(i.id=e.name,i))).then(n).then(t.renderList)}static renderList(){const e=i(),t=e.length?e.map(o).join(""):'<div class="mui--text-headline">You don\'t ask any question yet</div>';document.getElementById("list").innerHTML=t}static fetch(t){return t?fetch(`${e}questions.json?auth=${t}`).then((e=>e.json())).then((e=>e&&e.error?`<p class="error">${e.error}</p>`:e?Object.keys(e).map((t=>({...e[t],id:t}))):[])):Promise.resolve('<p class="error">No token!</p>')}static listToHTML(e){return e.length>0?`<ol>${e.map((e=>`<li>${e.text}</li>`)).join("<br>")}</ol>`:"No questions yet"}}function n(e){const t=i();t.push(e),localStorage.setItem("questions",JSON.stringify(t))}function i(){return JSON.parse(localStorage.getItem("questions")||"[]")}function o(e){return`\n      <div class="mui--text-black-54">\n        ${new Date(e.date).toLocaleDateString()}\n        ${new Date(e.date).toLocaleTimeString()}\n      </div>\n      <div>\n        ${e.text}\n      </div>\n      <br />`}function s(e){return e.length>=10}function a(e,t){const n=document.createElement("div");n.classList.add("modal-class");const i=`\n    <h1>${e}</h1>\n    <div class="modal-content">${t}</div>\n  `;n.innerHTML=i,mui.overlay("on",n)}const r=document.getElementById("form"),l=r.querySelector("#question-input"),d=r.querySelector("#submit"),u=document.getElementById("modal-btn");function c(e){e.preventDefault();const n=e.target.querySelector("#email").value,i=e.target.querySelector("#password").value,o=e.target.querySelector("button");o.disabled=!0,function(e,t){return fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQgdsRSOfBT_e5BqI9vYWNm_wMrcw5q0M\n  ",{method:"POST",body:JSON.stringify({email:e,password:t,returnSecureToken:!0}),headers:{"Content-Type":"application/json"}}).then((e=>e.json())).then((e=>e.idToken))}(n,i).then(t.fetch).then(m).then((()=>o.disabled=!1))}function m(e){"string"==typeof e?a("Error!",e):a("Questions list",t.listToHTML(e))}window.addEventListener("load",t.renderList),r.addEventListener("submit",(function(e){if(e.preventDefault(),s(l.value)){const e={text:l.value.trim(),date:(new Date).toJSON()};d.disabled=!0,t.create(e),l.value="",l.className="",d.disabled=!1}})),l.addEventListener("input",(()=>{d.disabled=!s(l.value)})),u.addEventListener("click",(function(){a("Login",'\n    <form class="mui-form" id="auth-form">\n\n      <div class="mui-textfield mui-textfield--float-label">\n        <input\n          type="text"\n          id="email"\n          required\n        />\n        <label for="email">Email</label>\n      </div>\n\n      <div class="mui-textfield mui-textfield--float-label">\n      <input\n        type="password"\n        id="password"\n        required\n      />\n      <label for="email">Password</label>\n    </div>\n\n      <button\n        type="submit"\n        class="mui-btn mui-btn--raised mui-btn--primary"\n      >Sign in</button>\n    </form>\n  '),document.getElementById("auth-form").addEventListener("submit",c,{once:!0})}))})();