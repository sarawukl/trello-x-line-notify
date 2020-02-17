
# Trello LINE Notify
I'm looking approach to notify all events from Trello to LINE (an instant messaging app that my team use), Then I've found the way to achieve that.

Trello provides webhooks for notifying all changes in the Trello model to the third-party application. LINE has notify-bot that receive all trigger from web-service and will send to chat room. This project will be a guideline to create all resources and generate source code that combines two platforms and achieve this goal.

## How to create Trello webhook (You can skip manual step 3 and 4)
### 1. Prepare Trello key

1.1 Trello_App_Key
	
1.2 Trello_Token_key

1.3 Trello_Secret_Key

![screenshot](https://raw.githubusercontent.com/sarawukl/trello-x-line-notify/master/src/assets/trello-key-1.png)
![screenshot](https://raw.githubusercontent.com/sarawukl/trello-x-line-notify/master/src/assets/trello-key-2.png)

### 2. Prepare LINE token
2.1. Create Line Notify Service at https://notify-bot.line.me/ (If Notify service not exists)

2.2. Go to https://notify-bot.line.me/my/

2.3. Go to Generate Token > Select Chat room or Chat Group and Generate

### 3. Create callback service for receive Trello webhook
3.1 Callback service should have HTTP GET handler

### 4. Create Trello webhook

4.1 Select your Trello board URL (example: https://trello.com/b/BOARD_ID/my-project)

4.2 GET model id with board ID (replace BOARD_ID, Trello_App_key, Trello_Token_key), then you will get id in response data

```curl https://api.trello.com/1/boards/BOARD_ID?key=Trello_App_Key&token=Trello_Token_key```

4.3 POST data to create Trello webhook (idModel is id from step 4.2, callbackURL is callback service from step 3)

```curl -X "POST" https://api.trello.com/1/webhooks/?idModel=54a17d76d4a5072e3931736b&description="My Webhook"&callbackURL=https://mycallbackurl.com```

## How To create Trello webhook with Trello-x-Line-notify
### 1. Go to https://sarawukl.github.io/trello-x-line-notify
### 2. Fill your LINE token
### 3. Fill your Trello Info.
3.1 Board scope = Notify event in Trello board

3.2 List scope = Notify event in specific List in Trello Board
### 4. Trello-x-Line-notify will generate your handler function (now only support google cloud function)

| Trello Action | Handler function supported |
| ------------ | ------------ |
| createCard | :heavy_check_mark: |
| moveCard | :x: |

### 5. Create your Trello webhook

## Disclaimer
### This project doesn't keep your secret key/private data. You can clone this project to explore source code and run on your local environment

### Step to run
``` git clone https://github.com/sarawukl/trello-x-line-notify.git```

``` npm run serve ```

### References 
#### Project stack
##### 1. VueJS
##### 2. Axios
##### 3. Vuetify
##### 4. Vee-validate
##### [Trello API Developer Reference](https://developers.trello.com/)
##### [Trello Webhook Reference](https://developers.trello.com/page/webhooks)
##### [Line Bot Notify](https://notify-bot.line.me/)
