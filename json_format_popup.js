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