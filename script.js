// Init and event listener
let summary = document.getElementById('summary');
document.getElementById("addPack").addEventListener("click", fill_colli)
let submit = document.getElementById("submit");
submit.addEventListener("click", submitted);
let priceTable = document.getElementById("priceTable");

// MAIN VARIABLES
    // weights
let pesoreale = 0
let pesoSDA = 0
let pesoTNT = 0
let pesoNPUPS = 0
let pesoVolumetricoSDA = 0
let pesoVolumetricoTNT = 0
let pesovolumetricoNPUPS = 0
    // costs
let costSDA = 0
let costTNT = 0
let costNP = 0
let costGLSPersonal = 0
let costSDAPersonal = 0
let costTNTPersonal = 0
let costUPS_express = 0
let costUPS_saver = 0
let costUPS_standard = 0
let packs = 0


// MAIN FUNCTIONS
    // add packs, updating the total weight and the interface
function fill_colli(){
    let altezza = document.getElementById('altezza').value
    let lunghezza = document.getElementById('lunghezza').value
    let larghezza = document.getElementById('larghezza').value
    let peso = parseInt(document.getElementById('peso').value)
    pesoVolumetricoSDA = altezza*lunghezza*larghezza/3333
    pesoVolumetricoTNT = altezza/100*lunghezza/100*larghezza/100*250
    pesovolumetricoNPUPS = altezza*lunghezza*larghezza/5000
    peso_volume(peso, pesoVolumetricoSDA, pesoVolumetricoTNT, pesovolumetricoNPUPS)
    packs++
    summary.innerHTML += "<p>Collo " + altezza + "x" + lunghezza + "x" + larghezza + ", peso: " + peso + "</p>"
}
    // converts weight to volumetric weight if needed
function peso_volume(peso, pesoVolumetricoSDA, pesoVolumetricoTNT, pesovolumetricoNPUPS){
    // SDA
    pesoreale = peso
    if (peso > pesoVolumetricoSDA){
        pesoSDA += peso
    } else {
        pesoSDA += pesoVolumetricoSDA;
    }

    // TNT
    if (peso > pesoVolumetricoTNT){
        pesoTNT += peso;
    } else {
        pesoTNT += pesoVolumetricoTNT;
    }
    console.log("PesoVolume ok")
    
    // NUOVA POSTA
    if (peso > pesovolumetricoNPUPS){
        pesoNPUPS += peso;
    } else {
        pesoNPUPS += pesovolumetricoNPUPS;
    }
}
    // submit the data and update the page to show the costs
function submitted(){
    if(packs == 0){
        alert("Aggiungi un collo per favore")
        return
    }
    let country = document.getElementById('toCountry').value
    console.log("Peso SDA: " + pesoSDA + " peso TNT: " + pesoTNT + " peso NP: " + pesoNPUPS);
    priceTable.innerHTML += "<br>Peso SDA: " + pesoSDA + " peso TNT: " + pesoTNT + " peso NP: " + pesoNPUPS
    console.log("Paese di destinazione é: " + country)
    priceTable.innerHTML += "<br>Paese di destinazione: " + country
    console.log("Numero di colli: " + packs)
    priceTable.innerHTML += "<br>Numero di colli: " + packs
    if(country == "italia"){
        calcolo_prezzi_italia(pesoSDA, pesoTNT, pesoNPUPS)
        priceTable.innerHTML += "<br>Costi Italia"
        priceTable.innerHTML += "<br><br>Costo SDA: " + costSDA.toFixed(2)
        priceTable.innerHTML += "<br>Costo TNT: " + costTNT.toFixed(2)
        priceTable.innerHTML += "<br>Costo NP: " + costNP.toFixed(2)
        priceTable.innerHTML += "<br>Costo SDA Personal: " + costSDAPersonal.toFixed(2)
        priceTable.innerHTML += "<br>Costo TNT Personal: " + costTNTPersonal.toFixed(2)
        priceTable.innerHTML += "<br>Costo GLS Personal: " + costGLSPersonal.toFixed(2)
    }
    if(country != "italia"){
        priceTable.innerHTML += "<br><br>Costi Estero"
        // SDA
        calcolo_prezzi_SDA_estero(country, pesoreale, packs, altezza+2*lunghezza+2*larghezza)
        if(costSDA == 0){
            priceTable.innerHTML += "<br><br>SDA non ha tariffa per questo paese"
        } else {

        priceTable.innerHTML += "<br><br>Costo SDA: " + costSDA.toFixed(2)
        }
        // UPS Express
        if(ups_area[country][0] == 0){
            priceTable.innerHTML += "<br>UPS non ha tariffa express per questo paese"
        } else {
            calcolo_costo_UPS_express(ups_area[country][0], pesoNPUPS)
            priceTable.innerHTML += "<br>Costo UPS Express: " + costUPS_express.toFixed(2)
        }
        // UPS Saver
        if(ups_area[country][1] == 0){
            priceTable.innerHTML += "<br>UPS non ha tariffa saver per questo paese"
        } else {
            calcolo_costo_UPS_express_saver(ups_area[country][1], pesoNPUPS)
            priceTable.innerHTML += "<br>Costo UPS Saver: " + costUPS_saver.toFixed(2)
        }
        // UPS Standard
        if(ups_area[country][2] == 0){
            priceTable.innerHTML += "<br>UPS non ha tariffa standard per questo paese"
        } else {
            calcolo_costo_UPS_standard(ups_area[country][2], pesoNPUPS)
            priceTable.innerHTML += "<br>Costo UPS Standard: " + costUPS_standard.toFixed(2)
        }
    }
    //calcolo_costo_UPS_express(ups_area[country][0], pesoNPUPS)
    //calcolo_costo_UPS_express_saver(ups_area[country][1], pesoNPUPS)
    //console.log("UPS Express: " + costUPS_express + " UPS Saver: " + costUPS_saver)
    document.getElementById("dati").style.visibility = "hidden";
    document.getElementById("priceTable").style.visibility = "visible";
}

// COST CALCULATIONS FUNCTIONS
    // italy-italy costs
    // takes pesoSDA, pesoTNT, pesoNP
    // returns:
    // - SDA
    // - TNT 
    // - Nuova Posta
    // - SDA Personal
    // - TNT Personal
    // - GLS Personal
function calcolo_prezzi_italia(pesoSDA, pesoTNT, pesoNPUPS){
    // SDA
    if(pesoSDA <= 2){
        costSDA = 8.50
    } else if(pesoSDA > 2 && pesoSDA <= 5){
        costSDA = 9.50
    } else if(pesoSDA > 5 && pesoSDA <= 10){
        costSDA = 13
    } else if(pesoSDA > 10 && pesoSDA <= 20){
        costSDA = 15
    } else if(pesoSDA > 20 && pesoSDA <= 30){
        costSDA = 18.50
    } else if(pesoSDA > 30 && pesoSDA <= 50){
        costSDA = 30
    } else if(pesoSDA > 50 && pesoSDA <= 70){
        costSDA = 40
    } else if(pesoSDA > 70 && pesoSDA <= 100){
        costSDA = 50
    } else if(pesoSDA > 100){
        costSDA = 0
    }
    console.log("Costo SDA: " + costSDA)
    // TNT
    if(pesoTNT <= 1){
        costTNT = 10.80
    } else if(pesoTNT > 1 && pesoTNT <= 3){
        costTNT = 12
    } else if(pesoTNT > 3 && pesoTNT <= 5){
        costTNT = 13.50
    } else if(pesoTNT > 5 && pesoTNT <= 10){
        costTNT = 17
    } else if(pesoTNT > 10 && pesoTNT <= 20){
        costTNT = 19.50
    } else if(pesoTNT > 20 && pesoTNT <= 30){
        costTNT = 22
    } else if(pesoTNT > 30 && pesoTNT <= 40){
        costTNT = 27
    } else if(pesoTNT > 40 && pesoTNT <= 50){
        costTNT = 33
    } else if(pesoTNT > 50 && pesoTNT <= 70){
        costTNT = 42
    } else if(pesoTNT > 70 && pesoTNT <= 100){
        costTNT = 55
    } else if(pesoTNT > 100 && pesoTNT <= 125){
        costTNT = 70
    } else if(pesoTNT > 125 && pesoTNT <= 150){
        costTNT = 80
    } else if(pesoTNT > 150){
        costTNT = 0
    }
    console.log("Costo TNT: " + costTNT)
    // NUOVA POSTA
    if(pesoNPUPS <= 5){
        costNP = 10
    } else if(pesoNPUPS > 5 && pesoNPUPS <= 20){
        costNP = 16
    } else if(pesoNPUPS > 20 && pesoNPUPS <= 30){
        costNP = 20
    } else if(pesoNPUPS > 30 && pesoNPUPS <= 50){
        costNP = 33
    } else if(pesoNPUPS > 50 && pesoNPUPS <= 75){
        costNP = 43
    } else if(pesoNPUPS > 75 && pesoNPUPS <= 100){
        costNP = 55
    } else if(pesoNPUPS > 100){
        costNP = 0
    }
    console.log("Costo NP: " + costNP)
    // SDA Personal
    if(pesoSDA <= 2){
        costSDAPersonal = 6.53
    } else if(pesoSDA > 2 && pesoSDA <= 5){
        costSDAPersonal = 7.60
    } else if(pesoSDA > 5 && pesoSDA <= 10){
        costSDAPersonal = 8.95
    } else if(pesoSDA > 10 && pesoSDA <= 20){
        costSDAPersonal = 10.77
    } else if(pesoSDA > 20 && pesoSDA <= 30){
        costSDAPersonal = 13.20
    } else if(pesoSDA > 30 && pesoSDA <= 50){
        costSDAPersonal = 17.10
    } else if(pesoSDA > 50 && pesoSDA <= 70){
        costSDAPersonal = 23.40
    } else if(pesoSDA > 70 && pesoSDA <= 100){
        costSDAPersonal = 31.20
    } else if(pesoSDA > 100){
        costSDAPersonal = 0
    }
    console.log("Costo SDA Personal: " + costSDAPersonal)
    // TNT Personal
    if(pesoTNT <= 1){
        costTNTPersonal = 8.60
    } else if(pesoTNT > 1 && pesoTNT <= 3){
        costTNTPersonal = 10
    } else if(pesoTNT > 3 && pesoTNT <= 5){
        costTNTPersonal = 11.30
    } else if(pesoTNT > 5 && pesoTNT <= 10){
        costTNTPersonal = 13.13
    } else if(pesoTNT > 10 && pesoTNT <= 20){
        costTNTPersonal = 15.20
    } else if(pesoTNT > 20 && pesoTNT <= 30){
        costTNTPersonal = 16.80
    } else if(pesoTNT > 30 && pesoTNT <= 40){
        costTNTPersonal = 19.80
    } else if(pesoTNT > 40 && pesoTNT <= 50){
        costTNTPersonal = 22.25
    } else if(pesoTNT > 50 && pesoTNT <= 70){
        costTNTPersonal = 27.35
    } else if(pesoTNT > 70 && pesoTNT <= 100){
        costTNTPersonal = 37.70
    } else if(pesoTNT > 100 && pesoTNT <= 125){
        costTNTPersonal = 53.45
    } else if(pesoTNT > 125 && pesoTNT <= 150){
        costTNTPersonal = 56
    } else if(pesoTNT > 150){
        costTNTPersonal = 0
    }
    console.log("Costo TNT Personal: " + costTNTPersonal)
    if(pesoSDA <= 3){
        costGLSPersonal = 4.90
    } else if(pesoSDA > 3 && pesoSDA <= 5){
        costGLSPersonal = 6.39
    } else if(pesoSDA > 5 && pesoSDA <= 10){
        costGLSPersonal = 7.51
    } else if(pesoSDA > 10 && pesoSDA <= 20){
        costGLSPersonal = 9.75
    } else if(pesoSDA > 20 && pesoSDA <= 30){
        costGLSPersonal = 12
    } else if(pesoSDA > 30 && pesoSDA <= 50){
        costGLSPersonal = 16.49
    } else if(pesoSDA > 50 && pesoSDA <= 75){
        costGLSPersonal = 22.09
    } else if(pesoSDA > 75 && pesoSDA <= 100){
        costGLSPersonal = 27.70
    } else if(pesoSDA > 100){
        costGLSPersonal = 27.70+Math.floor((pesoSDA-99)/10)*2.52
    }
    console.log("Costo GLS Personal: " + costGLSPersonal)

}
    // Foreign deliveries SDA
