<template>
	<aside class="settings">
		<div class="settings__header">
			<span class="material-icons active back" @click="$emit('close')">arrow_back</span>
			<UserContact class="settings__header--user" :user="getUser" />
		</div>
		<div class="settings__info">
			<input type="text" placeholder="О себе" maxlength="70" v-model="bio" @change="changed = true">
			<button v-show="changed" class="btn" type="button" @click="updateProfile">Сохранить</button>
		</div>
	</aside>
</template>

<script>
import { mapGetters } from 'vuex'
import UserContact from './UserContact.vue'

export default {
	name: 'settings',
	components: {
		UserContact
	},
	data: () => ({
		bio: '',
		changed: false
	}),
	computed: {
		...mapGetters(['getUser'])
	},
	methods: {
		updateProfile() {
			this.$socket.emit('updateProfile', { bio: this.bio, id: this.getUser._id || this.getUser.id }, res => {
				this.$store.commit('SET_USER', res)
				this.changed = false
			})
		}
	},
	mounted() {
		this.bio = this.getUser.bio || ''
	}
}
</script>

<style lang="scss" scoped>
.settings {
	width: 100%;
	height: 100%;
	background: #212121;
	&__header {
		display: flex;
		height: 64px;
		align-items: center;
		box-shadow: 0 0 3px #000;
		flex-shrink: 0;
		z-index: 1;
		&--user {
			flex-grow: 1;
		}
		.back {
			flex: 0 0 44px;
			text-align: center;
		}
	}
	&__info {
		padding: 15px;
		input {
			background: none;
			font: inherit;
			color: #fff;
			border: none;
			outline: none;
			width: 100%;
			height: 32px;
			border-bottom: 1px solid grey;
			&:focus {
				border-bottom: 2px solid #8774e1;
			}
		}
		.btn {
			margin-top: 20px;
		}
	}
}
</style>