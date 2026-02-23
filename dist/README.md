# Chrome Built-in AI Demos

A collection of demo tools built with Chrome's Built-in AI APIs. Each tool is a self-contained single HTML file that runs entirely on your device.

## Chat

A ChatGPT-like chat tool powered by Chrome's built-in Prompt API (Gemini Nano). All conversations are processed locally on your device.

### Features

- Streaming responses
- Multi-turn conversations
- New chat to reset context

### Requirements

- Google Chrome 145 or later

#### Prompt API Setup

The Prompt API for the web is currently in [origin trial](https://developer.chrome.com/origintrials/#/view_trial/2533837740349325313). To use this tool on localhost, enable the following Chrome flags and restart Chrome:

- `chrome://flags/#optimization-guide-on-device-model` → Enabled
- `chrome://flags/#prompt-api-for-gemini-nano-multimodal-input` → Enabled

> **Note:** These flags are temporary. The Prompt API is expected to ship in Chrome Stable for web pages in the near future. Check the [API status page](https://developer.chrome.com/docs/ai/built-in-apis) for the latest information.

### Usage

Open `chat.html` in Chrome.

The model is downloaded automatically on first use.

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Enter | Send message |
| Shift + Enter | New line |

## Translator

A DeepL-like translation tool powered by Chrome's built-in Translator API. All translations are processed locally on your device.

### Features

- 16 languages supported (English, Japanese, Spanish, French, German, Italian, Portuguese, Korean, Chinese, Russian, Arabic, Hindi, Vietnamese, Dutch, Polish, Turkish)
- Automatic source language detection via Language Detector API
- Streaming translation output
- Auto-translate on input (800ms debounce)
- Maintains paragraph formatting
- Language swap button
- Copy to clipboard

### Requirements

- Google Chrome 138 or later

No additional setup is required. The Translator API and Language Detector API are available in Chrome Stable since version 138.

### Usage

Open `translator.html` in Chrome.

Translation models are downloaded automatically on first use.
