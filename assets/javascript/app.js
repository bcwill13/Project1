var mealID = "";
var recipe;

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
      $("#cal").empty();
      $("#fat").empty();
      $("#satfat").empty();
      $("#chol").empty();
      $("#sodium").empty();
      $("#carb").empty();
      $("#fiber").empty();
      $("#sugar").empty();
      $("#protein").empty();

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

          if (response.totalNutrients["ENERC_KCAL"]) {
            $("#cal").text(
              Math.round(response.totalNutrients["ENERC_KCAL"].quantity / 4) +
                " kcal"
            );
          } else {
            $("#cal").text("0 kcal");
          }

          if (response.totalNutrients.FAT) {
            $("#fat").text(
              Math.round(response.totalNutrients.FAT.quantity / 4) + " g"
            );
          } else {
            $("#fat").text("0 g");
          }

          if (response.totalNutrients.FASAT) {
            $("#satfat").text(
              Math.round(response.totalNutrients.FASAT.quantity / 4) + " g"
            );
          } else {
            $("#satfat").text("0 g");
          }

          if (response.totalNutrients.CHOLE) {
            $("#chol").text(
              Math.round(response.totalNutrients.CHOLE.quantity / 4) + " mg"
            );
          } else {
            $("#chol").text("0 mg");
          }

          if (response.totalNutrients.NA) {
            $("#sodium").text(
              Math.round(response.totalNutrients.NA.quantity / 4) + " mg"
            );
          } else {
            $("#sodium").text("0 mg");
          }

          if (response.totalNutrients.CHOCDF) {
            $("#carb").text(
              Math.round(response.totalNutrients.CHOCDF.quantity / 4) + " g"
            );
          } else {
            $("#carb").text("0 g");
          }

          if (response.totalNutrients.FIBTG) {
            $("#fiber").text(
              Math.round(response.totalNutrients.FIBTG.quantity / 4) + " g"
            );
          } else {
            $("#fiber").text("0 g");
          }

          if (response.totalNutrients.SUGAR) {
            $("#sugar").text(
              Math.round(response.totalNutrients.SUGAR.quantity / 4) + " g"
            );
          } else {
            $("#sugar").text("0 g");
          }

          if (response.totalNutrients.PROCNT) {
            $("#protein").text(
              Math.round(response.totalNutrients.PROCNT.quantity / 4) + " g"
            );
          } else {
            $("#protein").text("0 g");
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

          if (response.totalNutrients["ENERC_KCAL"]) {
            $("#cal").text(
              Math.round(response.totalNutrients["ENERC_KCAL"].quantity / 4) +
                " kcal"
            );
          } else {
            $("#cal").text("0 kcal");
          }

          if (response.totalNutrients.FAT) {
            $("#fat").text(
              Math.round(response.totalNutrients.FAT.quantity / 4) + " g"
            );
          } else {
            $("#fat").text("0 g");
          }

          if (response.totalNutrients.FASAT) {
            $("#satfat").text(
              Math.round(response.totalNutrients.FASAT.quantity / 4) + " g"
            );
          } else {
            $("#satfat").text("0 g");
          }

          if (response.totalNutrients.CHOLE) {
            $("#chol").text(
              Math.round(response.totalNutrients.CHOLE.quantity / 4) + " mg"
            );
          } else {
            $("#chol").text("0 mg");
          }

          if (response.totalNutrients.NA) {
            $("#sodium").text(
              Math.round(response.totalNutrients.NA.quantity / 4) + " mg"
            );
          } else {
            $("#sodium").text("0 mg");
          }

          if (response.totalNutrients.CHOCDF) {
            $("#carb").text(
              Math.round(response.totalNutrients.CHOCDF.quantity / 4) + " g"
            );
          } else {
            $("#carb").text("0 g");
          }

          if (response.totalNutrients.FIBTG) {
            $("#fiber").text(
              Math.round(response.totalNutrients.FIBTG.quantity / 4) + " g"
            );
          } else {
            $("#fiber").text("0 g");
          }

          if (response.totalNutrients.SUGAR) {
            $("#sugar").text(
              Math.round(response.totalNutrients.SUGAR.quantity / 4) + " g"
            );
          } else {
            $("#sugar").text("0 g");
          }

          if (response.totalNutrients.PROCNT) {
            $("#protein").text(
              Math.round(response.totalNutrients.PROCNT.quantity / 4) + " g"
            );
          } else {
            $("#protein").text("0 g");
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

        if (response.totalNutrients["ENERC_KCAL"]) {
          $("#cal").text(
            Math.round(response.totalNutrients["ENERC_KCAL"].quantity / 4) +
              " kcal"
          );
        } else {
          $("#cal").text("0 kcal");
        }

        if (response.totalNutrients.FAT) {
          $("#fat").text(
            Math.round(response.totalNutrients.FAT.quantity / 4) + " g"
          );
        } else {
          $("#fat").text("0 g");
        }

        if (response.totalNutrients.FASAT) {
          $("#satfat").text(
            Math.round(response.totalNutrients.FASAT.quantity / 4) + " g"
          );
        } else {
          $("#satfat").text("0 g");
        }

        if (response.totalNutrients.CHOLE) {
          $("#chol").text(
            Math.round(response.totalNutrients.CHOLE.quantity / 4) + " mg"
          );
        } else {
          $("#chol").text("0 mg");
        }

        if (response.totalNutrients.NA) {
          $("#sodium").text(
            Math.round(response.totalNutrients.NA.quantity / 4) + " mg"
          );
        } else {
          $("#sodium").text("0 mg");
        }

        if (response.totalNutrients.CHOCDF) {
          $("#carb").text(
            Math.round(response.totalNutrients.CHOCDF.quantity / 4) + " g"
          );
        } else {
          $("#carb").text("0 g");
        }

        if (response.totalNutrients.FIBTG) {
          $("#fiber").text(
            Math.round(response.totalNutrients.FIBTG.quantity / 4) + " g"
          );
        } else {
          $("#fiber").text("0 g");
        }

        if (response.totalNutrients.SUGAR) {
          $("#sugar").text(
            Math.round(response.totalNutrients.SUGAR.quantity / 4) + " g"
          );
        } else {
          $("#sugar").text("0 g");
        }

        if (response.totalNutrients.PROCNT) {
          $("#protein").text(
            Math.round(response.totalNutrients.PROCNT.quantity / 4) + " g"
          );
        } else {
          $("#protein").text("0 g");
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