function calcolo_prezzi_SDA_estero(country, pesoSDA, packs, perimeter){
    if(country == "andorra"){
        if(pesoSDA <= 5){
            costSDA = 66.85
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 71.85
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 80.40
        } else if(pesoSDA > 31.5){
            costSDA = 80.40+Math.floor(pesoSDA-31)*2.34
        }
        if(packs > 1){
            costSDA += (packs-1)*7.35
        }
        if(perimeter > 330){
            costSDA += 8
        }
        if(perimeter > 450){
            costSDA = 117.60+80.40+Math.floor(pesoSDA-31)*2.34
        }
    }
    if(country == "austria"){
        if(pesoSDA <= 5){
            costSDA = 10.2
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 15.30
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 22.00
        } else if(pesoSDA > 31.5){
            costSDA = 22+Math.floor(pesoSDA-31)*0.51
        }
        if(packs > 1){
            costSDA += (packs-1)*2.60
        }
        if(perimeter > 330){
            costSDA += 8
        }
        if(perimeter > 450){
            costSDA = 117.60+80.40+Math.floor(pesoSDA-31)*2.34
        }
    }
    if(country == "azzorre"){
        if(pesoSDA <= 5){
            costSDA = 40.80
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 47.90
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 54.80
        } else if(pesoSDA > 31.5){
            costSDA = 54.80+Math.floor(pesoSDA-31)*2.34
        }
        if(packs > 1){
            costSDA += (packs-1)*7.35
        }
        if(perimeter > 330){
            costSDA += 000
        }
        if(perimeter > 450){
            costSDA = 000+000+Math.floor(pesoSDA-31)*000
        }
    }
    if(country == "belgio"){
        if(pesoSDA <= 5){
            costSDA = 10.2
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 16.50
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 24.00
        } else if(pesoSDA > 31.5){
            costSDA = 24+Math.floor(pesoSDA-31)*0.56
        }
        if(packs > 1){
            costSDA += (packs-1)*3.05
        }
        if(perimeter > 330){
            costSDA += 000
        }
        if(perimeter > 450){
            costSDA = 000+000+Math.floor(pesoSDA-31)*000
        }
    }
    if(country == "bosnia_e_erzegovina"){
        if(pesoSDA <= 5){
            costSDA = 13.85
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 19.25
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 27.35
        } else if(pesoSDA > 31.5){
            costSDA = 27.35+Math.floor(pesoSDA-31)*0.55
        }
        if(packs > 1){
            costSDA += (packs-1)*2.98
        }
        if(perimeter > 330){
            costSDA += 000
        }
        if(perimeter > 450){
            costSDA = 000+000+Math.floor(pesoSDA-31)*000
        }
    }
    if(country == "bulgaria"){
        if(pesoSDA <= 5){
            costSDA = 13.30
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 20.40
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 27
        } else if(pesoSDA > 31.5){
            costSDA = 27+Math.floor(pesoSDA-31)*0.55
        }
        if(packs > 1){
            costSDA += (packs-1)*2.60
        }
        if(perimeter > 330){
            costSDA += 000
        }
        if(perimeter > 450){
            costSDA = 000+000+Math.floor(pesoSDA-31)*000
        }
    }
    if(country == "ceuta"){
        if(pesoSDA <= 5){
            costSDA = 68.85
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 71.85
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 80.40
        } else if(pesoSDA > 31.5){
            costSDA = 80.40+Math.floor(pesoSDA-31)*2.34
        }
        if(packs > 1){
            costSDA += (packs-1)*7.35
        }
        if(perimeter > 330){
            costSDA += 000
        }
        if(perimeter > 450){
            costSDA = 000+000+Math.floor(pesoSDA-31)*000
        }
    }
    if(country == "corsica"){
        if(pesoSDA <= 5){
            costSDA = 49
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 53
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 60.06
        } else if(pesoSDA > 31.5){
            costSDA = 60.06+Math.floor(pesoSDA-31)*1.12
        }
        if(packs > 1){
            costSDA += (packs-1)*4.10
        }
        if(perimeter > 330){
            costSDA += 000
        }
        if(perimeter > 450){
            costSDA = 000+000+Math.floor(pesoSDA-31)*000
        }
    }
    if(country == "croazia"){
        if(pesoSDA <= 5){
            costSDA = 13.85
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 19.25
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 27.35
        } else if(pesoSDA > 31.5){
            costSDA = 27.35+Math.floor(pesoSDA-31)*0.55
        }
        if(packs > 1){
            costSDA += (packs-1)*2.98
        }
        if(perimeter > 330){
            costSDA += 000
        }
        if(perimeter > 450){
            costSDA = 000+000+Math.floor(pesoSDA-31)*000
        }
    }
    if(country == "francia"){
        if(pesoSDA <= 5){
            costSDA = 11.25
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 15
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 22.40
        } else if(pesoSDA > 31.5){
            costSDA = 22.40+Math.floor(pesoSDA-31)*0.51
        }
        if(packs > 1){
            costSDA += (packs-1)*4.10
        }
        if(perimeter > 330){
            costSDA += 000
        }
        if(perimeter > 450){
            costSDA = 000+000+Math.floor(pesoSDA-31)*000
        }
    }
    if(country == "germania"){
        if(pesoSDA <= 5){
            costSDA = 10.20
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 14.50
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 21.80
        } else if(pesoSDA > 31.5){
            costSDA = 21.80+Math.floor(pesoSDA-31)*0.52
        }
        if(packs > 1){
            costSDA += (packs-1)*2.60
        }
        if(perimeter > 330){
            costSDA += 000
        }
        if(perimeter > 450){
            costSDA = 000+000+Math.floor(pesoSDA-31)*000
        }
    }
    if(country == "gran_bretagna"){
        if(pesoSDA <= 5){
            costSDA = 11.25
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 18
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 25
        } else if(pesoSDA > 31.5){
            costSDA = 25+Math.floor(pesoSDA-31)*0.70
        }
        if(packs > 1){
            costSDA += (packs-1)*3.33
        }
        if(perimeter > 330){
            costSDA += 000
        }
        if(perimeter > 450){
            costSDA = 000+000+Math.floor(pesoSDA-31)*000
        }
    }
    if(country == "irlanda_del_nord"){
        if(pesoSDA <= 5){
            costSDA = 31.35
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 35.65
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 43.35
        } else if(pesoSDA > 31.5){
            costSDA = 43.35+Math.floor(pesoSDA-31)*0.79
        }
        if(packs > 1){
            costSDA += (packs-1)*8.09
        }
        if(perimeter > 330){
            costSDA += 000
        }
        if(perimeter > 450){
            costSDA = 000+000+Math.floor(pesoSDA-31)*000
        }
    }
    if(country == "irlanda"){
        if(pesoSDA <= 5){
            costSDA = 31.35
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 35.65
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 43.35
        } else if(pesoSDA > 31.5){
            costSDA = 43.35+Math.floor(pesoSDA-31)*0.65
        }
        if(packs > 1){
            costSDA += (packs-1)*8.09
        }
        if(perimeter > 330){
            costSDA += 000
        }
        if(perimeter > 450){
            costSDA = 000+000+Math.floor(pesoSDA-31)*000
        }
    }
    if(country == "isole_canarie"){
        if(pesoSDA <= 5){
            costSDA = 68.85
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 71.85
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 80.40
        } else if(pesoSDA > 31.5){
            costSDA = 80.40+Math.floor(pesoSDA-31)*2.34
        }
        if(packs > 1){
            costSDA += (packs-1)*7.35
        }
        if(perimeter > 330){
            costSDA += 000
        }
        if(perimeter > 450){
            costSDA = 000+000+Math.floor(pesoSDA-31)*000
        }
    }
    if(country == "isole_channel"){
        if(pesoSDA <= 5){
            costSDA = 11.25
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 18
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 25
        } else if(pesoSDA > 31.5){
            costSDA = 25+Math.floor(pesoSDA-31)*0.70
        }
        if(packs > 1){
            costSDA += (packs-1)*3.33
        }
        if(perimeter > 330){
            costSDA += 000
        }
        if(perimeter > 450){
            costSDA = 000+000+Math.floor(pesoSDA-31)*000
        }
    }
    if(country == "lussemburgo"){
        if(pesoSDA <= 5){
            costSDA = 10.2
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 16
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 24
        } else if(pesoSDA > 31.5){
            costSDA = 24+Math.floor(pesoSDA-31)*0.55
        }
        if(packs > 1){
            costSDA += (packs-1)*2.98
        }
        if(perimeter > 330){
            costSDA += 000
        }
        if(perimeter > 450){
            costSDA = 000+000+Math.floor(pesoSDA-31)*000
        }
    }
    if(country == "madeira"){
        if(pesoSDA <= 5){
            costSDA = 40.80
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 47.90
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 54.80
        } else if(pesoSDA > 31.5){
            costSDA = 54.80+Math.floor(pesoSDA-31)*2.34
        }
        if(packs > 1){
            costSDA += (packs-1)*7.35
        }
        if(perimeter > 330){
            costSDA += 000
        }
        if(perimeter > 450){
            costSDA = 000+000+Math.floor(pesoSDA-31)*000
        }
    }
    if(country == "melilla"){
        if(pesoSDA <= 5){
            costSDA = 68.85
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 71.85
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 80.40
        } else if(pesoSDA > 31.5){
            costSDA = 80.40+Math.floor(pesoSDA-31)*2.34
        }
        if(packs > 1){
            costSDA += (packs-1)*7.35
        }
        if(perimeter > 330){
            costSDA += 000
        }
        if(perimeter > 450){
            costSDA = 000+000+Math.floor(pesoSDA-31)*000
        }
    }
    if(country == "montenegro"){
        if(pesoSDA <= 5){
            costSDA = 14.10
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 19.95
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 28.95
        } else if(pesoSDA > 31.5){
            costSDA = 28.95+Math.floor(pesoSDA-31)*0.59
        }
        if(packs > 1){
            costSDA += (packs-1)*2.98
        }
        if(perimeter > 330){
            costSDA += 000
        }
        if(perimeter > 450){
            costSDA = 000+000+Math.floor(pesoSDA-31)*000
        }
    }
    if(country == "olanda"){
        if(pesoSDA <= 5){
            costSDA = 11.25
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 16.20
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 23
        } else if(pesoSDA > 31.5){
            costSDA = 23+Math.floor(pesoSDA-31)*0.52
        }
        if(packs > 1){
            costSDA += (packs-1)*2.60
        }
        if(perimeter > 330){
            costSDA += 000
        }
        if(perimeter > 450){
            costSDA = 000+000+Math.floor(pesoSDA-31)*000
        }
    }
    if(country == "polonia"){
        if(pesoSDA <= 5){
            costSDA = 13.55
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 20.50
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 29.40
        } else if(pesoSDA > 31.5){
            costSDA = 29.40+Math.floor(pesoSDA-31)*0.7
        }
        if(packs > 1){
            costSDA += (packs-1)*1.10
        }
        if(perimeter > 330){
            costSDA += 000
        }
        if(perimeter > 450){
            costSDA = 000+000+Math.floor(pesoSDA-31)*000
        }
    }
    if(country == "portogallo"){
        if(pesoSDA <= 5){
            costSDA = 13.55
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 23.90
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 29.50
        } else if(pesoSDA > 31.5){
            costSDA = 29.50+Math.floor(pesoSDA-31)*0.62
        }
        if(packs > 1){
            costSDA += (packs-1)*6.05
        }
        if(perimeter > 330){
            costSDA += 000
        }
        if(perimeter > 450){
            costSDA = 000+000+Math.floor(pesoSDA-31)*000
        }
    }
    if(country == "repubblica_ceca"){
        if(pesoSDA <= 5){
            costSDA = 18.40
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 18.55
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 22.90
        } else if(pesoSDA > 31.5){
            costSDA = 22.90+Math.floor(pesoSDA-31)*0.55
        }
        if(packs > 1){
            costSDA += (packs-1)*2.83
        }
        if(perimeter > 330){
            costSDA += 000
        }
        if(perimeter > 450){
            costSDA = 000+000+Math.floor(pesoSDA-31)*000
        }
    }
    if(country == "romania"){
        if(pesoSDA <= 5){
            costSDA = 11.30
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 22.40
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 29.50
        } else if(pesoSDA > 31.5){
            costSDA = 29.50+Math.floor(pesoSDA-31)*0.64
        }
        if(packs > 1){
            costSDA += (packs-1)*2.98
        }
        if(perimeter > 330){
            costSDA += 000
        }
        if(perimeter > 450){
            costSDA = 000+000+Math.floor(pesoSDA-31)*000
        }
    }
    if(country == "serbia"){
        if(pesoSDA <= 5){
            costSDA = 13.85
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 19.25
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 27.35
        } else if(pesoSDA > 31.5){
            costSDA = 27.35+Math.floor(pesoSDA-31)*0.50
        }
        if(packs > 1){
            costSDA += (packs-1)*2.98
        }
        if(perimeter > 330){
            costSDA += 000
        }
        if(perimeter > 450){
            costSDA = 000+000+Math.floor(pesoSDA-31)*000
        }
    }
    if(country == "slovacchia"){
        if(pesoSDA <= 5){
            costSDA = 13.85
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 18.55
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 22.60
        } else if(pesoSDA > 31.5){
            costSDA = 22.60+Math.floor(pesoSDA-31)*0.51
        }
        if(packs > 1){
            costSDA += (packs-1)*2.98
        }
        if(perimeter > 330){
            costSDA += 000
        }
        if(perimeter > 450){
            costSDA = 000+000+Math.floor(pesoSDA-31)*000
        }
    }
    if(country == "slovenia"){
        if(pesoSDA <= 5){
            costSDA = 13.30
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 19
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 26
        } else if(pesoSDA > 31.5){
            costSDA = 26+Math.floor(pesoSDA-31)*0.55
        }
        if(packs > 1){
            costSDA += (packs-1)*2.61
        }
        if(perimeter > 330){
            costSDA += 000
        }
        if(perimeter > 450){
            costSDA = 000+000+Math.floor(pesoSDA-31)*000
        }
    }
    if(country == "spagna"){
        if(pesoSDA <= 5){
            costSDA = 11.25
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 18.65
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 24.50
        } else if(pesoSDA > 31.5){
            costSDA = 24.50+Math.floor(pesoSDA-31)*0.51
        }
        if(packs > 1){
            costSDA += (packs-1)*4.10
        }
        if(perimeter > 330){
            costSDA += 000
        }
        if(perimeter > 450){
            costSDA = 000+000+Math.floor(pesoSDA-31)*000
        }
    }
    if(country == "svizzera"){
        if(pesoSDA <= 5){
            costSDA = 14.95
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 26.5
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 58
        } else if(pesoSDA > 31.5){
            costSDA = 58+Math.floor(pesoSDA-31)*1.32
        }
        if(packs > 1){
            costSDA += (packs-1)*1.10
        }
        if(perimeter > 330){
            costSDA += 000
        }
        if(perimeter > 450){
            costSDA = 000+000+Math.floor(pesoSDA-31)*000
        }
    }
    if(country == "lietchtenstein"){
        if(pesoSDA <= 5){
            costSDA = 14.95
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 26.5
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 58
        } else if(pesoSDA > 31.5){
            costSDA = 58+Math.floor(pesoSDA-31)*1.32
        }
        if(packs > 1){
            costSDA += (packs-1)*1.10
        }
        if(perimeter > 330){
            costSDA += 000
        }
        if(perimeter > 450){
            costSDA = 000+000+Math.floor(pesoSDA-31)*000
        }
    }
    if(country == "ungheria"){
        if(pesoSDA <= 5){
            costSDA = 12.45
        } else if(pesoSDA > 5 && pesoSDA <= 15){
            costSDA = 19.25
        } else if(pesoSDA > 15 && pesoSDA <= 31.5){
            costSDA = 24.45
        } else if(pesoSDA > 31.5){
            costSDA = 24.45+Math.floor(pesoSDA-31)*0.51
        }
        if(packs > 1){
            costSDA += (packs-1)*2.98
        }
        if(perimeter > 330){
            costSDA += 000
        }
        if(perimeter > 450){
            costSDA = 000+000+Math.floor(pesoSDA-31)*000
        }
    }
}

    // Foreign deliveries UPS
        // [express, saver, standard]
