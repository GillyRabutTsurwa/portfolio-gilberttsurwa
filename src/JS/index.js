const loading = () => {
	setTimeout(() => {
		document.querySelector(".loader").style.opacity = 0;
		document.querySelector(".loader").style.display = "none";

		document.querySelector(".maincontent").style.display = "block";
		setTimeout(() => {
			document.querySelector(".maincontent").style.opacity = 1;
		},50)
	},3800);

	init();
}

const nextSlide = () => {
	const slides = document.querySelectorAll(".header__slider--slide");
	const current = document.querySelector(".current");
	let nextImage = current.nextElementSibling;

	current.classList.remove("current");
	if (nextImage) {
		nextImage.classList.add("current");
	}
	else {
		slides[0].classList.add("current");
	}
	setTimeout(() => current.classList.remove("current"));
}


const collapseAndShow = () => {
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

const iconChangeOnLoad = () => {
	let icon = document.querySelector("#deviconLoad");
	let iconArray = ["html5-plain", "css3-plain", "javascript-plain", "bootstrap-plain", "sass-original", "jquery-plain", "nodejs-plain", "express-original-wordmark", "mongodb-plain-wordmark", "git-plain", "github-plain", "webpack-plain", "babel-plain", "heroku-original-wordmark", "gulp-plain"];
	let randomIndex = iconArray[Math.floor(Math.random() * iconArray.length)];

	iconArray.forEach((currentIcon, index) => {
			icon.setAttribute("class", `devicon-${randomIndex}`);
	});



}

const iconChange = () => {
	let icon = document.querySelector("#devicon");
	// NOTE: Current class of the icon is: devicon-html5-plain`;
	//GOAL: Is to extract the "html5 portion and use names in an array to change the classname"
	// This will in turn change the class
	console.log(icon.getAttribute("class"));

	let iconArray = ["html5-plain", "css3-plain", "javascript-plain", "bootstrap-plain", "sass-original", "jquery-plain", "nodejs-plain", "express-original-wordmark", "mongodb-plain-wordmark", "git-plain", "github-plain", "webpack-plain", "babel-plain", "heroku-original-wordmark", "gulp-plain"];

	const oneByOne = () => {
		iconArray.forEach((currentIcon, index) => {
			setInterval(() => {
				// icon.setAttribute("class", `devicon-${currentIcon}-plain`);
				icon.setAttribute("class", `devicon-${currentIcon}`);
			}, 3800 * (index + 1));
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
		const current = this.wordIndex % this.words.length;
		const fullText = this.words[current];
		if (this.isDeleting) {
			this.txt = fullText.substring(0, this.txt.length - 1);
		}
		else {
			this.txt = fullText.substring(0, this.txt.length + 1);
		}

		this.textElement.innerHTML = `<span class="txt">${this.txt}</span>`;

		let typeSpeed = 300;
		if (this.isDeleting) {
			typeSpeed /= 2;
		}

		if (!this.isDeleting && this.txt === fullText) {
			typeSpeed = this.wait;
			this.isDeleting = true;
		}
		else if (this.isDeleting && this.txt === "") {
			this.isDeleting = false;
			this.wordIndex++;
			typeSpeed = 500;
		}

		setTimeout(() => this.type(), typeSpeed);
	}
}

const fadeNavButton = () => {
	const navButton = document.querySelector(".navigation__button");
	const navBackground = document.querySelector(".navigation__background");

	setTimeout(() => {
		navButton.classList.add("fadeIn");
		navBackground.classList.add("fadeIn");
	}, 7600)
}

const init = () => {
	setInterval(nextSlide, 5000);
	collapseAndShow();
	iconChangeOnLoad();
	iconChange();
	typeWriterEffect();
	fadeNavButton();
};

document.addEventListener("DOMContentLoaded", loading);