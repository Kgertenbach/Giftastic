$(document).ready(function() {
//Array for searched searchedTopics to be added
var searchedTopics = [];

	//Function with AJAX call to GIPHY; Q parameterc for API link set to search term, limit 10 results
  //Create div with respective still and animate image sources with "data-state", "data-still" and "data-animate" attributes
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

  //Submit button click event takes search term from form input, trims and pushes to searchedTopics array, displays button
	$("#addTopic").on("click", function(event) {
        event.preventDefault();
        var newTopic = $("#userSearch").val().trim();
        searchedTopics.push(newTopic);
        console.log(searchedTopics);
        $("#userSearch").val('');
        displayButtons();
      });

  //Function iterates through searchedTopics array to display button with array values in "buttons" section of HTML
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

  //Click event on button with id of "buttonsOfFun" executes displaySearch function
  $(document).on("click", "#buttonsOfFun", displaySearch);

  //Click event on gifs with class of "userSearchImage" executes pausePlayGifs function
  $(document).on("click", ".userSearchImage", pausePlayGifs);

  //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
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

