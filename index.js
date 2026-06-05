const core = require('@actions/core');
const { HttpClient } = require('@actions/http-client');

async function run() {
  let http;
  try {
    const apiToken = core.getInput('api_token');
    const channelId = core.getInput('channel_id');
    const message = core.getInput('message');
    const senderName = core.getInput('sender_name');
    const debug = core.getInput('debug') === 'true';

    const debugLog = (msg) => {
      if (debug) {
        core.info(`[${new Date().toISOString()}] ${msg}`);
      }
    };

    if (!apiToken) {
      throw new Error('api_token is required');
    }

    if (!channelId) {
      throw new Error('channel_id is required');
    }

    if (!message) {
      throw new Error('message is required');
    }

    http = new HttpClient('copera-github-action');

    const apiUrl = `https://api.copera.ai/public/v1/chat/channel/${channelId}/send-message`;

    const payload = {
      message: message
    };

    if (senderName) {
      payload.name = senderName;
    }

    debugLog(`Sending message to channel: ${channelId}`);
    debugLog(`API URL: ${apiUrl}`);
    debugLog(`Payload: ${JSON.stringify(payload)}`);
    debugLog('HTTP request started');

    const requestStart = Date.now();

    const response = await http.post(
      apiUrl,
      JSON.stringify(payload),
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`
      }
    );

    const elapsedMs = Date.now() - requestStart;
    const statusCode = response.message.statusCode;

    // Always drain the response body, even on 204. The Copera API holds the
    // connection open with keep-alive; if the body stream is never consumed the
    // socket stays open and keeps the Node event loop alive until the server's
    // keep-alive timeout (~3 min), hanging the GitHub Actions step.
    const responseData = await response.readBody();

    debugLog(`HTTP request finished in ${elapsedMs}ms`);
    debugLog(`Status Code: ${statusCode}`);
    debugLog(`Response: ${responseData}`);

    if (statusCode >= 200 && statusCode < 300) {
      core.info('✅ Message sent successfully to Copera channel!');
    } else {
      throw new Error(`Failed to send message. Status: ${statusCode}, Response: ${responseData}`);
    }
  } catch (error) {
    if (core.getInput('debug') === 'true') {
      core.error(error);
    }
    core.setFailed(`Action failed: ${error.message}`);
  } finally {
    // Belt-and-suspenders: close the agent/sockets so the process exits promptly.
    if (http) {
      http.dispose();
    }
  }
}

run();