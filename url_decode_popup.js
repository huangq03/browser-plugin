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

function localizeHtmlPage()
{
    //Localize by replacing __MSG_***__ meta tags
    var objects = document.getElementsByTagName('html');
    for (var j = 0; j < objects.length; j++)
    {
        var obj = objects[j];

        var valStrH = obj.innerHTML.toString();
        var valNewH = valStrH.replace(/__MSG_(\w+)__/g, function(match, v1)
        {
            return v1 ? chrome.i18n.getMessage(v1) : "";
        });

        if(valNewH != valStrH)
        {
            obj.innerHTML = valNewH;
        }
    }
}

localizeHtmlPage();