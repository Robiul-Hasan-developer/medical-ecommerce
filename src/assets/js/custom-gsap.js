/* **************************************************************************** 
                          Custom GSAP js start 
****************************************************************************  */

var tl = gsap.timeline();
gsap.registerPlugin(ScrollTrigger, SplitText);

// **************************** Nav Menu js Start ****************************
// let mm = gsap.matchMedia();

// mm.add("(min-width: 992px)", () => {
//   gsap.from('.nav-menu__item', {
//     opacity: 0,
//     duration: .4,
//     y: -20,
//     stagger: .12,
//   });
// });
// **************************** Nav Menu js End ****************************

var body = document.body;

// **************************** Mobile Menu js Start ****************************
var mmm = gsap.matchMedia();
var mtl = gsap.timeline({ paused: true });

const toggleMobileMenu = document.querySelector(".toggle-mobileMenu");
const closeButton = document.querySelector(".close-button");
const mobileSideOverlay = document.querySelector(".side-overlay");

mmm.add("(max-width: 991px)", () => {
  mtl.to(".side-overlay", {
    opacity: 1,
    visibility: "visible",
    duration: 0.15,
  });

  mtl.to(".mobile-menu", {
    x: 0,
    duration: 0.15,
  });

  mtl.from(".nav-menu__item", {
    opacity: 0,
    duration: 0.2,
    y: -60,
    stagger: 0.08,
  });

  toggleMobileMenu.addEventListener("click", function () {
    mtl.play();
    document.body.style.overflow = "hidden";
  });

  closeButton.addEventListener("click", function () {
    mtl.reverse();
    document.body.style.overflow = "";
  });

  mobileSideOverlay.addEventListener("click", function () {
    mtl.reverse();
    document.body.style.overflow = "";
  });
});
// **************************** Mobile Menu js End ****************************

// =================================== Custom Split text Js Start =====================================
if ($(".splitTextStyleOne").length) {
  window.addEventListener("load", () => {
    document.querySelectorAll(".splitTextStyleOne").forEach((element) => {
      splitAndAnimate(element);
    });
  });

  function splitAndAnimate(element) {
    if (!element) return;

    const originalText = element.innerText.trim();
    let newHTML = "";

    const words = originalText.split(" ");
    words.forEach((word, wordIndex) => {
      newHTML += `<span class="word">`;
      for (let i = 0; i < word.length; i++) {
        newHTML += `<span class="char">${word[i]}</span>`;
      }
      newHTML += `</span>`;
      if (wordIndex < words.length - 1) {
        newHTML += `<span class="space">&nbsp;</span>`;
      }
    });

    element.innerHTML = newHTML;

    gsap.fromTo(
      element.querySelectorAll(".char"),
      {
        opacity: 0,
        y: 0,
      },
      {
        duration: 2,
        opacity: 1,
        y: 0,
        stagger: 0.04,
        ease: "elastic(1.2, 0.5)",
        scrollTrigger: {
          trigger: element,
          start: "top 98%",
          toggleActions: "play none none none",
        },
      }
    );
  }
}

// =================================== Custom Split text Js End =====================================

// **************************** Position Aware button hover js start ****************************
class Button {
  constructor(buttonElement) {
    this.block = buttonElement;
    this.init();
    this.initEvents();
  }

  init() {
    const el = gsap.utils.selector(this.block);

    this.DOM = {
      button: this.block,
      flair: el(".button__flair"),
    };

    this.xSet = gsap.quickSetter(this.DOM.flair, "xPercent");
    this.ySet = gsap.quickSetter(this.DOM.flair, "yPercent");
  }

  getXY(e) {
    const { left, top, width, height } =
      this.DOM.button.getBoundingClientRect();

    const xTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, width, 0, 100),
      gsap.utils.clamp(0, 100)
    );

    const yTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, height, 0, 100),
      gsap.utils.clamp(0, 100)
    );

    return {
      x: xTransformer(e.clientX - left),
      y: yTransformer(e.clientY - top),
    };
  }

  initEvents() {
    this.DOM.button.addEventListener("mouseenter", (e) => {
      const { x, y } = this.getXY(e);

      this.xSet(x);
      this.ySet(y);

      gsap.to(this.DOM.flair, {
        scale: 1,
        duration: 0.9,
        ease: "power2.out",
      });
    });

    this.DOM.button.addEventListener("mouseleave", (e) => {
      const { x, y } = this.getXY(e);

      gsap.killTweensOf(this.DOM.flair);

      gsap.to(this.DOM.flair, {
        xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
        yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
        scale: 0,
        duration: 0.9,
        ease: "power2.out",
      });
    });

    this.DOM.button.addEventListener("mousemove", (e) => {
      const { x, y } = this.getXY(e);

      gsap.to(this.DOM.flair, {
        xPercent: x,
        yPercent: y,
        duration: 0.9,
        ease: "power2",
      });
    });
  }
}

