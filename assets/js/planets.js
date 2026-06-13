const planetsApi = "https://solar-system-opendata-proxy.vercel.app/api/planets";

const planetCards = document.querySelectorAll(".planet-card"); // NodeList of all planet cards

const planetDetailImage = document.getElementById("planet-detail-image"); // Image element to show the planet image in the detail section
const planetDetailName = document.getElementById("planet-detail-name"); // name in detail section
const planetDetailDescription = document.getElementById(
  "planet-detail-description",
); // description in detail section

const planetDistance = document.getElementById("planet-distance"); // distance from the sun (semimajor axis)
const planetRadius = document.getElementById("planet-radius"); // mean radius
const planetMass = document.getElementById("planet-mass"); // mass
const planetDensity = document.getElementById("planet-density"); // density
const planetOrbitalPeriod = document.getElementById("planet-orbital-period"); // orbital period
const planetRotation = document.getElementById("planet-rotation"); // rotation period
const planetMoons = document.getElementById("planet-moons"); // number of moons
const planetGravity = document.getElementById("planet-gravity"); // gravity

const planetDiscoverer = document.getElementById("planet-discoverer"); // discoverer
const planetDiscoveryDate = document.getElementById("planet-discovery-date"); // discovery date
const planetBodyType = document.getElementById("planet-body-type"); // body type
const planetVolume = document.getElementById("planet-volume"); // volume

const planetPerihelion = document.getElementById("planet-perihelion"); // perihelion
const planetAphelion = document.getElementById("planet-aphelion"); // aphelion
const planetEccentricity = document.getElementById("planet-eccentricity"); // eccentricity
const planetInclination = document.getElementById("planet-inclination"); // inclination
const planetAxialTilt = document.getElementById("planet-axial-tilt"); // axial tilt
const planetTemp = document.getElementById("planet-temp"); // temperature
const planetEscape = document.getElementById("planet-escape"); // escape velocity

const factMass = document.getElementById("fact-mass"); // fact mass
const factGravity = document.getElementById("fact-gravity"); // fact gravity
const factDensity = document.getElementById("fact-density"); // fact density
const factAxialTilt = document.getElementById("fact-axial-tilt"); // fact axial tilt

let planets = [];

// ** Function to fetch planets data from the API and store it in the planets array, then show Earth by default **
async function getPlanets() {
  try {
    /* fetch() --> method to send request to the server and get response from the server 
    and it returns promise */

    /* await --> to wait until the promise is resolved and get the response from the server
    and it can only be used inside async function */
    const response = await fetch(planetsApi);

    if (!response.ok) {
      throw new Error("Failed to fetch planets data");
    }

    /* res.json() --> method to parse the response from the API
      response bta3 el fetch bykon gwah method esmha json() --> bt3ml parsing automatically 
      w btrg3 el data already object gahez w msh string zay ma kan by default 
    */
    /*  await res.json(); --> 
      to wait until the parsing is done and get the data from the API
    */
    const data = await response.json();

    // store the planets data in the array
    planets = data.bodies;

    showPlanet("earth");
  } catch (error) {
    console.log(error);

    planetDetailName.textContent = "Something went wrong";
    planetDetailDescription.textContent =
      "Failed to load planets data. Please try again later.";

    planetDetailImage.src = "./assets/images/placeholder.webp";
    planetDetailImage.alt = "Error";
  }
}

// ** Function to show the selected planet's details in the detail section **
function showPlanet(planetName) {
  let planet;

  for (let i = 0; i < planets.length; i++) {
    if (planets[i].englishName.toLowerCase() === planetName.toLowerCase()) {
      planet = planets[i];
      break;
    }
  }
  /** If the planet name is wrong or data-planet-id isn't matching any planet ,
    then this variable (planet) will be undefined and will give me error 
    So we tell him if you didn't find planet get out from the function
   */
  if (!planet) {
    return;
  }

  planetDetailName.textContent = planet.englishName;
  planetDetailImage.src = `./assets/images/${planetName}.png`;
  planetDetailImage.alt = planet.englishName;
  planetDetailDescription.textContent = planet.description;

  planetDistance.textContent = planet.semimajorAxis + " km";
  planetRadius.textContent = planet.meanRadius + " km";
  //   planetMass.textContent = planet.mass.massValue + " × 10^" + planet.mass.massExponent + " kg";
  planetMass.textContent = planet.mass
    ? planet.mass.massValue + " × 10^" + planet.mass.massExponent + " kg"
    : "Not Available";
  planetDensity.textContent = planet.density + " g/cm³";
  planetOrbitalPeriod.textContent = planet.sideralOrbit + " days";
  planetRotation.textContent = planet.sideralRotation + " hours";
  planetGravity.textContent = planet.gravity + " m/s²";
  planetMoons.textContent = planet.moons ? planet.moons.length : 0;

  // Discovery Info
  planetDiscoverer.textContent = planet.discoveredBy || "Known since antiquity";
  planetDiscoveryDate.textContent = planet.discoveryDate || "Ancient times";
  planetBodyType.textContent = planet.bodyType;
  //   planetVolume.textContent = planet.vol.volValue + " × 10^" + planet.vol.volExponent + " km³";
  planetVolume.textContent = planet.vol
    ? planet.vol.volValue + " × 10^" + planet.vol.volExponent + " km³"
    : "Not Available";

  // Quick Facts
  factMass.textContent = planet.mass
    ? planet.mass.massValue + " × 10^" + planet.mass.massExponent + " kg"
    : "Not Available";
  factGravity.textContent = planet.gravity + " m/s²";
  factDensity.textContent = planet.density + " g/cm³";
  factAxialTilt.textContent = planet.axialTilt + "°";

  // Orbital Characteristics
  planetPerihelion.textContent = planet.perihelion + " km";
  planetAphelion.textContent = planet.aphelion + " km";
  planetEccentricity.textContent = planet.eccentricity;
  planetInclination.textContent = planet.inclination + "°";
  planetAxialTilt.textContent = planet.axialTilt + "°";
  planetTemp.textContent = planet.avgTemp + " K";
  planetEscape.textContent = planet.escape + " m/s";
}

// ** Event listeners for planet card clicks to show corresponding planet details **
planetCards.forEach(function (card) {
  card.addEventListener("click", function () {
    const planetId = card.getAttribute("data-planet-id");

    showPlanet(planetId);
  });
});

getPlanets();
