<template>
	<section class="user-details">
		<UserContact :user="getSelectedUser" />
		<hr>
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
</style>