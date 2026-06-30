const progress = document.getElementById("progress");
const loadingText = document.getElementById("loadingText");
const startSection = document.getElementById("startSection");

let width = 0;

const messages = [
"Analyzing memories...",
"Collecting moments...",
"Reviewing 31 years...",
"Calculating love received...",
"Preparing celebration...",
"Result: Infinite Love"
];

let m = 0;

/* ================= LOADING ================= */

const loadingInterval = setInterval(() => {

```
width += 2;

progress.style.width = width + "%";

if(width % 20 === 0 && m < messages.length){
    loadingText.innerText = messages[m];
    m++;
}

if(width >= 100){

    clearInterval(loadingInterval);

    progress.style.width = "100%";

    loadingText.innerText = "ACCESS GRANTED";

    startSection.classList.remove("hidden");
}
```

}, 60);

/* ================= START ================= */

document.getElementById("startBtn").onclick = () => {

```
startSection.style.display = "none";

speakLines([
    "Welcome Mom.",
    "This is not just a birthday card.",
    "This is a journey through your life.",
    "Today we celebrate thirty one years of love.",
    "Let us travel through time."
], startScene2);
```

};

/* ================= VOICE ================= */

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

    utter.rate = 0.88;
    utter.pitch = 1;
    utter.volume = 1;

    utter.onend = () => {

        index++;

        setTimeout(next, 500);

    };

    utter.onerror = () => {

        index++;

        setTimeout(next, 500);

    };

    speechSynthesis.speak(utter);
}

next();
```

}

/* ================= SCENE 2 ================= */

function startScene2(){

```
document.querySelector(".scene1").style.display = "none";

const scene2 = document.getElementById("scene2");

scene2.classList.remove("hidden");

let age = 1;

const counter = document.getElementById("ageCounter");

counter.innerText = age;

const interval = setInterval(() => {

    age++;

    counter.innerText = age;

    if(age >= 31){

        clearInterval(interval);

        setTimeout(() => {

            counter.innerHTML = `
                <div>31</div>
                <div style="font-size:40px;margin-top:10px;">
                    HAPPY BIRTHDAY 🎉
                </div>
            `;

            const happy = new SpeechSynthesisUtterance(
                "Happy Birthday Mom."
            );

            speechSynthesis.speak(happy);

            setTimeout(startScene3, 3000);

        }, 1000);

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

let currentPhoto = 0;

bg.style.backgroundImage = `url('${photos[0]}')`;

setInterval(() => {

    currentPhoto++;

    if(currentPhoto >= photos.length){
        currentPhoto = 0;
    }

    bg.style.backgroundImage =
        `url('${photos[currentPhoto]}')`;

}, 5000);

const script = [

    {
        text:"Dear Mom ❤️",
        speak:"Dear Mom"
    },

    {
        text:"Today we celebrate your life and everything you have done for us 🎉💛",
        speak:"Today we celebrate your life and everything you have done for us."
    },

    {
        text:"You are the heart of this family ❤️",
        speak:"You are the heart of this family."
    },

    {
        text:"You gave us strength when we needed it most 💪",
        speak:"You gave us strength when we needed it most."
    },

    {
        text:"Your kindness, sacrifice and love built the family we have today 💛",
        speak:"Your kindness, sacrifice and love built the family we have today."
    },

    {
        text:"Every memory we share is a treasure that will stay with us forever ✨",
        speak:"Every memory we share is a treasure that will stay with us forever."
    },

    {
        text:"Today we celebrate you, your journey and your beautiful heart ❤️",
        speak:"Today we celebrate you, your journey and your beautiful heart."
    },

    {
        text:"Happy Birthday Mom 🎂🎉🎁",
        speak:"Happy Birthday Mom."
    },

    {
        text:"From your son, Junior 💙",
        speak:"From your son Junior."
    }

];

let s = 0;

function showNextLine(){

    if(s >= script.length){
        return;
    }

    const line = script[s];

    let charIndex = 0;

    const utter = new SpeechSynthesisUtterance(
        line.speak
    );

    utter.rate = 0.88;

    speechSynthesis.speak(utter);

    const typing = setInterval(() => {

        text.innerHTML += line.text.charAt(charIndex);

        charIndex++;

        box.scrollTop = box.scrollHeight;

        if(charIndex >= line.text.length){

            clearInterval(typing);

            text.innerHTML += "<br><br>";

            s++;

            setTimeout(showNextLine, 1200);
        }

    }, 25);
}

showNextLine();
```

}
