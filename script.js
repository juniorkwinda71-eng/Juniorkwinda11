const progress = document.getElementById("progress");
const loadingText = document.getElementById("loadingText");
const startSection = document.getElementById("startSection");

let width = 0;

const messages = [
    "Analyzing memories...",
    "Collecting moments...",
    "Reviewing 31 years...",
    "Calculating love...",
    "Result: Infinite"
];

let m = 0;

/* ================= LOADING ================= */

setInterval(() => {

    width += 2;
    progress.style.width = width + "%";

    if(width % 20 === 0 && m < messages.length){
        loadingText.innerText = messages[m];
        m++;
    }

    if(width >= 100){
        loadingText.innerText = "READY";
        startSection.classList.remove("hidden");
    }

}, 60);


/* ================= START ================= */

document.getElementById("startBtn").onclick = () => {

    startSection.style.display = "none";

    speak([
        "Welcome Mom",
        "This is your journey",
        "Let us begin"
    ], startScene2);
};


/* ================= VOICE ================= */

function speak(lines, cb){

    let i = 0;

    function next(){

        if(i >= lines.length){
            if(cb) cb();
            return;
        }

        const u = new SpeechSynthesisUtterance(lines[i]);
        u.rate = 0.9;

        u.onend = () => {
            i++;
            setTimeout(next, 400);
        };

        speechSynthesis.speak(u);
    }

    speechSynthesis.cancel();
    next();
}


/* ================= SCENE 2 ================= */

function startScene2(){

    document.querySelector(".scene1").style.display = "none";
    document.getElementById("scene2").classList.remove("hidden");

    let age = 1;
    const counter = document.getElementById("ageCounter");

    const interval = setInterval(() => {

        age++;
        counter.innerText = age;

        if(age >= 31){
            clearInterval(interval);
            setTimeout(startScene3, 2000);
        }

    }, 300);
}


/* ================= SCENE 3 ================= */

function startScene3(){

    document.getElementById("scene2").style.display = "none";
    document.getElementById("scene3").classList.remove("hidden");

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

    let i = 0;

    bg.style.backgroundImage = `url('${photos[0]}')`;

    setInterval(() => {
        i = (i + 1) % photos.length;
        bg.style.backgroundImage = `url('${photos[i]}')`;
    }, 4000);

    const script = [
        "Dear Mom ❤️",
        "Today we celebrate your life 🎉",
        "You are our strength 💛",
        "You are our heart ❤️",
        "We love you forever 💙",
        "Happy Birthday 🎂",
        "From your son, Junior"
    ];

    let s = 0;

    function type(){

        if(s >= script.length) return;

        let line = script[s];
        let j = 0;

        const t = setInterval(() => {

            text.innerHTML += line[j];
            j++;

            box.scrollTop = box.scrollHeight;

            if(j >= line.length){
                clearInterval(t);
                text.innerHTML += "<br><br>";
                s++;
                setTimeout(type, 500);
            }

        }, 18);
    }

    type();
}
