var pwInputToggle = document.querySelector(".toggle-password");
var pwInput = document.querySelector("#pwInput");

var mainNav = document.querySelector("#mainNav");

// toggle navigation bar on scroll
window.addEventListener('scroll', function () {
    mainNav.classList[
        window.scrollY > 50 ? 'add': 'remove'
    ]('navbar-shrink');
});


// toggle text <-> password field
pwInputToggle.addEventListener('click', function () {
    var currentType = pwInput.getAttribute('data-type');

    if (currentType == 'text') {
        pwInput.setAttribute('type', 'password');
    } else {
        pwInput.setAttribute('type', 'text');
    }
});

// focus pw input on anchor click
document.querySelectorAll('a[href="#pwCheck"]').forEach(function (a) {
    a.addEventListener('click', function () {
        setTimeout(function () {
            document.querySelector('#pwInput').focus();
        }, 1);
    });
});
