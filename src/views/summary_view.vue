<template>
  <v-container fluid grid-list-xs class="pa-0 white">
    <v-row no-gutters style="height:100vh;" class="d-flex justify-space-around">
      <v-col cols="6" align-self="center" class="pa-2 text-center">
        <v-card outlined class="mx-auto text-center pa-0" dark max-width="600">
          <v-card-text class="pa-0">
            <v-sheet color="rgba(0, 0, 0, .12)">
              <v-sparkline
                :value="d_value"
                color="rgba(0, 255, 0, .7)"
                height="100"
                padding="10"
                stroke-linecap="round"
                smooth
              >
                <template v-slot:label="item"
                  >N{{ item.value }}</template
                >
              </v-sparkline>
            </v-sheet>
          </v-card-text>

          <v-card-text class="pa-1">
            <div
              class="display-1 white--text font-weight-medium font-weight-thin"
            >
              Daily Sales
            </div>
          </v-card-text>

          <v-divider></v-divider>
        </v-card>
      </v-col>
      <v-col cols="6" align-self="center" class="pa-2 text-center">
        <v-card outlined class="mx-auto text-center pa-0" dark max-width="600">
          <v-card-text class="pa-0">
            <v-sheet color="rgba(0, 0, 0, .12)">
              <v-sparkline
                :value="w_value"
                color="rgba(0, 255, 0, .7)"
                height="100"
                padding="10"
                stroke-linecap="round"
                smooth
              >
                <template v-slot:label="item"
                  >N{{ item.value }}</template
                >
              </v-sparkline>
            </v-sheet>
          </v-card-text>

          <v-card-text class="pa-1">
            <div
              class="display-1 white--text font-weight-medium font-weight-thin"
            >
              Weekly Sales
            </div>
          </v-card-text>

          <v-divider></v-divider>
        </v-card>
      </v-col>
      <v-col cols="6" align-self="center" class="pa-2 text-center">
        <v-card outlined class="mx-auto text-center pa-0" dark max-width="600">
          <v-card-text class="pa-0">
            <v-sheet color="rgba(0, 0, 0, .12)">
              <v-sparkline
                :value="m_value"
                color="rgba(0, 255, 0, .7)"
                height="100"
                padding="10"
                stroke-linecap="round"
                smooth
              >
                <template v-slot:label="item"
                  >N{{ item.value }}</template
                >
              </v-sparkline>
            </v-sheet>
          </v-card-text>

          <v-card-text class="pa-1">
            <div
              class="display-1 white--text font-weight-medium font-weight-thin"
            >
              Monthly Sales
            </div>
          </v-card-text>

          <v-divider></v-divider>
        </v-card>
      </v-col>
      <v-col cols="6" align-self="center" class="pa-2 text-center">
        <v-card outlined class="mx-auto text-center pa-0" dark max-width="600">
          <v-card-text class="pa-0">
            <v-sheet color="rgba(0, 0, 0, .12)">
              <v-sparkline
                :value="y_value"
                color="rgba(0, 255, 0, .7)"
                height="100"
                padding="10"
                stroke-linecap="round"
                smooth
              >
                <template v-slot:label="item"
                  >N{{ item.value }}</template
                >
              </v-sparkline>
            </v-sheet>
          </v-card-text>

          <v-card-text class="pa-1">
            <div
              class="display-1  white--text font-weight-medium font-weight-thin"
            >
              Yearly Sales
            </div>
          </v-card-text>

          <v-divider></v-divider>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      d_value: Array.from({ length: 12 }, () =>
        Math.floor(Math.random() * 1000)
      ),
      w_value: Array.from({ length: 12 }, () =>
        Math.floor(Math.random() * 1000)
      ),
      m_value: Array.from({ length: 12 }, () =>
        Math.floor(Math.random() * 1000)
      ),
      y_value: Array.from({ length: 12 }, () =>
        Math.floor(Math.random() * 1000)
      )
    };
  }
};
</script>
