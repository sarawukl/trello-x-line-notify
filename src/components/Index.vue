<template>
  <v-container>
    <v-row
      no-gutters
      align="center"
      justify="center"
    >
      <v-col cols="12">
        <v-card>
          <v-stepper
            v-model="e1"
            :alt-labels="$vuetify.breakpoint.smAndUp"
            class="elevation-0"
          >
            <v-row
              no-gutters
              align="center"
              justify="center"
            >
              <v-col cols="8">
                <v-stepper-header class="elevation-0">
                  <v-stepper-step
                    :class="!$vuetify.breakpoint.smAndUp?'pa-0 body-2':'body-2'"
                    step="1"
                    :complete="e1 > 1"
                    :editable="e1 >= 1"
                  >Set Line Token</v-stepper-step>
                  <v-divider v-if="$vuetify.breakpoint.smAndUp"></v-divider>
                  <v-stepper-step
                    :class="!$vuetify.breakpoint.smAndUp?'pa-0 body-2':'body-2'"
                    step="2"
                    :complete="e1 > 2"
                    :editable="e1 >= 2"
                  >Set Trello App Key</v-stepper-step>
                  <v-divider v-if="$vuetify.breakpoint.smAndUp"></v-divider>
                  <v-stepper-step
                    :class="!$vuetify.breakpoint.smAndUp?'pa-0 body-2':'body-2'"
                    step="3"
                    :complete="e1 > 3"
                    :editable="e1 >= 3"
                  >Create Handler</v-stepper-step>
                  <v-divider v-if="$vuetify.breakpoint.smAndUp"></v-divider>
                  <v-stepper-step
                    :class="!$vuetify.breakpoint.smAndUp?'pa-0 body-2':'body-2'"
                    step="4"
                    :complete="e1 > 4"
                    :editable="e1 >= 4"
                  >Create Webhook</v-stepper-step>
                </v-stepper-header>
              </v-col>
            </v-row>
            <v-stepper-items>
              <v-stepper-content step="1">
                <LineTokenForm @setLineToken="setLineToken" />
              </v-stepper-content>
              <v-stepper-content step="2">
                <TrelloKeyForm @setTrelloKey="setTrelloKey" />
              </v-stepper-content>
              <v-stepper-content step="3">
                <HandlerForm
                  :line_token="line_token"
                  v-if="trello_secret_key"
                  :trello_secret_key="trello_secret_key"
                  @setWebHookHandler="setWebHookHandler"
                />
              </v-stepper-content>
              <v-stepper-content step="4">
                <CreateWebHookForm
                  :lists="lists"
                  :board_detail="board_detail"
                  :trigger_scope="trigger_scope"
                  @createWebhook="createWebhook"
                />
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar.show"
      :timeout="snackbar.timeout"
      top
      right
      :color="snackbar.error?'error':'success'"
    >
      {{ snackbar.message }}
    </v-snackbar>
    <WebHookDetail
      v-if="webhook_detail"
      v-model="dialog"
      :webhook_detail="webhook_detail"
      @deleteWebHook="deleteWebHook"
    />
  </v-container>
</template>

<script>
  import axios from "axios";
  import HandlerForm from "./form/HandlerForm";
  import LineTokenForm from "./form/LineTokenForm";
  import TrelloKeyForm from "./form/TrelloKeyForm";
  import CreateWebHookForm from "./form/CreateWebHookForm";
  import WebHookDetail from "./dialog/WebHookDetail";
  export default {
    components: {
      CreateWebHookForm,
      HandlerForm,
      LineTokenForm,
      TrelloKeyForm,
      WebHookDetail
    },
    data() {
      return {
        e1: 1,
        steps: 4,
        dialog: true,
        line_token: "",
        trello_app_key: "",
        trello_secret_key: "",
        trello_token: "",
        trello_board_url: "",
        trigger_scope: "",
        lists: [],
        list: null,
        board_detail: null,
        webhook_description: "",
        webhook_callback_url: "",
        webhook_detail: null,
        snackbar: { show: false, message: "", error: false, timeout: 2500 }
      };
    },
    watch: {
      steps(val) {
        if (this.e1 > val) {
          this.e1 = val;
        }
      }
    },
    methods: {
      nextStep(n) {
        if (n === this.steps) {
          this.e1 = 1;
        } else {
          this.e1 = n + 1;
        }
      },
      setLineToken(line_token) {
        this.line_token = line_token;
        this.nextStep(1);
      },
      setTrelloKey(model) {
        try {
          this.trello_app_key = model.trello_app_key;
          this.trello_secret_key = model.trello_secret_key;
          this.trello_token = model.trello_token;
          this.trello_board_url = model.trello_board_url;
          this.trigger_scope = model.trigger_scope;
          if (this.trigger_scope == "list") {
            this.getBoardList();
          } else {
            this.getBoardDetail();
          }
        } catch (error) {
          console.log(error);
        }
      },
      setWebHookHandler(webhook_callback_url) {
        this.webhook_callback_url = webhook_callback_url;
        this.nextStep(3);
      },
      async getBoardList() {
        try {
          const response = await axios.get(
            `https://api.trello.com/1/boards/${this.trello_board_id}/lists?key=${this.trello_app_key}&token=${this.trello_token}`
          );
          if (response.data) {
            this.lists = response.data;
            this.nextStep(2);
          }
        } catch (error) {
          this.lists = [];
          this.snackbar.show = true;
          this.snackbar.error = true;
          this.snackbar.message = error.message;
        }
      },
      async getBoardDetail() {
        try {
          const response = await axios.get(
            `https://api.trello.com/1/boards/${this.trello_board_id}?key=${this.trello_app_key}&token=${this.trello_token}`
          );
          if (response.data) {
            this.board_detail = response.data;
            this.nextStep(2);
          }
        } catch (error) {
          this.snackbar.show = true;
          this.snackbar.error = true;
          this.snackbar.message = error.message;
        }
      },
      async createWebhook(list, webhook_description) {
        this.list = list;
        this.webhook_description = webhook_description;
        if (
          (this.trigger_scope == "list" && this.list) ||
          (this.trigger_scope == "board" && this.board_detail)
        ) {
          try {
            let payload = {
              description: this.webhook_description,
              callbackURL: this.webhook_callback_url,
              idModel:
                this.trigger_scope == "list" ? this.list.id : this.board_detail.id
            };
            const response = await axios.post(
              `https://api.trello.com/1/tokens/${this.trello_token}/webhooks/?key=${this.trello_app_key}`,
              payload
            );
            if (response.status == 200) {
              this.snackbar.show = true;
              this.snackbar.error = false;
              this.snackbar.message = "Success";
              this.webhook_detail = response.data;
              this.dialog = true;
            }
          } catch (error) {
            this.snackbar.error = true;
            this.snackbar.show = true;
            this.snackbar.message = error.message;
          }
        }
      },
      async deleteWebHook() {
        try {
          const response = await axios.delete(
            `https://api.trello.com/1/tokens/${this.trello_token}/webhooks/${this.webhook_detail.id}?key=${this.trello_app_key}`
          );
          if (response.status == 200) {
            this.snackbar.show = true;
            this.snackbar.error = false;
            this.snackbar.message = "Delete Success";
            this.dialog = false;
          }
        } catch (error) {
          this.snackbar.error = true;
          this.snackbar.show = true;
          this.snackbar.message = error.message;
        }
      }
    },
    computed: {
      trello_board_id() {
        let url = new URL(this.trello_board_url);
        let board_id = url.pathname.split("/")[2];
        return board_id;
      }
    }
  };
</script>