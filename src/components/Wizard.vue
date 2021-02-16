<template lang="pug">
	div.wrapper
		v-container
			v-col.col-12.col-sm-8.mx-auto.px-0    
				v-stepper(v-model="step" alt-labels)
					v-stepper-header.flex-nowrap
						v-stepper-step(step="1" :editable="step > 0") Company
						v-stepper-step(step="2" :editable="step > 1") Currencies
						v-stepper-step(step="3" :editable="step > 2") Taxes
						v-stepper-step(step="4" :editable="step > 3") Finish
	
					v-stepper-items

						v-stepper-content(step="1")

							v-form
								v-text-field(label="API Key" v-model="companyInfo.api" prepend-icon="mdi-key")
								v-text-field(label="Tax Number" v-model="companyInfo.taxNo" prepend-icon="mdi-percent")
								v-menu(v-model="menu" ref="menu" :close-on-content-click="true" :return-value.sync="companyInfo.yearStart" transition="scale-transition" offset-y min-width="auto")
									template(v-slot:activator="{ on, attrs }")
										v-text-field(label="Financial Year Start" readonly v-bind="attrs" v-on="on" v-model="companyInfo.yearStart" prepend-icon="mdi-calendar")
									v-date-picker(v-model="companyInfo.yearStart" width="250px" no-title @change="$refs.menu.save(companyInfo.yearStart)")
								v-textarea(label="Address" v-model="companyInfo.address" outlined prepend-icon="mdi-map-marker")
								v-file-input(label="Logo" v-model="companyInfo.logo" chips)

							div.d-flex.justify-end
								v-btn.pa-3.ma-3(color="success" elevation="2" @click="companyPush") Next

						v-stepper-content(step="2")
							CurrencyTable(@nav="navigation")

						v-stepper-content(step="3")
							TaxTable(@nav="navigation")
	

						v-stepper-content(step="4")
							h1.text-center Recommended Apps
							div.d-flex.justify-space-around.flex-wrap
								a(v-for="app in apps" :href="app.link" target="_blank")
									v-card.mx-auto.my-4.my-md-8.my-lg-12(max-width='200')
										v-img(height='120' :src="require('@/assets/' + app.pic)")
										v-card-title {{app.name}}
										v-card-text
											v-row.mx-0(align='center')
												div.card-desc.d-flex.justify-space-between
													v-rating(:value='app.rate' color='amber' dense half-increments readonly size='14')
													span {{app.price}}$
							div.d-flex.justify-space-between.flex-column.flex-sm-row
								v-btn.pa-3.ma-3(color="secondary" elevation="2" @click="navigation(3)") Previous
								v-btn.pa-3.ma-3(color="success" elevation="2" @click="logData") Go To Dashboard			
				
</template>

<script>
import CurrencyTable from "./wizard-components/CurrencyTable";
import TaxTable from "./wizard-components/TaxTable";

export default {
  name: "Wizard",
  components: {
    CurrencyTable,
    TaxTable,
  },
  data() {
    return {
      step: 1,
      menu: "",
      companyInfo: {
        api: "",
        taxNo: "",
        yearStart: "",
        address: "",
        logo: null,
      },
      apps: [
        {
          name: "Documents",
          rate: 5,
          price: 39,
          pic: "1.png",
          link: "https://akaunting.com/apps/documents",
        },
        {
          name: "ToDo",
          rate: 4,
          price: 19,
          pic: "3.png",
          link: "https://akaunting.com/apps/todo",
        },
        {
          name: "White Label",
          rate: 4.5,
          price: 299,
          pic: "2.png",
          link: "https://akaunting.com/apps/white-label",
        },
      ],
    };
  },

  computed: {},

  methods: {
    navigation(n) {
      this.step = n;
    },

    companyPush() {
      this.$store.commit("updateWizardInfo", { companyInfo: this.companyInfo });
      this.step = 2;
    },

    logData() {
      let data = this.$store.state;
      console.log(data);
    },
  },
};
</script>
