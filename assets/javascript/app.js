// This .on("click") function will trigger the AJAX Call
$("#add-animal").on("click", function(event){
  // This will prevent the default behavior of the submit button
  event.preventDefault();
  
  // Create a variable to store the text from the input box
  var animal = $("#animal-input").val().trim();

  // Consturct the URL
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  animal + "&api_key=dc6zaTOxFJmzC&limit=10";
  
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  
  .then(function(response) {
    var results = response.data;

    for (var i = 0; i < results.length; i++){
    
      // Create a varialbe to store the still and animated version of each gif.
      var still = results[i].images.fixed_height_still.url;
      var animated = results[i].images.fixed_height.url

      // Create an element to have the gif displayed.
      var gifDisplay = $("<img>");
      gifDisplay.attr("src", still);

      // Create attributes to store the still and animated data of each gif.
      gifDisplay.attr("data-still", still);
      gifDisplay.attr("data-animate", animated);

      // Add the gif class for every image
      // gifDisplay.addClass("gif");

      // Create a variable to hold attributd to store the state of each gif.
      gifDisplay.attr("data-state", "still");

      // Display the gif.
      $("#gifs-appear-here").prepend(gifDisplay);

      // Create a variable to store the rating of each gif.
      var rating = results[i].rating;
      
      // Create an element to have the rating displayed.
      var ratingDisplay = $("<p>").text("Rating: " + rating);

      // Diplay the rating.
      $("#gifs-appear-here").prepend(ratingDisplay);

      console.log(results[i].rating);
      console.log("-");
    }
    console.log(response);
  });

});

// Create an on click that allows the user to PLAY/PAUSE the gif 

        // // Create attributes to store the still and animated data of each gif.
        // gifDisplay.attr("data-still", still);
        // gifDisplay.attr("data-animate", animated);

        // // Create a variable to hold attributd to store the state of each gif.
        // gifDisplay.attr("data-state", "still");

        $(".gif").on("click", function(){
          // Create a varialbe to store the state of the gif.
          var state = $(this).attr("data-state");
          console.log(state);
        })

          // // If the state of the gif is still...
          // if (state === "still"){

          //   // Change the source to the animated gif
          //   $(this).attr("src", $(this).attr("data-animate"));

          //   // Change the data-state variable to animate
          //   $(this).attr("data-state", "animated");
          // }

          // // If the state of the gif is animated
          // if (state === "animated"){

          //   // Change the source to the still gif
          //   $(this).attr("src", $(this).attr("data-still"));

          //   // Change the data-state variable to still
          //   $(this).attr("data-state", "still");
          // }
        // })