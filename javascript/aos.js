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











// SKILLS SECTION

gsap.from(".skills-header", {
    opacity: 0, scale: 0.9, delay: 0.5,
    xPercent: 0, yPercent: 40, duration: 0.5,
    scrollTrigger : {
        trigger: ".skills-header",
        start: "top 75%",
        toggleActions: "play none none reverse" // enter, 
    },
});

gsap.from(".skills-text", {
    opacity: 0, scale: 0.9, delay: 0.5,
    xPercent: 0, yPercent: 40, duration: 0.5,
    scrollTrigger : {
        trigger: ".skills-header",
        start: "top 75%",
        toggleActions: "play none none reverse" // enter, 
    },
});

gsap.from(".slider", {
    opacity: 0, scale: 1, delay: 1,
    xPercent: -20, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".skills-header",
        start: "top 75%",
        toggleActions: "play none none reverse" // enter, 
    },
});







// ENGINEER SECTION

gsap.from(".engineer-title", {
    opacity: 0, scale: 1, delay: 0.75,
    xPercent: 0, yPercent: 0, duration: 1,
    scrollTrigger : {
        trigger: ".engineer-title",
        start: "top 75%",
        toggleActions: "play none none reverse" // enter, 
    },
});

gsap.from(".vr-image", {
    opacity: 0, scale: 1, delay: 0,
    xPercent: -20, yPercent: 0, duration: 1,
    scrollTrigger : {
        trigger: ".engineer-title",
        start: "top 75%",
        toggleActions: "play none none reverse" // enter, 
    },
});











// GAME SECTION 

gsap.from(".game-header", {
    opacity: 0, scale: 0.9, delay: 0.5,
    xPercent: 10, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".game-header",
        start: "top 75%",
        toggleActions: "play none none reverse" // enter, 
    },
});

gsap.from(".game-text", {
    opacity: 0, scale: 0.9, delay: 0.5,
    xPercent: 0, yPercent: -20, duration: 0.5,
    scrollTrigger : {
        trigger: ".game-header",
        start: "top 75%",
        toggleActions: "play none none reverse" // enter, 
    },
});










// JAVA SECTION

gsap.from(".java-header", {
    opacity: 1, scale: 0.9, delay: 0,
    xPercent: -140, yPercent: 0, duration: 1,
    scrollTrigger : {
        trigger: ".java-header",
        start: "top 75%",
        toggleActions: "play none none reverse" // enter, 
    },
});

gsap.from(".text", {
    opacity: 0, scale: 1, delay: 1.25,
    xPercent: -10, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".text",
        start: "top 75%",
        toggleActions: "play none none reverse" // enter, 
    },
});

gsap.from(".numbertext", {
    opacity: 0, scale: 1, delay: 1.25,
    xPercent: -10, yPercent: 0, duration: 0.75,
    scrollTrigger : {
        trigger: ".text",
        start: "top 75%",
        toggleActions: "play none none reverse" // enter, 
    },
});

gsap.from(".java-dots", {
    opacity: 0, scale: 1, delay: 0.75,
    xPercent: 0, yPercent: 30, duration: 0.5,
    scrollTrigger : {
        trigger: ".java-dots",
        start: "top 75%",
        toggleActions: "play none none reverse" // enter, 
    },
});

gsap.from(".show-image", {
    opacity: 0, scale: 0.9, delay: 1.25,
    xPercent: 10, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".show-image",
        start: "top 75%",
        toggleActions: "play none none reverse" // enter, 
    },
});








// WEBSITE SECTION

gsap.from(".website-header", {
    opacity: 0, scale: 0.9, delay: 0.5,
    xPercent: -20, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".website-header",
        start: "top 75%",
        toggleActions: "play none none reverse" // enter, 
    },
});


gsap.from(".website-right", {
    opacity: 0, scale: 0.8, delay: 0,
    xPercent: 0, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".website-header",
        start: "top 75%",
        toggleActions: "play none none reverse" // enter, 
    },
});

gsap.from(".website-left", {
    opacity: 1, scale: 1, delay: 0,
    xPercent: -20, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".website-header",
        start: "top 75%",
        toggleActions: "play none none reverse" // enter, 
    },
});

gsap.from(".website-text", {
    opacity: 0, scale: 0.9, delay: 0.5,
    xPercent: 20, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".website-header",
        start: "top 75%",
        toggleActions: "play none none reverse" // enter, 
    },
});








// GRAPHIC SECTION

gsap.from(".graphic-header", {
    opacity: 0, scale: 0.9, delay: 0.5,
    xPercent: 20, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".graphic-header",
        start: "top 75%",
        toggleActions: "play none none reverse" // enter, 
    },
});

gsap.from(".graphic-top", {
    opacity: 1, scale: 1, delay: 0,
    xPercent: -30, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".graphic-top",
        start: "top 75%",
        toggleActions: "play none none reverse" // enter, 
    },
});

gsap.from(".graphic-bottom", {
    opacity: 1, scale: 0.9, delay: 0,
    xPercent: 10, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".graphic-top",
        start: "top 75%",
        toggleActions: "play none none reverse" // enter, 
    },
});

gsap.from(".graphic-text", {
    opacity: 0, scale: 1, delay: 0.5,
    xPercent: 0, yPercent: 30, duration: 0.5,
    scrollTrigger : {
        trigger: ".graphic-header",
        start: "top 75%",
        toggleActions: "play none none reverse" // enter, 
    },
});






// POSTER SECTION

gsap.from(".poster-header", {
    opacity: 0, scale: 1, delay: 0,
    xPercent: -20, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".poster-header",
        start: "top 75%",
        toggleActions: "play none none reverse" // enter, 
    },
});

gsap.from(".poster-text", {
    opacity: 0, scale: 1, delay: 0,
    xPercent: 0, yPercent: 20, duration: 0.5,
    scrollTrigger : {
        trigger: ".poster-text",
        start: "top 75%",
        toggleActions: "play none none reverse" // enter, 
    },
});






// TESTIMONIAL SECTION

gsap.from(".swiper-header", {
    opacity: 0, scale: 0.9, delay: 0,
    xPercent: 0, yPercent: 20, duration: 0.5,
    scrollTrigger : {
        trigger: ".swiper-header",
        start: "top 75%",
        toggleActions: "play none none reverse" // enter, 
    },
});

gsap.from(".swiper-text", {
    opacity: 0, scale: 1, delay: 0,
    xPercent: 0, yPercent: -20, duration: 0.5,
    scrollTrigger : {
        trigger: ".swiper-text",
        start: "top 75%",
        toggleActions: "play none none reverse" // enter, 
    },
});






// FOOTER SECTION

gsap.from(".footer-header", {
    opacity: 0, scale: 1, delay: 0,
    xPercent: -10, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".footer-header",
        start: "top 75%",
        toggleActions: "play none none reverse" // enter, 
    },
});

gsap.from(".footer-button", {
    opacity: 0, scale: 0.8, delay: 0,
    xPercent: 10, yPercent: 0, duration: 0.5,
    scrollTrigger : {
        trigger: ".footer-header",
        start: "top 75%",
        toggleActions: "play none none reverse" // enter, 
    },
});
