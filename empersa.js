function myFunction() {
 setTimeout(showPage, 1000);
}

function showPage() {
  document.getElementById("loading-page").style.display = "none";
  document.getElementById("empresa-page").style.display = "block";
}
function showLoader(){
document.getElementById("loading-page").style.display = "flex";
document.getElementById("empresa-page").style.display = "none";
}
function updateData(data){
  let req = new XMLHttpRequest();
  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
    }
  };
  req.open("PUT", "https://api.jsonbin.io/v3/b/5f74aa76302a837e957143cc", true);
  req.setRequestHeader("Content-Type", "application/json");
  req.setRequestHeader("X-Master-Key", "$2b$10$PwRh1oZvrJ.J/RrXTyNU.esgztwoPoAnC0LxOdiMfMhKA2k2NIkCu");
  req.setRequestHeader("versioning",false);
  req.send(JSON.stringify(data)); 

}
function getRooms() {
  document.getElementById('container-images').onclick=show_Modal;
  
  $(document).ready(function () {
    $.ajax({
      url: "https://api.jsonbin.io/b/5f74aa76302a837e957143cc",
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
                  '<div class="col-sm-6 col-md-4 col-lg-3") ">\
                      <img src="room-images/' + data[x].name +'.jpg" alt=' + data[x].name +' " data-info='+encodeURI(JSON.stringify(data[x]))+" id="+data[x].id+">\
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
showLoader();
setTimeout(function(){
showPage();
   for (x in filters) {
      var newImage = $(
        '<div class="col-sm-6 col-md-4 col-lg-3">\
          <img src="room-images/' + filters[x].name + '.jpg" alt= '+ filters[x].name+' " data-info='+encodeURI(JSON.stringify(filters[x]))+" id="+filters[x].id+">\
        </div>");
        $(".container-images").append(newImage);
        filter_Rooms.push(filters[x]);
       }
    window.location.hash = encodeURI(JSON.stringify(filter_Rooms));
  },300);
 
});
});
$(document).ready(function(){
  $('.newRoom-icon').on('click',function(){
    $("#modalNewRoom").modal();
  })
})
function show_Modal(event){
  if($('.menu').data('toggled')){
    $('.menu').css({top:'100%'});
    $('.menu').data('toggled',false)
    return;
  }
 $(".modalContainer").empty();
var information=JSON.parse(decodeURI(event.target.getAttribute('data-info')));
var txt_colors="";
var arr_colors=information.style.colors;
for(x in arr_colors){
  x!=arr_colors.length-1?txt_colors+=arr_colors[x]+',':txt_colors+=arr_colors[x];
} 

 var modal1=$('<div class="modal fade" id="modalChangeProp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
                  <div class="modal-dialog cascading-modal modal-avatar modal-sm" role="document">\
                    <div class="row modal-content modal-container">\
                      <div class="col-6 modal-header avatar-image">\
                        <img src="room-images/' + information.name + '.jpg" alt="avatar" class="img-responsive rounded-image"/>\
                      </div>\
                      <div class="col-6 modal-body text-center mb-1">\
                        <div class="edit-btn" data-toggled="false"><i class="fa fa-edit"></i></div>\
                        <div class="fields-structure md-form ml-0 mr-0">\
                            <div class="field-content row">\
                              <label class="label label-info col-2">Name :</label>\
                              <div class ="div-field info_field form-control col-6"  id="div_Name">'+ information.name +'</div>\
                            </div>\
                            <div class="field-content row">\
                              <label class="label label-info col-2">Structure :</label>\
                              <div class="div-field info_field form-control col-6" id="div_structure"> '+information.structure +'</div>\
                            </div>\
                            <div class="field-content row">\
                              <label class="label label-info col-2">Colors :</label>\
                              <div class="div-field info_field form-control col-6" id="div_structure"> '+txt_colors +'</div>\
                            </div>\
                        </div>\
                        <div class="modal-footer justify-content-center">\
                          <a type="submit" class="save-btn btn btn-success waves-effect waves-light">Save Changes\
                            <i class="far fa-gem ml-1 text-white"></i>\
                          </a>\
                          <a type="button" class="btn btn-outline-danger waves-effect" data-dismiss="modal">Cancel</a>\
                        </div>\
                      </div>\
                    </div>\
                  </div>\
                </div>') ;
             
  $(".modalContainer").append(modal1); 
   $(document).ready(function(){
      $("#modalChangeProp").modal(); // show modal when click on edit button
      $('.edit-btn').on('click',function(){ // change field style when click on edit icon
        $('.fields-structure').empty();
          var edited_body=$(' <div class="field-content row">\
                                <label class="label label-info col-2" >Name : </label>\
                                <input type="text" id="txt_Name" class="info_field form-control form-control-sm validate ml-0 col-6" value='+information.name+'>\
                              </div>\
                              <div class="field-content row">\
                                  <label class="label label-info col-2">Structure : </label>\
                                  <input type="text" id="txt_structure" class="info_field form-control form-control-sm validate ml-0 col-6" value='+information.structure+'>\
                              </div>\
                              <div class="field-content row">\
                                  <label class="label label-info col-2">Colors : </label>\
                                  <input type="text" id="txt_colors" class="info_field form-control form-control-sm validate ml-0 col-6" value='+txt_colors+'>\
                              </div> ');
        $('.fields-structure').append(edited_body);
        $('.edit-btn').data('taggled',true);
      });
      $('.save-btn').on('click',function(){  // save the changes on json site 
        if($('.edit-btn').data('taggled')){
          var txt_name=$('#txt_Name');
          var txt_colors=$('#txt_colors').prop('value').split(',');
          console.log(txt_colors)
          var txt_structure=$('#txt_structure');
          if(!(txt_name.prop('value')==""||txt_colors.length==0||txt_structure.prop('value')=="")){
            var rooms=$('#container-images').data('rooms');
            var index=rooms.findIndex((value)=>findRoom(value,information.id));
            var old_ID=information.id;
            information.name=txt_name.prop('value');
            information.structure=txt_structure.prop('value');
            information.style.colors=txt_colors;
            rooms[index]=information;
            event.target.setAttribute('data-info',encodeURI(JSON.stringify(information)));
            updateData(rooms);
            $('#modalChangeProp').modal('hide');
            showLoader();
            setTimeout(() => {
              showPage();
            }, 300);     
           }
        }
        
      });
    
    
    });    
}
function findRoom(obj,new_ID){  
return obj.id==new_ID;
}  
function Data(Rooms){
  this.data=Rooms;
  this.applyFilter=applyFilter;
}
function applyFilter(selectedValue,predict){
  selectedValue!="all" && selectedValue!="" ?
  this.data=this.data.filter(predict):
  null
  return this    
}
function filterRooms(obj,selectedName,selectedStructure,selectedColor){
  let data=new Data(obj)
  
  data.applyFilter(selectedName,(value)=>onName(value,selectedName))
  .applyFilter(selectedStructure,(value)=>onStructure(value,selectedStructure))
  .applyFilter(selectedColor,(value)=>onColor(value,selectedColor))
    return  data.data;
};
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
$(document).ready(function(){
  $('.addRoom-btn').on('click',function(){ // add new room to json site 
    
    var txt_Name=$('#profile').data('name');
    var txt_ID=$('#txt_newID').prop('value');
    var txt_Structure=$('#txt_newstructure').prop('value');
    var txt_styleID=$('#txt_newStyleID').prop('value');
    var txt_styleName=$('#txt_newStyleName').prop('value');
    var colors=$('#txt_newColors').prop('value').split(',');
    if(txt_Name!=""&&txt_ID!=""&&txt_Structure!=""&&txt_styleID!=""&&txt_styleName!=""&&colors.length!=0){
      var newRoom={"id":txt_ID,"name":txt_Name,"structure":txt_Structure,"style":{"id":txt_styleID,"name":txt_styleName,"colors":colors}};
      var data=$('.container-images').data('rooms');
      data[data.length]=newRoom;
      updateData(data);
      $('#container-images').data('rooms',data);
      $('#modalNewRoom').modal('hide');
      showLoader();  
      setTimeout(() => {
        showPage();
      }, 300);
      var newImage = $(
        '<div class="col-sm-6 col-md-4 col-lg-3">\
          <img src="room-images/' + newRoom.name + '.jpg" alt= '+ newRoom.name+' " data-info='+encodeURI(JSON.stringify(newRoom))+" id="+newRoom.id+">\
        </div>");
        $("#container-images").append(newImage);
    }
  })
  $('.addRoom-btn').click(function() {

 });
})
getRooms();