const core = require('@actions/core');
const { HttpClient } = require('@actions/http-client');

async function run() {
  try {
    const webhookId = core.getInput('webhook_id');
    const webhookToken = core.getInput('webhook_token');
    const message = core.getInput('message');
    const debug = core.getInput('debug') === 'true';

    const http = new HttpClient('copera-integration-action');

    const webhookUrl = `https://webhooks.copera.ai/api/integration/${webhookId}/${webhookToken}`;

    const payload = JSON.stringify({ message });

    const response = await http.post(
      webhookUrl,
      payload,
      {
        'Content-Type': 'application/json'
      }
    );

    const responseData = await response.readBody();

    if (debug) {
      core.info('Status Code:', response.message.statusCode);
      core.info('Response:', responseData);
    }
  } catch (error) {
    if (debug) {
      core.error(error);
    }
    core.setFailed(error.message);
  }
}

run();