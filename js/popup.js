$(document).ready(function(){
    $('#downloadBtn').on('click', function() {

        let videoUrl = $('#profileUrl').val();

        chrome.tabs.update({ url: videoUrl },function(){
            setTimeout(update, 4000);
        });

        // Hide the start button
        $('#downloadBtn').hide();
    });


    let videos = 0;
    let filtered = 0;
    let foundUrl = 0;
    let downloaded = 0;

    let curPercentage = 20;


    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {

            if (request.scrollingDone === true) {
                $('#progressBar').show();
                $('#bar').css("width", "10%");
                $('#statusMsg').text("10% // Finished scrolling");
            }

            if (request.totalVideos !== undefined) {
                videos = request.totalVideos;
                $('#bar').css("width", "20%");
                $('#statusMsg').text("20% // Counted total videos.");
            }

            if(request.filtered === true) {
                filtered++;
                curPercentage += 20/videos;
                $('#bar').css("width", curPercentage + "%");
                $('#statusMsg').text(`${Math.ceil(curPercentage)}% // Found URL for ${foundUrl} out of ${videos}.`);
            }

            if (request.gotVideoUrl === true) {
                foundUrl++;
                curPercentage += 20/videos;
                $('#bar').css("width", curPercentage + "%");
                $('#statusMsg').text(`${Math.ceil(curPercentage)}% // Found URL for ${foundUrl} out of ${videos}.`);
            }

            if (request.download === true) {
                downloaded++;

                curPercentage += 40/videos;
                $('#bar').css("width", curPercentage + "%");
                $('#statusMsg').text(`${Math.ceil(curPercentage)}% // Started download for ${downloaded} out of ${videos}.`);

                chrome.downloads.download({
                    url: request.url,
                    filename: request.filename,
                    saveAs: false
                });
            }


        });

    function update() {
        chrome.tabs.executeScript(null, {file:'js/jquery.min.js'});
        chrome.tabs.executeScript(null, {code: 'let startDate="' + $('#dateStart').val() + '";let endDate="' + $('#dateEnd').val() + '";'}, function() {
            chrome.tabs.executeScript(null, {file: 'js/content.js'});
        });
    }

    // Settings
    let settingsOpen = false;
    $('#settingsBtn').on("click", function() {
        if (!settingsOpen) {
            $('#settings').show();
            $('#settingsBtn').text("Hide settings")
            settingsOpen = true;
        }else {
            $('#settings').hide();
            $('#settingsBtn').text("Settings");
            settingsOpen = false;
        }
    });

});