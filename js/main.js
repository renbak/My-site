/*---------------------------------------------------------------------------------
/*
/* Main JS
/*
-----------------------------------------------------------------------------------*/

(function ($) {
  'use strict';

  /*---------------------------------------------------- */
  /* Preloader
	------------------------------------------------------ */
  $(window).load(function () {
    // will first fade out the loading animation
    $('#loader').fadeOut('slow', function () {
      // will fade out the whole DIV that covers the website.
      $('#preloader').delay(300).fadeOut('slow');
    });
  });

  /*----------------------------------------------------*/
  /* Flexslider
  	/*----------------------------------------------------*/
  $(window).load(function () {
    $('#hero-slider').flexslider({
      namespace: 'flex-',
      controlsContainer: '.hero-container',
      animation: 'fade',
      controlNav: true,
      directionNav: false,
      smoothHeight: true,
      slideshowSpeed: 7000,
      animationSpeed: 600,
      randomize: false,
      before: function (slider) {
        $(slider)
          .find('.animated')
          .each(function () {
            $(this).removeAttr('class');
          });
      },
      start: function (slider) {
        $(slider)
          .find('.flex-active-slide')
          .find('h1')
          .addClass('animated fadeInDown show')
          .next()
          .addClass('animated fadeInUp show');

        $(window).trigger('resize');
      },
      after: function (slider) {
        $(slider)
          .find('.flex-active-slide')
          .find('h1')
          .addClass('animated fadeInDown show')
          .next()
          .addClass('animated fadeInUp show');
      },
    });

    $('#testimonial-slider').flexslider({
      namespace: 'flex-',
      controlsContainer: '',
      animation: 'slide',
      controlNav: true,
      directionNav: false,
      smoothHeight: true,
      slideshowSpeed: 7000,
      animationSpeed: 600,
      randomize: false,
    });
  });

  /*----------------------------------------------------*/
  /* Adjust Primary Navigation Background Opacity
	------------------------------------------------------*/
  $(window).on('scroll', function () {
    var h = $('header').height();
    var y = $(window).scrollTop();
    var header = $('#main-header');

    if (y > h + 30 && $(window).outerWidth() > 768) {
      header.addClass('opaque');
    } else {
      if (y < h + 30) {
        header.removeClass('opaque');
      } else {
        header.addClass('opaque');
      }
    }
  });

  /*----------------------------------------------------*/
  /* Highlight the current section in the navigation bar
  	------------------------------------------------------*/
  var sections = $('section'),
    navigation_links = $('#nav-wrap a');

  sections.waypoint({
    handler: function (direction) {
      var active_section;

      active_section = $('section#' + this.element.id);

      if (direction === 'up') active_section = active_section.prev();

      var active_link = $(
        '#nav-wrap a[href="#' + active_section.attr('id') + '"]'
      );

      navigation_links.parent().removeClass('current');
      active_link.parent().addClass('current');
    },

    offset: '25%',
  });

  /*----------------------------------------------------*/
  /* FitText Settings
  	------------------------------------------------------ */
  setTimeout(function () {
    $('#hero-slider h1').fitText(1, {
      minFontSize: '30px',
      maxFontSize: '49px',
    });
  }, 100);

  /*-----------------------------------------------------*/
  /* Mobile Menu
   ------------------------------------------------------ */
  var menu_icon = $("<span class='menu-icon'>Menu</span>");
  var toggle_button = $('<a>', {
    id: 'toggle-btn',
    html: '',
    title: 'Menu',
    href: '#',
  });
  var nav_wrap = $('nav#nav-wrap');
  var nav = $('ul#nav');

  /* if JS is enabled, remove the two a.mobile-btns 
  	and dynamically prepend a.toggle-btn to #nav-wrap */
  nav_wrap.find('a.mobile-btn').remove();
  toggle_button.append(menu_icon);
  nav_wrap.prepend(toggle_button);

  toggle_button.on('click', function (e) {
    e.preventDefault();
    nav.slideToggle('fast');
  });

  if (toggle_button.is(':visible')) nav.addClass('mobile');
  $(window).resize(function () {
    if (toggle_button.is(':visible')) nav.addClass('mobile');
    else nav.removeClass('mobile');
  });

  $('ul#nav li a').on('click', function () {
    if (nav.hasClass('mobile')) nav.fadeOut('fast');
  });

  /*----------------------------------------------------*/
  /* Smooth Scrolling
  	------------------------------------------------------ */
  $('.smoothscroll').on('click', function (e) {
    e.preventDefault();

    var target = this.hash,
      $target = $(target);

    $('html, body')
      .stop()
      .animate(
        {
          scrollTop: $target.offset().top,
        },
        800,
        'swing',
        function () {
          window.location.hash = target;
        }
      );
  });

  /*----------------------------------------------------*/
  /*	Modal Popup
	------------------------------------------------------*/
  $('.item-wrap a').magnificPopup({
    type: 'inline',
    fixedContentPos: false,
    removalDelay: 300,
    showCloseBtn: false,
    mainClass: 'mfp-fade',
  });

  $(document).on('click', '.popup-modal-dismiss', function (e) {
    e.preventDefault();
    $.magnificPopup.close();
  });

  /*----------------------------------------------------*/
  /*  Placeholder Plugin Settings
	------------------------------------------------------ */
  $('input, textarea').placeholder();

  /*----------------------------------------------------*/
  /*	contact form
	------------------------------------------------------*/

  /* local validation */
  $('#contactForm').validate({
    /* submit via ajax */
    submitHandler: function (form) {
      var sLoader = $('#submit-loader');

      $.ajax({
        type: 'POST',
        url: 'inc/sendEmail.php',
        data: $(form).serialize(),
        beforeSend: function () {
          sLoader.fadeIn();
        },
        success: function (msg) {
          // Message was sent
          if (msg == 'OK') {
            sLoader.fadeOut();
            $('#message-warning').hide();
            $('#contactForm').fadeOut();
            $('#message-success').fadeIn();
          }
          // There was an error
          else {
            sLoader.fadeOut();
            $('#message-warning').html(msg);
            $('#message-warning').fadeIn();
          }
        },
        error: function () {
          sLoader.fadeOut();
          $('#message-warning').html('Something went wrong. Please try again.');
          $('#message-warning').fadeIn();
        },
      });
    },
  });
})(jQuery);

