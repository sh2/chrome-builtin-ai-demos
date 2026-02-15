# Built-in AI Translator

A DeepL-like translation tool powered by Chrome's built-in Translator API. All translations are processed locally on your device.

## Features

- 16 languages supported (English, Japanese, Spanish, French, German, Italian, Portuguese, Korean, Chinese, Russian, Arabic, Hindi, Vietnamese, Dutch, Polish, Turkish)
- Automatic source language detection via Language Detector API
- Streaming translation output
- Auto-translate on input (800ms debounce)
- Language swap button
- Copy to clipboard

## Requirements

- Google Chrome 138 or later

No additional setup is required. The Translator API and Language Detector API are available in Chrome Stable since version 138.

## Usage

Open `translator.html` in Chrome.

Translation models are downloaded automatically on first use.
