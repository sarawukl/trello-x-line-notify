<template>
  <v-row justify="center">
    <v-dialog
      :value="value"
      max-width="600"
      @input="$emit('input')"
    >
      <v-card>
        <v-card-title class="headline">How to get trello app token?</v-card-title>
        <v-card-text>
          <p>1.Get app key > Go to <a
              href="https://trello.com/app-key"
              target="_blank"
            >https://trello.com/app-key</a></p>
          <div>
            <v-img
              src="../../assets/trello-key-1.png"
              max-width="400"
              contain
            />
          </div>
          <div>
            <v-img
              src="../../assets/trello-key-2.png"
              max-width="400"
              contain
            />
          </div>
          <p>2.Trello Board URL example: https://trello.com/b/ABCabcDEFdef/project-name</p>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: ["value"]
  };
</script>

<style>
</style>