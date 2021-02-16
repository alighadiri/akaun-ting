<template lang="pug">
	div.wrapper
		v-container.d-flex.justify-center.align-center.h-100
			v-sheet.col-12.col-sm-6(color="white" elevation="1" rounded)
				h1.text-center.pt-3 Login to start your session
				v-form(ref="login")
					v-text-field(label="Email" :rules="emailRules" v-model="email" prepend-icon="mdi-email")
					v-text-field(label="Password" :rules="passwordRules" type="password" v-model="password" prepend-icon="mdi-lock-open")
					v-checkbox(label="Remember Me!" v-model="rememberMe")
					div.d-flex.justify-end
						v-btn.pa-3.ma-3(color="success" elevation="2" @click="submit") Login
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false,
      // defining rules for validating the user data in login form
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
      // sending data to store if the inputed data are valid
      if (this.$refs.login.validate()) {
        let loginInfo = {
          loginEmail: this.email,
          loginPassword: this.password,
          loginRememberMe: this.rememberMe,
        };
        this.$store.commit("updateLoginInfo", loginInfo);
        this.$router.push({ path: "/wizard" });
      }
    },
  },
};
</script>
