// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.component('com-name',{
  template:`<p>111</p>`
})
Vue.component('com-div',function(resolve,reject){
  setTimeout(function(){
    resolve({
      template:'<div>我是DIV</div>'
    })
  },2000)
})
import HelloWorld from './components/HelloWorld'
Vue.component(HelloWorld.name,HelloWorld)
Vue.filter('fil-name',function(src){
    return src+'后面家的'
})
window.bus=new Vue()
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
