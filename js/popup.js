$(document).ready(function(){
    $('#downloadBtn').on('click', function(){
        var videoUrl = $('#profileUrl').val();
        chrome.tabs.update({ url: videoUrl },function(){
            setTimeout(update, 4000);
        });
    });

    chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        chrome.downloads.download({
           url: request.url,
           filename: request.filename,
           saveAs: false
        });
        sendResponse({message: "Video download started!"});
    });

    function update() {
        chrome.tabs.executeScript(null, {file:'js/jquery.min.js'});
        chrome.tabs.executeScript(null, {code: 'let startDate="' + $('#dateStart').val() + '";let endDate="' + $('#dateEnd').val() + '";'}, function() {
            chrome.tabs.executeScript(null, {file: 'js/content.js'});
        });
    }
});
