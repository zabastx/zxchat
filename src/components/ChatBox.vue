<template>
	<div class="chat">
		<div class="chat__form-wrapper">
			<form class="chat__form" @submit.prevent>
				<textarea name="message" placeholder="Сообщение"
				class="chat__form--textarea"
				v-model.trim="message"
				maxlength="300"
				spellcheck="false"
				@keypress.enter.prevent="submit"></textarea>
				<button class="material-icons chat__form--submit" @click.prevent="submit">send</button>
			</form>	
		</div>
		<div ref="messages" class="chat__messages">
			<div class="chat__messages--wrapper">
				<transition-group name="list" @enter="enter">
					<TextMessage v-for="msg in messages" :key="msg._id" :msg="msg" />
				</transition-group>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
	name: 'chat-box',
	components: {
		TextMessage: defineAsyncComponent(() => import('./TextMessage.vue'))
	},
	data: () => ({
		message: ''
	}),
	computed: {
		...mapGetters(['getUser', 'getSelectedID']),
		messages() {
			return this.$store.getters['getMessages'][this.getSelectedID]
		}
	},
	methods: {
		submit() {
			if (!this.message) return
			const { getUser, message, getSelectedID } = this
			this.$socket.emit('privateMsg', {
				message,
				sender: getUser._id || getUser.id,
				receiver: getSelectedID
			})
			this.message = ''
		},
		enter(): void {
			const messages = this.$refs.messages as HTMLDivElement
			messages.scrollTop = messages.scrollHeight
		}
	}
})
</script>

<style lang="scss" scoped>
.chat {
	height: 100%;
	position: relative;
	display: flex;
	overflow: hidden auto;
	&__messages {
		flex-grow: 1;
		width: 100%;
		margin-bottom: 95px;
		padding: 15px;
		overflow-y: scroll;
		&--wrapper {
			max-width: 650px;
			margin: auto;
			display: flex;
			flex-direction: column-reverse;
			gap: 10px;
			min-height: 100%;
		}
	}
	&__form {
		display: flex;
		color: white;
		width: 100%;
		max-width: 650px;
		margin: 15px auto;
		align-items: center;
		padding-left: 10px;
		&--limit {
			font-size: 14px;
			position: absolute;
			bottom: 5px;
			right: 44px;
		}
		&--textarea {
			background: #212121;
			flex-grow: 1;
			background: #212121;
			color: inherit;
			font-size: 1rem;
			border-radius: 10px;
			padding: 10px;
			border: none;
			outline: none;
			resize: none;
			font: inherit;
			overflow-y: hidden;
			height: 64px;
			&:focus {
				border: 1px solid white;
			}
		}
		&--submit {
			cursor: pointer;
			background: #212121;
			color: #8774e1;
			border-radius: 50%;
			border: none;
			padding: 20px;
			margin: auto 5px;
			&:hover {
				box-shadow: 0 0 10px #000;
				text-shadow: 0 0 10px #000;
			}
		}
		&-wrapper {
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			width: 100%;
			z-index: 2;
			box-shadow: 0 0 15px #0f0f0f;
			background: #0f0f0f;
		}
	}
}

.list-item {
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 300ms ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

</style>