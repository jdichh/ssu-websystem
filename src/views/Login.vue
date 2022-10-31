<template>
	<main class="login">
		<section class="forms">
			<form class="login" @submit.prevent="login">
				<h2>Log In</h2>
				<input 
					type="email" 
					placeholder="E-mail Address"
					v-model="login_form.email" />
				<input 
					type="password" 
					placeholder="Password" 
					v-model="login_form.password" />
				<input 
					type="submit" 
					value="Log In" />
			</form>
		</section>
	</main>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
	setup () {
		const login_form = ref({});
		const store = useStore();

		const login = () => {
			store.dispatch('login', login_form.value);
		}

		return {
			login_form,
			login,
		}
	}
}
</script>

<style>
.forms {
	display: flex;
	min-height: 100vh;
}

form {
	flex: 1 1 0%;
	padding: 8rem 1rem 1rem;
}

form.login {
	color: rgb(63, 174, 123);
	background-color: rgb(30, 30, 47);
}

h2 {
	font-size: 2rem;
	text-transform: uppercase;
	margin-bottom: 2rem;
}

input {
	appearance: none;
	border: none;
	outline: none;
	background: none;

	display: block;
	width: 100%;
	max-width: 400px;
	margin: 0 auto;
	font-size: 1.5rem;
	margin-bottom: 2rem;
	padding: 0.5rem 0rem;
}

input:not([type="submit"]) {
	opacity: 0.8;
	transition: 0.4s;
}

input:focus:not([type="submit"]) {
	opacity: 1;
}

input::placeholder {
	color: inherit;
}


form.login input:not([type="submit"]) {
	color: #FFF;
	border-bottom: 2px solid rgb(39, 41, 61);
}

form.login input[type="submit"] {
	background-color: rgb(63, 174, 123);
	color: #FFF;
	font-weight: 700;
	padding: 1rem 2rem;
	border-radius: 0.5rem;
	cursor: pointer;
	text-transform: uppercase;
}
</style>