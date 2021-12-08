import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-3-socket.io'
import { io } from 'socket.io-client'
import Spinner from './components/Spinner.vue'

const socket = io('/')

createApp(App).use(store).use(router).use(new VueSocketIO({
	debug: true,
	connection: socket,
	vuex: {
		store,
		mutationPrefix: "SOCKET_",
		actionPrefix: "SOCKET_"
	}
})).component('spinner', Spinner).mount('#app')
