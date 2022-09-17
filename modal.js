const regexEmail = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
let checkBoxArray = []
let isMobileNavbarOpened = false
let isFormValidated = false


const forms = {
  first: false,
  last: false,
  email: false,
  birthDate: false,
  quantity: false,
  checkBoxArray: false,
  checkbox1: false,
}


// DOM Elements
const modalBg = document.querySelector(".background");
const modalCloseIcon = document.querySelector(".close");
const modalBtn = document.querySelectorAll(".modal-btn");
const radioBtn = document.querySelectorAll(".checkbox-input");
const formData = document.querySelectorAll(".formData");
const mainNavLinks = document.querySelectorAll(".main-nav-link");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");


//Element by ID
const form = document.getElementById("form");
const inputFirst = document.getElementById("first");
const inputLast = document.getElementById("last");
const email = document.getElementById("email");
const birthDate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const checkbox1 = document.getElementById("checkbox1");
const div = document.getElementById("div");
const validationSection = document.getElementById("validation-section");
const validationBtn = document.getElementById("validation-btn");



// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
mainNavLinks.forEach((link) => link.addEventListener("click", function(event){
  setMainActiveLink(link)
}));
mobileNavLinks.forEach((link) => link.addEventListener("click", function(event){
  setMobileActiveLink(link)
}));
inputFirst.addEventListener("blur", checkFirstInput);
inputLast.addEventListener("blur", checkLastInput);
email.addEventListener("blur", checkEmail);
birthDate.addEventListener("blur", checkBirthDate);
quantity.addEventListener("blur", checkQuantity);
validationBtn.addEventListener("click", closeModal);
form.addEventListener('submit', function(event){
  event.preventDefault()
  handleSubmit()
})
modalCloseIcon.addEventListener("click", closeModal);

function setMainActiveLink(link) {
  mainNavLinks.forEach(l => {
    l.classList.remove('active-link')
  })
  link.classList.add('active-link')
}

function setMobileActiveLink(link) {
  mobileNavLinks.forEach(l => {
    l.classList.remove('active-link')
  })
  link.classList.add('active-link')
}

function editNav() {
  const x = document.getElementById("myTopnav");
  const mobileNavbar = document.querySelector('.mobile-navbar')
  const icon1 = document.getElementById('icon1')
  const icon2 = document.getElementById('icon2')
  isMobileNavbarOpened = !isMobileNavbarOpened
  if (x.className === "topnav") {
    x.className += " responsive";
    if(isMobileNavbarOpened) {
      icon1.style.display = "none"
      icon2.style.fontSize = "5vw"
      icon2.style.color = "white"
      icon2.style.backgroundColor = "red"
      mobileNavbar.style.right = "5px";
      mobileNavbar.style.display = "block";
    }
  } else {
    if(!isMobileNavbarOpened) {
      icon1.style.display = "block"
      icon2.style.fontSize = "9vw"
      icon2.style.color = "red"
      icon2.style.backgroundColor = "white"
    }
    mobileNavbar.style.display = "none"
    x.className = "topnav";
  }
}


// launch modal form
function launchModal() {
  modalBg.style.display = "block";
  form.style.display = "block"
  console.log('bur', radioBtn)

}

// close modal
function closeModal() {
  modalBg.style.display = "none";
  if(isFormValidated) {
    resetInputs()
    validationSection.style.display = "none";
  }
}

function resetInputs() {
  inputFirst.value = ''
  inputLast.value = ''
  email.value = ''
  birthDate.value = ''
  quantity.value = ''
  resetRadioBtn()
  checkbox1.checked = false
}

function hello(condition, formData, input, message, formEl) {
  const errorMessage =  formData.querySelector('p.error-message')
  let tutu;
  if (errorMessage === null && condition) {
    tutu = document.createElement('p')
    tutu.classList.add("error-message");
    tutu.innerText = message
    tutu.style.color = "red"
    tutu.style.fontSize = "10px"
    tutu.style.margin = "5px 0"
    formData.appendChild(tutu)
    if (input !== null) input.style.border = "2px solid red"
  } else if (errorMessage && condition) {
    formData.appendChild(errorMessage)
    if (input !== null) input.style.border = "2px solid red"
  } else if (errorMessage !== null) {
    errorMessage.remove()
    forms[formEl] = true
    if (input !== null) input.style.border = "none"
  }
}

//check input first name
function checkFirstInput() {
  hello(inputFirst.value.length < 2, formData[0], inputFirst, "Veuillez entrer deux caracteres minimum", "first")
}

//check input last name
function checkLastInput() {
  hello(inputLast.value.length < 2, formData[1], inputLast, "Veuillez entrer deux caracteres minimum", "last")
}

//check input email
function checkEmail() {
  hello( !regexEmail.test(email.value), formData[2], email, "Veuillez entrer un email valide", "email")
}

//check input birth date
function checkBirthDate() {
  const isDateValid = checkDate(new Date(birthDate.value))
  hello( !isDateValid, formData[3], birthDate, "Veuillez entrer une date valide", "birthDate")
}

//check input quantity date
function checkQuantity() {
  hello( quantity.value.length < 1, formData[4], quantity, "Veuillez entrer une quantité", "quantity")
}

//check radio btn
function checkData() {
  hello(  checkBoxArray.length === 0, formData[5], null, "Veuillez selectionner un tournoi", "checkBoxArray")
}

function checkCGU() {
  hello( checkbox1.checked === false , formData[6], null, "Veuillez accepter les conditions d'utilisation", "checkbox1")
}

function checkFormValidation() {
  inputFirst.value.length < 2 ? checkFirstInput() : forms.first = true
  inputLast.value.length < 2 ? checkLastInput() : forms.last = true
  !regexEmail.test(email.value) ? checkEmail() : forms.email = true
  !checkDate(new Date(birthDate.value)) ? checkBirthDate() : forms.birthDate = true
  quantity.value.length < 1 ? checkQuantity() : forms.quantity = true
  checkRadioBtn()
  checkBoxArray.length === 0 ? checkData()  : forms.checkBoxArray = true
  checkbox1.checked === false ? checkCGU() : forms.checkbox1 = true
}

function checkDate(date) {
  return date instanceof Date && !isNaN(date);
}

function checkRadioBtn() {
  radioBtn.forEach(el => {
    if(el.checked) {
      checkBoxArray.push(el)
    }
  })
}

function resetRadioBtn() {
  radioBtn.forEach(el => {
      el.checked = false
  })
}

function handleSubmit() {
  checkFormValidation()
  if(Object.values(forms).every(element => element === true)) {
    isFormValidated = !isFormValidated
    form.style.display = "none"
    validationSection.style.display = "flex";
    validationSection.style.flexDirection = "column";
    validationSection.classList.add('flex-between');
    div.style.display = "flex";
    div.classList.add('flex-center')
  }

}