<template>
  <v-row justify="center">
    <v-dialog
      :value="value"
      max-width="600"
      @input="$emit('input')"
    >
      <v-card>
        <v-card-title class="headline">How to create Google cloud function?</v-card-title>
        <v-card-text>
          <p>1.Go to <a
              href="http://console.cloud.google.com/functions"
              target="_blank"
            >http://console.cloud.google.com/functions</a></p>
          <p>2. <b>+</b> Create Function</p>
          <div>
            <v-img
              src="../../assets/handler-1.png"
              max-width="400"
              contain
            />
          </div>
          <div>
            <v-img
              src="../../assets/handler-2.png"
              max-width="400"
              contain
            />
          </div>
          <p>3.Create</p>
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