const progress = document.getElementById("progress");
const loadingText = document.getElementById("loadingText");
const startSection = document.getElementById("startSection");
const startBtn = document.getElementById("startBtn");

/* LOADING */

let width = 0;

const loading = setInterval(() => {

    width++;

    progress.style.width = width + "%";

    if(width === 20){
        loadingText.textContent = "Analyzing memories...";
    }

    if(width === 40){
        loadingText.textContent = "Collecting moments...";
    }

    if(width === 60){
        loadingText.textContent = "Reviewing 31 years...";
    }

    if(width === 80){
        loadingText.textContent = "Calculating love received...";
    }

    if(width >= 100){

        clearInterval(loading);

        loadingText.textContent = "ACCESS GRANTED";

        startSection.classList.remove("hidden");
    }

},50);

/* VOICE */

function speakLines(lines, callback){

    speechSynthesis.cancel();

    let index = 0;

    function next(){

        if(index >= lines.length){

            if(callback){
                callback();
            }

            return;
        }

        const utter =
            new SpeechSynthesisUtterance(lines[index]);

        utter.rate = 0.9;

        utter.onend = () => {

            index++;

            setTimeout(next,500);

        };

        utter.onerror = () => {

            index++;

            setTimeout(next,500);

        };

        speechSynthesis.speak(utter);
    }

    next();
}

/* START */

startBtn.addEventListener("click", () => {

    startSection.classList.add("hidden");

    speakLines([
        "Welcome Mom.",
        "This is not just a birthday card.",
        "This is a celebration of your life.",
        "Let us travel through time."
    ], startScene2);

});

/* SCENE 2 */

function startScene2(){

    document.querySelector(".scene1").style.display = "none";

    const scene2 =
        document.getElementById("scene2");

    scene2.classList.remove("hidden");

    const counter =
        document.getElementById("ageCounter");

    let age = 1;

    counter.textContent = age;

    const timer = setInterval(() => {

        age++;

        counter.textContent = age;

        if(age >= 31){

            clearInterval(timer);

            counter.innerHTML = `
                <div>31</div>
                <div style="font-size:32px;">
                    HAPPY BIRTHDAY 🎉
                </div>
            `;

            speechSynthesis.speak(
                new SpeechSynthesisUtterance(
                    "Happy Birthday Mom"
                )
            );

            setTimeout(startScene3,3000);
        }

    },300);
}

/* SCENE 3 */

function startScene3(){

    document.getElementById("scene2")
        .style.display = "none";

    document.getElementById("scene3")
        .classList.remove("hidden");

    const bg =
        document.getElementById("photoBg");

    const box =
        document.getElementById("letterBox");

    const typed =
        document.getElementById("typedText");

    const photos = [
        "images/photo1.jpg",
        "images/photo2.jpg",
        "images/photo3.jpg",
        "images/photo4.jpg",
        "images/photo5.jpg",
        "images/photo6.jpg",
        "images/photo7.jpg"
    ];

    let photoIndex = 0;

    bg.style.backgroundImage =
        `url('${photos[0]}')`;

    setInterval(() => {

        photoIndex++;

        if(photoIndex >= photos.length){
            photoIndex = 0;
        }

        bg.style.backgroundImage =
            `url('${photos[photoIndex]}')`;

    },5000);

    const lines = [

        "Dear Mom ❤️",

        "Today we celebrate your life and everything you have done for us 🎉",

        "You are the heart of this family ❤️",

        "You have always given us strength, love and guidance 💛",

        "Your kindness and sacrifices have shaped our lives ✨",

        "We appreciate everything you do for us 💙",

        "Happy Birthday Mom 🎂🎁🎉",

        "From your son, Junior 💙"
    ];

    let lineIndex = 0;

    function writeNext(){

        if(lineIndex >= lines.length){
            return;
        }

        const line = lines[lineIndex];

        speechSynthesis.speak(
            new SpeechSynthesisUtterance(
                line.replace(/[^\w\s]/g,"")
            )
        );

        let charIndex = 0;

        const typing = setInterval(() => {

            typed.innerHTML +=
                line.charAt(charIndex);

            charIndex++;

            box.scrollTop =
                box.scrollHeight;

            if(charIndex >= line.length){

                clearInterval(typing);

                typed.innerHTML += "<br><br>";

                lineIndex++;

                setTimeout(writeNext,800);
            }

        },25);
    }

    writeNext();
}
