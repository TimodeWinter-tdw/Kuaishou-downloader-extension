var videos = new Array;
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


var video = document.getElementsByClassName('work-card-thumbnail');
var index = 0;
var interval1= setInterval(()=>{
    setTimeout(function() {
        // Check if the video was uploaded within selected date
        // First step is to translate the dates to words like 4 hours ago and 3 weeks ago // startDate, endDate <-- variables
        // Define the date variables
        var today = new Date();
        var currentDate = new Date(today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate());
        var startDateVar = new Date(startDate);
        var endDateVar = new Date(endDate);

        // Now calculate time difference between the current date and start date
        var DIT_todayAndStart = currentDate.getTime() - startDateVar.getTime(); // Difference in time
        var DIH_todayAndStart = DIT_todayAndStart / (1000 * 3600); // Difference in hours
        var DID_todayAndStart = DIH_todayAndStart / 24; // Difference in days
        var DIW_todayAndStart = DID_todayAndStart / 7; // Difference in weeks
        var DIM_todayAndStart = currentDate.getMonth()+1 - startDateVar.getMonth()+1; // Difference in months
        var DIY_todayAndStart = currentDate.getFullYear() - startDateVar.getFullYear(); // Difference in years

        // Now calculate time difference between the current date and en date
        var DIT_todayAndEnd =  endDateVar.getTime() - currentDate.getTime();
        var DIH_todayAndEnd = DIT_todayAndEnd / (1000 * 3600);
        var DID_todayAndEnd = DIH_todayAndEnd / 24;
        var DIW_todayAndEnd = DID_todayAndEnd / 7;
        var DIM_todayAndEnd = currentDate.getMonth()+1 - endDateVar.getMonth()+1;
        var DIY_todayAndEnd = currentDate.getFullYear() - endDateVar.getFullYear();


        // Now translate the dates to words in chinese
        var hours_ago = "小时前"; // hours ago
        var days_ago = "天前"; // days ago
        var weeks_ago = "周前"; // weeks ago
        var months_ago = "月前"; // weeks ago
        var years_ago = "年前"; // weeks ago

        // Now check if the video is within the given timeframe
        var wcit = $(".work-card-info-time").eq(index).text();
        // First explode the wcit to use comparators
        var explodedHours = wcit.split(hours_ago);
        var explodedDays = wcit.split(days_ago);
        var explodedWeeks = wcit.split(weeks_ago);
        var explodedMonths = wcit.split(months_ago);
        var explodedYears = wcit.split(years_ago);

        // Check if it is hours, days, weeks, months or years ago that the video was uploaded
        if(explodedHours[1] !== undefined) {
            console.log("EH0: " + explodedHours[0] + ". DIHS: " + DIH_todayAndStart + ". DIHE: " + DIH_todayAndEnd + ". Index: " + index);
            // It is in hours so now check for the videos that are in the interval
            if(explodedHours[0] <= DIH_todayAndStart && explodedHours[0] <= DIH_todayAndEnd) {
                // Video is within parameters so start download
                $(".work-card-thumbnail").eq(index).fclick();
                if(document.getElementsByClassName("feed-list-item")[0])
                {
                    var videoTag = document.getElementsByTagName("video")[0].currentSrc;
                    var filename = new Date().getTime() + ".mp4";
                    console.log('fileName->',filename);
                    $.post( "https://admin.pusicentertainment.com/kuaishou/", { name: videoTag,url:filename}, (res) => {
                        console.log(res);
                    });

                }
                $(".close").fclick();
            }
            if(index !== video.length) {
                index++;
            }else {
                clearInterval(interval1);
            }
        }else if(explodedDays[1] !== undefined) {
            console.log("ED0: " + explodedDays[0] + ". DIHS: " + DID_todayAndStart + ". DIHE: " + DID_todayAndEnd + ". Index: " + index);
            // It is in days
            if(explodedDays[0] <= DID_todayAndStart && explodedDays[0] <= DID_todayAndEnd) {
                // Video can be downloaded
                $(".work-card-thumbnail").eq(index).fclick();
                if(document.getElementsByClassName("feed-list-item")[0])
                {
                    var videoTag = document.getElementsByTagName("video")[0].currentSrc;
                    var filename = new Date().getTime() + ".mp4";
                    console.log('fileName->',filename);
                    $.post( "https://admin.pusicentertainment.com/kuaishou/", { name: videoTag,url:filename}, (res) => {
                        console.log(res);
                    });

                }
                $(".close").fclick();
            }
            if(index !== video.length) {
                index++;
            }else {
                clearInterval(interval1);
            }
        }else if(explodedWeeks[1] !== undefined) {
            console.log("EW0: " + explodedWeeks[0] + ". DIHS: " + DIW_todayAndStart + ". DIHE: " + DIW_todayAndEnd + ". Index: " + index);
            // It is in weeks
            if(explodedWeeks[0] <= DIW_todayAndStart && explodedWeeks[0] <= DIW_todayAndEnd) {
                // Video can be downloaded
                $(".work-card-thumbnail").eq(index).fclick();
                if(document.getElementsByClassName("feed-list-item")[0])
                {
                    var videoTag = document.getElementsByTagName("video")[0].currentSrc;
                    var filename = new Date().getTime() + ".mp4";
                    console.log('fileName->',filename);
                    $.post( "https://admin.pusicentertainment.com/kuaishou/", { name: videoTag,url:filename}, (res) => {
                        console.log(res);
                    });

                }
                $(".close").fclick();
            }
            if(index !== video.length) {
                index++;
            }else {
                clearInterval(interval1);
            }
        }else if(explodedMonths[1] !== undefined) {
            console.log("EM0: " + explodedMonths[0] + ". DIHS: " + DIM_todayAndStart + ". DIHE: " + DIM_todayAndEnd + ". Index: " + index);
            // It is in months
            if(explodedMonths[0] <= DIM_todayAndStart && explodedMonths[0] <= DIM_todayAndEnd) {
                // Video can be downloaded
                $(".work-card-thumbnail").eq(index).fclick();
                if(document.getElementsByClassName("feed-list-item")[0])
                {
                    var videoTag = document.getElementsByTagName("video")[0].currentSrc;
                    var filename = new Date().getTime() + ".mp4";
                    console.log('fileName->',filename);
                    $.post( "https://admin.pusicentertainment.com/kuaishou/", { name: videoTag,url:filename}, (res) => {
                        console.log(res);
                    });

                }
                $(".close").fclick();
            }
            if(index !== video.length) {
                index++;
            }else {
                clearInterval(interval1);
            }
        }else if(explodedYears[1] !== undefined) {
            console.log("EY0: " + explodedYears[0] + ". DIHS: " + DIY_todayAndStart + ". DIHE: " + DIY_todayAndEnd + ". Index: " + index);
            // It is in years
            if(explodedYears[0] <= DIY_todayAndStart && explodedYears[0] <= DIY_todayAndEnd) {
                // Video can be downloaded
                $(".work-card-thumbnail").eq(index).fclick();
                if(document.getElementsByClassName("feed-list-item")[0])
                {
                    var videoTag = document.getElementsByTagName("video")[0].currentSrc;
                    var filename = new Date().getTime() + ".mp4";
                    console.log('fileName->',filename);
                    $.post( "https://admin.pusicentertainment.com/kuaishou/", { name: videoTag,url:filename}, (res) => {
                        console.log(res);
                    });

                }
                $(".close").fclick();
            }
            if(index !== video.length) {
                index++;
            }else {
                clearInterval(interval1);
            }
        }
    }, 1000);
},3000);