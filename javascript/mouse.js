document.addEventListener("mousemove", parallax);

function parallax(e){
    // document.querySelectorAll('.layer').forEach(Layer => {}

    var blue = document.querySelector('.blue-image');
    var designer = document.querySelector('.designer-title');

    const speed1 = blue.getAttribute('data-speed');
    const speed2 = designer.getAttribute('data-speed');

    const x1 = (window.innerWidth - e.pageX * speed1) / 100;
    const y1 = (window.innerHeight - e.pageY * speed1) / 100;

    const x2 = (window.innerWidth - e.pageX * speed2) / 100;
    const y2 = (window.innerHeight - e.pageY * speed2) / 100;

    blue.style.transform = "scale(2) translateX(calc(" + x1 + "px + 6vw)) translateY(" + y1 + "px)";

    designer.style.transform = "scale(1) translateX(" + x2 + "px)  translateY(" + y2 + "px)";
    
}