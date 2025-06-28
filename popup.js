document.addEventListener('DOMContentLoaded', () => {
    const originalTextArea = document.getElementById('originalText');
    const decodedTextArea = document.getElementById('decodedText');
    const decodeButton = document.getElementById('decodeButton');

    // 处理后台消息
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'showUrlDecode') {
            originalTextArea.value = request.originalText;
            decodedTextArea.value = request.decodedText;
        }
    });

    // 处理手动解码
    decodeButton.addEventListener('click', () => {
        const originalText = originalTextArea.value;
        try {
            const decodedText = decodeURIComponent(originalText);
            decodedTextArea.value = decodedText;
        } catch (e) {
            decodedTextArea.value = 'Decode failed: ' + e.message;
        }
    });
});