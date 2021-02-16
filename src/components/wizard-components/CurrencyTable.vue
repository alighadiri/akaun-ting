<template lang="pug">
	div.wrapper
		v-data-table.elevation-1(:headers='headers' :items='currencies' sort-by='name')
			template(v-slot:top='')
				v-toolbar(flat='')

					v-dialog(v-model='dialog' max-width='500px')
						template(v-slot:activator='{ on, attrs }')
							v-btn.mb-2(color='primary' dark='' v-bind='attrs' v-on='on')
								| New Currency
						v-card
							v-card-title
								span.headline {{ formTitle }}
							v-card-text
								v-container
									v-row
										v-col(cols='12' sm='6' md='4')
											v-text-field(v-model='editedItem.name' label='Name')
										v-col(cols='12' sm='6' md='4')
											v-text-field(v-model='editedItem.code' label='Code')
										v-col(cols='12' sm='6' md='4')
											v-text-field(v-model='editedItem.rate' label='Rate')
										
							v-card-actions
								v-spacer
								v-btn(color='blue darken-1' text='' @click='close')
									| Cancel
								v-btn(color='blue darken-1' text='' @click='save')
									| Save
					v-dialog(v-model='dialogDelete' max-width='500px')
						v-card
							v-card-title Are you sure you want to delete this currency?
							v-card-actions
								v-spacer
								v-btn(color='blue darken-1' text='' @click='closeDelete') Cancel
								v-btn(color='blue darken-1' text='' @click='deleteItemConfirm') OK
								v-spacer
			template(v-slot:item.enabled="{item}")
				v-switch(v-model="item.enabled" color="success")
			template(v-slot:item.actions="{ item }")
				v-icon.mr-2(small='' @click='editItem(item)')
					| mdi-pencil
				v-icon(small='' @click='deleteItem(item)')
					| mdi-delete
		div.d-flex.justify-space-between
			v-btn.pa-3.ma-3(color="secondary" elevation="2" @click="$emit('nav', 1)") Previous
			v-btn.pa-3.ma-3(color="success" elevation="2" @click="currencyPush") Next

</template>

<script>
export default {
  name: "CurrencyTable",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: true,
        value: "name",
      },
      { text: "Code", value: "code", sortable: false },
      { text: "Rate", value: "rate" },
      { text: "Enabled", value: "enabled", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
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
    editedIndex: -1,
    editedItem: {
      name: "",
      code: "",
      rate: "",
      enabled: true,
    },
    defaultItem: {
      name: "",
      code: "",
      rate: "",
      enabled: true,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Currnecy" : "Edit Currency";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.currencies.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.currencies.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.currencies.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.currencies[this.editedIndex], this.editedItem);
      } else {
        this.currencies.push(this.editedItem);
      }
      this.close();
    },

    currencyPush() {
      // converting data from array to object and sending them to store
      this.$store.commit("updateWizardInfo", { currencies: this.currencies });
      this.$emit("nav", 3);
    },
  },
};
</script>
