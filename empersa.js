var availableRooms;
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
function showUpdateLoader(id){
  document.getElementById(id).style.display = "flex";
}
function hideUpdateLoader(id){
  document.getElementById(id).style.display = "none";

}
function updateData(data){
  let req = new XMLHttpRequest();
  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
    }
  };
  req.open("PUT", "https://api.jsonbin.io/v3/b/5f82d6c465b18913fc5dc345", true);
  req.setRequestHeader("Content-Type", "application/json");
  req.setRequestHeader("X-Master-Key", "$2b$10$PwRh1oZvrJ.J/RrXTyNU.esgztwoPoAnC0LxOdiMfMhKA2k2NIkCu");
  req.setRequestHeader("versioning",false);
  req.send(JSON.stringify(data)); 
}
function setFields(selectedName,selectedStructure,selectedColor){
  $('#name').prop('value',selectedName);
  $('#strucure').prop('value',selectedStructure);
  $('.selection-color').val(selectedColor);
}
function resetFields(){
  $('#name').prop('value',"");
  $('#structure').prop('value',"")
  $('.selection-color').val('all')
  const params = new URLSearchParams(window.location.search);
  params.delete('name');
  params.delete('color');
  params.delete('structure');
  window.history.replaceState({}, '', `${location.pathname}${params}`);
  getRooms();
}
function showSnackbar(id) {
  var x = document.getElementById(id);
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
function getRooms() {
  document.getElementById('container-images').onclick=showModal;
  document.getElementsByTagName('body')[0].onclick=function(){
    var targetID=event.target.id;
    if($('.menu').data('toggled')==true){
      if(targetID=='top-banner'||targetID=="bottom-banner"){
        $('.menu').data('toggled', false);
        $('.menu').css({top: '100%'});
      }
    } 
  }
  //document.getElementById('container-images').onmouseover=showDescription;
  
  $(document).ready(function () {
    $.ajax({
      url: "https://api.jsonbin.io/b/5f82d6c465b18913fc5dc345",
      method: "GET",
      data: {},
      success: function (data) {
        const params = new URLSearchParams(window.location.search);
        availableRooms=data;
        if(Array.from(params).length!=0){
          var selectedName=params.get('name');
          var selectedStructure=params.get('structure');
          var selectedColor=params.get('color');
          
          data=filterRooms(data,selectedName!=null?selectedName:"",
          selectedStructure!=null?selectedStructure:"",
          selectedColor!=null?selectedColor:"all");
          setFields(selectedName,selectedStructure,selectedColor);
        }
        $(".container-images").empty();
        for (x in data) {
            var newImage = $(
                  '<div class="image-container col-sm-6 col-md-4 col-lg-3" id ='+data[x].id+' ">\
                      <img onerror="error(this)" src="room-images/' + data[x].path +'.jpg" alt=' + data[x].name +' " data-info='+encodeURI(JSON.stringify(data[x]))+' ">\
                      <div class="overlay">\
                        <div class="text">'+data[x].name+' <br> '+data[x].structure+'</div>\
                      </div>\
                   </div>'
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
        $('.count').empty();
        $('.count').append(data.length + " Room")
        if(data.length==0)$('.info-msg').css({display:'flex'});
        else $('.info-msg').css({display:'none'}); 
      },

      error: function (data) { },

      complete: function () { },
    });

  });
}
function addParameters(selectedColor,selectedName,selectedStructure){
  const params = new URLSearchParams(window.location.search);
  if(selectedColor!="all")params.set('color',selectedColor)
  else if(params.has('color'))
         params.delete('color');
  if(selectedName!="")
    params.set("name",selectedName)
  else if(params.has('name'))
         params.delete('name');
  if(selectedStructure!="")
    params.set("structure",selectedStructure)
  else if(params.has('structure'))
    params.delete('structure');
  window.history.replaceState({}, '', `${location.pathname}?${params}`);

}
$(document).ready(function () {
  $('.filter-txt').keyup(function(){
    if($('#name').val()!=""||$('#structure').val()!=""){
      $('.filter-btn').prop("disabled",false);
    }
    else {
      $('.filter-btn').prop("disabled",true);
    }
  });
  $('.selection-color').change(function(){
    if($('.selection-color').val()!="all"){
      $('.filter-btn').prop("disabled",false);
    }
    else {
      $('.filter-btn').prop("disabled",true);
    }
  })
  $('#filter-btn').on('click', function () {
        var selectedColor = $('select').children("option:selected").val().toLowerCase();
        var selectedName = $('#name').val().toLowerCase();
        var selectedStructure = $('#structure').val().toLowerCase();
        if (selectedColor == "all" && selectedStructure == "" && selectedName == "") {
            return;
        }
        $(".container-images").empty();
        var filters=filterRooms(availableRooms,selectedName,selectedStructure,selectedColor);
        addParameters(selectedColor,selectedName,selectedStructure);
        showLoader();
        setTimeout(function(){
        showPage();
          for (x in filters) {
              var newImage = $(
                '<div class="col-sm-6 col-md-4 col-lg-3">\
                  <img onerror="error(this)" src="room-images/' + filters[x].path + '.jpg" alt= '+ filters[x].name+' " data-info='+encodeURI(JSON.stringify(filters[x]))+" id="+filters[x].id+">\
                </div>");
                $(".container-images").append(newImage);
              }
              $('.count').empty();
              $('.count').append(filters.length + " Room")      
              if(filters.length==0)$('.info-msg').css({display:'flex'});
              else $('.info-msg').css({display:'none'});       
          },300);   
});
$(document).on('keypress',function(e) {
  if(e.which == 13) {
    if($('.filter-txt').is(':focus')&&$('#name').val()!=""||$('#structure').val()!=""){
      $('#filter-btn').click();
    }
  }
});
  $('#clear-btn').on('click',function(){
    resetFields();
  })
});
$(document).ready(function(){
  $('.newRoom-icon').on('click',function(){
    var dashes=$('<label class="addImageLabel">Add Image</label>\
                  <div class="dashes"></div>');
    $('#profile').css('background-image','none').removeClass("hasImage");  
    $('.info_field').prop('value',"");
    $('#profile').empty();
    $('#profile').append(dashes);
    $("#modalNewRoom").modal();
  })
})
function showModal(event){
  if($('.menu').data('toggled')){
    $('.menu').css({top:'100%'});
    $('.menu').data('toggled',false)
    return;
  }
 $(".modalContainer").empty();
var information=JSON.parse(decodeURI(event.target.getAttribute('data-info')));
var txt_colors="";
var arr_colors=information.style.colors;
var plates=$('<div class="plates"></div>');
for(x in arr_colors){
  x!=arr_colors.length-1?txt_colors+=arr_colors[x]+',':txt_colors+=arr_colors[x];
  var plate=$('<div class="plate">'+arr_colors[x]+'</div>')
  plates.append(plate);
} 
console.log(txt_colors)
 var modal1=$('<div class="modal fade" id="modalChangeProp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
                  <div class="modal-dialog cascading-modal modal-avatar modal-sm" role="document">\
                    <div class="row modal-content modal-container">\
                      <div class="col-sm-12 col-md-6 modal-header avatar-image">\
                        <img onerror="error(this)" src="room-images/' + information.path + '.jpg" alt="avatar" class="img-responsive rounded-image"/>\
                      </div>\
                      <div class="col-6 modal-body text-center mb-1">\
                          <div class="container-closeIcon" data-dismiss="modal"><i class="fa fa-times close-icon CloseModalInfo"></i></div>\
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
                              <div class="div-field info_field form-control col-6" id="div_colors"></div>\
                            </div>\
                        </div>\
                        <div class="modal-footer justify-content-center">\
                          <a type="submit" class="save-btn btn btn-success waves-effect waves-light">Save Changes\
                            <i class="far fa-gem ml-1 text-white"></i>\
                          </a>\
                          <a type="button" class="edit-btn btn btn-success waves-effect waves-light" >Edit</a>\
                        </div>\
                        <div class="loading-edit" id="loading-edit">\
                        <div class="editing">\
                        </div>\
                        <div>Save...</div>\
                      </div>\
                        <div id="snackbar2">your room has been updated </div>\
                      </div>\
                    </div>\
                  </div>\
                </div>') ;
             
  $(".modalContainer").append(modal1); 
  $('#div_colors').append(plates);
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
                                  <input type="text" id="txt_colors" class="info_field form-control form-control-sm validate ml-0 col-6" value='+txt_colors.replace(/\s/g, '')+'>\
                              </div> ');
        $('.fields-structure').append(edited_body);
        $('.edit-btn').data('taggled',true);
      });
      $('.save-btn').on('click',function(){  // save the changes on json site 
        if($('.edit-btn').data('taggled')){
          var txt_name=$('#txt_Name');
          var txt_colors=$('#txt_colors').prop('value').split(',');
          var txt_structure=$('#txt_structure');
          if(!(txt_name.prop('value')==""||txt_colors.length==0||txt_structure.prop('value')=="")){
            var index=availableRooms.findIndex((value)=>findRoom(value,information.id));
            information.name=txt_name.prop('value');
            information.structure=txt_structure.prop('value');
            information.style.colors=txt_colors;
            availableRooms[index]=information;
            event.target.setAttribute('data-info',encodeURI(JSON.stringify(information)));
            updateData(availableRooms);
            showUpdateLoader("loading-edit");
            setTimeout(() => {
              hideUpdateLoader("loading-edit");
              showSnackbar("snackbar2");
            }, 600);     
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
    var txt_Path=$('#profile').data('name');
    var txt_Name=$('#txt_Name').prop('value').toLowerCase();
    var txt_Structure=$('#txt_structure').prop('value').toLowerCase();
    var txt_styleID=$('#txt_StyleID').prop('value').toLowerCase();
    var txt_styleName=$('#txt_StyleName').prop('value').toLowerCase();
    var colors=$('#txt_Colors').prop('value').toLowerCase().split(',');
    if(txt_Name!=""&&txt_Path!=""&&txt_Structure!=""&&txt_styleID!=""&&txt_styleName!=""&&colors.length!=0){
      var newRoom={"id":availableRooms.length+1,"name":txt_Name,"structure":txt_Structure,"path":txt_Path,"style":{"id":txt_styleID,"name":txt_styleName,"colors":colors}};
      availableRooms[availableRooms.length]=newRoom;
      updateData(availableRooms);
      showUpdateLoader("loading-add");
      setTimeout(() => {
        hideUpdateLoader("loading-add");
        showSnackbar("snackbar1");
      }, 600);
      var newImage = $(
        '<div class="col-sm-6 col-md-4 col-lg-3">\
          <img onerror="error(this)" src="room-images/' + newRoom.path + '.jpg" alt= '+ newRoom.name+' " data-info='+encodeURI(JSON.stringify(newRoom))+" id="+newRoom.id+">\
        </div>");
        $("#container-images").append(newImage);
    }
  })
 
  $('.CloseModal').on('click',function(){
    $('#modalNewRoom').modal('hide');
  })
})
$(document).ready(function(){
  $('.logo').on('click',function(){
    resetFields();
  });
 
});
function error(obj){
obj.src="room-images/error.png";
}
getRooms();