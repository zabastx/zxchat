<template>
  <div class="user-contact">
		<div class="user-contact__avatar">
			<span class="user-contact__avatar--online" v-if="isOnline"></span>
		</div>
		<div class="user-contact__info">
			<span class="user-contact__username">{{ user.username }}</span>
			<span v-show="hasNewMsg" class="material-icons new_releases" title="Новое сообщение">new_releases</span>
			<span class="user-contact__msg">{{ lastMsg }}</span>
		</div>
	</div>
</template>

<script lang="ts">
import { UserType } from '@/types/vuex'
import { defineComponent, PropType } from 'vue'
import { mapState } from 'vuex'

export default defineComponent({
	name: 'user-contact',
	props: {
		user: {
			type: Object as PropType<UserType>,
			required: true
		}
	},
	computed: {
		...mapState(['usersOnline', 'unreadChats']),
		lastMsg() {
			const id = this.user._id || this.user.id as string
			const messages = this.$store.getters['getMessages'][id] || []
			return messages[0]?.content
		},
		isOnline(): boolean {
			return this.usersOnline.includes(this.user._id || this.user.id)
		},
		hasNewMsg(): boolean {
			return this.unreadChats.has(this.user._id || this.user.id)
		}
	}
})
</script>

<style lang="scss" scoped>
.user-contact {
	display: flex;
	flex-direction: column;
	height: 72px;
	justify-content: space-evenly;
	padding: 5px 5px 5px 60px;
	position: relative;
	user-select: none;
	&__avatar {
		width: 50px;
		height: 50px;
		background: black;
		border-radius: 50%;
		position: absolute;
		left: 5px;
		top: 50%;
		transform: translateY(-50%);
		&--online {
			width: 10px;
			height: 10px;
			border-radius: 50%;
			background: lime;
			position: absolute;
			right: 3px;
			bottom: 3px;
		}
	}
	&__info {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		.new_releases {
			width: max-content;
			font-size: 1.25rem;
			margin-left: 5px;
		}
	}
	&__username {
		font-weight: bold;
		width: max-content;
	}
	&__msg {
		overflow: hidden;
		text-overflow: ellipsis;
		opacity: .8;
		width: 100%;
		min-height: 1rem;
	}
}
</style>