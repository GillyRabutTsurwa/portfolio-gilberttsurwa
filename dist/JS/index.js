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
};

const iconChangeOnLoad = () => {
	let icon = document.querySelector("#deviconLoad");
	let iconArray = [
		"html5-plain",
		"css3-plain",
		"javascript-plain",
		"bootstrap-plain",
		"sass-original",
		"jquery-plain",
		"nodejs-plain",
		"express-original-wordmark",
		"mongodb-plain-wordmark",
		"git-plain",
		"github-plain",
		"webpack-plain",
		"babel-plain",
		"heroku-original-wordmark",
		"gulp-plain"
	];
	let randomIndex = iconArray[Math.floor(Math.random() * iconArray.length)];

	iconArray.forEach(() => {
		icon.setAttribute("class", `devicon-${randomIndex}`);
	});
};

const iconChange = () => {
	let icon = document.querySelector("#devicon");

	let iconArray = [
		"html5-plain",
		"css3-plain",
		"javascript-plain",
		"vuejs-plain",
		"bootstrap-plain",
		"sass-original",
		"jquery-plain",
		"nodejs-plain",
		"express-original-wordmark",
		"mongodb-plain-wordmark",
		"git-plain",
		"github-plain",
		"webpack-plain",
		"babel-plain",
		"heroku-original-wordmark",
		"gulp-plain"
	];

	const oneByOne = () => {
		iconArray.forEach((currentIcon, index) => {
			setInterval(() => {
				icon.setAttribute("class", `devicon-${currentIcon}`);
			}, 3800 * (index + 1));
		});
	};

	oneByOne();
};

const typeWriterEffect = () => {
	const textElement = document.querySelector(".text-type");
	const words = JSON.parse(textElement.getAttribute("data-words"));
	const wait = textElement.getAttribute("data-wait");
	new TypeWriter(textElement, words, wait);
};

// TESTING:
const chart = document.getElementById("myFirstChart").getContext("2d");

let myChart = new Chart(chart, {
	type: "radar",
	data: {
		labels: [
			"CSS/Sass",
			"Javascript",
			"Typescript",
			"Vue",
			"React",
			"Svelte",
			"Tailwind",
			"Bootstrap",
			"Gulp",
			"Webpack"
		],
		datasets: [
			{
				label: "Comfort Levels",
				data: [ 84, 73, 49, 67, 45, 58, 68, 42, 60, 46 ],
				backgroundColor: "rgba(26, 41, 52, 0.5)"
			}
		],
		borderColor: "red"
	},
	options: {
		scale: {
			ticks: {
				display: true,
				// Voila. I've found at how to get rid of that square background of the numbers. It's the backdropColor property under ticks, under options and you assign it a colour. I just did it to transparent
				//TODO: Make sure to add this in your chartjs learning repo.
				// * So glad I found it
				backdropColor: "transparent",
				fontColor: "rgba(26,41,52,0.6)",

				beginAtZero: true,
				max: 100
			},
			pointLabels: {
				fontSize: 14, // fontSize is ok
				// don't know if i like it with or without
				//fontColor: "#1a2934", // fontColor is accessible
				fontFamily: "'Jost', 'sans-serif'"
			}
		}
	}
});

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
	}, 7600);

	setTimeout(() => {
		navBackground.classList.add("fadeIn");
	}, 8600);
};

const openFlexSliders = () => {
	const parentOfSlides = document.querySelector(".slider");
	const slides = [ ...parentOfSlides.children ];

	parentOfSlides.addEventListener("click", (e) => {
		slides.forEach((currentSlide) => {
			currentSlide.classList.remove("open");
		});

		if (e.target.classList.contains("slide")) {
			e.target.classList.toggle("open");
		}
		// e.target.classList.toggle("open");
	});
};

const init = () => {
	setTimeout(() => {
		setInterval(nextSlide, 5000);
	}, 3800);

	iconChangeOnLoad();
	iconChange();
	typeWriterEffect();
	fadeNavButton();
	openFlexSliders();
};

const loading = () => {
	setTimeout(() => {
		document.querySelector(".loader").style.opacity = 0;
		document.querySelector(".loader").style.display = "none";

		document.querySelector(".maincontent").style.display = "block";
		setTimeout(() => {
			document.querySelector(".maincontent").style.opacity = 1;
		}, 50);
	}, 3800);

	init();
};

// will delete soon. But i replaced document.addEventListener("DOMContentLoaded", loading) with code below. Apparently there is a difference.
window.addEventListener("load", loading);
