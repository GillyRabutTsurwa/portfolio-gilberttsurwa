"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function _createClass(t,e,n){return e&&_defineProperties(t.prototype,e),n&&_defineProperties(t,n),t}var loading=function(){setTimeout(function(){document.querySelector(".loader").style.opacity=0,document.querySelector(".loader").style.display="none",document.querySelector(".maincontent").style.display="block",setTimeout(function(){document.querySelector(".maincontent").style.opacity=1},50)},3800),init()},nextSlide=function(){var t=document.querySelectorAll(".header__slider--slide"),e=document.querySelector(".current"),n=e.nextElementSibling;e.classList.remove("current"),n?n.classList.add("current"):t[0].classList.add("current"),setTimeout(function(){return e.classList.remove("current")})},collapseAndShow=function(){document.querySelectorAll(".info__heading").forEach(function(t,e){t.addEventListener("click",function(){this.classList.toggle("toggled")})}),$(".info__heading").each(function(t){$(this).click(function(){$(".info__toggleAppear").eq(t).slideToggle("slow"),$(".info__toggleAppear").eq(t).toggleClass("collapse")})})},iconChangeOnLoad=function(){var n=document.querySelector("#deviconLoad"),t=["html5-plain","css3-plain","javascript-plain","bootstrap-plain","sass-original","jquery-plain","nodejs-plain","express-original-wordmark","mongodb-plain-wordmark","git-plain","github-plain","webpack-plain","babel-plain","heroku-original-wordmark","gulp-plain"],i=t[Math.floor(Math.random()*t.length)];t.forEach(function(t,e){n.setAttribute("class","devicon-".concat(i))})},iconChange=function(){var n=document.querySelector("#devicon");console.log(n.getAttribute("class"));["html5-plain","css3-plain","javascript-plain","bootstrap-plain","sass-original","jquery-plain","nodejs-plain","express-original-wordmark","mongodb-plain-wordmark","git-plain","github-plain","webpack-plain","babel-plain","heroku-original-wordmark","gulp-plain"].forEach(function(t,e){setInterval(function(){n.setAttribute("class","devicon-".concat(t))},3800*(e+1))})},typeWriterEffect=function(){var t=document.querySelector(".text-type"),e=JSON.parse(t.getAttribute("data-words")),n=t.getAttribute("data-wait");new TypeWriter(t,e,n)},TypeWriter=function(){function i(t,e){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:3e3;_classCallCheck(this,i),this.textElement=t,this.words=e,this.txt="",this.wordIndex=0,this.wait=parseInt(n,10),this.type(),this.isDeleting=!1}return _createClass(i,[{key:"type",value:function(){var t=this,e=this.wordIndex%this.words.length,n=this.words[e];this.isDeleting?this.txt=n.substring(0,this.txt.length-1):this.txt=n.substring(0,this.txt.length+1),this.textElement.innerHTML='<span class="txt">'.concat(this.txt,"</span>");var i=300;this.isDeleting&&(i/=2),this.isDeleting||this.txt!==n?this.isDeleting&&""===this.txt&&(this.isDeleting=!1,this.wordIndex++,i=500):(i=this.wait,this.isDeleting=!0),setTimeout(function(){return t.type()},i)}}]),i}(),fadeNavButton=function(){var t=document.querySelector(".navigation__button"),e=document.querySelector(".navigation__background");setTimeout(function(){t.classList.add("fadeIn"),e.classList.add("fadeIn")},7600)},init=function(){setInterval(nextSlide,5e3),collapseAndShow(),iconChangeOnLoad(),iconChange(),typeWriterEffect(),fadeNavButton()};document.addEventListener("DOMContentLoaded",loading);