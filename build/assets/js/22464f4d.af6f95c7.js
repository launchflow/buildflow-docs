"use strict";(self.webpackChunkbuildflow_docs=self.webpackChunkbuildflow_docs||[]).push([[173],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>h});var o=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=o.createContext({}),u=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=u(e.components);return o.createElement(s.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),p=u(n),m=a,h=p["".concat(s,".").concat(m)]||p[m]||d[m]||r;return n?o.createElement(h,i(i({ref:t},c),{},{components:n})):o.createElement(h,i({ref:t},c))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[p]="string"==typeof e?e:a,i[1]=l;for(var u=2;u<r;u++)i[u]=n[u];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4823:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>r,metadata:()=>l,toc:()=>u});var o=n(7462),a=(n(7294),n(3905));const r={sidebar_position:5},i="Dynamic Autoscaling",l={unversionedId:"autoscaling",id:"autoscaling",title:"Dynamic Autoscaling",description:"Buildflow provides horizontal autoscaling out of the box. This allows your Processors to scale up to fit any workload, traffic spikes, or network disruptions without any intervention from an engineer. It will also scale down your application during low traffic periods to help keep your system cost effective.",source:"@site/docs/autoscaling.md",sourceDirName:".",slug:"/autoscaling",permalink:"/docs/autoscaling",draft:!1,editUrl:"https://github.com/launchflow/buildflow-docs/tree/main/docs/autoscaling.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5}},s={},u=[{value:"Batch Runtimes",id:"batch-runtimes",level:2},{value:"Streaming",id:"streaming",level:2},{value:"When do we scale up?",id:"when-do-we-scale-up",level:3},{value:"When do we scale down?",id:"when-do-we-scale-down",level:3},{value:"Configuring number of Replicas",id:"configuring-number-of-replicas",level:3}],c={toc:u},p="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(p,(0,o.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"dynamic-autoscaling"},"Dynamic Autoscaling"),(0,a.kt)("p",null,"Buildflow provides horizontal autoscaling out of the box. This allows your Processors to scale up to fit any workload, traffic spikes, or network disruptions without any intervention from an engineer. It will also scale down your application during low traffic periods to help keep your system cost effective."),(0,a.kt)("p",null,"Our autoscaling is powered by ",(0,a.kt)("a",{parentName:"p",href:"https://www.ray.io"},"Ray")," and ",(0,a.kt)("a",{parentName:"p",href:"https://docs.ray.io/en/latest/cluster/"},"Ray clusters"),". When running on a single machine (such as your local computer) the autoscaler will only scale up to use the available CPUs on your machine. When running in a cloud environement, the autoscaler will spin up/down VMs, ",(0,a.kt)("strong",{parentName:"p"},"no Kubernetes required"),"!"),(0,a.kt)("h2",{id:"batch-runtimes"},"Batch Runtimes"),(0,a.kt)("p",null,"For Batch runtimes, the autoscaler will scale based on the amount of data that needs to be read in. That means there is nothing to configure and we will give you the max throughput possible based on your machine / cluster configuration."),(0,a.kt)("h2",{id:"streaming"},"Streaming"),(0,a.kt)("p",null,"For Streaming runtimes, we have the concept of a ",(0,a.kt)("inlineCode",{parentName:"p"},"replica"),", which represents one process that is pulling data from your streaming source. The autoscaler will scale your Processor based on the size of your source's backlog, the throughput of your application, and the current utilization of your cluster."),(0,a.kt)("h3",{id:"when-do-we-scale-up"},"When do we scale up?"),(0,a.kt)("p",null,"To determine if it needs to scale up, the autoscaler will look at the total backlog that exists on your streaming source and how fast we are processing data. From this information it can determine how many replicas are needed to burn through the backlog in 60 seconds, and will attempt to scale up to that number of replicas."),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},"The autoscaler will never request more replicas than what your cluster can support. For example, if you are running on a single 4 core machine, and each replica of your Processor is configured to use 0.5 CPU, the autoscaler will scale up to 8 replicas.")),(0,a.kt)("h3",{id:"when-do-we-scale-down"},"When do we scale down?"),(0,a.kt)("p",null,"To determine if it needs to scale down, the autoscaler will first look to make sure there is no backlog that needs to be processed, and ensure the Processor's current throughput is keeping up with the input. It then looks at the utilization of each replica and will start (gracefully) shutting them down if it determines they aren't being utilized enough."),(0,a.kt)("h3",{id:"configuring-number-of-replicas"},"Configuring number of Replicas"),(0,a.kt)("p",null,"BuildFlow offers some more fine grained settings to control the number of replicas. These can be set by passing the ",(0,a.kt)("inlineCode",{parentName:"p"},"StreamingOptions")," object to ",(0,a.kt)("inlineCode",{parentName:"p"},"app.run()")," like so:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},"app.run(streaming_options=buildflow.StreamingOptions(\n    min_replicas=10,\n    max_replicas=20,\n    num_replicas=12,\n    autoscaling=True,\n))\n")),(0,a.kt)("p",null,"With these options you can specify four things:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"min_replicas"),": This is the minimum number of replicas that should be kept alive at anytime. We will never attempt to scale below this. Defaults to 1. This can be useful if you need to keep a certain number of replicas up to ensure your desired latency."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"max_replicas"),": This is the maximum number of replicas to scale up to. We will never attempt to scale beyond this. Defaults to 1000. This can be useful if you are running an application locally and don't want it to use your entire CPU, or you want to cost control your application."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"num_replicas"),": This is the number of replicas to start your application with. If unset we will default to ",(0,a.kt)("inlineCode",{parentName:"li"},"min_replicas"),". This can be useful if you know you'll need a certain amount of replicas to start and don't want to wait for the autoscaler to scale up."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"autoscaling"),": Boolean value to determine if we should autoscale or not. If false we will start your application with ",(0,a.kt)("inlineCode",{parentName:"li"},"num_replicas")," and not attempt to up or down scale the replicas.")),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"These configurations are only needed if you want more fine grained control over the number of replicas. If you don't care about this you can simply call ",(0,a.kt)("inlineCode",{parentName:"p"},"app.run()")," and let the autoscaler do its magic.")))}d.isMDXComponent=!0}}]);