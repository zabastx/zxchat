<template>
	<aside class="settings">
		<div class="settings__header">
			<span class="material-icons active back" @click="$emit('close')">arrow_back</span>
			<UserContact class="settings__header--user" :user="getUser" />
		</div>
		<form class="settings__info">
			<input type="text" placeholder="О себе" maxlength="70" v-model="bio" @input.once="changed = true">
			<!-- <input type="file" accept="image/*"> -->
			<button v-show="changed" class="btn" @click.prevent="updateProfile">Сохранить</button>
		</form>
	</aside>
</template>

<script lang="ts">
import { UserType } from '@/types/vuex'
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import UserContact from './UserContact.vue'

export default defineComponent({
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
			this.$socket.emit('updateProfile', { bio: this.bio, id: this.getUser._id || this.getUser.id }, (res: UserType) => {
				this.$store.commit('SET_USER', res)
				this.changed = false
			})
		}
	},
	mounted() {
		this.bio = this.getUser.bio || ''
	}
})
</script>

<style lang="scss" scoped>
.settings {
	width: 100%;
	height: 100%;
	background: #212121;
	box-shadow: 0 0 5px black;
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
			box-shadow: inset 0 0 5px black;
			padding: 5px 10px;
			border-radius: 5px;
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