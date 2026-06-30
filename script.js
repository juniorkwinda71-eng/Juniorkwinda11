const progress = document.getElementById("progress");
const loadingText = document.getElementById("loadingText");
const startSection = document.getElementById("startSection");
const startBtn = document.getElementById("startBtn");

/* ================= LOADING ================= */

let width = 0;

const loadingSteps = [
{ percent: 20, text: "Analyzing memories..." },
{ percent: 40, text: "Collecting moments..." },
{ percent: 60, text: "Reviewing 31 years..." },
{ percent: 80, text: "Calculating love..." },
{ percent: 100, text: "ACCESS GRANTED" }
];

const loadingInterval = setInterval(() => {

```
width++;

progress.style.width = width + "%";

loadingSteps.forEach(step => {
    if(width === step.percent){
        loadingText.innerText = step.text;
    }
});

if(width >= 100){

    clearInterval(loadingInterval);

    setTimeout(() => {
        startSection.classList.remove("hidden");
    }, 500);

}
```

}, 50);

/* ================= SPEECH ================= */

function speakLines(lines, callback){

```
speechSynthesis.cancel();

let index = 0;

function next(){

    if(index >= lines.length){

        if(callback){
            callback();
        }

        return;
    }

    const utter = new SpeechSynthesisUtterance(lines[index]);

    utter.rate = 0.9;
    utter.pitch = 1;

    utter.onend = () => {

        index++;

        setTimeout(next, 400);

    };

    utter.onerror = () => {

        index++;

        setTimeout(next, 400);

    };

    speechSynthesis.speak(utter);
}

next();
```

}

/* ================= START BUTTON ================= */

startBtn.addEventListener("click", () => {

```
startSection.style.display = "none";

speakLines([
    "Welcome Mom.",
    "This is not just a birthday card.",
    "Today we celebrate your journey.",
    "Let us travel through time."
], startScene2);
```

});

/* ================= SCENE 2 ================= */

function startScene2(){

```
document.querySelector(".scene1").style.display = "none";

const scene2 = document.getElementById("scene2");

scene2.classList.remove("hidden");

let age = 1;

const counter = document.getElementById("ageCounter");

counter.innerText = age;

const ageInterval = setInterval(() => {

    age++;

    counter.innerText = age;

    if(age >= 31){

        clearInterval(ageInterval);

        counter.innerHTML = `
            <div>31</div>
            <div style="font-size:40px;margin-top:10px;">
                HAPPY BIRTHDAY 🎉
            </div>
        `;

        speechSynthesis.speak(
            new SpeechSynthesisUtterance("Happy Birthday Mom")
        );

        setTimeout(startScene3, 3000);
    }

}, 300);
```

}

/* ================= SCENE 3 ================= */

function startScene3(){

```
document.getElementById("scene2").style.display = "none";

const scene3 = document.getElementById("scene3");
scene3.classList.remove("hidden");

const bg = document.getElementById("photoBg");
const box = document.getElementById("letterBox");
const text = document.getElementById("typedText");

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

bg.style.backgroundImage = `url('${photos[0]}')`;

setInterval(() => {

    photoIndex++;

    if(photoIndex >= photos.length){
        photoIndex = 0;
    }

    bg.style.backgroundImage =
        `url('${photos[photoIndex]}')`;

}, 5000);

const message = [
    "Dear Mom ❤️",
    "Today we celebrate your life and everything you have done for us 🎉",
    "You are the heart of this family ❤️",
    "Your love has guided us through every challenge 💛",
    "Your kindness, strength and sacrifices will never be forgotten ✨",
    "We love you more than words can describe 💙",
    "Happy Birthday Mom 🎂🎉",
    "From your son, Junior 💙"
];

let lineIndex = 0;

function writeNextLine(){

    if(lineIndex >= message.length){
        return;
    }

    const line = message[lineIndex];

    speechSynthesis.speak(
        new SpeechSynthesisUtterance(
            line.replace(/[^\w\s]/g, "")
        )
    );

    let charIndex = 0;

    const typing = setInterval(() => {

        text.innerHTML += line.charAt(charIndex);

        charIndex++;

        box.scrollTop = box.scrollHeight;

        if(charIndex >= line.length){

            clearInterval(typing);

            text.innerHTML += "<br><br>";

            lineIndex++;

            setTimeout(writeNextLine, 800);
        }

    }, 25);
}

writeNextLine();
```

}
