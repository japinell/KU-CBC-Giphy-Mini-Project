//
const API_SERVER = "https://api.giphy.com";
const API_END_POINT = "/v1/gifs/search";
const API_KEY = "m39euATa9KeZDVwEi4Mejq1Wfbvgfthw";
const IMG_PER_PAGE = 20;

// Elements
const topicsDiv = $("#topics");
const searchFormDiv = $("#search-form");
const imagesDiv = $("#images");

// Variables
var TOPICS = [
  "dogs",
  "cats",
  "rabbits",
  "hamsters",
  "wolfs",
  "lions",
  "cheetas",
  "bulls",
];
var NUMBER_OF_TOPICS = TOPICS.length;

// Render the topics
function RenderTopics() {
  //
  var topic;
  var rowEl, colEl, btnEl;
  //
  topicsDiv.empty();
  //
  rowEl = $("<div>");
  // rowEl.addClass("row row-custom");
  rowEl.addClass("d-flex flex-wrap row row-cols-auto row-custom");
  //
  for (var i = 0; i < NUMBER_OF_TOPICS; i++) {
    //
    topic = TOPICS[i];
    //
    colEl = $("<div>");
    // colEl.addClass("col-md-2 col-sm-3 col-4 col-custom");
    colEl.addClass("col col-custom");
    //
    btnEl = $("<button>");
    btnEl.text(topic);
    btnEl.attr("image-text", topic);
    btnEl.addClass("btn btn-dark text-capitalize btn-custom");
    btnEl.appendTo(colEl);
    //
    colEl.appendTo(rowEl);
    //
  }
  //
  rowEl.appendTo(topicsDiv);
  //
}

// Render the search form
function RenderSearchForm() {
  //
  var rowEl, colEl, formEl, inputEl, selectEl, optionEl;
  //
  rowEl = $("<div>");
  rowEl.addClass("input-group mb-3");
  //
  // Search text and button
  inputEl = $("<input>");
  inputEl.attr("id", "searchText");
  inputEl.attr("type", "text");
  inputEl.attr(
    "placeholder",
    "Search for an animal or select from the list below..."
  );
  inputEl.addClass("form-control user-select-all");
  inputEl.appendTo(rowEl);
  //
  inputEl = $("<button>");
  inputEl.attr("id", "searchBtn");
  inputEl.text("Search");
  inputEl.addClass("btn btn-dark ml-2");
  inputEl.appendTo(rowEl);
  //
  rowEl.appendTo(searchFormDiv);
  //
  // Page limit
  rowEl = $("<div>");
  rowEl.addClass("input-group mb-3");
  //
  selectEl = $("<label>");
  selectEl.attr("for", "pageLimit");
  selectEl.text("Page limit");
  selectEl.addClass("form-label");
  selectEl.appendTo(rowEl);
  //
  selectEl = $("<select>");
  selectEl.attr("id", "pageLimit");
  selectEl.text("Page limit");
  selectEl.addClass("form-select ml-2");
  //
  optionEl = $("<option>");
  optionEl.attr("value", "5");
  optionEl.text("5");
  optionEl.appendTo(selectEl);
  //
  optionEl = $("<option>");
  optionEl.attr("value", "25");
  optionEl.text("25");
  optionEl.appendTo(selectEl);
  //
  optionEl = $("<option>");
  optionEl.attr("value", "50");
  optionEl.text("50");
  optionEl.appendTo(selectEl);
  //
  optionEl = $("<option>");
  optionEl.attr("value", "75");
  optionEl.text("75");
  optionEl.appendTo(selectEl);
  //
  optionEl = $("<option>");
  optionEl.attr("value", "100");
  optionEl.text("100");
  optionEl.appendTo(selectEl);
  //
  selectEl.appendTo(rowEl);
  //
  rowEl.appendTo(searchFormDiv);
  //
}

