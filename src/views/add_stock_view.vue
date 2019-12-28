<template>
  <v-container fluid grid-list-xs class="pa-0 white">
    <v-row no-gutters style="height:100vh;" class="d-flex justify-center">
      <v-col cols="8" align-self="center" class="py-1 px-0 text-center">
        <v-card outlined>
          <v-stepper v-model="e1" vertical class="transparent elevation-0">
            <v-snackbar
              v-model="snackbar"
              :color="
                add_stock_response.status == 'success'
                  ? 'green accent-4'
                  : 'error'
              "
              :timeout="5000"
              top
              right
            >
              <v-icon color="white">mdi-shape-circle-plus</v-icon>
              {{ add_stock_response.message }}
              <v-btn color="white" text icon @click="snackbar = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-snackbar>

            <v-stepper-step editable :complete="e1 > 1" step="1"
              >Drug To Stock</v-stepper-step
            >

            <v-stepper-content step="1">
              <v-card class="elevation-0 transparent py-2">
                <v-autocomplete
                  v-model="select"
                  :loading="loading"
                  :items="items"
                  item-text="name"
                  item-value="_id"
                  :search-input.sync="search"
                  cache-items
                  class="mx-4"
                  flat
                  hide-no-data
                  hide-details
                  placeholder="Type and select Drug Name you want Restock"
                  color="green accent-4"
                  label="Drug Name"
                  outlined
                ></v-autocomplete>
              </v-card>
              <v-card
                v-show="select"
                max-width="344"
                class="mx-auto elevation-0 mb-2"
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="title">{{
                      sel_stock_detail.name
                    }}</v-list-item-title>
                    <v-list-item-subtitle class="subtitle-2"
                      >NAFDAC#:
                      {{ sel_stock_detail.nafdac }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
                <!-- <v-img height="194" :src="'http://localhost:5000/api/v1/storage/'+sel_stock_detail.image" ></v-img> -->

                <v-card-text class="subtitle-2 pt-0"
                  >Dosage: {{ sel_stock_detail.dosage }}</v-card-text
                >
              </v-card>

              <v-btn
                :disabled="select == ('' || null)"
                text
                color="green"
                @click="e1 = 2"
                >Add new Stock Details</v-btn
              >
            </v-stepper-content>
            <v-stepper-step editable :complete="e1 > 2" step="2"
              >New Stock Details</v-stepper-step
            >

            <v-stepper-content step="2">
              <v-card class="elevation-0 transparent py-2">
                <v-text-field
                  outlined
                  v-model="new_qty"
                  type="number"
                  color="green accent-4"
                  label="New Quantity"
                  prepend-icon="mdi-layers-plus"
                ></v-text-field>
                <v-text-field
                  outlined
                  type="number"
                  v-model="cost_price"
                  color="green accent-4"
                  label="Cost Price"
                  prepend-icon="mdi-cash-usd"
                ></v-text-field>
                <v-text-field
                  outlined
                  v-model="selling_price"
                  type="number"
                  color="green accent-4"
                  label="Selling Price"
                  prepend-icon="mdi-coins"
                ></v-text-field>
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="man_date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="man_date"
                      label="Manufacture Date"
                      prepend-icon="mdi-plus"
                      readonly
                      outlined
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    header-color="green accent-4"
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false"
                      >Cancel</v-btn
                    >
                    <v-btn text color="primary" @click="$refs.dialog.save(date)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-dialog>
                <v-dialog
                  ref="dialog1"
                  v-model="modal1"
                  :return-value.sync="exp_date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="exp_date"
                      label="Expirty Date"
                      prepend-icon="mdi-close"
                      readonly
                      outlined
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date1"
                    header-color="green accent-4"
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal1 = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog1.save(date1)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-dialog>
              </v-card>
              <v-btn color="grey" text @click="e1 = 1">Prev</v-btn>
              <v-btn color="green" text @click="e1 = 3">Next</v-btn>
            </v-stepper-content>
            <v-stepper-step editable :complete="e1 > 3" step="3">Done</v-stepper-step>

            <v-stepper-content step="3">
              <v-alert
                icon="mdi-shape-circle-plus"
                prominent
                text
                type="info"
                v-show="form_directive"
                >Click on Add Stock to add the current stock to the
                System</v-alert
              >
              <v-card class="mb-12 transparent elevation-0">
                <v-progress-circular
                  :size="100"
                  :width="2"
                  color="green "
                  indeterminate
                  v-show="form_action"
                ></v-progress-circular>
              </v-card>
              <v-btn color="grey" text @click="e1 = 2">Prev</v-btn>
              <v-btn color="green" text @click="submit_form()">Add Drug</v-btn>
            </v-stepper-content>
          </v-stepper>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      e1: 0,
      date: new Date().toISOString().substr(0, 10),
      date1: new Date().toISOString().substr(0, 10),
      modal: false,
      modal1: false,
      snackbar: false,
      form_action: false,
      form_directive: true,
      add_stock_response: {
        status: "",
        message: ""
      },
      sel_stock_detail: {
        name: "",
        nafdac: "",
        dosage: "",
        image: ""
      },
      exp_date: "",
      man_date: "",
      selling_price: 0.0,
      cost_price: 0.0,
      new_qty: 0,
      loading: false,
      items: [],
      search: null,
      select: null,
      drugs: []
    };
  },
  methods: {
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      axios
        .get("http://localhost:5000/api/v1/drug/find", {
          params: {
            drug_name: v,
            result_limit: 10
          }
        })
        .then(res => {
          console.log(res.data);
          this.drugs = res.data;
          this.items = this.drugs.filter(e => {
            return (
              (e.name || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1
            );
          });
          this.loading = false;
        });
    },
    stockDetails(u) {
      axios
        .get("http://localhost:5000/api/v1/drug/find", {
          params: {
            drug_id: u
          }
        })
        .then(res => {
          console.log(res.data);
          this.sel_stock_detail.name = res.data.name;
          this.sel_stock_detail.nafdac = res.data.nafdac;
          this.sel_stock_detail.dosage = res.data.dosage;
          this.sel_stock_detail.image = res.data.image;
        });
    },
    submit_form() {
      this.form_directive = false;
      this.form_action = true;
      let formData = new FormData();
      formData.append("stock_item_uid", this.select);
      formData.append("total_qty", this.new_qty);
      formData.append("avail_qty", this.new_qty);
      formData.append("man_date", this.man_date);
      formData.append("exp_date", this.exp_date);
      formData.append("cost_price", this.cost_price);
      formData.append("selling_price", this.selling_price);

      axios
        .post("http://localhost:5000/api/v1/stock/create", formData)
        .then(res => {
          console.log("Success!");
          console.log(res.data);
          this.form_action = false;
          this.form_directive = true;
          this.snackbar = true;
          this.e1 = 1;
          this.select = "";
          this.exp_date = "";
          this.man_date = "";
          this.selling_price = 0.0;
          this.cost_price = 0.0;
          this.new_qty = 0;
          this.add_stock_response = {
            status: "success",
            message: "Adding New Stock Successful."
          };
        })
        .catch(error => {
          console.log("Error!");
          console.log(error.message);
          this.form_action = false;
          this.snackbar = true;
          this.add_stock_response = {
            status: "error",
            message: error.message
          };
        });
    }
  },

  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
    select(val) {
      this.stockDetails(val);
    }
  }
};
</script>
