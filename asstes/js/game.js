var Movies = ["Cat", "Dog", "bird", "snake"];

var TotalOfGIFs = 10;
var Rating = "PG";
var apiKey = 'Wfcc1mOPzPwqhaEwDIrhemBVhxJLvad0';

$(document).ready(function(){
	printButtons();
	$("#submit").on("click", function(){
		event.preventDefault();
		addButton($("#best-movies").val().trim());
		$("#best-movies").val("");
	});
});


function printButtons(){
	for(var i = 0; i < Movies.length; i++) {
		var newButton = $("<button>");
		newButton.addClass("btn");
		newButton.addClass("movie-button");
		newButton.attr("background", "blue")
		newButton.text(Movies[i]);
		$("#button-container").append(newButton);
	}
	$(".movie-button").off("click");

	$(".movie-button").on("click", function(){
		$(".gif-image").off("click");
		$("#gif-container").empty();
		$("#gif-container").removeClass("dotted-border");
		populateGIFContainer($(this).text());
	});

}

function addButton(selectedButtom){
	if(Movies.indexOf(selectedButtom) === -1) {
        Movies.push(selectedButtom);
        console.log(Movies);
		$("#button-container").empty();
		printButtons();
	}
}

function populateGIFContainer(selectedButtom){
	$.ajax({
        url: 'http://api.giphy.com/v1/gifs/search?q=' + selectedButtom + '&api_key=' + apiKey + '&limit=' + TotalOfGIFs,
		method: "GET"
	}).then(function(response){
		for (var i=0; i<=10;i++){
			newDiv = $("<div>");
			newDiv.addClass("individual-gif-container");
			newDiv.append("<p>Rating: " + response.data[i].rating.toUpperCase() + "</p>");
			var newImage = $("<img src = '" + response.data[i].images.fixed_height_still.url + "'>");
			newImage.addClass("gif-image");
			newImage.attr("state", "still");
			newImage.attr("still-data", response.data[i].images.fixed_height_still.url);
			newImage.attr("animated-data", response.data[i].images.preview_gif.url);
			newDiv.append(newImage);
			$("#gif-container").append(newDiv);
		};
		
		$("#gif-container").addClass("dotted-border");
		$(".gif-image").off("click");
		$(".gif-image").on("click", function(){
			if($(this).attr("state") === "still") {
				$(this).attr("state", "animated");
				$(this).attr("src", $(this).attr("animated-data"));
			}
			else {
				$(this).attr("state", "still");
				$(this).attr("src", $(this).attr("still-data"));
			}
		});
	});
}












// $(document).ready(function(){

//     var listOfAnimals =['Lion','Cat','Dog','Bird','Bear'];
//     var results;
    
//     function printBtn() {
//         for (var i = 0; i < listOfAnimals.length; i++) {
//            var animal = listOfAnimals[i];
//            var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Wfcc1mOPzPwqhaEwDIrhemBVhxJLvad0&q=" +
//            animal + "&limit=10&offset=0&rating=G&lang=en";
//            var btn = document.createElement("button");
//            var t = document.createTextNode(animal);
//            btn.appendChild(t);
//            btn.id ="id"+i;
//            btn.className=animal;
//            document.body.appendChild(btn);
//            $.ajax({
//             url: queryURL,
//             method: "GET"
//           }).then(function(response) {
//             //console.log(response);
//             results = response.data
//             console.log(results);
            
//           })  
//         }
//     }
    
//     printBtn();

    // function buttonScript(results){
        
    //     console.log(results);
    //     for (var i = 0; i < results.length; i++) {
    //         var animalDiv = $('<div>')
    //         var p = $('<p>').text(`Rating: ${results[i].raiting}`) 
    //         var animalImage = $('<img>').attr('src', results[i].images.fixed_height.url) 
    //         animalDiv.prepend(p)
    //         animalDiv.append(animalImage)
    //         $('#gifs-appear-here').prepend(animalDiv)
    //     }    
    // }
    
//})