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
let costGLSPersonal = 0
let costSDAPersonal = 0
let costTNTPersonal = 0
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
    // SDA Personal
    if(pesoSDA <= 2){
        costSDAPersonal = 6.30
    } else if(pesoSDA > 2 && pesoSDA <= 5){
        costSDAPersonal = 7.30
    } else if(pesoSDA > 5 && pesoSDA <= 10){
        costSDAPersonal = 8.60
    } else if(pesoSDA > 10 && pesoSDA <= 20){
        costSDAPersonal = 10.40
    } else if(pesoSDA > 20 && pesoSDA <= 30){
        costSDAPersonal = 12.70
    } else if(pesoSDA > 30 && pesoSDA <= 50){
        costSDAPersonal = 16.50
    } else if(pesoSDA > 50 && pesoSDA <= 70){
        costSDAPersonal = 22.50
    } else if(pesoSDA > 70 && pesoSDA <= 100){
        costSDAPersonal = 30
    }
    console.log("Costo Personal: " + costSDAPersonal)
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
    }
    console.log("Costo TNT Personal: " + costTNTPersonal)
    if(pesoSDA <= 3){
        costGLSPersonal = 6.60
    } else if(pesoSDA > 3 && pesoSDA <= 10){
        costGLSPersonal = 10.44
    } else if(pesoSDA > 10 && pesoSDA <= 30){
        costGLSPersonal = 17
    } else if(pesoSDA > 30 && pesoSDA <= 50){
        costGLSPersonal = 23.50
    } else if(pesoSDA > 50 && pesoSDA <= 75){
        costGLSPersonal = 31.30
    } else if(pesoSDA > 75 && pesoSDA <= 100){
        costGLSPersonal = 36.35
    } else if(pesoSDA > 100){
        costGLSPersonal = Math.floor(pesoSDA/10)*3.70
    } else if(pesoSDA > 70 && pesoSDA <= 100){
        costGLSPersonal = 48
    }
    console.log("Costo GLS Personal: " + costGLSPersonal)

}