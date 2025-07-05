document.addEventListener('DOMContentLoaded', () => {
    const originalTextArea = document.getElementById('originalText');
    const resultTextArea = document.getElementById('formattedText');
    const actionButton = document.getElementById('formatButton');

    // 处理后台消息
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'showJsonFormat') {
            originalTextArea.value = request.originalText;
            resultTextArea.value = request.formattedText;
        }
    });

    // 处理手动格式化
    actionButton.addEventListener('click', () => {
        const originalText = originalTextArea.value;
        try {
            const parsed = JSON.parse(originalText);
            const formattedText = JSON.stringify(parsed, null, 2);
            resultTextArea.value = formattedText;
        } catch (e) {
            resultTextArea.value = 'Format failed: ' + e.message;
        }
    });
});

import { localizeHtmlPage } from './utils/localization.js';

localizeHtmlPage();