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

    document.getElementById("scene2").style.display = "none";

    const scene3 = document.getElementById("scene3");
    scene3.classList.remove("hidden");

    const bg = document.getElementById("photoBg");
    const box = document.getElementById("letterBox");
    const typed = document.getElementById("typedText");

    const photos = [
        "Images/photo1.jpg",
        "Images/photo2.jpg",
        "Images/photo3.jpg",
        "Images/photo4.jpg",
        "Images/photo5.jpg",
        "Images/photo6.jpg",
        "Images/photo7.jpg"
    ];
    photos.forEach(src => {
    const img = new Image();
    img.src = src;
});

    let photoIndex = 0;

bg.style.backgroundImage =
    `url('${photos[0]}')`;

setInterval(() => {

    photoIndex =
        (photoIndex + 1) % photos.length;

    bg.style.backgroundImage =
        `url('${photos[photoIndex]}')`;

}, 5000);

    const lines = [

        "Dear Mom ❤️",

        "Today we celebrate your life and everything you have done for us 🎉",

        "You are the heart of this family ❤️",

        "You have always given us strength, love and guidance 💛",

        "Your kindness and sacrifices have shaped our lives ✨",

        "Every memory we share is a treasure that will stay with us forever 💙",

        "Today we celebrate you, your journey and your beautiful heart ❤️",

        "Happy Birthday Mom 🎂🎁🎉",

        "From your son, Junior 💙"
    ];

    let lineIndex = 0;

    function writeNext(){

        if(lineIndex >= lines.length){
            return;
        }

        const line = lines[lineIndex];

        const speechText =
            line.replace(/[^\w\s]/g,"");

        const utter =
            new SpeechSynthesisUtterance(speechText);

        utter.rate = 0.9;
        utter.pitch = 1;

        let charIndex = 0;

        speechSynthesis.speak(utter);

        const typing = setInterval(() => {

            if(charIndex < line.length){

                typed.innerHTML +=
                    line.charAt(charIndex);

                charIndex++;

                box.scrollTop =
                    box.scrollHeight;

            }

        }, 35);

        utter.onend = () => {

            clearInterval(typing);

            typed.innerHTML += "<br><br>";

            lineIndex++;

            setTimeout(() => {

                writeNext();

            }, 300);

        };

    }

    writeNext();
}
