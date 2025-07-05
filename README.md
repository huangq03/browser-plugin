# URL Decoder, JSON Formatter && Unicode Decoder Chrome Extension

## Overview
This Chrome extension is a utility tool that provides URL decoding, JSON formatting, and Unicode decoding capabilities directly within your browser. It allows you to quickly decode URL - encoded text, format JSON strings, and decode Unicode strings without leaving your current web page.

## How It Works
### Context Menu
1. After installing the extension, right - click on a page or selected text. You'll see a "Utility Tools" menu, which contains three sub - options: "URL Decoder", "JSON Formatter", and "Unicode Decoder".
2. **URL Decoder**: If you select a URL - encoded text and click "URL Decoder", the extension will decode the text and display the original content in a popup. If no text is selected, it will open an empty decoding popup where you can manually input text to decode.
3. **JSON Formatter**: When you select a JSON string and click "JSON Formatter", the extension will parse and format the JSON, showing the formatted result in a popup. If no text is selected, it will open an empty formatting popup for manual input.
4. **Unicode Decoder**: If you select a string containing Unicode escape sequences (e.g., `\uXXXX`) and click "Unicode Decoder", the extension will decode the text and display the original content in a popup. If no text is selected, it will open an empty decoding popup where you can manually input text to decode.

### Manual Operation
1. **URL Decoder Popup**: Enter URL - encoded text in the "Original Text" field and click the "URL Decode" button. The decoded result will appear in the "Decoded Text" field.
2. **JSON Formatter Popup**: Input a JSON string in the "Original Text" field and click the "JSON Format" button. The formatted JSON will be displayed in the "Formatted Text" field.
3. **Unicode Decoder Popup**: Enter a string containing Unicode escape sequences in the "Original Text" field and click the "Unicode Decode" button. The decoded result will appear in the "Decoded Text" field.

## Features
- **Context - based Operation**: Work with both selected text and manual input.
- **Error Handling**: Show error messages if decoding or formatting fails.
- **Internationalization**: Support for multiple languages (English and Chinese currently).
- **Multiple Utilities**: Provide URL decoding, JSON formatting, and Unicode decoding features.

## Installation
1. Download the extension files.
2. Open Chrome and go to `chrome://extensions`.
3. Enable "Developer mode" in the top - right corner.
4. Click "Load unpacked" and select the directory containing the extension files.