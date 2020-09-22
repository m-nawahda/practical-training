function setMenuVisibility(flag) {
    var menu = document.getElementsByClassName("menu");
    var toggled=menu[0].getAttribute("toggled");
    if (toggled == "false" && !flag) {
        menu[0].setAttribute("toggled", "true");
    } 
    else if (toggled == "true") {
        menu[0].setAttribute("toggled", "false");
    }
}
