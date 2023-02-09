

var header = document.querySelector('.header');
var prevScrollpos = window.pageYOffset;

window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
if (prevScrollpos > currentScrollPos) {
    setTimeout(function() {
    header.style.transform = "translateY(0%)";
    }, 200);
} else {
    setTimeout(function() {
    header.style.transform = "translateY(-100%)";
    }, 200);
}
prevScrollpos = currentScrollPos;
};