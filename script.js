/* Searchbox scripts */
const resetButton = document.querySelector("body > div.header > div.mainHeader > div > div.search-box > form > span.resetWrap");
const inputSearch = document.querySelector("body > div.header > div.mainHeader > div > div.search-box > form > input[type=text]");
const searchImage = document.querySelector("body > div.header > div.mainHeader > div > div.search-box > form > span.submitWrap > input[type=image]");
const backToTopButton = document.querySelector("body > div.content > div");

backToTopButton.addEventListener("click", () => {
    window.scrollTo(0, 0);
});

inputSearch.addEventListener("focusin", () => {
    searchImage.src = "images/search24.png";
});
inputSearch.addEventListener("focusout", () => {
    searchImage.src = "images/search24-white.png";
});

inputSearch.addEventListener("keyup", () => {
    if (inputSearch.value === "") {
        resetButton.style.display = "none";
    } else {
        resetButton.style.display = "block";
    }
});
resetButton.addEventListener("click", () => {
    inputSearch.value = "";
    resetButton.style.display = "none";
});


/* Slide  script*/
const slide = document.querySelector(".slideWrapper");
const elements = document.querySelectorAll(".slideElement");
const backButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");
const paginationDot = document.querySelectorAll(".pagination > span");

let slideInterval;
var counter = 0;   /* slide counter */
const size = elements[0].clientWidth;

init(); // Slide starts - event assignment to pagination dots

/* Event Listeners */
nextButton.addEventListener("click", () => {
    ++counter;
    slideTransition();
});
backButton.addEventListener("click", () => {
    if (counter > 0) {
        --counter;
    } else if (counter == -1) {
        counter = elements.length - 2;
    } else {
        counter = elements.length - 1;
    }
    slideTransition();
});
slide.addEventListener("mouseenter", slideMouseEntered);
slide.addEventListener("mouseleave", slideMouseLeave);
backButton.addEventListener("mouseenter", slideMouseEntered);
nextButton.addEventListener("mouseenter", slideMouseEntered);
backButton.addEventListener("mouseleave", slideMouseLeave);
nextButton.addEventListener("mouseleave", slideMouseLeave);

/*functions */
function init() {
    startSlide();

    paginationDot.forEach((pagination) => {
        pagination.addEventListener("click", (e) => {
            clearInterval(slideInterval);
            paginationDot[counter].style.color = "rgba(102, 99, 99, 0.246)";

            counter = e.target.id;
            slide.style.transform = "translateX(" + (-size * counter) + "px)";
            pagination.style.color = "rgb(223, 120, 2)";
            startSlide();
        });
    });


    paginationDot[paginationDot.length - 1].addEventListener("click", function (e) {
        clearInterval(slideInterval);
        slide.style.transform = "translateX(" + (-size * e.target.id) + "px)";
        counter = -1;
        startSlide();

    });
}

function startSlide() {
    /* slide interval */
    slideInterval = setInterval(() => {
        counter++;
        slideTransition();
    }, 3000);
}

function slideMouseEntered() {
    clearInterval(slideInterval);
}
function slideMouseLeave() {
    startSlide();
}

const slideTransition =  () => {
    if (counter == 9) {
        paginationDot[0].style.color = "rgba(102, 99, 99, 0.246)";
    }
    if (counter === 0) {
        paginationDot[elements.length - 1].style.color = "rgba(102, 99, 99, 0.246)";
    } else {
        paginationDot[counter - 1].style.color = "rgba(102, 99, 99, 0.246)";
    }
    paginationDot[counter].style.color = "rgb(223, 120, 2)";

    slide.style.transform = "translateX(" + (-size * counter) + "px)";
    if (counter === elements.length - 1) {
        counter = -1;
    } else {
        paginationDot[counter + 1].style.color = "rgba(102, 99, 99, 0.246)";
    }
}
