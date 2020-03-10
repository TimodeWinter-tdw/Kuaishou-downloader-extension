var video = document.getElementsByClassName('work-card-thumbnail');
var index = 0;

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

function log(log) {
    console.log(log);
}

function sleepFor( sleepDuration ){
    let now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ }
}

function download(url) {
    log("Download function called.");

    let filename = (index+1) + "___" + new Date().getTime() + ".mp4";

    chrome.runtime.sendMessage({url: url, filename: filename}, function(response) {
        console.log(response.message);
    });
}

log("Total videos in the list: " + video.length);

let interval1= setInterval(()=>{
    setTimeout(function() {

        log("Process for video on position " + (index+1) + " has started.");

        let video_uploaded_on = $(".work-card-info-time").eq(index).text();

        let hours = video_uploaded_on.split("小时前");
        let days = video_uploaded_on.split("天前");
        let weeks = video_uploaded_on.split("周前");
        let months = video_uploaded_on.split("月前");
        let years = video_uploaded_on.split("年前");

        // Check if the video was uploaded hours ago or not
        if(hours[1] !== undefined) {

            let diffNowAndStartHours = hourDiff(new Date(), new Date(startDate));
            let diffNowAndEndHours = hourDiff(new Date(), new Date(endDate));

            if(hours[0] <= diffNowAndStartHours && hours[0] >= diffNowAndEndHours) {
                $(".work-card-thumbnail").eq(index).fclick();
                if(document.getElementsByClassName("feed-list-item")[0]) {

                    if(!(document.getElementsByClassName("viewer-container-img").length > 0)) {
                        log("Sleeping for 2500 milliseconds before video URL is gathered for video on position: " + (index+1))
                        sleepFor(2500);

                        let videoURL = document.getElementsByTagName("video")[0].currentSrc;
                        log("Video URL for video on position " + (index+1) + " is: " + videoURL);

                        download(videoURL);
                    }else {
                        log("Item in card on position " + (index+1) + " is apparently a video.");
                    }

                }
                $(".close").fclick();
            }
        }else if(days[1] !== undefined) {

            let diffNowAndStartDays = dayDiff(new Date(), new Date(startDate));
            let diffNowAndEndDays = dayDiff(new Date(), new Date(endDate));

            if(days[0] <= diffNowAndStartDays && days[0] >= diffNowAndEndDays) {
                $(".work-card-thumbnail").eq(index).fclick();
                if(document.getElementsByClassName("feed-list-item")[0]) {

                    if(!(document.getElementsByClassName("viewer-container-img").length > 0)) {
                        log("Sleeping for 2500 milliseconds before video URL is gathered for video on position: " + (index+1))
                        sleepFor(2500);

                        let videoURL = document.getElementsByTagName("video")[0].currentSrc;
                        log("Video URL for video on position " + (index+1) + " is: " + videoURL);

                        download(videoURL);
                    }else {
                        log("Item in card on position " + (index+1) + " is apparently a video.");
                    }

                }
                $(".close").fclick();
            }
        }else if(weeks[1] !== undefined) {

            let diffNowAndStartWeeks = weekDiff(new Date(), new Date(startDate));
            let diffNowAndEndWeeks = weekDiff(new Date(), new Date(endDate));

            if(weeks[0] <= diffNowAndStartWeeks && weeks[0] >= diffNowAndEndWeeks) {
                $(".work-card-thumbnail").eq(index).fclick();
                if(document.getElementsByClassName("feed-list-item")[0]) {

                    if(!(document.getElementsByClassName("viewer-container-img").length > 0)) {
                        log("Sleeping for 2500 milliseconds before video URL is gathered for video on position: " + (index+1))
                        sleepFor(2500);

                        let videoURL = document.getElementsByTagName("video")[0].currentSrc;
                        log("Video URL for video on position " + (index+1) + " is: " + videoURL);

                        download(videoURL);
                    }else {
                        log("Item in card on position " + (index+1) + " is apparently a video.");
                    }

                }
                $(".close").fclick();
            }
        }else if(months[1] !== undefined) {

            let diffNowAndStartMonths = monthDiff(new Date(), new Date(startDate));
            let diffNowAndEndMonths = monthDiff(new Date(), new Date(endDate));

            if(months[0] <= diffNowAndStartMonths && months[0] >= diffNowAndEndMonths) {
                $(".work-card-thumbnail").eq(index).fclick();
                if(document.getElementsByClassName("feed-list-item")[0]) {

                    if(!(document.getElementsByClassName("viewer-container-img").length > 0)) {
                        log("Sleeping for 2500 milliseconds before video URL is gathered for video on position: " + (index+1))
                        sleepFor(2500);

                        let videoURL = document.getElementsByTagName("video")[0].currentSrc;
                        log("Video URL for video on position " + (index+1) + " is: " + videoURL);

                        download(videoURL);
                    }else {
                        log("Item in card on position " + (index+1) + " is apparently a video.");
                    }

                }
                $(".close").fclick();
            }
        }else if(years[1] !== undefined) {

            let diffNowAndStartYears = yearDiff(new Date(), new Date(startDate));
            let diffNowAndEndYears = yearDiff(new Date(), new Date(endDate));

            if(years[0] <= diffNowAndStartYears && years[0] >= diffNowAndEndYears) {
                $(".work-card-thumbnail").eq(index).fclick();
                if(document.getElementsByClassName("feed-list-item")[0]) {

                    if(!(document.getElementsByClassName("viewer-container-img").length > 0)) {
                        log("Sleeping for 2500 milliseconds before video URL is gathered for video on position: " + (index+1))
                        sleepFor(2500);

                        let videoURL = document.getElementsByTagName("video")[0].currentSrc;
                        log("Video URL for video on position " + (index+1) + " is: " + videoURL);

                        download(videoURL);
                    }else {
                        log("Item in card on position " + (index+1) + " is apparently a video.");
                    }


                }
                $(".close").fclick();
            }
        }

        log("Loops for video on position " + (index+1) + " have ended.");

        if(index !== video.length) {
            log("Index " + index + "is shorter than the video length of " + video.length + "so the index will be increased.");
            index++;
            log("New index: " + index);
        }else {
            clearInterval(interval1);
        }

    }, 500);
},20000);