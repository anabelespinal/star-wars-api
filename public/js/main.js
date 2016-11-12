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
	var optionSpecies = function(respuestaEspecie){
		var tipoSpecie="";
		$.each(respuestaEspecie.results, function(i, nombredeEspecies){
			tipoSpecie += select
				.replace("{{species}}", nombredeEspecies.name)
				.replace("{{url-species}}", nombredeEspecies.people);
				// console.log(nombredeEspecies.people)
			$("#species").html('<option value="" disabled selected>SPECIES</option>');
			$("#species").append(tipoSpecie);

			var elementOption = $("optionn");
			$.each(elementOption, function(i, atributoUrl){
				var urls = $(atributoUrl).attr("data-species-url");
				var splitUrls = urls.split(",");
				$("#select").change(function(){
					$.each(splitUrls, function(i, url){
						$.getJSON(url, function(response){
							var div = "";
								if(response.species == respuestaEspecie.url){
									div += peopleSpecie.replace("{{personajes}}", response.name);
									$("#people-species").append()
							}
						})
					});
				});
			});


		});



					// $.getJSON(url, function(response){
					// 	var div = "";
					// 	$("#select").change(function(){
					// 		if(response.species == respuestaEspecie.url){
					// 			div += peopleSpecie.replace("{{personajes}}", response.name);
					// 			$("#people-species").append()
					// 		}
					// 	})
					// });



		// var elementOption  =$("option");

		// 	for (var i = 1; i < elementOption.length; i++){
		// 		var urls = $(elementOption[i]).attr("data-species-url");
		// 		var splitUrls = urls.split(",");
		// 			$.getJSON("http://swapi.co/api/people/", function(respuestaPersona){
		// 				for(var a = 0; a< splitUrls.length;a++){
		// 					var nombrePerson = "";
		// 					$.each(respuestaPersona.results, function(i, speciesUrl){
		// 						$("#select").change(function(){
		// 							if( speciesUrl.species == nombredeEspecies.url){
		// 								nombrePerson += peopleSpecie.replace("{{personajes}}", speciesUrl.name);
		// 								$("#people-species").append(nombrePerson);
		// 							}
		// 						});
		// 					});
		// 				}
		// 			});
		// 	}



		// $("#species").change(ff);
	}
	var s_p = "http://swapi.co/api/species/";
	$.getJSON(s_p, optionSpecies);
});




// personajes

$(document).ready(function(){
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









// mio

	// var optionSpecies = function(response){
	// 	var people="";
	// 	$.each(response.results, function(i, peoples){
	// 		people += select
	// 			.replace("{{species}}", peoples.name)
	// 			.replace("{{url-species}}", peoples.people);
	// 	});
	// 	$("#species").html('<option value="" disabled selected>SPECIES</option>');
	// 	$("#species").append(people);
	// 	$("#species").change(function(e) {
	// 		var optionArray = $("option");
	// 		for (var i = 1; i < optionArray.length; i++){
	// 			var data = optionArray[i].getAttribute("data-species-url");
	// 			var split = data.split(",");
	// 			for (var j=0; j<split.length;j++){
	// 				var urlsSpecies = split[j];
	// 				$.getJSON(urlsSpecies, function(response){
	// 					var per="";
	// 					per += peopleSpecie.replace("{{personajes}}", response.name);
	// 					$("#people-species").append(per);
	// 				});
	// 			}
	// 		}
	// 	});
	// }
	// $.getJSON("http://swapi.co/api/species/", optionSpecies);





	// 2
// 	$(document).ready(function(){
// 	var optionSpecies= function(response){
// 		var people = "";
// 		$.each(response.results, function(i, personajes){
// 			var dataUrl= "";
// 			var peopleUrl = "http://swapi.co/api/people/";
// 			$.each(personajes.people, function(i, url){
// 				console.log(url);
// 				dataUrl += url.replace(peopleUrl , "");
// 			});
// 			people += select
// 				.replace("{{species}}", personajes.name)
// 				.replace("{{data-species-url}}", dataUrl.substring(0, dataUrl.length-1));
// 		});
// 		$("#species").html('<option value="" disabled selected>SPECIES</option>');
// 		$("#species").append(people);
// 	}
// 	$.getJSON("http://swapi.co/api/species/", optionSpecies);
// });

// $(".row").on("change", "#species", function(){
// 	$("#people-species").html("");
// 	var numero = $(this).val().split("/");
// 	for (var i = 0; i<numero.length; i++){
// 		$.getJSON("http://swapi.co/api/people/"+numero[i]+"/", function(response){
// 			var tipoSpecie = peopleSpecie.replace("{{personajes}}", response.name);
// 			$("#people-species").append(tipoSpecie);
// 		});
// 	}
// });






// ultimo


		// var ff= function(){
		// 	var optionArray = $("option");
		// 	for (var i = 1; i < optionArray.length; i++){
		// 		var data = optionArray[i].getAttribute("data-species-url");
		// 		var split = data.split(",");
		// 		for (var j=0; j<split.length;j++){
		// 			var urlsSpecies = split[j];
		// 			$.getJSON(urlsSpecies, function(responseDos){
		// 				var per="";
		// 				per += peopleSpecie.replace("{{personajes}}", responseDos.name);
		// 				// $("#people-species").append(per);
		// 				$.getJSON(s_p, function(response){
		// 					$.each(response.results, function(i, ggg){
		// 						var hh = ggg.url;
		// 						var dd = responseDos.species;

		// 						if(hh == dd){
		// 							$("#people-species").append(per);
		// 						}
		// 					});
		// 				});
		// 			});
		// 		}
		// 	}
		// }