let ups_area = {"afghanistan":[0,9,0], 
                "albania":[6,6,0],
                "algeria":[11,11,0],
                "andorra":[5,5,6], 
                "angola":[0,11,0], 
                "anguilla":[0,11,0],
                "antiguaEBarbuda":[0,9,0], 
                "arabiaSaudita":[10,10,0],
                "argentina":[9,9,0], 
                "armenia":[11,11,0], 
                "australia":[9,9,0],
                "austria":[3,3,5], 
                "azerbaigian":[0,11,0], 
                "azzorre":[0,4,0],
                "bahamas":[9,9,0], 
                "bahrein":[9,9,0], 
                "bangladesh":[0,10,0],
                "barbados":[9,9,0], 
                "belgio":[2,2,4], 
                "belize":[0,11,0],
                "benin":[0,11,0], 
                "bhutan":[10,10,0], 
                "bielorussia":[6,6,0],
                "birmania":[10,10,0], 
                "bolivia":[9,9,0], 
                "bosniaEdErzegovina":[6,6,0],
                "botswana":[0,11,0], 
                "brasile":[9,9,0], 
                "brunei":[9,9,0], 
                "bulgaria":[42,42,52],
                "burkinaFaso":[0,11,0], 
                "burundi":[0,11,0], 
                "cambogia":[11,11,0], 
                "camerun":[0,11,0], 
                "canada":[8,8,0], 
                "ceuta":[0,5,0], 
                "ciad":[0,11,0],
                "cile":[9,9,0], 
                "cina":[9,9,0], 
                "cipro":[42,42,0], 
                "cisgiordania":[0,11,0],
                "colombia":[9,9,0], 
                "repDelCongo":[0,11,0], 
                "rdDelCongo":[0,11,0],
                "coreaDelSud":[0,9,0], 
                "costaDAvorio":[0,11,0], 
                "croazia":[41,41,5],
                "curacao":[0,9,0], 
                "danimarca":[4,4,4], 
                "dominica":[0,9,0], 
                "repDominicana":[9,9,0], 
                "ecuador":[9,9,0], 
                "egitto":[9,9,0],
                "elSalvador":[0,10,0], 
                "emiratiArabiUniti":[9,9,0], 
                "eritrea":[0,11,0],
                "estonia":[42,42,52], 
                "etiopia":[0,11,0], 
                "figi":[9,9,0], 
                "filippine":[9,9,0],
                "finlandia":[4,4,5], 
                "franciaCap":[2,2,3], 
                "francia":[2,2,4],
                "gabon":[0,11,0], 
                "galles":[2,2,4], 
                "gambia":[11,11,0], 
                "georgia":[11,11,0],
                "germaniaCap":[2,2,3], 
                "germania":[2,2,4], 
                "ghana":[0,11,0],
                "giamaica":[9,9,0], 
                "giappone":[9,9,0], 
                "gibilterra":[0,6,0], 
                "gibuti":[0,11,0],
                "giordania":[11,11,0], 
                "grecia":[4,4,51], 
                "grenada":[0,9,0], 
                "groenlandia":[0,6,0], 
                "guadalupa":[9,9,0], 
                "guam":[0,9,0], 
                "guatemala":[10,10,0],
                "guinea":[0,11,0], 
                "guineaBissau":[0,11,0], 
                "guineaEquatoriale":[0,11,0],
                "guyana":[0,11,0], 
                "guyanaFrancese":[11,11,0], 
                "haiti":[0,10,0],
                "honduras":[10,10,0], 
                "hongKong":[9,9,0], 
                "india":[9,9,0], 
                "indonesia":[9,9,0],
                "iraq":[0,9,0], 
                "irlanda":[4,4,4], 
                "irlandaDelNord":[0,4,5], 
                "islanda":[6,6,0],
                "isoleCanarie":[0,5,0], 
                "capoVerde":[0,11,0], 
                "isoleCayman":[0,9,0],
                "comore":[0,11,0], 
                "isoleSolomone":[11,11,0], 
                "israele":[11,11,0], 
                "italiaNoIsoleCalabria":[1,1,2], 
                "italiaIsoleCalabria":[0,1,2], 
                "kazakistan":[11,11,0], 
                "kenya":[11,11,0], 
                "kiribati":[0,11,0], 
                "kosovo":[6,6,0],
                "kosrae":[0,11,0], 
                "kirghizistan":[11,11,0], 
                "kuwait":[9,9,0], 
                "laos":[11,11,0],
                "lesotho":[0,11,0], 
                "lettonia":[42,42,52], 
                "libano":[11,11,0], 
                "liberia":[0,11,0],
                "libia":[0,11,0], 
                "liechtenstein":[5,5,6], 
                "lituania":[42,42,52], 
                "lussemburgo":[3,3,4], 
                "macau":[10,10,0], 
                "macedoniaDelNord":[6,6,0], 
                "madagascar":[0,11,0], 
                "madera":[0,4,0], 
                "malawi":[11,11,0], 
                "maldive":[10,10,0],
                "malaysia":[9,9,0], 
                "mali":[0,11,0], 
                "malta":[42,42,0], 
                "marocco":[11,11,0],
                "martinica":[0,9,0], 
                "mauritania":[11,11,0], 
                "mauritius":[11,11,0],
                "mayotte":[0,11,0], 
                "melilla":[0,5,0], 
                "messico":[9,9,0], 
                "micronesia":[11,11,00], 
                "moldavia":[6,6,0], 
                "monaco":[2,2,4], 
                "mongolia":[0,10,0], 
                "montenegro":[6,6,0], 
                "montserrat":[0,10,0], 
                "mozambico":[0,11,0], 
                "namibia":[11,11,0], 
                "nepal":[11,11,0],
                "nicaragua":[0,11,0], 
                "niger":[11,11,0], 
                "nigeria":[11,11,0], 
                "norvegia":[5,5,6],
                "nuovaCaledonia":[11,11,0], 
                "nuovaZelanda":[9,9,0], 
                "oman":[10,10,0], 
                "paesiBassi":[3,3,4], 
                "pakistan":[9,9,0], 
                "palau":[0,11,0], 
                "panama":[10,10,0],
                "papuaNuovaGuinea":[11,11,0], 
                "paraguay":[0,10,0], 
                "peru":[10,10,0], 
                "polinesiaFrancese":[0,10,0], 
                "polonia":[41,41,51], 
                "portogallo":[4,4,4],
                "puertoRico":[8,8,0], 
                "qatar":[10,10,0], 
                "regnoUnito":[2,2,4], 
                "repubblicaCeca":[41,41,51], 
                "repubblicaCentrafricana":[0,11,0], 
                "repubblicaDominicana":[9,9,0], 
                "romania":[42,42,52], 
                "ruanda":[0,11,0],
                "russia":[6,6,0], 
                "saintKittsENevis":[9,9,0], 
                "saintVincentEGrenadine":[0,9,0],
                "samoa":[9,9,0], 
                "sanMarino":[0,1,1], 
                "senegal":[11,11,0], 
                "serbia":[6,6,0],
                "seychelles":[0,11,0], 
                "sierraLeone":[0,11,0], 
                "singapore":[9,9,0],
                "slovacchia":[41,41,51], 
                "slovenia":[41,41,5], 
                "spagna":[3,3,4], 
                "sriLanka":[9,9,0],
                "statiUniti":[8,8,0],
                "suriname":[11,11,0], 
                "svezia":[4,4,5], 
                "svizzera":[5,5,6], 
                "swaziland":[0,11,0],
                "tagikistan":[0,11,0], 
                "taiwan":[9,9,0], 
                "tanzania":[0,11,0], 
                "thailandia":[9,9,0],
                "timorEst":[0,11,0], 
                "togo":[0,11,0], 
                "tonga":[0,11,0], 
                "trinidadETobago":[9,9,0],
                "tunisia":[11,11,0], 
                "turchia":[12,12,0], 
                "turkmenistan":[0,11,0], 
                "tuvalu":[0,11,0],
                "ucraina":[6,6,0], 
                "uganda":[0,11,0], 
                "ungheria":[41,41,51], 
                "uruguay":[0,10,0],
                "uzbekistan":[0,11,0], 
                "vanuatu":[11,11,0], 
                "venezuela":[0,10,0], 
                "vietnam":[11,11,0], 
                "yemen":[0,11,0], 
                "zambia":[0,11,0], 
                "zimbabwe":[0,11,0]
}
    // UPS express cost
        // takes UPS Area number and volumetric weight
        // returns the ups express cost
