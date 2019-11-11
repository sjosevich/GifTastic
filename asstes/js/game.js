var topics = ["Cat", "Dog", "bird", "snake", "Elephant", " Horse", "Fish", "Wolf", "Hippopotamus",
"Whales", "Turtle", "Giraffe", "Zebra", "Rhinoceros", "Kangaroo", "Leopard", "Dolphin", "Otter", "Duck",
"Goat", "Aquirrel", "Raccoon", "Gorilla", "Shark", "Hyena", "Donkey", "Crocodile", "Eagle", "Lizard",
"Parrot", "Panda", "Swans", "Badger", "mouse"];

var TotalOfGIFs = 10;
var Rating = "PG";
var apiKey = 'Wfcc1mOPzPwqhaEwDIrhemBVhxJLvad0';

$(document).ready(function(){
	printButtons();
	$("#submit").on("click", function(){
		event.preventDefault();
		addButton($("#best-animals").val().trim());
		$("#best-animals").val("");
	});
});


function printButtons(){
	for(var i = 0; i < topics.length; i++) {
		var newButton = $("<button>");
		newButton.addClass("btn");
		newButton.addClass("animal-button");
		newButton.text(topics[i]);
		$("#button-container").append(newButton);
	}
	$(".animal-button").off("click");

	$(".animal-button").on("click", function(){
		$(".gif-image").off("click");
		$("#gif-container").empty();
		$("#gif-container").removeClass("dotted-border");
		printGift($(this).text());
	});

}

function addButton(show){
	if(topics.indexOf(show) === -1) {
		topics.push(show);
		$("#button-container").empty();
		printButtons();
	}
}

function printGift(selectedButtom){
	$.ajax({
        url: 'http://api.giphy.com/v1/gifs/search?q=' + selectedButtom + '&api_key=' + apiKey + '&limit=' + TotalOfGIFs,
		method: "GET"
	}).then(function(response){
		response.data.forEach(function(element){
			newDiv = $("<div>");
			newDiv.addClass("individual-gif-container");
			newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
			var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
			newImage.addClass("gif-image");
			newImage.attr("state", "still");
			newImage.attr("still-data", element.images.fixed_height_still.url);
			newImage.attr("animated-data", element.images.fixed_height.url);
			newDiv.append(newImage);
			$("#gif-container").append(newDiv);
		});
		
		$("#gif-container").addClass("dotted-border");
		$(".gif-image").off("click");
		$(".gif-image").on("click", function(){
			console.log("hola")
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