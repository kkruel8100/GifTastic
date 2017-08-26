//Host: api.giphy.com
//Path: GET /v1/gifs/search
//Description: Search all GIPHY GIFs for a word or phrase. Punctuation will be stripped and ignored. Use a plus or url encode for phrases. 
//Required parameters: api_key and q (search query term or phrase)


// "document.ready" makes sure that our JavaScript doesn't get run until the HTML document is finished loading.
$(document).ready(function() {

	var extremeSports = ["skateboarding", "wingsuit sky diving", "base jumping", "snowboard", "motocross", "free running", "bmx", "extreme sports", "rafting", "bungee jumping", "american ninja warrior", "kung fu"];


	//function to create button for extremeSports array
	function buttons () {

		//to empty buttons div when adding new button
		$("#buttons").empty();

		for (i=0; i<extremeSports.length; i++) {
			$("#buttons").append("<button data-sport='" + extremeSports[i] + "'>" + extremeSports[i] + "</button>");
		}
	}

	//function to clear gifs div 
	function clearGifs () {
		$("#gifs").empty();
	}

	buttons();

	//function to get 10 gifs for the button clicked
	$(document).on("click", "button", function() {
			
		clearGifs();

		var apikey = "4e4b50b6f0314f829c0063e9ff1db0cc";
		var numResults = 10;
		extremeSports = $(this).attr("data-sport");
		var extremeSports = extremeSports.replace(/ /g, "+");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + extremeSports + "&limit=" + numResults + "&api_key=" + apikey;
		 	
		$.ajax({
           url: queryURL,
           method: "GET"
        })//end of ajax
	 	.done(function(response) {
            var results = response.data;

            for (i=0; i<results.length; i++) {
            	var sportDiv = $("<div class='item'>");
            	var rating = results[i].rating;
            	var p = $("<p>").text("Rating: " + rating);
            	var sportImage = $("<img>");
            	sportImage.addClass("giphy");
            	sportImage.attr("src", results[i].images.fixed_height_still.url);
            	sportImage.attr("data-still", results[i].images.fixed_height_still.url);
            	sportImage.attr("data-animate", results[i].images.fixed_height.url)
            	sportImage.attr("data-state", "still");
            	sportDiv.prepend(p);
            	sportDiv.prepend(sportImage);

            	$("#gifs").prepend(sportDiv);

            }

 		});//end of response
	}); //end of on click for button	

	//function to switch gif from still to animate on click
	$("#gifs").on("click", ".giphy", function() {	
		
		var state = $(this).attr("data-state");

		if (state==="still") {
        	$(this).attr("src", $(this).attr("data-animate"));
          	$(this).attr("data-state", "animate");
      	}
      	else {
        	$(this).attr("src", $(this).attr("data-still"));
  			$(this).attr("data-state", "still");
        }

	});//end of on click for gif

	//function to take user input to add a sport
	$("#addSport").on("click", function(event) {
	
		event.preventDefault();

		var sport = $("#sports-input").val().trim().toLowerCase();

		if (sport.length===0) {
			alert("Please enter in sport");
		}
		else {
			if (jQuery.inArray(sport,extremeSports) == -1) {
				extremeSports.push(sport);
      		buttons();
			}
			else {
				alert("This sport has already been added");
			}

		}		
		$("#sports-input").val("");
		
		console.log("can you see me");

   });//end of on click for add a sport

});//document ready