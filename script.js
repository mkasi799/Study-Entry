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

    "8:30",

    "9:30",

    "10:00",

    "10:30",

    "11:00",

    "11:30",

    "12:30",

    "13:30",

    "14:00",

    "15:00",

    "15:30",

    "16:30",

    "17:00",

    "17:30",

    "18:00",

    "18:30",

    "20:00"

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

    // Current time in seconds
    const currentSeconds =
        now.getHours() * 60 * 60 +
        now.getMinutes() * 60 +
        now.getSeconds();

    let allowed = false;

    for (const startTime of sessions) {

        const start = convertToSeconds(startTime);

        // Exactly 5 minutes after the scheduled start
        const end = start + (5 * 60);

        if (currentSeconds >= start &&
            currentSeconds < end) {

            allowed = true;
            break;

        }

    }

    const message = document.getElementById("message");

    if (allowed) {

        message.textContent = "";

        // Get the participant's Sona ID from the URL
        const params = new URLSearchParams(window.location.search);
        const surveyCode = params.get("id");

        // Build the Qualtrics URL
        let redirectURL = qualtricsURL;

        if (surveyCode) {
            redirectURL += "?id=" + encodeURIComponent(surveyCode);
        }

        // Redirect to Qualtrics
        window.location.href = redirectURL;

    } else {

        message.textContent = "Unfortunately, the check-in window for your scheduled session has closed. As a result, you will not receive credit for this session. Please wait 1-2 days before registering for this study again to allow your participation status to be updated.";

    }

}



// =========================
// CONVERT HH:MM TO SECONDS
// =========================

function convertToSeconds(time) {

    const parts = time.split(":");

    return Number(parts[0]) * 60 * 60 +
           Number(parts[1]) * 60;

}