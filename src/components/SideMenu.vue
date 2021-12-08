<template>
  <section class="side-menu">
		<div class="side-menu__header">
			<span class="material-icons active settings">settings</span>
			<div class="side-menu__search">
				<span class="material-icons search">search</span>
				<input type="text" v-model.trim="search" @input="handleSearch" name="search" placeholder="Найти пользователей">
				<span v-show="search" class="material-icons close active" @click="search = ''">close</span>
			</div>
		</div>
		<Contacts :contacts="contacts" class="side-menu__contacts" />
		<div class="side-menu__resize"></div>
		<div class="side-menu__footer">
			<span 
			class="material-icons active logout" 
			@click="$store.dispatch('logout')"
			title="Выйти"
			>logout</span>
		</div>
	</section>
</template>

<script>
import Contacts from './Contacts.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'side-menu',
		data: () => ({
			search: '',
			tId: null
		}),
		components: {
			Contacts
		},
		computed: {
			...mapGetters(['getUser', 'getSearch']),
			contacts() {
				if (this.search) return this.getSearch
				return this.getUser.contacts
			}
		},
		methods: {
			handleSearch() {
				clearTimeout(this.tId)
				if (this.search.length < 3) return
				this.tId = setTimeout(() => {
					this.$store.dispatch('userSearch', this.search)
				}, 300)
			}
		}
}
</script>

<style lang="scss" scoped>
.side-menu {
	background: #212121;
	position: relative;
	display: flex;
	flex-direction: column;
	&__resize {
		position: absolute;
		top: 0;
		right: 0;
		height: 100%;
		width: 2px;
		background: #303030;
		z-index: 2;
		cursor: ew-resize;
		user-select: none;
	}
	&__header {
		display: flex;
		height: 64px;
		align-items: stretch;
		box-shadow: 0 0 3px #000;
		flex-shrink: 0;
		z-index: 1;
		.settings {
			align-self: center;
			padding: 5px;
			padding-left: 10px;
		}
	}
	&__contacts {
		flex-grow: 1;
	}
	&__search {
		margin: 10px;
		display: flex;
		justify-content: stretch;
		position: relative;
		flex-grow: 1;
		.search {
			position: absolute;
			left: 10px;
			top: 0;
			transform: translateY(50%);
		}
		.close {
			position: absolute;
			right: 10px;
			top: 0;
			transform: translateY(50%);
		}
		input {
			width: 100%;
			height: 100%;
			font: inherit;
			border: none;
			border-radius: 1.25rem;
			background: #2c2c2c;
			color: #fff;
			padding-left: 40px;
		}
	}
	&__footer {
		min-height: 50px;
		box-shadow: 0 0 3px #000;
		position: relative;
		z-index: 1;
		.logout {
			position: absolute;
			left: 5px;
			bottom: 50%;
			transform: scaleX(-1) translateY(50%);
		}
	}
}
</style>