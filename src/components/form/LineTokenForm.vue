<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <v-form @submit.prevent="handleSubmit(setLineToken)">
        <v-row
          no-gutters
          align="center"
          justify="center"
        >
          <v-col cols="8">
            <ValidationProvider
              name="Line Token"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="line_token"
                label="Line Token*"
                autocomplete="off"
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
          <v-col cols="7">
            <v-btn
              block
              color="primary"
              type="submit"
            >
              Continue
            </v-btn>
          </v-col>
          <v-col cols="1">
            <v-btn
              fab
              x-small
              color="primary"
              @click="dialog=true"
            >
              <v-icon dark>mdi-help</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </ValidationObserver>
    <LineTokenGuide v-model="dialog" />
  </div>
</template>

<script>
  import LineTokenGuide from "../dialog/LineTokenGuide";
  export default {
    components: { LineTokenGuide },
    data() {
      return { line_token: "", dialog: false };
    },
    methods: {
      setLineToken() {
        this.$emit("setLineToken", this.line_token);
      }
    }
  };
</script>

<style></style>
