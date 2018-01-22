      // Initial array of movies
      var giphs = [];
      var giphButton = [];
      var giphySearch;
      var imageArray = [];
      var giphArray = [];
      var ratingArray = [];

      // Function for displaying movie data
      function renderButtons() {
        $("#giphy-button-div").empty();
        $("#giphy-label").empty();  //ug, can't clear the input field!!!
        for (i=0; i<giphs.length; i++) {

          var a = $("<button>");
          a.addClass("giphy-button");
          a.attr("data-name", giphs[i]);
          a.text(giphs[i]);
          $("#giphy-button-div").append(a);
        }
      }
      
      // This function handles events where the add movie button is clicked
      $("#add-giphy").on("click", function(event) {
        event.preventDefault();
        console.log ("add button pushed");
        var newGiph = $("#giphy-input").val();
        giphs.push(newGiph);
        $("#gihpy-input").val("");   //why doesn't this empty the field?
        renderButtons();
      });


      //function to do api call when button is clicked
      $(document).on("click", ".giphy-button", function() {
        $(".giph-container").empty();
        giphySearch = $(this).attr("data-name");
        // make a call to https (a secure site?)
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="+giphySearch+"&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax ({
        url: queryURL,
        method: "GET"
      }).done(function(response){
        for (i=0; i<10; i++) {
          var giphDiv = $("<div class='giph-div'>");
          ratingArray[i] = response.data[i].rating;
          var p = $("<p>").text("Rating: " + ratingArray[i]);
          imageArray[i] = response.data[i].images.fixed_height_still.url;
          giphArray[i] = response.data[i].images.fixed_height.url;
          var giph = $("<img>");
          giph.addClass("giph-still");
          giph.attr("item-number", i)
          giph.attr("src", imageArray[i]);
          giph.attr("alt", "Giph Image");
          giph.attr("text", response.data[i].rating);
          giphDiv.append(giph);
          giphDiv.prepend(p);
          $(".giph-container").append(giphDiv);
        }    
      });
    });

      //here we change the class of the div and change the source image to the .gif
      $(document).on("click", ".giph-still", function() {
          var index = $(this).attr("item-number");
          console.log ("item-number: " + index);
          $(this).removeClass("giph-still");
          $(this).addClass("giph");
          $(this).attr('src', giphArray[index]);
      });

      //here we change the class of the div and change the source image to a still
      $(document).on("click", ".giph", function() {
          var index = $(this).attr("item-number");
          console.log ("item-number: " + index);
          $(this).removeClass("giph");
          $(this).addClass("giph-still");
          $(this).attr('src', imageArray[index]);
      });      

      // Calling the renderButtons function to display the initial list of movies
      renderButtons();
