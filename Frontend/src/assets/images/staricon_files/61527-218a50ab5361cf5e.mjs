"use strict";(self.__LOADABLE_LOADED_CHUNKS__=self.__LOADABLE_LOADED_CHUNKS__||[]).push([["61527"],{17314:function(e,t,n){n.d(t,{Z:function(){return c}});var r,i,a=n(813653),s=n(831423),o=0,l=0;let c=function(e,t,n){var c=t&&n||0,u=t||Array(16),d=(e=e||{}).node||r,m=void 0!==e.clockseq?e.clockseq:i;if(null==d||null==m){var p=e.random||(e.rng||a.Z)();null==d&&(d=r=[1|p[0],p[1],p[2],p[3],p[4],p[5]]),null==m&&(m=i=(p[6]<<8|p[7])&16383)}var f=void 0!==e.msecs?e.msecs:Date.now(),x=void 0!==e.nsecs?e.nsecs:l+1,_=f-o+(x-l)/1e4;if(_<0&&void 0===e.clockseq&&(m=m+1&16383),(_<0||f>o)&&void 0===e.nsecs&&(x=0),x>=1e4)throw Error("uuid.v1(): Can't create more than 10M uuids/sec");o=f,l=x,i=m;var h=((268435455&(f+=122192928e5))*1e4+x)%4294967296;u[c++]=h>>>24&255,u[c++]=h>>>16&255,u[c++]=h>>>8&255,u[c++]=255&h;var v=f/4294967296*1e4&268435455;u[c++]=v>>>8&255,u[c++]=255&v,u[c++]=v>>>24&15|16,u[c++]=v>>>16&255,u[c++]=m>>>8|128,u[c++]=255&m;for(var w=0;w<6;++w)u[c+w]=d[w];return t||(0,s.Z)(u)}},170217:function(e,t,n){n.d(t,{Hv:function(){return l},aX:function(){return d},nK:function(){return m}});var r=n(667294),i=n(616550),a=n(486188),s=n(785893);let{Provider:o,useHook:l}=(0,a.Z)("HistoryStackContext",{previous:[],current:null,forward:[]}),c=e=>e&&e.pathname?e.pathname+(e.search||""):"";function u(e,t){let n={action:t.type,location:t.location,match:t.match};if(t.location===e.current?.location)return e;switch(t.type){case"POP":if(e.forward.length>0&&c(e.forward[0].location)===c(n.location))return{...e,forward:e.forward.slice(1),current:{...e.forward[0],action:t.type},previous:e.current?[...e.previous,{action:e.current.action,location:e.current.location,match:e.current.match}]:e.previous};return{...e,forward:e.current?[{action:e.current.action,location:e.current.location,match:e.current.match},...e.forward]:e.forward,current:{...e.previous.slice(-1)[0],action:t.type},previous:e.previous.slice(0,-1)};case"PUSH":return{...e,forward:e.forward.length>0?[]:e.forward,current:n,previous:e.current?[...e.previous,{action:e.current.action,location:e.current.location,match:e.current.match}]:e.previous};case"REPLACE":return{...e,current:n};default:return e}}function d(){let{current:e,previous:t}=l();return(0,r.useMemo)(()=>e?t.concat(e):t,[e,t])}function m({children:e}){let t=(0,i.k6)(),n=(0,i.TH)(),a=(0,i.$B)(),l={forward:[],current:{action:t.action,location:n,match:a},previous:[]},[c,d]=(0,r.useReducer)(u,l);return(0,r.useEffect)(()=>{let{action:e}=t;d({type:e,location:n,match:a})},[n]),(0,s.jsx)(o,{value:c,children:e})}},517229:function(e,t,n){n.d(t,{Z:function(){return s}});var r=n(310387),i=n(785893);let a=[502312,502320,502321,502322],s=({placementId:e})=>(0,i.jsx)(r.Z,{eligibleIds:a,placementId:e,preventRemoval:!0,children:({complete:e})=>(e(),null)})},741893:function(e,t,n){n.d(t,{Z:function(){return o},h:function(){return s}});var r=n(172045),i=n(17314);function a(e,t,n){var r;return(t="symbol"==typeof(r=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=typeof r)return r;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(t,"string"))?r:String(r))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}let s="undefined"!=typeof window&&window.performance&&window.performance.now?()=>Math.floor(1e6*window.performance.now()):()=>1e6*Date.now(),o=class{constructor(e){a(this,"start",()=>(this.startTime=s(),this.startTime)),a(this,"end",()=>(this.endTime=s(),this.duration=this.startTime?this.endTime-this.startTime:null,this.duration));try{this.uuid=(0,r.Z)()}catch(e){this.uuid=(0,i.Z)()}e&&Object.assign(this,e)}}},3366:function(e,t,n){n.d(t,{$:function(){return r},Z:function(){return a}});let{Provider:r,useMaybeHook:i}=(0,n(486188).Z)("TimeSpentManagerContext"),a=i},353556:function(e,t,n){n.d(t,{Z:function(){return a},k:function(){return r}});let{Provider:r,useHook:i}=(0,n(486188).Z)("Conversations"),a=i},884012:function(e,t,n){n.r(t),n.d(t,{default:function(){return u}});var r=n(667294),i=n(310387),a=n(673695),s=n(959474),o=n(795821),l=n(785893);let c=(0,r.lazy)(()=>n.e("51512").then(n.bind(n,374474)));function u({placementId:e}){let t=(0,s.Z)();return"enabled_banner_bottom"===(0,o.kh)(t)?(0,l.jsx)(i.Z,{eligibleIds:[506465],placementId:e,children:({complete:e,dismiss:t})=>(0,l.jsx)(a.Z,{children:(0,l.jsx)(c,{complete:e,dismiss:t})})}):null}},795821:function(e,t,n){n.d(t,{Lr:function(){return c},gW:function(){return o},kh:function(){return d},po:function(){return u},sA:function(){return l}});var r=n(980570),i=n(561162),a=n(3915),s=n(55077);let o="fade",l=()=>`
  @keyframes ${o} {
    0% {
      opacity: 1;
    }
    75% {
      opacity: 0;
    }
    100% {
      opacity: 0;
      display: none;
    }
  }
`;function c(e=!0){a.ZP.setItem(r.sz,JSON.stringify(e))}function u(){return JSON.parse(a.ZP?.getItem(r.sz))}let d=e=>{let{checkExperiment:t}=(0,i.F)(),n=(0,s.HG)();return!t("auth_dweb_google_fedcm_onetap_modal",{dangerouslySkipActivation:!0}).group&&n&&e.isAuth&&e.socialNetwork?.gplus?.connected&&!u()?t("dweb_google_auth_gesture_collection").group:""}},790849:function(e,t,n){n.d(t,{Z:function(){return c}});var r=n(219300),i=n(320288);let a={13:e=>!!e.view_parameter,9105:e=>!!e.view_parameter,9104:e=>!!e.view_parameter,10357:e=>!!e.view_parameter,10358:e=>!!e.view_parameter,10359:e=>!!e.view_parameter,10360:e=>!!e.view_parameter,15748:e=>!!e.view_parameter,110:e=>!!e.view_parameter,102:e=>!!e.element&&!!e.view_parameter,101:e=>!!e.element&&!!e.view_parameter,15749:e=>!!e.element&&!!e.view_parameter,4104:e=>!!e.view_parameter&&!e.element,4105:e=>!!e.view_parameter&&!e.element,8900:e=>!!e.view_parameter&&!e.element,9626:e=>!!e.view_parameter&&!e.element,9625:e=>!!e.view_parameter&&!e.element,46:e=>!!e.view_parameter&&!e.element,45:e=>!!e.view_parameter&&!e.element},s=[96,34,241,1030,1151,1150,136,11906,124,240,12772,30,13,14572,14573,14574,14575,14576,15900],o=[259,3120,3139,172,3596,3542,261,171,260,4052,4053],l=e=>{let{event_type:t,element:n,view_parameter:r}=e;return Object.keys(a).includes(`${t}`)&&(!n||s.includes(n))&&(!r||o.includes(r))?a[t]?.(e)?-1===[213,24,260].indexOf(e.view_type||0)?{code:"missing_view_type",message:"Please provide a valid ViewType for Nux Events."}:null:{code:"invalid_param_combinations",message:"Please provide valid param combinations for Nux events. Refer to NuxParams type."}:{code:"invalid_param_types",message:"Please provide valid parameter types for Nux events. Refer to NuxParams type."}},c=()=>{let{logContextEvent:e}=(0,r.v)();return t=>{let{event_type:n,element:r,view_parameter:a,component:s,view_type:o,aux_data:c}=t,u=l(t);if(u){console.error(u.message),(0,i.nP)("webapp.track_nux_invalid_parameters",{sampleRate:1,tags:{code:u.code,component:s,event_type:n,element:r,view_type:o,view_parameter:a}});return}e({component:s,event_type:n,element:r,view_parameter:a,view_type:o,aux_data:c})}}},92e3:function(e,t,n){n.d(t,{Z:()=>ec});var r=n("667294"),i=n("616550"),a=n("883119"),s=n("463722"),o=n("86485"),l=n("310387"),c=n("673695"),u=n("785893");let d=(0,r.lazy)(()=>n.e("85523").then(n.bind(n,172334))),m=[502722],p=({placementId:e})=>(0,u.jsx)(l.Z,{eligibleIds:m,placementId:e,children:({complete:e,dismiss:t})=>(0,u.jsx)(o.Z,{name:"SafeSuspense_LocationUpsellComponent",children:(0,u.jsx)(c.Z,{children:(0,u.jsx)(d,{complete:e,dismiss:t})})})});var f=n("288435"),x=n("968933"),_=n("172693");let h=()=>(0,u.jsxs)(r.Fragment,{children:[(0,u.jsx)(_.Z,{placementId:11}),(0,u.jsx)(p,{placementId:11}),(0,u.jsx)(f.Z,{placementId:1000503}),(0,u.jsx)(x.Z,{placementId:1000541})]});var v=n("558919"),w=n("708130");function j({onDismiss:e,onComplete:t,titleText:n,detailedText:r,dismissButtonText:i,completeButtonText:s}){let o=(0,w.ZP)();return(0,u.jsx)(v.ZP,{accessibilityModalLabel:r,closeOnOutsideClick:!1,onDismiss:e,size:"sm",children:(0,u.jsx)(a.xu,{direction:"column",display:"flex",flex:"grow",position:"relative",width:"100%",children:(0,u.jsxs)(a.xu,{marginTop:2,children:[(0,u.jsx)(a.xu,{display:"flex",justifyContent:"center",marginTop:10,children:(0,u.jsx)(a.JO,{accessibilityLabel:o._('Pinterest logo icon', 'Pinterest logo icon', 'Pinterest logo icon'),color:"brandPrimary",icon:"pinterest",size:40})}),(0,u.jsx)(a.xu,{marginEnd:3,marginStart:3,marginTop:6,overflow:"hidden",rounding:2,children:(0,u.jsxs)(a.xu,{color:"default",paddingX:4,paddingY:2,children:[(0,u.jsx)(a.kC,{alignItems:"start",justifyContent:"between",children:(0,u.jsxs)(a.xu,{flex:"grow",children:[(0,u.jsx)(a.X6,{align:"center",size:"500",children:n}),(0,u.jsx)(a.xu,{paddingY:4,children:(0,u.jsxs)(a.xv,{align:"center",children:[" ",r," "]})})]})}),(0,u.jsx)(a.xu,{display:"flex",justifyContent:"end",marginBottom:12,marginTop:8,children:(0,u.jsxs)(a.kC,{gap:{row:2,column:0},justifyContent:"end",children:[(0,u.jsx)(a.zx,{color:"gray",onClick:e,size:"lg",text:i}),(0,u.jsx)(a.zx,{color:"red",onClick:t,size:"lg",text:s})]})})]})})]})})})}function g({onComplete:e,onDismiss:t,titleText:n,detailedText:i,dismissButtonText:a,completeButtonText:s}){return(0,u.jsx)(r.Fragment,{children:(0,u.jsx)(j,{completeButtonText:s,detailedText:i,dismissButtonText:a,onComplete:e,onDismiss:t,titleText:n})})}let y=function({placementId:e,experience:t}){return t&&t.display_data?(0,u.jsx)(l.Z,{eligibleIds:[503750],placementId:e,children:({complete:e,dismiss:n})=>(0,u.jsx)(g,{completeButtonText:t.display_data.complete_button_text,detailedText:t.display_data.detailed_text,dismissButtonText:t.display_data.dismiss_button_text,onComplete:e,onDismiss:n,titleText:t.display_data.title_text})}):null};var Z=n("319050"),b=n("84736"),P=n("265432"),I=n("394303"),C=n("52302");let k=(0,C.Z)(()=>n.e("43112").then(n.bind(n,643544)),{ssr:!1});function S({placementId:e,...t}){return(0,u.jsx)(l.Z,{disableAutoView:!0,eligibleTypes:[9],placementId:e,children:({complete:e,dismiss:n,view:r,experience:{display_data:i}})=>(0,u.jsx)(o.Z,{name:"SafeSuspense_ExperienceNuxContainer_NuxContainer",children:(0,u.jsx)(k,{...(0,P.Z)(I.Z,!0)(i),handleComplete:e,handleDismiss:n,handleView:r,...t})})})}var T=n("700592"),E=n("160943"),N=n("517229"),A=n("200351"),z=n("34286"),D=n("693958"),H=n("884012"),O=n("581722"),B=n("799412"),L=n("219300"),R=n("861025"),F=n("854166"),M=n("959474"),U=n("790849"),V=n("190973");let $=(0,r.lazy)(()=>n.e("43112").then(n.bind(n,643544)));function q({hideFollowedInterests:e}){let{logContextEvent:t}=(0,L.v)(),n=(0,O.I0)(),i=(0,M.Z)(),{completeExperience:a,dismissExperience:s,experienceForPlacement:l,viewExperience:d}=(0,R.Z)(11),m=l?.experience_id===500278,{steps:p,refresh_homefeed_background:f=!1}=(0,P.Z)(I.Z,!0)(l?.display_data||{}),[x,_]=(0,r.useState)(!1),h=(0,U.Z)(),v=()=>{n((0,F.U)("UserHomefeedResource",{options:(0,B.Z)({inNux:!0,staticFeed:!1,viewerIsPartner:i.isAuth&&i.isPartner})},null))};return(0,r.useEffect)(()=>{x&&s(11,500278)},[x,s]),m?(0,u.jsx)(o.Z,{name:"SafeSuspense_RenuxContainer_NuxContainer",children:(0,u.jsx)(c.Z,{children:(0,u.jsx)($,{handleComplete:()=>{t({event_type:101,component:17,element:96,view_type:213}),m&&a(11,500278);let e=Math.floor(new Date().getTime()/1e3);n((0,V.Q_)("USM_RELAUNCH_NUX_COMPLETED",e)),v()},handleDismiss:e=>{t({event_type:101,component:17,element:1150,view_type:213}),m&&(_(!0),"NuxPicker"===e&&h({event_type:9626,view_type:213,view_parameter:172})),f&&v()},handleView:()=>{m&&d(11,500278)},hasDismissedModal:x,hideFollowedInterests:e||!1,isRenux:!0,steps:p})})}):null}let J=e=>!!(e&&e.display_data&&e.display_data.is_partner_renux),X=({experience:e,isNux:t})=>(0,u.jsxs)(r.Fragment,{children:[t||J(e)?(0,u.jsx)(S,{placementId:11}):(0,u.jsx)(q,{hideFollowedInterests:!0}),(0,u.jsx)(N.Z,{placementId:11}),(0,u.jsx)(b.Z,{placementId:11}),(0,u.jsx)(z.default,{placementId:11}),(0,u.jsx)(E.Z,{placementId:11}),(0,u.jsx)(A.Z,{placementId:11}),(0,u.jsx)(D.Z,{placementId:11}),(0,u.jsx)(T.Z,{placementId:11}),(0,u.jsx)(Z.Z,{placementId:11}),(0,u.jsx)(y,{experience:e,placementId:11}),(0,u.jsx)(H.default,{placementId:11})]});var K=n("151127"),G=n("108293"),Q=n("21253"),Y=n("561162"),W=n("998836"),ee=n("88509"),et=n("676129"),en=n("137123"),er=n("353556"),ei=n("320288");let ea=(0,C.Z)(()=>n.e("34692").then(n.bind(n,229924)),{ssr:!1}),es=(0,C.Z)(()=>Promise.all([n.e("86333"),n.e("5225"),n.e("54536")]).then(n.bind(n,226928)),{ssr:!1}),eo=(0,r.lazy)(()=>Promise.all([n.e("15868"),n.e("68209")]).then(n.bind(n,665608)));function el({experience:e}){let t=(0,i.TH)(),l=(0,M.Z)(),{params:d}=(0,i.$B)(),{conversationOpen:m,dropdownOpen:p}=(0,er.Z)();(0,K.Q)({view_type:1,view_parameter:92});let{conversation_id:f,tab:x}=(0,en.mB)(t.search),_=d.conversation_id||f;(0,r.useEffect)(()=>{_&&m(_)},[_]),(0,r.useEffect)(()=>{"inbox"===x&&p()},[x]),(0,r.useEffect)(()=>{let e=document.getElementById("rum-config");null!==e&&(window.pinterest_rum_client_config=JSON.parse(e.textContent),n.e("34912").then(n.bind(n,437406)).then(e=>{e.default()}))},[]);let v=l.isAuth?l.email:"",{checkExperiment:w}=(0,Y.F)(),j=w("m10n_measurement_pinterest_tag_us").anyEnabled;(0,r.useEffect)(()=>{j&&window.pintrk&&window.pintrk("track","pagevisit",{lead_type:"Pinterest homefeed",em:v})},[j,v]);let g=(0,Q.jr)(l),y=e?.experience_id,Z=10105===y;return[500787,500894].includes(y)?(0,u.jsx)(o.Z,{name:"SafeSuspense_AuthHomePage_ExperienceBizNuxFullscreenContainer",children:(0,u.jsx)(es,{experienceId:500787,fromBizHub:!0,placementId:11})}):(0,u.jsxs)(a.xu,{children:[(0,u.jsx)(X,{experience:e,isNux:Z}),Z?(0,u.jsx)(o.Z,{name:"SafeSuspense_AuthHomePage_BackgroundPinImages",children:(0,u.jsx)(ea,{inNux:Z,isFlexible:!0})}):(0,u.jsxs)(r.Fragment,{children:[g&&(0,u.jsx)(c.Z,{children:(0,u.jsx)(eo,{})}),(0,u.jsx)(s.Z,{experience:e})]}),(0,u.jsx)(h,{})]})}let ec=(0,G.Z)(11,()=>({using_pwa:(0,W.So)(window),completed_mini_renux:"true"===(0,et.qn)("completedMiniRenux")}))(function(e){let{experience:t}=e,n=t?.experience_id,i=10105===n,a=[500787,500894].includes(n),s=i||a,[o,l]=(0,r.useState)(null);return null===o&&l(i),i&&!1===o&&((0,ei.nP)("home_product.homefeed.incorrect_in_nux_state_for_first_load",{sampleRate:.1,tags:{appType:"web"}}),l(!0)),s?(0,u.jsx)(el,{...e}):(0,u.jsx)(ee.Z,{measureGridVisuallyComplete:!0,surface:"homefeed",children:(0,u.jsx)(el,{...e})})})}}]);
//# sourceMappingURL=https://sm.pinimg.com/webapp/61527-218a50ab5361cf5e.mjs.map