addEventListener("load", eventLineup)

function eventLineup() {
    const tween = KUTE.fromTo(
        '#blob1',
        { path: '#blob1' },
        { path: '#blob2' },
        { repeat: 999, duration: 4000, yoyo: true }
    )
    tween.start()
    // 
    const defaultCity = "Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch"
    const apiKey = "d5a00433b9c2fb7234b39d376866f34a"
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

    const searchBox = document.querySelector('.search input')
    const searchBtn = document.querySelector('.search button')

    fetchData(apiURL + defaultCity + apiKey)

    searchBtn.addEventListener('click', () => {
        const city = searchBox.value.toString().trim()
        fetchData(apiURL, city, apiKey)
    })
    searchBox.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            const city = searchBox.value.toString().trim()
            fetchData(apiURL, city, apiKey)
        }
    })
}


async function fetchData(apiURL, city, apiKey) {
    
    const response = await fetch(apiURL + city + `&appid=${apiKey}`)
    var data = await response.json()
    console.log(data)
    updateAppData(data)
}

function updateAppData(data) {
    const weather = data.weather[0]["main"]

    document.querySelector(".city").innerHTML = data.name
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "&deg;c"
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %"
    document.querySelector(".wind").innerHTML = data.wind.speed + " m/s"

    updateAppIcon(weather)
}

function updateAppIcon(weather) {
    const icon = document.querySelector('img')
    icon.src = `../weather-app/imgs/${weather.toLowerCase()}.png`
    icon.alt = `${weather}`
}