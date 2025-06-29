function formatJson(jsonText) {
    try {
        const parsed = JSON.parse(jsonText);
        return JSON.stringify(parsed, null, 2);
    } catch (e) {
        return 'Format failed: ' + e.message;
    }
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'utilityTools',
        title: '实用工具',
        contexts: ['selection', 'page'],
        type: 'normal'
    });

    chrome.contextMenus.create({
        id: 'urlDecoder',
        title: 'URL Decoder',
        parentId: 'utilityTools',
        contexts: ['selection', 'page']
    });

    chrome.contextMenus.create({
        id: 'jsonFormatter',
        title: 'Json Formatter',
        parentId: 'utilityTools',
        contexts: ['selection', 'page']
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'urlDecoder') {
        if (info.selectionText) {
            try {
                const decodedText = decodeURIComponent(info.selectionText);
                chrome.action.setPopup({ popup: 'url_decode_popup.html' }, () => {
                    chrome.action.openPopup(() => {
                        chrome.runtime.sendMessage({
                            action: 'showUrlDecode',
                            originalText: info.selectionText,
                            decodedText: decodedText
                        });
                    });
                });
            } catch (e) {
                chrome.action.setPopup({ popup: 'url_decode_popup.html' }, () => {
                    chrome.action.openPopup(() => {
                        chrome.runtime.sendMessage({
                            action: 'showUrlDecode',
                            originalText: info.selectionText,
                            decodedText: 'Decode failed: ' + e.message
                        });
                    });
                });
            }
        }
    } else if (info.menuItemId === 'jsonFormatter') {
        if (info.selectionText) {
            const formattedText = formatJson(info.selectionText);
            chrome.action.setPopup({ popup: 'json_format_popup.html' }, () => {
                chrome.action.openPopup(() => {
                    chrome.runtime.sendMessage({
                        action: 'showJsonFormat',
                        originalText: info.selectionText,
                        formattedText: formattedText
                    });
                });
            });
        }
    }
});