function calcolo_costo_UPS_express(areaUPSexpress, pesovolumetricoNPUPS){
    if(areaUPSexpress == 1){
        if(pesovolumetricoNPUPS <= 1){
            costUPS_express = 12
        } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 3){
            costUPS_express = 12.92
        } else if(pesovolumetricoNPUPS > 3 && pesovolumetricoNPUPS <= 5){
            costUPS_express = 13.71
        } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 10){
            costUPS_express = 17.98
        } else if(pesovolumetricoNPUPS > 10 && pesovolumetricoNPUPS <= 20){
            costUPS_express = 24.32
        } else if(pesovolumetricoNPUPS > 20 && pesovolumetricoNPUPS <= 30){
            costUPS_express = 30.70
        } else if(pesovolumetricoNPUPS > 30 && pesovolumetricoNPUPS <= 40){
            costUPS_express = 37.03
        } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 60){
            costUPS_express = 49.67
        } else if(pesovolumetricoNPUPS > 60 && pesovolumetricoNPUPS <= 70){
            costUPS_express = 56
        } else if(pesovolumetricoNPUPS > 70){
            costUPS_express = Math.floor(pesovolumetricoNPUPS)*0.80
        }
    }
    if(areaUPSexpress == 2){
        if(pesovolumetricoNPUPS <= 1){
            costUPS_express = 14.97
        } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 1.5){
            costUPS_express = 15.70
        } else if(pesovolumetricoNPUPS > 1.5 && pesovolumetricoNPUPS <= 3){
            costUPS_express = 22.08
        } else if(pesovolumetricoNPUPS > 3 && pesovolumetricoNPUPS <= 5){
            costUPS_express = 29.78
        } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 7){
            costUPS_express = 35.71
        } else if(pesovolumetricoNPUPS > 7 && pesovolumetricoNPUPS <= 9){
            costUPS_express = 41.64
        } else if(pesovolumetricoNPUPS > 9 && pesovolumetricoNPUPS <= 12){
            costUPS_express = 48.35
        } else if(pesovolumetricoNPUPS > 12 && pesovolumetricoNPUPS <= 15){
            costUPS_express = 55
        } else if(pesovolumetricoNPUPS > 15 && pesovolumetricoNPUPS <= 18){
            costUPS_express = 61.47
        } else if(pesovolumetricoNPUPS > 18 && pesovolumetricoNPUPS <= 22){
            costUPS_express = 69.80
        } else if(pesovolumetricoNPUPS > 22 && pesovolumetricoNPUPS <= 28){
            costUPS_express = 81.92
        } else if(pesovolumetricoNPUPS > 28 && pesovolumetricoNPUPS <= 35){
            costUPS_express = 92.36
        } else if(pesovolumetricoNPUPS > 35 && pesovolumetricoNPUPS <= 40){
            costUPS_express = 100.67
        } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 45){
            costUPS_express = 109.49
        } else if(pesovolumetricoNPUPS > 45 && pesovolumetricoNPUPS <= 50){
            costUPS_express = 118.19
        } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 55){
            costUPS_express = 126.91
        } else if(pesovolumetricoNPUPS > 55 && pesovolumetricoNPUPS <= 60){
            costUPS_express = 135.37
        } else if(pesovolumetricoNPUPS > 60 && pesovolumetricoNPUPS <= 65){
            costUPS_express = 143.54
        } else if(pesovolumetricoNPUPS > 65 && pesovolumetricoNPUPS <= 70){
            costUPS_express = 151.71
        } else if(pesovolumetricoNPUPS > 70){
            costUPS_express = Math.floor(pesovolumetricoNPUPS)*2.17
        }
    }
    if(areaUPSexpress == 3){
        if(pesovolumetricoNPUPS <= 1){
            costUPS_express = 14.96
        } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 1.5){
            costUPS_express = 15.80
        } else if(pesovolumetricoNPUPS > 1.5 && pesovolumetricoNPUPS <= 3){
            costUPS_express = 22.50
        } else if(pesovolumetricoNPUPS > 3 && pesovolumetricoNPUPS <= 5){
            costUPS_express = 30.65
        } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 7){
            costUPS_express = 36.35
        } else if(pesovolumetricoNPUPS > 7 && pesovolumetricoNPUPS <= 9){
            costUPS_express = 42.38
        } else if(pesovolumetricoNPUPS > 9 && pesovolumetricoNPUPS <= 12){
            costUPS_express = 48.60
        } else if(pesovolumetricoNPUPS > 12 && pesovolumetricoNPUPS <= 15){
            costUPS_express = 55.87
        } else if(pesovolumetricoNPUPS > 15 && pesovolumetricoNPUPS <= 18){
            costUPS_express = 63.16
        } else if(pesovolumetricoNPUPS > 18 && pesovolumetricoNPUPS <= 22){
            costUPS_express = 72.34
        } else if(pesovolumetricoNPUPS > 22 && pesovolumetricoNPUPS <= 28){
            costUPS_express = 84.36
        } else if(pesovolumetricoNPUPS > 28 && pesovolumetricoNPUPS <= 35){
            costUPS_express = 98.04
        } else if(pesovolumetricoNPUPS > 35 && pesovolumetricoNPUPS <= 40){
            costUPS_express = 107.71
        } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 45){
            costUPS_express = 117.35
        } else if(pesovolumetricoNPUPS > 45 && pesovolumetricoNPUPS <= 50){
            costUPS_express = 126.74
        } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 55){
            costUPS_express = 136.14
        } else if(pesovolumetricoNPUPS > 55 && pesovolumetricoNPUPS <= 60){
            costUPS_express = 145.55
        } else if(pesovolumetricoNPUPS > 60 && pesovolumetricoNPUPS <= 65){
            costUPS_express = 154.92
        } else if(pesovolumetricoNPUPS > 65 && pesovolumetricoNPUPS <= 70){
            costUPS_express = 164.30
        } else if(pesovolumetricoNPUPS > 70){
            costUPS_express = Math.floor(pesovolumetricoNPUPS)*2.35
        }
    }
    if(areaUPSexpress == 4){
        if(pesovolumetricoNPUPS <= 1){
            costUPS_express = 14.96
        } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 1.5){
            costUPS_express = 16.28
        } else if(pesovolumetricoNPUPS > 1.5 && pesovolumetricoNPUPS <= 3){
            costUPS_express = 23.16
        } else if(pesovolumetricoNPUPS > 3 && pesovolumetricoNPUPS <= 5){
            costUPS_express = 32.06
        } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 7){
            costUPS_express = 38.21
        } else if(pesovolumetricoNPUPS > 7 && pesovolumetricoNPUPS <= 9){
            costUPS_express = 43.99
        } else if(pesovolumetricoNPUPS > 9 && pesovolumetricoNPUPS <= 12){
            costUPS_express = 51.13
        } else if(pesovolumetricoNPUPS > 12 && pesovolumetricoNPUPS <= 15){
            costUPS_express = 59.07
        } else if(pesovolumetricoNPUPS > 15 && pesovolumetricoNPUPS <= 18){
            costUPS_express = 67.01
        } else if(pesovolumetricoNPUPS > 18 && pesovolumetricoNPUPS <= 22){
            costUPS_express = 77.04
        } else if(pesovolumetricoNPUPS > 22 && pesovolumetricoNPUPS <= 28){
            costUPS_express = 89.36
        } else if(pesovolumetricoNPUPS > 28 && pesovolumetricoNPUPS <= 35){
            costUPS_express = 102.25
        } else if(pesovolumetricoNPUPS > 35 && pesovolumetricoNPUPS <= 40){
            costUPS_express = 111.01
        } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 45){
            costUPS_express = 121.84
        } else if(pesovolumetricoNPUPS > 45 && pesovolumetricoNPUPS <= 50){
            costUPS_express = 132.69
        } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 55){
            costUPS_express = 142.89
        } else if(pesovolumetricoNPUPS > 55 && pesovolumetricoNPUPS <= 60){
            costUPS_express = 152.72
        } else if(pesovolumetricoNPUPS > 60 && pesovolumetricoNPUPS <= 65){
            costUPS_express = 162.53
        } else if(pesovolumetricoNPUPS > 65 && pesovolumetricoNPUPS <= 70){
            costUPS_express = 172.56
        } else if(pesovolumetricoNPUPS > 70){
            costUPS_express = Math.floor(pesovolumetricoNPUPS)*2.46
        }
    }
    if(areaUPSexpress == 41){
        if(pesovolumetricoNPUPS <= 1){
            costUPS_express = 19.25
        } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 1.5){
            costUPS_express = 27.90
        } else if(pesovolumetricoNPUPS > 1.5 && pesovolumetricoNPUPS <= 3){
            costUPS_express = 44.42
        } else if(pesovolumetricoNPUPS > 3 && pesovolumetricoNPUPS <= 5){
            costUPS_express = 67.16
        } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 7){
            costUPS_express = 80.64
        } else if(pesovolumetricoNPUPS > 7 && pesovolumetricoNPUPS <= 9){
            costUPS_express = 94.07
        } else if(pesovolumetricoNPUPS > 9 && pesovolumetricoNPUPS <= 12){
            costUPS_express = 114.01
        } else if(pesovolumetricoNPUPS > 12 && pesovolumetricoNPUPS <= 15){
            costUPS_express = 133.66
        } else if(pesovolumetricoNPUPS > 15 && pesovolumetricoNPUPS <= 18){
            costUPS_express = 152.54
        } else if(pesovolumetricoNPUPS > 18 && pesovolumetricoNPUPS <= 22){
            costUPS_express = 182.13
        } else if(pesovolumetricoNPUPS > 22 && pesovolumetricoNPUPS <= 28){
            costUPS_express = 217.78
        } else if(pesovolumetricoNPUPS > 28 && pesovolumetricoNPUPS <= 35){
            costUPS_express = 258.53
        } else if(pesovolumetricoNPUPS > 35 && pesovolumetricoNPUPS <= 40){
            costUPS_express = 286.65
        } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 45){
            costUPS_express = 314.78
        } else if(pesovolumetricoNPUPS > 45 && pesovolumetricoNPUPS <= 50){
            costUPS_express = 342.88
        } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 55){
            costUPS_express = 371.01
        } else if(pesovolumetricoNPUPS > 55 && pesovolumetricoNPUPS <= 60){
            costUPS_express = 399.13
        } else if(pesovolumetricoNPUPS > 60 && pesovolumetricoNPUPS <= 65){
            costUPS_express = 427.25
        } else if(pesovolumetricoNPUPS > 65 && pesovolumetricoNPUPS <= 70){
            costUPS_express = 455.37
        } else if(pesovolumetricoNPUPS > 70){
            costUPS_express = Math.floor(pesovolumetricoNPUPS)*6.51
        }
    }
    if(areaUPSexpress == 42){
        if(pesovolumetricoNPUPS <= 1){
            costUPS_express = 19.27
        } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 1.5){
            costUPS_express = 28.06
        } else if(pesovolumetricoNPUPS > 1.5 && pesovolumetricoNPUPS <= 3){
            costUPS_express = 44.69
        } else if(pesovolumetricoNPUPS > 3 && pesovolumetricoNPUPS <= 5){
            costUPS_express = 67.27
        } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 7){
            costUPS_express = 80.88
        } else if(pesovolumetricoNPUPS > 7 && pesovolumetricoNPUPS <= 9){
            costUPS_express = 94.48
        } else if(pesovolumetricoNPUPS > 9 && pesovolumetricoNPUPS <= 12){
            costUPS_express = 115.04
        } else if(pesovolumetricoNPUPS > 12 && pesovolumetricoNPUPS <= 15){
            costUPS_express = 135.65
        } else if(pesovolumetricoNPUPS > 15 && pesovolumetricoNPUPS <= 18){
            costUPS_express = 155.50
        } else if(pesovolumetricoNPUPS > 18 && pesovolumetricoNPUPS <= 22){
            costUPS_express = 182.13
        } else if(pesovolumetricoNPUPS > 22 && pesovolumetricoNPUPS <= 28){
            costUPS_express = 220.42
        } else if(pesovolumetricoNPUPS > 28 && pesovolumetricoNPUPS <= 35){
            costUPS_express = 262.81
        } else if(pesovolumetricoNPUPS > 35 && pesovolumetricoNPUPS <= 40){
            costUPS_express = 291.38
        } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 45){
            costUPS_express = 319.96
        } else if(pesovolumetricoNPUPS > 45 && pesovolumetricoNPUPS <= 50){
            costUPS_express = 348.53
        } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 55){
            costUPS_express = 377.11
        } else if(pesovolumetricoNPUPS > 55 && pesovolumetricoNPUPS <= 60){
            costUPS_express = 405.41
        } else if(pesovolumetricoNPUPS > 60 && pesovolumetricoNPUPS <= 65){
            costUPS_express = 433.63
        } else if(pesovolumetricoNPUPS > 65 && pesovolumetricoNPUPS <= 70){
            costUPS_express = 461.84
        } else if(pesovolumetricoNPUPS > 70){
            costUPS_express = Math.floor(pesovolumetricoNPUPS)*6.60   
        }
    }
    if(areaUPSexpress == 5){
        if(pesovolumetricoNPUPS <= 1){
            costUPS_express = 24.97
        } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 1.5){
            costUPS_express = 24.97
        } else if(pesovolumetricoNPUPS > 1.5 && pesovolumetricoNPUPS <= 3){
            costUPS_express = 27.04
        } else if(pesovolumetricoNPUPS > 3 && pesovolumetricoNPUPS <= 5){
            costUPS_express = 36.12
        } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 7){
            costUPS_express = 42.74
        } else if(pesovolumetricoNPUPS > 7 && pesovolumetricoNPUPS <= 9){
            costUPS_express = 49.27
        } else if(pesovolumetricoNPUPS > 9 && pesovolumetricoNPUPS <= 12){
            costUPS_express = 58.41
        } else if(pesovolumetricoNPUPS > 12 && pesovolumetricoNPUPS <= 15){
            costUPS_express = 67.07
        } else if(pesovolumetricoNPUPS > 15 && pesovolumetricoNPUPS <= 18){
            costUPS_express = 75.66
        } else if(pesovolumetricoNPUPS > 18 && pesovolumetricoNPUPS <= 22){
            costUPS_express = 86.68
        } else if(pesovolumetricoNPUPS > 22 && pesovolumetricoNPUPS <= 28){
            costUPS_express = 220.42
        } else if(pesovolumetricoNPUPS > 28 && pesovolumetricoNPUPS <= 30){
            costUPS_express = 101.17
        } else if(pesovolumetricoNPUPS > 30 && pesovolumetricoNPUPS <= 35){
            costUPS_express = 115.87
        } else if(pesovolumetricoNPUPS > 35 && pesovolumetricoNPUPS <= 40){
            costUPS_express = 125.70
        } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 45){
            costUPS_express = 135.54
        } else if(pesovolumetricoNPUPS > 45 && pesovolumetricoNPUPS <= 50){
            costUPS_express = 145.43
        } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 55){
            costUPS_express = 155.27
        } else if(pesovolumetricoNPUPS > 55 && pesovolumetricoNPUPS <= 60){
            costUPS_express = 165.11
        } else if(pesovolumetricoNPUPS > 60 && pesovolumetricoNPUPS <= 65){
            costUPS_express = 174.93
        } else if(pesovolumetricoNPUPS > 65 && pesovolumetricoNPUPS <= 70){
            costUPS_express = 184.79
        } else if(pesovolumetricoNPUPS > 70){
            costUPS_express = Math.floor(pesovolumetricoNPUPS)*2.64
        }
    }    
    if(areaUPSexpress == 6){
        if(pesovolumetricoNPUPS <= 1){
            costUPS_express = 41.30
        } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 1.5){
            costUPS_express = 50.21
        } else if(pesovolumetricoNPUPS > 1.5 && pesovolumetricoNPUPS <= 3){
            costUPS_express = 63.50
        } else if(pesovolumetricoNPUPS > 3 && pesovolumetricoNPUPS <= 5){
            costUPS_express = 81.38
        } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 7){
            costUPS_express = 99.17
        } else if(pesovolumetricoNPUPS > 7 && pesovolumetricoNPUPS <= 9){
            costUPS_express = 116.96
        } else if(pesovolumetricoNPUPS > 9 && pesovolumetricoNPUPS <= 12){
            costUPS_express = 141.77
        } else if(pesovolumetricoNPUPS > 12 && pesovolumetricoNPUPS <= 15){
            costUPS_express = 165.62
        } else if(pesovolumetricoNPUPS > 15 && pesovolumetricoNPUPS <= 18){
            costUPS_express = 189.48
        } else if(pesovolumetricoNPUPS > 18 && pesovolumetricoNPUPS <= 22){
            costUPS_express = 222.46
        } else if(pesovolumetricoNPUPS > 22 && pesovolumetricoNPUPS <= 28){
            costUPS_express = 270.71
        } else if(pesovolumetricoNPUPS > 28 && pesovolumetricoNPUPS <= 30){
            costUPS_express = 280.86
        } else if(pesovolumetricoNPUPS > 30 && pesovolumetricoNPUPS <= 35){
            costUPS_express = 321.09
        } else if(pesovolumetricoNPUPS > 35 && pesovolumetricoNPUPS <= 40){
            costUPS_express = 355.38
        } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 45){
            costUPS_express = 389.59
        } else if(pesovolumetricoNPUPS > 45 && pesovolumetricoNPUPS <= 50){
            costUPS_express = 423.85
        } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 55){
            costUPS_express = 458.13
        } else if(pesovolumetricoNPUPS > 55 && pesovolumetricoNPUPS <= 60){
            costUPS_express = 492.38
        } else if(pesovolumetricoNPUPS > 60 && pesovolumetricoNPUPS <= 65){
            costUPS_express = 526.66
        } else if(pesovolumetricoNPUPS > 65 && pesovolumetricoNPUPS <= 70){
            costUPS_express = 560.91
        } else if(pesovolumetricoNPUPS > 70){
            costUPS_express = Math.floor(pesovolumetricoNPUPS)*8.01
        }
    }   
    if(areaUPSexpress == 8){
        if(pesovolumetricoNPUPS <= 1){
            costUPS_express = 25
        } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 1.5){
            costUPS_express = 25
        } else if(pesovolumetricoNPUPS > 1.5 && pesovolumetricoNPUPS <= 3){
            costUPS_express = 31.66
        } else if(pesovolumetricoNPUPS > 3 && pesovolumetricoNPUPS <= 5){
            costUPS_express = 42.15
        } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 7){
            costUPS_express = 51.71
        } else if(pesovolumetricoNPUPS > 7 && pesovolumetricoNPUPS <= 9){
            costUPS_express = 61.24
        } else if(pesovolumetricoNPUPS > 9 && pesovolumetricoNPUPS <= 12){
            costUPS_express = 75.74
        } else if(pesovolumetricoNPUPS > 12 && pesovolumetricoNPUPS <= 15){
            costUPS_express = 90.41
        } else if(pesovolumetricoNPUPS > 15 && pesovolumetricoNPUPS <= 18){
            costUPS_express = 105.01
        } else if(pesovolumetricoNPUPS > 18 && pesovolumetricoNPUPS <= 22){
            costUPS_express = 124.93
        } else if(pesovolumetricoNPUPS > 22 && pesovolumetricoNPUPS <= 28){
            costUPS_express = 153.85
        } else if(pesovolumetricoNPUPS > 28 && pesovolumetricoNPUPS <= 30){
            costUPS_express = 163.47
        } else if(pesovolumetricoNPUPS > 30 && pesovolumetricoNPUPS <= 35){
            costUPS_express = 184.75
        } else if(pesovolumetricoNPUPS > 35 && pesovolumetricoNPUPS <= 40){
            costUPS_express = 206.02
        } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 45){
            costUPS_express = 227.30
        } else if(pesovolumetricoNPUPS > 45 && pesovolumetricoNPUPS <= 50){
            costUPS_express = 248.58
        } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 55){
            costUPS_express = 269.82
        } else if(pesovolumetricoNPUPS > 55 && pesovolumetricoNPUPS <= 60){
            costUPS_express = 291.10
        } else if(pesovolumetricoNPUPS > 60 && pesovolumetricoNPUPS <= 65){
            costUPS_express = 312.39
        } else if(pesovolumetricoNPUPS > 65 && pesovolumetricoNPUPS <= 70){
            costUPS_express = 333.65
        } else if(pesovolumetricoNPUPS > 70){
            costUPS_express = Math.floor(pesovolumetricoNPUPS)*4.76
        }
    }        
    if(areaUPSexpress == 9){
        if(pesovolumetricoNPUPS <= 1){
            costUPS_express = 31.38
        } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 1.5){
            costUPS_express = 40.72
        } else if(pesovolumetricoNPUPS > 1.5 && pesovolumetricoNPUPS <= 3){
            costUPS_express = 54.75
        } else if(pesovolumetricoNPUPS > 3 && pesovolumetricoNPUPS <= 5){
            costUPS_express = 73.47
        } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 7){
            costUPS_express = 88.10
        } else if(pesovolumetricoNPUPS > 7 && pesovolumetricoNPUPS <= 9){
            costUPS_express = 105.49
        } else if(pesovolumetricoNPUPS > 9 && pesovolumetricoNPUPS <= 12){
            costUPS_express = 127.01
        } else if(pesovolumetricoNPUPS > 12 && pesovolumetricoNPUPS <= 15){
            costUPS_express = 146.13
        } else if(pesovolumetricoNPUPS > 15 && pesovolumetricoNPUPS <= 18){
            costUPS_express = 165.33
        } else if(pesovolumetricoNPUPS > 18 && pesovolumetricoNPUPS <= 22){
            costUPS_express = 191.36
        } else if(pesovolumetricoNPUPS > 22 && pesovolumetricoNPUPS <= 28){
            costUPS_express = 228.50
        } else if(pesovolumetricoNPUPS > 28 && pesovolumetricoNPUPS <= 30){
            costUPS_express = 240.89
        } else if(pesovolumetricoNPUPS > 30 && pesovolumetricoNPUPS <= 35){
            costUPS_express = 270.67
        } else if(pesovolumetricoNPUPS > 35 && pesovolumetricoNPUPS <= 40){
            costUPS_express = 297.71
        } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 45){
            costUPS_express = 328.77
        } else if(pesovolumetricoNPUPS > 45 && pesovolumetricoNPUPS <= 50){
            costUPS_express = 364.29
        } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 55){
            costUPS_express = 394.51
        } else if(pesovolumetricoNPUPS > 55 && pesovolumetricoNPUPS <= 60){
            costUPS_express = 423.75
        } else if(pesovolumetricoNPUPS > 60 && pesovolumetricoNPUPS <= 65){
            costUPS_express = 452.92
        } else if(pesovolumetricoNPUPS > 65 && pesovolumetricoNPUPS <= 70){
            costUPS_express = 482.13
        } else if(pesovolumetricoNPUPS > 70){
            costUPS_express = Math.floor(pesovolumetricoNPUPS)*6.89
        }
    }           
    if(areaUPSexpress == 10){
        if(pesovolumetricoNPUPS <= 1){
            costUPS_express = 34.56
        } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 1.5){
            costUPS_express = 44.17
        } else if(pesovolumetricoNPUPS > 1.5 && pesovolumetricoNPUPS <= 3){
            costUPS_express = 58.61
        } else if(pesovolumetricoNPUPS > 3 && pesovolumetricoNPUPS <= 5){
            costUPS_express = 77.95
        } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 7){
            costUPS_express = 92.62
        } else if(pesovolumetricoNPUPS > 7 && pesovolumetricoNPUPS <= 9){
            costUPS_express = 111.06
        } else if(pesovolumetricoNPUPS > 9 && pesovolumetricoNPUPS <= 12){
            costUPS_express = 133
        } else if(pesovolumetricoNPUPS > 12 && pesovolumetricoNPUPS <= 15){
            costUPS_express = 152.05
        } else if(pesovolumetricoNPUPS > 15 && pesovolumetricoNPUPS <= 18){
            costUPS_express = 171.15
        } else if(pesovolumetricoNPUPS > 18 && pesovolumetricoNPUPS <= 22){
            costUPS_express = 197.69
        } else if(pesovolumetricoNPUPS > 22 && pesovolumetricoNPUPS <= 28){
            costUPS_express = 236.58
        } else if(pesovolumetricoNPUPS > 28 && pesovolumetricoNPUPS <= 30){
            costUPS_express = 249.55
        } else if(pesovolumetricoNPUPS > 30 && pesovolumetricoNPUPS <= 35){
            costUPS_express = 279.39
        } else if(pesovolumetricoNPUPS > 35 && pesovolumetricoNPUPS <= 40){
            costUPS_express = 309.17
        } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 45){
            costUPS_express = 339.01
        } else if(pesovolumetricoNPUPS > 45 && pesovolumetricoNPUPS <= 50){
            costUPS_express = 376.61
        } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 55){
            costUPS_express = 406.59
        } else if(pesovolumetricoNPUPS > 55 && pesovolumetricoNPUPS <= 60){
            costUPS_express = 436.54
        } else if(pesovolumetricoNPUPS > 60 && pesovolumetricoNPUPS <= 65){
            costUPS_express = 466.50
        } else if(pesovolumetricoNPUPS > 65 && pesovolumetricoNPUPS <= 70){
            costUPS_express = 496.49
        } else if(pesovolumetricoNPUPS > 70){
            costUPS_express = Math.floor(pesovolumetricoNPUPS)*7.09
        }
    }               
    if(areaUPSexpress == 11){
        if(pesovolumetricoNPUPS <= 1){
            costUPS_express = 41.43
        } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 1.5){
            costUPS_express = 51.30
        } else if(pesovolumetricoNPUPS > 1.5 && pesovolumetricoNPUPS <= 3){
            costUPS_express = 66.11
        } else if(pesovolumetricoNPUPS > 3 && pesovolumetricoNPUPS <= 5){
            costUPS_express = 85.90
        } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 7){
            costUPS_express = 105.66
        } else if(pesovolumetricoNPUPS > 7 && pesovolumetricoNPUPS <= 9){
            costUPS_express = 125.46
        } else if(pesovolumetricoNPUPS > 9 && pesovolumetricoNPUPS <= 12){
            costUPS_express = 150.95
        } else if(pesovolumetricoNPUPS > 12 && pesovolumetricoNPUPS <= 15){
            costUPS_express = 174.33
        } else if(pesovolumetricoNPUPS > 15 && pesovolumetricoNPUPS <= 18){
            costUPS_express = 197.70
        } else if(pesovolumetricoNPUPS > 18 && pesovolumetricoNPUPS <= 22){
            costUPS_express = 229.45
        } else if(pesovolumetricoNPUPS > 22 && pesovolumetricoNPUPS <= 28){
            costUPS_express = 274.77
        } else if(pesovolumetricoNPUPS > 28 && pesovolumetricoNPUPS <= 30){
            costUPS_express = 289.87
        } else if(pesovolumetricoNPUPS > 30 && pesovolumetricoNPUPS <= 35){
            costUPS_express = 321.28
        } else if(pesovolumetricoNPUPS > 35 && pesovolumetricoNPUPS <= 40){
            costUPS_express = 352.66
        } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 45){
            costUPS_express = 384.02
        } else if(pesovolumetricoNPUPS > 45 && pesovolumetricoNPUPS <= 50){
            costUPS_express = 415.41
        } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 55){
            costUPS_express = 446.80
        } else if(pesovolumetricoNPUPS > 55 && pesovolumetricoNPUPS <= 60){
            costUPS_express = 478.19
        } else if(pesovolumetricoNPUPS > 60 && pesovolumetricoNPUPS <= 65){
            costUPS_express = 509.57
        } else if(pesovolumetricoNPUPS > 65 && pesovolumetricoNPUPS <= 70){
            costUPS_express = 540.94
        } else if(pesovolumetricoNPUPS > 70){
            costUPS_express = Math.floor(pesovolumetricoNPUPS)*7.73
        }
    }                    
    if(areaUPSexpress == 12){
        if(pesovolumetricoNPUPS <= 1){
            costUPS_express = 24.94
        } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 1.5){
            costUPS_express = 26.78
        } else if(pesovolumetricoNPUPS > 1.5 && pesovolumetricoNPUPS <= 3){
            costUPS_express = 36.23
        } else if(pesovolumetricoNPUPS > 3 && pesovolumetricoNPUPS <= 5){
            costUPS_express = 47.10
        } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 7){
            costUPS_express = 56.37
        } else if(pesovolumetricoNPUPS > 7 && pesovolumetricoNPUPS <= 9){
            costUPS_express = 65.68
        } else if(pesovolumetricoNPUPS > 9 && pesovolumetricoNPUPS <= 12){
            costUPS_express = 76.87
        } else if(pesovolumetricoNPUPS > 12 && pesovolumetricoNPUPS <= 15){
            costUPS_express = 86.66
        } else if(pesovolumetricoNPUPS > 15 && pesovolumetricoNPUPS <= 18){
            costUPS_express = 96.45
        } else if(pesovolumetricoNPUPS > 18 && pesovolumetricoNPUPS <= 22){
            costUPS_express = 110.06
        } else if(pesovolumetricoNPUPS > 22 && pesovolumetricoNPUPS <= 28){
            costUPS_express = 129.81
        } else if(pesovolumetricoNPUPS > 28 && pesovolumetricoNPUPS <= 30){
            costUPS_express = 136.43
        } else if(pesovolumetricoNPUPS > 30 && pesovolumetricoNPUPS <= 35){
            costUPS_express = 148.97
        } else if(pesovolumetricoNPUPS > 35 && pesovolumetricoNPUPS <= 40){
            costUPS_express = 161.48
        } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 45){
            costUPS_express = 174
        } else if(pesovolumetricoNPUPS > 45 && pesovolumetricoNPUPS <= 50){
            costUPS_express = 186.53
        } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 55){
            costUPS_express = 199.03
        } else if(pesovolumetricoNPUPS > 55 && pesovolumetricoNPUPS <= 60){
            costUPS_express = 211.54
        } else if(pesovolumetricoNPUPS > 60 && pesovolumetricoNPUPS <= 65){
            costUPS_express = 224.07
        } else if(pesovolumetricoNPUPS > 65 && pesovolumetricoNPUPS <= 70){
            costUPS_express = 236.58
        } else if(pesovolumetricoNPUPS > 70){
            costUPS_express = Math.floor(pesovolumetricoNPUPS)*3.38
        }
    }
}

    // UPS express saver cost
        // takes UPS Area number and volumetric weight
        // returns the ups express saver cost
