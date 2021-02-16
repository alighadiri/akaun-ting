<template lang="pug">
	div.wrapper
		v-container
			v-col.col-12.col-sm-8.mx-auto.px-0
				v-stepper(v-model="step" alt-labels)
					v-stepper-header.flex-nowrap
						v-stepper-step(step="1" :editable="step > 0") Language
						v-stepper-step(step="2" :editable="step > 1") Database
						v-stepper-step(step="3" :editable="step > 2") Admin
					
					v-stepper-items
						v-stepper-content(step="1")
							h1.mb-5.text-center Please select your language
							v-form(ref="language")
								v-select(:items='languages' :rules="requiredRules" v-model="selectedLang" label='Languages')
								div.d-flex.justify-end
									v-btn.pa-3.ma-3(color="success" elevation="2" @click="langValidation") Next
									
						v-stepper-content(step="2")
							h1.mb-5.text-center Please provide your database information
							v-form(ref="database")
								v-text-field(label="Hostname" :rules="requiredRules" v-model="selectedDatabase.hostname" prepend-icon="mdi-server")
								v-text-field(label="Username" :rules="lengthRules" v-model="selectedDatabase.username" prepend-icon="mdi-account")
								v-text-field(label="Password" type="password" v-model="selectedDatabase.password" prepend-icon="mdi-key-variant")
								v-text-field(label="Database" :rules="requiredRules" v-model="selectedDatabase.database" prepend-icon="mdi-database")
							div.d-flex.justify-end
								v-btn.pa-3.ma-3(color="success" elevation="2" @click="databaseValidation") Next
							
						v-stepper-content(step="3")
							h1.mb-5.text-center Please provide your company information
							v-form(ref="admin")
								v-text-field(label="Company Name" :rules="requiredRules" v-model="selectedAdmin.companyName" prepend-icon="mdi-domain")
								v-text-field(label="Company Email" :rules="emailRules" v-model="selectedAdmin.companyEmail" prepend-icon="mdi-email")
								v-text-field(label="Admin Email" :rules="emailRules" v-model="selectedAdmin.adminEmail" prepend-icon="mdi-email")
								v-text-field(label="Admin Password" :rules="lengthRules" type="password" v-model="selectedAdmin.adminPassword" prepend-icon="mdi-key-variant")
							div.d-flex.justify-end
								v-btn.pa-3.ma-3(color="success" elevation="2" @click="adminValidation") Next
							
</template>

<script>
export default {
  name: "Install",
  data() {
    return {
      step: 1,
      languages: ["English", "Arabic", "Turkish", "Persian", "French", "Spanish"],
      selectedLang: "",
      selectedDatabase: {
        hostname: "ali",
        username: "alighadiri",
        password: "12345678",
        database: "ali",
      },
      selectedAdmin: {
        companyName: "Ali",
        companyEmail: "ali@ali.com",
        adminEmail: "ali@ali.com",
        adminPassword: "12345678",
      },
      requiredRules: [(value) => !!value || "Required."],
      lengthRules: [(value) => !!value || "Required.", (value) => (value || "").length >= 6 || "Min 6 characters"],
      emailRules: [
        (value) => !!value || "Required.",
        (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      ],
    };
  },
  methods: {
    langValidation() {
      if (this.$refs.language.validate()) {
        this.step = 2;
      }
    },
    databaseValidation() {
      if (this.$refs.database.validate()) {
        this.step = 3;
      }
    },
    adminValidation() {
      if (this.$refs.admin.validate()) {
        let installInfo = {
          langInfo: this.selectedLang,
          databaseInfo: this.selectedDatabase,
          adminInfo: this.selectedAdmin,
        };
        this.$store.commit("updateInstallInfo", installInfo);
        this.$router.push({ path: "/login" });
      }
    },
  },
};
</script>
