fireEvent = function (element, event) {
    if (document.createEventObject) {
        let evt = document.createEventObject();
        return element.fireEvent("on" + event, evt);
    } else {
        let evt = document.createEvent("HTMLEvents");
        evt.initEvent(event, true, true);
        return !element.dispatchEvent(evt);
    }
};

//Fires the click event
jQuery.fn.fclick = function () {
    console.log("Click event started.");
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

// Sleep function
function sleepFor( sleepDuration ){
    let now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ }
}

// Registering the videos
let videoArray;
let totalVideos;

// Registering for scrolling
let registeredBottom = 0;
let registeredEqual = 0;

// Errors
let error = [];

// Video URL array
let videoUrls = [];

// First scroll to bottom
function scrollToBottom() {

    let bottom = document.body.scrollHeight;
    let current = window.innerHeight + document.body.scrollTop;

    if (registeredEqual < 10) {
        if((bottom-current) > 0) {

            /* To make sure that the page stops scrolling and can start the downloading
                we have to save bottom.
                If bottom is the same 10 times over we now we are at the bottom of the page
                Use 10 to make sure that we are at the bottom. Sometimes it is the same due
                to lag.
             */
            if (registeredBottom === bottom) {
                registeredEqual++;
                console.log("Registered equal increased. New value: " + registeredEqual);
            }else {
                registeredEqual = 0;
                registeredBottom = bottom;
                console.log("Registered bottom changed. New value: " + registeredBottom);
            }

            window.scrollTo(0, bottom);
            setTimeout ( 'scrollToBottom()', 1000 );
        }
    }else {
        chrome.runtime.sendMessage({scrollingDone: true}, function(response) {});
        registerVideos();
    }
}

function registerVideos() {
    // Registering the total amount of videos
    if (registeredEqual >= 5) {
        // Get the total amount of videos on the page
        videoArray = document.getElementsByClassName('work-card-thumbnail');
        totalVideos = videoArray.length;
        console.log("Total amount of videos: " + totalVideos);

        // Send message with total amount of videos so the interface can interact
        chrome.runtime.sendMessage({totalVideos: totalVideos}, function(response) {});
    }
    start();
}

function start() {

    (() => {
        let index = 0;

        function prepareDownload() {
            if(index < totalVideos) {

                if(filter(index) === true) {
                    chrome.runtime.sendMessage({filtered: true}, function(response) {});

                    console.log("----------------------------");
                    console.log(`Prepare download for video ${index} started.`);
                    $(".work-card-thumbnail").eq(index).fclick();

                    setTimeout(() => {
                        if(document.getElementsByClassName("feed-list-item")[0]) {
                            console.log("getElementsByClassName was successful");

                            // Check if the item is not an image
                            if(!(document.getElementsByClassName("viewer-container-img").length > 0)) {
                                console.log("Item seems to be a video.");

                                let videoURL = document.getElementsByTagName("video")[0].currentSrc;
                                console.log("Executed function to get currentSrc. Src: " + videoURL);

                                if(videoURL !== "" && videoURL !== undefined) {
                                    console.log(`Video URL on index ${index} is: ${videoURL}`);
                                    $(".close").fclick();
                                    videoUrls.push({
                                        index: index,
                                        url: videoURL
                                    });
                                    chrome.runtime.sendMessage({gotVideoUrl: true}, function(response) {});
                                }else {
                                    console.log(`Could not get the URL for video on index: ${index}`);
                                    error.push({
                                        index: index,
                                        description: "Could not get the URL for this video."
                                    });
                                }
                            }else {
                                error.push({
                                    index: index,
                                    description: "Item does not seem to be a video."
                                });
                            }
                        }else {
                            error.push({
                                index: index,
                                description: "Could not get elements by classname."
                            });
                            console.log(`Could not elements by classname for video ${index}. Error saved.`);
                        }

                        index++;

                        console.log("Total saved video URL's: " + videoUrls.length + " of " + totalVideos);
                        console.log("Total failed: " + error.length);

                        prepareDownload();
                    }, 10000);

                }else {
                    chrome.runtime.sendMessage({filtered: true}, function(response) {});
                    console.log("The video falls out of timeframe and should not be downloaded.");
                }
            }else {
                console.log("All video URL's should be saved now.");
                startDownloads();
            }
        }
        prepareDownload();


    })();

}

function startDownloads() {
    videoUrls.forEach((item, index) => {
        let videoIndex = item.index;
        let videoURL = item.url;

        let newFileName = (videoIndex+1)+"_PusicEntertainment_"+new Date().getTime() + ".mp4";

        chrome.runtime.sendMessage({download: true, url: videoURL, filename: newFileName}, function(response) {
            console.log(response.message);
        });
    })
}

function filter(index) {
    console.log(`Filter for video ${index}`);

    let uploaded_on = $('.work-card-info-time').eq(index).text();

    let hours = uploaded_on.split("小时前");
    let days = uploaded_on.split("天前");
    let weeks = uploaded_on.split("周前");
    let months = uploaded_on.split("月前");
    let years = uploaded_on.split("年前");

    console.log("Hours: " + hours[1]);
    console.log("Days: " + days[1]);
    console.log("Weeks: " + weeks[1]);
    console.log("Months: " + months[1]);
    console.log("Years: " + years[1]);

    if(hours[1] !== undefined) {
        console.log("Video was uploaded hours ago.");

        let diffNowAndStartHours = hourDiff(new Date(), new Date(startDate));
        let diffNowAndEndHours = hourDiff(new Date(), new Date(endDate));

        if(hours[0] <= diffNowAndStartHours && hours[0] >= diffNowAndEndHours) {
            console.log("Video falls within given timeframe.");
            return true;
        }
    }else if(days[1] !== undefined) {
        console.log("Video was uploaded days ago.");

        let diffNowAndStartDays = dayDiff(new Date(), new Date(startDate));
        let diffNowAndEndDays = dayDiff(new Date(), new Date(endDate));

        if(days[0] <= diffNowAndStartDays && days[0] >= diffNowAndEndDays) {
            console.log("Video falls within given timeframe.");
            return true;
        }
    }else if(weeks[1] !== undefined) {
        console.log("Video was uploaded weeks ago.");

        let diffNowAndStartWeeks = weekDiff(new Date(), new Date(startDate));
        let diffNowAndEndWeeks = weekDiff(new Date(), new Date(endDate));

        if(weeks[0] <= diffNowAndStartWeeks && weeks[0] >= diffNowAndEndWeeks) {
            console.log("Video falls within given timeframe.");
            return true;
        }
    }else if(months[1] !== undefined) {
        console.log("Video was uploaded months ago.");

        let diffNowAndStartMonths = monthDiff(new Date(), new Date(startDate));
        let diffNowAndEndMonths = monthDiff(new Date(), new Date(endDate));

        if(months[0] <= diffNowAndStartMonths && months[0] >= diffNowAndEndMonths) {
            console.log("Video falls within given timeframe.");
            return true;
        }
    }else if(years[1] !== undefined) {
        console.log("Video was uploaded years ago.");

        let diffNowAndStartYears = yearDiff(new Date(), new Date(startDate));
        let diffNowAndEndYears = yearDiff(new Date(), new Date(endDate));

        if(years[0] <= diffNowAndStartYears && years[0] >= diffNowAndEndYears) {
            console.log("Video falls within given timeframe.");
            return true;
        }
    }
}

scrollToBottom();
