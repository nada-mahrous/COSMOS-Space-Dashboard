const launchesApi =
  "https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10";

const launchesGrid = document.getElementById("launches-grid"); // container for the launches cards
const featuredLaunch = document.getElementById("featured-launch"); // the featured launch (the most recent upcoming launch)

const launchesCount = document.getElementById("launches-count"); // total number of upcoming launches
const launchesCountMobile = document.getElementById("launches-count-mobile"); // total number of upcoming launches for mobile view

let launches = [];

// ** Function to fetch upcoming launches data from the API and store it in the launches array, then show the launches **
async function getLaunches() {
  try {
    /* fetch() --> method to send request to the server and get response from the server 
    and it returns promise */

    /* await --> to wait until the promise is resolved and get the response from the server
    and it can only be used inside async function */
    const response = await fetch(launchesApi);

    if (!response.ok) {
      throw new Error("Failed to fetch launches data");
    }

    /* res.json() --> method to parse the response from the API
      response bta3 el fetch bykon gwah method esmha json() --> bt3ml parsing automatically 
      w btrg3 el data already object gahez w msh string zay ma kan by default 
    */
    /*  await res.json(); --> 
      to wait until the parsing is done and get the data from the API
    */
    const data = await response.json();

    // store the launches data in the array
    launches = data.results;

    console.log(launches);

    displayLaunches();
    displayFeaturedLaunch(launches[0]);
  } catch (error) {
    console.log(error);
    launchesGrid.innerHTML =
      "<p class='text-red-500 text-center col-span-2'>Failed to load launches data. Please try again later.</p>";
    featuredLaunch.innerHTML =
      "<p class='text-red-500 text-center'>Failed to load featured launch data. Please try again later.</p>";
  }
}

