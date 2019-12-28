<template>
  <v-container fluid grid-list-xs class="white pa-0">
    <v-row no-gutters style="height:100vh;" class="d-flex justify-space-around">
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
              >Drug To Sell</v-stepper-step
            >

            <v-stepper-content step="1">
              <v-card class="elevation-0 transparent py-2">
                <v-autocomplete
                  v-model="drug_select"
                  :loading="loading"
                  :items="items"
                  item-text="name"
                  item-value="_id"
                  :search-input.sync="search"
                  cache-items
                  flat
                  hide-no-data
                  hide-details
                  placeholder="Type and select Drug Name you want Sell"
                  color="green accent-4"
                  label="Drug Name"
                  prepend-icon="mdi-pill"
                  outlined
                ></v-autocomplete>
              </v-card>
              <v-card
                v-show="drug_select"
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
              <v-card class="elevation-0 transparent py-2">
                <v-select
                  v-model="stock_select"
                  :items="stocks"
                  :item-text="stock_date_qty_info"
                  item-value="_id"
                  prepend-icon="mdi-file-cabinet"
                  label="Choose Stock"
                  placeholder="Choose Stock to Sell From"
                  outlined
                ></v-select>
              </v-card>

              <v-btn
                text
                :disabled="stock_select == ('' || null)"
                color="green"
                @click="e1 = 2"
                >Next</v-btn
              >
            </v-stepper-content>
            <v-stepper-step editable :complete="e1 > 2" step="2"
              >Choose From Available Stock</v-stepper-step
            >

            <v-stepper-content step="2">
              <v-card class="elevation-0 transparent py-2">
                <v-text-field
                  v-model="drug_qty"
                  outlined
                  type="number"
                  color="green accent-4"
                  label="Drug Quantity"
                  prepend-icon="mdi-layers"
                ></v-text-field>
              </v-card>
              <v-btn color="grey" text @click="e1 = 1">Prev</v-btn>
              <v-btn
                :disabled="drug_qty == ('' || null || 0)"
                color="green"
                text
                @click="(e1 = 3), add_to_cart()"
                >Add to cart</v-btn
              >
            </v-stepper-content>
            <v-stepper-step editable :complete="e1 > 3" step="3">Done</v-stepper-step>

            <v-stepper-content step="3">
              <v-alert
                icon="mdi-shape-circle-plus"
                prominent
                text
                type="info"
                v-show="form_directive"
                >Click on Create to add the current transaction to the System
                and print Invoice</v-alert
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
              <v-btn color="green" text @click="add_another_to_cart(), (e1 = 1)"
                >Add Aother Drug</v-btn
              >
            </v-stepper-content>
          </v-stepper>
        </v-card>
      </v-col>
      <v-col cols="3" align-self="center" class="py-1 px-0">
        <v-card outlined class="mx-auto mb-2">
          <v-list-item>
            <v-list-item-avatar color="green accent-4">
              <v-icon color="white">mdi-cart-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="title">CART</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <div id="order_reciept">
            <v-card-text class="pa-1">
              <v-divider></v-divider>
              <v-list dense flat class="py-0 px-2">
                <v-list-item
                  class="pa-0"
                  v-for="(item, i) in display_cart"
                  :key="i"
                >
                  <v-list-item-content class="pa-0">
                    <v-list-item-title class="subtitle-1">{{
                      i
                    }}</v-list-item-title>
                    <v-list-item-subtitle
                      v-if="i == 'Total_Qty'"
                      class="subtitle-1"
                      >N{{ item }}</v-list-item-subtitle
                    >
                    <v-list-item-subtitle
                      v-else-if="i == 'Total'"
                      class="subtitle-1"
                      >N{{ item }}</v-list-item-subtitle
                    >
                    <v-list-item-subtitle v-else class="subtitle-1">{{
                      item
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
            </v-card-text>
            <barcode
              :value="Math.floor(1000000000000 + Math.random() * 900000000000)"
              format="CODE128"
              height="53"
              >Barcode Failed
            </barcode>
          </div>
          <v-card-text class="pa-1">
            <v-text-field
              :v-if="display_cart.by == ''"
              class="mb-1"
              hide-details
              v-model="by"
              outlined
              color="green accent-4"
              label="Customer Name"
              dense
            ></v-text-field>
            <v-text-field
              class="mb-1"
              v-model="addr"
              hide-details
              outlined
              dense
              color="green accent-4"
              label="Customer Address"
            ></v-text-field>
            <v-btn
              :disabled="addr == '' || by == ''"
              color="green"
              block
              text
              @click="print_reciept()"
              >PRINT</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
import VueBarCode from "vue-barcode";
import printJS from "print-js";
export default {
  data() {
    return {
      by: "",
      e1: 0,
      fab: false,
      addr: "",
      date: new Date().toISOString().substr(0, 10),
      date1: new Date().toISOString().substr(0, 10),
      modal: false,
      modal1: false,
      snackbar: false,
      form_action: false,
      form_directive: true,
      stocks: [],
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
      drug_qty: 0,
      loading: false,
      items: [],
      search: null,
      drug_select: null,
      stock_select: null,
      drugs: [],
      cart_schema: {
        drug_id: "",
        stock_id: "",
        qty: 0,
        cost: 0,
        subtotal: 0
      },
      cart: [],
      display_cart: {
        By: "",
        Time: "",
        Total_Qty: 0,
        Total: 0
      }
    };
  },
  components: {
    barcode: VueBarCode
  },
  methods: {
    print_reciept() {
      printJS({
        printable: "order_reciept",
        type: "html",
        maxWidth: 275.75
      });
    },
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
          console.log({ "drugListing: ": res.data });
          this.drugs = res.data;
          this.items = this.drugs.filter(e => {
            return (
              (e.name || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1
            );
          });
          this.loading = false;
        });
    },
    drugDetails(u) {
      axios
        .get("http://localhost:5000/api/v1/drug/find", {
          params: {
            drug_id: u
          }
        })
        .then(res => {
          console.log({ "DrugDetail: ": res.data });
          this.sel_stock_detail.name = res.data.name;
          this.sel_stock_detail.nafdac = res.data.nafdac;
          this.sel_stock_detail.dosage = res.data.dosage;
          this.sel_stock_detail.image = res.data.image;
        });
    },
    availStock(u) {
      axios
        .get("http://localhost:5000/api/v1/stock/find", {
          params: {
            stock_item_id: u
          }
        })
        .then(res => {
          console.log({ "availstock: ": res.data });
          this.stocks = res.data;
        });
    },
    submit_form() {
      this.form_directive = false;
      this.form_action = true;
      let formData = new FormData();
      // formData.append("total_qty", this.new_qty);

      axios
        .post("http://localhost:5000/api/v1/stock/create", formData)
        .then(res => {
          console.log("Success!");
          console.log(res.data);
          this.form_action = false;
          this.form_directive = true;
          this.snackbar = true;
          this.e1 = 1;
          this.add_stock_response = {
            status: "success",
            message: "Added Drug to Cart Successful."
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
    },
    stock_date_qty_info: item =>
      "EXP DATE: " + item.exp_date + " -- AVAIL QTY: " + item.avail_qty,
    add_to_cart() {
      var dTotal_qty = 0;
      var dTotal = 0;
      var new_item_id = "";
      var new_item_stock_id = "";
      var new_item_qty = 0;
      var new_item_cost = 0;
      var new_item_subtotal = 0;

      new_item_id = this.drug_select;
      new_item_stock_id = this.stock_select;
      new_item_qty = this.drug_qty;
      this.stocks.forEach(stock => {
        if (this.stock_select == stock._id) {
          new_item_cost = stock.selling_price;
        }
      });
      new_item_subtotal = Number(new_item_qty * new_item_cost).toFixed(2);
      this.cart.push({
        drug_id: new_item_id,
        stock_id: new_item_stock_id,
        qty: new_item_qty,
        cost: new_item_cost,
        subtotal: new_item_subtotal
      });
      this.cart.forEach(itm => {
        for (let key in itm) {
          if (key == "qty") {
            dTotal_qty = (Number(dTotal_qty) + Number(itm[key])).toFixed(2);
          }
          if (key == "subtotal") {
            dTotal = (Number(dTotal) + Number(itm[key])).toFixed(2);
          }
        }
      });
      this.display_cart.By = this.by;
      var m = new Date();
      var dateString =
        m.getUTCFullYear() +
        "/" +
        ("0" + (m.getUTCMonth() + 1)).slice(-2) +
        "/" +
        ("0" + m.getUTCDate()).slice(-2) +
        " " +
        ("0" + m.getUTCHours()).slice(-2) +
        ":" +
        ("0" + m.getUTCMinutes()).slice(-2) +
        ":" +
        ("0" + m.getUTCSeconds()).slice(-2);
      this.display_cart.Time = dateString;
      this.display_cart.Total_Qty = dTotal_qty;
      this.display_cart.Total = dTotal;
      this.drug_select = "";
      this.stock_select = "";
      this.drug_qty = 0;
    },
    add_another_to_cart() {
      this.drug_select = "";
      this.stock_select = "";
      this.drug_qty = 0;
    },
    empty_cart() {
      this.drug_select = "";
      this.stock_select = "";
      this.drug_qty = 0;
      this.cart = [];
    }
  },

  watch: {
    search(val) {
      val && val !== this.drug_select && this.querySelections(val);
    },
    drug_select(val) {
      this.drugDetails(val);
      this.availStock(val);
    },
    by(val) {
      this.display_cart.By = val;
    }
  },
  computed: {
    activeFab() {
      switch (this.tabs) {
        case "one":
          return { class: "purple", icon: "account_circle" };
        case "two":
          return { class: "red", icon: "edit" };
        case "three":
          return { class: "green", icon: "keyboard_arrow_up" };
        default:
          return {};
      }
    }
  }
};
</script>
