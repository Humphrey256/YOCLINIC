"use strict";(self.__LOADABLE_LOADED_CHUNKS__=self.__LOADABLE_LOADED_CHUNKS__||[]).push([[6575],{3808:(e,t,n)=>{n.d(t,{Z:()=>c});var a=n(667294),r=n(616550),i=n(741983),o=n(340523),l=n(5859),s=n(149722),u=n(961550),m=n(408998),p=n(995026);function c(){let e=(0,s.Z)(),t=(0,o.F)(),{isRTL:n}=(0,l.B)(),c=(0,r.TH)(),d=(0,r.k6)(),h=c.search,_=(0,p.Z)(c)&&!n&&e.isAuth&&!e.isPartner&&!(0,i.OK)(c);return(0,a.useEffect)(()=>{h.includes("enable_vertical_nav")&&((0,m.M)(),d.push("/"),window.location.reload())},[h,d]),{enabled:_&&t.checkExperiment("web_vertical_nav").anyEnabled,group:_?t.checkExperiment("web_vertical_nav").group:u.lR.NONE}}},775089:(e,t,n)=>{n.r(t),n.d(t,{default:()=>C});var a=n(667294),r=n(883119),i=n(214877),o=n(103322);function l(e,t,n){var a;return(t="symbol"==typeof(a=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,t||"default");if("object"!=typeof a)return a;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(t,"string"))?a:String(a))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}let s={},u=e=>{let t=e.__id||e.id;return"string"==typeof t&&t||null};class m{constructor(){l(this,"idMap",new Map),l(this,"objMap",new WeakMap)}get(e){let t=u(e);return this.objMap.get(e)??(t?this.idMap.get(t):void 0)}has(e){let t=u(e);return this.objMap.has(e)??(!!t&&this.idMap.has(t))}set(e,t){let n=u(e);n&&this.idMap.set(n,t),this.objMap.set(e,t)}reset(){this.idMap=new Map,this.objMap=new WeakMap}}var p=n(401111),c=n(547643),d=n(667677),h=n(213377),_=n(406893),b=n(340523),f=n(5859),w=n(554786),y=n(953565),g=n(84768),v=n(785893);function x({analyticsData:e,children:t,idx:n,isMeasuring:r,masonryV2ExpName:i,masonryV2ExpGroup:l}){let s=(0,w.ZP)(),{isAuthenticated:u}=(0,f.B)(),m=(0,g.MM)();return(0,a.useEffect)(()=>{if(e.current[n]){let{fetchTimestamp:t,measureTimestamp:a,hasRendered:o,pageCount:p}=e.current[n]??{},c={deviceType:s,experimentName:i,experimentGroup:l,handlerId:m,isAuthenticated:u,pageCount:p};r&&!a&&(e.current[n].measureTimestamp=Date.now(),(0,y.LY)("webapp.masonry.itemMeasureStart",Date.now()-t,{tags:c})),r||o||((0,y.LY)("webapp.masonry.itemRenderStart",Date.now()-a,{tags:c}),e.current[n].hasRendered=!0)}},[r]),(0,v.jsx)(o.Z,{name:"MasonryItem",children:t})}function C(e){let{align:t,cacheKey:n,id:l,isGridCentered:u=!0,items:C,layout:E,loadItems:S,masonryRef:M,optOutFluidGridExperiment:k=!1,renderItem:$,scrollContainerRef:O,virtualize:R=!0,_getColumnSpanConfig:I,_dynamicHeights:N,useLoadingState:T}=e,j=(0,w.ZP)(),{isAuthenticated:G,isRTL:W}=(0,f.B)(),{logContextEvent:L}=(0,i.v)(),A=(0,b.F)(),D="desktop"===j,Z=(0,g.MM)(),P=(0,a.useRef)(C.map(()=>({fetchTimestamp:Date.now(),measureTimestamp:Date.now(),hasRendered:!1,pageCount:0}))),{_loadingStateItems:B,_renderLoadingStateItems:V}=(0,d.Z)({useLoadingState:T}),{experimentalColumnWidth:H,experimentalGutter:z,anyEnabled:F,group:Y}=(0,p.Z)("flexible"!==E&&!k),U=e.serverRender??!!D,J="flexible"===E||"desktop"!==j||F,K=U?"serverRenderedFlexible":"flexible",Q=e.columnWidth??H??h.yF;J&&(Q=Math.floor(Q));let X=e.gutterWidth??z??(D?h.oX:1),q=e.minCols??h.yc,ee=(0,a.useRef)(0),et=Q+X,en=function(e){if(null==e)return;let t=function(e){let t=s[e];return t&&t.screenWidth===window.innerWidth||(s[e]={screenWidth:window.innerWidth}),s[e]}(e);return t.measurementCache||(t.measurementCache=new m),t.measurementCache}(n),ea=(0,a.useCallback)(()=>O?.current||window,[O]),er=(0,a.useRef)(!0),{anyEnabled:ei}=A.checkExperiment("web_masonry_ssr_container_query"),{group:eo}=I?A.checkExperiment("web_masonry_early_bailout"):{group:""},el=eo.match(/enabled_([\d]+)_gutter/),es=el?parseInt(el[1],10):void 0,eu=es?X*es:void 0,em=u&&er.current?"centered":"",{className:ep,styles:ec}=function(e){let t=`m_${Object.keys(e).reduce((t,n)=>{let a=e[n];return null==a||"object"==typeof a||"function"==typeof a?t:"boolean"==typeof a?t+(a?"t":"f"):t+a},"").replace(/\:/g,"\\:")}`,{flexible:n,gutterWidth:a,isRTL:r,itemWidth:i,maxColumns:o,minColumns:l,items:s,_getColumnSpanConfig:u}=e,m=u?s.map((e,t)=>({index:t,columnSpanConfig:u(e)??1})).filter(e=>1!==e.columnSpanConfig):[],p=i+a,c=Array.from({length:o+1-l},(e,t)=>t+l).map(e=>{let s=e===l?0:e*p,u=e===o?null:(e+1)*p-.01,{styles:c,numberOfVisibleItems:d}=m.reduce((r,o)=>{let{columnSpanConfig:l}=o,s=Math.min(function({columnCount:e,columnSpanConfig:t}){return"number"==typeof t?t:t[e<=2?"sm":e<=4?"md":e<=8?"lg":"xl"]??1}({columnCount:e,columnSpanConfig:l}),e),u=null!=o.index&&r.numberOfVisibleItems>=s+o.index,m=n?100/e*s:i*s+a*(s-1),{numberOfVisibleItems:p}=r;return u?p-=s-1:o.index<p&&(p+=1),{styles:r.styles.concat(function({className:e,index:t,columnSpanConfig:n,visible:a,width:r,flexible:i}){let o="number"==typeof n?n:btoa(JSON.stringify(n));return i?`
      .${e} .static[data-column-span="${o}"]:nth-child(${t+1}) {
        visibility: ${a?"visible":"hidden"} !important;
        position: ${a?"inherit":"absolute"} !important;
        width: ${r}% !important;
      }`:`
      .${e} .static[data-column-span="${o}"]:nth-child(${t+1}) {
        visibility: ${a?"visible":"hidden"} !important;
        position: ${a?"inherit":"absolute"} !important;
        width: ${r}px !important;
      }`}({className:t,index:o.index,columnSpanConfig:l,visible:u,width:m,flexible:n})),numberOfVisibleItems:p}},{styles:"",numberOfVisibleItems:e}),h=n?`
      .${t} .static {
        box-sizing: border-box;
        width: calc(100% / ${e}) !important;
      }
    `:`
      .${t} {
        max-width: ${e*p}px;
      }

      .${t} .static {
        width: ${i}px !important;
      }
    `;return{minWidth:s,maxWidth:u,styles:`
      .${t} .static:nth-child(-n+${d}) {
        position: static !important;
        visibility: visible !important;
        float: ${r?"right":"left"};
        display: block;
      }

      .${t} .static {
        padding: 0 ${a/2}px;
      }

      ${h}

      ${c}
    `}}),d=c.map(({minWidth:e,maxWidth:t,styles:n})=>`
    @container (min-width: ${e}px) ${t?`and (max-width: ${t}px)`:""} {
      ${n}
    }
  `),h=c.map(({minWidth:e,maxWidth:t,styles:n})=>`
    @media (min-width: ${e}px) ${t?`and (max-width: ${t}px)`:""} {
      ${n}
    }
  `),_=e.enableContainerQuery?`
    ${d.join("")}
    @supports not (container-type: inline-size) {
      ${h.join("")}
    }
  `:h.join("");return{className:t,styles:`
    .masonryContainer {
      container-type: inline-size;
    }

    .masonryContainer > .centered {
      margin-left: auto;
      margin-right: auto;
    }

    .${t} .static {
      position: absolute !important;
      visibility: hidden !important;
    }

    ${_}
  `}}({gutterWidth:X,flexible:J,items:C,isRTL:W,itemWidth:Q,maxColumns:e.maxColumns??Math.max(C.length,h.g5),minColumns:q,enableContainerQuery:ei||F,_getColumnSpanConfig:I}),ed=`${em} ${ep}`.trim(),{anyEnabled:eh,expName:e_,group:eb,isMeasureAllEnabled:ef}=(0,c.Z)(),ew=(0,a.useMemo)(()=>!en||C.every(e=>!en.has(e)),[]),ey=eb&&ew,eg=(0,a.useRef)(),ev=(0,a.useRef)(C.length),ex=(0,a.useRef)(0);(0,a.useEffect)(()=>{ey&&C.forEach((e,t)=>{P.current[t]||(P.current[t]={fetchTimestamp:Date.now(),measureTimestamp:0,hasRendered:!1,pageCount:ex.current})}),ev.current=C.length,ex.current+=1},[C]),(0,a.useEffect)(()=>{er.current&&(er.current=!1)},[]),(0,a.useEffect)(()=>{let e=()=>ee.current+=1;return ey&&(eg.current=Date.now(),window.addEventListener("scroll",e)),()=>{if(ey){let t=P.current;window.removeEventListener("scroll",e);let n=t.filter(e=>!!e.measureTimestamp).length,a=t.filter(e=>e.hasRendered).length,r=ev.current,i={deviceType:j,experimentName:e_,experimentGroup:eb,handlerId:Z,isAuthenticated:G};(0,y.LY)("webapp.masonry.timeSpent",eg.current?Date.now()-eg.current:0,{tags:i}),(0,y.S0)("webapp.masonry.itemsFetched",r,{tags:i}),(0,y.S0)("webapp.masonry.itemsMeasured",n,{tags:i}),(0,y.S0)("webapp.masonry.itemsMeasuredPercentage",Math.floor(n/r*100),{tags:i}),(0,y.S0)("webapp.masonry.itemsRendered",a,{tags:i}),(0,y.S0)("webapp.masonry.itemsRenderedPercentage",Math.floor(a/r*100),{tags:i}),(0,y.S0)("webapp.masonry.scrollCount",ee.current,{tags:i})}}},[]);let eC=(0,a.useCallback)((e,t,n)=>{let a=e.reduce((e,t)=>e+t),r=a/e.length;(0,y.S0)("webapp.masonry.multiColumnWhitespace.average",r,{sampleRate:1,tags:{earlyBailoutExperimentGroup:eo||"unknown",experimentalMasonryGroup:eb||"unknown",fluidGridGroup:Y||"unknown",handlerId:Z,isAuthenticated:G,multiColumnItemSpan:e.length}}),(0,y.S0)("webapp.masonry.twoColWhitespace",r,{sampleRate:1,tags:{columnWidth:Q,minCols:q}}),eo&&(0,y.S0)("webapp.masonry.graphIterations",t,{sampleRate:1,tags:{columnSpan:n,exprimentGroup:eo}}),L({event_type:15878,component:14468,aux_data:{total_whitespace_px:a}}),L({event_type:16062,component:14468,aux_data:{average_whitespace_px:r}}),L({event_type:16063,component:14468,aux_data:{max_whitespace_px:Math.max(...e)}}),e.forEach(t=>{t>=50&&((0,y.nP)("webapp.masonry.multiColumnWhitespace.over50",{sampleRate:1,tags:{earlyBailoutExperimentGroup:eo||"unknown",experimentalMasonryGroup:eb||"unknown",fluidGridGroup:Y||"unknown",handlerId:Z,isAuthenticated:G,multiColumnItemSpan:e.length}}),L({event_type:16261,component:14468})),t>=100&&((0,y.nP)("webapp.masonry.multiColumnWhitespace.over100",{sampleRate:1,tags:{earlyBailoutExperimentGroup:eo||"unknown",experimentalMasonryGroup:eb||"unknown",fluidGridGroup:Y||"unknown",handlerId:Z,isAuthenticated:G,multiColumnItemSpan:e.length}}),L({event_type:16262,component:14468}))}),(0,y.nP)("webapp.masonry.multiColumnWhitespace.count",{sampleRate:1,tags:{earlyBailoutExperimentGroup:eo||"unknown",experimentalMasonryGroup:eb||"unknown",fluidGridGroup:Y||"unknown",handlerId:Z,isAuthenticated:G,multiColumnItemSpan:e.length}})},[Q,eo,L,q,G,Z,Y,eb]),eE=(0,a.useCallback)(e=>ey?(0,v.jsx)(x,{analyticsData:P,idx:e.itemIdx,isMeasuring:e.isMeasuring,masonryV2ExpGroup:eb,masonryV2ExpName:e_,children:(0,v.jsx)(o.Z,{name:"MasonryItem",children:$(e)})}):(0,v.jsx)(o.Z,{name:"MasonryItem",children:$(e)}),[$]);return(0,v.jsx)("div",{className:"masonryContainer","data-test-id":"masonry-container",id:l,style:F?{padding:`0 ${X/2}px`}:void 0,children:(0,v.jsxs)("div",{className:ed,children:[U&&er.current?(0,v.jsx)(_.Z,{"data-test-id":"masonry-ssr-styles",unsafeCSS:ec}):null,(0,v.jsx)(r.xu,{"data-test-id":"max-width-container",marginBottom:0,marginEnd:"auto",marginStart:"auto",marginTop:0,maxWidth:e.maxColumns?et*e.maxColumns:void 0,children:eh?(0,v.jsx)(r.GX,{ref:e=>{M&&(M.current=e)},_dynamicHeights:N,_getColumnSpanConfig:I,_loadingStateItems:B,_logTwoColWhitespace:eC,_measureAll:ef,_renderLoadingStateItems:V,_whitespaceThreshold:eu,align:t,columnWidth:Q,gutterWidth:X,items:C,layout:J?K:E??"basic",loadItems:S,measurementStore:en,minCols:q,renderItem:eE,scrollContainer:ea,virtualBufferFactor:.3,virtualize:R}):(0,v.jsx)(r.Rk,{ref:e=>{M&&(M.current=e)},_dynamicHeights:N,_getColumnSpanConfig:I,_loadingStateItems:B,_logTwoColWhitespace:eC,_renderLoadingStateItems:V,_whitespaceThreshold:eu,align:t,columnWidth:Q,gutterWidth:X,items:C,layout:J?K:E??"basic",loadItems:S,measurementStore:en,minCols:q,renderItem:eE,scrollContainer:ea,virtualBufferFactor:.3,virtualize:R})})]})})}},401111:(e,t,n)=>{n.d(t,{Z:()=>s});var a=n(3808),r=n(340523),i=n(5859),o=n(554786);let l=({isEligible:e})=>{let t=(0,o.ZP)(),{isAuthenticated:n}=(0,i.B)(),l=(0,r.F)(),{enabled:s}=(0,a.Z)();return"desktop"===t&&e?s?{anyEnabled:!0,group:"enabled_221_16"}:l.checkExperiment(n?"web_fluid_grid_desktop_auth":"web_fluid_grid_desktop_unauth"):{group:"",anyEnabled:!1}};function s(e=!0){let{group:t,anyEnabled:n}=l({isEligible:e}),a=t.match(/enabled_([\d]+)_([\d]+)/),r=a?parseInt(a[1],10):void 0,i=a?parseInt(a[2],10):void 0,o=i?Math.floor(i/4):void 0;return{anyEnabled:n,group:t,experimentalColumnWidth:r,experimentalGutter:i,experimentalGutterBoints:o}}},667677:(e,t,n)=>{n.d(t,{Z:()=>c});var a=n(667294),r=n(883119),i=n(876594),o=n(922719),l=n(406893),s=n(785893);let u=`pulsing {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
}`,m={backgroundColor:i._VP,animation:"pulsing 2s ease-out 0.5s infinite",borderRadius:i.Ev2};function p({data:e}){let{height:t}=e;return(0,s.jsxs)(a.Fragment,{children:[(0,s.jsx)(l.Z,{unsafeCSS:(0,o.Ll)([u])}),(0,s.jsx)(r.xu,{dangerouslySetInlineStyle:{__style:m},"data-test-id":"skeleton-pin",children:(0,s.jsx)(r.xu,{height:t})})]})}function c({useLoadingState:e,numOfPins:t=50}){let n=(0,a.useMemo)(()=>Array.from({length:t}).reduce((e,t,n)=>[...e,{height:n%2==0?356:236}],[]),[t]);return{_loadingStateItems:e?n:void 0,_renderLoadingStateItems:e?({data:e})=>(0,s.jsx)(p,{data:e}):void 0}}},961550:(e,t,n)=>{n.d(t,{BO:()=>x,GC:()=>k,GJ:()=>b,L7:()=>h,Lc:()=>p,Mh:()=>u,Qf:()=>m,Qq:()=>M,Un:()=>$,X$:()=>S,Z7:()=>d,bT:()=>y,bd:()=>w,df:()=>c,iz:()=>R,kl:()=>f,lR:()=>O,m6:()=>C,mT:()=>v,pS:()=>g,uW:()=>E,zz:()=>_});var a,r,i=n(883119),o=n(876594),l=n(898518),s=n(983983);let u="right",m=72,p="VerticalNavContent",c=24,d="lg",h=16,_=16,b=392,f=12,w=o.mJW,y=o.Kuk,g=new i.H3([s.NW]),v=new i.Ry(s.fe-3),x=new i.H3([g,l.kl]),C=new i.H3([x]),E=2,S=8,M=3,k=12,$=((a={}).PINTEREST_LOGO="web.vertical_nav.pinterest_logo.click",a.HOME="web.vertical_nav.home.click",a.TODAY="web.vertical_nav.today.click",a.CREATE="web.vertical_nav.create.click",a.NEWS="web.vertical_nav.news.click",a.CONVERSATIONS="web.vertical_nav.conversations.click",a.AVATAR="web.vertical_nav.avatar.click",a.ACCOUNT_SWITCHER="web.vertical_nav.account_switcher.click",a.MORE_OPTIONS_OPT_OUT="web.vertical_nav.more_options.opt_out",a.MORE_OPTIONS="web.vertical_nav.more_options.click",a),O=((r={}).CONTROL="control",r.EMPLOYEES="employees",r.ENABLED="enabled",r.ENABLED_HOME_BUTTON="enabled_home_button",r.ENABLED_HOME_AND_LOGO="enabled_home_and_logo",r.NONE="",r),R=e=>({tags:{experimentGroup:e}})},408998:(e,t,n)=>{n.d(t,{M:()=>i,f:()=>r});var a=n(658583);let r=()=>{a.t8({name:"forced_experiments",purpose:"personalization",httpOnly:!1,duration:"30d"},JSON.stringify({web_vertical_nav:!1}))},i=()=>{a.zN("forced_experiments")}},995026:(e,t,n)=>{n.d(t,{Z:()=>r});var a=n(741983);function r(e){return!((0,a.Gl)(e)||(0,a.PY)(e)||(0,a.jC)(e)||(0,a.Xn)(e)||(0,a.b_)(e)||(0,a.oF)(e)||(0,a.dt)(e)||(0,a.x7)(e)||(0,a.cY)(e)||(0,a.bb)(e))}},898518:(e,t,n)=>{n.d(t,{CZ:()=>o,Db:()=>s,Lu:()=>i,kl:()=>a,sb:()=>l,t3:()=>r,to:()=>u});let a=new(n(883119)).Ry(700),r="defaultInboxView",i="newMessageView",o="newMessageSelectRecipientsView",l="invitesRequestsView",s="followInviteEducationView",u=64}}]);
//# sourceMappingURL=https://sm.pinimg.com/webapp/6575-0b73216faac6086f.mjs.map