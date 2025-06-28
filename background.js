chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'urlDecode',
        title: 'URL Decode',
        contexts: ['selection', 'page']
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'urlDecode') {
        chrome.action.openPopup(() => {
            if (info.selectionText) {
                try {
                    const decodedText = decodeURIComponent(info.selectionText);
                    setTimeout(() => {
                        chrome.runtime.sendMessage({
                            action: 'showUrlDecode',
                            originalText: info.selectionText,
                            decodedText: decodedText
                        });
                    }, 100);
                } catch (e) {
                    setTimeout(() => {
                        chrome.runtime.sendMessage({
                            action: 'showUrlDecode',
                            originalText: info.selectionText,
                            decodedText: 'Decode failed: ' + e.message
                        });
                    }, 100);
                }
            }
        });
    }
});