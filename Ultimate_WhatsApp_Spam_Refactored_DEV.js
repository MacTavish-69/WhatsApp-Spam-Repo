// This script works by creating a form that takes input like message, who to mention, number of times to message
// and then dispatching those messages.

/*
 * Version 5.0.0
 * ------------------------------------------------ Strategy -----------------------------------------------------------
 * Store some config values which are used throughout the script and are changed very often.
 * There are multiple functions which perform a part of the functionality required for spamming.
 * Instead of duplicating code, these functions are called by other functions as needed.
 * In future, these functions may get broken down into further smaller functions.
 *
 * Functions:
 * createForm()
 * getFormInput()
 * mentionUser()
 * handleMessage()
 * spam()
 * deleteForm()
 * toggleDisplay()
 */

// Configs, update them when WhatsApp updates!
var SELECTOR_WHATSAPP_MESSAGE_CONTAINER = "._13NKt";
var SELECTOR_WHATSAPP_SEND_BUTTON = "._4sWnG";
var SELECTOR_WHATSAPP_MAIN_CONTAINER = "#app";

/**
 * Create the form
 */
function createForm() {

    // Create a style tag to host style rules
    let body = document.querySelector(SELECTOR_WHATSAPP_MAIN_CONTAINER);
    let style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
	  .hide-me {
      display: none !important;
    }
	 .form-box {
      color: silver;
      width: 50%;
      border: 1px solid gray;
      position: absolute;
      top: 10%;
      left: 30%;
      background-color: #404040;
      z-index: 2000;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }
	 .text-input {
	    display: block;
	    width: 80%;
	    padding: .5rem;
	    margin: .5rem;
	    margin-bottom: 1rem;
	    border: none;
	    border-bottom: 1px solid silver;
	    color: silver;
	    background-color: #404040;
    }
    .spam-btns {
      display: block;
      width: 75%;
      padding: 1rem;
      margin: .5rem;
      margin-bottom: 1rem;
      border-radius: 1.625rem;
      color: #ffffff;
      background-color: #282936;
      font-size: 1.1rem;
      border: 2px solid silver;
    }
    .spam-btns:hover {
      background-color: silver;
      color: black;
      font-weight: 600;
    }
    .radio-input-wrapper {
	    color: silver;
	    padding: 5px;
	    margin: 5px;
    }
    .delete {
      margin-top: 5px;
      margin-right: -3px;
      -webkit-appearance: none;
      background-color: #16c72e;
      border: none;
      border-radius: 290486px;
      cursor: pointer;
      pointer-events: auto;
      display: inline-block;
      flex-grow: 0;
      flex-shrink: 0;
      font-size: 0;
      height: 20px;
      max-height: 20px;
      max-width: 20px;
      min-height: 20px;
      min-width: 20px;
      outline: 0;
      position: relative;
      vertical-align: top;
      width: 20px;
    }
    .delete::before {
      height: 2px;
      width: 50%;
    }
    .delete::after {
      height: 50%;
      width: 2px;
    }
    .delete::after, .delete::before {
      background-color: #fff;
      content: "";
      display: block;
      left: 50%;
      position: absolute;
      top: 50%;
      transform: translateX(-50%) translateY(-50%) rotate(45deg);
      transform-origin: center center;
    }
    .X { position: absolute !important;
      margin: 5px;
      top: 0;
      right: 0;
      color: yellow;
      text-decoration: none;
    }
    .text-center {
      text-align: center;
    }
    .ml-4 {
      margin-left: 1rem;
    }
    .mr-4 {
      margin-right: 1rem;
    }
    `;

    document.getElementsByTagName('head')[0].appendChild(style);

    // Create a form and add elements to it
    let form = document.createElement("form");
    form.id = "form";
    form.classList.add("form-box");
    form.innerHTML = `
	  <span class="radio-input-wrapper">
      <label for="sticker-checkbox">Send a Sticker?</label>
      <input id="sticker-checkbox" class="radio-input" type="checkbox" name="toggle_checkbox" onclick="toggleDisplay()">
    </span>

    <div class="sticker-wrapper text-center ml-4 mr-4">
      <h4> Please click on sticker of your choice and fill in how many times you want to send it. </h4>
    </div>

    <a href="#" class="X delete" onclick="deleteForm()"></a>

    <div id="form_text-container">
	    <input class="text-input" id="message" type="text" name="message" placeholder="Type your message" required>
	    <input class="text-input" id="name" type="text" name="name" placeholder="YourContactName">
	    <input class="text-input" id="mobile" type="text" name="mobile"  placeholder="YourContactNumber">
	    <span class="radio-input-wrapper">
	      <label for="start">Add @mention to start</label>
	      <input id="start" class="radio-input" type="radio" name="addTo" value="start">
	    </span>
	    <span class="radio-input-wrapper">
	      <label for="end">Add @mention to End</label>
	      <input id="end" class="radio-input" type="radio" name="addTo" value="end">
	    </span>
    </div>

    <input id="strike-counter" class="text-input" type="number" name="strike-counter" placeholder="For how many times?" required>
    <button id="launch" class="spam-btns" type="button" name="spam-btn" onclick="spam()">Spam it !</button>
    `;
    body.appendChild(form);
}

// Create the form. Form must be created before setting any globals since they mainly use elements generated via this form
createForm();

/* ------------------- A place for GLOBAL VARIABLES. DO NOT MUTATE! ------------------- */
var spamForm = document.getElementById("form");
var switchToStickerCheckbox = document.getElementById("sticker-checkbox");
var formTextContainer = document.getElementById("form_text-container");
var launchButton = document.getElementById("launch");
var strikeCount = document.getElementById("strike-counter");
var whatsappMessageContainer = document.querySelectorAll(SELECTOR_WHATSAPP_MESSAGE_CONTAINER)[1];
var debugMode = true;

// Send Button can not be acquired here since it is generated when some input is provided to the text container
// Please use the Selector to get button via querySelector wherever needed.
// var whatsappSendButton = document.querySelector(SELECTOR_WHATSAPP_SEND_BUTTON);
/* ------------------- END of GLOBAL VARIABLES ------------------- */

/**
 * Log messages to console when debugMode is ON.
 */
function logDebugMessage(message) {
  if (debugMode) {
    console.log(message);
  }
}

/**
 * Toggle Display between Text Spam & Sticker Spam
 */
function toggleDisplay () {
    // Some other time :(
}

/**
 * Delete/Close the form
 */
function deleteForm() {
    spamForm.remove();
}

/**
 * get all the input of form and return an object
 * @return Object
 */
function getFormInput() {
    let formInput = {message: "", contactName: "", contactNumber: "", counter: "", mentionAtStart: "", mentionAtEnd: ""};

    // Insert all form inputs value in to the object
    formInput.message = document.getElementById("message").value;
    formInput.contactName = document.getElementById("name").value;
    formInput.contactNumber = document.getElementById("mobile").value;
    formInput.counter = parseInt(strikeCount.value);
    formInput.mentionAtStart = document.getElementById("start").checked;
    formInput.mentionAtEnd = document.getElementById("end").checked;

    return formInput;
}

/**
 * mention the user by preparing the container element that wraps the markup which mentions a user.
 * @return HTML Element
 */
function mentionUser() {
    var formInput = getFormInput();

    // Generate the markup for Mentioning if Contact Name & Number is provided
    if (formInput.contactName != '' && formInput.contactNumber != '') {
        let spanContainer = document.createElement("span");

        // Apply required attributes to it
        spanContainer.setAttribute("class", "copyable-text selectable-text");
        spanContainer.setAttribute("data-mention-jid", formInput.contactNumber +"@c.us");
        spanContainer.setAttribute("data-original-name", formInput.contactName);
        spanContainer.setAttribute("data-plain-text", formInput.contactName);

        let span_at_symbol = document.createElement("span");
        span_at_symbol.setAttribute("class", "at-symbol");

        let span_name = document.createElement("span");
        span_name.innerHTML = formInput.contactName;

        // Lets append elements
        spanContainer.appendChild(span_at_symbol);
        spanContainer.appendChild(span_name);

        return spanContainer;
    }
}

/**
 * Append the message & mention User markup (if applicable) to the Message Container of WhatsApp Web
 */
function handleMessage() {
    let formInput = getFormInput();
    logDebugMessage("Form Input:");
    logDebugMessage(formInput);

    let mentionedUser = mentionUser();
    logDebugMessage("New created element to mention user:");
    logDebugMessage(mentionedUser);

    // Create a text node (that contains message to send)
    let text = document.createTextNode(" "+formInput.message+" ");

    // Add the (message to send) to the WhatsApp Message Container
    if (formInput.mentionAtStart) {
        whatsappMessageContainer.appendChild(mentionedUser);
        whatsappMessageContainer.appendChild(text);
    }
    else if (formInput.mentionAtEnd) {
        whatsappMessageContainer.appendChild(text);
        whatsappMessageContainer.appendChild(mentionedUser);
    }
    else {
        whatsappMessageContainer.appendChild(text);
    }
}

/**
 * Spam the message as per the value given in Counter.
 */
function spam() {
    let formInput = getFormInput();

    for (let i = 0; i < formInput.counter; i++) {

        // ready to fire!
        handleMessage();

        logDebugMessage("Message Container Ready for spamming");
        logDebugMessage(whatsappMessageContainer);

        // Generating Fire event!
        // Dispatching an input event so whatsapp generates Send button
        var event = document.createEvent('Event');
        event.initEvent('input', true, true);
        whatsappMessageContainer.dispatchEvent(event);

        // Get the button & Launch the Strike!
        let whatsappSendButton = document.querySelector(SELECTOR_WHATSAPP_SEND_BUTTON);
        whatsappSendButton.click();
    }
}
