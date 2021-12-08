<template>
  <div class="auth">
		<h1>ZXChat</h1>
		<transition name="fade" mode="out-in">
			<div v-if="!formType" class="auth__choice">
				<button class="login" @click="formType = 'log'">Вход</button>
				<button class="register" @click="formType = 'reg'">Регистрация</button>
			</div>
			<form v-else class="auth__form" @submit.prevent="onSubmit">
				<h2><span class="material-icons active" @click="formType = null">arrow_back</span> {{ formType === 'reg' ? 'Регистрация': 'Вход' }}</h2>
				<label class="auth__form--username">
					<span>Никнейм</span>
					<input type="text" name="username" autocomplete="off" v-model.trim="username" required minlength="3" maxlength="20">
				</label>
				<label class="auth__form--password">
					<span>Пароль</span>
					<input type="password" name="password" v-model.trim="password" required minlength="6">
				</label>
				<button class="auth__form--submit">{{ formBtnText }}</button>
			</form>
		</transition>
	</div>
</template>

<script>
export default {
  name: 'Auth',
	data: () => ({
		username: '',
		password: '',
		formType: null
	}),
	methods: {
		async onSubmit() {
			const { username, password } = this
			if (this.formType === 'reg') return this.$store.dispatch('auth', { username, password, type: 'register' })
			this.$store.dispatch('auth', { username, password, type: 'login' })
		}
	},
	computed: {
		formBtnText() {
			return this.formType === 'reg' ? 'Зарегистрироваться': 'Войти'
		}
	},
	created() {
		if (this.$store.state.verified) this.$router.push('/')
	}
}
</script>

<style lang="scss" scoped>
.auth {
	display: flex;
	height: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 20px;
	.active {
		vertical-align: text-top;
	}
	&__form, &__choice {
		display: flex;
		flex-direction: column;
		min-width: 320px;
		gap: 20px;
		padding: 15px;
		label {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}
	}
}

input, button {
	font-size: 1.25rem;
	padding: 5px;
	font-family: inherit;
}

button {
	cursor: pointer;
	background: #fff;
	color: #000;
	transition-duration: .3s;
	border: none;
	border-radius: 4px;
	&:hover {
		color: #fff;
		background: #8774e1;
	}
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
