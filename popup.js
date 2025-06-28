document.addEventListener('DOMContentLoaded', () => {
    const originalTextArea = document.getElementById('originalText');
    const resultTextArea = document.getElementById('decodedText');
    const actionButton = document.getElementById('decodeButton');
    const formatTypeSelect = document.createElement('select');
    formatTypeSelect.innerHTML = `
        <option value="url">URL Decode</option>
        <option value="json">JSON Format</option>
    `;
    document.body.insertBefore(formatTypeSelect, originalTextArea);

    // 处理后台消息
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        const originalText = request.originalText;
        const formatType = request.formatType;

        originalTextArea.value = originalText;
        if (request.action === 'showUrlDecode') {
            resultTextArea.value = request.decodedText;
        } else if (request.action === 'showJsonFormat') {
            resultTextArea.value = request.formattedText;
        }

        if (formatType) {
            formatTypeSelect.value = formatType;
        }
    });

    // 处理手动解码/格式化
    actionButton.addEventListener('click', () => {
        const originalText = originalTextArea.value;
        const formatType = formatTypeSelect.value;

        if (formatType === 'url') {
            try {
                const decodedText = decodeURIComponent(originalText);
                resultTextArea.value = decodedText;
            } catch (e) {
                resultTextArea.value = 'Decode failed: ' + e.message;
            }
        } else if (formatType === 'json') {
            try {
                const parsed = JSON.parse(originalText);
                const formattedText = JSON.stringify(parsed, null, 2);
                resultTextArea.value = formattedText;
            } catch (e) {
                resultTextArea.value = 'Format failed: ' + e.message;
            }
        }
    });
});