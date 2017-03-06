clicktailApp = {};

// Regular Properties
clicktailApp.alcohol = "";
clicktailApp.flavour = "";
clicktailApp.difficulty = "";
clicktailApp.coolness = 0;

// Option Properties
clicktailApp.alcoholOptions = ['rum', 'gin', 'whisky', 'vodka'];
clicktailApp.flavourOptions = ['sweet', 'bitter', 'sour'];
clicktailApp.difficultyOptions = ['amateaur', 'alright', 'pro'];
clicktailApp.cocktailOptions = [];

// Error properties
clicktailApp.allInputsError = false;
clicktailApp.alcoholInputError = false;
clicktailApp.flavourInputError = false;
clicktailApp.difficultyInputError = false;
clicktailApp.noErrors = false;

// Keys
clicktailApp.apiKey = '22981353ba0adfcf1928128e4a1e73a4';
clicktailApp.apiId = '046e426b';

clicktailApp.changeClasses = function(array,idname){
	// Remove and Adds 'active' and 'unactive' classes. 
	array.forEach(function(alcohol){
		if(alcohol === idname){
			var alcoholChosenId = `#${idname}`;
			$(alcoholChosenId).removeClass("unactive");
			
			if($(alcoholChosenId).hasClass("active")){
				$(alcoholChosenId).toggleClass("active");
				$(alcoholChosenId).addClass("unactive");
			}else{
				$(alcoholChosenId).addClass("active");
			}
		} else{
			var alcoholOtherId = `#${alcohol}`;
			$(alcoholOtherId).removeClass("active");
			
			if(!$(alcoholOtherId).hasClass("unactive")){
				$(alcoholOtherId).addClass("unactive");
			}
		}
	});
}

clicktailApp.assignActiveClass = function(){
	// Changes classes of chosen element.
	$('input').on('click', function(){
		var $inputId = $(this).attr('id');
		if($.inArray($inputId, clicktailApp.alcoholOptions) !== -1){
			clicktailApp.changeClasses(clicktailApp.alcoholOptions, $inputId);
		} else if ($.inArray($inputId, clicktailApp.flavourOptions) !== -1){
			clicktailApp.changeClasses(clicktailApp.flavourOptions, $inputId);
		} else if ($.inArray($inputId, clicktailApp.difficultyOptions) !== -1){
			clicktailApp.changeClasses(clicktailApp.difficultyOptions, $inputId);
		}
	});
};

// E R R O R S (Inputs)

clicktailApp.inputsEmpty = function(){
	// Checks if all inputs have been filled
	const alcohols = clicktailApp.alcohol;
	const flavour = clicktailApp.flavour;
	const difficulty = clicktailApp.difficulty;

	if(alcohols === "" && flavour === "" && difficulty === ""){
		return true;
	}else{
		return false;
	}
}

clicktailApp.alcoholEmpty = function(){
	// Checks if alcohol input is empty
	const alcohols = clicktailApp.alcohol;

	if(alcohols === ""){
		return true;
	}else{
		return false;
	}
}

clicktailApp.flavourEmpty = function(){
	// Checks if flavour input is empty
	const flavour = clicktailApp.flavour;
	if(flavour === ""){
		return true;
	}else{
		return false;
	}
}

clicktailApp.difficultyEmpty = function(){
	// Checks if difficulty input is empty
	const difficulty = clicktailApp.difficulty;
	if(difficulty === ""){
		return true;
	}else{
		return false;
	}
}

clicktailApp.inputErrors = function(){
	if(clicktailApp.inputsEmpty()){
		clicktailApp.allInputsError = true;
	} else {
		if(clicktailApp.alcoholEmpty()){
			clicktailApp.alcoholInputError = true;
		}

		if(clicktailApp.flavourEmpty()){
			clicktailApp.flavourInputError = true;
		}

		if(clicktailApp.difficultyEmpty()){
			clicktailApp.difficultyInputError = true;
		}
	}
}

clicktailApp.displayErrors = function(){
	$('.mainContent').html();
	$('.mainContent').css("background-image", "none");
	$('.mainContent').addClass('error');

	if(clicktailApp.allInputsError === true){
		$('.mainContent').append('<h2> <span>Por Favor</span> , enter info... <h2>').addClass("allErrors");
	}

	if(clicktailApp.difficultyInputError === true){
		$('.mainContent').append('<h2> Oh no! forgot <span>Difficulty? </span><h2>').addClass("difficultyError");
	}

	if(clicktailApp.alcoholInputError === true){
		$('.mainContent').append('<h2> What!? no <span>Booze!?</span> <h2>').addClass("alcoholError");
	}

	if(clicktailApp.flavourInputError === true){
		$('.mainContent').append('<h2> <span>Flavourless?</span> ...nah, choose one please! <h2>').addClass("inputError");
	}

	$('.mainContent').append('<button id="reset"> Back </button>');
	$("#reset").click(function(){
		document.location.reload(true);
	});
}

clicktailApp.checkInputErrors = function(){
	clicktailApp.inputErrors();
	if(clicktailApp.allInputsError === false && clicktailApp.difficultyInputError === false && clicktailApp.alcoholInputError === false && clicktailApp.flavourInputError === false){
		clicktailApp.noErrors = true;
	} else {
		clicktailApp.displayErrors();
	}
}

// Getting Filters

clicktailApp.setCoolness = function(coolness){
	const valueCool = Math.ceil(coolness / 10);
	coolness = valueCool;
	return coolness;
}

