// Zipline 
// @ScatterPlusLineChart
//   - showLable option added
//   - horizental line added as a regression line w/o series 
//   - https://github.com/SolarCity/zipline/commit/b9121604d04b8112e1d86118737b6c9e5d64a0b6
//   - https://github.com/SolarCity/zipline/commit/fa2a6c07aa99302c08c92911030b0c0b09b5b53d
//
// @multiChart
//   - support bar / stackedbar /line
// fix performance issue with veroni issue
(function(){

var nv = window.nv || {};


nv.version = '1.1.15b'; //'1.1.15b-zl'
nv.dev = true //set false when in production

window.nv = nv;

nv.tooltip = nv.tooltip || {}; // For the tooltip system
nv.utils = nv.utils || {}; // Utility subsystem
nv.models = nv.models || {}; //stores all the possible models/components
nv.charts = {}; //stores all the ready to use charts
nv.graphs = []; //stores all the graphs currently on the page
nv.logs = {}; //stores some statistics and potential error messages

nv.dispatch = d3.dispatch('render_start', 'render_end');

// *************************************************************************
//  Development render timers - disabled if dev = false

if (nv.dev) {
  nv.dispatch.on('render_start', function(e) {
    nv.logs.startTime = +new Date();
  });

  nv.dispatch.on('render_end', function(e) {
    nv.logs.endTime = +new Date();
    nv.logs.totalTime = nv.logs.endTime - nv.logs.startTime;
    nv.log('total', nv.logs.totalTime); // used for development, to keep track of graph generation times
  });!function(){function t(t,e){return new Date(e,t+1,0).getDate()}function e(t,e,n){return function(r,a,o){var i=t(r),l=[];if(r>i&&e(i),o>1)for(;a>i;){var s=new Date(+i);n(s)%o===0&&l.push(s),e(i)}else for(;a>i;)l.push(new Date(+i)),e(i);return l}}var n=window.nv||{};n.version="1.1.15b",n.dev=!0,window.nv=n,n.tooltip=n.tooltip||{},n.utils=n.utils||{},n.models=n.models||{},n.charts={},n.graphs=[],n.logs={},n.dispatch=d3.dispatch("render_start","render_end"),n.dev&&(n.dispatch.on("render_start",function(){n.logs.startTime=+new Date}),n.dispatch.on("render_end",function(){n.logs.endTime=+new Date,n.logs.totalTime=n.logs.endTime-n.logs.startTime,n.log("total",n.logs.totalTime)})),n.log=function(){if(n.dev&&console.log&&console.log.apply)console.log.apply(console,arguments);else if(n.dev&&"function"==typeof console.log&&Function.prototype.bind){var t=Function.prototype.bind.call(console.log,console);t.apply(console,arguments)}return arguments[arguments.length-1]},n.render=function(t){t=t||1,n.render.active=!0,n.dispatch.render_start(),setTimeout(function(){for(var e,r,a=0;t>a&&(r=n.render.queue[a]);a++)e=r.generate(),typeof r.callback==typeof Function&&r.callback(e),n.graphs.push(e);n.render.queue.splice(0,a),n.render.queue.length?setTimeout(arguments.callee,0):(n.dispatch.render_end(),n.render.active=!1)},0)},n.render.active=!1,n.render.queue=[],n.addGraph=function(t){typeof arguments[0]==typeof Function&&(t={generate:arguments[0],callback:arguments[1]}),n.render.queue.push(t),n.render.active||n.render()},n.identity=function(t){return t},n.strip=function(t){return t.replace(/(\s|&)/g,"")},d3.time.monthEnd=function(t){return new Date(t.getFullYear(),t.getMonth(),0)},d3.time.monthEnds=e(d3.time.monthEnd,function(e){e.setUTCDate(e.getUTCDate()+1),e.setDate(t(e.getMonth()+1,e.getFullYear()))},function(t){return t.getMonth()}),n.interactiveGuideline=function(){"use strict";function t(d){d.each(function(d){function f(){var n=d3.mouse(this),r=n[0],a=n[1],s=!0,u=!1;if(c&&(r=d3.event.offsetX,a=d3.event.offsetY,"svg"!==d3.event.target.tagName&&(s=!1),d3.event.target.className.baseVal.match("nv-legend")&&(u=!0)),s&&(r-=o.left,a-=o.top),0>r||0>a||r>g||a>h||d3.event.relatedTarget&&void 0===d3.event.relatedTarget.ownerSVGElement||u){if(c&&d3.event.relatedTarget&&void 0===d3.event.relatedTarget.ownerSVGElement&&d3.event.relatedTarget.className.match(e.nvPointerEventsClass))return;return l.elementMouseout({mouseX:r,mouseY:a}),void t.renderGuideLine(null)}var d=i.invert(r);l.elementMousemove({mouseX:r,mouseY:a,pointXValue:d}),"dblclick"===d3.event.type&&l.elementDblclick({mouseX:r,mouseY:a,pointXValue:d})}var p=d3.select(this),g=r||960,h=a||400,m=p.selectAll("g.nv-wrap.nv-interactiveLineLayer").data([d]),v=m.enter().append("g").attr("class"," nv-wrap nv-interactiveLineLayer");v.append("g").attr("class","nv-interactiveGuideLine"),u&&(u.on("mousemove",f,!0).on("mouseout",f,!0).on("dblclick",f),t.renderGuideLine=function(t){if(s){var e=m.select(".nv-interactiveGuideLine").selectAll("line").data(null!=t?[n.utils.NaNtoZero(t)]:[],String);e.enter().append("line").attr("class","nv-guideline").attr("x1",function(t){return t}).attr("x2",function(t){return t}).attr("y1",h).attr("y2",0),e.exit().remove()}})})}var e=n.models.tooltip(),r=null,a=null,o={left:0,top:0},i=d3.scale.linear(),l=(d3.scale.linear(),d3.dispatch("elementMousemove","elementMouseout","elementDblclick")),s=!0,u=null,c=-1!==navigator.userAgent.indexOf("MSIE");return t.dispatch=l,t.tooltip=e,t.margin=function(e){return arguments.length?(o.top="undefined"!=typeof e.top?e.top:o.top,o.left="undefined"!=typeof e.left?e.left:o.left,t):o},t.width=function(e){return arguments.length?(r=e,t):r},t.height=function(e){return arguments.length?(a=e,t):a},t.xScale=function(e){return arguments.length?(i=e,t):i},t.showGuideLine=function(e){return arguments.length?(s=e,t):s},t.svgContainer=function(e){return arguments.length?(u=e,t):u},t},n.interactiveBisect=function(t,e,n){"use strict";if(!t instanceof Array)return null;"function"!=typeof n&&(n=function(t){return t.x});var r=d3.bisector(n).left,a=d3.max([0,r(t,e)-1]),o=n(t[a],a);if("undefined"==typeof o&&(o=a),o===e)return a;var i=d3.min([a+1,t.length-1]),l=n(t[i],i);return"undefined"==typeof l&&(l=i),Math.abs(l-e)>=Math.abs(o-e)?a:i},n.nearestValueIndex=function(t,e,n){"use strict";var r=1/0,a=null;return t.forEach(function(t,o){var i=Math.abs(e-t);r>=i&&n>i&&(r=i,a=o)}),a},function(){"use strict";window.nv.tooltip={},window.nv.models.tooltip=function(){function t(){if(d){var t=d3.select(d);"svg"!==t.node().tagName&&(t=t.select("svg"));var e=t.node()?t.attr("viewBox"):null;if(e){e=e.split(" ");var n=parseInt(t.style("width"))/e[2];p.left=p.left*n,p.top=p.top*n}}}function e(t){var e;e=d3.select(d?d:"body");var n=e.select(".nvtooltip");return null===n.node()&&(n=e.append("div").attr("class","nvtooltip "+(c?c:"xy-tooltip")).attr("id",h)),n.node().innerHTML=t,n.style("top",0).style("left",0).style("opacity",0),n.selectAll("div, table, td, tr").classed(m,!0),n.classed(m,!0),n.node()}function r(){if(g&&b(o)){t();var a=p.left,c=null!=u?u:p.top,h=e(x(o));if(f=h,d){var m=d.getElementsByTagName("svg")[0],v=(m?m.getBoundingClientRect():d.getBoundingClientRect(),{left:0,top:0});if(m){var y=m.getBoundingClientRect(),k=d.getBoundingClientRect(),w=y.top;if(0>w){var A=d.getBoundingClientRect();w=Math.abs(w)>A.height?0:w}v.top=Math.abs(w-k.top),v.left=Math.abs(y.left-k.left)}a+=d.offsetLeft+v.left-2*d.scrollLeft,c+=d.offsetTop+v.top-2*d.scrollTop}return s&&s>0&&(c=Math.floor(c/s)*s),n.tooltip.calcTooltipPosition([a,c],i,l,h),r}}var a=null,o=null,i="w",l=50,s=25,u=null,c=null,d=null,f=null,p={left:null,top:null},g=!0,h="nvtooltip-"+Math.floor(1e5*Math.random()),m="nv-pointer-events-none",v=function(t){return t},y=function(t){return t},x=function(t){if(null!=a)return a;if(null==t)return"";var e=d3.select(document.createElement("table")),n=e.selectAll("thead").data([t]).enter().append("thead");n.append("tr").append("td").attr("colspan",3).append("strong").classed("x-value",!0).html(y(t.value));var r=e.selectAll("tbody").data([t]).enter().append("tbody"),o=r.selectAll("tr").data(function(t){return t.series}).enter().append("tr").classed("highlight",function(t){return t.highlight});o.append("td").classed("legend-color-guide",!0).append("div").style("background-color",function(t){return t.color}),o.append("td").classed("key",!0).html(function(t){return t.key}),o.append("td").classed("value",!0).html(function(t,e){return v(t.value,e)}),o.selectAll("td").each(function(t){if(t.highlight){var e=d3.scale.linear().domain([0,1]).range(["#fff",t.color]),n=.6;d3.select(this).style("border-bottom-color",e(n)).style("border-top-color",e(n))}});var i=e.node().outerHTML;return void 0!==t.footer&&(i+="<div class='footer'>"+t.footer+"</div>"),i},b=function(t){return t&&t.series&&t.series.length>0?!0:!1};return r.nvPointerEventsClass=m,r.content=function(t){return arguments.length?(a=t,r):a},r.tooltipElem=function(){return f},r.contentGenerator=function(t){return arguments.length?("function"==typeof t&&(x=t),r):x},r.data=function(t){return arguments.length?(o=t,r):o},r.gravity=function(t){return arguments.length?(i=t,r):i},r.distance=function(t){return arguments.length?(l=t,r):l},r.snapDistance=function(t){return arguments.length?(s=t,r):s},r.classes=function(t){return arguments.length?(c=t,r):c},r.chartContainer=function(t){return arguments.length?(d=t,r):d},r.position=function(t){return arguments.length?(p.left="undefined"!=typeof t.left?t.left:p.left,p.top="undefined"!=typeof t.top?t.top:p.top,r):p},r.fixedTop=function(t){return arguments.length?(u=t,r):u},r.enabled=function(t){return arguments.length?(g=t,r):g},r.valueFormatter=function(t){return arguments.length?("function"==typeof t&&(v=t),r):v},r.headerFormatter=function(t){return arguments.length?("function"==typeof t&&(y=t),r):y},r.id=function(){return h},r},n.tooltip.show=function(t,e,r,a,o,i){var l=document.createElement("div");l.className="nvtooltip "+(i?i:"xy-tooltip");var s=o;(!o||o.tagName.match(/g|svg/i))&&(s=document.getElementsByTagName("body")[0]),l.style.left=0,l.style.top=0,l.style.opacity=0,l.innerHTML=e,s.appendChild(l),o&&(t[0]=t[0]-o.scrollLeft,t[1]=t[1]-o.scrollTop),n.tooltip.calcTooltipPosition(t,r,a,l)},n.tooltip.findFirstNonSVGParent=function(t){for(;null!==t.tagName.match(/^g|svg$/i);)t=t.parentNode;return t},n.tooltip.findTotalOffsetTop=function(t,e){var n=e;do isNaN(t.offsetTop)||(n+=t.offsetTop);while(t=t.offsetParent);return n},n.tooltip.findTotalOffsetLeft=function(t,e){var n=e;do isNaN(t.offsetLeft)||(n+=t.offsetLeft);while(t=t.offsetParent);return n},n.tooltip.calcTooltipPosition=function(t,e,r,a){var o,i,l=parseInt(a.offsetHeight),s=parseInt(a.offsetWidth),u=n.utils.windowSize().width,c=n.utils.windowSize().height,d=window.pageYOffset,f=window.pageXOffset;c=window.innerWidth>=document.body.scrollWidth?c:c-16,u=window.innerHeight>=document.body.scrollHeight?u:u-16,e=e||"s",r=r||20;var p=function(t){return n.tooltip.findTotalOffsetTop(t,i)},g=function(t){return n.tooltip.findTotalOffsetLeft(t,o)};switch(e){case"e":o=t[0]-s-r,i=t[1]-l/2;var h=g(a),m=p(a);f>h&&(o=t[0]+r>f?t[0]+r:f-h+o),d>m&&(i=d-m+i),m+l>d+c&&(i=d+c-m+i-l);break;case"w":o=t[0]+r,i=t[1]-l/2;var h=g(a),m=p(a);h+s>u&&(o=t[0]-s-r),d>m&&(i=d+5),m+l>d+c&&(i=d+c-m+i-l);break;case"n":o=t[0]-s/2-5,i=t[1]+r;var h=g(a),m=p(a);f>h&&(o=f+5),h+s>u&&(o=o-s/2+5),m+l>d+c&&(i=d+c-m+i-l);break;case"s":o=t[0]-s/2,i=t[1]-l-r;var h=g(a),m=p(a);f>h&&(o=f+5),h+s>u&&(o=o-s/2+5),d>m&&(i=d);break;case"none":o=t[0],i=t[1]-r;var h=g(a),m=p(a)}return a.style.left=o+"px",a.style.top=i+"px",a.style.opacity=1,a.style.position="absolute",a},n.tooltip.cleanup=function(){for(var t=document.getElementsByClassName("nvtooltip"),e=[];t.length;)e.push(t[0]),t[0].style.transitionDelay="0 !important",t[0].style.opacity=0,t[0].className="nvtooltip-pending-removal";setTimeout(function(){for(;e.length;){var t=e.pop();t.parentNode.removeChild(t)}},500)}}(),n.utils.windowSize=function(){var t={width:640,height:480};return document.body&&document.body.offsetWidth&&(t.width=document.body.offsetWidth,t.height=document.body.offsetHeight),"CSS1Compat"==document.compatMode&&document.documentElement&&document.documentElement.offsetWidth&&(t.width=document.documentElement.offsetWidth,t.height=document.documentElement.offsetHeight),window.innerWidth&&window.innerHeight&&(t.width=window.innerWidth,t.height=window.innerHeight),t},n.utils.windowResize=function(t){if(void 0!==t){var e=window.onresize;window.onresize=function(n){"function"==typeof e&&e(n),t(n)}}},n.utils.getColor=function(t){return arguments.length?"[object Array]"===Object.prototype.toString.call(t)?function(e,n){return e.color||t[n%t.length]}:t:n.utils.defaultColor()},n.utils.defaultColor=function(){var t=d3.scale.category20().range();return function(e,n){return e.color||t[n%t.length]}},n.utils.customTheme=function(t,e,n){e=e||function(t){return t.key},n=n||d3.scale.category20().range();var r=n.length;return function(a){var o=e(a);return r||(r=n.length),"undefined"!=typeof t[o]?"function"==typeof t[o]?t[o]():t[o]:n[--r]}},n.utils.pjax=function(t,e){function r(r){d3.html(r,function(r){var a=d3.select(e).node();a.parentNode.replaceChild(d3.select(r).select(e).node(),a),n.utils.pjax(t,e)})}d3.selectAll(t).on("click",function(){history.pushState(this.href,this.textContent,this.href),r(this.href),d3.event.preventDefault()}),d3.select(window).on("popstate",function(){d3.event.state&&r(d3.event.state)})},n.utils.calcApproxTextWidth=function(t){if("function"==typeof t.style&&"function"==typeof t.text){var e=parseInt(t.style("font-size").replace("px","")),n=t.text().length;return n*e*.5}return 0},n.utils.NaNtoZero=function(t){return"number"!=typeof t||isNaN(t)||null===t||1/0===t?0:t},n.utils.optionsFunc=function(t){return t&&d3.map(t).forEach(function(t,e){"function"==typeof this[t]&&this[t](e)}.bind(this)),this},n.models.axis=function(){"use strict";function t(n){return n.each(function(t){var n=d3.select(this),o=n.selectAll("g.nv-wrap.nv-axis").data([t]),v=o.enter().append("g").attr("class","nvd3 nv-wrap nv-axis"),y=(v.append("g"),o.select("g"));null!==g?e.ticks(g):("top"==e.orient()||"bottom"==e.orient())&&e.ticks(Math.abs(i.range()[1]-i.range()[0])/100),y.transition().call(e),m=m||e.scale();var x=e.tickFormat();null==x&&(x=m.tickFormat());var b=y.selectAll("text.nv-axislabel").data([l||null]);switch(b.exit().remove(),e.orient()){case"top":b.enter().append("text").attr("class","nv-axislabel");var k=2==i.range().length?i.range()[1]:i.range()[i.range().length-1]+(i.range()[1]-i.range()[0]);if(b.attr("text-anchor","middle").attr("y",0).attr("x",k/2),s){var w=o.selectAll("g.nv-axisMaxMin").data(i.domain());w.enter().append("g").attr("class","nv-axisMaxMin").append("text"),w.exit().remove(),w.attr("transform",function(t){return"translate("+i(t)+",0)"}).select("text").attr("dy","-0.5em").attr("y",-e.tickPadding()).attr("text-anchor","middle").text(function(t){var e=x(t);return(""+e).match("NaN")?"":e}),w.transition().attr("transform",function(t,e){return"translate("+i.range()[e]+",0)"})}break;case"bottom":var A=36,S=30,M=y.selectAll("g").select("text");if(c%360){M.each(function(){var t=this.getBBox().width;t>S&&(S=t)});var C=Math.abs(Math.sin(c*Math.PI/180)),A=(C?C*S:S)+30;M.attr("transform",function(){return"rotate("+c+" 0,0)"}).style("text-anchor",c%360>0?"start":"end")}b.enter().append("text").attr("class","nv-axislabel");var k=2==i.range().length?i.range()[1]:i.range()[i.range().length-1]+(i.range()[1]-i.range()[0]);if(b.attr("text-anchor","middle").attr("y",A).attr("x",k/2),s){var w=o.selectAll("g.nv-axisMaxMin").data([i.domain()[0],i.domain()[i.domain().length-1]]);w.enter().append("g").attr("class","nv-axisMaxMin").append("text"),w.exit().remove(),w.attr("transform",function(t){return"translate("+(i(t)+(p?i.rangeBand()/2:0))+",0)"}).select("text").attr("dy",".71em").attr("y",e.tickPadding()).attr("transform",function(){return"rotate("+c+" 0,0)"}).style("text-anchor",c?c%360>0?"start":"end":"middle").text(function(t){var e=x(t);return(""+e).match("NaN")?"":e}),w.transition().attr("transform",function(t){return"translate("+(i(t)+(p?i.rangeBand()/2:0))+",0)"})}f&&M.attr("transform",function(t,e){return"translate(0,"+(e%2==0?"0":"12")+")"});break;case"right":if(b.enter().append("text").attr("class","nv-axislabel"),b.style("text-anchor",d?"middle":"begin").attr("transform",d?"rotate(90)":"").attr("y",d?-Math.max(r.right,a)+12:-10).attr("x",d?i.range()[0]/2:e.tickPadding()),s){var w=o.selectAll("g.nv-axisMaxMin").data(i.domain());w.enter().append("g").attr("class","nv-axisMaxMin").append("text").style("opacity",0),w.exit().remove(),w.attr("transform",function(t){return"translate(0,"+i(t)+")"}).select("text").attr("dy",".32em").attr("y",0).attr("x",e.tickPadding()).style("text-anchor","start").text(function(t){var e=x(t);return(""+e).match("NaN")?"":e}),w.transition().attr("transform",function(t,e){return"translate(0,"+i.range()[e]+")"}).select("text").style("opacity",1)}break;case"left":if(b.enter().append("text").attr("class","nv-axislabel"),b.style("text-anchor",d?"middle":"end").attr("transform",d?"rotate(-90)":"").attr("y",d?-Math.max(r.left,a)+h:-10).attr("x",d?-i.range()[0]/2:-e.tickPadding()),s){var w=o.selectAll("g.nv-axisMaxMin").data(i.domain());w.enter().append("g").attr("class","nv-axisMaxMin").append("text").style("opacity",0),w.exit().remove(),w.attr("transform",function(t){return"translate(0,"+m(t)+")"}).select("text").attr("dy",".32em").attr("y",0).attr("x",-e.tickPadding()).attr("text-anchor","end").text(function(t){var e=x(t);return(""+e).match("NaN")?"":e}),w.transition().attr("transform",function(t,e){return"translate(0,"+i.range()[e]+")"}).select("text").style("opacity",1)}}if(b.text(function(t){return t}),!s||"left"!==e.orient()&&"right"!==e.orient()||(y.selectAll("g").each(function(t){d3.select(this).select("text").attr("opacity",1),(i(t)<i.range()[1]+10||i(t)>i.range()[0]-10)&&((t>1e-10||-1e-10>t)&&d3.select(this).attr("opacity",0),d3.select(this).select("text").attr("opacity",0))}),i.domain()[0]==i.domain()[1]&&0==i.domain()[0]&&o.selectAll("g.nv-axisMaxMin").style("opacity",function(t,e){return e?0:1})),s&&("top"===e.orient()||"bottom"===e.orient())){var D=[];o.selectAll("g.nv-axisMaxMin").each(function(t,e){try{D.push(e?i(t)-this.getBBox().width-4:i(t)+this.getBBox().width+4)}catch(n){D.push(e?i(t)-4:i(t)+4)}}),y.selectAll("g").each(function(t){(i(t)<D[0]||i(t)>D[1])&&(t>1e-10||-1e-10>t?d3.select(this).remove():d3.select(this).select("text").remove())})}u&&y.selectAll(".tick").filter(function(t){return!parseFloat(Math.round(1e5*t.__data__)/1e6)&&void 0!==t.__data__}).classed("zero",!0),m=i.copy()}),t}var e=d3.svg.axis(),r={top:0,right:0,bottom:0,left:0},a=75,o=60,i=d3.scale.linear(),l=null,s=!0,u=!0,c=0,d=!0,f=!1,p=!1,g=null,h=12;e.scale(i).orient("bottom").tickFormat(function(t){return t});var m;return t.axis=e,d3.rebind(t,e,"orient","tickValues","tickSubdivide","tickSize","tickPadding","tickFormat"),d3.rebind(t,i,"domain","range","rangeBand","rangeBands"),t.options=n.utils.optionsFunc.bind(t),t.margin=function(e){return arguments.length?(r.top="undefined"!=typeof e.top?e.top:r.top,r.right="undefined"!=typeof e.right?e.right:r.right,r.bottom="undefined"!=typeof e.bottom?e.bottom:r.bottom,r.left="undefined"!=typeof e.left?e.left:r.left,t):r},t.width=function(e){return arguments.length?(a=e,t):a},t.ticks=function(e){return arguments.length?(g=e,t):g},t.height=function(e){return arguments.length?(o=e,t):o},t.axisLabel=function(e){return arguments.length?(l=e,t):l},t.showMaxMin=function(e){return arguments.length?(s=e,t):s},t.highlightZero=function(e){return arguments.length?(u=e,t):u},t.scale=function(n){return arguments.length?(i=n,e.scale(i),p="function"==typeof i.rangeBands,d3.rebind(t,i,"domain","range","rangeBand","rangeBands"),t):i},t.rotateYLabel=function(e){return arguments.length?(d=e,t):d},t.rotateLabels=function(e){return arguments.length?(c=e,t):c},t.staggerLabels=function(e){return arguments.length?(f=e,t):f},t.axisLabelDistance=function(e){return arguments.length?(h=e,t):h},t},n.models.historicalBar=function(){"use strict";function t(k){return k.each(function(t){var k=l-i.left-i.right,w=s-i.top-i.bottom,A=d3.select(this);c.domain(e||d3.extent(t[0].values.map(f).concat(g))),c.range(m?a||[.5*k/t[0].values.length,k*(t[0].values.length-.5)/t[0].values.length]:a||[0,k]),d.domain(r||d3.extent(t[0].values.map(p).concat(h))).range(o||[w,0]),c.domain()[0]===c.domain()[1]&&c.domain(c.domain()[0]?[c.domain()[0]-.01*c.domain()[0],c.domain()[1]+.01*c.domain()[1]]:[-1,1]),d.domain()[0]===d.domain()[1]&&d.domain(d.domain()[0]?[d.domain()[0]+.01*d.domain()[0],d.domain()[1]-.01*d.domain()[1]]:[-1,1]);var S=A.selectAll("g.nv-wrap.nv-historicalBar-"+u).data([t[0].values]),M=S.enter().append("g").attr("class","nvd3 nv-wrap nv-historicalBar-"+u),C=M.append("defs"),D=M.append("g"),I=S.select("g");D.append("g").attr("class","nv-bars"),S.attr("transform","translate("+i.left+","+i.top+")"),A.on("click",function(t,e){x.chartClick({data:t,index:e,pos:d3.event,id:u})}),C.append("clipPath").attr("id","nv-chart-clip-path-"+u).append("rect"),S.select("#nv-chart-clip-path-"+u+" rect").attr("width",k).attr("height",w),I.attr("clip-path",v?"url(#nv-chart-clip-path-"+u+")":"");var W=S.select(".nv-bars").selectAll(".nv-bar").data(function(t){return t},function(t,e){return f(t,e)});W.exit().remove();W.enter().append("rect").attr("x",0).attr("y",function(t,e){return n.utils.NaNtoZero(d(Math.max(0,p(t,e))))}).attr("height",function(t,e){return n.utils.NaNtoZero(Math.abs(d(p(t,e))-d(0)))}).attr("transform",function(e,n){return"translate("+(c(f(e,n))-k/t[0].values.length*.45)+",0)"}).on("mouseover",function(e,n){b&&(d3.select(this).classed("hover",!0),x.elementMouseover({point:e,series:t[0],pos:[c(f(e,n)),d(p(e,n))],pointIndex:n,seriesIndex:0,e:d3.event}))}).on("mouseout",function(e,n){b&&(d3.select(this).classed("hover",!1),x.elementMouseout({point:e,series:t[0],pointIndex:n,seriesIndex:0,e:d3.event}))}).on("click",function(t,e){b&&(x.elementClick({value:p(t,e),data:t,index:e,pos:[c(f(t,e)),d(p(t,e))],e:d3.event,id:u}),d3.event.stopPropagation())}).on("dblclick",function(t,e){b&&(x.elementDblClick({value:p(t,e),data:t,index:e,pos:[c(f(t,e)),d(p(t,e))],e:d3.event,id:u}),d3.event.stopPropagation())});W.attr("fill",function(t,e){return y(t,e)}).attr("class",function(t,e,n){return(p(t,e)<0?"nv-bar negative":"nv-bar positive")+" nv-bar-"+n+"-"+e}).transition().attr("transform",function(e,n){return"translate("+(c(f(e,n))-k/t[0].values.length*.45)+",0)"}).attr("width",k/t[0].values.length*.9),W.transition().attr("y",function(t,e){var r=p(t,e)<0?d(0):d(0)-d(p(t,e))<1?d(0)-1:d(p(t,e));return n.utils.NaNtoZero(r)}).attr("height",function(t,e){return n.utils.NaNtoZero(Math.max(Math.abs(d(p(t,e))-d(0)),1))})}),t}var e,r,a,o,i={top:0,right:0,bottom:0,left:0},l=960,s=500,u=Math.floor(1e4*Math.random()),c=d3.scale.linear(),d=d3.scale.linear(),f=function(t){return t.x},p=function(t){return t.y},g=[],h=[0],m=!1,v=!0,y=n.utils.defaultColor(),x=d3.dispatch("chartClick","elementClick","elementDblClick","elementMouseover","elementMouseout"),b=!0;return t.highlightPoint=function(t,e){d3.select(".nv-historicalBar-"+u).select(".nv-bars .nv-bar-0-"+t).classed("hover",e)},t.clearHighlights=function(){d3.select(".nv-historicalBar-"+u).select(".nv-bars .nv-bar.hover").classed("hover",!1)},t.dispatch=x,t.options=n.utils.optionsFunc.bind(t),t.x=function(e){return arguments.length?(f=e,t):f},t.y=function(e){return arguments.length?(p=e,t):p},t.margin=function(e){return arguments.length?(i.top="undefined"!=typeof e.top?e.top:i.top,i.right="undefined"!=typeof e.right?e.right:i.right,i.bottom="undefined"!=typeof e.bottom?e.bottom:i.bottom,i.left="undefined"!=typeof e.left?e.left:i.left,t):i},t.width=function(e){return arguments.length?(l=e,t):l},t.height=function(e){return arguments.length?(s=e,t):s},t.xScale=function(e){return arguments.length?(c=e,t):c},t.yScale=function(e){return arguments.length?(d=e,t):d},t.xDomain=function(n){return arguments.length?(e=n,t):e},t.yDomain=function(e){return arguments.length?(r=e,t):r},t.xRange=function(e){return arguments.length?(a=e,t):a},t.yRange=function(e){return arguments.length?(o=e,t):o},t.forceX=function(e){return arguments.length?(g=e,t):g},t.forceY=function(e){return arguments.length?(h=e,t):h},t.padData=function(e){return arguments.length?(m=e,t):m},t.clipEdge=function(e){return arguments.length?(v=e,t):v},t.color=function(e){return arguments.length?(y=n.utils.getColor(e),t):y},t.id=function(e){return arguments.length?(u=e,t):u},t.interactive=function(){return arguments.length?(b=!1,t):b},t},n.models.bullet=function(){"use strict";function t(n){return n.each(function(t,n){{var r=f-e.left-e.right,g=p-e.top-e.bottom,v=d3.select(this),y=o.call(this,t,n).slice().sort(d3.descending),x=i.call(this,t,n).slice().sort(d3.descending),b=l.call(this,t,n).slice().sort(d3.descending),k=s.call(this,t,n).slice(),w=u.call(this,t,n).slice(),A=c.call(this,t,n).slice(),S=d3.scale.linear().domain(d3.extent(d3.merge([d,y]))).range(a?[r,0]:[0,r]);this.__chart__||d3.scale.linear().domain([0,1/0]).range(S.range())}this.__chart__=S;var M=d3.min(y),C=d3.max(y),D=y[1],I=v.selectAll("g.nv-wrap.nv-bullet").data([t]),W=I.enter().append("g").attr("class","nvd3 nv-wrap nv-bullet"),N=W.append("g"),z=I.select("g");N.append("rect").attr("class","nv-range nv-rangeMax"),N.append("rect").attr("class","nv-range nv-rangeAvg"),N.append("rect").attr("class","nv-range nv-rangeMin"),N.append("rect").attr("class","nv-measure"),N.append("path").attr("class","nv-markerTriangle"),I.attr("transform","translate("+e.left+","+e.top+")");var F=function(t){return Math.abs(S(t)-S(0))},L=function(t){return S(0>t?t:0)};z.select("rect.nv-rangeMax").attr("height",g).attr("width",F(C>0?C:M)).attr("x",L(C>0?C:M)).datum(C>0?C:M),z.select("rect.nv-rangeAvg").attr("height",g).attr("width",F(D)).attr("x",L(D)).datum(D),z.select("rect.nv-rangeMin").attr("height",g).attr("width",F(C)).attr("x",L(C)).attr("width",F(C>0?M:C)).attr("x",L(C>0?M:C)).datum(C>0?M:C),z.select("rect.nv-measure").style("fill",h).attr("height",g/3).attr("y",g/3).attr("width",0>b?S(0)-S(b[0]):S(b[0])-S(0)).attr("x",L(b)).on("mouseover",function(){m.elementMouseover({value:b[0],label:A[0]||"Current",pos:[S(b[0]),g/2]})}).on("mouseout",function(){m.elementMouseout({value:b[0],label:A[0]||"Current"})});var B=g/6;x[0]?z.selectAll("path.nv-markerTriangle").attr("transform",function(){return"translate("+S(x[0])+","+g/2+")"}).attr("d","M0,"+B+"L"+B+","+-B+" "+-B+","+-B+"Z").on("mouseover",function(){m.elementMouseover({value:x[0],label:w[0]||"Previous",pos:[S(x[0]),g/2]})}).on("mouseout",function(){m.elementMouseout({value:x[0],label:w[0]||"Previous"})}):z.selectAll("path.nv-markerTriangle").remove(),I.selectAll(".nv-range").on("mouseover",function(t,e){var n=k[e]||(e?1==e?"Mean":"Minimum":"Maximum");m.elementMouseover({value:t,label:n,pos:[S(t),g/2]})}).on("mouseout",function(t,e){var n=k[e]||(e?1==e?"Mean":"Minimum":"Maximum");m.elementMouseout({value:t,label:n})})}),t}var e={top:0,right:0,bottom:0,left:0},r="left",a=!1,o=function(t){return t.ranges},i=function(t){return t.markers},l=function(t){return t.measures},s=function(t){return t.rangeLabels?t.rangeLabels:[]},u=function(t){return t.markerLabels?t.markerLabels:[]},c=function(t){return t.measureLabels?t.measureLabels:[]},d=[0],f=380,p=30,g=null,h=n.utils.getColor(["#1f77b4"]),m=d3.dispatch("elementMouseover","elementMouseout");return t.dispatch=m,t.options=n.utils.optionsFunc.bind(t),t.orient=function(e){return arguments.length?(r=e,a="right"==r||"bottom"==r,t):r},t.ranges=function(e){return arguments.length?(o=e,t):o},t.markers=function(e){return arguments.length?(i=e,t):i},t.measures=function(e){return arguments.length?(l=e,t):l},t.forceX=function(e){return arguments.length?(d=e,t):d},t.width=function(e){return arguments.length?(f=e,t):f},t.height=function(e){return arguments.length?(p=e,t):p},t.margin=function(n){return arguments.length?(e.top="undefined"!=typeof n.top?n.top:e.top,e.right="undefined"!=typeof n.right?n.right:e.right,e.bottom="undefined"!=typeof n.bottom?n.bottom:e.bottom,e.left="undefined"!=typeof n.left?n.left:e.left,t):e},t.tickFormat=function(e){return arguments.length?(g=e,t):g},t.color=function(e){return arguments.length?(h=n.utils.getColor(e),t):h},t},n.models.bulletChart=function(){"use strict";function t(n){return n.each(function(r,p){var v=d3.select(this),y=(u||parseInt(v.style("width"))||960)-o.left-o.right,x=c-o.top-o.bottom,b=this;if(t.update=function(){t(n)},t.container=this,!r||!i.call(this,r,p)){var k=v.selectAll(".nv-noData").data([g]);return k.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),k.attr("x",o.left+y/2).attr("y",18+o.top+x/2).text(function(t){return t}),t}v.selectAll(".nv-noData").remove();var w=i.call(this,r,p).slice().sort(d3.descending),A=l.call(this,r,p).slice().sort(d3.descending),S=s.call(this,r,p).slice().sort(d3.descending),M=v.selectAll("g.nv-wrap.nv-bulletChart").data([r]),C=M.enter().append("g").attr("class","nvd3 nv-wrap nv-bulletChart"),D=C.append("g"),I=M.select("g");D.append("g").attr("class","nv-bulletWrap"),D.append("g").attr("class","nv-titles"),M.attr("transform","translate("+o.left+","+o.top+")");var W=d3.scale.linear().domain([0,Math.max(w[0],A[0],S[0])]).range(a?[y,0]:[0,y]),N=this.__chart__||d3.scale.linear().domain([0,1/0]).range(W.range());this.__chart__=W;var z=D.select(".nv-titles").append("g").attr("text-anchor","end").attr("transform","translate(-6,"+(c-o.top-o.bottom)/2+")");z.append("text").attr("class","nv-title").text(function(t){return t.title}),z.append("text").attr("class","nv-subtitle").attr("dy","1em").text(function(t){return t.subtitle}),e.width(y).height(x);var F=I.select(".nv-bulletWrap");d3.transition(F).call(e);var L=d||W.tickFormat(y/100),B=I.selectAll("g.nv-tick").data(W.ticks(y/50),function(t){return this.textContent||L(t)}),P=B.enter().append("g").attr("class","nv-tick").attr("transform",function(t){return"translate("+N(t)+",0)"}).style("opacity",1e-6);P.append("line").attr("y1",x).attr("y2",7*x/6),P.append("text").attr("text-anchor","middle").attr("dy","1em").attr("y",7*x/6).text(L);var H=d3.transition(B).attr("transform",function(t){return"translate("+W(t)+",0)"}).style("opacity",1);H.select("line").attr("y1",x).attr("y2",7*x/6),H.select("text").attr("y",7*x/6),d3.transition(B.exit()).attr("transform",function(t){return"translate("+W(t)+",0)"}).style("opacity",1e-6).remove(),h.on("tooltipShow",function(t){t.key=r.title,f&&m(t,b.parentNode)})}),d3.timer.flush(),t}var e=n.models.bullet(),r="left",a=!1,o={top:5,right:40,bottom:20,left:120},i=function(t){return t.ranges},l=function(t){return t.markers},s=function(t){return t.measures},u=null,c=55,d=null,f=!0,p=function(t,e,n){return"<h3>"+e+"</h3><p>"+n+"</p>"},g="No Data Available.",h=d3.dispatch("tooltipShow","tooltipHide"),m=function(e,r){var a=e.pos[0]+(r.offsetLeft||0)+o.left,i=e.pos[1]+(r.offsetTop||0)+o.top,l=p(e.key,e.label,e.value,e,t);n.tooltip.show([a,i],l,e.value<0?"e":"w",null,r)};return e.dispatch.on("elementMouseover.tooltip",function(t){h.tooltipShow(t)}),e.dispatch.on("elementMouseout.tooltip",function(t){h.tooltipHide(t)}),h.on("tooltipHide",function(){f&&n.tooltip.cleanup()}),t.dispatch=h,t.bullet=e,d3.rebind(t,e,"color"),t.options=n.utils.optionsFunc.bind(t),t.orient=function(e){return arguments.length?(r=e,a="right"==r||"bottom"==r,t):r},t.ranges=function(e){return arguments.length?(i=e,t):i},t.markers=function(e){return arguments.length?(l=e,t):l},t.measures=function(e){return arguments.length?(s=e,t):s},t.width=function(e){return arguments.length?(u=e,t):u},t.height=function(e){return arguments.length?(c=e,t):c},t.margin=function(e){return arguments.length?(o.top="undefined"!=typeof e.top?e.top:o.top,o.right="undefined"!=typeof e.right?e.right:o.right,o.bottom="undefined"!=typeof e.bottom?e.bottom:o.bottom,o.left="undefined"!=typeof e.left?e.left:o.left,t):o},t.tickFormat=function(e){return arguments.length?(d=e,t):d},t.tooltips=function(e){return arguments.length?(f=e,t):f},t.tooltipContent=function(e){return arguments.length?(p=e,t):p},t.noData=function(e){return arguments.length?(g=e,t):g},t},n.models.cumulativeLineChart=function(){"use strict";function t(A){return A.each(function(A){function z(){d3.select(t.container).style("cursor","ew-resize")}function P(){L.x=d3.event.x,L.i=Math.round(F.invert(L.x)),T()}function H(){d3.select(t.container).style("cursor","auto"),M.index=L.i,W.stateChange(M)}function T(){re.data([L]);var e=t.transitionDuration();t.transitionDuration(0),t.update(),t.transitionDuration(e)}var E=d3.select(this).classed("nv-chart-"+S,!0),Y=this,R=(p||parseInt(E.style("width"))||960)-d.left-d.right,V=(g||parseInt(E.style("height"))||400)-d.top-d.bottom;if(t.update=function(){E.transition().duration(N).call(t)},t.container=this,M.disabled=A.map(function(t){return!!t.disabled}),!C){var _;C={};for(_ in M)C[_]=M[_]instanceof Array?M[_].slice(0):M[_]}var X=d3.behavior.drag().on("dragstart",z).on("drag",P).on("dragend",H);if(!(A&&A.length&&A.filter(function(t){return t.values.length}).length)){var Z=E.selectAll(".nv-noData").data([D]);return Z.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),Z.attr("x",d.left+R/2).attr("y",d.top+V/2).text(function(t){return t}),t}if(E.selectAll(".nv-noData").remove(),r=o.xScale(),a=o.yScale(),w)o.yDomain(null);else{var G=A.filter(function(t){return!t.disabled}).map(function(t){var e=d3.extent(t.values,o.y());return e[0]<-.95&&(e[0]=-.95),[(e[0]-e[1])/(1+e[1]),(e[1]-e[0])/(1+e[0])]}),O=[d3.min(G,function(t){return t[0]}),d3.max(G,function(t){return t[1]})];o.yDomain(O)}F.domain([0,A[0].values.length-1]).range([0,R]).clamp(!0);var A=e(L.i,A),K=k?"none":"all",q=E.selectAll("g.nv-wrap.nv-cumulativeLine").data([A]),j=q.enter().append("g").attr("class","nvd3 nv-wrap nv-cumulativeLine").append("g"),U=q.select("g");
if(j.append("g").attr("class","nv-interactive"),j.append("g").attr("class","nv-x nv-axis").style("pointer-events","none"),j.append("g").attr("class","nv-y nv-axis"),j.append("g").attr("class","nv-background"),j.append("g").attr("class","nv-linesWrap").style("pointer-events",K),j.append("g").attr("class","nv-avgLinesWrap").style("pointer-events","none"),j.append("g").attr("class","nv-legendWrap"),j.append("g").attr("class","nv-controlsWrap"),h&&(s.width(R),U.select(".nv-legendWrap").datum(A).call(s),d.top!=s.height()&&(d.top=s.height(),V=(g||parseInt(E.style("height"))||400)-d.top-d.bottom),U.select(".nv-legendWrap").attr("transform","translate(0,"+-d.top+")")),b){var $=[{key:"Re-scale y-axis",disabled:!w}];u.width(140).color(["#444","#444","#444"]).rightAlign(!1).margin({top:5,right:0,bottom:5,left:20}),U.select(".nv-controlsWrap").datum($).attr("transform","translate(0,"+-d.top+")").call(u)}q.attr("transform","translate("+d.left+","+d.top+")"),y&&U.select(".nv-y.nv-axis").attr("transform","translate("+R+",0)");var J=A.filter(function(t){return t.tempDisabled});q.select(".tempDisabled").remove(),J.length&&q.append("text").attr("class","tempDisabled").attr("x",R/2).attr("y","-.71em").style("text-anchor","end").text(J.map(function(t){return t.key}).join(", ")+" values cannot be calculated for this time period."),k&&(c.width(R).height(V).margin({left:d.left,top:d.top}).svgContainer(E).xScale(r),q.select(".nv-interactive").call(c)),j.select(".nv-background").append("rect"),U.select(".nv-background rect").attr("width",R).attr("height",V),o.y(function(t){return t.display.y}).width(R).height(V).color(A.map(function(t,e){return t.color||f(t,e)}).filter(function(t,e){return!A[e].disabled&&!A[e].tempDisabled}));var Q=U.select(".nv-linesWrap").datum(A.filter(function(t){return!t.disabled&&!t.tempDisabled}));Q.call(o),A.forEach(function(t,e){t.seriesIndex=e});var te=A.filter(function(t){return!t.disabled&&!!I(t)}),ee=U.select(".nv-avgLinesWrap").selectAll("line").data(te,function(t){return t.key}),ne=function(t){var e=a(I(t));return 0>e?0:e>V?V:e};ee.enter().append("line").style("stroke-width",2).style("stroke-dasharray","10,10").style("stroke",function(t){return o.color()(t,t.seriesIndex)}).attr("x1",0).attr("x2",R).attr("y1",ne).attr("y2",ne),ee.style("stroke-opacity",function(t){var e=a(I(t));return 0>e||e>V?0:1}).attr("x1",0).attr("x2",R).attr("y1",ne).attr("y2",ne),ee.exit().remove();var re=Q.selectAll(".nv-indexLine").data([L]);re.enter().append("rect").attr("class","nv-indexLine").attr("width",3).attr("x",-2).attr("fill","red").attr("fill-opacity",.5).style("pointer-events","all").call(X),re.attr("transform",function(t){return"translate("+F(t.i)+",0)"}).attr("height",V),m&&(i.scale(r).ticks(Math.min(A[0].values.length,R/70)).tickSize(-V,0),U.select(".nv-x.nv-axis").attr("transform","translate(0,"+a.range()[0]+")"),d3.transition(U.select(".nv-x.nv-axis")).call(i)),v&&(l.scale(a).ticks(V/36).tickSize(-R,0),d3.transition(U.select(".nv-y.nv-axis")).call(l)),U.select(".nv-background rect").on("click",function(){L.x=d3.mouse(this)[0],L.i=Math.round(F.invert(L.x)),M.index=L.i,W.stateChange(M),T()}),o.dispatch.on("elementClick",function(t){L.i=t.pointIndex,L.x=F(L.i),M.index=L.i,W.stateChange(M),T()}),u.dispatch.on("legendClick",function(e){e.disabled=!e.disabled,w=!e.disabled,M.rescaleY=w,W.stateChange(M),t.update()}),s.dispatch.on("stateChange",function(e){M.disabled=e.disabled,W.stateChange(M),t.update()}),c.dispatch.on("elementMousemove",function(e){o.clearHighlights();var r,a,s,u=[];if(A.filter(function(t,e){return t.seriesIndex=e,!t.disabled}).forEach(function(i,l){a=n.interactiveBisect(i.values,e.pointXValue,t.x()),o.highlightPoint(l,a,!0);var c=i.values[a];"undefined"!=typeof c&&("undefined"==typeof r&&(r=c),"undefined"==typeof s&&(s=t.xScale()(t.x()(c,a))),u.push({key:i.key,value:t.y()(c,a),color:f(i,i.seriesIndex)}))}),u.length>2){var p=t.yScale().invert(e.mouseY),g=Math.abs(t.yScale().domain()[0]-t.yScale().domain()[1]),h=.03*g,m=n.nearestValueIndex(u.map(function(t){return t.value}),p,h);null!==m&&(u[m].highlight=!0)}var v=i.tickFormat()(t.x()(r,a),a);c.tooltip.position({left:s+d.left,top:e.mouseY+d.top}).chartContainer(Y.parentNode).enabled(x).valueFormatter(function(t){return l.tickFormat()(t)}).data({value:v,series:u})(),c.renderGuideLine(s)}),c.dispatch.on("elementMouseout",function(){W.tooltipHide(),o.clearHighlights()}),W.on("tooltipShow",function(t){x&&B(t,Y.parentNode)}),W.on("changeState",function(e){"undefined"!=typeof e.disabled&&(A.forEach(function(t,n){t.disabled=e.disabled[n]}),M.disabled=e.disabled),"undefined"!=typeof e.index&&(L.i=e.index,L.x=F(L.i),M.index=e.index,re.data([L])),"undefined"!=typeof e.rescaleY&&(w=e.rescaleY),t.update()})}),t}function e(t,e){return e.map(function(e){if(!e.values)return e;var n=e.values[t];if(null==n)return e;var r=o.y()(n,t);return-.95>r&&!z?(e.tempDisabled=!0,e):(e.tempDisabled=!1,e.values=e.values.map(function(t,e){return t.display={y:(o.y()(t,e)-r)/(1+r)},t}),e)})}var r,a,o=n.models.line(),i=n.models.axis(),l=n.models.axis(),s=n.models.legend(),u=n.models.legend(),c=n.interactiveGuideline(),d={top:30,right:30,bottom:50,left:60},f=n.utils.defaultColor(),p=null,g=null,h=!0,m=!0,v=!0,y=!1,x=!0,b=!0,k=!1,w=!0,A=function(t,e,n){return"<h3>"+t+"</h3><p>"+n+" at "+e+"</p>"},S=o.id(),M={index:0,rescaleY:w},C=null,D="No Data Available.",I=function(t){return t.average},W=d3.dispatch("tooltipShow","tooltipHide","stateChange","changeState"),N=250,z=!1;i.orient("bottom").tickPadding(7),l.orient(y?"right":"left"),u.updateState(!1);var F=d3.scale.linear(),L={i:0,x:0},B=function(e,r){var a=e.pos[0]+(r.offsetLeft||0),s=e.pos[1]+(r.offsetTop||0),u=i.tickFormat()(o.x()(e.point,e.pointIndex)),c=l.tickFormat()(o.y()(e.point,e.pointIndex)),d=A(e.series.key,u,c,e,t);n.tooltip.show([a,s],d,null,null,r)};return o.dispatch.on("elementMouseover.tooltip",function(t){t.pos=[t.pos[0]+d.left,t.pos[1]+d.top],W.tooltipShow(t)}),o.dispatch.on("elementMouseout.tooltip",function(t){W.tooltipHide(t)}),W.on("tooltipHide",function(){x&&n.tooltip.cleanup()}),t.dispatch=W,t.lines=o,t.legend=s,t.xAxis=i,t.yAxis=l,t.interactiveLayer=c,d3.rebind(t,o,"defined","isArea","x","y","xScale","yScale","size","xDomain","yDomain","xRange","yRange","forceX","forceY","interactive","clipEdge","clipVoronoi","useVoronoi","id"),t.options=n.utils.optionsFunc.bind(t),t.margin=function(e){return arguments.length?(d.top="undefined"!=typeof e.top?e.top:d.top,d.right="undefined"!=typeof e.right?e.right:d.right,d.bottom="undefined"!=typeof e.bottom?e.bottom:d.bottom,d.left="undefined"!=typeof e.left?e.left:d.left,t):d},t.width=function(e){return arguments.length?(p=e,t):p},t.height=function(e){return arguments.length?(g=e,t):g},t.color=function(e){return arguments.length?(f=n.utils.getColor(e),s.color(f),t):f},t.rescaleY=function(e){return arguments.length?(w=e,t):w},t.showControls=function(e){return arguments.length?(b=e,t):b},t.useInteractiveGuideline=function(e){return arguments.length?(k=e,e===!0&&(t.interactive(!1),t.useVoronoi(!1)),t):k},t.showLegend=function(e){return arguments.length?(h=e,t):h},t.showXAxis=function(e){return arguments.length?(m=e,t):m},t.showYAxis=function(e){return arguments.length?(v=e,t):v},t.rightAlignYAxis=function(e){return arguments.length?(y=e,l.orient(e?"right":"left"),t):y},t.tooltips=function(e){return arguments.length?(x=e,t):x},t.tooltipContent=function(e){return arguments.length?(A=e,t):A},t.state=function(e){return arguments.length?(M=e,t):M},t.defaultState=function(e){return arguments.length?(C=e,t):C},t.noData=function(e){return arguments.length?(D=e,t):D},t.average=function(e){return arguments.length?(I=e,t):I},t.transitionDuration=function(e){return arguments.length?(N=e,t):N},t.noErrorCheck=function(e){return arguments.length?(z=e,t):z},t},n.models.discreteBar=function(){"use strict";function t(n){return n.each(function(t){var n=u-s.left-s.right,d=c-s.top-s.bottom,w=d3.select(this);t.forEach(function(t,e){t.values.forEach(function(t){t.series=e})});var A=e&&r?[]:t.map(function(t){return t.values.map(function(t,e){return{x:g(t,e),y:h(t,e),y0:t.y0}})});f.domain(e||d3.merge(A).map(function(t){return t.x})).rangeBands(a||[0,n],.1),p.domain(r||d3.extent(d3.merge(A).map(function(t){return t.y}).concat(m))),p.range(y?o||[d-(p.domain()[0]<0?12:0),p.domain()[1]>0?12:0]:o||[d,0]),i=i||f,l=l||p.copy().range([p(0),p(0)]);{var S=w.selectAll("g.nv-wrap.nv-discretebar").data([t]),M=S.enter().append("g").attr("class","nvd3 nv-wrap nv-discretebar"),C=M.append("g");S.select("g")}C.append("g").attr("class","nv-groups"),S.attr("transform","translate("+s.left+","+s.top+")");var D=S.select(".nv-groups").selectAll(".nv-group").data(function(t){return t},function(t){return t.key});D.enter().append("g").style("stroke-opacity",1e-6).style("fill-opacity",1e-6),D.exit().transition().style("stroke-opacity",1e-6).style("fill-opacity",1e-6).remove(),D.attr("class",function(t,e){return"nv-group nv-series-"+e}).classed("hover",function(t){return t.hover}),D.transition().style("stroke-opacity",1).style("fill-opacity",.75);var I=D.selectAll("g.nv-bar").data(function(t){return t.values});I.exit().remove();var W=I.enter().append("g").attr("transform",function(t,e){return"translate("+(f(g(t,e))+.05*f.rangeBand())+", "+p(0)+")"}).on("mouseover",function(e,n){d3.select(this).classed("hover",!0),b.elementMouseover({value:h(e,n),point:e,series:t[e.series],pos:[f(g(e,n))+f.rangeBand()*(e.series+.5)/t.length,p(h(e,n))],pointIndex:n,seriesIndex:e.series,e:d3.event})}).on("mouseout",function(e,n){d3.select(this).classed("hover",!1),b.elementMouseout({value:h(e,n),point:e,series:t[e.series],pointIndex:n,seriesIndex:e.series,e:d3.event})}).on("click",function(e,n){b.elementClick({value:h(e,n),point:e,series:t[e.series],pos:[f(g(e,n))+f.rangeBand()*(e.series+.5)/t.length,p(h(e,n))],pointIndex:n,seriesIndex:e.series,e:d3.event}),d3.event.stopPropagation()}).on("dblclick",function(e,n){b.elementDblClick({value:h(e,n),point:e,series:t[e.series],pos:[f(g(e,n))+f.rangeBand()*(e.series+.5)/t.length,p(h(e,n))],pointIndex:n,seriesIndex:e.series,e:d3.event}),d3.event.stopPropagation()});W.append("rect").attr("height",0).attr("width",.9*f.rangeBand()/t.length),y?(W.append("text").attr("text-anchor","middle"),I.select("text").text(function(t,e){return x(h(t,e))}).transition().attr("x",.9*f.rangeBand()/2).attr("y",function(t,e){return h(t,e)<0?p(h(t,e))-p(0)+12:-4})):I.selectAll("text").remove(),I.attr("class",function(t,e){return h(t,e)<0?"nv-bar negative":"nv-bar positive"}).style("fill",function(t,e){return t.color||v(t,e)}).style("stroke",function(t,e){return t.color||v(t,e)}).select("rect").attr("class",k).transition().attr("width",.9*f.rangeBand()/t.length),I.transition().attr("transform",function(t,e){var n=f(g(t,e))+.05*f.rangeBand(),r=h(t,e)<0?p(0):p(0)-p(h(t,e))<1?p(0)-1:p(h(t,e));return"translate("+n+", "+r+")"}).select("rect").attr("height",function(t,e){return Math.max(Math.abs(p(h(t,e))-p(r&&r[0]||0))||1)}),i=f.copy(),l=p.copy()}),t}var e,r,a,o,i,l,s={top:0,right:0,bottom:0,left:0},u=960,c=500,d=Math.floor(1e4*Math.random()),f=d3.scale.ordinal(),p=d3.scale.linear(),g=function(t){return t.x},h=function(t){return t.y},m=[0],v=n.utils.defaultColor(),y=!1,x=d3.format(",.2f"),b=d3.dispatch("chartClick","elementClick","elementDblClick","elementMouseover","elementMouseout"),k="discreteBar";return t.dispatch=b,t.options=n.utils.optionsFunc.bind(t),t.x=function(e){return arguments.length?(g=e,t):g},t.y=function(e){return arguments.length?(h=e,t):h},t.margin=function(e){return arguments.length?(s.top="undefined"!=typeof e.top?e.top:s.top,s.right="undefined"!=typeof e.right?e.right:s.right,s.bottom="undefined"!=typeof e.bottom?e.bottom:s.bottom,s.left="undefined"!=typeof e.left?e.left:s.left,t):s},t.width=function(e){return arguments.length?(u=e,t):u},t.height=function(e){return arguments.length?(c=e,t):c},t.xScale=function(e){return arguments.length?(f=e,t):f},t.yScale=function(e){return arguments.length?(p=e,t):p},t.xDomain=function(n){return arguments.length?(e=n,t):e},t.yDomain=function(e){return arguments.length?(r=e,t):r},t.xRange=function(e){return arguments.length?(a=e,t):a},t.yRange=function(e){return arguments.length?(o=e,t):o},t.forceY=function(e){return arguments.length?(m=e,t):m},t.color=function(e){return arguments.length?(v=n.utils.getColor(e),t):v},t.id=function(e){return arguments.length?(d=e,t):d},t.showValues=function(e){return arguments.length?(y=e,t):y},t.valueFormat=function(e){return arguments.length?(x=e,t):x},t.rectClass=function(e){return arguments.length?(k=e,t):k},t},n.models.discreteBarChart=function(){"use strict";function t(n){return n.each(function(n){var c=d3.select(this),m=this,k=(s||parseInt(c.style("width"))||960)-l.left-l.right,w=(u||parseInt(c.style("height"))||400)-l.top-l.bottom;if(t.update=function(){y.beforeUpdate(),c.transition().duration(x).call(t)},t.container=this,!(n&&n.length&&n.filter(function(t){return t.values.length}).length)){var A=c.selectAll(".nv-noData").data([v]);return A.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),A.attr("x",l.left+k/2).attr("y",l.top+w/2).text(function(t){return t}),t}c.selectAll(".nv-noData").remove(),e=a.xScale(),r=a.yScale().clamp(!0);var S=c.selectAll("g.nv-wrap.nv-discreteBarWithAxes").data([n]),M=S.enter().append("g").attr("class","nvd3 nv-wrap nv-discreteBarWithAxes").append("g"),C=M.append("defs"),D=S.select("g");M.append("g").attr("class","nv-x nv-axis"),M.append("g").attr("class","nv-y nv-axis").append("g").attr("class","nv-zeroLine").append("line"),M.append("g").attr("class","nv-barsWrap"),D.attr("transform","translate("+l.left+","+l.top+")"),p&&D.select(".nv-y.nv-axis").attr("transform","translate("+k+",0)"),a.width(k).height(w);var I=D.select(".nv-barsWrap").datum(n.filter(function(t){return!t.disabled}));if(I.transition().call(a),C.append("clipPath").attr("id","nv-x-label-clip-"+a.id()).append("rect"),D.select("#nv-x-label-clip-"+a.id()+" rect").attr("width",e.rangeBand()*(g?2:1)).attr("height",16).attr("x",-e.rangeBand()/(g?1:2)),d){o.scale(e).ticks(k/100).tickSize(-w,0),D.select(".nv-x.nv-axis").attr("transform","translate(0,"+(r.range()[0]+(a.showValues()&&r.domain()[0]<0?16:0))+")"),D.select(".nv-x.nv-axis").transition().call(o);var W=D.select(".nv-x.nv-axis").selectAll("g");g&&W.selectAll("text").attr("transform",function(t,e,n){return"translate(0,"+(n%2==0?"5":"17")+")"})}f&&(i.scale(r).ticks(w/36).tickSize(-k,0),D.select(".nv-y.nv-axis").transition().call(i)),D.select(".nv-zeroLine line").attr("x1",0).attr("x2",k).attr("y1",r(0)).attr("y2",r(0)),y.on("tooltipShow",function(t){h&&b(t,m.parentNode)})}),t}var e,r,a=n.models.discreteBar(),o=n.models.axis(),i=n.models.axis(),l={top:15,right:10,bottom:50,left:60},s=null,u=null,c=n.utils.getColor(),d=!0,f=!0,p=!1,g=!1,h=!0,m=function(t,e,n){return"<h3>"+e+"</h3><p>"+n+"</p>"},v="No Data Available.",y=d3.dispatch("tooltipShow","tooltipHide","beforeUpdate"),x=250;o.orient("bottom").highlightZero(!1).showMaxMin(!1).tickFormat(function(t){return t}),i.orient(p?"right":"left").tickFormat(d3.format(",.1f"));var b=function(e,r){var l=e.pos[0]+(r.offsetLeft||0),s=e.pos[1]+(r.offsetTop||0),u=o.tickFormat()(a.x()(e.point,e.pointIndex)),c=i.tickFormat()(a.y()(e.point,e.pointIndex)),d=m(e.series.key,u,c,e,t);n.tooltip.show([l,s],d,e.value<0?"n":"s",null,r)};return a.dispatch.on("elementMouseover.tooltip",function(t){t.pos=[t.pos[0]+l.left,t.pos[1]+l.top],y.tooltipShow(t)}),a.dispatch.on("elementMouseout.tooltip",function(t){y.tooltipHide(t)}),y.on("tooltipHide",function(){h&&n.tooltip.cleanup()}),t.dispatch=y,t.discretebar=a,t.xAxis=o,t.yAxis=i,d3.rebind(t,a,"x","y","xDomain","yDomain","xRange","yRange","forceX","forceY","id","showValues","valueFormat"),t.options=n.utils.optionsFunc.bind(t),t.margin=function(e){return arguments.length?(l.top="undefined"!=typeof e.top?e.top:l.top,l.right="undefined"!=typeof e.right?e.right:l.right,l.bottom="undefined"!=typeof e.bottom?e.bottom:l.bottom,l.left="undefined"!=typeof e.left?e.left:l.left,t):l},t.width=function(e){return arguments.length?(s=e,t):s},t.height=function(e){return arguments.length?(u=e,t):u},t.color=function(e){return arguments.length?(c=n.utils.getColor(e),a.color(c),t):c},t.showXAxis=function(e){return arguments.length?(d=e,t):d},t.showYAxis=function(e){return arguments.length?(f=e,t):f},t.rightAlignYAxis=function(e){return arguments.length?(p=e,i.orient(e?"right":"left"),t):p},t.staggerLabels=function(e){return arguments.length?(g=e,t):g},t.tooltips=function(e){return arguments.length?(h=e,t):h},t.tooltipContent=function(e){return arguments.length?(m=e,t):m},t.noData=function(e){return arguments.length?(v=e,t):v},t.transitionDuration=function(e){return arguments.length?(x=e,t):x},t},n.models.distribution=function(){"use strict";function t(n){return n.each(function(t){var n=(a-("x"===i?r.left+r.right:r.top+r.bottom),"x"==i?"y":"x"),c=d3.select(this);e=e||u;var d=c.selectAll("g.nv-distribution").data([t]),f=d.enter().append("g").attr("class","nvd3 nv-distribution"),p=(f.append("g"),d.select("g"));d.attr("transform","translate("+r.left+","+r.top+")");var g=p.selectAll("g.nv-dist").data(function(t){return t},function(t){return t.key});g.enter().append("g"),g.attr("class",function(t,e){return"nv-dist nv-series-"+e}).style("stroke",function(t,e){return s(t,e)});var h=g.selectAll("line.nv-dist"+i).data(function(t){return t.values});h.enter().append("line").attr(i+"1",function(t,n){return e(l(t,n))}).attr(i+"2",function(t,n){return e(l(t,n))}),g.exit().selectAll("line.nv-dist"+i).transition().attr(i+"1",function(t,e){return u(l(t,e))}).attr(i+"2",function(t,e){return u(l(t,e))}).style("stroke-opacity",0).remove(),h.attr("class",function(t,e){return"nv-dist"+i+" nv-dist"+i+"-"+e}).attr(n+"1",0).attr(n+"2",o),h.transition().attr(i+"1",function(t,e){return u(l(t,e))}).attr(i+"2",function(t,e){return u(l(t,e))}),e=u.copy()}),t}var e,r={top:0,right:0,bottom:0,left:0},a=400,o=8,i="x",l=function(t){return t[i]},s=n.utils.defaultColor(),u=d3.scale.linear();return t.options=n.utils.optionsFunc.bind(t),t.margin=function(e){return arguments.length?(r.top="undefined"!=typeof e.top?e.top:r.top,r.right="undefined"!=typeof e.right?e.right:r.right,r.bottom="undefined"!=typeof e.bottom?e.bottom:r.bottom,r.left="undefined"!=typeof e.left?e.left:r.left,t):r},t.width=function(e){return arguments.length?(a=e,t):a},t.axis=function(e){return arguments.length?(i=e,t):i},t.size=function(e){return arguments.length?(o=e,t):o},t.getData=function(e){return arguments.length?(l=d3.functor(e),t):l},t.scale=function(e){return arguments.length?(u=e,t):u},t.color=function(e){return arguments.length?(s=n.utils.getColor(e),t):s},t},n.models.historicalBarChart=function(){"use strict";function t(n){return n.each(function(v){var S=d3.select(this),M=this,C=(c||parseInt(S.style("width"))||960)-s.left-s.right,D=(d||parseInt(S.style("height"))||400)-s.top-s.bottom;if(t.update=function(){S.transition().duration(w).call(t)},t.container=this,y.disabled=v.map(function(t){return!!t.disabled}),!x){var I;x={};for(I in y)x[I]=y[I]instanceof Array?y[I].slice(0):y[I]}if(!(v&&v.length&&v.filter(function(t){return t.values.length}).length)){var W=S.selectAll(".nv-noData").data([b]);return W.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),W.attr("x",s.left+C/2).attr("y",s.top+D/2).text(function(t){return t}),t}S.selectAll(".nv-noData").remove(),e=a.xScale(),r=a.yScale();var N=S.selectAll("g.nv-wrap.nv-historicalBarChart").data([v]),z=N.enter().append("g").attr("class","nvd3 nv-wrap nv-historicalBarChart").append("g"),F=N.select("g");z.append("g").attr("class","nv-x nv-axis"),z.append("g").attr("class","nv-y nv-axis"),z.append("g").attr("class","nv-barsWrap"),z.append("g").attr("class","nv-legendWrap"),f&&(l.width(C),F.select(".nv-legendWrap").datum(v).call(l),s.top!=l.height()&&(s.top=l.height(),D=(d||parseInt(S.style("height"))||400)-s.top-s.bottom),N.select(".nv-legendWrap").attr("transform","translate(0,"+-s.top+")")),N.attr("transform","translate("+s.left+","+s.top+")"),h&&F.select(".nv-y.nv-axis").attr("transform","translate("+C+",0)"),a.width(C).height(D).color(v.map(function(t,e){return t.color||u(t,e)}).filter(function(t,e){return!v[e].disabled}));var L=F.select(".nv-barsWrap").datum(v.filter(function(t){return!t.disabled}));L.transition().call(a),p&&(o.scale(e).tickSize(-D,0),F.select(".nv-x.nv-axis").attr("transform","translate(0,"+r.range()[0]+")"),F.select(".nv-x.nv-axis").transition().call(o)),g&&(i.scale(r).ticks(D/36).tickSize(-C,0),F.select(".nv-y.nv-axis").transition().call(i)),l.dispatch.on("legendClick",function(e){e.disabled=!e.disabled,v.filter(function(t){return!t.disabled}).length||v.map(function(t){return t.disabled=!1,N.selectAll(".nv-series").classed("disabled",!1),t}),y.disabled=v.map(function(t){return!!t.disabled}),k.stateChange(y),n.transition().call(t)}),l.dispatch.on("legendDblclick",function(e){v.forEach(function(t){t.disabled=!0}),e.disabled=!1,y.disabled=v.map(function(t){return!!t.disabled}),k.stateChange(y),t.update()}),k.on("tooltipShow",function(t){m&&A(t,M.parentNode)}),k.on("changeState",function(e){"undefined"!=typeof e.disabled&&(v.forEach(function(t,n){t.disabled=e.disabled[n]}),y.disabled=e.disabled),t.update()})}),t}var e,r,a=n.models.historicalBar(),o=n.models.axis(),i=n.models.axis(),l=n.models.legend(),s={top:30,right:90,bottom:50,left:90},u=n.utils.defaultColor(),c=null,d=null,f=!1,p=!0,g=!0,h=!1,m=!0,v=function(t,e,n){return"<h3>"+t+"</h3><p>"+n+" at "+e+"</p>"},y={},x=null,b="No Data Available.",k=d3.dispatch("tooltipShow","tooltipHide","stateChange","changeState"),w=250;o.orient("bottom").tickPadding(7),i.orient(h?"right":"left");var A=function(e,r){if(r){var l=d3.select(r).select("svg"),s=l.node()?l.attr("viewBox"):null;if(s){s=s.split(" ");var u=parseInt(l.style("width"))/s[2];e.pos[0]=e.pos[0]*u,e.pos[1]=e.pos[1]*u}}var c=e.pos[0]+(r.offsetLeft||0),d=e.pos[1]+(r.offsetTop||0),f=o.tickFormat()(a.x()(e.point,e.pointIndex)),p=i.tickFormat()(a.y()(e.point,e.pointIndex)),g=v(e.series.key,f,p,e,t);n.tooltip.show([c,d],g,null,null,r)};return a.dispatch.on("elementMouseover.tooltip",function(t){t.pos=[t.pos[0]+s.left,t.pos[1]+s.top],k.tooltipShow(t)}),a.dispatch.on("elementMouseout.tooltip",function(t){k.tooltipHide(t)}),k.on("tooltipHide",function(){m&&n.tooltip.cleanup()}),t.dispatch=k,t.bars=a,t.legend=l,t.xAxis=o,t.yAxis=i,d3.rebind(t,a,"defined","isArea","x","y","size","xScale","yScale","xDomain","yDomain","xRange","yRange","forceX","forceY","interactive","clipEdge","clipVoronoi","id","interpolate","highlightPoint","clearHighlights","interactive"),t.options=n.utils.optionsFunc.bind(t),t.margin=function(e){return arguments.length?(s.top="undefined"!=typeof e.top?e.top:s.top,s.right="undefined"!=typeof e.right?e.right:s.right,s.bottom="undefined"!=typeof e.bottom?e.bottom:s.bottom,s.left="undefined"!=typeof e.left?e.left:s.left,t):s},t.width=function(e){return arguments.length?(c=e,t):c},t.height=function(e){return arguments.length?(d=e,t):d},t.color=function(e){return arguments.length?(u=n.utils.getColor(e),l.color(u),t):u},t.showLegend=function(e){return arguments.length?(f=e,t):f},t.showXAxis=function(e){return arguments.length?(p=e,t):p},t.showYAxis=function(e){return arguments.length?(g=e,t):g},t.rightAlignYAxis=function(e){return arguments.length?(h=e,i.orient(e?"right":"left"),t):h},t.tooltips=function(e){return arguments.length?(m=e,t):m},t.tooltipContent=function(e){return arguments.length?(v=e,t):v},t.state=function(e){return arguments.length?(y=e,t):y},t.defaultState=function(e){return arguments.length?(x=e,t):x},t.noData=function(e){return arguments.length?(b=e,t):b},t.transitionDuration=function(e){return arguments.length?(w=e,t):w},t},n.models.indentedTree=function(){"use strict";function t(e){return e.each(function(e){function n(e,r,a){return d3.event.stopPropagation(),d3.event.shiftKey&&!a?(d3.event.shiftKey=!1,e.values&&e.values.forEach(function(t){(t.values||t._values)&&n(t,0,!0)}),!0):i(e)?(e.values?(e._values=e.values,e.values=null):(e.values=e._values,e._values=null),void t.update()):!0}function r(t){return t._values&&t._values.length?p:t.values&&t.values.length?g:""}function o(t){return t._values&&t._values.length}function i(t){var e=t.values||t._values;return e&&e.length}var y=1,x=d3.select(this),b=d3.layout.tree().children(function(t){return t.values}).size([a,c]);t.update=function(){x.transition().duration(600).call(t)},e[0]||(e[0]={key:u});var k=b.nodes(e[0]),w=d3.select(this).selectAll("div").data([[k]]),A=w.enter().append("div").attr("class","nvd3 nv-wrap nv-indentedtree"),S=A.append("table"),M=w.select("table").attr("width","100%").attr("class",f);if(l){var C=S.append("thead"),D=C.append("tr");d.forEach(function(t){D.append("th").attr("width",t.width?t.width:"10%").style("text-align","numeric"==t.type?"right":"left").append("span").text(t.label)})}var I=M.selectAll("tbody").data(function(t){return t});I.enter().append("tbody"),y=d3.max(k,function(t){return t.depth}),b.size([a,y*c]);var W=I.selectAll("tr").data(function(t){return t.filter(function(t){return s&&!t.children?s(t):!0})},function(t){return t.id||t.id||++v});W.exit().remove(),W.select("img.nv-treeicon").attr("src",r).classed("folded",o);var N=W.enter().append("tr");d.forEach(function(t,e){var a=N.append("td").style("padding-left",function(t){return(e?0:t.depth*c+12+(r(t)?0:16))+"px"},"important").style("text-align","numeric"==t.type?"right":"left");0==e&&a.append("img").classed("nv-treeicon",!0).classed("nv-folded",o).attr("src",r).style("width","14px").style("height","14px").style("padding","0 1px").style("display",function(t){return r(t)?"inline-block":"none"}).on("click",n),a.each(function(n){!e&&m(n)?d3.select(this).append("a").attr("href",m).attr("class",d3.functor(t.classes)).append("span"):d3.select(this).append("span"),d3.select(this).select("span").attr("class",d3.functor(t.classes)).text(function(e){return t.format?e[t.key]?t.format(e[t.key]):"-":e[t.key]||"-"})}),t.showCount&&(a.append("span").attr("class","nv-childrenCount"),W.selectAll("span.nv-childrenCount").text(function(t){return t.values&&t.values.length||t._values&&t._values.length?"("+(t.values&&t.values.filter(function(t){return s?s(t):!0}).length||t._values&&t._values.filter(function(t){return s?s(t):!0}).length||0)+")":""}))}),W.order().on("click",function(t){h.elementClick({row:this,data:t,pos:[t.x,t.y]})}).on("dblclick",function(t){h.elementDblclick({row:this,data:t,pos:[t.x,t.y]})}).on("mouseover",function(t){h.elementMouseover({row:this,data:t,pos:[t.x,t.y]})}).on("mouseout",function(t){h.elementMouseout({row:this,data:t,pos:[t.x,t.y]})})}),t}var e={top:0,right:0,bottom:0,left:0},r=960,a=500,o=n.utils.defaultColor(),i=Math.floor(1e4*Math.random()),l=!0,s=!1,u="No Data Available.",c=20,d=[{key:"key",label:"Name",type:"text"}],f=null,p="images/grey-plus.png",g="images/grey-minus.png",h=d3.dispatch("elementClick","elementDblclick","elementMouseover","elementMouseout"),m=function(t){return t.url},v=0;return t.options=n.utils.optionsFunc.bind(t),t.margin=function(n){return arguments.length?(e.top="undefined"!=typeof n.top?n.top:e.top,e.right="undefined"!=typeof n.right?n.right:e.right,e.bottom="undefined"!=typeof n.bottom?n.bottom:e.bottom,e.left="undefined"!=typeof n.left?n.left:e.left,t):e},t.width=function(e){return arguments.length?(r=e,t):r},t.height=function(e){return arguments.length?(a=e,t):a},t.color=function(e){return arguments.length?(o=n.utils.getColor(e),scatter.color(o),t):o},t.id=function(e){return arguments.length?(i=e,t):i},t.header=function(e){return arguments.length?(l=e,t):l},t.noData=function(e){return arguments.length?(u=e,t):u},t.filterZero=function(e){return arguments.length?(s=e,t):s},t.columns=function(e){return arguments.length?(d=e,t):d},t.tableClass=function(e){return arguments.length?(f=e,t):f},t.iconOpen=function(e){return arguments.length?(p=e,t):p},t.iconClose=function(e){return arguments.length?(g=e,t):g},t.getUrl=function(e){return arguments.length?(m=e,t):m},t},n.models.legend=function(){"use strict";function t(f){return f.each(function(t){var f=r-e.left-e.right,p=d3.select(this),g=p.selectAll("g.nv-legend").data([t]),h=(g.enter().append("g").attr("class","nvd3 nv-legend").append("g"),g.select("g"));g.attr("transform","translate("+e.left+","+e.top+")");var m=h.selectAll(".nv-series").data(function(t){return t}),v=m.enter().append("g").attr("class","nv-series").on("mouseover",function(t,e){d.legendMouseover(t,e)}).on("mouseout",function(t,e){d.legendMouseout(t,e)}).on("click",function(e,n){d.legendClick(e,n),u&&(c?(t.forEach(function(t){t.disabled=!0}),e.disabled=!1):(e.disabled=!e.disabled,t.every(function(t){return t.disabled})&&t.forEach(function(t){t.disabled=!1})),d.stateChange({disabled:t.map(function(t){return!!t.disabled})}))}).on("dblclick",function(e,n){d.legendDblclick(e,n),u&&(t.forEach(function(t){t.disabled=!0}),e.disabled=!1,d.stateChange({disabled:t.map(function(t){return!!t.disabled})}))});if(v.append("circle").style("stroke-width",2).attr("class","nv-legend-symbol").attr("r",5),v.append("text").attr("text-anchor","start").attr("class","nv-legend-text").attr("dy",".32em").attr("dx","8"),m.classed("disabled",function(t){return t.disabled}),m.exit().remove(),m.select("circle").style("fill",function(t,e){return t.color||i(t,e)}).style("stroke",function(t,e){return t.color||i(t,e)}),m.select("text").text(o),l){var y=[];m.each(function(){var t,e=d3.select(this).select("text");try{if(t=e.getComputedTextLength(),0>=t)throw Error()}catch(r){t=n.utils.calcApproxTextWidth(e)}y.push(t+28)});for(var x=0,b=0,k=[];f>b&&x<y.length;)k[x]=y[x],b+=y[x++];for(0===x&&(x=1);b>f&&x>1;){k=[],x--;for(var w=0;w<y.length;w++)y[w]>(k[w%x]||0)&&(k[w%x]=y[w]);b=k.reduce(function(t,e){return t+e})}for(var A=[],S=0,M=0;x>S;S++)A[S]=M,M+=k[S];m.attr("transform",function(t,e){return"translate("+A[e%x]+","+(5+20*Math.floor(e/x))+")"}),s?h.attr("transform","translate("+(r-e.right-b)+","+e.top+")"):h.attr("transform","translate(0,"+e.top+")"),a=e.top+e.bottom+20*Math.ceil(y.length/x)}else{var C,D=5,I=5,W=0;m.attr("transform",function(){var t=d3.select(this).select("text").node().getComputedTextLength()+28;return C=I,r<e.left+e.right+C+t&&(I=C=5,D+=20),I+=t,I>W&&(W=I),"translate("+C+","+D+")"}),h.attr("transform","translate("+(r-e.right-W)+","+e.top+")"),a=e.top+e.bottom+D+15}}),t}var e={top:5,right:0,bottom:5,left:0},r=400,a=20,o=function(t){return t.key},i=n.utils.defaultColor(),l=!0,s=!0,u=!0,c=!1,d=d3.dispatch("legendClick","legendDblclick","legendMouseover","legendMouseout","stateChange");return t.dispatch=d,t.options=n.utils.optionsFunc.bind(t),t.margin=function(n){return arguments.length?(e.top="undefined"!=typeof n.top?n.top:e.top,e.right="undefined"!=typeof n.right?n.right:e.right,e.bottom="undefined"!=typeof n.bottom?n.bottom:e.bottom,e.left="undefined"!=typeof n.left?n.left:e.left,t):e},t.width=function(e){return arguments.length?(r=e,t):r},t.height=function(e){return arguments.length?(a=e,t):a},t.key=function(e){return arguments.length?(o=e,t):o},t.color=function(e){return arguments.length?(i=n.utils.getColor(e),t):i},t.align=function(e){return arguments.length?(l=e,t):l},t.rightAlign=function(e){return arguments.length?(s=e,t):s},t.updateState=function(e){return arguments.length?(u=e,t):u},t.radioButtonMode=function(e){return arguments.length?(c=e,t):c},t},n.models.line=function(){"use strict";function t(v){return v.each(function(t){var v=i-o.left-o.right,y=l-o.top-o.bottom,x=d3.select(this);e=a.xScale(),r=a.yScale(),h=h||e,m=m||r;var b=x.selectAll("g.nv-wrap.nv-line").data([t]),k=b.enter().append("g").attr("class","nvd3 nv-wrap nv-line"),w=k.append("defs"),A=k.append("g"),S=b.select("g");A.append("g").attr("class","nv-groups"),A.append("g").attr("class","nv-scatterWrap"),b.attr("transform","translate("+o.left+","+o.top+")"),a.width(v).height(y);
var M=b.select(".nv-scatterWrap");M.transition().call(a),w.append("clipPath").attr("id","nv-edge-clip-"+a.id()).append("rect"),b.select("#nv-edge-clip-"+a.id()+" rect").attr("width",v).attr("height",y>0?y:0),S.attr("clip-path",p?"url(#nv-edge-clip-"+a.id()+")":""),M.attr("clip-path",p?"url(#nv-edge-clip-"+a.id()+")":"");var C=b.select(".nv-groups").selectAll(".nv-group").data(function(t){return t},function(t){return t.key});C.enter().append("g").style("stroke-opacity",1e-6).style("fill-opacity",1e-6),C.exit().remove(),C.attr("class",function(t,e){return"nv-group nv-series-"+e}).classed("hover",function(t){return t.hover}).style("fill",function(t,e){return s(t,e)}).style("stroke",function(t,e){return s(t,e)}),C.transition().style("stroke-opacity",1).style("fill-opacity",.5);var D=C.selectAll("path.nv-area").data(function(t){return f(t)?[t]:[]});D.enter().append("path").attr("class","nv-area").attr("d",function(t){return d3.svg.area().interpolate(g).defined(d).x(function(t,e){return n.utils.NaNtoZero(h(u(t,e)))}).y0(function(t,e){return n.utils.NaNtoZero(m(c(t,e)))}).y1(function(){return m(r.domain()[0]<=0?r.domain()[1]>=0?0:r.domain()[1]:r.domain()[0])}).apply(this,[t.values])}),C.exit().selectAll("path.nv-area").remove(),D.transition().attr("d",function(t){return d3.svg.area().interpolate(g).defined(d).x(function(t,r){return n.utils.NaNtoZero(e(u(t,r)))}).y0(function(t,e){return n.utils.NaNtoZero(r(c(t,e)))}).y1(function(){return r(r.domain()[0]<=0?r.domain()[1]>=0?0:r.domain()[1]:r.domain()[0])}).apply(this,[t.values])});var I=C.selectAll("path.nv-line").data(function(t){return[t.values]});I.enter().append("path").attr("class","nv-line").attr("d",d3.svg.line().interpolate(g).defined(d).x(function(t,e){return n.utils.NaNtoZero(h(u(t,e)))}).y(function(t,e){return n.utils.NaNtoZero(m(c(t,e)))})),I.transition().attr("d",d3.svg.line().interpolate(g).defined(d).x(function(t,r){return n.utils.NaNtoZero(e(u(t,r)))}).y(function(t,e){return n.utils.NaNtoZero(r(c(t,e)))})),h=e.copy(),m=r.copy()}),t}var e,r,a=n.models.scatter(),o={top:0,right:0,bottom:0,left:0},i=960,l=500,s=n.utils.defaultColor(),u=function(t){return t.x},c=function(t){return t.y},d=function(t,e){return!isNaN(c(t,e))&&null!==c(t,e)},f=function(t){return t.area},p=!1,g="linear";a.size(16).sizeDomain([16,256]);var h,m;return t.dispatch=a.dispatch,t.scatter=a,d3.rebind(t,a,"id","interactive","size","xScale","yScale","zScale","xDomain","yDomain","xRange","yRange","sizeDomain","forceX","forceY","forceSize","clipVoronoi","useVoronoi","clipRadius","padData","highlightPoint","clearHighlights"),t.options=n.utils.optionsFunc.bind(t),t.margin=function(e){return arguments.length?(o.top="undefined"!=typeof e.top?e.top:o.top,o.right="undefined"!=typeof e.right?e.right:o.right,o.bottom="undefined"!=typeof e.bottom?e.bottom:o.bottom,o.left="undefined"!=typeof e.left?e.left:o.left,t):o},t.width=function(e){return arguments.length?(i=e,t):i},t.height=function(e){return arguments.length?(l=e,t):l},t.x=function(e){return arguments.length?(u=e,a.x(e),t):u},t.y=function(e){return arguments.length?(c=e,a.y(e),t):c},t.clipEdge=function(e){return arguments.length?(p=e,t):p},t.color=function(e){return arguments.length?(s=n.utils.getColor(e),a.color(s),t):s},t.interpolate=function(e){return arguments.length?(g=e,t):g},t.defined=function(e){return arguments.length?(d=e,t):d},t.isArea=function(e){return arguments.length?(f=d3.functor(e),t):f},t},n.models.lineChart=function(){"use strict";function t(x){return x.each(function(x){var C=d3.select(this),D=this,I=(d||parseInt(C.style("width"))||960)-u.left-u.right,W=(f||parseInt(C.style("height"))||400)-u.top-u.bottom;if(t.update=function(){C.transition().duration(S).call(t)},t.container=this,b.disabled=x.map(function(t){return!!t.disabled}),!k){var N;k={};for(N in b)k[N]=b[N]instanceof Array?b[N].slice(0):b[N]}if(!(x&&x.length&&x.filter(function(t){return t.values.length}).length)){var z=C.selectAll(".nv-noData").data([w]);return z.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),z.attr("x",u.left+I/2).attr("y",u.top+W/2).text(function(t){return t}),t}C.selectAll(".nv-noData").remove(),e=a.xScale(),r=a.yScale();var F=C.selectAll("g.nv-wrap.nv-lineChart").data([x]),L=F.enter().append("g").attr("class","nvd3 nv-wrap nv-lineChart").append("g"),B=F.select("g");L.append("rect").style("opacity",0),L.append("g").attr("class","nv-x nv-axis"),L.append("g").attr("class","nv-y nv-axis"),L.append("g").attr("class","nv-linesWrap"),L.append("g").attr("class","nv-legendWrap"),L.append("g").attr("class","nv-interactive"),B.select("rect").attr("width",I).attr("height",W>0?W:0),p&&(l.width(I),B.select(".nv-legendWrap").datum(x).call(l),u.top!=l.height()&&(u.top=l.height(),W=(f||parseInt(C.style("height"))||400)-u.top-u.bottom),F.select(".nv-legendWrap").attr("transform","translate(0,"+-u.top+")")),F.attr("transform","translate("+u.left+","+u.top+")"),m&&B.select(".nv-y.nv-axis").attr("transform","translate("+I+",0)"),v&&(s.width(I).height(W).margin({left:u.left,top:u.top}).svgContainer(C).xScale(e),F.select(".nv-interactive").call(s)),a.width(I).height(W).color(x.map(function(t,e){return t.color||c(t,e)}).filter(function(t,e){return!x[e].disabled}));var P=B.select(".nv-linesWrap").datum(x.filter(function(t){return!t.disabled}));P.transition().call(a),g&&(o.scale(e).ticks(I/100).tickSize(-W,0),B.select(".nv-x.nv-axis").attr("transform","translate(0,"+r.range()[0]+")"),B.select(".nv-x.nv-axis").transition().call(o)),h&&(i.scale(r).ticks(W/36).tickSize(-I,0),B.select(".nv-y.nv-axis").transition().call(i)),l.dispatch.on("stateChange",function(e){b=e,A.stateChange(b),t.update()}),s.dispatch.on("elementMousemove",function(e){a.clearHighlights();var r,l,d,f=[];if(x.filter(function(t,e){return t.seriesIndex=e,!t.disabled}).forEach(function(o,i){l=n.interactiveBisect(o.values,e.pointXValue,t.x()),a.highlightPoint(i,l,!0);var s=o.values[l];"undefined"!=typeof s&&("undefined"==typeof r&&(r=s),"undefined"==typeof d&&(d=t.xScale()(t.x()(s,l))),f.push({key:o.key,value:t.y()(s,l),color:c(o,o.seriesIndex)}))}),f.length>2){var p=t.yScale().invert(e.mouseY),g=Math.abs(t.yScale().domain()[0]-t.yScale().domain()[1]),h=.03*g,m=n.nearestValueIndex(f.map(function(t){return t.value}),p,h);null!==m&&(f[m].highlight=!0)}var v=o.tickFormat()(t.x()(r,l));s.tooltip.position({left:d+u.left,top:e.mouseY+u.top}).chartContainer(D.parentNode).enabled(y).valueFormatter(function(t){return i.tickFormat()(t)}).data({value:v,series:f})(),s.renderGuideLine(d)}),s.dispatch.on("elementMouseout",function(){A.tooltipHide(),a.clearHighlights()}),A.on("tooltipShow",function(t){y&&M(t,D.parentNode)}),A.on("changeState",function(e){"undefined"!=typeof e.disabled&&x.length===e.disabled.length&&(x.forEach(function(t,n){t.disabled=e.disabled[n]}),b.disabled=e.disabled),t.update()})}),t}var e,r,a=n.models.line(),o=n.models.axis(),i=n.models.axis(),l=n.models.legend(),s=n.interactiveGuideline(),u={top:30,right:20,bottom:50,left:60},c=n.utils.defaultColor(),d=null,f=null,p=!0,g=!0,h=!0,m=!1,v=!1,y=!0,x=function(t,e,n){return"<h3>"+t+"</h3><p>"+n+" at "+e+"</p>"},b={},k=null,w="No Data Available.",A=d3.dispatch("tooltipShow","tooltipHide","stateChange","changeState"),S=250;o.orient("bottom").tickPadding(7),i.orient(m?"right":"left");var M=function(e,r){var l=e.pos[0]+(r.offsetLeft||0),s=e.pos[1]+(r.offsetTop||0),u=o.tickFormat()(a.x()(e.point,e.pointIndex)),c=i.tickFormat()(a.y()(e.point,e.pointIndex)),d=x(e.series.key,u,c,e,t);n.tooltip.show([l,s],d,null,null,r)};return a.dispatch.on("elementMouseover.tooltip",function(t){t.pos=[t.pos[0]+u.left,t.pos[1]+u.top],A.tooltipShow(t)}),a.dispatch.on("elementMouseout.tooltip",function(t){A.tooltipHide(t)}),A.on("tooltipHide",function(){y&&n.tooltip.cleanup()}),t.dispatch=A,t.lines=a,t.legend=l,t.xAxis=o,t.yAxis=i,t.interactiveLayer=s,d3.rebind(t,a,"defined","isArea","x","y","size","xScale","yScale","xDomain","yDomain","xRange","yRange","forceX","forceY","interactive","clipEdge","clipVoronoi","useVoronoi","id","interpolate"),t.options=n.utils.optionsFunc.bind(t),t.margin=function(e){return arguments.length?(u.top="undefined"!=typeof e.top?e.top:u.top,u.right="undefined"!=typeof e.right?e.right:u.right,u.bottom="undefined"!=typeof e.bottom?e.bottom:u.bottom,u.left="undefined"!=typeof e.left?e.left:u.left,t):u},t.width=function(e){return arguments.length?(d=e,t):d},t.height=function(e){return arguments.length?(f=e,t):f},t.color=function(e){return arguments.length?(c=n.utils.getColor(e),l.color(c),t):c},t.showLegend=function(e){return arguments.length?(p=e,t):p},t.showXAxis=function(e){return arguments.length?(g=e,t):g},t.showYAxis=function(e){return arguments.length?(h=e,t):h},t.rightAlignYAxis=function(e){return arguments.length?(m=e,i.orient(e?"right":"left"),t):m},t.useInteractiveGuideline=function(e){return arguments.length?(v=e,e===!0&&(t.interactive(!1),t.useVoronoi(!1)),t):v},t.tooltips=function(e){return arguments.length?(y=e,t):y},t.tooltipContent=function(e){return arguments.length?(x=e,t):x},t.state=function(e){return arguments.length?(b=e,t):b},t.defaultState=function(e){return arguments.length?(k=e,t):k},t.noData=function(e){return arguments.length?(w=e,t):w},t.transitionDuration=function(e){return arguments.length?(S=e,t):S},t},n.models.linePlusBarChart=function(){"use strict";function t(n){return n.each(function(n){var g=d3.select(this),h=this,x=(f||parseInt(g.style("width"))||960)-d.left-d.right,M=(p||parseInt(g.style("height"))||400)-d.top-d.bottom;if(t.update=function(){g.transition().call(t)},b.disabled=n.map(function(t){return!!t.disabled}),!k){var C;k={};for(C in b)k[C]=b[C]instanceof Array?b[C].slice(0):b[C]}if(!(n&&n.length&&n.filter(function(t){return t.values.length}).length)){var D=g.selectAll(".nv-noData").data([w]);return D.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),D.attr("x",d.left+x/2).attr("y",d.top+M/2).text(function(t){return t}),t}g.selectAll(".nv-noData").remove();var I=n.filter(function(t){return!t.disabled&&t.bar}),W=n.filter(function(t){return!t.bar});e=W.filter(function(t){return!t.disabled}).length&&W.filter(function(t){return!t.disabled})[0].values.length?o.xScale():i.xScale(),r=i.yScale(),a=o.yScale();var N=d3.select(this).selectAll("g.nv-wrap.nv-linePlusBar").data([n]),z=N.enter().append("g").attr("class","nvd3 nv-wrap nv-linePlusBar").append("g"),F=N.select("g");z.append("g").attr("class","nv-x nv-axis"),z.append("g").attr("class","nv-y1 nv-axis"),z.append("g").attr("class","nv-y2 nv-axis"),z.append("g").attr("class","nv-barsWrap"),z.append("g").attr("class","nv-linesWrap"),z.append("g").attr("class","nv-legendWrap"),v&&(c.width(x/2),F.select(".nv-legendWrap").datum(n.map(function(t){return t.originalKey=void 0===t.originalKey?t.key:t.originalKey,t.key=t.originalKey+(t.bar?" (left axis)":" (right axis)"),t})).call(c),d.top!=c.height()&&(d.top=c.height(),M=(p||parseInt(g.style("height"))||400)-d.top-d.bottom),F.select(".nv-legendWrap").attr("transform","translate("+x/2+","+-d.top+")")),N.attr("transform","translate("+d.left+","+d.top+")"),o.width(x).height(M).color(n.map(function(t,e){return t.color||m(t,e)}).filter(function(t,e){return!n[e].disabled&&!n[e].bar})),i.width(x).height(M).color(n.map(function(t,e){return t.color||m(t,e)}).filter(function(t,e){return!n[e].disabled&&n[e].bar}));var L=F.select(".nv-barsWrap").datum(I.length?I:[{values:[]}]),B=F.select(".nv-linesWrap").datum(W[0]&&!W[0].disabled?W:[{values:[]}]);d3.transition(L).call(i),d3.transition(B).call(o),l.scale(e).ticks(x/100).tickSize(-M,0),F.select(".nv-x.nv-axis").attr("transform","translate(0,"+r.range()[0]+")"),d3.transition(F.select(".nv-x.nv-axis")).call(l),s.scale(r).ticks(M/36).tickSize(-x,0),d3.transition(F.select(".nv-y1.nv-axis")).style("opacity",I.length?1:0).call(s),u.scale(a).ticks(M/36).tickSize(I.length?0:-x,0),F.select(".nv-y2.nv-axis").style("opacity",W.length?1:0).attr("transform","translate("+x+",0)"),d3.transition(F.select(".nv-y2.nv-axis")).call(u),c.dispatch.on("stateChange",function(e){b=e,A.stateChange(b),t.update()}),A.on("tooltipShow",function(t){y&&S(t,h.parentNode)}),A.on("changeState",function(e){"undefined"!=typeof e.disabled&&(n.forEach(function(t,n){t.disabled=e.disabled[n]}),b.disabled=e.disabled),t.update()})}),t}var e,r,a,o=n.models.line(),i=n.models.historicalBar(),l=n.models.axis(),s=n.models.axis(),u=n.models.axis(),c=n.models.legend(),d={top:30,right:60,bottom:50,left:60},f=null,p=null,g=function(t){return t.x},h=function(t){return t.y},m=n.utils.defaultColor(),v=!0,y=!0,x=function(t,e,n){return"<h3>"+t+"</h3><p>"+n+" at "+e+"</p>"},b={},k=null,w="No Data Available.",A=d3.dispatch("tooltipShow","tooltipHide","stateChange","changeState");i.padData(!0),o.clipEdge(!1).padData(!0),l.orient("bottom").tickPadding(7).highlightZero(!1),s.orient("left"),u.orient("right");var S=function(e,r){var a=e.pos[0]+(r.offsetLeft||0),i=e.pos[1]+(r.offsetTop||0),c=l.tickFormat()(o.x()(e.point,e.pointIndex)),d=(e.series.bar?s:u).tickFormat()(o.y()(e.point,e.pointIndex)),f=x(e.series.key,c,d,e,t);n.tooltip.show([a,i],f,e.value<0?"n":"s",null,r)};return o.dispatch.on("elementMouseover.tooltip",function(t){t.pos=[t.pos[0]+d.left,t.pos[1]+d.top],A.tooltipShow(t)}),o.dispatch.on("elementMouseout.tooltip",function(t){A.tooltipHide(t)}),i.dispatch.on("elementMouseover.tooltip",function(t){t.pos=[t.pos[0]+d.left,t.pos[1]+d.top],A.tooltipShow(t)}),i.dispatch.on("elementMouseout.tooltip",function(t){A.tooltipHide(t)}),A.on("tooltipHide",function(){y&&n.tooltip.cleanup()}),t.dispatch=A,t.legend=c,t.lines=o,t.bars=i,t.xAxis=l,t.y1Axis=s,t.y2Axis=u,d3.rebind(t,o,"defined","size","clipVoronoi","interpolate"),t.options=n.utils.optionsFunc.bind(t),t.x=function(e){return arguments.length?(g=e,o.x(e),i.x(e),t):g},t.y=function(e){return arguments.length?(h=e,o.y(e),i.y(e),t):h},t.margin=function(e){return arguments.length?(d.top="undefined"!=typeof e.top?e.top:d.top,d.right="undefined"!=typeof e.right?e.right:d.right,d.bottom="undefined"!=typeof e.bottom?e.bottom:d.bottom,d.left="undefined"!=typeof e.left?e.left:d.left,t):d},t.width=function(e){return arguments.length?(f=e,t):f},t.height=function(e){return arguments.length?(p=e,t):p},t.color=function(e){return arguments.length?(m=n.utils.getColor(e),c.color(m),t):m},t.showLegend=function(e){return arguments.length?(v=e,t):v},t.tooltips=function(e){return arguments.length?(y=e,t):y},t.tooltipContent=function(e){return arguments.length?(x=e,t):x},t.state=function(e){return arguments.length?(b=e,t):b},t.defaultState=function(e){return arguments.length?(k=e,t):k},t.noData=function(e){return arguments.length?(w=e,t):w},t},n.models.lineWithFocusChart=function(){"use strict";function t(n){return n.each(function(n){function A(t){var e=+("e"==t),n=e?1:-1,r=B/3;return"M"+.5*n+","+r+"A6,6 0 0 "+e+" "+6.5*n+","+(r+6)+"V"+(2*r-6)+"A6,6 0 0 "+e+" "+.5*n+","+2*r+"ZM"+2.5*n+","+(r+8)+"V"+(2*r-8)+"M"+4.5*n+","+(r+8)+"V"+(2*r-8)}function I(){p.empty()||p.extent(k),_.data([p.empty()?a.domain():k]).each(function(t){var n=a(t[0])-e.range()[0],r=e.range()[1]-a(t[1]);d3.select(this).select(".left").attr("width",0>n?0:n),d3.select(this).select(".right").attr("x",a(t[1])).attr("width",0>r?0:r)})}function W(){k=p.empty()?null:p.extent();var t=p.empty()?a.domain():p.extent();if(!(Math.abs(t[0]-t[1])<=1)){M.brush({extent:t,brush:p}),I();var e=E.select(".nv-focus .nv-linesWrap").datum(n.filter(function(t){return!t.disabled}).map(function(e){return{key:e.key,values:e.values.filter(function(e,n){return i.x()(e,n)>=t[0]&&i.x()(e,n)<=t[1]})}}));e.transition().duration(C).call(i),E.select(".nv-focus .nv-x.nv-axis").transition().duration(C).call(s),E.select(".nv-focus .nv-y.nv-axis").transition().duration(C).call(u)}}var N=d3.select(this),z=this,F=(v||parseInt(N.style("width"))||960)-g.left-g.right,L=(y||parseInt(N.style("height"))||400)-g.top-g.bottom-x,B=x-h.top-h.bottom;if(t.update=function(){N.transition().duration(C).call(t)},t.container=this,!(n&&n.length&&n.filter(function(t){return t.values.length}).length)){var P=N.selectAll(".nv-noData").data([S]);return P.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),P.attr("x",g.left+F/2).attr("y",g.top+L/2).text(function(t){return t}),t}N.selectAll(".nv-noData").remove(),e=i.xScale(),r=i.yScale(),a=l.xScale(),o=l.yScale();var H=N.selectAll("g.nv-wrap.nv-lineWithFocusChart").data([n]),T=H.enter().append("g").attr("class","nvd3 nv-wrap nv-lineWithFocusChart").append("g"),E=H.select("g");T.append("g").attr("class","nv-legendWrap");var Y=T.append("g").attr("class","nv-focus");Y.append("g").attr("class","nv-x nv-axis"),Y.append("g").attr("class","nv-y nv-axis"),Y.append("g").attr("class","nv-linesWrap");var R=T.append("g").attr("class","nv-context");R.append("g").attr("class","nv-x nv-axis"),R.append("g").attr("class","nv-y nv-axis"),R.append("g").attr("class","nv-linesWrap"),R.append("g").attr("class","nv-brushBackground"),R.append("g").attr("class","nv-x nv-brush"),b&&(f.width(F),E.select(".nv-legendWrap").datum(n).call(f),g.top!=f.height()&&(g.top=f.height(),L=(y||parseInt(N.style("height"))||400)-g.top-g.bottom-x),E.select(".nv-legendWrap").attr("transform","translate(0,"+-g.top+")")),H.attr("transform","translate("+g.left+","+g.top+")"),i.width(F).height(L).color(n.map(function(t,e){return t.color||m(t,e)}).filter(function(t,e){return!n[e].disabled})),l.defined(i.defined()).width(F).height(B).color(n.map(function(t,e){return t.color||m(t,e)}).filter(function(t,e){return!n[e].disabled})),E.select(".nv-context").attr("transform","translate(0,"+(L+g.bottom+h.top)+")");var V=E.select(".nv-context .nv-linesWrap").datum(n.filter(function(t){return!t.disabled}));d3.transition(V).call(l),s.scale(e).ticks(F/100).tickSize(-L,0),u.scale(r).ticks(L/36).tickSize(-F,0),E.select(".nv-focus .nv-x.nv-axis").attr("transform","translate(0,"+L+")"),p.x(a).on("brush",function(){var e=t.transitionDuration();t.transitionDuration(0),W(),t.transitionDuration(e)}),k&&p.extent(k);var _=E.select(".nv-brushBackground").selectAll("g").data([k||p.extent()]),X=_.enter().append("g");X.append("rect").attr("class","left").attr("x",0).attr("y",0).attr("height",B),X.append("rect").attr("class","right").attr("x",0).attr("y",0).attr("height",B);var Z=E.select(".nv-x.nv-brush").call(p);Z.selectAll("rect").attr("height",B),Z.selectAll(".resize").append("path").attr("d",A),W(),c.scale(a).ticks(F/100).tickSize(-B,0),E.select(".nv-context .nv-x.nv-axis").attr("transform","translate(0,"+o.range()[0]+")"),d3.transition(E.select(".nv-context .nv-x.nv-axis")).call(c),d.scale(o).ticks(B/36).tickSize(-F,0),d3.transition(E.select(".nv-context .nv-y.nv-axis")).call(d),E.select(".nv-context .nv-x.nv-axis").attr("transform","translate(0,"+o.range()[0]+")"),f.dispatch.on("stateChange",function(){t.update()}),M.on("tooltipShow",function(t){w&&D(t,z.parentNode)})}),t}var e,r,a,o,i=n.models.line(),l=n.models.line(),s=n.models.axis(),u=n.models.axis(),c=n.models.axis(),d=n.models.axis(),f=n.models.legend(),p=d3.svg.brush(),g={top:30,right:30,bottom:30,left:60},h={top:0,right:30,bottom:20,left:60},m=n.utils.defaultColor(),v=null,y=null,x=100,b=!0,k=null,w=!0,A=function(t,e,n){return"<h3>"+t+"</h3><p>"+n+" at "+e+"</p>"},S="No Data Available.",M=d3.dispatch("tooltipShow","tooltipHide","brush"),C=250;i.clipEdge(!0),l.interactive(!1),s.orient("bottom").tickPadding(5),u.orient("left"),c.orient("bottom").tickPadding(5),d.orient("left");var D=function(e,r){var a=e.pos[0]+(r.offsetLeft||0),o=e.pos[1]+(r.offsetTop||0),l=s.tickFormat()(i.x()(e.point,e.pointIndex)),c=u.tickFormat()(i.y()(e.point,e.pointIndex)),d=A(e.series.key,l,c,e,t);n.tooltip.show([a,o],d,null,null,r)};return i.dispatch.on("elementMouseover.tooltip",function(t){t.pos=[t.pos[0]+g.left,t.pos[1]+g.top],M.tooltipShow(t)}),i.dispatch.on("elementMouseout.tooltip",function(t){M.tooltipHide(t)}),M.on("tooltipHide",function(){w&&n.tooltip.cleanup()}),t.dispatch=M,t.legend=f,t.lines=i,t.lines2=l,t.xAxis=s,t.yAxis=u,t.x2Axis=c,t.y2Axis=d,d3.rebind(t,i,"defined","isArea","size","xDomain","yDomain","xRange","yRange","forceX","forceY","interactive","clipEdge","clipVoronoi","id"),t.options=n.utils.optionsFunc.bind(t),t.x=function(e){return arguments.length?(i.x(e),l.x(e),t):i.x},t.y=function(e){return arguments.length?(i.y(e),l.y(e),t):i.y},t.margin=function(e){return arguments.length?(g.top="undefined"!=typeof e.top?e.top:g.top,g.right="undefined"!=typeof e.right?e.right:g.right,g.bottom="undefined"!=typeof e.bottom?e.bottom:g.bottom,g.left="undefined"!=typeof e.left?e.left:g.left,t):g},t.margin2=function(e){return arguments.length?(h=e,t):h},t.width=function(e){return arguments.length?(v=e,t):v},t.height=function(e){return arguments.length?(y=e,t):y},t.height2=function(e){return arguments.length?(x=e,t):x},t.color=function(e){return arguments.length?(m=n.utils.getColor(e),f.color(m),t):m},t.showLegend=function(e){return arguments.length?(b=e,t):b},t.tooltips=function(e){return arguments.length?(w=e,t):w},t.tooltipContent=function(e){return arguments.length?(A=e,t):A},t.interpolate=function(e){return arguments.length?(i.interpolate(e),l.interpolate(e),t):i.interpolate()},t.noData=function(e){return arguments.length?(S=e,t):S},t.xTickFormat=function(e){return arguments.length?(s.tickFormat(e),c.tickFormat(e),t):s.tickFormat()},t.yTickFormat=function(e){return arguments.length?(u.tickFormat(e),d.tickFormat(e),t):u.tickFormat()},t.brushExtent=function(e){return arguments.length?(k=e,t):k},t.transitionDuration=function(e){return arguments.length?(C=e,t):C},t},n.models.linePlusBarWithFocusChart=function(){"use strict";function t(n){return n.each(function(n){function F(t){var e=+("e"==t),n=e?1:-1,r=X/3;return"M"+.5*n+","+r+"A6,6 0 0 "+e+" "+6.5*n+","+(r+6)+"V"+(2*r-6)+"A6,6 0 0 "+e+" "+.5*n+","+2*r+"ZM"+2.5*n+","+(r+8)+"V"+(2*r-8)+"M"+4.5*n+","+(r+8)+"V"+(2*r-8)}function T(){b.empty()||b.extent(N),ne.data([b.empty()?a.domain():N]).each(function(t){var e=a(t[0])-a.range()[0],n=a.range()[1]-a(t[1]);d3.select(this).select(".left").attr("width",0>e?0:e),d3.select(this).select(".right").attr("x",a(t[1])).attr("width",0>n?0:n)})}function E(){N=b.empty()?null:b.extent(),e=b.empty()?a.domain():b.extent(),B.brush({extent:e,brush:b}),T(),d.width(V).height(_).color(n.map(function(t,e){return t.color||I(t,e)}).filter(function(t,e){return!n[e].disabled&&n[e].bar})),u.width(V).height(_).color(n.map(function(t,e){return t.color||I(t,e)}).filter(function(t,e){return!n[e].disabled&&!n[e].bar}));var t=$.select(".nv-focus .nv-barsWrap").datum(G.length?G.map(function(t){return{key:t.key,values:t.values.filter(function(t,n){return d.x()(t,n)>=e[0]&&d.x()(t,n)<=e[1]})}}):[{values:[]}]),l=$.select(".nv-focus .nv-linesWrap").datum(O[0].disabled?[{values:[]}]:O.map(function(t){return{key:t.key,values:t.values.filter(function(t,n){return u.x()(t,n)>=e[0]&&u.x()(t,n)<=e[1]})}}));r=G.length?d.xScale():u.xScale(),p.scale(r).ticks(V/100).tickSize(-_,0),p.domain([Math.ceil(e[0]),Math.floor(e[1])]),$.select(".nv-x.nv-axis").transition().duration(P).call(p),t.transition().duration(P).call(d),l.transition().duration(P).call(u),$.select(".nv-focus .nv-x.nv-axis").attr("transform","translate(0,"+o.range()[0]+")"),h.scale(o).ticks(_/36).tickSize(-V,0),$.select(".nv-focus .nv-y1.nv-axis").style("opacity",G.length?1:0),m.scale(i).ticks(_/36).tickSize(G.length?0:-V,0),$.select(".nv-focus .nv-y2.nv-axis").style("opacity",O.length?1:0).attr("transform","translate("+r.range()[1]+",0)"),$.select(".nv-focus .nv-y1.nv-axis").transition().duration(P).call(h),$.select(".nv-focus .nv-y2.nv-axis").transition().duration(P).call(m)}var Y=d3.select(this),R=this,V=(A||parseInt(Y.style("width"))||960)-k.left-k.right,_=(S||parseInt(Y.style("height"))||400)-k.top-k.bottom-M,X=M-w.top-w.bottom;if(t.update=function(){Y.transition().duration(P).call(t)},t.container=this,!(n&&n.length&&n.filter(function(t){return t.values.length}).length)){var Z=Y.selectAll(".nv-noData").data([L]);return Z.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),Z.attr("x",k.left+V/2).attr("y",k.top+_/2).text(function(t){return t}),t}Y.selectAll(".nv-noData").remove();var G=n.filter(function(t){return!t.disabled&&t.bar}),O=n.filter(function(t){return!t.bar});r=d.xScale(),a=g.scale(),o=d.yScale(),i=u.yScale(),l=f.yScale(),s=c.yScale();var K=n.filter(function(t){return!t.disabled&&t.bar}).map(function(t){return t.values.map(function(t,e){return{x:C(t,e),y:D(t,e)}})}),q=n.filter(function(t){return!t.disabled&&!t.bar}).map(function(t){return t.values.map(function(t,e){return{x:C(t,e),y:D(t,e)}})});r.range([0,V]),a.domain(d3.extent(d3.merge(K.concat(q)),function(t){return t.x})).range([0,V]);var j=Y.selectAll("g.nv-wrap.nv-linePlusBar").data([n]),U=j.enter().append("g").attr("class","nvd3 nv-wrap nv-linePlusBar").append("g"),$=j.select("g");U.append("g").attr("class","nv-legendWrap");var J=U.append("g").attr("class","nv-focus");J.append("g").attr("class","nv-x nv-axis"),J.append("g").attr("class","nv-y1 nv-axis"),J.append("g").attr("class","nv-y2 nv-axis"),J.append("g").attr("class","nv-barsWrap"),J.append("g").attr("class","nv-linesWrap");var Q=U.append("g").attr("class","nv-context");Q.append("g").attr("class","nv-x nv-axis"),Q.append("g").attr("class","nv-y1 nv-axis"),Q.append("g").attr("class","nv-y2 nv-axis"),Q.append("g").attr("class","nv-barsWrap"),Q.append("g").attr("class","nv-linesWrap"),Q.append("g").attr("class","nv-brushBackground"),Q.append("g").attr("class","nv-x nv-brush"),W&&(x.width(V/2),$.select(".nv-legendWrap").datum(n.map(function(t){return t.originalKey=void 0===t.originalKey?t.key:t.originalKey,t.key=t.originalKey+(t.bar?" (left axis)":" (right axis)"),t})).call(x),k.top!=x.height()&&(k.top=x.height(),_=(S||parseInt(Y.style("height"))||400)-k.top-k.bottom-M),$.select(".nv-legendWrap").attr("transform","translate("+V/2+","+-k.top+")")),j.attr("transform","translate("+k.left+","+k.top+")"),f.width(V).height(X).color(n.map(function(t,e){return t.color||I(t,e)}).filter(function(t,e){return!n[e].disabled&&n[e].bar})),c.width(V).height(X).color(n.map(function(t,e){return t.color||I(t,e)}).filter(function(t,e){return!n[e].disabled&&!n[e].bar}));var te=$.select(".nv-context .nv-barsWrap").datum(G.length?G:[{values:[]}]),ee=$.select(".nv-context .nv-linesWrap").datum(O[0].disabled?[{values:[]}]:O);$.select(".nv-context").attr("transform","translate(0,"+(_+k.bottom+w.top)+")"),te.transition().call(f),ee.transition().call(c),b.x(a).on("brush",E),N&&b.extent(N);var ne=$.select(".nv-brushBackground").selectAll("g").data([N||b.extent()]),re=ne.enter().append("g");re.append("rect").attr("class","left").attr("x",0).attr("y",0).attr("height",X),re.append("rect").attr("class","right").attr("x",0).attr("y",0).attr("height",X);var ae=$.select(".nv-x.nv-brush").call(b);ae.selectAll("rect").attr("height",X),ae.selectAll(".resize").append("path").attr("d",F),g.ticks(V/100).tickSize(-X,0),$.select(".nv-context .nv-x.nv-axis").attr("transform","translate(0,"+l.range()[0]+")"),$.select(".nv-context .nv-x.nv-axis").transition().call(g),v.scale(l).ticks(X/36).tickSize(-V,0),$.select(".nv-context .nv-y1.nv-axis").style("opacity",G.length?1:0).attr("transform","translate(0,"+a.range()[0]+")"),$.select(".nv-context .nv-y1.nv-axis").transition().call(v),y.scale(s).ticks(X/36).tickSize(G.length?0:-V,0),$.select(".nv-context .nv-y2.nv-axis").style("opacity",O.length?1:0).attr("transform","translate("+a.range()[1]+",0)"),$.select(".nv-context .nv-y2.nv-axis").transition().call(y),x.dispatch.on("stateChange",function(){t.update()}),B.on("tooltipShow",function(t){z&&H(t,R.parentNode)}),E()}),t}var e,r,a,o,i,l,s,u=n.models.line(),c=n.models.line(),d=n.models.historicalBar(),f=n.models.historicalBar(),p=n.models.axis(),g=n.models.axis(),h=n.models.axis(),m=n.models.axis(),v=n.models.axis(),y=n.models.axis(),x=n.models.legend(),b=d3.svg.brush(),k={top:30,right:30,bottom:30,left:60},w={top:0,right:30,bottom:20,left:60},A=null,S=null,M=100,C=function(t){return t.x},D=function(t){return t.y},I=n.utils.defaultColor(),W=!0,N=null,z=!0,F=function(t,e,n){return"<h3>"+t+"</h3><p>"+n+" at "+e+"</p>"},L="No Data Available.",B=d3.dispatch("tooltipShow","tooltipHide","brush"),P=0;u.clipEdge(!0),c.interactive(!1),p.orient("bottom").tickPadding(5),h.orient("left"),m.orient("right"),g.orient("bottom").tickPadding(5),v.orient("left"),y.orient("right");var H=function(r,a){e&&(r.pointIndex+=Math.ceil(e[0]));var o=r.pos[0]+(a.offsetLeft||0),i=r.pos[1]+(a.offsetTop||0),l=p.tickFormat()(u.x()(r.point,r.pointIndex)),s=(r.series.bar?h:m).tickFormat()(u.y()(r.point,r.pointIndex)),c=F(r.series.key,l,s,r,t);n.tooltip.show([o,i],c,r.value<0?"n":"s",null,a)};return u.dispatch.on("elementMouseover.tooltip",function(t){t.pos=[t.pos[0]+k.left,t.pos[1]+k.top],B.tooltipShow(t)}),u.dispatch.on("elementMouseout.tooltip",function(t){B.tooltipHide(t)}),d.dispatch.on("elementMouseover.tooltip",function(t){t.pos=[t.pos[0]+k.left,t.pos[1]+k.top],B.tooltipShow(t)}),d.dispatch.on("elementMouseout.tooltip",function(t){B.tooltipHide(t)}),B.on("tooltipHide",function(){z&&n.tooltip.cleanup()}),t.dispatch=B,t.legend=x,t.lines=u,t.lines2=c,t.bars=d,t.bars2=f,t.xAxis=p,t.x2Axis=g,t.y1Axis=h,t.y2Axis=m,t.y3Axis=v,t.y4Axis=y,d3.rebind(t,u,"defined","size","clipVoronoi","interpolate"),t.options=n.utils.optionsFunc.bind(t),t.x=function(e){return arguments.length?(C=e,u.x(e),d.x(e),t):C},t.y=function(e){return arguments.length?(D=e,u.y(e),d.y(e),t):D},t.margin=function(e){return arguments.length?(k.top="undefined"!=typeof e.top?e.top:k.top,k.right="undefined"!=typeof e.right?e.right:k.right,k.bottom="undefined"!=typeof e.bottom?e.bottom:k.bottom,k.left="undefined"!=typeof e.left?e.left:k.left,t):k},t.width=function(e){return arguments.length?(A=e,t):A},t.height=function(e){return arguments.length?(S=e,t):S},t.color=function(e){return arguments.length?(I=n.utils.getColor(e),x.color(I),t):I},t.showLegend=function(e){return arguments.length?(W=e,t):W},t.tooltips=function(e){return arguments.length?(z=e,t):z},t.tooltipContent=function(e){return arguments.length?(F=e,t):F},t.noData=function(e){return arguments.length?(L=e,t):L},t.brushExtent=function(e){return arguments.length?(N=e,t):N},t},n.models.multiBar=function(){"use strict";function t(n){return n.each(function(t){var n=c-u.left-u.right,D=d-u.top-u.bottom,I=d3.select(this);w&&t.length&&(w=[{values:t[0].values.map(function(t){return{x:t.x,y:0,series:t.series,size:.01}})}]),x&&(t=d3.layout.stack().offset(b).values(function(t){return t.values}).y(m)(!t.length&&w?w:t)),t.forEach(function(t,e){t.values.forEach(function(t){t.series=e})}),x&&t[0]&&t[0].values.map(function(e,n){var r=0,a=0;t.map(function(t){var e=t.values[n];e.size=Math.abs(e.y),e.y<0?(e.y1=a,a-=e.size):(e.y1=e.size+r,r+=e.size)})});var W=r&&a?[]:t.map(function(t){return t.values.map(function(t,e){return{x:h(t,e),y:m(t,e),y0:t.y0,y1:t.y1}})});f.domain(r||d3.merge(W).map(function(t){return t.x})).rangeBands(o||[0,n],M),p.domain(a||d3.extent(d3.merge(W).map(function(t){return x?t.y>0?t.y1:t.y1+t.y:t.y}).concat(v))).range(i||[D,0]),f.domain()[0]===f.domain()[1]&&f.domain(f.domain()[0]?[f.domain()[0]-.01*f.domain()[0],f.domain()[1]+.01*f.domain()[1]]:[-1,1]),p.domain()[0]===p.domain()[1]&&p.domain(p.domain()[0]?[p.domain()[0]+.01*p.domain()[0],p.domain()[1]-.01*p.domain()[1]]:[-1,1]),l=l||f,s=s||p;var N=I.selectAll("g.nv-wrap.nv-multibar").data([t]),z=N.enter().append("g").attr("class","nvd3 nv-wrap nv-multibar"),F=z.append("defs"),L=z.append("g"),B=N.select("g");L.append("g").attr("class","nv-groups"),N.attr("transform","translate("+u.left+","+u.top+")"),F.append("clipPath").attr("id","nv-edge-clip-"+g).append("rect"),N.select("#nv-edge-clip-"+g+" rect").attr("width",n).attr("height",D),B.attr("clip-path",y?"url(#nv-edge-clip-"+g+")":"");var P=N.select(".nv-groups").selectAll(".nv-group").data(function(t){return t
},function(t,e){return e});P.enter().append("g").style("stroke-opacity",1e-6).style("fill-opacity",1e-6),P.exit().transition().selectAll("rect.nv-bar").delay(function(e,n){return t[0]?n*S/t[0].values.length:n}).attr("y",function(t){return s(x?t.y0:0)}).attr("height",0).remove(),P.attr("class",function(t,e){return"nv-group nv-series-"+e}).classed("hover",function(t){return t.hover}).style("fill",function(t,e){return k(t,e)}).style("stroke",function(t,e){return k(t,e)}),P.transition().style("stroke-opacity",1).style("fill-opacity",.75);var H=P.selectAll("rect.nv-bar").data(function(e){return w&&!t.length?w.values:e.values});H.exit().remove();H.enter().append("rect").attr("class",function(t,e){return m(t,e)<0?"nv-bar negative":"nv-bar positive"}).attr("x",function(e,n,r){return x?0:r*f.rangeBand()/t.length}).attr("y",function(t){return s(x?t.y0:0)}).attr("height",0).attr("width",f.rangeBand()/(x?1:t.length)).attr("transform",function(t,e){return"translate("+f(h(t,e))+",0)"});H.style("fill",function(t,e,n){return k(t,n,e)}).style("stroke",function(t,e,n){return k(t,n,e)}).on("mouseover",function(e,n){d3.select(this).classed("hover",!0),C.elementMouseover({value:m(e,n),point:e,series:t[e.series],pos:[f(h(e,n))+f.rangeBand()*(x?t.length/2:e.series+.5)/t.length,p(m(e,n)+(x?e.y0:0))],pointIndex:n,seriesIndex:e.series,e:d3.event})}).on("mouseout",function(e,n){d3.select(this).classed("hover",!1),C.elementMouseout({value:m(e,n),point:e,series:t[e.series],pointIndex:n,seriesIndex:e.series,e:d3.event})}).on("click",function(e,n){C.elementClick({value:m(e,n),point:e,series:t[e.series],pos:[f(h(e,n))+f.rangeBand()*(x?t.length/2:e.series+.5)/t.length,p(m(e,n)+(x?e.y0:0))],pointIndex:n,seriesIndex:e.series,e:d3.event}),d3.event.stopPropagation()}).on("dblclick",function(e,n){C.elementDblClick({value:m(e,n),point:e,series:t[e.series],pos:[f(h(e,n))+f.rangeBand()*(x?t.length/2:e.series+.5)/t.length,p(m(e,n)+(x?e.y0:0))],pointIndex:n,seriesIndex:e.series,e:d3.event}),d3.event.stopPropagation()}),H.attr("class",function(t,e){return m(t,e)<0?"nv-bar negative":"nv-bar positive"}).transition().attr("transform",function(t,e){return"translate("+f(h(t,e))+",0)"}),A&&(e||(e=t.map(function(){return!0})),H.style("fill",function(t,n,r){return d3.rgb(A(t,n)).darker(e.map(function(t,e){return e}).filter(function(t,n){return!e[n]})[r]).toString()}).style("stroke",function(t,n,r){return d3.rgb(A(t,n)).darker(e.map(function(t,e){return e}).filter(function(t,n){return!e[n]})[r]).toString()})),x?H.transition().delay(function(e,n){return n*S/t[0].values.length}).attr("y",function(t){return p(x?t.y1:0)}).attr("height",function(t){return Math.max(Math.abs(p(t.y+(x?t.y0:0))-p(x?t.y0:0)),1)}).attr("x",function(e){return x?0:e.series*f.rangeBand()/t.length}).attr("width",f.rangeBand()/(x?1:t.length)):H.transition().delay(function(e,n){return n*S/t[0].values.length}).attr("x",function(e){return e.series*f.rangeBand()/t.length}).attr("width",f.rangeBand()/t.length).attr("y",function(t,e){return m(t,e)<0?p(0):p(0)-p(m(t,e))<1?p(0)-1:p(m(t,e))||0}).attr("height",function(t,e){return Math.max(Math.abs(p(m(t,e))-p(0)),1)||0}),l=f.copy(),s=p.copy()}),t}var e,r,a,o,i,l,s,u={top:0,right:0,bottom:0,left:0},c=960,d=500,f=d3.scale.ordinal(),p=d3.scale.linear(),g=Math.floor(1e4*Math.random()),h=function(t){return t.x},m=function(t){return t.y},v=[0],y=!0,x=!1,b="zero",k=n.utils.defaultColor(),w=!1,A=null,S=1200,M=.1,C=d3.dispatch("chartClick","elementClick","elementDblClick","elementMouseover","elementMouseout");return t.dispatch=C,t.options=n.utils.optionsFunc.bind(t),t.x=function(e){return arguments.length?(h=e,t):h},t.y=function(e){return arguments.length?(m=e,t):m},t.margin=function(e){return arguments.length?(u.top="undefined"!=typeof e.top?e.top:u.top,u.right="undefined"!=typeof e.right?e.right:u.right,u.bottom="undefined"!=typeof e.bottom?e.bottom:u.bottom,u.left="undefined"!=typeof e.left?e.left:u.left,t):u},t.width=function(e){return arguments.length?(c=e,t):c},t.height=function(e){return arguments.length?(d=e,t):d},t.xScale=function(e){return arguments.length?(f=e,t):f},t.yScale=function(e){return arguments.length?(p=e,t):p},t.xDomain=function(e){return arguments.length?(r=e,t):r},t.yDomain=function(e){return arguments.length?(a=e,t):a},t.xRange=function(e){return arguments.length?(o=e,t):o},t.yRange=function(e){return arguments.length?(i=e,t):i},t.forceY=function(e){return arguments.length?(v=e,t):v},t.stacked=function(e){return arguments.length?(x=e,t):x},t.stackOffset=function(e){return arguments.length?(b=e,t):b},t.clipEdge=function(e){return arguments.length?(y=e,t):y},t.color=function(e){return arguments.length?(k=n.utils.getColor(e),t):k},t.barColor=function(e){return arguments.length?(A=n.utils.getColor(e),t):A},t.disabled=function(n){return arguments.length?(e=n,t):e},t.id=function(e){return arguments.length?(g=e,t):g},t.hideable=function(e){return arguments.length?(w=e,t):w},t.delay=function(e){return arguments.length?(S=e,t):S},t.groupSpacing=function(e){return arguments.length?(M=e,t):M},t},n.models.multiBarChart=function(){"use strict";function t(n){return n.each(function(n){var w=d3.select(this),N=this,z=(c||parseInt(w.style("width"))||960)-u.left-u.right,F=(d||parseInt(w.style("height"))||400)-u.top-u.bottom;if(t.update=function(){w.transition().duration(I).call(t)},t.container=this,A.disabled=n.map(function(t){return!!t.disabled}),!S){var L;S={};for(L in A)S[L]=A[L]instanceof Array?A[L].slice(0):A[L]}if(!(n&&n.length&&n.filter(function(t){return t.values.length}).length)){var B=w.selectAll(".nv-noData").data([M]);return B.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),B.attr("x",u.left+z/2).attr("y",u.top+F/2).text(function(t){return t}),t}w.selectAll(".nv-noData").remove(),e=a.xScale(),r=a.yScale();var P=w.selectAll("g.nv-wrap.nv-multiBarWithLegend").data([n]),H=P.enter().append("g").attr("class","nvd3 nv-wrap nv-multiBarWithLegend").append("g"),T=P.select("g");if(H.append("g").attr("class","nv-x nv-axis"),H.append("g").attr("class","nv-y nv-axis"),H.append("g").attr("class","nv-barsWrap"),H.append("g").attr("class","nv-legendWrap"),H.append("g").attr("class","nv-controlsWrap"),g&&(l.width(z-D()),a.barColor()&&n.forEach(function(t,e){t.color=d3.rgb("#ccc").darker(1.5*e).toString()}),T.select(".nv-legendWrap").datum(n).call(l),u.top!=l.height()&&(u.top=l.height(),F=(d||parseInt(w.style("height"))||400)-u.top-u.bottom),T.select(".nv-legendWrap").attr("transform","translate("+D()+","+-u.top+")")),p){var E=[{key:"Grouped",disabled:a.stacked()},{key:"Stacked",disabled:!a.stacked()}];s.width(D()).color(["#444","#444","#444"]),T.select(".nv-controlsWrap").datum(E).attr("transform","translate(0,"+-u.top+")").call(s)}P.attr("transform","translate("+u.left+","+u.top+")"),v&&T.select(".nv-y.nv-axis").attr("transform","translate("+z+",0)"),a.disabled(n.map(function(t){return t.disabled})).width(z).height(F).color(n.map(function(t,e){return t.color||f(t,e)}).filter(function(t,e){return!n[e].disabled}));var Y=T.select(".nv-barsWrap").datum(n.filter(function(t){return!t.disabled}));if(Y.transition().call(a),h){o.scale(e).ticks(z/100).tickSize(-F,0),T.select(".nv-x.nv-axis").attr("transform","translate(0,"+r.range()[0]+")"),T.select(".nv-x.nv-axis").transition().call(o);var R=T.select(".nv-x.nv-axis > g").selectAll("g");if(R.selectAll("line, text").style("opacity",1),x){var V=function(t,e){return"translate("+t+","+e+")"},_=5,X=17;R.selectAll("text").attr("transform",function(t,e,n){return V(0,n%2==0?_:X)});var Z=d3.selectAll(".nv-x.nv-axis .nv-wrap g g text")[0].length;T.selectAll(".nv-x.nv-axis .nv-axisMaxMin text").attr("transform",function(t,e){return V(0,0===e||Z%2!==0?X:_)})}y&&R.filter(function(t,e){return e%Math.ceil(n[0].values.length/(z/100))!==0}).selectAll("text, line").style("opacity",0),b&&R.selectAll(".tick text").attr("transform","rotate("+b+" 0,0)").style("text-anchor",b>0?"start":"end"),T.select(".nv-x.nv-axis").selectAll("g.nv-axisMaxMin text").style("opacity",1)}m&&(i.scale(r).ticks(F/36).tickSize(-z,0),T.select(".nv-y.nv-axis").transition().call(i)),l.dispatch.on("stateChange",function(e){A=e,C.stateChange(A),t.update()}),s.dispatch.on("legendClick",function(e){if(e.disabled){switch(E=E.map(function(t){return t.disabled=!0,t}),e.disabled=!1,e.key){case"Grouped":a.stacked(!1);break;case"Stacked":a.stacked(!0)}A.stacked=a.stacked(),C.stateChange(A),t.update()}}),C.on("tooltipShow",function(t){k&&W(t,N.parentNode)}),C.on("changeState",function(e){"undefined"!=typeof e.disabled&&(n.forEach(function(t,n){t.disabled=e.disabled[n]}),A.disabled=e.disabled),"undefined"!=typeof e.stacked&&(a.stacked(e.stacked),A.stacked=e.stacked),t.update()})}),t}var e,r,a=n.models.multiBar(),o=n.models.axis(),i=n.models.axis(),l=n.models.legend(),s=n.models.legend(),u={top:30,right:20,bottom:50,left:60},c=null,d=null,f=n.utils.defaultColor(),p=!0,g=!0,h=!0,m=!0,v=!1,y=!0,x=!1,b=0,k=!0,w=function(t,e,n){return"<h3>"+t+"</h3><p>"+n+" on "+e+"</p>"},A={stacked:!1},S=null,M="No Data Available.",C=d3.dispatch("tooltipShow","tooltipHide","stateChange","changeState"),D=function(){return p?180:0},I=250;a.stacked(!1),o.orient("bottom").tickPadding(7).highlightZero(!0).showMaxMin(!1).tickFormat(function(t){return t}),i.orient(v?"right":"left").tickFormat(d3.format(",.1f")),s.updateState(!1);var W=function(e,r){var l=e.pos[0]+(r.offsetLeft||0),s=e.pos[1]+(r.offsetTop||0),u=o.tickFormat()(a.x()(e.point,e.pointIndex)),c=i.tickFormat()(a.y()(e.point,e.pointIndex)),d=w(e.series.key,u,c,e,t);n.tooltip.show([l,s],d,e.value<0?"n":"s",null,r)};return a.dispatch.on("elementMouseover.tooltip",function(t){t.pos=[t.pos[0]+u.left,t.pos[1]+u.top],C.tooltipShow(t)}),a.dispatch.on("elementMouseout.tooltip",function(t){C.tooltipHide(t)}),C.on("tooltipHide",function(){k&&n.tooltip.cleanup()}),t.dispatch=C,t.multibar=a,t.legend=l,t.xAxis=o,t.yAxis=i,d3.rebind(t,a,"x","y","xDomain","yDomain","xRange","yRange","forceX","forceY","clipEdge","id","stacked","stackOffset","delay","barColor","groupSpacing"),t.options=n.utils.optionsFunc.bind(t),t.margin=function(e){return arguments.length?(u.top="undefined"!=typeof e.top?e.top:u.top,u.right="undefined"!=typeof e.right?e.right:u.right,u.bottom="undefined"!=typeof e.bottom?e.bottom:u.bottom,u.left="undefined"!=typeof e.left?e.left:u.left,t):u},t.width=function(e){return arguments.length?(c=e,t):c},t.height=function(e){return arguments.length?(d=e,t):d},t.color=function(e){return arguments.length?(f=n.utils.getColor(e),l.color(f),t):f},t.showControls=function(e){return arguments.length?(p=e,t):p},t.showLegend=function(e){return arguments.length?(g=e,t):g},t.showXAxis=function(e){return arguments.length?(h=e,t):h},t.showYAxis=function(e){return arguments.length?(m=e,t):m},t.rightAlignYAxis=function(e){return arguments.length?(v=e,i.orient(e?"right":"left"),t):v},t.reduceXTicks=function(e){return arguments.length?(y=e,t):y},t.rotateLabels=function(e){return arguments.length?(b=e,t):b},t.staggerLabels=function(e){return arguments.length?(x=e,t):x},t.tooltip=function(e){return arguments.length?(w=e,t):w},t.tooltips=function(e){return arguments.length?(k=e,t):k},t.tooltipContent=function(e){return arguments.length?(w=e,t):w},t.state=function(e){return arguments.length?(A=e,t):A},t.defaultState=function(e){return arguments.length?(S=e,t):S},t.noData=function(e){return arguments.length?(M=e,t):M},t.transitionDuration=function(e){return arguments.length?(I=e,t):I},t},n.models.multiBarHorizontal=function(){"use strict";function t(n){return n.each(function(t){{var n=c-u.left-u.right,f=d-u.top-u.bottom;d3.select(this)}b&&(t=d3.layout.stack().offset("zero").values(function(t){return t.values}).y(m)(t)),t.forEach(function(t,e){t.values.forEach(function(t){t.series=e})}),b&&t[0].values.map(function(e,n){var r=0,a=0;t.map(function(t){var e=t.values[n];e.size=Math.abs(e.y),e.y<0?(e.y1=a-e.size,a-=e.size):(e.y1=r,r+=e.size)})});var M=r&&a?[]:t.map(function(t){return t.values.map(function(t,e){return{x:h(t,e),y:m(t,e),y0:t.y0,y1:t.y1}})});p.domain(r||d3.merge(M).map(function(t){return t.x})).rangeBands(o||[0,f],.1),g.domain(a||d3.extent(d3.merge(M).map(function(t){return b?t.y>0?t.y1+t.y:t.y1:t.y}).concat(v))),g.range(k&&!b?i||[g.domain()[0]<0?A:0,n-(g.domain()[1]>0?A:0)]:i||[0,n]),l=l||p,s=s||d3.scale.linear().domain(g.domain()).range([g(0),g(0)]);{var D=d3.select(this).selectAll("g.nv-wrap.nv-multibarHorizontal").data([t]),I=D.enter().append("g").attr("class","nvd3 nv-wrap nv-multibarHorizontal"),W=(I.append("defs"),I.append("g"));D.select("g")}W.append("g").attr("class","nv-groups"),D.attr("transform","translate("+u.left+","+u.top+")");var N=D.select(".nv-groups").selectAll(".nv-group").data(function(t){return t},function(t,e){return e});N.enter().append("g").style("stroke-opacity",1e-6).style("fill-opacity",1e-6),N.exit().transition().style("stroke-opacity",1e-6).style("fill-opacity",1e-6).remove(),N.attr("class",function(t,e){return"nv-group nv-series-"+e}).classed("hover",function(t){return t.hover}).style("fill",function(t,e){return y(t,e)}).style("stroke",function(t,e){return y(t,e)}),N.transition().style("stroke-opacity",1).style("fill-opacity",.75);var z=N.selectAll("g.nv-bar").data(function(t){return t.values});z.exit().remove();var F=z.enter().append("g").attr("transform",function(e,n,r){return"translate("+s(b?e.y0:0)+","+(b?0:r*p.rangeBand()/t.length+p(h(e,n)))+")"});F.append("rect").attr("width",0).attr("height",p.rangeBand()/(b?1:t.length)),z.on("mouseover",function(e,n){d3.select(this).classed("hover",!0),C.elementMouseover({value:m(e,n),point:e,series:t[e.series],pos:[g(m(e,n)+(b?e.y0:0)),p(h(e,n))+p.rangeBand()*(b?t.length/2:e.series+.5)/t.length],pointIndex:n,seriesIndex:e.series,e:d3.event})}).on("mouseout",function(e,n){d3.select(this).classed("hover",!1),C.elementMouseout({value:m(e,n),point:e,series:t[e.series],pointIndex:n,seriesIndex:e.series,e:d3.event})}).on("click",function(e,n){C.elementClick({value:m(e,n),point:e,series:t[e.series],pos:[p(h(e,n))+p.rangeBand()*(b?t.length/2:e.series+.5)/t.length,g(m(e,n)+(b?e.y0:0))],pointIndex:n,seriesIndex:e.series,e:d3.event}),d3.event.stopPropagation()}).on("dblclick",function(e,n){C.elementDblClick({value:m(e,n),point:e,series:t[e.series],pos:[p(h(e,n))+p.rangeBand()*(b?t.length/2:e.series+.5)/t.length,g(m(e,n)+(b?e.y0:0))],pointIndex:n,seriesIndex:e.series,e:d3.event}),d3.event.stopPropagation()}),F.append("text"),k&&!b?(z.select("text").attr("text-anchor",function(t,e){return m(t,e)<0?"end":"start"}).attr("y",p.rangeBand()/(2*t.length)).attr("dy",".32em").text(function(t,e){return S(m(t,e))}),z.transition().select("text").attr("x",function(t,e){return m(t,e)<0?-4:g(m(t,e))-g(0)+4})):z.selectAll("text").text(""),w&&!b?(F.append("text").classed("nv-bar-label",!0),z.select("text.nv-bar-label").attr("text-anchor",function(t,e){return m(t,e)<0?"start":"end"}).attr("y",p.rangeBand()/(2*t.length)).attr("dy",".32em").text(function(t,e){return h(t,e)}),z.transition().select("text.nv-bar-label").attr("x",function(t,e){return m(t,e)<0?g(0)-g(m(t,e))+4:-4})):z.selectAll("text.nv-bar-label").text(""),z.attr("class",function(t,e){return m(t,e)<0?"nv-bar negative":"nv-bar positive"}),x&&(e||(e=t.map(function(){return!0})),z.style("fill",function(t,n,r){return d3.rgb(x(t,n)).darker(e.map(function(t,e){return e}).filter(function(t,n){return!e[n]})[r]).toString()}).style("stroke",function(t,n,r){return d3.rgb(x(t,n)).darker(e.map(function(t,e){return e}).filter(function(t,n){return!e[n]})[r]).toString()})),b?z.transition().attr("transform",function(t,e){return"translate("+g(t.y1)+","+p(h(t,e))+")"}).select("rect").attr("width",function(t,e){return Math.abs(g(m(t,e)+t.y0)-g(t.y0))}).attr("height",p.rangeBand()):z.transition().attr("transform",function(e,n){return"translate("+g(m(e,n)<0?m(e,n):0)+","+(e.series*p.rangeBand()/t.length+p(h(e,n)))+")"}).select("rect").attr("height",p.rangeBand()/t.length).attr("width",function(t,e){return Math.max(Math.abs(g(m(t,e))-g(0)),1)}),l=p.copy(),s=g.copy()}),t}var e,r,a,o,i,l,s,u={top:0,right:0,bottom:0,left:0},c=960,d=500,f=Math.floor(1e4*Math.random()),p=d3.scale.ordinal(),g=d3.scale.linear(),h=function(t){return t.x},m=function(t){return t.y},v=[0],y=n.utils.defaultColor(),x=null,b=!1,k=!1,w=!1,A=60,S=d3.format(",.2f"),M=1200,C=d3.dispatch("chartClick","elementClick","elementDblClick","elementMouseover","elementMouseout");return t.dispatch=C,t.options=n.utils.optionsFunc.bind(t),t.x=function(e){return arguments.length?(h=e,t):h},t.y=function(e){return arguments.length?(m=e,t):m},t.margin=function(e){return arguments.length?(u.top="undefined"!=typeof e.top?e.top:u.top,u.right="undefined"!=typeof e.right?e.right:u.right,u.bottom="undefined"!=typeof e.bottom?e.bottom:u.bottom,u.left="undefined"!=typeof e.left?e.left:u.left,t):u},t.width=function(e){return arguments.length?(c=e,t):c},t.height=function(e){return arguments.length?(d=e,t):d},t.xScale=function(e){return arguments.length?(p=e,t):p},t.yScale=function(e){return arguments.length?(g=e,t):g},t.xDomain=function(e){return arguments.length?(r=e,t):r},t.yDomain=function(e){return arguments.length?(a=e,t):a},t.xRange=function(e){return arguments.length?(o=e,t):o},t.yRange=function(e){return arguments.length?(i=e,t):i},t.forceY=function(e){return arguments.length?(v=e,t):v},t.stacked=function(e){return arguments.length?(b=e,t):b},t.color=function(e){return arguments.length?(y=n.utils.getColor(e),t):y},t.barColor=function(e){return arguments.length?(x=n.utils.getColor(e),t):x},t.disabled=function(n){return arguments.length?(e=n,t):e},t.id=function(e){return arguments.length?(f=e,t):f},t.delay=function(e){return arguments.length?(M=e,t):M},t.showValues=function(e){return arguments.length?(k=e,t):k},t.showBarLabels=function(e){return arguments.length?(w=e,t):w},t.valueFormat=function(e){return arguments.length?(S=e,t):S},t.valuePadding=function(e){return arguments.length?(A=e,t):A},t},n.models.multiBarHorizontalChart=function(){"use strict";function t(n){return n.each(function(n){var v=d3.select(this),x=this,D=(c||parseInt(v.style("width"))||960)-u.left-u.right,I=(d||parseInt(v.style("height"))||400)-u.top-u.bottom;if(t.update=function(){v.transition().duration(M).call(t)},t.container=this,b.disabled=n.map(function(t){return!!t.disabled}),!k){var W;k={};for(W in b)k[W]=b[W]instanceof Array?b[W].slice(0):b[W]}if(!(n&&n.length&&n.filter(function(t){return t.values.length}).length)){var N=v.selectAll(".nv-noData").data([w]);return N.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),N.attr("x",u.left+D/2).attr("y",u.top+I/2).text(function(t){return t}),t}v.selectAll(".nv-noData").remove(),e=a.xScale(),r=a.yScale();var z=v.selectAll("g.nv-wrap.nv-multiBarHorizontalChart").data([n]),F=z.enter().append("g").attr("class","nvd3 nv-wrap nv-multiBarHorizontalChart").append("g"),L=z.select("g");if(F.append("g").attr("class","nv-x nv-axis"),F.append("g").attr("class","nv-y nv-axis").append("g").attr("class","nv-zeroLine").append("line"),F.append("g").attr("class","nv-barsWrap"),F.append("g").attr("class","nv-legendWrap"),F.append("g").attr("class","nv-controlsWrap"),g&&(l.width(D-S()),a.barColor()&&n.forEach(function(t,e){t.color=d3.rgb("#ccc").darker(1.5*e).toString()}),L.select(".nv-legendWrap").datum(n).call(l),u.top!=l.height()&&(u.top=l.height(),I=(d||parseInt(v.style("height"))||400)-u.top-u.bottom),L.select(".nv-legendWrap").attr("transform","translate("+S()+","+-u.top+")")),p){var B=[{key:"Grouped",disabled:a.stacked()},{key:"Stacked",disabled:!a.stacked()}];s.width(S()).color(["#444","#444","#444"]),L.select(".nv-controlsWrap").datum(B).attr("transform","translate(0,"+-u.top+")").call(s)}z.attr("transform","translate("+u.left+","+u.top+")"),a.disabled(n.map(function(t){return t.disabled})).width(D).height(I).color(n.map(function(t,e){return t.color||f(t,e)}).filter(function(t,e){return!n[e].disabled}));var P=L.select(".nv-barsWrap").datum(n.filter(function(t){return!t.disabled}));if(P.transition().call(a),h){o.scale(e).ticks(I/24).tickSize(-D,0),L.select(".nv-x.nv-axis").transition().call(o);var H=L.select(".nv-x.nv-axis").selectAll("g");H.selectAll("line, text")}m&&(i.scale(r).ticks(D/100).tickSize(-I,0),L.select(".nv-y.nv-axis").attr("transform","translate(0,"+I+")"),L.select(".nv-y.nv-axis").transition().call(i)),L.select(".nv-zeroLine line").attr("x1",r(0)).attr("x2",r(0)).attr("y1",0).attr("y2",-I),l.dispatch.on("stateChange",function(e){b=e,A.stateChange(b),t.update()}),s.dispatch.on("legendClick",function(e){if(e.disabled){switch(B=B.map(function(t){return t.disabled=!0,t}),e.disabled=!1,e.key){case"Grouped":a.stacked(!1);break;case"Stacked":a.stacked(!0)}b.stacked=a.stacked(),A.stateChange(b),t.update()}}),A.on("tooltipShow",function(t){y&&C(t,x.parentNode)}),A.on("changeState",function(e){"undefined"!=typeof e.disabled&&(n.forEach(function(t,n){t.disabled=e.disabled[n]}),b.disabled=e.disabled),"undefined"!=typeof e.stacked&&(a.stacked(e.stacked),b.stacked=e.stacked),t.update()})}),t}var e,r,a=n.models.multiBarHorizontal(),o=n.models.axis(),i=n.models.axis(),l=n.models.legend().height(30),s=n.models.legend().height(30),u={top:30,right:20,bottom:50,left:60},c=null,d=null,f=n.utils.defaultColor(),p=!0,g=!0,h=!0,m=!0,v=!1,y=!0,x=function(t,e,n){return"<h3>"+t+" - "+e+"</h3><p>"+n+"</p>"},b={stacked:v},k=null,w="No Data Available.",A=d3.dispatch("tooltipShow","tooltipHide","stateChange","changeState"),S=function(){return p?180:0},M=250;a.stacked(v),o.orient("left").tickPadding(5).highlightZero(!1).showMaxMin(!1).tickFormat(function(t){return t}),i.orient("bottom").tickFormat(d3.format(",.1f")),s.updateState(!1);var C=function(e,r){var l=e.pos[0]+(r.offsetLeft||0),s=e.pos[1]+(r.offsetTop||0),u=o.tickFormat()(a.x()(e.point,e.pointIndex)),c=i.tickFormat()(a.y()(e.point,e.pointIndex)),d=x(e.series.key,u,c,e,t);n.tooltip.show([l,s],d,e.value<0?"e":"w",null,r)};return a.dispatch.on("elementMouseover.tooltip",function(t){t.pos=[t.pos[0]+u.left,t.pos[1]+u.top],A.tooltipShow(t)}),a.dispatch.on("elementMouseout.tooltip",function(t){A.tooltipHide(t)}),A.on("tooltipHide",function(){y&&n.tooltip.cleanup()}),t.dispatch=A,t.multibar=a,t.legend=l,t.xAxis=o,t.yAxis=i,d3.rebind(t,a,"x","y","xDomain","yDomain","xRange","yRange","forceX","forceY","clipEdge","id","delay","showValues","showBarLabels","valueFormat","stacked","barColor"),t.options=n.utils.optionsFunc.bind(t),t.margin=function(e){return arguments.length?(u.top="undefined"!=typeof e.top?e.top:u.top,u.right="undefined"!=typeof e.right?e.right:u.right,u.bottom="undefined"!=typeof e.bottom?e.bottom:u.bottom,u.left="undefined"!=typeof e.left?e.left:u.left,t):u},t.width=function(e){return arguments.length?(c=e,t):c},t.height=function(e){return arguments.length?(d=e,t):d},t.color=function(e){return arguments.length?(f=n.utils.getColor(e),l.color(f),t):f},t.showControls=function(e){return arguments.length?(p=e,t):p},t.showLegend=function(e){return arguments.length?(g=e,t):g},t.showXAxis=function(e){return arguments.length?(h=e,t):h},t.showYAxis=function(e){return arguments.length?(m=e,t):m},t.tooltip=function(e){return arguments.length?(x=e,t):x},t.tooltips=function(e){return arguments.length?(y=e,t):y},t.tooltipContent=function(e){return arguments.length?(x=e,t):x},t.state=function(e){return arguments.length?(b=e,t):b},t.defaultState=function(e){return arguments.length?(k=e,t):k},t.noData=function(e){return arguments.length?(w=e,t):w},t.transitionDuration=function(e){return arguments.length?(M=e,t):M},t},n.models.multiChart=function(){"use strict";function t(n){return n.each(function(n){var d=d3.select(this),C=this;t.update=function(){d.transition().call(t)},t.container=this;var D=(l||parseInt(d.style("width"))||960)-(o.left||60)-(o.right||20),I=(s||parseInt(d.style("height"))||400)-(o.top||30)-(o.bottom||50),W=n.filter(function(t){return"line"==t.type&&1==t.yAxis}),N=n.filter(function(t){return"line"==t.type&&2==t.yAxis}),z=n.filter(function(t){return"bar"==t.type&&1==t.yAxis}),F=n.filter(function(t){return"bar"==t.type&&2==t.yAxis}),L=n.filter(function(t){return"stackedbar"==t.type&&1==t.yAxis}),B=n.filter(function(t){return"stackedbar"==t.type&&2==t.yAxis}),P=n.filter(function(t){return!t.disabled&&1==t.yAxis}).map(function(t){return t.values.map(function(t){return{x:t.x,y:t.y}})}),H=n.filter(function(t){return!t.disabled&&2==t.yAxis}).map(function(t){return t.values.map(function(t){return{x:t.x,y:t.y}})});e.domain(d3.extent(d3.merge(P.concat(H)),function(t){return t.x})).range([0,D]);var T=d.selectAll("g.wrap.multiChart").data([n]),E=T.enter().append("g").attr("class","wrap nvd3 multiChart").append("g");E.append("g").attr("class","x axis"),E.append("g").attr("class","y1 axis"),E.append("g").attr("class","y2 axis"),E.append("g").attr("class","lines1Wrap"),E.append("g").attr("class","lines2Wrap"),E.append("g").attr("class","bars1Wrap"),E.append("g").attr("class","bars2Wrap"),E.append("g").attr("class","stack1Wrap"),E.append("g").attr("class","stack2Wrap"),E.append("g").attr("class","legendWrap");var Y=T.select("g");u&&(A.width(D/2),Y.select(".legendWrap").datum(n.map(function(t){return t.originalKey=void 0===t.originalKey?t.key:t.originalKey,t.key=t.originalKey+(1==t.yAxis?"":" (right axis)"),t})).call(A),o.top!=A.height()&&(o.top=A.height(),I=(s||parseInt(d.style("height"))||400)-(o.top||30)-(o.bottom||50)),Y.select(".legendWrap").attr("transform","translate("+D/2+","+-o.top+")")),g.width(D).height(I).interpolate("monotone").color(n.map(function(t,e){return t.color||i[e%i.length]}).filter(function(t,e){return!n[e].disabled&&1==n[e].yAxis&&"line"==n[e].type})),h.width(D).height(I).interpolate("monotone").color(n.map(function(t,e){return t.color||i[e%i.length]}).filter(function(t,e){return!n[e].disabled&&2==n[e].yAxis&&"line"==n[e].type})),m.width(D).height(I).color(n.map(function(t,e){return t.color||i[e%i.length]}).filter(function(t,e){return!n[e].disabled&&1==n[e].yAxis&&"bar"==n[e].type})),v.width(D).height(I).color(n.map(function(t,e){return t.color||i[e%i.length]}).filter(function(t,e){return!n[e].disabled&&2==n[e].yAxis&&"bar"==n[e].type})),y.width(D).height(I).color(n.map(function(t,e){return t.color||i[e%i.length]}).filter(function(t,e){return!n[e].disabled&&1==n[e].yAxis&&"stackedbar"==n[e].type})),x.width(D).height(I).color(n.map(function(t,e){return t.color||i[e%i.length]}).filter(function(t,e){return!n[e].disabled&&2==n[e].yAxis&&"stackedbar"==n[e].type})),Y.attr("transform","translate("+o.left+","+o.top+")");var R=Y.select(".lines1Wrap").datum(W.filter(function(t){return!t.disabled})),V=Y.select(".bars1Wrap").datum(z.filter(function(t){return!t.disabled})),_=Y.select(".stack1Wrap").datum(L.filter(function(t){return!t.disabled})),X=Y.select(".lines2Wrap").datum(N.filter(function(t){return!t.disabled})),Z=Y.select(".bars2Wrap").datum(F.filter(function(t){return!t.disabled})),G=Y.select(".stack2Wrap").datum(B.filter(function(t){return!t.disabled})),O=L.length?L.map(function(t){return t.values}).reduce(function(t,e){return t.map(function(t,n){return{x:t.x,y:t.y+e[n].y}})}).concat([{x:0,y:0}]):[],K=B.length?B.map(function(t){return t.values}).reduce(function(t,e){return t.map(function(t,n){return{x:t.x,y:t.y+e[n].y}})}).concat([{x:0,y:0}]):[];f.domain(r||d3.extent(d3.merge(P).concat(O),function(t){return t.y})).range([0,I]),p.domain(a||d3.extent(d3.merge(H).concat(K),function(t){return t.y})).range([0,I]),g.yDomain(f.domain()),m.yDomain(f.domain()),y.yDomain(f.domain()),h.yDomain(p.domain()),v.yDomain(p.domain()),x.yDomain(p.domain()),L.length&&d3.transition(_).call(y),B.length&&d3.transition(G).call(x),z.length&&d3.transition(V).call(m),F.length&&d3.transition(Z).call(v),W.length&&d3.transition(R).call(g),N.length&&d3.transition(X).call(h),b.ticks(D/100).tickSize(-I,0),Y.select(".x.axis").attr("transform","translate(0,"+I+")"),d3.transition(Y.select(".x.axis")).call(b),k.ticks(I/36).tickSize(-D,0),d3.transition(Y.select(".y1.axis")).call(k),w.ticks(I/36).tickSize(-D,0),d3.transition(Y.select(".y2.axis")).call(w),Y.select(".y2.axis").style("opacity",H.length?1:0).attr("transform","translate("+e.range()[1]+",0)"),A.dispatch.on("stateChange",function(){t.update()}),S.on("tooltipShow",function(t){c&&M(t,C.parentNode)})}),t}var e,r,a,o={top:30,right:20,bottom:50,left:60},i=d3.scale.category20().range(),l=null,s=null,u=!0,c=!0,d=function(t,e,n){return"<h3>"+t+"</h3><p>"+n+" at "+e+"</p>"},e=d3.scale.linear(),f=d3.scale.linear(),p=d3.scale.linear(),g=n.models.line().yScale(f),h=n.models.line().yScale(p),m=n.models.multiBar().stacked(!1).yScale(f),v=n.models.multiBar().stacked(!1).yScale(p),y=n.models.multiBar().stacked(!0).yScale(f),x=n.models.multiBar().stacked(!0).yScale(p),b=n.models.axis().scale(e).orient("bottom").tickPadding(5),k=n.models.axis().scale(f).orient("left"),w=n.models.axis().scale(p).orient("right"),A=n.models.legend().height(30),S=d3.dispatch("tooltipShow","tooltipHide"),M=function(e,r){var a=e.pos[0]+(r.offsetLeft||0),o=e.pos[1]+(r.offsetTop||0),i=b.tickFormat()(g.x()(e.point,e.pointIndex)),l=(2==e.series.yAxis?w:k).tickFormat()(g.y()(e.point,e.pointIndex)),s=d(e.series.key,i,l,e,t);n.tooltip.show([a,o],s,void 0,void 0,r.offsetParent)};return g.dispatch.on("elementMouseover.tooltip",function(t){t.pos=[t.pos[0]+o.left,t.pos[1]+o.top],S.tooltipShow(t)}),g.dispatch.on("elementMouseout.tooltip",function(t){S.tooltipHide(t)}),h.dispatch.on("elementMouseover.tooltip",function(t){t.pos=[t.pos[0]+o.left,t.pos[1]+o.top],S.tooltipShow(t)}),h.dispatch.on("elementMouseout.tooltip",function(t){S.tooltipHide(t)}),m.dispatch.on("elementMouseover.tooltip",function(t){t.pos=[t.pos[0]+o.left,t.pos[1]+o.top],S.tooltipShow(t)}),m.dispatch.on("elementMouseout.tooltip",function(t){S.tooltipHide(t)}),v.dispatch.on("elementMouseover.tooltip",function(t){t.pos=[t.pos[0]+o.left,t.pos[1]+o.top],S.tooltipShow(t)}),v.dispatch.on("elementMouseout.tooltip",function(t){S.tooltipHide(t)}),y.dispatch.on("elementMouseover.tooltip",function(t){t.pos=[t.pos[0]+o.left,t.pos[1]+o.top],S.tooltipShow(t)}),y.dispatch.on("elementMouseout.tooltip",function(t){S.tooltipHide(t)}),x.dispatch.on("elementMouseover.tooltip",function(t){t.pos=[t.pos[0]+o.left,t.pos[1]+o.top],S.tooltipShow(t)}),x.dispatch.on("elementMouseout.tooltip",function(t){S.tooltipHide(t)}),g.dispatch.on("elementMouseover.tooltip",function(t){t.pos=[t.pos[0]+o.left,t.pos[1]+o.top],S.tooltipShow(t)}),g.dispatch.on("elementMouseout.tooltip",function(t){S.tooltipHide(t)}),h.dispatch.on("elementMouseover.tooltip",function(t){t.pos=[t.pos[0]+o.left,t.pos[1]+o.top],S.tooltipShow(t)}),h.dispatch.on("elementMouseout.tooltip",function(t){S.tooltipHide(t)}),S.on("tooltipHide",function(){c&&n.tooltip.cleanup()}),t.dispatch=S,t.lines1=g,t.lines2=h,t.bars1=m,t.bars2=v,t.stack1=y,t.stack2=x,t.xAxis=b,t.yAxis1=k,t.yAxis2=w,t.options=n.utils.optionsFunc.bind(t),t.x=function(e){return arguments.length?(getX=e,g.x(e),m.x(e),t):getX},t.y=function(e){return arguments.length?(getY=e,g.y(e),m.y(e),t):getY},t.yDomain1=function(e){return arguments.length?(r=e,t):r},t.yDomain2=function(e){return arguments.length?(a=e,t):a},t.margin=function(e){return arguments.length?(o=e,t):o},t.width=function(e){return arguments.length?(l=e,t):l},t.height=function(e){return arguments.length?(s=e,t):s},t.color=function(e){return arguments.length?(i=e,A.color(e),t):i},t.showLegend=function(e){return arguments.length?(u=e,t):u},t.tooltips=function(e){return arguments.length?(c=e,t):c},t.tooltipContent=function(e){return arguments.length?(d=e,t):d},t},n.models.ohlcBar=function(){"use strict";function t(n){return n.each(function(t){var n=l-i.left-i.right,w=s-i.top-i.bottom,S=d3.select(this);c.domain(e||d3.extent(t[0].values.map(f).concat(y))),c.range(b?a||[.5*n/t[0].values.length,n*(t[0].values.length-.5)/t[0].values.length]:a||[0,n]),d.domain(r||[d3.min(t[0].values.map(v).concat(x)),d3.max(t[0].values.map(m).concat(x))]).range(o||[w,0]),c.domain()[0]===c.domain()[1]&&c.domain(c.domain()[0]?[c.domain()[0]-.01*c.domain()[0],c.domain()[1]+.01*c.domain()[1]]:[-1,1]),d.domain()[0]===d.domain()[1]&&d.domain(d.domain()[0]?[d.domain()[0]+.01*d.domain()[0],d.domain()[1]-.01*d.domain()[1]]:[-1,1]);
var M=d3.select(this).selectAll("g.nv-wrap.nv-ohlcBar").data([t[0].values]),C=M.enter().append("g").attr("class","nvd3 nv-wrap nv-ohlcBar"),D=C.append("defs"),I=C.append("g"),W=M.select("g");I.append("g").attr("class","nv-ticks"),M.attr("transform","translate("+i.left+","+i.top+")"),S.on("click",function(t,e){A.chartClick({data:t,index:e,pos:d3.event,id:u})}),D.append("clipPath").attr("id","nv-chart-clip-path-"+u).append("rect"),M.select("#nv-chart-clip-path-"+u+" rect").attr("width",n).attr("height",w),W.attr("clip-path",k?"url(#nv-chart-clip-path-"+u+")":"");var N=M.select(".nv-ticks").selectAll(".nv-tick").data(function(t){return t});N.exit().remove();N.enter().append("path").attr("class",function(t,e,n){return(g(t,e)>h(t,e)?"nv-tick negative":"nv-tick positive")+" nv-tick-"+n+"-"+e}).attr("d",function(e,r){var a=n/t[0].values.length*.9;return"m0,0l0,"+(d(g(e,r))-d(m(e,r)))+"l"+-a/2+",0l"+a/2+",0l0,"+(d(v(e,r))-d(g(e,r)))+"l0,"+(d(h(e,r))-d(v(e,r)))+"l"+a/2+",0l"+-a/2+",0z"}).attr("transform",function(t,e){return"translate("+c(f(t,e))+","+d(m(t,e))+")"}).on("mouseover",function(e,n){d3.select(this).classed("hover",!0),A.elementMouseover({point:e,series:t[0],pos:[c(f(e,n)),d(p(e,n))],pointIndex:n,seriesIndex:0,e:d3.event})}).on("mouseout",function(e,n){d3.select(this).classed("hover",!1),A.elementMouseout({point:e,series:t[0],pointIndex:n,seriesIndex:0,e:d3.event})}).on("click",function(t,e){A.elementClick({value:p(t,e),data:t,index:e,pos:[c(f(t,e)),d(p(t,e))],e:d3.event,id:u}),d3.event.stopPropagation()}).on("dblclick",function(t,e){A.elementDblClick({value:p(t,e),data:t,index:e,pos:[c(f(t,e)),d(p(t,e))],e:d3.event,id:u}),d3.event.stopPropagation()});N.attr("class",function(t,e,n){return(g(t,e)>h(t,e)?"nv-tick negative":"nv-tick positive")+" nv-tick-"+n+"-"+e}),d3.transition(N).attr("transform",function(t,e){return"translate("+c(f(t,e))+","+d(m(t,e))+")"}).attr("d",function(e,r){var a=n/t[0].values.length*.9;return"m0,0l0,"+(d(g(e,r))-d(m(e,r)))+"l"+-a/2+",0l"+a/2+",0l0,"+(d(v(e,r))-d(g(e,r)))+"l0,"+(d(h(e,r))-d(v(e,r)))+"l"+a/2+",0l"+-a/2+",0z"})}),t}var e,r,a,o,i={top:0,right:0,bottom:0,left:0},l=960,s=500,u=Math.floor(1e4*Math.random()),c=d3.scale.linear(),d=d3.scale.linear(),f=function(t){return t.x},p=function(t){return t.y},g=function(t){return t.open},h=function(t){return t.close},m=function(t){return t.high},v=function(t){return t.low},y=[],x=[],b=!1,k=!0,w=n.utils.defaultColor(),A=d3.dispatch("chartClick","elementClick","elementDblClick","elementMouseover","elementMouseout");return t.dispatch=A,t.options=n.utils.optionsFunc.bind(t),t.x=function(e){return arguments.length?(f=e,t):f},t.y=function(e){return arguments.length?(p=e,t):p},t.open=function(e){return arguments.length?(g=e,t):g},t.close=function(e){return arguments.length?(h=e,t):h},t.high=function(e){return arguments.length?(m=e,t):m},t.low=function(e){return arguments.length?(v=e,t):v},t.margin=function(e){return arguments.length?(i.top="undefined"!=typeof e.top?e.top:i.top,i.right="undefined"!=typeof e.right?e.right:i.right,i.bottom="undefined"!=typeof e.bottom?e.bottom:i.bottom,i.left="undefined"!=typeof e.left?e.left:i.left,t):i},t.width=function(e){return arguments.length?(l=e,t):l},t.height=function(e){return arguments.length?(s=e,t):s},t.xScale=function(e){return arguments.length?(c=e,t):c},t.yScale=function(e){return arguments.length?(d=e,t):d},t.xDomain=function(n){return arguments.length?(e=n,t):e},t.yDomain=function(e){return arguments.length?(r=e,t):r},t.xRange=function(e){return arguments.length?(a=e,t):a},t.yRange=function(e){return arguments.length?(o=e,t):o},t.forceX=function(e){return arguments.length?(y=e,t):y},t.forceY=function(e){return arguments.length?(x=e,t):x},t.padData=function(e){return arguments.length?(b=e,t):b},t.clipEdge=function(e){return arguments.length?(k=e,t):k},t.color=function(e){return arguments.length?(w=n.utils.getColor(e),t):w},t.id=function(e){return arguments.length?(u=e,t):u},t},n.models.pie=function(){"use strict";function t(n){return n.each(function(t){function n(t){t.endAngle=isNaN(t.endAngle)?0:t.endAngle,t.startAngle=isNaN(t.startAngle)?0:t.startAngle,v||(t.innerRadius=0);var e=d3.interpolate(this._current,t);return this._current=e(0),function(t){return N(e(t))}}var l=r-e.left-e.right,c=a-e.top-e.bottom,A=Math.min(l,c)/2,S=A-A/5,M=d3.select(this),C=M.selectAll(".nv-wrap.nv-pie").data(t),D=C.enter().append("g").attr("class","nvd3 nv-wrap nv-pie nv-chart-"+s),I=D.append("g"),W=C.select("g");I.append("g").attr("class","nv-pie"),I.append("g").attr("class","nv-pieLabels"),C.attr("transform","translate("+e.left+","+e.top+")"),W.select(".nv-pie").attr("transform","translate("+l/2+","+c/2+")"),W.select(".nv-pieLabels").attr("transform","translate("+l/2+","+c/2+")"),M.on("click",function(t,e){w.chartClick({data:t,index:e,pos:d3.event,id:s})});var N=d3.svg.arc().outerRadius(S);x&&N.startAngle(x),b&&N.endAngle(b),v&&N.innerRadius(A*k);var z=d3.layout.pie().sort(null).value(function(t){return t.disabled?0:i(t)}),F=C.select(".nv-pie").selectAll(".nv-slice").data(z),L=C.select(".nv-pieLabels").selectAll(".nv-label").data(z);F.exit().remove(),L.exit().remove();var B=F.enter().append("g").attr("class","nv-slice").on("mouseover",function(t,e){d3.select(this).classed("hover",!0),w.elementMouseover({label:o(t.data),value:i(t.data),point:t.data,pointIndex:e,pos:[d3.event.pageX,d3.event.pageY],id:s})}).on("mouseout",function(t,e){d3.select(this).classed("hover",!1),w.elementMouseout({label:o(t.data),value:i(t.data),point:t.data,index:e,id:s})}).on("click",function(t,e){w.elementClick({label:o(t.data),value:i(t.data),point:t.data,index:e,pos:d3.event,id:s}),d3.event.stopPropagation()}).on("dblclick",function(t,e){w.elementDblClick({label:o(t.data),value:i(t.data),point:t.data,index:e,pos:d3.event,id:s}),d3.event.stopPropagation()});F.attr("fill",function(t,e){return u(t,e)}).attr("stroke",function(t,e){return u(t,e)});B.append("path").each(function(t){this._current=t});if(F.select("path").transition().attr("d",N).attrTween("d",n),f){var P=d3.svg.arc().innerRadius(0);p&&(P=N),g&&(P=d3.svg.arc().outerRadius(N.outerRadius())),L.enter().append("g").classed("nv-label",!0).each(function(t){var e=d3.select(this);e.attr("transform",function(t){if(y){t.outerRadius=S+10,t.innerRadius=S+15;var e=(t.startAngle+t.endAngle)/2*(180/Math.PI);return(t.startAngle+t.endAngle)/2<Math.PI?e-=90:e+=90,"translate("+P.centroid(t)+") rotate("+e+")"}return t.outerRadius=A+10,t.innerRadius=A+15,"translate("+P.centroid(t)+")"}),e.append("rect").style("stroke","#fff").style("fill","#fff").attr("rx",3).attr("ry",3),e.append("text").style("text-anchor",y?(t.startAngle+t.endAngle)/2<Math.PI?"start":"end":"middle").style("fill","#000")});var H={},T=14,E=140,Y=function(t){return Math.floor(t[0]/E)*E+","+Math.floor(t[1]/T)*T};L.transition().attr("transform",function(t){if(y){t.outerRadius=S+10,t.innerRadius=S+15;var e=(t.startAngle+t.endAngle)/2*(180/Math.PI);return(t.startAngle+t.endAngle)/2<Math.PI?e-=90:e+=90,"translate("+P.centroid(t)+") rotate("+e+")"}t.outerRadius=A+10,t.innerRadius=A+15;var n=P.centroid(t),r=Y(n);return H[r]&&(n[1]-=T),H[Y(n)]=!0,"translate("+n+")"}),L.select(".nv-label text").style("text-anchor",y?(d.startAngle+d.endAngle)/2<Math.PI?"start":"end":"middle").text(function(t){var e=(t.endAngle-t.startAngle)/(2*Math.PI),n={key:o(t.data),value:i(t.data),percent:d3.format("%")(e)};return t.value&&e>m?n[h]:""})}}),t}var e={top:0,right:0,bottom:0,left:0},r=500,a=500,o=function(t){return t.x},i=function(t){return t.y},l=function(t){return t.description},s=Math.floor(1e4*Math.random()),u=n.utils.defaultColor(),c=d3.format(",.2f"),f=!0,p=!0,g=!1,h="key",m=.02,v=!1,y=!1,x=!1,b=!1,k=.5,w=d3.dispatch("chartClick","elementClick","elementDblClick","elementMouseover","elementMouseout");return t.dispatch=w,t.options=n.utils.optionsFunc.bind(t),t.margin=function(n){return arguments.length?(e.top="undefined"!=typeof n.top?n.top:e.top,e.right="undefined"!=typeof n.right?n.right:e.right,e.bottom="undefined"!=typeof n.bottom?n.bottom:e.bottom,e.left="undefined"!=typeof n.left?n.left:e.left,t):e},t.width=function(e){return arguments.length?(r=e,t):r},t.height=function(e){return arguments.length?(a=e,t):a},t.values=function(){return n.log("pie.values() is no longer supported."),t},t.x=function(e){return arguments.length?(o=e,t):o},t.y=function(e){return arguments.length?(i=d3.functor(e),t):i},t.description=function(e){return arguments.length?(l=e,t):l},t.showLabels=function(e){return arguments.length?(f=e,t):f},t.labelSunbeamLayout=function(e){return arguments.length?(y=e,t):y},t.donutLabelsOutside=function(e){return arguments.length?(g=e,t):g},t.pieLabelsOutside=function(e){return arguments.length?(p=e,t):p},t.labelType=function(e){return arguments.length?(h=e,h=h||"key",t):h},t.donut=function(e){return arguments.length?(v=e,t):v},t.donutRatio=function(e){return arguments.length?(k=e,t):k},t.startAngle=function(e){return arguments.length?(x=e,t):x},t.endAngle=function(e){return arguments.length?(b=e,t):b},t.id=function(e){return arguments.length?(s=e,t):s},t.color=function(e){return arguments.length?(u=n.utils.getColor(e),t):u},t.valueFormat=function(e){return arguments.length?(c=e,t):c},t.labelThreshold=function(e){return arguments.length?(m=e,t):m},t},n.models.pieChart=function(){"use strict";function t(n){return n.each(function(n){var s=d3.select(this),u=(o||parseInt(s.style("width"))||960)-a.left-a.right,c=(i||parseInt(s.style("height"))||400)-a.top-a.bottom;if(t.update=function(){s.transition().call(t)},t.container=this,d.disabled=n.map(function(t){return!!t.disabled}),!f){var h;f={};for(h in d)f[h]=d[h]instanceof Array?d[h].slice(0):d[h]}if(!n||!n.length){var m=s.selectAll(".nv-noData").data([p]);return m.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),m.attr("x",a.left+u/2).attr("y",a.top+c/2).text(function(t){return t}),t}s.selectAll(".nv-noData").remove();var v=s.selectAll("g.nv-wrap.nv-pieChart").data([n]),y=v.enter().append("g").attr("class","nvd3 nv-wrap nv-pieChart").append("g"),x=v.select("g");y.append("g").attr("class","nv-pieWrap"),y.append("g").attr("class","nv-legendWrap"),l&&(r.width(u).key(e.x()),v.select(".nv-legendWrap").datum(n).call(r),a.top!=r.height()&&(a.top=r.height(),c=(i||parseInt(s.style("height"))||400)-a.top-a.bottom),v.select(".nv-legendWrap").attr("transform","translate(0,"+-a.top+")")),v.attr("transform","translate("+a.left+","+a.top+")"),e.width(u).height(c);var b=x.select(".nv-pieWrap").datum([n]);d3.transition(b).call(e),r.dispatch.on("stateChange",function(e){d=e,g.stateChange(d),t.update()}),e.dispatch.on("elementMouseout.tooltip",function(t){g.tooltipHide(t)}),g.on("changeState",function(e){"undefined"!=typeof e.disabled&&(n.forEach(function(t,n){t.disabled=e.disabled[n]}),d.disabled=e.disabled),t.update()})}),t}var e=n.models.pie(),r=n.models.legend(),a={top:30,right:20,bottom:20,left:20},o=null,i=null,l=!0,s=n.utils.defaultColor(),u=!0,c=function(t,e){return"<h3>"+t+"</h3><p>"+e+"</p>"},d={},f=null,p="No Data Available.",g=d3.dispatch("tooltipShow","tooltipHide","stateChange","changeState"),h=function(r,a){var o=e.description()(r.point)||e.x()(r.point),i=r.pos[0]+(a&&a.offsetLeft||0),l=r.pos[1]+(a&&a.offsetTop||0),s=e.valueFormat()(e.y()(r.point)),u=c(o,s,r,t);n.tooltip.show([i,l],u,r.value<0?"n":"s",null,a)};return e.dispatch.on("elementMouseover.tooltip",function(t){t.pos=[t.pos[0]+a.left,t.pos[1]+a.top],g.tooltipShow(t)}),g.on("tooltipShow",function(t){u&&h(t)}),g.on("tooltipHide",function(){u&&n.tooltip.cleanup()}),t.legend=r,t.dispatch=g,t.pie=e,d3.rebind(t,e,"valueFormat","values","x","y","description","id","showLabels","donutLabelsOutside","pieLabelsOutside","labelType","donut","donutRatio","labelThreshold"),t.options=n.utils.optionsFunc.bind(t),t.margin=function(e){return arguments.length?(a.top="undefined"!=typeof e.top?e.top:a.top,a.right="undefined"!=typeof e.right?e.right:a.right,a.bottom="undefined"!=typeof e.bottom?e.bottom:a.bottom,a.left="undefined"!=typeof e.left?e.left:a.left,t):a},t.width=function(e){return arguments.length?(o=e,t):o},t.height=function(e){return arguments.length?(i=e,t):i},t.color=function(a){return arguments.length?(s=n.utils.getColor(a),r.color(s),e.color(s),t):s},t.showLegend=function(e){return arguments.length?(l=e,t):l},t.tooltips=function(e){return arguments.length?(u=e,t):u},t.tooltipContent=function(e){return arguments.length?(c=e,t):c},t.state=function(e){return arguments.length?(d=e,t):d},t.defaultState=function(e){return arguments.length?(f=e,t):f},t.noData=function(e){return arguments.length?(p=e,t):p},t},n.models.scatter=function(){"use strict";function t(V){return V.each(function(t){function V(){if(!w)return!1;var e=d3.merge(t.map(function(t,e){return t.values.map(function(t,n){var r=g(t,n),a=h(t,n),o="undefined"==typeof e?0:e;return[d(r)+Math.floor(100*Math.random()+1)/1e6,f(a)+o/100+Math.floor(10*Math.random()+1)/1e6,e,n,t]}).filter(function(t,e){return S(t[4],e)})}));if(E===!0){if(I){var n=O.select("defs").selectAll(".nv-point-clips").data([c]).enter();n.append("clipPath").attr("class","nv-point-clips").attr("id","nv-points-clip-"+c);var r=O.select("#nv-points-clip-"+c).selectAll("circle").data(e);r.enter().append("circle").attr("r",W),r.exit().remove(),r.attr("cx",function(t){return t[0]}).attr("cy",function(t){return t[1]}),O.select(".nv-point-paths").attr("clip-path","url(#nv-points-clip-"+c+")")}e.length&&(e.push([d.range()[0]-20,f.range()[0]-20,null,null]),e.push([d.range()[1]+20,f.range()[1]+20,null,null]),e.push([d.range()[0]-20,f.range()[0]+20,null,null]),e.push([d.range()[1]+20,f.range()[1]-20,null,null]));var a=d3.geom.polygon([[-10,-10],[-10,s+10],[l+10,s+10],[l+10,-10]]),o=d3.geom.voronoi(e).map(function(t,n){return{data:a.clip(t),series:e[n][2],point:e[n][3]}}),u=O.select(".nv-point-paths").selectAll("path").data(o);u.enter().append("path").attr("class",function(t,e){return"nv-path-"+e}),u.exit().remove(),u.attr("d",function(t){if("undefined"==typeof t||0===t.data.length||"undefined"==typeof t.data[0])return"M 0 0";var e=t.data;return 2==t.data[0].length&&(e=t.data.map(function(t){return[t[0]||0,t[1]||0]})),"M"+e.join("L")+"Z"});var p=function(e,n){if(R)return 0;var r=t[e.series];if("undefined"!=typeof r){var a=r.values[e.point];n({point:a,series:r,pos:[d(g(a,e.point))+i.left,f(h(a,e.point))+i.top],seriesIndex:e.series,pointIndex:e.point})}};u.on("click",function(t){p(t,T.elementClick)}).on("mouseover",function(t){p(t,T.elementMouseover)}).on("mouseout",function(t){p(t,T.elementMouseout)})}else O.select(".nv-groups").selectAll(".nv-group").selectAll(".nv-point").on("click",function(e,n){if(R||!t[e.series])return 0;var r=t[e.series],a=r.values[n];T.elementClick({point:a,series:r,pos:[d(g(a,n))+i.left,f(h(a,n))+i.top],seriesIndex:e.series,pointIndex:n})}).on("mouseover",function(e,n){if(R||!t[e.series])return 0;var r=t[e.series],a=r.values[n];T.elementMouseover({point:a,series:r,pos:[d(g(a,n))+i.left,f(h(a,n))+i.top],seriesIndex:e.series,pointIndex:n})}).on("mouseout",function(e,n){if(R||!t[e.series])return 0;var r=t[e.series],a=r.values[n];T.elementMouseout({point:a,series:r,seriesIndex:e.series,pointIndex:n})});R=!1}var _=l-i.left-i.right,X=s-i.top-i.bottom,Z=d3.select(this);t.forEach(function(t,e){t.values.forEach(function(t){t.series=e})});var G=N&&z&&B?[]:d3.merge(t.map(function(t){return t.values.map(function(t,e){return{x:g(t,e),y:h(t,e),size:m(t,e)}})}));d.domain(N||d3.extent(G.map(function(t){return t.x}).concat(x))),d.range(M&&t[0]?F||[(_*C+_)/(2*t[0].values.length),_-_*(1+C)/(2*t[0].values.length)]:F||[0,_]),f.domain(z||d3.extent(G.map(function(t){return t.y}).concat(b))).range(L||[X,0]),p.domain(B||d3.extent(G.map(function(t){return t.size}).concat(k))).range(P||[16,256]),(d.domain()[0]===d.domain()[1]||f.domain()[0]===f.domain()[1])&&(H=!0),d.domain()[0]===d.domain()[1]&&d.domain(d.domain()[0]?[d.domain()[0]-.01*d.domain()[0],d.domain()[1]+.01*d.domain()[1]]:[-1,1]),f.domain()[0]===f.domain()[1]&&f.domain(f.domain()[0]?[f.domain()[0]-.01*f.domain()[0],f.domain()[1]+.01*f.domain()[1]]:[-1,1]),isNaN(d.domain()[0])&&d.domain([-1,1]),isNaN(f.domain()[0])&&f.domain([-1,1]),e=e||d,r=r||f,a=a||p;var O=Z.selectAll("g.nv-wrap.nv-scatter").data([t]),K=O.enter().append("g").attr("class","nvd3 nv-wrap nv-scatter nv-chart-"+c+(H?" nv-single-point":"")),q=K.append("defs"),j=K.append("g"),U=O.select("g");j.append("g").attr("class","nv-groups"),j.append("g").attr("class","nv-point-paths"),O.attr("transform","translate("+i.left+","+i.top+")"),q.append("clipPath").attr("id","nv-edge-clip-"+c).append("rect"),O.select("#nv-edge-clip-"+c+" rect").attr("width",_).attr("height",X>0?X:0),U.attr("clip-path",D?"url(#nv-edge-clip-"+c+")":""),R=!0;var $=O.select(".nv-groups").selectAll(".nv-group").data(function(t){return t},function(t){return t.key});if($.enter().append("g").style("stroke-opacity",1e-6).style("fill-opacity",1e-6),$.exit().remove(),$.attr("class",function(t,e){return"nv-group nv-series-"+e}).classed("hover",function(t){return t.hover}),$.transition().style("fill",function(t,e){return u(t,e)}).style("stroke",function(t,e){return u(t,e)}).style("stroke-opacity",1).style("fill-opacity",.5),y){var J=$.selectAll("circle.nv-point").data(function(t){return t.values},A);if(Y){var Q=$.selectAll("text").data(function(t){return t.values},A);Q.enter().append("text").style("fill",function(t){return t.color}).style("stroke-opacity",0).style("fill-opacity",1).attr("x",function(t,r){return n.utils.NaNtoZero(e(g(t,r)))+Math.sqrt(p(m(t,r))/Math.PI)}).attr("y",function(t,e){return n.utils.NaNtoZero(r(h(t,e)))}).text(function(t){return t.tooltip}),Q.exit().remove(),$.exit().selectAll("text.nv-point").transition().attr("x",function(t,e){return n.utils.NaNtoZero(d(g(t,e)))}).attr("y",function(t,e){return n.utils.NaNtoZero(f(h(t,e)))}).remove(),Q.each(function(t,e){d3.select(this).classed("nv-point",!0).classed("nv-point-"+e,!1).classed("hover",!1)}),Q.transition().attr("x",function(t,e){return n.utils.NaNtoZero(d(g(t,e)))+Math.sqrt(p(m(t,e))/Math.PI)}).attr("y",function(t,e){return n.utils.NaNtoZero(f(h(t,e)))})}J.enter().append("circle").style("fill",function(t){return t.color}).style("stroke",function(t){return t.color}).attr("cx",function(t,r){return n.utils.NaNtoZero(e(g(t,r)))}).attr("cy",function(t,e){return n.utils.NaNtoZero(r(h(t,e)))}).attr("r",function(t,e){return Math.sqrt(p(m(t,e))/Math.PI)}),J.exit().remove(),$.exit().selectAll("path.nv-point").transition().attr("cx",function(t,e){return n.utils.NaNtoZero(d(g(t,e)))}).attr("cy",function(t,e){return n.utils.NaNtoZero(f(h(t,e)))}).remove(),J.each(function(t,e){d3.select(this).classed("nv-point",!0).classed("nv-point-"+e,!0).classed("hover",!1)}),J.transition().attr("cx",function(t,e){return n.utils.NaNtoZero(d(g(t,e)))}).attr("cy",function(t,e){return n.utils.NaNtoZero(f(h(t,e)))}).attr("r",function(t,e){return Math.sqrt(p(m(t,e))/Math.PI)})}else{var J=$.selectAll("path.nv-point").data(function(t){return t.values});J.enter().append("path").style("fill",function(t){return t.color}).style("stroke",function(t){return t.color}).attr("transform",function(t,n){return"translate("+e(g(t,n))+","+r(h(t,n))+")"}).attr("d",d3.svg.symbol().type(v).size(function(t,e){return p(m(t,e))})),J.exit().remove(),$.exit().selectAll("path.nv-point").transition().attr("transform",function(t,e){return"translate("+d(g(t,e))+","+f(h(t,e))+")"}).remove(),J.each(function(t,e){d3.select(this).classed("nv-point",!0).classed("nv-point-"+e,!0).classed("hover",!1)}),J.transition().attr("transform",function(t,e){return"translate("+d(g(t,e))+","+f(h(t,e))+")"}).attr("d",d3.svg.symbol().type(v).size(function(t,e){return p(m(t,e))}))}clearTimeout(o),o=setTimeout(V,300),e=d.copy(),r=f.copy(),a=p.copy()}),t}var e,r,a,o,i={top:0,right:0,bottom:0,left:0},l=960,s=500,u=n.utils.defaultColor(),c=Math.floor(1e5*Math.random()),d=d3.scale.linear(),f=d3.scale.linear(),p=d3.scale.linear(),g=function(t){return t.x},h=function(t){return t.y},m=function(t){return t.size||1},v=function(t){return t.shape||"circle"},y=!0,x=[],b=[],k=[],w=!0,A=null,S=function(t){return!t.notActive},M=!1,C=.1,D=!1,I=!0,W=function(){return 25},N=null,z=null,F=null,L=null,B=null,P=null,H=!1,T=d3.dispatch("elementClick","elementMouseover","elementMouseout"),E=!0,Y=!1,R=!1;return t.clearHighlights=function(){d3.selectAll(".nv-chart-"+c+" .nv-point.hover").classed("hover",!1)},t.highlightPoint=function(t,e,n){d3.select(".nv-chart-"+c+" .nv-series-"+t+" .nv-point-"+e).classed("hover",n)},T.on("elementMouseover.point",function(e){w&&t.highlightPoint(e.seriesIndex,e.pointIndex,!0)}),T.on("elementMouseout.point",function(e){w&&t.highlightPoint(e.seriesIndex,e.pointIndex,!1)}),t.dispatch=T,t.options=n.utils.optionsFunc.bind(t),t.x=function(e){return arguments.length?(g=d3.functor(e),t):g},t.y=function(e){return arguments.length?(h=d3.functor(e),t):h},t.size=function(e){return arguments.length?(m=d3.functor(e),t):m},t.margin=function(e){return arguments.length?(i.top="undefined"!=typeof e.top?e.top:i.top,i.right="undefined"!=typeof e.right?e.right:i.right,i.bottom="undefined"!=typeof e.bottom?e.bottom:i.bottom,i.left="undefined"!=typeof e.left?e.left:i.left,t):i},t.width=function(e){return arguments.length?(l=e,t):l},t.height=function(e){return arguments.length?(s=e,t):s},t.xScale=function(e){return arguments.length?(d=e,t):d},t.yScale=function(e){return arguments.length?(f=e,t):f},t.zScale=function(e){return arguments.length?(p=e,t):p},t.xDomain=function(e){return arguments.length?(N=e,t):N},t.yDomain=function(e){return arguments.length?(z=e,t):z},t.sizeDomain=function(e){return arguments.length?(B=e,t):B},t.xRange=function(e){return arguments.length?(F=e,t):F},t.yRange=function(e){return arguments.length?(L=e,t):L},t.sizeRange=function(e){return arguments.length?(P=e,t):P},t.forceX=function(e){return arguments.length?(x=e,t):x},t.forceY=function(e){return arguments.length?(b=e,t):b},t.forceSize=function(e){return arguments.length?(k=e,t):k},t.interactive=function(e){return arguments.length?(w=e,t):w},t.pointKey=function(e){return arguments.length?(A=e,t):A},t.pointActive=function(e){return arguments.length?(S=e,t):S},t.padData=function(e){return arguments.length?(M=e,t):M},t.padDataOuter=function(e){return arguments.length?(C=e,t):C},t.clipEdge=function(e){return arguments.length?(D=e,t):D},t.clipVoronoi=function(e){return arguments.length?(I=e,t):I},t.useVoronoi=function(e){return arguments.length?(E=e,E===!1&&(I=!1),t):E},t.clipRadius=function(e){return arguments.length?(W=e,t):W},t.color=function(e){return arguments.length?(u=n.utils.getColor(e),t):u},t.shape=function(e){return arguments.length?(v=e,t):v},t.onlyCircles=function(e){return arguments.length?(y=e,t):y},t.id=function(e){return arguments.length?(c=e,t):c},t.singlePoint=function(e){return arguments.length?(H=e,t):H},t.showLabel=function(e){return arguments.length?(Y=e,t):Y},t},n.models.scatterChart=function(){"use strict";function t(n){return n.each(function(n){function D(){if(M)return K.select(".nv-point-paths").style("pointer-events","all"),!1;K.select(".nv-point-paths").style("pointer-events","none");var t=d3.mouse(this);p.distortion(S).focus(t[0]),g.distortion(S).focus(t[1]),K.select(".nv-scatterWrap").call(e),b&&K.select(".nv-x.nv-axis").call(r),k&&K.select(".nv-y.nv-axis").call(a),K.select(".nv-distributionX").datum(n.filter(function(t){return!t.disabled})).call(l),K.select(".nv-distributionY").datum(n.filter(function(t){return!t.disabled})).call(s)}var I=d3.select(this),W=this,R=(c||parseInt(I.style("width"))||960)-u.left-u.right,V=(d||parseInt(I.style("height"))||400)-u.top-u.bottom;if(t.update=function(){I.transition().duration(B).call(t)},t.container=this,N.disabled=n.map(function(t){return!!t.disabled}),!z){var _;z={};for(_ in N)z[_]=N[_]instanceof Array?N[_].slice(0):N[_]}if(!(n&&n.length&&n.filter(function(t){return t.values.length}).length)){var X=I.selectAll(".nv-noData").data([L]);return X.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),X.attr("x",u.left+R/2).attr("y",u.top+V/2).text(function(t){return t}),t}I.selectAll(".nv-noData").remove(),H=H||p,T=T||g;var Z=I.selectAll("g.nv-wrap.nv-scatterChart").data([n]),G=Z.enter().append("g").attr("class","nvd3 nv-wrap nv-scatterChart nv-chart-"+e.id()),O=G.append("g"),K=Z.select("g");if(O.append("rect").attr("class","nvd3 nv-background"),O.append("g").attr("class","nv-x nv-axis"),O.append("g").attr("class","nv-y nv-axis"),O.append("g").attr("class","nv-scatterWrap"),O.append("g").attr("class","nv-distWrap"),O.append("g").attr("class","nv-legendWrap"),O.append("g").attr("class","nv-controlsWrap"),x){var q=A?R-180:R;o.width(q),Z.select(".nv-legendWrap").datum(n).call(o),u.top!=o.height()&&(u.top=o.height(),V=(d||parseInt(I.style("height"))||400)-u.top-u.bottom),Z.select(".nv-legendWrap").attr("transform","translate("+(R-q)+","+-u.top+")")}if(A&&(i.width(180).color(["#444"]),K.select(".nv-controlsWrap").datum(Y).attr("transform","translate(0,"+-u.top+")").call(i)),Z.attr("transform","translate("+u.left+","+u.top+")"),w&&K.select(".nv-y.nv-axis").attr("transform","translate("+R+",0)"),e.width(R).height(V).color(n.map(function(t,e){return t.color||f(t,e)}).filter(function(t,e){return!n[e].disabled})),P&&e.showLabel(!0),0!==h&&e.xDomain(null),0!==m&&e.yDomain(null),Z.select(".nv-scatterWrap").datum(n.filter(function(t){return!t.disabled})).call(e),0!==h){var j=p.domain()[1]-p.domain()[0];e.xDomain([p.domain()[0]-h*j,p.domain()[1]+h*j])}if(0!==m){var U=g.domain()[1]-g.domain()[0];e.yDomain([g.domain()[0]-m*U,g.domain()[1]+m*U])}(0!==m||0!==h)&&Z.select(".nv-scatterWrap").datum(n.filter(function(t){return!t.disabled})).call(e),b&&(r.scale(p).ticks(r.ticks()&&r.ticks().length?r.ticks():R/100).tickSize(-V,0),K.select(".nv-x.nv-axis").attr("transform","translate(0,"+g.range()[0]+")").call(r)),k&&(a.scale(g).ticks(a.ticks()&&a.ticks().length?a.ticks():V/36).tickSize(-R,0),K.select(".nv-y.nv-axis").call(a)),v&&(l.getData(e.x()).scale(p).width(R).color(n.map(function(t,e){return t.color||f(t,e)}).filter(function(t,e){return!n[e].disabled})),O.select(".nv-distWrap").append("g").attr("class","nv-distributionX"),K.select(".nv-distributionX").attr("transform","translate(0,"+g.range()[0]+")").datum(n.filter(function(t){return!t.disabled})).call(l)),y&&(s.getData(e.y()).scale(g).width(V).color(n.map(function(t,e){return t.color||f(t,e)}).filter(function(t,e){return!n[e].disabled})),O.select(".nv-distWrap").append("g").attr("class","nv-distributionY"),K.select(".nv-distributionY").attr("transform","translate("+(w?R:-s.size())+",0)").datum(n.filter(function(t){return!t.disabled})).call(s)),d3.fisheye&&(K.select(".nv-background").attr("width",R).attr("height",V),K.select(".nv-background").on("mousemove",D),K.select(".nv-background").on("click",function(){M=!M}),e.dispatch.on("elementClick.freezeFisheye",function(){M=!M})),i.dispatch.on("legendClick",function(n){n.disabled=!n.disabled,S=n.disabled?0:2.5,K.select(".nv-background").style("pointer-events",n.disabled?"none":"all"),K.select(".nv-point-paths").style("pointer-events",n.disabled?"all":"none"),n.disabled?(p.distortion(S).focus(0),g.distortion(S).focus(0),K.select(".nv-scatterWrap").call(e),K.select(".nv-x.nv-axis").call(r),K.select(".nv-y.nv-axis").call(a)):M=!1,t.update()}),o.dispatch.on("stateChange",function(e){N.disabled=e.disabled,F.stateChange(N),t.update()}),e.dispatch.on("elementMouseover.tooltip",function(t){d3.select(".nv-chart-"+e.id()+" .nv-series-"+t.seriesIndex+" .nv-distx-"+t.pointIndex).attr("y1",function(){return t.pos[1]-V}),d3.select(".nv-chart-"+e.id()+" .nv-series-"+t.seriesIndex+" .nv-disty-"+t.pointIndex).attr("x2",t.pos[0]+l.size()),t.pos=[t.pos[0]+u.left,t.pos[1]+u.top],F.tooltipShow(t)}),F.on("tooltipShow",function(t){C&&E(t,W.parentNode)}),F.on("changeState",function(e){"undefined"!=typeof e.disabled&&(n.forEach(function(t,n){t.disabled=e.disabled[n]}),N.disabled=e.disabled),t.update()}),H=p.copy(),T=g.copy()}),t}var e=n.models.scatter(),r=n.models.axis(),a=n.models.axis(),o=n.models.legend(),i=n.models.legend(),l=n.models.distribution(),s=n.models.distribution(),u={top:30,right:20,bottom:50,left:75},c=null,d=null,f=n.utils.defaultColor(),p=d3.fisheye?d3.fisheye.scale(d3.scale.linear).distortion(0):e.xScale(),g=d3.fisheye?d3.fisheye.scale(d3.scale.linear).distortion(0):e.yScale(),h=0,m=0,v=!1,y=!1,x=!0,b=!0,k=!0,w=!1,A=!!d3.fisheye,S=0,M=!1,C=!0,D=function(t,e){return"<strong>"+e+"</strong>"},I=function(t,e,n){return"<strong>"+n+"</strong>"},W=null,N={},z=null,F=d3.dispatch("tooltipShow","tooltipHide","stateChange","changeState"),L="No Data Available.",B=250,P=!1;e.xScale(p).yScale(g),r.orient("bottom").tickPadding(10),a.orient(w?"right":"left").tickPadding(10),l.axis("x"),s.axis("y"),i.updateState(!1);var H,T,E=function(o,i){var l=o.pos[0]+(i.offsetLeft||0),s=o.pos[1]+(i.offsetTop||0),c=o.pos[0]+(i.offsetLeft||0),d=g.range()[0]+u.top+(i.offsetTop||0),f=p.range()[0]+u.left+(i.offsetLeft||0),h=o.pos[1]+(i.offsetTop||0),m=r.tickFormat()(e.x()(o.point,o.pointIndex)),v=a.tickFormat()(e.y()(o.point,o.pointIndex));null!=D&&n.tooltip.show([c,d],D(o.series.key,m,v,o,t),"n",1,i,"x-nvtooltip"),null!=I&&n.tooltip.show([f,h],I(o.series.key,m,v,o,t),"e",1,i,"y-nvtooltip"),null!=W&&n.tooltip.show([l,s],W(o.series.key,m,v,o,t),o.value<0?"n":"s",null,i)},Y=[{key:"Magnify",disabled:!0}];return e.dispatch.on("elementMouseout.tooltip",function(t){F.tooltipHide(t),d3.select(".nv-chart-"+e.id()+" .nv-series-"+t.seriesIndex+" .nv-distx-"+t.pointIndex).attr("y1",0),d3.select(".nv-chart-"+e.id()+" .nv-series-"+t.seriesIndex+" .nv-disty-"+t.pointIndex).attr("x2",s.size())}),F.on("tooltipHide",function(){C&&n.tooltip.cleanup()}),t.dispatch=F,t.scatter=e,t.legend=o,t.controls=i,t.xAxis=r,t.yAxis=a,t.distX=l,t.distY=s,d3.rebind(t,e,"id","interactive","pointActive","x","y","shape","size","xScale","yScale","zScale","xDomain","yDomain","xRange","yRange","sizeDomain","sizeRange","forceX","forceY","forceSize","clipVoronoi","clipRadius","useVoronoi"),t.options=n.utils.optionsFunc.bind(t),t.margin=function(e){return arguments.length?(u.top="undefined"!=typeof e.top?e.top:u.top,u.right="undefined"!=typeof e.right?e.right:u.right,u.bottom="undefined"!=typeof e.bottom?e.bottom:u.bottom,u.left="undefined"!=typeof e.left?e.left:u.left,t):u},t.width=function(e){return arguments.length?(c=e,t):c},t.height=function(e){return arguments.length?(d=e,t):d},t.color=function(e){return arguments.length?(f=n.utils.getColor(e),o.color(f),l.color(f),s.color(f),t):f},t.showDistX=function(e){return arguments.length?(v=e,t):v},t.showDistY=function(e){return arguments.length?(y=e,t):y},t.showControls=function(e){return arguments.length?(A=e,t):A},t.showLegend=function(e){return arguments.length?(x=e,t):x},t.showXAxis=function(e){return arguments.length?(b=e,t):b},t.showYAxis=function(e){return arguments.length?(k=e,t):k},t.rightAlignYAxis=function(e){return arguments.length?(w=e,a.orient(e?"right":"left"),t):w},t.fisheye=function(e){return arguments.length?(S=e,t):S},t.xPadding=function(e){return arguments.length?(h=e,t):h},t.yPadding=function(e){return arguments.length?(m=e,t):m},t.tooltips=function(e){return arguments.length?(C=e,t):C},t.tooltipContent=function(e){return arguments.length?(W=e,t):W},t.tooltipXContent=function(e){return arguments.length?(D=e,t):D},t.tooltipYContent=function(e){return arguments.length?(I=e,t):I},t.state=function(e){return arguments.length?(N=e,t):N},t.defaultState=function(e){return arguments.length?(z=e,t):z},t.noData=function(e){return arguments.length?(L=e,t):L},t.transitionDuration=function(e){return arguments.length?(B=e,t):B},t.showLabel=function(e){return arguments.length?(P=e,t):P},t},n.models.scatterPlusLineChart=function(){"use strict";function t(n){return n.each(function(n){function M(){if(A)return G.select(".nv-point-paths").style("pointer-events","all"),!1;G.select(".nv-point-paths").style("pointer-events","none");
var t=d3.mouse(this);p.distortion(w).focus(t[0]),g.distortion(w).focus(t[1]),G.select(".nv-scatterWrap").datum(n.filter(function(t){return!t.disabled})).call(e),y&&G.select(".nv-x.nv-axis").call(r),x&&G.select(".nv-y.nv-axis").call(a),G.select(".nv-distributionX").datum(n.filter(function(t){return!t.disabled})).call(l),G.select(".nv-distributionY").datum(n.filter(function(t){return!t.disabled})).call(s)}var C=d3.select(this),D=this,E=(c||parseInt(C.style("width"))||960)-u.left-u.right,Y=(d||parseInt(C.style("height"))||400)-u.top-u.bottom;if(t.update=function(){C.transition().duration(F).call(t)},t.container=this,I.disabled=n.map(function(t){return!!t.disabled}),!W){var R;W={};for(R in I)W[R]=I[R]instanceof Array?I[R].slice(0):I[R]}if(!(n&&n.length&&n.filter(function(t){return t.values.length}).length)){var V=C.selectAll(".nv-noData").data([z]);return V.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),V.attr("x",u.left+E/2).attr("y",u.top+Y/2).text(function(t){return t}),t}C.selectAll(".nv-noData").remove(),p=e.xScale(),g=e.yScale(),B=B||p,P=P||g;var _=C.selectAll("g.nv-wrap.nv-scatterChart").data([n]),X=_.enter().append("g").attr("class","nvd3 nv-wrap nv-scatterChart nv-chart-"+e.id()),Z=X.append("g"),G=_.select("g");Z.append("rect").attr("class","nvd3 nv-background").style("pointer-events","none"),Z.append("g").attr("class","nv-x nv-axis"),Z.append("g").attr("class","nv-y nv-axis"),Z.append("g").attr("class","nv-scatterWrap"),Z.append("g").attr("class","nv-regressionLinesWrap"),Z.append("g").attr("class","nv-distWrap"),Z.append("g").attr("class","nv-legendWrap"),Z.append("g").attr("class","nv-controlsWrap"),_.attr("transform","translate("+u.left+","+u.top+")"),b&&G.select(".nv-y.nv-axis").attr("transform","translate("+E+",0)"),v&&(o.width(E-180),_.select(".nv-legendWrap").datum(n).call(o),u.top!=o.height()&&(u.top=o.height(),Y=(d||parseInt(C.style("height"))||400)-u.top-u.bottom),_.select(".nv-legendWrap").attr("transform","translate(180,"+-u.top+")")),k&&(i.width(180).color(["#444"]),G.select(".nv-controlsWrap").datum(T).attr("transform","translate(0,"+-u.top+")").call(i)),e.width(E).height(Y).color(n.map(function(t,e){return t.color||f(t,e)}).filter(function(t,e){return!n[e].disabled})),L&&e.showLabel(L),_.select(".nv-scatterWrap").datum(n.filter(function(t){return!t.disabled})).call(e),_.select(".nv-regressionLinesWrap").attr("clip-path","url(#nv-edge-clip-"+e.id()+")");var O=_.select(".nv-regressionLinesWrap").selectAll(".nv-regLines").data(function(t){return t});O.enter().append("g").attr("class","nv-regLines");{var K=O.selectAll(".nv-regLine").data(function(t){return[t]});K.enter().append("line").attr("class","nv-regLine").style("stroke-opacity",0)}K.transition().attr("x1",function(t){return"undefined"!=typeof t.slope?p.range()[0]:p(t.intercept)}).attr("x2",function(t){return"undefined"!=typeof t.slope?p.range()[1]:p(t.intercept)}).attr("y1",function(t){return"undefined"!=typeof t.slope?g(p.domain()[0]*t.slope+t.intercept):g.range()[0]}).attr("y2",function(t){return"undefined"!=typeof t.slope?g(p.domain()[1]*t.slope+t.intercept):g.range()[1]}).style("stroke",function(t,e,n){return f(t,n)}).style("stroke-opacity",function(t){return t.disabled||"undefined"==typeof t.slope&&"undefined"==typeof t.intercept?0:1}),y&&(r.scale(p).ticks(r.ticks()?r.ticks():E/100).tickSize(-Y,0),G.select(".nv-x.nv-axis").attr("transform","translate(0,"+g.range()[0]+")").call(r)),x&&(a.scale(g).ticks(a.ticks()?a.ticks():Y/36).tickSize(-E,0),G.select(".nv-y.nv-axis").call(a)),h&&(l.getData(e.x()).scale(p).width(E).color(n.map(function(t,e){return t.color||f(t,e)}).filter(function(t,e){return!n[e].disabled})),Z.select(".nv-distWrap").append("g").attr("class","nv-distributionX"),G.select(".nv-distributionX").attr("transform","translate(0,"+g.range()[0]+")").datum(n.filter(function(t){return!t.disabled})).call(l)),m&&(s.getData(e.y()).scale(g).width(Y).color(n.map(function(t,e){return t.color||f(t,e)}).filter(function(t,e){return!n[e].disabled})),Z.select(".nv-distWrap").append("g").attr("class","nv-distributionY"),G.select(".nv-distributionY").attr("transform","translate("+(b?E:-s.size())+",0)").datum(n.filter(function(t){return!t.disabled})).call(s)),d3.fisheye&&(G.select(".nv-background").attr("width",E).attr("height",Y),G.select(".nv-background").on("mousemove",M),G.select(".nv-background").on("click",function(){A=!A}),e.dispatch.on("elementClick.freezeFisheye",function(){A=!A})),i.dispatch.on("legendClick",function(n){n.disabled=!n.disabled,w=n.disabled?0:2.5,G.select(".nv-background").style("pointer-events",n.disabled?"none":"all"),G.select(".nv-point-paths").style("pointer-events",n.disabled?"all":"none"),n.disabled?(p.distortion(w).focus(0),g.distortion(w).focus(0),G.select(".nv-scatterWrap").call(e),G.select(".nv-x.nv-axis").call(r),G.select(".nv-y.nv-axis").call(a)):A=!1,t.update()}),o.dispatch.on("stateChange",function(e){I=e,N.stateChange(I),t.update()}),e.dispatch.on("elementMouseover.tooltip",function(t){d3.select(".nv-chart-"+e.id()+" .nv-series-"+t.seriesIndex+" .nv-distx-"+t.pointIndex).attr("y1",t.pos[1]-Y),d3.select(".nv-chart-"+e.id()+" .nv-series-"+t.seriesIndex+" .nv-disty-"+t.pointIndex).attr("x2",t.pos[0]+l.size()),t.pos=[t.pos[0]+u.left,t.pos[1]+u.top],N.tooltipShow(t)}),N.on("tooltipShow",function(t){S&&H(t,D.parentNode)}),N.on("changeState",function(e){"undefined"!=typeof e.disabled&&(n.forEach(function(t,n){t.disabled=e.disabled[n]}),I.disabled=e.disabled),t.update()}),B=p.copy(),P=g.copy()}),t}var e=n.models.scatter(),r=n.models.axis(),a=n.models.axis(),o=n.models.legend(),i=n.models.legend(),l=n.models.distribution(),s=n.models.distribution();d3.fisheye=!1;var u={top:30,right:20,bottom:50,left:75},c=null,d=null,f=n.utils.defaultColor(),p=d3.fisheye?d3.fisheye.scale(d3.scale.linear).distortion(0):e.xScale(),g=d3.fisheye?d3.fisheye.scale(d3.scale.linear).distortion(0):e.yScale(),h=!1,m=!1,v=!0,y=!0,x=!0,b=!1,k=!!d3.fisheye,w=0,A=!1,S=!0,M=function(t,e){return"<strong>"+e+"</strong>"},C=function(t,e,n){return"<strong>"+n+"</strong>"},D=function(t,e,n,r){return"<h3>"+t+"</h3><p>"+r+"</p>"},I={},W=null,N=d3.dispatch("tooltipShow","tooltipHide","stateChange","changeState"),z="No Data Available.",F=250,L=!1;e.xScale(p).yScale(g),r.orient("bottom").tickPadding(10),a.orient(b?"right":"left").tickPadding(10),l.axis("x"),s.axis("y"),i.updateState(!1);var B,P,H=function(o,i){var l=o.pos[0]+(i.offsetLeft||0),s=o.pos[1]+(i.offsetTop||0),c=o.pos[0]+(i.offsetLeft||0),d=g.range()[0]+u.top+(i.offsetTop||0),f=p.range()[0]+u.left+(i.offsetLeft||0),h=o.pos[1]+(i.offsetTop||0),m=r.tickFormat()(e.x()(o.point,o.pointIndex)),v=a.tickFormat()(e.y()(o.point,o.pointIndex));null!=M&&n.tooltip.show([c,d],M(o.series.key,m,v,o,t),"n",1,i,"x-nvtooltip"),null!=C&&n.tooltip.show([f,h],C(o.series.key,m,v,o,t),"e",1,i,"y-nvtooltip"),null!=D&&n.tooltip.show([l,s],D(o.series.key,m,v,o.point.tooltip,o,t),o.value<0?"n":"s",null,i)},T=[{key:"Magnify",disabled:!0}];return e.dispatch.on("elementMouseout.tooltip",function(t){N.tooltipHide(t),d3.select(".nv-chart-"+e.id()+" .nv-series-"+t.seriesIndex+" .nv-distx-"+t.pointIndex).attr("y1",0),d3.select(".nv-chart-"+e.id()+" .nv-series-"+t.seriesIndex+" .nv-disty-"+t.pointIndex).attr("x2",s.size())}),N.on("tooltipHide",function(){S&&n.tooltip.cleanup()}),t.dispatch=N,t.scatter=e,t.legend=o,t.controls=i,t.xAxis=r,t.yAxis=a,t.distX=l,t.distY=s,d3.rebind(t,e,"id","interactive","pointActive","x","y","shape","size","xScale","yScale","zScale","xDomain","yDomain","xRange","yRange","sizeDomain","sizeRange","forceX","forceY","forceSize","clipVoronoi","clipRadius","useVoronoi"),t.options=n.utils.optionsFunc.bind(t),t.margin=function(e){return arguments.length?(u.top="undefined"!=typeof e.top?e.top:u.top,u.right="undefined"!=typeof e.right?e.right:u.right,u.bottom="undefined"!=typeof e.bottom?e.bottom:u.bottom,u.left="undefined"!=typeof e.left?e.left:u.left,t):u},t.width=function(e){return arguments.length?(c=e,t):c},t.height=function(e){return arguments.length?(d=e,t):d},t.color=function(e){return arguments.length?(f=n.utils.getColor(e),o.color(f),l.color(f),s.color(f),t):f},t.showDistX=function(e){return arguments.length?(h=e,t):h},t.showDistY=function(e){return arguments.length?(m=e,t):m},t.showControls=function(e){return arguments.length?(k=e,t):k},t.showLegend=function(e){return arguments.length?(v=e,t):v},t.showXAxis=function(e){return arguments.length?(y=e,t):y},t.showYAxis=function(e){return arguments.length?(x=e,t):x},t.rightAlignYAxis=function(e){return arguments.length?(b=e,a.orient(e?"right":"left"),t):b},t.fisheye=function(e){return arguments.length?(w=e,t):w},t.tooltips=function(e){return arguments.length?(S=e,t):S},t.tooltipContent=function(e){return arguments.length?(D=e,t):D},t.tooltipXContent=function(e){return arguments.length?(M=e,t):M},t.tooltipYContent=function(e){return arguments.length?(C=e,t):C},t.state=function(e){return arguments.length?(I=e,t):I},t.defaultState=function(e){return arguments.length?(W=e,t):W},t.noData=function(e){return arguments.length?(z=e,t):z},t.transitionDuration=function(e){return arguments.length?(F=e,t):F},t.showLabel=function(e){return arguments.length?(L=e,t):L},t},n.models.sparkline=function(){"use strict";function t(n){return n.each(function(t){var n=l-i.left-i.right,u=s-i.top-i.bottom,h=d3.select(this);c.domain(e||d3.extent(t,f)).range(a||[0,n]),d.domain(r||d3.extent(t,p)).range(o||[u,0]);{var m=h.selectAll("g.nv-wrap.nv-sparkline").data([t]),v=m.enter().append("g").attr("class","nvd3 nv-wrap nv-sparkline");v.append("g"),m.select("g")}m.attr("transform","translate("+i.left+","+i.top+")");var y=m.selectAll("path").data(function(t){return[t]});y.enter().append("path"),y.exit().remove(),y.style("stroke",function(t,e){return t.color||g(t,e)}).attr("d",d3.svg.line().x(function(t,e){return c(f(t,e))}).y(function(t,e){return d(p(t,e))}));var x=m.selectAll("circle.nv-point").data(function(t){function e(e){if(-1!=e){var n=t[e];return n.pointIndex=e,n}return null}var n=t.map(function(t,e){return p(t,e)}),r=e(n.lastIndexOf(d.domain()[1])),a=e(n.indexOf(d.domain()[0])),o=e(n.length-1);return[a,r,o].filter(function(t){return null!=t})});x.enter().append("circle"),x.exit().remove(),x.attr("cx",function(t){return c(f(t,t.pointIndex))}).attr("cy",function(t){return d(p(t,t.pointIndex))}).attr("r",2).attr("class",function(t){return f(t,t.pointIndex)==c.domain()[1]?"nv-point nv-currentValue":p(t,t.pointIndex)==d.domain()[0]?"nv-point nv-minValue":"nv-point nv-maxValue"})}),t}var e,r,a,o,i={top:2,right:0,bottom:2,left:0},l=400,s=32,u=!0,c=d3.scale.linear(),d=d3.scale.linear(),f=function(t){return t.x},p=function(t){return t.y},g=n.utils.getColor(["#000"]);return t.options=n.utils.optionsFunc.bind(t),t.margin=function(e){return arguments.length?(i.top="undefined"!=typeof e.top?e.top:i.top,i.right="undefined"!=typeof e.right?e.right:i.right,i.bottom="undefined"!=typeof e.bottom?e.bottom:i.bottom,i.left="undefined"!=typeof e.left?e.left:i.left,t):i},t.width=function(e){return arguments.length?(l=e,t):l},t.height=function(e){return arguments.length?(s=e,t):s},t.x=function(e){return arguments.length?(f=d3.functor(e),t):f},t.y=function(e){return arguments.length?(p=d3.functor(e),t):p},t.xScale=function(e){return arguments.length?(c=e,t):c},t.yScale=function(e){return arguments.length?(d=e,t):d},t.xDomain=function(n){return arguments.length?(e=n,t):e},t.yDomain=function(e){return arguments.length?(r=e,t):r},t.xRange=function(e){return arguments.length?(a=e,t):a},t.yRange=function(e){return arguments.length?(o=e,t):o},t.animate=function(e){return arguments.length?(u=e,t):u},t.color=function(e){return arguments.length?(g=n.utils.getColor(e),t):g},t},n.models.sparklinePlus=function(){"use strict";function t(n){return n.each(function(f){function m(){if(!u){var t=C.selectAll(".nv-hoverValue").data(s),n=t.enter().append("g").attr("class","nv-hoverValue").style("stroke-opacity",0).style("fill-opacity",0);t.exit().transition().duration(250).style("stroke-opacity",0).style("fill-opacity",0).remove(),t.attr("transform",function(t){return"translate("+e(a.x()(f[t],t))+",0)"}).transition().duration(250).style("stroke-opacity",1).style("fill-opacity",1),s.length&&(n.append("line").attr("x1",0).attr("y1",-o.top).attr("x2",0).attr("y2",b),n.append("text").attr("class","nv-xValue").attr("x",-6).attr("y",-o.top).attr("text-anchor","end").attr("dy",".9em"),C.select(".nv-hoverValue .nv-xValue").text(c(a.x()(f[s[0]],s[0]))),n.append("text").attr("class","nv-yValue").attr("x",6).attr("y",-o.top).attr("text-anchor","start").attr("dy",".9em"),C.select(".nv-hoverValue .nv-yValue").text(d(a.y()(f[s[0]],s[0]))))}}function v(){function t(t,e){for(var n=Math.abs(a.x()(t[0],0)-e),r=0,o=0;o<t.length;o++)Math.abs(a.x()(t[o],o)-e)<n&&(n=Math.abs(a.x()(t[o],o)-e),r=o);return r}if(!u){var n=d3.mouse(this)[0]-o.left;s=[t(f,Math.round(e.invert(n)))],m()}}var y=d3.select(this),x=(i||parseInt(y.style("width"))||960)-o.left-o.right,b=(l||parseInt(y.style("height"))||400)-o.top-o.bottom;if(t.update=function(){t(n)},t.container=this,!f||!f.length){var k=y.selectAll(".nv-noData").data([h]);return k.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),k.attr("x",o.left+x/2).attr("y",o.top+b/2).text(function(t){return t}),t}y.selectAll(".nv-noData").remove();var w=a.y()(f[f.length-1],f.length-1);e=a.xScale(),r=a.yScale();var A=y.selectAll("g.nv-wrap.nv-sparklineplus").data([f]),S=A.enter().append("g").attr("class","nvd3 nv-wrap nv-sparklineplus"),M=S.append("g"),C=A.select("g");M.append("g").attr("class","nv-sparklineWrap"),M.append("g").attr("class","nv-valueWrap"),M.append("g").attr("class","nv-hoverArea"),A.attr("transform","translate("+o.left+","+o.top+")");var D=C.select(".nv-sparklineWrap");a.width(x).height(b),D.call(a);var I=C.select(".nv-valueWrap"),W=I.selectAll(".nv-currentValue").data([w]);W.enter().append("text").attr("class","nv-currentValue").attr("dx",g?-8:8).attr("dy",".9em").style("text-anchor",g?"end":"start"),W.attr("x",x+(g?o.right:0)).attr("y",p?function(t){return r(t)}:0).style("fill",a.color()(f[f.length-1],f.length-1)).text(d(w)),M.select(".nv-hoverArea").append("rect").on("mousemove",v).on("click",function(){u=!u}).on("mouseout",function(){s=[],m()}),C.select(".nv-hoverArea rect").attr("transform",function(){return"translate("+-o.left+","+-o.top+")"}).attr("width",x+o.left+o.right).attr("height",b+o.top)}),t}var e,r,a=n.models.sparkline(),o={top:15,right:100,bottom:10,left:50},i=null,l=null,s=[],u=!1,c=d3.format(",r"),d=d3.format(",.2f"),f=!0,p=!0,g=!1,h="No Data Available.";return t.sparkline=a,d3.rebind(t,a,"x","y","xScale","yScale","color"),t.options=n.utils.optionsFunc.bind(t),t.margin=function(e){return arguments.length?(o.top="undefined"!=typeof e.top?e.top:o.top,o.right="undefined"!=typeof e.right?e.right:o.right,o.bottom="undefined"!=typeof e.bottom?e.bottom:o.bottom,o.left="undefined"!=typeof e.left?e.left:o.left,t):o},t.width=function(e){return arguments.length?(i=e,t):i},t.height=function(e){return arguments.length?(l=e,t):l},t.xTickFormat=function(e){return arguments.length?(c=e,t):c},t.yTickFormat=function(e){return arguments.length?(d=e,t):d},t.showValue=function(e){return arguments.length?(f=e,t):f},t.alignValue=function(e){return arguments.length?(p=e,t):p},t.rightAlignValue=function(e){return arguments.length?(g=e,t):g},t.noData=function(e){return arguments.length?(h=e,t):h},t},n.models.stackedArea=function(){"use strict";function t(n){return n.each(function(n){var d=o-a.left-a.right,y=i-a.top-a.bottom,x=d3.select(this);e=m.xScale(),r=m.yScale();var b=n;n.forEach(function(t,e){t.seriesIndex=e,t.values=t.values.map(function(t,n){return t.index=n,t.seriesIndex=e,t})});var k=n.filter(function(t){return!t.disabled});n=d3.layout.stack().order(p).offset(f).values(function(t){return t.values}).x(u).y(c).out(function(t,e,n){var r=0===c(t)?0:n;t.display={y:r,y0:e}})(k);var w=x.selectAll("g.nv-wrap.nv-stackedarea").data([n]),A=w.enter().append("g").attr("class","nvd3 nv-wrap nv-stackedarea"),S=A.append("defs"),M=A.append("g"),C=w.select("g");M.append("g").attr("class","nv-areaWrap"),M.append("g").attr("class","nv-scatterWrap"),w.attr("transform","translate("+a.left+","+a.top+")"),m.width(d).height(y).x(u).y(function(t){return t.display.y+t.display.y0}).forceY([0]).color(n.map(function(t){return t.color||l(t,t.seriesIndex)}));var D=C.select(".nv-scatterWrap").datum(n);D.call(m),S.append("clipPath").attr("id","nv-edge-clip-"+s).append("rect"),w.select("#nv-edge-clip-"+s+" rect").attr("width",d).attr("height",y),C.attr("clip-path",h?"url(#nv-edge-clip-"+s+")":"");var I=d3.svg.area().x(function(t,n){return e(u(t,n))}).y0(function(t){return r(t.display.y0)}).y1(function(t){return r(t.display.y+t.display.y0)}).interpolate(g),W=d3.svg.area().x(function(t,n){return e(u(t,n))}).y0(function(t){return r(t.display.y0)}).y1(function(t){return r(t.display.y0)}),N=C.select(".nv-areaWrap").selectAll("path.nv-area").data(function(t){return t});N.enter().append("path").attr("class",function(t,e){return"nv-area nv-area-"+e}).attr("d",function(t){return W(t.values,t.seriesIndex)}).on("mouseover",function(t){d3.select(this).classed("hover",!0),v.areaMouseover({point:t,series:t.key,pos:[d3.event.pageX,d3.event.pageY],seriesIndex:t.seriesIndex})}).on("mouseout",function(t){d3.select(this).classed("hover",!1),v.areaMouseout({point:t,series:t.key,pos:[d3.event.pageX,d3.event.pageY],seriesIndex:t.seriesIndex})}).on("click",function(t){d3.select(this).classed("hover",!1),v.areaClick({point:t,series:t.key,pos:[d3.event.pageX,d3.event.pageY],seriesIndex:t.seriesIndex})}),N.exit().remove(),N.style("fill",function(t){return t.color||l(t,t.seriesIndex)}).style("stroke",function(t){return t.color||l(t,t.seriesIndex)}),N.transition().attr("d",function(t,e){return I(t.values,e)}),m.dispatch.on("elementMouseover.area",function(t){C.select(".nv-chart-"+s+" .nv-area-"+t.seriesIndex).classed("hover",!0)}),m.dispatch.on("elementMouseout.area",function(t){C.select(".nv-chart-"+s+" .nv-area-"+t.seriesIndex).classed("hover",!1)}),t.d3_stackedOffset_stackPercent=function(t){var e,n,r,a=t.length,o=t[0].length,i=1/a,l=[];for(n=0;o>n;++n){for(e=0,r=0;e<b.length;e++)r+=c(b[e].values[n]);if(r)for(e=0;a>e;e++)t[e][n][1]/=r;else for(e=0;a>e;e++)t[e][n][1]=i}for(n=0;o>n;++n)l[n]=0;return l}}),t}var e,r,a={top:0,right:0,bottom:0,left:0},o=960,i=500,l=n.utils.defaultColor(),s=Math.floor(1e5*Math.random()),u=function(t){return t.x},c=function(t){return t.y},d="stack",f="zero",p="default",g="linear",h=!1,m=n.models.scatter(),v=d3.dispatch("tooltipShow","tooltipHide","areaClick","areaMouseover","areaMouseout");return m.size(2.2).sizeDomain([2.2,2.2]),m.dispatch.on("elementClick.area",function(t){v.areaClick(t)}),m.dispatch.on("elementMouseover.tooltip",function(t){t.pos=[t.pos[0]+a.left,t.pos[1]+a.top],v.tooltipShow(t)}),m.dispatch.on("elementMouseout.tooltip",function(t){v.tooltipHide(t)}),t.dispatch=v,t.scatter=m,d3.rebind(t,m,"interactive","size","xScale","yScale","zScale","xDomain","yDomain","xRange","yRange","sizeDomain","forceX","forceY","forceSize","clipVoronoi","useVoronoi","clipRadius","highlightPoint","clearHighlights"),t.options=n.utils.optionsFunc.bind(t),t.x=function(e){return arguments.length?(u=d3.functor(e),t):u},t.y=function(e){return arguments.length?(c=d3.functor(e),t):c},t.margin=function(e){return arguments.length?(a.top="undefined"!=typeof e.top?e.top:a.top,a.right="undefined"!=typeof e.right?e.right:a.right,a.bottom="undefined"!=typeof e.bottom?e.bottom:a.bottom,a.left="undefined"!=typeof e.left?e.left:a.left,t):a},t.width=function(e){return arguments.length?(o=e,t):o},t.height=function(e){return arguments.length?(i=e,t):i},t.clipEdge=function(e){return arguments.length?(h=e,t):h},t.color=function(e){return arguments.length?(l=n.utils.getColor(e),t):l},t.offset=function(e){return arguments.length?(f=e,t):f},t.order=function(e){return arguments.length?(p=e,t):p},t.style=function(e){if(!arguments.length)return d;switch(d=e){case"stack":t.offset("zero"),t.order("default");break;case"stream":t.offset("wiggle"),t.order("inside-out");break;case"stream-center":t.offset("silhouette"),t.order("inside-out");break;case"expand":t.offset("expand"),t.order("default");break;case"stack_percent":t.offset(t.d3_stackedOffset_stackPercent),t.order("default")}return t},t.interpolate=function(e){return arguments.length?(g=e,t):g},t},n.models.stackedAreaChart=function(){"use strict";function t(k){return k.each(function(k){var F=d3.select(this),L=this,B=(d||parseInt(F.style("width"))||960)-c.left-c.right,P=(f||parseInt(F.style("height"))||400)-c.top-c.bottom;if(t.update=function(){F.transition().duration(N).call(t)},t.container=this,A.disabled=k.map(function(t){return!!t.disabled}),!S){var H;S={};for(H in A)S[H]=A[H]instanceof Array?A[H].slice(0):A[H]}if(!(k&&k.length&&k.filter(function(t){return t.values.length}).length)){var T=F.selectAll(".nv-noData").data([M]);return T.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),T.attr("x",c.left+B/2).attr("y",c.top+P/2).text(function(t){return t}),t}F.selectAll(".nv-noData").remove(),e=a.xScale(),r=a.yScale();var E=F.selectAll("g.nv-wrap.nv-stackedAreaChart").data([k]),Y=E.enter().append("g").attr("class","nvd3 nv-wrap nv-stackedAreaChart").append("g"),R=E.select("g");if(Y.append("rect").style("opacity",0),Y.append("g").attr("class","nv-x nv-axis"),Y.append("g").attr("class","nv-y nv-axis"),Y.append("g").attr("class","nv-stackedWrap"),Y.append("g").attr("class","nv-legendWrap"),Y.append("g").attr("class","nv-controlsWrap"),Y.append("g").attr("class","nv-interactive"),R.select("rect").attr("width",B).attr("height",P),h){var V=g?B-D:B;l.width(V),R.select(".nv-legendWrap").datum(k).call(l),c.top!=l.height()&&(c.top=l.height(),P=(f||parseInt(F.style("height"))||400)-c.top-c.bottom),R.select(".nv-legendWrap").attr("transform","translate("+(B-V)+","+-c.top+")")}if(g){var _=[{key:W.stacked||"Stacked",metaKey:"Stacked",disabled:"stack"!=a.style(),style:"stack"},{key:W.stream||"Stream",metaKey:"Stream",disabled:"stream"!=a.style(),style:"stream"},{key:W.expanded||"Expanded",metaKey:"Expanded",disabled:"expand"!=a.style(),style:"expand"},{key:W.stack_percent||"Stack %",metaKey:"Stack_Percent",disabled:"stack_percent"!=a.style(),style:"stack_percent"}];D=I.length/3*260,_=_.filter(function(t){return-1!==I.indexOf(t.metaKey)}),s.width(D).color(["#444","#444","#444"]),R.select(".nv-controlsWrap").datum(_).call(s),c.top!=Math.max(s.height(),l.height())&&(c.top=Math.max(s.height(),l.height()),P=(f||parseInt(F.style("height"))||400)-c.top-c.bottom),R.select(".nv-controlsWrap").attr("transform","translate(0,"+-c.top+")")}E.attr("transform","translate("+c.left+","+c.top+")"),y&&R.select(".nv-y.nv-axis").attr("transform","translate("+B+",0)"),x&&(u.width(B).height(P).margin({left:c.left,top:c.top}).svgContainer(F).xScale(e),E.select(".nv-interactive").call(u)),a.width(B).height(P);var X=R.select(".nv-stackedWrap").datum(k);X.transition().call(a),m&&(o.scale(e).ticks(B/100).tickSize(-P,0),R.select(".nv-x.nv-axis").attr("transform","translate(0,"+P+")"),R.select(".nv-x.nv-axis").transition().duration(0).call(o)),v&&(i.scale(r).ticks("wiggle"==a.offset()?0:P/36).tickSize(-B,0).setTickFormat("expand"==a.style()||"stack_percent"==a.style()?d3.format("%"):w),R.select(".nv-y.nv-axis").transition().duration(0).call(i)),a.dispatch.on("areaClick.toggle",function(e){k.forEach(1===k.filter(function(t){return!t.disabled}).length?function(t){t.disabled=!1}:function(t,n){t.disabled=n!=e.seriesIndex}),A.disabled=k.map(function(t){return!!t.disabled}),C.stateChange(A),t.update()}),l.dispatch.on("stateChange",function(e){A.disabled=e.disabled,C.stateChange(A),t.update()}),s.dispatch.on("legendClick",function(e){e.disabled&&(_=_.map(function(t){return t.disabled=!0,t}),e.disabled=!1,a.style(e.style),A.style=a.style(),C.stateChange(A),t.update())}),u.dispatch.on("elementMousemove",function(e){a.clearHighlights();var r,l,s,d=[];if(k.filter(function(t,e){return t.seriesIndex=e,!t.disabled}).forEach(function(o,i){l=n.interactiveBisect(o.values,e.pointXValue,t.x()),a.highlightPoint(i,l,!0);var u=o.values[l];if("undefined"!=typeof u){"undefined"==typeof r&&(r=u),"undefined"==typeof s&&(s=t.xScale()(t.x()(u,l)));var c="expand"==a.style()?u.display.y:t.y()(u,l);d.push({key:o.key,value:c,color:p(o,o.seriesIndex),stackedValue:u.display})}}),d.reverse(),d.length>2){var f=t.yScale().invert(e.mouseY),g=null;d.forEach(function(t,e){f=Math.abs(f);var n=Math.abs(t.stackedValue.y0),r=Math.abs(t.stackedValue.y);return f>=n&&r+n>=f?void(g=e):void 0}),null!=g&&(d[g].highlight=!0)}var h=o.tickFormat()(t.x()(r,l)),m="expand"==a.style()?function(t){return d3.format(".1%")(t)}:function(t){return i.tickFormat()(t)};u.tooltip.position({left:s+c.left,top:e.mouseY+c.top}).chartContainer(L.parentNode).enabled(b).valueFormatter(m).data({value:h,series:d})(),u.renderGuideLine(s)}),u.dispatch.on("elementMouseout",function(){C.tooltipHide(),a.clearHighlights()}),C.on("tooltipShow",function(t){b&&z(t,L.parentNode)}),C.on("changeState",function(e){"undefined"!=typeof e.disabled&&k.length===e.disabled.length&&(k.forEach(function(t,n){t.disabled=e.disabled[n]}),A.disabled=e.disabled),"undefined"!=typeof e.style&&a.style(e.style),t.update()})}),t}var e,r,a=n.models.stackedArea(),o=n.models.axis(),i=n.models.axis(),l=n.models.legend(),s=n.models.legend(),u=n.interactiveGuideline(),c={top:30,right:25,bottom:50,left:60},d=null,f=null,p=n.utils.defaultColor(),g=!0,h=!0,m=!0,v=!0,y=!1,x=!1,b=!0,k=function(t,e,n){return"<h3>"+t+"</h3><p>"+n+" on "+e+"</p>"},w=d3.format(",.2f"),A={style:a.style()},S=null,M="No Data Available.",C=d3.dispatch("tooltipShow","tooltipHide","stateChange","changeState"),D=250,I=["Stacked","Stream","Expanded"],W={},N=250;o.orient("bottom").tickPadding(7),i.orient(y?"right":"left"),s.updateState(!1);var z=function(e,r){var l=e.pos[0]+(r.offsetLeft||0),s=e.pos[1]+(r.offsetTop||0),u=o.tickFormat()(a.x()(e.point,e.pointIndex)),c=i.tickFormat()(a.y()(e.point,e.pointIndex)),d=k(e.series.key,u,c,e,t);n.tooltip.show([l,s],d,e.value<0?"n":"s",null,r)};return a.dispatch.on("tooltipShow",function(t){t.pos=[t.pos[0]+c.left,t.pos[1]+c.top],C.tooltipShow(t)}),a.dispatch.on("tooltipHide",function(t){C.tooltipHide(t)}),C.on("tooltipHide",function(){b&&n.tooltip.cleanup()}),t.dispatch=C,t.stacked=a,t.legend=l,t.controls=s,t.xAxis=o,t.yAxis=i,t.interactiveLayer=u,d3.rebind(t,a,"x","y","size","xScale","yScale","xDomain","yDomain","xRange","yRange","sizeDomain","interactive","useVoronoi","offset","order","style","clipEdge","forceX","forceY","forceSize","interpolate"),t.options=n.utils.optionsFunc.bind(t),t.margin=function(e){return arguments.length?(c.top="undefined"!=typeof e.top?e.top:c.top,c.right="undefined"!=typeof e.right?e.right:c.right,c.bottom="undefined"!=typeof e.bottom?e.bottom:c.bottom,c.left="undefined"!=typeof e.left?e.left:c.left,t):c},t.width=function(e){return arguments.length?(d=e,t):d},t.height=function(e){return arguments.length?(f=e,t):f},t.color=function(e){return arguments.length?(p=n.utils.getColor(e),l.color(p),a.color(p),t):p},t.showControls=function(e){return arguments.length?(g=e,t):g},t.showLegend=function(e){return arguments.length?(h=e,t):h},t.showXAxis=function(e){return arguments.length?(m=e,t):m},t.showYAxis=function(e){return arguments.length?(v=e,t):v},t.rightAlignYAxis=function(e){return arguments.length?(y=e,i.orient(e?"right":"left"),t):y},t.useInteractiveGuideline=function(e){return arguments.length?(x=e,e===!0&&(t.interactive(!1),t.useVoronoi(!1)),t):x},t.tooltip=function(e){return arguments.length?(k=e,t):k},t.tooltips=function(e){return arguments.length?(b=e,t):b},t.tooltipContent=function(e){return arguments.length?(k=e,t):k},t.state=function(e){return arguments.length?(A=e,t):A},t.defaultState=function(e){return arguments.length?(S=e,t):S},t.noData=function(e){return arguments.length?(M=e,t):M},t.transitionDuration=function(e){return arguments.length?(N=e,t):N},t.controlsData=function(e){return arguments.length?(I=e,t):I},t.controlLabels=function(e){return arguments.length?"object"!=typeof e?W:(W=e,t):W},i.setTickFormat=i.tickFormat,i.tickFormat=function(t){return arguments.length?(w=t,i):w},t}}();
}

// ********************************************
//  Public Core NV functions

// Logs all arguments, and returns the last so you can test things in place
// Note: in IE8 console.log is an object not a function, and if modernizr is used
// then calling Function.prototype.bind with with anything other than a function
// causes a TypeError to be thrown.
nv.log = function() {
  if (nv.dev && console.log && console.log.apply)
    console.log.apply(console, arguments)
  else if (nv.dev && typeof console.log == "function" && Function.prototype.bind) {
    var log = Function.prototype.bind.call(console.log, console);
    log.apply(console, arguments);
  }
  return arguments[arguments.length - 1];
};


nv.render = function render(step) {
  step = step || 1; // number of graphs to generate in each timeout loop

  nv.render.active = true;
  nv.dispatch.render_start();

  setTimeout(function() {
    var chart, graph;

    for (var i = 0; i < step && (graph = nv.render.queue[i]); i++) {
      chart = graph.generate();
      if (typeof graph.callback == typeof(Function)) graph.callback(chart);
      nv.graphs.push(chart);
    }

    nv.render.queue.splice(0, i);

    if (nv.render.queue.length) setTimeout(arguments.callee, 0);
    else {
      nv.dispatch.render_end();
      nv.render.active = false;
    }
  }, 0);
};

nv.render.active = false;
nv.render.queue = [];

nv.addGraph = function(obj) {
  if (typeof arguments[0] === typeof(Function))
    obj = {generate: arguments[0], callback: arguments[1]};

  nv.render.queue.push(obj);

  if (!nv.render.active) nv.render();
};

nv.identity = function(d) { return d; };

nv.strip = function(s) { return s.replace(/(\s|&)/g,''); };

function daysInMonth(month,year) {
  return (new Date(year, month+1, 0)).getDate();
}

function d3_time_range(floor, step, number) {
  return function(t0, t1, dt) {
    var time = floor(t0), times = [];
    if (time < t0) step(time);
    if (dt > 1) {
      while (time < t1) {
        var date = new Date(+time);
        if ((number(date) % dt === 0)) times.push(date);
        step(time);
      }
    } else {
      while (time < t1) { times.push(new Date(+time)); step(time); }
    }
    return times;
  };
}

d3.time.monthEnd = function(date) {
  return new Date(date.getFullYear(), date.getMonth(), 0);
};

d3.time.monthEnds = d3_time_range(d3.time.monthEnd, function(date) {
    date.setUTCDate(date.getUTCDate() + 1);
    date.setDate(daysInMonth(date.getMonth() + 1, date.getFullYear()));
  }, function(date) {
    return date.getMonth();
  }
);

/* Utility class to handle creation of an interactive layer.
This places a rectangle on top of the chart. When you mouse move over it, it sends a dispatch
containing the X-coordinate. It can also render a vertical line where the mouse is located.

dispatch.elementMousemove is the important event to latch onto.  It is fired whenever the mouse moves over
the rectangle. The dispatch is given one object which contains the mouseX/Y location.
It also has 'pointXValue', which is the conversion of mouseX to the x-axis scale.
*/
nv.interactiveGuideline = function() {
  "use strict";
  var tooltip = nv.models.tooltip();
  //Public settings
  var width = null
  , height = null
    //Please pass in the bounding chart's top and left margins
    //This is important for calculating the correct mouseX/Y positions.
  , margin = {left: 0, top: 0}
  , xScale = d3.scale.linear()
  , yScale = d3.scale.linear()
  , dispatch = d3.dispatch('elementMousemove', 'elementMouseout','elementDblclick')
  , showGuideLine = true
  , svgContainer = null  
    //Must pass in the bounding chart's <svg> container.
    //The mousemove event is attached to this container.
  ;

  //Private variables
  var isMSIE = navigator.userAgent.indexOf("MSIE") !== -1  //Check user-agent for Microsoft Internet Explorer.
  ;


  function layer(selection) {
    selection.each(function(data) {
        var container = d3.select(this);
        
        var availableWidth = (width || 960), availableHeight = (height || 400);

        var wrap = container.selectAll("g.nv-wrap.nv-interactiveLineLayer").data([data]);
        var wrapEnter = wrap.enter()
                .append("g").attr("class", " nv-wrap nv-interactiveLineLayer");
                
        
        wrapEnter.append("g").attr("class","nv-interactiveGuideLine");
        
        if (!svgContainer) {
          return;
        }

                function mouseHandler() {
                      var d3mouse = d3.mouse(this);
                      var mouseX = d3mouse[0];
                      var mouseY = d3mouse[1];
                      var subtractMargin = true;
                      var mouseOutAnyReason = false;
                      if (isMSIE) {
                         /*
                            D3.js (or maybe SVG.getScreenCTM) has a nasty bug in Internet Explorer 10.
                            d3.mouse() returns incorrect X,Y mouse coordinates when mouse moving
                            over a rect in IE 10.
                            However, d3.event.offsetX/Y also returns the mouse coordinates
                            relative to the triggering <rect>. So we use offsetX/Y on IE.  
                         */
                         mouseX = d3.event.offsetX;
                         mouseY = d3.event.offsetY;

                         /*
                            On IE, if you attach a mouse event listener to the <svg> container,
                            it will actually trigger it for all the child elements (like <path>, <circle>, etc).
                            When this happens on IE, the offsetX/Y is set to where ever the child element
                            is located.
                            As a result, we do NOT need to subtract margins to figure out the mouse X/Y
                            position under this scenario. Removing the line below *will* cause 
                            the interactive layer to not work right on IE.
                         */
                         if(d3.event.target.tagName !== "svg")
                            subtractMargin = false;

                         if (d3.event.target.className.baseVal.match("nv-legend"))
                          mouseOutAnyReason = true;
                          
                      }

                      if(subtractMargin) {
                         mouseX -= margin.left;
                         mouseY -= margin.top;
                      }

                      /* If mouseX/Y is outside of the chart's bounds,
                      trigger a mouseOut event.
                      */
                      if (mouseX < 0 || mouseY < 0 
                        || mouseX > availableWidth || mouseY > availableHeight
                        || (d3.event.relatedTarget && d3.event.relatedTarget.ownerSVGElement === undefined)
                        || mouseOutAnyReason
                        ) 
                      {
                          if (isMSIE) {
                            if (d3.event.relatedTarget 
                              && d3.event.relatedTarget.ownerSVGElement === undefined
                              && d3.event.relatedTarget.className.match(tooltip.nvPointerEventsClass)) {
                              return;
                            }
                          }
                            dispatch.elementMouseout({
                               mouseX: mouseX,
                               mouseY: mouseY
                            });
                            layer.renderGuideLine(null); //hide the guideline
                            return;
                      }
                      
                      var pointXValue = xScale.invert(mouseX);
                      dispatch.elementMousemove({
                            mouseX: mouseX,
                            mouseY: mouseY,
                            pointXValue: pointXValue
                      });

                      //If user double clicks the layer, fire a elementDblclick dispatch.
                      if (d3.event.type === "dblclick") {
                        dispatch.elementDblclick({
                            mouseX: mouseX,
                            mouseY: mouseY,
                            pointXValue: pointXValue
                        });
                      }
                }

        svgContainer
              .on("mousemove",mouseHandler, true)
              .on("mouseout" ,mouseHandler,true)
                      .on("dblclick" ,mouseHandler)
              ;

         //Draws a vertical guideline at the given X postion.
        layer.renderGuideLine = function(x) {
          if (!showGuideLine) return;
          var line = wrap.select(".nv-interactiveGuideLine")
                .selectAll("line")
                .data((x != null) ? [nv.utils.NaNtoZero(x)] : [], String);

          line.enter()
            .append("line")
            .attr("class", "nv-guideline")
            .attr("x1", function(d) { return d;})
            .attr("x2", function(d) { return d;})
            .attr("y1", availableHeight)
            .attr("y2",0)
            ;
          line.exit().remove();

        }
    });
  }

  layer.dispatch = dispatch;
  layer.tooltip = tooltip;

  layer.margin = function(_) {
      if (!arguments.length) return margin;
      margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
      margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
      return layer;
    };

  layer.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return layer;
  };

  layer.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return layer;
  };

  layer.xScale = function(_) {
    if (!arguments.length) return xScale;
    xScale = _;
    return layer;
  };

  layer.showGuideLine = function(_) {
    if (!arguments.length) return showGuideLine;
    showGuideLine = _;
    return layer;
  };

  layer.svgContainer = function(_) {
    if (!arguments.length) return svgContainer;
    svgContainer = _;
    return layer;
  };


  return layer;
};

/* Utility class that uses d3.bisect to find the index in a given array, where a search value can be inserted.
This is different from normal bisectLeft; this function finds the nearest index to insert the search value.

For instance, lets say your array is [1,2,3,5,10,30], and you search for 28. 
Normal d3.bisectLeft will return 4, because 28 is inserted after the number 10.  But interactiveBisect will return 5
because 28 is closer to 30 than 10.

Unit tests can be found in: interactiveBisectTest.html

Has the following known issues:
   * Will not work if the data points move backwards (ie, 10,9,8,7, etc) or if the data points are in random order.
   * Won't work if there are duplicate x coordinate values.
*/
nv.interactiveBisect = function (values, searchVal, xAccessor) {
    "use strict";
      if (! values instanceof Array) return null;
      if (typeof xAccessor !== 'function') xAccessor = function(d,i) { return d.x;}

      var bisect = d3.bisector(xAccessor).left;
      var index = d3.max([0, bisect(values,searchVal) - 1]);
      var currentValue = xAccessor(values[index], index);
      if (typeof currentValue === 'undefined') currentValue = index;

      if (currentValue === searchVal) return index;  //found exact match

      var nextIndex = d3.min([index+1, values.length - 1]);
      var nextValue = xAccessor(values[nextIndex], nextIndex);
      if (typeof nextValue === 'undefined') nextValue = nextIndex;

      if (Math.abs(nextValue - searchVal) >= Math.abs(currentValue - searchVal))
          return index;
      else
          return nextIndex
};

/*
Returns the index in the array "values" that is closest to searchVal.
Only returns an index if searchVal is within some "threshold".
Otherwise, returns null.
*/
nv.nearestValueIndex = function (values, searchVal, threshold) {
      "use strict";
      var yDistMax = Infinity, indexToHighlight = null;
      values.forEach(function(d,i) {
         var delta = Math.abs(searchVal - d);
         if ( delta <= yDistMax && delta < threshold) {
            yDistMax = delta;
            indexToHighlight = i;
         }
      });
      return indexToHighlight;
};/* Tooltip rendering model for nvd3 charts.
window.nv.models.tooltip is the updated,new way to render tooltips.

window.nv.tooltip.show is the old tooltip code.
window.nv.tooltip.* also has various helper methods.
*/
(function() {
  "use strict";
  window.nv.tooltip = {};

  /* Model which can be instantiated to handle tooltip rendering.
    Example usage: 
    var tip = nv.models.tooltip().gravity('w').distance(23)
                .data(myDataObject);

        tip();    //just invoke the returned function to render tooltip.
  */
  window.nv.models.tooltip = function() {
        var content = null    //HTML contents of the tooltip.  If null, the content is generated via the data variable.
        ,   data = null     /* Tooltip data. If data is given in the proper format, a consistent tooltip is generated.
        Format of data:
        {
            key: "Date",
            value: "August 2009", 
            series: [
                    {
                        key: "Series 1",
                        value: "Value 1",
                        color: "#000"
                    },
                    {
                        key: "Series 2",
                        value: "Value 2",
                        color: "#00f"
                    }
            ]

        }

        */
        ,   gravity = 'w'   //Can be 'n','s','e','w'. Determines how tooltip is positioned.
        ,   distance = 50   //Distance to offset tooltip from the mouse location.
        ,   snapDistance = 25   //Tolerance allowed before tooltip is moved from its current position (creates 'snapping' effect)
        ,   fixedTop = null //If not null, this fixes the top position of the tooltip.
        ,   classes = null  //Attaches additional CSS classes to the tooltip DIV that is created.
        ,   chartContainer = null   //Parent DIV, of the SVG Container that holds the chart.
        ,   tooltipElem = null  //actual DOM element representing the tooltip.
        ,   position = {left: null, top: null}      //Relative position of the tooltip inside chartContainer.
        ,   enabled = true  //True -> tooltips are rendered. False -> don't render tooltips.
        //Generates a unique id when you create a new tooltip() object
        ,   id = "nvtooltip-" + Math.floor(Math.random() * 100000)
        ;

        //CSS class to specify whether element should not have mouse events.
        var  nvPointerEventsClass = "nv-pointer-events-none";

        //Format function for the tooltip values column
        var valueFormatter = function(d,i) {
            return d;
        };

        //Format function for the tooltip header value.
        var headerFormatter = function(d) {
            return d;
        };

        //By default, the tooltip model renders a beautiful table inside a DIV.
        //You can override this function if a custom tooltip is desired.
        var contentGenerator = function(d) {
            if (content != null) return content;

            if (d == null) return '';

            var table = d3.select(document.createElement("table"));
            var theadEnter = table.selectAll("thead")
                .data([d])
                .enter().append("thead");
            theadEnter.append("tr")
                .append("td")
                .attr("colspan",3)
                .append("strong")
                    .classed("x-value",true)
                    .html(headerFormatter(d.value));

            var tbodyEnter = table.selectAll("tbody")
                .data([d])
                .enter().append("tbody");
            var trowEnter = tbodyEnter.selectAll("tr")
                .data(function(p) { return p.series})
                .enter()
                .append("tr")
                .classed("highlight", function(p) { return p.highlight})
                ;

            trowEnter.append("td")
                .classed("legend-color-guide",true)
                .append("div")
                    .style("background-color", function(p) { return p.color});
            trowEnter.append("td")
                .classed("key",true)
                .html(function(p) {return p.key});
            trowEnter.append("td")
                .classed("value",true)
                .html(function(p,i) { return valueFormatter(p.value,i) });


            trowEnter.selectAll("td").each(function(p) {
                if (p.highlight) {
                    var opacityScale = d3.scale.linear().domain([0,1]).range(["#fff",p.color]);
                    var opacity = 0.6;
                    d3.select(this)
                        .style("border-bottom-color", opacityScale(opacity))
                        .style("border-top-color", opacityScale(opacity))
                        ;
                }
            });

            var html = table.node().outerHTML;
            if (d.footer !== undefined)
                html += "<div class='footer'>" + d.footer + "</div>";
            return html;

        };

        var dataSeriesExists = function(d) {
            if (d && d.series && d.series.length > 0) return true;

            return false;
        };

        //In situations where the chart is in a 'viewBox', re-position the tooltip based on how far chart is zoomed.
        function convertViewBoxRatio() {
            if (chartContainer) {
              var svg = d3.select(chartContainer);
              if (svg.node().tagName !== "svg") {
                 svg = svg.select("svg");
              }
              var viewBox = (svg.node()) ? svg.attr('viewBox') : null;
              if (viewBox) {
                viewBox = viewBox.split(' ');
                var ratio = parseInt(svg.style('width')) / viewBox[2];
                
                position.left = position.left * ratio;
                position.top  = position.top * ratio;
              }
            }
        }

        //Creates new tooltip container, or uses existing one on DOM.
        function getTooltipContainer(newContent) {
            var body;
            if (chartContainer)
                body = d3.select(chartContainer);
            else
                body = d3.select("body");

            var container = body.select(".nvtooltip");
            if (container.node() === null) {
                //Create new tooltip div if it doesn't exist on DOM.
                container = body.append("div")
                    .attr("class", "nvtooltip " + (classes? classes: "xy-tooltip"))
                    .attr("id",id)
                    ;
            }
        

            container.node().innerHTML = newContent;
            container.style("top",0).style("left",0).style("opacity",0);
            container.selectAll("div, table, td, tr").classed(nvPointerEventsClass,true)
            container.classed(nvPointerEventsClass,true);
            return container.node();
        }

        

        //Draw the tooltip onto the DOM.
        function nvtooltip() {
            if (!enabled) return;
            if (!dataSeriesExists(data)) return;

            convertViewBoxRatio();

            var left = position.left;
            var top = (fixedTop != null) ? fixedTop : position.top;
            var container = getTooltipContainer(contentGenerator(data));
            tooltipElem = container;
            if (chartContainer) {
                var svgComp = chartContainer.getElementsByTagName("svg")[0];
                var boundRect = (svgComp) ? svgComp.getBoundingClientRect() : chartContainer.getBoundingClientRect();
                var svgOffset = {left:0,top:0};
                if (svgComp) {
                    var svgBound = svgComp.getBoundingClientRect();
                    var chartBound = chartContainer.getBoundingClientRect();
                    var svgBoundTop = svgBound.top;
                    
                    //Defensive code. Sometimes, svgBoundTop can be a really negative
                    //  number, like -134254. That's a bug. 
                    //  If such a number is found, use zero instead. FireFox bug only
                    if (svgBoundTop < 0) {
                        var containerBound = chartContainer.getBoundingClientRect();
                        svgBoundTop = (Math.abs(svgBoundTop) > containerBound.height) ? 0 : svgBoundTop;
                    } 
                    svgOffset.top = Math.abs(svgBoundTop - chartBound.top);
                    svgOffset.left = Math.abs(svgBound.left - chartBound.left);
                }
                //If the parent container is an overflow <div> with scrollbars, subtract the scroll offsets.
                //You need to also add any offset between the <svg> element and its containing <div>
                //Finally, add any offset of the containing <div> on the whole page.
                left += chartContainer.offsetLeft + svgOffset.left - 2*chartContainer.scrollLeft;
                top += chartContainer.offsetTop + svgOffset.top - 2*chartContainer.scrollTop;
            }

            if (snapDistance && snapDistance > 0) {
                top = Math.floor(top/snapDistance) * snapDistance;
            }

            nv.tooltip.calcTooltipPosition([left,top], gravity, distance, container);
            return nvtooltip;
        };

        nvtooltip.nvPointerEventsClass = nvPointerEventsClass;
        
        nvtooltip.content = function(_) {
            if (!arguments.length) return content;
            content = _;
            return nvtooltip;
        };

        //Returns tooltipElem...not able to set it.
        nvtooltip.tooltipElem = function() {
            return tooltipElem;
        };

        nvtooltip.contentGenerator = function(_) {
            if (!arguments.length) return contentGenerator;
            if (typeof _ === 'function') {
                contentGenerator = _;
            }
            return nvtooltip;
        };

        nvtooltip.data = function(_) {
            if (!arguments.length) return data;
            data = _;
            return nvtooltip;
        };

        nvtooltip.gravity = function(_) {
            if (!arguments.length) return gravity;
            gravity = _;
            return nvtooltip;
        };

        nvtooltip.distance = function(_) {
            if (!arguments.length) return distance;
            distance = _;
            return nvtooltip;
        };

        nvtooltip.snapDistance = function(_) {
            if (!arguments.length) return snapDistance;
            snapDistance = _;
            return nvtooltip;
        };

        nvtooltip.classes = function(_) {
            if (!arguments.length) return classes;
            classes = _;
            return nvtooltip;
        };

        nvtooltip.chartContainer = function(_) {
            if (!arguments.length) return chartContainer;
            chartContainer = _;
            return nvtooltip;
        };

        nvtooltip.position = function(_) {
            if (!arguments.length) return position;
            position.left = (typeof _.left !== 'undefined') ? _.left : position.left;
            position.top = (typeof _.top !== 'undefined') ? _.top : position.top;
            return nvtooltip;
        };

        nvtooltip.fixedTop = function(_) {
            if (!arguments.length) return fixedTop;
            fixedTop = _;
            return nvtooltip;
        };

        nvtooltip.enabled = function(_) {
            if (!arguments.length) return enabled;
            enabled = _;
            return nvtooltip;
        };

        nvtooltip.valueFormatter = function(_) {
            if (!arguments.length) return valueFormatter;
            if (typeof _ === 'function') {
                valueFormatter = _;
            }
            return nvtooltip;
        };

        nvtooltip.headerFormatter = function(_) {
            if (!arguments.length) return headerFormatter;
            if (typeof _ === 'function') {
                headerFormatter = _;
            }
            return nvtooltip;
        };

        //id() is a read-only function. You can't use it to set the id.
        nvtooltip.id = function() {
            return id;
        };


        return nvtooltip;
  };


  //Original tooltip.show function. Kept for backward compatibility.
  // pos = [left,top]
  nv.tooltip.show = function(pos, content, gravity, dist, parentContainer, classes) {
      
        //Create new tooltip div if it doesn't exist on DOM.
        var   container = document.createElement('div');
        container.className = 'nvtooltip ' + (classes ? classes : 'xy-tooltip');

        var body = parentContainer;
        if ( !parentContainer || parentContainer.tagName.match(/g|svg/i)) {
            //If the parent element is an SVG element, place tooltip in the <body> element.
            body = document.getElementsByTagName('body')[0];
        }
   
        container.style.left = 0;
        container.style.top = 0;
        container.style.opacity = 0;
        container.innerHTML = content;
        body.appendChild(container);
        
        //If the parent container is an overflow <div> with scrollbars, subtract the scroll offsets.
        if (parentContainer) {
           pos[0] = pos[0] - parentContainer.scrollLeft;
           pos[1] = pos[1] - parentContainer.scrollTop;
        }
        nv.tooltip.calcTooltipPosition(pos, gravity, dist, container);
  };

  //Looks up the ancestry of a DOM element, and returns the first NON-svg node.
  nv.tooltip.findFirstNonSVGParent = function(Elem) {
            while(Elem.tagName.match(/^g|svg$/i) !== null) {
                Elem = Elem.parentNode;
            }
            return Elem;
  };

  //Finds the total offsetTop of a given DOM element.
  //Looks up the entire ancestry of an element, up to the first relatively positioned element.
  nv.tooltip.findTotalOffsetTop = function ( Elem, initialTop ) {
                var offsetTop = initialTop;
                
                do {
                    if( !isNaN( Elem.offsetTop ) ) {
                        offsetTop += (Elem.offsetTop);
                    }
                } while( Elem = Elem.offsetParent );
                return offsetTop;
  };

  //Finds the total offsetLeft of a given DOM element.
  //Looks up the entire ancestry of an element, up to the first relatively positioned element.
  nv.tooltip.findTotalOffsetLeft = function ( Elem, initialLeft) {
                var offsetLeft = initialLeft;
                
                do {
                    if( !isNaN( Elem.offsetLeft ) ) {
                        offsetLeft += (Elem.offsetLeft);
                    }
                } while( Elem = Elem.offsetParent );
                return offsetLeft;
  };

  //Global utility function to render a tooltip on the DOM.
  //pos = [left,top] coordinates of where to place the tooltip, relative to the SVG chart container.
  //gravity = how to orient the tooltip
  //dist = how far away from the mouse to place tooltip
  //container = tooltip DIV
  nv.tooltip.calcTooltipPosition = function(pos, gravity, dist, container) {

            var height = parseInt(container.offsetHeight),
                width = parseInt(container.offsetWidth),
                windowWidth = nv.utils.windowSize().width,
                windowHeight = nv.utils.windowSize().height,
                scrollTop = window.pageYOffset,
                scrollLeft = window.pageXOffset,
                left, top;

            windowHeight = window.innerWidth >= document.body.scrollWidth ? windowHeight : windowHeight - 16;
            windowWidth = window.innerHeight >= document.body.scrollHeight ? windowWidth : windowWidth - 16;

            gravity = gravity || 's';
            dist = dist || 20;

            var tooltipTop = function ( Elem ) {
                return nv.tooltip.findTotalOffsetTop(Elem, top);
            };

            var tooltipLeft = function ( Elem ) {
                return nv.tooltip.findTotalOffsetLeft(Elem,left);
            };

            switch (gravity) {
              case 'e':
                left = pos[0] - width - dist;
                top = pos[1] - (height / 2);
                var tLeft = tooltipLeft(container);
                var tTop = tooltipTop(container);
                if (tLeft < scrollLeft) left = pos[0] + dist > scrollLeft ? pos[0] + dist : scrollLeft - tLeft + left;
                if (tTop < scrollTop) top = scrollTop - tTop + top;
                if (tTop + height > scrollTop + windowHeight) top = scrollTop + windowHeight - tTop + top - height;
                break;
              case 'w':
                left = pos[0] + dist;
                top = pos[1] - (height / 2);
                var tLeft = tooltipLeft(container);
                var tTop = tooltipTop(container);
                if (tLeft + width > windowWidth) left = pos[0] - width - dist;
                if (tTop < scrollTop) top = scrollTop + 5;
                if (tTop + height > scrollTop + windowHeight) top = scrollTop + windowHeight - tTop + top - height;
                break;
              case 'n':
                left = pos[0] - (width / 2) - 5;
                top = pos[1] + dist;
                var tLeft = tooltipLeft(container);
                var tTop = tooltipTop(container);
                if (tLeft < scrollLeft) left = scrollLeft + 5;
                if (tLeft + width > windowWidth) left = left - width/2 + 5;
                if (tTop + height > scrollTop + windowHeight) top = scrollTop + windowHeight - tTop + top - height;
                break;
              case 's':
                left = pos[0] - (width / 2);
                top = pos[1] - height - dist;
                var tLeft = tooltipLeft(container);
                var tTop = tooltipTop(container);
                if (tLeft < scrollLeft) left = scrollLeft + 5;
                if (tLeft + width > windowWidth) left = left - width/2 + 5;
                if (scrollTop > tTop) top = scrollTop;
                break;
              case 'none':
                left = pos[0];
                top = pos[1] - dist;
                var tLeft = tooltipLeft(container);
                var tTop = tooltipTop(container);
                break;
            }


            container.style.left = left+'px';
            container.style.top = top+'px';
            container.style.opacity = 1;
            container.style.position = 'absolute'; 

            return container;
    };

    //Global utility function to remove tooltips from the DOM.
    nv.tooltip.cleanup = function() {

              // Find the tooltips, mark them for removal by this class (so others cleanups won't find it)
              var tooltips = document.getElementsByClassName('nvtooltip');
              var purging = [];
              while(tooltips.length) {
                purging.push(tooltips[0]);
                tooltips[0].style.transitionDelay = '0 !important';
                tooltips[0].style.opacity = 0;
                tooltips[0].className = 'nvtooltip-pending-removal';
              }

              setTimeout(function() {

                  while (purging.length) {
                     var removeMe = purging.pop();
                      removeMe.parentNode.removeChild(removeMe);
                  }
            }, 500);
    };

})();

nv.utils.windowSize = function() {
    // Sane defaults
    var size = {width: 640, height: 480};

    // Earlier IE uses Doc.body
    if (document.body && document.body.offsetWidth) {
        size.width = document.body.offsetWidth;
        size.height = document.body.offsetHeight;
    }

    // IE can use depending on mode it is in
    if (document.compatMode=='CSS1Compat' &&
        document.documentElement &&
        document.documentElement.offsetWidth ) {
        size.width = document.documentElement.offsetWidth;
        size.height = document.documentElement.offsetHeight;
    }

    // Most recent browsers use
    if (window.innerWidth && window.innerHeight) {
        size.width = window.innerWidth;
        size.height = window.innerHeight;
    }
    return (size);
};



// Easy way to bind multiple functions to window.onresize
// TODO: give a way to remove a function after its bound, other than removing all of them
nv.utils.windowResize = function(fun){
  if (fun === undefined) return;
  var oldresize = window.onresize;

  window.onresize = function(e) {
    if (typeof oldresize == 'function') oldresize(e);
    fun(e);
  }
}

// Backwards compatible way to implement more d3-like coloring of graphs.
// If passed an array, wrap it in a function which implements the old default
// behavior
nv.utils.getColor = function(color) {
    if (!arguments.length) return nv.utils.defaultColor(); //if you pass in nothing, get default colors back

    if( Object.prototype.toString.call( color ) === '[object Array]' )
        return function(d, i) { return d.color || color[i % color.length]; };
    else
        return color;
        //can't really help it if someone passes rubbish as color
}

// Default color chooser uses the index of an object as before.
nv.utils.defaultColor = function() {
    var colors = d3.scale.category20().range();
    return function(d, i) { return d.color || colors[i % colors.length] };
}


// Returns a color function that takes the result of 'getKey' for each series and
// looks for a corresponding color from the dictionary,
nv.utils.customTheme = function(dictionary, getKey, defaultColors) {
  getKey = getKey || function(series) { return series.key }; // use default series.key if getKey is undefined
  defaultColors = defaultColors || d3.scale.category20().range(); //default color function

  var defIndex = defaultColors.length; //current default color (going in reverse)

  return function(series, index) {
    var key = getKey(series);

    if (!defIndex) defIndex = defaultColors.length; //used all the default colors, start over

    if (typeof dictionary[key] !== "undefined")
      return (typeof dictionary[key] === "function") ? dictionary[key]() : dictionary[key];
    else
      return defaultColors[--defIndex]; // no match in dictionary, use default color
  }
}



// From the PJAX example on d3js.org, while this is not really directly needed
// it's a very cool method for doing pjax, I may expand upon it a little bit,
// open to suggestions on anything that may be useful
nv.utils.pjax = function(links, content) {
  d3.selectAll(links).on("click", function() {
    history.pushState(this.href, this.textContent, this.href);
    load(this.href);
    d3.event.preventDefault();
  });

  function load(href) {
    d3.html(href, function(fragment) {
      var target = d3.select(content).node();
      target.parentNode.replaceChild(d3.select(fragment).select(content).node(), target);
      nv.utils.pjax(links, content);
    });
  }

  d3.select(window).on("popstate", function() {
    if (d3.event.state) load(d3.event.state);
  });
}

/* For situations where we want to approximate the width in pixels for an SVG:text element.
Most common instance is when the element is in a display:none; container.
Forumla is : text.length * font-size * constant_factor
*/
nv.utils.calcApproxTextWidth = function (svgTextElem) {
    if (typeof svgTextElem.style === 'function'
        && typeof svgTextElem.text === 'function') {
        var fontSize = parseInt(svgTextElem.style("font-size").replace("px",""));
        var textLength = svgTextElem.text().length;

        return textLength * fontSize * 0.5;
    }
    return 0;
};

/* Numbers that are undefined, null or NaN, convert them to zeros.
*/
nv.utils.NaNtoZero = function(n) {
    if (typeof n !== 'number'
        || isNaN(n)
        || n === null
        || n === Infinity) return 0;

    return n;
};

/*
Snippet of code you can insert into each nv.models.* to give you the ability to
do things like:
chart.options({
  showXAxis: true,
  tooltips: true
});

To enable in the chart:
chart.options = nv.utils.optionsFunc.bind(chart);
*/
nv.utils.optionsFunc = function(args) {
    if (args) {
      d3.map(args).forEach((function(key,value) {
        if (typeof this[key] === "function") {
           this[key](value);
        }
      }).bind(this));
    }
    return this;
};nv.models.axis = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var axis = d3.svg.axis()
    ;

  var margin = {top: 0, right: 0, bottom: 0, left: 0}
    , width = 75 //only used for tickLabel currently
    , height = 60 //only used for tickLabel currently
    , scale = d3.scale.linear()
    , axisLabelText = null
    , showMaxMin = true //TODO: showMaxMin should be disabled on all ordinal scaled axes
    , highlightZero = true
    , rotateLabels = 0
    , rotateYLabel = true
    , staggerLabels = false
    , isOrdinal = false
    , ticks = null
    , axisLabelDistance = 12 //The larger this number is, the closer the axis label is to the axis.
    ;

  axis
    .scale(scale)
    .orient('bottom')
    .tickFormat(function(d) { return d })
    ;

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var scale0;

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this);


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-axis').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-axis');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g')

      //------------------------------------------------------------


      if (ticks !== null)
        axis.ticks(ticks);
      else if (axis.orient() == 'top' || axis.orient() == 'bottom')
        axis.ticks(Math.abs(scale.range()[1] - scale.range()[0]) / 100);


      //TODO: consider calculating width/height based on whether or not label is added, for reference in charts using this component


      g.transition().call(axis);

      scale0 = scale0 || axis.scale();

      var fmt = axis.tickFormat();
      if (fmt == null) {
        fmt = scale0.tickFormat();
      }

      var axisLabel = g.selectAll('text.nv-axislabel')
          .data([axisLabelText || null]);
      axisLabel.exit().remove();
      switch (axis.orient()) {
        case 'top':
          axisLabel.enter().append('text').attr('class', 'nv-axislabel');
          var w = (scale.range().length==2) ? scale.range()[1] : (scale.range()[scale.range().length-1]+(scale.range()[1]-scale.range()[0]));
          axisLabel
              .attr('text-anchor', 'middle')
              .attr('y', 0)
              .attr('x', w/2);
          if (showMaxMin) {
            var axisMaxMin = wrap.selectAll('g.nv-axisMaxMin')
                           .data(scale.domain());
            axisMaxMin.enter().append('g').attr('class', 'nv-axisMaxMin').append('text');
            axisMaxMin.exit().remove();
            axisMaxMin
                .attr('transform', function(d,i) {
                  return 'translate(' + scale(d) + ',0)'
                })
              .select('text')
                .attr('dy', '-0.5em')
                .attr('y', -axis.tickPadding())
                .attr('text-anchor', 'middle')
                .text(function(d,i) {
                  var v = fmt(d);
                  return ('' + v).match('NaN') ? '' : v;
                });
            axisMaxMin.transition()
                .attr('transform', function(d,i) {
                  return 'translate(' + scale.range()[i] + ',0)'
                });
          }
          break;
        case 'bottom':
          var xLabelMargin = 36;
          var maxTextWidth = 30;
          var xTicks = g.selectAll('g').select("text");
          if (rotateLabels%360) {
            //Calculate the longest xTick width
            xTicks.each(function(d,i){
              var width = this.getBBox().width;
              if(width > maxTextWidth) maxTextWidth = width;
            });
            //Convert to radians before calculating sin. Add 30 to margin for healthy padding.
            var sin = Math.abs(Math.sin(rotateLabels*Math.PI/180));
            var xLabelMargin = (sin ? sin*maxTextWidth : maxTextWidth)+30;
            //Rotate all xTicks
            xTicks
              .attr('transform', function(d,i,j) { return 'rotate(' + rotateLabels + ' 0,0)' })
              .style('text-anchor', rotateLabels%360 > 0 ? 'start' : 'end');
          }
          axisLabel.enter().append('text').attr('class', 'nv-axislabel');
          var w = (scale.range().length==2) ? scale.range()[1] : (scale.range()[scale.range().length-1]+(scale.range()[1]-scale.range()[0]));
          axisLabel
              .attr('text-anchor', 'middle')
              .attr('y', xLabelMargin)
              .attr('x', w/2);
          if (showMaxMin) {
          //if (showMaxMin && !isOrdinal) {
            var axisMaxMin = wrap.selectAll('g.nv-axisMaxMin')
                           //.data(scale.domain())
                           .data([scale.domain()[0], scale.domain()[scale.domain().length - 1]]);
            axisMaxMin.enter().append('g').attr('class', 'nv-axisMaxMin').append('text');
            axisMaxMin.exit().remove();
            axisMaxMin
                .attr('transform', function(d,i) {
                  return 'translate(' + (scale(d) + (isOrdinal ? scale.rangeBand() / 2 : 0)) + ',0)'
                })
              .select('text')
                .attr('dy', '.71em')
                .attr('y', axis.tickPadding())
                .attr('transform', function(d,i,j) { return 'rotate(' + rotateLabels + ' 0,0)' })
                .style('text-anchor', rotateLabels ? (rotateLabels%360 > 0 ? 'start' : 'end') : 'middle')
                .text(function(d,i) {
                  var v = fmt(d);
                  return ('' + v).match('NaN') ? '' : v;
                });
            axisMaxMin.transition()
                .attr('transform', function(d,i) {
                  //return 'translate(' + scale.range()[i] + ',0)'
                  //return 'translate(' + scale(d) + ',0)'
                  return 'translate(' + (scale(d) + (isOrdinal ? scale.rangeBand() / 2 : 0)) + ',0)'
                });
          }
          if (staggerLabels)
            xTicks
                .attr('transform', function(d,i) { return 'translate(0,' + (i % 2 == 0 ? '0' : '12') + ')' });

          break;
        case 'right':
          axisLabel.enter().append('text').attr('class', 'nv-axislabel');
          axisLabel
              .style('text-anchor', rotateYLabel ? 'middle' : 'begin')
              .attr('transform', rotateYLabel ? 'rotate(90)' : '')
              .attr('y', rotateYLabel ? (-Math.max(margin.right,width) + 12) : -10) //TODO: consider calculating this based on largest tick width... OR at least expose this on chart
              .attr('x', rotateYLabel ? (scale.range()[0] / 2) : axis.tickPadding());
          if (showMaxMin) {
            var axisMaxMin = wrap.selectAll('g.nv-axisMaxMin')
                           .data(scale.domain());
            axisMaxMin.enter().append('g').attr('class', 'nv-axisMaxMin').append('text')
                .style('opacity', 0);
            axisMaxMin.exit().remove();
            axisMaxMin
                .attr('transform', function(d,i) {
                  return 'translate(0,' + scale(d) + ')'
                })
              .select('text')
                .attr('dy', '.32em')
                .attr('y', 0)
                .attr('x', axis.tickPadding())
                .style('text-anchor', 'start')
                .text(function(d,i) {
                  var v = fmt(d);
                  return ('' + v).match('NaN') ? '' : v;
                });
            axisMaxMin.transition()
                .attr('transform', function(d,i) {
                  return 'translate(0,' + scale.range()[i] + ')'
                })
              .select('text')
                .style('opacity', 1);
          }
          break;
        case 'left':
          /*
          //For dynamically placing the label. Can be used with dynamically-sized chart axis margins
          var yTicks = g.selectAll('g').select("text");
          yTicks.each(function(d,i){
            var labelPadding = this.getBBox().width + axis.tickPadding() + 16;
            if(labelPadding > width) width = labelPadding;
          });
          */
          axisLabel.enter().append('text').attr('class', 'nv-axislabel');
          axisLabel
              .style('text-anchor', rotateYLabel ? 'middle' : 'end')
              .attr('transform', rotateYLabel ? 'rotate(-90)' : '')
              .attr('y', rotateYLabel ? (-Math.max(margin.left,width) + axisLabelDistance) : -10) //TODO: consider calculating this based on largest tick width... OR at least expose this on chart
              .attr('x', rotateYLabel ? (-scale.range()[0] / 2) : -axis.tickPadding());
          if (showMaxMin) {
            var axisMaxMin = wrap.selectAll('g.nv-axisMaxMin')
                           .data(scale.domain());
            axisMaxMin.enter().append('g').attr('class', 'nv-axisMaxMin').append('text')
                .style('opacity', 0);
            axisMaxMin.exit().remove();
            axisMaxMin
                .attr('transform', function(d,i) {
                  return 'translate(0,' + scale0(d) + ')'
                })
              .select('text')
                .attr('dy', '.32em')
                .attr('y', 0)
                .attr('x', -axis.tickPadding())
                .attr('text-anchor', 'end')
                .text(function(d,i) {
                  var v = fmt(d);
                  return ('' + v).match('NaN') ? '' : v;
                });
            axisMaxMin.transition()
                .attr('transform', function(d,i) {
                  return 'translate(0,' + scale.range()[i] + ')'
                })
              .select('text')
                .style('opacity', 1);
          }
          break;
      }
      axisLabel
          .text(function(d) { return d });


      if (showMaxMin && (axis.orient() === 'left' || axis.orient() === 'right')) {
        //check if max and min overlap other values, if so, hide the values that overlap
        g.selectAll('g') // the g's wrapping each tick
            .each(function(d,i) {
              d3.select(this).select('text').attr('opacity', 1);
              if (scale(d) < scale.range()[1] + 10 || scale(d) > scale.range()[0] - 10) { // 10 is assuming text height is 16... if d is 0, leave it!
                if (d > 1e-10 || d < -1e-10) // accounts for minor floating point errors... though could be problematic if the scale is EXTREMELY SMALL
                  d3.select(this).attr('opacity', 0);

                d3.select(this).select('text').attr('opacity', 0); // Don't remove the ZERO line!!
              }
            });

        //if Max and Min = 0 only show min, Issue #281
        if (scale.domain()[0] == scale.domain()[1] && scale.domain()[0] == 0)
          wrap.selectAll('g.nv-axisMaxMin')
            .style('opacity', function(d,i) { return !i ? 1 : 0 });

      }

      if (showMaxMin && (axis.orient() === 'top' || axis.orient() === 'bottom')) {
        var maxMinRange = [];
        wrap.selectAll('g.nv-axisMaxMin')
            .each(function(d,i) {
              try {
                  if (i) // i== 1, max position
                      maxMinRange.push(scale(d) - this.getBBox().width - 4)  //assuming the max and min labels are as wide as the next tick (with an extra 4 pixels just in case)
                  else // i==0, min position
                      maxMinRange.push(scale(d) + this.getBBox().width + 4)
              }catch (err) {
                  if (i) // i== 1, max position
                      maxMinRange.push(scale(d) - 4)  //assuming the max and min labels are as wide as the next tick (with an extra 4 pixels just in case)
                  else // i==0, min position
                      maxMinRange.push(scale(d) + 4)
              }
            });
        g.selectAll('g') // the g's wrapping each tick
            .each(function(d,i) {
              if (scale(d) < maxMinRange[0] || scale(d) > maxMinRange[1]) {
                if (d > 1e-10 || d < -1e-10) // accounts for minor floating point errors... though could be problematic if the scale is EXTREMELY SMALL
                  d3.select(this).remove();
                else
                  d3.select(this).select('text').remove(); // Don't remove the ZERO line!!
              }
            });
      }


      //highlight zero line ... Maybe should not be an option and should just be in CSS?
      if (highlightZero)
        g.selectAll('.tick')
          .filter(function(d) { return !parseFloat(Math.round(d.__data__*100000)/1000000) && (d.__data__ !== undefined) }) //this is because sometimes the 0 tick is a very small fraction, TODO: think of cleaner technique
            .classed('zero', true);

      //store old scales for use in transitions on update
      scale0 = scale.copy();

    });

    return chart;
  }


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.axis = axis;

  d3.rebind(chart, axis, 'orient', 'tickValues', 'tickSubdivide', 'tickSize', 'tickPadding', 'tickFormat');
  d3.rebind(chart, scale, 'domain', 'range', 'rangeBand', 'rangeBands'); //these are also accessible by chart.scale(), but added common ones directly for ease of use

  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.margin = function(_) {
    if(!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  }

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.ticks = function(_) {
    if (!arguments.length) return ticks;
    ticks = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.axisLabel = function(_) {
    if (!arguments.length) return axisLabelText;
    axisLabelText = _;
    return chart;
  }

  chart.showMaxMin = function(_) {
    if (!arguments.length) return showMaxMin;
    showMaxMin = _;
    return chart;
  }

  chart.highlightZero = function(_) {
    if (!arguments.length) return highlightZero;
    highlightZero = _;
    return chart;
  }

  chart.scale = function(_) {
    if (!arguments.length) return scale;
    scale = _;
    axis.scale(scale);
    isOrdinal = typeof scale.rangeBands === 'function';
    d3.rebind(chart, scale, 'domain', 'range', 'rangeBand', 'rangeBands');
    return chart;
  }

  chart.rotateYLabel = function(_) {
    if(!arguments.length) return rotateYLabel;
    rotateYLabel = _;
    return chart;
  }

  chart.rotateLabels = function(_) {
    if(!arguments.length) return rotateLabels;
    rotateLabels = _;
    return chart;
  }

  chart.staggerLabels = function(_) {
    if (!arguments.length) return staggerLabels;
    staggerLabels = _;
    return chart;
  };

  chart.axisLabelDistance = function(_) {
    if (!arguments.length) return axisLabelDistance;
    axisLabelDistance = _;
    return chart;
  };

  //============================================================


  return chart;
}
//TODO: consider deprecating and using multibar with single series for this
nv.models.historicalBar = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var margin = {top: 0, right: 0, bottom: 0, left: 0}
    , width = 960
    , height = 500
    , id = Math.floor(Math.random() * 10000) //Create semi-unique ID in case user doesn't select one
    , x = d3.scale.linear()
    , y = d3.scale.linear()
    , getX = function(d) { return d.x }
    , getY = function(d) { return d.y }
    , forceX = []
    , forceY = [0]
    , padData = false
    , clipEdge = true
    , color = nv.utils.defaultColor()
    , xDomain
    , yDomain
    , xRange
    , yRange
    , dispatch = d3.dispatch('chartClick', 'elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout')
    , interactive = true
    ;

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var availableWidth = width - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom,
          container = d3.select(this);


      //------------------------------------------------------------
      // Setup Scales

      x   .domain(xDomain || d3.extent(data[0].values.map(getX).concat(forceX) ))

      if (padData)
        x.range(xRange || [availableWidth * .5 / data[0].values.length, availableWidth * (data[0].values.length - .5)  / data[0].values.length ]);
      else
        x.range(xRange || [0, availableWidth]);

      y   .domain(yDomain || d3.extent(data[0].values.map(getY).concat(forceY) ))
          .range(yRange || [availableHeight, 0]);

      // If scale's domain don't have a range, slightly adjust to make one... so a chart can show a single data point

      if (x.domain()[0] === x.domain()[1])
        x.domain()[0] ?
            x.domain([x.domain()[0] - x.domain()[0] * 0.01, x.domain()[1] + x.domain()[1] * 0.01])
          : x.domain([-1,1]);

      if (y.domain()[0] === y.domain()[1])
        y.domain()[0] ?
            y.domain([y.domain()[0] + y.domain()[0] * 0.01, y.domain()[1] - y.domain()[1] * 0.01])
          : y.domain([-1,1]);

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-historicalBar-' + id).data([data[0].values]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-historicalBar-' + id);
      var defsEnter = wrapEnter.append('defs');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-bars');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      //------------------------------------------------------------


      container
          .on('click', function(d,i) {
            dispatch.chartClick({
                data: d,
                index: i,
                pos: d3.event,
                id: id
            });
          });


      defsEnter.append('clipPath')
          .attr('id', 'nv-chart-clip-path-' + id)
        .append('rect');

      wrap.select('#nv-chart-clip-path-' + id + ' rect')
          .attr('width', availableWidth)
          .attr('height', availableHeight);

      g   .attr('clip-path', clipEdge ? 'url(#nv-chart-clip-path-' + id + ')' : '');



      var bars = wrap.select('.nv-bars').selectAll('.nv-bar')
          .data(function(d) { return d }, function(d,i) {return getX(d,i)});

      bars.exit().remove();


      var barsEnter = bars.enter().append('rect')
          //.attr('class', function(d,i,j) { return (getY(d,i) < 0 ? 'nv-bar negative' : 'nv-bar positive') + ' nv-bar-' + j + '-' + i })
          .attr('x', 0 )
          .attr('y', function(d,i) {  return nv.utils.NaNtoZero(y(Math.max(0, getY(d,i)))) })
          .attr('height', function(d,i) { return nv.utils.NaNtoZero(Math.abs(y(getY(d,i)) - y(0))) })
          .attr('transform', function(d,i) { return 'translate(' + (x(getX(d,i)) - availableWidth / data[0].values.length * .45) + ',0)'; }) 
          .on('mouseover', function(d,i) {
            if (!interactive) return;
            d3.select(this).classed('hover', true);
            dispatch.elementMouseover({
                point: d,
                series: data[0],
                pos: [x(getX(d,i)), y(getY(d,i))],  // TODO: Figure out why the value appears to be shifted
                pointIndex: i,
                seriesIndex: 0,
                e: d3.event
            });

          })
          .on('mouseout', function(d,i) {
                if (!interactive) return;
                d3.select(this).classed('hover', false);
                dispatch.elementMouseout({
                    point: d,
                    series: data[0],
                    pointIndex: i,
                    seriesIndex: 0,
                    e: d3.event
                });
          })
          .on('click', function(d,i) {
                if (!interactive) return;
                dispatch.elementClick({
                    //label: d[label],
                    value: getY(d,i),
                    data: d,
                    index: i,
                    pos: [x(getX(d,i)), y(getY(d,i))],
                    e: d3.event,
                    id: id
                });
              d3.event.stopPropagation();
          })
          .on('dblclick', function(d,i) {
              if (!interactive) return;
              dispatch.elementDblClick({
                  //label: d[label],
                  value: getY(d,i),
                  data: d,
                  index: i,
                  pos: [x(getX(d,i)), y(getY(d,i))],
                  e: d3.event,
                  id: id
              });
              d3.event.stopPropagation();
          });

      bars
          .attr('fill', function(d,i) { return color(d, i); })
          .attr('class', function(d,i,j) { return (getY(d,i) < 0 ? 'nv-bar negative' : 'nv-bar positive') + ' nv-bar-' + j + '-' + i })
          .transition()
          .attr('transform', function(d,i) { return 'translate(' + (x(getX(d,i)) - availableWidth / data[0].values.length * .45) + ',0)'; }) 
           //TODO: better width calculations that don't assume always uniform data spacing;w
          .attr('width', (availableWidth / data[0].values.length) * .9 );


      bars.transition()
          .attr('y', function(d,i) {
            var rval = getY(d,i) < 0 ?
                    y(0) :
                    y(0) - y(getY(d,i)) < 1 ?
                      y(0) - 1 :
                      y(getY(d,i));
            return nv.utils.NaNtoZero(rval);
          })
          .attr('height', function(d,i) { return nv.utils.NaNtoZero(Math.max(Math.abs(y(getY(d,i)) - y(0)),1)) });

    });

    return chart;
  }

  //Create methods to allow outside functions to highlight a specific bar.
  chart.highlightPoint = function(pointIndex, isHoverOver) {
      d3.select(".nv-historicalBar-" + id)
        .select(".nv-bars .nv-bar-0-" + pointIndex)
              .classed("hover", isHoverOver)
               ;
  };

  chart.clearHighlights = function() {
      d3.select(".nv-historicalBar-" + id)
        .select(".nv-bars .nv-bar.hover")
              .classed("hover", false)
               ;
  };
  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  chart.dispatch = dispatch;

  chart.options = nv.utils.optionsFunc.bind(chart);
  
  chart.x = function(_) {
    if (!arguments.length) return getX;
    getX = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return getY;
    getY = _;
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.xScale = function(_) {
    if (!arguments.length) return x;
    x = _;
    return chart;
  };

  chart.yScale = function(_) {
    if (!arguments.length) return y;
    y = _;
    return chart;
  };

  chart.xDomain = function(_) {
    if (!arguments.length) return xDomain;
    xDomain = _;
    return chart;
  };

  chart.yDomain = function(_) {
    if (!arguments.length) return yDomain;
    yDomain = _;
    return chart;
  };

  chart.xRange = function(_) {
    if (!arguments.length) return xRange;
    xRange = _;
    return chart;
  };

  chart.yRange = function(_) {
    if (!arguments.length) return yRange;
    yRange = _;
    return chart;
  };

  chart.forceX = function(_) {
    if (!arguments.length) return forceX;
    forceX = _;
    return chart;
  };

  chart.forceY = function(_) {
    if (!arguments.length) return forceY;
    forceY = _;
    return chart;
  };

  chart.padData = function(_) {
    if (!arguments.length) return padData;
    padData = _;
    return chart;
  };

  chart.clipEdge = function(_) {
    if (!arguments.length) return clipEdge;
    clipEdge = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    return chart;
  };

  chart.id = function(_) {
    if (!arguments.length) return id;
    id = _;
    return chart;
  };

  chart.interactive = function(_) {
    if(!arguments.length) return interactive;
    interactive = false;
    return chart;
  };

  //============================================================


  return chart;
}

// Chart design based on the recommendations of Stephen Few. Implementation
// based on the work of Clint Ivy, Jamie Love, and Jason Davies.
// http://projects.instantcognition.com/protovis/bulletchart/

nv.models.bullet = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var margin = {top: 0, right: 0, bottom: 0, left: 0}
    , orient = 'left' // TODO top & bottom
    , reverse = false
    , ranges = function(d) { return d.ranges }
    , markers = function(d) { return d.markers }
    , measures = function(d) { return d.measures }
    , rangeLabels = function(d) { return d.rangeLabels ? d.rangeLabels : [] }
    , markerLabels = function(d) { return d.markerLabels ? d.markerLabels : []  }
    , measureLabels = function(d) { return d.measureLabels ? d.measureLabels : []  }
    , forceX = [0] // List of numbers to Force into the X scale (ie. 0, or a max / min, etc.)
    , width = 380
    , height = 30
    , tickFormat = null
    , color = nv.utils.getColor(['#1f77b4'])
    , dispatch = d3.dispatch('elementMouseover', 'elementMouseout')
    ;

  //============================================================


  function chart(selection) {
    selection.each(function(d, i) {
      var availableWidth = width - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom,
          container = d3.select(this);

      var rangez = ranges.call(this, d, i).slice().sort(d3.descending),
          markerz = markers.call(this, d, i).slice().sort(d3.descending),
          measurez = measures.call(this, d, i).slice().sort(d3.descending),
          rangeLabelz = rangeLabels.call(this, d, i).slice(),
          markerLabelz = markerLabels.call(this, d, i).slice(),
          measureLabelz = measureLabels.call(this, d, i).slice();


      //------------------------------------------------------------
      // Setup Scales

      // Compute the new x-scale.
      var x1 = d3.scale.linear()
          .domain( d3.extent(d3.merge([forceX, rangez])) )
          .range(reverse ? [availableWidth, 0] : [0, availableWidth]);

      // Retrieve the old x-scale, if this is an update.
      var x0 = this.__chart__ || d3.scale.linear()
          .domain([0, Infinity])
          .range(x1.range());

      // Stash the new scale.
      this.__chart__ = x1;


      var rangeMin = d3.min(rangez), //rangez[2]
          rangeMax = d3.max(rangez), //rangez[0]
          rangeAvg = rangez[1];

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-bullet').data([d]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-bullet');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g');

      gEnter.append('rect').attr('class', 'nv-range nv-rangeMax');
      gEnter.append('rect').attr('class', 'nv-range nv-rangeAvg');
      gEnter.append('rect').attr('class', 'nv-range nv-rangeMin');
      gEnter.append('rect').attr('class', 'nv-measure');
      gEnter.append('path').attr('class', 'nv-markerTriangle');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      //------------------------------------------------------------



      var w0 = function(d) { return Math.abs(x0(d) - x0(0)) }, // TODO: could optimize by precalculating x0(0) and x1(0)
          w1 = function(d) { return Math.abs(x1(d) - x1(0)) };
      var xp0 = function(d) { return d < 0 ? x0(d) : x0(0) },
          xp1 = function(d) { return d < 0 ? x1(d) : x1(0) };


      g.select('rect.nv-rangeMax')
          .attr('height', availableHeight)
          .attr('width', w1(rangeMax > 0 ? rangeMax : rangeMin))
          .attr('x', xp1(rangeMax > 0 ? rangeMax : rangeMin))
          .datum(rangeMax > 0 ? rangeMax : rangeMin)
          /*
          .attr('x', rangeMin < 0 ?
                         rangeMax > 0 ?
                             x1(rangeMin)
                           : x1(rangeMax)
                       : x1(0))
                      */

      g.select('rect.nv-rangeAvg')
          .attr('height', availableHeight)
          .attr('width', w1(rangeAvg))
          .attr('x', xp1(rangeAvg))
          .datum(rangeAvg)
          /*
          .attr('width', rangeMax <= 0 ?
                             x1(rangeMax) - x1(rangeAvg)
                           : x1(rangeAvg) - x1(rangeMin))
          .attr('x', rangeMax <= 0 ?
                         x1(rangeAvg)
                       : x1(rangeMin))
                      */

      g.select('rect.nv-rangeMin')
          .attr('height', availableHeight)
          .attr('width', w1(rangeMax))
          .attr('x', xp1(rangeMax))
          .attr('width', w1(rangeMax > 0 ? rangeMin : rangeMax))
          .attr('x', xp1(rangeMax > 0 ? rangeMin : rangeMax))
          .datum(rangeMax > 0 ? rangeMin : rangeMax)
          /*
          .attr('width', rangeMax <= 0 ?
                             x1(rangeAvg) - x1(rangeMin)
                           : x1(rangeMax) - x1(rangeAvg))
          .attr('x', rangeMax <= 0 ?
                         x1(rangeMin)
                       : x1(rangeAvg))
                      */

      g.select('rect.nv-measure')
          .style('fill', color)
          .attr('height', availableHeight / 3)
          .attr('y', availableHeight / 3)
          .attr('width', measurez < 0 ?
                             x1(0) - x1(measurez[0])
                           : x1(measurez[0]) - x1(0))
          .attr('x', xp1(measurez))
          .on('mouseover', function() {
              dispatch.elementMouseover({
                value: measurez[0],
                label: measureLabelz[0] || 'Current',
                pos: [x1(measurez[0]), availableHeight/2]
              })
          })
          .on('mouseout', function() {
              dispatch.elementMouseout({
                value: measurez[0],
                label: measureLabelz[0] || 'Current'
              })
          })

      var h3 =  availableHeight / 6;
      if (markerz[0]) {
        g.selectAll('path.nv-markerTriangle')
            .attr('transform', function(d) { return 'translate(' + x1(markerz[0]) + ',' + (availableHeight / 2) + ')' })
            .attr('d', 'M0,' + h3 + 'L' + h3 + ',' + (-h3) + ' ' + (-h3) + ',' + (-h3) + 'Z')
            .on('mouseover', function() {
              dispatch.elementMouseover({
                value: markerz[0],
                label: markerLabelz[0] || 'Previous',
                pos: [x1(markerz[0]), availableHeight/2]
              })
            })
            .on('mouseout', function() {
              dispatch.elementMouseout({
                value: markerz[0],
                label: markerLabelz[0] || 'Previous'
              })
            });
      } else {
        g.selectAll('path.nv-markerTriangle').remove();
      }


      wrap.selectAll('.nv-range')
          .on('mouseover', function(d,i) {
            var label = rangeLabelz[i] || (!i ? "Maximum" : i == 1 ? "Mean" : "Minimum");

            dispatch.elementMouseover({
              value: d,
              label: label,
              pos: [x1(d), availableHeight/2]
            })
          })
          .on('mouseout', function(d,i) {
            var label = rangeLabelz[i] || (!i ? "Maximum" : i == 1 ? "Mean" : "Minimum");

            dispatch.elementMouseout({
              value: d,
              label: label
            })
          })

/* // THIS IS THE PREVIOUS BULLET IMPLEMENTATION, WILL REMOVE SHORTLY
      // Update the range rects.
      var range = g.selectAll('rect.nv-range')
          .data(rangez);

      range.enter().append('rect')
          .attr('class', function(d, i) { return 'nv-range nv-s' + i; })
          .attr('width', w0)
          .attr('height', availableHeight)
          .attr('x', reverse ? x0 : 0)
          .on('mouseover', function(d,i) { 
              dispatch.elementMouseover({
                value: d,
                label: (i <= 0) ? 'Maximum' : (i > 1) ? 'Minimum' : 'Mean', //TODO: make these labels a variable
                pos: [x1(d), availableHeight/2]
              })
          })
          .on('mouseout', function(d,i) { 
              dispatch.elementMouseout({
                value: d,
                label: (i <= 0) ? 'Minimum' : (i >=1) ? 'Maximum' : 'Mean' //TODO: make these labels a variable
              })
          })

      d3.transition(range)
          .attr('x', reverse ? x1 : 0)
          .attr('width', w1)
          .attr('height', availableHeight);


      // Update the measure rects.
      var measure = g.selectAll('rect.nv-measure')
          .data(measurez);

      measure.enter().append('rect')
          .attr('class', function(d, i) { return 'nv-measure nv-s' + i; })
          .style('fill', function(d,i) { return color(d,i ) })
          .attr('width', w0)
          .attr('height', availableHeight / 3)
          .attr('x', reverse ? x0 : 0)
          .attr('y', availableHeight / 3)
          .on('mouseover', function(d) { 
              dispatch.elementMouseover({
                value: d,
                label: 'Current', //TODO: make these labels a variable
                pos: [x1(d), availableHeight/2]
              })
          })
          .on('mouseout', function(d) { 
              dispatch.elementMouseout({
                value: d,
                label: 'Current' //TODO: make these labels a variable
              })
          })

      d3.transition(measure)
          .attr('width', w1)
          .attr('height', availableHeight / 3)
          .attr('x', reverse ? x1 : 0)
          .attr('y', availableHeight / 3);



      // Update the marker lines.
      var marker = g.selectAll('path.nv-markerTriangle')
          .data(markerz);

      var h3 =  availableHeight / 6;
      marker.enter().append('path')
          .attr('class', 'nv-markerTriangle')
          .attr('transform', function(d) { return 'translate(' + x0(d) + ',' + (availableHeight / 2) + ')' })
          .attr('d', 'M0,' + h3 + 'L' + h3 + ',' + (-h3) + ' ' + (-h3) + ',' + (-h3) + 'Z')
          .on('mouseover', function(d,i) {
              dispatch.elementMouseover({
                value: d,
                label: 'Previous',
                pos: [x1(d), availableHeight/2]
              })
          })
          .on('mouseout', function(d,i) {
              dispatch.elementMouseout({
                value: d,
                label: 'Previous'
              })
          });

      d3.transition(marker)
          .attr('transform', function(d) { return 'translate(' + (x1(d) - x1(0)) + ',' + (availableHeight / 2) + ')' });

      marker.exit().remove();
*/

    });

    // d3.timer.flush();  // Not needed?

    return chart;
  }


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  chart.dispatch = dispatch;

  chart.options = nv.utils.optionsFunc.bind(chart);
  
  // left, right, top, bottom
  chart.orient = function(_) {
    if (!arguments.length) return orient;
    orient = _;
    reverse = orient == 'right' || orient == 'bottom';
    return chart;
  };

  // ranges (bad, satisfactory, good)
  chart.ranges = function(_) {
    if (!arguments.length) return ranges;
    ranges = _;
    return chart;
  };

  // markers (previous, goal)
  chart.markers = function(_) {
    if (!arguments.length) return markers;
    markers = _;
    return chart;
  };

  // measures (actual, forecast)
  chart.measures = function(_) {
    if (!arguments.length) return measures;
    measures = _;
    return chart;
  };

  chart.forceX = function(_) {
    if (!arguments.length) return forceX;
    forceX = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.tickFormat = function(_) {
    if (!arguments.length) return tickFormat;
    tickFormat = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    return chart;
  };

  //============================================================


  return chart;
};



// Chart design based on the recommendations of Stephen Few. Implementation
// based on the work of Clint Ivy, Jamie Love, and Jason Davies.
// http://projects.instantcognition.com/protovis/bulletchart/
nv.models.bulletChart = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var bullet = nv.models.bullet()
    ;

  var orient = 'left' // TODO top & bottom
    , reverse = false
    , margin = {top: 5, right: 40, bottom: 20, left: 120}
    , ranges = function(d) { return d.ranges }
    , markers = function(d) { return d.markers }
    , measures = function(d) { return d.measures }
    , width = null
    , height = 55
    , tickFormat = null
    , tooltips = true
    , tooltip = function(key, x, y, e, graph) {
        return '<h3>' + x + '</h3>' +
               '<p>' + y + '</p>'
      }
    , noData = 'No Data Available.'
    , dispatch = d3.dispatch('tooltipShow', 'tooltipHide')
    ;

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var showTooltip = function(e, offsetElement) {
    var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ) + margin.left,
        top = e.pos[1] + ( offsetElement.offsetTop || 0) + margin.top,
        content = tooltip(e.key, e.label, e.value, e, chart);

    nv.tooltip.show([left, top], content, e.value < 0 ? 'e' : 'w', null, offsetElement);
  };

  //============================================================


  function chart(selection) {
    selection.each(function(d, i) {
      var container = d3.select(this);

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom,
          that = this;


      chart.update = function() { chart(selection) };
      chart.container = this;

      //------------------------------------------------------------
      // Display No Data message if there's nothing to show.

      if (!d || !ranges.call(this, d, i)) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', 18 + margin.top + availableHeight / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }

      //------------------------------------------------------------



      var rangez = ranges.call(this, d, i).slice().sort(d3.descending),
          markerz = markers.call(this, d, i).slice().sort(d3.descending),
          measurez = measures.call(this, d, i).slice().sort(d3.descending);


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-bulletChart').data([d]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-bulletChart');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-bulletWrap');
      gEnter.append('g').attr('class', 'nv-titles');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      //------------------------------------------------------------


      // Compute the new x-scale.
      var x1 = d3.scale.linear()
          .domain([0, Math.max(rangez[0], markerz[0], measurez[0])])  // TODO: need to allow forceX and forceY, and xDomain, yDomain
          .range(reverse ? [availableWidth, 0] : [0, availableWidth]);

      // Retrieve the old x-scale, if this is an update.
      var x0 = this.__chart__ || d3.scale.linear()
          .domain([0, Infinity])
          .range(x1.range());

      // Stash the new scale.
      this.__chart__ = x1;

      /*
      // Derive width-scales from the x-scales.
      var w0 = bulletWidth(x0),
          w1 = bulletWidth(x1);

      function bulletWidth(x) {
        var x0 = x(0);
        return function(d) {
          return Math.abs(x(d) - x(0));
        };
      }

      function bulletTranslate(x) {
        return function(d) {
          return 'translate(' + x(d) + ',0)';
        };
      }
      */

      var w0 = function(d) { return Math.abs(x0(d) - x0(0)) }, // TODO: could optimize by precalculating x0(0) and x1(0)
          w1 = function(d) { return Math.abs(x1(d) - x1(0)) };


      var title = gEnter.select('.nv-titles').append('g')
          .attr('text-anchor', 'end')
          .attr('transform', 'translate(-6,' + (height - margin.top - margin.bottom) / 2 + ')');
      title.append('text')
          .attr('class', 'nv-title')
          .text(function(d) { return d.title; });

      title.append('text')
          .attr('class', 'nv-subtitle')
          .attr('dy', '1em')
          .text(function(d) { return d.subtitle; });



      bullet
        .width(availableWidth)
        .height(availableHeight)

      var bulletWrap = g.select('.nv-bulletWrap');

      d3.transition(bulletWrap).call(bullet);



      // Compute the tick format.
      var format = tickFormat || x1.tickFormat( availableWidth / 100 );

      // Update the tick groups.
      var tick = g.selectAll('g.nv-tick')
          .data(x1.ticks( availableWidth / 50 ), function(d) {
            return this.textContent || format(d);
          });

      // Initialize the ticks with the old scale, x0.
      var tickEnter = tick.enter().append('g')
          .attr('class', 'nv-tick')
          .attr('transform', function(d) { return 'translate(' + x0(d) + ',0)' })
          .style('opacity', 1e-6);

      tickEnter.append('line')
          .attr('y1', availableHeight)
          .attr('y2', availableHeight * 7 / 6);

      tickEnter.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '1em')
          .attr('y', availableHeight * 7 / 6)
          .text(format);


      // Transition the updating ticks to the new scale, x1.
      var tickUpdate = d3.transition(tick)
          .attr('transform', function(d) { return 'translate(' + x1(d) + ',0)' })
          .style('opacity', 1);

      tickUpdate.select('line')
          .attr('y1', availableHeight)
          .attr('y2', availableHeight * 7 / 6);

      tickUpdate.select('text')
          .attr('y', availableHeight * 7 / 6);

      // Transition the exiting ticks to the new scale, x1.
      d3.transition(tick.exit())
          .attr('transform', function(d) { return 'translate(' + x1(d) + ',0)' })
          .style('opacity', 1e-6)
          .remove();


      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------

      dispatch.on('tooltipShow', function(e) {
        e.key = d.title;
        if (tooltips) showTooltip(e, that.parentNode);
      });

      //============================================================

    });

    d3.timer.flush();

    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  bullet.dispatch.on('elementMouseover.tooltip', function(e) {
    dispatch.tooltipShow(e);
  });

  bullet.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  chart.dispatch = dispatch;
  chart.bullet = bullet;

  d3.rebind(chart, bullet, 'color');

  chart.options = nv.utils.optionsFunc.bind(chart);
  
  // left, right, top, bottom
  chart.orient = function(x) {
    if (!arguments.length) return orient;
    orient = x;
    reverse = orient == 'right' || orient == 'bottom';
    return chart;
  };

  // ranges (bad, satisfactory, good)
  chart.ranges = function(x) {
    if (!arguments.length) return ranges;
    ranges = x;
    return chart;
  };

  // markers (previous, goal)
  chart.markers = function(x) {
    if (!arguments.length) return markers;
    markers = x;
    return chart;
  };

  // measures (actual, forecast)
  chart.measures = function(x) {
    if (!arguments.length) return measures;
    measures = x;
    return chart;
  };

  chart.width = function(x) {
    if (!arguments.length) return width;
    width = x;
    return chart;
  };

  chart.height = function(x) {
    if (!arguments.length) return height;
    height = x;
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.tickFormat = function(x) {
    if (!arguments.length) return tickFormat;
    tickFormat = x;
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  //============================================================


  return chart;
};



nv.models.cumulativeLineChart = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var lines = nv.models.line()
    , xAxis = nv.models.axis()
    , yAxis = nv.models.axis()
    , legend = nv.models.legend()
    , controls = nv.models.legend()
    , interactiveLayer = nv.interactiveGuideline()
    ;

  var margin = {top: 30, right: 30, bottom: 50, left: 60}
    , color = nv.utils.defaultColor()
    , width = null
    , height = null
    , showLegend = true
    , showXAxis = true
    , showYAxis = true
    , rightAlignYAxis = false
    , tooltips = true
    , showControls = true
    , useInteractiveGuideline = false
    , rescaleY = true
    , tooltip = function(key, x, y, e, graph) {
        return '<h3>' + key + '</h3>' +
               '<p>' +  y + ' at ' + x + '</p>'
      }
    , x //can be accessed via chart.xScale()
    , y //can be accessed via chart.yScale()
    , id = lines.id()
    , state = { index: 0, rescaleY: rescaleY }
    , defaultState = null
    , noData = 'No Data Available.'
    , average = function(d) { return d.average }
    , dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'stateChange', 'changeState')
    , transitionDuration = 250
    , noErrorCheck = false  //if set to TRUE, will bypass an error check in the indexify function.
    ;

  xAxis
    .orient('bottom')
    .tickPadding(7)
    ;
  yAxis
    .orient((rightAlignYAxis) ? 'right' : 'left')
    ;

  //============================================================
  controls.updateState(false);

  //============================================================
  // Private Variables
  //------------------------------------------------------------

   var dx = d3.scale.linear()
     , index = {i: 0, x: 0}
     ;

  var showTooltip = function(e, offsetElement) {
    var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
        top = e.pos[1] + ( offsetElement.offsetTop || 0),
        x = xAxis.tickFormat()(lines.x()(e.point, e.pointIndex)),
        y = yAxis.tickFormat()(lines.y()(e.point, e.pointIndex)),
        content = tooltip(e.series.key, x, y, e, chart);

    nv.tooltip.show([left, top], content, null, null, offsetElement);
  };

  //============================================================

  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this).classed('nv-chart-' + id, true),
          that = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;


      chart.update = function() { container.transition().duration(transitionDuration).call(chart) };
      chart.container = this;

      //set state.disabled
      state.disabled = data.map(function(d) { return !!d.disabled });

      if (!defaultState) {
        var key;
        defaultState = {};
        for (key in state) {
          if (state[key] instanceof Array)
            defaultState[key] = state[key].slice(0);
          else
            defaultState[key] = state[key];
        }
      }

      var indexDrag = d3.behavior.drag()
                        .on('dragstart', dragStart)
                        .on('drag', dragMove)
                        .on('dragend', dragEnd);


      function dragStart(d,i) {
        d3.select(chart.container)
            .style('cursor', 'ew-resize');
      }

      function dragMove(d,i) {
        index.x = d3.event.x;
        index.i = Math.round(dx.invert(index.x));
        updateZero();
      }

      function dragEnd(d,i) {
        d3.select(chart.container)
            .style('cursor', 'auto');

        // update state and send stateChange with new index
        state.index = index.i;
        dispatch.stateChange(state);
      }

      //------------------------------------------------------------
      // Display No Data message if there's nothing to show.

      if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', margin.top + availableHeight / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Scales

      x = lines.xScale();
      y = lines.yScale();


      if (!rescaleY) {
        var seriesDomains = data
          .filter(function(series) { return !series.disabled })
          .map(function(series,i) {
            var initialDomain = d3.extent(series.values, lines.y());

            //account for series being disabled when losing 95% or more
            if (initialDomain[0] < -.95) initialDomain[0] = -.95;

            return [
              (initialDomain[0] - initialDomain[1]) / (1 + initialDomain[1]),
              (initialDomain[1] - initialDomain[0]) / (1 + initialDomain[0])
            ];
          });

        var completeDomain = [
          d3.min(seriesDomains, function(d) { return d[0] }),
          d3.max(seriesDomains, function(d) { return d[1] })
        ]

        lines.yDomain(completeDomain);
      } else {
        lines.yDomain(null);
      }


      dx  .domain([0, data[0].values.length - 1]) //Assumes all series have same length
          .range([0, availableWidth])
          .clamp(true);

      //------------------------------------------------------------


      var data = indexify(index.i, data);


      //------------------------------------------------------------
      // Setup containers and skeleton of chart
      var interactivePointerEvents = (useInteractiveGuideline) ? "none" : "all";
      var wrap = container.selectAll('g.nv-wrap.nv-cumulativeLine').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-cumulativeLine').append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-interactive');
      gEnter.append('g').attr('class', 'nv-x nv-axis').style("pointer-events","none");
      gEnter.append('g').attr('class', 'nv-y nv-axis');
      gEnter.append('g').attr('class', 'nv-background');
      gEnter.append('g').attr('class', 'nv-linesWrap').style("pointer-events",interactivePointerEvents);
      gEnter.append('g').attr('class', 'nv-avgLinesWrap').style("pointer-events","none");
      gEnter.append('g').attr('class', 'nv-legendWrap');
      gEnter.append('g').attr('class', 'nv-controlsWrap');


      //------------------------------------------------------------
      // Legend

      if (showLegend) {
        legend.width(availableWidth);

        g.select('.nv-legendWrap')
            .datum(data)
            .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;
        }

        g.select('.nv-legendWrap')
            .attr('transform', 'translate(0,' + (-margin.top) +')')
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Controls

      if (showControls) {
        var controlsData = [
          { key: 'Re-scale y-axis', disabled: !rescaleY }
        ];

        controls
            .width(140)
            .color(['#444', '#444', '#444'])
            .rightAlign(false)
            .margin({top: 5, right: 0, bottom: 5, left: 20})
            ;

        g.select('.nv-controlsWrap')
            .datum(controlsData)
            .attr('transform', 'translate(0,' + (-margin.top) +')')
            .call(controls);
      }

      //------------------------------------------------------------


      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      if (rightAlignYAxis) {
          g.select(".nv-y.nv-axis")
              .attr("transform", "translate(" + availableWidth + ",0)");
      }

      // Show error if series goes below 100%
      var tempDisabled = data.filter(function(d) { return d.tempDisabled });

      wrap.select('.tempDisabled').remove(); //clean-up and prevent duplicates
      if (tempDisabled.length) {
        wrap.append('text').attr('class', 'tempDisabled')
            .attr('x', availableWidth / 2)
            .attr('y', '-.71em')
            .style('text-anchor', 'end')
            .text(tempDisabled.map(function(d) { return d.key }).join(', ') + ' values cannot be calculated for this time period.');
      }

      //------------------------------------------------------------
      // Main Chart Component(s)

      //------------------------------------------------------------
      //Set up interactive layer
      if (useInteractiveGuideline) {
        interactiveLayer
          .width(availableWidth)
          .height(availableHeight)
          .margin({left:margin.left,top:margin.top})
          .svgContainer(container)
          .xScale(x);
        wrap.select(".nv-interactive").call(interactiveLayer);
      }

      gEnter.select('.nv-background')
        .append('rect');

      g.select('.nv-background rect')
          .attr('width', availableWidth)
          .attr('height', availableHeight);

      lines
        //.x(function(d) { return d.x })
        .y(function(d) { return d.display.y })
        .width(availableWidth)
        .height(availableHeight)
        .color(data.map(function(d,i) {
          return d.color || color(d, i);
        }).filter(function(d,i) { return !data[i].disabled && !data[i].tempDisabled; }));



      var linesWrap = g.select('.nv-linesWrap')
          .datum(data.filter(function(d) { return  !d.disabled && !d.tempDisabled }));

      //d3.transition(linesWrap).call(lines);
      linesWrap.call(lines);

      /*Handle average lines [AN-612] ----------------------------*/

      //Store a series index number in the data array.
      data.forEach(function(d,i) {
            d.seriesIndex = i;
      });

      var avgLineData = data.filter(function(d) {
          return !d.disabled && !!average(d);
      });

      var avgLines = g.select(".nv-avgLinesWrap").selectAll("line")
              .data(avgLineData, function(d) { return d.key; });

      var getAvgLineY = function(d) {
          //If average lines go off the svg element, clamp them to the svg bounds.
          var yVal = y(average(d));
          if (yVal < 0) return 0;
          if (yVal > availableHeight) return availableHeight;
          return yVal;
      };

      avgLines.enter()
              .append('line')
              .style('stroke-width',2)
              .style('stroke-dasharray','10,10')
              .style('stroke',function (d,i) {
                  return lines.color()(d,d.seriesIndex);
              })
              .attr('x1',0)
              .attr('x2',availableWidth)
              .attr('y1', getAvgLineY)
              .attr('y2', getAvgLineY);

      avgLines
              .style('stroke-opacity',function(d){
                  //If average lines go offscreen, make them transparent
                  var yVal = y(average(d));
                  if (yVal < 0 || yVal > availableHeight) return 0;
                  return 1;
              })
              .attr('x1',0)
              .attr('x2',availableWidth)
              .attr('y1', getAvgLineY)
              .attr('y2', getAvgLineY);

      avgLines.exit().remove();

      //Create index line -----------------------------------------

      var indexLine = linesWrap.selectAll('.nv-indexLine')
          .data([index]);
      indexLine.enter().append('rect').attr('class', 'nv-indexLine')
          .attr('width', 3)
          .attr('x', -2)
          .attr('fill', 'red')
          .attr('fill-opacity', .5)
          .style("pointer-events","all")
          .call(indexDrag)

      indexLine
          .attr('transform', function(d) { return 'translate(' + dx(d.i) + ',0)' })
          .attr('height', availableHeight)

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Axes

      if (showXAxis) {
        xAxis
          .scale(x)
          //Suggest how many ticks based on the chart width and D3 should listen (70 is the optimal number for MM/DD/YY dates)
          .ticks( Math.min(data[0].values.length,availableWidth/70) )
          .tickSize(-availableHeight, 0);

        g.select('.nv-x.nv-axis')
            .attr('transform', 'translate(0,' + y.range()[0] + ')');
        d3.transition(g.select('.nv-x.nv-axis'))
            .call(xAxis);
      }


      if (showYAxis) {
        yAxis
          .scale(y)
          .ticks( availableHeight / 36 )
          .tickSize( -availableWidth, 0);

        d3.transition(g.select('.nv-y.nv-axis'))
            .call(yAxis);
      }
      //------------------------------------------------------------


      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------


      function updateZero() {
        indexLine
          .data([index]);

        //When dragging the index line, turn off line transitions.
        // Then turn them back on when done dragging.
        var oldDuration = chart.transitionDuration();
        chart.transitionDuration(0);
        chart.update();
        chart.transitionDuration(oldDuration);
      }

      g.select('.nv-background rect')
          .on('click', function() {
            index.x = d3.mouse(this)[0];
            index.i = Math.round(dx.invert(index.x));

            // update state and send stateChange with new index
            state.index = index.i;
            dispatch.stateChange(state);

            updateZero();
          });

      lines.dispatch.on('elementClick', function(e) {
        index.i = e.pointIndex;
        index.x = dx(index.i);

        // update state and send stateChange with new index
        state.index = index.i;
        dispatch.stateChange(state);

        updateZero();
      });

      controls.dispatch.on('legendClick', function(d,i) {
        d.disabled = !d.disabled;
        rescaleY = !d.disabled;

        state.rescaleY = rescaleY;
        dispatch.stateChange(state);
        chart.update();
      });


      legend.dispatch.on('stateChange', function(newState) {
        state.disabled = newState.disabled;
        dispatch.stateChange(state);
        chart.update();
      });

      interactiveLayer.dispatch.on('elementMousemove', function(e) {
          lines.clearHighlights();
          var singlePoint, pointIndex, pointXLocation, allData = [];


          data
          .filter(function(series, i) {
            series.seriesIndex = i;
            return !series.disabled;
          })
          .forEach(function(series,i) {
              pointIndex = nv.interactiveBisect(series.values, e.pointXValue, chart.x());
              lines.highlightPoint(i, pointIndex, true);
              var point = series.values[pointIndex];
              if (typeof point === 'undefined') return;
              if (typeof singlePoint === 'undefined') singlePoint = point;
              if (typeof pointXLocation === 'undefined') pointXLocation = chart.xScale()(chart.x()(point,pointIndex));
              allData.push({
                  key: series.key,
                  value: chart.y()(point, pointIndex),
                  color: color(series,series.seriesIndex)
              });
          });

          //Highlight the tooltip entry based on which point the mouse is closest to.
          if (allData.length > 2) {
            var yValue = chart.yScale().invert(e.mouseY);
            var domainExtent = Math.abs(chart.yScale().domain()[0] - chart.yScale().domain()[1]);
            var threshold = 0.03 * domainExtent;
            var indexToHighlight = nv.nearestValueIndex(allData.map(function(d){return d.value}),yValue,threshold);
            if (indexToHighlight !== null)
              allData[indexToHighlight].highlight = true;
          }

          var xValue = xAxis.tickFormat()(chart.x()(singlePoint,pointIndex), pointIndex);
          interactiveLayer.tooltip
                  .position({left: pointXLocation + margin.left, top: e.mouseY + margin.top})
                  .chartContainer(that.parentNode)
                  .enabled(tooltips)
                  .valueFormatter(function(d,i) {
                     return yAxis.tickFormat()(d);
                  })
                  .data(
                      {
                        value: xValue,
                        series: allData
                      }
                  )();

          interactiveLayer.renderGuideLine(pointXLocation);

      });

      interactiveLayer.dispatch.on("elementMouseout",function(e) {
          dispatch.tooltipHide();
          lines.clearHighlights();
      });

      dispatch.on('tooltipShow', function(e) {
        if (tooltips) showTooltip(e, that.parentNode);
      });


      // Update chart from a state object passed to event handler
      dispatch.on('changeState', function(e) {

        if (typeof e.disabled !== 'undefined') {
          data.forEach(function(series,i) {
            series.disabled = e.disabled[i];
          });

          state.disabled = e.disabled;
        }


        if (typeof e.index !== 'undefined') {
          index.i = e.index;
          index.x = dx(index.i);

          state.index = e.index;

          indexLine
            .data([index]);
        }


        if (typeof e.rescaleY !== 'undefined') {
          rescaleY = e.rescaleY;
        }

        chart.update();
      });

      //============================================================

    });

    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  lines.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  lines.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.dispatch = dispatch;
  chart.lines = lines;
  chart.legend = legend;
  chart.xAxis = xAxis;
  chart.yAxis = yAxis;
  chart.interactiveLayer = interactiveLayer;

  d3.rebind(chart, lines, 'defined', 'isArea', 'x', 'y', 'xScale','yScale', 'size', 'xDomain', 'yDomain', 'xRange', 'yRange', 'forceX', 'forceY', 'interactive', 'clipEdge', 'clipVoronoi','useVoronoi',  'id');

  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    legend.color(color);
    return chart;
  };

  chart.rescaleY = function(_) {
    if (!arguments.length) return rescaleY;
    rescaleY = _;
    return chart;
  };

  chart.showControls = function(_) {
    if (!arguments.length) return showControls;
    showControls = _;
    return chart;
  };

  chart.useInteractiveGuideline = function(_) {
    if(!arguments.length) return useInteractiveGuideline;
    useInteractiveGuideline = _;
    if (_ === true) {
       chart.interactive(false);
       chart.useVoronoi(false);
    }
    return chart;
  };

  chart.showLegend = function(_) {
    if (!arguments.length) return showLegend;
    showLegend = _;
    return chart;
  };

  chart.showXAxis = function(_) {
    if (!arguments.length) return showXAxis;
    showXAxis = _;
    return chart;
  };

  chart.showYAxis = function(_) {
    if (!arguments.length) return showYAxis;
    showYAxis = _;
    return chart;
  };

  chart.rightAlignYAxis = function(_) {
    if(!arguments.length) return rightAlignYAxis;
    rightAlignYAxis = _;
    yAxis.orient( (_) ? 'right' : 'left');
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.state = function(_) {
    if (!arguments.length) return state;
    state = _;
    return chart;
  };

  chart.defaultState = function(_) {
    if (!arguments.length) return defaultState;
    defaultState = _;
    return chart;
  };

  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  chart.average = function(_) {
     if(!arguments.length) return average;
     average = _;
     return chart;
  };

  chart.transitionDuration = function(_) {
    if (!arguments.length) return transitionDuration;
    transitionDuration = _;
    return chart;
  };

  chart.noErrorCheck = function(_) {
    if (!arguments.length) return noErrorCheck;
    noErrorCheck = _;
    return chart;
  };

  //============================================================


  //============================================================
  // Functions
  //------------------------------------------------------------

  /* Normalize the data according to an index point. */
  function indexify(idx, data) {
    return data.map(function(line, i) {
      if (!line.values) {
         return line;
      }
      var indexValue = line.values[idx];
      if (indexValue == null) {
        return line;
      }
      var v = lines.y()(indexValue, idx);

      //TODO: implement check below, and disable series if series loses 100% or more cause divide by 0 issue
      if (v < -.95 && !noErrorCheck) {
        //if a series loses more than 100%, calculations fail.. anything close can cause major distortion (but is mathematically correct till it hits 100)

        line.tempDisabled = true;
        return line;
      }

      line.tempDisabled = false;

      line.values = line.values.map(function(point, pointIndex) {
        point.display = {'y': (lines.y()(point, pointIndex) - v) / (1 + v) };
        return point;
      })

      return line;
    })
  }

  //============================================================


  return chart;
}
//TODO: consider deprecating by adding necessary features to multiBar model
nv.models.discreteBar = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var margin = {top: 0, right: 0, bottom: 0, left: 0}
    , width = 960
    , height = 500
    , id = Math.floor(Math.random() * 10000) //Create semi-unique ID in case user doesn't select one
    , x = d3.scale.ordinal()
    , y = d3.scale.linear()
    , getX = function(d) { return d.x }
    , getY = function(d) { return d.y }
    , forceY = [0] // 0 is forced by default.. this makes sense for the majority of bar graphs... user can always do chart.forceY([]) to remove
    , color = nv.utils.defaultColor()
    , showValues = false
    , valueFormat = d3.format(',.2f')
    , xDomain
    , yDomain
    , xRange
    , yRange
    , dispatch = d3.dispatch('chartClick', 'elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout')
    , rectClass = 'discreteBar'
    ;

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var x0, y0;

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var availableWidth = width - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom,
          container = d3.select(this);


      //add series index to each data point for reference
      data.forEach(function(series, i) {
        series.values.forEach(function(point) {
          point.series = i;
        });
      });


      //------------------------------------------------------------
      // Setup Scales

      // remap and flatten the data for use in calculating the scales' domains
      var seriesData = (xDomain && yDomain) ? [] : // if we know xDomain and yDomain, no need to calculate
            data.map(function(d) {
              return d.values.map(function(d,i) {
                return { x: getX(d,i), y: getY(d,i), y0: d.y0 }
              })
            });

      x   .domain(xDomain || d3.merge(seriesData).map(function(d) { return d.x }))
          .rangeBands(xRange || [0, availableWidth], .1);

      y   .domain(yDomain || d3.extent(d3.merge(seriesData).map(function(d) { return d.y }).concat(forceY)));


      // If showValues, pad the Y axis range to account for label height
      if (showValues) y.range(yRange || [availableHeight - (y.domain()[0] < 0 ? 12 : 0), y.domain()[1] > 0 ? 12 : 0]);
      else y.range(yRange || [availableHeight, 0]);

      //store old scales if they exist
      x0 = x0 || x;
      y0 = y0 || y.copy().range([y(0),y(0)]);

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-discretebar').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-discretebar');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-groups');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      //------------------------------------------------------------



      //TODO: by definition, the discrete bar should not have multiple groups, will modify/remove later
      var groups = wrap.select('.nv-groups').selectAll('.nv-group')
          .data(function(d) { return d }, function(d) { return d.key });
      groups.enter().append('g')
          .style('stroke-opacity', 1e-6)
          .style('fill-opacity', 1e-6);
      groups.exit()
          .transition()
          .style('stroke-opacity', 1e-6)
          .style('fill-opacity', 1e-6)
          .remove();
      groups
          .attr('class', function(d,i) { return 'nv-group nv-series-' + i })
          .classed('hover', function(d) { return d.hover });
      groups
          .transition()
          .style('stroke-opacity', 1)
          .style('fill-opacity', .75);


      var bars = groups.selectAll('g.nv-bar')
          .data(function(d) { return d.values });

      bars.exit().remove();


      var barsEnter = bars.enter().append('g')
          .attr('transform', function(d,i,j) {
              return 'translate(' + (x(getX(d,i)) + x.rangeBand() * .05 ) + ', ' + y(0) + ')'
          })
          .on('mouseover', function(d,i) { //TODO: figure out why j works above, but not here
            d3.select(this).classed('hover', true);
            dispatch.elementMouseover({
              value: getY(d,i),
              point: d,
              series: data[d.series],
              pos: [x(getX(d,i)) + (x.rangeBand() * (d.series + .5) / data.length), y(getY(d,i))],  // TODO: Figure out why the value appears to be shifted
              pointIndex: i,
              seriesIndex: d.series,
              e: d3.event
            });
          })
          .on('mouseout', function(d,i) {
            d3.select(this).classed('hover', false);
            dispatch.elementMouseout({
              value: getY(d,i),
              point: d,
              series: data[d.series],
              pointIndex: i,
              seriesIndex: d.series,
              e: d3.event
            });
          })
          .on('click', function(d,i) {
            dispatch.elementClick({
              value: getY(d,i),
              point: d,
              series: data[d.series],
              pos: [x(getX(d,i)) + (x.rangeBand() * (d.series + .5) / data.length), y(getY(d,i))],  // TODO: Figure out why the value appears to be shifted
              pointIndex: i,
              seriesIndex: d.series,
              e: d3.event
            });
            d3.event.stopPropagation();
          })
          .on('dblclick', function(d,i) {
            dispatch.elementDblClick({
              value: getY(d,i),
              point: d,
              series: data[d.series],
              pos: [x(getX(d,i)) + (x.rangeBand() * (d.series + .5) / data.length), y(getY(d,i))],  // TODO: Figure out why the value appears to be shifted
              pointIndex: i,
              seriesIndex: d.series,
              e: d3.event
            });
            d3.event.stopPropagation();
          });

      barsEnter.append('rect')
          .attr('height', 0)
          .attr('width', x.rangeBand() * .9 / data.length )

      if (showValues) {
        barsEnter.append('text')
          .attr('text-anchor', 'middle')
          ;

        bars.select('text')
          .text(function(d,i) { return valueFormat(getY(d,i)) })
          .transition()
          .attr('x', x.rangeBand() * .9 / 2)
          .attr('y', function(d,i) { return getY(d,i) < 0 ? y(getY(d,i)) - y(0) + 12 : -4 })

          ;
      } else {
        bars.selectAll('text').remove();
      }

      bars
          .attr('class', function(d,i) { return getY(d,i) < 0 ? 'nv-bar negative' : 'nv-bar positive' })
          .style('fill', function(d,i) { return d.color || color(d,i) })
          .style('stroke', function(d,i) { return d.color || color(d,i) })
        .select('rect')
          .attr('class', rectClass)
          .transition()
          .attr('width', x.rangeBand() * .9 / data.length);
      bars.transition()
        //.delay(function(d,i) { return i * 1200 / data[0].values.length })
          .attr('transform', function(d,i) {
            var left = x(getX(d,i)) + x.rangeBand() * .05,
                top = getY(d,i) < 0 ?
                        y(0) :
                        y(0) - y(getY(d,i)) < 1 ?
                          y(0) - 1 : //make 1 px positive bars show up above y=0
                          y(getY(d,i));

              return 'translate(' + left + ', ' + top + ')'
          })
        .select('rect')
          .attr('height', function(d,i) {
            return  Math.max(Math.abs(y(getY(d,i)) - y((yDomain && yDomain[0]) || 0)) || 1)
          });


      //store old scales for use in transitions on update
      x0 = x.copy();
      y0 = y.copy();

    });

    return chart;
  }


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  chart.dispatch = dispatch;

  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.x = function(_) {
    if (!arguments.length) return getX;
    getX = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return getY;
    getY = _;
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.xScale = function(_) {
    if (!arguments.length) return x;
    x = _;
    return chart;
  };

  chart.yScale = function(_) {
    if (!arguments.length) return y;
    y = _;
    return chart;
  };

  chart.xDomain = function(_) {
    if (!arguments.length) return xDomain;
    xDomain = _;
    return chart;
  };

  chart.yDomain = function(_) {
    if (!arguments.length) return yDomain;
    yDomain = _;
    return chart;
  };

  chart.xRange = function(_) {
    if (!arguments.length) return xRange;
    xRange = _;
    return chart;
  };

  chart.yRange = function(_) {
    if (!arguments.length) return yRange;
    yRange = _;
    return chart;
  };

  chart.forceY = function(_) {
    if (!arguments.length) return forceY;
    forceY = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    return chart;
  };

  chart.id = function(_) {
    if (!arguments.length) return id;
    id = _;
    return chart;
  };

  chart.showValues = function(_) {
    if (!arguments.length) return showValues;
    showValues = _;
    return chart;
  };

  chart.valueFormat= function(_) {
    if (!arguments.length) return valueFormat;
    valueFormat = _;
    return chart;
  };

  chart.rectClass= function(_) {
    if (!arguments.length) return rectClass;
    rectClass = _;
    return chart;
  };
  //============================================================


  return chart;
}

nv.models.discreteBarChart = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var discretebar = nv.models.discreteBar()
    , xAxis = nv.models.axis()
    , yAxis = nv.models.axis()
    ;

  var margin = {top: 15, right: 10, bottom: 50, left: 60}
    , width = null
    , height = null
    , color = nv.utils.getColor()
    , showXAxis = true
    , showYAxis = true
    , rightAlignYAxis = false
    , staggerLabels = false
    , tooltips = true
    , tooltip = function(key, x, y, e, graph) {
        return '<h3>' + x + '</h3>' +
               '<p>' +  y + '</p>'
      }
    , x
    , y
    , noData = "No Data Available."
    , dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'beforeUpdate')
    , transitionDuration = 250
    ;

  xAxis
    .orient('bottom')
    .highlightZero(false)
    .showMaxMin(false)
    .tickFormat(function(d) { return d })
    ;
  yAxis
    .orient((rightAlignYAxis) ? 'right' : 'left')
    .tickFormat(d3.format(',.1f'))
    ;

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var showTooltip = function(e, offsetElement) {
    var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
        top = e.pos[1] + ( offsetElement.offsetTop || 0),
        x = xAxis.tickFormat()(discretebar.x()(e.point, e.pointIndex)),
        y = yAxis.tickFormat()(discretebar.y()(e.point, e.pointIndex)),
        content = tooltip(e.series.key, x, y, e, chart);

    nv.tooltip.show([left, top], content, e.value < 0 ? 'n' : 's', null, offsetElement);
  };

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this),
          that = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;


      chart.update = function() { 
        dispatch.beforeUpdate(); 
        container.transition().duration(transitionDuration).call(chart); 
      };
      chart.container = this;


      //------------------------------------------------------------
      // Display No Data message if there's nothing to show.

      if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', margin.top + availableHeight / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Scales

      x = discretebar.xScale();
      y = discretebar.yScale().clamp(true);

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-discreteBarWithAxes').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-discreteBarWithAxes').append('g');
      var defsEnter = gEnter.append('defs');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-x nv-axis');
      gEnter.append('g').attr('class', 'nv-y nv-axis')
            .append('g').attr('class', 'nv-zeroLine')
            .append('line');
        
      gEnter.append('g').attr('class', 'nv-barsWrap');

      g.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      if (rightAlignYAxis) {
          g.select(".nv-y.nv-axis")
              .attr("transform", "translate(" + availableWidth + ",0)");
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Main Chart Component(s)

      discretebar
        .width(availableWidth)
        .height(availableHeight);


      var barsWrap = g.select('.nv-barsWrap')
          .datum(data.filter(function(d) { return !d.disabled }))

      barsWrap.transition().call(discretebar);

      //------------------------------------------------------------



      defsEnter.append('clipPath')
          .attr('id', 'nv-x-label-clip-' + discretebar.id())
        .append('rect');

      g.select('#nv-x-label-clip-' + discretebar.id() + ' rect')
          .attr('width', x.rangeBand() * (staggerLabels ? 2 : 1))
          .attr('height', 16)
          .attr('x', -x.rangeBand() / (staggerLabels ? 1 : 2 ));


      //------------------------------------------------------------
      // Setup Axes

      if (showXAxis) {
          xAxis
            .scale(x)
            .ticks( availableWidth / 100 )
            .tickSize(-availableHeight, 0);

          g.select('.nv-x.nv-axis')
              .attr('transform', 'translate(0,' + (y.range()[0] + ((discretebar.showValues() && y.domain()[0] < 0) ? 16 : 0)) + ')');
          //d3.transition(g.select('.nv-x.nv-axis'))
          g.select('.nv-x.nv-axis').transition()
              .call(xAxis);


          var xTicks = g.select('.nv-x.nv-axis').selectAll('g');

          if (staggerLabels) {
            xTicks
                .selectAll('text')
                .attr('transform', function(d,i,j) { return 'translate(0,' + (j % 2 == 0 ? '5' : '17') + ')' })
          }
      }

      if (showYAxis) {
          yAxis
            .scale(y)
            .ticks( availableHeight / 36 )
            .tickSize( -availableWidth, 0);

          g.select('.nv-y.nv-axis').transition()
              .call(yAxis);
      }

      // Zero line
      g.select(".nv-zeroLine line")
        .attr("x1",0)
        .attr("x2",availableWidth)
        .attr("y1", y(0))
        .attr("y2", y(0))
        ;

      //------------------------------------------------------------


      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------

      dispatch.on('tooltipShow', function(e) {
        if (tooltips) showTooltip(e, that.parentNode);
      });

      //============================================================


    });

    return chart;
  }

  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  discretebar.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  discretebar.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.dispatch = dispatch;
  chart.discretebar = discretebar;
  chart.xAxis = xAxis;
  chart.yAxis = yAxis;

  d3.rebind(chart, discretebar, 'x', 'y', 'xDomain', 'yDomain', 'xRange', 'yRange', 'forceX', 'forceY', 'id', 'showValues', 'valueFormat');

  chart.options = nv.utils.optionsFunc.bind(chart);
  
  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    discretebar.color(color);
    return chart;
  };

  chart.showXAxis = function(_) {
    if (!arguments.length) return showXAxis;
    showXAxis = _;
    return chart;
  };

  chart.showYAxis = function(_) {
    if (!arguments.length) return showYAxis;
    showYAxis = _;
    return chart;
  };

  chart.rightAlignYAxis = function(_) {
    if(!arguments.length) return rightAlignYAxis;
    rightAlignYAxis = _;
    yAxis.orient( (_) ? 'right' : 'left');
    return chart;
  };

  chart.staggerLabels = function(_) {
    if (!arguments.length) return staggerLabels;
    staggerLabels = _;
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  chart.transitionDuration = function(_) {
    if (!arguments.length) return transitionDuration;
    transitionDuration = _;
    return chart;
  };

  //============================================================


  return chart;
}

nv.models.distribution = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var margin = {top: 0, right: 0, bottom: 0, left: 0}
    , width = 400 //technically width or height depending on x or y....
    , size = 8
    , axis = 'x' // 'x' or 'y'... horizontal or vertical
    , getData = function(d) { return d[axis] }  // defaults d.x or d.y
    , color = nv.utils.defaultColor()
    , scale = d3.scale.linear()
    , domain
    ;

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var scale0;

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var availableLength = width - (axis === 'x' ? margin.left + margin.right : margin.top + margin.bottom),
          naxis = axis == 'x' ? 'y' : 'x',
          container = d3.select(this);


      //------------------------------------------------------------
      // Setup Scales

      scale0 = scale0 || scale;

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-distribution').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-distribution');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      //------------------------------------------------------------


      var distWrap = g.selectAll('g.nv-dist')
          .data(function(d) { return d }, function(d) { return d.key });

      distWrap.enter().append('g');
      distWrap
          .attr('class', function(d,i) { return 'nv-dist nv-series-' + i })
          .style('stroke', function(d,i) { return color(d, i) });

      var dist = distWrap.selectAll('line.nv-dist' + axis)
          .data(function(d) { return d.values })
      dist.enter().append('line')
          .attr(axis + '1', function(d,i) { return scale0(getData(d,i)) })
          .attr(axis + '2', function(d,i) { return scale0(getData(d,i)) })
      distWrap.exit().selectAll('line.nv-dist' + axis)
          .transition()
          .attr(axis + '1', function(d,i) { return scale(getData(d,i)) })
          .attr(axis + '2', function(d,i) { return scale(getData(d,i)) })
          .style('stroke-opacity', 0)
          .remove();
      dist
          .attr('class', function(d,i) { return 'nv-dist' + axis + ' nv-dist' + axis + '-' + i })
          .attr(naxis + '1', 0)
          .attr(naxis + '2', size);
      dist
          .transition()
          .attr(axis + '1', function(d,i) { return scale(getData(d,i)) })
          .attr(axis + '2', function(d,i) { return scale(getData(d,i)) })


      scale0 = scale.copy();

    });

    return chart;
  }


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------
  chart.options = nv.utils.optionsFunc.bind(chart);
  
  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.axis = function(_) {
    if (!arguments.length) return axis;
    axis = _;
    return chart;
  };

  chart.size = function(_) {
    if (!arguments.length) return size;
    size = _;
    return chart;
  };

  chart.getData = function(_) {
    if (!arguments.length) return getData;
    getData = d3.functor(_);
    return chart;
  };

  chart.scale = function(_) {
    if (!arguments.length) return scale;
    scale = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    return chart;
  };
  //============================================================


  return chart;
}

nv.models.historicalBarChart = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var bars = nv.models.historicalBar()
    , xAxis = nv.models.axis()
    , yAxis = nv.models.axis()
    , legend = nv.models.legend()
    ;


  var margin = {top: 30, right: 90, bottom: 50, left: 90}
    , color = nv.utils.defaultColor()
    , width = null
    , height = null
    , showLegend = false
    , showXAxis = true
    , showYAxis = true
    , rightAlignYAxis = false
    , tooltips = true
    , tooltip = function(key, x, y, e, graph) {
        return '<h3>' + key + '</h3>' +
               '<p>' +  y + ' at ' + x + '</p>'
      }
    , x
    , y
    , state = {}
    , defaultState = null
    , noData = 'No Data Available.'
    , dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'stateChange', 'changeState')
    , transitionDuration = 250
    ;

  xAxis
    .orient('bottom')
    .tickPadding(7)
    ;
  yAxis
    .orient( (rightAlignYAxis) ? 'right' : 'left')
    ;

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var showTooltip = function(e, offsetElement) {

    // New addition to calculate position if SVG is scaled with viewBox, may move TODO: consider implementing everywhere else
    if (offsetElement) {
      var svg = d3.select(offsetElement).select('svg');
      var viewBox = (svg.node()) ? svg.attr('viewBox') : null;
      if (viewBox) {
        viewBox = viewBox.split(' ');
        var ratio = parseInt(svg.style('width')) / viewBox[2];
        e.pos[0] = e.pos[0] * ratio;
        e.pos[1] = e.pos[1] * ratio;
      }
    }

    var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
        top = e.pos[1] + ( offsetElement.offsetTop || 0),
        x = xAxis.tickFormat()(bars.x()(e.point, e.pointIndex)),
        y = yAxis.tickFormat()(bars.y()(e.point, e.pointIndex)),
        content = tooltip(e.series.key, x, y, e, chart);

    nv.tooltip.show([left, top], content, null, null, offsetElement);
  };

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this),
          that = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;


      chart.update = function() { container.transition().duration(transitionDuration).call(chart) };
      chart.container = this;

      //set state.disabled
      state.disabled = data.map(function(d) { return !!d.disabled });

      if (!defaultState) {
        var key;
        defaultState = {};
        for (key in state) {
          if (state[key] instanceof Array)
            defaultState[key] = state[key].slice(0);
          else
            defaultState[key] = state[key];
        }
      }

      //------------------------------------------------------------
      // Display noData message if there's nothing to show.

      if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', margin.top + availableHeight / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Scales

      x = bars.xScale();
      y = bars.yScale();

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-historicalBarChart').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-historicalBarChart').append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-x nv-axis');
      gEnter.append('g').attr('class', 'nv-y nv-axis');
      gEnter.append('g').attr('class', 'nv-barsWrap');
      gEnter.append('g').attr('class', 'nv-legendWrap');

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Legend

      if (showLegend) {
        legend.width(availableWidth);

        g.select('.nv-legendWrap')
            .datum(data)
            .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;
        }

        wrap.select('.nv-legendWrap')
            .attr('transform', 'translate(0,' + (-margin.top) +')')
      }

      //------------------------------------------------------------

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      if (rightAlignYAxis) {
        g.select(".nv-y.nv-axis")
            .attr("transform", "translate(" + availableWidth + ",0)");
      }


      //------------------------------------------------------------
      // Main Chart Component(s)

      bars
        .width(availableWidth)
        .height(availableHeight)
        .color(data.map(function(d,i) {
          return d.color || color(d, i);
        }).filter(function(d,i) { return !data[i].disabled }));


      var barsWrap = g.select('.nv-barsWrap')
          .datum(data.filter(function(d) { return !d.disabled }))

      barsWrap.transition().call(bars);

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Axes

      if (showXAxis) {
        xAxis
          .scale(x)
          .tickSize(-availableHeight, 0);

        g.select('.nv-x.nv-axis')
            .attr('transform', 'translate(0,' + y.range()[0] + ')');
        g.select('.nv-x.nv-axis')
            .transition()
            .call(xAxis);
      }

      if (showYAxis) {
        yAxis
          .scale(y)
          .ticks( availableHeight / 36 )
          .tickSize( -availableWidth, 0);

        g.select('.nv-y.nv-axis')
          .transition()
            .call(yAxis);
      }
      //------------------------------------------------------------


      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------

      legend.dispatch.on('legendClick', function(d,i) {
        d.disabled = !d.disabled;

        if (!data.filter(function(d) { return !d.disabled }).length) {
          data.map(function(d) {
            d.disabled = false;
            wrap.selectAll('.nv-series').classed('disabled', false);
            return d;
          });
        }

        state.disabled = data.map(function(d) { return !!d.disabled });
        dispatch.stateChange(state);

        selection.transition().call(chart);
      });

      legend.dispatch.on('legendDblclick', function(d) {
          //Double clicking should always enable current series, and disabled all others.
          data.forEach(function(d) {
             d.disabled = true;
          });
          d.disabled = false;

          state.disabled = data.map(function(d) { return !!d.disabled });
          dispatch.stateChange(state);
          chart.update();
      });

      dispatch.on('tooltipShow', function(e) {
        if (tooltips) showTooltip(e, that.parentNode);
      });


      dispatch.on('changeState', function(e) {

        if (typeof e.disabled !== 'undefined') {
          data.forEach(function(series,i) {
            series.disabled = e.disabled[i];
          });

          state.disabled = e.disabled;
        }

        chart.update();
      });

      //============================================================

    });

    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  bars.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  bars.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.dispatch = dispatch;
  chart.bars = bars;
  chart.legend = legend;
  chart.xAxis = xAxis;
  chart.yAxis = yAxis;

  d3.rebind(chart, bars, 'defined', 'isArea', 'x', 'y', 'size', 'xScale', 'yScale',
    'xDomain', 'yDomain', 'xRange', 'yRange', 'forceX', 'forceY', 'interactive', 'clipEdge', 'clipVoronoi', 'id', 'interpolate','highlightPoint','clearHighlights', 'interactive');

  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    legend.color(color);
    return chart;
  };

  chart.showLegend = function(_) {
    if (!arguments.length) return showLegend;
    showLegend = _;
    return chart;
  };

  chart.showXAxis = function(_) {
    if (!arguments.length) return showXAxis;
    showXAxis = _;
    return chart;
  };

  chart.showYAxis = function(_) {
    if (!arguments.length) return showYAxis;
    showYAxis = _;
    return chart;
  };

  chart.rightAlignYAxis = function(_) {
    if(!arguments.length) return rightAlignYAxis;
    rightAlignYAxis = _;
    yAxis.orient( (_) ? 'right' : 'left');
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.state = function(_) {
    if (!arguments.length) return state;
    state = _;
    return chart;
  };

  chart.defaultState = function(_) {
    if (!arguments.length) return defaultState;
    defaultState = _;
    return chart;
  };

  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  chart.transitionDuration = function(_) {
    if (!arguments.length) return transitionDuration;
    transitionDuration = _;
    return chart;
  };

  //============================================================


  return chart;
}
nv.models.indentedTree = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var margin = {top: 0, right: 0, bottom: 0, left: 0} //TODO: implement, maybe as margin on the containing div
    , width = 960
    , height = 500
    , color = nv.utils.defaultColor()
    , id = Math.floor(Math.random() * 10000)
    , header = true
    , filterZero = false
    , noData = "No Data Available."
    , childIndent = 20
    , columns = [{key:'key', label: 'Name', type:'text'}] //TODO: consider functions like chart.addColumn, chart.removeColumn, instead of a block like this
    , tableClass = null
    , iconOpen = 'images/grey-plus.png' //TODO: consider removing this and replacing with a '+' or '-' unless user defines images
    , iconClose = 'images/grey-minus.png'
    , dispatch = d3.dispatch('elementClick', 'elementDblclick', 'elementMouseover', 'elementMouseout')
    , getUrl = function(d) { return d.url }
    ;

  //============================================================

  var idx = 0;

  function chart(selection) {
    selection.each(function(data) {
      var depth = 1,
          container = d3.select(this);

      var tree = d3.layout.tree()
          .children(function(d) { return d.values })
          .size([height, childIndent]); //Not sure if this is needed now that the result is HTML

      chart.update = function() { container.transition().duration(600).call(chart) };


      //------------------------------------------------------------
      // Display No Data message if there's nothing to show.
      if (!data[0]) data[0] = {key: noData};

      //------------------------------------------------------------


      var nodes = tree.nodes(data[0]);

      // nodes.map(function(d) {
      //   d.id = i++;
      // })

      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = d3.select(this).selectAll('div').data([[nodes]]);
      var wrapEnter = wrap.enter().append('div').attr('class', 'nvd3 nv-wrap nv-indentedtree');
      var tableEnter = wrapEnter.append('table');
      var table = wrap.select('table').attr('width', '100%').attr('class', tableClass);

      //------------------------------------------------------------


      if (header) {
        var thead = tableEnter.append('thead');

        var theadRow1 = thead.append('tr');

        columns.forEach(function(column) {
          theadRow1
            .append('th')
              .attr('width', column.width ? column.width : '10%')
              .style('text-align', column.type == 'numeric' ? 'right' : 'left')
            .append('span')
              .text(column.label);
        });
      }


      var tbody = table.selectAll('tbody')
                    .data(function(d) { return d });
      tbody.enter().append('tbody');



      //compute max generations
      depth = d3.max(nodes, function(node) { return node.depth });
      tree.size([height, depth * childIndent]); //TODO: see if this is necessary at all


      // Update the nodes…
      var node = tbody.selectAll('tr')
          // .data(function(d) { return d; }, function(d) { return d.id || (d.id == ++i)});
          .data(function(d) { return d.filter(function(d) { return (filterZero && !d.children) ? filterZero(d) :  true; } )}, function(d,i) { return d.id || (d.id || ++idx)});
          //.style('display', 'table-row'); //TODO: see if this does anything

      node.exit().remove();

      node.select('img.nv-treeicon')
          .attr('src', icon)
          .classed('folded', folded);

      var nodeEnter = node.enter().append('tr');


      columns.forEach(function(column, index) {

        var nodeName = nodeEnter.append('td')
            .style('padding-left', function(d) { return (index ? 0 : d.depth * childIndent + 12 + (icon(d) ? 0 : 16)) + 'px' }, 'important') //TODO: check why I did the ternary here
            .style('text-align', column.type == 'numeric' ? 'right' : 'left');


        if (index == 0) {
          nodeName.append('img')
              .classed('nv-treeicon', true)
              .classed('nv-folded', folded)
              .attr('src', icon)
              .style('width', '14px')
              .style('height', '14px')
              .style('padding', '0 1px')
              .style('display', function(d) { return icon(d) ? 'inline-block' : 'none'; })
              .on('click', click);
        }


        nodeName.each(function(d) {
          if (!index && getUrl(d))
            d3.select(this)
              .append('a')
              .attr('href',getUrl)
              .attr('class', d3.functor(column.classes))
              .append('span')
          else
            d3.select(this)
              .append('span')

            d3.select(this).select('span')
              .attr('class', d3.functor(column.classes) )
              .text(function(d) { return column.format ? (d[column.key] ? column.format(d[column.key]) : '-') :  (d[column.key] || '-'); });
          });

        if  (column.showCount) {
          nodeName.append('span')
              .attr('class', 'nv-childrenCount');

          node.selectAll('span.nv-childrenCount').text(function(d) {
                return ((d.values && d.values.length) || (d._values && d._values.length)) ?                                   //If this is a parent
                    '(' + ((d.values && (d.values.filter(function(d) { return filterZero ? filterZero(d) :  true; }).length)) //If children are in values check its children and filter
                    || (d._values && d._values.filter(function(d) { return filterZero ? filterZero(d) :  true; }).length)     //Otherwise, do the same, but with the other name, _values...
                    || 0) + ')'                                                                                               //This is the catch-all in case there are no children after a filter
                    : ''                                                                                                     //If this is not a parent, just give an empty string
            });
        }

        // if (column.click)
        //   nodeName.select('span').on('click', column.click);

      });

      node
        .order()
        .on('click', function(d) { 
          dispatch.elementClick({
            row: this, //TODO: decide whether or not this should be consistent with scatter/line events or should be an html link (a href)
            data: d,
            pos: [d.x, d.y]
          });
        })
        .on('dblclick', function(d) { 
          dispatch.elementDblclick({
            row: this,
            data: d,
            pos: [d.x, d.y]
          });
        })
        .on('mouseover', function(d) { 
          dispatch.elementMouseover({
            row: this,
            data: d,
            pos: [d.x, d.y]
          });
        })
        .on('mouseout', function(d) { 
          dispatch.elementMouseout({
            row: this,
            data: d,
            pos: [d.x, d.y]
          });
        });




      // Toggle children on click.
      function click(d, _, unshift) {
        d3.event.stopPropagation();

        if(d3.event.shiftKey && !unshift) {
          //If you shift-click, it'll toggle fold all the children, instead of itself
          d3.event.shiftKey = false;
          d.values && d.values.forEach(function(node){
            if (node.values || node._values) {
              click(node, 0, true);
            }
          });
          return true;
        }
        if(!hasChildren(d)) {
          //download file
          //window.location.href = d.url;
          return true;
        }
        if (d.values) {
          d._values = d.values;
          d.values = null;
        } else {
          d.values = d._values;
          d._values = null;
        }
        chart.update();
      }


      function icon(d) {
        return (d._values && d._values.length) ? iconOpen : (d.values && d.values.length) ? iconClose : '';
      }

      function folded(d) {
        return (d._values && d._values.length);
      }

      function hasChildren(d) {
        var values = d.values || d._values;

        return (values && values.length);
      }


    });

    return chart;
  }


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------
  chart.options = nv.utils.optionsFunc.bind(chart);
  
  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    scatter.color(color);
    return chart;
  };

  chart.id = function(_) {
    if (!arguments.length) return id;
    id = _;
    return chart;
  };

  chart.header = function(_) {
    if (!arguments.length) return header;
    header = _;
    return chart;
  };

  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  chart.filterZero = function(_) {
    if (!arguments.length) return filterZero;
    filterZero = _;
    return chart;
  };

  chart.columns = function(_) {
    if (!arguments.length) return columns;
    columns = _;
    return chart;
  };

  chart.tableClass = function(_) {
    if (!arguments.length) return tableClass;
    tableClass = _;
    return chart;
  };

  chart.iconOpen = function(_){
     if (!arguments.length) return iconOpen;
    iconOpen = _;
    return chart;
  }

  chart.iconClose = function(_){
     if (!arguments.length) return iconClose;
    iconClose = _;
    return chart;
  }

  chart.getUrl = function(_){
     if (!arguments.length) return getUrl;
    getUrl = _;
    return chart;
  }

  //============================================================


  return chart;
};nv.models.legend = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var margin = {top: 5, right: 0, bottom: 5, left: 0}
    , width = 400
    , height = 20
    , getKey = function(d) { return d.key }
    , color = nv.utils.defaultColor()
    , align = true
    , rightAlign = true
    , updateState = true   //If true, legend will update data.disabled and trigger a 'stateChange' dispatch.
    , radioButtonMode = false   //If true, clicking legend items will cause it to behave like a radio button. (only one can be selected at a time)
    , dispatch = d3.dispatch('legendClick', 'legendDblclick', 'legendMouseover', 'legendMouseout', 'stateChange')
    ;

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var availableWidth = width - margin.left - margin.right,
          container = d3.select(this);


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-legend').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-legend').append('g');
      var g = wrap.select('g');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      //------------------------------------------------------------


      var series = g.selectAll('.nv-series')
          .data(function(d) { return d });
      var seriesEnter = series.enter().append('g').attr('class', 'nv-series')
          .on('mouseover', function(d,i) {
            dispatch.legendMouseover(d,i);  //TODO: Make consistent with other event objects
          })
          .on('mouseout', function(d,i) {
            dispatch.legendMouseout(d,i);
          })
          .on('click', function(d,i) {
            dispatch.legendClick(d,i);
            if (updateState) {
               if (radioButtonMode) {
                   //Radio button mode: set every series to disabled,
                   //  and enable the clicked series.
                   data.forEach(function(series) { series.disabled = true});
                   d.disabled = false;
               }
               else {
                   d.disabled = !d.disabled;
                   if (data.every(function(series) { return series.disabled})) {
                       //the default behavior of NVD3 legends is, if every single series
                       // is disabled, turn all series' back on.
                       data.forEach(function(series) { series.disabled = false});
                   }
               }
               dispatch.stateChange({
                  disabled: data.map(function(d) { return !!d.disabled })
               });
            }
          })
          .on('dblclick', function(d,i) {
            dispatch.legendDblclick(d,i);
            if (updateState) {
                //the default behavior of NVD3 legends, when double clicking one,
                // is to set all other series' to false, and make the double clicked series enabled.
                data.forEach(function(series) {
                   series.disabled = true;
                });
                d.disabled = false;
                dispatch.stateChange({
                    disabled: data.map(function(d) { return !!d.disabled })
                });
            }
          });
      seriesEnter.append('circle')
          .style('stroke-width', 2)
          .attr('class','nv-legend-symbol')
          .attr('r', 5);
      seriesEnter.append('text')
          .attr('text-anchor', 'start')
          .attr('class','nv-legend-text')
          .attr('dy', '.32em')
          .attr('dx', '8');
      series.classed('disabled', function(d) { return d.disabled });
      series.exit().remove();
      series.select('circle')
          .style('fill', function(d,i) { return d.color || color(d,i)})
          .style('stroke', function(d,i) { return d.color || color(d, i) });
      series.select('text').text(getKey);


      //TODO: implement fixed-width and max-width options (max-width is especially useful with the align option)

      // NEW ALIGNING CODE, TODO: clean up
      if (align) {

        var seriesWidths = [];
        series.each(function(d,i) {
              var legendText = d3.select(this).select('text');
              var nodeTextLength;
              try {
                nodeTextLength = legendText.getComputedTextLength();
                // If the legendText is display:none'd (nodeTextLength == 0), simulate an error so we approximate, instead
                if(nodeTextLength <= 0) throw Error();
              }
              catch(e) {
                nodeTextLength = nv.utils.calcApproxTextWidth(legendText);
              }

              seriesWidths.push(nodeTextLength + 28); // 28 is ~ the width of the circle plus some padding
            });

        var seriesPerRow = 0;
        var legendWidth = 0;
        var columnWidths = [];

        while ( legendWidth < availableWidth && seriesPerRow < seriesWidths.length) {
          columnWidths[seriesPerRow] = seriesWidths[seriesPerRow];
          legendWidth += seriesWidths[seriesPerRow++];
        }
        if (seriesPerRow === 0) seriesPerRow = 1; //minimum of one series per row


        while ( legendWidth > availableWidth && seriesPerRow > 1 ) {
          columnWidths = [];
          seriesPerRow--;

          for (var k = 0; k < seriesWidths.length; k++) {
            if (seriesWidths[k] > (columnWidths[k % seriesPerRow] || 0) )
              columnWidths[k % seriesPerRow] = seriesWidths[k];
          }

          legendWidth = columnWidths.reduce(function(prev, cur, index, array) {
                          return prev + cur;
                        });
        }

        var xPositions = [];
        for (var i = 0, curX = 0; i < seriesPerRow; i++) {
            xPositions[i] = curX;
            curX += columnWidths[i];
        }

        series
            .attr('transform', function(d, i) {
              return 'translate(' + xPositions[i % seriesPerRow] + ',' + (5 + Math.floor(i / seriesPerRow) * 20) + ')';
            });

        //position legend as far right as possible within the total width
        if (rightAlign) {
           g.attr('transform', 'translate(' + (width - margin.right - legendWidth) + ',' + margin.top + ')');
        }
        else {
           g.attr('transform', 'translate(0' + ',' + margin.top + ')');
        }

        height = margin.top + margin.bottom + (Math.ceil(seriesWidths.length / seriesPerRow) * 20);

      } else {

        var ypos = 5,
            newxpos = 5,
            maxwidth = 0,
            xpos;
        series
            .attr('transform', function(d, i) {
              var length = d3.select(this).select('text').node().getComputedTextLength() + 28;
              xpos = newxpos;

              if (width < margin.left + margin.right + xpos + length) {
                newxpos = xpos = 5;
                ypos += 20;
              }

              newxpos += length;
              if (newxpos > maxwidth) maxwidth = newxpos;

              return 'translate(' + xpos + ',' + ypos + ')';
            });

        //position legend as far right as possible within the total width
        g.attr('transform', 'translate(' + (width - margin.right - maxwidth) + ',' + margin.top + ')');

        height = margin.top + margin.bottom + ypos + 15;

      }

    });

    return chart;
  }


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  chart.dispatch = dispatch;
  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.key = function(_) {
    if (!arguments.length) return getKey;
    getKey = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    return chart;
  };

  chart.align = function(_) {
    if (!arguments.length) return align;
    align = _;
    return chart;
  };

  chart.rightAlign = function(_) {
    if (!arguments.length) return rightAlign;
    rightAlign = _;
    return chart;
  };

  chart.updateState = function(_) {
    if (!arguments.length) return updateState;
    updateState = _;
    return chart;
  };

  chart.radioButtonMode = function(_) {
    if (!arguments.length) return radioButtonMode;
    radioButtonMode = _;
    return chart;
  };

  //============================================================


  return chart;
}

nv.models.line = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var  scatter = nv.models.scatter()
    ;

  var margin = {top: 0, right: 0, bottom: 0, left: 0}
    , width = 960
    , height = 500
    , color = nv.utils.defaultColor() // a function that returns a color
    , getX = function(d) { return d.x } // accessor to get the x value from a data point
    , getY = function(d) { return d.y } // accessor to get the y value from a data point
    , defined = function(d,i) { return !isNaN(getY(d,i)) && getY(d,i) !== null } // allows a line to be not continuous when it is not defined
    , isArea = function(d) { return d.area } // decides if a line is an area or just a line
    , clipEdge = false // if true, masks lines within x and y scale
    , x //can be accessed via chart.xScale()
    , y //can be accessed via chart.yScale()
    , interpolate = "linear" // controls the line interpolation
    ;

  scatter
    .size(16) // default size
    .sizeDomain([16,256]) //set to speed up calculation, needs to be unset if there is a custom size accessor
    ;

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var x0, y0 //used to store previous scales
      ;

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var availableWidth = width - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom,
          container = d3.select(this);

      //------------------------------------------------------------
      // Setup Scales

      x = scatter.xScale();
      y = scatter.yScale();

      x0 = x0 || x;
      y0 = y0 || y;

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-line').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-line');
      var defsEnter = wrapEnter.append('defs');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g')

      gEnter.append('g').attr('class', 'nv-groups');
      gEnter.append('g').attr('class', 'nv-scatterWrap');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      //------------------------------------------------------------




      scatter
        .width(availableWidth)
        .height(availableHeight)

      var scatterWrap = wrap.select('.nv-scatterWrap');
          //.datum(data); // Data automatically trickles down from the wrap

      scatterWrap.transition().call(scatter);



      defsEnter.append('clipPath')
          .attr('id', 'nv-edge-clip-' + scatter.id())
        .append('rect');

      wrap.select('#nv-edge-clip-' + scatter.id() + ' rect')
          .attr('width', availableWidth)
          .attr('height', (availableHeight > 0) ? availableHeight : 0);

      g   .attr('clip-path', clipEdge ? 'url(#nv-edge-clip-' + scatter.id() + ')' : '');
      scatterWrap
          .attr('clip-path', clipEdge ? 'url(#nv-edge-clip-' + scatter.id() + ')' : '');




      var groups = wrap.select('.nv-groups').selectAll('.nv-group')
          .data(function(d) { return d }, function(d) { return d.key });
      groups.enter().append('g')
          .style('stroke-opacity', 1e-6)
          .style('fill-opacity', 1e-6);

      groups.exit().remove();

      groups
          .attr('class', function(d,i) { return 'nv-group nv-series-' + i })
          .classed('hover', function(d) { return d.hover })
          .style('fill', function(d,i){ return color(d, i) })
          .style('stroke', function(d,i){ return color(d, i)});
      groups
          .transition()
          .style('stroke-opacity', 1)
          .style('fill-opacity', .5);



      var areaPaths = groups.selectAll('path.nv-area')
          .data(function(d) { return isArea(d) ? [d] : [] }); // this is done differently than lines because I need to check if series is an area
      areaPaths.enter().append('path')
          .attr('class', 'nv-area')
          .attr('d', function(d) {
            return d3.svg.area()
                .interpolate(interpolate)
                .defined(defined)
                .x(function(d,i) { return nv.utils.NaNtoZero(x0(getX(d,i))) })
                .y0(function(d,i) { return nv.utils.NaNtoZero(y0(getY(d,i))) })
                .y1(function(d,i) { return y0( y.domain()[0] <= 0 ? y.domain()[1] >= 0 ? 0 : y.domain()[1] : y.domain()[0] ) })
                //.y1(function(d,i) { return y0(0) }) //assuming 0 is within y domain.. may need to tweak this
                .apply(this, [d.values])
          });
      groups.exit().selectAll('path.nv-area')
           .remove();

      areaPaths
          .transition()
          .attr('d', function(d) {
            return d3.svg.area()
                .interpolate(interpolate)
                .defined(defined)
                .x(function(d,i) { return nv.utils.NaNtoZero(x(getX(d,i))) })
                .y0(function(d,i) { return nv.utils.NaNtoZero(y(getY(d,i))) })
                .y1(function(d,i) { return y( y.domain()[0] <= 0 ? y.domain()[1] >= 0 ? 0 : y.domain()[1] : y.domain()[0] ) })
                //.y1(function(d,i) { return y0(0) }) //assuming 0 is within y domain.. may need to tweak this
                .apply(this, [d.values])
          });



      var linePaths = groups.selectAll('path.nv-line')
          .data(function(d) { return [d.values] });
      linePaths.enter().append('path')
          .attr('class', 'nv-line')
          .attr('d',
            d3.svg.line()
              .interpolate(interpolate)
              .defined(defined)
              .x(function(d,i) { return nv.utils.NaNtoZero(x0(getX(d,i))) })
              .y(function(d,i) { return nv.utils.NaNtoZero(y0(getY(d,i))) })
          );

      linePaths
          .transition()
          .attr('d',
            d3.svg.line()
              .interpolate(interpolate)
              .defined(defined)
              .x(function(d,i) { return nv.utils.NaNtoZero(x(getX(d,i))) })
              .y(function(d,i) { return nv.utils.NaNtoZero(y(getY(d,i))) })
          );



      //store old scales for use in transitions on update
      x0 = x.copy();
      y0 = y.copy();

    });

    return chart;
  }


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  chart.dispatch = scatter.dispatch;
  chart.scatter = scatter;

  d3.rebind(chart, scatter, 'id', 'interactive', 'size', 'xScale', 'yScale', 'zScale', 'xDomain', 'yDomain', 'xRange', 'yRange',
    'sizeDomain', 'forceX', 'forceY', 'forceSize', 'clipVoronoi', 'useVoronoi', 'clipRadius', 'padData','highlightPoint','clearHighlights');

  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.x = function(_) {
    if (!arguments.length) return getX;
    getX = _;
    scatter.x(_);
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return getY;
    getY = _;
    scatter.y(_);
    return chart;
  };

  chart.clipEdge = function(_) {
    if (!arguments.length) return clipEdge;
    clipEdge = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    scatter.color(color);
    return chart;
  };

  chart.interpolate = function(_) {
    if (!arguments.length) return interpolate;
    interpolate = _;
    return chart;
  };

  chart.defined = function(_) {
    if (!arguments.length) return defined;
    defined = _;
    return chart;
  };

  chart.isArea = function(_) {
    if (!arguments.length) return isArea;
    isArea = d3.functor(_);
    return chart;
  };

  //============================================================


  return chart;
}

nv.models.lineChart = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var lines = nv.models.line()
    , xAxis = nv.models.axis()
    , yAxis = nv.models.axis()
    , legend = nv.models.legend()
    , interactiveLayer = nv.interactiveGuideline()
    ;

  var margin = {top: 30, right: 20, bottom: 50, left: 60}
    , color = nv.utils.defaultColor()
    , width = null
    , height = null
    , showLegend = true
    , showXAxis = true
    , showYAxis = true
    , rightAlignYAxis = false
    , useInteractiveGuideline = false
    , tooltips = true
    , tooltip = function(key, x, y, e, graph) {
        return '<h3>' + key + '</h3>' +
               '<p>' +  y + ' at ' + x + '</p>'
      }
    , x
    , y
    , state = {}
    , defaultState = null
    , noData = 'No Data Available.'
    , dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'stateChange', 'changeState')
    , transitionDuration = 250
    ;

  xAxis
    .orient('bottom')
    .tickPadding(7)
    ;
  yAxis
    .orient((rightAlignYAxis) ? 'right' : 'left')
    ;

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var showTooltip = function(e, offsetElement) {
    var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
        top = e.pos[1] + ( offsetElement.offsetTop || 0),
        x = xAxis.tickFormat()(lines.x()(e.point, e.pointIndex)),
        y = yAxis.tickFormat()(lines.y()(e.point, e.pointIndex)),
        content = tooltip(e.series.key, x, y, e, chart);

    nv.tooltip.show([left, top], content, null, null, offsetElement);
  };

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this),
          that = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;


      chart.update = function() { container.transition().duration(transitionDuration).call(chart) };
      chart.container = this;

      //set state.disabled
      state.disabled = data.map(function(d) { return !!d.disabled });


      if (!defaultState) {
        var key;
        defaultState = {};
        for (key in state) {
          if (state[key] instanceof Array)
            defaultState[key] = state[key].slice(0);
          else
            defaultState[key] = state[key];
        }
      }

      //------------------------------------------------------------
      // Display noData message if there's nothing to show.

      if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', margin.top + availableHeight / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Scales

      x = lines.xScale();
      y = lines.yScale();

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-lineChart').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-lineChart').append('g');
      var g = wrap.select('g');

      gEnter.append("rect").style("opacity",0);
      gEnter.append('g').attr('class', 'nv-x nv-axis');
      gEnter.append('g').attr('class', 'nv-y nv-axis');
      gEnter.append('g').attr('class', 'nv-linesWrap');
      gEnter.append('g').attr('class', 'nv-legendWrap');
      gEnter.append('g').attr('class', 'nv-interactive');

      g.select("rect")
        .attr("width",availableWidth)
        .attr("height",(availableHeight > 0) ? availableHeight : 0);
      //------------------------------------------------------------
      // Legend

      if (showLegend) {
        legend.width(availableWidth);

        g.select('.nv-legendWrap')
            .datum(data)
            .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;
        }

        wrap.select('.nv-legendWrap')
            .attr('transform', 'translate(0,' + (-margin.top) +')')
      }

      //------------------------------------------------------------

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      if (rightAlignYAxis) {
          g.select(".nv-y.nv-axis")
              .attr("transform", "translate(" + availableWidth + ",0)");
      }

      //------------------------------------------------------------
      // Main Chart Component(s)


      //------------------------------------------------------------
      //Set up interactive layer
      if (useInteractiveGuideline) {
        interactiveLayer
           .width(availableWidth)
           .height(availableHeight)
           .margin({left:margin.left, top:margin.top})
           .svgContainer(container)
           .xScale(x);
        wrap.select(".nv-interactive").call(interactiveLayer);
      }


      lines
        .width(availableWidth)
        .height(availableHeight)
        .color(data.map(function(d,i) {
          return d.color || color(d, i);
        }).filter(function(d,i) { return !data[i].disabled }));


      var linesWrap = g.select('.nv-linesWrap')
          .datum(data.filter(function(d) { return !d.disabled }))

      linesWrap.transition().call(lines);

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Axes

      if (showXAxis) {
        xAxis
          .scale(x)
          .ticks( availableWidth / 100 )
          .tickSize(-availableHeight, 0);

        g.select('.nv-x.nv-axis')
            .attr('transform', 'translate(0,' + y.range()[0] + ')');
        g.select('.nv-x.nv-axis')
            .transition()
            .call(xAxis);
      }

      if (showYAxis) {
        yAxis
          .scale(y)
          .ticks( availableHeight / 36 )
          .tickSize( -availableWidth, 0);

        g.select('.nv-y.nv-axis')
            .transition()
            .call(yAxis);
      }
      //------------------------------------------------------------


      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------

      legend.dispatch.on('stateChange', function(newState) {
          state = newState;
          dispatch.stateChange(state);
          chart.update();
      });

      interactiveLayer.dispatch.on('elementMousemove', function(e) {
          lines.clearHighlights();
          var singlePoint, pointIndex, pointXLocation, allData = [];
          data
          .filter(function(series, i) {
            series.seriesIndex = i;
            return !series.disabled;
          })
          .forEach(function(series,i) {
              pointIndex = nv.interactiveBisect(series.values, e.pointXValue, chart.x());
              lines.highlightPoint(i, pointIndex, true);
              var point = series.values[pointIndex];
              if (typeof point === 'undefined') return;
              if (typeof singlePoint === 'undefined') singlePoint = point;
              if (typeof pointXLocation === 'undefined') pointXLocation = chart.xScale()(chart.x()(point,pointIndex));
              allData.push({
                  key: series.key,
                  value: chart.y()(point, pointIndex),
                  color: color(series,series.seriesIndex)
              });
          });
          //Highlight the tooltip entry based on which point the mouse is closest to.
          if (allData.length > 2) {
            var yValue = chart.yScale().invert(e.mouseY);
            var domainExtent = Math.abs(chart.yScale().domain()[0] - chart.yScale().domain()[1]);
            var threshold = 0.03 * domainExtent;
            var indexToHighlight = nv.nearestValueIndex(allData.map(function(d){return d.value}),yValue,threshold);
            if (indexToHighlight !== null)
              allData[indexToHighlight].highlight = true;
          }

          var xValue = xAxis.tickFormat()(chart.x()(singlePoint,pointIndex));
          interactiveLayer.tooltip
                  .position({left: pointXLocation + margin.left, top: e.mouseY + margin.top})
                  .chartContainer(that.parentNode)
                  .enabled(tooltips)
                  .valueFormatter(function(d,i) {
                     return yAxis.tickFormat()(d);
                  })
                  .data(
                      {
                        value: xValue,
                        series: allData
                      }
                  )();

          interactiveLayer.renderGuideLine(pointXLocation);

      });

      interactiveLayer.dispatch.on("elementMouseout",function(e) {
          dispatch.tooltipHide();
          lines.clearHighlights();
      });

      dispatch.on('tooltipShow', function(e) {
        if (tooltips) showTooltip(e, that.parentNode);
      });


      dispatch.on('changeState', function(e) {

        if (typeof e.disabled !== 'undefined' && data.length === e.disabled.length) {
          data.forEach(function(series,i) {
            series.disabled = e.disabled[i];
          });

          state.disabled = e.disabled;
        }

        chart.update();
      });

      //============================================================

    });

    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  lines.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  lines.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.dispatch = dispatch;
  chart.lines = lines;
  chart.legend = legend;
  chart.xAxis = xAxis;
  chart.yAxis = yAxis;
  chart.interactiveLayer = interactiveLayer;

  d3.rebind(chart, lines, 'defined', 'isArea', 'x', 'y', 'size', 'xScale', 'yScale', 'xDomain', 'yDomain', 'xRange', 'yRange'
    , 'forceX', 'forceY', 'interactive', 'clipEdge', 'clipVoronoi', 'useVoronoi','id', 'interpolate');

  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    legend.color(color);
    return chart;
  };

  chart.showLegend = function(_) {
    if (!arguments.length) return showLegend;
    showLegend = _;
    return chart;
  };

  chart.showXAxis = function(_) {
    if (!arguments.length) return showXAxis;
    showXAxis = _;
    return chart;
  };

  chart.showYAxis = function(_) {
    if (!arguments.length) return showYAxis;
    showYAxis = _;
    return chart;
  };

  chart.rightAlignYAxis = function(_) {
    if(!arguments.length) return rightAlignYAxis;
    rightAlignYAxis = _;
    yAxis.orient( (_) ? 'right' : 'left');
    return chart;
  };

  chart.useInteractiveGuideline = function(_) {
    if(!arguments.length) return useInteractiveGuideline;
    useInteractiveGuideline = _;
    if (_ === true) {
       chart.interactive(false);
       chart.useVoronoi(false);
    }
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.state = function(_) {
    if (!arguments.length) return state;
    state = _;
    return chart;
  };

  chart.defaultState = function(_) {
    if (!arguments.length) return defaultState;
    defaultState = _;
    return chart;
  };

  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  chart.transitionDuration = function(_) {
    if (!arguments.length) return transitionDuration;
    transitionDuration = _;
    return chart;
  };

  //============================================================


  return chart;
}

nv.models.linePlusBarChart = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var lines = nv.models.line()
    , bars = nv.models.historicalBar()
    , xAxis = nv.models.axis()
    , y1Axis = nv.models.axis()
    , y2Axis = nv.models.axis()
    , legend = nv.models.legend()
    ;

  var margin = {top: 30, right: 60, bottom: 50, left: 60}
    , width = null
    , height = null
    , getX = function(d) { return d.x }
    , getY = function(d) { return d.y }
    , color = nv.utils.defaultColor()
    , showLegend = true
    , tooltips = true
    , tooltip = function(key, x, y, e, graph) {
        return '<h3>' + key + '</h3>' +
               '<p>' +  y + ' at ' + x + '</p>';
      }
    , x
    , y1
    , y2
    , state = {}
    , defaultState = null
    , noData = "No Data Available."
    , dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'stateChange', 'changeState')
    ;

  bars
    .padData(true)
    ;
  lines
    .clipEdge(false)
    .padData(true)
    ;
  xAxis
    .orient('bottom')
    .tickPadding(7)
    .highlightZero(false)
    ;
  y1Axis
    .orient('left')
    ;
  y2Axis
    .orient('right')
    ;

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var showTooltip = function(e, offsetElement) {
      var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
          top = e.pos[1] + ( offsetElement.offsetTop || 0),
          x = xAxis.tickFormat()(lines.x()(e.point, e.pointIndex)),
          y = (e.series.bar ? y1Axis : y2Axis).tickFormat()(lines.y()(e.point, e.pointIndex)),
          content = tooltip(e.series.key, x, y, e, chart);

      nv.tooltip.show([left, top], content, e.value < 0 ? 'n' : 's', null, offsetElement);
    }
    ;

  //------------------------------------------------------------



  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this),
          that = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;

      chart.update = function() { container.transition().call(chart); };
      // chart.container = this;

      //set state.disabled
      state.disabled = data.map(function(d) { return !!d.disabled });

      if (!defaultState) {
        var key;
        defaultState = {};
        for (key in state) {
          if (state[key] instanceof Array)
            defaultState[key] = state[key].slice(0);
          else
            defaultState[key] = state[key];
        }
      }

      //------------------------------------------------------------
      // Display No Data message if there's nothing to show.

      if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', margin.top + availableHeight / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Scales

      var dataBars = data.filter(function(d) { return !d.disabled && d.bar });
      var dataLines = data.filter(function(d) { return !d.bar }); // removed the !d.disabled clause here to fix Issue #240

      //x = xAxis.scale();
       x = dataLines.filter(function(d) { return !d.disabled; }).length && dataLines.filter(function(d) { return !d.disabled; })[0].values.length ? lines.xScale() : bars.xScale();
      //x = dataLines.filter(function(d) { return !d.disabled; }).length ? lines.xScale() : bars.xScale(); //old code before change above
      y1 = bars.yScale();
      y2 = lines.yScale();

      //------------------------------------------------------------

      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = d3.select(this).selectAll('g.nv-wrap.nv-linePlusBar').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-linePlusBar').append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-x nv-axis');
      gEnter.append('g').attr('class', 'nv-y1 nv-axis');
      gEnter.append('g').attr('class', 'nv-y2 nv-axis');
      gEnter.append('g').attr('class', 'nv-barsWrap');
      gEnter.append('g').attr('class', 'nv-linesWrap');
      gEnter.append('g').attr('class', 'nv-legendWrap');

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Legend

      if (showLegend) {
        legend.width( availableWidth / 2 );

        g.select('.nv-legendWrap')
            .datum(data.map(function(series) {
              series.originalKey = series.originalKey === undefined ? series.key : series.originalKey;
              series.key = series.originalKey + (series.bar ? ' (left axis)' : ' (right axis)');
              return series;
            }))
          .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;
        }

        g.select('.nv-legendWrap')
            .attr('transform', 'translate(' + ( availableWidth / 2 ) + ',' + (-margin.top) +')');
      }

      //------------------------------------------------------------


      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


      //------------------------------------------------------------
      // Main Chart Component(s)


      lines
        .width(availableWidth)
        .height(availableHeight)
        .color(data.map(function(d,i) {
          return d.color || color(d, i);
        }).filter(function(d,i) { return !data[i].disabled && !data[i].bar }))

      bars
        .width(availableWidth)
        .height(availableHeight)
        .color(data.map(function(d,i) {
          return d.color || color(d, i);
        }).filter(function(d,i) { return !data[i].disabled && data[i].bar }))



      var barsWrap = g.select('.nv-barsWrap')
          .datum(dataBars.length ? dataBars : [{values:[]}])

      var linesWrap = g.select('.nv-linesWrap')
          .datum(dataLines[0] && !dataLines[0].disabled ? dataLines : [{values:[]}] );
          //.datum(!dataLines[0].disabled ? dataLines : [{values:dataLines[0].values.map(function(d) { return [d[0], null] }) }] );

      d3.transition(barsWrap).call(bars);
      d3.transition(linesWrap).call(lines);

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Axes

      xAxis
        .scale(x)
        .ticks( availableWidth / 100 )
        .tickSize(-availableHeight, 0);

      g.select('.nv-x.nv-axis')
          .attr('transform', 'translate(0,' + y1.range()[0] + ')');
      d3.transition(g.select('.nv-x.nv-axis'))
          .call(xAxis);


      y1Axis
        .scale(y1)
        .ticks( availableHeight / 36 )
        .tickSize(-availableWidth, 0);

      d3.transition(g.select('.nv-y1.nv-axis'))
          .style('opacity', dataBars.length ? 1 : 0)
          .call(y1Axis);


      y2Axis
        .scale(y2)
        .ticks( availableHeight / 36 )
        .tickSize(dataBars.length ? 0 : -availableWidth, 0); // Show the y2 rules only if y1 has none

      g.select('.nv-y2.nv-axis')
          .style('opacity', dataLines.length ? 1 : 0)
          .attr('transform', 'translate(' + availableWidth + ',0)');
          //.attr('transform', 'translate(' + x.range()[1] + ',0)');

      d3.transition(g.select('.nv-y2.nv-axis'))
          .call(y2Axis);

      //------------------------------------------------------------


      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------

      legend.dispatch.on('stateChange', function(newState) { 
        state = newState;
        dispatch.stateChange(state);
        chart.update();
      });

      dispatch.on('tooltipShow', function(e) {
        if (tooltips) showTooltip(e, that.parentNode);
      });


      // Update chart from a state object passed to event handler
      dispatch.on('changeState', function(e) {

        if (typeof e.disabled !== 'undefined') {
          data.forEach(function(series,i) {
            series.disabled = e.disabled[i];
          });

          state.disabled = e.disabled;
        }

        chart.update();
      });

      //============================================================


    });

    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  lines.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  lines.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  bars.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  bars.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.dispatch = dispatch;
  chart.legend = legend;
  chart.lines = lines;
  chart.bars = bars;
  chart.xAxis = xAxis;
  chart.y1Axis = y1Axis;
  chart.y2Axis = y2Axis;

  d3.rebind(chart, lines, 'defined', 'size', 'clipVoronoi', 'interpolate');
  //TODO: consider rebinding x, y and some other stuff, and simply do soemthign lile bars.x(lines.x()), etc.
  //d3.rebind(chart, lines, 'x', 'y', 'size', 'xDomain', 'yDomain', 'xRange', 'yRange', 'forceX', 'forceY', 'interactive', 'clipEdge', 'clipVoronoi', 'id');

  chart.options = nv.utils.optionsFunc.bind(chart);
  
  chart.x = function(_) {
    if (!arguments.length) return getX;
    getX = _;
    lines.x(_);
    bars.x(_);
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return getY;
    getY = _;
    lines.y(_);
    bars.y(_);
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    legend.color(color);
    return chart;
  };

  chart.showLegend = function(_) {
    if (!arguments.length) return showLegend;
    showLegend = _;
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.state = function(_) {
    if (!arguments.length) return state;
    state = _;
    return chart;
  };

  chart.defaultState = function(_) {
    if (!arguments.length) return defaultState;
    defaultState = _;
    return chart;
  };

  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  //============================================================


  return chart;
}
nv.models.lineWithFocusChart = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var lines = nv.models.line()
    , lines2 = nv.models.line()
    , xAxis = nv.models.axis()
    , yAxis = nv.models.axis()
    , x2Axis = nv.models.axis()
    , y2Axis = nv.models.axis()
    , legend = nv.models.legend()
    , brush = d3.svg.brush()
    ;

  var margin = {top: 30, right: 30, bottom: 30, left: 60}
    , margin2 = {top: 0, right: 30, bottom: 20, left: 60}
    , color = nv.utils.defaultColor()
    , width = null
    , height = null
    , height2 = 100
    , x
    , y
    , x2
    , y2
    , showLegend = true
    , brushExtent = null
    , tooltips = true
    , tooltip = function(key, x, y, e, graph) {
        return '<h3>' + key + '</h3>' +
               '<p>' +  y + ' at ' + x + '</p>'
      }
    , noData = "No Data Available."
    , dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'brush')
    , transitionDuration = 250
    ;

  lines
    .clipEdge(true)
    ;
  lines2
    .interactive(false)
    ;
  xAxis
    .orient('bottom')
    .tickPadding(5)
    ;
  yAxis
    .orient('left')
    ;
  x2Axis
    .orient('bottom')
    .tickPadding(5)
    ;
  y2Axis
    .orient('left')
    ;
  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var showTooltip = function(e, offsetElement) {
    var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
        top = e.pos[1] + ( offsetElement.offsetTop || 0),
        x = xAxis.tickFormat()(lines.x()(e.point, e.pointIndex)),
        y = yAxis.tickFormat()(lines.y()(e.point, e.pointIndex)),
        content = tooltip(e.series.key, x, y, e, chart);

    nv.tooltip.show([left, top], content, null, null, offsetElement);
  };

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this),
          that = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight1 = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom - height2,
          availableHeight2 = height2 - margin2.top - margin2.bottom;

      chart.update = function() { container.transition().duration(transitionDuration).call(chart) };
      chart.container = this;


      //------------------------------------------------------------
      // Display No Data message if there's nothing to show.

      if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', margin.top + availableHeight1 / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Scales

      x = lines.xScale();
      y = lines.yScale();
      x2 = lines2.xScale();
      y2 = lines2.yScale();

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-lineWithFocusChart').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-lineWithFocusChart').append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-legendWrap');

      var focusEnter = gEnter.append('g').attr('class', 'nv-focus');
      focusEnter.append('g').attr('class', 'nv-x nv-axis');
      focusEnter.append('g').attr('class', 'nv-y nv-axis');
      focusEnter.append('g').attr('class', 'nv-linesWrap');

      var contextEnter = gEnter.append('g').attr('class', 'nv-context');
      contextEnter.append('g').attr('class', 'nv-x nv-axis');
      contextEnter.append('g').attr('class', 'nv-y nv-axis');
      contextEnter.append('g').attr('class', 'nv-linesWrap');
      contextEnter.append('g').attr('class', 'nv-brushBackground');
      contextEnter.append('g').attr('class', 'nv-x nv-brush');

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Legend

      if (showLegend) {
        legend.width(availableWidth);

        g.select('.nv-legendWrap')
            .datum(data)
            .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight1 = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom - height2;
        }

        g.select('.nv-legendWrap')
            .attr('transform', 'translate(0,' + (-margin.top) +')')
      }

      //------------------------------------------------------------


      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


      //------------------------------------------------------------
      // Main Chart Component(s)

      lines
        .width(availableWidth)
        .height(availableHeight1)
        .color(
          data
            .map(function(d,i) {
              return d.color || color(d, i);
            })
            .filter(function(d,i) {
              return !data[i].disabled;
          })
        );

      lines2
        .defined(lines.defined())
        .width(availableWidth)
        .height(availableHeight2)
        .color(
          data
            .map(function(d,i) {
              return d.color || color(d, i);
            })
            .filter(function(d,i) {
              return !data[i].disabled;
          })
        );

      g.select('.nv-context')
          .attr('transform', 'translate(0,' + ( availableHeight1 + margin.bottom + margin2.top) + ')')

      var contextLinesWrap = g.select('.nv-context .nv-linesWrap')
          .datum(data.filter(function(d) { return !d.disabled }))

      d3.transition(contextLinesWrap).call(lines2);

      //------------------------------------------------------------


      /*
      var focusLinesWrap = g.select('.nv-focus .nv-linesWrap')
          .datum(data.filter(function(d) { return !d.disabled }))

      d3.transition(focusLinesWrap).call(lines);
     */


      //------------------------------------------------------------
      // Setup Main (Focus) Axes

      xAxis
        .scale(x)
        .ticks( availableWidth / 100 )
        .tickSize(-availableHeight1, 0);

      yAxis
        .scale(y)
        .ticks( availableHeight1 / 36 )
        .tickSize( -availableWidth, 0);

      g.select('.nv-focus .nv-x.nv-axis')
          .attr('transform', 'translate(0,' + availableHeight1 + ')');

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Brush

      brush
        .x(x2)
        .on('brush', function() {
            //When brushing, turn off transitions because chart needs to change immediately.
            var oldTransition = chart.transitionDuration();
            chart.transitionDuration(0); 
            onBrush();
            chart.transitionDuration(oldTransition);
        });

      if (brushExtent) brush.extent(brushExtent);

      var brushBG = g.select('.nv-brushBackground').selectAll('g')
          .data([brushExtent || brush.extent()])

      var brushBGenter = brushBG.enter()
          .append('g');

      brushBGenter.append('rect')
          .attr('class', 'left')
          .attr('x', 0)
          .attr('y', 0)
          .attr('height', availableHeight2);

      brushBGenter.append('rect')
          .attr('class', 'right')
          .attr('x', 0)
          .attr('y', 0)
          .attr('height', availableHeight2);

      var gBrush = g.select('.nv-x.nv-brush')
          .call(brush);
      gBrush.selectAll('rect')
          //.attr('y', -5)
          .attr('height', availableHeight2);
      gBrush.selectAll('.resize').append('path').attr('d', resizePath);

      onBrush();

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Secondary (Context) Axes

      x2Axis
        .scale(x2)
        .ticks( availableWidth / 100 )
        .tickSize(-availableHeight2, 0);

      g.select('.nv-context .nv-x.nv-axis')
          .attr('transform', 'translate(0,' + y2.range()[0] + ')');
      d3.transition(g.select('.nv-context .nv-x.nv-axis'))
          .call(x2Axis);


      y2Axis
        .scale(y2)
        .ticks( availableHeight2 / 36 )
        .tickSize( -availableWidth, 0);

      d3.transition(g.select('.nv-context .nv-y.nv-axis'))
          .call(y2Axis);

      g.select('.nv-context .nv-x.nv-axis')
          .attr('transform', 'translate(0,' + y2.range()[0] + ')');

      //------------------------------------------------------------


      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------

      legend.dispatch.on('stateChange', function(newState) { 
        chart.update();
      });

      dispatch.on('tooltipShow', function(e) {
        if (tooltips) showTooltip(e, that.parentNode);
      });

      //============================================================


      //============================================================
      // Functions
      //------------------------------------------------------------

      // Taken from crossfilter (http://square.github.com/crossfilter/)
      function resizePath(d) {
        var e = +(d == 'e'),
            x = e ? 1 : -1,
            y = availableHeight2 / 3;
        return 'M' + (.5 * x) + ',' + y
            + 'A6,6 0 0 ' + e + ' ' + (6.5 * x) + ',' + (y + 6)
            + 'V' + (2 * y - 6)
            + 'A6,6 0 0 ' + e + ' ' + (.5 * x) + ',' + (2 * y)
            + 'Z'
            + 'M' + (2.5 * x) + ',' + (y + 8)
            + 'V' + (2 * y - 8)
            + 'M' + (4.5 * x) + ',' + (y + 8)
            + 'V' + (2 * y - 8);
      }


      function updateBrushBG() {
        if (!brush.empty()) brush.extent(brushExtent);
        brushBG
            .data([brush.empty() ? x2.domain() : brushExtent])
            .each(function(d,i) {
              var leftWidth = x2(d[0]) - x.range()[0],
                  rightWidth = x.range()[1] - x2(d[1]);
              d3.select(this).select('.left')
                .attr('width',  leftWidth < 0 ? 0 : leftWidth);

              d3.select(this).select('.right')
                .attr('x', x2(d[1]))
                .attr('width', rightWidth < 0 ? 0 : rightWidth);
            });
      }


      function onBrush() {
        brushExtent = brush.empty() ? null : brush.extent();
        var extent = brush.empty() ? x2.domain() : brush.extent();

        //The brush extent cannot be less than one.  If it is, don't update the line chart.
        if (Math.abs(extent[0] - extent[1]) <= 1) {
          return;
        }

        dispatch.brush({extent: extent, brush: brush});


        updateBrushBG();

        // Update Main (Focus)
        var focusLinesWrap = g.select('.nv-focus .nv-linesWrap')
            .datum(
              data
                .filter(function(d) { return !d.disabled })
                .map(function(d,i) {
                  return {
                    key: d.key,
                    values: d.values.filter(function(d,i) {
                      return lines.x()(d,i) >= extent[0] && lines.x()(d,i) <= extent[1];
                    })
                  }
                })
            );
        focusLinesWrap.transition().duration(transitionDuration).call(lines);


        // Update Main (Focus) Axes
        g.select('.nv-focus .nv-x.nv-axis').transition().duration(transitionDuration)
            .call(xAxis);
        g.select('.nv-focus .nv-y.nv-axis').transition().duration(transitionDuration)
            .call(yAxis);
      }

      //============================================================


    });

    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  lines.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  lines.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.dispatch = dispatch;
  chart.legend = legend;
  chart.lines = lines;
  chart.lines2 = lines2;
  chart.xAxis = xAxis;
  chart.yAxis = yAxis;
  chart.x2Axis = x2Axis;
  chart.y2Axis = y2Axis;

  d3.rebind(chart, lines, 'defined', 'isArea', 'size', 'xDomain', 'yDomain', 'xRange', 'yRange', 'forceX', 'forceY', 'interactive', 'clipEdge', 'clipVoronoi', 'id');

  chart.options = nv.utils.optionsFunc.bind(chart);
  
  chart.x = function(_) {
    if (!arguments.length) return lines.x;
    lines.x(_);
    lines2.x(_);
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return lines.y;
    lines.y(_);
    lines2.y(_);
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.margin2 = function(_) {
    if (!arguments.length) return margin2;
    margin2 = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.height2 = function(_) {
    if (!arguments.length) return height2;
    height2 = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color =nv.utils.getColor(_);
    legend.color(color);
    return chart;
  };

  chart.showLegend = function(_) {
    if (!arguments.length) return showLegend;
    showLegend = _;
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.interpolate = function(_) {
    if (!arguments.length) return lines.interpolate();
    lines.interpolate(_);
    lines2.interpolate(_);
    return chart;
  };

  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  // Chart has multiple similar Axes, to prevent code duplication, probably need to link all axis functions manually like below
  chart.xTickFormat = function(_) {
    if (!arguments.length) return xAxis.tickFormat();
    xAxis.tickFormat(_);
    x2Axis.tickFormat(_);
    return chart;
  };

  chart.yTickFormat = function(_) {
    if (!arguments.length) return yAxis.tickFormat();
    yAxis.tickFormat(_);
    y2Axis.tickFormat(_);
    return chart;
  };
  
  chart.brushExtent = function(_) {
    if (!arguments.length) return brushExtent;
    brushExtent = _;
    return chart;
  };

  chart.transitionDuration = function(_) {
    if (!arguments.length) return transitionDuration;
    transitionDuration = _;
    return chart;
  };

  //============================================================


  return chart;
}

nv.models.linePlusBarWithFocusChart = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var lines = nv.models.line()
    , lines2 = nv.models.line()
    , bars = nv.models.historicalBar()
    , bars2 = nv.models.historicalBar()
    , xAxis = nv.models.axis()
    , x2Axis = nv.models.axis()
    , y1Axis = nv.models.axis()
    , y2Axis = nv.models.axis()
    , y3Axis = nv.models.axis()
    , y4Axis = nv.models.axis()
    , legend = nv.models.legend()
    , brush = d3.svg.brush()
    ;

  var margin = {top: 30, right: 30, bottom: 30, left: 60}
    , margin2 = {top: 0, right: 30, bottom: 20, left: 60}
    , width = null
    , height = null
    , height2 = 100
    , getX = function(d) { return d.x }
    , getY = function(d) { return d.y }
    , color = nv.utils.defaultColor()
    , showLegend = true
    , extent
    , brushExtent = null
    , tooltips = true
    , tooltip = function(key, x, y, e, graph) {
        return '<h3>' + key + '</h3>' +
               '<p>' +  y + ' at ' + x + '</p>';
      }
    , x
    , x2
    , y1
    , y2
    , y3
    , y4
    , noData = "No Data Available."
    , dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'brush')
    , transitionDuration = 0
    ;

  lines
    .clipEdge(true)
    ;
  lines2
    .interactive(false)
    ;
  xAxis
    .orient('bottom')
    .tickPadding(5)
    ;
  y1Axis
    .orient('left')
    ;
  y2Axis
    .orient('right')
    ;
  x2Axis
    .orient('bottom')
    .tickPadding(5)
    ;
  y3Axis
    .orient('left')
    ;
  y4Axis
    .orient('right')
    ;

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var showTooltip = function(e, offsetElement) {
    if (extent) {
        e.pointIndex += Math.ceil(extent[0]);
    }
    var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
        top = e.pos[1] + ( offsetElement.offsetTop || 0),
        x = xAxis.tickFormat()(lines.x()(e.point, e.pointIndex)),
        y = (e.series.bar ? y1Axis : y2Axis).tickFormat()(lines.y()(e.point, e.pointIndex)),
        content = tooltip(e.series.key, x, y, e, chart);

    nv.tooltip.show([left, top], content, e.value < 0 ? 'n' : 's', null, offsetElement);
  };

  //------------------------------------------------------------



  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this),
          that = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight1 = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom - height2,
          availableHeight2 = height2 - margin2.top - margin2.bottom;

      chart.update = function() { container.transition().duration(transitionDuration).call(chart); };
      chart.container = this;


      //------------------------------------------------------------
      // Display No Data message if there's nothing to show.

      if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', margin.top + availableHeight1 / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Scales

      var dataBars = data.filter(function(d) { return !d.disabled && d.bar });
      var dataLines = data.filter(function(d) { return !d.bar }); // removed the !d.disabled clause here to fix Issue #240

      x = bars.xScale();
      x2 = x2Axis.scale();
      y1 = bars.yScale();
      y2 = lines.yScale();
      y3 = bars2.yScale();
      y4 = lines2.yScale();

      var series1 = data
        .filter(function(d) { return !d.disabled && d.bar })
        .map(function(d) {
          return d.values.map(function(d,i) {
            return { x: getX(d,i), y: getY(d,i) }
          })
        });

      var series2 = data
        .filter(function(d) { return !d.disabled && !d.bar })
        .map(function(d) {
          return d.values.map(function(d,i) {
            return { x: getX(d,i), y: getY(d,i) }
          })
        });

      x   .range([0, availableWidth]);
      
      x2  .domain(d3.extent(d3.merge(series1.concat(series2)), function(d) { return d.x } ))
          .range([0, availableWidth]);


      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-linePlusBar').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-linePlusBar').append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-legendWrap');
      
      var focusEnter = gEnter.append('g').attr('class', 'nv-focus');
      focusEnter.append('g').attr('class', 'nv-x nv-axis');
      focusEnter.append('g').attr('class', 'nv-y1 nv-axis');
      focusEnter.append('g').attr('class', 'nv-y2 nv-axis');
      focusEnter.append('g').attr('class', 'nv-barsWrap');
      focusEnter.append('g').attr('class', 'nv-linesWrap');

      var contextEnter = gEnter.append('g').attr('class', 'nv-context');
      contextEnter.append('g').attr('class', 'nv-x nv-axis');
      contextEnter.append('g').attr('class', 'nv-y1 nv-axis');
      contextEnter.append('g').attr('class', 'nv-y2 nv-axis');
      contextEnter.append('g').attr('class', 'nv-barsWrap');
      contextEnter.append('g').attr('class', 'nv-linesWrap');
      contextEnter.append('g').attr('class', 'nv-brushBackground');
      contextEnter.append('g').attr('class', 'nv-x nv-brush');


      //------------------------------------------------------------


      //------------------------------------------------------------
      // Legend

      if (showLegend) {
        legend.width( availableWidth / 2 );

        g.select('.nv-legendWrap')
            .datum(data.map(function(series) {
              series.originalKey = series.originalKey === undefined ? series.key : series.originalKey;
              series.key = series.originalKey + (series.bar ? ' (left axis)' : ' (right axis)');
              return series;
            }))
          .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight1 = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom - height2;
        }

        g.select('.nv-legendWrap')
            .attr('transform', 'translate(' + ( availableWidth / 2 ) + ',' + (-margin.top) +')');
      }

      //------------------------------------------------------------


      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


      //------------------------------------------------------------
      // Context Components

      bars2
        .width(availableWidth)
        .height(availableHeight2)
        .color(data.map(function(d,i) {
          return d.color || color(d, i);
        }).filter(function(d,i) { return !data[i].disabled && data[i].bar }));

      lines2
        .width(availableWidth)
        .height(availableHeight2)
        .color(data.map(function(d,i) {
          return d.color || color(d, i);
        }).filter(function(d,i) { return !data[i].disabled && !data[i].bar }));
        
      var bars2Wrap = g.select('.nv-context .nv-barsWrap')
          .datum(dataBars.length ? dataBars : [{values:[]}]);

      var lines2Wrap = g.select('.nv-context .nv-linesWrap')
          .datum(!dataLines[0].disabled ? dataLines : [{values:[]}]);
          
      g.select('.nv-context')
          .attr('transform', 'translate(0,' + ( availableHeight1 + margin.bottom + margin2.top) + ')')

      bars2Wrap.transition().call(bars2);
      lines2Wrap.transition().call(lines2);

      //------------------------------------------------------------



      //------------------------------------------------------------
      // Setup Brush

      brush
        .x(x2)
        .on('brush', onBrush);

      if (brushExtent) brush.extent(brushExtent);

      var brushBG = g.select('.nv-brushBackground').selectAll('g')
          .data([brushExtent || brush.extent()])

      var brushBGenter = brushBG.enter()
          .append('g');

      brushBGenter.append('rect')
          .attr('class', 'left')
          .attr('x', 0)
          .attr('y', 0)
          .attr('height', availableHeight2);

      brushBGenter.append('rect')
          .attr('class', 'right')
          .attr('x', 0)
          .attr('y', 0)
          .attr('height', availableHeight2);

      var gBrush = g.select('.nv-x.nv-brush')
          .call(brush);
      gBrush.selectAll('rect')
          //.attr('y', -5)
          .attr('height', availableHeight2);
      gBrush.selectAll('.resize').append('path').attr('d', resizePath);

      //------------------------------------------------------------

      //------------------------------------------------------------
      // Setup Secondary (Context) Axes

      x2Axis
        .ticks( availableWidth / 100 )
        .tickSize(-availableHeight2, 0);

      g.select('.nv-context .nv-x.nv-axis')
          .attr('transform', 'translate(0,' + y3.range()[0] + ')');
      g.select('.nv-context .nv-x.nv-axis').transition()
          .call(x2Axis);


      y3Axis
        .scale(y3)
        .ticks( availableHeight2 / 36 )
        .tickSize( -availableWidth, 0);

      g.select('.nv-context .nv-y1.nv-axis')
          .style('opacity', dataBars.length ? 1 : 0)
          .attr('transform', 'translate(0,' + x2.range()[0] + ')');
          
      g.select('.nv-context .nv-y1.nv-axis').transition()
          .call(y3Axis);
          

      y4Axis
        .scale(y4)
        .ticks( availableHeight2 / 36 )
        .tickSize(dataBars.length ? 0 : -availableWidth, 0); // Show the y2 rules only if y1 has none

      g.select('.nv-context .nv-y2.nv-axis')
          .style('opacity', dataLines.length ? 1 : 0)
          .attr('transform', 'translate(' + x2.range()[1] + ',0)');

      g.select('.nv-context .nv-y2.nv-axis').transition()
          .call(y4Axis);
          
      //------------------------------------------------------------

      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------

      legend.dispatch.on('stateChange', function(newState) { 
        chart.update();
      });

      dispatch.on('tooltipShow', function(e) {
        if (tooltips) showTooltip(e, that.parentNode);
      });

      //============================================================


      //============================================================
      // Functions
      //------------------------------------------------------------

      // Taken from crossfilter (http://square.github.com/crossfilter/)
      function resizePath(d) {
        var e = +(d == 'e'),
            x = e ? 1 : -1,
            y = availableHeight2 / 3;
        return 'M' + (.5 * x) + ',' + y
            + 'A6,6 0 0 ' + e + ' ' + (6.5 * x) + ',' + (y + 6)
            + 'V' + (2 * y - 6)
            + 'A6,6 0 0 ' + e + ' ' + (.5 * x) + ',' + (2 * y)
            + 'Z'
            + 'M' + (2.5 * x) + ',' + (y + 8)
            + 'V' + (2 * y - 8)
            + 'M' + (4.5 * x) + ',' + (y + 8)
            + 'V' + (2 * y - 8);
      }


      function updateBrushBG() {
        if (!brush.empty()) brush.extent(brushExtent);
        brushBG
            .data([brush.empty() ? x2.domain() : brushExtent])
            .each(function(d,i) {
              var leftWidth = x2(d[0]) - x2.range()[0],
                  rightWidth = x2.range()[1] - x2(d[1]);
              d3.select(this).select('.left')
                .attr('width',  leftWidth < 0 ? 0 : leftWidth);

              d3.select(this).select('.right')
                .attr('x', x2(d[1]))
                .attr('width', rightWidth < 0 ? 0 : rightWidth);
            });
      }


      function onBrush() {
        brushExtent = brush.empty() ? null : brush.extent();
        extent = brush.empty() ? x2.domain() : brush.extent();


        dispatch.brush({extent: extent, brush: brush});

        updateBrushBG();


        //------------------------------------------------------------
        // Prepare Main (Focus) Bars and Lines
        
        bars
        .width(availableWidth)
        .height(availableHeight1)
        .color(data.map(function(d,i) {
          return d.color || color(d, i);
        }).filter(function(d,i) { return !data[i].disabled && data[i].bar }));


        lines
        .width(availableWidth)
        .height(availableHeight1)
        .color(data.map(function(d,i) {
          return d.color || color(d, i);
        }).filter(function(d,i) { return !data[i].disabled && !data[i].bar }));

        var focusBarsWrap = g.select('.nv-focus .nv-barsWrap')
            .datum(!dataBars.length ? [{values:[]}] :
              dataBars
                .map(function(d,i) {
                  return {
                    key: d.key,
                    values: d.values.filter(function(d,i) {
                      return bars.x()(d,i) >= extent[0] && bars.x()(d,i) <= extent[1];
                    })
                  }
                })
            );
        
        var focusLinesWrap = g.select('.nv-focus .nv-linesWrap')
            .datum(dataLines[0].disabled ? [{values:[]}] :
              dataLines
                .map(function(d,i) {
                  return {
                    key: d.key,
                    values: d.values.filter(function(d,i) {
                      return lines.x()(d,i) >= extent[0] && lines.x()(d,i) <= extent[1];
                    })
                  }
                })
             );
                 
        //------------------------------------------------------------
        
        
        //------------------------------------------------------------
        // Update Main (Focus) X Axis

        if (dataBars.length) {
            x = bars.xScale();
        } else {
            x = lines.xScale();
        }
        
        xAxis
        .scale(x)
        .ticks( availableWidth / 100 )
        .tickSize(-availableHeight1, 0);

        xAxis.domain([Math.ceil(extent[0]), Math.floor(extent[1])]);
        
        g.select('.nv-x.nv-axis').transition().duration(transitionDuration)
          .call(xAxis);
        //------------------------------------------------------------
        
        
        //------------------------------------------------------------
        // Update Main (Focus) Bars and Lines

        focusBarsWrap.transition().duration(transitionDuration).call(bars);
        focusLinesWrap.transition().duration(transitionDuration).call(lines);
        
        //------------------------------------------------------------
        
          
        //------------------------------------------------------------
        // Setup and Update Main (Focus) Y Axes
        
        g.select('.nv-focus .nv-x.nv-axis')
          .attr('transform', 'translate(0,' + y1.range()[0] + ')');


        y1Axis
        .scale(y1)
        .ticks( availableHeight1 / 36 )
        .tickSize(-availableWidth, 0);

        g.select('.nv-focus .nv-y1.nv-axis')
          .style('opacity', dataBars.length ? 1 : 0);


        y2Axis
        .scale(y2)
        .ticks( availableHeight1 / 36 )
        .tickSize(dataBars.length ? 0 : -availableWidth, 0); // Show the y2 rules only if y1 has none

        g.select('.nv-focus .nv-y2.nv-axis')
          .style('opacity', dataLines.length ? 1 : 0)
          .attr('transform', 'translate(' + x.range()[1] + ',0)');

        g.select('.nv-focus .nv-y1.nv-axis').transition().duration(transitionDuration)
            .call(y1Axis);
        g.select('.nv-focus .nv-y2.nv-axis').transition().duration(transitionDuration)
            .call(y2Axis);
      }

      //============================================================

      onBrush();

    });

    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  lines.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  lines.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  bars.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  bars.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.dispatch = dispatch;
  chart.legend = legend;
  chart.lines = lines;
  chart.lines2 = lines2;
  chart.bars = bars;
  chart.bars2 = bars2;
  chart.xAxis = xAxis;
  chart.x2Axis = x2Axis;
  chart.y1Axis = y1Axis;
  chart.y2Axis = y2Axis;
  chart.y3Axis = y3Axis;
  chart.y4Axis = y4Axis;

  d3.rebind(chart, lines, 'defined', 'size', 'clipVoronoi', 'interpolate');
  //TODO: consider rebinding x, y and some other stuff, and simply do soemthign lile bars.x(lines.x()), etc.
  //d3.rebind(chart, lines, 'x', 'y', 'size', 'xDomain', 'yDomain', 'xRange', 'yRange', 'forceX', 'forceY', 'interactive', 'clipEdge', 'clipVoronoi', 'id');

  chart.options = nv.utils.optionsFunc.bind(chart);
  
  chart.x = function(_) {
    if (!arguments.length) return getX;
    getX = _;
    lines.x(_);
    bars.x(_);
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return getY;
    getY = _;
    lines.y(_);
    bars.y(_);
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    legend.color(color);
    return chart;
  };

  chart.showLegend = function(_) {
    if (!arguments.length) return showLegend;
    showLegend = _;
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  chart.brushExtent = function(_) {
    if (!arguments.length) return brushExtent;
    brushExtent = _;
    return chart;
  };


  //============================================================


  return chart;
}

nv.models.multiBar = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var margin = {top: 0, right: 0, bottom: 0, left: 0}
    , width = 960
    , height = 500
    , x = d3.scale.ordinal()
    , y = d3.scale.linear()
    , id = Math.floor(Math.random() * 10000) //Create semi-unique ID in case user doesn't select one
    , getX = function(d) { return d.x }
    , getY = function(d) { return d.y }
    , forceY = [0] // 0 is forced by default.. this makes sense for the majority of bar graphs... user can always do chart.forceY([]) to remove
    , clipEdge = true
    , stacked = false
    , stackOffset = 'zero' // options include 'silhouette', 'wiggle', 'expand', 'zero', or a custom function
    , color = nv.utils.defaultColor()
    , hideable = false
    , barColor = null // adding the ability to set the color for each rather than the whole group
    , disabled // used in conjunction with barColor to communicate from multiBarHorizontalChart what series are disabled
    , delay = 1200
    , xDomain
    , yDomain
    , xRange
    , yRange
    , groupSpacing = 0.1
    , dispatch = d3.dispatch('chartClick', 'elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout')
    ;

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var x0, y0 //used to store previous scales
      ;

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var availableWidth = width - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom,
          container = d3.select(this);

      if(hideable && data.length) hideable = [{
        values: data[0].values.map(function(d) {
        return {
          x: d.x,
          y: 0,
          series: d.series,
          size: 0.01
        };}
      )}];

      if (stacked)
        data = d3.layout.stack()
                 .offset(stackOffset)
                 .values(function(d){ return d.values })
                 .y(getY)
                 (!data.length && hideable ? hideable : data);


      //add series index to each data point for reference
      data.forEach(function(series, i) {
        series.values.forEach(function(point) {
          point.series = i;
        });
      });


      //------------------------------------------------------------
      // HACK for negative value stacking
      if (stacked && data[0]) //@zl
        data[0].values.map(function(d,i) {
          var posBase = 0, negBase = 0;
          data.map(function(d) {
            var f = d.values[i]
            f.size = Math.abs(f.y);
            if (f.y<0)  {
              f.y1 = negBase;
              negBase = negBase - f.size;
            } else
            {
              f.y1 = f.size + posBase;
              posBase = posBase + f.size;
            }
          });
        });

      //------------------------------------------------------------
      // Setup Scales

      // remap and flatten the data for use in calculating the scales' domains
      var seriesData = (xDomain && yDomain) ? [] : // if we know xDomain and yDomain, no need to calculate
            data.map(function(d) {
              return d.values.map(function(d,i) {
                return { x: getX(d,i), y: getY(d,i), y0: d.y0, y1: d.y1 }
              })
            });

      x   .domain(xDomain || d3.merge(seriesData).map(function(d) { return d.x }))
          .rangeBands(xRange || [0, availableWidth], groupSpacing);

      //y   .domain(yDomain || d3.extent(d3.merge(seriesData).map(function(d) { return d.y + (stacked ? d.y1 : 0) }).concat(forceY)))
      y   .domain(yDomain || d3.extent(d3.merge(seriesData).map(function(d) { return stacked ? (d.y > 0 ? d.y1 : d.y1 + d.y ) : d.y }).concat(forceY)))
          .range(yRange || [availableHeight, 0]);

      // If scale's domain don't have a range, slightly adjust to make one... so a chart can show a single data point
      if (x.domain()[0] === x.domain()[1])
        x.domain()[0] ?
            x.domain([x.domain()[0] - x.domain()[0] * 0.01, x.domain()[1] + x.domain()[1] * 0.01])
          : x.domain([-1,1]);

      if (y.domain()[0] === y.domain()[1])
        y.domain()[0] ?
            y.domain([y.domain()[0] + y.domain()[0] * 0.01, y.domain()[1] - y.domain()[1] * 0.01])
          : y.domain([-1,1]);


      x0 = x0 || x;
      y0 = y0 || y;

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-multibar').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-multibar');
      var defsEnter = wrapEnter.append('defs');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g')

      gEnter.append('g').attr('class', 'nv-groups');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      //------------------------------------------------------------



      defsEnter.append('clipPath')
          .attr('id', 'nv-edge-clip-' + id)
        .append('rect');
      wrap.select('#nv-edge-clip-' + id + ' rect')
          .attr('width', availableWidth)
          .attr('height', availableHeight);

      g   .attr('clip-path', clipEdge ? 'url(#nv-edge-clip-' + id + ')' : '');



      var groups = wrap.select('.nv-groups').selectAll('.nv-group')
          .data(function(d) { return d }, function(d,i) { return i });
      groups.enter().append('g')
          .style('stroke-opacity', 1e-6)
          .style('fill-opacity', 1e-6);
      groups.exit()
        .transition()
        .selectAll('rect.nv-bar')
        .delay(function(d,i) {
             return (data[0])? i * delay/ data[0].values.length : i;
        })
          .attr('y', function(d) { return stacked ? y0(d.y0) : y0(0) })
          .attr('height', 0)
          .remove();
      groups
          .attr('class', function(d,i) { return 'nv-group nv-series-' + i })
          .classed('hover', function(d) { return d.hover })
          .style('fill', function(d,i){ return color(d, i) })
          .style('stroke', function(d,i){ return color(d, i) });
      groups
          .transition()
          .style('stroke-opacity', 1)
          .style('fill-opacity', .75);


      var bars = groups.selectAll('rect.nv-bar')
          .data(function(d) { return (hideable && !data.length) ? hideable.values : d.values });

      bars.exit().remove();


      var barsEnter = bars.enter().append('rect')
          .attr('class', function(d,i) { return getY(d,i) < 0 ? 'nv-bar negative' : 'nv-bar positive'})
          .attr('x', function(d,i,j) {
              return stacked ? 0 : (j * x.rangeBand() / data.length )
          })
          .attr('y', function(d) { return y0(stacked ? d.y0 : 0) })
          .attr('height', 0)
          .attr('width', x.rangeBand() / (stacked ? 1 : data.length) )
          .attr('transform', function(d,i) { return 'translate(' + x(getX(d,i)) + ',0)'; })
          ;
      bars
          .style('fill', function(d,i,j){ return color(d, j, i);  })
          .style('stroke', function(d,i,j){ return color(d, j, i); })
          .on('mouseover', function(d,i) { //TODO: figure out why j works above, but not here
            d3.select(this).classed('hover', true);
            dispatch.elementMouseover({
              value: getY(d,i),
              point: d,
              series: data[d.series],
              pos: [x(getX(d,i)) + (x.rangeBand() * (stacked ? data.length / 2 : d.series + .5) / data.length), y(getY(d,i) + (stacked ? d.y0 : 0))],  // TODO: Figure out why the value appears to be shifted
              pointIndex: i,
              seriesIndex: d.series,
              e: d3.event
            });
          })
          .on('mouseout', function(d,i) {
            d3.select(this).classed('hover', false);
            dispatch.elementMouseout({
              value: getY(d,i),
              point: d,
              series: data[d.series],
              pointIndex: i,
              seriesIndex: d.series,
              e: d3.event
            });
          })
          .on('click', function(d,i) {
            dispatch.elementClick({
              value: getY(d,i),
              point: d,
              series: data[d.series],
              pos: [x(getX(d,i)) + (x.rangeBand() * (stacked ? data.length / 2 : d.series + .5) / data.length), y(getY(d,i) + (stacked ? d.y0 : 0))],  // TODO: Figure out why the value appears to be shifted
              pointIndex: i,
              seriesIndex: d.series,
              e: d3.event
            });
            d3.event.stopPropagation();
          })
          .on('dblclick', function(d,i) {
            dispatch.elementDblClick({
              value: getY(d,i),
              point: d,
              series: data[d.series],
              pos: [x(getX(d,i)) + (x.rangeBand() * (stacked ? data.length / 2 : d.series + .5) / data.length), y(getY(d,i) + (stacked ? d.y0 : 0))],  // TODO: Figure out why the value appears to be shifted
              pointIndex: i,
              seriesIndex: d.series,
              e: d3.event
            });
            d3.event.stopPropagation();
          });
      bars
          .attr('class', function(d,i) { return getY(d,i) < 0 ? 'nv-bar negative' : 'nv-bar positive'})
          .transition()
          .attr('transform', function(d,i) { return 'translate(' + x(getX(d,i)) + ',0)'; })

      if (barColor) {
        if (!disabled) disabled = data.map(function() { return true });
        bars
          .style('fill', function(d,i,j) { return d3.rgb(barColor(d,i)).darker(  disabled.map(function(d,i) { return i }).filter(function(d,i){ return !disabled[i]  })[j]   ).toString(); })
          .style('stroke', function(d,i,j) { return d3.rgb(barColor(d,i)).darker(  disabled.map(function(d,i) { return i }).filter(function(d,i){ return !disabled[i]  })[j]   ).toString(); });
      }


      if (stacked)
          bars.transition()
            .delay(function(d,i) {

                  return i * delay / data[0].values.length;
            })
            .attr('y', function(d,i) {

              return y((stacked ? d.y1 : 0));
            })
            .attr('height', function(d,i) {
              return Math.max(Math.abs(y(d.y + (stacked ? d.y0 : 0)) - y((stacked ? d.y0 : 0))),1);
            })
            .attr('x', function(d,i) {
                  return stacked ? 0 : (d.series * x.rangeBand() / data.length )
            })
            .attr('width', x.rangeBand() / (stacked ? 1 : data.length) );
      else
          bars.transition()
            .delay(function(d,i) {
                return i * delay/ data[0].values.length;
            })
            .attr('x', function(d,i) {
              return d.series * x.rangeBand() / data.length
            })
            .attr('width', x.rangeBand() / data.length)
            .attr('y', function(d,i) {
                return getY(d,i) < 0 ?
                        y(0) :
                        y(0) - y(getY(d,i)) < 1 ?
                          y(0) - 1 :
                        y(getY(d,i)) || 0;
            })
            .attr('height', function(d,i) {
                return Math.max(Math.abs(y(getY(d,i)) - y(0)),1) || 0;
            });



      //store old scales for use in transitions on update
      x0 = x.copy();
      y0 = y.copy();

    });

    return chart;
  }


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  chart.dispatch = dispatch;

  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.x = function(_) {
    if (!arguments.length) return getX;
    getX = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return getY;
    getY = _;
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.xScale = function(_) {
    if (!arguments.length) return x;
    x = _;
    return chart;
  };

  chart.yScale = function(_) {
    if (!arguments.length) return y;
    y = _;
    return chart;
  };

  chart.xDomain = function(_) {
    if (!arguments.length) return xDomain;
    xDomain = _;
    return chart;
  };

  chart.yDomain = function(_) {
    if (!arguments.length) return yDomain;
    yDomain = _;
    return chart;
  };

  chart.xRange = function(_) {
    if (!arguments.length) return xRange;
    xRange = _;
    return chart;
  };

  chart.yRange = function(_) {
    if (!arguments.length) return yRange;
    yRange = _;
    return chart;
  };

  chart.forceY = function(_) {
    if (!arguments.length) return forceY;
    forceY = _;
    return chart;
  };

  chart.stacked = function(_) {
    if (!arguments.length) return stacked;
    stacked = _;
    return chart;
  };

  chart.stackOffset = function(_) {
    if (!arguments.length) return stackOffset;
    stackOffset = _;
    return chart;
  };

  chart.clipEdge = function(_) {
    if (!arguments.length) return clipEdge;
    clipEdge = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    return chart;
  };

  chart.barColor = function(_) {
    if (!arguments.length) return barColor;
    barColor = nv.utils.getColor(_);
    return chart;
  };

  chart.disabled = function(_) {
    if (!arguments.length) return disabled;
    disabled = _;
    return chart;
  };

  chart.id = function(_) {
    if (!arguments.length) return id;
    id = _;
    return chart;
  };

  chart.hideable = function(_) {
    if (!arguments.length) return hideable;
    hideable = _;
    return chart;
  };

  chart.delay = function(_) {
    if (!arguments.length) return delay;
    delay = _;
    return chart;
  };

  chart.groupSpacing = function(_) {
    if (!arguments.length) return groupSpacing;
    groupSpacing = _;
    return chart;
  };

  //============================================================


  return chart;
}

nv.models.multiBarChart = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var multibar = nv.models.multiBar()
    , xAxis = nv.models.axis()
    , yAxis = nv.models.axis()
    , legend = nv.models.legend()
    , controls = nv.models.legend()
    ;

  var margin = {top: 30, right: 20, bottom: 50, left: 60}
    , width = null
    , height = null
    , color = nv.utils.defaultColor()
    , showControls = true
    , showLegend = true
    , showXAxis = true
    , showYAxis = true
    , rightAlignYAxis = false
    , reduceXTicks = true // if false a tick will show for every data point
    , staggerLabels = false
    , rotateLabels = 0
    , tooltips = true
    , tooltip = function(key, x, y, e, graph) {
        return '<h3>' + key + '</h3>' +
               '<p>' +  y + ' on ' + x + '</p>'
      }
    , x //can be accessed via chart.xScale()
    , y //can be accessed via chart.yScale()
    , state = { stacked: false }
    , defaultState = null
    , noData = "No Data Available."
    , dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'stateChange', 'changeState')
    , controlWidth = function() { return showControls ? 180 : 0 }
    , transitionDuration = 250
    ;

  multibar
    .stacked(false)
    ;
  xAxis
    .orient('bottom')
    .tickPadding(7)
    .highlightZero(true)
    .showMaxMin(false)
    .tickFormat(function(d) { return d })
    ;
  yAxis
    .orient((rightAlignYAxis) ? 'right' : 'left')
    .tickFormat(d3.format(',.1f'))
    ;

  controls.updateState(false);
  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var showTooltip = function(e, offsetElement) {
    var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
        top = e.pos[1] + ( offsetElement.offsetTop || 0),
        x = xAxis.tickFormat()(multibar.x()(e.point, e.pointIndex)),
        y = yAxis.tickFormat()(multibar.y()(e.point, e.pointIndex)),
        content = tooltip(e.series.key, x, y, e, chart);

    nv.tooltip.show([left, top], content, e.value < 0 ? 'n' : 's', null, offsetElement);
  };

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this),
          that = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;

      chart.update = function() { container.transition().duration(transitionDuration).call(chart) };
      chart.container = this;

      //set state.disabled
      state.disabled = data.map(function(d) { return !!d.disabled });

      if (!defaultState) {
        var key;
        defaultState = {};
        for (key in state) {
          if (state[key] instanceof Array)
            defaultState[key] = state[key].slice(0);
          else
            defaultState[key] = state[key];
        }
      }
      //------------------------------------------------------------
      // Display noData message if there's nothing to show.

      if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', margin.top + availableHeight / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Scales

      x = multibar.xScale();
      y = multibar.yScale();

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-multiBarWithLegend').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-multiBarWithLegend').append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-x nv-axis');
      gEnter.append('g').attr('class', 'nv-y nv-axis');
      gEnter.append('g').attr('class', 'nv-barsWrap');
      gEnter.append('g').attr('class', 'nv-legendWrap');
      gEnter.append('g').attr('class', 'nv-controlsWrap');

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Legend

      if (showLegend) {
        legend.width(availableWidth - controlWidth());

        if (multibar.barColor())
          data.forEach(function(series,i) {
            series.color = d3.rgb('#ccc').darker(i * 1.5).toString();
          })

        g.select('.nv-legendWrap')
            .datum(data)
            .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;
        }

        g.select('.nv-legendWrap')
            .attr('transform', 'translate(' + controlWidth() + ',' + (-margin.top) +')');
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Controls

      if (showControls) {
        var controlsData = [
          { key: 'Grouped', disabled: multibar.stacked() },
          { key: 'Stacked', disabled: !multibar.stacked() }
        ];

        controls.width(controlWidth()).color(['#444', '#444', '#444']);
        g.select('.nv-controlsWrap')
            .datum(controlsData)
            .attr('transform', 'translate(0,' + (-margin.top) +')')
            .call(controls);
      }

      //------------------------------------------------------------


      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      if (rightAlignYAxis) {
          g.select(".nv-y.nv-axis")
              .attr("transform", "translate(" + availableWidth + ",0)");
      }

      //------------------------------------------------------------
      // Main Chart Component(s)

      multibar
        .disabled(data.map(function(series) { return series.disabled }))
        .width(availableWidth)
        .height(availableHeight)
        .color(data.map(function(d,i) {
          return d.color || color(d, i);
        }).filter(function(d,i) { return !data[i].disabled }))


      var barsWrap = g.select('.nv-barsWrap')
          .datum(data.filter(function(d) { return !d.disabled }))

      barsWrap.transition().call(multibar);

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Axes

      if (showXAxis) {
          xAxis
            .scale(x)
            .ticks( availableWidth / 100 )
            .tickSize(-availableHeight, 0);

          g.select('.nv-x.nv-axis')
              .attr('transform', 'translate(0,' + y.range()[0] + ')');
          g.select('.nv-x.nv-axis').transition()
              .call(xAxis);

          var xTicks = g.select('.nv-x.nv-axis > g').selectAll('g');

          xTicks
              .selectAll('line, text')
              .style('opacity', 1)

          if (staggerLabels) {
              var getTranslate = function(x,y) {
                  return "translate(" + x + "," + y + ")";
              };

              var staggerUp = 5, staggerDown = 17;  //pixels to stagger by
              // Issue #140
              xTicks
                .selectAll("text")
                .attr('transform', function(d,i,j) { 
                    return  getTranslate(0, (j % 2 == 0 ? staggerUp : staggerDown));
                  });

              var totalInBetweenTicks = d3.selectAll(".nv-x.nv-axis .nv-wrap g g text")[0].length;
              g.selectAll(".nv-x.nv-axis .nv-axisMaxMin text")
                .attr("transform", function(d,i) {
                    return getTranslate(0, (i === 0 || totalInBetweenTicks % 2 !== 0) ? staggerDown : staggerUp);
                });
          }

          if (reduceXTicks)
            xTicks
              .filter(function(d,i) {
                  return i % Math.ceil(data[0].values.length / (availableWidth / 100)) !== 0;
                })
              .selectAll('text, line')
              .style('opacity', 0);

          if(rotateLabels)
            xTicks
              .selectAll('.tick text')
              .attr('transform', 'rotate(' + rotateLabels + ' 0,0)')
              .style('text-anchor', rotateLabels > 0 ? 'start' : 'end');
          
          g.select('.nv-x.nv-axis').selectAll('g.nv-axisMaxMin text')
              .style('opacity', 1);
      }


      if (showYAxis) {      
          yAxis
            .scale(y)
            .ticks( availableHeight / 36 )
            .tickSize( -availableWidth, 0);

          g.select('.nv-y.nv-axis').transition()
              .call(yAxis);
      }


      //------------------------------------------------------------



      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------

      legend.dispatch.on('stateChange', function(newState) { 
        state = newState;
        dispatch.stateChange(state);
        chart.update();
      });

      controls.dispatch.on('legendClick', function(d,i) {
        if (!d.disabled) return;
        controlsData = controlsData.map(function(s) {
          s.disabled = true;
          return s;
        });
        d.disabled = false;

        switch (d.key) {
          case 'Grouped':
            multibar.stacked(false);
            break;
          case 'Stacked':
            multibar.stacked(true);
            break;
        }

        state.stacked = multibar.stacked();
        dispatch.stateChange(state);

        chart.update();
      });

      dispatch.on('tooltipShow', function(e) {
        if (tooltips) showTooltip(e, that.parentNode)
      });

      // Update chart from a state object passed to event handler
      dispatch.on('changeState', function(e) {

        if (typeof e.disabled !== 'undefined') {
          data.forEach(function(series,i) {
            series.disabled = e.disabled[i];
          });

          state.disabled = e.disabled;
        }

        if (typeof e.stacked !== 'undefined') {
          multibar.stacked(e.stacked);
          state.stacked = e.stacked;
        }

        chart.update();
      });

      //============================================================


    });

    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  multibar.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  multibar.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });
  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.dispatch = dispatch;
  chart.multibar = multibar;
  chart.legend = legend;
  chart.xAxis = xAxis;
  chart.yAxis = yAxis;

  d3.rebind(chart, multibar, 'x', 'y', 'xDomain', 'yDomain', 'xRange', 'yRange', 'forceX', 'forceY', 'clipEdge',
   'id', 'stacked', 'stackOffset', 'delay', 'barColor','groupSpacing');

  chart.options = nv.utils.optionsFunc.bind(chart);
  
  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    legend.color(color);
    return chart;
  };

  chart.showControls = function(_) {
    if (!arguments.length) return showControls;
    showControls = _;
    return chart;
  };

  chart.showLegend = function(_) {
    if (!arguments.length) return showLegend;
    showLegend = _;
    return chart;
  };

  chart.showXAxis = function(_) {
    if (!arguments.length) return showXAxis;
    showXAxis = _;
    return chart;
  };

  chart.showYAxis = function(_) {
    if (!arguments.length) return showYAxis;
    showYAxis = _;
    return chart;
  };

  chart.rightAlignYAxis = function(_) {
    if(!arguments.length) return rightAlignYAxis;
    rightAlignYAxis = _;
    yAxis.orient( (_) ? 'right' : 'left');
    return chart;
  };

  chart.reduceXTicks= function(_) {
    if (!arguments.length) return reduceXTicks;
    reduceXTicks = _;
    return chart;
  };

  chart.rotateLabels = function(_) {
    if (!arguments.length) return rotateLabels;
    rotateLabels = _;
    return chart;
  }

  chart.staggerLabels = function(_) {
    if (!arguments.length) return staggerLabels;
    staggerLabels = _;
    return chart;
  };

  chart.tooltip = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.state = function(_) {
    if (!arguments.length) return state;
    state = _;
    return chart;
  };

  chart.defaultState = function(_) {
    if (!arguments.length) return defaultState;
    defaultState = _;
    return chart;
  };
  
  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  chart.transitionDuration = function(_) {
    if (!arguments.length) return transitionDuration;
    transitionDuration = _;
    return chart;
  };

  //============================================================


  return chart;
}

nv.models.multiBarHorizontal = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var margin = {top: 0, right: 0, bottom: 0, left: 0}
    , width = 960
    , height = 500
    , id = Math.floor(Math.random() * 10000) //Create semi-unique ID in case user doesn't select one
    , x = d3.scale.ordinal()
    , y = d3.scale.linear()
    , getX = function(d) { return d.x }
    , getY = function(d) { return d.y }
    , forceY = [0] // 0 is forced by default.. this makes sense for the majority of bar graphs... user can always do chart.forceY([]) to remove
    , color = nv.utils.defaultColor()
    , barColor = null // adding the ability to set the color for each rather than the whole group
    , disabled // used in conjunction with barColor to communicate from multiBarHorizontalChart what series are disabled
    , stacked = false
    , showValues = false
    , showBarLabels = false
    , valuePadding = 60
    , valueFormat = d3.format(',.2f')
    , delay = 1200
    , xDomain
    , yDomain
    , xRange
    , yRange
    , dispatch = d3.dispatch('chartClick', 'elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout')
    ;

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var x0, y0 //used to store previous scales
      ;

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var availableWidth = width - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom,
          container = d3.select(this);


      if (stacked)
        data = d3.layout.stack()
                 .offset('zero')
                 .values(function(d){ return d.values })
                 .y(getY)
                 (data);


      //add series index to each data point for reference
      data.forEach(function(series, i) {
        series.values.forEach(function(point) {
          point.series = i;
        });
      });



      //------------------------------------------------------------
      // HACK for negative value stacking
      if (stacked)
        data[0].values.map(function(d,i) {
          var posBase = 0, negBase = 0;
          data.map(function(d) {
            var f = d.values[i]
            f.size = Math.abs(f.y);
            if (f.y<0)  {
              f.y1 = negBase - f.size;
              negBase = negBase - f.size;
            } else
            {
              f.y1 = posBase;
              posBase = posBase + f.size;
            }
          });
        });



      //------------------------------------------------------------
      // Setup Scales

      // remap and flatten the data for use in calculating the scales' domains
      var seriesData = (xDomain && yDomain) ? [] : // if we know xDomain and yDomain, no need to calculate
            data.map(function(d) {
              return d.values.map(function(d,i) {
                return { x: getX(d,i), y: getY(d,i), y0: d.y0, y1: d.y1 }
              })
            });

      x   .domain(xDomain || d3.merge(seriesData).map(function(d) { return d.x }))
          .rangeBands(xRange || [0, availableHeight], .1);

      //y   .domain(yDomain || d3.extent(d3.merge(seriesData).map(function(d) { return d.y + (stacked ? d.y0 : 0) }).concat(forceY)))
      y   .domain(yDomain || d3.extent(d3.merge(seriesData).map(function(d) { return stacked ? (d.y > 0 ? d.y1 + d.y : d.y1 ) : d.y }).concat(forceY)))

      if (showValues && !stacked)
        y.range(yRange || [(y.domain()[0] < 0 ? valuePadding : 0), availableWidth - (y.domain()[1] > 0 ? valuePadding : 0) ]);
      else
        y.range(yRange || [0, availableWidth]);

      x0 = x0 || x;
      y0 = y0 || d3.scale.linear().domain(y.domain()).range([y(0),y(0)]);

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = d3.select(this).selectAll('g.nv-wrap.nv-multibarHorizontal').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-multibarHorizontal');
      var defsEnter = wrapEnter.append('defs');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-groups');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      //------------------------------------------------------------



      var groups = wrap.select('.nv-groups').selectAll('.nv-group')
          .data(function(d) { return d }, function(d,i) { return i });
      groups.enter().append('g')
          .style('stroke-opacity', 1e-6)
          .style('fill-opacity', 1e-6);
      groups.exit().transition()
          .style('stroke-opacity', 1e-6)
          .style('fill-opacity', 1e-6)
          .remove();
      groups
          .attr('class', function(d,i) { return 'nv-group nv-series-' + i })
          .classed('hover', function(d) { return d.hover })
          .style('fill', function(d,i){ return color(d, i) })
          .style('stroke', function(d,i){ return color(d, i) });
      groups.transition()
          .style('stroke-opacity', 1)
          .style('fill-opacity', .75);


      var bars = groups.selectAll('g.nv-bar')
          .data(function(d) { return d.values });

      bars.exit().remove();


      var barsEnter = bars.enter().append('g')
          .attr('transform', function(d,i,j) {
              return 'translate(' + y0(stacked ? d.y0 : 0) + ',' + (stacked ? 0 : (j * x.rangeBand() / data.length ) + x(getX(d,i))) + ')'
          });

      barsEnter.append('rect')
          .attr('width', 0)
          .attr('height', x.rangeBand() / (stacked ? 1 : data.length) )

      bars
          .on('mouseover', function(d,i) { //TODO: figure out why j works above, but not here
            d3.select(this).classed('hover', true);
            dispatch.elementMouseover({
              value: getY(d,i),
              point: d,
              series: data[d.series],
              pos: [ y(getY(d,i) + (stacked ? d.y0 : 0)), x(getX(d,i)) + (x.rangeBand() * (stacked ? data.length / 2 : d.series + .5) / data.length) ],
              pointIndex: i,
              seriesIndex: d.series,
              e: d3.event
            });
          })
          .on('mouseout', function(d,i) {
            d3.select(this).classed('hover', false);
            dispatch.elementMouseout({
              value: getY(d,i),
              point: d,
              series: data[d.series],
              pointIndex: i,
              seriesIndex: d.series,
              e: d3.event
            });
          })
          .on('click', function(d,i) {
            dispatch.elementClick({
              value: getY(d,i),
              point: d,
              series: data[d.series],
              pos: [x(getX(d,i)) + (x.rangeBand() * (stacked ? data.length / 2 : d.series + .5) / data.length), y(getY(d,i) + (stacked ? d.y0 : 0))],  // TODO: Figure out why the value appears to be shifted
              pointIndex: i,
              seriesIndex: d.series,
              e: d3.event
            });
            d3.event.stopPropagation();
          })
          .on('dblclick', function(d,i) {
            dispatch.elementDblClick({
              value: getY(d,i),
              point: d,
              series: data[d.series],
              pos: [x(getX(d,i)) + (x.rangeBand() * (stacked ? data.length / 2 : d.series + .5) / data.length), y(getY(d,i) + (stacked ? d.y0 : 0))],  // TODO: Figure out why the value appears to be shifted
              pointIndex: i,
              seriesIndex: d.series,
              e: d3.event
            });
            d3.event.stopPropagation();
          });


      barsEnter.append('text');

      if (showValues && !stacked) {
        bars.select('text')
            .attr('text-anchor', function(d,i) { return getY(d,i) < 0 ? 'end' : 'start' })
            .attr('y', x.rangeBand() / (data.length * 2))
            .attr('dy', '.32em')
            .text(function(d,i) { return valueFormat(getY(d,i)) })
        bars.transition()
          .select('text')
            .attr('x', function(d,i) { return getY(d,i) < 0 ? -4 : y(getY(d,i)) - y(0) + 4 })
      } else {
        bars.selectAll('text').text('');
      }

      if (showBarLabels && !stacked) {
        barsEnter.append('text').classed('nv-bar-label',true);
        bars.select('text.nv-bar-label')
            .attr('text-anchor', function(d,i) { return getY(d,i) < 0 ? 'start' : 'end' })
            .attr('y', x.rangeBand() / (data.length * 2))
            .attr('dy', '.32em')
            .text(function(d,i) { return getX(d,i) });
        bars.transition()
          .select('text.nv-bar-label')
            .attr('x', function(d,i) { return getY(d,i) < 0 ? y(0) - y(getY(d,i)) + 4 : -4 });
      }
      else {
        bars.selectAll('text.nv-bar-label').text('');
      }

      bars
          .attr('class', function(d,i) { return getY(d,i) < 0 ? 'nv-bar negative' : 'nv-bar positive'})

      if (barColor) {
        if (!disabled) disabled = data.map(function() { return true });
        bars
          .style('fill', function(d,i,j) { return d3.rgb(barColor(d,i)).darker(  disabled.map(function(d,i) { return i }).filter(function(d,i){ return !disabled[i]  })[j]   ).toString(); })
          .style('stroke', function(d,i,j) { return d3.rgb(barColor(d,i)).darker(  disabled.map(function(d,i) { return i }).filter(function(d,i){ return !disabled[i]  })[j]   ).toString(); });
      }

      if (stacked)
        bars.transition()
            .attr('transform', function(d,i) {
              return 'translate(' + y(d.y1) + ',' + x(getX(d,i)) + ')'
            })
          .select('rect')
            .attr('width', function(d,i) {
              return Math.abs(y(getY(d,i) + d.y0) - y(d.y0))
            })
            .attr('height', x.rangeBand() );
      else
        bars.transition()
            .attr('transform', function(d,i) {
              //TODO: stacked must be all positive or all negative, not both?
              return 'translate(' +
              (getY(d,i) < 0 ? y(getY(d,i)) : y(0))
              + ',' +
              (d.series * x.rangeBand() / data.length
              +
              x(getX(d,i)) )
              + ')'
            })
          .select('rect')
            .attr('height', x.rangeBand() / data.length )
            .attr('width', function(d,i) {
              return Math.max(Math.abs(y(getY(d,i)) - y(0)),1)
            });


      //store old scales for use in transitions on update
      x0 = x.copy();
      y0 = y.copy();

    });

    return chart;
  }


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  chart.dispatch = dispatch;

  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.x = function(_) {
    if (!arguments.length) return getX;
    getX = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return getY;
    getY = _;
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.xScale = function(_) {
    if (!arguments.length) return x;
    x = _;
    return chart;
  };

  chart.yScale = function(_) {
    if (!arguments.length) return y;
    y = _;
    return chart;
  };

  chart.xDomain = function(_) {
    if (!arguments.length) return xDomain;
    xDomain = _;
    return chart;
  };

  chart.yDomain = function(_) {
    if (!arguments.length) return yDomain;
    yDomain = _;
    return chart;
  };

  chart.xRange = function(_) {
    if (!arguments.length) return xRange;
    xRange = _;
    return chart;
  };

  chart.yRange = function(_) {
    if (!arguments.length) return yRange;
    yRange = _;
    return chart;
  };

  chart.forceY = function(_) {
    if (!arguments.length) return forceY;
    forceY = _;
    return chart;
  };

  chart.stacked = function(_) {
    if (!arguments.length) return stacked;
    stacked = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    return chart;
  };

  chart.barColor = function(_) {
    if (!arguments.length) return barColor;
    barColor = nv.utils.getColor(_);
    return chart;
  };

  chart.disabled = function(_) {
    if (!arguments.length) return disabled;
    disabled = _;
    return chart;
  };

  chart.id = function(_) {
    if (!arguments.length) return id;
    id = _;
    return chart;
  };

  chart.delay = function(_) {
    if (!arguments.length) return delay;
    delay = _;
    return chart;
  };

  chart.showValues = function(_) {
    if (!arguments.length) return showValues;
    showValues = _;
    return chart;
  };

  chart.showBarLabels = function(_) {
    if (!arguments.length) return showBarLabels;
    showBarLabels = _;
    return chart;
  };


  chart.valueFormat= function(_) {
    if (!arguments.length) return valueFormat;
    valueFormat = _;
    return chart;
  };

  chart.valuePadding = function(_) {
    if (!arguments.length) return valuePadding;
    valuePadding = _;
    return chart;
  };

  //============================================================


  return chart;
}

nv.models.multiBarHorizontalChart = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var multibar = nv.models.multiBarHorizontal()
    , xAxis = nv.models.axis()
    , yAxis = nv.models.axis()
    , legend = nv.models.legend().height(30)
    , controls = nv.models.legend().height(30)
    ;

  var margin = {top: 30, right: 20, bottom: 50, left: 60}
    , width = null
    , height = null
    , color = nv.utils.defaultColor()
    , showControls = true
    , showLegend = true
    , showXAxis = true
    , showYAxis = true
    , stacked = false
    , tooltips = true
    , tooltip = function(key, x, y, e, graph) {
        return '<h3>' + key + ' - ' + x + '</h3>' +
               '<p>' +  y + '</p>'
      }
    , x //can be accessed via chart.xScale()
    , y //can be accessed via chart.yScale()
    , state = { stacked: stacked }
    , defaultState = null
    , noData = 'No Data Available.'
    , dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'stateChange', 'changeState')
    , controlWidth = function() { return showControls ? 180 : 0 }
    , transitionDuration = 250
    ;

  multibar
    .stacked(stacked)
    ;
  xAxis
    .orient('left')
    .tickPadding(5)
    .highlightZero(false)
    .showMaxMin(false)
    .tickFormat(function(d) { return d })
    ;
  yAxis
    .orient('bottom')
    .tickFormat(d3.format(',.1f'))
    ;

  controls.updateState(false);
  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var showTooltip = function(e, offsetElement) {
    var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
        top = e.pos[1] + ( offsetElement.offsetTop || 0),
        x = xAxis.tickFormat()(multibar.x()(e.point, e.pointIndex)),
        y = yAxis.tickFormat()(multibar.y()(e.point, e.pointIndex)),
        content = tooltip(e.series.key, x, y, e, chart);

    nv.tooltip.show([left, top], content, e.value < 0 ? 'e' : 'w', null, offsetElement);
  };

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this),
          that = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;

      chart.update = function() { container.transition().duration(transitionDuration).call(chart) };
      chart.container = this;

      //set state.disabled
      state.disabled = data.map(function(d) { return !!d.disabled });

      if (!defaultState) {
        var key;
        defaultState = {};
        for (key in state) {
          if (state[key] instanceof Array)
            defaultState[key] = state[key].slice(0);
          else
            defaultState[key] = state[key];
        }
      }

      //------------------------------------------------------------
      // Display No Data message if there's nothing to show.

      if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', margin.top + availableHeight / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Scales

      x = multibar.xScale();
      y = multibar.yScale();

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-multiBarHorizontalChart').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-multiBarHorizontalChart').append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-x nv-axis');
      gEnter.append('g').attr('class', 'nv-y nv-axis')
            .append('g').attr('class', 'nv-zeroLine')
            .append('line');
      gEnter.append('g').attr('class', 'nv-barsWrap');
      gEnter.append('g').attr('class', 'nv-legendWrap');
      gEnter.append('g').attr('class', 'nv-controlsWrap');

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Legend

      if (showLegend) {
        legend.width(availableWidth - controlWidth());

        if (multibar.barColor())
          data.forEach(function(series,i) {
            series.color = d3.rgb('#ccc').darker(i * 1.5).toString();
          })

        g.select('.nv-legendWrap')
            .datum(data)
            .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;
        }

        g.select('.nv-legendWrap')
            .attr('transform', 'translate(' + controlWidth() + ',' + (-margin.top) +')');
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Controls

      if (showControls) {
        var controlsData = [
          { key: 'Grouped', disabled: multibar.stacked() },
          { key: 'Stacked', disabled: !multibar.stacked() }
        ];

        controls.width(controlWidth()).color(['#444', '#444', '#444']);
        g.select('.nv-controlsWrap')
            .datum(controlsData)
            .attr('transform', 'translate(0,' + (-margin.top) +')')
            .call(controls);
      }

      //------------------------------------------------------------


      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


      //------------------------------------------------------------
      // Main Chart Component(s)

      multibar
        .disabled(data.map(function(series) { return series.disabled }))
        .width(availableWidth)
        .height(availableHeight)
        .color(data.map(function(d,i) {
          return d.color || color(d, i);
        }).filter(function(d,i) { return !data[i].disabled }))


      var barsWrap = g.select('.nv-barsWrap')
          .datum(data.filter(function(d) { return !d.disabled }))

      barsWrap.transition().call(multibar);

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Axes

      if (showXAxis) {
          xAxis
            .scale(x)
            .ticks( availableHeight / 24 )
            .tickSize(-availableWidth, 0);

          g.select('.nv-x.nv-axis').transition()
              .call(xAxis);

          var xTicks = g.select('.nv-x.nv-axis').selectAll('g');

          xTicks
              .selectAll('line, text');
      }

      if (showYAxis) {
          yAxis
            .scale(y)
            .ticks( availableWidth / 100 )
            .tickSize( -availableHeight, 0);

          g.select('.nv-y.nv-axis')
              .attr('transform', 'translate(0,' + availableHeight + ')');
          g.select('.nv-y.nv-axis').transition()
              .call(yAxis);
      }

      // Zero line
      g.select(".nv-zeroLine line")
        .attr("x1", y(0))
        .attr("x2", y(0))
        .attr("y1", 0)
        .attr("y2", -availableHeight)
        ;

      //------------------------------------------------------------



      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------

      legend.dispatch.on('stateChange', function(newState) {
        state = newState;
        dispatch.stateChange(state);
        chart.update();
      });

      controls.dispatch.on('legendClick', function(d,i) {
        if (!d.disabled) return;
        controlsData = controlsData.map(function(s) {
          s.disabled = true;
          return s;
        });
        d.disabled = false;

        switch (d.key) {
          case 'Grouped':
            multibar.stacked(false);
            break;
          case 'Stacked':
            multibar.stacked(true);
            break;
        }

        state.stacked = multibar.stacked();
        dispatch.stateChange(state);

        chart.update();
      });

      dispatch.on('tooltipShow', function(e) {
        if (tooltips) showTooltip(e, that.parentNode);
      });

      // Update chart from a state object passed to event handler
      dispatch.on('changeState', function(e) {

        if (typeof e.disabled !== 'undefined') {
          data.forEach(function(series,i) {
            series.disabled = e.disabled[i];
          });

          state.disabled = e.disabled;
        }

        if (typeof e.stacked !== 'undefined') {
          multibar.stacked(e.stacked);
          state.stacked = e.stacked;
        }

        chart.update();
      });
      //============================================================


    });

    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  multibar.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  multibar.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });
  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.dispatch = dispatch;
  chart.multibar = multibar;
  chart.legend = legend;
  chart.xAxis = xAxis;
  chart.yAxis = yAxis;

  d3.rebind(chart, multibar, 'x', 'y', 'xDomain', 'yDomain', 'xRange', 'yRange', 'forceX', 'forceY',
    'clipEdge', 'id', 'delay', 'showValues','showBarLabels', 'valueFormat', 'stacked', 'barColor');

  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    legend.color(color);
    return chart;
  };

  chart.showControls = function(_) {
    if (!arguments.length) return showControls;
    showControls = _;
    return chart;
  };

  chart.showLegend = function(_) {
    if (!arguments.length) return showLegend;
    showLegend = _;
    return chart;
  };

  chart.showXAxis = function(_) {
    if (!arguments.length) return showXAxis;
    showXAxis = _;
    return chart;
  };

  chart.showYAxis = function(_) {
    if (!arguments.length) return showYAxis;
    showYAxis = _;
    return chart;
  };

  chart.tooltip = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.state = function(_) {
    if (!arguments.length) return state;
    state = _;
    return chart;
  };

  chart.defaultState = function(_) {
    if (!arguments.length) return defaultState;
    defaultState = _;
    return chart;
  };

  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  chart.transitionDuration = function(_) {
    if (!arguments.length) return transitionDuration;
    transitionDuration = _;
    return chart;
  };
  //============================================================
  return chart;
}
nv.models.multiChart = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var margin = {top: 30, right: 20, bottom: 50, left: 60},
      color = d3.scale.category20().range(),
      width = null, 
      height = null,
      showLegend = true,
      tooltips = true,
      tooltip = function(key, x, y, e, graph) {
        return '<h3>' + key + '</h3>' +
               '<p>' +  y + ' at ' + x + '</p>'
      },
      x,
      y,
      yDomain1,
      yDomain2
      ; //can be accessed via chart.lines.[x/y]Scale()

  //============================================================
  // Private Variables
  //------------------------------------------------------------



  var x = d3.scale.linear(),
      yScale1 = d3.scale.linear(),
      yScale2 = d3.scale.linear(),

      lines1 = nv.models.line().yScale(yScale1),
      lines2 = nv.models.line().yScale(yScale2),

      bars1 = nv.models.multiBar().stacked(false).yScale(yScale1),
      bars2 = nv.models.multiBar().stacked(false).yScale(yScale2),

      stack1 = nv.models.multiBar().stacked(true).yScale(yScale1),
      stack2 = nv.models.multiBar().stacked(true).yScale(yScale2),

      xAxis = nv.models.axis().scale(x).orient('bottom').tickPadding(5),
      yAxis1 = nv.models.axis().scale(yScale1).orient('left'),
      yAxis2 = nv.models.axis().scale(yScale2).orient('right'),

      legend = nv.models.legend().height(30),
      dispatch = d3.dispatch('tooltipShow', 'tooltipHide');

  var showTooltip = function(e, offsetElement) {
    var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
        top = e.pos[1] + ( offsetElement.offsetTop || 0),
        x = xAxis.tickFormat()(lines1.x()(e.point, e.pointIndex)),
        y = ((e.series.yAxis == 2) ? yAxis2 : yAxis1).tickFormat()(lines1.y()(e.point, e.pointIndex)),
        content = tooltip(e.series.key, x, y, e, chart);

    nv.tooltip.show([left, top], content, undefined, undefined, offsetElement.offsetParent);
  };

  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this),
          that = this;

      chart.update = function() { container.transition().call(chart); };
      chart.container = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - (margin.left ||60) - (margin.right ||20),
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - (margin.top||30) - (margin.bottom ||50);

      var dataLines1 = data.filter(function(d) {return  d.type == 'line' && d.yAxis == 1})
      var dataLines2 = data.filter(function(d) {return  d.type == 'line' && d.yAxis == 2})
      var dataBars1 = data.filter(function(d) {return  d.type == 'bar' && d.yAxis == 1})
      var dataBars2 = data.filter(function(d) {return  d.type == 'bar' && d.yAxis == 2})
      var dataStack1 = data.filter(function(d) {return d.type == 'stackedbar' && d.yAxis == 1})
      var dataStack2 = data.filter(function(d) {return  d.type == 'stackedbar' && d.yAxis == 2})



      var series1 = data.filter(function(d) {return !d.disabled && d.yAxis == 1})
            .map(function(d) {
              return d.values.map(function(d,i) {
                return { x: d.x, y: d.y }
              })
            })

      var series2 = data.filter(function(d) {return !d.disabled && d.yAxis == 2})
            .map(function(d) {
              return d.values.map(function(d,i) {
                return { x: d.x, y: d.y }
              })
            })

      x   .domain(d3.extent(d3.merge(series1.concat(series2)), function(d) { return d.x } ))
          .range([0, availableWidth]);

      var wrap = container.selectAll('g.wrap.multiChart').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'wrap nvd3 multiChart').append('g');

      gEnter.append('g').attr('class', 'x axis');
      gEnter.append('g').attr('class', 'y1 axis');
      gEnter.append('g').attr('class', 'y2 axis');
      gEnter.append('g').attr('class', 'lines1Wrap');
      gEnter.append('g').attr('class', 'lines2Wrap');
      gEnter.append('g').attr('class', 'bars1Wrap');
      gEnter.append('g').attr('class', 'bars2Wrap');
      gEnter.append('g').attr('class', 'stack1Wrap');
      gEnter.append('g').attr('class', 'stack2Wrap');
      gEnter.append('g').attr('class', 'legendWrap');

      var g = wrap.select('g');

      if (showLegend) {
        legend.width( availableWidth / 2 );

        g.select('.legendWrap')
            .datum(data.map(function(series) { 
              series.originalKey = series.originalKey === undefined ? series.key : series.originalKey;
              series.key = series.originalKey + (series.yAxis == 1 ? '' : ' (right axis)');
              return series;
            }))
          .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - (margin.top||30) - (margin.bottom ||50);
        }

        g.select('.legendWrap')
            .attr('transform', 'translate(' + ( availableWidth / 2 ) + ',' + (-margin.top) +')');
      }


      lines1
        .width(availableWidth)
        .height(availableHeight)
        .interpolate("monotone")
        .color(data.map(function(d,i) {
          return d.color || color[i % color.length];
        }).filter(function(d,i) { return !data[i].disabled && data[i].yAxis == 1 && data[i].type == 'line'}));

      lines2
        .width(availableWidth)
        .height(availableHeight)
        .interpolate("monotone")
        .color(data.map(function(d,i) {
          return d.color || color[i % color.length];
        }).filter(function(d,i) { return !data[i].disabled && data[i].yAxis == 2 && data[i].type == 'line'}));

      bars1
        .width(availableWidth)
        .height(availableHeight)
        .color(data.map(function(d,i) {
          return d.color || color[i % color.length];
        }).filter(function(d,i) { return !data[i].disabled && data[i].yAxis == 1 && data[i].type == 'bar'}));

      bars2
        .width(availableWidth)
        .height(availableHeight)
        .color(data.map(function(d,i) {
          return d.color || color[i % color.length];
        }).filter(function(d,i) { return !data[i].disabled && data[i].yAxis == 2 && data[i].type == 'bar'}));

      stack1
        .width(availableWidth)
        .height(availableHeight)
        .color(data.map(function(d,i) {
          return d.color || color[i % color.length];
        }).filter(function(d,i) { return !data[i].disabled && data[i].yAxis == 1 && data[i].type == 'stackedbar'}));

      stack2
        .width(availableWidth)
        .height(availableHeight)
        .color(data.map(function(d,i) {
          return d.color || color[i % color.length];
        }).filter(function(d,i) { return !data[i].disabled && data[i].yAxis == 2 && data[i].type == 'stackedbar'}));

      g.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


      var lines1Wrap = g.select('.lines1Wrap')
          .datum(dataLines1.filter(function(d){return !d.disabled}))
      var bars1Wrap = g.select('.bars1Wrap')
          .datum(dataBars1.filter(function(d){return !d.disabled}))
      var stack1Wrap = g.select('.stack1Wrap')
          .datum(dataStack1.filter(function(d){return !d.disabled}))

      var lines2Wrap = g.select('.lines2Wrap')
          .datum(dataLines2.filter(function(d){return !d.disabled}))
      var bars2Wrap = g.select('.bars2Wrap')
          .datum(dataBars2.filter(function(d){return !d.disabled}))
      var stack2Wrap = g.select('.stack2Wrap')
          .datum(dataStack2.filter(function(d){return !d.disabled}))

      var extraValue1 = dataStack1.length ? dataStack1.map(function(a){return a.values}).reduce(function(a,b){
        return a.map(function(aVal,i){return {x: aVal.x, y: aVal.y + b[i].y}})
      }).concat([{x:0, y:0}]) : []
      var extraValue2 = dataStack2.length ? dataStack2.map(function(a){return a.values}).reduce(function(a,b){
        return a.map(function(aVal,i){return {x: aVal.x, y: aVal.y + b[i].y}})
      }).concat([{x:0, y:0}]) : []

      yScale1 .domain(yDomain1 || d3.extent(d3.merge(series1).concat(extraValue1), function(d) { return d.y } ))
              .range([0, availableHeight])

      yScale2 .domain(yDomain2 || d3.extent(d3.merge(series2).concat(extraValue2), function(d) { return d.y } ))
              .range([0, availableHeight])

      lines1.yDomain(yScale1.domain())
      bars1.yDomain(yScale1.domain())
      stack1.yDomain(yScale1.domain())

      lines2.yDomain(yScale2.domain())
      bars2.yDomain(yScale2.domain())
      stack2.yDomain(yScale2.domain())

      if(dataStack1.length){d3.transition(stack1Wrap).call(stack1);}
      if(dataStack2.length){d3.transition(stack2Wrap).call(stack2);}

      if(dataBars1.length){d3.transition(bars1Wrap).call(bars1);}
      if(dataBars2.length){d3.transition(bars2Wrap).call(bars2);}

      if(dataLines1.length){d3.transition(lines1Wrap).call(lines1);}
      if(dataLines2.length){d3.transition(lines2Wrap).call(lines2);}
      


      xAxis
        .ticks( availableWidth / 100 )
        .tickSize(-availableHeight, 0);

      g.select('.x.axis')
          .attr('transform', 'translate(0,' + availableHeight + ')');
      d3.transition(g.select('.x.axis'))
          .call(xAxis);

      yAxis1
        .ticks( availableHeight / 36 )
        .tickSize( -availableWidth, 0);


      d3.transition(g.select('.y1.axis'))
          .call(yAxis1);

      yAxis2
        .ticks( availableHeight / 36 )
        .tickSize( -availableWidth, 0);

      d3.transition(g.select('.y2.axis'))
          .call(yAxis2);

      g.select('.y2.axis')
          .style('opacity', series2.length ? 1 : 0)
          .attr('transform', 'translate(' + x.range()[1] + ',0)');

      legend.dispatch.on('stateChange', function(newState) { 
        chart.update();
      });
     
      dispatch.on('tooltipShow', function(e) {
        if (tooltips) showTooltip(e, that.parentNode);
      });

    });

    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  lines1.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  lines1.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  lines2.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  lines2.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  bars1.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  bars1.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  bars2.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  bars2.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  stack1.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  stack1.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  stack2.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  stack2.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });
  // stack1.dispatch.on('tooltipShow', function(e) {
  //   //disable tooltips when value ~= 0
  //   //// TODO: consider removing points from voronoi that have 0 value instead of this hack
  //   if (!Math.round(stack1.y()(e.point) * 100)) {  // 100 will not be good for very small numbers... will have to think about making this valu dynamic, based on data range
  //     setTimeout(function() { d3.selectAll('.point.hover').classed('hover', false) }, 0);
  //     return false;
  //   }

  //   e.pos = [e.pos[0] + margin.left, e.pos[1] + margin.top],
  //   dispatch.tooltipShow(e);
  // });

  // stack1.dispatch.on('tooltipHide', function(e) {
  //   dispatch.tooltipHide(e);
  // });

  // stack2.dispatch.on('tooltipShow', function(e) {
  //   //disable tooltips when value ~= 0
  //   //// TODO: consider removing points from voronoi that have 0 value instead of this hack
  //   if (!Math.round(stack2.y()(e.point) * 100)) {  // 100 will not be good for very small numbers... will have to think about making this valu dynamic, based on data range
  //     setTimeout(function() { d3.selectAll('.point.hover').classed('hover', false) }, 0);
  //     return false;
  //   }

  //   e.pos = [e.pos[0] + margin.left, e.pos[1] + margin.top],
  //   dispatch.tooltipShow(e);
  // });

  // stack2.dispatch.on('tooltipHide', function(e) {
  //   dispatch.tooltipHide(e);
  // });

    lines1.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  lines1.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  lines2.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  lines2.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);
  });

  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });



  //============================================================
  // Global getters and setters
  //------------------------------------------------------------

  chart.dispatch = dispatch;
  chart.lines1 = lines1;
  chart.lines2 = lines2;
  chart.bars1 = bars1;
  chart.bars2 = bars2;
  chart.stack1 = stack1;
  chart.stack2 = stack2;
  chart.xAxis = xAxis;
  chart.yAxis1 = yAxis1;
  chart.yAxis2 = yAxis2;
  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.x = function(_) {
    if (!arguments.length) return getX;
    getX = _;
    lines1.x(_);
    bars1.x(_);
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return getY;
    getY = _;
    lines1.y(_);
    bars1.y(_);
    return chart;
  };

  chart.yDomain1 = function(_) {
    if (!arguments.length) return yDomain1;
    yDomain1 = _;
    return chart;
  };

  chart.yDomain2 = function(_) {
    if (!arguments.length) return yDomain2;
    yDomain2 = _;
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = _;
    legend.color(_);
    return chart;
  };

  chart.showLegend = function(_) {
    if (!arguments.length) return showLegend;
    showLegend = _;
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  return chart;
}


nv.models.ohlcBar = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var margin = {top: 0, right: 0, bottom: 0, left: 0}
    , width = 960
    , height = 500
    , id = Math.floor(Math.random() * 10000) //Create semi-unique ID in case user doesn't select one
    , x = d3.scale.linear()
    , y = d3.scale.linear()
    , getX = function(d) { return d.x }
    , getY = function(d) { return d.y }
    , getOpen = function(d) { return d.open }
    , getClose = function(d) { return d.close }
    , getHigh = function(d) { return d.high }
    , getLow = function(d) { return d.low }
    , forceX = []
    , forceY = []
    , padData     = false // If true, adds half a data points width to front and back, for lining up a line chart with a bar chart
    , clipEdge = true
    , color = nv.utils.defaultColor()
    , xDomain
    , yDomain
    , xRange
    , yRange
    , dispatch = d3.dispatch('chartClick', 'elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout')
    ;

  //============================================================

  //============================================================
  // Private Variables
  //------------------------------------------------------------

  //TODO: store old scales for transitions

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var availableWidth = width - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom,
          container = d3.select(this);


      //------------------------------------------------------------
      // Setup Scales

      x   .domain(xDomain || d3.extent(data[0].values.map(getX).concat(forceX) ));

      if (padData)
        x.range(xRange || [availableWidth * .5 / data[0].values.length, availableWidth * (data[0].values.length - .5)  / data[0].values.length ]);
      else
        x.range(xRange || [0, availableWidth]);

      y   .domain(yDomain || [
            d3.min(data[0].values.map(getLow).concat(forceY)),
            d3.max(data[0].values.map(getHigh).concat(forceY))
          ])
          .range(yRange || [availableHeight, 0]);

      // If scale's domain don't have a range, slightly adjust to make one... so a chart can show a single data point
      if (x.domain()[0] === x.domain()[1])
        x.domain()[0] ?
            x.domain([x.domain()[0] - x.domain()[0] * 0.01, x.domain()[1] + x.domain()[1] * 0.01])
          : x.domain([-1,1]);

      if (y.domain()[0] === y.domain()[1])
        y.domain()[0] ?
            y.domain([y.domain()[0] + y.domain()[0] * 0.01, y.domain()[1] - y.domain()[1] * 0.01])
          : y.domain([-1,1]);

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = d3.select(this).selectAll('g.nv-wrap.nv-ohlcBar').data([data[0].values]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-ohlcBar');
      var defsEnter = wrapEnter.append('defs');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-ticks');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      //------------------------------------------------------------


      container
          .on('click', function(d,i) {
            dispatch.chartClick({
                data: d,
                index: i,
                pos: d3.event,
                id: id
            });
          });


      defsEnter.append('clipPath')
          .attr('id', 'nv-chart-clip-path-' + id)
        .append('rect');

      wrap.select('#nv-chart-clip-path-' + id + ' rect')
          .attr('width', availableWidth)
          .attr('height', availableHeight);

      g   .attr('clip-path', clipEdge ? 'url(#nv-chart-clip-path-' + id + ')' : '');



      var ticks = wrap.select('.nv-ticks').selectAll('.nv-tick')
          .data(function(d) { return d });

      ticks.exit().remove();


      var ticksEnter = ticks.enter().append('path')
          .attr('class', function(d,i,j) { return (getOpen(d,i) > getClose(d,i) ? 'nv-tick negative' : 'nv-tick positive') + ' nv-tick-' + j + '-' + i })
          .attr('d', function(d,i) {
            var w = (availableWidth / data[0].values.length) * .9;
            return 'm0,0l0,'
                 + (y(getOpen(d,i))
                 - y(getHigh(d,i)))
                 + 'l'
                 + (-w/2)
                 + ',0l'
                 + (w/2)
                 + ',0l0,'
                 + (y(getLow(d,i)) - y(getOpen(d,i)))
                 + 'l0,'
                 + (y(getClose(d,i))
                 - y(getLow(d,i)))
                 + 'l'
                 + (w/2)
                 + ',0l'
                 + (-w/2)
                 + ',0z';
          })
          .attr('transform', function(d,i) { return 'translate(' + x(getX(d,i)) + ',' + y(getHigh(d,i)) + ')'; })
          //.attr('fill', function(d,i) { return color[0]; })
          //.attr('stroke', function(d,i) { return color[0]; })
          //.attr('x', 0 )
          //.attr('y', function(d,i) {  return y(Math.max(0, getY(d,i))) })
          //.attr('height', function(d,i) { return Math.abs(y(getY(d,i)) - y(0)) })
          .on('mouseover', function(d,i) {
            d3.select(this).classed('hover', true);
            dispatch.elementMouseover({
                point: d,
                series: data[0],
                pos: [x(getX(d,i)), y(getY(d,i))],  // TODO: Figure out why the value appears to be shifted
                pointIndex: i,
                seriesIndex: 0,
                e: d3.event
            });

          })
          .on('mouseout', function(d,i) {
                d3.select(this).classed('hover', false);
                dispatch.elementMouseout({
                    point: d,
                    series: data[0],
                    pointIndex: i,
                    seriesIndex: 0,
                    e: d3.event
                });
          })
          .on('click', function(d,i) {
                dispatch.elementClick({
                    //label: d[label],
                    value: getY(d,i),
                    data: d,
                    index: i,
                    pos: [x(getX(d,i)), y(getY(d,i))],
                    e: d3.event,
                    id: id
                });
              d3.event.stopPropagation();
          })
          .on('dblclick', function(d,i) {
              dispatch.elementDblClick({
                  //label: d[label],
                  value: getY(d,i),
                  data: d,
                  index: i,
                  pos: [x(getX(d,i)), y(getY(d,i))],
                  e: d3.event,
                  id: id
              });
              d3.event.stopPropagation();
          });

      ticks
          .attr('class', function(d,i,j) { return (getOpen(d,i) > getClose(d,i) ? 'nv-tick negative' : 'nv-tick positive') + ' nv-tick-' + j + '-' + i })
      d3.transition(ticks)
          .attr('transform', function(d,i) { return 'translate(' + x(getX(d,i)) + ',' + y(getHigh(d,i)) + ')'; })
          .attr('d', function(d,i) {
            var w = (availableWidth / data[0].values.length) * .9;
            return 'm0,0l0,'
                 + (y(getOpen(d,i))
                 - y(getHigh(d,i)))
                 + 'l'
                 + (-w/2)
                 + ',0l'
                 + (w/2)
                 + ',0l0,'
                 + (y(getLow(d,i))
                 - y(getOpen(d,i)))
                 + 'l0,'
                 + (y(getClose(d,i))
                 - y(getLow(d,i)))
                 + 'l'
                 + (w/2)
                 + ',0l'
                 + (-w/2)
                 + ',0z';
          })
          //.attr('width', (availableWidth / data[0].values.length) * .9 )


      //d3.transition(ticks)
          //.attr('y', function(d,i) {  return y(Math.max(0, getY(d,i))) })
          //.attr('height', function(d,i) { return Math.abs(y(getY(d,i)) - y(0)) });
          //.order();  // not sure if this makes any sense for this model

    });

    return chart;
  }


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  chart.dispatch = dispatch;

  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.x = function(_) {
    if (!arguments.length) return getX;
    getX = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return getY;
    getY = _;
    return chart;
  };

  chart.open = function(_) {
    if (!arguments.length) return getOpen;
    getOpen = _;
    return chart;
  };

  chart.close = function(_) {
    if (!arguments.length) return getClose;
    getClose = _;
    return chart;
  };

  chart.high = function(_) {
    if (!arguments.length) return getHigh;
    getHigh = _;
    return chart;
  };

  chart.low = function(_) {
    if (!arguments.length) return getLow;
    getLow = _;
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.xScale = function(_) {
    if (!arguments.length) return x;
    x = _;
    return chart;
  };

  chart.yScale = function(_) {
    if (!arguments.length) return y;
    y = _;
    return chart;
  };

  chart.xDomain = function(_) {
    if (!arguments.length) return xDomain;
    xDomain = _;
    return chart;
  };

  chart.yDomain = function(_) {
    if (!arguments.length) return yDomain;
    yDomain = _;
    return chart;
  };

  chart.xRange = function(_) {
    if (!arguments.length) return xRange;
    xRange = _;
    return chart;
  };

  chart.yRange = function(_) {
    if (!arguments.length) return yRange;
    yRange = _;
    return chart;
  };

  chart.forceX = function(_) {
    if (!arguments.length) return forceX;
    forceX = _;
    return chart;
  };

  chart.forceY = function(_) {
    if (!arguments.length) return forceY;
    forceY = _;
    return chart;
  };

  chart.padData = function(_) {
    if (!arguments.length) return padData;
    padData = _;
    return chart;
  };

  chart.clipEdge = function(_) {
    if (!arguments.length) return clipEdge;
    clipEdge = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    return chart;
  };

  chart.id = function(_) {
    if (!arguments.length) return id;
    id = _;
    return chart;
  };

  //============================================================


  return chart;
}
nv.models.pie = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var margin = {top: 0, right: 0, bottom: 0, left: 0}
    , width = 500
    , height = 500
    , getX = function(d) { return d.x }
    , getY = function(d) { return d.y }
    , getDescription = function(d) { return d.description }
    , id = Math.floor(Math.random() * 10000) //Create semi-unique ID in case user doesn't select one
    , color = nv.utils.defaultColor()
    , valueFormat = d3.format(',.2f')
    , showLabels = true
    , pieLabelsOutside = true
    , donutLabelsOutside = false
    , labelType = "key"
    , labelThreshold = .02 //if slice percentage is under this, don't show label
    , donut = false
    , labelSunbeamLayout = false
    , startAngle = false
    , endAngle = false
    , donutRatio = 0.5
    , dispatch = d3.dispatch('chartClick', 'elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout')
    ;

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var availableWidth = width - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom,
          radius = Math.min(availableWidth, availableHeight) / 2,
          arcRadius = radius-(radius / 5),
          container = d3.select(this);


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      //var wrap = container.selectAll('.nv-wrap.nv-pie').data([data]);
      var wrap = container.selectAll('.nv-wrap.nv-pie').data(data);
      var wrapEnter = wrap.enter().append('g').attr('class','nvd3 nv-wrap nv-pie nv-chart-' + id);
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-pie');
      gEnter.append('g').attr('class', 'nv-pieLabels');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      g.select('.nv-pie').attr('transform', 'translate(' + availableWidth / 2 + ',' + availableHeight / 2 + ')');
      g.select('.nv-pieLabels').attr('transform', 'translate(' + availableWidth / 2 + ',' + availableHeight / 2 + ')');

      //------------------------------------------------------------


      container
          .on('click', function(d,i) {
              dispatch.chartClick({
                  data: d,
                  index: i,
                  pos: d3.event,
                  id: id
              });
          });


      var arc = d3.svg.arc()
                  .outerRadius(arcRadius);

      if (startAngle) arc.startAngle(startAngle)
      if (endAngle) arc.endAngle(endAngle);
      if (donut) arc.innerRadius(radius * donutRatio);

      // Setup the Pie chart and choose the data element
      var pie = d3.layout.pie()
          .sort(null)
          .value(function(d) { return d.disabled ? 0 : getY(d) });

      var slices = wrap.select('.nv-pie').selectAll('.nv-slice')
          .data(pie);

      var pieLabels = wrap.select('.nv-pieLabels').selectAll('.nv-label')
          .data(pie);

      slices.exit().remove();
      pieLabels.exit().remove();

      var ae = slices.enter().append('g')
              .attr('class', 'nv-slice')
              .on('mouseover', function(d,i){
                d3.select(this).classed('hover', true);
                dispatch.elementMouseover({
                    label: getX(d.data),
                    value: getY(d.data),
                    point: d.data,
                    pointIndex: i,
                    pos: [d3.event.pageX, d3.event.pageY],
                    id: id
                });
              })
              .on('mouseout', function(d,i){
                d3.select(this).classed('hover', false);
                dispatch.elementMouseout({
                    label: getX(d.data),
                    value: getY(d.data),
                    point: d.data,
                    index: i,
                    id: id
                });
              })
              .on('click', function(d,i) {
                dispatch.elementClick({
                    label: getX(d.data),
                    value: getY(d.data),
                    point: d.data,
                    index: i,
                    pos: d3.event,
                    id: id
                });
                d3.event.stopPropagation();
              })
              .on('dblclick', function(d,i) {
                dispatch.elementDblClick({
                    label: getX(d.data),
                    value: getY(d.data),
                    point: d.data,
                    index: i,
                    pos: d3.event,
                    id: id
                });
                d3.event.stopPropagation();
              });

        slices
            .attr('fill', function(d,i) { return color(d, i); })
            .attr('stroke', function(d,i) { return color(d, i); });

        var paths = ae.append('path')
            .each(function(d) { this._current = d; });
            //.attr('d', arc);

        slices.select('path')
          .transition()
            .attr('d', arc)
            .attrTween('d', arcTween);

        if (showLabels) {
          // This does the normal label
          var labelsArc = d3.svg.arc().innerRadius(0);

          if (pieLabelsOutside){ labelsArc = arc; }

          if (donutLabelsOutside) { labelsArc = d3.svg.arc().outerRadius(arc.outerRadius()); }

          pieLabels.enter().append("g").classed("nv-label",true)
            .each(function(d,i) {
                var group = d3.select(this);

                group
                  .attr('transform', function(d) {
                       if (labelSunbeamLayout) {
                         d.outerRadius = arcRadius + 10; // Set Outer Coordinate
                         d.innerRadius = arcRadius + 15; // Set Inner Coordinate
                         var rotateAngle = (d.startAngle + d.endAngle) / 2 * (180 / Math.PI);
                         if ((d.startAngle+d.endAngle)/2 < Math.PI) {
                           rotateAngle -= 90;
                         } else {
                           rotateAngle += 90;
                         }
                         return 'translate(' + labelsArc.centroid(d) + ') rotate(' + rotateAngle + ')';
                       } else {
                         d.outerRadius = radius + 10; // Set Outer Coordinate
                         d.innerRadius = radius + 15; // Set Inner Coordinate
                         return 'translate(' + labelsArc.centroid(d) + ')'
                       }
                  });

                group.append('rect')
                    .style('stroke', '#fff')
                    .style('fill', '#fff')
                    .attr("rx", 3)
                    .attr("ry", 3);

                group.append('text')
                    .style('text-anchor', labelSunbeamLayout ? ((d.startAngle + d.endAngle) / 2 < Math.PI ? 'start' : 'end') : 'middle') //center the text on it's origin or begin/end if orthogonal aligned
                    .style('fill', '#000')

            });

          var labelLocationHash = {};
          var avgHeight = 14;
          var avgWidth = 140;
          var createHashKey = function(coordinates) {

              return Math.floor(coordinates[0]/avgWidth) * avgWidth + ',' + Math.floor(coordinates[1]/avgHeight) * avgHeight;
          };
          pieLabels.transition()
                .attr('transform', function(d) {
                  if (labelSunbeamLayout) {
                      d.outerRadius = arcRadius + 10; // Set Outer Coordinate
                      d.innerRadius = arcRadius + 15; // Set Inner Coordinate
                      var rotateAngle = (d.startAngle + d.endAngle) / 2 * (180 / Math.PI);
                      if ((d.startAngle+d.endAngle)/2 < Math.PI) {
                        rotateAngle -= 90;
                      } else {
                        rotateAngle += 90;
                      }
                      return 'translate(' + labelsArc.centroid(d) + ') rotate(' + rotateAngle + ')';
                    } else {
                      d.outerRadius = radius + 10; // Set Outer Coordinate
                      d.innerRadius = radius + 15; // Set Inner Coordinate

                      /*
                      Overlapping pie labels are not good. What this attempts to do is, prevent overlapping.
                      Each label location is hashed, and if a hash collision occurs, we assume an overlap.
                      Adjust the label's y-position to remove the overlap.
                      */
                      var center = labelsArc.centroid(d);
                      var hashKey = createHashKey(center);
                      if (labelLocationHash[hashKey]) {
                        center[1] -= avgHeight;
                      }
                      labelLocationHash[createHashKey(center)] = true;
                      return 'translate(' + center + ')'
                    }
                });
          pieLabels.select(".nv-label text")
                .style('text-anchor', labelSunbeamLayout ? ((d.startAngle + d.endAngle) / 2 < Math.PI ? 'start' : 'end') : 'middle') //center the text on it's origin or begin/end if orthogonal aligned
                .text(function(d, i) {
                  var percent = (d.endAngle - d.startAngle) / (2 * Math.PI);
                  var labelTypes = {
                    "key" : getX(d.data),
                    "value": getY(d.data),
                    "percent": d3.format('%')(percent)
                  };
                  return (d.value && percent > labelThreshold) ? labelTypes[labelType] : '';
                });
        }


        // Computes the angle of an arc, converting from radians to degrees.
        function angle(d) {
          var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
          return a > 90 ? a - 180 : a;
        }

        function arcTween(a) {
          a.endAngle = isNaN(a.endAngle) ? 0 : a.endAngle;
          a.startAngle = isNaN(a.startAngle) ? 0 : a.startAngle;
          if (!donut) a.innerRadius = 0;
          var i = d3.interpolate(this._current, a);
          this._current = i(0);
          return function(t) {
            return arc(i(t));
          };
        }

        function tweenPie(b) {
          b.innerRadius = 0;
          var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
          return function(t) {
              return arc(i(t));
          };
        }

    });

    return chart;
  }


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  chart.dispatch = dispatch;
  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.values = function(_) {
    nv.log("pie.values() is no longer supported.");
    return chart;
  };

  chart.x = function(_) {
    if (!arguments.length) return getX;
    getX = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return getY;
    getY = d3.functor(_);
    return chart;
  };

  chart.description = function(_) {
    if (!arguments.length) return getDescription;
    getDescription = _;
    return chart;
  };

  chart.showLabels = function(_) {
    if (!arguments.length) return showLabels;
    showLabels = _;
    return chart;
  };

  chart.labelSunbeamLayout = function(_) {
    if (!arguments.length) return labelSunbeamLayout;
    labelSunbeamLayout = _;
    return chart;
  };

  chart.donutLabelsOutside = function(_) {
    if (!arguments.length) return donutLabelsOutside;
    donutLabelsOutside = _;
    return chart;
  };

  chart.pieLabelsOutside = function(_) {
    if (!arguments.length) return pieLabelsOutside;
    pieLabelsOutside = _;
    return chart;
  };

  chart.labelType = function(_) {
    if (!arguments.length) return labelType;
    labelType = _;
    labelType = labelType || "key";
    return chart;
  };

  chart.donut = function(_) {
    if (!arguments.length) return donut;
    donut = _;
    return chart;
  };

  chart.donutRatio = function(_) {
    if (!arguments.length) return donutRatio;
    donutRatio = _;
    return chart;
  };

  chart.startAngle = function(_) {
    if (!arguments.length) return startAngle;
    startAngle = _;
    return chart;
  };

  chart.endAngle = function(_) {
    if (!arguments.length) return endAngle;
    endAngle = _;
    return chart;
  };

  chart.id = function(_) {
    if (!arguments.length) return id;
    id = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    return chart;
  };

  chart.valueFormat = function(_) {
    if (!arguments.length) return valueFormat;
    valueFormat = _;
    return chart;
  };

  chart.labelThreshold = function(_) {
    if (!arguments.length) return labelThreshold;
    labelThreshold = _;
    return chart;
  };
  //============================================================


  return chart;
}
nv.models.pieChart = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var pie = nv.models.pie()
    , legend = nv.models.legend()
    ;

  var margin = {top: 30, right: 20, bottom: 20, left: 20}
    , width = null
    , height = null
    , showLegend = true
    , color = nv.utils.defaultColor()
    , tooltips = true
    , tooltip = function(key, y, e, graph) {
        return '<h3>' + key + '</h3>' +
               '<p>' +  y + '</p>'
      }
    , state = {}
    , defaultState = null
    , noData = "No Data Available."
    , dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'stateChange', 'changeState')
    ;

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var showTooltip = function(e, offsetElement) {
    var tooltipLabel = pie.description()(e.point) || pie.x()(e.point)
    var left = e.pos[0] + ( (offsetElement && offsetElement.offsetLeft) || 0 ),
        top = e.pos[1] + ( (offsetElement && offsetElement.offsetTop) || 0),
        y = pie.valueFormat()(pie.y()(e.point)),
        content = tooltip(tooltipLabel, y, e, chart);

    nv.tooltip.show([left, top], content, e.value < 0 ? 'n' : 's', null, offsetElement);
  };

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this),
          that = this;

      var availableWidth = (width || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;

      chart.update = function() { container.transition().call(chart); };
      chart.container = this;

      //set state.disabled
      state.disabled = data.map(function(d) { return !!d.disabled });

      if (!defaultState) {
        var key;
        defaultState = {};
        for (key in state) {
          if (state[key] instanceof Array)
            defaultState[key] = state[key].slice(0);
          else
            defaultState[key] = state[key];
        }
      }

      //------------------------------------------------------------
      // Display No Data message if there's nothing to show.

      if (!data || !data.length) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', margin.top + availableHeight / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-pieChart').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-pieChart').append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-pieWrap');
      gEnter.append('g').attr('class', 'nv-legendWrap');

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Legend

      if (showLegend) {
        legend
          .width( availableWidth )
          .key(pie.x());

        wrap.select('.nv-legendWrap')
            .datum(data)
            .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;
        }

        wrap.select('.nv-legendWrap')
            .attr('transform', 'translate(0,' + (-margin.top) +')');
      }

      //------------------------------------------------------------


      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


      //------------------------------------------------------------
      // Main Chart Component(s)

      pie
        .width(availableWidth)
        .height(availableHeight);


      var pieWrap = g.select('.nv-pieWrap')
          .datum([data]);

      d3.transition(pieWrap).call(pie);

      //------------------------------------------------------------


      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------

      legend.dispatch.on('stateChange', function(newState) {
        state = newState;
        dispatch.stateChange(state);
        chart.update();
      });

      pie.dispatch.on('elementMouseout.tooltip', function(e) {
        dispatch.tooltipHide(e);
      });

      // Update chart from a state object passed to event handler
      dispatch.on('changeState', function(e) {

        if (typeof e.disabled !== 'undefined') {
          data.forEach(function(series,i) {
            series.disabled = e.disabled[i];
          });

          state.disabled = e.disabled;
        }

        chart.update();
      });

      //============================================================


    });

    return chart;
  }

  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  pie.dispatch.on('elementMouseover.tooltip', function(e) {
    e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
    dispatch.tooltipShow(e);
  });

  dispatch.on('tooltipShow', function(e) {
    if (tooltips) showTooltip(e);
  });

  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.legend = legend;
  chart.dispatch = dispatch;
  chart.pie = pie;

  d3.rebind(chart, pie, 'valueFormat', 'values', 'x', 'y', 'description', 'id', 'showLabels', 'donutLabelsOutside', 'pieLabelsOutside', 'labelType', 'donut', 'donutRatio', 'labelThreshold');
  chart.options = nv.utils.optionsFunc.bind(chart);
  
  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    legend.color(color);
    pie.color(color);
    return chart;
  };

  chart.showLegend = function(_) {
    if (!arguments.length) return showLegend;
    showLegend = _;
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.state = function(_) {
    if (!arguments.length) return state;
    state = _;
    return chart;
  };

  chart.defaultState = function(_) {
    if (!arguments.length) return defaultState;
    defaultState = _;
    return chart;
  };

  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  //============================================================


  return chart;
}

nv.models.scatter = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var margin       = {top: 0, right: 0, bottom: 0, left: 0}
    , width        = 960
    , height       = 500
    , color        = nv.utils.defaultColor() // chooses color
    , id           = Math.floor(Math.random() * 100000) //Create semi-unique ID incase user doesn't select one
    , x            = d3.scale.linear()
    , y            = d3.scale.linear()
    , z            = d3.scale.linear() //linear because d3.svg.shape.size is treated as area
    , getX         = function(d) { return d.x } // accessor to get the x value
    , getY         = function(d) { return d.y } // accessor to get the y value
    , getSize      = function(d) { return d.size || 1} // accessor to get the point size
    , getShape     = function(d) { return d.shape || 'circle' } // accessor to get point shape
    , onlyCircles  = true // Set to false to use shapes
    , forceX       = [] // List of numbers to Force into the X scale (ie. 0, or a max / min, etc.)
    , forceY       = [] // List of numbers to Force into the Y scale
    , forceSize    = [] // List of numbers to Force into the Size scale
    , interactive  = true // If true, plots a voronoi overlay for advanced point intersection
    , pointKey     = null
    , pointActive  = function(d) { return !d.notActive } // any points that return false will be filtered out
    , padData      = false // If true, adds half a data points width to front and back, for lining up a line chart with a bar chart
    , padDataOuter = .1 //outerPadding to imitate ordinal scale outer padding
    , clipEdge     = false // if true, masks points within x and y scale
    , clipVoronoi  = true // if true, masks each point with a circle... can turn off to slightly increase performance
    , clipRadius   = function() { return 25 } // function to get the radius for voronoi point clips
    , xDomain      = null // Override x domain (skips the calculation from data)
    , yDomain      = null // Override y domain
    , xRange       = null // Override x range
    , yRange       = null // Override y range
    , sizeDomain   = null // Override point size domain
    , sizeRange    = null
    , singlePoint  = false
    , dispatch     = d3.dispatch('elementClick', 'elementMouseover', 'elementMouseout')
    , useVoronoi   = true
    , showLabel    = false //@zl
    ;

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var x0, y0, z0 // used to store previous scales
    , timeoutID
    , needsUpdate = false // Flag for when the points are visually updating, but the interactive layer is behind, to disable tooltips
    ;

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var availableWidth = width - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom,
          container = d3.select(this);

      //add series index to each data point for reference
      data.forEach(function(series, i) {
        series.values.forEach(function(point) {
          point.series = i;
        });
      });

      //------------------------------------------------------------
      // Setup Scales

      // remap and flatten the data for use in calculating the scales' domains
      var seriesData = (xDomain && yDomain && sizeDomain) ? [] : // if we know xDomain and yDomain and sizeDomain, no need to calculate.... if Size is constant remember to set sizeDomain to speed up performance
            d3.merge(
              data.map(function(d) {
                return d.values.map(function(d,i) {
                  return { x: getX(d,i), y: getY(d,i), size: getSize(d,i) }
                })
              })
            );

      x   .domain(xDomain || d3.extent(seriesData.map(function(d) { return d.x; }).concat(forceX)))

      if (padData && data[0])
        x.range(xRange || [(availableWidth * padDataOuter +  availableWidth) / (2 *data[0].values.length), availableWidth - availableWidth * (1 + padDataOuter) / (2 * data[0].values.length)  ]);
        //x.range([availableWidth * .5 / data[0].values.length, availableWidth * (data[0].values.length - .5)  / data[0].values.length ]);
      else
        x.range(xRange || [0, availableWidth]);

      y   .domain(yDomain || d3.extent(seriesData.map(function(d) { return d.y }).concat(forceY)))
          .range(yRange || [availableHeight, 0]);

      z   .domain(sizeDomain || d3.extent(seriesData.map(function(d) { return d.size }).concat(forceSize)))
          .range(sizeRange || [16, 256]);

      // If scale's domain don't have a range, slightly adjust to make one... so a chart can show a single data point
      if (x.domain()[0] === x.domain()[1] || y.domain()[0] === y.domain()[1]) singlePoint = true;
      if (x.domain()[0] === x.domain()[1])
        x.domain()[0] ?
            x.domain([x.domain()[0] - x.domain()[0] * 0.01, x.domain()[1] + x.domain()[1] * 0.01])
          : x.domain([-1,1]);

      if (y.domain()[0] === y.domain()[1])
        y.domain()[0] ?
            y.domain([y.domain()[0] - y.domain()[0] * 0.01, y.domain()[1] + y.domain()[1] * 0.01])
          : y.domain([-1,1]);

      if ( isNaN(x.domain()[0])) {
          x.domain([-1,1]);
      }

      if ( isNaN(y.domain()[0])) {
          y.domain([-1,1]);
      }


      x0 = x0 || x;
      y0 = y0 || y;
      z0 = z0 || z;

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-scatter').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-scatter nv-chart-' + id + (singlePoint ? ' nv-single-point' : ''));
      var defsEnter = wrapEnter.append('defs');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-groups');
      gEnter.append('g').attr('class', 'nv-point-paths');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      //------------------------------------------------------------


      defsEnter.append('clipPath')
          .attr('id', 'nv-edge-clip-' + id)
        .append('rect');

      wrap.select('#nv-edge-clip-' + id + ' rect')
          .attr('width', availableWidth)
          .attr('height', (availableHeight > 0) ? availableHeight : 0);

      g   .attr('clip-path', clipEdge ? 'url(#nv-edge-clip-' + id + ')' : '');


      function updateInteractiveLayer() {

        if (!interactive) return false;

        var eventElements;

        var vertices = d3.merge(data.map(function(group, groupIndex) {
            return group.values
              .map(function(point, pointIndex) {
                // *Adding noise to make duplicates very unlikely
                // *Injecting series and point index for reference
                /* *Adding a 'jitter' to the points, because there's an issue in d3.geom.voronoi.
                */
                var pX = getX(point,pointIndex);
                var pY = getY(point,pointIndex);
                var gid = (typeof groupIndex === 'undefined')? 0 : groupIndex; //@zl
              //https://github.com/luke3141/nvd3/commit/e39ea4084c580acd5abb6e3da08e54722c09eca7
                return [x(pX) + Math.floor(Math.random() * 100 + 1)/1000000, //@zl
                        y(pY) + gid/100 + Math.floor(Math.random() * 10+ 1)/1000000, //@zl -- this could cause issue in scatter func. 
                        groupIndex,
                        pointIndex, point]; //temp hack to add noise untill I think of a better way so there are no duplicates
              })
              .filter(function(pointArray, pointIndex) {
                return pointActive(pointArray[4], pointIndex); // Issue #237.. move filter to after map, so pointIndex is correct!
              })
          })
        );



        //inject series and point index for reference into voronoi
        if (useVoronoi === true) {

          if (clipVoronoi) {
            var pointClipsEnter = wrap.select('defs').selectAll('.nv-point-clips')
                .data([id])
              .enter();

            pointClipsEnter.append('clipPath')
                  .attr('class', 'nv-point-clips')
                  .attr('id', 'nv-points-clip-' + id);

            var pointClips = wrap.select('#nv-points-clip-' + id).selectAll('circle')
                .data(vertices);
            pointClips.enter().append('circle')
                .attr('r', clipRadius);
            pointClips.exit().remove();
            pointClips
                .attr('cx', function(d) { return d[0] })
                .attr('cy', function(d) { return d[1] });

            wrap.select('.nv-point-paths')
                .attr('clip-path', 'url(#nv-points-clip-' + id + ')');
          }


          if(vertices.length ) {
            // Issue #283 - Adding 2 dummy points to the voronoi b/c voronoi requires min 3 points to work
            vertices.push([x.range()[0] - 20, y.range()[0] - 20, null, null]);
            vertices.push([x.range()[1] + 20, y.range()[1] + 20, null, null]);
            vertices.push([x.range()[0] - 20, y.range()[0] + 20, null, null]);
            vertices.push([x.range()[1] + 20, y.range()[1] - 20, null, null]);
          }

          var bounds = d3.geom.polygon([
              [-10,-10],
              [-10,height + 10],
              [width + 10,height + 10],
              [width + 10,-10]
          ]);


//@zl - https://github.com/luke3141/nvd3/commit/e39ea4084c580acd5abb6e3da08e54722c09eca7
     // delete duplicates from vertices - essential assumption for d3.geom.voronoi
/**
     var epsilon = 1e-6; // d3 uses 1e-6 to determine equivalence.
     vertices = vertices.sort(function(a,b){return ((a[0] - b[0]) || (a[1] - b[1]))});
     for (var i = 0; i < vertices.length - 1; ) {
   if ((Math.abs(vertices[i][0] - vertices[i+1][0]) < epsilon) &&
       (Math.abs(vertices[i][1] - vertices[i+1][1]) < epsilon)) {
       vertices.splice(i+1, 1);
   } else {
       i++;
   }
     }
**/
//====================================================================================

          var voronoi = d3.geom.voronoi(vertices).map(function(d, i) {
              return {
                'data': bounds.clip(d),
                'series': vertices[i][2],
                'point': vertices[i][3]
              }
            });


          var pointPaths = wrap.select('.nv-point-paths').selectAll('path')
              .data(voronoi);
          pointPaths.enter().append('path')
              .attr('class', function(d,i) { return 'nv-path-'+i; });
          pointPaths.exit().remove();
          pointPaths
              .attr('d', function(d) {
                if (typeof d === 'undefined' || d.data.length === 0 || typeof d.data[0] === 'undefined' ) { //@zl
                    return 'M 0 0'
                  }
                else{
                   var cleandata = d.data; //@zl
                    if (d.data[0].length == 2) //@zl
                       cleandata = d.data.map(function(d){ return [d[0]||0 , d[1]||0]; }); //@zl
                    return 'M' + cleandata.join('L') + 'Z'; //@zl
                  }
              });

          var mouseEventCallback = function(d,mDispatch) {
                if (needsUpdate) return 0;
                var series = data[d.series];
                if (typeof series === 'undefined') return;

                var point  = series.values[d.point];

                mDispatch({
                  point: point,
                  series: series,
                  pos: [x(getX(point, d.point)) + margin.left, y(getY(point, d.point)) + margin.top],
                  seriesIndex: d.series,
                  pointIndex: d.point
                });
          };

          pointPaths
              .on('click', function(d) {
                mouseEventCallback(d, dispatch.elementClick);
              })
              .on('mouseover', function(d) {
                mouseEventCallback(d, dispatch.elementMouseover);
              })
              .on('mouseout', function(d, i) {
                mouseEventCallback(d, dispatch.elementMouseout);
              });


        } else {
          /*
          // bring data in form needed for click handlers
          var dataWithPoints = vertices.map(function(d, i) {
              return {
                'data': d,
                'series': vertices[i][2],
                'point': vertices[i][3]
              }
            });
           */

          // add event handlers to points instead voronoi paths
          wrap.select('.nv-groups').selectAll('.nv-group')
            .selectAll('.nv-point')
              //.data(dataWithPoints)
              //.style('pointer-events', 'auto') // recativate events, disabled by css
              .on('click', function(d,i) {
                //nv.log('test', d, i);
                if (needsUpdate || !data[d.series]) return 0; //check if this is a dummy point
                var series = data[d.series],
                    point  = series.values[i];

                dispatch.elementClick({
                  point: point,
                  series: series,
                  pos: [x(getX(point, i)) + margin.left, y(getY(point, i)) + margin.top],
                  seriesIndex: d.series,
                  pointIndex: i
                });
              })
              .on('mouseover', function(d,i) {
                if (needsUpdate || !data[d.series]) return 0; //check if this is a dummy point
                var series = data[d.series],
                    point  = series.values[i];

                dispatch.elementMouseover({
                  point: point,
                  series: series,
                  pos: [x(getX(point, i)) + margin.left, y(getY(point, i)) + margin.top],
                  seriesIndex: d.series,
                  pointIndex: i
                });
              })
              .on('mouseout', function(d,i) {
                if (needsUpdate || !data[d.series]) return 0; //check if this is a dummy point
                var series = data[d.series],
                    point  = series.values[i];

                dispatch.elementMouseout({
                  point: point,
                  series: series,
                  seriesIndex: d.series,
                  pointIndex: i
                });
              });
          }

          needsUpdate = false;
      }

      needsUpdate = true;

      var groups = wrap.select('.nv-groups').selectAll('.nv-group')
          .data(function(d) { return d }, function(d) { return d.key });
      groups.enter().append('g')
          .style('stroke-opacity', 1e-6)
          .style('fill-opacity', 1e-6);
      groups.exit()
          .remove();
      groups
          .attr('class', function(d,i) { return 'nv-group nv-series-' + i })
          .classed('hover', function(d) { return d.hover });
      groups
          .transition()
          .style('fill', function(d,i) { return color(d, i) })
          .style('stroke', function(d,i) { return color(d, i) })
          .style('stroke-opacity', 1)
          .style('fill-opacity', .5);


      if (onlyCircles) {

        var points = groups.selectAll('circle.nv-point')
            .data(function(d) { return d.values }, pointKey);

//@zl-------------------
if(showLabel)
{
        var titles =  groups.selectAll('text')
            .data(function(d) { return d.values }, pointKey);

        titles.enter().append('text')
            .style('fill', function (d,i) { return d.color })
            .style('stroke-opacity', 0)
            .style('fill-opacity', 1)
            .attr('x', function(d,i) { return nv.utils.NaNtoZero(x0(getX(d,i))) + Math.sqrt(z(getSize(d,i))/Math.PI) })
            .attr('y', function(d,i) { return nv.utils.NaNtoZero(y0(getY(d,i))) })
            .text(function(d,i){return d.tooltip;});

        titles.exit().remove();

        groups.exit().selectAll('text.nv-point').transition()
            .attr('x', function(d,i) { return nv.utils.NaNtoZero(x(getX(d,i))) })
            .attr('y', function(d,i) { return nv.utils.NaNtoZero(y(getY(d,i))) })
            .remove();

        titles.each(function(d,i) {
          d3.select(this)
            .classed('nv-point', true)
            .classed('nv-point-' + i, false)
            .classed('hover',false);

        });
         titles.transition()
             .attr('x', function(d,i) { return nv.utils.NaNtoZero(x(getX(d,i))) + Math.sqrt(z(getSize(d,i))/Math.PI) })
            .attr('y', function(d,i) { return nv.utils.NaNtoZero(y(getY(d,i))) });
}
//-------------------            
        points.enter().append('circle')
            .style('fill', function (d,i) { return d.color })
            .style('stroke', function (d,i) { return d.color })
            .attr('cx', function(d,i) { return nv.utils.NaNtoZero(x0(getX(d,i))) })
            .attr('cy', function(d,i) { return nv.utils.NaNtoZero(y0(getY(d,i))) })
            .attr('r', function(d,i) { return Math.sqrt(z(getSize(d,i))/Math.PI) });
        points.exit().remove();
        groups.exit().selectAll('path.nv-point').transition()
            .attr('cx', function(d,i) { return nv.utils.NaNtoZero(x(getX(d,i))) })
            .attr('cy', function(d,i) { return nv.utils.NaNtoZero(y(getY(d,i))) })
            .remove();
        points.each(function(d,i) {
          d3.select(this)
            .classed('nv-point', true)
            .classed('nv-point-' + i, true)
            .classed('hover',false)
            ;
        });
        points.transition()
            .attr('cx', function(d,i) { return nv.utils.NaNtoZero(x(getX(d,i))) })
            .attr('cy', function(d,i) { return nv.utils.NaNtoZero(y(getY(d,i))) })
            .attr('r', function(d,i) { return Math.sqrt(z(getSize(d,i))/Math.PI) });

      } else {

        var points = groups.selectAll('path.nv-point')
            .data(function(d) { return d.values });
        points.enter().append('path')
            .style('fill', function (d,i) { return d.color })
            .style('stroke', function (d,i) { return d.color })
            .attr('transform', function(d,i) {
              return 'translate(' + x0(getX(d,i)) + ',' + y0(getY(d,i)) + ')'
            })
            .attr('d',
              d3.svg.symbol()
                .type(getShape)
                .size(function(d,i) { return z(getSize(d,i)) })
            );
        points.exit().remove();
        groups.exit().selectAll('path.nv-point')
            .transition()
            .attr('transform', function(d,i) {
              return 'translate(' + x(getX(d,i)) + ',' + y(getY(d,i)) + ')'
            })
            .remove();
        points.each(function(d,i) {
          d3.select(this)
            .classed('nv-point', true)
            .classed('nv-point-' + i, true)
            .classed('hover',false)
            ;
        });
        points.transition()
            .attr('transform', function(d,i) {
              //nv.log(d,i,getX(d,i), x(getX(d,i)));
              return 'translate(' + x(getX(d,i)) + ',' + y(getY(d,i)) + ')'
            })
            .attr('d',
              d3.svg.symbol()
                .type(getShape)
                .size(function(d,i) { return z(getSize(d,i)) })
            );
      }


      // Delay updating the invisible interactive layer for smoother animation
      clearTimeout(timeoutID); // stop repeat calls to updateInteractiveLayer
      timeoutID = setTimeout(updateInteractiveLayer, 300);
      //updateInteractiveLayer();

      //store old scales for use in transitions on update
      x0 = x.copy();
      y0 = y.copy();
      z0 = z.copy();

    });

    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------
  chart.clearHighlights = function() {
      //Remove the 'hover' class from all highlighted points.
      d3.selectAll(".nv-chart-" + id + " .nv-point.hover").classed("hover",false);
  };

  chart.highlightPoint = function(seriesIndex,pointIndex,isHoverOver) {
      d3.select(".nv-chart-" + id + " .nv-series-" + seriesIndex + " .nv-point-" + pointIndex)
          .classed("hover",isHoverOver);
  };


  dispatch.on('elementMouseover.point', function(d) {
     if (interactive) chart.highlightPoint(d.seriesIndex,d.pointIndex,true);
  });

  dispatch.on('elementMouseout.point', function(d) {
     if (interactive) chart.highlightPoint(d.seriesIndex,d.pointIndex,false);
  });

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  chart.dispatch = dispatch;
  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.x = function(_) {
    if (!arguments.length) return getX;
    getX = d3.functor(_);
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return getY;
    getY = d3.functor(_);
    return chart;
  };

  chart.size = function(_) {
    if (!arguments.length) return getSize;
    getSize = d3.functor(_);
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.xScale = function(_) {
    if (!arguments.length) return x;
    x = _;
    return chart;
  };

  chart.yScale = function(_) {
    if (!arguments.length) return y;
    y = _;
    return chart;
  };

  chart.zScale = function(_) {
    if (!arguments.length) return z;
    z = _;
    return chart;
  };

  chart.xDomain = function(_) {
    if (!arguments.length) return xDomain;
    xDomain = _;
    return chart;
  };

  chart.yDomain = function(_) {
    if (!arguments.length) return yDomain;
    yDomain = _;
    return chart;
  };

  chart.sizeDomain = function(_) {
    if (!arguments.length) return sizeDomain;
    sizeDomain = _;
    return chart;
  };

  chart.xRange = function(_) {
    if (!arguments.length) return xRange;
    xRange = _;
    return chart;
  };

  chart.yRange = function(_) {
    if (!arguments.length) return yRange;
    yRange = _;
    return chart;
  };

  chart.sizeRange = function(_) {
    if (!arguments.length) return sizeRange;
    sizeRange = _;
    return chart;
  };

  chart.forceX = function(_) {
    if (!arguments.length) return forceX;
    forceX = _;
    return chart;
  };

  chart.forceY = function(_) {
    if (!arguments.length) return forceY;
    forceY = _;
    return chart;
  };

  chart.forceSize = function(_) {
    if (!arguments.length) return forceSize;
    forceSize = _;
    return chart;
  };

  chart.interactive = function(_) {
    if (!arguments.length) return interactive;
    interactive = _;
    return chart;
  };

  chart.pointKey = function(_) {
    if (!arguments.length) return pointKey;
    pointKey = _;
    return chart;
  };

  chart.pointActive = function(_) {
    if (!arguments.length) return pointActive;
    pointActive = _;
    return chart;
  };

  chart.padData = function(_) {
    if (!arguments.length) return padData;
    padData = _;
    return chart;
  };

  chart.padDataOuter = function(_) {
    if (!arguments.length) return padDataOuter;
    padDataOuter = _;
    return chart;
  };

  chart.clipEdge = function(_) {
    if (!arguments.length) return clipEdge;
    clipEdge = _;
    return chart;
  };

  chart.clipVoronoi= function(_) {
    if (!arguments.length) return clipVoronoi;
    clipVoronoi = _;
    return chart;
  };

  chart.useVoronoi= function(_) {
    if (!arguments.length) return useVoronoi;
    useVoronoi = _;
    if (useVoronoi === false) {
        clipVoronoi = false;
    }
    return chart;
  };

  chart.clipRadius = function(_) {
    if (!arguments.length) return clipRadius;
    clipRadius = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    return chart;
  };

  chart.shape = function(_) {
    if (!arguments.length) return getShape;
    getShape = _;
    return chart;
  };

  chart.onlyCircles = function(_) {
    if (!arguments.length) return onlyCircles;
    onlyCircles = _;
    return chart;
  };

  chart.id = function(_) {
    if (!arguments.length) return id;
    id = _;
    return chart;
  };

  chart.singlePoint = function(_) {
    if (!arguments.length) return singlePoint;
    singlePoint = _;
    return chart;
  };
//@zl------------------------
  chart.showLabel = function(_){
    if (!arguments.length) return showLabel;
    showLabel = _;
    return chart;
};
  //============================================================


  return chart;
}
nv.models.scatterChart = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var scatter      = nv.models.scatter()
    , xAxis        = nv.models.axis()
    , yAxis        = nv.models.axis()
    , legend       = nv.models.legend()
    , controls     = nv.models.legend()
    , distX        = nv.models.distribution()
    , distY        = nv.models.distribution()
    ;

  var margin       = {top: 30, right: 20, bottom: 50, left: 75}
    , width        = null
    , height       = null
    , color        = nv.utils.defaultColor()
    , x            = d3.fisheye ? d3.fisheye.scale(d3.scale.linear).distortion(0) : scatter.xScale()
    , y            = d3.fisheye ? d3.fisheye.scale(d3.scale.linear).distortion(0) : scatter.yScale()
    , xPadding     = 0
    , yPadding     = 0
    , showDistX    = false
    , showDistY    = false
    , showLegend   = true
    , showXAxis    = true
    , showYAxis    = true
    , rightAlignYAxis = false
    , showControls = !!d3.fisheye
    , fisheye      = 0
    , pauseFisheye = false
    , tooltips     = true
    , tooltipX     = function(key, x, y) { return '<strong>' + x + '</strong>' }
    , tooltipY     = function(key, x, y) { return '<strong>' + y + '</strong>' }
    , tooltip      = null
    , state = {}
    , defaultState = null
    , dispatch     = d3.dispatch('tooltipShow', 'tooltipHide', 'stateChange', 'changeState')
    , noData       = "No Data Available."
    , transitionDuration = 250
    , showLabel    = false //@zl
    ;

  scatter
    .xScale(x)
    .yScale(y)
    ;
  xAxis
    .orient('bottom')
    .tickPadding(10)
    ;
  yAxis
    .orient((rightAlignYAxis) ? 'right' : 'left')
    .tickPadding(10)
    ;
  distX
    .axis('x')
    ;
  distY
    .axis('y')
    ;

  controls.updateState(false);

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var x0, y0;

  var showTooltip = function(e, offsetElement) {
    //TODO: make tooltip style an option between single or dual on axes (maybe on all charts with axes?)

    var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
        top = e.pos[1] + ( offsetElement.offsetTop || 0),
        leftX = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
        topX = y.range()[0] + margin.top + ( offsetElement.offsetTop || 0),
        leftY = x.range()[0] + margin.left + ( offsetElement.offsetLeft || 0 ),
        topY = e.pos[1] + ( offsetElement.offsetTop || 0),
        xVal = xAxis.tickFormat()(scatter.x()(e.point, e.pointIndex)),
        yVal = yAxis.tickFormat()(scatter.y()(e.point, e.pointIndex));

      if( tooltipX != null )
          nv.tooltip.show([leftX, topX], tooltipX(e.series.key, xVal, yVal, e, chart), 'n', 1, offsetElement, 'x-nvtooltip');
      if( tooltipY != null )
          nv.tooltip.show([leftY, topY], tooltipY(e.series.key, xVal, yVal, e, chart), 'e', 1, offsetElement, 'y-nvtooltip');
      if( tooltip != null )
          nv.tooltip.show([left, top], tooltip(e.series.key, xVal, yVal, e, chart), e.value < 0 ? 'n' : 's', null, offsetElement);
  };

  var controlsData = [
    { key: 'Magnify', disabled: true }
  ];

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this),
          that = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;

      chart.update = function() { container.transition().duration(transitionDuration).call(chart); };
      chart.container = this;

      //set state.disabled
      state.disabled = data.map(function(d) { return !!d.disabled });

      if (!defaultState) {
        var key;
        defaultState = {};
        for (key in state) {
          if (state[key] instanceof Array)
            defaultState[key] = state[key].slice(0);
          else
            defaultState[key] = state[key];
        }
      }

      //------------------------------------------------------------
      // Display noData message if there's nothing to show.

      if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', margin.top + availableHeight / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Scales

      x0 = x0 || x;
      y0 = y0 || y;

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-scatterChart').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-scatterChart nv-chart-' + scatter.id());
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g');

      // background for pointer events
      gEnter.append('rect').attr('class', 'nvd3 nv-background');

      gEnter.append('g').attr('class', 'nv-x nv-axis');
      gEnter.append('g').attr('class', 'nv-y nv-axis');
      gEnter.append('g').attr('class', 'nv-scatterWrap');
      gEnter.append('g').attr('class', 'nv-distWrap');
      gEnter.append('g').attr('class', 'nv-legendWrap');
      gEnter.append('g').attr('class', 'nv-controlsWrap');

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Legend

      if (showLegend) {
        var legendWidth = (showControls) ?  (availableWidth -180) : availableWidth; //@zl
        legend.width(legendWidth);

        wrap.select('.nv-legendWrap')
            .datum(data)
            .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;
        }

        wrap.select('.nv-legendWrap')
            .attr('transform', 'translate(' + (availableWidth - legendWidth) + ',' + (-margin.top) +')');
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Controls

      if (showControls) {
        controls.width(180).color(['#444']);
        g.select('.nv-controlsWrap')
            .datum(controlsData)
            .attr('transform', 'translate(0,' + (-margin.top) +')')
            .call(controls);
      }

      //------------------------------------------------------------


      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      if (rightAlignYAxis) {
          g.select(".nv-y.nv-axis")
              .attr("transform", "translate(" + availableWidth + ",0)");
      }

      //------------------------------------------------------------
      // Main Chart Component(s)

      scatter
          .width(availableWidth)
          .height(availableHeight)
          .color(data.map(function(d,i) {
            return d.color || color(d, i);
          }).filter(function(d,i) { return !data[i].disabled }));
//@zl-------------
      if (showLabel)
        scatter.showLabel(true)
//----------------
      if (xPadding !== 0)
        scatter.xDomain(null);

      if (yPadding !== 0)
        scatter.yDomain(null);

      wrap.select('.nv-scatterWrap')
          .datum(data.filter(function(d) { return !d.disabled }))
          .call(scatter);

      //Adjust for x and y padding
      if (xPadding !== 0) {
        var xRange = x.domain()[1] - x.domain()[0];
        scatter.xDomain([x.domain()[0] - (xPadding * xRange), x.domain()[1] + (xPadding * xRange)]);
      }

      if (yPadding !== 0) {
        var yRange = y.domain()[1] - y.domain()[0];
        scatter.yDomain([y.domain()[0] - (yPadding * yRange), y.domain()[1] + (yPadding * yRange)]);
      }

      //Only need to update the scatter again if x/yPadding changed the domain.
      if (yPadding !== 0 || xPadding !== 0) {
        wrap.select('.nv-scatterWrap')
            .datum(data.filter(function(d) { return !d.disabled }))
            .call(scatter);
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Axes
      if (showXAxis) {
        xAxis
            .scale(x)
            .ticks( xAxis.ticks() && xAxis.ticks().length ? xAxis.ticks() : availableWidth / 100 )
            .tickSize( -availableHeight , 0);

        g.select('.nv-x.nv-axis')
            .attr('transform', 'translate(0,' + y.range()[0] + ')')
            .call(xAxis);

      }

      if (showYAxis) {
        yAxis
            .scale(y)
            .ticks( yAxis.ticks() && yAxis.ticks().length ? yAxis.ticks() : availableHeight / 36 )
            .tickSize( -availableWidth, 0);

        g.select('.nv-y.nv-axis')
            .call(yAxis);
      }


      if (showDistX) {
        distX
            .getData(scatter.x())
            .scale(x)
            .width(availableWidth)
            .color(data.map(function(d,i) {
              return d.color || color(d, i);
            }).filter(function(d,i) { return !data[i].disabled }));
        gEnter.select('.nv-distWrap').append('g')
            .attr('class', 'nv-distributionX');
        g.select('.nv-distributionX')
            .attr('transform', 'translate(0,' + y.range()[0] + ')')
            .datum(data.filter(function(d) { return !d.disabled }))
            .call(distX);
      }

      if (showDistY) {
        distY
            .getData(scatter.y())
            .scale(y)
            .width(availableHeight)
            .color(data.map(function(d,i) {
              return d.color || color(d, i);
            }).filter(function(d,i) { return !data[i].disabled }));
        gEnter.select('.nv-distWrap').append('g')
            .attr('class', 'nv-distributionY');
        g.select('.nv-distributionY')
            .attr('transform', 
              'translate(' + (rightAlignYAxis ? availableWidth : -distY.size() ) + ',0)')
            .datum(data.filter(function(d) { return !d.disabled }))
            .call(distY);
      }

      //------------------------------------------------------------




      if (d3.fisheye) {
        g.select('.nv-background')
            .attr('width', availableWidth)
            .attr('height', availableHeight);

        g.select('.nv-background').on('mousemove', updateFisheye);
        g.select('.nv-background').on('click', function() { pauseFisheye = !pauseFisheye;});
        scatter.dispatch.on('elementClick.freezeFisheye', function() {
          pauseFisheye = !pauseFisheye;
        });
      }


      function updateFisheye() {
        if (pauseFisheye) {
          g.select('.nv-point-paths').style('pointer-events', 'all');
          return false;
        }

        g.select('.nv-point-paths').style('pointer-events', 'none' );

        var mouse = d3.mouse(this);
        x.distortion(fisheye).focus(mouse[0]);
        y.distortion(fisheye).focus(mouse[1]);

        g.select('.nv-scatterWrap')
            .call(scatter);

        if (showXAxis)
          g.select('.nv-x.nv-axis').call(xAxis);
        
        if (showYAxis)
          g.select('.nv-y.nv-axis').call(yAxis);
        
        g.select('.nv-distributionX')
            .datum(data.filter(function(d) { return !d.disabled }))
            .call(distX);
        g.select('.nv-distributionY')
            .datum(data.filter(function(d) { return !d.disabled }))
            .call(distY);
      }



      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------

      controls.dispatch.on('legendClick', function(d,i) {
        d.disabled = !d.disabled;

        fisheye = d.disabled ? 0 : 2.5;
        g.select('.nv-background') .style('pointer-events', d.disabled ? 'none' : 'all');
        g.select('.nv-point-paths').style('pointer-events', d.disabled ? 'all' : 'none' );

        if (d.disabled) {
          x.distortion(fisheye).focus(0);
          y.distortion(fisheye).focus(0);

          g.select('.nv-scatterWrap').call(scatter);
          g.select('.nv-x.nv-axis').call(xAxis);
          g.select('.nv-y.nv-axis').call(yAxis);
        } else {
          pauseFisheye = false;
        }

        chart.update();
      });

      legend.dispatch.on('stateChange', function(newState) {
        state.disabled = newState.disabled;
        dispatch.stateChange(state);
        chart.update();
      });

      scatter.dispatch.on('elementMouseover.tooltip', function(e) {
        d3.select('.nv-chart-' + scatter.id() + ' .nv-series-' + e.seriesIndex + ' .nv-distx-' + e.pointIndex)
            .attr('y1', function(d,i) { return e.pos[1] - availableHeight;});
        d3.select('.nv-chart-' + scatter.id() + ' .nv-series-' + e.seriesIndex + ' .nv-disty-' + e.pointIndex)
            .attr('x2', e.pos[0] + distX.size());

        e.pos = [e.pos[0] + margin.left, e.pos[1] + margin.top];
        dispatch.tooltipShow(e);
      });

      dispatch.on('tooltipShow', function(e) {
        if (tooltips) showTooltip(e, that.parentNode);
      });

      // Update chart from a state object passed to event handler
      dispatch.on('changeState', function(e) {

        if (typeof e.disabled !== 'undefined') {
          data.forEach(function(series,i) {
            series.disabled = e.disabled[i];
          });

          state.disabled = e.disabled;
        }

        chart.update();
      });

      //============================================================


      //store old scales for use in transitions on update
      x0 = x.copy();
      y0 = y.copy();


    });

    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  scatter.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);

    d3.select('.nv-chart-' + scatter.id() + ' .nv-series-' + e.seriesIndex + ' .nv-distx-' + e.pointIndex)
        .attr('y1', 0);
    d3.select('.nv-chart-' + scatter.id() + ' .nv-series-' + e.seriesIndex + ' .nv-disty-' + e.pointIndex)
        .attr('x2', distY.size());
  });
  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.dispatch = dispatch;
  chart.scatter = scatter;
  chart.legend = legend;
  chart.controls = controls;
  chart.xAxis = xAxis;
  chart.yAxis = yAxis;
  chart.distX = distX;
  chart.distY = distY;

  d3.rebind(chart, scatter, 'id', 'interactive', 'pointActive', 'x', 'y', 'shape', 'size', 'xScale', 'yScale', 'zScale', 'xDomain', 'yDomain', 'xRange', 'yRange', 'sizeDomain', 'sizeRange', 'forceX', 'forceY', 'forceSize', 'clipVoronoi', 'clipRadius', 'useVoronoi');
  chart.options = nv.utils.optionsFunc.bind(chart);
  
  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    legend.color(color);
    distX.color(color);
    distY.color(color);
    return chart;
  };

  chart.showDistX = function(_) {
    if (!arguments.length) return showDistX;
    showDistX = _;
    return chart;
  };

  chart.showDistY = function(_) {
    if (!arguments.length) return showDistY;
    showDistY = _;
    return chart;
  };

  chart.showControls = function(_) {
    if (!arguments.length) return showControls;
    showControls = _;
    return chart;
  };

  chart.showLegend = function(_) {
    if (!arguments.length) return showLegend;
    showLegend = _;
    return chart;
  };

  chart.showXAxis = function(_) {
    if (!arguments.length) return showXAxis;
    showXAxis = _;
    return chart;
  };

  chart.showYAxis = function(_) {
    if (!arguments.length) return showYAxis;
    showYAxis = _;
    return chart;
  };

  chart.rightAlignYAxis = function(_) {
    if(!arguments.length) return rightAlignYAxis;
    rightAlignYAxis = _;
    yAxis.orient( (_) ? 'right' : 'left');
    return chart;
  };


  chart.fisheye = function(_) {
    if (!arguments.length) return fisheye;
    fisheye = _;
    return chart;
  };

  chart.xPadding = function(_) {
    if (!arguments.length) return xPadding;
    xPadding = _;
    return chart;
  };

  chart.yPadding = function(_) {
    if (!arguments.length) return yPadding;
    yPadding = _;
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.tooltipXContent = function(_) {
    if (!arguments.length) return tooltipX;
    tooltipX = _;
    return chart;
  };

  chart.tooltipYContent = function(_) {
    if (!arguments.length) return tooltipY;
    tooltipY = _;
    return chart;
  };

  chart.state = function(_) {
    if (!arguments.length) return state;
    state = _;
    return chart;
  };

  chart.defaultState = function(_) {
    if (!arguments.length) return defaultState;
    defaultState = _;
    return chart;
  };
  
  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  chart.transitionDuration = function(_) {
    if (!arguments.length) return transitionDuration;
    transitionDuration = _;
    return chart;
  };

//@zl-------------------------
  chart.showLabel = function(_) {
    if (!arguments.length) return showLabel;
    showLabel = _;
    return chart;
  };


  //============================================================


  return chart;
}

nv.models.scatterPlusLineChart = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var scatter      = nv.models.scatter()
    , xAxis        = nv.models.axis()
    , yAxis        = nv.models.axis()
    , legend       = nv.models.legend()
    , controls     = nv.models.legend()
    , distX        = nv.models.distribution()
    , distY        = nv.models.distribution()
    ;
    d3.fisheye = false; //@zl

  var margin       = {top: 30, right: 20, bottom: 50, left: 75}
    , width        = null
    , height       = null
    , color        = nv.utils.defaultColor()
    , x            = d3.fisheye ? d3.fisheye.scale(d3.scale.linear).distortion(0) : scatter.xScale()
    , y            = d3.fisheye ? d3.fisheye.scale(d3.scale.linear).distortion(0) : scatter.yScale()
    , showDistX    = false
    , showDistY    = false
    , showLegend   = true
    , showXAxis    = true
    , showYAxis    = true
    , rightAlignYAxis = false
    , showControls = !!d3.fisheye
    , fisheye      = 0
    , pauseFisheye = false
    , tooltips     = true
    , tooltipX     = function(key, x, y) { return '<strong>' + x + '</strong>' }
    , tooltipY     = function(key, x, y) { return '<strong>' + y + '</strong>' }
    , tooltip      = function(key, x, y, date) { return '<h3>' + key + '</h3>' 
                                                      + '<p>' + date + '</p>' }
    , state = {}
    , defaultState = null
    , dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'stateChange', 'changeState')
    , noData       = "No Data Available."
    , transitionDuration = 250
    , showLabel    = false //@zl
    ;

  scatter
    .xScale(x)
    .yScale(y)
    ;
  xAxis
    .orient('bottom')
    .tickPadding(10)
    ;
  yAxis
    .orient((rightAlignYAxis) ? 'right' : 'left')
    .tickPadding(10)
    ;
  distX
    .axis('x')
    ;
  distY
    .axis('y')
    ;
  
  controls.updateState(false);
  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var x0, y0;

  var showTooltip = function(e, offsetElement) {
    //TODO: make tooltip style an option between single or dual on axes (maybe on all charts with axes?)

    var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
        top = e.pos[1] + ( offsetElement.offsetTop || 0),
        leftX = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
        topX = y.range()[0] + margin.top + ( offsetElement.offsetTop || 0),
        leftY = x.range()[0] + margin.left + ( offsetElement.offsetLeft || 0 ),
        topY = e.pos[1] + ( offsetElement.offsetTop || 0),
        xVal = xAxis.tickFormat()(scatter.x()(e.point, e.pointIndex)),
        yVal = yAxis.tickFormat()(scatter.y()(e.point, e.pointIndex));

      if( tooltipX != null )
          nv.tooltip.show([leftX, topX], tooltipX(e.series.key, xVal, yVal, e, chart), 'n', 1, offsetElement, 'x-nvtooltip');
      if( tooltipY != null )
          nv.tooltip.show([leftY, topY], tooltipY(e.series.key, xVal, yVal, e, chart), 'e', 1, offsetElement, 'y-nvtooltip');
      if( tooltip != null )
          nv.tooltip.show([left, top], tooltip(e.series.key, xVal, yVal, e.point.tooltip, e, chart), e.value < 0 ? 'n' : 's', null, offsetElement);
  };

  var controlsData = [
    { key: 'Magnify', disabled: true }
  ];

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this),
          that = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;

      chart.update = function() { container.transition().duration(transitionDuration).call(chart); };
      chart.container = this;

      //set state.disabled
      state.disabled = data.map(function(d) { return !!d.disabled });

      if (!defaultState) {
        var key;
        defaultState = {};
        for (key in state) {
          if (state[key] instanceof Array)
            defaultState[key] = state[key].slice(0);
          else
            defaultState[key] = state[key];
        }
      }

      //------------------------------------------------------------
      // Display noData message if there's nothing to show.

      if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', margin.top + availableHeight / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Scales

      x = scatter.xScale();
      y = scatter.yScale();

      x0 = x0 || x;
      y0 = y0 || y;

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-scatterChart').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-scatterChart nv-chart-' + scatter.id());
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g')

      // background for pointer events
      gEnter.append('rect').attr('class', 'nvd3 nv-background').style("pointer-events","none");

      gEnter.append('g').attr('class', 'nv-x nv-axis');
      gEnter.append('g').attr('class', 'nv-y nv-axis');
      gEnter.append('g').attr('class', 'nv-scatterWrap');
      gEnter.append('g').attr('class', 'nv-regressionLinesWrap');
      gEnter.append('g').attr('class', 'nv-distWrap');
      gEnter.append('g').attr('class', 'nv-legendWrap');
      gEnter.append('g').attr('class', 'nv-controlsWrap');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      if (rightAlignYAxis) {
          g.select(".nv-y.nv-axis")
              .attr("transform", "translate(" + availableWidth + ",0)");
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Legend

      if (showLegend) {
        legend.width( availableWidth - 180); //@zl

        wrap.select('.nv-legendWrap')
            .datum(data)
            .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;
        }

        wrap.select('.nv-legendWrap')
            .attr('transform', 'translate(' + (180) + ',' + (-margin.top) +')'); //@zl
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Controls

      if (showControls) {
        controls.width(180).color(['#444']);
        g.select('.nv-controlsWrap')
            .datum(controlsData)
            .attr('transform', 'translate(0,' + (-margin.top) +')')
            .call(controls);
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Main Chart Component(s)

      scatter
          .width(availableWidth)
          .height(availableHeight)
          .color(data.map(function(d,i) {
            return d.color || color(d, i);
          }).filter(function(d,i) { return !data[i].disabled }));

//@zl-------
if (showLabel)
      scatter.showLabel(showLabel);
//---------
      wrap.select('.nv-scatterWrap')
          .datum(data.filter(function(d) { return !d.disabled }))
          .call(scatter);

      wrap.select('.nv-regressionLinesWrap')
          .attr('clip-path', 'url(#nv-edge-clip-' + scatter.id() + ')');

      var regWrap = wrap.select('.nv-regressionLinesWrap').selectAll('.nv-regLines')
                      .data(function(d) {return d });
      
      regWrap.enter().append('g').attr('class', 'nv-regLines');

      var regLine = regWrap.selectAll('.nv-regLine').data(function(d){return [d]});
      var regLineEnter = regLine.enter()
                       .append('line').attr('class', 'nv-regLine')
                       .style('stroke-opacity', 0);

      regLine
          .transition()
          .attr('x1',  function(d,i) {return (typeof d.slope !== 'undefined')? x.range()[0]: x(d.intercept);}) //@zl
          .attr('x2', function(d,i) {return (typeof d.slope !== 'undefined')? x.range()[1]: x(d.intercept);}) //@zl
          .attr('y1', function(d,i) {return (typeof d.slope !== 'undefined')? y(x.domain()[0] * d.slope + d.intercept) :y.range()[0] }) //@zl
          .attr('y2', function(d,i) { return (typeof d.slope !== 'undefined')? y(x.domain()[1] * d.slope + d.intercept):y.range()[1] }) //@zl
          .style('stroke', function(d,i,j) { return color(d,j) })
          .style('stroke-opacity', function(d,i) {
             return (d.disabled || (typeof d.slope === 'undefined' && typeof d.intercept === 'undefined'))? 0 : 1   //@zl
          });

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Axes

      if (showXAxis) {
        xAxis
            .scale(x)
            .ticks( xAxis.ticks() ? xAxis.ticks() : availableWidth / 100 )
            .tickSize( -availableHeight , 0);

        g.select('.nv-x.nv-axis')
            .attr('transform', 'translate(0,' + y.range()[0] + ')')
            .call(xAxis);
      }

      if (showYAxis) {
        yAxis
            .scale(y)
            .ticks( yAxis.ticks() ? yAxis.ticks() : availableHeight / 36 )
            .tickSize( -availableWidth, 0);

        g.select('.nv-y.nv-axis')
            .call(yAxis);
      }


      if (showDistX) {
        distX
            .getData(scatter.x())
            .scale(x)
            .width(availableWidth)
            .color(data.map(function(d,i) {
              return d.color || color(d, i);
            }).filter(function(d,i) { return !data[i].disabled }));
        gEnter.select('.nv-distWrap').append('g')
            .attr('class', 'nv-distributionX');
        g.select('.nv-distributionX')
            .attr('transform', 'translate(0,' + y.range()[0] + ')')
            .datum(data.filter(function(d) { return !d.disabled }))
            .call(distX);
      }

      if (showDistY) {
        distY
            .getData(scatter.y())
            .scale(y)
            .width(availableHeight)
            .color(data.map(function(d,i) {
              return d.color || color(d, i);
            }).filter(function(d,i) { return !data[i].disabled }));
        gEnter.select('.nv-distWrap').append('g')
            .attr('class', 'nv-distributionY');
        g.select('.nv-distributionY')
            .attr('transform', 'translate(' + (rightAlignYAxis ? availableWidth : -distY.size() ) + ',0)')
            .datum(data.filter(function(d) { return !d.disabled }))
            .call(distY);
      }

      //------------------------------------------------------------




      if (d3.fisheye) {
        g.select('.nv-background')
            .attr('width', availableWidth)
            .attr('height', availableHeight)
            ;

        g.select('.nv-background').on('mousemove', updateFisheye);
        g.select('.nv-background').on('click', function() { pauseFisheye = !pauseFisheye;});
        scatter.dispatch.on('elementClick.freezeFisheye', function() {
          pauseFisheye = !pauseFisheye;
        });
      }


      function updateFisheye() {
        if (pauseFisheye) {
          g.select('.nv-point-paths').style('pointer-events', 'all');
          return false;
        }

        g.select('.nv-point-paths').style('pointer-events', 'none' );

        var mouse = d3.mouse(this);
        x.distortion(fisheye).focus(mouse[0]);
        y.distortion(fisheye).focus(mouse[1]);

        g.select('.nv-scatterWrap')
            .datum(data.filter(function(d) { return !d.disabled }))
            .call(scatter);

        if (showXAxis)
          g.select('.nv-x.nv-axis').call(xAxis);

        if (showYAxis)
          g.select('.nv-y.nv-axis').call(yAxis);
        
        g.select('.nv-distributionX')
            .datum(data.filter(function(d) { return !d.disabled }))
            .call(distX);
        g.select('.nv-distributionY')
            .datum(data.filter(function(d) { return !d.disabled }))
            .call(distY);
      }



      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------

      controls.dispatch.on('legendClick', function(d,i) {
        d.disabled = !d.disabled;

        fisheye = d.disabled ? 0 : 2.5;
        g.select('.nv-background') .style('pointer-events', d.disabled ? 'none' : 'all');
        g.select('.nv-point-paths').style('pointer-events', d.disabled ? 'all' : 'none' );

        if (d.disabled) {
          x.distortion(fisheye).focus(0);
          y.distortion(fisheye).focus(0);

          g.select('.nv-scatterWrap').call(scatter);
          g.select('.nv-x.nv-axis').call(xAxis);
          g.select('.nv-y.nv-axis').call(yAxis);
        } else {
          pauseFisheye = false;
        }

        chart.update();
      });

      legend.dispatch.on('stateChange', function(newState) { 
        state = newState;
        dispatch.stateChange(state);
        chart.update();
      });


      scatter.dispatch.on('elementMouseover.tooltip', function(e) {
        d3.select('.nv-chart-' + scatter.id() + ' .nv-series-' + e.seriesIndex + ' .nv-distx-' + e.pointIndex)
            .attr('y1', e.pos[1] - availableHeight);
        d3.select('.nv-chart-' + scatter.id() + ' .nv-series-' + e.seriesIndex + ' .nv-disty-' + e.pointIndex)
            .attr('x2', e.pos[0] + distX.size());

        e.pos = [e.pos[0] + margin.left, e.pos[1] + margin.top];
        dispatch.tooltipShow(e);
      });

      dispatch.on('tooltipShow', function(e) {
        if (tooltips) showTooltip(e, that.parentNode);
      });

      // Update chart from a state object passed to event handler
      dispatch.on('changeState', function(e) {

        if (typeof e.disabled !== 'undefined') {
          data.forEach(function(series,i) {
            series.disabled = e.disabled[i];
          });

          state.disabled = e.disabled;
        }

        chart.update();
      });

      //============================================================


      //store old scales for use in transitions on update
      x0 = x.copy();
      y0 = y.copy();


    });

    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  scatter.dispatch.on('elementMouseout.tooltip', function(e) {
    dispatch.tooltipHide(e);

    d3.select('.nv-chart-' + scatter.id() + ' .nv-series-' + e.seriesIndex + ' .nv-distx-' + e.pointIndex)
        .attr('y1', 0);
    d3.select('.nv-chart-' + scatter.id() + ' .nv-series-' + e.seriesIndex + ' .nv-disty-' + e.pointIndex)
        .attr('x2', distY.size());
  });
  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.dispatch = dispatch;
  chart.scatter = scatter;
  chart.legend = legend;
  chart.controls = controls;
  chart.xAxis = xAxis;
  chart.yAxis = yAxis;
  chart.distX = distX;
  chart.distY = distY;

  d3.rebind(chart, scatter, 'id', 'interactive', 'pointActive', 'x', 'y', 'shape', 'size', 'xScale', 'yScale', 'zScale', 'xDomain', 'yDomain', 'xRange', 'yRange', 'sizeDomain', 'sizeRange', 'forceX', 'forceY', 'forceSize', 'clipVoronoi', 'clipRadius', 'useVoronoi');

  chart.options = nv.utils.optionsFunc.bind(chart);
  
  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    legend.color(color);
    distX.color(color);
    distY.color(color);
    return chart;
  };

  chart.showDistX = function(_) {
    if (!arguments.length) return showDistX;
    showDistX = _;
    return chart;
  };

  chart.showDistY = function(_) {
    if (!arguments.length) return showDistY;
    showDistY = _;
    return chart;
  };

  chart.showControls = function(_) {
    if (!arguments.length) return showControls;
    showControls = _;
    return chart;
  };

  chart.showLegend = function(_) {
    if (!arguments.length) return showLegend;
    showLegend = _;
    return chart;
  };

  chart.showXAxis = function(_) {
    if (!arguments.length) return showXAxis;
    showXAxis = _;
    return chart;
  };

  chart.showYAxis = function(_) {
    if (!arguments.length) return showYAxis;
    showYAxis = _;
    return chart;
  };

  chart.rightAlignYAxis = function(_) {
    if(!arguments.length) return rightAlignYAxis;
    rightAlignYAxis = _;
    yAxis.orient( (_) ? 'right' : 'left');
    return chart;
  };

  chart.fisheye = function(_) {
    if (!arguments.length) return fisheye;
    fisheye = _;
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.tooltipXContent = function(_) {
    if (!arguments.length) return tooltipX;
    tooltipX = _;
    return chart;
  };

  chart.tooltipYContent = function(_) {
    if (!arguments.length) return tooltipY;
    tooltipY = _;
    return chart;
  };

  chart.state = function(_) {
    if (!arguments.length) return state;
    state = _;
    return chart;
  };

  chart.defaultState = function(_) {
    if (!arguments.length) return defaultState;
    defaultState = _;
    return chart;
  };

  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  chart.transitionDuration = function(_) {
    if (!arguments.length) return transitionDuration;
    transitionDuration = _;
    return chart;
  };
  //@zl --------------------
  chart.showLabel = function(_) {
    if (!arguments.length) return showLabel;
    showLabel = _;
    return chart;
  };
  //============================================================


  return chart;
}

nv.models.sparkline = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var margin = {top: 2, right: 0, bottom: 2, left: 0}
    , width = 400
    , height = 32
    , animate = true
    , x = d3.scale.linear()
    , y = d3.scale.linear()
    , getX = function(d) { return d.x }
    , getY = function(d) { return d.y }
    , color = nv.utils.getColor(['#000'])
    , xDomain
    , yDomain
    , xRange
    , yRange
    ;

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var availableWidth = width - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom,
          container = d3.select(this);


      //------------------------------------------------------------
      // Setup Scales

      x   .domain(xDomain || d3.extent(data, getX ))
          .range(xRange || [0, availableWidth]);

      y   .domain(yDomain || d3.extent(data, getY ))
          .range(yRange || [availableHeight, 0]);

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-sparkline').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-sparkline');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      //------------------------------------------------------------


      var paths = wrap.selectAll('path')
          .data(function(d) { return [d] });
      paths.enter().append('path');
      paths.exit().remove();
      paths
          .style('stroke', function(d,i) { return d.color || color(d, i) })
          .attr('d', d3.svg.line()
            .x(function(d,i) { return x(getX(d,i)) })
            .y(function(d,i) { return y(getY(d,i)) })
          );


      // TODO: Add CURRENT data point (Need Min, Mac, Current / Most recent)
      var points = wrap.selectAll('circle.nv-point')
          .data(function(data) {
              var yValues = data.map(function(d, i) { return getY(d,i); });
              function pointIndex(index) {
                  if (index != -1) {
                var result = data[index];
                      result.pointIndex = index;
                      return result;
                  } else {
                      return null;
                  }
              }
              var maxPoint = pointIndex(yValues.lastIndexOf(y.domain()[1])),
                  minPoint = pointIndex(yValues.indexOf(y.domain()[0])),
                  currentPoint = pointIndex(yValues.length - 1);
              return [minPoint, maxPoint, currentPoint].filter(function (d) {return d != null;});
          });
      points.enter().append('circle');
      points.exit().remove();
      points
          .attr('cx', function(d,i) { return x(getX(d,d.pointIndex)) })
          .attr('cy', function(d,i) { return y(getY(d,d.pointIndex)) })
          .attr('r', 2)
          .attr('class', function(d,i) {
            return getX(d, d.pointIndex) == x.domain()[1] ? 'nv-point nv-currentValue' :
                   getY(d, d.pointIndex) == y.domain()[0] ? 'nv-point nv-minValue' : 'nv-point nv-maxValue'
          });
    });

    return chart;
  }


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------
  chart.options = nv.utils.optionsFunc.bind(chart);
  
  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.x = function(_) {
    if (!arguments.length) return getX;
    getX = d3.functor(_);
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return getY;
    getY = d3.functor(_);
    return chart;
  };

  chart.xScale = function(_) {
    if (!arguments.length) return x;
    x = _;
    return chart;
  };

  chart.yScale = function(_) {
    if (!arguments.length) return y;
    y = _;
    return chart;
  };

  chart.xDomain = function(_) {
    if (!arguments.length) return xDomain;
    xDomain = _;
    return chart;
  };

  chart.yDomain = function(_) {
    if (!arguments.length) return yDomain;
    yDomain = _;
    return chart;
  };

  chart.xRange = function(_) {
    if (!arguments.length) return xRange;
    xRange = _;
    return chart;
  };

  chart.yRange = function(_) {
    if (!arguments.length) return yRange;
    yRange = _;
    return chart;
  };

  chart.animate = function(_) {
    if (!arguments.length) return animate;
    animate = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    return chart;
  };

  //============================================================


  return chart;
}

nv.models.sparklinePlus = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var sparkline = nv.models.sparkline();

  var margin = {top: 15, right: 100, bottom: 10, left: 50}
    , width = null
    , height = null
    , x
    , y
    , index = []
    , paused = false
    , xTickFormat = d3.format(',r')
    , yTickFormat = d3.format(',.2f')
    , showValue = true
    , alignValue = true
    , rightAlignValue = false
    , noData = "No Data Available."
    ;

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this);

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;

      

      chart.update = function() { chart(selection) };
      chart.container = this;


      //------------------------------------------------------------
      // Display No Data message if there's nothing to show.

      if (!data || !data.length) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', margin.top + availableHeight / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }

      var currentValue = sparkline.y()(data[data.length-1], data.length-1);

      //------------------------------------------------------------



      //------------------------------------------------------------
      // Setup Scales

      x = sparkline.xScale();
      y = sparkline.yScale();

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-sparklineplus').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-sparklineplus');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-sparklineWrap');
      gEnter.append('g').attr('class', 'nv-valueWrap');
      gEnter.append('g').attr('class', 'nv-hoverArea');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Main Chart Component(s)

      var sparklineWrap = g.select('.nv-sparklineWrap');

      sparkline
        .width(availableWidth)
        .height(availableHeight);

      sparklineWrap
          .call(sparkline);

      //------------------------------------------------------------


      var valueWrap = g.select('.nv-valueWrap');
      
      var value = valueWrap.selectAll('.nv-currentValue')
          .data([currentValue]);

      value.enter().append('text').attr('class', 'nv-currentValue')
          .attr('dx', rightAlignValue ? -8 : 8)
          .attr('dy', '.9em')
          .style('text-anchor', rightAlignValue ? 'end' : 'start');

      value
          .attr('x', availableWidth + (rightAlignValue ? margin.right : 0))
          .attr('y', alignValue ? function(d) { return y(d) } : 0)
          .style('fill', sparkline.color()(data[data.length-1], data.length-1))
          .text(yTickFormat(currentValue));



      gEnter.select('.nv-hoverArea').append('rect')
          .on('mousemove', sparklineHover)
          .on('click', function() { paused = !paused })
          .on('mouseout', function() { index = []; updateValueLine(); });
          //.on('mouseout', function() { index = null; updateValueLine(); });

      g.select('.nv-hoverArea rect')
          .attr('transform', function(d) { return 'translate(' + -margin.left + ',' + -margin.top + ')' })
          .attr('width', availableWidth + margin.left + margin.right)
          .attr('height', availableHeight + margin.top);



      function updateValueLine() { //index is currently global (within the chart), may or may not keep it that way
        if (paused) return;

        var hoverValue = g.selectAll('.nv-hoverValue').data(index)

        var hoverEnter = hoverValue.enter()
          .append('g').attr('class', 'nv-hoverValue')
            .style('stroke-opacity', 0)
            .style('fill-opacity', 0);

        hoverValue.exit()
          .transition().duration(250)
            .style('stroke-opacity', 0)
            .style('fill-opacity', 0)
            .remove();

        hoverValue
            .attr('transform', function(d) { return 'translate(' + x(sparkline.x()(data[d],d)) + ',0)' })
          .transition().duration(250)
            .style('stroke-opacity', 1)
            .style('fill-opacity', 1);

        if (!index.length) return;

        hoverEnter.append('line')
            .attr('x1', 0)
            .attr('y1', -margin.top)
            .attr('x2', 0)
            .attr('y2', availableHeight);


        hoverEnter.append('text').attr('class', 'nv-xValue')
            .attr('x', -6)
            .attr('y', -margin.top)
            .attr('text-anchor', 'end')
            .attr('dy', '.9em')


        g.select('.nv-hoverValue .nv-xValue')
            .text(xTickFormat(sparkline.x()(data[index[0]], index[0])));

        hoverEnter.append('text').attr('class', 'nv-yValue')
            .attr('x', 6)
            .attr('y', -margin.top)
            .attr('text-anchor', 'start')
            .attr('dy', '.9em')

        g.select('.nv-hoverValue .nv-yValue')
            .text(yTickFormat(sparkline.y()(data[index[0]], index[0])));

      }


      function sparklineHover() {
        if (paused) return;

        var pos = d3.mouse(this)[0] - margin.left;

        function getClosestIndex(data, x) {
          var distance = Math.abs(sparkline.x()(data[0], 0) - x);
          var closestIndex = 0;
          for (var i = 0; i < data.length; i++){
            if (Math.abs(sparkline.x()(data[i], i) - x) < distance) {
              distance = Math.abs(sparkline.x()(data[i], i) - x);
              closestIndex = i;
            }
          }
          return closestIndex;
        }

        index = [getClosestIndex(data, Math.round(x.invert(pos)))];

        updateValueLine();
      }

    });

    return chart;
  }


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.sparkline = sparkline;

  d3.rebind(chart, sparkline, 'x', 'y', 'xScale', 'yScale', 'color');

  chart.options = nv.utils.optionsFunc.bind(chart);
  
  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.xTickFormat = function(_) {
    if (!arguments.length) return xTickFormat;
    xTickFormat = _;
    return chart;
  };

  chart.yTickFormat = function(_) {
    if (!arguments.length) return yTickFormat;
    yTickFormat = _;
    return chart;
  };

  chart.showValue = function(_) {
    if (!arguments.length) return showValue;
    showValue = _;
    return chart;
  };

  chart.alignValue = function(_) {
    if (!arguments.length) return alignValue;
    alignValue = _;
    return chart;
  };

  chart.rightAlignValue = function(_) {
    if (!arguments.length) return rightAlignValue;
    rightAlignValue = _;
    return chart;
  };

  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  //============================================================


  return chart;
}

nv.models.stackedArea = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var margin = {top: 0, right: 0, bottom: 0, left: 0}
    , width = 960
    , height = 500
    , color = nv.utils.defaultColor() // a function that computes the color
    , id = Math.floor(Math.random() * 100000) //Create semi-unique ID incase user doesn't selet one
    , getX = function(d) { return d.x; } // accessor to get the x value from a data point
    , getY = function(d) { return d.y; } // accessor to get the y value from a data point //@Zl - fix for the duplicated data base issue...
    , style = 'stack'
    , offset = 'zero'
    , order = 'default'
    , interpolate = 'linear'  // controls the line interpolation
    , clipEdge = false // if true, masks lines within x and y scale
    , x //can be accessed via chart.xScale()
    , y //can be accessed via chart.yScale()
    , scatter = nv.models.scatter()
    , dispatch =  d3.dispatch('tooltipShow', 'tooltipHide', 'areaClick', 'areaMouseover', 'areaMouseout')
    ;

  scatter
    .size(2.2) // default size
    .sizeDomain([2.2,2.2]) // all the same size by default
    ;

  /************************************
   * offset:
   *   'wiggle' (stream)
   *   'zero' (stacked)
   *   'expand' (normalize to 100%)
   *   'silhouette' (simple centered)
   *
   * order:
   *   'inside-out' (stream)
   *   'default' (input order)
   ************************************/

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var availableWidth = width - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom,
          container = d3.select(this);

      //------------------------------------------------------------
      // Setup Scales

      x = scatter.xScale();
      y = scatter.yScale();

      //------------------------------------------------------------

      var dataRaw = data;
      // Injecting point index into each point because d3.layout.stack().out does not give index
      data.forEach(function(aseries, i) {
        aseries.seriesIndex = i;
        aseries.values = aseries.values.map(function(d, j) {
          d.index = j;
          d.seriesIndex = i;
          return d;
        });
      });

      var dataFiltered = data.filter(function(series) {
            return !series.disabled;
      });

      data = d3.layout.stack()
               .order(order)
               .offset(offset)
               .values(function(d) { return d.values })  //TODO: make values customizeable in EVERY model in this fashion
               .x(getX)
               .y(getY)
               .out(function(d, y0, y) {
                    var yHeight = (getY(d) === 0) ? 0 : y;
                    d.display = {
                      y: yHeight,
                     y0: y0
                    };
                })
              (dataFiltered);


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-stackedarea').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-stackedarea');
      var defsEnter = wrapEnter.append('defs');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g');

      gEnter.append('g').attr('class', 'nv-areaWrap');
      gEnter.append('g').attr('class', 'nv-scatterWrap');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      //------------------------------------------------------------


      scatter
        .width(availableWidth)
        .height(availableHeight)
        .x(getX)
        .y(function(d) { return d.display.y + d.display.y0 })
        .forceY([0])
        .color(data.map(function(d,i) {
          return d.color || color(d, d.seriesIndex);
        }));


      var scatterWrap = g.select('.nv-scatterWrap')
          .datum(data);

      scatterWrap.call(scatter);

      defsEnter.append('clipPath')
          .attr('id', 'nv-edge-clip-' + id)
        .append('rect');

      wrap.select('#nv-edge-clip-' + id + ' rect')
          .attr('width', availableWidth)
          .attr('height', availableHeight);

      g   .attr('clip-path', clipEdge ? 'url(#nv-edge-clip-' + id + ')' : '');

      var area = d3.svg.area()
          .x(function(d,i)  { return x(getX(d,i)) })
          .y0(function(d) {
              return y(d.display.y0)
          })
          .y1(function(d) {
              return y(d.display.y + d.display.y0)
          })
          .interpolate(interpolate);

      var zeroArea = d3.svg.area()
          .x(function(d,i)  { return x(getX(d,i)) })
          .y0(function(d) { return y(d.display.y0) })
          .y1(function(d) { return y(d.display.y0) });


      var path = g.select('.nv-areaWrap').selectAll('path.nv-area')
          .data(function(d) { return d });

      path.enter().append('path').attr('class', function(d,i) { return 'nv-area nv-area-' + i })
          .attr('d', function(d,i){
            return zeroArea(d.values, d.seriesIndex);
          })
          .on('mouseover', function(d,i) {
            d3.select(this).classed('hover', true);
            dispatch.areaMouseover({
              point: d,
              series: d.key,
              pos: [d3.event.pageX, d3.event.pageY],
              seriesIndex: d.seriesIndex
            });
          })
          .on('mouseout', function(d,i) {
            d3.select(this).classed('hover', false);
            dispatch.areaMouseout({
              point: d,
              series: d.key,
              pos: [d3.event.pageX, d3.event.pageY],
              seriesIndex: d.seriesIndex
            });
          })
          .on('click', function(d,i) {
            d3.select(this).classed('hover', false);
            dispatch.areaClick({
              point: d,
              series: d.key,
              pos: [d3.event.pageX, d3.event.pageY],
              seriesIndex: d.seriesIndex
            });
          })

      path.exit().remove();

      path
          .style('fill', function(d,i){
            return d.color || color(d, d.seriesIndex)
          })
          .style('stroke', function(d,i){ return d.color || color(d, d.seriesIndex) });
      path.transition()
          .attr('d', function(d,i) {
            return area(d.values,i)
          });



      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------

      scatter.dispatch.on('elementMouseover.area', function(e) {
        g.select('.nv-chart-' + id + ' .nv-area-' + e.seriesIndex).classed('hover', true);
      });
      scatter.dispatch.on('elementMouseout.area', function(e) {
        g.select('.nv-chart-' + id + ' .nv-area-' + e.seriesIndex).classed('hover', false);
      });

      //============================================================
      //Special offset functions
      chart.d3_stackedOffset_stackPercent = function(stackData) {
          var n = stackData.length,    //How many series
          m = stackData[0].length,     //how many points per series
          k = 1 / n,
           i,
           j,
           o,
           y0 = [];

          for (j = 0; j < m; ++j) { //Looping through all points
            for (i = 0, o = 0; i < dataRaw.length; i++)  //looping through series'
                o += getY(dataRaw[i].values[j])   //total value of all points at a certian point in time.

            if (o) for (i = 0; i < n; i++)
               stackData[i][j][1] /= o;
            else
              for (i = 0; i < n; i++)
               stackData[i][j][1] = k;
          }
          for (j = 0; j < m; ++j) y0[j] = 0;
          return y0;
      };

    });


    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  scatter.dispatch.on('elementClick.area', function(e) {
    dispatch.areaClick(e);
  })
  scatter.dispatch.on('elementMouseover.tooltip', function(e) {
        e.pos = [e.pos[0] + margin.left, e.pos[1] + margin.top],
        dispatch.tooltipShow(e);
  });
  scatter.dispatch.on('elementMouseout.tooltip', function(e) {
        dispatch.tooltipHide(e);
  });

  //============================================================

  //============================================================
  // Global getters and setters
  //------------------------------------------------------------

  chart.dispatch = dispatch;
  chart.scatter = scatter;

  d3.rebind(chart, scatter, 'interactive', 'size', 'xScale', 'yScale', 'zScale', 'xDomain', 'yDomain', 'xRange', 'yRange',
    'sizeDomain', 'forceX', 'forceY', 'forceSize', 'clipVoronoi', 'useVoronoi','clipRadius','highlightPoint','clearHighlights');

  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.x = function(_) {
    if (!arguments.length) return getX;
    getX = d3.functor(_);
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return getY;
    getY = d3.functor(_);
    return chart;
  }

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.clipEdge = function(_) {
    if (!arguments.length) return clipEdge;
    clipEdge = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    return chart;
  };

  chart.offset = function(_) {
    if (!arguments.length) return offset;
    offset = _;
    return chart;
  };

  chart.order = function(_) {
    if (!arguments.length) return order;
    order = _;
    return chart;
  };

  //shortcut for offset + order
  chart.style = function(_) {
    if (!arguments.length) return style;
    style = _;

    switch (style) {
      case 'stack':
        chart.offset('zero');
        chart.order('default');
        break;
      case 'stream':
        chart.offset('wiggle');
        chart.order('inside-out');
        break;
      case 'stream-center':
          chart.offset('silhouette');
          chart.order('inside-out');
          break;
      case 'expand':
        chart.offset('expand');
        chart.order('default');
        break;
      case 'stack_percent':
        chart.offset(chart.d3_stackedOffset_stackPercent);
        chart.order('default');
        break;
    }

    return chart;
  };

  chart.interpolate = function(_) {
      if (!arguments.length) return interpolate;
      interpolate = _;
      return chart;
  };
  //============================================================


  return chart;
}

nv.models.stackedAreaChart = function() {
  "use strict";
  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var stacked = nv.models.stackedArea()
    , xAxis = nv.models.axis()
    , yAxis = nv.models.axis()
    , legend = nv.models.legend()
    , controls = nv.models.legend()
    , interactiveLayer = nv.interactiveGuideline()
    ;

  var margin = {top: 30, right: 25, bottom: 50, left: 60}
    , width = null
    , height = null
    , color = nv.utils.defaultColor() // a function that takes in d, i and returns color
    , showControls = true
    , showLegend = true
    , showXAxis = true
    , showYAxis = true
    , rightAlignYAxis = false
    , useInteractiveGuideline = false
    , tooltips = true
    , tooltip = function(key, x, y, e, graph) {
        return '<h3>' + key + '</h3>' +
               '<p>' +  y + ' on ' + x + '</p>'
      }
    , x //can be accessed via chart.xScale()
    , y //can be accessed via chart.yScale()
    , yAxisTickFormat = d3.format(',.2f')
    , state = { style: stacked.style() }
    , defaultState = null
    , noData = 'No Data Available.'
    , dispatch = d3.dispatch('tooltipShow', 'tooltipHide', 'stateChange', 'changeState')
    , controlWidth = 250
    , cData = ['Stacked','Stream','Expanded']
    , controlLabels = {}
    , transitionDuration = 250
    ;

  xAxis
    .orient('bottom')
    .tickPadding(7)
    ;
  yAxis
    .orient((rightAlignYAxis) ? 'right' : 'left')
    ;

  controls.updateState(false);
  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var showTooltip = function(e, offsetElement) {
    var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
        top = e.pos[1] + ( offsetElement.offsetTop || 0),
        x = xAxis.tickFormat()(stacked.x()(e.point, e.pointIndex)),
        y = yAxis.tickFormat()(stacked.y()(e.point, e.pointIndex)),
        content = tooltip(e.series.key, x, y, e, chart);

    nv.tooltip.show([left, top], content, e.value < 0 ? 'n' : 's', null, offsetElement);
  };

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var container = d3.select(this),
          that = this;

      var availableWidth = (width  || parseInt(container.style('width')) || 960)
                             - margin.left - margin.right,
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;

      chart.update = function() { container.transition().duration(transitionDuration).call(chart); };
      chart.container = this;

      //set state.disabled
      state.disabled = data.map(function(d) { return !!d.disabled });

      if (!defaultState) {
        var key;
        defaultState = {};
        for (key in state) {
          if (state[key] instanceof Array)
            defaultState[key] = state[key].slice(0);
          else
            defaultState[key] = state[key];
        }
      }

      //------------------------------------------------------------
      // Display No Data message if there's nothing to show.

      if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
        var noDataText = container.selectAll('.nv-noData').data([noData]);

        noDataText.enter().append('text')
          .attr('class', 'nvd3 nv-noData')
          .attr('dy', '-.7em')
          .style('text-anchor', 'middle');

        noDataText
          .attr('x', margin.left + availableWidth / 2)
          .attr('y', margin.top + availableHeight / 2)
          .text(function(d) { return d });

        return chart;
      } else {
        container.selectAll('.nv-noData').remove();
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Scales

      x = stacked.xScale();
      y = stacked.yScale();

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-stackedAreaChart').data([data]);
      var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-stackedAreaChart').append('g');
      var g = wrap.select('g');

      gEnter.append("rect").style("opacity",0);
      gEnter.append('g').attr('class', 'nv-x nv-axis');
      gEnter.append('g').attr('class', 'nv-y nv-axis');
      gEnter.append('g').attr('class', 'nv-stackedWrap');
      gEnter.append('g').attr('class', 'nv-legendWrap');
      gEnter.append('g').attr('class', 'nv-controlsWrap');
      gEnter.append('g').attr('class', 'nv-interactive');

      g.select("rect").attr("width",availableWidth).attr("height",availableHeight);
      //------------------------------------------------------------
      // Legend

      if (showLegend) {
        var legendWidth = (showControls) ? availableWidth - controlWidth : availableWidth;
        legend
          .width(legendWidth);

        g.select('.nv-legendWrap')
            .datum(data)
            .call(legend);

        if ( margin.top != legend.height()) {
          margin.top = legend.height();
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;
        }

        g.select('.nv-legendWrap')
            .attr('transform', 'translate(' + (availableWidth-legendWidth) + ',' + (-margin.top) +')');
      }

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Controls

      if (showControls) {
        var controlsData = [
          {
            key: controlLabels.stacked || 'Stacked',
            metaKey: 'Stacked',
            disabled: stacked.style() != 'stack',
            style: 'stack'
          },
          {
            key: controlLabels.stream || 'Stream',
            metaKey: 'Stream',
            disabled: stacked.style() != 'stream',
            style: 'stream'
          },
          {
            key: controlLabels.expanded || 'Expanded',
            metaKey: 'Expanded',
            disabled: stacked.style() != 'expand',
            style: 'expand'
          },
          {
            key: controlLabels.stack_percent || 'Stack %',
            metaKey: 'Stack_Percent',
            disabled: stacked.style() != 'stack_percent',
            style: 'stack_percent'
          }
        ];

        controlWidth = (cData.length/3) * 260;

        controlsData = controlsData.filter(function(d) {
          return cData.indexOf(d.metaKey) !== -1;
        })

        controls
          .width( controlWidth )
          .color(['#444', '#444', '#444']);

        g.select('.nv-controlsWrap')
            .datum(controlsData)
            .call(controls);


        if ( margin.top != Math.max(controls.height(), legend.height()) ) {
          margin.top = Math.max(controls.height(), legend.height());
          availableHeight = (height || parseInt(container.style('height')) || 400)
                             - margin.top - margin.bottom;
        }


        g.select('.nv-controlsWrap')
            .attr('transform', 'translate(0,' + (-margin.top) +')');
      }

      //------------------------------------------------------------


      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      if (rightAlignYAxis) {
          g.select(".nv-y.nv-axis")
              .attr("transform", "translate(" + availableWidth + ",0)");
      }

      //------------------------------------------------------------
      // Main Chart Component(s)

      //------------------------------------------------------------
      //Set up interactive layer
      if (useInteractiveGuideline) {
        interactiveLayer
           .width(availableWidth)
           .height(availableHeight)
           .margin({left: margin.left, top: margin.top})
           .svgContainer(container)
           .xScale(x);
        wrap.select(".nv-interactive").call(interactiveLayer);
      }

      stacked
        .width(availableWidth)
        .height(availableHeight)

      var stackedWrap = g.select('.nv-stackedWrap')
          .datum(data);

      stackedWrap.transition().call(stacked);

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup Axes

      if (showXAxis) {
        xAxis
          .scale(x)
          .ticks( availableWidth / 100 )
          .tickSize( -availableHeight, 0);

        g.select('.nv-x.nv-axis')
            .attr('transform', 'translate(0,' + availableHeight + ')');

        g.select('.nv-x.nv-axis')
          .transition().duration(0)
            .call(xAxis);
      }

      if (showYAxis) {
        yAxis
          .scale(y)
          .ticks(stacked.offset() == 'wiggle' ? 0 : availableHeight / 36)
          .tickSize(-availableWidth, 0)
          .setTickFormat( (stacked.style() == 'expand' || stacked.style() == 'stack_percent')
                ? d3.format('%') : yAxisTickFormat);

        g.select('.nv-y.nv-axis')
          .transition().duration(0)
            .call(yAxis);
      }

      //------------------------------------------------------------


      //============================================================
      // Event Handling/Dispatching (in chart's scope)
      //------------------------------------------------------------

      stacked.dispatch.on('areaClick.toggle', function(e) {
        if (data.filter(function(d) { return !d.disabled }).length === 1)
          data.forEach(function(d) {
            d.disabled = false;
          });
        else
          data.forEach(function(d,i) {
            d.disabled = (i != e.seriesIndex);
          });

        state.disabled = data.map(function(d) { return !!d.disabled });
        dispatch.stateChange(state);

        chart.update();
      });

      legend.dispatch.on('stateChange', function(newState) {
        state.disabled = newState.disabled;
        dispatch.stateChange(state);
        chart.update();
      });

      controls.dispatch.on('legendClick', function(d,i) {
        if (!d.disabled) return;

        controlsData = controlsData.map(function(s) {
          s.disabled = true;
          return s;
        });
        d.disabled = false;

        stacked.style(d.style);


        state.style = stacked.style();
        dispatch.stateChange(state);

        chart.update();
      });


      interactiveLayer.dispatch.on('elementMousemove', function(e) {
          stacked.clearHighlights();
          var singlePoint, pointIndex, pointXLocation, allData = [];
          data
          .filter(function(series, i) {
            series.seriesIndex = i;
            return !series.disabled;
          })
          .forEach(function(series,i) {
              pointIndex = nv.interactiveBisect(series.values, e.pointXValue, chart.x());
              stacked.highlightPoint(i, pointIndex, true);
              var point = series.values[pointIndex];
              if (typeof point === 'undefined') return;
              if (typeof singlePoint === 'undefined') singlePoint = point;
              if (typeof pointXLocation === 'undefined') pointXLocation = chart.xScale()(chart.x()(point,pointIndex));

              //If we are in 'expand' mode, use the stacked percent value instead of raw value.
              var tooltipValue = (stacked.style() == 'expand') ? point.display.y : chart.y()(point,pointIndex);
              allData.push({
                  key: series.key,
                  value: tooltipValue,
                  color: color(series,series.seriesIndex),
                  stackedValue: point.display
              });
          });

          allData.reverse();

          //Highlight the tooltip entry based on which stack the mouse is closest to.
          if (allData.length > 2) {
            var yValue = chart.yScale().invert(e.mouseY);
            var yDistMax = Infinity, indexToHighlight = null;
            allData.forEach(function(series,i) {

               //To handle situation where the stacked area chart is negative, we need to use absolute values
               //when checking if the mouse Y value is within the stack area.
               yValue = Math.abs(yValue);
               var stackedY0 = Math.abs(series.stackedValue.y0);
               var stackedY = Math.abs(series.stackedValue.y);
               if ( yValue >= stackedY0 && yValue <= (stackedY + stackedY0))
               {
                  indexToHighlight = i;
                  return;
               }
            });
            if (indexToHighlight != null)
               allData[indexToHighlight].highlight = true;
          }

          var xValue = xAxis.tickFormat()(chart.x()(singlePoint,pointIndex));

          //If we are in 'expand' mode, force the format to be a percentage.
          var valueFormatter = (stacked.style() == 'expand') ?
               function(d,i) {return d3.format(".1%")(d);} :
               function(d,i) {return yAxis.tickFormat()(d); };
          interactiveLayer.tooltip
                  .position({left: pointXLocation + margin.left, top: e.mouseY + margin.top})
                  .chartContainer(that.parentNode)
                  .enabled(tooltips)
                  .valueFormatter(valueFormatter)
                  .data(
                      {
                        value: xValue,
                        series: allData
                      }
                  )();

          interactiveLayer.renderGuideLine(pointXLocation);

      });

      interactiveLayer.dispatch.on("elementMouseout",function(e) {
          dispatch.tooltipHide();
          stacked.clearHighlights();
      });


      dispatch.on('tooltipShow', function(e) {
        if (tooltips) showTooltip(e, that.parentNode);
      });

      // Update chart from a state object passed to event handler
      dispatch.on('changeState', function(e) {

        if (typeof e.disabled !== 'undefined' && data.length === e.disabled.length) {
          data.forEach(function(series,i) {
            series.disabled = e.disabled[i];
          });

          state.disabled = e.disabled;
        }

        if (typeof e.style !== 'undefined') {
          stacked.style(e.style);
        }

        chart.update();
      });

    });


    return chart;
  }


  //============================================================
  // Event Handling/Dispatching (out of chart's scope)
  //------------------------------------------------------------

  stacked.dispatch.on('tooltipShow', function(e) {
    //disable tooltips when value ~= 0
    //// TODO: consider removing points from voronoi that have 0 value instead of this hack
    /*
    if (!Math.round(stacked.y()(e.point) * 100)) {  // 100 will not be good for very small numbers... will have to think about making this valu dynamic, based on data range
      setTimeout(function() { d3.selectAll('.point.hover').classed('hover', false) }, 0);
      return false;
    }
   */

    e.pos = [e.pos[0] + margin.left, e.pos[1] + margin.top],
    dispatch.tooltipShow(e);
  });

  stacked.dispatch.on('tooltipHide', function(e) {
    dispatch.tooltipHide(e);
  });

  dispatch.on('tooltipHide', function() {
    if (tooltips) nv.tooltip.cleanup();
  });

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.dispatch = dispatch;
  chart.stacked = stacked;
  chart.legend = legend;
  chart.controls = controls;
  chart.xAxis = xAxis;
  chart.yAxis = yAxis;
  chart.interactiveLayer = interactiveLayer;

  d3.rebind(chart, stacked, 'x', 'y', 'size', 'xScale', 'yScale', 'xDomain', 'yDomain', 'xRange', 'yRange', 'sizeDomain', 'interactive', 'useVoronoi', 'offset', 'order', 'style', 'clipEdge', 'forceX', 'forceY', 'forceSize', 'interpolate');

  chart.options = nv.utils.optionsFunc.bind(chart);

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    legend.color(color);
    stacked.color(color);
    return chart;
  };

  chart.showControls = function(_) {
    if (!arguments.length) return showControls;
    showControls = _;
    return chart;
  };

  chart.showLegend = function(_) {
    if (!arguments.length) return showLegend;
    showLegend = _;
    return chart;
  };

  chart.showXAxis = function(_) {
    if (!arguments.length) return showXAxis;
    showXAxis = _;
    return chart;
  };

  chart.showYAxis = function(_) {
    if (!arguments.length) return showYAxis;
    showYAxis = _;
    return chart;
  };

  chart.rightAlignYAxis = function(_) {
    if(!arguments.length) return rightAlignYAxis;
    rightAlignYAxis = _;
    yAxis.orient( (_) ? 'right' : 'left');
    return chart;
  };

  chart.useInteractiveGuideline = function(_) {
    if(!arguments.length) return useInteractiveGuideline;
    useInteractiveGuideline = _;
    if (_ === true) {
       chart.interactive(false);
       chart.useVoronoi(false);
    }
    return chart;
  };

  chart.tooltip = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return tooltips;
    tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return tooltip;
    tooltip = _;
    return chart;
  };

  chart.state = function(_) {
    if (!arguments.length) return state;
    state = _;
    return chart;
  };

  chart.defaultState = function(_) {
    if (!arguments.length) return defaultState;
    defaultState = _;
    return chart;
  };

  chart.noData = function(_) {
    if (!arguments.length) return noData;
    noData = _;
    return chart;
  };

  chart.transitionDuration = function(_) {
    if (!arguments.length) return transitionDuration;
    transitionDuration = _;
    return chart;
  };

  chart.controlsData = function(_) {
    if (!arguments.length) return cData;
    cData = _;
    return chart;
  };

  chart.controlLabels = function(_) {
    if (!arguments.length) return controlLabels;
    if (typeof _ !== 'object') return controlLabels;
    controlLabels = _;
    return chart;
  };

  yAxis.setTickFormat = yAxis.tickFormat;

  yAxis.tickFormat = function(_) {
    if (!arguments.length) return yAxisTickFormat;
    yAxisTickFormat = _;
    return yAxis;
  };


  //============================================================

  return chart;
}
})();