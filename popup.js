function showDecodeResult(text) {
    const originalTextArea = document.getElementById('originalText');
    const decodedTextArea = document.getElementById('decodedText');
    
    originalTextArea.value = text;
    try {
        decodedTextArea.value = decodeURIComponent(text);
    } catch (e) {
        decodedTextArea.value = 'Decode failed: ' + e.message;
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'showUrlDecode') {
        showDecodeResult(request.text);
    }
});