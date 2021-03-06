import { createStore, GetterTree } from 'vuex'
import router from '../router'
import { toastify } from '../utils'
import notif from '../assets/notif_sound.mp3'
import { State } from 'vue'
import { AuthResponse, Messages, UserType } from '@/types/vuex'
import { Socket } from 'socket.io-client'

const state: State = {
  socket: {} as Socket,
  verified: false,
  user: {} as UserType,
  search: '',
  selectedUser: {} as UserType,
  messages: {} as Messages,
  loading: false,
  notif: new Audio(notif),
  usersOnline: [],
  unreadChats: new Set()
}

export default createStore({
  state,
  mutations: {
    SET_VERIFIED(state, value) {
      state.verified = value
    },
    SET_LOADING(state, value) {
      state.loading = value
    },
    SET_SOCKET(state, value) {
      state.socket = value
    },
		SET_USER(state, value) {
			state.user = value
		},
    SET_SEARCH(state, value) {
      state.search = value
    },
    SET_SELECTED_USER(state, value) {
      state.selectedUser = value
    },
    UPDATE_USER(state, value) {
      state.user = value
    },
    ADD_MESSAGE(state, value: Messages) {
      if (state.messages[value.chat]) return state.messages[value.chat].unshift(value.msg)
      state.messages[value.chat] = [value.msg]
    },
    ADD_UNREAD_CHATS(state, value) {
      state.unreadChats.add(value)
    },
    DEL_UNREAD_CHATS(state, value) {
      state.unreadChats.delete(value)
    },
    SOCKET_SET_MESSAGES(state, value) {
      state.messages = Object.assign(state.messages, value)
    },
    SOCKET_UPDATE_ONLINE(state, value) {
      state.usersOnline = value
    }
  },
  getters: {
    getUser: ({ user }) => user,
    getUserID: ({ user }) => user._id || user.id as string,
    getSearch: ({ search }) => search,
    getVerified: ({ verified }) => verified,
    getSelectedUser: ({ selectedUser }) => selectedUser,
    getSelectedID: ({ selectedUser }) => selectedUser._id || selectedUser.id as string,
    getMessages: ({ messages }) => messages,
    getUnreadChats: ({ unreadChats }) => unreadChats
  },
  actions: {
    auth({ state, commit }, data) {
      commit('SET_LOADING', true)
      state.socket.emit(data.type, data, (res: AuthResponse) => {
        const { user, token, success } = res

        if (!success) {
          localStorage.removeItem('token')
          router.push('/auth')
          res.error ? console.log('auth error\n', res.error):
            toastify('danger', res.message)
          return commit('SET_LOADING', false)
        }

        commit('SET_USER', user)
        commit('SET_VERIFIED', true)
        if (token) localStorage.setItem('token', token)
        toastify('success', `???? ?????????? ?????? ${user?.username}`)
        router.push('/')
        commit('SET_LOADING', false)
      })
    },
    logout({ state, commit }) {
      state.socket.emit('logout')
      localStorage.removeItem('token')
      commit('SET_USER', {})
      commit('SET_VERIFIED', false)
      router.push('/auth')
    },
    userSearch({ state, commit }, search) {
      state.socket.emit('userSearch', search, (res: UserType[]) => {
        commit('SET_SEARCH', res)
      })
    },
    changeContacts({ state, commit }, req) {
      state.socket.emit(req.type, req, (res: any) => {
        commit('UPDATE_USER', res)
        switch (req.type) {
          case 'addContact':
            toastify('success', `${state.selectedUser.username} ???????????????? ?? ???????????? ??????????????????`)
            break;

          default:
            toastify('success', `${state.selectedUser.username} ???????????? ???? ???????????? ??????????????????`)
            break;
        }
      })
    },
    selectUser({ commit }, user) {
      commit('SET_SELECTED_USER', user)
    },
    getMessages({ state, getters, commit }) {
      state.socket.emit('getMessages', getters.getUserID, getters.getSelectedID)
      commit('DEL_UNREAD_CHATS', getters.getSelectedID)
    },
    SOCKET_addMessage({ commit, getters, state }, msg) {
      const chat = getters.getUserID === msg.sender ? getters.getSelectedID: msg.sender
      commit('ADD_MESSAGE', { chat, msg })
      const condition = !(getters.getUserID === msg.sender || getters.getSelectedID === msg.sender)
      if (condition) {
        state.notif.play().catch(() => null)
        commit('ADD_UNREAD_CHATS', msg.sender)
      }
    }
  }
})