function calcolo_costo_UPS_express_saver(areaUPSsaver, pesovolumetricoNPUPS){
    if(areaUPSsaver == 1){
        if(pesovolumetricoNPUPS <= 1){
            costUPS_saver = 9.85
        } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 3){
            costUPS_saver = 10.80
        } else if(pesovolumetricoNPUPS > 3 && pesovolumetricoNPUPS <= 5){
            costUPS_saver = 11.71
        } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 7){
            costUPS_saver = 12.65
        } else if(pesovolumetricoNPUPS > 7 && pesovolumetricoNPUPS <= 9){
            costUPS_saver = 13.68
        } else if(pesovolumetricoNPUPS > 9 && pesovolumetricoNPUPS <= 10){
            costUPS_saver = 14.15
        } else if(pesovolumetricoNPUPS > 10 && pesovolumetricoNPUPS <= 20){
            costUPS_saver = 19.04
        } else if(pesovolumetricoNPUPS > 20 && pesovolumetricoNPUPS <= 30){
            costUPS_saver = 24.10
        } else if(pesovolumetricoNPUPS > 30 && pesovolumetricoNPUPS <= 40){
            costUPS_saver = 29.03
        } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 50){
            costUPS_saver = 33.96
        } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 60){
            costUPS_saver = 38.88
        } else if(pesovolumetricoNPUPS > 60 && pesovolumetricoNPUPS <= 70){
            costUPS_saver = 43.86
        } else if(pesovolumetricoNPUPS > 70){
            costUPS_saver = Math.floor(pesovolumetricoNPUPS)*0.63
        }
    }
    if(areaUPSsaver == 2){
        if(pesovolumetricoNPUPS <= 1){
            costUPS_saver = 11.98
        } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 2){
            costUPS_saver = 14.98
        } else if(pesovolumetricoNPUPS > 2 && pesovolumetricoNPUPS <= 3){
            costUPS_saver = 18.33
        } else if(pesovolumetricoNPUPS > 3 && pesovolumetricoNPUPS <= 4){
            costUPS_saver = 21.64
        } else if(pesovolumetricoNPUPS > 4 && pesovolumetricoNPUPS <= 5){
            costUPS_saver = 24.95
        } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 7){
            costUPS_saver = 29.82
        } else if(pesovolumetricoNPUPS > 7 && pesovolumetricoNPUPS <= 8){
            costUPS_saver = 32.26
        } else if(pesovolumetricoNPUPS > 8 && pesovolumetricoNPUPS <= 9){
            costUPS_saver = 34.69
        } else if(pesovolumetricoNPUPS > 9 && pesovolumetricoNPUPS <= 10){
            costUPS_saver = 37.13
        } else if(pesovolumetricoNPUPS > 10 && pesovolumetricoNPUPS <= 12){
            costUPS_saver = 40.18
        } else if(pesovolumetricoNPUPS > 12 && pesovolumetricoNPUPS <= 15){
            costUPS_saver = 45.70
        } else if(pesovolumetricoNPUPS > 15 && pesovolumetricoNPUPS <= 18){
            costUPS_saver = 51.24
        } else if(pesovolumetricoNPUPS > 18 && pesovolumetricoNPUPS <= 20){
            costUPS_saver = 54.97
        } else if(pesovolumetricoNPUPS > 20 && pesovolumetricoNPUPS <= 24){
            costUPS_saver = 61.79
        } else if(pesovolumetricoNPUPS > 24 && pesovolumetricoNPUPS <= 30){
            costUPS_saver = 71.70
        } else if(pesovolumetricoNPUPS > 30 && pesovolumetricoNPUPS <= 35){
            costUPS_saver = 78.48
        } else if(pesovolumetricoNPUPS > 35 && pesovolumetricoNPUPS <= 40){
            costUPS_saver = 85.28
        } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 45){
            costUPS_saver = 92.07
        } else if(pesovolumetricoNPUPS > 45 && pesovolumetricoNPUPS <= 50){
            costUPS_saver = 98.89
        } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 55){
            costUPS_saver = 105.69
        } else if(pesovolumetricoNPUPS > 55 && pesovolumetricoNPUPS <= 60){
            costUPS_saver = 112.49
        } else if(pesovolumetricoNPUPS > 60 && pesovolumetricoNPUPS <= 65){
            costUPS_saver = 119.27
        } else if(pesovolumetricoNPUPS > 65 && pesovolumetricoNPUPS <= 70){
            costUPS_saver = 126.10
        } else if(pesovolumetricoNPUPS > 70){
            costUPS_saver = Math.floor(pesovolumetricoNPUPS)*1.80
        }
    }                                                
    if(areaUPSsaver == 3){
        if(pesovolumetricoNPUPS <= 1){
            costUPS_saver = 11.96
        } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 2){
            costUPS_saver = 15.05
        } else if(pesovolumetricoNPUPS > 2 && pesovolumetricoNPUPS <= 3){
            costUPS_saver = 18.69
        } else if(pesovolumetricoNPUPS > 3 && pesovolumetricoNPUPS <= 4){
            costUPS_saver = 22.07
        } else if(pesovolumetricoNPUPS > 4 && pesovolumetricoNPUPS <= 5){
            costUPS_saver = 25.48
        } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 7){
            costUPS_saver = 30.50
        } else if(pesovolumetricoNPUPS > 7 && pesovolumetricoNPUPS <= 8){
            costUPS_saver = 33
        } else if(pesovolumetricoNPUPS > 8 && pesovolumetricoNPUPS <= 9){
            costUPS_saver = 35.46
        } else if(pesovolumetricoNPUPS > 9 && pesovolumetricoNPUPS <= 10){
            costUPS_saver = 37.81
        } else if(pesovolumetricoNPUPS > 10 && pesovolumetricoNPUPS <= 12){
            costUPS_saver = 40.39
        } else if(pesovolumetricoNPUPS > 12 && pesovolumetricoNPUPS <= 15){
            costUPS_saver = 46.43
        } else if(pesovolumetricoNPUPS > 15 && pesovolumetricoNPUPS <= 18){
            costUPS_saver = 52.47
        } else if(pesovolumetricoNPUPS > 18 && pesovolumetricoNPUPS <= 20){
            costUPS_saver = 56.53
        } else if(pesovolumetricoNPUPS > 20 && pesovolumetricoNPUPS <= 24){
            costUPS_saver = 63.42
        } else if(pesovolumetricoNPUPS > 24 && pesovolumetricoNPUPS <= 30){
            costUPS_saver = 73.39
        } else if(pesovolumetricoNPUPS > 30 && pesovolumetricoNPUPS <= 35){
            costUPS_saver = 81.46
        } else if(pesovolumetricoNPUPS > 35 && pesovolumetricoNPUPS <= 40){
            costUPS_saver = 89.51
        } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 45){
            costUPS_saver = 97.52
        } else if(pesovolumetricoNPUPS > 45 && pesovolumetricoNPUPS <= 50){
            costUPS_saver = 105.58
        } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 55){
            costUPS_saver = 113.62
        } else if(pesovolumetricoNPUPS > 55 && pesovolumetricoNPUPS <= 60){
            costUPS_saver = 121.65
        } else if(pesovolumetricoNPUPS > 60 && pesovolumetricoNPUPS <= 65){
            costUPS_saver = 129.70
        } else if(pesovolumetricoNPUPS > 65 && pesovolumetricoNPUPS <= 70){
            costUPS_saver = 137.75
        } else if(pesovolumetricoNPUPS > 70){
            costUPS_saver = Math.floor(pesovolumetricoNPUPS)*1.97
        }
    }
    if(areaUPSsaver == 4){
        if(pesovolumetricoNPUPS <= 1){
            costUPS_saver = 11.95
        } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 2){
            costUPS_saver = 15.43
        } else if(pesovolumetricoNPUPS > 2 && pesovolumetricoNPUPS <= 3){
            costUPS_saver = 19.25
        } else if(pesovolumetricoNPUPS > 3 && pesovolumetricoNPUPS <= 4){
            costUPS_saver = 23.12
        } else if(pesovolumetricoNPUPS > 4 && pesovolumetricoNPUPS <= 5){
            costUPS_saver = 26.64
        } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 7){
            costUPS_saver = 31.81
        } else if(pesovolumetricoNPUPS > 7 && pesovolumetricoNPUPS <= 8){
            costUPS_saver = 34.44
        } else if(pesovolumetricoNPUPS > 8 && pesovolumetricoNPUPS <= 9){
            costUPS_saver = 37.03
        } else if(pesovolumetricoNPUPS > 9 && pesovolumetricoNPUPS <= 10){
            costUPS_saver = 39.64
        } else if(pesovolumetricoNPUPS > 10 && pesovolumetricoNPUPS <= 12){
            costUPS_saver = 42.90
        } else if(pesovolumetricoNPUPS > 12 && pesovolumetricoNPUPS <= 15){
            costUPS_saver = 49.46
        } else if(pesovolumetricoNPUPS > 15 && pesovolumetricoNPUPS <= 18){
            costUPS_saver = 56
        } else if(pesovolumetricoNPUPS > 18 && pesovolumetricoNPUPS <= 20){
            costUPS_saver = 60.38
        } else if(pesovolumetricoNPUPS > 20 && pesovolumetricoNPUPS <= 24){
            costUPS_saver = 67.46
        } else if(pesovolumetricoNPUPS > 24 && pesovolumetricoNPUPS <= 30){
            costUPS_saver = 77.65
        } else if(pesovolumetricoNPUPS > 30 && pesovolumetricoNPUPS <= 35){
            costUPS_saver = 84.96
        } else if(pesovolumetricoNPUPS > 35 && pesovolumetricoNPUPS <= 40){
            costUPS_saver = 92.25
        } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 45){
            costUPS_saver = 101.25
        } else if(pesovolumetricoNPUPS > 45 && pesovolumetricoNPUPS <= 50){
            costUPS_saver = 110.27
        } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 55){
            costUPS_saver = 119.24
        } else if(pesovolumetricoNPUPS > 55 && pesovolumetricoNPUPS <= 60){
            costUPS_saver = 128.24
        } else if(pesovolumetricoNPUPS > 60 && pesovolumetricoNPUPS <= 65){
            costUPS_saver = 137.26
        } else if(pesovolumetricoNPUPS > 65 && pesovolumetricoNPUPS <= 70){
            costUPS_saver = 146.25
        } else if(pesovolumetricoNPUPS > 70){
            costUPS_saver = Math.floor(pesovolumetricoNPUPS)*2.09
        }
    }
    if(areaUPSsaver == 41){  
        if(pesovolumetricoNPUPS <= 1){
            costUPS_saver = 18.62
        } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 2){
            costUPS_saver = 28.16
        } else if(pesovolumetricoNPUPS > 2 && pesovolumetricoNPUPS <= 3){
            costUPS_saver = 36.93
        } else if(pesovolumetricoNPUPS > 3 && pesovolumetricoNPUPS <= 4){
            costUPS_saver = 46.38
        } else if(pesovolumetricoNPUPS > 4 && pesovolumetricoNPUPS <= 5){
            costUPS_saver = 55.84
        } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 7){
            costUPS_saver = 67.02
        } else if(pesovolumetricoNPUPS > 7 && pesovolumetricoNPUPS <= 8){
            costUPS_saver = 72.59
        } else if(pesovolumetricoNPUPS > 8 && pesovolumetricoNPUPS <= 9){
            costUPS_saver = 78.17
        } else if(pesovolumetricoNPUPS > 9 && pesovolumetricoNPUPS <= 10){
            costUPS_saver = 83.77
        } else if(pesovolumetricoNPUPS > 10 && pesovolumetricoNPUPS <= 12){
            costUPS_saver = 95.39
        } else if(pesovolumetricoNPUPS > 12 && pesovolumetricoNPUPS <= 15){
            costUPS_saver = 111.07
        } else if(pesovolumetricoNPUPS > 15 && pesovolumetricoNPUPS <= 18){
            costUPS_saver = 126.76
        } else if(pesovolumetricoNPUPS > 18 && pesovolumetricoNPUPS <= 20){
            costUPS_saver = 137.22
        } else if(pesovolumetricoNPUPS > 20 && pesovolumetricoNPUPS <= 24){
            costUPS_saver = 159.66
        } else if(pesovolumetricoNPUPS > 24 && pesovolumetricoNPUPS <= 30){
            costUPS_saver = 192.31
        } else if(pesovolumetricoNPUPS > 30 && pesovolumetricoNPUPS <= 35){
            costUPS_saver = 215.05
        } else if(pesovolumetricoNPUPS > 35 && pesovolumetricoNPUPS <= 40){
            costUPS_saver = 238.45
        } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 45){
            costUPS_saver = 261.83
        } else if(pesovolumetricoNPUPS > 45 && pesovolumetricoNPUPS <= 50){
            costUPS_saver = 285.24
        } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 55){
            costUPS_saver = 308.65
        } else if(pesovolumetricoNPUPS > 55 && pesovolumetricoNPUPS <= 60){
            costUPS_saver = 332.03
        } else if(pesovolumetricoNPUPS > 60 && pesovolumetricoNPUPS <= 65){
            costUPS_saver = 355.46
        } else if(pesovolumetricoNPUPS > 65 && pesovolumetricoNPUPS <= 70){
            costUPS_saver = 378.84
        } else if(pesovolumetricoNPUPS > 70){
            costUPS_saver = Math.floor(pesovolumetricoNPUPS)*5.41
        }
    }
    if(areaUPSsaver == 42){
        if(pesovolumetricoNPUPS <= 1){
            costUPS_saver = 16.01
        } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 2){
            costUPS_saver = 28.46
        } else if(pesovolumetricoNPUPS > 2 && pesovolumetricoNPUPS <= 3){
            costUPS_saver = 37.36
        } else if(pesovolumetricoNPUPS > 3 && pesovolumetricoNPUPS <= 4){
            costUPS_saver = 46.68
        } else if(pesovolumetricoNPUPS > 4 && pesovolumetricoNPUPS <= 5){
            costUPS_saver = 56
        } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 7){
            costUPS_saver = 67.83
        } else if(pesovolumetricoNPUPS > 7 && pesovolumetricoNPUPS <= 8){
            costUPS_saver = 73.32
        } else if(pesovolumetricoNPUPS > 8 && pesovolumetricoNPUPS <= 9){
            costUPS_saver = 79.62
        } else if(pesovolumetricoNPUPS > 9 && pesovolumetricoNPUPS <= 10){
            costUPS_saver = 85.54
        } else if(pesovolumetricoNPUPS > 10 && pesovolumetricoNPUPS <= 12){
            costUPS_saver = 96.59
        } else if(pesovolumetricoNPUPS > 12 && pesovolumetricoNPUPS <= 15){
            costUPS_saver = 112.87
        } else if(pesovolumetricoNPUPS > 15 && pesovolumetricoNPUPS <= 18){
            costUPS_saver = 129.22
        } else if(pesovolumetricoNPUPS > 18 && pesovolumetricoNPUPS <= 20){
            costUPS_saver = 140.05
        } else if(pesovolumetricoNPUPS > 20 && pesovolumetricoNPUPS <= 24){
            costUPS_saver = 161.96
        } else if(pesovolumetricoNPUPS > 24 && pesovolumetricoNPUPS <= 30){
            costUPS_saver = 193.79
        } else if(pesovolumetricoNPUPS > 30 && pesovolumetricoNPUPS <= 35){
            costUPS_saver = 219.63
        } else if(pesovolumetricoNPUPS > 35 && pesovolumetricoNPUPS <= 40){
            costUPS_saver = 243.09
        } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 45){
            costUPS_saver = 266.54
        } else if(pesovolumetricoNPUPS > 45 && pesovolumetricoNPUPS <= 50){
            costUPS_saver = 290.01
        } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 55){
            costUPS_saver = 313.44
        } else if(pesovolumetricoNPUPS > 55 && pesovolumetricoNPUPS <= 60){
            costUPS_saver = 336.90
        } else if(pesovolumetricoNPUPS > 60 && pesovolumetricoNPUPS <= 65){
            costUPS_saver = 360.34
        } else if(pesovolumetricoNPUPS > 65 && pesovolumetricoNPUPS <= 70){
            costUPS_saver = 383.80
        } else if(pesovolumetricoNPUPS > 70){
            costUPS_saver = Math.floor(pesovolumetricoNPUPS)*5.48
        }
    }
    /*
    if(areaUPSsaver == 5){//fix
        if(pesovolumetricoNPUPS <= 1){
            costUPS_saver = 11.99
        } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 2){
            costUPS_saver = 16.22
        } else if(pesovolumetricoNPUPS > 2 && pesovolumetricoNPUPS <= 3){
            costUPS_saver = 19.41
        } else if(pesovolumetricoNPUPS > 3 && pesovolumetricoNPUPS <= 4){
            costUPS_saver = 22.66
        } else if(pesovolumetricoNPUPS > 4 && pesovolumetricoNPUPS <= 5){
            costUPS_saver = 25.91
        } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 7){
            costUPS_saver = 30.63
        } else if(pesovolumetricoNPUPS > 7 && pesovolumetricoNPUPS <= 8){
            costUPS_saver = 33.02
        } else if(pesovolumetricoNPUPS > 8 && pesovolumetricoNPUPS <= 9){
            costUPS_saver = 35.41
        } else if(pesovolumetricoNPUPS > 9 && pesovolumetricoNPUPS <= 10){
            costUPS_saver = 37.80
        } else if(pesovolumetricoNPUPS > 10 && pesovolumetricoNPUPS <= 12){
            costUPS_saver = 41.88
        } else if(pesovolumetricoNPUPS > 12 && pesovolumetricoNPUPS <= 15){
            costUPS_saver = 48.09
        } else if(pesovolumetricoNPUPS > 15 && pesovolumetricoNPUPS <= 18){
            costUPS_saver = 54.26
        } else if(pesovolumetricoNPUPS > 18 && pesovolumetricoNPUPS <= 20){
            costUPS_saver = 58.39
        } else if(pesovolumetricoNPUPS > 20 && pesovolumetricoNPUPS <= 24){
            costUPS_saver = 65.65
        } else if(pesovolumetricoNPUPS > 24 && pesovolumetricoNPUPS <= 30){
            costUPS_saver = 76.04
        } else if(pesovolumetricoNPUPS > 30 && pesovolumetricoNPUPS <= 35){
            costUPS_saver = 83.10
        } else if(pesovolumetricoNPUPS > 35 && pesovolumetricoNPUPS <= 40){
            costUPS_saver = 90.15
        } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 45){
            costUPS_saver = 97.22
        } else if(pesovolumetricoNPUPS > 45 && pesovolumetricoNPUPS <= 50){
            costUPS_saver = 104.28
        } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 55){
            costUPS_saver = 111.35
        } else if(pesovolumetricoNPUPS > 55 && pesovolumetricoNPUPS <= 60){
            costUPS_saver = 118.40
        } else if(pesovolumetricoNPUPS > 60 && pesovolumetricoNPUPS <= 65){
            costUPS_saver = 125.46
        } else if(pesovolumetricoNPUPS > 65 && pesovolumetricoNPUPS <= 70){
            costUPS_saver = 132.53
        } else if(pesovolumetricoNPUPS > 70){
            costUPS_saver = Math.floor(pesovolumetricoNPUPS)*1.89
        }
    } */
    if(areaUPSsaver == 5){
        if(pesovolumetricoNPUPS <= 1){
            costUPS_saver = 19.94
        } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 2){
            costUPS_saver = 20.28
        } else if(pesovolumetricoNPUPS > 2 && pesovolumetricoNPUPS <= 3){
            costUPS_saver = 24.26
        } else if(pesovolumetricoNPUPS > 3 && pesovolumetricoNPUPS <= 4){
            costUPS_saver = 28.32
        } else if(pesovolumetricoNPUPS > 4 && pesovolumetricoNPUPS <= 5){
            costUPS_saver = 32.39
        } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 7){
            costUPS_saver = 38.29
        } else if(pesovolumetricoNPUPS > 7 && pesovolumetricoNPUPS <= 8){
            costUPS_saver = 41.28
        } else if(pesovolumetricoNPUPS > 8 && pesovolumetricoNPUPS <= 9){
            costUPS_saver = 44.26
        } else if(pesovolumetricoNPUPS > 9 && pesovolumetricoNPUPS <= 10){
            costUPS_saver = 47.25
        } else if(pesovolumetricoNPUPS > 10 && pesovolumetricoNPUPS <= 12){
            costUPS_saver = 52.35
        } else if(pesovolumetricoNPUPS > 12 && pesovolumetricoNPUPS <= 15){
            costUPS_saver = 60.11
        } else if(pesovolumetricoNPUPS > 15 && pesovolumetricoNPUPS <= 18){
            costUPS_saver = 67.83
        } else if(pesovolumetricoNPUPS > 18 && pesovolumetricoNPUPS <= 20){
            costUPS_saver = 73
        } else if(pesovolumetricoNPUPS > 20 && pesovolumetricoNPUPS <= 24){
            costUPS_saver = 82.06
        } else if(pesovolumetricoNPUPS > 24 && pesovolumetricoNPUPS <= 30){
            costUPS_saver = 95.05
        } else if(pesovolumetricoNPUPS > 30 && pesovolumetricoNPUPS <= 35){
            costUPS_saver = 103.87
        } else if(pesovolumetricoNPUPS > 35 && pesovolumetricoNPUPS <= 40){
            costUPS_saver = 112.69
        } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 45){
            costUPS_saver = 121.52
        } else if(pesovolumetricoNPUPS > 45 && pesovolumetricoNPUPS <= 50){
            costUPS_saver = 130.35
        } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 55){
            costUPS_saver = 139.19
        } else if(pesovolumetricoNPUPS > 55 && pesovolumetricoNPUPS <= 60){
            costUPS_saver = 148
        } else if(pesovolumetricoNPUPS > 60 && pesovolumetricoNPUPS <= 65){
            costUPS_saver = 156.82
        } else if(pesovolumetricoNPUPS > 65 && pesovolumetricoNPUPS <= 70){
            costUPS_saver = 165.66
        } else if(pesovolumetricoNPUPS > 70){
            costUPS_saver = Math.floor(pesovolumetricoNPUPS)*2.37
        }
    }
    if(areaUPSsaver == 6){
        if(pesovolumetricoNPUPS <= 1){
            costUPS_saver = 41.22
        } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 2){
            costUPS_saver = 49.20
        } else if(pesovolumetricoNPUPS > 2 && pesovolumetricoNPUPS <= 3){
            costUPS_saver = 57.79
        } else if(pesovolumetricoNPUPS > 3 && pesovolumetricoNPUPS <= 4){
            costUPS_saver = 65.90
        } else if(pesovolumetricoNPUPS > 4 && pesovolumetricoNPUPS <= 5){
            costUPS_saver = 73.95
        } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 7){
            costUPS_saver = 90.13
        } else if(pesovolumetricoNPUPS > 7 && pesovolumetricoNPUPS <= 8){
            costUPS_saver = 98.22
        } else if(pesovolumetricoNPUPS > 8 && pesovolumetricoNPUPS <= 9){
            costUPS_saver = 106.29
        } else if(pesovolumetricoNPUPS > 9 && pesovolumetricoNPUPS <= 10){
            costUPS_saver = 114.39
        } else if(pesovolumetricoNPUPS > 10 && pesovolumetricoNPUPS <= 12){
            costUPS_saver = 128.74
        } else if(pesovolumetricoNPUPS > 12 && pesovolumetricoNPUPS <= 15){
            costUPS_saver = 150.48
        } else if(pesovolumetricoNPUPS > 15 && pesovolumetricoNPUPS <= 18){
            costUPS_saver = 172.24
        } else if(pesovolumetricoNPUPS > 18 && pesovolumetricoNPUPS <= 20){
            costUPS_saver = 186.76
        } else if(pesovolumetricoNPUPS > 20 && pesovolumetricoNPUPS <= 24){
            costUPS_saver = 216.96
        } else if(pesovolumetricoNPUPS > 24 && pesovolumetricoNPUPS <= 30){
            costUPS_saver = 260.87
        } else if(pesovolumetricoNPUPS > 30 && pesovolumetricoNPUPS <= 35){
            costUPS_saver = 291.98
        } else if(pesovolumetricoNPUPS > 35 && pesovolumetricoNPUPS <= 40){
            costUPS_saver = 323.08
        } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 45){
            costUPS_saver = 354.18
        } else if(pesovolumetricoNPUPS > 45 && pesovolumetricoNPUPS <= 50){
            costUPS_saver = 385.27
        } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 55){
            costUPS_saver = 416.36
        } else if(pesovolumetricoNPUPS > 55 && pesovolumetricoNPUPS <= 60){
            costUPS_saver = 447.47
        } else if(pesovolumetricoNPUPS > 60 && pesovolumetricoNPUPS <= 65){
            costUPS_saver = 478.57
        } else if(pesovolumetricoNPUPS > 65 && pesovolumetricoNPUPS <= 70){
            costUPS_saver = 509.66
        } else if(pesovolumetricoNPUPS > 70){
            costUPS_saver = Math.floor(pesovolumetricoNPUPS)*7.28
        }
    }
    if(areaUPSsaver == 8){
        if(pesovolumetricoNPUPS <= 1){
            costUPS_saver = 19.94
        } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 2){
            costUPS_saver = 23.84
        } else if(pesovolumetricoNPUPS > 2 && pesovolumetricoNPUPS <= 3){
            costUPS_saver = 28.77
        } else if(pesovolumetricoNPUPS > 3 && pesovolumetricoNPUPS <= 4){
            costUPS_saver = 33.57
        } else if(pesovolumetricoNPUPS > 4 && pesovolumetricoNPUPS <= 5){
            costUPS_saver = 38.39
        } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 7){
            costUPS_saver = 47.00
        } else if(pesovolumetricoNPUPS > 7 && pesovolumetricoNPUPS <= 8){
            costUPS_saver = 51.29
        } else if(pesovolumetricoNPUPS > 8 && pesovolumetricoNPUPS <= 9){
            costUPS_saver = 55.56
        } else if(pesovolumetricoNPUPS > 9 && pesovolumetricoNPUPS <= 10){
            costUPS_saver = 59.90
        } else if(pesovolumetricoNPUPS > 10 && pesovolumetricoNPUPS <= 12){
            costUPS_saver = 68.89
        } else if(pesovolumetricoNPUPS > 12 && pesovolumetricoNPUPS <= 15){
            costUPS_saver = 82.18
        } else if(pesovolumetricoNPUPS > 15 && pesovolumetricoNPUPS <= 18){
            costUPS_saver = 95.47
        } else if(pesovolumetricoNPUPS > 18 && pesovolumetricoNPUPS <= 20){
            costUPS_saver = 104.31
        } else if(pesovolumetricoNPUPS > 20 && pesovolumetricoNPUPS <= 24){
            costUPS_saver = 122.24
        } else if(pesovolumetricoNPUPS > 24 && pesovolumetricoNPUPS <= 30){
            costUPS_saver = 148.38
        } else if(pesovolumetricoNPUPS > 30 && pesovolumetricoNPUPS <= 35){
            costUPS_saver = 168.01
        } else if(pesovolumetricoNPUPS > 35 && pesovolumetricoNPUPS <= 40){
            costUPS_saver = 187.33
        } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 45){
            costUPS_saver = 206.63
        } else if(pesovolumetricoNPUPS > 45 && pesovolumetricoNPUPS <= 50){
            costUPS_saver = 225.93
        } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 55){
            costUPS_saver = 245.21
        } else if(pesovolumetricoNPUPS > 55 && pesovolumetricoNPUPS <= 60){
            costUPS_saver = 264.55
        } else if(pesovolumetricoNPUPS > 60 && pesovolumetricoNPUPS <= 65){
            costUPS_saver = 283.84
        } else if(pesovolumetricoNPUPS > 65 && pesovolumetricoNPUPS <= 70){
            costUPS_saver = 303.16
        } else if(pesovolumetricoNPUPS > 70){
            costUPS_saver = Math.floor(pesovolumetricoNPUPS)*4.33
        }
    }
    if(areaUPSsaver == 9){
        if(pesovolumetricoNPUPS <= 1){
            costUPS_saver = 32.42
        } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 2){
            costUPS_saver = 40.92
        } else if(pesovolumetricoNPUPS > 2 && pesovolumetricoNPUPS <= 3){
            costUPS_saver = 50.02
        } else if(pesovolumetricoNPUPS > 3 && pesovolumetricoNPUPS <= 4){
            costUPS_saver = 58.64
        } else if(pesovolumetricoNPUPS > 4 && pesovolumetricoNPUPS <= 5){
            costUPS_saver = 66.63
        } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 7){
            costUPS_saver = 79.85
        } else if(pesovolumetricoNPUPS > 7 && pesovolumetricoNPUPS <= 8){
            costUPS_saver = 87.74
        } else if(pesovolumetricoNPUPS > 8 && pesovolumetricoNPUPS <= 9){
            costUPS_saver = 95.60
        } else if(pesovolumetricoNPUPS > 9 && pesovolumetricoNPUPS <= 10){
            costUPS_saver = 103.48
        } else if(pesovolumetricoNPUPS > 10 && pesovolumetricoNPUPS <= 12){
            costUPS_saver = 115.21
        } else if(pesovolumetricoNPUPS > 12 && pesovolumetricoNPUPS <= 15){
            costUPS_saver = 132.74
        } else if(pesovolumetricoNPUPS > 15 && pesovolumetricoNPUPS <= 18){
            costUPS_saver = 150.23
        } else if(pesovolumetricoNPUPS > 18 && pesovolumetricoNPUPS <= 20){
            costUPS_saver = 161.91
        } else if(pesovolumetricoNPUPS > 20 && pesovolumetricoNPUPS <= 24){
            costUPS_saver = 185.28
        } else if(pesovolumetricoNPUPS > 24 && pesovolumetricoNPUPS <= 30){
            costUPS_saver = 219.15
        } else if(pesovolumetricoNPUPS > 30 && pesovolumetricoNPUPS <= 35){
            costUPS_saver = 247.71
        } else if(pesovolumetricoNPUPS > 35 && pesovolumetricoNPUPS <= 40){
            costUPS_saver = 274.57
        } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 45){
            costUPS_saver = 301.47
        } else if(pesovolumetricoNPUPS > 45 && pesovolumetricoNPUPS <= 50){
            costUPS_saver = 328.30
        } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 55){
            costUPS_saver = 355.19
        } else if(pesovolumetricoNPUPS > 55 && pesovolumetricoNPUPS <= 60){
            costUPS_saver = 382.08
        } else if(pesovolumetricoNPUPS > 60 && pesovolumetricoNPUPS <= 65){
            costUPS_saver = 408.94
        } else if(pesovolumetricoNPUPS > 65 && pesovolumetricoNPUPS <= 70){
            costUPS_saver = 435.79
        } else if(pesovolumetricoNPUPS > 70){
            costUPS_saver = Math.floor(pesovolumetricoNPUPS)*6.22
        }
    }
    if(areaUPSsaver == 10){
        if(pesovolumetricoNPUPS <= 1){
            costUPS_saver = 35.39
        } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 2){
            costUPS_saver = 44.09
        } else if(pesovolumetricoNPUPS > 2 && pesovolumetricoNPUPS <= 3){
            costUPS_saver = 53.29
        } else if(pesovolumetricoNPUPS > 3 && pesovolumetricoNPUPS <= 4){
            costUPS_saver = 62.09
        } else if(pesovolumetricoNPUPS > 4 && pesovolumetricoNPUPS <= 5){
            costUPS_saver = 70.90
        } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 7){
            costUPS_saver = 84.15
        } else if(pesovolumetricoNPUPS > 7 && pesovolumetricoNPUPS <= 8){
            costUPS_saver = 92.50
        } else if(pesovolumetricoNPUPS > 8 && pesovolumetricoNPUPS <= 9){
            costUPS_saver = 100.88
        } else if(pesovolumetricoNPUPS > 9 && pesovolumetricoNPUPS <= 10){
            costUPS_saver = 109.22
        } else if(pesovolumetricoNPUPS > 10 && pesovolumetricoNPUPS <= 12){
            costUPS_saver = 120.88
        } else if(pesovolumetricoNPUPS > 12 && pesovolumetricoNPUPS <= 15){
            costUPS_saver = 138.29
        } else if(pesovolumetricoNPUPS > 15 && pesovolumetricoNPUPS <= 18){
            costUPS_saver = 155.64
        } else if(pesovolumetricoNPUPS > 18 && pesovolumetricoNPUPS <= 20){
            costUPS_saver = 167.27
        } else if(pesovolumetricoNPUPS > 20 && pesovolumetricoNPUPS <= 24){
            costUPS_saver = 191.41
        } else if(pesovolumetricoNPUPS > 24 && pesovolumetricoNPUPS <= 30){
            costUPS_saver = 226.28
        } else if(pesovolumetricoNPUPS > 30 && pesovolumetricoNPUPS <= 35){
            costUPS_saver = 253.57
        } else if(pesovolumetricoNPUPS > 35 && pesovolumetricoNPUPS <= 40){
            costUPS_saver = 280.87
        } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 45){
            costUPS_saver = 308.19
        } else if(pesovolumetricoNPUPS > 45 && pesovolumetricoNPUPS <= 50){
            costUPS_saver = 342.17
        } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 55){
            costUPS_saver = 369.45
        } else if(pesovolumetricoNPUPS > 55 && pesovolumetricoNPUPS <= 60){
            costUPS_saver = 396.75
        } else if(pesovolumetricoNPUPS > 60 && pesovolumetricoNPUPS <= 65){
            costUPS_saver = 424.08
        } else if(pesovolumetricoNPUPS > 65 && pesovolumetricoNPUPS <= 70){
            costUPS_saver = 451.38
        } else if(pesovolumetricoNPUPS > 70){
            costUPS_saver = Math.floor(pesovolumetricoNPUPS)*6.45
        }
    }
    if(areaUPSsaver == 11){
        if(pesovolumetricoNPUPS <= 1){
            costUPS_saver = 41.77
        } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 2){
            costUPS_saver = 50.66
        } else if(pesovolumetricoNPUPS > 2 && pesovolumetricoNPUPS <= 3){
            costUPS_saver = 60.13
        } else if(pesovolumetricoNPUPS > 3 && pesovolumetricoNPUPS <= 4){
            costUPS_saver = 69.08
        } else if(pesovolumetricoNPUPS > 4 && pesovolumetricoNPUPS <= 5){
            costUPS_saver = 78.06
        } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 7){
            costUPS_saver = 96.01
        } else if(pesovolumetricoNPUPS > 7 && pesovolumetricoNPUPS <= 8){
            costUPS_saver = 105
        } else if(pesovolumetricoNPUPS > 8 && pesovolumetricoNPUPS <= 9){
            costUPS_saver = 113.95
        } else if(pesovolumetricoNPUPS > 9 && pesovolumetricoNPUPS <= 10){
            costUPS_saver = 122.95
        } else if(pesovolumetricoNPUPS > 10 && pesovolumetricoNPUPS <= 12){
            costUPS_saver = 136.96
        } else if(pesovolumetricoNPUPS > 12 && pesovolumetricoNPUPS <= 15){
            costUPS_saver = 158.33
        } else if(pesovolumetricoNPUPS > 15 && pesovolumetricoNPUPS <= 18){
            costUPS_saver = 179.68
        } else if(pesovolumetricoNPUPS > 18 && pesovolumetricoNPUPS <= 20){
            costUPS_saver = 193.93
        } else if(pesovolumetricoNPUPS > 20 && pesovolumetricoNPUPS <= 24){
            costUPS_saver = 222.46
        } else if(pesovolumetricoNPUPS > 24 && pesovolumetricoNPUPS <= 30){
            costUPS_saver = 263.86
        } else if(pesovolumetricoNPUPS > 30 && pesovolumetricoNPUPS <= 35){
            costUPS_saver = 291.94
        } else if(pesovolumetricoNPUPS > 35 && pesovolumetricoNPUPS <= 40){
            costUPS_saver = 320.46
        } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 45){
            costUPS_saver = 348.97
        } else if(pesovolumetricoNPUPS > 45 && pesovolumetricoNPUPS <= 50){
            costUPS_saver = 377.51
        } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 55){
            costUPS_saver = 406.03
        } else if(pesovolumetricoNPUPS > 55 && pesovolumetricoNPUPS <= 60){
            costUPS_saver = 434.54
        } else if(pesovolumetricoNPUPS > 60 && pesovolumetricoNPUPS <= 65){
            costUPS_saver = 463.08
        } else if(pesovolumetricoNPUPS > 65 && pesovolumetricoNPUPS <= 70){
            costUPS_saver = 491.59
        } else if(pesovolumetricoNPUPS > 70){
            costUPS_saver = Math.floor(pesovolumetricoNPUPS)*7.02
        }
    }
    if(areaUPSsaver == 12){
        if(pesovolumetricoNPUPS <= 1){
            costUPS_saver = 21.11
        } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 2){
            costUPS_saver = 27.17
        } else if(pesovolumetricoNPUPS > 2 && pesovolumetricoNPUPS <= 3){
            costUPS_saver = 32.91
        } else if(pesovolumetricoNPUPS > 3 && pesovolumetricoNPUPS <= 4){
            costUPS_saver = 37.83
        } else if(pesovolumetricoNPUPS > 4 && pesovolumetricoNPUPS <= 5){
            costUPS_saver = 42.76
        } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 7){
            costUPS_saver = 51.22
        } else if(pesovolumetricoNPUPS > 7 && pesovolumetricoNPUPS <= 8){
            costUPS_saver = 55.50
        } else if(pesovolumetricoNPUPS > 8 && pesovolumetricoNPUPS <= 9){
            costUPS_saver = 59.72
        } else if(pesovolumetricoNPUPS > 9 && pesovolumetricoNPUPS <= 10){
            costUPS_saver = 63.98
        } else if(pesovolumetricoNPUPS > 10 && pesovolumetricoNPUPS <= 12){
            costUPS_saver = 69.89
        } else if(pesovolumetricoNPUPS > 12 && pesovolumetricoNPUPS <= 15){
            costUPS_saver = 78.75
        } else if(pesovolumetricoNPUPS > 15 && pesovolumetricoNPUPS <= 18){
            costUPS_saver = 87.63
        } else if(pesovolumetricoNPUPS > 18 && pesovolumetricoNPUPS <= 20){
            costUPS_saver = 93.52
        } else if(pesovolumetricoNPUPS > 20 && pesovolumetricoNPUPS <= 24){
            costUPS_saver = 105.97
        } else if(pesovolumetricoNPUPS > 24 && pesovolumetricoNPUPS <= 30){
            costUPS_saver = 123.99
        } else if(pesovolumetricoNPUPS > 30 && pesovolumetricoNPUPS <= 35){
            costUPS_saver = 135.38
        } else if(pesovolumetricoNPUPS > 35 && pesovolumetricoNPUPS <= 40){
            costUPS_saver = 146.75
        } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 45){
            costUPS_saver = 158.12
        } else if(pesovolumetricoNPUPS > 45 && pesovolumetricoNPUPS <= 50){
            costUPS_saver = 169.54
        } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 55){
            costUPS_saver = 180.88
        } else if(pesovolumetricoNPUPS > 55 && pesovolumetricoNPUPS <= 60){
            costUPS_saver = 192.26
        } else if(pesovolumetricoNPUPS > 60 && pesovolumetricoNPUPS <= 65){
            costUPS_saver = 203.63
        } else if(pesovolumetricoNPUPS > 65 && pesovolumetricoNPUPS <= 70){
            costUPS_saver = 215.03
        } else if(pesovolumetricoNPUPS > 70){
            costUPS_saver = Math.floor(pesovolumetricoNPUPS)*3.07
        }
    }
}

