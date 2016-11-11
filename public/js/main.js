// // select
//   $(document).ready(function() {
//     $('select').material_select();
//   });


// swapi
var template = '<div class="col s12 m4">' +
						    '<div class="card horizontal hoverable">' +
						      	'<div class="card-stacked">' +
						        	'<div class="card-content amber white-text">' +
						          		'<p>Hi, my name is <strong>{{name}}</strong></p>' +
						        	'</div>' +
							        '<div class="card-action">' +
							          	'<a data-show-url="{{url}}" class="about">See more about me</a>' +
							        '</div>' +
							    '</div>' +
					    	'</div>' +
					  	'</div>';

var select ='<option data-species-url="{{url-species}}"><strong>{{species}}</strong></option>';

var peopleSpecie = '<div class="col s12 m6">'+
						          '<div class="card blue-grey darken-1">'+
						            '<div class="card-content white-text">'+
						              '<span class="card-title">My name is <strong>{{personajes}}</strong></span>'+
						              '<br>'+
													'<span>And I´m from <strong>{{especie-personaje}}</strong> specie</span>'+
						            '</div>'+
						          '</div>'+
						        '</div>';

$(document).ready(function(){
// species
	var optionSpecies = function(response){
		var people="";
		$.each(response.results, function(i, peoples){
			people += select
				.replace("{{species}}", peoples.name)
				.replace("{{url-species}}", peoples.people);
		});
		$("#species").html('<option value="" disabled selected>SPECIES</option>');
		$("#species").append(people);
		$("#species").change(function(e) {
			var optionArray = $("option");
			for (var i = 1; i < optionArray.length; i++){
				var data = optionArray[i].getAttribute("data-species-url");
				var split = data.split(",");
				for (var j=0; j<split.length;j++){
					var g = split[j];
					$.getJSON(g, function(response){
						var per="";
						per += peopleSpecie.replace("{{personajes}}", response.name);
						$("#people-species").append(per);
					});
				}
			}
		});
	}
	$.getJSON("http://swapi.co/api/species/", optionSpecies);



	// persons 
		// 	var optionArray = $("option");

		// for (var i = 1; i< optionArray.length; i++){
		// 	$(optionArray[i]).change(mostrarDatos);
		// 	// var dataSpeciesUrl = optionArray[i].getAttribute("data-species-url")
		// }
		// function mostrarDatos(){
		// 	var dataSpeciesUrl = optionArray[i].getAttribute("data-species-url").split(",");
		// 	for (var j = 0; j< dataSpeciesUrl.length;j++) {
		// 		var sumar = dataSpeciesUrl[j].slice(27,29);
		// 		var indice = sumar[0] + sumar[1];

		// 		var data = "http://swapi.co/api/people/" + indice + "/";
		// 		$.getJSON(data, function(response){
		// 			var per="";
		// 			per += peopleSpecie.replace("{{personajes}}", response.name);
		// 		});
		// 		$("#people-species").append(per);
		// 	}
		// 	// var indice = dataSpeciesUrl[0] + dataSpeciesUrl[1];
		// }






// personajes
	var formatResponse= function(response){	
		$("#total").text(response.results.length);
		var personajes="";
		$.each(response.results, function(i, personaje){
			personajes += template
				.replace("{{name}}", personaje.name)
				.replace("{{url}}", personaje.url);
		});
		$("#people").html(personajes);
		$("#next").attr("data-url", response.next);
		$("#previous").attr("data-url", response.previous);
		if (response.next){
			$("#previous").addClass("none");
			$("#next").removeClass("none");
		}
		if(response.previous){
			$("#previous").removeClass("none");
		}
		if (!response.next){
			$("#next").addClass("none");
		}
	}

	$.getJSON("http://swapi.co/api/people/", formatResponse);
	var siguiente = function(event){
		event.preventDefault();
		var url = $(this).attr("data-url");
		$.getJSON(url, formatResponse);
	}

	$("#next").click(siguiente);
	$("#previous").click(siguiente);

	$("#people").on("click", ".about", function(event){
		event.preventDefault();
		alert("hola");
	});
});





		// $("#species").change(function(e) {
		// 	var optionArray = $("option");
		// 	for (var i = 1; i < optionArray.length; i++){
		// 		var data = optionArray[i].getAttribute("data-species-url");
		// 		var split = data.split(",");
		// 		for (var j=0; j<split.length;j++){

		// 		}
		// 		$.getJSON(data, function(response){
		// 			var per="";
		// 			per += peopleSpecie.replace("{{personajes}}", response.name);
		// 			var a = "http://swapi.co/api/species/" + optionArray[i] + "/";
		// 			// if(response.species == a){
		// 			// 	$("#people-species").append(per);
		// 			// }
		// 			$("#people-species").append(per);
		// 		})
		// 	}
		// });