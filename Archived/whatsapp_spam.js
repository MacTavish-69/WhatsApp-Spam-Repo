/* Some frequent msgs to send
	// document.querySelectorAll("._2S1VP")[1].innerHTML ="@Junaid Ko MultiThreading aor Hyper MultiThreading me FARQ nai pata";

	// document.querySelectorAll("._2S1VP")[1].innerHTML = "Apni marzi ka msg likh loo yahan🥴";
/*

// Written By MacTavish. Discord Tag: MacTavish#8517

/* Here is actual script to paste into console */

// for (let loopVariable = 0; loopVariable < NumberOfTimesYouWantToSendMessage; loopVariable++)
for (let i = 0; i < 5; i++) {

	// Get the Message Box
	let message_box = document.querySelectorAll("._2S1VP")[1];

	// Set the message
	message_box.innerHTML = "Type Whatever you want to send";

	// Emulate the fucking input event so whatsapp generates the send button
	let event = document.createEvent('Event');
	event.initEvent('input', true, true);
	message_box.dispatchEvent(event);

	// get the Send button
	let btn_send = document.querySelector("._35EW6");

	// Finally emualte the click and send the message
	btn_send.click();
}
