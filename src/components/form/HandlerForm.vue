<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <v-form @submit.prevent="handleSubmit(setWebHookHandler)">
        <v-row
          no-gutters
          align="center"
          justify="center"
        >
          <v-col cols="8">
            <v-card class="pa-2">
              <v-card-title class="body-2"><b>Create Google Cloud Function</b></v-card-title>
              <v-tabs v-model="file_tab">
                <v-row no-gutters>
                  <v-tab
                    key="1"
                    class="caption"
                  >
                    index.js
                  </v-tab>
                  <v-tab
                    key="2"
                    class="caption"
                  >
                    package.json
                  </v-tab>
                  <v-tab
                    key="3"
                    class="caption"
                  >
                    Function to execute
                  </v-tab>
                </v-row>
                <v-tabs-items v-model="file_tab">
                  <v-tab-item key="1">
                    <v-textarea
                      class="caption ml-2"
                      readonly
                      rows="4"
                      v-model="handler_index_js"
                      append-outer-icon="mdi-clipboard-text"
                      @click:append-outer="copyIndexJs"
                    ></v-textarea>
                  </v-tab-item>
                  <v-tab-item key="2">
                    <v-textarea
                      class="caption ml-2"
                      readonly
                      rows="4"
                      v-model="handler_package_json"
                      append-outer-icon="mdi-clipboard-text"
                      @click:append-outer="copyPackageJson"
                    ></v-textarea>
                  </v-tab-item>
                  <v-tab-item key="3">
                    <v-text-field
                      class="caption ml-2"
                      readonly
                      v-model="handler_function_name"
                      append-outer-icon="mdi-clipboard-text"
                      @click:append-outer="copyFunctionName"
                    ></v-text-field>
                  </v-tab-item>
                </v-tabs-items>
              </v-tabs>
            </v-card>
          </v-col>
        </v-row>
        <v-row
          align="center"
          justify="center"
        >
          <v-col cols="8">
            <ValidationProvider
              name="Google Cloud function trigger URL"
              rules="required|regex:((https:\/\/)(www\.)?)"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="webhook_callback_url"
                label="Google Cloud function trigger URL*"
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
    <HandlerGuide v-model="dialog" />
    <v-snackbar
      v-model="copied"
      :timeout="1500"
      :color="snackbar.error?'error':'success'"
      top
    >
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script>
  import HandlerGuide from "../dialog/HandlerGuide";
  export default {
    components: { HandlerGuide },
    props: ["line_token", "trello_secret_key"],
    methods: {
      setWebHookHandler() {
        this.$emit("setWebHookHandler", this.webhook_callback_url);
      },
      copyIndexJs() {
        this.$copyText(this.handler_index_js).then(
          e => {
            this.copied = true;
            this.snackbar.text = "Copied";
          },
          e => {
            this.snackbar.error = true;
            this.snackbar.text = "Can not copy";
          }
        );
      },
      copyPackageJson() {
        this.$copyText(this.handler_package_json).then(
          e => {
            this.copied = true;
            this.snackbar.text = "Copied";
          },
          e => {
            this.snackbar.error = true;
            this.snackbar.text = "Can not copy";
          }
        );
      },
      copyFunctionName() {
        this.$copyText(this.handler_function_name).then(
          e => {
            this.copied = true;
            this.snackbar.text = "Copied";
          },
          e => {
            this.snackbar.error = true;
            this.snackbar.text = "Can not copy";
          }
        );
      }
    },
    data() {
      return {
        file_tab: null,
        copied: false,
        dialog: false,
        snackbar: { timeout: 1500, error: false, text: "" },
        webhook_callback_url: "",
        handler_index_js:
          "const crypto = require('crypto');\rconst superagent = require('superagent');\r\rconst trello_callbackURL = `https://${process.env.FUNCTION_REGION}-${process.env.GCP_PROJECT}.cloudfunctions.net/${process.env.FUNCTION_NAME}`\rconst trello_secret_key = '" +
          this.trello_secret_key +
          "'\rconst line_token = '" +
          this.line_token +
          "'\rconst verifyTrelloWebhookRequest = (req) => {\r  let base64Digest = (s) => {\r    return crypto.createHmac('sha1', trello_secret_key).update(s).digest('base64');\r  }\r  let content = JSON.stringify(req.body) + trello_callbackURL;\r  let doubleHash = base64Digest(content);\r  let headerHash = req.headers['x-trello-webhook'];\r  return doubleHash == headerHash;\r}\r\rexports.sendMessage = (req, res) => {\r  if(req.body && verifyTrelloWebhookRequest(req)){\r    let action = req.body.action\r    if(action.type=='createCard'){\r     let message = `\\r\\n>New task is added!< \\r\\nBoard: ${action.data.board.name} \\r\\nList: ${action.data.list.name}\\r\\nTask: ${action.data.card.name} \\r\\nURL: https://trello.com/c/${action.data.card.shortLink}`\r     superagent\r     .post('https://notify-api.line.me/api/notify')\r     .set('Content-Type','application/x-www-form-urlencoded')\r     .set('Authorization','Bearer ' + line_token)\r     .send({ message : message }).then(res => {console.log(res.body)})\r     }\r   }\r res.status(200).send()\r};",
        handler_package_json:
          '{\r	"name": "sample-http",\r	"version": "0.0.1",\r	"dependencies": {\r		"crypto": "^1.0.1",\r		"superagent": "^5.0.2"\r    }\r}',
        handler_function_name: "sendMessage"
      };
    }
  };
</script>

<style></style>
