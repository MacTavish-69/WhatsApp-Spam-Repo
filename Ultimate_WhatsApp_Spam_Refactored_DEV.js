/* Here is actual script to paste into console */
// Written By MacTavish. Discord Tag: MacTavish#8517

function createForm() {
	
  // Create a style tag to host style rules
	let body = document.getElementById("app");
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

    <div class="sticker-wrapper">
      <h4> Please click on sticker of your choice and fill in how many times you want to send it. </h4>
      <p> Your Selected Sticker is: </p>
    </div>

    <a href="#" class="X delete" onclick="delete_form()"></a>

    <div id="text-msg-form-container">
	    <input class="text-input" id="message" type="text" name="message" placeholder="Type your message" required>
	    <input class="text-input" id="mention" type="text" name="" placeholder="YourContactName">
	    <input class="text-input" id="ph_no" type="text" name=""  placeholder="YourContactNumber">
	    <span class="radio-input-wrapper">
	      <label for="start">Add @mention to start</label>
	      <input id="start" class="radio-input" type="radio" name="addTo" value="start">
	    </span>
	    <span class="radio-input-wrapper">
	      <label for="end">Add @mention to End</label>
	      <input id="end" class="radio-input" type="radio" name="addTo" value="end">
	    </span>
    </div>

    <input id="counter" class="text-input" id="message" type="number" name="counter" placeholder="For how many times?" required>
    <button id="fire-text-msg" class="spam-btns" type="button" name="spam-btn" onclick="spam()">Spam it !</button>
    `;
	body.appendChild(form);
}
createForm();

  /* 
   * A place for GLOBAL VARIABLES. DO NOT MUTATE! .
  */
  var form = document.getElementById("form");
  var toggle_checkbox = document.getElementById("sticker-checkbox");
	var text_msg_form_container = document.getElementById("text-msg-form-container");
	var text_msg_spam_btn = document.getElementById("fire-text-msg");
  var count = document.getElementById("counter");  

  // Get the container to append the messge to 
  // Update the message Container Class to since Whatsapp web has updated it.
  // Update FROM *_2S1VP* TO *_3FRCZ*
  var message_container = document.querySelectorAll("._3FRCZ")[1];
  /*
   * END of GLOBAL VARIABLES
  */

function addMention() {

  /*
   * message & text has to be in addMention() because of the adding mention to the end of message.
   * If no message is created first then Mention will always be before the message since message will be
     Created Later
  */
  // Get the message
  let message = document.getElementById("message").value;

  // Create a text node from set message to append to Message Container Later
  let text = document.createTextNode(" "+message+" ");


  let contact_name = document.getElementById("mention").value;
  let contact_number = document.getElementById("ph_no").value;

  if (contact_name && contact_number !== '') {
    let span_container = document.createElement("span");

    // Apply required attributes to it
    span_container.setAttribute("class", "copyable-text selectable-text");
    span_container.setAttribute("data-mention-jid", contact_number +"@c.us");
    span_container.setAttribute("data-original-name", contact_name);
    span_container.setAttribute("data-plain-text", contact_name);

    let span_at_symbol = document.createElement("span");
    span_at_symbol.setAttribute("class", "at-symbol");

    let span_name = document.createElement("span");
    span_name.innerHTML = contact_name;

    // Lets append elements
    span_container.appendChild(span_at_symbol);
    span_container.appendChild(span_name);

    if (document.getElementById("start").checked) {
      message_container.appendChild(span_container);
      message_container.appendChild(text);
    }
    if (document.getElementById("end").checked) {
      message_container.appendChild(text);
      message_container.appendChild(span_container);
    }
  }
  // If Mention feature is not used then use else block
  else {
    message_container.appendChild(text);
  }
}

function spam() {

  // Get value of Counter to spam messages
  counter = count.value;
  counter = parseInt(counter);

  for (let i = 0; i < counter; i++) {
    addMention();

    // Dispatching an input event so whatsapp generates Send button
    var event = document.createEvent('Event');
    event.initEvent('input', true, true);
    message_container.dispatchEvent(event);

    /* 
     * Emulate the click event on button to send message
     * Update the Send Button Class since Whatsapp web has updated it.
     * Update FROM *_35EW6* TO *_1U1xa*
    */
    document.querySelector("._1U1xa").click();
  }
}

function stickerSpam() {

		// Get the length of all the sent sticker Array
		let stickers_length = document.querySelectorAll("._11S5R").length;

		// The last sent sticker is the one we need
		let sent_sticker = document.querySelectorAll("._11S5R")[stickers_length-1];
		let sent_sticker_SRC = sent_sticker.getAttribute("src");

		// Get the smiley button so we can navigate precisely to sticker
		let smiley = document.querySelector("._2Q56Q");
		// Open the smiley button so we can get stickers menu
		smiley.click();

		// Get the desired sticker using SRC of sent sticker
		// Refer to https://stackoverflow.com/questions/37081721/use-variables-in-document-queryselector for CSS.escape
		let sticker = document.querySelectorAll("img[src=" +CSS.escape(sent_sticker_SRC)+ "]");
		let sticker_length = sticker.length;

		// Get the number of times to spam sticker
		let counter = count.value;

		for (let i = 0; i < counter; i++) {
			sticker[sticker_length-1].click();
		}

}

function toggleDisplay () {

	if (toggle_checkbox.checked === false) {
		text_msg_form_container.classList.remove("hide-me");
		text_msg_spam_btn.classList.remove("hide-me");

		// Hide the button for Sticker Spam
		document.getElementById("sticker-MRLS").classList.add("hide-me");
	}
	if (toggle_checkbox.checked === true) {
		text_msg_form_container.classList.add("hide-me");
		text_msg_spam_btn.classList.add("hide-me");

		// create a Sticker Spam Fire button
		if (document.getElementById("sticker-MRLS") === null) {
			let sticker_spam_btn = document.createElement("div");
			sticker_spam_btn.id = "sticker_spam_btn-wrapper";
			sticker_spam_btn.innerHTML = `
			<button id="sticker-MRLS" class="spam-btns"
				type="button" name="spam-btn" onclick="stickerSpam()">Spam Sticker !</button>
			`
			// Append to the form
			let form = document.getElementById("form");
			form.appendChild(sticker_spam_btn);
		}
		document.getElementById("sticker-MRLS").classList.remove("hide-me");
	}
}

function delete_form() {

  // Ah, JS doesn't allow direct removal of a node. Go to parent and then remove a specific child.
  form.parentNode.removeChild(form);
}