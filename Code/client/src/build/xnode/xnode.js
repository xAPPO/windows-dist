//>>built
require({cache:{"xnode/main":function(){define(["dojo/_base/kernel","xnode/manager/NodeServiceManager","xnode/manager/NodeServiceManagerUI","xnode/views/NodeServiceView","xnode/component"],function(f){return f.xnode})},"xnode/manager/NodeServiceManager":function(){define("dcl/dcl xide/manager/ServerActionBase xide/manager/BeanManager xide/types xide/factory xide/data/Memory xide/client/WebSocket xdojo/has xide/factory/Clients dojo/Deferred xdojo/has!xnode-ui?./NodeServiceManagerUI".split(" "),function(f,
e,l,k,c,g,h,m,n,a,b){e=[e,l];b&&e.push(b);return f(e,{declaredClass:"xnode.manager.NodeServiceManager",serviceClass:"XIDE_NodeJS_Service",cookiePrefix:"nodeJSServices",singleton:!0,serviceView:null,clients:null,beanNamespace:"serviceConsoleView",consoles:{},createClient:function(a){if(a.info){!this.clients&&(this.clients={});var d=this.getViewId(a);if(this.clients[d])return this.clients[d];var b=new h({});this.clients[d]=b;b.init({options:{host:a.info.host,port:a.info.port,debug:{all:!1,protocol_connection:!0,
protocol_messages:!0,socket_server:!0,socket_client:!0,socket_messages:!0,main:!0}}});b.connect();return b}console.error("NodeJs service has no host info")},getStore:function(){return this.store},isValid:function(){return null!=this.store},initStore:function(a){return this.store=new g({data:{identifier:"name",label:"Name",items:a},idProperty:"name"})},init:function(){var d=new a,b=this;if(this.serviceObject&&this.serviceObject.__init)this.serviceObject.__init.then(function(){b.ls().then(function(){d.resolve()})});
else if(this.services)return this.ls();return d},getDefaults:function(a){return this.callMethodEx(null,"getDefaults",null,a,!0)},checkServer:function(a,b){return this.callMethodEx(null,"checkServer",[a],b,!0)},runServer:function(a,b){return this.callMethodEx(null,"runDebugServer",[a],b,!0)},runDebug:function(a,b){return this.callMethodEx(null,"run",[a],b,!0)},stopServer:function(a,b){return this.callMethodEx(null,"stop",[a],b,!0)},startServer:function(a,b){return this.callMethodEx(null,"start",[a],
b,!0)},ls:function(b,c,n){function d(a){e.rawData=a;e.initStore(a);!1!==n&&e.publish(k.EVENTS.ON_NODE_SERVICE_STORE_READY,{store:e.store});b&&b(a)}var e=this;c=null;if(this.services)return c=new a,d(this.services),c.resolve(),c;c=this.runDeferred(null,"ls");try{c.then(function(a){d(a)})}catch(p){logError(p,"error loading store")}return c}})})},"xnode/manager/NodeServiceManagerUI":function(){define("dcl/dcl xide/encoding/MD5 xide/types xide/utils dojo/cookie dojo/json xide/lodash xdojo/has!xnode-ui?xide/views/ConsoleView xdojo/has!xnode-ui?xnode/views/NodeServiceView".split(" "),
function(f,e,l,k,c,g,h,m,n){return f(null,{declaredClass:"xnode.manager.NodeServiceManagerUI",getViewId:function(a){return this.beanNamespace+e(JSON.stringify({info:a.info}),1)},onConsoleEnter:function(a,b){if(0!=b.length){var d=a.view.client;h.isString(b)&&d.emit(null,b)}},createConsole:function(a,b,d){var c=this.getViewId(a);a=k.addWidget(m,{delegate:this,title:a.name,closable:!0,style:"padding:0px;margin:0px;height:inherit",className:"runView",client:d,item:a},this,b,!0);this.consoles[c]=a;return d.delegate=
a},openConsole:function(a){this.getView(a);this.createConsole(a,this.getViewTarget(),this.createClient(a))},onReload:function(){this.ls(function(){this.serviceView.refresh(this.store)}.bind(this))},loadPreferences:function(){var a=c(this.cookiePrefix+"_debug_settings");return a=a?g.parse(a):{}},savePreferences:function(a){c(this.cookiePrefix+"_debug_settings",g.stringify(a))},getViewTarget:function(){return this.ctx.getApplication().mainView.getNewAlternateTarget()},createServiceView:function(a,b){var d=
b||this.getViewTarget();this.serviceView=k.addWidget(n,{delegate:this,store:a,title:"Services",closable:!0,style:"padding:0px"},this,d,!0)},openServiceView:function(){if(this.isValid())this.createServiceView(this.store);else{var a=this;this.ls(function(){a.createServiceView(a.store)})}},onStart:function(a,b,d){a=[];for(d=0;d<b.length;d++)a.push(b[d].name);this.startServer(a,function(){this.onReload()}.bind(this))},onStop:function(a,b,d){a=[];for(d=0;d<b.length;d++)a.push(b[d].name);this.stopServer(a,
function(){this.onReload()}.bind(this))},openServices:function(){this.openServiceView()},getActions:function(){return[]},init:function(){this.ctx.addActions(this.getActions())}})})},"xnode/views/NodeServiceView":function(){define("dcl/dcl dojo/_base/declare dgrid/OnDemandGrid dgrid/Selection xide/types xide/utils xaction/Action xide/layout/Container".split(" "),function(f,e,l,k,c,g,h,m){return f(m,{declaredClass:"xide.views.NodeServiceView",delegate:null,store:null,cssClass:"layoutContainer normalizedGridView",
createWidgets:function(c){c=new (e([l,k,"Keyboard"]))({collection:c,columns:{Name:{field:"name",label:"Name",sortable:!0},Status:{field:"status",label:"Status",sortable:!0,formatter:function(a){var b='\x3cdiv style\x3d"color:${color}"\x3e'+g.capitalize(a)+"\x3c/div\x3e";return g.substituteString(b,{color:"offline"==a?"red":"green"})}},Clients:{field:"clients",label:"Clients",sortable:!0}}},this.containerNode);c.refresh();this.grid=c;this.onGridCreated(c)},startup:function(){this.inherited(arguments);
this.store&&this.createWidgets(this.store)},hasItemActions:function(){return null!=this.getCurrentSelection(!0)},getItem:function(){return this.getCurrentSelection(!0)},getItemActions:function(){var e=this.getItem()[0],a=[],b=this.delegate,d=e.status===c.SERVICE_STATUS.ONLINE,f=e.status==c.SERVICE_STATUS.OFFLINE?"start":"stop",g=e.status==c.SERVICE_STATUS.OFFLINE?"Start":"Stop",f=h.createDefault(g,e.status==c.SERVICE_STATUS.OFFLINE?"el-icon-play":"el-icon-stop","Edit/"+g,"xnode",null,{handler:!1!==
e.can[f]?"start"==f?function(a,c,d){b.onStart(a,[e],d)}:function(a,c,d){b.onStop(a,[e],d)}:null}).setVisibility(c.ACTION_VISIBILITY.ACTION_TOOLBAR,{label:""}).setVisibility(c.ACTION_VISIBILITY.MAIN_MENU,{}).setVisibility(c.ACTION_VISIBILITY.CONTEXT_MENU,{});a.push(f);f=h.createDefault("Reload","fa-refresh","Edit/Reload","xnode",null,{handler:function(){b.onReload()}}).setVisibility(c.ACTION_VISIBILITY.ACTION_TOOLBAR,{label:""}).setVisibility(c.ACTION_VISIBILITY.MAIN_MENU,{}).setVisibility(c.ACTION_VISIBILITY.CONTEXT_MENU,
{});a.push(f);d=h.createDefault("Console","el-icon-indent-left","View/Console","xnode",null,{handler:function(){b.openConsole(e)},widgetArgs:{disabled:!d}}).setVisibility(c.ACTION_VISIBILITY.ACTION_TOOLBAR,{label:""}).setVisibility(c.ACTION_VISIBILITY.MAIN_MENU,{}).setVisibility(c.ACTION_VISIBILITY.CONTEXT_MENU,{});a.push(d);return 0==a.length?null:a}})})},"xnode/component":function(){define(["dcl/dcl","xide/model/Component"],function(f,e){return f(e,{beanType:"NODE_SERVICE",hasEditors:function(){return["xnode"]},
getDependencies:function(){return["xide/xide","xnode/types","xnode/manager/NodeServiceManager","xnode/views/NodeServiceView"]},getLabel:function(){return"xnode"},getBeanType:function(){return this.beanType}})})},"xnode/types":function(){define([],function(){return null})}}});
//# sourceMappingURL=xnode.js.map