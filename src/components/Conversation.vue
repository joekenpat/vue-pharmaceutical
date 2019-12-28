<template>
  <div>
    <v-card class="elevation-0 rounded-0 transparent">
      <v-card-text class="pa-0" id="chat_holder">
        <v-list rounded dense class="pa-1 d-block transparent" id="chat_list">
          <template v-for="(item, index) in messages">
            <v-list-item
              :class="{
                'text-end w-95 ml-auto elevation-1 orange lighten-3 text-right':
                  item.sender == 'me',
                'text-left w-95 elevation-1 mr-auto text-start white':
                  item.sender != 'me'
              }"
              :key="index"
              :id="`message-${index}`"
            >
              <v-list-item-content>
                <v-list-item-subtitle
                  class="text-wrap"
                  :class="{
                    'pl-10': item.sender == 'me',
                    'pr-10': item.sender != 'me'
                  }"
                  v-text="item.content"
                ></v-list-item-subtitle>
                <v-list-item-subtitle
                  class="text-wrap grey--text"
                  :class="{
                    'pl-10': item.sender == 'me',
                    'pr-10': item.sender != 'me'
                  }"
                  v-text="`12:34 PM`"
                ></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon
                  v-if="
                    item.sender == 'me' && (item.status == 'sent' || 'read')
                  "
                  :class="{ 'green--text': item.status == 'read' }"
                  >mdi-check-all</v-icon
                >
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    messages: {
      type: Array,
      required: true
    }
  },
  methods: {}
};
</script>
<style>
.rounded-0 {
  border-radius: 0;
}
.w-95 {
  width: 95%;
}
</style>
