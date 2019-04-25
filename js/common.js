$(function() {
  'use strict';

  /* =======================
  // Toggle Menu and Search
  ======================= */
  var $menuOpenButton = $(".menu-button"),
      $menuCloseButton = $(".menu-close"),
      $navMenu = $(".nav-menu"),

      $searchOpenButton = $(".search-button"),
      $searchCloseButton = $(".search-close-button"),
      $search = $(".search");

  $(window).on("resize", function () {
    var e = $(this);
    if (e.width() >= 991) {
      $navMenu.removeClass("active"); // Remove class - "active" if width window more than 991px
    }
  });

  $menuOpenButton.on("click", function() {
    openMenu();
  });

  $menuCloseButton.on("click", function() {
    closeMenu();
  });

  $searchOpenButton.on("click", function() {
    openSearch();
  });

  $searchCloseButton.on("click", function() {
    closeSearch();
  });


  function openMenu() {
    $navMenu.addClass("active");
  }

  function closeMenu() {
    $navMenu.removeClass("active");
  }

  function openSearch() {
    $search.addClass("active");
  }

  function closeSearch() {
    $search.removeClass("active");
  }


  /* =======================
  // Reveal Image
  ======================= */
  var ww = window.innerWidth,
    wh = window.innerHeight;

  $(window).ready(function () {
    $('body').waitForImages({
      finished: function () {
        setTimeout(function () {
          $('.preloader').addClass('hide');

          setTimeout(function () {
            reveals();
          }, 100);
        }, 500);
      },
      waitForAll: true
    });
  });

  function reveals() {
    $(window).on('scroll', function () {
      $(".article-box, .article-first, .post-image-box, .page-image-box, .post-body img, .page-body img, .recent-header").each(
        function(i) {
          var el_top = $(this).offset().top,
            win_bottom = wh + $(window).scrollTop();

          if (el_top < win_bottom) {
            $(this)
              .delay(i * 100)
              .queue(function() {
                $(this).addClass("reveal-in");
              });
          }
        }
      );
    }).scroll();
  }


  /* =======================
  // Responsive Videos
  ======================= */
  $(".post-content, .page-content").fitVids({
    customSelector: ['iframe[src*="ted.com"]']
  });
  

  /* =======================
  // picture Feed
  ======================= */


  if ($('#instafeed').length) {
    var template = '<li class="instagram-item"><a href="{{link}}" aria-label="{{caption}}" target="_blank"><img src="{{image}}" alt="{{caption}}"></a></li>'
    $.get("/picture.json", function (data) {
      if (data) {
        var size = data.length<9?data.length:9;
        for (var i = 0; i < size; i++) {
          var render = template.replace("{{link}}", data[i].url)
              .replace("{{image}}", data[i].image)
              .replace("{{caption}}", data[i].title)
          $('#instafeed').append(render);
        }
      }
    })
  }


  /* =======================
  // Scroll Top Button
  ======================= */
  $(".top").click(function () {
    $("html, body")
      .stop()
      .animate({ scrollTop: 0 }, "slow", "swing");
  });


  // send email to admin
  $("#mc-embedded-subscribe").click(function () {
    var defaultEmail = "keith@thxopen.com";
    var fromEmail = $("#mce-email").val();
    var fromBody = $("#mce-content").val();

    if (!fromEmail) {
      alert("请填写您的邮箱地址");
      $("#mce-email").focus();
      return;
    }
    if (!fromBody) {
      $("#mce-content").focus();
      alert("请填写发送内容");
      return;
    }

    Email.send({
      SecureToken: "5495e5a7-3382-4f0f-bab5-706a92509ac6",
      To: defaultEmail,
      From: defaultEmail,
      Subject: "来自"+fromEmail+"网站留言",
      Body: fromBody
    }).then(
        message => alert(message)
    );
  });

});
