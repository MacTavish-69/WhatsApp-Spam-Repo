/* Here is actual script to paste into console */
// Written By MacTavish. Discord Tag: MacTavish#8517
function form() {
  // Create a style tag to host style rules
	let body = document.getElementById("app");
	let style_tag = document.createElement('style');
	style_tag.type = 'text/css';
	style_tag.innerHTML = `
	* {
		color: silver;
	}
	  .hide-me {
    display: none !important;
  }
	.form-box { width: 50%; border: 1px solid gray; position: absolute; top: 10%; left: 30%; background-color: #404040;
    z-index: 2000; display: flex; flex-direction: row; flex-wrap: wrap;justify-content: center;}
	.text-input { display: block; width: 80%; padding: .5rem; margin: .5rem; margin-bottom: 1rem;
	border: none; border-bottom: 1px solid silver; color: silver; background-color: #404040; }
  .spam-btns { display: block; width: 75%; padding: 1rem; margin: .5rem; margin-bottom: 1rem; border-radius: 1.625rem;
    color: #ffffff; background-color: #282936; font-size: 1.1rem; border: 2px solid silver; }
  .spam-btns:hover { background-color: silver; color: black; font-weight: 600; }
  .radio-input-wrapper { color: silver; padding: 5px; margin: 5px; }

  .delete { margin-top: 5px; margin-right: -3px; -webkit-appearance: none; background-color: #16c72e;
            border: none; border-radius: 290486px; cursor: pointer; pointer-events: auto; display: inline-block;
            flex-grow: 0; flex-shrink: 0; font-size: 0; height: 20px; max-height: 20px; max-width: 20px;
            min-height: 20px; min-width: 20px; outline: 0; position: relative; vertical-align: top; width: 20px; }

  .delete::before { height: 2px; width: 50%; }
  .delete::after { height: 50%; width: 2px; }
  .delete::after, .delete::before { background-color: #fff; content: ""; display: block; left: 50%; position: absolute;
    top: 50%; transform: translateX(-50%) translateY(-50%) rotate(45deg); transform-origin: center center; }
  .X { position: absolute !important; margin: 5px; top: 0; right: 0; color: yellow; text-decoration: none; }
	`;

	document.getElementsByTagName('head')[0].appendChild(style_tag);

  // Create a form and add elements to it
	let form = document.createElement("form");
  form.id = "form";
	form.classList.add("form-box");
	form.innerHTML = `
	<span class="radio-input-wrapper">
        <label for="sticker-checkbox">Send a Sticker?</label>
        <input id="sticker-checkbox" class="radio-input" type="checkbox" name="sticker_checkbox" onclick="toggleDisplay()">
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
  <input id="count" class="text-input" id="message" type="number" name="count" placeholder="For how many times?" required>
  <button id="fire" class="spam-btns" type="button" name="spam-btn" onclick="spam()">Spam it !</button>
  `;
	body.appendChild(form);
}
form();

function spam() {

  let contact_name = document.getElementById("mention").value;
  let contact_number = document.getElementById("ph_no").value;

  // Get the message and how many times to spam
  let message = document.getElementById("message").value;
  let count = document.getElementById("count").value;
  count = parseInt(count);

  // Get the container to append the messge to
  /* Update the message Container Class to since Whatsapp web has updated it.
   * Update FROM *_2S1VP* TO *_3FRCZ*
  */
  let message_container = document.querySelectorAll("._3FRCZ")[1];
  let text = document.createTextNode(" "+message+" ");

  function addMention() {
    if (contact_name && contact_number !== '') {
      let container_span = document.createElement("span");

      // Apply required attributes to it
      container_span.setAttribute("class", "copyable-text selectable-text");
      container_span.setAttribute("data-mention-jid", contact_number +"@c.us");
      container_span.setAttribute("data-original-name", contact_name);
      container_span.setAttribute("data-plain-text", contact_name);

      let span_at_symbol = document.createElement("span");
      span_at_symbol.setAttribute("class", "at-symbol");

      let name_span = document.createElement("span");
      name_span.innerHTML = contact_name;

      // Lets append elements
      container_span.appendChild(span_at_symbol);
      container_span.appendChild(name_span);

      if (document.getElementById("start").checked) {
        message_container.appendChild(container_span);
        message_container.appendChild(text);
      }
      if (document.getElementById("end").checked) {
        message_container.appendChild(text);
        message_container.appendChild(container_span);
      }
    }
    // If Mention feature is not used then use else block
    else {
      message_container.appendChild(text);
    }
  }

  for (let i = 0; i < count; i++) {
    addMention();
    // Dispatching an input event so whatsapp generates Send button
    var event = document.createEvent('Event');
    event.initEvent('input', true, true);
    message_container.dispatchEvent(event);

    // Emulate the click event on button to send message
    /* Update the Send Button Class since Whatsapp web has updated it.
     * Update FROM *_35EW6* TO *_1U1xa*
    */
    document.querySelector("._1U1xa").click();
  }
}

function delete_form() {
  let form = document.getElementById("form");
  // Ah, JS doesn't allow direct removal of a node. Go to parent and then remove a specific child.
  form.parentNode.removeChild(form);
}

function toggleDisplay () {
	let sticker_checkbox = document.getElementById("sticker-checkbox");
	let text_msg_form_container = document.getElementById("text-msg-form-container");

	if (sticker_checkbox.checked === false) {
		text_msg_form_container.classList.remove("hide-me");
		// document.getElementById("sticker_spam_btn-wrapper").innerHTML = "";
		document.getElementById("sticker-MRLS").classList.add("hide-me");
	}
	if (sticker_checkbox.checked === true) {
		text_msg_form_container.classList.add("hide-me");

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

function stickerSpam() {

	let sticker_checkbox = document.getElementById("sticker-checkbox");

	if (sticker_checkbox.checked === true) {

		let text_msg_form_container = document.getElementById("text-msg-form-container");
		text_msg_form_container.classList.add("hide-me");

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
		let count = document.getElementById("count").value;

		for (let i = 0; i < count; i++) {
			sticker[sticker_length-1].click();
		}
	}

}
