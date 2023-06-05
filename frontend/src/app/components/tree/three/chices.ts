import {importCities} from './CityImporter'

let cieties = await importCities()
let html = ""

for(var c of cieties) {
    html += "<option id='choice' value=" + c.id + ">" + c.city + "</option>"
}

for(var c of cieties) {
    html += "<option id='choice' value=" + c.id + ">" + c.city + "</option>"
}

document.getElementById("startingPlace")!.innerHTML = html;
document.getElementById("finishPlace")!.innerHTML = html;