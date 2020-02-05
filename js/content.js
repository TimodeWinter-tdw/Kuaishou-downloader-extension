setInterval(function(){
    $("html, body").animate({
        scrollTop: $(
            'html, body').get(0).scrollHeight
    }, 2000);
 },
2000);