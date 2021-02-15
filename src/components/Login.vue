<template lang="pug">
	v-app
		v-container
			v-sheet.col-8(color="white" elevation="1" rounded)
				h1 Login to start your session
				v-form(ref="login")
					v-text-field(label="Email" :rules="emailRules" v-model="enteredLoginData.email" prepend-icon="mdi-email")
					v-text-field(label="Password" :rules="passwordRules" type="password" v-model="enteredLoginData.password" prepend-icon="mdi-lock-open")
					v-checkbox(label="Remember Me!" v-model="enteredLoginData.rememberMe")
					div.d-flex.justify-end
						v-btn.pa-3.ma-3(color="success" elevation="2" @click="submit") Login
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      enteredLoginData: {
        email: "",
        password: "",
        rememberMe: false,
      },
      emailRules: [
        (value) => !!value || "Required.",
        (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      ],
      passwordRules: [(value) => !!value || "Required.", (value) => (value || "").length >= 6 || "Min 6 characters"],
    };
  },
  methods: {
    submit() {
      if (this.$refs.login.validate()) {
				this.$router.push({ path: '/wizard' })	
      }
    },
  },
};
</script>
