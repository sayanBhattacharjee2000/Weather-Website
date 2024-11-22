let now = new Date();
let hour = now.getHours();
let minute = now.getMinutes();

let greeting = "";
let period = ""; 

function greeing() {
    if (hour >= 6 && hour < 11) {
        greeting = "Good Morning";
    } else if ((hour === 11 && minute <= 59) || (hour >= 12 && hour < 16)) {
        greeting = "Good Afternoon";
    } else if ((hour === 16 && minute >= 1) || (hour >= 17 && hour < 19)) {
        greeting = "Good Evening";
    } else {
        greeting = "Good Night";
    }
}
greeing();

if (hour < 12) {
    period = "A.M.";
} else {
    period = "P.M.";
}

let day = String(now.getDate()).padStart(2, '0'); 
let month = String(now.getMonth() + 1).padStart(2, '0'); 
let year = now.getFullYear(); 

let date = `${day}.${month}.${year}`; 
let time = `${hour}:${minute < 10 ? '0' : ''}${minute} ${period}`;

document.getElementById("date").innerText = date;
document.getElementById("time").innerText = time;
document.getElementById("greet").innerText = greeting;

document.querySelector(".search-and-icon #btn").addEventListener("click", function() {
    const city = document.querySelector(".search-and-icon #city").value;
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=cf65d0c5f5cfffb9e7c92e59ec5e2e80`;
    document.getElementById("invalid").style.display = "none";

    fetch(url).then((response) => response.json()).then((value) => {
        if (!value.length) throw new Error("Invalid city");

        const lat = value[0]["lat"];
        const lon = value[0]["lon"];
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=cf65d0c5f5cfffb9e7c92e59ec5e2e80`;

        return fetch(weatherUrl).then((res) => res.json()).then((tvalue) => {
            showWeatherDetails(value, tvalue);
        });
    }).catch(() => {
        document.getElementById("invalid").style.display = "flex";
        document.getElementById("layout").style.display = "none";
        document.getElementById("city").style.display = "none";
        document.getElementById("btn").style.display = "none";
        document.querySelector('.background-clip').style.display = 'block';
        document.body.style.backgroundColor = "black";
    });
});

document.querySelector(".for-small-search-and-icon #btn").addEventListener("click", function() {
    const city = document.querySelector(".for-small-search-and-icon #city").value;
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=cf65d0c5f5cfffb9e7c92e59ec5e2e80`;
    document.getElementById("invalid").style.display = "none";

    fetch(url).then((response) => response.json()).then((value) => {
        if (!value.length) throw new Error("Invalid city");

        const lat = value[0]["lat"];
        const lon = value[0]["lon"];
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=cf65d0c5f5cfffb9e7c92e59ec5e2e80`;

        return fetch(weatherUrl).then((res) => res.json()).then((tvalue) => {
            showWeatherDetails(value, tvalue);
        });
    }).catch(() => {
        document.getElementById("invalid").style.display = "flex";
        document.getElementById("layout").style.display = "none";
        document.getElementById("city").style.display = "none";
        document.getElementById("btn").style.display = "none";
        document.querySelector('.background-clip').style.display = 'block';
        document.body.style.backgroundColor = "black";
    });
});

document.getElementById("reset").addEventListener("click", function() {
    location.reload();
});

