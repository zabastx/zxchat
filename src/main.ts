import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-3-socket.io'
import { io, Socket } from 'socket.io-client'
import Spinner from './components/Spinner.vue'
import { ClientToServer } from './types/socket'

const socket: Socket<any, ClientToServer> = io('/')

createApp(App).use(store).use(router).use(new VueSocketIO({
	debug: true,
	connection: socket,
	vuex: {
		store,
		mutationPrefix: "SOCKET_",
		actionPrefix: "SOCKET_"
	}
}))
.component('spinner', Spinner).mount('#app')