// Render the images
function RenderImage(data) {
  //
  var rowEl, colEl, imgEl, pEl;
  var fixedImg, animatedImg;
  //
  imagesDiv.empty();
  // console.log(data);
  //
  rowEl = $("<div>");
  // rowEl.addClass("row d-flex flex-wrap");
  rowEl.addClass("d-flex align-content-stretch flex-wrap row row-cols-auto");
  //
  for (var i = 0, l = data.length; i < l; i++) {
    //
    // fixedImg = data[i].images.fixed_height_small_still.url;
    // animatedImg = data[i].images.original.url;
    fixedImg = data[i].images.original_still.url;
    animatedImg = data[i].images.original.url;

    // Create a colum
    colEl = $("<div>");
    // colEl.addClass("col-md-3 col-sm-3 col-4 text-center col-custom");
    colEl.addClass("col text-center col-custom");
    colEl.attr("col-number");
    //
    // Create an image
    imgEl = $("<img>");
    imgEl.attr("fixed", fixedImg);
    imgEl.attr("animated", animatedImg);
    imgEl.attr("state", "fixed");
    imgEl.attr("src", fixedImg);
    // imgEl.attr("");
    // imgEl.addClass("img-fluid img-thumbnail");
    imgEl.addClass("img-fluid shadow-lg d-block");
    imgEl.appendTo(colEl);
    //
    pEl = $("<p>");
    pEl.addClass("text-uppercase p-custom");
    pEl.text(data[i].rating);
    pEl.appendTo(colEl);
    //
    colEl.appendTo(rowEl);
    //
  }
  //
  rowEl.appendTo(imagesDiv);
  //
}

// Call the Giphy API
function GetGiphys(apiUrl) {
  //
  fetch(apiUrl)
    //
    .then(function (response) {
      //
      if (response.ok) {
        //
        response.json().then(function (res) {
          //
          RenderImage(res.data);
          //
        });
      } else {
        //
        alert("Error: " + response.statusText);
        //
      }
    })
    .catch(function (error) {
      //
      alert("Unable to connect to Giphy");
      //
    });
  //
}

// Set the Giphy API call
function ProcessButton() {
  //
  var searchText = $(this).attr("image-text");
  var pageLimit = $("#pageLimit").val().trim();
  //
  if (searchText != "") {
    //
    if (pageLimit === "") {
      //
      pageLimit = IMG_PER_PAGE;
      //
    }
    //
    var apiUrl = API_SERVER + API_END_POINT;
    apiUrl = apiUrl + "?q=" + searchText + "&limit=" + pageLimit;
    apiUrl = apiUrl + "&api_key=" + API_KEY;
    //
    GetGiphys(apiUrl);
    //
  }
  //
}

// Set the Giphy API call
function ProcessSearch() {
  //
  // event.preventDefault();
  //
  var searchText = $("#searchText").val().trim();
  var pageLimit = $("#pageLimit").val().trim();
  //
  if (searchText != "") {
    //
    if (pageLimit === "") {
      //
      pageLimit = IMG_PER_PAGE;
      //
    }
    //
    var apiUrl = "http://api.giphy.com/v1/gifs/search";
    apiUrl = apiUrl + "?q=" + searchText + "&limit=" + pageLimit;
    apiUrl = apiUrl + "&api_key=" + API_KEY;
    //
    GetGiphys(apiUrl);
    AddTopic(searchText);
    RenderTopics();
    //
  }
  //
}

// Adds topic to the list
function AddTopic(searchTopic) {
  //
  if (!(TOPICS.indexOf(searchTopic) >= 0)) {
    //
    // Insert it
    TOPICS.push(searchTopic);
    NUMBER_OF_TOPICS = TOPICS.length;
    //
  }
  //
}

// Changes image from fixed to animate
function SwapImage() {
  //
  var state = $(this).attr("state");
  var image;
  //
  if (state === "fixed") {
    //
    state = "animated";
    image = $(this).attr("animated");
    //
  } else {
    //
    state = "fixed";
    image = $(this).attr("fixed");
    //
  }
  //
  $(this).attr("state", state);
  $(this).attr("src", image);
  //
}

// Event handlers
topicsDiv.on("click", "button", ProcessButton);
searchFormDiv.on("click", "button", ProcessSearch);
imagesDiv.on("click", "img", SwapImage);
//
// Rock & Roll
RenderSearchForm();
RenderTopics();
//
