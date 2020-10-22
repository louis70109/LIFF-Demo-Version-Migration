# Version Migration demo with LIFF

This is a sample for demo how to version migration with LIFF.

## LINE account

- Got A LINE Bot API developer account
  Make sure you already registered, if you need use LINE Bot & LIFF.

- Go to LINE Developer Console
  - Create a "Messaging API" channel
  - Close auto-reply setting on "Messaging API" Tab.
  - Setup your basic account information. Here is some info you will need to know.
    - Callback URL: `https://{HEROKU_URL}/v1/webhooks/line`
    - Verify your webhook.
  - Create a "LINE Login" Channel.
  - Create a LIFF page on "LIFF" tab.
    - Endpoint URL: `https://localhost:8000` if testing.
- You will get following info, need fill back to `.env` file.
  - LIFF ID
  - "Messaging API" Channel Access Token (You need to issue one here)

## Steps

```
cp .env.example .env
```

- Deploy [lotify-swagger-sample](https://github.com/louis70109/lotify-swagger-example) to heroku.
- Register LINE Notify `access_token` by [lotify-swagger-sample](https://github.com/louis70109/lotify-swagger-example) server(maybe Heroku).
- Copy `access_token` to `.env`'s `LINE_NOTIFY_TOKEN` column.
- Copy **Messaging API** Channel Access Token to `.env`'s `BOT_ACCESS_TOKEN` column.
- Copy **LIFF ID** to `.env`'s `MY_LIFF_ID` column.

```
npm install
npm run dev
```

Visit `https://localhost:8000`

## Deploy

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](LIFF-Demo-Version-Migration)
