var apodImage = document.getElementById("apod-image");
var apodTitle = document.getElementById("apod-title");
var apodExplanation = document.getElementById("apod-explanation");
var apodDate = document.getElementById("apod-date");
var apodDateDetail = document.getElementById("apod-date-detail");
var apodDateInfo = document.getElementById("apod-date-info");
var apodMediaType = document.getElementById("apod-media-type");
var apodCopyright = document.getElementById("apod-copyright");

var apodDateInput = document.getElementById("apod-date-input");
var selectedDateText = document.getElementById("selected-date-text");

var loadDateBtn = document.getElementById("load-date-btn");
var todayApodBtn = document.getElementById("today-apod-btn");
var apodLoading = document.getElementById("apod-loading");
var apodError = document.getElementById("apod-error");

var apiKey = "9MS0zagwN2IHTenzOe5j8M26jV86QWvn4yQc7NdX";
var minApodDate = "1995-06-16";

// ******************************************************************************************************************** //
// ************************************************** Today In Space ************************************************** //
// ******************************************************************************************************************** //

// ** Function to get today's date in YYYY-MM-DD format **
function getTodayDate() {
  // js has object called Date that provides methods to work with dates and times - have the current date and time of the device
  // &&make new object from data constructor to get the current date and time
  var today = new Date();

  // return the year
  var year = today.getFullYear();

  /* today.getMonth() --> 
  returns months beginning from 0 (January = 0 , February = 1 , March = 2 etc..)
    So we wrote : today.getMonth() + 1 --> to get the correct month number */

  /* .padStart(2, "0") --> 
  ensures the month and day are always two digits and if it is one digit then add zero before it 
  Example: 1 becomes 01, 11 becomes 11 */

  /* String(today.getMonth() + 1) -->
  we convert the month number to a string so that we can use the padStart() method */
  var month = String(today.getMonth() + 1).padStart(2, "0");
  var day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/* create a variable and call getTodayDate() (has returned today's date) --> 
instead of calling the function multiple times or recounting the date
So we count it one time then we store it in a variable 
EX. the variable todayDate has the value "2024-03-14" (or whatever today's date is)*/
var todayDate = getTodayDate();

// ** prevent user from selecting a date before June 16, 1995 (the date of the first APOD) **
apodDateInput.setAttribute("min", minApodDate);

/*  we can use this variable to set the max attribute of the date input field and 
also to load today's APOD on initial page load */
// ** prevent user from selecting a future date (after today's date) **
apodDateInput.setAttribute("max", todayDate);

// ** once the page loads make the input value equal today's date ( calender open on today's date by-default ) **
apodDateInput.value = todayDate;

// ** Function to format date to a more readable format **
// to convert the date from "2026-06-11" to "June 11, 2026" (or whatever the date is)
function formatDate(dateString) {
  var date = new Date(dateString + "T00:00:00");

  /* toLocaleDateString() -->
    method converts a date to a local way 
    اعرض التاريخ بالطريقة المحلية */
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ** Update the selected date text above the date input field **
function updateSelectedDateText(dateString) {
  selectedDateText.textContent = formatDate(dateString);
}

// ** Show loading state while fetching data **
function showLoading() {
  apodDate.textContent = "Astronomy Picture of the Day - Loading...";

  apodTitle.textContent = "Loading...";
  apodDateDetail.innerHTML = `<i class="far fa-calendar mr-2"></i>Loading...`;
  apodExplanation.textContent = "Loading description...";

  apodDateInfo.textContent = "Loading...";
  apodMediaType.textContent = "Loading...";
  apodCopyright.textContent = "";

  apodImage.classList.add("hidden");
  apodLoading.classList.remove("hidden");

  apodImage.classList.add("hidden");
  apodError.classList.add("hidden");
  apodLoading.classList.remove("hidden");
}

// ** Fetch APOD data from NASA API for the given date (or today's date if no date is provided) **
async function getAPOD(date) {
  try {
    showLoading();

    /* fetch() --> method to send request to the server and get response from the server 
    and it returns promise */
    /* await --> to wait until the promise is resolved and get the response from the server
    and it can only be used inside async function and use before method that returns a promise */
    var res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`,
    );

    if (!res.ok) {
      throw new Error("Failed to fetch APOD data");
    }

    /* res.json() --> method to parse the response from the API
      response bta3 el fetch bykon gwah method esmha json() --> bt3ml parsing automatically 
      w btrg3 el data already object gahez w msh string zay ma kan by default 
    */
    /*  await res.json(); --> 
      to wait until the parsing is done and get the data from the API
    */
    var data = await res.json();

    displayAPOD(data);
  } catch (error) {
    console.log(error);

    apodTitle.textContent = "Something went wrong";
    apodExplanation.textContent = "Please choose a valid date and try again.";

    apodDate.textContent = "Astronomy Picture of the Day - Error";
    apodDateDetail.innerHTML = `<i class="far fa-calendar mr-2"></i>Error`;

    apodDateInfo.textContent = "Error";
    apodMediaType.textContent = "Error";
    apodCopyright.textContent = "";

    apodLoading.classList.add("hidden");
    apodImage.classList.add("hidden");
    apodError.classList.remove("hidden");
  }
}

// ** Display APOD data on the page **
function displayAPOD(data) {
  var formattedDate = formatDate(data.date);

  apodTitle.textContent = data.title;
  apodExplanation.textContent = data.explanation;

  apodDate.textContent = "Astronomy Picture of the Day - " + formattedDate;

  apodDateDetail.innerHTML =
    '<i class="far fa-calendar mr-2"></i>' + formattedDate;

  apodDateInfo.textContent = formattedDate;

  apodMediaType.textContent = data.media_type;

  if (data.copyright) {
    apodCopyright.textContent = "© Copyright: " + data.copyright;
  } else {
    apodCopyright.textContent = "";
  }

  if (data.media_type === "image") {
    apodImage.setAttribute("src", data.url);
    apodImage.setAttribute("alt", data.title);
  } else {
    apodImage.setAttribute("src", "./assets/images/placeholder.webp");

    apodImage.setAttribute("alt", "NASA APOD Video");
  }

  apodDateInput.value = data.date;

  updateSelectedDateText(data.date);

  apodLoading.classList.add("hidden");
  apodError.classList.add("hidden");
  apodImage.classList.remove("hidden");
}

// ** Event listeners for date input change and button clicks **
apodDateInput.addEventListener("change", function () {
  if (apodDateInput.value !== "") {
    updateSelectedDateText(apodDateInput.value);
  }
});

// ** Load APOD for the selected date when "Load APOD" button is clicked **
loadDateBtn.addEventListener("click", function () {
  var selectedDate = apodDateInput.value;

  if (selectedDate === "") {
    apodTitle.textContent = "Something went wrong";
    apodExplanation.textContent = "Please select a date first.";
    return;
  }

  if (selectedDate > todayDate) {
    apodTitle.textContent = "Something went wrong";
    apodExplanation.textContent = "You cannot choose a future date.";

    apodDateInput.value = todayDate;
    updateSelectedDateText(todayDate);
    return;
  }

  if (selectedDate < minApodDate) {
    apodTitle.textContent = "Something went wrong";
    apodExplanation.textContent = "APOD is available from June 16, 1995 only.";

    apodDateInput.value = minApodDate;
    updateSelectedDateText(minApodDate);
    return;
  }

  updateSelectedDateText(selectedDate);
  getAPOD(selectedDate);
});

// ** Load today's APOD when "Today's APOD" button is clicked **
todayApodBtn.addEventListener("click", function () {
  apodDateInput.value = todayDate;
  updateSelectedDateText(todayDate);
  getAPOD(todayDate);
});

updateSelectedDateText(todayDate);
getAPOD(todayDate);



