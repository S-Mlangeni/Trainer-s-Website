const navlinks = document.getElementById("navlinks");
const burger = document.getElementById("burger");

burger.addEventListener("click", slidemenu);

function slidemenu () {
    navlinks.classList.toggle("navlinks-active"); /* "toggle" adds and removes
    the specified class to an element when the event occurs, unlike "add" and
    "remove" which only add and remove respectively. */
}
