var mealID = "";
var recipe;
var protein = 0;
var carbs = 0;
var fat = 0;

var emptyInfo = function() {
  $("#title").empty();
  $("#ingredients-list").empty();
  $("#directions").empty();
  $("#cal").empty();
  $("#fat").empty();
  $("#satfat").empty();
  $("#chol").empty();
  $("#sodium").empty();
  $("#carb").empty();
  $("#fiber").empty();
  $("#sugar").empty();
  $("#protein").empty();
  $("#chart-container").empty();
};

var infoNotAvailable = function() {
  $("#cal").text("Not Available");
  $("#protein").text("Not Available");
  $("#carb").text("Not Available");
  $("#fat").text("Not Available");
  $("#satfat").text("Not Available");
  $("#chol").text("Not Available");
  $("#sodium").text("Not Available");
  $("#fiber").text("Not Available");
  $("#sugar").text("Not Available");
};

var printNutrients = function(nutrients, macro, id, unit) {
  var chartMacro = 0;
  if (nutrients[macro]) {
    if (macro === "PROCNT" || macro === "FAT" || macro === "CHOCDF") {
      chartMacro = Math.round(nutrients[macro].quantity / 4);
    }
    $(`#${id}`).text(Math.round(nutrients[macro].quantity / 4) + unit);
    return chartMacro;
  } else {
    $(`#${id}`).text("0" + unit);
  }
};

