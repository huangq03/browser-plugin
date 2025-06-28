chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'urlDecode',
        title: 'URL Decode',
        contexts: ['selection']
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'urlDecode' && info.selectionText) {
        try {
            const decodedText = decodeURIComponent(info.selectionText);
            const dataUrl = `data:text/html;charset=utf-8,<!DOCTYPE html><html><head><title>URL Decode Result</title><style>body { width: 400px; padding: 20px; font-family: Arial, sans-serif; } textarea { width: 100%; margin-bottom: 10px; resize: vertical; } label { display: block; margin-bottom: 5px; font-weight: bold; }</style></head><body><label for="originalText">Original Text:</label><textarea id="originalText" readonly>${encodeURIComponent(info.selectionText)}</textarea><label for="decodedText">Decoded Text:</label><textarea id="decodedText" readonly>${encodeURIComponent(decodedText)}</textarea></body></html>`;
            chrome.tabs.create({ url: dataUrl });
        } catch (e) {
            const errorUrl = `data:text/html;charset=utf-8,<!DOCTYPE html><html><head><title>Decode Error</title></head><body><p>Decode failed: ${encodeURIComponent(e.message)}</p></body></html>`;
            chrome.tabs.create({ url: errorUrl });
        }
    }
});