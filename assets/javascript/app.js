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
                gifImage.attr("src", results[i].images.fixed_height.url);
                // Prepend the rating and gif to the HTML
                gifDiv.prepend(p);
                gifDiv.prepend(gifImage);
                $("#gifs-appear-here").prepend(gifDiv);
            }
            
            console.log(response);
        });
    });
}
// Call renderGif to link initial buttons to Giphy API
renderGif();

// STEP FOUR: Pause/Play Gifs