

gsap.to("#left-side", {
    duration: 2,
    width: "44%",
    scrollTrigger: {
        trigger: "#left-side",
        start: "top 75%",
        endTrigger: "#left-side",
        toggleActions: "play none none reverse" // enter, pass, reetner, complete reset
    }
});

var left = document.getElementById("left-side");
var position = left.getBoundingClientRect();


var isOnDiv = false;

document.getElementById("right-side").addEventListener("mouseover", function(  ) {isOnDiv=true;});
document.getElementById("left-side").addEventListener("mouseover", function(  ) {isOnDiv=true;});

document.getElementById("right-side").addEventListener("touchstart", function(  ) {isOnDiv=true;});
document.getElementById("left-side").addEventListener("touchstart", function(  ) {isOnDiv=true;});

document.getElementById("right-side").addEventListener("touchend", function(  ) {isOnDiv=false;});
document.getElementById("left-side").addEventListener("touchend", function(  ) {isOnDiv=false;});

document.getElementById("right-side").addEventListener("mouseout", function(  ) {isOnDiv=false;});
document.getElementById("left-side").addEventListener("mouseout", function(  ) {isOnDiv=false;});



var mouseDown = 0;
document.body.onmousedown = function() { 
    mouseDown = 1;
}
document.body.onmouseup = function() {
    mouseDown = 0;
}



const handleOnMove = e => {

    if (mouseDown == 1 && isOnDiv == true) {
        const p = e.clientX / window.innerWidth * 100;
        left.style.width = p + "%";
    }
}

const handleOnTouch = e => {

    // console.log(isOnDiv);

    if (isOnDiv == true) {
        const p = e.clientX / window.innerWidth * 100;
        left.style.width = p + "%";
    }
}

document.onmousemove = e => handleOnMove(e);
document.ontouchmove = e => handleOnTouch(e.touches[0]);
