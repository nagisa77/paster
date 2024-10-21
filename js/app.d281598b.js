(function(){"use strict";var t={9374:function(t,e,n){var o=n(5130),a=n(6768),s=n(4232);const i={id:"app",class:"container"},r={key:0,class:"link-address"},l={class:"link-address-text"},c={key:0,class:"ldrs-tail-chase"},d={key:1},u={key:2,class:"toast"};function h(t,e,n,h,p,f){const g=(0,a.g2)("l-tail-chase");return(0,a.uX)(),(0,a.CE)("div",i,[e[4]||(e[4]=(0,a.Lk)("div",{class:"description"}," Please select a file to upload or paste the content. ",-1)),(0,a.bo)((0,a.Lk)("textarea",{"onUpdate:modelValue":e[0]||(e[0]=t=>p.textContent=t),class:"textarea",placeholder:"Paste your content here"},null,512),[[o.Jo,p.textContent]]),(0,a.Lk)("input",{ref:"fileInput",type:"file",style:{display:"none"},onChange:e[1]||(e[1]=(...t)=>f.handleFileUpload&&f.handleFileUpload(...t))},null,544),p.linkAddress?((0,a.uX)(),(0,a.CE)("div",r,[(0,a.Lk)("div",l,(0,s.v_)(p.linkAddress),1),(0,a.Lk)("img",{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn3Vx_iNdQ0h1PVB3xS1vomz-nOlbBkJFtx9nQ351QiZHwc3APEU8C7CENvfKQLYAmBr4&usqp=CAU",alt:"copy",class:"copy-icon",onClick:e[2]||(e[2]=(...t)=>f.copyLink&&f.copyLink(...t))})])):((0,a.uX)(),(0,a.CE)("button",{key:1,onClick:e[3]||(e[3]=(...t)=>f.triggerFileUpload&&f.triggerFileUpload(...t)),class:"upload-button"},[p.loading?((0,a.uX)(),(0,a.CE)("div",c,[(0,a.bF)(g,{size:"20",speed:"1.75",color:"white"})])):((0,a.uX)(),(0,a.CE)("div",d," File Select / Commit "))])),p.showToast?((0,a.uX)(),(0,a.CE)("div",u,(0,s.v_)(p.toastMessage),1)):(0,a.Q3)("",!0)])}n(4603),n(7566),n(8721);var p=n(2496);p.A.register();var f={name:"App",data(){return{loading:!1,textContent:"",linkAddress:"",showToast:!1,toastMessage:""}},methods:{triggerFileUpload(){this.textContent?this.uploadTextContent():this.$refs.fileInput.click()},async uploadTextContent(){this.loading=!0;try{const t=new FormData;t.append("content",this.textContent);const e=await fetch("/upload",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({content:this.textContent})}),n=await e.text();this.showToastMessage("上传成功"),this.linkAddress=this.extractLink(n)}catch(t){console.error("Error uploading text content:",t)}finally{this.loading=!1}},async handleFileUpload(t){const e=t.target.files[0];if(e){this.loading=!0;try{const t=new FormData;t.append("file",e);const n=await fetch("/upload",{method:"POST",body:t}),o=await n.text();this.linkAddress=this.extractLink(o),this.showToastMessage("上传成功")}catch(n){console.error("Error uploading file:",n)}finally{this.loading=!1}}},extractLink(t){const e=t.match(/<a href="([^"]+)" target="_parent">/);return e?e[1]:""},showToastMessage(t,e=2e3){this.toastMessage=t,this.showToast=!0,setTimeout((()=>{this.showToast=!1}),e)},copyLink(){navigator.clipboard.writeText(this.linkAddress).then((()=>{this.showToastMessage("复制成功")})).catch((t=>{console.error("复制失败:",t),this.showToastMessage("复制失败，请手动复制")}))}}},g=n(1241);const v=(0,g.A)(f,[["render",h],["__scopeId","data-v-0641d19a"]]);var k=v;(0,o.Ef)(k).mount("#app")}},e={};function n(o){var a=e[o];if(void 0!==a)return a.exports;var s=e[o]={exports:{}};return t[o].call(s.exports,s,s.exports,n),s.exports}n.m=t,function(){var t=[];n.O=function(e,o,a,s){if(!o){var i=1/0;for(d=0;d<t.length;d++){o=t[d][0],a=t[d][1],s=t[d][2];for(var r=!0,l=0;l<o.length;l++)(!1&s||i>=s)&&Object.keys(n.O).every((function(t){return n.O[t](o[l])}))?o.splice(l--,1):(r=!1,s<i&&(i=s));if(r){t.splice(d--,1);var c=a();void 0!==c&&(e=c)}}return e}s=s||0;for(var d=t.length;d>0&&t[d-1][2]>s;d--)t[d]=t[d-1];t[d]=[o,a,s]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={524:0};n.O.j=function(e){return 0===t[e]};var e=function(e,o){var a,s,i=o[0],r=o[1],l=o[2],c=0;if(i.some((function(e){return 0!==t[e]}))){for(a in r)n.o(r,a)&&(n.m[a]=r[a]);if(l)var d=l(n)}for(e&&e(o);c<i.length;c++)s=i[c],n.o(t,s)&&t[s]&&t[s][0](),t[s]=0;return n.O(d)},o=self["webpackChunkpaster"]=self["webpackChunkpaster"]||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var o=n.O(void 0,[504],(function(){return n(9374)}));o=n.O(o)})();
//# sourceMappingURL=app.d281598b.js.map