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
						            '</div>'+
						          '</div>'+
						        '</div>';

$(document).ready(function(){
	var optionSpecies = function(respuestaEspecie){
		$.each(respuestaEspecie.results, function(i, nombredeEspecies){
			var urlPersonas = "http://swapi.co/api/people/";	
			var urlP = nombredeEspecies.people;
			var completar = "";
			$.each(nombredeEspecies.people, function(i, link){
				completar += link.replace(urlPersonas, "").replace("/", ",");
			});
			$("#species").append('<option value="' + completar.slice(0, -1) + '" >' + nombredeEspecies.name + '</option>');
		});
	};
	$.getJSON("https://swapi.co/api/species/", optionSpecies);

	var tarjetasEspecie = function(response){
		var nombre = "";
		nombre += peopleSpecie.replace("{{personajes}}", response.name);
		$("#people-species").append(nombre);
	}

	$("#species").change(function(e){
		var cadena = $(this).val();
		var newcadena = cadena.split(",");
		$("#people-species").html("");
		for(var i = 0; i <newcadena.length; i++){
			var newLink = "https://swapi.co/api/people/" + newcadena[i] + "/";
			$.getJSON(newLink, tarjetasEspecie);
		}
	});


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