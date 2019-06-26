/*function buildQueryURL() {
  var titleKeyword = 

  var ingredientKeyword =
    "i=" +
    $("#ingredient-input")
      .val()
      .trim();



  var queryURL =
    "https://www.themealdb.com/api/json/v1/1/filter.php?" +
    ingredientKeyword +
    "&&" +
    category;
  console.log(queryURL);
  return queryURL;
}*/

var mealID = "";

$("#search-btn-ingredient").on("click", function() {
  var ingredientKeyword =
    "i=" +
    $("#ingredient-input")
      .val()
      .trim();
  var queryURL =
    "https://www.themealdb.com/api/json/v1/1/filter.php?" + ingredientKeyword;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var randomRecipe = Math.floor(Math.random() * response.meals.length);
    mealID = response.meals[randomRecipe].idMeal;
    var idURL =
      "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealID;
    $.ajax({
      url: idURL,
      method: "GET"
    }).then(function(response) {
      // Printing the entire object to console
      console.log(response);

      // Constructing HTML containing the artist information
      var title = response.meals[0].strMeal;
      var directions = response.meals[0].strInstructions;
      var imageURL = response.meals[0].strMealThumb;

      var measuresArray = [
        response.meals[0].strMeasure1 + " " + response.meals[0].strIngredient1,
        response.meals[0].strMeasure2 + " " + response.meals[0].strIngredient2,
        response.meals[0].strMeasure3 + " " + response.meals[0].strIngredient3,
        response.meals[0].strMeasure4 + " " + response.meals[0].strIngredient4,
        response.meals[0].strMeasure5 + " " + response.meals[0].strIngredient5,
        response.meals[0].strMeasure6 + " " + response.meals[0].strIngredient6,
        response.meals[0].strMeasure7 + " " + response.meals[0].strIngredient7,
        response.meals[0].strMeasure8 + " " + response.meals[0].strIngredient8,
        response.meals[0].strMeasure9 + " " + response.meals[0].strIngredient9,
        response.meals[0].strMeasure10 +
          " " +
          response.meals[0].strIngredient10,
        response.meals[0].strMeasure11 +
          " " +
          response.meals[0].strIngredient11,
        response.meals[0].strMeasure12 +
          " " +
          response.meals[0].strIngredient12,
        response.meals[0].strMeasure13 +
          " " +
          response.meals[0].strIngredient13,
        response.meals[0].strMeasure14 +
          " " +
          response.meals[0].strIngredient14,
        response.meals[0].strMeasure15 +
          " " +
          response.meals[0].strIngredient15,
        response.meals[0].strMeasure16 +
          " " +
          response.meals[0].strIngredient16,
        response.meals[0].strMeasure17 +
          " " +
          response.meals[0].strIngredient17,
        response.meals[0].strMeasure18 +
          " " +
          response.meals[0].strIngredient18,
        response.meals[0].strMeasure19 +
          " " +
          response.meals[0].strIngredient19,
        response.meals[0].strMeasure20 + " " + response.meals[0].strIngredient20
      ];

      console.log(title);
      console.log(directions);
      console.log(measuresArray);
      $("#title").empty();
      $("#ingredients-list").empty();
      $("#directions").empty();

      for (i = 0; i < measuresArray.length; i++) {
        if (measuresArray[i] !== " ") {
          $("#ingredients-list").append($("<li>" + measuresArray[i] + "</li>"));
        }
      }

      // Empty the contents of the artist-div, append the new artist content

      $("#title").text(title);
      $("#directions").text(directions);
      $("#recipe-image").css("background", "url(" + imageURL + ")");
    });
  });
});

