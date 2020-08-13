// Init and event listener
let submit = document.getElementById("submit");
submit.addEventListener("click", submitted);

let peso = document.getElementById('peso').value
let pesoVolumetricoSDA = 0
let pesoVolumetricoTNT = 0
let pesoVolumetricoNP = 0
function submitted(){
    let altezza = document.getElementById('altezza').value
    let lunghezza = document.getElementById('lunghezza').value
    let larghezza = document.getElementById('larghezza').value
    peso = document.getElementById('peso').value
    pesoVolumetricoSDA = altezza*lunghezza*larghezza/3333
    pesoVolumetricoTNT = altezza/100*lunghezza/100*larghezza/100*250
    pesoVolumetricoNP = altezza*lunghezza*larghezza/5000
    console.log("Il peso SDA é: " + pesoVolumetricoSDA + " Il peso TNT é: " + pesoVolumetricoTNT + " Il peso NP é: " + pesoVolumetricoNP);
    peso_volume()
    calcolo_prezzi()
}

let pesoSDA = 0
let pesoTNT = 0
let pesoNP = 0

function peso_volume(){
    // SDA
    if (peso > pesoVolumetricoSDA){
        pesoSDA = peso;
    } else {
        pesoSDA = pesoVolumetricoSDA;
    }

    // TNT
    if (peso > pesoVolumetricoTNT){
        pesoTNT = peso;
    } else {
        pesoTNT = pesoVolumetricoTNT;
    }
    console.log("PesoVolume ok")
    
    // NUOVA POSTA
    if (peso > pesoVolumetricoNP){
        pesoNP = peso;
    } else {
        pesoNP = pesoVolumetricoNP;
    }
}

let costSDA = 0
let costTNT = 0
let costNP = 0
function calcolo_prezzi(){
    // SDA
    if(pesoSDA <= 2){
        costSDA = 8.50
    } else if(pesoSDA > 2 && pesoSDA <= 5){
        costSDA = 9.50
    } else if(pesoSDA > 5 && pesoSDA <= 10){
        costSDA = 12.50
    } else if(pesoSDA > 10 && pesoSDA <= 20){
        costSDA = 15
    } else if(pesoSDA > 20 && pesoSDA <= 30){
        costSDA = 18
    } else if(pesoSDA > 30 && pesoSDA <= 50){
        costSDA = 28
    } else if(pesoSDA > 50 && pesoSDA <= 70){
        costSDA = 38
    } else if(pesoSDA > 70 && pesoSDA <= 100){
        costSDA = 48
    }
    console.log("Costo SDA: " + costSDA)
    // TNT
    if(pesoTNT <= 1){
        costTNT = 9.50
    } else if(pesoTNT > 1 && pesoTNT <= 3){
        costTNT = 10.50
    } else if(pesoTNT > 3 && pesoTNT <= 5){
        costTNT = 12
    } else if(pesoTNT > 5 && pesoTNT <= 10){
        costTNT = 15
    } else if(pesoTNT > 10 && pesoTNT <= 20){
        costTNT = 18
    } else if(pesoTNT > 20 && pesoTNT <= 30){
        costTNT = 20
    } else if(pesoTNT > 30 && pesoTNT <= 40){
        costTNT = 25
    } else if(pesoTNT > 40 && pesoTNT <= 50){
        costTNT = 28
    } else if(pesoTNT > 50 && pesoTNT <= 70){
        costTNT = 38
    } else if(pesoTNT > 70 && pesoTNT <= 100){
        costTNT = 48
    } else if(pesoTNT > 100 && pesoTNT <= 125){
        costTNT = 55
    } else if(pesoTNT > 125 && pesoTNT <= 150){
        costTNT = 65
    }
    console.log("Costo TNT: " + costTNT)
    // NUOVA POSTA
    if(pesoNP <= 5){
        costNP = 10
    } else if(pesoNP > 5 && pesoNP <= 20){
        costNP = 16
    } else if(pesoNP > 20 && pesoNP <= 30){
        costNP = 20
    } else if(pesoNP > 30 && pesoNP <= 50){
        costNP = 33
    } else if(pesoNP > 50 && pesoNP <= 75){
        costNP = 43
    } else if(pesoNP > 75 && pesoNP <= 100){
        costNP = 55
    }
    console.log("Costo NP: " + costNP)
}