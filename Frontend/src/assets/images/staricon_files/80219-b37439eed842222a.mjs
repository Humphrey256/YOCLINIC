"use strict";(self.__LOADABLE_LOADED_CHUNKS__=self.__LOADABLE_LOADED_CHUNKS__||[]).push([["80219"],{70455:function(e,t,n){n.r(t),n.d(t,{default:()=>C});var a=n("667294"),r=n("883119"),i=n("219300"),o=n("537618");function s(e,t,n){var a;return(t="symbol"==typeof(a=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,t||"default");if("object"!=typeof a)return a;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(t,"string"))?a:String(a))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}let l={},u=e=>{let t=e.__id||e.id;return"string"==typeof t&&t||null};class m{constructor(){s(this,"idMap",new Map),s(this,"objMap",new WeakMap)}get(e){let t=u(e);return this.objMap.get(e)??(t?this.idMap.get(t):void 0)}has(e){let t=u(e);return this.objMap.has(e)??(!!t&&this.idMap.has(t))}set(e,t){let n=u(e);n&&this.idMap.set(n,t),this.objMap.set(e,t)}reset(){this.idMap=new Map,this.objMap=new WeakMap}}var p=n("924967"),d=n("322494"),c=n("398605"),h=n("112393"),f=n("342117"),y=n("561162"),g=n("3879"),x=n("55077"),b=n("320288"),w=n("554281"),_=n("785893");function v({analyticsData:e,children:t,idx:n,isMeasuring:r,masonryV2ExpName:i,masonryV2ExpGroup:s}){let l=(0,x.ZP)(),{isAuthenticated:u}=(0,g.B)(),m=(0,w.MM)();return(0,a.useEffect)(()=>{if(e.current[n]){let{fetchTimestamp:t,measureTimestamp:a,hasRendered:o,pageCount:p}=e.current[n]??{},d={deviceType:l,experimentName:i,experimentGroup:s,handlerId:m,isAuthenticated:u,pageCount:p};r&&!a&&(e.current[n].measureTimestamp=Date.now(),(0,b.LY)("webapp.masonry.itemMeasureStart",Date.now()-t,{tags:d})),r||o||((0,b.LY)("webapp.masonry.itemRenderStart",Date.now()-a,{tags:d}),e.current[n].hasRendered=!0)}},[r]),(0,_.jsx)(o.Z,{name:"MasonryItem",children:t})}function C(e){let{align:t,cacheKey:n,id:s,isGridCentered:u=!0,items:C,layout:S,loadItems:$,masonryRef:M,optOutFluidGridExperiment:j=!1,renderItem:E,scrollContainerRef:R,virtualize:k=!0,_getColumnSpanConfig:W,_dynamicHeights:G,useLoadingState:I}=e,D=(0,x.ZP)(),{isAuthenticated:L,isRTL:B}=(0,g.B)(),{logContextEvent:N}=(0,i.v)(),P=(0,y.F)(),Z="desktop"===D,T=(0,w.MM)(),A=(0,a.useRef)(C.map(()=>({fetchTimestamp:Date.now(),measureTimestamp:Date.now(),hasRendered:!1,pageCount:0}))),{_loadingStateItems:F,_renderLoadingStateItems:O}=(0,c.Z)({useLoadingState:I}),{experimentalColumnWidth:z,experimentalGutter:V,anyEnabled:H,group:Y}=(0,p.Z)("flexible"!==S&&!j),K=e.serverRender??!!Z,U="flexible"===S||"uniformRowFlexible"===S||"desktop"!==D||H,X=(U&&S?.startsWith("uniformRow")?"uniformRowFlexible":void 0)??(K?"serverRenderedFlexible":"flexible"),J=e.columnWidth??z??h.yF;U&&(J=Math.floor(J));let q=e.gutterWidth??V??(Z?h.oX:1),Q=e.minCols??h.yc,ee=(0,a.useRef)(0),et=J+q,en=function(e){if(null==e)return;let t=function(e){let t=l[e];return t&&t.screenWidth===window.innerWidth||(l[e]={screenWidth:window.innerWidth}),l[e]}(e);return t.measurementCache||(t.measurementCache=new m),t.measurementCache}(n),ea=(0,a.useCallback)(()=>R?.current||window,[R]),er=(0,a.useRef)(!0),{anyEnabled:ei,group:eo}=W?P.checkExperiment("web_masonry_mixed_early_bailout"):{anyEnabled:!1,group:""},es=ei?e=>e<=3?2*q:3*q:void 0,el=u&&er.current?"centered":"",{className:eu,styles:em}=function(e){let t=`m_${Object.keys(e).sort().reduce((t,n)=>{let a=e[n];return null==a||"object"==typeof a||"function"==typeof a?t:"boolean"==typeof a?t+(a?"t":"f"):t+a},"").replace(/\:/g,"\\:")}`,{flexible:n,gutterWidth:a,isRTL:r,itemWidth:i,maxColumns:o,minColumns:s,items:l,_getColumnSpanConfig:u}=e,m=u?l.map((e,t)=>({index:t,columnSpanConfig:u(e)??1})).filter(e=>1!==e.columnSpanConfig):[],p=i+a,d=Array.from({length:o+1-s},(e,t)=>t+s).map(e=>{let l=e===s?0:e*p,u=e===o?null:(e+1)*p-.01,{styles:d,numberOfVisibleItems:c}=m.reduce((r,o)=>{let{columnSpanConfig:s}=o,l=Math.min(function({columnCount:e,columnSpanConfig:t}){return"number"==typeof t?t:t[e<=2?"sm":e<=4?"md":e<=8?"lg":"xl"]??1}({columnCount:e,columnSpanConfig:s}),e),u=null!=o.index&&r.numberOfVisibleItems>=l+o.index,m=n?100/e*l:i*l+a*(l-1),{numberOfVisibleItems:p}=r;return u?p-=l-1:o.index<p&&(p+=1),{styles:r.styles.concat(function({className:e,index:t,columnSpanConfig:n,visible:a,width:r,flexible:i}){let o="number"==typeof n?n:btoa(JSON.stringify(n));return i?`
      .${e} .static[data-column-span="${o}"]:nth-child(${t+1}) {
        visibility: ${a?"visible":"hidden"} !important;
        position: ${a?"inherit":"absolute"} !important;
        width: ${r}% !important;
      }`:`
      .${e} .static[data-column-span="${o}"]:nth-child(${t+1}) {
        visibility: ${a?"visible":"hidden"} !important;
        position: ${a?"inherit":"absolute"} !important;
        width: ${r}px !important;
      }`}({className:t,index:o.index,columnSpanConfig:s,visible:u,width:m,flexible:n})),numberOfVisibleItems:p}},{styles:"",numberOfVisibleItems:e}),h=n?`
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
    `;return{minWidth:l,maxWidth:u,styles:`
      .${t} .static:nth-child(-n+${c}) {
        position: static !important;
        visibility: visible !important;
        float: ${r?"right":"left"};
        display: block;
      }

      .${t} .static {
        padding: 0 ${a/2}px;
      }

      ${h}

      ${d}
    `}}),c=d.map(({minWidth:e,maxWidth:t,styles:n})=>`
    @container (min-width: ${e}px) ${t?`and (max-width: ${t}px)`:""} {
      ${n}
    }
  `),h=d.map(({minWidth:e,maxWidth:t,styles:n})=>`
    @media (min-width: ${e}px) ${t?`and (max-width: ${t}px)`:""} {
      ${n}
    }
  `),f=`
    ${c.join("")}
    @supports not (container-type: inline-size) {
      ${h.join("")}
    }
  `;return{className:t,styles:`
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

    ${f}
  `}}({gutterWidth:q,flexible:U,items:C,isRTL:B,itemWidth:J,maxColumns:e.maxColumns??Math.max(C.length,h.g5),minColumns:Q,_getColumnSpanConfig:W}),ep=`${el} ${eu}`.trim(),{anyEnabled:ed,expName:ec,group:eh,isMeasureAllEnabled:ef}=(0,d.Z)(),ey=(0,a.useMemo)(()=>!en||C.every(e=>!en.has(e)),[]),eg=eh&&ey,ex=(0,a.useRef)(),eb=(0,a.useRef)(C.length),ew=(0,a.useRef)(0);(0,a.useEffect)(()=>{eg&&C.forEach((e,t)=>{A.current[t]||(A.current[t]={fetchTimestamp:Date.now(),measureTimestamp:0,hasRendered:!1,pageCount:ew.current})}),eb.current=C.length,ew.current+=1},[C]),(0,a.useEffect)(()=>{er.current&&(er.current=!1)},[]),(0,a.useEffect)(()=>{let e=()=>ee.current+=1;return eg&&(ex.current=Date.now(),window.addEventListener("scroll",e)),()=>{if(eg){let t=A.current;window.removeEventListener("scroll",e);let n=t.filter(e=>!!e.measureTimestamp).length,a=t.filter(e=>e.hasRendered).length,r=eb.current,i={deviceType:D,experimentName:ec,experimentGroup:eh,handlerId:T,isAuthenticated:L};(0,b.LY)("webapp.masonry.timeSpent",ex.current?Date.now()-ex.current:0,{tags:i}),(0,b.S0)("webapp.masonry.itemsFetched",r,{tags:i}),(0,b.S0)("webapp.masonry.itemsMeasured",n,{tags:i}),(0,b.S0)("webapp.masonry.itemsMeasuredPercentage",Math.floor(n/r*100),{tags:i}),(0,b.S0)("webapp.masonry.itemsRendered",a,{tags:i}),(0,b.S0)("webapp.masonry.itemsRenderedPercentage",Math.floor(a/r*100),{tags:i}),(0,b.S0)("webapp.masonry.scrollCount",ee.current,{tags:i})}}},[]);let e_=(0,a.useCallback)((e,t,n)=>{let a=e.reduce((e,t)=>e+t),r=a/e.length;(0,b.S0)("webapp.masonry.multiColumnWhitespace.average",r,{sampleRate:1,tags:{earlyBailoutExperimentGroup:eo||"unknown",experimentalMasonryGroup:eh||"unknown",fluidGridGroup:Y||"unknown",handlerId:T,isAuthenticated:L,multiColumnItemSpan:e.length}}),(0,b.S0)("webapp.masonry.twoColWhitespace",r,{sampleRate:1,tags:{columnWidth:J,minCols:Q}}),eo&&(0,b.S0)("webapp.masonry.graphIterations",t,{sampleRate:1,tags:{columnSpan:n,exprimentGroup:eo}}),N({event_type:15878,component:14468,aux_data:{total_whitespace_px:a}}),N({event_type:16062,component:14468,aux_data:{average_whitespace_px:r}}),N({event_type:16063,component:14468,aux_data:{max_whitespace_px:Math.max(...e)}}),e.forEach(t=>{t>=50&&((0,b.nP)("webapp.masonry.multiColumnWhitespace.over50",{sampleRate:1,tags:{earlyBailoutExperimentGroup:eo||"unknown",experimentalMasonryGroup:eh||"unknown",fluidGridGroup:Y||"unknown",handlerId:T,isAuthenticated:L,multiColumnItemSpan:e.length}}),N({event_type:16261,component:14468})),t>=100&&((0,b.nP)("webapp.masonry.multiColumnWhitespace.over100",{sampleRate:1,tags:{earlyBailoutExperimentGroup:eo||"unknown",experimentalMasonryGroup:eh||"unknown",fluidGridGroup:Y||"unknown",handlerId:T,isAuthenticated:L,multiColumnItemSpan:e.length}}),N({event_type:16262,component:14468}))}),(0,b.nP)("webapp.masonry.multiColumnWhitespace.count",{sampleRate:1,tags:{earlyBailoutExperimentGroup:eo||"unknown",experimentalMasonryGroup:eh||"unknown",fluidGridGroup:Y||"unknown",handlerId:T,isAuthenticated:L,multiColumnItemSpan:e.length}})},[J,eo,N,Q,L,T,Y,eh]),ev=(0,a.useCallback)(e=>eg?(0,_.jsx)(v,{analyticsData:A,idx:e.itemIdx,isMeasuring:e.isMeasuring,masonryV2ExpGroup:eh,masonryV2ExpName:ec,children:(0,_.jsx)(o.Z,{name:"MasonryItem",children:E(e)})}):(0,_.jsx)(o.Z,{name:"MasonryItem",children:E(e)}),[E]);return(0,_.jsx)("div",{className:"masonryContainer","data-test-id":"masonry-container",id:s,style:H?{padding:`0 ${q/2}px`}:void 0,children:(0,_.jsxs)("div",{className:ep,children:[K&&er.current?(0,_.jsx)(f.Z,{"data-test-id":"masonry-ssr-styles",unsafeCSS:em}):null,(0,_.jsx)(r.xu,{"data-test-id":"max-width-container",marginBottom:0,marginEnd:"auto",marginStart:"auto",marginTop:0,maxWidth:e.maxColumns?et*e.maxColumns:void 0,children:ed?(0,_.jsx)(r.GX,{ref:e=>{M&&(M.current=e)},_dynamicHeights:G,_earlyBailout:es,_getColumnSpanConfig:W,_loadingStateItems:F,_logTwoColWhitespace:e_,_measureAll:ef,_renderLoadingStateItems:O,align:t,columnWidth:J,gutterWidth:q,items:C,layout:U?X:S??"basic",loadItems:$,measurementStore:en,minCols:Q,renderItem:ev,scrollContainer:ea,virtualBufferFactor:.3,virtualize:k}):(0,_.jsx)(r.Rk,{ref:e=>{M&&(M.current=e)},_dynamicHeights:G,_earlyBailout:es,_getColumnSpanConfig:W,_loadingStateItems:F,_logTwoColWhitespace:e_,_renderLoadingStateItems:O,align:t,columnWidth:J,gutterWidth:q,items:C,layout:U?X:S??"basic",loadItems:$,measurementStore:en,minCols:Q,renderItem:ev,scrollContainer:ea,virtualBufferFactor:.3,virtualize:k})})]})})}},398605:function(e,t,n){n.d(t,{Z:function(){return d}});var a=n(667294),r=n(883119),i=n(876594),o=n(771862),s=n(342117),l=n(785893);let u=`pulsing {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
}`,m={backgroundColor:i._VP,animation:"pulsing 2s ease-out 0.5s infinite",borderRadius:i.Ev2};function p({data:e}){let{height:t}=e;return(0,l.jsxs)(a.Fragment,{children:[(0,l.jsx)(s.Z,{unsafeCSS:(0,o.Ll)([u])}),(0,l.jsx)(r.xu,{dangerouslySetInlineStyle:{__style:m},"data-test-id":"skeleton-pin",children:(0,l.jsx)(r.xu,{height:t})})]})}function d({useLoadingState:e,numOfPins:t=50}){let n=(0,a.useMemo)(()=>Array.from({length:t}).reduce((e,t,n)=>[...e,{height:n%2==0?356:236}],[]),[t]);return{_loadingStateItems:e?n:void 0,_renderLoadingStateItems:e?({data:e})=>(0,l.jsx)(p,{data:e}):void 0}}}}]);
//# sourceMappingURL=https://sm.pinimg.com/webapp/80219-b37439eed842222a.mjs.map