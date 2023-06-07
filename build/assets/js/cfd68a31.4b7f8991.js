"use strict";(self.webpackChunkbuildflow_docs=self.webpackChunkbuildflow_docs||[]).push([[75],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>h});var l=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,l)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,l,a=function(e,t){if(null==e)return{};var n,l,a={},o=Object.keys(e);for(l=0;l<o.length;l++)n=o[l],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(l=0;l<o.length;l++)n=o[l],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=l.createContext({}),p=function(e){var t=l.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},s=function(e){var t=p(e.components);return l.createElement(u.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return l.createElement(l.Fragment,{},t)}},b=l.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,u=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),c=p(n),b=a,h=c["".concat(u,".").concat(b)]||c[b]||d[b]||o;return n?l.createElement(h,r(r({ref:t},s),{},{components:n})):l.createElement(h,r({ref:t},s))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,r=new Array(o);r[0]=b;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i[c]="string"==typeof e?e:a,r[1]=i;for(var p=2;p<o;p++)r[p]=n[p];return l.createElement.apply(null,r)}return l.createElement.apply(null,n)}b.displayName="MDXCreateElement"},5857:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>r,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var l=n(7462),a=(n(7294),n(3905));const o={},r="Local GCP Pub/Sub to Parquet",i={unversionedId:"walkthroughs/local_pubsub_streaming",id:"walkthroughs/local_pubsub_streaming",title:"Local GCP Pub/Sub to Parquet",description:"In this walkthrough we will run a BuildFlow application that reads from a local Pub/Sub topic and writes the data to a local parquet file. You can find all the code for this walk through here.",source:"@site/docs/walkthroughs/local_pubsub_streaming.md",sourceDirName:"walkthroughs",slug:"/walkthroughs/local_pubsub_streaming",permalink:"/docs/walkthroughs/local_pubsub_streaming",draft:!1,editUrl:"https://github.com/launchflow/buildflow-docs/tree/main/docs/walkthroughs/local_pubsub_streaming.md",tags:[],version:"current",frontMatter:{},sidebar:"mainSidebar",previous:{title:"GCP Pub/Sub Streaming",permalink:"/docs/walkthroughs/pubsub_streaming"},next:{title:"GCS CSV to GCP BigQuery Streaming",permalink:"/docs/walkthroughs/csv_bigquery_streaming"}},u={},p=[{value:"Getting Started",id:"getting-started",level:2},{value:"Setting up your environment",id:"setting-up-your-environment",level:3},{value:"Run Pipeline",id:"run-pipeline",level:2},{value:"Run Pub/Sub Emulator",id:"run-pubsub-emulator",level:3},{value:"Execute the Pipeline",id:"execute-the-pipeline",level:3},{value:"Publish Data",id:"publish-data",level:3},{value:"Reading Data",id:"reading-data",level:3},{value:"Pipeline Code",id:"pipeline-code",level:3},{value:"Cleaning Up",id:"cleaning-up",level:2}],s={toc:p},c="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(c,(0,l.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"local-gcp-pubsub-to-parquet"},"Local GCP Pub/Sub to Parquet"),(0,a.kt)("p",null,"In this walkthrough we will run a BuildFlow application that reads from a local Pub/Sub topic and writes the data to a local parquet file. You can find all the code for this walk through ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/launchflow/buildflow/blob/main/buildflow/samples/local_pubsub_walkthrough.py"},"here"),"."),(0,a.kt)("h2",{id:"getting-started"},"Getting Started"),(0,a.kt)("p",null,"In order to follow this guide you must have the ",(0,a.kt)("inlineCode",{parentName:"p"},"gcloud")," CLI installed. Instructions for that can be found ",(0,a.kt)("a",{parentName:"p",href:"https://cloud.google.com/sdk/docs/install"},"here"),". You must also have the pubsub emulator component installed. You can install that with:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"gcloud components install beta pubsub-emulator\n")),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},"Even though we are using the ",(0,a.kt)("inlineCode",{parentName:"p"},"gcloud")," CLI everything will be run locally so there is no need to setup any GCP projects or resources for this walk-through.")),(0,a.kt)("h3",{id:"setting-up-your-environment"},"Setting up your environment"),(0,a.kt)("p",null,"Install BuildFlow"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"pip install buildflow\n")),(0,a.kt)("h2",{id:"run-pipeline"},"Run Pipeline"),(0,a.kt)("p",null,"When running the application the following resources will be created ",(0,a.kt)("strong",{parentName:"p"},"locally"),"."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Pub/Sub topic to publish data to"),(0,a.kt)("li",{parentName:"ul"},"Pub/Sub subscriber that subscribers to the taxi data Pub/Sub topic")),(0,a.kt)("p",null,"The application does the following:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Listens to the created pub/sub topic"),(0,a.kt)("li",{parentName:"ol"},"Dumps the output to a local parquet file.")),(0,a.kt)("h3",{id:"run-pubsub-emulator"},"Run Pub/Sub Emulator"),(0,a.kt)("p",null,"First we need to spin up a local Pub/Sub emulator with:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"gcloud beta emulators pubsub start --project=local-buildflow-example --host-port=localhost:8085\n")),(0,a.kt)("p",null,"This will run a local Pub/Sub emulator that your application will talk to instead\nof remote Google Cloud Pub/Sub. You will need to keep this running while you\nhave you application running."),(0,a.kt)("h3",{id:"execute-the-pipeline"},"Execute the Pipeline"),(0,a.kt)("p",null,"Now run the application:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"python -m buildflow.samples.local_pubsub_walkthrough\n")),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"By default we will write the data to: ",(0,a.kt)("inlineCode",{parentName:"p"},"/tmp/buildflow/local_pubsub.parquet")),(0,a.kt)("p",{parentName:"admonition"},"If you would like to change this you can add the ",(0,a.kt)("inlineCode",{parentName:"p"},"--file_path=PATH_TO_FILE")," to the below command.")),(0,a.kt)("h3",{id:"publish-data"},"Publish Data"),(0,a.kt)("p",null,"Once the application is running you can publish messages to it with:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"python -m buildflow.samples.local_pubsub_publish --value=2\n")),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"You can change ",(0,a.kt)("inlineCode",{parentName:"p"},"--value")," to any integer.")),(0,a.kt)("h3",{id:"reading-data"},"Reading Data"),(0,a.kt)("p",null,"After publishing any data you can read in the parquet file how ever you like."),(0,a.kt)("p",null,"In python:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},"import pyarrow.parquet as pq\n\ntable = pq.read_table('/tmp/buildflow/local_pubsub.parquet')\nprint(table)\n")),(0,a.kt)("p",null,"Or you can use DuckDB to execute SQL queries on your parquet files:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},"import duckdb\n\ncursor = duckdb.connect()\ndata = cursor.execute('SELECT * FROM \"/tmp/buildflow/local_pubsub.parquet\"').fetchall()\nprint(data)\n")),(0,a.kt)("h3",{id:"pipeline-code"},"Pipeline Code"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},"import argparse\nimport os\nimport sys\nfrom typing import Any, Dict\n\nimport buildflow\nfrom buildflow import Flow\n\n# Parser to allow run time configuration of arguments\nparser = argparse.ArgumentParser()\nparser.add_argument('--file_path',\n                    type=str,\n                    default='/tmp/buildflow/local_pubsub.parquet')\nargs, _ = parser.parse_known_args(sys.argv)\n\nif 'PUBSUB_EMULATOR_HOST' not in os.environ:\n    # If this variable wasn't set. Set it to the same value we set in the\n    # walkthrough docs.\n    os.environ['PUBSUB_EMULATOR_HOST'] = 'localhost:8085'\n\n# Set up a subscriber for the source.\n# If this subscriber does not exist yet BuildFlow will create it.\ninput_sub = buildflow.PubSubSource(\n    subscription=f'projects/local-buildflow-example/subscriptions/my-sub',\n    topic=f'projects/local-buildflow-example/topics/my-topic')\n# Set up a FileSink for writing to a file locally.\nsink = buildflow.FileSink(file_path=args.file_path,\n                          file_format=buildflow.FileFormat.PARQUET)\n\nflow = Flow()\n\n\n# Define our processor.\n@app.processor(source=input_sub, sink=sink)\ndef process(element: Dict[str, Any]):\n    return element\n\n\n# Run our flow.\nflow.run()()\n")),(0,a.kt)("h2",{id:"cleaning-up"},"Cleaning Up"),(0,a.kt)("p",null,"Since everything is run locally there is nothing to cleanup beyond stopping the\nrunning processes and removing the local parquet file."))}d.isMDXComponent=!0}}]);