var makeChart = function() {
  var newCanvas = $("<canvas>").attr({
    id: "macroChart",
    height: "400px",
    width: "400px"
  });

  $("#chart-container").append(newCanvas);
  var ctx = document.getElementById("macroChart").getContext("2d");
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "pie",

    // The data for our dataset
    data: {
      labels: ["Protein", "Carbs", "Fat"],
      datasets: [
        {
          data: [protein, carbs, fat],
          backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"]
        }
      ]
    },

    // Configuration options go here
    options: {}
  });
};

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
      emptyInfo();

      for (i = 0; i < measuresArray.length; i++) {
        if (measuresArray[i] !== " " && measuresArray[i] !== "null null") {
          $("#ingredients-list").append($("<li>" + measuresArray[i] + "</li>"));
        }
      }

      recipe = {
        title: title,
        prep: "",
        yield: 4,
        ingr: measuresArray.filter(function(item) {
          return item !== " ";
        })
      };

      //Create the XHR object.
      function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
          // XHR for Chrome/Firefox/Opera/Safari.
          xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
          // XDomainRequest for IE.
          xhr = new XDomainRequest();
          xhr.open(method, url);
        } else {
          // CORS not supported.
          xhr = null;
        }
        return xhr;
      }
      var app_id = "5e802351";
      var app_key = "13bf29d458997ee7632f5d5a606996a3";
      // Make the actual CORS request.
      function makeCorsRequest() {
        var url =
          "https://api.edamam.com/api/nutrition-details?app_id=" +
          app_id +
          "&app_key=" +
          app_key;
        var xhr = createCORSRequest("POST", url);
        if (!xhr) {
          alert("CORS not supported");
          return;
        }
        // Response handlers.
        xhr.onload = function() {
          console.log(JSON.parse(xhr.responseText));
          var response = JSON.parse(xhr.responseText);
          console.log(response.totalNutrients);
          if (response.totalNutrients !== undefined) {
            protein = printNutrients(
              response.totalNutrients,
              "PROCNT",
              "protein",
              " g"
            );
            carbs = printNutrients(
              response.totalNutrients,
              "CHOCDF",
              "carb",
              " g"
            );
            fat = printNutrients(response.totalNutrients, "FAT", "fat", " g");
            printNutrients(response.totalNutrients, "FASAT", "satfat", " g");
            printNutrients(response.totalNutrients, "ENERC_KCAL", "cal", "");
            printNutrients(response.totalNutrients, "CHOLE", "chol", " mg");
            printNutrients(response.totalNutrients, "NA", "sodium", " mg");
            printNutrients(response.totalNutrients, "FIBTG", "fiber", " g");
            printNutrients(response.totalNutrients, "SUGAR", "sugar", " g");
            makeChart();
          } else {
            infoNotAvailable();
          }
        };

        xhr.onerror = function() {
          alert("Woops, there was an error making the request.");
        };

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(recipe));
      }

      makeCorsRequest();

      // Empty the contents of the artist-div, append the new artist content

      $("#title").text(title);
      $("#directions").text(directions);
      $("#recipe-image").css({
        background: "url(" + imageURL + ")",
        "background-position": "center",
        "background-repeat": "no-repeat",
        "background-size": "cover"
      });
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
      emptyInfo();

      for (i = 0; i < measuresArray.length; i++) {
        if (measuresArray[i] !== " " && measuresArray[i] !== "null null") {
          $("#ingredients-list").append($("<li>" + measuresArray[i] + "</li>"));
        }
      }

      recipe = {
        title: title,
        prep: "",
        yield: 4,
        ingr: measuresArray.filter(function(item) {
          return item !== " ";
        })
      };

      //Create the XHR object.
      function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
          // XHR for Chrome/Firefox/Opera/Safari.
          xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
          // XDomainRequest for IE.
          xhr = new XDomainRequest();
          xhr.open(method, url);
        } else {
          // CORS not supported.
          xhr = null;
        }
        return xhr;
      }
      var app_id = "5e802351";
      var app_key = "13bf29d458997ee7632f5d5a606996a3";
      // Make the actual CORS request.
      function makeCorsRequest() {
        var url =
          "https://api.edamam.com/api/nutrition-details?app_id=" +
          app_id +
          "&app_key=" +
          app_key;
        var xhr = createCORSRequest("POST", url);
        if (!xhr) {
          alert("CORS not supported");
          return;
        }
        // Response handlers.
        xhr.onload = function() {
          console.log(JSON.parse(xhr.responseText));
          var response = JSON.parse(xhr.responseText);

          if (response.totalNutrients !== undefined) {
            protein = printNutrients(
              response.totalNutrients,
              "PROCNT",
              "protein",
              " g"
            );
            carbs = printNutrients(
              response.totalNutrients,
              "CHOCDF",
              "carb",
              " g"
            );
            fat = printNutrients(response.totalNutrients, "FAT", "fat", " g");
            printNutrients(response.totalNutrients, "FASAT", "satfat", " g");
            printNutrients(response.totalNutrients, "ENERC_KCAL", "cal", "");
            printNutrients(response.totalNutrients, "CHOLE", "chol", " mg");
            printNutrients(response.totalNutrients, "NA", "sodium", " mg");
            printNutrients(response.totalNutrients, "FIBTG", "fiber", " g");
            printNutrients(response.totalNutrients, "SUGAR", "sugar", " g");
            makeChart();
          } else {
            infoNotAvailable();
          }
        };

        xhr.onerror = function() {
          alert("Woops, there was an error making the request.");
        };

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(recipe));
      }

      makeCorsRequest();

      // Empty the contents of the artist-div, append the new artist content

      $("#title").text(title);
      $("#directions").text(directions);
      $("#recipe-image").css({
        background: "url(" + imageURL + ")",
        "background-position": "center",
        "background-repeat": "no-repeat",
        "background-size": "cover"
      });
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
    emptyInfo();

    for (i = 0; i < measuresArray.length; i++) {
      if (measuresArray[i] !== " " && measuresArray[i] !== "null null") {
        $("#ingredients-list").append($("<li>" + measuresArray[i] + "</li>"));
      }
    }

    recipe = {
      title: title,
      prep: "",
      yield: 4,
      ingr: measuresArray.filter(function(item) {
        return item !== " ";
      })
    };

    //Create the XHR object.
    function createCORSRequest(method, url) {
      var xhr = new XMLHttpRequest();
      if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
      } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
      } else {
        // CORS not supported.
        xhr = null;
      }
      return xhr;
    }
    var app_id = "5e802351";
    var app_key = "13bf29d458997ee7632f5d5a606996a3";
    // Make the actual CORS request.
    function makeCorsRequest() {
      var url =
        "https://api.edamam.com/api/nutrition-details?app_id=" +
        app_id +
        "&app_key=" +
        app_key;
      var xhr = createCORSRequest("POST", url);
      if (!xhr) {
        alert("CORS not supported");
        return;
      }
      // Response handlers.
      xhr.onload = function() {
        console.log(JSON.parse(xhr.responseText));
        var response = JSON.parse(xhr.responseText);

        if (response.totalNutrients !== undefined) {
          protein = printNutrients(
            response.totalNutrients,
            "PROCNT",
            "protein",
            " g"
          );
          carbs = printNutrients(
            response.totalNutrients,
            "CHOCDF",
            "carb",
            " g"
          );
          fat = printNutrients(response.totalNutrients, "FAT", "fat", " g");
          printNutrients(response.totalNutrients, "FASAT", "satfat", " g");
          printNutrients(response.totalNutrients, "ENERC_KCAL", "cal", "");
          printNutrients(response.totalNutrients, "CHOLE", "chol", " mg");
          printNutrients(response.totalNutrients, "NA", "sodium", " mg");
          printNutrients(response.totalNutrients, "FIBTG", "fiber", " g");
          printNutrients(response.totalNutrients, "SUGAR", "sugar", " g");
          makeChart();
        } else {
          infoNotAvailable();
        }
      };

      xhr.onerror = function() {
        alert("Woops, there was an error making the request.");
      };

      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(recipe));
    }

    makeCorsRequest();

    // Empty the contents of the artist-div, append the new artist content

    $("#title").text(title);
    $("#directions").text(directions);
    $("#recipe-image").css({
      background: "url(" + imageURL + ")",
      "background-position": "center",
      "background-repeat": "no-repeat",
      "background-size": "cover"
    });
  });
});
