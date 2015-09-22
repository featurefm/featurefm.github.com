
function goToSlide(number) {
   $("#carousel").carousel(number);
}

function scrollNav() {
  $('#sidebar .nav a, .scroll-to-next a').click(function(){
    //Toggle Class
    $('html, body').stop().animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 500);
    return false;
  });
}

function formatNumber(number)
{
    var number = number.toFixed(0) + '';
    var x = number.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function updateBudgetChart (input) {
  if (!input || input === "") return

  if (input.indexOf("$") == 0) {
    input = input.substring(1)
  }

  var budget = parseInt (input);
  var ffm_plays = budget / 0.07;
  var fb_clicks = budget / 0.81;
  var google_clicks = budget / 0.92;
  var twitter_clicks = budget / 1.5;

  updateBudgetChartHC ({
    budget: budget,
    ffm_plays: ffm_plays,
    fb_clicks: fb_clicks,
    google_clicks: google_clicks,
    twitter_clicks: twitter_clicks
  })

  var options = {
    useEasing : true,
    useGrouping : true,
    separator : ',',
    decimal : '.',
    prefix : '',
    suffix : ''
  };
  var ffm = new CountUp("featurefmCircle", 0, ffm_plays, 0, 1.5, options);
  var fb = new CountUp("fbCircle", 0, fb_clicks, 0, 1.5, options);
  var google = new CountUp("googleCircle", 0, google_clicks, 0, 1.5, options);
  var twitter = new CountUp("twitterCircle", 0, twitter_clicks, 0, 1.5, options);
  ffm.start();
  fb.start();
  google.start();
  twitter.start();
}

var abbreviateNumber = function(num, fixed) {
  if (num === null) { return null; } // terminate early
  if (num === 0) { return '0'; } // terminate early
  fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
  var b = (num).toPrecision(2).split("e"), // get power
      k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
      c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3) ).toFixed(1 + fixed), // divide by power
      d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
      e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
  return e;
}

function updateBudgetChartHC (options){
  $(function () {
    $('#pricing-chart-hc').highcharts({
        chart: {
            type: 'column',
            spacingLeft: 0,
            marginTop: 100,
            style: {
              fontFamily: 'museo-sans,sans-serif'
            }
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        tooltip: {
            formatter: function () {
                return '<b>' + formatNumber (this.y) + ' Song plays</b>';
            }
        },
        title: {
            text: 'Estimated Song Plays'
        },
        subtitle: {
            text: 'Value comparison for ' + '$' + formatNumber(options.budget) + ' Budget'
        },
        xAxis: {
            categories: [
                'Twitter Ads',
                'Google Ads',
                'Facebook Ads',
                'feature.fm'
            ],
            crosshair: true,
            lineColor: "#eeeeee"
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            },
            labels: {
              enabled: false
            },
            stackLabels: {
                enabled: true,
                align: 'center',
                formatter: function () {
                    return abbreviateNumber (this.total);
                },
                style: {
                    fontSize: '18px'
                },
            },
            gridLineColor: '#eeeeee'
        },

        plotOptions: {
            column: {
                stacking: 'normal',
                pointPadding: 0.2,
                borderWidth: 0,
                dataLabels: {
                    enabled: false,
                    style: {
                        fontSize: '20px'
                    },
                    formatter: function () {
                        return abbreviateNumber (this.y);
                    }
                }
            }
        },
        series: [{
            name: 'Song Plays',
            data: [{ y: options.twitter_clicks, color: '#2FAADF'},
                   { y: options.google_clicks, color: '#D2152B'},
                   { y: options.fb_clicks, color: '#3B5A96'},
                   { y: options.ffm_plays, color: '#E72499'}]
        }]
    });
  });
}

scrollNav();