const buttonElements = document.querySelectorAll('[data-block="button"]');

buttonElements.forEach((buttonElement) => {
  new Button(buttonElement);
});

// **************************** Position Aware button hover js End ****************************

// **************************** Blog js start ****************************
if ($(".line").length) {
  gsap.to(".line", {
    ease: "bounce.out",
    width: "100%",
    duration: 2,
    stagger: 0.12,
    scrollTrigger: {
      trigger: ".blog-three",
      start: "top 90%",
      toggleActions: "restart none restart none",
    },
  });
}
// **************************** Blog js End ****************************

// **************************** Banner Five js Start ****************************
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
  if ($(".banner-five-element").length) {
    if (window.innerWidth > 575) {
      const items = document.querySelectorAll(".banner-five-element");

      const elements = gsap.timeline({
        scrollTrigger: {
          trigger: ".banner-five",
          start: "top 60%",
          toggleActions: "play none none reverse",
          markers: false,
        },
        defaults: {
          ease: "ease1",
          duration: 1.5,
        },
      });
      elements
        .from(items[0], {
          xPercent: 500,
          yPercent: 500,
          scale: 0.6,
          filter: "blur(10px)",
          rotate: 8,
        })
        .from(
          items[1],
          {
            xPercent: -500,
            yPercent: 500,
            scale: 0.6,
            filter: "blur(10px)",
            rotate: 4.13,
          },
          "<"
        )
        .from(
          items[2],
          {
            xPercent: 500,
            yPercent: -500,
            scale: 0.6,
            filter: "blur(10px)",
          },
          "<"
        )
        .from(
          items[3],
          {
            xPercent: -500,
            yPercent: -500,
            scale: 0.6,
            filter: "blur(10px)",
            rotate: -12.15,
          },
          "<"
        );
    }
  }

  // Banner five image
  if ($(".banner-five-image").length) {
    const blurImage = gsap.timeline({
      scrollTrigger: {
        trigger: ".banner-five",
        start: "top 60%",
        toggleActions: "play none none reverse",
        markers: false,
      },
      defaults: {
        ease: "ease1",
        duration: 3,
      },
    });

    blurImage.from(".banner-five-image", {
      scale: 0.6,
      xPercent: 200,
      filter: "blur(10px)",
    });
  }
});
// **************************** Banner Five js End ****************************

// **************************** split Reveal js Start ****************************
if ($(".split-reveal").length) {
  let revealContainers = document.querySelectorAll(".split-reveal");

  revealContainers.forEach((container) => {
    let splitElement = container.querySelector(".split-reveal-element");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        toggleActions: "play none none none",
      },
    });

    tl.set(container, {
      autoAlpha: 1,
    });

    tl.from(container, {
      duration: 1,
      xPercent: -100,
      ease: Power2.out,
    });

    tl.from(splitElement, {
      duration: 1,
      xPercent: 100,
      scale: 1,
      delay: -1,
      ease: Power2.out,
    });
  });
}
// **************************** split Reveal js End ****************************


// **************************** Hover Cursor Js Start ****************************
const viewCursor = document.querySelector(".view-cursor");
const viewCursorShows = document.querySelectorAll(".view-cursor-show");

// Move .view-cursor with mouse
document.body.addEventListener("mousemove", function (event) {
  gsap.to(viewCursor, {
    x: event.clientX + 20, // offset right
    y: event.clientY + 20, // offset down
    duration: 0.3,
    ease: "expo.out",
  });
});

// Loop through all .view-cursor-show
viewCursorShows.forEach((item) => {
  item.addEventListener("mouseenter", function () {
    gsap.to(viewCursor, {
      autoAlpha: 1, // opacity + visibility
      scale: 1,
    });
    gsap.to(dot, {
      scale: 0,
    });
    gsap.to(cursor, {
      scale: 0,
    });
  });

  item.addEventListener("mouseleave", function () {
    gsap.to(viewCursor, {
      autoAlpha: 0,
      scale: 0,
    });
    gsap.to(dot, {
      scale: 1,
    });
    gsap.to(cursor, {
      scale: 1,
    });
  });
});
// **************************** Hover Cursor Js End ****************************

/* **************************************************************************** 
                          Custom GSAP js start 
****************************************************************************  */
