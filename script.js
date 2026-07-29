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
    "10:32",
    
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