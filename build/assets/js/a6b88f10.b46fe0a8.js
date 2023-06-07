"use strict";(self.webpackChunkbuildflow_docs=self.webpackChunkbuildflow_docs||[]).push([[857],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>y});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var i=a.createContext({}),p=function(e){var t=a.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},u=function(e){var t=p(e.components);return a.createElement(i.Provider,{value:t},e.children)},l="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},f=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),l=p(r),f=n,y=l["".concat(i,".").concat(f)]||l[f]||d[f]||o;return r?a.createElement(y,s(s({ref:t},u),{},{components:r})):a.createElement(y,s({ref:t},u))}));function y(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,s=new Array(o);s[0]=f;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c[l]="string"==typeof e?e:n,s[1]=c;for(var p=2;p<o;p++)s[p]=r[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,r)}f.displayName="MDXCreateElement"},8417:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>s,default:()=>d,frontMatter:()=>o,metadata:()=>c,toc:()=>p});var a=r(7462),n=(r(7294),r(3905));const o={sidebar_position:2},s="Batch",c={unversionedId:"processors/batch",id:"processors/batch",title:"Batch",description:"A Batch Processor is any processor the consumes a bounded set of data, such as a BigQuery table or SQL query.",source:"@site/docs/processors/batch.md",sourceDirName:"processors",slug:"/processors/batch",permalink:"/docs/processors/batch",draft:!1,editUrl:"https://github.com/launchflow/buildflow-docs/tree/main/docs/processors/batch.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2}},i={},p=[],u={toc:p},l="wrapper";function d(e){let{components:t,...r}=e;return(0,n.kt)(l,(0,a.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"batch"},"Batch"),(0,n.kt)("p",null,"A Batch Processor is any processor the consumes a bounded set of data, such as a BigQuery table or SQL query."),(0,n.kt)("p",null,"Example:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-python"},"@app.processor(\n    source=BigQuerySource(table_id='...'),\n)\ndef process(dataset: ray.data.Dataset):\n    # TODO: process dataset\n    return dataset\n\noutput = app.run()\n")),(0,n.kt)("p",null,"Batch mode is built on top of the ",(0,n.kt)("a",{parentName:"p",href:"https://docs.ray.io/en/latest/data/api/api.html"},"Ray Dataset API"),", and your processor will be given a Ray Dataset that contains the data from your source. You can return a Ray Dataset, python dictionaries, or python dataclasses. If you return a python dataclass you can take advantage of our automatic ",(0,n.kt)("a",{parentName:"p",href:"/docs/schema-validation"},"schema validation"),"."))}d.isMDXComponent=!0}}]);