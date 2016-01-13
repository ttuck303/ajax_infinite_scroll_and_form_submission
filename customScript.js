$().ready(function(){
  console.log("loaded");
  function grabTen(){
    $.ajax({
      url: "http://www.omdbapi.com/?", 
      data: {
        t: "saving private ryan"
      },
      dataType: "json",
      success: function( json ){
        alert("movie found successfully!");
        console.log(json);
        console.log(json["Title"]);
        $('body').append("<h1>"+json["Title"]+"</h1>");
        $('body').append("<p>"+json["Plot"]+"</p>");

      }, 
      error: function( xhr, status, errorThrown ){
        alert("movie could not be found");
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
      }, 
      type: "GET",
      complete: function( xhr, status ) {
        console.log(xhr);
        alert( "The request is complete!" );
      }
    })
  }
  grabTen();
})