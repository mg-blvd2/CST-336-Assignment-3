function getNameInfo(){
  $.ajax({
    url : "https://www.behindthename.com/api/lookup.json",
    method : "GET",
    dataType : "json",
    data : {
      "key" : "mi511471653",
      "name" : $("#inputName").val()
    },
    success : function(data){
      console.log(data);
      if(isDict(data)){
        errorMessage();
      } else {
      addNameInfo(data[0]);
    }
    },
    error : function(error){
      console.log(error);
    }
  })
}

function addNameInfo(dataDict){
  $("#nameInfo").html(`Name: ${dataDict.name}<br>`);
  $("#nameInfo").append("Gender: ");

  if(dataDict.gender === "m"){
    $("#nameInfo").toggleClass();
    $("#nameInfo").addClass("boyName");
    $("#nameInfo").append("Male");
  }else if(dataDict.gender === "mf" || dataDict.gender === "fm"){
    $("#nameInfo").toggleClass();
    $("#nameInfo").addClass("boyAndGirl");
    $("#nameInfo").append("Male and Female");
  } else {
    $("#nameInfo").toggleClass();
    $("#nameInfo").addClass("girlName");
    $("#nameInfo").append("Female");
  }
  $("#nameInfo").append("<br>");

  $("#nameInfo").append("Languages used in:<ul>")
  dataDict.usages.forEach((item) => {
    $("#nameInfo").append(`<li>${item.usage_full} - ${item.usage_gender}</li>`)
  });
  $("#nameInfo").append("</ul>")
}

function errorMessage(){
  $("#nameInfo").toggleClass();
  $("#nameInfo").addClass("errorMessage");
  $("#nameInfo").html("Name not found");
}

//Function isDict() referenced from link https://stackoverflow.com/questions/38304401/javascript-check-if-dictionary
//Author: user kofifus       Edited by: user dorintufar
function isDict(v) {
    return typeof v==='object' && v!==null && !(v instanceof Array) && !(v instanceof Date);
}