// UPS standard cost
        // takes UPS Area number and volumetric weight
        // returns the ups express cost
        function calcolo_costo_UPS_standard(areaUPSstandard, pesovolumetricoNPUPS){
            if(areaUPSstandard == 1){
                if(pesovolumetricoNPUPS <= 1){
                    costUPS_standard = 8.07
                } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 5){
                    costUPS_standard = 8.66
                } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 10){
                    costUPS_standard = 9.15
                } else if(pesovolumetricoNPUPS > 10 && pesovolumetricoNPUPS <= 20){
                    costUPS_standard = 10.28
                } else if(pesovolumetricoNPUPS > 20 && pesovolumetricoNPUPS <= 30){
                    costUPS_standard = 13.22
                } else if(pesovolumetricoNPUPS > 30 && pesovolumetricoNPUPS <= 40){
                    costUPS_standard = 16.06
                } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 50){
                    costUPS_standard = 18.89
                } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 70){
                    costUPS_standard = 25.62
                } else if(pesovolumetricoNPUPS > 70){
                    costUPS_standard = Math.floor(pesovolumetricoNPUPS)*0
                }
            }    
            if(areaUPSstandard == 2){
                if(pesovolumetricoNPUPS <= 1){
                    costUPS_standard = 10.18
                } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 5){
                    costUPS_standard = 11.18
                } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 10){
                    costUPS_standard = 12.47
                } else if(pesovolumetricoNPUPS > 10 && pesovolumetricoNPUPS <= 20){
                    costUPS_standard = 14.89
                } else if(pesovolumetricoNPUPS > 20 && pesovolumetricoNPUPS <= 30){
                    costUPS_standard = 20.28
                } else if(pesovolumetricoNPUPS > 30 && pesovolumetricoNPUPS <= 40){
                    costUPS_standard = 25.65
                } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 50){
                    costUPS_standard = 30.99
                } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 70){
                    costUPS_standard = 40.37
                } else if(pesovolumetricoNPUPS > 70){
                    costUPS_standard = Math.floor(pesovolumetricoNPUPS)*0
                }
            }                
            if(areaUPSstandard == 3){
                if(pesovolumetricoNPUPS <= 1){
                    costUPS_standard = 8.95
                } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 5){
                    costUPS_standard = 12.97
                } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 10){
                    costUPS_standard = 19.24
                } else if(pesovolumetricoNPUPS > 10 && pesovolumetricoNPUPS <= 20){
                    costUPS_standard = 20.11
                } else if(pesovolumetricoNPUPS > 20 && pesovolumetricoNPUPS <= 30){
                    costUPS_standard = 21.33
                } else if(pesovolumetricoNPUPS > 30 && pesovolumetricoNPUPS <= 40){
                    costUPS_standard = 22
                } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 50){
                    costUPS_standard = 25
                } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 70){
                    costUPS_standard = 28.01
                } else if(pesovolumetricoNPUPS > 70){
                    costUPS_standard = Math.floor(pesovolumetricoNPUPS)*0
                }
            } 
            if(areaUPSstandard == 4){
                if(pesovolumetricoNPUPS <= 1){
                    costUPS_standard = 8.95
                } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 5){
                    costUPS_standard = 13.30
                } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 10){
                    costUPS_standard = 19.76
                } else if(pesovolumetricoNPUPS > 10 && pesovolumetricoNPUPS <= 20){
                    costUPS_standard = 20.92
                } else if(pesovolumetricoNPUPS > 20 && pesovolumetricoNPUPS <= 30){
                    costUPS_standard = 22.58
                } else if(pesovolumetricoNPUPS > 30 && pesovolumetricoNPUPS <= 40){
                    costUPS_standard = 23.48
                } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 50){
                    costUPS_standard = 26.41
                } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 70){
                    costUPS_standard = 31.60
                } else if(pesovolumetricoNPUPS > 70){
                    costUPS_standard = Math.floor(pesovolumetricoNPUPS)*0
                }
            } 
            if(areaUPSstandard == 5){
                if(pesovolumetricoNPUPS <= 1){
                    costUPS_standard = 8.98
                } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 5){
                    costUPS_standard = 13.81
                } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 10){
                    costUPS_standard = 20.34
                } else if(pesovolumetricoNPUPS > 10 && pesovolumetricoNPUPS <= 20){
                    costUPS_standard = 21.64
                } else if(pesovolumetricoNPUPS > 20 && pesovolumetricoNPUPS <= 30){
                    costUPS_standard = 23.56
                } else if(pesovolumetricoNPUPS > 30 && pesovolumetricoNPUPS <= 40){
                    costUPS_standard = 24.61
                } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 50){
                    costUPS_standard = 27.58
                } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 70){
                    costUPS_standard = 32.72
                } else if(pesovolumetricoNPUPS > 70){
                    costUPS_standard = Math.floor(pesovolumetricoNPUPS)*0
                }
            } 
            if(areaUPSstandard == 51){
                if(pesovolumetricoNPUPS <= 1){
                    costUPS_standard = 8.98
                } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 5){
                    costUPS_standard = 14.08
                } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 10){
                    costUPS_standard = 20.79
                } else if(pesovolumetricoNPUPS > 10 && pesovolumetricoNPUPS <= 20){
                    costUPS_standard = 24.16
                } else if(pesovolumetricoNPUPS > 20 && pesovolumetricoNPUPS <= 30){
                    costUPS_standard = 27.35
                } else if(pesovolumetricoNPUPS > 30 && pesovolumetricoNPUPS <= 40){
                    costUPS_standard = 29.50
                } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 50){
                    costUPS_standard = 32.02
                } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 70){
                    costUPS_standard = 37.91
                } else if(pesovolumetricoNPUPS > 70){
                    costUPS_standard = Math.floor(pesovolumetricoNPUPS)*0
                }
            }  
            if(areaUPSstandard == 52){
                if(pesovolumetricoNPUPS <= 1){
                    costUPS_standard = 10.23
                } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 5){
                    costUPS_standard = 26.38
                } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 10){
                    costUPS_standard = 43.32
                } else if(pesovolumetricoNPUPS > 10 && pesovolumetricoNPUPS <= 20){
                    costUPS_standard = 48.66
                } else if(pesovolumetricoNPUPS > 20 && pesovolumetricoNPUPS <= 30){
                    costUPS_standard = 55.60
                } else if(pesovolumetricoNPUPS > 30 && pesovolumetricoNPUPS <= 40){
                    costUPS_standard = 61.16
                } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 50){
                    costUPS_standard = 66.74
                } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 70){
                    costUPS_standard = 80.02
                } else if(pesovolumetricoNPUPS > 70){
                    costUPS_standard = Math.floor(pesovolumetricoNPUPS)*0
                }
            }  
            if(areaUPSstandard == 6){
                if(pesovolumetricoNPUPS <= 1){
                    costUPS_standard = 14.98
                } else if(pesovolumetricoNPUPS > 1 && pesovolumetricoNPUPS <= 5){
                    costUPS_standard = 25.91
                } else if(pesovolumetricoNPUPS > 5 && pesovolumetricoNPUPS <= 10){
                    costUPS_standard = 37.85
                } else if(pesovolumetricoNPUPS > 10 && pesovolumetricoNPUPS <= 20){
                    costUPS_standard = 45.56
                } else if(pesovolumetricoNPUPS > 20 && pesovolumetricoNPUPS <= 30){
                    costUPS_standard = 52.14
                } else if(pesovolumetricoNPUPS > 30 && pesovolumetricoNPUPS <= 40){
                    costUPS_standard = 56.87
                } else if(pesovolumetricoNPUPS > 40 && pesovolumetricoNPUPS <= 50){
                    costUPS_standard = 61.54
                } else if(pesovolumetricoNPUPS > 50 && pesovolumetricoNPUPS <= 70){
                    costUPS_standard = 71.90
                } else if(pesovolumetricoNPUPS > 70){
                    costUPS_standard = Math.floor(pesovolumetricoNPUPS)*0
                }
            }            
            
            
