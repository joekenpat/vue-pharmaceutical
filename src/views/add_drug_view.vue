<template>
  <v-container fluid grid-list-xs class="pa-0 white">
    <v-row no-gutters style="height:100vh;" class="d-flex justify-center">
      <v-col cols="9" align-self="center" class="py-1 px-0 text-center">
        <v-card outlined>
          <v-stepper v-model="e1" vertical class="transparent elevation-0">
            <v-snackbar
              v-model="snackbar"
              :timeout="5000"
              top
              right
              :color="
                add_drug_response.status == 'success'
                  ? 'green accent-4'
                  : 'error'
              "
            >
              <v-icon color="white">mdi-shape-circle-plus</v-icon>
              {{ add_drug_response.message }}
              <v-btn color="white" text icon @click="snackbar = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-snackbar>
            <v-form>
              <v-stepper-step editable :complete="e1 > 1" step="1">Basic</v-stepper-step>

              <v-stepper-content step="1">
                <v-card class="elevation-0 transparent py-2">
                  <v-text-field
                    v-model="drug_name"
                    outlined
                    color="green accent-4"
                    label="Drug Name"
                    prepend-icon="mdi-pill"
                  ></v-text-field>
                </v-card>
                <v-text-field
                  v-model="nafdac"
                  outlined
                  color="green accent-4"
                  label="Nafdac Number"
                  prepend-icon="mdi-shield-check-outline"
                ></v-text-field>
                <v-text-field
                  v-model="dosage"
                  outlined
                  color="green accent-4"
                  label="Drug Dosage"
                  prepend-icon="mdi-eyedropper"
                ></v-text-field>
                <v-btn color="green" text @click="e1 = 2">Next</v-btn>
              </v-stepper-content>
              <v-stepper-step editable :complete="e1 > 2" step="2"
                >Result</v-stepper-step
              >

              <v-stepper-content step="2">
                <v-alert
                  icon="mdi-shape-circle-plus"
                  prominent
                  text
                  type="info"
                  v-show="form_directive"
                  >Click on Add Drug to add the current drug to the
                  System</v-alert
                >
                <v-card class="mb-12" color>
                  <v-progress-circular
                    :size="100"
                    :width="2"
                    color="green "
                    indeterminate
                    v-show="form_action"
                  ></v-progress-circular>
                </v-card>
                <v-btn color="grey" text @click="e1 = 1">Prev</v-btn>
                <v-btn color="green" text @click="submit_form()"
                  >Add Drug</v-btn
                >
              </v-stepper-content>
            </v-form>
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
      snackbar: false,
      form_action: false,
      form_directive: true,
      drug_name: "",
      nafdac: "",
      dosage: "",
      add_drug_response: {
        status: "",
        message: ""
      }
    };
  },
  methods: {
    submit_form() {
      this.form_directive = false;
      this.form_action = true;
      let formData = new FormData();
      formData.append("name", this.drug_name);
      formData.append("nafdac", this.nafdac);
      formData.append("dosage", this.dosage);

      axios
        .post("http://localhost:5000/api/v1/drug/create", formData)
        .then(res => {
          console.log("Success!");
          console.log(res.data);
          this.form_action = false;
          this.form_directive = true;
          this.snackbar = true;
          this.e1 = 1;
          this.drug_name = "";
          this.nafdac = "";
          this.dosage = "";
          this.add_drug_response = {
            status: "success",
            message: "Adding New Drug Successful."
          };
        })
        .catch(error => {
          console.log("Error!");
          console.log(error.message);
          this.form_action = false;
          this.snackbar = true;
          this.add_drug_response = {
            status: "error",
            message: error.message
          };
        });
    }
  }
};
</script>
