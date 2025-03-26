# Copera GitHub Action

A GitHub Action for sending notifications to Copera.ai.

![Copera](https://img.shields.io/badge/Copera-Integration-blue?style=for-the-badge)

## 🚀 Features

- Send custom notifications to Copera.ai
- Seamless integration with your GitHub workflow

## 📋 Usage

### Basic Example

```yaml
name: Copera Notification
on: [push]

jobs:
  notification:
    runs-on: ubuntu-latest
    steps:
      - name: Send Copera Message
        uses: copera-ai/copera-action@v1
        with:
          webhook_id: ${{ secrets.COPERA_WEBHOOK_ID }}
          webhook_token: ${{ secrets.COPERA_WEBHOOK_TOKEN }}
          message: "New ${{ github.event_name }} event in ${{ github.repository }}!"
```

## ⚙️ Input Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `webhook_id` | Copera Integration Webhook ID | Yes |
| `webhook_token` | Copera Integration Webhook Token | Yes |
| `message` | Message content to send | Yes |
| `debug` | Debug mode | No |

## 🔧 Examples

### With Project ID and Environment

```yaml
- name: Send Copera Notification
  uses: copera-ai/copera-action@v1
  with:
    webhook_id: ${{ secrets.COPERA_WEBHOOK_ID }}
    webhook_token: ${{ secrets.COPERA_WEBHOOK_TOKEN }}
    message: "🎉 New deployment to production!"
```

## 🔒 Setup

1. Get your Copera API key:
   - Log in to your Copera.ai account
   - Create a new chat channel
   - Open Chat Channel Settings
   - Navigate to the Integration Tab in Settings
   - Create a new integration

2. Add the API key to your repository secrets:
   - Go to your repository Settings > Secrets and variables > Actions
   - Create a new secret named `COPERA_WEBHOOK_ID`
   - Paste your WEBHOOK ID key as the value
   - Create a new secret named `COPERA_WEBHOOK_TOKEN`
   - Paste your WEBHOOK TOKEN ID key as the value

## 📝 License

MIT License
