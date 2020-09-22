function SetMenuVisibility(flag) {
    var menu = document.getElementsByClassName("menu");

    if (menu[0].getAttribute("toggled") == "false" && !flag) {
        menu[0].setAttribute("toggled", "true");
    } 
    else if (menu[0].getAttribute("toggled") == "true") {
        menu[0].setAttribute("toggled", "false");
    }
}
