<template>
	<div class="contacts">
		<router-link v-for="(user, idx) in contacts" :key="idx" :to="`/u/${user.username}`" class="contacts__link">
			<UserContact :user="user" @click="$store.dispatch('selectUser', user)" class="contacts__user" />
		</router-link>
	</div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
	name: 'contacts',
	props: {
		contacts: Array
	},
	data: () => ({
		search: '',
		tId: null
	}),
	components: {
		UserContact: defineAsyncComponent(() => import('./UserContact.vue'))
	}
}
</script>

<style lang="scss" scoped>
.contacts {
	background: #212121;
	position: relative;
	overflow-y: auto;
	&__link {
		text-decoration: none;
		color: inherit;
		&:focus > div, &:hover > div {
			background: #2c2c2c;
		}
	}
}

.router-link-exact-active.router-link-exact-active > div {
	background: #8774e1;
}
</style>