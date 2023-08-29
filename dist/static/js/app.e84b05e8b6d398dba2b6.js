webpackJsonp([1],{"10h7":function(e,t){},DEt2:function(e,t){},NHnr:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=o("7+uW"),n={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var a=o("VU/8")({name:"App"},n,!1,function(e){o("10h7")},null,null).exports,i=o("/ocq"),r=o("Gu7T"),l=o.n(r),c=o("mtWM"),u={name:"JokeDetailsModal",props:{joke:{type:Object}},data:function(){return{showMoreData:!1,idStore:!1}},methods:{close:function(){this.$emit("close"),this.showMoreData=!1},addFavoriteJoke:function(e){e.isFavorite=!e.isFavorite},handleBackdropClick:function(e){"modal-backdrop"==e.target.className&&this.close()},showMore:function(){this.showMoreData=!0}}},d={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{ref:"backdrop",staticClass:"modal-backdrop",on:{click:e.handleBackdropClick}},[o("div",{staticClass:"modal"},[o("header",{staticClass:"modal-header"},[e._t("header",function(){return[e._v("\n          "+e._s(e.joke.category)+"\n          ")]}),e._v(" "),o("a",{staticClass:"favourite-btn",attrs:{href:"javascript:"},on:{click:function(t){return e.addFavoriteJoke(e.joke)}}},[o("span",{staticClass:"fa",class:1==e.joke.isFavorite?"fa-heart":"fa-heart-o"})]),e._v(" "),o("button",{staticClass:"btn-close",attrs:{type:"button"},on:{click:e.close}},[e._v("\n          x\n          ")])],2),e._v(" "),o("section",{staticClass:"modal-body"},[e._t("body",function(){return["single"===e.joke.type?o("div",[e._v("\n              "+e._s(e.joke.joke)+"\n              ")]):e._e(),e._v(" "),"twopart"===e.joke.type?o("div",[e._v("\n                  "+e._s(e.joke.setup)+" "),o("br"),e._v(" "),e.showMoreData?e._e():o("a",{staticClass:"showMore",on:{click:function(t){return e.showMore()}}},[e._v("Show More..")]),e._v(" "),e.showMoreData?o("div",{staticClass:"jokeDelivery"},[o("b",[e._v(e._s(e.joke.delivery))]),o("br")]):e._e()]):e._e()]})],2)])])},staticRenderFns:[]};var p={name:"JokeList",components:{JokeDetailsModal:o("VU/8")(u,d,!1,function(e){o("DEt2")},null,null).exports},data:function(){return{jokesList:null,jokeData:null,loading:!0,isModalVisible:!1,jokeType:["Any","single","twopart"],selectedJokeType:"",visibleJokesCount:0}},mounted:function(){this.getJokesFromApi()},methods:{getJokesFromApi:function(){var e=this;c.a.get("https://v2.jokeapi.dev/joke/Programming,Pun,Misc,Spooky?safe-mode&amount=10").then(function(t){t.data.jokes.map(function(e,t){return e.isFavorite=!1,e}),e.jokesList?(e.jokesList=e.jokesList.filter(function(e){return!0===e.isFavorite}),e.jokesList=e.compareArray(t.data.jokes,e.jokesList),e.selectedJokeType="Any"):e.jokesList=t.data.jokes,e.visibleJokesCount=e.jokesList.length}).catch(function(t){console.log(t),e.errored=!0}).finally(function(){return e.loading=!1})},showModal:function(e){this.isModalVisible=!0,this.jokeData=e},closeModal:function(){this.isModalVisible=!1},onJokeTypeChange:function(e){var t=this;if(this.selectedJokeType=e.target.value,"Any"===e.target.value||""===e.target.value)this.visibleJokesCount=this.jokesList.length;else{var o=this.jokesList.filter(function(e){return e.type===t.selectedJokeType});this.visibleJokesCount=o.length}},setClass:function(e,t,o){return e+" "+t+" isFavorite"+o},compareArray:function(e,t){for(var o=e.length-1;o>=0;o--)for(var s=0;s<t.length;s++)e[o]&&e[o].id===t[s].id&&e.splice(o,1);return t.push.apply(t,l()(e)),t}}},k={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"hello"},[o("h1",[e._v("Jokes")]),e._v(" "),o("div",{staticClass:"headerCls"},[o("select",{directives:[{name:"model",rawName:"v-model",value:e.selectedJokeType,expression:"selectedJokeType"}],on:{change:[function(t){var o=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.selectedJokeType=t.target.multiple?o:o[0]},function(t){return e.onJokeTypeChange(t)}]}},[o("option",{attrs:{value:""}},[e._v("Select Joke Type")]),e._v(" "),e._l(e.jokeType,function(t){return o("option",{key:t,domProps:{value:t}},[e._v(e._s(t))])})],2),e._v(" "),o("button",{staticClass:"btn-green",attrs:{type:"button"},on:{click:function(t){return e.getJokesFromApi()}}},[e._v("\n        Fetch New Jokes\n      ")])]),e._v(" "),e.jokesList?o("div",{staticClass:"jokeCount"},[e._v("\n    Showing "+e._s(e.visibleJokesCount)+" jokes out of "+e._s(e.jokesList.length)+"\n  ")]):e._e(),e._v(" "),o("ul",[e._l(e.jokesList,function(t){return["Any"===e.selectedJokeType||""===e.selectedJokeType||t.type===e.selectedJokeType?o("li",{key:t.id,class:e.setClass(t.category,e.selectedJokeType,t.isFavorite)},[o("span",[e._v(e._s("single"===t.type?t.joke.split(" ").slice(0,3).join(" ").replace(/\/r/,"/"):t.setup.split(" ").slice(0,3).join(" ").replace(/\/r/,"/"))+"...")]),e._v(" "),o("button",{staticClass:"btn-green",attrs:{type:"button"},on:{click:function(o){return e.showModal(t)}}},[e._v("\n          >>\n        ")])]):e._e()]})],2),e._v(" "),e.jokeData?o("JokeDetailsModal",{directives:[{name:"show",rawName:"v-show",value:e.isModalVisible,expression:"isModalVisible"}],attrs:{joke:e.jokeData},on:{close:e.closeModal}}):e._e()],1)},staticRenderFns:[]};var v=o("VU/8")(p,k,!1,function(e){o("b9I2")},"data-v-3a566905",null).exports;s.a.use(i.a);var h=new i.a({routes:[{path:"/",name:"JokeList",component:v}]});s.a.config.productionTip=!1,new s.a({el:"#app",router:h,components:{App:a},template:"<App/>"})},b9I2:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.e84b05e8b6d398dba2b6.js.map