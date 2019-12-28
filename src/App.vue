<template>
  <v-app>
    <v-navigation-drawer
      app
      permanent
      width="250"
      style="height:100vh;"
      class="green accent-4"
    >
      <v-list-item class>
        <v-list-item-content>
          <v-list-item-title class="title white--text"
            >VUE PHARMACEUTICAL</v-list-item-title
          >
          <v-list-item-subtitle class="subtitle-1 white--text"
            >Inventory Mananger</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav shaped>
        <v-list-item
          class="py-3"
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon class="mr-3">
            <v-icon class="white--text" size="45">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text subtitle-1">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
    items: [
      { title: "SELL DRUG", icon: "mdi-currency-usd", to: "sell_drug_view" },
      { title: "ADD STOCK", icon: "mdi-database-plus", to: "add_stock_view" },
      { title: "ADD DRUG", icon: "mdi-shape-circle-plus", to: "add_drug_view" },
      {
        title: "VIEW SALES",
        icon: "mdi-file-document-box-search-outline",
        to: "sales_view"
      },
      {
        title: "VIEW SUMMARY",
        icon: "mdi-view-dashboard-outline",
        to: "summary_view"
      }
    ],
    right: null
  })
};
</script>
