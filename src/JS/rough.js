const collapseAndShow = () => {
	//TODO: Don't forget to CALL ME
	let infoTitle = document.querySelectorAll(".info__heading");
	infoTitle.forEach(function(currentValue, index) {
		currentValue.addEventListener("click", function() {
			this.classList.toggle("toggled");
		});
	});

	$(".info__heading").each(function(index) {
		$(this).click(function() {
			// IMPORTANT:NOTE: Order of the code matters. This worked but the reverse didn't. Attention !
			$(".info__toggleAppear").eq(index).slideToggle("slow");
			$(".info__toggleAppear").eq(index).toggleClass("collapse");
		});
	});
};

const iconChange = () => {
	let icon = document.querySelector("#faIcon");
	icon.innerHTML = "&#xf13c";

	let iconArray = [ "&#xf13b", "&#xf3b9", "&#xf41e", "&#xf41b", "&#xf836"];

	const oneByOne = () => {
		iconArray.forEach((currentIcon, index) => {
			setInterval(() => {
				icon.innerHTML = currentIcon;
			}, 3500 * (index + 1)); //NOTE:IMPORTANT: index + 1 is the key ingredient
		});
	};

	oneByOne();
};

const typeWriterEffect = () => {
	const textElement = document.querySelector(".text-type");
	const words = JSON.parse(textElement.getAttribute("data-words"));
	// console.log(words); //TESTING:
	const wait = textElement.getAttribute("data-wait");
	new TypeWriter(textElement, words, wait);
};

//NOTE: TYPEWRITER EFFECT
class TypeWriter {
	constructor(textElement, words, wait = 3000) {
		this.textElement = textElement;
		this.words = words;
		this.txt = "";
		this.wordIndex = 0;
		this.wait = parseInt(wait, 10);
		this.type();
		this.isDeleting = false;
	}

	type() {
		// Current index of word
		const current = this.wordIndex % this.words.length;
		// Get full text of current word
		const fullText = this.words[current];
		// check if words are deleteing
		if (this.isDeleting) {
			// Remove a character
			this.txt = fullText.substring(0, this.txt.length - 1);
		}
		else {
			// Add a character
			this.txt = fullText.substring(0, this.txt.length + 1);
		}

		// Insert txt into element
		this.textElement.innerHTML = `<span class="txt">${this.txt}</span>`;

		// Inital Type Speed
		let typeSpeed = 300;
		if (this.isDeleting) {
			typeSpeed /= 2; // same as typeSpeed = typeSpeed / 2;
		}

		// if entire word is complete
		if (!this.isDeleting && this.txt === fullText) {
			// Make a pause at the end
			typeSpeed = this.wait;
			// Set delete to true
			this.isDeleting = true;
		}
		else if (this.isDeleting && this.txt === "") {
			// After entire word is deleted and there's no text
			// We switch to the next word
			this.isDeleting = false;
			this.wordIndex++;
			// Pause before typing next word
			typeSpeed = 500;
		}

		setTimeout(() => this.type(), typeSpeed);
	}
}

const init = () => {
	collapseAndShow();
	iconChange();
	typeWriterEffect();
};

const loading = () => {
	setTimeout(() => {
		document.querySelector(".loader").style.opacity = 0;
		document.querySelector(".loader").style.display = "none";

		document.querySelector(".maincontent").style.display = "block";
		setTimeout(() => {
			document.querySelector(".maincontent").style.opacity = 1;
		},50)
	},4000);

	init();
}

// init();

document.addEventListener("DOMContentLoaded", loading);

/** NOTE:
 * Ce code a marché mais je ne pouvais pas ajouter la transition, il me fallait utiliser jQuery.
 * Je garde ce code parce que je suis dur travaillé (pensé) pour l'implementer....
 * Mais je n'en ai pas besoin. 
 */
// infoTitle.forEach(function (currentValue, index) {
//     currentValue.addEventListener("click", function () {
//         infoContainer[index].classList.toggle("collapse");
//     });
// });
