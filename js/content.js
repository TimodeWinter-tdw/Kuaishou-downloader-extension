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

// Registering for scrolling
let registeredBottom = 0;
let registeredEqual = 0;

// First scroll to bottom
function scrollToBottom() {

    let bottom = document.body.scrollHeight;
    let current = window.innerHeight + document.body.scrollTop;

    if (registeredEqual < 5) {
        if((bottom-current) > 0) {

            /* To make sure that the page stops scrolling and can start the downloading
                we have to save bottom.
                If bottom is the same 5 times over we now we are at the bottom of the page
                Use 5 to make sure that we are at the bottom. Sometimes it is the same due
                to lag.
             */
            if (registeredBottom === bottom) {
                registeredEqual++;
            }else {
                registeredBottom = bottom;
            }

            window.scrollTo(0, bottom);
            setTimeout ( 'scrollToBottom()', 1000 );
        }
    }
}

scrollToBottom();

// Registering the total amount of videos
let videoArray;

if (registeredEqual >= 5) {
    // Get the total amount of videos on the page
    videoArray = document.getElementsByClassName('work-card-thumbnail');
    console.log("Amount of videos: " + videoArray.length);
}