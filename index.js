const core = require('@actions/core');
const { HttpClient } = require('@actions/http-client');

async function run() {
  try {
    const apiToken = core.getInput('api_token');
    const channelId = core.getInput('channel_id');
    const message = core.getInput('message');
    const senderName = core.getInput('sender_name');
    const debug = core.getInput('debug') === 'true';

    if (!apiToken) {
      throw new Error('api_token is required');
    }

    if (!channelId) {
      throw new Error('channel_id is required');
    }

    if (!message) {
      throw new Error('message is required');
    }

    const http = new HttpClient('copera-github-action');

    const apiUrl = `https://api.copera.ai/public/v1/chat/channel/${channelId}/send-message`;

    const payload = {
      message: message
    };

    if (senderName) {
      payload.name = senderName;
    }

    if (debug) {
      core.info(`Sending message to channel: ${channelId}`);
      core.info(`API URL: ${apiUrl}`);
      core.info(`Payload: ${JSON.stringify(payload)}`);
    }

    const response = await http.post(
      apiUrl,
      JSON.stringify(payload),
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`
      }
    );

    const statusCode = response.message.statusCode;

    if (debug) {
      core.info(`Status Code: ${statusCode}`);
    }

    if (statusCode === 204) {
      core.info('✅ Message sent successfully to Copera channel!');
    } else if (statusCode >= 200 && statusCode < 300) {
      const responseData = await response.readBody();
      if (debug) {
        core.info(`Response: ${responseData}`);
      }
      core.info('✅ Message sent successfully to Copera channel!');
    } else {
      const responseData = await response.readBody();
      throw new Error(`Failed to send message. Status: ${statusCode}, Response: ${responseData}`);
    }
  } catch (error) {
    if (core.getInput('debug') === 'true') {
      core.error(error);
    }
    core.setFailed(`Action failed: ${error.message}`);
  }
}

run();