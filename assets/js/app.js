$(document).ready(function () {
    var ww = $(window).width();
    var resizeTimeout;
    function updateWidth() {
        ww = $(window).width();
        // console.log('Window width updated:', ww);
    }

    $(window).resize(function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateWidth, 200);
    });

    if ($('.generic-slider').length > 0) {
        $('.generic-slider').each(function (index, slider) {
            var thisscheme = $(this).data('scheme');
            var thisauto = false;
            var thisscroll = $(this).data('scroll');
            var autoset = $(this).data('auto');
            var thisinf = $(this).data('infinity');

            var sliderId = $(slider).attr('id');

            if(autoset === 1){
                thisauto = true;
            }
         //   console.log(thisscheme);



            var scount1 = 5;
            var scount2 = 4;
            var scount3 = 2;
            var scroll1 = 5;
            var scroll2 = 4;
            var scroll3 = 2;

            var dotscontainer = $('#'+sliderId+' .dodots');

            if(thisscheme === 2){
                scount1 = 6;
                scount2 = 4;
                scount3 = 3;
                scroll1 = 6;
                scroll2 = 4;
                scroll3 = 3;
                dotscontainer = $('#'+sliderId).parent().find('.dodots');
            }
            if(thisscheme === 1){
                dotscontainer = $('#'+sliderId).parent().find('.dodots');
            }
            if(thisscroll !== undefined){
                scroll1 = thisscroll;
                scroll2 = thisscroll;
                scroll3 = thisscroll;
            }
            if(thisscheme === 0){
                scount1 = 1;
                scount2 = 1;
                scount3 = 1;
                scroll1 = 1;
                scroll2 = 1;
                scroll3 = 1;
            }

            var thisdots = $(this).data('dots');
            var thisnav = $(this).data('nav');

            var doinfinite = true;
            if(thisinf === 0){
                doinfinite = false;
            }
            $('#' + sliderId).slick({
                dots: thisdots,
                appendDots: dotscontainer,
                slide:'.slider-item',
                arrows: false,
                infinite: doinfinite,
                speed: 2000,
                autoplaySpeed: 5000,
                slidesToShow: scount1,
                slidesToScroll:  scroll1,
               // centerMode: true,
                autoplay:thisauto,
                centerPadding: '60px',
                responsive: [
                    {
                        breakpoint: 1201,
                        settings: {
                            slidesToShow: scount2,
                            slidesToScroll:  scroll2,
                        }
                    },
                    {
                        breakpoint: 621,
                        settings: {
                            slidesToShow: scount3,
                            slidesToScroll:  scroll3,
                            adaptiveHeight: true
                        }
                    },
                ]
            });
            if(thisnav === 1) {
                $('.next-btn[data-slider="' + sliderId.split('-')[1] + '"]').click(function () {
                    $('#' + sliderId).slick('slickNext');
                });

                $('.prev-btn[data-slider="' + sliderId.split('-')[1] + '"]').click(function () {
                    $('#' + sliderId).slick('slickPrev');
                });
            }
        });
    }
    $('.search-mobile').click(function () {
        $('#pm-top-search').toggleClass('is-active');
        $('.main-menu-wrap').removeClass('is-active');
        $('#navslide-toggle').removeClass('is-active');

    });
    $('#navslide-toggle').click(function () {
        $(this).toggleClass('is-active');
        $('.main-menu-wrap').toggleClass('is-active');
        $('#pm-top-search').removeClass('is-active');
    });

    $('#top-page').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 500); // Scroll to top with animation
        return false;
    });

    $('.seasondrop').change(function(){
        var selectseason = $(this).find('option:selected').val();
        //console.log(selectseason);
        window.location.href = selectseason;
    });


        $(document).on('click', '.openplayer', function () {
            $('html, body').animate({
                scrollTop: $('.movieplayer').offset().top - 36
            }, 300);
            $('.movieplayer').addClass('is-active');
        });
        $(document).on('click', '.single-extra .pm-section-head', function () {
            if(ww < 811) {
               var thissection = $(this).data('type');
               console.log(thissection);
               $('.single-extra .pm-section-head').removeClass('is-active');
               $('.single-extra .generic-grid:not([data-type="'+thissection+'"])').removeClass('is-active').addClass('hidden');
               $('.single-extra .generic-grid[data-type="'+thissection+'"]').removeClass('hidden').addClass('is-active');
               $(this).addClass('is-active');
            }
        });



});



function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}
includeHTML();