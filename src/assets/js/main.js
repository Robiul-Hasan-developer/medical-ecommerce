(function ($) {
  "use strict";

  // ==========================================
  //      Start Document Ready function
  // ==========================================
  $(document).ready(function () {
    // ============== Mobile Nav Menu Dropdown Js Start =======================
    function toggleSubMenu() {
      if ($(window).width() <= 991) {
        $(".has-submenu")
          .off("click")
          .on("click", function () {
            $(this)
              .toggleClass("active")
              .siblings(".has-submenu")
              .removeClass("active")
              .find(".nav-submenu")
              .slideUp(300);
            $(this).find(".nav-submenu").stop(true, true).slideToggle(300);
          });
      } else {
        $(".has-submenu").off("click");
      }
    }

    toggleSubMenu();
    $(window).resize(toggleSubMenu);
    // ============== Mobile Nav Menu Dropdown Js End =======================

    // ===================== Scroll Back to Top Js Start ======================
    var progressPath = document.querySelector(".progress-wrap path");
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "none";
    progressPath.style.strokeDasharray = pathLength + " " + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "stroke-dashoffset 10ms linear";
    var updateProgress = function () {
      var scroll = $(window).scrollTop();
      var height = $(document).height() - $(window).height();
      var progress = pathLength - (scroll * pathLength) / height;
      progressPath.style.strokeDashoffset = progress;
    };
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 50;
    var duration = 550;
    jQuery(window).on("scroll", function () {
      if (jQuery(this).scrollTop() > offset) {
        jQuery(".progress-wrap").addClass("active-progress");
      } else {
        jQuery(".progress-wrap").removeClass("active-progress");
      }
    });
    jQuery(".progress-wrap").on("click", function (event) {
      event.preventDefault();
      jQuery("html, body").animate({ scrollTop: 0 }, duration);
      return false;
    });
    // ===================== Scroll Back to Top Js End ======================

    // ========================== add active class to navbar menu current page Js Start =====================
    function dynamicActiveMenuClass(selector) {
      let FileName = window.location.pathname.split("/").reverse()[0];

      // If we are at the root path ("/" or no file name), keep the activePage class on the Home item
      if (FileName === "" || FileName === "index.html") {
        // Keep the activePage class on the Home link
        selector
          .find("li.nav-menu__item.has-submenu")
          .eq(0)
          .addClass("activePage");
      } else {
        // Remove activePage class from all items first
        selector.find("li").removeClass("activePage");

        // Add activePage class to the correct li based on the current URL
        selector.find("li").each(function () {
          let anchor = $(this).find("a");
          if ($(anchor).attr("href") == FileName) {
            $(this).addClass("activePage");
          }
        });

        // If any li has activePage element, add class to its parent li
        selector.children("li").each(function () {
          if ($(this).find(".activePage").length) {
            $(this).addClass("activePage");
          }
        });
      }
    }

    if ($("ul").length) {
      dynamicActiveMenuClass($("ul"));
    }
    // ========================== add active class to navbar menu current page Js End =====================

    // ********************* Toast Notification Js start *********************
    function toastMessage(messageType, messageTitle, messageText, messageIcon) {
      let toastContainer = document.querySelector("#toast-container");

      let toast = document.createElement("div");
      toast.className = `toast-message ${messageType}`;

      toast.innerHTML = `
        <div class="toast-message__content">
            <span class="toast-message__icon">
                <i class="${messageIcon}"></i>
            </span>
            <div class="flex-grow-1">
                <div class="d-flex align-items-start justify-content-between mb-1">
                    <h6 class="toast-message__title">${messageTitle}</h6>
                    <button type="button" class="toast-message__close">
                        <i class="ph-bold ph-x"></i>
                    </button>
                </div>
                <span class="toast-message__text">${messageText}</span>
            </div>
        </div>
        <div class="progress__bar"></div>
    `;

      toastContainer.appendChild(toast);

      setTimeout(() => {
        toast.classList.add("active");
      }, 50);

      let totalDuration = 3500;
      let startTime = Date.now();
      let remainingTime = totalDuration;
      let toastTimeout = setTimeout(hideToast, remainingTime);

      function hideToast() {
        toast.classList.remove("active");
        setTimeout(() => {
          toast.remove();
        }, 500);
      }

      // Remove Toast
      let closeToast = toast.querySelector(".toast-message__close");
      closeToast.addEventListener("click", function () {
        toast.classList.remove("active");
        setTimeout(() => {
          toast.remove();
        }, 500);
      });
      // Remove Toast

      // Pause Timeout on Hover
      toast.addEventListener("mouseenter", function () {
        remainingTime -= Date.now() - startTime;
        clearTimeout(toastTimeout);
      });

      // Resume Timeout on Mouse Leave
      toast.addEventListener("mouseleave", function () {
        startTime = Date.now();
        toastTimeout = setTimeout(hideToast, remainingTime);
      });
    }
    // ********************* Toast Notification Js End *********************

    // ========================= Delete Item Js start ===================
    let deleteButtons = document.querySelectorAll(".delete-button");

    deleteButtons.forEach((deleteButton) => {
      deleteButton.addEventListener("click", function () {
        this.closest(".delete-item").classList.add("d-none");
        toastMessage(
          "danger",
          "Deleted",
          "You deleted successfully!",
          "ph-bold ph-trash"
        );
      });
    });
    // ========================= Delete Item Js End ===================

    // ========================= Form Submit Js Start ===================
    let formSubmit = document.querySelector(".form-submit");
    let fields = document.querySelectorAll("input");
    let textarea = document.querySelector("textarea");

    if (formSubmit && fields) {
      formSubmit.addEventListener("submit", function (e) {
        e.preventDefault();
        fields.forEach((field) => {
          field.value = "";
        });
        if (textarea) {
          textarea.value = "";
        }
        toastMessage(
          "success",
          "Success",
          "Form submitted successfully!",
          "ph-fill ph-check-circle"
        );
      });
    }
    // ========================= Form Submit Js End ===================

    // ========================= Custom Select Js Start =====================
    let selectDropdownWrappers = document.querySelectorAll(
      ".select-dropdown-wrapper"
    );

    selectDropdownWrappers.forEach((selectDropdownWrapper) => {
      let selectButton = selectDropdownWrapper.querySelector(".select-button");
      let selectButtonArrow = selectDropdownWrapper.querySelector(
        ".select-button__arrow"
      );
      let selectButtonText = selectDropdownWrapper.querySelector(
        ".select-button__text"
      );
      let selectDropdown =
        selectDropdownWrapper.querySelector(".select-dropdown");
      let selectDropdownItems = selectDropdownWrapper.querySelectorAll(
        ".select-dropdown__item"
      );

      selectButton.addEventListener("click", function (event) {
        event.stopPropagation();
        selectDropdown.classList.toggle("active");
        selectDropdown.classList.toggle("invisible");
        selectDropdown.classList.toggle("opacity-0");

        selectButtonArrow.style.transform = "rotate(180deg)";
      });

      selectDropdownItems.forEach((selectDropdownItem) => {
        selectDropdownItem.addEventListener("click", function (event) {
          event.stopPropagation();
          let itemText = (selectDropdownItem.querySelector(
            ".select-dropdown__text"
          ).textContent = this.textContent);
          selectButtonText.textContent = itemText;

          selectDropdown.classList.remove("active");
          selectDropdown.classList.add("invisible", "opacity-0");
          selectButtonArrow.style.transform = "rotate(0deg)";
        });
      });

      body.addEventListener("click", function () {
        selectDropdown.classList.remove("active");
        selectDropdown.classList.add("invisible", "opacity-0");
        selectButtonArrow.style.transform = "rotate(0deg)";
      });
    });
    // ========================= Custom Select Js Start =====================

    // ========================== Select2 Js Start =================================
    $(document).ready(function () {
      $(".category-select").select2();
    });
    // ========================== Select2 Js End =================================

    // ========================= Category Js Start ===================
    let categoryButton = document.querySelector(".category-button");
    let categoryDropdown = document.querySelector(".category-dropdown");

    if (categoryButton && categoryDropdown) {
      categoryButton.addEventListener("click", function (event) {
        event.stopPropagation();
        this.classList.toggle("active");
        categoryDropdown.classList.toggle("active");
      });

      categoryDropdown.addEventListener("click", function (event) {
        event.stopPropagation();
        categoryButton.classList.add("active");
        categoryDropdown.classList.add("active");
      });

      document.querySelector("body").addEventListener("click", function () {
        categoryButton.classList.remove("active");
        categoryDropdown.classList.remove("active");
      });
    }
    // ========================= Category Js End ===================

    // ========================= Aos Animation Js Start ===================
    AOS.init({
      once: true,
    });
    // ========================= Aos Animation Js End ===================

    // ========================== Add Attribute For Bg Image Js Start ====================
    $(".background-img").css("background", function () {
      var bg = "url(" + $(this).data("background-image") + ")";
      return bg;
    });
    // ========================== Add Attribute For Bg Image Js End =====================

    // ========================== Toggle Active Js Start =====================
    $(document).on("click", ".toggle-active", function () {
      $(this).toggleClass("activated");
    });
    // ========================== Toggle Active Js End =====================

    // ========================= Copy Coupon Code Js Start ===================
    let copyCouponBtn = document.querySelector(".copy-coupon-btn");
    let copyText = document.querySelector(".copy-text");

    if (copyCouponBtn && copyText) {
      copyText.style.display = "none";

      copyCouponBtn.addEventListener("click", function () {
        let text = this.textContent;
        navigator.clipboard.writeText(text);
        this.classList.add("copied");
        copyText.innerHTML = "Copied";
        copyText.style.display = "inline-block";

        setTimeout(() => {
          this.classList.remove("copied");
          copyText.style.display = "none";
        }, 2000);
      });
    }
    // ========================= Copy Coupon Code Js End ===================

    // ========================= Active Tab Background animation Js Start ===================
    // ********************* Animate Border *********************
    function moveBackground(wrapper) {
      var $activeTab = $(wrapper).find(".active").parent("li");
      var position = $activeTab.position();
      var width = $activeTab.width();

      $(wrapper)
        .find(".animate-border")
        .css({
          left: position.left + "px",
          width: width + "px",
        });
    }

    // Move Background on page load for each tab group
    $(".animate-border-wrapper").each(function () {
      moveBackground(this);
    });

    // Move Background on tab click
    $(".animate-border-wrapper .nav-link").on("click", function () {
      var wrapper = $(this).closest(".animate-border-wrapper");
      wrapper.find(".nav-link").removeClass("active");
      $(this).addClass("active");
      moveBackground(wrapper);
    });

    // ********************* Animate Background *********************
    function moveBorder(wrapper) {
      var $activeTab = $(wrapper).find(".active").parent("li");
      var position = $activeTab.position();
      var width = $activeTab.width();

      $(wrapper)
        .find(".animate-background")
        .css({
          left: position.left + "px",
          width: width + "px",
        });
    }

    // Move Background on page load for each tab group
    $(".animate-background-wrapper").each(function () {
      moveBorder(this);
    });

    // Move Background on tab click
    $(".animate-background-wrapper .nav-link").on("click", function () {
      var wrapper = $(this).closest(".animate-background-wrapper");
      wrapper.find(".nav-link").removeClass("active");
      $(this).addClass("active");
      moveBorder(wrapper);
    });
    // ========================= Active Tab Background animation Js End ===================

    // ========================= Testimonials slider Js Start ===================
    var testimonialsSlider = new Swiper(".testimonials-slider", {
      slidesPerView: 5,
      grabCursor: true,
      loop: true,
      centeredSlides: true,
      spaceBetween: 24,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      speed: 16000,
      autoplay: {
        delay: 0,
        enabled: true,
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
        },
        480: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1366: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1600: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
      },
    });
    // ========================= Testimonials slider Js End ===================

    /********************************************************************************************************
                                        Home Two Js Start 
*********************************************************************************************************/
    // product Category slider start
    var productCategoryTwoSlider = new Swiper(".product-category-two-slider", {
      slidesPerView: 6,
      spaceBetween: 24,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
      speed: 1600,
      grabCursor: true,
      loop: true,
      navigation: {
        nextEl: ".product-category-two-button-next",
        prevEl: ".product-category-two-button-prev",
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
        },
        425: {
          slidesPerView: 2,
        },
        640: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 5,
        },
        1200: {
          slidesPerView: 6,
        },
      },
    });
    // product Category slider End

    // essential medicine slider start
    var essentialMedicineSlider = new Swiper(".essential-medicine-slider", {
      slidesPerView: 4,
      spaceBetween: 24,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
      speed: 1600,
      grabCursor: true,
      loop: true,
      navigation: {
        nextEl: ".essential-medicine-two-button-next",
        prevEl: ".essential-medicine-two-button-prev",
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
        },
        425: {
          slidesPerView: 1,
        },
        480: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
        1364: {
          slidesPerView: 3,
        },
        1500: {
          slidesPerView: 4,
        },
      },
    });
    // essential medicine slider End

    // OTC medicine slider start
    var otcMedicineSlider = new Swiper(".otc-medicine-slider", {
      slidesPerView: 4,
      spaceBetween: 24,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
      speed: 1600,
      grabCursor: true,
      loop: true,
      navigation: {
        nextEl: ".otc-medicine-two-button-next",
        prevEl: ".otc-medicine-two-button-prev",
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
        },
        425: {
          slidesPerView: 1,
        },
        480: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
        1364: {
          slidesPerView: 3,
        },
        1500: {
          slidesPerView: 4,
        },
      },
    });
    // OTC medicine slider End

    // Testimonials Two slider start
    var testimonialsTwoSlider = new Swiper(".testimonials-two-slider", {
      slidesPerView: 1,
      spaceBetween: 24,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
      speed: 1600,
      grabCursor: true,
      loop: true,
      navigation: {
        nextEl: ".testimonials-two-button-next",
        prevEl: ".testimonials-two-button-prev",
      },
    });
    // Testimonials Two slider End

    /********************************************************************************************************
                                        Home Two Js End 
*********************************************************************************************************/

    /********************************************************************************************************
                                        Home Three Js Start 
*********************************************************************************************************/
    // Banner Three js start
    var bannerThreeSlider = new Swiper(".banner-three-slider", {
      autoplay: true,
      speed: 500,
      grabCursor: true,
      loop: true,
      effect: "fade",
      navigation: {
        nextEl: ".banner-three-slider-button-next",
        prevEl: ".banner-three-slider-button-prev",
      },
    });
    // Banner Three js End

    // ========================= Counter Up Js End ===================
    const counterUp = window.counterUp.default;

    const callback = (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting && !el.classList.contains("is-visible")) {
          counterUp(el, {
            duration: 3500,
            delay: 16,
          });
          el.classList.add("is-visible");
        }
      });
    };
    const IO = new IntersectionObserver(callback, { threshold: 1 });

    // statistics Counter
    const statisticsCounter = document.querySelectorAll(".counter");
    if (statisticsCounter.length > 0) {
      statisticsCounter.forEach((counterNumber) => {
        IO.observe(counterNumber);
      });
    }
    // ========================= Counter Up Js End ===================

    // ========================= Clickable Accordion Js Start ===================
    $(document).on("click", ".clickable-item", function () {
      const isActive = $(this).hasClass("active");
      $(".clickable-item").removeClass("active");

      if (!isActive) {
        $(this).addClass("active");
      }
    });
    // ========================= Clickable Accordion Js End ===================

    // ========================== About Two Js Start =====================
    var testimonialsSliderOne = new Swiper(".testimonials-slider-one", {
      slidesPerView: 2,
      grabCursor: true,
      loop: true,
      centeredSlides: true,
      direction: "vertical",
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      speed: 16000,
      autoplay: {
        delay: 0,
        enabled: true,
      },
    });

    var testimonialsSliderTwo = new Swiper(".testimonials-slider-two", {
      slidesPerView: 2,
      grabCursor: true,
      loop: true,
      centeredSlides: true,
      direction: "vertical",
      // spaceBetween: 24,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      speed: 16000,
      autoplay: {
        delay: 0,
        enabled: true,
        reverseDirection: true,
        disableOnInteraction: false,
      },
    });
    // ========================== About Two Js End =====================

    /********************************************************************************************************
                                        Home Three Js End 
*********************************************************************************************************/

    /********************************************************************************************************
                                        Other Pages Js Start 
*********************************************************************************************************/
    // ========================= magnific Popup Js Start =====================
    $(".play-button").magnificPopup({
      type: "iframe",
      removalDelay: 300,
      mainClass: "mfp-fade",
    });
    // ========================= magnific Popup Js End =====================

    // ========================= Doctor List Js Start =====================
    $(document).on("click", ".show-social-icon-button", function () {
      $(this).toggleClass("active");
      $(this).closest("div").find(".show-socials-icons").toggleClass("active");
    });
    // ========================= Doctor List Js End =====================
    
