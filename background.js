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
    title: chrome.i18n.getMessage('utilityTools'),
    contexts: ['selection', 'page'],
    type: 'normal'
});

chrome.contextMenus.create({
    id: 'urlDecoder',
    title: chrome.i18n.getMessage('urlDecoder'),
    parentId: 'utilityTools',
    contexts: ['selection', 'page']
});

chrome.contextMenus.create({
    id: 'jsonFormatter',
    title: chrome.i18n.getMessage('jsonFormatter'),
    parentId: 'utilityTools',
    contexts: ['selection', 'page']
});
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case 'urlDecoder':
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
            else {
                chrome.action.setPopup({ popup: 'url_decode_popup.html' }, () => {
                        chrome.action.openPopup(() => {
                            chrome.runtime.sendMessage({
                                action: 'showUrlDecode',
                                originalText: '',
                                decodedText: ''
                            });
                        });
                    });
            }
            break;
        case 'jsonFormatter':
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
            } else {
                chrome.action.setPopup({ popup: 'json_format_popup.html' }, () => {
                    chrome.action.openPopup(() => {
                        chrome.runtime.sendMessage({
                            action: 'showJsonFormat',
                            originalText: '',
                            formattedText: ''
                        });
                    });
                });
            }
            break;
    }
});