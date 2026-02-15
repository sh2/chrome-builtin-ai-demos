# Built-in AI Chat

Chrome の Prompt API（Gemini Nano）を使った ChatGPT 風のチャットツールです。すべての会話はデバイス上でローカルに処理されます。

## 機能

- ストリーミング応答
- マルチターン会話
- New Chat でコンテキストをリセット

## 動作要件

- Google Chrome 145 以降

### Prompt API のセットアップ

Web ページ向けの Prompt API は現在[オリジントライアル](https://developer.chrome.com/origintrials/#/view_trial/2533837740349325313)中です。localhost で使用するには、以下の Chrome フラグを有効化し、Chrome を再起動してください:

- `chrome://flags/#optimization-guide-on-device-model` → Enabled
- `chrome://flags/#prompt-api-for-gemini-nano-multimodal-input` → Enabled

> **注意:** このフラグ設定は一時的なものです。Prompt API は近い将来 Chrome Stable で正式にリリースされる予定です。最新情報は [API ステータスページ](https://developer.chrome.com/docs/ai/built-in-apis)を確認してください。

## 使い方

`chat.html` を Chrome で開いてください。

初回利用時にモデルが自動でダウンロードされます。

## キーボードショートカット

| ショートカット | 操作 |
|----------------|------|
| Enter | メッセージ送信 |
| Shift + Enter | 改行 |
