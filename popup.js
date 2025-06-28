document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'showUrlDecode') {
            const originalTextArea = document.getElementById('originalText');
            const decodedTextArea = document.getElementById('decodedText');

            originalTextArea.value = request.originalText;
            decodedTextArea.value = request.decodedText;
        }
    });
});