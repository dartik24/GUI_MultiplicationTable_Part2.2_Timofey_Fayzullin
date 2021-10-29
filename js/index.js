/*
File: index.js
GUI Assignment: Creating a dynamic multiplication table.
Timofey Fayzullin, Umass Lowell Computer Science,
timofey_fayzullin@student.uml.edu
Copyright (c) 2021 by Timofey. All rights reserved. May be freely copid or
excerpted for educational purposes with credit to the author.
update by TF on October 4th, 2021 at 8:14 PM*/

function makeAchart(num){
//taking in values from input table and converting them into vars
  var fr = parseInt(document.getElementById('botr').value);
  var sr = parseInt(document.getElementById('topr').value);
  var fc = parseInt(document.getElementById('botc').value);
  var sc = parseInt(document.getElementById('topc').value);
//setting up table and error fields for the information to be inputed in
  var table = document.getElementById('tbl' + num);
//setting up temporary output and error fields
  var output="";
//linking 
  table.innerHTML=output;
//check for the table to be made no matter which input comes first
  if (fr > sr)
  {
    var t;
    t = fr;
    fr = sr;
    sr = t;
  }
  if (fc > sc)
  {
    var t;
    t = fc;
    fc = sc;
    sc = t;
  }
//check for values which should not be inputed as well as error message set up
  // if(fc > 100 || sr > 100 || fr > 100 || sc > 100 || fc < -100 || sc < -100 || fr < -100 || sr < -100 || isNaN(fc) || isNaN(fr) || isNaN(sc) || isNaN(sr))
  // {
  //   errid += "Please enter a valid number range between -100 and 100";
  //   err.innerHTML=errid;
  //   return;
  // }
//table generator
  for(var i=fr - 1; i<=sr; i++){
    output+="<tr>";
    for(var j=fc - 1; j<=sc; j++){
      if(i==fr-1 && j==fc-1)
      {
        output+="<th id=\"zer\">"+0+"</th>";
      }
      else
      {
        if(i==fr-1 || j==fc-1)
        {
          if(i==fr-1)
          {
            output+="<th id=\"col\">"+j+"</th>";
          }
          else
          {
            output+="<th id=\"row\">"+i+"</th>";
          }
        }
        else
        {
          output+="<td>"+i*j+"</td>";
        }
      }
    }
    output+="</tr>";
  }
  table.innerHTML=output;
  return [fr,sr,fc,sc];
}



$(document).ready(function(){
  $("#input").validate({
    rules:{
      botr:{
        required: true,
        number: true,
        valueCheck: true
      },
      topr:{
        required: true,
        number: true,
        valueCheck: true
      },
      botc:{
        required: true,
        number: true,
        valueCheck: true
      },
      topc:{
        required: true,
        number: true,
        valueCheck: true
      }
    },
    messages:{
      botr:{
        required: "This field can not be blank",
        number: "Please input a valid number"
      },
      topr:{
        required: "This field can not be blank",
        number: "Please input a valid number"
      },
      botc:{
        required: "This field can not be blank",
        number: "Please input a valid number"
      },
      topc:{
        required: "This field can not be blank",
        number: "Please input a valid number"
      }
    },
    errorLabelContainer: ".error"
  });

  $("#input").on('keyup blur', function(){
    if($("#input").validate().checkForm()){
      $('#clickMe').prop('disabled', false);
    }
    else{
      $('#clickMe').prop('disabled', true);
    }
  });

  $( "#botrSlider" ).slider({
    range: "max",
    min: -100,
    max: 100,
    value: 0,
    slide: function( event, ui ) {
      $( "#botr" ).val( ui.value );
      makeAchart(1);
    }
  });
  $( "#botr" ).val( $( "#botrSlider" ).slider( "value" ) );

  $( "#toprSlider" ).slider({
    range: "max",
    min: -100,
    max: 100,
    value: 10,
    slide: function( event, ui ) {
      $( "#topr" ).val( ui.value );
      makeAchart(1);
    }
  });
  $( "#topr" ).val( $( "#toprSlider" ).slider( "value" ) );

  $( "#botcSlider" ).slider({
    range: "max",
    min: -100,
    max: 100,
    value: 0,
    slide: function( event, ui ) {
      $( "#botc" ).val( ui.value );
      makeAchart(1);
    }
  });
  $( "#botc" ).val( $( "#botcSlider" ).slider( "value" ) );

  $( "#topcSlider" ).slider({
    range: "max",
    min: -100,
    max: 100,
    value: 10,
    slide: function( event, ui ) {
      $( "#topc" ).val( ui.value );
      makeAchart(1);
    }
  });
  $( "#topc" ).val( $( "#topcSlider" ).slider( "value" ) );

  $( "#tabs" ).tabs();

  $('#removeTabs').prop('disabled', true);
  $('#removeAll').prop('disabled', true);

  $("#clickMe").click(function() {

    var num_tabs = $("#tabs ul li").length + 1;

    $("#tabs ul").append(
        "<li><a href='#tab" + num_tabs + "'>" + num_tabs + "</a></li>"
    );

    $("#tabs").append(
      "<div id='tab" + num_tabs + "'>" + "<div id = 'tablediv'><table id='tbl" + num_tabs + "'></table></div>" + "</div>"
    );

    $("#tabs").tabs("refresh");

    $('#removeTabs').prop('disabled', false);
    $('#removeAll').prop('disabled', false);

    makeAchart(num_tabs);
  });

  $("#removeTabs").click(function () { 
    var tabIndex = $("#tabs .ui-tabs-panel:visible").attr("id");
    if(tabIndex != "tabs1"){ 
      $("#tabs").find(".ui-tabs-nav li a[href='#" + tabIndex + "']").parent().remove();  
      $("#tabs").find("div[id=" + tabIndex + "]").remove();   
      $("#tabs").tabs("refresh");
    }
    var num_tabs = $("#tabs ul li").length;
    if(num_tabs == 1){
      $('#removeTabs').prop('disabled', true);
      $('#removeAll').prop('disabled', true);
    }
  }); 

  $("#removeAll").click(function () { 
    var num_tabs = $("#tabs ul li").length;
    while(num_tabs > 1){ 
      $("#tabs").find(".ui-tabs-nav li a[href='#tab" + num_tabs + "']").parent().remove();  
      $("#tabs").find("div[id=tab" + num_tabs + "]").remove();   
      $("#tabs").tabs("refresh");
      num_tabs = num_tabs - 1;
    }
    $('#removeAll').prop('disabled', true);
    $('#removeTabs').prop('disabled', true);
  }); 
});


jQuery.validator.addMethod("valueCheck", function(value, element) {
  return this.optional(element) || (-100 <= value) && (value <= 100);
}, jQuery.validator.format("Please input a value between -100 & 100"));
