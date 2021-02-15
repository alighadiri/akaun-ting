<template lang="pug">
	v-app
		v-data-table.elevation-1(:headers='headers' :items='taxes' sort-by='name')
			template(v-slot:top='')
				v-toolbar(flat='')
					v-toolbar-title Taxes
					v-divider.mx-4(inset='' vertical='')
					v-spacer
					v-dialog(v-model='dialog' max-width='500px')
						template(v-slot:activator='{ on, attrs }')
							v-btn.mb-2(color='primary' dark='' v-bind='attrs' v-on='on')
								| New Tax
						v-card
							v-card-title
								span.headline {{ formTitle }}
							v-card-text
								v-container
									v-row
										v-col(cols='12' sm='6' md='4')
											v-text-field(v-model='editedItem.name' label='Name')
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

</template>

<script>
export default {
  name: "TaxTable",
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
      { text: "Rate", value: "rate" },
      { text: "Enabled", value: "enabled", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
    taxes: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      rate: "",
      enabled: true,
    },
    defaultItem: {
      name: "",
      rate: "",
			enabled: true
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Tax" : "Edit Tax";
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
      this.editedIndex = this.taxes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.taxes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.taxes.splice(this.editedIndex, 1);
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
        Object.assign(this.taxes[this.editedIndex], this.editedItem);
      } else {
        this.taxes.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
