// =========================
// QUALTRICS LINK
// =========================

const qualtricsURL = "https://mtroyal.ca1.qualtrics.com/jfe/form/SV_6gOLMVUcweYF23I";



// =========================
// SESSION START TIMES
// Every session automatically lasts 5 minutes.
// These times are available EVERY DAY.
// =========================

const sessions = [

    "10:00",

    "12:30",

    "15:30",

    "17:00",

    "19:30"

];



// =========================
// BUTTON
// =========================

document
    .getElementById("continueButton")
    .addEventListener("click", checkTime);



// =========================
// CHECK TIME
// =========================

function checkTime() {

    const now = new Date();

    const currentMinutes =
        now.getHours() * 60 +
        now.getMinutes();

    let allowed = false;

    for (const startTime of sessions) {

        const start = convertToMinutes(startTime);

        const end = start + 5;

        if (currentMinutes >= start &&
            currentMinutes <= end) {

            allowed = true;
            break;

        }

    }

    const message = document.getElementById("message");

    if (allowed) {

        message.textContent = "";

        window.location.href = qualtricsURL;

    } else {

        message.textContent = "You cannot join.";

    }

}



// =========================
// CONVERT HH:MM TO MINUTES
// =========================

function convertToMinutes(time) {

    const parts = time.split(":");

    return Number(parts[0]) * 60 +
           Number(parts[1]);

}