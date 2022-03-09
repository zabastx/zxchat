<template>
  <div class="main">
    <p class="main__text">Welcome to ZXChat v{{version}}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { version } from '../../package.json'

export default defineComponent({
    name: 'Index',
    data: () => ({
      version
    })
})
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &__text {
    background: #525252;
    user-select: none;
    padding: 5px;
    border-radius: 5px;
  }
}
</style>