// ================================ Floating Progress js start =================================
  const progressContainers = document.querySelectorAll('.progress-container');

  function setPercentage(progressContainer) {
      const percentage = progressContainer.getAttribute('data-percentage') + '%';
      
      const progressEl = progressContainer.querySelector('.progress');
      const percentageEl = progressContainer.querySelector('.percentage');
      
      progressEl.style.width = percentage;
      percentageEl.innerText = percentage;
      percentageEl.style.insetInlineStart = percentage;
  }

  // Intersection Observer to trigger progress animation when section is in view
  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              // Element is in view, start the progress animation
              const progressContainer = entry.target;
              setPercentage(progressContainer);
              progressContainer.querySelector('.progress').classList.remove('active');
              progressContainer.querySelector('.percentage').classList.remove('active');
              observer.unobserve(progressContainer); // Stop observing once animation is triggered
          }
      });
  }, {
      threshold: 0.5 // Adjust this value as needed (0.5 means half the section needs to be visible)
  });

  // Start observing all progress containers
  progressContainers.forEach(progressContainer => {
      observer.observe(progressContainer);
});
// ================================ Floating Progress js End =================================


    /********************************************************************************************************
                                        Other Pages Js End 
*********************************************************************************************************/



    // ================== Password Show Hide Js Start ==========
    // $(".toggle-password").on('click', function() {
    //   $(this).toggleClass("active");
    //   var input = $($(this).attr("id"));
    //   if (input.attr("type") == "password") {
    //     input.attr("type", "text");
    //     $(this).removeClass('ph-bold ph-eye-closed');
    //     $(this).addClass('ph-bold ph-eye');
    //   } else {
    //     input.attr("type", "password");
    //       $(this).addClass('ph-bold ph-eye-closed');
    //   }
    // });
    // ========================= Password Show Hide Js End ===========================

    // // ================================= Brand slider Start =========================
    // var brandSlider = new Swiper('.brand-slider', {
    // autoplay: {
    //   delay: 2000,
    //   disableOnInteraction: false
    // },
    // autoplay: true,
    // speed: 1500,
    // grabCursor: true,
    // loop: true,
    //   slidesPerView: 7,
    //   breakpoints: {
    //       300: {
    //           slidesPerView: 2,
    //       },
    //       575: {
    //           slidesPerView: 3,
    //       },
    //       768: {
    //           slidesPerView: 4,
    //       },
    //       992: {
    //           slidesPerView: 5,
    //       },
    //       1200: {
    //           slidesPerView: 6,
    //       },
    //       1400: {
    //           slidesPerView: 7,
    //       },
    //   }
    // });
    // // ================================= Brand slider End =========================
  });
  // ==========================================
  //      End Document Ready function
  // ==========================================

  // ========================= Preloader Js Start =====================
  $(window).on("load", function () {
    $(".preloader").fadeOut();
  });
  // ========================= Preloader Js End=====================

  // ========================= Header Sticky Js Start ==============
  $(window).on("scroll", function () {
    if ($(window).scrollTop() >= 260) {
      $(".header").addClass("fixed-header");
    } else {
      $(".header").removeClass("fixed-header");
    }
  });
  // ========================= Header Sticky Js End===================
})(jQuery);
