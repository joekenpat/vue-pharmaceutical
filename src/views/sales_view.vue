<template>
  <v-card class="elevation-0">
    <v-card-title>
      SALES
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="trans"
      :search="search"
      :loading="trans.length == 0"
      :items-per-page="10"
      loading-text="Loading Data..."
      no-data-text="No Data to Display!"
      no-results-text="No Data Matching Your Search Query!"
    >
      <template v-slot:item.cost="{ item }">
        {{ item.price * item.qty }}
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "DRUG",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "CUSTOMER NAME", value: "by" },
        { text: "QUANTITY", value: "qty" },
        { text: "PRICE", value: "price" },
        { text: "COST", value: "cost" },
        { text: "DATE", value: "date" }
      ],
      trans: [
        {
          name: "Paracetamol",
          by: "Kenneth",
          qty: 3,
          price: 34,
          cost: 0,
          date: "2019/04/14"
        },
        {
          name: "Ibroprufen",
          by: "James Brown",
          qty: 6,
          price: 24,
          cost: 0,
          date: "2019/01/12"
        },
        {
          name: "Ampicilin",
          by: "John Doe",
          qty: 45,
          price: 5,
          cost: 0,
          date: "2018/05/31"
        },
        {
          name: "Vitamin C",
          by: "Michael Angelo",
          qty: 34,
          price: 23,
          cost: 0,
          date: "2019/06/23"
        },
        {
          name: "Chloroquine",
          by: "Lucifer Morning Star",
          qty: 1,
          price: 42,
          cost: 0,
          date: "2019/02/24"
        },
        {
          name: "Lornart DS",
          by: "Scott McCall",
          qty: 6,
          price: 342,
          cost: 0,
          date: "2019/08/01"
        },
        {
          name: "Amalar",
          by: "Allison Argent",
          qty: 6,
          price: 24,
          cost: 0,
          date: "2019/01/12"
        },
        {
          name: "Ampiclox",
          by: "Tyler Pose",
          qty: 45,
          price: 5,
          cost: 0,
          date: "2019/05/31"
        },
        {
          name: "Amoxil",
          by: "Lydia Martin",
          qty: 34,
          price: 23,
          cost: 0,
          date: "2019/06/23"
        },
        {
          name: "Strepsil",
          by: "Stiles Stilinski",
          qty: 1,
          price: 42,
          cost: 0,
          date: "2019/02/24"
        },
        {
          name: "Malariech",
          by: "Derek Hale",
          qty: 24,
          price: 342,
          cost: 0,
          date: "2019/08/01"
        },
        {
          name: "Postinor II",
          by: "Kate Argent",
          qty: 43,
          price: 22,
          cost: 0,
          date: "2019/08/01"
        },
        {
          name: "Amartem",
          by: "Kira Yukimura",
          qty: 2,
          price: 342,
          cost: 0,
          date: "2019/08/01"
        },
        {
          name: "Vega C",
          by: "Hayden Romero",
          qty: 9,
          price: 1342,
          cost: 0,
          date: "2019/08/01"
        }
      ]
    };
  }
};
</script>
