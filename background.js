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
        chrome.action.openPopup(() => {
            if (info.selectionText) {
                try {
                    const decodedText = decodeURIComponent(info.selectionText);
                    setTimeout(() => {
                        chrome.runtime.sendMessage({
                            action: 'showUrlDecode',
                            originalText: info.selectionText,
                            decodedText: decodedText,
                            formatType: 'url'
                        });
                    }, 100);
                } catch (e) {
                    setTimeout(() => {
                        chrome.runtime.sendMessage({
                            action: 'showUrlDecode',
                            originalText: info.selectionText,
                            decodedText: 'Decode failed: ' + e.message,
                            formatType: 'url'
                        });
                    }, 100);
                }
            }
        });
    } else if (info.menuItemId === 'jsonFormatter') {
        chrome.action.openPopup(() => {
            if (info.selectionText) {
                const formattedText = formatJson(info.selectionText);
                setTimeout(() => {
                    chrome.runtime.sendMessage({
                        action: 'showJsonFormat',
                        originalText: info.selectionText,
                        formattedText: formattedText,
                        formatType: 'json'
                    });
                }, 100);
            }
        });
    }
});