document.addEventListener("mousemove", parallax);

function parallax(e){
    // document.querySelectorAll('.layer').forEach(Layer => {}

    var blue1 = document.querySelector('.blue-one');
    var blue2 = document.querySelector('.blue-two');
    var blue3 = document.querySelector('.blue-three');
    var blue4 = document.querySelector('.blue-four');
    var blue5 = document.querySelector('.blue-five');
    var blue6 = document.querySelector('.blue-six');
    var blue7 = document.querySelector('.blue-seven');


    var designer = document.querySelector('.designer-title');

    const speed1 = blue1.getAttribute('data-speed');
    const speed2 = blue2.getAttribute('data-speed');
    const speed3 = blue3.getAttribute('data-speed');
    const speed4 = blue4.getAttribute('data-speed');
    const speed5 = blue5.getAttribute('data-speed');
    const speed6 = blue6.getAttribute('data-speed');
    const speed7 = blue7.getAttribute('data-speed');


    const speed8 = designer.getAttribute('data-speed');

    const x1 = (window.innerWidth - e.pageX * speed1) / 100;
    const y1 = (window.innerHeight - e.pageY * speed1) / 100;

    const x2 = (window.innerWidth - e.pageX * speed2) / 100;
    const y2 = (window.innerHeight - e.pageY * speed2) / 100;

    const x3 = (window.innerWidth - e.pageX * speed3) / 100;
    const y3 = (window.innerHeight - e.pageY * speed3) / 100;

    const x4 = (window.innerWidth - e.pageX * speed4) / 100;
    const y4 = (window.innerHeight - e.pageY * speed4) / 100;

    const x5 = (window.innerWidth - e.pageX * speed5) / 100;
    const y5 = (window.innerHeight - e.pageY * speed5) / 100;

    const x6 = (window.innerWidth - e.pageX * speed6) / 100;
    const y6 = (window.innerHeight - e.pageY * speed6) / 100;

    const x7 = (window.innerWidth - e.pageX * speed7) / 100;
    const y7 = (window.innerHeight - e.pageY * speed7) / 100;



    const x8 = (window.innerWidth - e.pageX * speed8) / 100;
    const y8 = (window.innerHeight - e.pageY * speed8) / 100;

    blue1.style.transform = "scale(2.2) translateX(calc(" + x1 + "px - 4vw)) translateY(calc(" + y1 + "px + 4vw))";

    blue2.style.transform = "scale(0.8) translateX(calc(" + x2 + "px + 67vw)) translateY(calc(" + y2 + "px + 22vw))";

    blue3.style.transform = "scale(0.6) translateX(calc(" + x3 + "px + 100vw)) translateY(calc(" + y3 + "px - 30vw))";

    blue4.style.transform = "scale(0.4) translateX(calc(" + x4 + "px - 24vw)) translateY(calc(" + y4 + "px - 65vw))";

    blue5.style.transform = "scale(0.7) translateX(calc(" + x5 + "px + 92vw)) translateY(calc(" + y5 + "px + 35vw))";

    blue6.style.transform = "scale(0.4) translateX(calc(" + x6 + "px + 40vw)) translateY(calc(" + y6 + "px - 26vw))";

    blue7.style.transform = "scale(0.9) translateX(calc(" + x7 + "px + 31vw)) translateY(calc(" + y7 + "px + 2vw))";


    designer.style.transform = "scale(1) translateX(" + x8 + "px)  translateY(" + y8 + "px)";
    
}
