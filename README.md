# Chrome Built-in AI Demos

A collection of demo tools built with Chrome's Built-in AI APIs. Each tool is a self-contained single HTML file.

## Demos

| Tool | File | APIs Used | Chrome Version |
|------|------|-----------|----------------|
| Chat | [chat.html](dist/chat.html) | [Prompt API](https://developer.chrome.com/docs/ai/prompt-api) | Origin Trial |
| Translator | [translator.html](dist/translator.html) | [Translator API](https://developer.chrome.com/docs/ai/translator-api), [Language Detector API](https://developer.chrome.com/docs/ai/language-detection) | 138+ (Stable) |

### Chat

A ChatGPT-like chat tool powered by the Prompt API (Gemini Nano). Supports streaming responses and multi-turn conversations.

The Prompt API for web pages is currently in [origin trial](https://developer.chrome.com/origintrials/#/view_trial/2533837740349325313). To use on localhost, enable the following Chrome flags:

- `chrome://flags/#optimization-guide-on-device-model` → Enabled
- `chrome://flags/#prompt-api-for-gemini-nano-multimodal-input` → Enabled

### Translator

A DeepL-like translation tool powered by the Translator API. Supports 16 languages with automatic language detection via the Language Detector API.

No additional setup is required. Available in Chrome Stable since version 138.

## API Status

See the [Built-in AI APIs](https://developer.chrome.com/docs/ai/built-in-apis) page for the latest status.

## Usage

Open the HTML files directly in Chrome, or serve them with a local server:

```sh
python3 -m http.server 8080
```

## License

[MIT License](LICENSE)