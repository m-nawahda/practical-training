function getRooms() {
  $(document).ready(function () {
    $.ajax({
      url: "https://api.jsonbin.io/b/5f6c6b89302a837e956cbc66/2",
      method: "GET",
      data: {},
      success: function (data) {
        $('#container-images').data('rooms', data);
        var HashRooms = decodeURI(location.hash.substring(1));
        if (HashRooms.length > 2) {
          data = JSON.parse(decodeURI(HashRooms));
        }
        $(".container-images").empty();
        for (x in data) {
            var newImage = $(
                  '<div class="col-sm-6 col-md-4 col-lg-3">\
                      <img src="room-images/' + data[x].name +'.jpg" alt=' + data[x].name +">\
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
                          <td>' + data[x].id + '</td>\
                          <td>' + data[x].name +'</td>\
                          <td>\
                              <select>\
                                <option>Living room</option>\
                                <option>Bedroom</option>\
                                <option>Bath room</option>\
                              </select>\
                          </td>\
                        </tr>\
                    </table>\
                  </div>'
              );
              $("#rooms-options").append(newTable);
        }
      },

      error: function (data) { },

      complete: function () { },
    });

  });
}

$(document).ready(function () {
  $('#filter-btn').on('click', function () {
    var selectedColor = $('select').children("option:selected").val().toLowerCase();
    var selectedName = $('#name').val();
    var selectedStructure = $('#structure').val();
    if (selectedColor == "All" && selectedStructure == "structure" && selectedName == "name") {
        location.hash = encodeURI("");
        getRooms();
        return;
    }
    var data = $('#container-images').data('rooms');
    var filter_Rooms = [];
    $(".container-images").empty();
    window.location.hash = [];

var filters=filterRooms(data,selectedName,selectedStructure,selectedColor);
   for (x in filters) {
            var newImage = $(
                '<div class="col-sm-6 col-md-4 col-lg-3">\
                       <img src="room-images/' + filters[x].name + '.jpg" alt=' + filters[x].name +">\
                    </div>"
             );
             $(".container-images").append(newImage);
             filter_Rooms.push(filters[x]);
       }
    window.location.hash = encodeURI(JSON.stringify(filter_Rooms));
  });
});

function filterRooms(obj,selectedName,selectedStructure,selectedColor){
  let filterdJson=obj.filter((value)=>onName(value,selectedName)).filter((value)=>onColor(value,selectedColor)).filter((value)=>onStructure(value,selectedStructure));
 return filterdJson;
}

function onName(obj,Name){
if(Name!=""){
  if(obj.name.includes(Name))
   return true;
  else 
   return false;
}
else {
  return true;
}
}

function onColor(obj,Color){
 if(Color!="all"){
   if(obj.style.colors.includes(Color))
    return true;
   else 
    return false;
 }
 else {
   return true;
 }
}

function onStructure(obj,Structure){
 if(Structure!=""){
   if(obj.structure.includes(Structure))
    return true;
   else 
    return false;
 }
 else {
   return true;
 }
}

function setMenuVisibility(flag) {
  $(document).ready(function () {
      var toggled = $(".menu").data("toggled");
      if (toggled == false && !flag) {
          $('.menu').data('toggled', true);
          $('.menu').css({top: '50%'});
      } 
      else if (toggled == true) {
          $('.menu').data('toggled', false);
          $('.menu').css({top: '100%'});
      }
  });
}

getRooms();