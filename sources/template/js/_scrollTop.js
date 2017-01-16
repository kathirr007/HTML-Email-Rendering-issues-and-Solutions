$(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
        $('.scrollup').fadeIn();
    } else {
        $('.scrollup').fadeOut();
    }
});
$('a[href="#top"]').click(function() {
    $("html, body").animate({
        scrollTop: 0
    }, fast, easein);
    return false;
});
