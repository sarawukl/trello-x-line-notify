<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      dense
    >
      <div class="d-flex align-center"></div>
      <v-toolbar-title>Trello x Line Notify</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        href="https://github.com/sarawukl/trello-x-line-notify"
        target="_blank"
      >
        <v-icon>mdi-github-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <Index />
    </v-content>
  </v-app>
</template>

<script>
  import Index from "./components/Index";

  export default {
    name: "App",

    components: {
      Index
    },

    data: () => ({
      //
    })
  };
</script>
