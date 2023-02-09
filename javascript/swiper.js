
// SWPER JS WITH A JAVASCRIPT MEDIA QUERY

function myFunction(x) {

  if (x.matches) { // If media query matches

    var swiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      loop: true,
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "3",
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 200,
        modifier: 2,
        slideShadows: false,
      }
    });

  } else {

    var swiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      loop: true,
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "2",
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 200,
        modifier: 2,
        slideShadows: false,
      }
    });

  }
}

var x = window.matchMedia("(min-width: 40em)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes




