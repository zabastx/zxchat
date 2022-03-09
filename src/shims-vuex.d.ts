import { Socket } from 'socket.io-client'
import { Store } from 'vuex'
import { MessageType, UserType } from './types/vuex'

declare module '@vue/runtime-core' {
  interface State {
    socket: Socket,
    verified: boolean,
		user: UserType,
    search: string,
    selectedUser: UserType,
    messages: Messages,
    loading: boolean,
    notif: HTMLAudioElement,
    usersOnline: string[],
    unreadChats: Set<string>
  }
  interface ComponentCustomProperties {
    $store: Store<State>,
    $socket: Socket
  }
}