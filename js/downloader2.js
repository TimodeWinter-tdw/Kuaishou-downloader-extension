fireEvent = function (element, event) {
    if (document.createEventObject) {
        var evt = document.createEventObject();
        return element.fireEvent("on" + event, evt);
    } else {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(event, true, true);
        return !element.dispatchEvent(evt);
    }
};

//Fires the click event
jQuery.fn.fclick = function () {
    $(this).each( function() {
        fireEvent(this, "click");
    });
};

// Functions to calculate time difference
// Date 1 should be closest and date2 should be earliest
function hourDiff(date1, date2) {
    return Math.floor(Math.abs(date1.getTime() - date2.getTime()) / 3600000);
}

function dayDiff(date1, date2) {
    return Math.abs((date1.getTime() - date2.getTime()) / (1000 * 3600 * 24));
}

function weekDiff(date1, date2) {
    return Math.floor(dayDiff(date1, date2) / 7);
}

function monthDiff(date1, date2) {
    var months;
    months = (date1.getFullYear() - date2.getFullYear()) * 12;
    months -= date2.getMonth()+1;
    months += date1.getMonth();
    return months <= 0 ? 0 : months;
}

function yearDiff(date1, date2) {
    return date1.getFullYear() - date2.getFullYear();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Prepare necessary information
const videoList = document.getElementsByClassName('work-card-thumbnail');

// Loop through all the videos
for(let i = 0; i < videoList.length; i++) {
    console.log("Iteration for video with index " + i + " started.");

    // First get the text value for how long ago the video was uploaded
    let video_uploaded_on = $(".work-card-info-time").eq(i).text();

    // The number and the chinese text should be separated
    // This creates an array --> if the video was uploaded hours ago then var hours will be the only variable that has a second (1) array item.
    // The amount of items can be used to check how long ago the video was uploaded (e.g. hours, days, months)
    let hours = video_uploaded_on.split("小时前");
    let days = video_uploaded_on.split("天前");
    let weeks = video_uploaded_on.split("周前");
    let months = video_uploaded_on.split("月前");
    let years = video_uploaded_on.split("年前");

    // Now check if the video was uploaded hours, days, weeks, months or years ago
    if(hours[1] !== undefined) {
        // Calculate the difference in time
        let diff1 = hourDiff(new Date(), new Date(startDate));
        let diff2 = hourDiff(new Date(), new Date(endDate));

        // Check if the video is in the timeframe and should be downloaded or not
        if(checkIsInTimeFrame(hours[0], diff1, diff2)) {
            // Video falls within the provided timeframe so it should be downloaded
            let videoURL = getVideoURL(i);
            console.log("Video URL for index " + i + " is: " + videoURL);

            // Start the download
            download(i, videoURL);
        }else {
            console.log("Video with index " + i + " does not fall within provided timeframe so it should not be downloaded.");
        }

    }else if(days[1] !== undefined) {

        // Calculate the difference in time
        let diff1 = dayDiff(new Date(), new Date(startdate));
        let diff2 = dayDiff(new Date(), new Date(endDate));

        // Check if the video is in the timeframe and should be downloaded or not
        if(checkIsInTimeFrame(days[0], diff1, diff2)) {
            // Video falls within the provided timeframe so it should be downloaded
            let videoURL = getVideoURL(i);
            console.log("Video URL for index " + i + " is: " + videoURL);

            // Start the download
            download(i, videoURL);
        }else {
            console.log("Video with index " + i + " does not fall within provided timeframe so it should not be downloaded.");
        }

    }else if(weeks[1] !== undefined) {

        // Calculate the difference in time
        let diff1 = weekDiff(new Date(), new Date(startdate));
        let diff2 = weekDiff(new Date(), new Date(endDate));

        // Check if the video is in the timeframe and should be downloaded or not
        if(checkIsInTimeFrame(weeks[0], diff1, diff2)) {
            // Video falls within the provided timeframe so it should be downloaded
            let videoURL = getVideoURL(i);
            console.log("Video URL for index " + i + " is: " + videoURL);

            // Start the download
            download(i, videoURL);
        }else {
            console.log("Video with index " + i + " does not fall within provided timeframe so it should not be downloaded.");
        }

    }else if(months[1] !== undefined) {

        // Calculate the difference in time
        let diff1 = monthDiff(new Date(), new Date(startdate));
        let diff2 = monthDiff(new Date(), new Date(endDate));

        // Check if the video is in the timeframe and should be downloaded or not
        if(checkIsInTimeFrame(months[0], diff1, diff2)) {
            // Video falls within the provided timeframe so it should be downloaded
            let videoURL = getVideoURL(i);
            console.log("Video URL for index " + i + " is: " + videoURL);

            // Start the download
            download(i, videoURL);
        }else {
            console.log("Video with index " + i + " does not fall within provided timeframe so it should not be downloaded.");
        }

    }else if(years[1] !== undefined) {

        // Calculate the difference in time
        let diff1 = yearDiff(new Date(), new Date(startdate));
        let diff2 = yearDiff(new Date(), new Date(endDate));

        // Check if the video is in the timeframe and should be downloaded or not
        if(checkIsInTimeFrame(weeks[0], diff1, diff2)) {
            // Video falls within the provided timeframe so it should be downloaded
            let videoURL = getVideoURL(i);
            console.log("Video URL for index " + i + " is: " + videoURL);

            // Start the download
            download(i, videoURL);
        }else {
            console.log("Video with index " + i + " does not fall within provided timeframe so it should not be downloaded.");
        }

    }


}

function checkIsInTimeFrame(siteValue, diff1, diff2) {
    return siteValue <= diff1 && siteValue >= diff2;
}

async function getVideoURL(index) {
    // First click on the card to show the video
    $(".work-card-thumbnail").eq(index).fclick();

    // Now get the elements by classname
    if(document.getElementsByClassName("feed-list-item")[0]) {
        try {
            // First sleep for 5 seconds so the video can load
            await sleep(5000);
            // Now try to get the URL
            if(document.getElementsByTagName("video")[0].currentSrc !== undefined) {
                let url = document.getElementsByTagName("video")[0].currentSrc;
                // Close the card again
                $(".close").fclick();
                sleep(2000);
                return url;
            }else {
                console.log("The video URL for index " + index + " was undefined.");
            }
        }catch (e) {
            console.log("Caught error in getVideoURL(). error: " + e);
        }
    }
}

function download(index, url) {
    // First create the new filename for the video
    let newFileName = index + "___" + new Date().getTime() + "_property-of-Pusic-Entertainment.mp4";
    console.log("Download filename for video " + index + " is " + newFileName);

    // Now start the download
    chrome.runtime.sendMessage({url: url, filename: newFileName}, function(response) {
        console.log("Download response for video " + index + " is " + response.message);
    });
}