require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/rs-responder-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/rs-responder-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/rs-responder-ping - Check bot latency
/rs-responder-help - Displays this help message
/rs-responder-echo - Responds with the message you input`
  });
});
app.command("/rs-responder-echo", async ({ command, ack, respond, client }) => {
    var input = command.text;
    input = String(input)
    await ack();
    await respond({ text: input});
    });



(async () => {
  await app.start();
  console.log("bot is running!");
})();
