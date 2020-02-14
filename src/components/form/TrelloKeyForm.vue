<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <v-form @submit.prevent="handleSubmit(setTrelloKey)">
        <v-row
          no-gutters
          align="center"
          justify="center"
        >
          <v-col cols="8">
            <ValidationProvider
              name="TRELLO APP KEY"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="model.trello_app_key"
                label="TRELLO APP KEY*"
                autocomplete="off"
                required
                :error-messages="errors[0]"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="8">
            <ValidationProvider
              name="TRELLO TOKEN"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="model.trello_token"
                label="TRELLO TOKEN*"
                autocomplete="off"
                required
                :error-messages="errors[0]"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="8">
            <ValidationProvider
              name="TRELLO SECRET KEY"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="model.trello_secret_key"
                label="TRELLO SECRET KEY*"
                autocomplete="off"
                required
                :error-messages="errors[0]"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="8">
            <ValidationProvider
              name="Trello Board URL"
              rules="required|regex:((https?:\/\/)(www\.)?(trello\.com\/b\/))([-/a-zA-Z0-9])+$"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="model.trello_board_url"
                label="Trello Board URL*"
                autocomplete="off"
                required
                :error-messages="errors[0]"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="8">
            <ValidationProvider
              name="Trigger Scope"
              rules="required"
              v-slot="{ errors }"
            >
              <v-radio-group
                v-model="model.trigger_scope"
                :error-messages="errors[0]"
                row
              >
                <template v-slot:label>
                  <div>Trigger Scope*</div>
                </template>
                <v-radio
                  label="Trello Board"
                  value="board"
                ></v-radio>
                <v-radio
                  label="Trello List"
                  value="list"
                ></v-radio>
              </v-radio-group>
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
    <TrelloKeyGuide v-model="dialog" />
  </div>
</template>

<script>
  import TrelloKeyGuide from "../dialog/TrelloKeyGuide";
  export default {
    components: { TrelloKeyGuide },
    data() {
      return {
        dialog: false,
        model: {
          trello_app_key: "",
          trello_secret_key: "",
          trello_token: "",
          trello_board_url: "",
          trigger_scope: null
        }
      };
    },
    methods: {
      setTrelloKey() {
        this.$emit("setTrelloKey", this.model);
      }
    }
  };
</script>

<style></style>
