const progress = document.getElementById("progress");
const loadingText = document.getElementById("loadingText");
const startSection = document.getElementById("startSection");

let width = 0;

const messages = [
    "Analyzing memories...",
    "Collecting moments...",
    "Reviewing 31 years...",
    "Measuring impact...",
    "Calculating love received...",
    "Result: Infinite"
];

let messageIndex = 0;

/* =========================
   LOADING
========================= */
const loadingInterval = setInterval(() => {

    width += 2;
    progress.style.width = width + "%";

    if (width % 15 === 0 && messageIndex < messages.length) {
        loadingText.innerText = messages[messageIndex];
        messageIndex++;
    }

    if (width >= 100) {
        clearInterval(loadingInterval);
        loadingText.innerText = "ACCESS GRANTED";
        startSection.classList.remove("hidden");
    }

}, 60);


/* =========================
   VOICE QUEUE
========================= */
function speakQueue(lines, onComplete) {

    let i = 0;

    function next() {

        if (i >= lines.length) {
            if (onComplete) onComplete();
            return;
        }

        const utter = new SpeechSynthesisUtterance(lines[i]);
        utter.rate = 0.9;
        utter.pitch = 1;

        utter.onend = () => {
            i++;
            setTimeout(next, 500);
        };

        speechSynthesis.speak(utter);
    }

    speechSynthesis.cancel();
    next();
}


/* =========================
   START BUTTON
========================= */
document.getElementById("startBtn").addEventListener("click", () => {

    startSection.style.display = "none";

    const intro = [
        "Welcome Mom.",
        "This is not just a birthday card.",
        "This is your life story.",
        "A journey built with love.",
        "Today we celebrate a legacy.",
        "Let us travel through time."
    ];

    speakQueue(intro, startScene2);
});


/* =========================
   SCENE 2
========================= */
function startScene2() {

    document.querySelector(".scene1").style.display = "none";

    const scene2 = document.getElementById("scene2");
    scene2.classList.remove("hidden");

    let age = 1;

    const counter = document.getElementById("ageCounter");
    counter.innerText = age;
    counter.style.opacity = "1";

    const interval = setInterval(() => {

        age++;

        counter.style.opacity = "0";

        setTimeout(() => {
            counter.innerText = age;
            counter.style.opacity = "1";
        }, 120);

        if (age >= 31) {

            clearInterval(interval);

            setTimeout(showBirthday, 2000);
        }

    }, 320);
}


/* =========================
   BIRTHDAY SCREEN
========================= */
function showBirthday() {

    const counter = document.getElementById("ageCounter");

    counter.innerHTML = `
        <div>31</div>
        <div style="font-size:55px;margin-top:20px;letter-spacing:6px;">
            HAPPY BIRTHDAY 🎉
        </div>
    `;

    setTimeout(startScene3, 2500);
}


/* =========================
   SCENE 3 DATA
========================= */
const photos = [
    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg",
    "images/photo5.jpg",
    "images/photo6.jpg",
    "images/photo7.jpg"
];


/* =========================
   SCENE 3 START
========================= */
function startScene3() {

    document.getElementById("scene2").style.display = "none";

    const scene3 = document.getElementById("scene3");
    scene3.classList.remove("hidden");

    startSlideshow();
    startNarrationAndTyping();
}


/* =========================
   SLIDESHOW
========================= */
function startSlideshow() {

    const bg = document.getElementById("photoBg");

    let i = 0;
    bg.style.backgroundImage = `url('${photos[0]}')`;

    setInterval(() => {
        i = (i + 1) % photos.length;
        bg.style.backgroundImage = `url('${photos[i]}')`;
    }, 5000);
}


/* =========================
   SCENE 3 SYNC (FIXED LONG + CLEAN + SPACED)
========================= */
function startNarrationAndTyping() {

    const script = [
        { text: "Dear Mom ❤️", speak: "Dear Mom" },

        {
            text: "Today we celebrate your life 🎉 and everything you have done for us 💛.",
            speak: "Today we celebrate your life and everything you have done for us."
        },

        {
            text: "You are the heart of this family ❤️, the reason we stand strong 💪.",
            speak: "You are the heart of this family, the reason we stand strong."
        },

        {
            text: "Every sacrifice you made built the foundation of our lives 🏠.",
            speak: "Every sacrifice you made built the foundation of our lives."
        },

        {
            text: "Your love shaped who we are today 🌟.",
            speak: "Your love shaped who we are today."
        },

        {
            text: "Even when things were hard, you never gave up 🤗.",
            speak: "Even when things were hard, you never gave up."
        },

        {
            text: "You gave more than anyone could ever return 💞.",
            speak: "You gave more than anyone could ever return."
        },

        {
            text: "We see you. We appreciate you. We love you ❤️.",
            speak: "We see you. We appreciate you. We love you."
        },

        {
            text: "Today is your special day 🎂.",
            speak: "Today is your special day."
        },

        {
            text: "Happy Birthday Mom 🎊❤️",
            speak: "Happy Birthday Mom"
        },

        {
            text: "From your son, Junior 💙.",
            speak: "From your son, Junior"
        }
    ];

    const target = document.getElementById("typedText");
    target.innerHTML = "";

    let i = 0;

    speechSynthesis.cancel();

    function next() {

        if (i >= script.length) return;

        const line = script[i];

        let j = 0;

        const utter = new SpeechSynthesisUtterance(line.speak);
        utter.rate = 0.9;
        utter.pitch = 1;

        utter.onstart = () => {

            const typing = setInterval(() => {

                target.innerHTML += line.text.charAt(j);
                j++;

                if (j >= line.text.length) {
                    clearInterval(typing);
                    target.innerHTML += "<br><br>";
                }

            }, 20);
        };

        utter.onend = () => {
            i++;
            setTimeout(next, 500);
        };

        speechSynthesis.speak(utter);
    }

    next();
}