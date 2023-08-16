var BadJs=function(){"use strict";Array.prototype.includes||(Array.prototype.includes=function(n,t){if(null==this)throw new TypeError('"this" is null or not defined');var e=Object(this),r=e.length>>>0;if(0==r)return!1;var o,i,t=0|t,a=Math.max(0<=t?t:r-Math.abs(t),0);for(;a<r;){if((o=e[a])===(i=n)||"number"==typeof o&&"number"==typeof i&&isNaN(o)&&isNaN(i))return!0;a++}return!1}),Object.defineProperty||(Object.defineProperty=function(n,t,e){n[t]=e.value}),"function"!=typeof Object.assign&&(Object.assign=function(n,t){var e=arguments;if(null==n)throw new TypeError("Cannot convert undefined or null to object");for(var r=Object(n),o=1;o<arguments.length;o++){var i=e[o];if(null!=i)for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(r[a]=i[a])}return r});function f(n){return"function"==typeof n}function l(n){return void 0===n}function o(n,t,e){window.addEventListener?n.addEventListener(t,e,!0):window.attachEvent&&n.attachEvent("on"+t,e)}function a(n){if("string"==typeof n)return n;var o=[];return function n(t){for(var e in t)if(t.hasOwnProperty(e)){var r=t[e];if("function"==typeof r||void 0===r)return;"[object Object]"===Object.prototype.toString.call(r)?n(r):o.push(encodeURIComponent(e)+"="+encodeURIComponent(r))}}(n),o.join("&")}function e(n,t){this.reportInstance=t,this.errorArr=[],this.error(n)}function r(n,t){this.reject(n,t)}function i(n,t,e){this.report=t,this.globalVariable=n,this.error(e)}function s(n){this.conf=n||{}}function n(n){this.config=this.mergeConf(n),this.report=this.report(this.config),this.jsError(),this.promiseError()}e.getIntance=function(n,t){return e.instance=e.instance?e.instance:new e(n,t)},e.prototype.error=function(s){var c=this;o(s,"error",function(n){if(n=n||window.event){var t=n.target||n.srcElement,e=!1;if(6!==a()&&7!==a()&&(e=t instanceof HTMLScriptElement||t instanceof HTMLLinkElement,t instanceof HTMLImageElement||t instanceof HTMLVideoElement||t instanceof HTMLAudioElement))return!1;var r,o={},i=c.reportInstance;e?(r=t.src||t.href,o.title="resource"+t,o.msg=r,o.from=location.href):(o.title=n.message,o.msg=n.error&&n.error.stack||n.source+":"+n.message,o.from=location.href,o.lineno=n.lineno,o.colno=n.colno),s.ERROE_POLL.includes(o.title)||(s.ERROE_POLL.push(o.title),i.report&&f(i.report)&&(e?i.reportResource(o):i.report(o)))}function a(){var n=navigator.userAgent,t=-1<n.indexOf("compatible")&&-1<n.indexOf("MSIE"),e=-1<n.indexOf("Edge")&&!t,r=-1<n.indexOf("Trident")&&-1<n.indexOf("rv:11.0");return t?(new RegExp("MSIE (\\d+\\.\\d+);").test(n),7==+(t=parseFloat(RegExp.$1))?7:8==+t?8:9==+t?9:10==+t?10:6):e?"edge":r?11:-1}})},r.getIntance=function(n,t){return r.instance=r.instance?r.instance:new r(n,t)},r.prototype.reject=function(e,n){var r=n;o(e,"unhandledrejection",function(n){var t={};n&&(n="object"==typeof n.reason?JSON.stringify(n.reason):n.reason,t.title="unhandledrejection:"+n,t.from=location.href,t.msg=n,e.ERROE_POLL.includes(t.title)||(e.ERROE_POLL.push(t.title),r.report&&f(r.report)&&r.report(t)))})},i.getIntance=function(n,t,e){return i.instance=i.instance?i.instance:new i(n,t,e)},i.prototype.error=function(n){var t=this;n?this.errorHandler(n):o(this.globalVariable,"load",function(){var n=t.globalVariable.Vue;n&&n.config&&t.errorHandler(n)})},i.prototype.errorHandler=function(n){var o=this;n.config.errorHandler=function(n,t,e){var r;o.globalVariable.ERROE_POLL.includes(n)||(o.globalVariable.ERROE_POLL.push(n),(r={}).title=n,r.msg=e,r.from=location.href,(n=o.report).report&&f(n.report)&&n.report(r))}},s.getIntance=function(n){return s.instance=s.instance?s.instance:new s(n)},s.prototype.report=function(t){void 0===t&&(t={});var e="";if(this.conf&&this.conf.downgrade&&this.conf.downgrade.error){var r,n=this.conf.downgrade.error;for(r in n)n[r].forEach(function(n){t.msg.match(n)&&(e="_"+r)})}var o=this.mergeCommonConf("_js_error"+e),o=a(Object.assign(o,t)),o=""+this.conf.host+this.conf.path+"?"+o,i=new Image;i.onload=i.onerror=function(){i=null},i.src=o},s.prototype.reportResource=function(t){var e="";if(this.conf&&this.conf.downgrade&&this.conf.downgrade.resource){var r,n=this.conf.downgrade.resource;for(r in n)n[r].forEach(function(n){t.msg.match(n)&&(e="_"+r)})}var o=this.mergeCommonConf("_js_error_resource"+e),o=a(Object.assign(o,t)),o=""+this.conf.host+this.conf.path+"?"+o,i=new Image;i.onload=i.onerror=function(){i=null},i.src=o},s.prototype.reportCustom=function(n,t){if(!n)throw new Error("[reportCustom] need a name as the first parameter.");var e=this.mergeCommonConf("_custom_report_"+n),e=a(Object.assign(e,{title:n+":自定义上报\b.",msg:n,from:location.href},t)),n=""+this.conf.host+this.conf.path+"?"+e,r=new Image;r.onload=r.onerror=function(){r=null},r.src=n},s.prototype.mergeCommonConf=function(n){void 0===n&&(n="");var t,e,r,o,i=this.conf,a=i.namespace,s=i.type,p=i.clienttype,u=i.productId,c=i.rules,h=i.sessionId,i=i.uk,f={};return s?f.type=s+n:(s="",o=c.path,t=c.hash,r=window.location.pathname,"boolean"==typeof o?((e=r.split("/")).shift(),s=e.join("_")):"object"==typeof o&&o&&((e=r.match(o)[0].split("/")).shift(),s+=e.join("_")),t&&0<location.hash.length?"boolean"==typeof t?(o=((r=window.location.hash)?r.substring(1).split("/"):[]).join("_"),f.type=s+o+n):"object"==typeof t&&(r=(e=window.location.hash.match(t))&&0<e.length?e[0].split("/"):[],f.type=s+r.join("_")+n):f.type=s+n),a&&(o=c.ctx?a+"_"+this.getExecContext()+"_"+f.type:a+"_"+f.type,f.type=o),h&&(f.sessionId=h),i&&(f.uk=i),f.productId=u,f.clienttype=p,f.navigator=l(navigator)?null:navigator.userAgent,f},s.prototype.getExecContext=function(){var n,t="browser",e=window.navigator.userAgent.toLowerCase(),r={mini_wechat:~e.indexOf("miniprogram"),mini_swan:~e.indexOf("swan"),native_ios:~e.indexOf("netdisk")&&~e.indexOf("ios"),native_android:~e.indexOf("netdisk")&&~e.indexOf("android"),pc_windows:~e.indexOf("windowsbaiduyunguanjia")&&~e.indexOf("pc-window"),pc_mac:~e.indexOf("unibaiduyunguanjia")&&~e.indexOf("pc-mac"),pc_linux:~e.indexOf("unibaiduyunguanjia")&&~e.indexOf("pc-linux")};for(n in r)if(Object.hasOwnProperty.call(r,n)&&r[n]){t=n;break}return t},window.ERROE_POLL=[];return n.getIntance=function(){return n.instance=n.instance?n.instance:new n({})},n.prototype.mergeConf=function(n){n=l(n)?{}:n;var t={host:"http://pan.baidu.com",path:"/bpapi/analytics",namespace:"",productId:"",type:"",uk:"",sessionId:"",rules:{path:!0,hash:!0},clienttype:0,vueError:!0,jsError:!0,promiseError:!0,env:window,report:s.getIntance};if(!n.report||f(n.report))return Object.assign(t,n);console.error("report must is function")},n.prototype.jsError=function(){this.config.jsError&&e.getIntance(this.config.env,this.report)},n.prototype.promiseError=function(){this.config.promiseError&&r.getIntance(this.config.env,this.report)},n.prototype.vueError=function(){this.config.vueError&&i.getIntance(this.config.env,this.report)},n.prototype.vueErrorHandler=function(n){this.config.vueError&&i.getIntance(this.config.env,this.report,n)},n.prototype.report=function(n){return this.config.report(n)},n.prototype.reportCustom=function(n,t){this.config.report().reportCustom(n,t)},n}();