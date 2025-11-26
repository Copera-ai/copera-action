# Copera GitHub Action

A GitHub Action for sending messages to Copera.ai channels using the official Copera API.

![Copera](https://img.shields.io/badge/Copera-Integration-blue?style=for-the-badge)

## 🚀 Features

- Send custom messages to Copera.ai channels
- Seamless integration with your GitHub workflow
- Support for custom sender names
- Built on the official Copera Public API

## 📋 Usage

> **Note on Versioning**: You can use `@v2.0.0` for a specific version, or `@v2` to automatically get the latest v2.x updates. We recommend using `@v2.0.0` for production stability.

### Basic Example

```yaml
name: Copera Notification
on: [push]

jobs:
  notification:
    runs-on: ubuntu-latest
    steps:
      - name: Send Copera Message
        uses: copera-ai/copera-action@v2.0.0
        with:
          api_token: ${{ secrets.COPERA_API_TOKEN }}
          channel_id: ${{ secrets.COPERA_CHANNEL_ID }}
          message: "New ${{ github.event_name }} event in ${{ github.repository }}!"
```

## ⚙️ Input Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `api_token` | Copera API Token (Bearer token) | Yes | - |
| `channel_id` | Copera Channel ID (24-character ObjectId) | Yes | - |
| `message` | Message content to send (1-10,000 characters) | Yes | - |
| `sender_name` | Optional sender name to display | No | - |
| `debug` | Enable debug mode for detailed logging | No | `false` |

## 🔧 Examples

### Basic Message

```yaml
- name: Send Copera Notification
  uses: copera-ai/copera-action@v2.0.0
  with:
    api_token: ${{ secrets.COPERA_API_TOKEN }}
    channel_id: ${{ secrets.COPERA_CHANNEL_ID }}
    message: "🎉 New deployment to production!"
```

### With Custom Sender Name

```yaml
- name: Send Copera Notification
  uses: copera-ai/copera-action@v2.0.0
  with:
    api_token: ${{ secrets.COPERA_API_TOKEN }}
    channel_id: ${{ secrets.COPERA_CHANNEL_ID }}
    message: "Build completed successfully!"
    sender_name: "GitHub Actions Bot"
```

### With Debug Mode

```yaml
- name: Send Copera Notification
  uses: copera-ai/copera-action@v2.0.0
  with:
    api_token: ${{ secrets.COPERA_API_TOKEN }}
    channel_id: ${{ secrets.COPERA_CHANNEL_ID }}
    message: "Deployment started"
    debug: "true"
```

### On Pull Request

```yaml
name: PR Notification
on:
  pull_request:
    types: [opened, closed]

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Notify Copera
        uses: copera-ai/copera-action@v2.0.0
        with:
          api_token: ${{ secrets.COPERA_API_TOKEN }}
          channel_id: ${{ secrets.COPERA_CHANNEL_ID }}
          message: "PR #${{ github.event.pull_request.number }}: ${{ github.event.pull_request.title }}"
          sender_name: "PR Bot"
```

## 🔒 Setup

### Step 1: Create an Integration and Get API Token

1. Log in to your [Copera.ai](https://copera.ai) account
2. Open **Workspace Settings**
3. Navigate to **Integrations**
4. Click **Create new API key**
5. Give your integration a name
6. Assign a bot name (this becomes the integration's identity in channels)
7. Choose the required permissions (at minimum, enable **chat** permissions)
8. **⚠️ Copy the API key immediately** — it appears only once and cannot be retrieved later

📚 For a detailed walkthrough, see the [Integration Creation guide](https://developers.copera.ai).

### Step 2: Enable Developer Mode

Developer Mode allows you to copy Channel IDs easily:

1. Go to **Workspace Settings → Account → Advanced → Developer Mode**
2. Toggle **Developer Mode** to enable it

### Step 3: Get your Channel ID

1. Navigate to the channel where you want to send messages
2. **Right-click** on the channel name
3. Select **Copy Channel ID** from the context menu (similar to Discord)
4. The Channel ID is a 24-character hexadecimal string (ObjectId format)

Example: `507f1f77bcf86cd799439011`

### 3. Add Secrets to GitHub

- Go to your repository **Settings → Secrets and variables → Actions**
- Click **"New repository secret"**
- Add `COPERA_API_TOKEN` with your API token
- Add `COPERA_CHANNEL_ID` with your channel ID

## 🔗 API Reference

This action uses the [Copera Public API](https://developers.copera.ai/). Specifically, it calls the `/public/v1/chat/channel/{channelId}/send-message` endpoint.

For more information about the API, visit the [official documentation](https://developers.copera.ai/).

## 🔧 Troubleshooting

### Common Issues

**❌ Error: 401 Unauthorized**
- Check that your `COPERA_API_TOKEN` is correct
- Ensure the API key hasn't been revoked
- Verify the token is properly set in GitHub Secrets

**❌ Error: 403 Forbidden**
- Make sure your integration has the required permissions (chat)
- Verify the integration has been added to the channel

**❌ Error: 404 Not Found**
- Double-check your `COPERA_CHANNEL_ID` is correct
- Ensure Developer Mode is enabled to copy the correct Channel ID
- Verify the channel exists and hasn't been deleted

**❌ Message not appearing in channel**
- Confirm the integration has been added to the target channel
- Check that the channel ID matches the intended channel
- Enable `debug: "true"` to see detailed logs

### Enable Debug Mode

To get more detailed information about requests and responses:

```yaml
- uses: copera-ai/copera-action@v2.0.0
  with:
    api_token: ${{ secrets.COPERA_API_TOKEN }}
    channel_id: ${{ secrets.COPERA_CHANNEL_ID }}
    message: "Test message"
    debug: "true"  # Enable detailed logging
```

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Support

- 📧 Email: support@copera.ai
- 🐛 Issues: [GitHub Issues](https://github.com/Copera-ai/copera-action/issues)
- 📖 Documentation: [developers.copera.ai](https://developers.copera.ai)

## Links

- [Copera.ai Website](https://copera.ai)
- [API Documentation](https://developers.copera.ai)

---

Made with ❤️ by the Copera.ai team