// ** Function to display the launches data in the launches section cards **
function displayLaunches() {
  launchesGrid.innerHTML = "";

  for (let i = 0; i < launches.length; i++) {
    const launch = launches[i];

    launchesGrid.innerHTML += `
      <div class="launch-card bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
      data-index="${i}">
        <div class="relative h-48 bg-slate-900/50 flex items-center justify-center">
          <img 
            src="${launch.image && launch.image.image_url ? launch.image.image_url : "./assets/images/launch-placeholder.png"}"
            onerror="this.src='./assets/images/launch-placeholder.png'"
            class="w-full h-full object-cover"
            alt="${launch.name}"
           />

          <div class="absolute top-3 right-3">
            <span class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold">
              ${launch.status ? launch.status.name : "N/A"}
            </span>
          </div>
        </div>

        <div class="p-5">
          <div class="mb-3">
            <h4 class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
              ${launch.name}
            </h4>

            <p class="text-sm text-slate-400 flex items-center gap-2">
              <i class="fas fa-building text-xs"></i>
              ${launch.launch_service_provider ? launch.launch_service_provider.name : "N/A"}
            </p>
          </div>

          <div class="space-y-2 mb-4">
            <div class="flex items-center gap-2 text-sm">
              <i class="fas fa-calendar text-slate-500 w-4"></i>
              <span class="text-slate-300">${launch.net ? launch.net.slice(0, 10) : "N/A"}</span>
            </div>

            <div class="flex items-center gap-2 text-sm">
              <i class="fas fa-clock text-slate-500 w-4"></i>
              <span class="text-slate-300">${launch.net ? launch.net.slice(11, 16) + " UTC" : "N/A"}</span>
            </div>

            <div class="flex items-center gap-2 text-sm">
              <i class="fas fa-rocket text-slate-500 w-4"></i>
              <span class="text-slate-300">
                ${launch.rocket && launch.rocket.configuration ? launch.rocket.configuration.name : "N/A"}
              </span>
            </div>

            <div class="flex items-center gap-2 text-sm">
              <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
              <span class="text-slate-300 line-clamp-1">
                ${launch.pad && launch.pad.location ? launch.pad.location.name : "N/A"}
              </span>
            </div>
          </div>

          <div class="flex items-center gap-2 pt-4 border-t border-slate-700">
            <button class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold">
              Details
            </button>

            <button class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
              <i class="far fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // const launchCards = document.querySelectorAll(".launch-card");

  // for (let i = 0; i < launchCards.length; i++) {
  //   launchCards[i].addEventListener("click", function () {
  //     const index = launchCards[i].getAttribute("data-index");

  //     displayFeaturedLaunch(launches[index]);
  //   });
  // }
}

// ** Function to calculate the number of days until the launch date
//  if the launch date is in the past return 0, if the launch date is not available return "N/A" **
function getDaysUntilLaunch(launchDate) {
  if (!launchDate) {
    return "N/A";
  }

  const today = new Date();
  const launch = new Date(launchDate);

  const difference = launch - today;

  const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

  if (days < 0) {
    return 0;
  }

  return days;
}

// ** Function to display the most recent upcoming launch in the featured launch section **
function displayFeaturedLaunch(launch) {
  const daysUntilLaunch = getDaysUntilLaunch(launch.net);
  featuredLaunch.innerHTML = `
    <div class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all">
      <div class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
        <div class="flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-3 mb-4">
              <span class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2">
                <i class="fas fa-star"></i>
                Featured Launch
              </span>

              <span class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                ${launch.status ? launch.status.name : "N/A"}
              </span>
            </div>

            <h3 class="text-3xl font-bold mb-3 leading-tight">
              ${launch.name}
            </h3>

            <div class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400">
              <div class="flex items-center gap-2">
                <i class="fas fa-building"></i>
                <span>${launch.launch_service_provider ? launch.launch_service_provider.name : "N/A"}</span>
              </div>

              <div class="flex items-center gap-2">
                <i class="fas fa-rocket"></i>
                <span>${launch.rocket && launch.rocket.configuration ? launch.rocket.configuration.name : "N/A"}</span>
              </div>
            </div>

            <div class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6">
              <i class="fas fa-clock text-2xl text-blue-400"></i>
              <div>
                <p class="text-2xl font-bold text-blue-400">${daysUntilLaunch}</p>
                <p class="text-xs text-slate-400">Days Until Launch</p>
              </div>
            </div>

            <div class="grid xl:grid-cols-2 gap-4 mb-6">
              <div class="bg-slate-900/50 rounded-xl p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                  <i class="fas fa-calendar"></i>
                  Launch Date
                </p>
                <p class="font-semibold">${launch.net ? launch.net.slice(0, 10) : "N/A"}</p>
              </div>

              <div class="bg-slate-900/50 rounded-xl p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                  <i class="fas fa-clock"></i>
                  Launch Time
                </p>
                <p class="font-semibold">${launch.net ? launch.net.slice(11, 16) + " UTC" : "N/A"}</p>
              </div>

              <div class="bg-slate-900/50 rounded-xl p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                  <i class="fas fa-map-marker-alt"></i>
                  Location
                </p>
                <p class="font-semibold text-sm">
                  ${launch.pad && launch.pad.location ? launch.pad.location.name : "N/A"}
                </p>
              </div>

              <div class="bg-slate-900/50 rounded-xl p-4">
                <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                  <i class="fas fa-globe"></i>
                  Country
                </p>
                <p class="font-semibold">
                  ${launch.pad && launch.pad.country ? launch.pad.country.name : "N/A"}
                </p>
              </div>
            </div>

            <p class="text-slate-300 leading-relaxed mb-6">
              ${launch.mission && launch.mission.description ? launch.mission.description : "No description available for this launch."}
            </p>
          </div>

          <div class="flex flex-col md:flex-row gap-3">
            <button class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2">
              <i class="fas fa-info-circle"></i>
              View Full Details
            </button>

            <div class="icons self-end md:self-center">
              <button class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors">
                <i class="far fa-heart"></i>
              </button>

              <button class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors">
                <i class="fas fa-bell"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="relative">
          <div class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50">
            <img 
              src="${launch.image && launch.image.image_url ? launch.image.image_url : "./assets/images/launch-placeholder.png"}"
              onerror="this.src='./assets/images/launch-placeholder.png'"
              class="w-full h-full object-cover min-h-[400px]"
              alt="${launch.name}"
            />

            <div class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}


launchesGrid.addEventListener("click", function (e) {
  const card = e.target.closest(".launch-card");

  if (!card) {
    return;
  }

  const index = card.getAttribute("data-index");

  displayFeaturedLaunch(launches[index]);
});


getLaunches();
