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
    }, 143);
    return false;
});


// $(window).scroll(function() {
//     if ($(this).scrollTop() > 100) {
//         $('.scrollup').fadeIn();
//     } else {
//         $('.scrollup').fadeOut();
//     }
// });
// $('a[href*="#"]:not([href="#"])').click(function() {
//     if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
//         var target = $(this.hash);
//         target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
//         if (target.length) {
//             $('html, body').animate({
//                 scrollTop: target.offset().top
//             }, 500);
//             return false;
//         }
//     }
// });