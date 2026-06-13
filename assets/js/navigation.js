const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".app-section");

// ** Function to show the selected section and hide other sections, update active link styles **
function showSection(sectionId) {
  // Hide all sections to ensure that only one section will show
  // forEach loop is method for array and NodeList
  /* every element inside sections NodeList , 
  pass it to parameter section (different every time) , 
  then execute the code inside func.*/ 
  sections.forEach(function (section) {
    section.classList.add("hidden");
  });

  // Remove active styles from all navigation links
  navLinks.forEach(function (link) {
    link.classList.remove("bg-blue-500/10", "text-blue-400");
    link.classList.add("text-slate-300");
  });

  // Show the selected section that id equals sectionId and remove hidden class
  document.getElementById(sectionId).classList.remove("hidden");

  /* get the menu link that has data-section attribute equals to sectionId and add active styles to it, remove inactive styles from it'
  if i clicked on "Planets" link, sectionId will be "planets" sectionId = "planets";
  document.querySelector(`[data-section="${sectionId}"]`); 
  document.querySelector(`[data-section="planets"]`);
  then he will search for element that has data-section attribute and its value equals to planets
  */
 const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
 
//  So it will select the link that has data-section="planets" and add active styles to it, remove inactive styles from it
  activeLink.classList.add("bg-blue-500/10", "text-blue-400");
  activeLink.classList.remove("text-slate-300");
}

// ** Event listeners for navigation link clicks to show corresponding sections **
navLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    // prevent default behavior of anchor tag to avoid page reload
    e.preventDefault();

    // showSection(link.dataset.section);
    const sectionId = link.getAttribute("data-section");
    showSection(sectionId);
  });
});
