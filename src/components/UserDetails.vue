<template>
	<section class="user-details">
		<UserContact :user="getSelectedUser" />
		<hr>
		<div class="user-details__item" v-show="getSelectedUser.bio">
			<p class="label">О себе</p>
			<p class="value">{{ getSelectedUser.bio }}</p>
		</div>
		<button v-if="!isContact" class="btn" @click="changeContacts('addContact')">Добавить в контакты</button>
		<button v-else class="btn" @click="changeContacts('delContact')">Удалить из контактов</button>
	</section>
</template>

<script>
import { mapGetters } from 'vuex'
import UserContact from './UserContact.vue'

export default {
	name: 'user-details',
	components: {
		UserContact
	},
	computed: {
		...mapGetters(['getUser', 'getSelectedUser']),
		username() {
			return this.$route.params.username
		},
		isContact() {
			return this.getUser.contacts?.some(user => user._id === this.getSelectedUser._id)
		}
	},
	methods: {
		changeContacts(type) {
			const { getSelectedUser, getUser } = this
			this.$store.dispatch('changeContacts', {
				type,
				selected: getSelectedUser._id || getSelectedUser.id,
				user: getUser._id || getUser.id,
			})
		}
	},
	watch: {
		getUser: {
			deep: true,
			handler() {
				this.$forceUpdate()
			}
		}
	}
}
</script>

<style lang="scss" scoped>
hr {
	border: none;
	border-top: 5px solid #0f0f0f;
}

.btn {
	margin: 15px auto;
	display: block;
	cursor: pointer;
	background: none;
	border: none;
	font: inherit;
	color: #fff;
	padding: 5px 10px;
	border-radius: 5px;
	&:hover {
		background: rgba(170, 170, 170, 0.5);
	}
}

.user-details {
	&__item {
		padding: 0 15px;
		position: relative;
		margin-top: 10px;
		.value {
			border: 1px solid black;
			padding: 10px;
			border-radius: 4px;
		}
		.label {
			position: absolute;
			left: 20px;
			font-size: 12px;
			bottom: 100%;
			transform: translateY(50%);
			background: #212121;
			padding: 0 5px;
			opacity: .8;
		}
	}
}
</style>