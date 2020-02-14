import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import './plugins/vee-validate'
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

Vue.use(VueClipboard)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
