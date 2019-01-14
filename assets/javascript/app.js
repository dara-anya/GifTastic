var topics = ["rabbit", "meerkat", "penguin"];

// STEP ONE: Create buttons for each topic
function renderButtons(){
    // Empty the HTML of buttons
    $("#buttons-view").empty();
    // Interate through topics array
    for (i = 0; i < topics.length; i++){
        // Create a button for each topic
        var button = $("<button>");
        // Add animal class to each button.
        button.addClass("animal");
        // Add a data-name attribute with the value equal to the animal's name
        button.attr("data-name", topics[i]);
        console.log(button.attr("data-name"));
        // Add text to the button that is the animal's name
        button.text(topics[i]);
        // Add the button to the HTML
        $("#buttons-view").append(button);
    }
}
// Call renderButtons to display initial buttons
renderButtons();

// STEP TWO: Add buttons
$("#add-animal").on("click", function(event){
    // Prevent default behavior of submission button
    event.preventDefault();
    // Create a variable to store user input
    var userAnimal = $("#animal-input").val().trim();
    // Push userAnimal to topic array
    topics.push(userAnimal);
    // Run renderButton to create a button for userAnimal
    renderButtons();
    // Run renderGif to link userAnimal button to Giphy API
    renderGif();
});

// STEP THREE: Link Giphy API to buttons
function renderGif(){
    $("button").on("click", function(){
        // Create a variable to store the data-name of the button
        var animal = $(this).attr("data-name");
        // Construct the URL to access Giphy API
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        // Call the API to get information
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){ 
            // Create a variable to store API information
            var results = response.data;
            // Iterate through results
            for (i = 0; i < results.length; i++){
                //Create a div element for each result
                var gifDiv = $("<div>");
                // Create a variable to store the rating information for each gif
                var rating = results[i].rating;
                //Create a p element to display each rating
                var p = $("<p>").text("Rating: " + rating);
                // Create an img tag to store the each gif
                var gifImage = $("<img>");
                // Create a source attribute for each gifImage with the value equal to the gif's URL
                gifImage.attr("src", results[i].images.fixed_height_still.url);
                // Prepend the rating and gif to the HTML
                gifDiv.prepend(p);
                gifDiv.prepend(gifImage);
                $("#gifs-appear-here").prepend(gifDiv);

                /* THE FOLLOWING CODE IS TO BE USED IN STEP FOUR: PAUSE/PLAY GIFS*/
                // Add a gif class for each image
                gifImage.addClass("gif");
                // Create a variable to store the still and animated URL of each gif
                var still = results[i].images.fixed_height_still.url;
                var animated = results[i].images.fixed_height.url;
                // Create data attributes to store the still and animated URL of each gif
                gifImage.attr("data-still", still);
                gifImage.attr("data-animate", animated);
                // Create a data atribute to identify the gif state that is displayed (still or animated)
                gifImage.attr("data-state", "animated");
            }

            // STEP FOUR: Pause/Play gifs
            $(".gif").on("click", function(){
              // Create a variable to store the state of the gif
              var state = $(this).attr("data-state");
              console.log(state);
              // If the state of the gif is animated
              if (state === "animated"){
                // Update the animated URL source to the still URL (data-still)
                $(this).attr("src", $(this).attr("data-still"));
                // Update the data-state to still
                $(this).attr("data-state", "still");
              }
              // If the state of the gif is still
              if (state === "still"){
                // Update the still URL source to the animated URL (data-animate)
                $(this).attr("src", $(this).attr("data-animate"));
                // Update the data-state to animated
                $(this).attr("data-state", "animated");
              }
            })
            console.log(response);
        });
    });
}
// Call renderGif to link initial buttons to Giphy API
renderGif();