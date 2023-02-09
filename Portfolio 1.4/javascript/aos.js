// AOS.init();
// window.addEventListener('load', AOS.refresh);

// document.addEventListener('scroll', (event) => { const aosAnimation = document.querySelectorAll('[data-aos]');
// observer = new IntersectionObserver((entries) => {
// entries.forEach(entry => {
// if (entry.intersectionRatio > 0) {
// entry.target.classList.add('aos-animate');
// } else {
// entry.target.classList.remove('aos-animate');
// }
// });
// });
// aosAnimation.forEach(aosObject => {
// observer.observe(aosObject);
// });}, {capture: true, passive: true,})

// gsap.from(".game-header, .game-video, .game-menu", {
//     scrollTrigger : {
//         trigger: ".game",
//         toggleActions: "play restart restart restart",
//     },
//         y: 50,
//         duration: 1,
//         opacity: 0,
//     });


ScrollTrigger.defaults({
    toggleActions: "restart pause resume none",
    start: "top center",
    // markers: {startColor: "white", endColor: "white", fontSize: "18px", indent: 10}
});






// HERO SECTION

gsap.from(".hero-quote", {
    opacity: 0, scale: 1, delay: 0.5,
    xPercent: -10, yPercent: 0, duration: 1,
    scrollTrigger : {
        trigger: ".hero-quote",
    },
});

gsap.from(".hero-image", {
    opacity: 0, scale: 0.8, delay: 0,
    xPercent: 0, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".hero-quote",
    },
});

gsap.from(".hero-box", {
    opacity: 1,  scale: 1, delay: 0,
    xPercent: -20, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".hero-quote",
    },
});








// SKILLS SECTION

gsap.from(".skills-header", {
    opacity: 0, scale: 0.9, delay: 0.5,
    xPercent: 0, yPercent: 40, duration: 0.5,
    scrollTrigger : {
        trigger: ".skills-header",
    },
});

gsap.from(".skills-text", {
    opacity: 0, scale: 0.9, delay: 0.5,
    xPercent: 0, yPercent: 40, duration: 0.5,
    scrollTrigger : {
        trigger: ".skills-header",
    },
});

gsap.from(".slider", {
    opacity: 0, scale: 1, delay: 1,
    xPercent: -20, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".skills-header",
    },
});







// ENGINEER SECTION

gsap.from(".engineer-title", {
    opacity: 0, scale: 1, delay: 0.75,
    xPercent: 0, yPercent: 0, duration: 2,
    scrollTrigger : {
        trigger: ".engineer-title",
    },
});

gsap.from(".vr-image", {
    opacity: 0, scale: 1, delay: 0,
    xPercent: -20, yPercent: 0, duration: 1,
    scrollTrigger : {
        trigger: ".engineer-title",
    },
});











// GAME SECTION 

gsap.from(".game-header", {
    opacity: 0, scale: 0.9, delay: 0.5,
    xPercent: 10, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".game-header",
    },
});

gsap.from(".game-text", {
    opacity: 0, scale: 0.9, delay: 0.5,
    xPercent: -10, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".game-header",
    },
});

gsap.from(".game-video", {
    opacity: 1, scale: 0.9, delay: 0,
    xPercent: 10, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".game-header",
    },
});

gsap.from(".game-menu", {
    opacity: 1, scale: 0.9, delay: 0,
    xPercent: -10, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".game-header",
    },
});









// JAVA SECTION

gsap.from(".java-header", {
    opacity: 1, scale: 1, delay: 0,
    xPercent: -100, yPercent: 0, duration: 1,
    scrollTrigger : {
        trigger: ".java-header",
    },
});

gsap.from(".text", {
    opacity: 0, scale: 1, delay: 1.25,
    xPercent: -10, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".java-header",
    },
});

gsap.from(".numbertext", {
    opacity: 0, scale: 1, delay: 1.25,
    xPercent: -10, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".java-header",
    },
});

gsap.from(".java-dots", {
    opacity: 0, scale: 1, delay: 0.75,
    xPercent: 0, yPercent: 30, duration: 0.5,
    scrollTrigger : {
        trigger: ".java-header",
    },
});

gsap.from(".show-image", {
    opacity: 0, scale: 1, delay: 1.25,
    xPercent: 10, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".java-header",
    },
});








// WEBSITE SECTION

gsap.from(".website-header", {
    opacity: 0, scale: 0.9, delay: 0.5,
    xPercent: -20, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".website-header",
    },
});


gsap.from(".website-right", {
    opacity: 0, scale: 0.8, delay: 0,
    xPercent: 0, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".website-header",
    },
});

gsap.from(".website-left", {
    opacity: 1, scale: 1, delay: 0,
    xPercent: -20, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".website-header",
    },
});

gsap.from(".website-text", {
    opacity: 0, scale: 0.9, delay: 0.5,
    xPercent: 20, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".website-header",
    },
});








// GRAPHIC SECTION

gsap.from(".graphic-header", {
    opacity: 0, scale: 1, delay: 0.5,
    xPercent: 20, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".graphic-header",
    },
});

gsap.from(".graphic-top", {
    opacity: 1, scale: 1, delay: 0,
    xPercent: -30, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".graphic-header",
    },
});

gsap.from(".graphic-bottom", {
    opacity: 1, scale: 1, delay: 0,
    xPercent: -30, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".graphic-header",
    },
});

gsap.from(".graphic-text", {
    opacity: 0, scale: 1, delay: 0.5,
    xPercent: 0, yPercent: 30, duration: 0.5,
    scrollTrigger : {
        trigger: ".graphic-header",
    },
});







// TESTIMONIAL SECTION

gsap.from(".swiper-header", {
    opacity: 0, scale: 0.9, delay: 1,
    xPercent: 0, yPercent: 50, duration: 0.5,
    scrollTrigger : {
        trigger: ".swiper-header",
    },
});

gsap.from(".swiper-wrapper", {
    opacity: 1, scale: 1, delay: 0,
    xPercent: -40, yPercent: 0, duration: 1,
    scrollTrigger : {
        trigger: ".swiper-wrapper",
    },
});