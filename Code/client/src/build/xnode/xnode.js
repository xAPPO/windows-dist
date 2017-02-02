//>>built
require({cache:{"xnode/main":function(){define(["dojo/_base/kernel","xnode/manager/NodeServiceManager","xnode/manager/NodeServiceManagerUI","xnode/views/NodeServiceView","xnode/component"],function(h){return h.xnode})},"xnode/manager/NodeServiceManager":function(){define("dcl/dcl xide/manager/ServerActionBase xide/manager/BeanManager xide/types xide/factory xide/data/Memory xide/client/WebSocket xdojo/has xide/factory/Clients dojo/Deferred xdojo/has!xnode-ui?./NodeServiceManagerUI".split(" "),function(h,
g,n,m,f,k,l,p,e,a,c){g=[g,n];c&&g.push(c);return h(g,{declaredClass:"xnode.manager.NodeServiceManager",serviceClass:"XIDE_NodeJS_Service",cookiePrefix:"nodeJSServices",singleton:!0,serviceView:null,clients:null,beanNamespace:"serviceConsoleView",consoles:{},createClient:function(a){if(a.info){!this.clients&&(this.clients={});var b=this.getViewId(a);if(this.clients[b])return this.clients[b];var c=new l({});this.clients[b]=c;c.init({options:{host:a.info.host,port:a.info.port,debug:{all:!1,protocol_connection:!0,
protocol_messages:!0,socket_server:!0,socket_client:!0,socket_messages:!0,main:!0}}});c.connect();return c}console.error("NodeJs service has no host info")},getStore:function(){return this.store},isValid:function(){return null!=this.store},initStore:function(a){return this.store=new k({data:{identifier:"name",label:"Name",items:a},idProperty:"name"})},init:function(){var d=new a,b=this;if(this.serviceObject&&this.serviceObject.__init)this.serviceObject.__init.then(function(){b.ls().then(function(){d.resolve()})});
else if(this.services)return this.ls();return d},getDefaults:function(a){return this.callMethodEx(null,"getDefaults",null,a,!0)},checkServer:function(a,b){return this.callMethodEx(null,"checkServer",[a],b,!0)},runServer:function(a,b){return this.callMethodEx(null,"runDebugServer",[a],b,!0)},runDebug:function(a,b){return this.callMethodEx(null,"run",[a],b,!0)},stopServer:function(a,b){return this.callMethodEx(null,"stop",[a],b,!0)},startServer:function(a,b){return this.callMethodEx(null,"start",[a],
b,!0)},ls:function(c,b,f){function e(a){g.rawData=a;g.initStore(a);!1!==f&&g.publish(m.EVENTS.ON_NODE_SERVICE_STORE_READY,{store:g.store});c&&c(a)}var g=this;b=null;if(this.services)return b=new a,e(this.services),b.resolve(),b;b=this.runDeferred(null,"ls");try{b.then(function(a){e(a)})}catch(h){logError(h,"error loading store")}return b}})})},"xnode/manager/NodeServiceManagerUI":function(){define("dcl/dcl xide/encoding/MD5 xide/types xide/utils dojo/cookie dojo/json xide/lodash xdojo/has!xnode-ui?xide/views/ConsoleView xdojo/has!xnode-ui?xnode/views/NodeServiceView".split(" "),
function(h,g,n,m,f,k,l,p,e){return h(null,{declaredClass:"xnode.manager.NodeServiceManagerUI",getViewId:function(a){return this.beanNamespace+g(JSON.stringify({info:a.info}),1)},onConsoleEnter:function(a,c){if(0!=c.length){var d=a.view.client;l.isString(c)&&d.emit(null,c)}},createConsole:function(a,c,d){var b=this.getViewId(a);a=m.addWidget(p,{delegate:this,title:a.name,closable:!0,style:"padding:0px;margin:0px;height:inherit",className:"runView",client:d,item:a},this,c,!0);this.consoles[b]=a;return d.delegate=
a},openConsole:function(a){this.getView(a);this.createConsole(a,this.getViewTarget(),this.createClient(a))},onReload:function(){this.ls(function(){this.serviceView.refresh(this.store)}.bind(this))},loadPreferences:function(){var a=f(this.cookiePrefix+"_debug_settings");return a=a?k.parse(a):{}},savePreferences:function(a){f(this.cookiePrefix+"_debug_settings",k.stringify(a))},getViewTarget:function(){return this.ctx.getApplication().mainView.getNewAlternateTarget()},createServiceView:function(a,c){var d=
c||this.getViewTarget();this.serviceView=m.addWidget(e,{delegate:this,store:a,title:"Services",closable:!0,style:"padding:0px"},this,d,!0)},openServiceView:function(){if(this.isValid())this.createServiceView(this.store);else{var a=this;this.ls(function(){a.createServiceView(a.store)})}},onStart:function(a,c,d){a=[];for(d=0;d<c.length;d++)a.push(c[d].name);this.startServer(a,function(){this.onReload()}.bind(this))},onStop:function(a,c,d){a=[];for(d=0;d<c.length;d++)a.push(c[d].name);this.stopServer(a,
function(){this.onReload()}.bind(this))},openServices:function(){this.openServiceView()},getActions:function(){return[]},init:function(){this.ctx.addActions(this.getActions())}})})},"xnode/views/NodeServiceView":function(){define("dcl/dcl dojo/_base/declare dgrid/OnDemandGrid dgrid/Selection xide/types xide/utils xaction/Action xide/layout/Container".split(" "),function(h,g,n,m,f,k,l,p){return h(p,{declaredClass:"xide.views.NodeServiceView",delegate:null,store:null,cssClass:"layoutContainer normalizedGridView",
createWidgets:function(e){e=new (g([n,m,"Keyboard"]))({collection:e,columns:{Name:{field:"name",label:"Name",sortable:!0},Status:{field:"status",label:"Status",sortable:!0,formatter:function(a){var c='\x3cdiv style\x3d"color:${color}"\x3e'+k.capitalize(a)+"\x3c/div\x3e";return k.substituteString(c,{color:"offline"==a?"red":"green"})}},Clients:{field:"clients",label:"Clients",sortable:!0}}},this.containerNode);e.refresh();this.grid=e;this.onGridCreated(e)},startup:function(){this.inherited(arguments);
this.store&&this.createWidgets(this.store)},hasItemActions:function(){return null!=this.getCurrentSelection(!0)},getItem:function(){return this.getCurrentSelection(!0)},getItemActions:function(){var e=this.getItem()[0],a=[],c=this.delegate,d=e.status===f.SERVICE_STATUS.ONLINE,b=e.status==f.SERVICE_STATUS.OFFLINE?"start":"stop",g=e.status==f.SERVICE_STATUS.OFFLINE?"Start":"Stop",b=l.createDefault(g,e.status==f.SERVICE_STATUS.OFFLINE?"el-icon-play":"el-icon-stop","Edit/"+g,"xnode",null,{handler:!1!==
e.can[b]?"start"==b?function(a,b,d){c.onStart(a,[e],d)}:function(a,b,d){c.onStop(a,[e],d)}:null}).setVisibility(f.ACTION_VISIBILITY.ACTION_TOOLBAR,{label:""}).setVisibility(f.ACTION_VISIBILITY.MAIN_MENU,{}).setVisibility(f.ACTION_VISIBILITY.CONTEXT_MENU,{});a.push(b);b=l.createDefault("Reload","fa-refresh","Edit/Reload","xnode",null,{handler:function(){c.onReload()}}).setVisibility(f.ACTION_VISIBILITY.ACTION_TOOLBAR,{label:""}).setVisibility(f.ACTION_VISIBILITY.MAIN_MENU,{}).setVisibility(f.ACTION_VISIBILITY.CONTEXT_MENU,
{});a.push(b);d=l.createDefault("Console","el-icon-indent-left","View/Console","xnode",null,{handler:function(){c.openConsole(e)},widgetArgs:{disabled:!d}}).setVisibility(f.ACTION_VISIBILITY.ACTION_TOOLBAR,{label:""}).setVisibility(f.ACTION_VISIBILITY.MAIN_MENU,{}).setVisibility(f.ACTION_VISIBILITY.CONTEXT_MENU,{});a.push(d);return 0==a.length?null:a}})})},"xnode/component":function(){define(["dcl/dcl","xide/model/Component"],function(h,g){return h(g,{beanType:"NODE_SERVICE",hasEditors:function(){return["xnode"]},
getDependencies:function(){return["xide/xide","xnode/types","xnode/manager/NodeServiceManager","xnode/views/NodeServiceView"]},getLabel:function(){return"xnode"},getBeanType:function(){return this.beanType}})})},"xnode/types":function(){define([],function(){return null})}}});
//# sourceMappingURL=xnode.js.map