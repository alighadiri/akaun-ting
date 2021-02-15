<template lang="pug">
	v-app
		v-container
			v-stepper(v-model="step" alt-labels)
				v-stepper-header
					v-stepper-step(step="1" :editable="step > 0") Company
					v-stepper-step(step="2" :editable="step > 1") Currencies
					v-stepper-step(step="3" :editable="step > 2") Taxes
					v-stepper-step(step="4" :editable="step > 3") Finish
				
				v-stepper-items

					v-stepper-content(step="1")

						v-form
							v-text-field(label="API Key" v-model="companyInfo.api" prepend-icon="mdi-key")
							v-text-field(label="Tax Number" v-model="companyInfo.taxNo" prepend-icon="mdi-percent")
							v-menu(v-model="menu" ref="menu" :close-on-content-click="true" :return-value.sync="date" transition="scale-transition" offset-y min-width="auto")
								template(v-slot:activator="{ on, attrs }")
									v-text-field(label="Financial Year Start" readonly v-bind="attrs" v-on="on" v-model="date" prepend-icon="mdi-calendar")
								v-date-picker(v-model="date" no-title @change="$refs.menu.save(date)")
							v-textarea(label="Address" v-model="companyInfo.address" outlined prepend-icon="mdi-map-marker")
							v-file-input(label="Logo" v-model="companyInfo.logo" chips)

						div.d-flex.justify-end
							v-btn.pa-3.ma-3(color="primary" elevation="2" @click="navigation(2)") Next

					v-stepper-content(step="2")
						CurrencyTable.mb-0
						div.d-flex.justify-space-between
							v-btn.pa-3.ma-3(color="primary" elevation="2" @click="navigation(1)") Previous
							v-btn.pa-3.ma-3(color="primary" elevation="2" @click="navigation(3)") Next

					v-stepper-content(step="3")
						TaxTable
						div.d-flex.justify-space-between
							v-btn.pa-3.ma-3(color="primary" elevation="2" @click="navigation(2)") Previous
							v-btn.pa-3.ma-3(color="primary" elevation="2" @click="navigation(4)") Next
							

					v-stepper-content(step="4")

			
</template>

<script>

import CurrencyTable from "./wizard-components/CurrencyTable";
import TaxTable from "./wizard-components/TaxTable"

export default {
	name: "Wizard",
	components: {
		CurrencyTable,
		TaxTable
	},
	data() {
		return {
			step: 1,
			menu: "",
			date: "",
			companyInfo: {
				api: "",
				taxNo: "",
				yearStart: "",
				address: "",
				logo: null,
			},
			currencies: [
				{
					name: "British Pound",
					code: "GBP",
					rate: 1.6,
					enabled: true,
				},
				{
					name: "Euro",
					code: "EUR",
					rate: 1.25,
					enabled: true,
				},
				{
					name: "Turkish Lira",
					code: "TRY",
					rate: 0.8,
					enabled: true,
				},
				{
					name: "US Dollar",
					code: "USD",
					rate: 1,
					enabled: true,
				},
				
			],
		};
	},


	computed: {},

	methods: {
		navigation(n) {
			this.step = n;
		},
	},
};
</script>
