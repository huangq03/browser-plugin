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
            chrome.action.openPopup(() => {
                setTimeout(() => {
                    chrome.runtime.sendMessage({
                        action: 'showUrlDecode',
                        originalText: info.selectionText,
                        decodedText: decodedText
                    });
                }, 100);
            });
        } catch (e) {
            chrome.action.openPopup(() => {
                setTimeout(() => {
                    chrome.runtime.sendMessage({
                        action: 'showUrlDecode',
                        originalText: info.selectionText,
                        decodedText: 'Decode failed: ' + e.message
                    });
                }, 100);
            });
        }
    }
});