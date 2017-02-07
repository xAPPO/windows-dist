//>>built
require({cache:{"xaction/main":function(){define("xaction/types xaction/Action xaction/ActionContext xaction/ActionModel xaction/ActionProvider xaction/ActionStore xaction/DefaultActions xaction/Toolbar".split(" "),function(){})},"xaction/types":function(){define(["xide/types","dojo/_base/lang"],function(k,h){h.mixin(k.EVENTS,{ON_ACTION_CHANGE_CONTEXT:"onChangeActionContext",ON_ACTION_CONTEXT_CHANGED:"onActionContextChanged",REGISTER_ACTION:"registerAction",SET_ITEM_ACTIONS:"onSetItemsActions",ON_CLIPBOARD_COPY:"onClipboardCopy",
ON_CLIPBOARD_PASTE:"onClipboardPaste",ON_CLIPBOARD_CUT:"onClipboardCut",ON_RENDER_ACTIONS:"onRenderActions",ON_DID_ACTION:"onDidAction",ON_AFTER_ACTION:"onAfterAction"});k.ACTION={LAYOUT:"View/Layout",COLUMNS:"View/Columns",SELECTION:"File/Select",CLIPBOARD:"Edit/Clipboard",UNDO:"Edit/Undo",REDO:"Edit/Redo",CLIPBOARD_COPY:"Edit/Clipboard/Copy",CLIPBOARD_PASTE:"Edit/Clipboard/Paste",CLIPBOARD_CUT:"Edit/Clipboard/Cut",COPY:"File/Copy",MOVE:"File/Move",RENAME:"File/Rename",DELETE:"File/Delete",OPEN:"File/Open",
EDIT:"File/Edit",SAVE:"File/Save",SEARCH:"File/Search",TOOLBAR:"View/Show/Toolbar",STATUSBAR:"View/Show/Statusbar",BREADCRUMB:"View/Show/Breadcrumb",HEADER:"View/Show/Header",DOWNLOAD:"File/Download",DOWNLOAD_TO:"File/downloadTo",INFO:"File/Info",COMPRESS:"File/Compress",RELOAD:"File/Reload",UPLOAD:"File/Upload",PREVIEW:"File/Preview",OPEN_IN:"File/Open In",INSERT_IMAGE:"insertImage",COPY_PASTE:"copypaste",DND:"dnd",OPTIONS:"options",NEW_FILE:"File/New/New File",NEW_DIRECTORY:"File/New/New Folder",
GET_CONTENT:"get",SET_CONTENT:"set",FIND:"File/Find",CUSTOM:"custom",PERMA_LINK:"permaLink",ADD_MOUNT:"ADD_MOUNT",REMOVE_MOUNT:"REMOVE_MOUNT",EDIT_MOUNT:"EDIT_MOUNT",PERSPECTIVE:"PERSPECTIVE",RUN:"File/Run",GO_UP:"Navigation/Go Up",STOP:"File/Stop",CLOSE:"View/Close",FULLSCREEN:"View/Fullscreen",OPEN_IN_TAB:"File/OpenInNewTab",SOURCE:"Navigation/Source",RIBBON:"View/Show/Ribbon",MAIN_MENU:"View/Show/MainMenu",NAVIGATION:"View/Show/Navigation",BASH_CONSOLE:"File/Console/Bash",JS_CONSOLE:"File/Console/JS",
PHP_CONSOLE:"File/Console/PHP",CONSOLE:"File/Console/PHP",SIZE_STATS:"View/Show/SizeStats",WELCOME:"Window/Welcome",CONTEXT_MENU:"File/ContextMenu"};k.ACTION_TYPE={MULTI_TOGGLE:"multiToggle",SINGLE_TOGGLE:"singleToggle"};k.ACTION_ICON={CLIPBOARD_COPY:"fa-copy",CLIPBOARD_PASTE:"fa-paste",UPLOAD:"fa-upload",RENAME:"el-icon-edit",DELETE:"text-danger fa-remove",RELOAD:"fa-refresh",EDIT:"fa-pencil",SAVE:"fa-floppy-o",SEARCH:"fa-search",NEW_DIRECTORY:"fa-magic",NEW_FILE:"fa-magic",RUN:"text-success el-icon-play",
COMPRESS:"fa-file-archive-o",EXTRACT:"fa-folder-open",DOWNLOAD:"fa-download",GO_UP:"fa-level-up",TOOLBAR:"fa-bars",STATUSBAR:"fa-terminal",PREVIEW:"fa-eye",MAXIMIZE:"fa-arrows-alt",UNDO:"fa-undo",REDO:"fa-repeat"};return k})},"xaction/Action":function(){define("dcl/dcl xide/model/Base xide/types xide/utils/ObjectUtils xide/utils xide/mixins/EventedMixin xide/cache/Circular".split(" "),function(k,h,g,m,l,n,a){l.mixin(g,{ACTION_VISIBILITY:{MAIN_MENU:"MAIN_MENU",CONTEXT_MENU:"CONTEXT_MENU",QUICK_LAUNCH:"QUICK_LAUNCH",
ACTION_TOOLBAR:"ACTION_TOOLBAR",PROPERTY_VIEW:"PROPERTY_VIEW",RIBBON:"RIBBON",widgetArgs:null,factory:function(){var a=arguments[1]||l.clone(g.ACTION_VISIBILITY),b=arguments;if(0<b[0].length&&_.isNumber(b[0][0])){var f=b[0],e=0;_.each(a,function(r,u){"function"!==typeof a[u]&&e<f.length&&(a[u+"_val"]=f[e]);e++})}if(_.isString(b[0][0])){if(!0===b[0][2])l.mixin(a[b[0][0]+"_val"],b[0][2]);else return a[b[0][0]+"_val"]=b[0][1],a;return b[1]}return a}}});g.ACTION_VISIBILITY_ALL="ACTION_VISIBILITY_ALL";
var b=k([h.dcl,n.dcl],{declaredClass:"xaction/Action",disabled:!1,destroy:function(){},enabled:!0,object:null,show:!0,group:"",types:"",command:null,icon:"fa-play",event:null,handler:null,tab:null,visibility_:null,value:null,setVisibility:function(){if(2==arguments.length&&_.isString(arguments[0])&&arguments[0]==g.ACTION_VISIBILITY_ALL){var a=arguments[1],b=g.ACTION_VISIBILITY,f=this;[b.MAIN_MENU,b.ACTION_TOOLBAR,b.CONTEXT_MENU,b.RIBBON].forEach(function(b){f.setVisibility(b,l.cloneKeys(a,!1))});
return this}b=_.isArray(arguments[0])?arguments[0]:arguments;this.visibility_=g.ACTION_VISIBILITY.factory(b,this.visibility_);return this},getVisibility:function(a){this.visibility_||this.setVisibility(g.ACTION_VISIBILITY_ALL,{});return this.visibility_?(null==this.visibility_[a+"_val"]&&(this.visibility_[a+"_val"]={vis:a}),this.visibility_[a+"_val"]):{}},shouldDestroyWidget:function(a,b,f){a=null!=this.getVisibility?this.getVisibility(a):null;var e=!0;a&&a.permanent&&(e=!(_.isFunction(a.permanent)?
a.permanent(this,b,f):a.permanent));return e}});b.create=function(a,d,f,e,r,u,w,v,J,x,p){v=null;v=new b({permanent:e,command:f,icon:d,label:a,owner:this,types:u,operation:r,group:w,handler:x,title:a});l.mixin(v,p);return v};b.createDefault=function(a,d,f,e,r,u){return b.create(a,d,f,!1,null,null,e||"nogroup",null,!1,r,u)};return b})},"xaction/ActionContext":function(){define(["dcl/dcl","xdojo/declare","xide/types","dojo/aspect","xide/views/History"],function(k,h,g,m,l){var n={currentActionEmitter:null,
_history:null,isEmpty:function(){var a=this.getCurrentEmitter();return a?0==a.getActionStore().getAll().length:!0},getCurrentEmitter:function(){return this.currentActionEmitter},_onRemoveEmitter:function(a){this._history.remove(a);var b=this._history.getNow();this.currentActionEmitter==a&&(this.currentActionEmitter=null);b&&this.setActionEmitter(b)},refreshActions:function(a){var b=this;_.each(a,function(a){b.renderAction?b.renderAction(a,null,null,null,null):console.error("renderAction not implemented for refresh actions "+
b.declaredClass)})},setActionEmitter:function(a,b,c){if(!a||!a.getActionStore||a.getActionStore())if(this.currentActionEmitter==a)a||this.setActionStore(null);else{try{var d=this.currentActionEmitter;if(d){if(d.getActionStore){var f=d.getActionStore();f&&(f._all=null);this.clearActions()}d&&d.onDeactivateActionContext&&d.onDeactivateActionContext(this,c)}}catch(e){logError(e,"setActionEmitter crash")}if(!a||a.getActionStore)if(this.currentActionEmitter=a){if(b=a.getActionStore())b.__all=null,a&&a.onUseActionStore&&
a.onUseActionStore(b,a),this.setActionStore(b,a),b.addRenderer(this),a&&a.onActivateActionContext&&a.onActivateActionContext(this,c),this._emit("setActionEmitter",{emitter:a}),!this._history&&(this._history=new l),this._history.setNow(a)}else this.setActionStore(null)}},_registerActionEmitter:function(a){if(!this[this.id+"_emitter_"+a.id]&&(this[this.id+"_emitter_"+a.id]=!0,!a||a.getActionStore)){if(!a||!a.on)return!1;var b=this;a._on("selectionChanged",function(c){c[b.id+"_aceDid"]=!0;b.setActionEmitter(a,
"clear"==c.why?"selectionCleared":"selectionChanged",c)});a.on("click",function(c){if(!c.__did){var d=c.__did=!0;a.handleActionClick&&(d=a.handleActionClick(c));d&&b.setActionEmitter(a,"click",c)}});!this._history&&(this._history=new l);a._on(g.EVENTS.ON_VIEW_SHOW,function(a){b._history.indexOf(a)&&(a.view&&(a=a.view),b.setActionEmitter(a,g.EVENTS.ON_VIEW_SHOW,a))})}},destroy:function(){this.inherited&&this.inherited(arguments);this._history&&this._history.destroy()&&delete this._history},addActionEmitter:function(a){if(a){var b=
this;!this._history&&(this._history=new l);a.getActionStore&&(this._history.push(a),b._registerActionEmitter(a),m.after(a,"destroy",function(){b._onRemoveEmitter(a)},!0),a._on("destroy",function(){try{b._onRemoveEmitter(a)}catch(c){logError(c,"addActionEmitter")}},!0))}}};h=h("xaction/ActionContext",null,n);h.dcl=k(null,n);return h})},"xaction/ActionModel":function(){define("dcl/dcl xaction/Action xide/data/Model xide/data/Source xide/model/Path xide/utils".split(" "),function(k,h,g,m,l,n){return k([h,
g,m.dcl],{filterGroup:"item|view",keyboardMappings:null,bindWidgetProperties:["value","icon","disabled"],items:null,onRemove:function(){_.invoke(this.getReferences(),"destroy");this.keyboardMappings&&_.invoke(this.keyboardMappings,"destroy");this.destroy()},shouldShow:function(){return!0},shouldDisable:function(){return!1},updateReference:function(a,b,c){b.set("disabled",this.shouldDisable(a,b,c));null!==this.icon&&null!==b.icon&&this.icon!==b.icon&&b.set("icon",this.icon);null!==this.value&&null!==
b.value&&this.value!==b.value&&b.set("value",this.value)},refreshReferences:function(a,b){_.each(this.getReferences(),function(c){c.set(a,b)},this)},refresh:function(a){this._emit("refresh",{action:this,selection:a});_.each(this.getReferences(),function(b){this.updateReference(a,b,b.visibility)},this)},setProperty:function(a,b,c){return this.set(a,b)},complete:function(){this.items=this.getChildren()},getParent:function(){var a=this.command.split("/");if(1<a.length)return this._store.getSync(a.slice(0,
a.length-1).join("/"))},getParentCommand:function(){var a=this.command.split("/");if(1<a.length)return a.slice(0,a.length-1).join("/")},getSegments:function(a){return a.split("/")},getRoot:function(){return this.command.split("/")[0]},getItemsAtBranch:function(a,b){return(new l(b)).getChildren(n.pluck(a,"command"),!1)},getChildren:function(){var a=this;return function(b){var c=[];_.each(b,function(b){c.push(a._store.getSync(b))});return c}(this.getItemsAtBranch(this._store.getAll(),this.command))},
_onWidgetCreated:function(a){a.widget.addSource&&this.addReference(a.widget,{properties:{value:!0}},!0)}})})},"xaction/ActionProvider":function(){define("xdojo/declare dcl/dcl xide/types xide/utils xide/model/Path xaction/ActionStore xaction/Action xide/Keyboard xide/mixins/EventedMixin xaction/DefaultActions xide/lodash".split(" "),function(k,h,g,m,l,n,a,b,c,d,f){var e={actionStore:null,actions:null,allowActionOverride:!0,sortGroups:function(a,b){return a=a.sort(function(a,r){return null!=b[a]&&
null!=b[r]?b[r]-b[a]:100})},getItemsAtBranch:function(a,b){return(new l(b)).getChildren(f.map(a,"command"),!1)},refreshActions:function(){for(var a=this.getActions(),b=0;b<a.length;b++){var w=a[b];w.refresh&&w.refresh()}},getAction:function(a){return f.isString(a)?this.getActionStore().getSync(a):a},clearActions:function(){var a=this.getActionStore(),b=a?a.query():[];f.each(b,function(b){b&&a.removeSync(b.command)});a&&a.setData([])},destroy:function(){this.clearActions();return this.inherited(arguments)},
__createAction:function(r,u,w,v,e,c,d,f,q,k,z){v=v||g.ACTION_ICON[u];c={accelKey:c};m.mixin(c,z);r=a.createDefault(r,v,u,w,e,c);if(d){var h;this.keyboardMappings?h=this.keyboardMappings:r.keyboardMappings=h=[];e=b.defaultMapping(d,e,f||g.KEYBOARD_PROFILE.DEFAULT,q,k,[r]);e=this.registerKeyboardMapping(e);h.push(e);r.keyboardMappings=h}return r},updateAction:function(a,b,w){if(a=a||this.getAction(a))a.set(b,w),setTimeout(function(){a.getReferences().forEach(function(a){a.set(b,w)})},100)},_completeActions:function(b){for(var u=
[],w=this.getKeyTarget?this.getKeyTarget():null,v=0;v<b.length;v++){var e=b[v],c;e&&(e instanceof a?c=e:(c=this.__createAction(e.title,e.command,e.group,e.icon,e.handler,e.accelKey,e.keyCombo,e.keyProfile,w||e.keyTarget,e.keyScope,e.mixin),c.parameters=e),this._addAction(u,c))}this.keyboardMappings&&console.error("have mappings");f.each(this.keyboardMappings,function(a){this.registerKeyboardMapping(a)},this);return u},createActionStore:function(){if(!this.actionStore){var a=this._completeActions(this.actions||
[]);this.actionStore=new n({id:m.createUUID(),data:a,observedProperties:["value","icon","label"],tabOrder:this.tabOrder,groupOrder:this.groupOrder,tabSettings:this.tabSettings,menuOrder:this.menuOrder})}return this.actionStore},getActions:function(a,b){if(!a&&!1!==b&&this.__actions)return this.__actions;var e=a;a||(e={command:/\S+/});return this.__actions=this.getActionStore().query(e)},getActionStore:function(){return this.createActionStore()},postMixInProperties:function(){this.inherited&&this.inherited(arguments);
this.createActionStore()},addActions:function(a){var b=this.getActionStore();b["subscribedToUpdates_"+this.id]||(b["subscribedToUpdates_"+this.id]=!0,this.addHandle("update",b.on("update",function(a){var b=a.target;if(!b._isCreating&&a.property&&b&&b.onChange)b.onChange(a.property,a.value,b)})));var e=[];this._emit("onAddActions",{actions:a,permissions:this.permissions,store:b});this.allowActionOverride&&f.each(a,function(a){a&&(a=b.getSync(a.command))&&b.removeSync(a.command)});a=this._completeActions(a);
f.each(a,function(a){this.allowActionOverride&&b.getSync(a.command)&&b.removeSync(a.command);a=b.putSync(a);e.push(a);a._isCreating=!0;a.onCreate&&a.onCreate(a);this._emit("onAddAction",a);a._isCreating=!1}.bind(this));return e},createActionShort:function(a,b,e,c,d){return this.createAction(f.extend({label:a,command:b,icon:e,mixin:c&&c.mixin?c.mixin:d},c))},createAction2:function(a){var b=null,b=a.mixin||{},e=a.owner||b.owner||this,c=a.permissions||this.permissions||[],h=a.command,g=a.keycombo,p=
a.label,k=a.icon,q=a.tab,l=a.group,z=a.filterGroup,n=a.onCreate,C=a.handler,E=a.container||this.domNode,A=a.shouldShow,B=a.shouldDisable;m.mixin(b,{owner:e,onChange:a.onChange});if(b.addPermission||d.hasAction(c,h))return C=C||d.defaultHandler,g&&(f.isString(g)&&(g=[g]),b.tooltip=g.join("\x3cbr/\x3e").toUpperCase()),b=d.createAction(p,h,k,g,q,l,z,n,C,b,A,B,E||this.domNode),e&&b&&e.addAction&&e.addAction(null,b),b},createAction:function(a,b,e,c,g,h,p,k,q,l,z,n,C,E,A){if(1==arguments.length)return this.createAction2(arguments[0]);
var B=null;l=l||{};m.mixin(l,{owner:A||this});if(l.addPermission||d.hasAction(C,b))return q||(q=function(a){this.runAction&&this.runAction.apply(this,[a])}),c&&f.isString(c)&&(c=[c]),B=d.createAction(a,b,e,c,g,h,p,k,q,l,z,n,E||this.domNode),A&&B&&A.addAction&&A.addAction(null,B),B},addAction:function(a,b){var e=a||[],c=this._emit("addAction",b);if(!1===c)return!1;f.isObject(c)&&m.mixin(b,c);e.push(b);return!0},_addAction:function(a,b){var e=a||[],c=this._emit("addAction",b);if(!1===c)return!1;m.isObject(c)&&
m.mixin(b,c);e.push(b);return!0},hasAction:function(a){return d.hasAction(this.permissions,a)}};k=k("xaction/ActionProvider",[c,b],e);k.dcl=h([c.dcl,b.dcl],e);return k})},"xaction/ActionStore":function(){define("xdojo/declare xide/data/TreeMemory xide/utils xide/data/ObservableStore dstore/Trackable xaction/ActionModel".split(" "),function(k,h,g,m,l,n){function a(a,c,e,r,u){return(a||k)(c||[h,l,m],g.mixin({idProperty:"command",declaredClass:"xaction/ActionStore",Model:e||n,renderers:null,observedProperties:r||
b,getAll:function(){return this.data},addRenderer:function(a){!this.renderers&&(this.renderers=[]);!_.contains(this.renderers,a)&&this.renderers.push(a)}},u))}var b=["value","icon","disabled","enabled"],c=a(null,null,null,null,null);c.createDefault=function(a){return new c(a)};c.createClass=a;c.DEFAULT_ACTION_PROPERTIES=b;return c})},"xaction/DefaultActions":function(){define("dcl/dcl dcl/inherited xdojo/declare xide/types xide/utils xlang/i18".split(" "),function(k,h,g,m,l,n){function a(a,b){return _.contains(a,
b)}function b(a,b,c){var d=null;this.onAfterAction&&(d=this.onAfterAction(c,a,b));this._emit&&this._emit("onAfterAction",{action:c,result:a,source:this,afterAction:d})}function c(a,c){var d,f=this;f&&f.onBeforeAction&&f.onBeforeAction(a);f.runAction?d=f.runAction.apply(f,[a,null,c]):a.handler&&(d=a.handler.apply(f,[a,null,c]));d&&d.then?d.then(function(d){b.apply(f,[d,c,a])}):b.apply(f,[d,c,a]);return d}var d=g("xaction/DefaultActions",null,{});d.createActionParameters=function(a,b,c,d,f,g,h,l,k,
q,m){return{title:a,command:b,group:c,icon:d,handler:f,accelKey:g,keyCombo:h,keyProfile:l,keyTarget:k,keyScope:q,mixin:m}};var f=function(a,b,c,f,g,h,k,p,m,q,n,z,G){f&&_.isString(f)&&(f=[f]);q=l.mixin({filterGroup:k||"item|view",tab:g||"File",onCreate:p||function(a){},shouldShow:n||function(){return!0},shouldDisable:z||function(){return!1}},q);a=d.createActionParameters(a,b,h||"File",c,m||null,"",f,null,G,null,q);l.mixin(a,q);return a};d.createAction=f;d.hasAction=a;d.getDefaultActions=function(b,
d,g){function h(a,b,c){return(a=a||d?d.getSelection():[])&&a.length?!1:!0}function k(a,b,c){return h.apply(this,arguments)?!0:(a=a||d?d.getSelection():[])&&!0===a[0].isDir?!0:!1}function n(h,k,m,q,t,v,w,y,x,D,H,I){var F=null;D=D||{};l.mixin(D,{owner:g||d});if(D.addPermission||a(b,k))if(x=x||c,F=f(h,k,m,q,t,v,w,y,x,D,H,I,d.domNode))g&&g.addAction&&g.addAction(null,F),p.push(F)}var x=m.ACTION_VISIBILITY,p=[],t=m.ACTION,q=m.ACTION_ICON,y=g||d;a(b,t.CLIPBOARD)&&d.getClipboardActions&&(p.push(y.createAction({label:"Clipboard",
command:"Edit/Clipboard",icon:"fa-clipboard",tab:"Edit",group:"Clipboard",mixin:{addPermission:!0,dynamic:!0,quick:!0},onCreate:function(a){a.setVisibility(x.RIBBON,{expand:!0,tab:"File"})}})),p=p.concat(d.getClipboardActions(n)));p.push(y.createAction({label:"Show",command:"View/Show",icon:"fa-eye",tab:"View",group:"Show",mixin:{addPermission:!0,dynamic:!0},onCreate:function(a){a.setVisibility(x.RIBBON,{expand:!0})}}));a(b,t.LAYOUT)&&d.getRendererActions&&(p=p.concat(d.getRendererActions()));a(b,
t.COLUMNS)&&d.getColumnHiderActions&&(p=p.concat(d.getColumnHiderActions(b)));p.push(y.createAction({label:"Edit",command:"File/Edit",icon:q.EDIT,tab:"Home",group:"Open",keycombo:["f4","enter","dblclick"],mixin:{quick:!0},shouldDisable:k}));p.push(y.createAction({label:"Delete",command:"File/Delete",icon:q.DELETE,tab:"Home",group:"Organize",keycombo:["f8","delete"],mixin:{quick:!0},shouldDisable:h}));n("Rename","File/Rename","fa-edit",["f2"],"Home","Organize","item",null,null,null,null,h);p.push(y.createAction({label:"Reload",
command:"File/Reload",icon:q.RELOAD,tab:"Home",group:"File",keycombo:["ctrl l"],mixin:{quick:!0}}));n("Create archive","File/Compress",q.COMPRESS,["ctrl z"],"Home","Organize","item|view",null,null,null,null,h);n("Extract","File/Extract",q.EXTRACT,["ctrl e"],"Home","File","item|view",null,null,null,null,function(){return!0});p.push(y.createAction({label:"Download",command:"File/Download",icon:q.DOWNLOAD,tab:"Home",group:"File",keycombo:["ctrl down"],mixin:{quick:!0}}));(a(b,t.NEW_DIRECTORY)||a(b,t.NEW_FILE))&&
n("New","File/New","fa-magic",null,"Home","New","item|view",null,null,{},null,null);n("New Folder",t.NEW_DIRECTORY,"fa-folder",["f7"],"Home","New","item|view",null,null,{quick:!0},null,null);n("New File",t.NEW_FILE,"el-icon-file",["ctrl f4"],"Home","New","item|view",null,null,{quick:!0},null,null);a(b,t.PREVIEW)&&p.push(y.createAction({label:"Preview",command:"File/Preview",icon:"fa-eye",tab:"Home",group:"Open",keycombo:["f3"],mixin:{quick:!0},shouldDisable:k}));a(b,t.SELECTION)&&(p.push(f("Select",
"File/Select","fa-hand-o-up",null,"Home","Select","item|view",function(a){a.setVisibility(x.RIBBON,{expand:!0})},null,null,null,null,d.domNode)),t={owner:g||d},q=d.domNode,p.push(f("Select all","File/Select/All","fa-th",["ctrl a"],"Home","Select","item|view",null,function(){d.selectAll()},t,null,null,q)),p.push(f("Select none","File/Select/None","fa-square-o","ctrl d","Home","Select","item|view",null,function(){d.deselectAll()},t,null,null,q)),p.push(f("Invert selection","File/Select/Invert","fa-square",
["ctrl i"],"Home","Select","item|view",null,function(){d.invertSelection()},t,null,null,q)));return p};d.defaultHandler=c;return d})},"xaction/Toolbar":function(){define("dcl/dcl xdojo/declare xide/utils xide/types xide/widgets/ActionToolbar xide/widgets/_Widget".split(" "),function(k,h,g,m,l,n){var a={_toolbar:null,toolbarInitiallyHidden:!1,toolbarArgs:null,runAction:function(a){a.command===m.ACTION.TOOLBAR&&this.showToolbar(null==this._toolbar,null,null,this);return this.inherited(arguments)},getToolbar:function(){return this._toolbar},
showToolbar:function(a,c,d,f){!a&&(a=null==this._toolbar);this._toolbar||(c=this.add(c||l,g.mixin({style:"height:auto;width:100%"},this.toolbarArgs),d||this.header,!0),g.resizeTo(c,this.header,!1,!0),c.addActionEmitter(f||this),c.setActionEmitter(f||this),g.resizeTo(this.header,c,!0,!1),this._toolbar=c);!a&&this._toolbar&&g.destroy(this._toolbar,!0,this);this.resize()},startup:function(){var a=m.ACTION.TOOLBAR,c=_.contains(this.permissions,a);c&&this.showToolbar(c,null,null,this);var d=this,f=d.domNode.parentNode;
this._on("onAddActions",function(c){!c.store.getSync(a)&&c.actions.push(d.createAction("Toolbar",a,m.ACTION_ICON.TOOLBAR,["ctrl b"],"View","Show","item|view",null,null,null,null,null,c.permissions,f,d))})}};h=h("xaction/Toolbar",n,a);h.Implementation=a;h.dcl=k([n.dcl],a);return h})}}});define("xaction/xaction",["dojo","dijit","dojox"],function(k,h,g){});
//# sourceMappingURL=xaction.js.map