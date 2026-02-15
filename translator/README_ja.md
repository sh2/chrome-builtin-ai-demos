# Built-in AI Translator

Chrome の Translator API を使った DeepL 風の翻訳ツールです。すべての翻訳はデバイス上でローカルに処理されます。

## 機能

- 16 言語対応（英語、日本語、スペイン語、フランス語、ドイツ語、イタリア語、ポルトガル語、韓国語、中国語、ロシア語、アラビア語、ヒンディー語、ベトナム語、オランダ語、ポーランド語、トルコ語）
- Language Detector API によるソース言語の自動検出
- ストリーミング翻訳出力
- テキスト入力時の自動翻訳（800ms デバウンス）
- 言語スワップボタン
- クリップボードへのコピー

## 動作要件

- Google Chrome 138 以降

追加のセットアップは不要です。Translator API および Language Detector API は Chrome 138 以降の Stable 版で利用可能です。

## 使い方

`translator.html` を Chrome で開いてください。

初回利用時に翻訳モデルが自動でダウンロードされます。
