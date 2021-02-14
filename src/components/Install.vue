<template lang="pug">
	v-app
		v-container 
			v-col.col-8
					v-stepper(v-model="step" alt-labels)
						v-stepper-header
							v-stepper-step(step="1" :editable="step > 0") Language
							v-stepper-step(step="2" :editable="step > 1") Database
							v-stepper-step(step="3" :editable="step > 2") Admin
						
						v-stepper-items
							v-stepper-content(step="1")
								h1 Please select your language
								v-form(ref="language")
									v-select(:items='languages' :rules="requiredRules" v-model="selectedLang" label='Languages')
									div.d-flex.justify-end
										v-btn.pa-3.ma-3(color="primary" elevation="2" @click="langValidation") Next
							v-stepper-content(step="2")
								h1 Please provide your database information
								v-text-field(label="Hostname" :rules="requiredRules" v-model="selectedDatabse.hostname" prepend-icon="mdi-server")
								v-text-field(label="Username" v-model="selectedDatabse.username" prepend-icon="mdi-account")
								v-text-field(label="Password" type="password" v-model="selectedDatabse.password" prepend-icon="mdi-key-variant")
								v-text-field(label="Database" v-model="selectedDatabse.database" prepend-icon="mdi-database")
								div.d-flex.justify-end
									v-btn.pa-3.ma-3(color="primary" elevation="2" @click="databaseValidation") Next
								
							v-stepper-content(step="3")
								h1 Please provide your company information
								v-text-field(label="Company Name" v-model="selectedAdmin.companyName" prepend-icon="mdi-domain")
								v-text-field(label="Company Email" v-model="selectedAdmin.companyEmail" prepend-icon="mdi-email")
								v-text-field(label="Admin Email" v-model="selectedAdmin.adminEmail" prepend-icon="mdi-email")
								v-text-field(label="Admin Password" type="password" v-model="selectedAdmin.adminPassword" prepend-icon="mdi-key-variant")
								div.d-flex.justify-end
									v-btn.pa-3.ma-3(color="primary" elevation="2" @click="adminValidation") Next
								

</template>

<script>
export default {
  name: "Install",
  data() {
    return {
      step: 1,
      languages: ["English", "Arabic", "Turkish", "Persian", "French", "Spanish"],
      selectedLang: "",
      selectedDatabse: {
        hostname: "",
        username: "",
        password: "",
        database: "",
      },
      selectedAdmin: {
        companyName: "",
        companyEmail: "",
        adminEmail: "",
        adminPassword: "",
      },
      requiredRules: [(value) => !!value || "Required."],
    };
  },
  methods: {
    langValidation() {
      if (this.$refs.language.validate()) {
        this.step = 2;
      }
    },
    databaseValidation() {
      console.log(this.selectedDatabse);
      this.step = 3;
    },
    adminValidation() {},
  },
};
</script>
