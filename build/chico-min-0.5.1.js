/**
  * Chico-UI
  * Packer-o-matic
  * Like the pizza delivery service: "Les than 100 milisecons delivery guarantee!"
  * @components: core, positioner, object, floats, navs, controllers, watcher, carousel, dropdown, layer, modal, tabNavigator, tooltip, string, number, required, helper, forms, viewer, chat, expando
  * @version 0.4
  * @autor Chico Team <chico@mercadolibre.com>
  *
  * @based on:
  * JSMin
  * @author Ryan Grove <ryan@wonko.com> 
  * @copyright 2002 Douglas Crockford <douglas@crockford.com> (jsmin.c) 
  * @copyright 2008 Ryan Grove <ryan@wonko.com> (PHP port) 
  * @link http://code.google.com/p/jsmin-php/ 
  */
;(function($){

var ui=window.ui={version:"0.5.1",components:"carousel,dropdown,layer,modal,tabNavigator,tooltip,string,number,required,helper,forms,viewer,chat,expando",internals:"positioner,object,floats,navs,controllers,watcher",instances:{},features:{},init:function(){$("html").removeClass("no-js");ui.features=ui.support();ui.components=(window.components)?ui.components+","+window.components:ui.components;ui.internals=(window.internals)?ui.internals+","+window.internals:ui.internals;$(ui.components.split(",")).each(function(i,e){ui.factory({component:e});});},utils:{body:$('body'),html:$('html'),window:$(window),document:$(document),zIndex:1000,index:0},events:{CHANGE_LAYOUT:"changeLayout"}};ui.preload=function(arr){if(typeof arr==="string"){arr=(arr.indexOf(",")>0)?arr.split(","):[arr];}
for(var i=0;i<arr.length;i++){var o=document.createElement("object");o.data=arr[i];var h=document.getElementsByTagName("head")[0];h.appendChild(o);h.removeChild(o);}};ui.factory=function(o){if(!o){alert("Factory fatal error: Need and object {component:\"\"} to configure a component.");return;};if(!o.component){alert("Factory fatal error: No component defined.");return;};var x=o.component;var create=function(x){$.fn[x]=function(options){var results=[];var that=this;var options=options||{};var _arguments=arguments;that.each(function(i,e){var conf={};conf.name=x;conf.element=e;conf.id=ui.utils.index++;if(typeof options==="number"){conf.value=options;if(_arguments[1]){conf.msg=_arguments[1];}}
if(typeof options==="string"){conf.msg=options;}
if(typeof options==="object"){$.extend(conf,options);}
var created=ui[x](conf);if(created.type){var type=created.type;if(!ui.instances[type]){ui.instances[type]=[];}
ui.instances[type].push(created);}
if(created.exists){created=created.object;}
results.push(created);});return(results.length>1)?results:results[0];}
if(o.callback){o.callback();}}
if(ui[o.component]){create(o.component);}else{ui.get({"method":"component","component":o.component,"script":(o.script)?o.script:"src/js/"+o.component+".js","styles":(o.style)?o.style:"src/css/"+x+".css","callback":create});}}
ui.get=function(o){switch(o.method){case"content":var x=o.conf;$.ajax({url:x.ajaxUrl,type:x.ajaxType||'GET',data:x.ajaxParams,cache:true,async:true,success:function(data,textStatus,xhr){x.$htmlContent.html(data).fadeIn('fast',function(){if(x.callbacks&&x.callbacks.contentLoad)x.callbacks.contentLoad();});if(x.position)ui.positioner(x.position);},error:function(xhr,textStatus,errorThrown){data=(x.callbacks&&x.callbacks.contentError)?x.callbacks.contentError(xhr,textStatus,errorThrown):"<p>Error on ajax call </p>";x.$htmlContent.html(data);if(x.position)ui.positioner(x.position);}});break;case"component":if(o.style){var style=document.createElement('link');style.href=o.style;style.rel='stylesheet';style.type='text/css';}
if(o.script){var script=document.createElement("script");script.src=o.script;}
var head=document.getElementsByTagName("head")[0]||document.documentElement;var done=false;script.onload=script.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){done=true;if(o.callback){o.callback(o.component);}
script.onload=script.onreadystatechange=null;if(head&&script.parentNode){head.removeChild(script);}}};if(o.script){head.insertBefore(script,head.firstChild);}
if(o.style){head.appendChild(style);}
break;}}
ui.support=function(){var transition=(function(){var thisBody=document.body||document.documentElement;var thisStyle=thisBody.style;return thisStyle.WebkitTransition!==undefined||thisStyle.MozTransition!==undefined||thisStyle.OTransition!==undefined||thisStyle.transition!==undefined;})();return{transition:transition};};ui.cache={map:{},add:function(url,data){ui.cache.map[url]=data;},get:function(url){return ui.cache.map[url];},rem:function(url){ui.cache.map[url]=null;delete ui.cache.map[url];},flush:function(){delete ui.cache.map;ui.cache.map={};}};ui.positioner=function(o){var element=$(o.element);var context;var viewport;if(!o.points)o.points="cm cm";if(!o.offset)o.offset="0 0";var classReferences={"lt lb":"down","lb lt":"top","rt rb":"down","rb rt":"top","lt rt":"right","cm cm":"center"};var splittedOffset=o.offset.split(" ");var offset_left=parseInt(splittedOffset[0]);var offset_top=parseInt(splittedOffset[1]);var getViewport=(typeof window.innerWidth!="undefined")?function getViewport(){var viewport,width,height,left,top,pageX,pageY;viewport=window;width=viewport.innerWidth;height=viewport.innerHeight;pageX=viewport.pageXOffset;pageY=viewport.pageYOffset;left=0+offset_left+pageX;top=0+offset_top+pageY;bottom=height+pageY;right=width+pageX;return{element:viewport,left:0+offset_left+pageX,top:0+offset_top+pageY,bottom:height+pageY,right:width+pageX,width:width,height:height}}:function getViewport(){var viewport,width,height,left,top,pageX,pageY;viewport=document.documentElement;width=viewport.clientWidth;height=viewport.clientHeight;pageX=viewport.scrollLeft;pageY=viewport.scrollTop;left=0+offset_left+pageX;top=0+offset_top+pageY;bottom=height+pageY;right=width+pageX;return{element:viewport,left:0+offset_left+pageX,top:0+offset_top+pageY,bottom:height+pageY,right:width+pageX,width:width,height:height}};var getPosition=function(unitPoints){var contextLeft=context.left;var contextTop=context.top;var contextWidth=context.width;var contextHeight=context.height;var elementWidth=element.outerWidth();var elementHeight=element.outerHeight();var xReferences={ll:contextLeft,lr:contextLeft+contextWidth,rr:contextLeft+contextWidth-elementWidth,cc:contextLeft+contextWidth/2-elementWidth/2}
var yReferences={tt:contextTop,tb:contextTop+contextHeight,bt:contextTop-elementHeight,mm:contextTop+contextHeight/2-elementHeight/2}
var axis={left:xReferences[unitPoints.my_x+unitPoints.at_x],top:yReferences[unitPoints.my_y+unitPoints.at_y]}
return axis;};var calculatePoints=function(points,unitPoints){var styles=getPosition(unitPoints);styles.direction=classReferences[points];if((points=="lt lb")&&((styles.top+element.outerHeight())>viewport.bottom)){unitPoints.my_y="b";unitPoints.at_y="t";stylesDown=styles;styles=getPosition(unitPoints);styles.direction="top";styles.top-=context.height;if(styles.top<viewport.top){unitPoints.my_y="t";unitPoints.at_y="b";styles=stylesDown;styles.direction="down";};};if((styles.left+element.outerWidth())>viewport.right){unitPoints.my_x="r";unitPoints.at_x="r";var current=styles.direction;styles=getPosition(unitPoints);styles.direction=current+"-right";if(current=="top")styles.top-=context.height;};return styles;};var setPosition=function(){var splitted=o.points.split(" ");var unitPoints={my_x:splitted[0].slice(0,1),my_y:splitted[0].slice(1,2),at_x:splitted[1].slice(0,1),at_y:splitted[1].slice(1,2)}
var styles=calculatePoints(o.points,unitPoints);element.css({left:styles.left,top:styles.top}).removeClass("ch-top ch-left ch-down ch-right ch-down-right ch-top-right").addClass("ch-"+styles.direction);};var getContext=(o.context)?function getContext(){var contextOffset=o.context.offset();context={element:o.context,top:contextOffset.top+offset_top,left:contextOffset.left+offset_left,width:o.context.outerWidth(),height:o.context.outerHeight()};return context;}:function getContext(){return viewport;};var initPosition=function(){viewport=getViewport();context=getContext();setPosition();};initPosition();var scrolled=false;ui.utils.window.bind("resize scroll",function(){scrolled=true;});setInterval(function(){if(!scrolled)return;scrolled=false;initPosition();},250);return $(element);};ui.object=function(){var that=this;return{prevent:function(event){if(event){event.preventDefault();event.stopPropagation();}},loadContent:function(conf){if(conf.ajax===true){conf.ajaxUrl=conf.$trigger.attr('href')||conf.$trigger.parents('form').attr('action');conf.ajaxParams='x=x';if(conf.$trigger.attr('type')=='submit'){conf.ajaxType=conf.$trigger.parents('form').attr('method')||'GET';var serialized=conf.$trigger.parents('form').serialize();conf.ajaxParams=conf.ajaxParams+((serialized!='')?'&'+serialized:'');};conf.$htmlContent.html('<div class="loading"></div>');return ui.get({method:"content",conf:conf});}else if(conf.ajax||(conf.msg&&conf.msg.match(/(?:(?:(https?|file):\/\/)([^\/]+)(\/(?:[^\s])+)?)|(\/(?:[^\s])+)/g))){conf.ajaxUrl=conf.ajax||conf.msg;conf.ajaxParams='x=x';conf.$htmlContent.html('<div class="loading"></div>');return ui.get({method:"content",conf:conf});}else{var content=conf.content||conf.msg;return($(content).length>0)?$(content).clone().show():content;};},callbacks:function(conf,when){if(conf.callbacks&&conf.callbacks[when]){return conf.callbacks[when]();}},publish:{}};}
ui.floats=function(conf){var that=ui.object(conf);var createClose=function(conf){$('<p class="btn ch-close">x</p>').bind('click',function(event){that.hide(event,conf);}).prependTo(conf.$htmlContentainer);};var createCone=function(conf){$('<div class="ch-cone"></div>').prependTo(conf.$htmlContentainer);};var createLayout=function(conf){conf.$htmlContentainer=$('<div class="ch-'+conf.name+'"><div class="ch-'+conf.name+'-content"></div></div>').appendTo("body").hide();conf.$htmlContent=conf.$htmlContentainer.find(".ch-"+conf.name+"-content");conf.position.element=conf.$htmlContentainer;getContent(conf);if(conf.closeButton)createClose(conf);if(conf.cone)createCone(conf);if(conf.classes)conf.$htmlContentainer.addClass(conf.classes);if(conf.hasOwnProperty("width"))conf.$htmlContentainer.css("width",conf.width);if(conf.hasOwnProperty("height"))conf.$htmlContentainer.css("height",conf.height);conf.$htmlContentainer.css("z-index",ui.utils.zIndex++).fadeIn('fast',function(){that.callbacks(conf,'show');});ui.positioner(conf.position);conf.visible=true;}
var getContent=function(conf){if(conf.ajax||(conf.msg&&conf.msg.match(/(?:(?:(https?|file):\/\/)([^\/]+)(\/(?:[^\s])+)?)|(\/(?:[^\s])+)/g))){that.loadContent(conf);}else{conf.$htmlContent.html(that.loadContent(conf)).fadeIn('fast',function(){that.callbacks(conf,'contentLoad');});};}
that.show=function(event,conf){if(event)that.prevent(event);if(conf.visible)return;if(conf.$htmlContentainer){conf.$htmlContentainer.appendTo("body").css("z-index",ui.utils.zIndex++).fadeIn('fast',function(){that.callbacks(conf,'show');conf.visible=true;});ui.positioner(conf.position);return;}
createLayout(conf);};that.hide=function(event,conf){if(event)that.prevent(event);if(!conf.visible)return;conf.$htmlContentainer.fadeOut('fast',function(event){$(this).detach();});conf.visible=false;that.callbacks(conf,'hide');};that.position=function(o,conf){switch(typeof o){case"object":conf.position.context=o.context||conf.position.context;conf.position.points=o.points||conf.position.points;conf.position.offset=o.offset||conf.position.offset;conf.position.fixed=o.fixed||conf.position.fixed;ui.positioner(conf.position);break;case"string":if(o!="refresh"){alert("ChicoUI error: position() expected to find \"refresh\" parameter.");};ui.positioner(conf.position);break;case"undefined":return conf.position;break;};};return that;}
ui.navs=function(){var that=ui.object();that.status=false;that.show=function(event,conf){that.prevent(event);that.status=true;conf.$trigger.addClass('ch-'+conf.name+'-on');conf.$htmlContent.show();that.callbacks(conf,'show');};that.hide=function(event,conf){that.prevent(event);that.status=false;conf.$trigger.removeClass('ch-'+conf.name+'-on');conf.$htmlContent.hide();that.callbacks(conf,'hide');};return that;}
ui.controllers=function(){var that=ui.object();that.children=[];return that;};ui.watcher=function(conf){if(!conf){alert("Watcher fatal error: Need a configuration object to create a validation.");}
var that=ui.object();var checkInstance=function(conf){var instance=ui.instances.watcher;if(instance&&instance.length>0){for(var i=0,j=instance.length;i<j;i++){if(instance[i].element===conf.element){$.extend(instance[i].validations,getValidations(conf));$.extend(instance[i].conditions,getConditions(conf));$.extend(instance[i].messages,conf.messages);instance[i].types=mergeTypes(instance[i].types);return{exists:true,object:instance[i]};}}}};var mergeTypes=function(types){if(!types||types==""){return conf.types;}else{var currentTypes=types.split(",");var newTypes=conf.types.split(",");var toMerge=[];var e=0;g=newTypes.length;for(e;e<g;e++){if(types.indexOf(newTypes[e])===-1){toMerge.push(newTypes[e]);}}
if(toMerge.length>0){$.merge(currentTypes,toMerge);}
return currentTypes.join(",");}}
var getReference=function(conf){var reference;if($(conf.element).hasClass("options")){if($(conf.element).find('h4').length>0){var h4=$(conf.element).find('h4');h4.wrapInner('<span>');reference=h4.children();}else if($(conf.element).prev().attr('tagName')=='LEGEND'){reference=$(conf.element).prev();};}else{reference=$(conf.element);};return reference;}
var getParent=function(conf){if(ui.instances.forms.length>0){var i=0,j=ui.instances.forms.length;for(i;i<j;i++){if(ui.instances.forms[i].element===$(conf.element).parents("form")[0]){return ui.instances.forms[i];}};}else{$(conf.element).parents("form").forms();var last=(ui.instances.forms.length-1);return ui.instances.forms[last];};}
var getValidations=function(conf){var collection={};var types=conf.types.split(",");for(var i=0,j=types.length;i<j;i++){for(var val in conf){if(types[i]==val){collection[val]=conf[val];};};};return collection;};var getConditions=function(conf){var collection={};var types=conf.types.split(",");for(var i=0,j=types.length;i<j;i++){for(var val in conf){if(types[i]==val){collection[val]=conf.conditions[val];};};};return collection;};var getMessages=function(conf){var messages={};for(var msg in conf.messages){messages[msg]=conf.messages[msg];}
return messages;};var revalidate=function(){that.validate(conf);that.parent.checkStatus();}
that.status=true;that.enabled=true;that.types=conf.types;that.reference=conf.reference=getReference(conf);that.parent=conf.parent=getParent(conf);that.validations=getValidations(conf);that.conditions=getConditions(conf);that.messages=getMessages(conf);that.defaultMessages=conf.defaultMessages;that.helper=ui.helper(conf);that.validate=function(conf){if($(conf.element).attr('disabled')){return;};if(that.publish.types.indexOf("required")==-1&&that.isEmpty(conf)){return;};if(that.enabled){for(var type in that.validations){var condition=that.conditions[type];var value=$(conf.element).val();var gotError=true;if(condition.patt){gotError=condition.patt.test(value);};if(condition.expr){gotError=condition.expr((type.indexOf("Length")>-1)?value.length:value,that.validations[type]);};if(condition.func){gotError=!that.isEmpty(conf);};if(!gotError){$(conf.element).addClass("error");if(!conf.status){that.helper.hide();};that.helper.show((that.messages[type])?that.messages[type]:that.defaultMessages[type]);that.publish.status=that.status=conf.status=false;var event=(conf.tag=='OPTIONS'||conf.tag=='SELECT')?"change":"blur";$(conf.element).one(event,revalidate);return;};};};if(!that.status||!that.enabled){$(conf.element).removeClass("error");that.helper.hide();that.publish.status=that.status=conf.status=true;$(conf.element).unbind((conf.tag=='OPTIONS'||conf.tag=='SELECT')?"change":"blur");};that.callbacks(conf,'validate');};that.reset=function(conf){that.publish.status=that.status=conf.status=true;$(conf.element).removeClass("error");that.helper.hide();$(conf.element).unbind("blur");that.callbacks(conf,'reset');};that.isEmpty=function(conf){conf.tag=($(conf.element).hasClass("options"))?"OPTIONS":conf.element.tagName;switch(conf.tag){case'OPTIONS':return $(conf.element).find('input:checked').length==0;break;case'SELECT':var val=$(conf.element).val();return val==-1||val==null;break;case'INPUT':case'TEXTAREA':return $.trim($(conf.element).val()).length==0;break;};};that.publish={uid:conf.id,element:conf.element,type:"watcher",types:that.types,status:that.status,reference:that.reference,parent:that.parent,validations:that.validations,conditions:that.conditions,messages:that.messages,and:function(){return $(conf.element);},reset:function(){that.reset(conf);return that.publish;},validate:function(){that.validate(conf);return that.publish;},refresh:function(){return that.helper.position("refresh");},enable:function(){that.enabled=true;return that.publish;},disable:function(){that.enabled=false;return that.publish;}};var check=checkInstance(conf);if(check){var that={};that.publish=check;}else{that.parent.children.push(that.publish);}
return that;};ui.carousel=function(conf){var that=ui.object();var status=false;var page=1;conf.$trigger=$(conf.element).addClass('ch-carousel');conf.$htmlContent=$(conf.element).find('.carousel').addClass('ch-carousel-content');conf.publish=that.publish;var htmlElementMargin=(ui.utils.html.hasClass("ie6"))?21:20;var extraWidth=(ui.utils.html.hasClass("ie6"))?conf.$htmlContent.children().outerWidth():0;var htmlContentWidth=conf.$htmlContent.children().size()*(conf.$htmlContent.children().outerWidth()+htmlElementMargin)+extraWidth;conf.$htmlContent.wrap($('<div>').addClass('ch-mask')).css('width',htmlContentWidth);var $mask=conf.$trigger.find('.ch-mask');var steps=~~((conf.$trigger.width()-70)/(conf.$htmlContent.children().outerWidth()+20));steps=(steps==0)?1:steps;var totalPages=Math.ceil(conf.$htmlContent.children().size()/steps);var moveTo=(conf.$htmlContent.children().outerWidth()+20)*steps;var margin=($mask.width()-moveTo)/2;$mask.width(moveTo).height(conf.$htmlContent.children().outerHeight()+2);if($.browser.msie&&$.browser.version=='6.0')htmlContentWidth=htmlContentWidth-(conf.$htmlContent.children().outerWidth()*2);var buttons={prev:{$element:$('<p class="ch-prev">Previous</p>').bind('click',function(){move("prev",1)}).css('top',(conf.$trigger.outerHeight()-22)/2),on:function(){buttons.prev.$element.addClass("ch-prev-on")},off:function(){buttons.prev.$element.removeClass("ch-prev-on")}},next:{$element:$('<p class="ch-next">Next</p>').bind('click',function(){move("next",1)}).css('top',(conf.$trigger.outerHeight()-22)/2),on:function(){buttons.next.$element.addClass("ch-next-on")},off:function(){buttons.next.$element.removeClass("ch-next-on")}}};conf.$trigger.prepend(buttons.prev.$element).append(buttons.next.$element);if(htmlContentWidth>$mask.width())buttons.next.on();var move=function(direction,distance){var movement;switch(direction){case"prev":if(status||(page-distance)<=0)return;page-=distance;movement=conf.$htmlContent.position().left+(moveTo*distance);if(page==1)buttons.prev.off();buttons.next.on();break;case"next":if(status||(page+distance)>totalPages)return;page+=distance;movement=conf.$htmlContent.position().left-(moveTo*distance);if(page==totalPages)buttons.next.off();buttons.prev.on();break;};status=true;var afterMove=function(){status=false;if(conf.pager){$(".ch-pager li").removeClass("ch-pager-on");$(".ch-pager li:nth-child("+page+")").addClass("ch-pager-on");};that.callbacks(conf,direction);};if(ui.features.transition){conf.$htmlContent.css({left:movement});afterMove();}else{conf.$htmlContent.animate({left:movement},afterMove);};return conf.publish;};var select=function(item){var itemPage=~~(item/steps)+1;if(itemPage>page){move("next",itemPage-page);}else if(itemPage<page){move("prev",page-itemPage);};if(conf.pager){$(".ch-pager li").removeClass("ch-pager-on");$(".ch-pager li:nth-child("+page+")").addClass("ch-pager-on");}
that.callbacks(conf,'select');return conf.publish;};var pager=function(){var list=$("<ul class=\"ch-pager\">");var thumbs=[];for(var i=1,j=totalPages+1;i<j;i+=1){thumbs.push("<li>");thumbs.push(i);thumbs.push("</li>");};list.append(thumbs.join(""));conf.$trigger.append(list);var pager=$(".ch-pager");var contextWidth=pager.parent().width();var pagerWidth=pager.outerWidth();pager.css('left',(contextWidth-pagerWidth)/2);pager.children().each(function(i,e){$(e).bind("click",function(){select(i);});});};if(conf.pager)pager();conf.publish.uid=conf.id;conf.publish.element=conf.element;conf.publish.type="carousel";conf.publish.getSteps=function(){return steps;};conf.publish.getPage=function(){return page;};conf.publish.select=function(item){return select(item);};conf.publish.next=function(){return move("next",1);};conf.publish.prev=function(){return move("prev",1);};return conf.publish;}
ui.dropdown=function(conf){var that=ui.navs();var skin;if($(conf.element).hasClass("ch-secondary")){$(conf.element).addClass('ch-dropdown');skin="secondary";}else{$(conf.element).addClass("ch-dropdown ch-primary");skin="primary";};conf.$trigger=$(conf.element).children(':first');conf.$htmlContent=conf.$trigger.next();conf.publish=that.publish;var show=function(event){that.prevent(event);if(that.status){return hide();};$(ui.instances.dropdown).each(function(i,e){e.hide()});conf.$htmlContent.css('z-index',ui.utils.zIndex++);that.show(event,conf);if(skin=="secondary"){conf.$trigger.css('z-index',ui.utils.zIndex++);$(conf.element).addClass("ch-dropdown-on");};ui.utils.document.one('click',function(event){that.prevent(event);hide();});return conf.publish;};var hide=function(event){that.prevent(event);if(skin=="secondary"){$(conf.element).removeClass("ch-dropdown-on");};that.hide(event,conf);return conf.publish;};conf.$trigger.bind('click',function(event){that.prevent(event);show();}).addClass('ch-dropdown-trigger').append('<span class="ch-down">&raquo;</span>');conf.$htmlContent.bind('click',function(event){event.stopPropagation()}).addClass('ch-dropdown-content').find('a').bind('click',function(){hide()});conf.publish.uid=conf.id;conf.publish.element=conf.element;conf.publish.type="dropdown";conf.publish.show=function(){return show()};conf.publish.hide=function(){return hide()};return conf.publish;};ui.layer=function(conf){conf.$trigger=$(conf.element);conf.cone=true;conf.classes='box';conf.visible=false;conf.position={context:conf.$trigger,offset:conf.offset||"0 10",points:conf.points||"lt lb"}
var that=ui.floats(conf);var showTime=conf.showTime||300;var hideTime=conf.hideTime||300;var st,ht;var showTimer=function(event){st=setTimeout(function(){show(event)},showTime)};var hideTimer=function(event){ht=setTimeout(function(){hide(event)},hideTime)};var clearTimers=function(){clearTimeout(st);clearTimeout(ht);};var show=function(event){that.show(event,conf);if(conf.event==="click"){$('.ch-layer').bind('click',function(event){event.stopPropagation()});$(document).one('click',function(event){that.hide(event,conf);});}}
var hide=function(event){that.hide(event,conf);}
if(conf.event==='click'){conf.closeButton=true;conf.$trigger.css('cursor','pointer').bind('click',show);}else{conf.$trigger.css('cursor','default').bind('mouseover',showTimer).bind('mouseout',hideTimer);};ui.utils.body.bind(ui.events.CHANGE_LAYOUT,function(){that.position("refresh",conf)});that.publish={uid:conf.id,element:conf.element,type:"layer",content:(conf.content)?conf.content:conf.ajax,show:function(){showTimer();return that.publish;},hide:function(){hideTimer();return that.publish;},position:function(o){return that.position(o,conf)||that.publish;}}
return that.publish;};ui.modal=function(conf){conf.$trigger=$(conf.element);conf.closeButton=(conf.name=="modal")?true:false;conf.classes='box';conf.position={fixed:true};conf.ajax=(!conf.hasOwnProperty("ajax")&&!conf.hasOwnProperty("content")&&!conf.hasOwnProperty("msg"))?true:conf.ajax;var that=ui.floats(conf);var $dimmer=$('<div>').addClass('ch-dimmer').css({height:$(window).height(),display:'block',zIndex:ui.utils.zIndex++}).hide();var dimmer={on:function(){$dimmer.appendTo('body').fadeIn();if(conf.name=="modal"){$dimmer.one("click",hide);}},off:function(){$dimmer.fadeOut('normal',function(){$dimmer.detach();});}};var show=function(event){dimmer.on();that.show(event,conf);ui.positioner(conf.position);$('.ch-modal .btn.ch-close').one('click',hide);conf.$trigger.blur();};var hide=function(event){dimmer.off();that.hide(event,conf);};conf.$trigger.css('cursor','pointer').bind('click',show);that.publish={uid:conf.id,element:conf.element,type:conf.name,content:(conf.content)?conf.content:((conf.ajax===true)?(conf.$trigger.attr('href')||conf.$trigger.parents('form').attr('action')):conf.ajax),show:function(){show();return that.publish;},hide:function(){hide();return that.publish;},position:function(o){return that.position(o,conf)||that.publish;}};return that.publish;};ui.transition=function(conf){conf=conf||{};conf.closeButton=false;conf.msg=conf.msg||"Espere por favor...";conf.content="<div class=\"loading\"></div><p>"+conf.msg+"</p>";return ui.modal(conf);}
ui.factory({component:'transition'});ui.tabNavigator=function(conf){var that=ui.controllers();conf.publish=that.publish;var $triggers=$(conf.element).children(':first').find('a');var $htmlContent=$(conf.element).children(':first').next();$(conf.element).addClass('ch-tabNavigator');$(conf.element).children(':first').addClass('ch-tabNavigator-triggers');$triggers.addClass('ch-tabNavigator-trigger');$htmlContent.addClass('ch-tabNavigator-content box');$.each($triggers,function(i,e){that.children.push(ui.tab(i,e,conf));});var show=function(event,tab){that.children[tab].shoot(event);return conf.publish;};conf.publish.uid=conf.id;conf.publish.element=conf.element;conf.publish.type="tabNavigator";conf.publish.tabs=that.children;conf.publish.select=function(tab){return show($.Event(),tab)};var hash=window.location.hash.replace("#!","");for(var i=that.children.length;i--;){if(that.children[i].conf.$htmlContent.attr("id")===hash){show($.Event(),i);break;}else{show($.Event(),0);};};return conf.publish;};ui.tab=function(index,element,conf){var that=ui.navs();var display=element.href.split('#');var $tabContent=$(element).parents('.ch-tabNavigator').find('#'+display[1]);that.conf={name:'tab',$trigger:$(element).addClass('ch-tabNavigator-trigger'),callbacks:conf.callbacks};var results=function(){if($tabContent.attr('id')){return $tabContent;}else{that.conf.ajax=true;var w=$('<div>').attr('id','ch-tab'+index);w.hide().appendTo(that.conf.$trigger.parents('.ch-tabNavigator').find('.ch-tabNavigator-content'));return w;};};that.conf.$htmlContent=results();if(!that.status)that.conf.$htmlContent.hide();that.shoot=function(event){that.prevent(event);var tabs=conf.publish.tabs;if(tabs[index].status)return;$.each(tabs,function(i,e){if(e.status)e.hide(event,e.conf);});if(that.conf.$htmlContent.html()==='')that.conf.$htmlContent.html(that.loadContent(that.conf));that.show(event,that.conf);};that.conf.$trigger.bind('click',function(event){that.shoot(event);window.location.hash="#!"+that.conf.$htmlContent.attr("id");});return that;}
ui.tooltip=function(conf){conf.cone=true;conf.content=conf.element.title;conf.visible=false;conf.position={context:$(conf.element),offset:"0 10",points:"lt lb"}
var that=ui.floats(conf);var show=function(event){$(conf.element).attr('title','');that.show(event,conf);}
var hide=function(event){$(conf.element).attr('title',conf.content);that.hide(event,conf);}
conf.$trigger=$(conf.element).css('cursor','default').bind('mouseenter',show).bind('mouseleave',hide);ui.utils.body.bind(ui.events.CHANGE_LAYOUT,function(){that.position("refresh",conf)});that.publish={uid:conf.id,element:conf.element,type:"tooltip",content:conf.content,show:function(){show();return that.publish;},hide:function(){hide();return that.publish;},position:function(o){return that.position(o,conf)||that.publish;}}
return that.publish;};ui.string=function(conf){conf.types="text,email,url,minLength,maxLength";conf.reference=$(conf.element);conf.conditions={text:{patt:/^([a-zA-Z\s]+)$/},email:{patt:/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/},url:{patt:/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/},minLength:{expr:function(a,b){return a>=b}},maxLength:{expr:function(a,b){return a<=b}}}
conf.defaultMessages={text:"Usa sÃ³lo letras.",email:"Usa el formato nombre@ejemplo.com.",url:"Usa el formato http://www.sitio.com.",minLength:"Ingresa al menos "+conf.minLength+" caracteres.",maxLength:"El mÃ¡ximo de caracteres es "+conf.maxLength+"."};conf.messages=conf.messages||{};if(conf.msg){conf.messages.string=conf.msg;conf.msg=null;}
if(!conf.text&&!conf.email&&!conf.url&&!conf.maxLength&&!conf.minLength){conf.text=true;}
var that=ui.watcher(conf);return that.publish;};ui.email=function(conf){conf=conf||{};conf.type="email";conf.email=true;conf.messages=conf.messages||{};if(conf.msg){conf.messages.email=conf.msg;conf.msg=null;}
return ui.string(conf);}
ui.factory({component:'email'});ui.url=function(conf){conf=conf||{};conf.type="url";conf.url=true;conf.messages=conf.messages||{};if(conf.msg){conf.messages.url=conf.msg;conf.msg=null;}
return ui.string(conf);}
ui.factory({component:'url'});ui.minLength=function(conf){conf=conf||{};conf.type="minLength";conf.minLength=conf.value;conf.messages=conf.messages||{};if(conf.msg){conf.messages.minLength=conf.msg;conf.msg=null;}
return ui.string(conf);}
ui.factory({component:'minLength'});ui.maxLength=function(conf){conf=conf||{};conf.type="maxLength";conf.maxLength=conf.value;conf.messages=conf.messages||{};if(conf.msg){conf.messages.maxLength=conf.msg;conf.msg=null;}
return ui.string(conf);}
ui.factory({component:'maxLength'});ui.number=function(conf){conf.types="number,min,max,price";conf.reference=$(conf.element);conf.conditions={number:{patt:/^([0-9\s]+)$/},min:{expr:function(a,b){return a>=b}},max:{expr:function(a,b){return a<=b}},price:{patt:/^(\d+)[.,]?(\d?\d?)$/}};conf.defaultMessages={number:"Usa sÃ³lo nÃºmeros.",min:"La cantidad mÃ­nima es "+conf.min+".",max:"La cantidad mÃ¡xima es "+conf.max+".",price:"El campo deberia ser un precio vÃ¡lido: 999,00"};conf.messages=conf.messages||{};if(conf.msg){conf.messages.number=conf.msg;conf.msg=null;}
if(!conf.number&&!conf.min&&!conf.max&&!conf.price){conf.number=true;}
var that=ui.watcher(conf);return that.publish;};ui.min=function(conf){conf=conf||{};conf.min=conf.value;conf.messages=conf.messages||{};if(conf.msg){conf.messages.min=conf.msg;conf.msg=null;}
return ui.number(conf);}
ui.factory({component:'min'});ui.max=function(conf){conf=conf||{};conf.max=conf.value;conf.messages=conf.messages||{};if(conf.msg){conf.messages.max=conf.msg;conf.msg=null;}
return ui.number(conf);}
ui.factory({component:'max'});ui.price=function(conf){conf=conf||{};conf.price=true;conf.messages=conf.messages||{};if(conf.msg){conf.messages.price=conf.msg;conf.msg=null;}
return ui.number(conf);}
ui.factory({component:'price'});ui.required=function(conf){conf.required=true;conf.types="required";conf.conditions={required:{func:'that.isEmpty'}}
conf.defaultMessages={required:"Campo requerido."};conf.messages=conf.messages||{};if(conf.msg){conf.messages.required=conf.msg;conf.msg=null;}
var that=ui.watcher(conf);return that.publish;};ui.helper=function(parent){var conf={};conf.name="helper";conf.$trigger=$(parent.element);conf.cone=true;conf.classes="helper"+parent.id;conf.visible=false;conf.position={};conf.position.context=parent.reference;conf.position.offset="15 0";conf.position.points="lt rt";var that=ui.floats(conf);var hide=function(){$('.helper'+parent.id).remove();conf.visible=false;that.callbacks(conf,'hide');};var show=function(txt){conf.content='<p><span class="ico error">Error: </span>'+txt+'</p>';that.show($.Event(),conf);};ui.utils.body.bind(ui.events.CHANGE_LAYOUT,function(){that.position("refresh",conf)});that.publish={uid:conf.id,element:conf.element,type:"helper",show:function(txt){show(txt);},hide:hide,position:function(o){return that.position(o,conf)||that.publish;}};return that.publish;};ui.forms=function(conf){if($(conf.element).find(":submit").length==0||$(conf.element).attr('action')==""){alert("Forms fatal error: The <input type=submit> is missing, or need to define a action attribute on the form tag.");return;};if(ui.instances.forms){if(ui.instances.forms.length>0){for(var i=0,j=ui.instances.forms.length;i<j;i++){if(ui.instances.forms[i].element===conf.element){return{exists:true,object:ui.instances.forms[i]};};};};}
var that=ui.controllers();var status=false;$(conf.element).bind('submit',function(event){that.prevent(event);});$(conf.element).find(":submit").unbind('click');if(!conf.messages)conf.messages={};conf.messages["general"]=conf.messages["general"]||"Revisa los datos, por favor.";var createError=function(){$(conf.element).before('<p class="ch-validator"><span class="ico error">Error: </span>'+conf.messages["general"]+'</p>');};var removeError=function(){$('.ch-validator').remove();};var checkStatus=function(){for(var i=0,j=that.children.length;i<j;i++){if(!that.children[i].status){if(!status)removeError();createError();status=false;ui.utils.body.trigger(ui.events.CHANGE_LAYOUT);return;};};if(!status){removeError();status=true;ui.utils.body.trigger(ui.events.CHANGE_LAYOUT);};};var validate=function(event){that.callbacks(conf,'beforeValidate');that.prevent(event);for(var i=0,j=that.children.length;i<j;i++){that.children[i].validate();};checkStatus();that.callbacks(conf,'afterValidate');return conf.publish;};var submit=function(event){that.callbacks(conf,'beforeSubmit');that.prevent(event);validate(event);if(status){if(that.callbacks(conf,'submit')===false){conf.element.submit();}};that.callbacks(conf,'afterSubmit');return conf.publish;};var clear=function(event){that.prevent(event);conf.element.reset();removeError();for(var i=0,j=that.children.length;i<j;i++)that.children[i].reset();return conf.publish;};$(conf.element).bind('submit',function(event){that.prevent(event);submit(event);});$(conf.element).find(":reset, .resetForm").bind('click',clear);conf.publish={uid:conf.id,element:conf.element,type:"forms",status:status,children:that.children,validate:function(event){return validate(event)},submit:function(event){return submit(event)},checkStatus:function(){return checkStatus()},clear:function(event){return clear(event)}}
return conf.publish;};ui.viewer=function(conf){var that=ui.controllers();var $viewer=$(conf.element);$viewer.addClass("ch-viewer");var viewerModal={};viewerModal.carouselStruct=$(conf.element).find("ul").clone().addClass("carousel");viewerModal.carouselStruct.find("img").each(function(i,e){$(e).attr("src",$(e).parent().attr("href")).unwrap();});viewerModal.showContent=function(){$(".ch-viewer-modal-content").parent().addClass("ch-viewer-modal");$(".ch-viewer-modal-content").html(viewerModal.carouselStruct);that.children[2]=viewerModal.carousel=$(".ch-viewer-modal-content").carousel({pager:true});$(".ch-viewer-modal-content .ch-carousel-content").css("left",0);viewerModal.carousel.select(thumbnails.selected);viewerModal.modal.position();};viewerModal.hideContent=function(){$("ch-viewer-modal").remove();viewerModal.carouselStruct.css("left","0");for(var i=0,j=ui.instances.carousel.length;i<j;i+=1){if(ui.instances.carousel[i].element===viewerModal.carousel.element){ui.instances.carousel.splice(i,1);return;}};};that.children[1]=viewerModal.modal=$("<a>").modal({content:"<div class=\"ch-viewer-modal-content\">",width:600,height:545,callbacks:{show:viewerModal.showContent,hide:viewerModal.hideContent}});var showcase={};showcase.wrapper=$("<div>").addClass("ch-viewer-display");showcase.display=$(conf.element).children(":first");$viewer.append(showcase.wrapper.append(showcase.display));$viewer.append("<div class=\"ch-lens\">");showcase.children=showcase.display.find("a");showcase.itemWidth=$(showcase.children[0]).parent().outerWidth();showcase.lens=$viewer.find(".ch-lens")
ui.positioner({element:showcase.lens,context:showcase.wrapper});showcase.lens.bind("click",function(event){viewerModal.modal.show();});showcase.wrapper.bind("mouseover",function(){showcase.lens.fadeIn(400);});$viewer.bind("mouseleave",function(){showcase.lens.fadeOut(400);});var extraWidth=(ui.utils.html.hasClass("ie6"))?showcase.itemWidth:0;showcase.display.css('width',(showcase.children.length*showcase.itemWidth)+extraWidth).addClass("ch-viewer-content")
showcase.children.bind("click",function(event){that.prevent(event);viewerModal.modal.show();});var thumbnails={};thumbnails.selected=0;thumbnails.wrapper=$("<div>").addClass("ch-viewer-triggers");$viewer.append(thumbnails.wrapper.append($viewer.find("ul").clone().addClass("carousel")));thumbnails.children=thumbnails.wrapper.find("a");thumbnails.children.find("img").each(function(i,e){$(e).attr("src",$(e).attr("src").replace("v=V","v=M"));$(e).parent().bind("click",function(event){that.prevent(event);select(i);});});that.children[0]=thumbnails.carousel=thumbnails.wrapper.carousel();thumbnails.wrapper.bind("mouseenter",function(){showcase.lens.fadeOut(400);});var select=function(item){if(item>showcase.children.length-1||item<0||isNaN(item)){alert("Error: Expected to find a number between 0 and "+(showcase.children.length-1)+".");return conf.publish;};var visibles=thumbnails.carousel.getSteps();var page=thumbnails.carousel.getPage();var nextPage=~~(item/visibles)+1;$(thumbnails.children[thumbnails.selected]).removeClass("ch-thumbnail-on");$(thumbnails.children[item]).addClass("ch-thumbnail-on");var movement={left:-item*showcase.itemWidth};if(ui.features.transition){showcase.display.css(movement);}else{showcase.display.animate(movement);};if(thumbnails.selected<visibles&&item>=visibles&&nextPage>page){thumbnails.carousel.next();}else if(thumbnails.selected>=visibles&&item<visibles&&nextPage<page){thumbnails.carousel.prev();};thumbnails.selected=item;return conf.publish;};conf.publish={uid:conf.id,element:conf.element,type:"viewer",children:that.children,select:function(i){that.callbacks(conf,'select');return select(i);}}
select(0);return conf.publish;};ui.chat=function(conf){var that=ui.object();var getDomain=function(n){switch(n){case"1":return"mercadolidesa.com.ar";break;case"2":return"mercadolistage.com.ar";break;case"3":return"mercadolibre.com.ar";break;}}
if(conf.msg){conf.ruleGroupName=conf.msg;}
that.load=function(){loadChatGZ(conf.ruleGroupName,conf.element.id,conf.style||"block",conf.template||"1",conf.environment||"3");}
ui.get({method:"component",name:"chat",script:"http://www."+getDomain(conf.environment)+"/org-img/jsapi/chat/chatRBIScript.js",callback:function(){that.load();}});that.publish={uid:conf.id,element:conf.element,type:"chat"}
return that.publish;}
ui.expando=function(conf){var that=ui.navs();$(conf.element).children(':first').wrapInner("<span class=\"ch-expando-trigger\"></span>");$(conf.element).addClass('ch-expando');conf.$trigger=$(conf.element).find(".ch-expando-trigger");conf.$htmlContent=conf.$trigger.parent().next();conf.publish=that.publish;conf.open=conf.open||false;var show=function(event){if(that.status){return hide();};that.show(event,conf);return conf.publish;};var hide=function(event){that.hide(event,conf);return conf.publish;};conf.$trigger.bind('click',function(event){that.prevent(event);show();}).addClass('ch-expando-trigger')
conf.$htmlContent.bind('click',function(event){event.stopPropagation()}).addClass('ch-expando-content');if(conf.open)show();conf.publish.uid=conf.id;conf.publish.element=conf.element;conf.publish.type="expando";conf.publish.open=conf.open;conf.publish.show=function(){return show()};conf.publish.hide=function(){return hide()};return conf.publish;};
ui.init();
})(jQuery);