$("#search-btn-category").on("click", function() {
  var category = "c=" + $("#category-input").val();
  var queryURL =
    "https://www.themealdb.com/api/json/v1/1/filter.php?" + category;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var randomRecipe = Math.floor(Math.random() * response.meals.length);
    mealID = response.meals[randomRecipe].idMeal;
    var idURL =
      "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealID;
    $.ajax({
      url: idURL,
      method: "GET"
    }).then(function(response) {
      // Printing the entire object to console
      console.log(response);

      // Constructing HTML containing the artist information
      var title = response.meals[0].strMeal;
      var directions = response.meals[0].strInstructions;
      var imageURL = response.meals[0].strMealThumb;

      var measuresArray = [
        response.meals[0].strMeasure1 + " " + response.meals[0].strIngredient1,
        response.meals[0].strMeasure2 + " " + response.meals[0].strIngredient2,
        response.meals[0].strMeasure3 + " " + response.meals[0].strIngredient3,
        response.meals[0].strMeasure4 + " " + response.meals[0].strIngredient4,
        response.meals[0].strMeasure5 + " " + response.meals[0].strIngredient5,
        response.meals[0].strMeasure6 + " " + response.meals[0].strIngredient6,
        response.meals[0].strMeasure7 + " " + response.meals[0].strIngredient7,
        response.meals[0].strMeasure8 + " " + response.meals[0].strIngredient8,
        response.meals[0].strMeasure9 + " " + response.meals[0].strIngredient9,
        response.meals[0].strMeasure10 +
          " " +
          response.meals[0].strIngredient10,
        response.meals[0].strMeasure11 +
          " " +
          response.meals[0].strIngredient11,
        response.meals[0].strMeasure12 +
          " " +
          response.meals[0].strIngredient12,
        response.meals[0].strMeasure13 +
          " " +
          response.meals[0].strIngredient13,
        response.meals[0].strMeasure14 +
          " " +
          response.meals[0].strIngredient14,
        response.meals[0].strMeasure15 +
          " " +
          response.meals[0].strIngredient15,
        response.meals[0].strMeasure16 +
          " " +
          response.meals[0].strIngredient16,
        response.meals[0].strMeasure17 +
          " " +
          response.meals[0].strIngredient17,
        response.meals[0].strMeasure18 +
          " " +
          response.meals[0].strIngredient18,
        response.meals[0].strMeasure19 +
          " " +
          response.meals[0].strIngredient19,
        response.meals[0].strMeasure20 + " " + response.meals[0].strIngredient20
      ];

      console.log(title);
      console.log(directions);
      console.log(measuresArray);
      $("#title").empty();
      $("#ingredients-list").empty();
      $("#directions").empty();

      for (i = 0; i < measuresArray.length; i++) {
        if (measuresArray[i] !== " ") {
          $("#ingredients-list").append($("<li>" + measuresArray[i] + "</li>"));
        }
      }

      // Empty the contents of the artist-div, append the new artist content

      $("#title").text(title);
      $("#directions").text(directions);
      $("#recipe-image").css("background", "url(" + imageURL + ")");
    });
  });
});

$("#random-btn").on("click", function() {
  var randomURL = "https://www.themealdb.com/api/json/v1/1/random.php";

  $.ajax({
    url: randomURL,
    method: "GET"
  }).then(function(response) {
    // Printing the entire object to console
    console.log(response);

    // Constructing HTML containing the artist information
    var title = response.meals[0].strMeal;
    var directions = response.meals[0].strInstructions;
    var imageURL = response.meals[0].strMealThumb;

    var measuresArray = [
      response.meals[0].strMeasure1 + " " + response.meals[0].strIngredient1,
      response.meals[0].strMeasure2 + " " + response.meals[0].strIngredient2,
      response.meals[0].strMeasure3 + " " + response.meals[0].strIngredient3,
      response.meals[0].strMeasure4 + " " + response.meals[0].strIngredient4,
      response.meals[0].strMeasure5 + " " + response.meals[0].strIngredient5,
      response.meals[0].strMeasure6 + " " + response.meals[0].strIngredient6,
      response.meals[0].strMeasure7 + " " + response.meals[0].strIngredient7,
      response.meals[0].strMeasure8 + " " + response.meals[0].strIngredient8,
      response.meals[0].strMeasure9 + " " + response.meals[0].strIngredient9,
      response.meals[0].strMeasure10 + " " + response.meals[0].strIngredient10,
      response.meals[0].strMeasure11 + " " + response.meals[0].strIngredient11,
      response.meals[0].strMeasure12 + " " + response.meals[0].strIngredient12,
      response.meals[0].strMeasure13 + " " + response.meals[0].strIngredient13,
      response.meals[0].strMeasure14 + " " + response.meals[0].strIngredient14,
      response.meals[0].strMeasure15 + " " + response.meals[0].strIngredient15,
      response.meals[0].strMeasure16 + " " + response.meals[0].strIngredient16,
      response.meals[0].strMeasure17 + " " + response.meals[0].strIngredient17,
      response.meals[0].strMeasure18 + " " + response.meals[0].strIngredient18,
      response.meals[0].strMeasure19 + " " + response.meals[0].strIngredient19,
      response.meals[0].strMeasure20 + " " + response.meals[0].strIngredient20
    ];

    console.log(title);
    console.log(directions);
    console.log(measuresArray);
    $("#title").empty();
    $("#ingredients-list").empty();
    $("#directions").empty();

    for (i = 0; i < measuresArray.length; i++) {
      if (measuresArray[i] !== " ") {
        $("#ingredients-list").append($("<li>" + measuresArray[i] + "</li>"));
      }
    }

    // Empty the contents of the artist-div, append the new artist content

    $("#title").text(title);
    $("#directions").text(directions);
    $("#recipe-image").css("background", "url(" + imageURL + ")");
  });
});
