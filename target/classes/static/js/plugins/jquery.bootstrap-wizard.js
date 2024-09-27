/*!
 * jQuery twitter bootstrap wizard plugin
 * Examples and documentation at: http://github.com/VinceG/twitter-bootstrap-wizard
 * version 1.4.2
 * Requires jQuery v1.3.2 or later
 * Supports Bootstrap 2.2.x, 2.3.x, 3.0
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Authors: Vadim Vincent Gabriel (http://vadimg.com), Jason Gill (www.gilluminate.com)
 */
!function(u){function a(e,n){e=u(e);var a=this,o='li:has([data-toggle="tab"])',r=[],s=u.extend({},u.fn.bootstrapWizard.defaults,n),l=null,d=null;function t(n){var t=d.find(o),i=t.index(u(n.currentTarget).parent(o)),e=u(t[i]);if(s.onTabClick&&"function"==typeof s.onTabClick&&!1===s.onTabClick(l,d,a.currentIndex(),i,e))return!1}function i(n){var t=u(n.target).parent(),i=d.find(o).index(t);return!t.hasClass("disabled")&&((!s.onTabChange||"function"!=typeof s.onTabChange||!1!==s.onTabChange(l,d,a.currentIndex(),i))&&(l=t,void a.fixNavigationButtons()))}this.rebindClick=function(n,t){n.unbind("click",t).bind("click",t)},this.fixNavigationButtons=function(){if(l.length||(d.find("a:first").tab("show"),l=d.find(o+":first")),u(s.previousSelector,e).toggleClass("disabled",a.firstIndex()>=a.currentIndex()),u(s.nextSelector,e).toggleClass("disabled",a.currentIndex()>=a.navigationLength()),u(s.nextSelector,e).toggleClass("hidden",a.currentIndex()>=a.navigationLength()&&0<u(s.finishSelector,e).length),u(s.lastSelector,e).toggleClass("hidden",a.currentIndex()>=a.navigationLength()&&0<u(s.finishSelector,e).length),u(s.finishSelector,e).toggleClass("hidden",a.currentIndex()<a.navigationLength()),u(s.backSelector,e).toggleClass("disabled",0==r.length),u(s.backSelector,e).toggleClass("hidden",a.currentIndex()>=a.navigationLength()&&0<u(s.finishSelector,e).length),a.rebindClick(u(s.nextSelector,e),a.next),a.rebindClick(u(s.previousSelector,e),a.previous),a.rebindClick(u(s.lastSelector,e),a.last),a.rebindClick(u(s.firstSelector,e),a.first),a.rebindClick(u(s.finishSelector,e),a.finish),a.rebindClick(u(s.backSelector,e),a.back),s.onTabShow&&"function"==typeof s.onTabShow&&!1===s.onTabShow(l,d,a.currentIndex()))return!1},this.next=function(n){if(e.hasClass("last"))return!1;if(s.onNext&&"function"==typeof s.onNext&&!1===s.onNext(l,d,a.nextIndex()))return!1;var t=a.currentIndex(),i=a.nextIndex();i>a.navigationLength()||(r.push(t),d.find(o+(s.withVisible?":visible":"")+":eq("+i+") a").tab("show"))},this.previous=function(n){if(e.hasClass("first"))return!1;if(s.onPrevious&&"function"==typeof s.onPrevious&&!1===s.onPrevious(l,d,a.previousIndex()))return!1;var t=a.currentIndex(),i=a.previousIndex();i<0||(r.push(t),d.find(o+(s.withVisible?":visible":"")+":eq("+i+") a").tab("show"))},this.first=function(n){return(!s.onFirst||"function"!=typeof s.onFirst||!1!==s.onFirst(l,d,a.firstIndex()))&&(!e.hasClass("disabled")&&(r.push(a.currentIndex()),void d.find(o+":eq(0) a").tab("show")))},this.last=function(n){return(!s.onLast||"function"!=typeof s.onLast||!1!==s.onLast(l,d,a.lastIndex()))&&(!e.hasClass("disabled")&&(r.push(a.currentIndex()),void d.find(o+":eq("+a.navigationLength()+") a").tab("show")))},this.finish=function(n){s.onFinish&&"function"==typeof s.onFinish&&s.onFinish(l,d,a.lastIndex())},this.back=function(){if(0==r.length)return null;var n=r.pop();if(s.onBack&&"function"==typeof s.onBack&&!1===s.onBack(l,d,n))return r.push(n),!1;e.find(o+":eq("+n+") a").tab("show")},this.currentIndex=function(){return d.find(o+(s.withVisible?":visible":"")).index(l)},this.firstIndex=function(){return 0},this.lastIndex=function(){return a.navigationLength()},this.getIndex=function(n){return d.find(o+(s.withVisible?":visible":"")).index(n)},this.nextIndex=function(){for(var n=this.currentIndex(),t=null;n++,(t=d.find(o+(s.withVisible?":visible":"")+":eq("+n+")"))&&t.hasClass("disabled"););return n},this.previousIndex=function(){for(var n=this.currentIndex(),t=null;n--,(t=d.find(o+(s.withVisible?":visible":"")+":eq("+n+")"))&&t.hasClass("disabled"););return n},this.navigationLength=function(){return d.find(o+(s.withVisible?":visible":"")).length-1},this.activeTab=function(){return l},this.nextTab=function(){return d.find(o+":eq("+(a.currentIndex()+1)+")").length?d.find(o+":eq("+(a.currentIndex()+1)+")"):null},this.previousTab=function(){return a.currentIndex()<=0?null:d.find(o+":eq("+parseInt(a.currentIndex()-1)+")")},this.show=function(n){var t=isNaN(n)?e.find(o+' a[href="#'+n+'"]'):e.find(o+":eq("+n+") a");0<t.length&&(r.push(a.currentIndex()),t.tab("show"))},this.disable=function(n){d.find(o+":eq("+n+")").addClass("disabled")},this.enable=function(n){d.find(o+":eq("+n+")").removeClass("disabled")},this.hide=function(n){d.find(o+":eq("+n+")").hide()},this.display=function(n){d.find(o+":eq("+n+")").show()},this.remove=function(n){var t=n[0],i=void 0!==n[1]&&n[1],e=d.find(o+":eq("+t+")");if(i){var a=e.find("a").attr("href");u(a).remove()}e.remove()},this.resetWizard=function(){u('a[data-toggle="tab"]',d).off("click",t),u('a[data-toggle="tab"]',d).off("show show.bs.tab",i),d=e.find("ul:first",e),l=d.find(o+".active",e),u('a[data-toggle="tab"]',d).on("click",t),u('a[data-toggle="tab"]',d).on("show show.bs.tab",i),a.fixNavigationButtons()},d=e.find("ul:first",e),l=d.find(o+".active",e),d.hasClass(s.tabClass)||d.addClass(s.tabClass),s.onInit&&"function"==typeof s.onInit&&s.onInit(l,d,0),s.onShow&&"function"==typeof s.onShow&&s.onShow(l,d,a.nextIndex()),u('a[data-toggle="tab"]',d).on("click",t),u('a[data-toggle="tab"]',d).on("show show.bs.tab",i)}u.fn.bootstrapWizard=function(e){if("string"!=typeof e)return this.each(function(n){var t=u(this);if(!t.data("bootstrapWizard")){var i=new a(t,e);t.data("bootstrapWizard",i),i.fixNavigationButtons()}});var n=Array.prototype.slice.call(arguments,1);return 1===n.length&&n.toString(),this.data("bootstrapWizard")[e](n)},u.fn.bootstrapWizard.defaults={withVisible:!0,tabClass:"nav nav-pills",nextSelector:".card-wizard .nav-item.next",previousSelector:".card-wizard .nav-item.previous",firstSelector:".card-wizard .nav-item.first",lastSelector:".card-wizard .nav-item.last",finishSelector:".card-wizard .nav-item.finish",backSelector:".card-wizard .nav-item.back",onShow:null,onInit:null,onNext:null,onPrevious:null,onLast:null,onFirst:null,onFinish:null,onBack:null,onTabChange:null,onTabClick:null,onTabShow:null}}(jQuery);