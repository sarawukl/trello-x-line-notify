<template>
  <v-row justify="center">
    <v-dialog
      :value="value"
      max-width="600"
      @input="$emit('input')"
    >
      <v-card>
        <v-card-title class="headline">Disclaimer</v-card-title>
        <v-card-text>
          <p>This project doesn't keep your secret key/private data.<br>You can get source code at <a
              href="https://github.com/sarawukl/trello-x-line-notify"
              target="_blank"
            >https://github.com/sarawukl/trello-x-line-notify</a></p>
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