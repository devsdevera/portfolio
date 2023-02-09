


const mediaQuery = window.matchMedia('(min-width: 90em)')
// Check if the media query is true

if (mediaQuery.matches) {
  // Then trigger an alert

    gsap.to("#bg", {
        scrollTrigger : {
            scrub: 1,
        },
        yPercent: 0,
        xPercent: 10,
    });

    gsap.to("#mg", {
        scrollTrigger : {
            scrub: 1,
        },
        yPercent: -10,
        xPercent: -10,
    });

    gsap.to("#fg", {
        scrollTrigger : {
            scrub: 1,
        },
        yPercent: -50,
        xPercent: 10,
    });

}

