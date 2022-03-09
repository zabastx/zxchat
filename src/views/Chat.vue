<template>
  <section class="chat">
		<ChatBox class="chat__box" />
		<UserDetails class="chat__details" />
	</section>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import ChatBox from '../components/ChatBox.vue'
import UserDetails from '../components/UserDetails.vue'

export default defineComponent({
	name: 'Chat',
	components: {
		ChatBox,
		UserDetails
	}
})
</script>

<style lang="scss" scoped>
.chat {
	display: flex;
	height: 100%;
	justify-content: center;
	&__box {
		flex-grow: 1;
	}
	&__details {
		flex: 0 0 300px;
		background: #212121;
		border-left: 2px solid #303030;
	}
}
</style>