document.addEventListener('DOMContentLoaded', () => {
    const originalTextArea = document.getElementById('originalText');
    const resultTextArea = document.getElementById('decodedText');
    const actionButton = document.getElementById('decodeButton');

    // 处理后台消息
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'showUrlDecode') {
            originalTextArea.value = request.originalText;
            resultTextArea.value = request.decodedText;
        }
    });

    // 处理手动解码
    actionButton.addEventListener('click', () => {
        const originalText = originalTextArea.value;
        try {
            const decodedText = decodeURIComponent(originalText);
            resultTextArea.value = decodedText;
        } catch (e) {
            resultTextArea.value = 'Decode failed: ' + e.message;
        }
    });
});