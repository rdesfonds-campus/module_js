// you can write js here
console.log('exo-2');

//Test
const isTesting = true;

//créer date et messages

const myDate = new Date();

const messageWeek = "Pas encore le week-end :(";
const messageWeekend = "C'est le week-end :)";

//recupération jour et heure

let day;
let hour;

//tester 

if (isTesting) {
    day = parseInt(prompt("Choisis un jour (0=dimanche...6=samedi)"));
    hour = parseInt(prompt("Quelle heure est-il ?"));
}
else {
    day = myDate.getDay();
    hour = myDate.getHours();

}
console.log("Jour:", day, " | Heure :", hour);

//Déterminer si c'est le week-end

let isWeekend = (day === 6 || day === 0);
if (day === 5 && hour >= 17) {
    isWeekend = true;
}
if (day === 1 && hour < 9) {
    isWeekend = true;
}

//Affichage

if (isWeekend) {
    console.log(messageWeekend);
}
else {
    console.log(messageWeek);
}

