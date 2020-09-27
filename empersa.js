function getRooms(){
$(document).ready(function () {
  $.ajax({
    url: "https://api.jsonbin.io/b/5f6c6b89302a837e956cbc66",
    method: "GET",
    data: {},

    success: function (data) {
      for (x in data) {
        var newImage = $(
          '<div class="col-sm-6 col-md-4 col-lg-3">\
          <img src="room-images/' +
            data[x].name +
            '.jpg" alt=' +
            data[x].name +
            ">\
      </div>"
        );
        $(".container-images").append(newImage);
        var newTable = $(
          '<div class="option col-sm-12 col-md-6 col-lg-4">\
          <table>\
              <tr>\
                <th>Room ID</th>\
                <th>Room Name</th>\
                <th>Type</th>\
              </tr>\
              <tr>\
                <td>' +
            data[x].id +
            "</td>\
                <td>" +
            data[x].name +
            "</td>\
                <td>\
                    <select>\
                      <option>Living room</option>\
                      <option>Bedroom</option>\
                      <option>Bath room</option>\
                    </select>\
                </td>\
              </tr>\
          </table>\
        </div>"
        );
        $("#rooms-options").append(newTable);
      }
    },

    error: function (data) {},

    complete: function () {},
  });

});
}
function filters(){
  $(document).ready(function(){
    $('.form').change(function (){

    });
  });
}
function setMenuVisibility(flag) {
  var menu = document.getElementsByClassName("menu");
  var toggled = menu[0].getAttribute("toggled");

  if (toggled == "false" && !flag) {
    menu[0].setAttribute("toggled", "true");
  } else if (toggled == "true") {
    menu[0].setAttribute("toggled", "false");
  }
}
getRooms();