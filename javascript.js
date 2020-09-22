var toggle = false;

function setVisibility_menu(flag) {
    var menu = document.getElementsByClassName('menu');
    if (!toggle&&!flag) {
        menu[0].style.top = '50%';
        toggle=true;
    }
    else if(toggle) {
        menu[0].style.top = '100%';
        toggle=false;
    }
}