import core from '@actions/core'
import https from 'node:https'

async function run() {
  try {
    const webhookId = core.getInput('webhook_id');
    const webhookToken = core.getInput('webhook_token');
    const message = core.getInput('message');
    const debug = core.getInput('debug');

    const urlParts = new URL(`https://webhooks.copera.ai/api/integration/${webhookId}/${webhookToken}`);
    const data = JSON.stringify({ message });

    const response = await new Promise((resolve, reject) => {
      const options = {
        hostname: urlParts.hostname,
        path: urlParts.pathname + urlParts.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'GitHubActions/1.0',
          'Content-Length': data.length,
        },
      };

      const req = https.request(options, (res) => {
        let responseData = '';
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(responseData);
          } else {
            reject(new Error(`HTTP status code ${res.statusCode}: ${responseData}`));
          }
        });
      });

      req.on('error', reject);
      req.write(data);
      req.end();
    });

    if (debug) {
      core.info(`Response: ${response}`);
    }
  } catch (error) {
    if (debug) {
      core.error(error);
    }
    core.setFailed(error.message);
  }
}

run();