// manca corea del nord, cuba, iran, palestina, siria, somalia
// attenzione repubblica ceca, repubblica centrafrican, inghilterra, st.vincent, nevis
// aggiungi ceuta, cisgiordania, curacao, repubblica dominicana, franciaCap e franciaAltro
// galles, gambia, germaniaCap e germaniaAltro, gibilterra, groenlandia, guadalupa, guam
// guyanaFrancese, hongKong, irlandaDelNord, isoleCanarie, isoleCayman, italiaNoIsoleCalabria,
// italiaIsoleCalabria, kiribati, kosovo, kosrae, kuwait, macau, madera, martinica, montserrat
// mayotte, melilla, nuovaCaledonia, polinesiaFrancese, puertoRico, sriLanka, sudan, sudanDelSud


/// SDA
// In italia é a*l*p/3333, 
//      Calabria, Sardegna, Sicilia supplemento ---
// All'estero
//      Pacco standard: 31,5kg, lunghezza+perimetro < 330cm, lato piú lungo < 200cm
//      Se si supera peso o dimensione, +8e per ogni collo eccedente
//      Eccezioni: Repubblica di Irlanda, Irlanda del Nord, Danimarca, Estonia, Lettonia, Lituania, Svezia, Finlandia, Novergia, Corsica, Azzorre, Madeira, Andorra, Isole Canarie, Ceuta, Melilla
//      Ogni collo eccedente aumento tariffa pallet (specifica)
//      Se si supera, a prescindere, 70kg o lunghezza+perimetro > 450, prezzo a pallet
//      Oltre i 31,5kg, a*l*p5000
        }
