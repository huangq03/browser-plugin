document.addEventListener('DOMContentLoaded', () => {
    const originalTextArea = document.getElementById('originalText');
    const resultTextArea = document.getElementById('decodedText');
    const actionButton = document.getElementById('decodeButton');

    // Handle background messages
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'showUnicodeDecode') {
            originalTextArea.value = request.originalText;
            resultTextArea.value = request.decodedText;
        }
    });

    // Handle manual decode
    actionButton.addEventListener('click', () => {
        const originalText = originalTextArea.value;
        try {
            const decodedText = originalText.replace(/\\u([\d\w]{4})/gi, (match, grp) => {
                return String.fromCharCode(parseInt(grp, 16));
            });
            resultTextArea.value = decodedText;
        } catch (e) {
            resultTextArea.value = 'Decode failed: ' + e.message;
        }
    });
});

import { localizeHtmlPage } from './utils/localization.js';

localizeHtmlPage();