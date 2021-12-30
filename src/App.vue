<template>
  <div class="app">
    <spinner v-show="$store.state.loading" />
    <main class="app__view" v-show="!$store.state.loading">
      <SideMenu v-if="getVerified" class="app__side-menu"/>
      <router-view class="app__router" />
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { defineAsyncComponent } from 'vue'

export default {
  name: 'Home',
  components: {
    SideMenu: defineAsyncComponent(() => import('./components/SideMenu.vue')),
    Settings: defineAsyncComponent(() => import('./components/Settings.vue'))
  },
  computed: {
    ...mapGetters(['getVerified', 'getUserID', 'getSelectedID'])
  },
  beforeCreate() {
    this.$store.commit('SET_SOCKET', this.$socket)
  },
  created() {
    const token = localStorage.getItem('token')
    this.$router.beforeEach((to, from) => {
      if (to.meta.requiresAuth && !localStorage.getItem('token')) return { path: '/auth' }
      if (to.name === 'Chat') this.$store.dispatch('getMessages')
    })
    if (token) this.$store.dispatch('auth', { token, type: 'login' })
  }
}
</script>

<style lang="scss">
html {
  min-height: 100vh;
  height: 1px;
  font-size: 16px;
  font-family: "Roboto",-apple-system,BlinkMacSystemFont,"Apple Color Emoji","Helvetica Neue",sans-serif;
  line-height: 1.15;
}

body {
  background: #0f0f0f;
  color: white;
  margin: 0;
  height: 100%;
}

* {
  box-sizing: border-box;
  margin: 0;
  scrollbar-width: thin;
  scrollbar-color: #8774e1 #0f0f0f;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #8774e1;
    border-radius: 2.5px;
  }
}

#app {
  height: 100%;
}

.app {
  height: 100%;
  &__side-menu {
    flex: 0 1 350px;
  }
  &__view {
    display: flex;
    widows: 100%;
    height: 100%;
  }
  &__router {
    flex-grow: 1;
  }
}

.material-icons {
  user-select: none;
  color: #fff;
  transition-duration: .2s;
  &.active {
    cursor: pointer;
    &:hover {
      color: #8774e1;
    }
  }
}

.btn {
  background: #8774e1;
  color: #fff;
  border: none;
  border-radius: 4px;
  font: inherit;
  cursor: pointer;
  padding: 7px 10px;
  font-weight: bold;
  &:hover {
    box-shadow: 0 0 5px #8774e1;
  }
}
</style>
