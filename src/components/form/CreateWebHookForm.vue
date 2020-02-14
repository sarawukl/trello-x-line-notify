<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <v-form @submit.prevent="handleSubmit(createWebhook)">
      <v-row
        no-gutters
        align="center"
        justify="center"
        v-if="lists.length && trigger_scope == 'list'"
      >
        <v-col cols="8">
          <ValidationProvider
            v-if="trigger_scope == 'list'"
            name="List"
            rules="required"
            v-slot="{ errors }"
          >
            <v-select
              v-model="list"
              :items="lists"
              item-text="name"
              return-object
              label="List"
              :error-messages="errors[0]"
            ></v-select>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row
        no-gutters
        align="center"
        justify="center"
        v-if="board_detail && trigger_scope == 'board'"
      >
        <v-col cols="8">
          <v-text-field
            v-model="board_detail.id"
            label="Board ID"
            required
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="8">
          <v-text-field
            v-model="board_detail.name"
            label="Board Name"
            required
            disabled
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row
        no-gutters
        align="center"
        justify="center"
      >
        <v-col cols="8">
          <ValidationProvider
            name="Webhook Description"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              v-model="webhook_description"
              label="Webhook Description*"
              required
              :error-messages="errors[0]"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row
        align="center"
        justify="center"
      >
        <v-col cols="8">
          <v-btn
            block
            color="primary"
            type="submit"
          >
            Create Trello Webhook
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </ValidationObserver>
</template>

<script>
  export default {
    props: ["lists", "board_detail", "trigger_scope"],
    data() {
      return { list: null, webhook_description: "" };
    },
    methods: {
      createWebhook() {
        this.$emit("createWebhook", this.list, this.webhook_description);
      }
    }
  };
</script>

<style>
</style>