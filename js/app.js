/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

var mainSection = document.querySelector('main');
var sectionElementPositions = new Map();
var checking = false;
var sectionList;
var timer;
const paragraphText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.';
const paragraphText2 = 'Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.'

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
const getAllSections = () => {
    return document.querySelectorAll('section');
}

const getAllButtons = () => {
    return document.querySelectorAll('a');
}

const getIndex = (list, item) => {
    return Array.from(list).indexOf(item);
}

// Set the right section active
const setSectionActive = item => {
    // get the current active section
    var currentActive = document.querySelector('.your-active-class');
    currentActive.classList.remove('your-active-class');
    sectionList = getAllSections();
    sectionList[item].classList.add('your-active-class');
}

// Set the right button active
const setButtonActive = item => {
    // get the current active section
    var liList = getAllButtons();
    var currentListItem = document.querySelector('.menu__active');
    if (currentListItem) {
        currentListItem.classList.remove('menu__active');
    }
    liList[item].classList.add('menu__active');
}

// Scroll to active section
const scrollToSection = event => {
    var target = event.target;
    var buttonList = getAllButtons();
    var sectionIndex = getIndex(buttonList, target);
    sectionList[sectionIndex].scrollIntoView();
    // set section as active
    setSectionActive(sectionIndex);
    // set button to active
    setButtonActive(sectionIndex);
}

// check if top section is in top of viewport
const isInViewport = (e, {top:t, height:h} = e.getBoundingClientRect()) => {
    return t > -50 && t < 550;
}

const handleScrollEvent = () => {
    sectionList.forEach(function(section) {
        if (isInViewport(section)) {
            var sectionIndex = getIndex(sectionList, section);
            setButtonActive(sectionIndex);
            setSectionActive(sectionIndex);
        }
     });
     checking = false;
     clearTimeout(timer);
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build four other sections
for (var i = 0; i < 4; i++) {
    var newP = document.createElement('p');
    newP.textContent = paragraphText;
    var newP2 = document.createElement('p');
    newP2.textContent = paragraphText2;
    var newH2 = document.createElement('h2');
    newH2.textContent = `Section ${i+4}`;

    var newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'landing__container');
    newDiv.appendChild(newH2);
    newDiv.appendChild(newP);
    newDiv.appendChild(newP2);

    var newSection = document.createElement('section');
    newSection.setAttribute('id', `section${i+4}`);
    newSection.setAttribute('data-nav', `Section ${i+4}`);
    newSection.appendChild(newDiv);
    mainSection.appendChild(newSection);
}

// build the nav
var navParent = document.querySelector('#navbar__list');
var count = 1;

sectionList = getAllSections();
sectionList.forEach(function(section) {
   var linkItem = document.createElement('li');
   var anchorItem = document.createElement('a');
   anchorItem.className = 'menu__link';
   anchorItem.textContent = section.getAttribute('data-nav');
   anchorItem.setAttribute('id', `sectionLink${count}`);
   linkItem.appendChild(anchorItem);
   linkItem.addEventListener('click', scrollToSection);
   navParent.appendChild(linkItem);
   count++;
});

// set the selected Button on load
handleScrollEvent();

// Add the event listener for scrolling

window.addEventListener('scroll', function() {
  // tranverse through each section item and see their 
  // position in the viewport
  if (!checking) {
    checking = true;
    timer = setTimeout( handleScrollEvent, 500 );
  }
});




