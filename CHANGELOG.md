# Changelog

All notable changes to this project will be documented in this file.

## [3.0.0] - 2026-05-18

### 🚀 Major Changes

- **BREAKING**: Updated Node.js runtime from `node20` to `node24`
  - GitHub Actions runner now supports Node.js 24 as the execution environment
  - No code changes required — all APIs remain compatible

### 🔄 Migration Guide

If you're upgrading from v2.x:

Update your workflow file to reference `@v3`:

```yaml
- uses: copera-ai/copera-action@v3
  with:
    api_token: ${{ secrets.COPERA_API_TOKEN }}
    channel_id: ${{ secrets.COPERA_CHANNEL_ID }}
    message: "Hello!"
```

No input changes — all parameters remain the same as v2.

## [2.0.0] - 2025-11-26

### 🚀 Major Changes

- **BREAKING**: Migrated from webhook-based integration to official Copera Public API
- **BREAKING**: Changed input parameters:
  - `webhook_id` → `api_token` (now uses Bearer authentication)
  - `webhook_token` → removed (authentication now via API token)
  - Added `channel_id` (24-character ObjectId)
  - Added `sender_name` (optional custom sender name)

### ✨ New Features

- Support for custom sender names via `sender_name` input
- Better error handling and validation
- Enhanced debug mode with detailed logging
- API returns 204 No Content on success

### 🔧 Technical Changes

- Updated API endpoint to `https://api.copera.ai/public/v1/chat/channel/{channelId}/send-message`
- Now uses Bearer token authentication
- Improved error messages and status code handling
- Updated dependencies:
  - `@actions/core`: ^1.11.1
  - `@actions/http-client`: ^2.2.3

### 📚 Documentation

- Completely rewritten README with new API usage
- Added example workflow file
- Added .gitignore for better project structure
- Added CHANGELOG for version tracking

### 🔄 Migration Guide

If you're upgrading from v1.x:

1. Get your Copera API Token from Workspace Settings → Integrations
2. Enable Developer Mode and get your Channel ID by right-clicking the channel name
3. Update your workflow file:

**Before (v1.x):**
```yaml
- uses: copera-ai/copera-action@v1
  with:
    webhook_id: ${{ secrets.COPERA_WEBHOOK_ID }}
    webhook_token: ${{ secrets.COPERA_WEBHOOK_TOKEN }}
    message: "Hello!"
```

**After (v2.0):**
```yaml
- uses: copera-ai/copera-action@v2.0.0
  with:
    api_token: ${{ secrets.COPERA_API_TOKEN }}
    channel_id: ${{ secrets.COPERA_CHANNEL_ID }}
    message: "Hello!"
```

## [1.0.0] - 2025-03-26

### Features

- Initial release with webhook-based integration
- Basic message sending functionality
- Debug mode support

