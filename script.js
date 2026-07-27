// =========================
// QUALTRICS LINK
// =========================

const qualtricsURL = "https://google.com";



// =========================
// SESSION TIMES
// =========================

const sessions = [

    {
        date: "2026-07-27",
        start: "00:00",
        end: "23:59"
    },

    {
        date: "2026-08-04",
        start: "10:00",
        end: "10:05"
    }

];



// =========================
// BUTTON
// =========================

document.getElementById("continueButton").addEventListener("click", checkTime);



function checkTime(){

    const now = new Date();

    const today =
        now.getFullYear() + "-" +
        String(now.getMonth()+1).padStart(2,"0") + "-" +
        String(now.getDate()).padStart(2,"0");

    const currentMinutes =
        now.getHours()*60 +
        now.getMinutes();

    let allowed = false;

    for(const session of sessions){

        if(session.date !== today){

            continue;

        }

        const start =
            convertToMinutes(session.start);

        const end =
            convertToMinutes(session.end);

        if(currentMinutes >= start &&
            currentMinutes <= end){

            allowed = true;

        }

    }

    if(allowed){

        window.location.href = qualtricsURL;

    }

    else{

        document.getElementById("message").textContent =
        "You cannot join.";

    }

}



function convertToMinutes(time){

    const parts = time.split(":");

    return Number(parts[0])*60 +
           Number(parts[1]);

}