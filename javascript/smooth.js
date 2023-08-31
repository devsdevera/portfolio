

// Get the button element
var btn = document.querySelector('.back-to-top');

// Add an event listener to the button
btn.addEventListener('click', function () {
// Use the smooth scroll behavior to smoothly scroll to the top of the page
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});