function budgetOnLoad() {

}
jQuery(function($) {

   "use strict";
   /* FIX  SVG IMAGES */
   jQuery('img.svg').each(function(){
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg');

        // Add replaced image's ID to the new SVG
        if(typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }

        // Replace image with new SVG
        $img.replaceWith($svg);

      }, 'xml');

    });
   /* END FIX  SVG IMAGES */
   scrollNav();
    /* FEATURE MEDIA *************************************/

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      var target = $(e.target).attr("href") // activated tab
      if (target === "#tab_default_1") {
        $("#title1").removeClass("hidden");
        $("#title2").addClass("hidden");
        $("#title3").addClass("hidden");
      } else if (target === "#tab_default_2")  {
        $("#title1").addClass("hidden");
        $("#title2").removeClass("hidden");
        $("#title3").addClass("hidden");
      } else if (target === "#tab_default_3")  {
        $("#title1").addClass("hidden");
        $("#title2").addClass("hidden");
        $("#title3").removeClass("hidden");
      }
    });
    $(".post").each(function() {
        var thiseliment = $(this);
        $(this).find('.feature-media').appendTo($(this).find('.append-feature-media'));
    });
    // Target your .container, .wrapper, .post, etc.
    $(".post").fitVids();

    $('#sidebar').affix({
    offset: {
        top: 0,
        bottom: 640
    }
  });

    var fixGrid = function () {
      var arrays = [];
      var size = 3;
      if ($( window ).width() < 1000) {
        size = 2;
      }
      if ($( window ).width() < 768) {
        size = 1;
      }
      var posts = $(document).find(".post-container");
      $postsContainer.html("")

      while (posts.length > 0)
        arrays.push(posts.splice(0, size));

      arrays.map (function (row) {
        var $newRow = $("<div class='row'></div>")
        row.map (function (post) {
          $newRow.append(post)
        });
        $postsContainer.append($newRow);
       });
      console.log(arrays);
    }

     var $postsContainer = $('#container');

     fixGrid();

     var mansory = null;
    /* Homepage Masonry *************************************/
    /* if ($postsContainer.length > 0 ) {
        $postsContainer.imagesLoaded(function() {
            mansory = $postsContainer.masonry({
                itemSelector: '.post-container',
                isAnimated: true,
                hiddenStyle: { opacity: 0},
                visibleStyle: { opacity: 1},
                transitionDuration: '.5s'
            });
            $('.post-container').addClass('animate');
        });
    }

    /* push menue ********************************/
    $('.opener').on("click", function(){
        // e.preventDefault();

        $('.wrapper').toggleClass('pushmenu-opened');
        $('.pushmenu').toggleClass('open');
    });
    // sub menu expand
    $('.has-submenue a').on('click', function(e){
        e.preventDefault();
        $(this).siblings('ul').slideToggle(200);
    })

    $('body').scrollspy({ target: '#sidebar', offset:230 });

    // Allow only numbers in budget input

    $("#budget").inputmask({prefix: "$ ", groupSeparator: ",", alias: "integer", clearMaskOnLostFocus: false, rightAlign: false})
    updateBudgetChart ($("#budget").val());

    $("#budget").bind("input paste", function() {
      var input = $(this).val();
      updateBudgetChart (input);
    });

    var resizeId;
    $(window).resize(function() {
        clearTimeout(resizeId);
        resizeId = setTimeout(doneResizing, 1000);
    });

    function doneResizing(){
        fixGrid();
    }

    // Fix Feature.fm embed song width
    $("iframe[name=featureFMFrame]").css ('width', "100%");

    /* scroll to top ********************************/
    //Check to see if the window is top if not then display button
    $(window).scroll(function(){
        if ($(this).scrollTop() > 200) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }

        if ($(this).scrollTop() > 540) {
            $(".navbar.transparent.navbar-default").css("background-color", "#2D3F47")
        }
        else if ($(this).scrollTop() < 660) {
            $(".navbar.transparent.navbar-default").css("background-color", "rgba(0,0,0,0.2)")
        }

        // Homepage header manipulation
        if ($(this).scrollTop() > 60) {
            $(".navbar-brand.full-logo").hide();
            $(".navbar-brand.icon-logo").show();
            $(".navbar-default.getstarted").addClass("scrolled-header")
        }
        else if ($(this).scrollTop() < 660) {
          $(".navbar-brand.icon-logo").hide();
          $(".navbar-brand.full-logo").show();
          $(".navbar-default.getstarted").removeClass("scrolled-header")
        }

    });

    //Click event to scroll to top
    $('.scrollToTop').click(function(){
        $('html, body').animate({scrollTop : 0},800);
        return false;
    });

    /* ajax loading *******************************/
    var $loadMore = $('.load-more');
    var $loadingImage = $('<i class="fa fa-gear fa-spin"></i> <span>Please wait...</span>');
    var olderPostsUrl = $('.older-posts').attr('href');

    /* show message if end of the post list */
    if (olderPostsUrl === undefined) {
        $loadMore.text('No More Posts');
    }


    $loadMore.on('click', function(e) {
        e.preventDefault();
        // If there are posts to get
        if (olderPostsUrl !== undefined) {
            $loadMore.html($loadingImage);

            $.get(olderPostsUrl, function(result) {

                var $html = $(result);
                var $newContent = $('#container', $html).contents();
                $postsContainer.append($newContent);
                fixGrid();
                // feature media
                $(".post").each(function() {
        var thiseliment = $(this);
        $(this).find('.feature-media').appendTo($(this).find('.append-feature-media'));
    });
                $(".post").fitVids();

                $postsContainer.imagesLoaded(function() {
                    $('.post-container').addClass('animate');
                    //$postsContainer.masonry('appended', $newContent);
                    // Get the url for more posts
                    olderPostsUrl = $('.older-posts', $html).attr('href');

                    // Inform the user if there are no more posts
                    if (olderPostsUrl == undefined) {
                        $loadMore.html('No More Posts To Load');
                    } else {
                        $loadMore.html('Load More Posts');
                    }
                    //reset $html variable
                    $html = "";
                });
            });
        }
    });
});
