# Chrome Built-in AI Demos

Chrome の Built-in AI API を使ったデモツール集です。各ツールは自己完結型のシングル HTML ファイルで、すべてデバイス上でローカルに動作します。

## Chat

Chrome の Prompt API（Gemini Nano）を使った ChatGPT 風のチャットツールです。すべての会話はデバイス上でローカルに処理されます。

### 機能

- ストリーミング応答
- マルチターン会話
- New Chat でコンテキストをリセット

### 動作要件

- Google Chrome 145 以降

#### Prompt API のセットアップ

Web ページ向けの Prompt API は現在[オリジントライアル](https://developer.chrome.com/origintrials/#/view_trial/2533837740349325313)中です。localhost で使用するには、以下の Chrome フラグを有効化し、Chrome を再起動してください:

- `chrome://flags/#optimization-guide-on-device-model` → Enabled
- `chrome://flags/#prompt-api-for-gemini-nano-multimodal-input` → Enabled

> **注意:** このフラグ設定は一時的なものです。Prompt API は近い将来 Chrome Stable で正式にリリースされる予定です。最新情報は [API ステータスページ](https://developer.chrome.com/docs/ai/built-in-apis)を確認してください。

### 使い方

`chat.html` を Chrome で開いてください。

初回利用時にモデルが自動でダウンロードされます。

### キーボードショートカット

| ショートカット | 操作 |
|----------------|------|
| Enter | メッセージ送信 |
| Shift + Enter | 改行 |

## Translator

Chrome の Translator API を使った DeepL 風の翻訳ツールです。すべての翻訳はデバイス上でローカルに処理されます。

### 機能

- 16 言語対応（英語、日本語、スペイン語、フランス語、ドイツ語、イタリア語、ポルトガル語、韓国語、中国語、ロシア語、アラビア語、ヒンディー語、ベトナム語、オランダ語、ポーランド語、トルコ語）
- Language Detector API によるソース言語の自動検出
- ストリーミング翻訳出力
- テキスト入力時の自動翻訳（800ms デバウンス）
- 言語スワップボタン
- クリップボードへのコピー

### 動作要件

- Google Chrome 138 以降

追加のセットアップは不要です。Translator API および Language Detector API は Chrome 138 以降の Stable 版で利用可能です。

### 使い方

`translator.html` を Chrome で開いてください。

初回利用時に翻訳モデルが自動でダウンロードされます。