let currentImageIndex = 0;
const images = document.querySelectorAll('.image');

function fadeImages() {
  images[currentImageIndex].classList.add('hide');
  currentImageIndex = (currentImageIndex + 1) % images.length;
  images[currentImageIndex].classList.remove('hide');
}

setInterval(fadeImages, 3000);

initImgPc('#pc img', [
  '../images/work_moments/bga_remove.jpg',
  '../images/work_moments/dust_yes.jpg',
  '../images/work_moments/pc_dust.png',
  '../images/work_moments/termo-pasta_video.jpg',
]);

function initImgPc(selector, srcArr) {
  const img = document.querySelector(selector);
  Object.assign(img, {
    buf: Object.assign(new Image(), { img }),
    srcArr: [...srcArr],
    changeInterval: 5e3,
    bufIdx: 0,
    change: function () {
      this.style.animationName = 'img-in';
      this.src = this.buf.src || this.nextImage();
      this.buf.src = this.nextImage();
    },
    nextImage: function () {
      this.bufIdx = ++this.bufIdx < this.srcArr.length ? this.bufIdx : 0;
      return this.srcArr[this.bufIdx];
    },
  });
  img.buf.addEventListener('load', loadHandler);
  img.addEventListener('animationend', animEndHandler);
  img.change();
  return img;

  function loadHandler() {
    setTimeout(
      () => (this.img.style.animationName = 'img-out'),
      this.img.changeInterval
    );
  }
  function animEndHandler({ animationName }) {
    if (animationName === 'img-out') this.change();
  }
}

initImgConsole('#console img', [
  '../images/game/image_05.webp',
  '../images/game/image_06.jpg',
  '../images/game/image_07.jpg',
  '../images/game/image_08.jpg',
  '../images/game/image_09.jpg',
]);

function initImgConsole(selector, srcArr) {
  const img = document.querySelector(selector);
  Object.assign(img, {
    buf: Object.assign(new Image(), { img }),
    srcArr: [...srcArr],
    changeInterval: 5e3,
    bufIdx: 0,
    change: function () {
      this.style.animationName = 'img-in';
      this.src = this.buf.src || this.nextImage();
      this.buf.src = this.nextImage();
    },
    nextImage: function () {
      this.bufIdx = ++this.bufIdx < this.srcArr.length ? this.bufIdx : 0;
      return this.srcArr[this.bufIdx];
    },
  });
  img.buf.addEventListener('load', loadHandler);
  img.addEventListener('animationend', animEndHandler);
  img.change();
  return img;

  function loadHandler() {
    setTimeout(
      () => (this.img.style.animationName = 'img-out'),
      this.img.changeInterval
    );
  }
  function animEndHandler({ animationName }) {
    if (animationName === 'img-out') this.change();
  }
}

