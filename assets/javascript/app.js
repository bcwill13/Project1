function buildQueryURL() {
    // queryURL is the url we'll use to query the API
    var queryURL = "https://www.themealdb.com/api/json/v1/1/";
  
  
    // Grab text the user typed into the search input, add to the queryParams object
    var titleKeyword = $("#input-title")
      .val()
      .trim();
  
    // If the user provides a startYear, include it in the queryParams object
    var ingredientKeyword = $("#input-ingredient")
      .val()
      .trim();
  
    // If the user provides an endYear, include it in the queryParams object
    var endYear = $("#input")
      .val()
      .trim();

    // Logging the URL so we have access to it for troubleshooting

    return queryURL
  }