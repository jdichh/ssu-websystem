<template>
	<main class="login">
		<div class="login-dark">
			<form class="login" @submit.prevent="login">
				<img class="letran_logo" src="../assets/img/letran_calamba_seal.png"/>
				<h2>SSU Portal</h2>
				<div class="illustration">
					<div class="form-group">
						<input 
							class="form-control" 
							type="email" 
							placeholder="Email Address"
							v-model="login_form.email" />
					</div>

					<div class="form-group">
						<input 
							class="form-control" 
							type="password" 
							placeholder="Password" 
							v-model="login_form.password" />
					</div>

					<div class="form-group">
						<input 
							type="submit" 
							value="Log In" />
					</div>

					<div>
						<p class="forgot">Contact your head to register.</p>
					</div>
				</div>
			</form>
		</div>
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

.letran_logo{
	padding-bottom: 20px;
}

.login-dark {
  height:100vh;
  background:#475d62 url(../assets/img/bg.jpg);
  background-size:cover;
  position:relative;
}

.login-dark form {
  max-width:400px;
  width:100%;
  background-color:#1e2833;
  padding:40px;
  border-radius:4px;
  transform:translate(-50%, -50%);
  position:absolute;
  top:50%;
  left:50%;
  color:#fff;
  box-shadow:3px 3px 4px rgba(0,0,0,0.2);
}

.login-dark .illustration {
  text-align:center;
  padding-top: 20px;
  font-size:100px;
  color:#2980ef;
}

.login-dark form .form-control {
  background:none;
  border:none;
  border-bottom:1px solid #434a52;
  border-radius:0;
  box-shadow:none;
  outline:none;
  color:inherit;
}

.login-dark form .forgot {
  display:block;
  text-align:center;
  font-size:16px;
  color:#6f7a85;
  opacity:0.9;
  text-decoration:none;
}

.login-dark form .forgot:hover, .login-dark form .forgot:active {
  opacity:1;
  text-decoration:none;
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
	font-size: 20px;
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
	color: white;
	border-bottom: 2px solid #6f7a85;
}

form.login input[type="submit"] {
	background-color:#214a80;
	color: white;
	font-weight: 700;
	padding: 1rem 2rem;
	border-radius: 0.5rem;
	cursor: pointer;
	text-transform: uppercase;
}
</style>