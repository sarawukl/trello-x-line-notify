<template>
  <v-row justify="center">
    <v-dialog
      :value="value"
      max-width="600"
      @input="$emit('input')"
    >
      <v-card>
        <v-card-title class="headline">How to generate Line Notify Token?</v-card-title>
        <v-card-text>
          <p>1.Create Line Notify Service at <a
              href="https://notify-bot.line.me/"
              target="_blank"
            >https://notify-bot.line.me/</a> (If Notify service not exists)</p>
          <p>2.Go to <a
              href="https://notify-bot.line.me/my/"
              target="_blank"
            >https://notify-bot.line.me/my/</a></p>
          <p>3.Go to Generate Token > Select Chat room or Chat Group and Generate</p>
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