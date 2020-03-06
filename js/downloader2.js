var videos = [];

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

function onStartedDownload(id) {
    console.log(`Started downloading: ${id}`);
}

function onFailed(error) {
    console.log(`Download failed: ${error}`);
}

var interval1= setInterval(()=>{
    setTimeout(function() {

        console.log("index start: "+index);

        // Text on how long ago video was uploaded e.g. 4 hours ago
        var video_uploaded_on = $(".work-card-info-time").eq(index).text();

        // The number and the chinese text should be separated
        // This creates an array --> if the video was uploaded hours ago then var hours will be the only variable that has a second (1) array item.
        // The amount of items can be used to check how long ago the video was uploaded (e.g. hours, days, months)
        var hours = video_uploaded_on.split("小时前");
        var days = video_uploaded_on.split("天前");
        var weeks = video_uploaded_on.split("周前");
        var months = video_uploaded_on.split("月前");
        var years = video_uploaded_on.split("年前");

        // Check if the video was uploaded hours ago or not
        if(hours[1] !== undefined) {
            // Now check if the amount of hours ago is within the given timeframe
            // To do that first check the amount of hours between right now and the start date
            var diffNowAndStartHours = hourDiff(new Date(), new Date(startDate));
            // Now also check the amount of hours between right now and the end date
            var diffNowAndEndHours = hourDiff(new Date(), new Date(endDate));
            // If the hours given by kuaishou fall within the timeframe then download the video
            if(hours[0] <= diffNowAndStartHours && hours[0] >= diffNowAndEndHours) {
                $(".work-card-thumbnail").eq(index).fclick();
                if(document.getElementsByClassName("feed-list-item")[0]) {
                    try {
                        // Use delay so video can load
                        setTimeout(function() {
                            var videoTag = document.getElementsByTagName("video")[0].currentSrc;
                            console.log(videoTag);
                            var filename = index + "___" + new Date().getTime() + ".mp4";

                            chrome.runtime.sendMessage({url: videoTag, filename: filename}, function(response) {
                                console.log(response.message);
                            });
                        }, 5000);
                    }catch (e) {
                        console.log("Caught: "+e);
                    }
                }
                $(".close").fclick();
            }
        }else if(days[1] !== undefined) {
            // Now check if the amount of days ago is within the given timeframe
            // To do that first check the amount of days between right now and the start date
            var diffNowAndStartDays = dayDiff(new Date(), new Date(startDate));
            // Now also check the amount of days between right now and the end date
            var diffNowAndEndDays = dayDiff(new Date(), new Date(endDate));
            // If the days given by kuaishou fall within the timeframe then download the video
            if(days[0] <= diffNowAndStartDays && days[0] >= diffNowAndEndDays) {
                $(".work-card-thumbnail").eq(index).fclick();
                if(document.getElementsByClassName("feed-list-item")[0]) {
                    try {
                        console.log("Trying...");
                        // Use delay so video can load
                        setTimeout(function() {
                            var videoTag = document.getElementsByTagName("video")[0].currentSrc;
                            console.log(videoTag);
                            var filename = index + "___" + new Date().getTime() + ".mp4";

                            chrome.runtime.sendMessage({url: videoTag, filename: filename}, function(response) {
                                console.log(response.message);
                            });
                        }, 5000);
                    }catch (e) {
                        console.log("Caught: "+e);
                    }
                }
                $(".close").fclick();
            }
        }else if(weeks[1] !== undefined) {
            // Now check if the amount of weeks is within the given timeframe
            // To do that first check the amount of weeks between right now and the start date
            var diffNowAndStartWeeks = weekDiff(new Date(), new Date(startDate));
            // Now also check the amount of days between right now and the end date
            var diffNowAndEndWeeks = weekDiff(new Date(), new Date(endDate));
            // If the weeks given by kuaishou fall within the timeframe then download the video
            if(weeks[0] <= diffNowAndStartWeeks && weeks[0] >= diffNowAndEndWeeks) {
                $(".work-card-thumbnail").eq(index).fclick();
                if(document.getElementsByClassName("feed-list-item")[0]) {
                    try {
                        console.log("Trying...");
                        // Use delay so video can load
                        setTimeout(function() {
                            var videoTag = document.getElementsByTagName("video")[0].currentSrc;
                            console.log(videoTag);
                            var filename = index + "___" + new Date().getTime() + ".mp4";

                            chrome.runtime.sendMessage({url: videoTag, filename: filename}, function(response) {
                                console.log(response.message);
                            });
                        }, 5000);
                    }catch (e) {
                        console.log("Caught: "+e);
                    }
                }
                $(".close").fclick();
            }
        }else if(months[1] !== undefined) {
            var diffNowAndStartMonths = monthDiff(new Date(), new Date(startDate));
            var diffNowAndEndMonths = monthDiff(new Date(), new Date(endDate));
            if(months[0] <= diffNowAndStartMonths && months[0] >= diffNowAndEndMonths) {
                $(".work-card-thumbnail").eq(index).fclick();
                if(document.getElementsByClassName("feed-list-item")[0]) {
                    try {
                        // Use delay so video can load
                        setTimeout(function() {
                            var videoTag = document.getElementsByTagName("video")[0].currentSrc;
                            console.log(videoTag);
                            var filename = index + "___" + new Date().getTime() + ".mp4";

                            chrome.runtime.sendMessage({url: videoTag, filename: filename}, function(response) {
                                console.log(response.message);
                            });
                        }, 5000);
                    }catch (e) {
                        console.log("Caught: "+e);
                    }
                }
                $(".close").fclick();
            }
        }else if(years[1] !== undefined) {
            var diffNowAndStartYears = yearDiff(new Date(), new Date(startDate));
            var diffNowAndEndYears = yearDiff(new Date(), new Date(endDate));
            if(years[0] <= diffNowAndStartYears && years[0] >= diffNowAndEndYears) {
                $(".work-card-thumbnail").eq(index).fclick();
                if(document.getElementsByClassName("feed-list-item")[0]) {
                    try {
                        // Use delay so video can load
                        setTimeout(function() {
                            var videoTag = document.getElementsByTagName("video")[0].currentSrc;
                            console.log(videoTag);
                            var filename = index + "___" + new Date().getTime() + ".mp4";

                            chrome.runtime.sendMessage({url: videoTag, filename: filename}, function(response) {
                                console.log(response.message);
                            });
                        }, 5000);
                    }catch (e) {
                        console.log("Caught: "+e);
                    }
                }
                $(".close").fclick();
            }
        }

        if(index !== video.length) {
            index++;
        }else {
            clearInterval(interval1);
        }

        console.log("index end: "+index);


    }, 200);
},10000);