initImgTele('#tele img', [
  '../images/appar/image_11.jpg',
  '../images/appar/image_12.jpg',
  '../images/appar/image_13.jpg',
  '../images/appar/image_14.jpg',
  '../images/appar/image_15.jpg',
  '../images/appar/image_16.jpg',
]);

function initImgTele(selector, srcArr) {
  const img = document.querySelector(selector);
  Object.assign(img, {
    buf: Object.assign(new Image(), { img }),
    srcArr: [...srcArr],
    changeInterval: 5e3,
    bufIdx: 0,
    change: function () {
      this.style.animationName = 'img-in';
      this.src = this.buf.src || this.nextImage();
      this.buf.src = this.nextImage();
    },
    nextImage: function () {
      this.bufIdx = ++this.bufIdx < this.srcArr.length ? this.bufIdx : 0;
      return this.srcArr[this.bufIdx];
    },
  });
  img.buf.addEventListener('load', loadHandler);
  img.addEventListener('animationend', animEndHandler);
  img.change();
  return img;

  function loadHandler() {
    setTimeout(
      () => (this.img.style.animationName = 'img-out'),
      this.img.changeInterval
    );
  }
  function animEndHandler({ animationName }) {
    if (animationName === 'img-out') this.change();
  }
}

initImgMobile('#mobile img', [
  '../images/mob/image_17.jpg',
  '../images/mob/image_18.jpg',
  '../images/mob/image_19.jpg',
  '../images/mob/image_20.jpg',
]);

function initImgMobile(selector, srcArr) {
  const img = document.querySelector(selector);
  Object.assign(img, {
    buf: Object.assign(new Image(), { img }),
    srcArr: [...srcArr],
    changeInterval: 5e3,
    bufIdx: 0,
    change: function () {
      this.style.animationName = 'img-in';
      this.src = this.buf.src || this.nextImage();
      this.buf.src = this.nextImage();
    },
    nextImage: function () {
      this.bufIdx = ++this.bufIdx < this.srcArr.length ? this.bufIdx : 0;
      return this.srcArr[this.bufIdx];
    },
  });
  img.buf.addEventListener('load', loadHandler);
  img.addEventListener('animationend', animEndHandler);
  img.change();
  return img;

  function loadHandler() {
    setTimeout(
      () => (this.img.style.animationName = 'img-out'),
      this.img.changeInterval
    );
  }
  function animEndHandler({ animationName }) {
    if (animationName === 'img-out') this.change();
  }
}

initImgBigBro('#big_bro img', [
  '../images/video/image_21.jpg',
  '../images/video/image_22.jpg',
  '../images/video/image_23.jpg',
]);

function initImgBigBro(selector, srcArr) {
  const img = document.querySelector(selector);
  Object.assign(img, {
    buf: Object.assign(new Image(), { img }),
    srcArr: [...srcArr],
    changeInterval: 5e3,
    bufIdx: 0,
    change: function () {
      this.style.animationName = 'img-in';
      this.src = this.buf.src || this.nextImage();
      this.buf.src = this.nextImage();
    },
    nextImage: function () {
      this.bufIdx = ++this.bufIdx < this.srcArr.length ? this.bufIdx : 0;
      return this.srcArr[this.bufIdx];
    },
  });
  img.buf.addEventListener('load', loadHandler);
  img.addEventListener('animationend', animEndHandler);
  img.change();
  return img;

  function loadHandler() {
    setTimeout(
      () => (this.img.style.animationName = 'img-out'),
      this.img.changeInterval
    );
  }
  function animEndHandler({ animationName }) {
    if (animationName === 'img-out') this.change();
  }
}

initImgDomofon('#domofon img', [
  '../images/domofon/image_24.webp',
  '../images/domofon/image_25.webp',
]);

function initImgDomofon(selector, srcArr) {
  const img = document.querySelector(selector);
  Object.assign(img, {
    buf: Object.assign(new Image(), { img }),
    srcArr: [...srcArr],
    changeInterval: 5e3,
    bufIdx: 0,
    change: function () {
      this.style.animationName = 'img-in';
      this.src = this.buf.src || this.nextImage();
      this.buf.src = this.nextImage();
    },
    nextImage: function () {
      this.bufIdx = ++this.bufIdx < this.srcArr.length ? this.bufIdx : 0;
      return this.srcArr[this.bufIdx];
    },
  });
  img.buf.addEventListener('load', loadHandler);
  img.addEventListener('animationend', animEndHandler);
  img.change();
  return img;

  function loadHandler() {
    setTimeout(
      () => (this.img.style.animationName = 'img-out'),
      this.img.changeInterval
    );
  }
  function animEndHandler({ animationName }) {
    if (animationName === 'img-out') this.change();
  }
}
