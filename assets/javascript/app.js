$(document).ready(function() {

var searchedTopics = [];

 	function displaySearch() {

	var userSearch = $(this).data("search");
	console.log(userSearch);

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userSearch + "&api_key=dc6zaTOxFJmzC&limit=5";

	console.log(queryURL);

	$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	var results = response.data;
        	console.log(results);
        	for (var i = 0; i < results.length; i++) {
        	
        	var UserDiv = $("<div class='col-md-4'>");

        	var rating = results[i].rating;
        	var defaultAnimatedSrc = results[i].images.fixed_height.url;
        	var giphyImage = $("<img>");
            var text = $("<p>").text("Rating: " + rating);
            var staticSrc = results[i].images.fixed_height_still.url;

        	giphyImage.attr("src", staticSrc);
        	giphyImage.addClass("userSearchImage");
        	giphyImage.attr("data-state", "still");
        	giphyImage.attr("data-still", staticSrc);
        	giphyImage.attr("data-animate", defaultAnimatedSrc);
        	UserDiv.append(text);
        	UserDiv.append(giphyImage);
        	$("#displayArea").prepend(UserDiv);

        }
	});
}

 
	$("#addTopic").on("click", function(event) {
        event.preventDefault();
        var newTopic = $("#userSearch").val().trim();
        searchedTopics.push(newTopic);
        console.log(searchedTopics);
        $("#userSearch").val('');
        displayButtons();
      });


	function displayButtons() {
    $("#buttons").empty();
    for (var i = 0; i < searchedTopics.length; i++) {
      var userButtons = $('<button class="btn btn-primary">');
      userButtons.attr("id", "buttonsOfFun");
      userButtons.attr("data-search", searchedTopics[i]);
      userButtons.text(searchedTopics[i]);
      $("#buttons").append(userButtons);
    }
  }


  displayButtons();

  
  $(document).on("click", "#buttonsOfFun", displaySearch);

  
  $(document).on("click", ".userSearchImage", pausePlayGifs);

 
  function pausePlayGifs() {
  	 var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
  }
}

});