clicktailApp.setDifficulty = function(difficulty){
	if(difficulty === "amateaur"){
		return 300;
	} else if(difficulty === "alright"){
		return 900;
	} else if(difficulty === "pro"){
		return 1600;
	}
}

clicktailApp.getInputs = function(){

	clicktailApp.alcoholOptions.forEach(function(alcohol){
		if($(`#${alcohol}`).hasClass("active") === true){
			clicktailApp.alcohol = alcohol;
		}
	});

	clicktailApp.flavourOptions.forEach(function(flavour){
		if($(`#${flavour}`).hasClass("active") === true){
			clicktailApp.flavour = flavour;
		}
	});

	clicktailApp.difficultyOptions.forEach(function(difficulty){
		if($(`#${difficulty}`).hasClass("active") === true){
			clicktailApp.difficulty = difficulty;
		}
	});
	
	clicktailApp.coolness = $('#coolness').val();
}

clicktailApp.noDrinksAvailable = function(){
	$('.mainContent').css({
		"display": "flex",
		"justify-content": "center",
		"align-items": "center"
	});
	$('.mainContent').append('<h2> <span>Sorry</span></h2></br> <h2>Cocktail NOT available</h2>').addClass("error");
}

// DISPLAY functions

clicktailApp.displayDrinks = function(){
	if (clicktailApp.noErrors === true){
		$(".mainContent").html();
		$(".mainContent").css("background-image", "none");
		if(clicktailApp.cocktailOptions.length === 0){
			clicktailApp.noDrinksAvailable();
		} else if(clicktailApp.cocktailOptions.length > 1){
			$('.mainWrapper').css("height", "auto");
			$(".mainContent").addClass("displayCocktails");
			$('.displayCocktails').css({
				"margin-top":"20px",
				"display": "flex",
				"flex-direction":"row",
				"flex-wrap":"wrap",
				"justify-content":"center",
				"align-items":"center"
			});
			clicktailApp.cocktailOptions.forEach(function(cocktail){
				var cocktailImage = `<img src="${cocktail.imageUrlsBySize[90]}" alt="">`
				var cocktailName = cocktail.recipeName;
				var finalCocktailName = cocktailName.replace("Cocktail", "");
				var twoWords = finalCocktailName.split(" ", 2);
				var finalName = twoWords[0] +" "+ twoWords[1];
				var cocktailTitle = `<h3>${finalName}</h3>`
				var recipeUrl = `http://www.yummly.com/recipe/${cocktail.id}`;
				var recipeDirection = `<a href="${recipeUrl}" target="_blank"> Recipe </a>`;
				$(".displayCocktails").append(`<div>${cocktailImage}${cocktailTitle}</br>${recipeDirection}</div>`);
				
				if($(window).width() < 767)
				    {
				    	$(".displayCocktails div").css({
				    		"display":"flex",
				    		"flex-direction":"column",
				    		"justify-content":"center",
				    		"align-items": "center",
				    		"width":"90%",
				    		"margin-bottom":"20px"
				    	});
				    } else {
				        $(".displayCocktails div").css({
				        	"display":"flex",
				        	"flex-direction":"column",
				        	"justify-content":"center",
				        	"align-items": "center",
				        	"width":"25%",
				        	"margin-bottom":"20px"
				        });
				    }

				$(".displayCocktails div a").css({
					"text-decoration":"none",
					"color": "#35374E",
					"padding":"5px",
					"border":"2px solid #35374E",
					"background-color":"white",
					"text-align":"center"
				});

				$(".displayCocktails img").css({
					"border-radius":"70px",
					"height":"150px",
					"width": "150px"
				});

				$(".displayCocktails h3").css({
					"font-size":"20px",
					"margin-left":"10px"
				});
			});
		}else{
			console.log("something is wrong?");
		}
		$('.mainContent').append('<button id="reset"> Back </button>');
		// $("#reset").css("margin": "0 auto");
		$("#reset").click(function(){
			document.location.reload(true);
		});

	} else{
		return false;
	}
}

// Main Program Function
clicktailApp.getDrinks = function(){
	// Assign values to alcohol, flavour, difficulty, and coolness
	$('#submit').on("click", function(){
		
		$('#submit').remove();
		clicktailApp.getInputs();

		clicktailApp.checkInputErrors();

		const coolnessVal = clicktailApp.setCoolness(clicktailApp.coolness);
		const alcoholVal = `cocktail+${clicktailApp.alcohol}`;
		const flavourVal = `flavor.${clicktailApp.flavour}.min`;
		const difficultyVal = clicktailApp.setDifficulty(clicktailApp.difficulty);
		const qEntry = alcoholVal;

		$.ajax({
			url: 'http://api.yummly.com/v1/api/recipes',
			type: 'GET',
			dataType: 'jsonp',
			data: {
				format: 'jsonp',
				_app_id: clicktailApp.apiId,  
				_app_key: clicktailApp.apiKey,
				q: alcoholVal,
				[flavourVal]: 0.8,
				requirePictures: true,
				maxResult: 1000,
				maxTotalTimeInSeconds: difficultyVal,
			}
		}).then(function(data){
			var results = data.matches;
			results.forEach(function(drink){
				if(drink.rating === coolnessVal){
					if(clicktailApp.cocktailOptions.length < 10){
						clicktailApp.cocktailOptions.push(drink);
					}
				}
			});
		clicktailApp.displayDrinks();
		});
	});
}

clicktailApp.init = function(){
	clicktailApp.assignActiveClass();
	clicktailApp.getDrinks();
};

$(function(){
  clicktailApp.init();
});