function showWeatherDetails(value, tvalue) {
    const timezoneOffsetSeconds = tvalue["timezone"];
    let updateOtherTime = () => {
        let otherPeriod; 
        let otherGreeting;
        let now = new Date();
        let utcTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
        let localTime = new Date(utcTime.getTime() + timezoneOffsetSeconds * 1000);
        let hours = localTime.getHours();
        let minutes = localTime.getMinutes();
        
        day = String(localTime.getDate()).padStart(2, '0'); 
        month = String(localTime.getMonth() + 1).padStart(2, '0'); 
        year = localTime.getFullYear(); 

        if (hours < 12) {
            otherPeriod = "A.M.";
        } else {
            otherPeriod = "P.M.";
        }
        
        document.querySelector('.background-clip').style.display = 'none';
        
        if (hours >= 6 && hours < 11) {
            otherGreeting = "Good Morning";
            document.body.style.backgroundImage = "url('good_morning.jpg')";
            document.querySelector(".search .icon a").style.color = "black";
            document.querySelector(".main").style.color = "white";
            animationOfBody(); 
            animationOf_bodyText();
            animationOfTime();
        } else if ((hours === 11 && minutes <= 59) || (hours >= 12 && hours < 16)) {
            otherGreeting = "Good Afternoon";
            document.body.style.backgroundImage = "url('good_afternoon.jpg')";
            document.querySelector(".main").style.color = "black";
            document.querySelector("#temp").style.color = "black";
            document.querySelector(".sec").style.color = "black";
            document.querySelector(".search .icon a").style.color = "black";
            animationOfBody(); 
            animationOf_bodyText();
            animationOfTime();
        } else if ((hours === 16 && minutes >= 1) || (hours >= 17 && hours < 19)) {
            const mediaQuery = window.matchMedia("(max-width: 866px)");
            function handleBreakpointChange(e) {
                if (e.matches) {
                    console.log("Screen is less than or equal to 866px");
                    document.querySelector(".main").style.color = "black";
                    document.querySelector("#temp").style.color = "black";
                } else {   
                    console.log("Screen is larger than 866px");
                    document.querySelector(".main").style.color = "white";
                    document.querySelector("#temp").style.color = "white";
                }
            }
            handleBreakpointChange(mediaQuery); 
            mediaQuery.addEventListener("change", handleBreakpointChange); 

            otherGreeting = "Good Evening";
            document.body.style.backgroundImage = "url('good_evening.jpg')";
            document.querySelector(".search .icon a").style.color = "black";
            document.querySelector(".search .icon a").style.fontWeight = "900";
            document.querySelector(".main").style.color = "white";
            document.querySelector("#temp").style.color = "white";
            document.querySelector(".sec").style.color = "white";
            document.querySelector("#greet").style.color = "black";
            animationOfBody(); 
            animationOf_bodyText();
            animationOfTime();
        } else {
            otherGreeting = "Good Night";
            document.body.style.backgroundImage = "url('good_night_2.jpg')";
            document.querySelector(".main").style.color = "white";
            document.querySelector("#temp").style.color = "white";
            document.querySelector(".sec").style.color = "white";
            document.querySelector(".search .icon a").style.color = "wheat";
            animationOfBody(); 
            animationOf_bodyText();
            animationOfTime();
        }
        let time = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${otherPeriod}`; 
        date = `${day}.${month}.${year}`;
        document.getElementById("date").innerText = date;
        document.getElementById("timezone").innerText = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
        document.getElementById("time").innerText = time;
        document.getElementById("greet").innerText = otherGreeting;
    };
    updateOtherTime();

    document.getElementById("weather").innerText = tvalue["weather"][0]["main"];
    document.getElementById("temp").innerText = Math.round(tvalue["main"]["temp"] - 273.15) + "°"; 
    document.getElementById("feels").innerText = Math.round(tvalue["main"]["feels_like"] - 273.15) + "°";
    document.getElementById("humid").innerText = tvalue["main"]["humidity"] + "%";
    document.getElementById("cityName").innerText = value[0]["name"];
    document.getElementById("wind").innerText = tvalue["wind"]["speed"] + " mph";
    document.getElementById("press").innerText = tvalue["main"]["pressure"] + " hPa";

    if (value[0]["state"]) {
        document.getElementById("state").innerText = value[0]["state"];
    } else {
        document.getElementById("state").innerText = "";
    }
    document.getElementById("count").innerText = value[0]["country"];
}


function animationOfNavbar() {
  gsap.from(".search .icon", {
    opacity: 0,
    duration: 2,
    x: -30,
    delay: 0.3,
  });
  gsap.from(".search .search-and-icon", {
    opacity: 0,
    duration: 2,
    x: 30,
    delay: 0.3,
  });
}
animationOfNavbar();


function animationOfBody() {
  gsap.from("#layout .main", {
    opacity: 0,
    duration: 2,
    x: -30,
    delay: 0.3,
  });
  gsap.from("#layout .sec", {
    opacity: 0,
    duration: 2,
    x: 30,
    delay: 0.3,
  });
}
animationOfBody();


function animationOfGreet() {
  let greetAnimation = gsap.timeline();
  greetAnimation.from("#greet", {
    opacity: 0.3,
    duration: 1,
    y: -10,
    repeat: -1,
    yoyo: true,
  });
}
animationOfGreet();


function animationOfTime() {
  let timeAnimation = gsap.timeline();
  timeAnimation.from("#time", {
    opacity: 0,
    duration: 2,
    y: 30,
    delay: 0.3,
  });
}
animationOfTime();


function animationOf_bodyText(){
    gsap.from(".sec .extra .Feels_like", {
        opacity: 0,
        x: -40,
        duration: 1,
        delay: 0.3,
    })
    gsap.from(".sec .extra .Atmospheric_pressure", {
        opacity: 0,
        x: -40,
        duration: 1,
        delay: 1,
    })
    gsap.from(".sec .extra .Timezone", {
        opacity: 0,
        x: -40,
        duration: 1,
        delay: 1.7,
    })
    gsap.from(".sec .extra .State", {
        opacity: 0,
        x: -40,
        duration: 1,
        delay: 2.4,
    })
    gsap.from(".sec .extra .Country", {
        opacity: 0,
        x: -40,
        duration: 1,
        delay: 3.1,
    })
}
animationOf_bodyText();


const breakpoints = gsap.matchMedia();
breakpoints.add("(max-width: 580px)", () => {
  gsap.from("body .header .search ", {
    opacity: 0,
    duration: 1,
    y: -20,
    delay: 0.3,
  });
  gsap.from("body .header .for-small-search-and-icon", {
    opacity: 0,
    duration: 2,
    y: -20,
    delay: 0.3,
  });
});

document.addEventListener("contextmenu", function(e){
  e.preventDefault();
})
