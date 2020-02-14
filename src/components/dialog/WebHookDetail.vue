<template>
  <v-row justify="center">
    <v-dialog
      :value="value"
      max-width="600"
      @input="$emit('input')"
      persistent
    >
      <v-card>
        <v-card-title class="headline">Your Webhook detail</v-card-title>
        <v-card-text>
          <v-alert
            type="warning"
            dense
            outlined
          >
            Please save your WEBHOOK ID for management in the future.
          </v-alert>
          <ValidationObserver v-slot="{ handleSubmit }">
            <v-form @submit.prevent="handleSubmit(setTrelloKey)">
              <v-row
                no-gutters
                align="center"
                justify="center"
              >
                <v-col cols="8">
                  <ValidationProvider
                    name="WEBHOOK ID"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      label="WEBHOOK ID"
                      autocomplete="off"
                      readonly
                      v-model="webhook_detail.id"
                      :error-messages="errors[0]"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="8">
                  <ValidationProvider
                    name="WEBHOOK DESCRIPTION"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      label="WEBHOOK DESCRIPTION"
                      autocomplete="off"
                      required
                      readonly
                      v-model="webhook_detail.description"
                      :error-messages="errors[0]"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="8">
                  <ValidationProvider
                    name="CALLBACK URL"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      label="CALLBACK URL"
                      autocomplete="off"
                      required
                      readonly
                      v-model="webhook_detail.callbackURL"
                      :error-messages="errors[0]"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="8">
                  <ValidationProvider
                    name="STATUS"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-checkbox
                      v-model="webhook_detail.active"
                      :label="webhook_detail.active?'Active':'Inactive'"
                      :error-messages="errors[0]"
                      readonly
                    ></v-checkbox>
                  </ValidationProvider>
                </v-col>
                <v-col cols="8">
                  <v-btn
                    color="error"
                    @click="deleteWebHook"
                  >Delete Webhook</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </ValidationObserver>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click.native="$emit('input')"
          >Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: ["value", "webhook_detail"],
    methods: {
      deleteWebHook() {
        if (confirm("Do you really want to delete?")) {
          this.$emit("deleteWebHook");
        }
      }
    }
  };
</script>

<style>
</style>