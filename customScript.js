$().ready(function(){
  console.log("loaded");

  function grabMovie(search_param_type, param){
    console.log("searching for movie with params: " + search_param_type + ", " + param);
    var data = {};
    data[search_param_type] = param;
    if (search_param_type === 'i' || search_param_type === 't'){
      var body = $('body');
      $.ajax({
        beforeSend: function( xhr ) {
        },
        url: "http://www.omdbapi.com/?", 
        data,
        type: "movie",
        dataType: "json",
        success: function( json ){
          console.dir(json);
          checkSuccess(json);
          body.append("<div><h1>"+json["Title"]+"</h1><p>"+json["Plot"]+"</p><p>imdbRating: "+json["imdbRating"]+"</p>");
        }, 
        error: function( xhr, status, errorThrown ){
          console.log("movie could not be found");
          console.log( "Error: " + errorThrown );
          console.log( "Status: " + status );
          console.dir( xhr );
        }, 
        type: "GET",
        complete: function( xhr, status ) {
          console.log(xhr);
          console.log( "The request is complete!" );
        }
      })
    } else {
      console.log("Invalid search param type '"+search_param_type +"'.");
      console.log("Please use either 'i' for IMDB id or 't' for title.");
    }
  }

  function generateRandomIMDBId(){
    var rand = ('0000000' + Math.floor(Math.random()*3000000));
    console.log("rand step 1:" + rand);
    rand = "tt" + rand.substr(7);
    console.log("rand step 2 / final rand:" + rand);
    return rand;
  }

  for(var i = 0; i < 10; i++){
    grabMovie('i', generateRandomIMDBId());
  }

  function checkSuccess( json ){
    if (json["Response"] === "False"){
      console.log("bad movie detected");
    }
  }



  
  

  purgeBadResults();

})

function offParent(){
  $( this ).parent().remove();
}

function purgeBadResults(){
  console.log("purging");
  var headers = $('h1');
  $.each(headers, offParent());
}