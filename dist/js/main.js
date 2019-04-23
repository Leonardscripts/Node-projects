// Select DOM Items
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const menuNav = document.querySelector(".menu-nav");
const menuBranding = document.querySelector(".menu-branding");
const navItems = document.querySelectorAll(".nav-item");

// Set Initial State Of Menu
let showMenu = false;

menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    menuBtn.classList.add("close");
    menu.classList.add("show");
    menuNav.classList.add("show");
    menuBranding.classList.add("show");
    navItems.forEach(item => item.classList.add("show"));

    // Set Menu State
    showMenu = true;
  } else {
    menuBtn.classList.remove("close");
    menu.classList.remove("show");
    menuNav.classList.remove("show");
    menuBranding.classList.remove("show");
    navItems.forEach(item => item.classList.remove("show"));

    //Set Menu State
    showMenu = false;
  }
}

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAOI0C50WpPkJj8WEXmaXlaasfh6_IOBg0",
  authDomain: "contact-6359e.firebaseapp.com",
  databaseURL: "https://contact-6359e.firebaseio.com",
  projectId: "contact-6359e",
  storageBucket: "contact-6359e.appspot.com",
  messagingSenderId: "131417728501"
};
firebase.initializeApp(config);

// Reference messaages collection
var messagesRef = firebase.database().ref("messages");

// Listen for for submit
document.getElementById("contactForm").addEventListener("submit", submitForm);

// Submit form
function submitForm(e) {
  e.preventDefault();

  // Get values
  var name = getInputVal("name");
  var company = getInputVal("company");
  var email = getInputVal("email");
  var phone = getInputVal("phone");
  var message = getInputVal("message");

  // Save Message
  saveMessage(name, company, phone, message);
}

// Function to get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

// Save firebase message
function saveMessage(name, company, email, phone, message) {
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    company: company,
    email: email,
    phone: phone,
    message: message
  });
}
