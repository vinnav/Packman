// Init and event listener
let submit = document.getElementById("submit");
submit.addEventListener("click", submitted);

let peso = document.getElementById('peso').value
let pesoVolumetricoSDA = 0
let pesoVolumetricoTNT = 0
let pesoVolumetricoNP = 0
let summary = document.getElementById('summary');
document.getElementById("addPack").addEventListener("click", fill_colli)
function submitted(){
    let altezza = document.getElementById('altezza').value
    let lunghezza = document.getElementById('lunghezza').value
    let larghezza = document.getElementById('larghezza').value
    let country = document.getElementById('inputDa').value
    peso = document.getElementById('peso').value
    pesoVolumetricoSDA = altezza*lunghezza*larghezza/3333
    pesoVolumetricoTNT = altezza/100*lunghezza/100*larghezza/100*250
    pesoVolumetricoNP = altezza*lunghezza*larghezza/5000
    console.log("Il peso SDA é: " + pesoVolumetricoSDA + " Il peso TNT é: " + pesoVolumetricoTNT + " Il peso NP é: " + pesoVolumetricoNP);
    console.log("Il paese é: " + country)
    peso_volume()
    calcolo_prezzi()
    document.getElementById("dati").style.visibility = "hidden";
    document.getElementById("priceTable").style.visibility = "visible";
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
        costGLSPersonal = Math.floor(pesoSDA/10)*2.52
    }

    console.log("Costo GLS Personal: " + costGLSPersonal)

}

function fill_colli(){
    let altezza = document.getElementById('altezza').value
    let lunghezza = document.getElementById('lunghezza').value
    let larghezza = document.getElementById('larghezza').value
    let country = document.getElementById('inputDa').value
    let peso = document.getElementById('peso').value
    summary.innerHTML += "<p>Collo " + altezza + "x" + lunghezza + "x" + larghezza + ", peso: " + peso + "</p>"
}
// Foreign deliverie" ffffffffffffffffff"
// Austria
function calcolo_prezzi_andorra(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 66.85
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 71.85
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 80.40
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*2.34
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*7.35
    }        
function calcolo_prezzi_austria(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 10.2
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 15.30
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 22.00
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*0.51
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*2.60
    }
function calcolo_prezzi_azzorre(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 40.80
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 47.90
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 54.80
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*2.34
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*7.35
function calcolo_prezzi_belgio(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 10.2
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 16.50
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 24.00
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*0.56
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*3.05
    }
function calcolo_prezzi_bosnia_e_erzegovina(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 13.85
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 19.25
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 27.35
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*0.55
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*2.98
    }
function calcolo_prezzi_bulgaria(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 13.30
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 20.40
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 27
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*0.55
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*2.60
    }
function calcolo_prezzi_ceuta(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 68.85
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 71.85
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 80.40
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*2.34
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*7.35
function calcolo_prezzi_corsica(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 49
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 53
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 60.06
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*1.12
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*4.10
function calcolo_prezzi_croazia(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 13.85
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 19.25
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 27.35
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*0.55
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*2.98
    }
function calcolo_prezzi_francia(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 11.25
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 15
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 22.40
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*0.51
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*4.10
    }
function calcolo_prezzi_germania(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 10.20
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 14.50
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 21.80
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*0.52
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*2.60
    }
function calcolo_prezzi_gran_bretagna(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 11.25
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 18
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 25
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*0.70
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*3.33
    }
function calcolo_prezzi_irlanda_del_nord(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 31.35
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 35.65
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 43.35
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*0.79
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*8.09
    }
function calcolo_prezzi_irlanda(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 31.35
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 35.65
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 43.35
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*0.65
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*8.09
function calcolo_prezzi_isole_canarie(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 68.85
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 71.85
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 80.40
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*2.34
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*7.35
function calcolo_prezzi_isole_channel(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 11.25
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 18
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 25
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*0.70
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*3.33
function calcolo_prezzi_lussemburgo(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 10.2
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 16
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 24
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*0.55
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*2.98
    }        
function calcolo_prezzi_madeira(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 40.80
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 47.90
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 54.80
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*2.34
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*7.35
function calcolo_prezzi_melilla(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 68.85
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 71.85
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 80.40
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*2.34
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*7.35
function calcolo_prezzi_montenegro(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 14.10
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 19.95
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 28.95
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*0.59
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*2.98
    }        
function calcolo_prezzi_olanda(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 11.25
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 16.20
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 23
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*0.52
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*2.60
    }        
function calcolo_prezzi_polonia(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 13.55
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 20.50
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 29.40
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*0.7
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*1.10
    }        
function calcolo_prezzi_portogallo(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 13.55
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 23.90
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 29.50
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*0.62
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*6.05
    }        
function calcolo_prezzi_repubblica_ceca(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 18.40
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 18.55
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 22.90
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*0.55
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*2.83
    }        
function calcolo_prezzi_romania(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 11.30
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 22.40
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 29.50
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*0.64
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*2.98
    }        
function calcolo_prezzi_serbia(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 13.85
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 19.25
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 27.35
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*0.50
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*2.98
    }        
function calcolo_prezzi_slovacchia(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 13.85
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 18.55
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 22.60
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*0.51
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*2.98
    }        
function calcolo_prezzi_slovenia(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 13.30
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 19
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 26
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*0.55
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*2.61
    }        
function calcolo_prezzi_spagna(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 11.25
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 18.65
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 24.50
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*0.51
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*4.10
    }        
function calcolo_prezzi_svizzera(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 14.95
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 26.5
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 58
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*1.32
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*1.10
    }        
function calcolo_prezzi_lietchtenstein(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 14.95
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 26.5
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 58
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*1.32
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*1.10
    }        
function calcolo_prezzi_ungheria(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 12.45
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 19.25
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 24.45
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*0.51
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*2.98
    }

function calcolo_prezzi_paese(){
    // SDA
    if(pesoSDA <= 5){
        costSDA = 12.45
    } else if(pesoSDA > 5 && pesoSDA <= 15){
        costSDA = 19.25
    } else if(pesoSDA > 15 && pesoSDA <= 31.5){
        costSDA = 24.45
    } else if(pesoSDA > 31.5){
        costSDA = Math.floor(pesoSDA)*0.51
    }
    if(numeroColli > 1){
        costSDA += (numeroColli-1)*2.98
    }


// manca corea del nord, cuba, iran, palestina, siria, somalia
// attenzione repubblica ceca, repubblica centrafrican, inghilterra, st.vincent, nevis
// aggiungi ceuta, cisgiordania, curacao, repubblica dominicana, franciaCap e franciaAltro
// galles, gambia, germaniaCap e germaniaAltro, gibilterra, groenlandia, guadalupa, guam
// guyanaFrancese, hongKong, irlandaDelNord, isoleCanarie, isoleCayman, italiaNoIsoleCalabria,
// italiaIsoleCalabria, kiribati, kosovo, kosrae, kuwait, macau, madera, martinica, montserrat
// mayotte, melilla, nuovaCaledonia, polinesiaFrancese, puertoRico, sriLanka, sudan, sudanDelSud

// UPS AREE GEOGRAFICHE
// [express, saver, standard]
let ups_zone = {"afghanistan":[0,9,0], "albania":[6,6,0], "algeria":[11,11,0],
                "andorra":[5,5,6], "angola":[0,11,0], "anguilla":[0,11,0],
                "antiguaEBarbuda":[0,9,0], "arabiaSaudita":[10,10,0],
                "argentina":[9,9,0], "armenia":[11,11,0], "australia":[9,9,0],
                "austria":[3,3,5], "azerbaigian":[0,11,0], "azzorre":[0,4,0],
                "bahamas":[9,9,0], "bahrein":[9,9,0], "bangladesh":[0,10,0],
                "barbados":[9,9,0], "belgio":[2,2,4], "belize":[0,11,0],
                "benin":[0,11,0], "bhutan":[10,10,0], "bielorussia":[6,6,0],
                "birmania":[10,10,0], "bolivia":[9,9,0], "bosniaEdErzegovina":[6,6,0],
                "botswana":[0,11,0], "brasile":[9,9,0], "brunei":[9,9,0], "bulgaria":[42,42,52],
                "burkinaFaso":[0,11,0], "burundi":[0,11,0], "cambogia":[11,11,0], 
                "camerun":[0,11,0], "canada":[8,8,0], "ceuta":[0,5,0], "ciad":[0,11,0],
                "cile":[9,9,0], "cina":[9,9,0], "cipro":[42,42,0], "cisgiordania":[0,11,0],
                "colombia":[9,9,0], "repDelCongo":[0,11,0], "rdDelCongo":[0,11,0],
                "coreaDelSud":[0,9,0], "costaDAvorio":[0,11,0], "croazia":[41,41,5],
                "curacao":[0,9,0], "danimarca":[4,4,4], "dominica":[0,9,0], 
                "repDominicana":[9,9,0], "ecuador":[9,9,0], "egitto":[9,9,0],
                "elSalvador":[0,10,0], "emiratiArabiUniti":[9,9,0], "eritrea":[0,11,0],
                "estonia":[42,42,52], "etiopia":[0,11,0], "figi":[9,9,0], "filippine":[9,9,0],
                "finlandia":[4,4,5], "franciaCap":[2,2,3], "franciaAltro":[2,2,4],
                "gabon":[0,11,0], "galles":[2,2,4], "gambia":[11,11,0], "georgia":[11,11,0],
                "germaniaCap":[2,2,3], "germaniaAltro":[2,2,4], "ghana":[0,11,0],
                "giamaica":[9,9,0], "giappone":[9,9,0], "gibilterra":[0,6,0], "gibuti":[0,11,0],
                "giordania":[11,11,0], "grecia":[4,4,51], "grenada":[0,9,0], 
                "groenlandia":[0,6,0], "guadalupa":[9,9,0], "guam":[0,9,0], "guatemala":[10,10,0],
                "guinea":[0,11,0], "guineaBissau":[0,11,0], "guineaEquatoriale":[0,11,0],
                "guyana":[0,11,0], "guyanaFrancese":[11,11,0], "haiti":[0,10,0],
                "honduras":[10,10,0], "hongKong":[9,9,0], "india":[9,9,0], "indonesia":[9,9,0],
                "iraq":[0,9,0], "irlanda":[4,4,4], "irlandaDelNord":[0,4,5], "islanda":[6,6,0],
                "isoleCanarie":[0,5,0], "capoverde":[0,11,0], "isoleCayman":[0,9,0],
                "comore":[0,11,0], "isoleSolomone":[11,11,0], "israele":[11,11,0], 
                "italiaNoIsoleCalabria":[1,1,2], "italiaIsoleCalabria":[0,1,2], 
                "kazakistan":[11,11,0], "kenya":[11,11,0], "kiribati":[0,11,0], "kosovo":[6,6,0],
                "kosrae":[0,11,0], "kirghizistan":[11,11,0], "kuwait":[9,9,0], "laos":[11,11,0],
                "lesotho":[0,11,0], "lettonia":[42,42,52], "libano":[11,11,0], "liberia":[0,11,0],
                "libia":[0,11,0], "liechtenstein":[5,5,6], "lituania":[42,42,52], 
                "lussemburgo":[3,3,4], "macau":[10,10,0], "macedoniaDelNord":[6,6,0], 
                "madagascar":[0,11,0], "madera":[0,4,0], "malawi":[11,11,0], "maldive":[10,10,0],
                "malaysia":[9,9,0], "mali":[0,11,0], "malta":[42,42,0], "marocco":[11,11,0],
                "martinica":[0,9,0], "mauritania":[11,11,0], "mauritius":[11,11,0],
                "mayotte":[0,11,0], "melilla":[0,5,0], "messico":[9,9,0], "micronesia":[11,11,00], 
                "moldavia":[6,6,0], "monaco":[2,2,4], "mongolia":[0,10,0], "montenegro":[6,6,0], 
                "montserrat":[0,10,0], "mozambico":[0,11,0], "namibia":[11,11,0], "nepal":[11,11,0],
                "nicaragua":[0,11,0], "niger":[11,11,0], "nigeria":[11,11,0], "norvegia":[5,5,6],
                "nuovaCaledonia":[11,11,0], "nuovaZelanda":[9,9,0], "oman":[10,10,0], 
                "paesiBassi":[3,3,4], "pakistan":[9,9,0], "palau":[0,11,0], "panama":[10,10,0],
                "papuaNuovaGuinea":[11,11,0], "paraguay":[0,10,0], "peru":[10,10,0], 
                "polinesiaFrancese":[0,10,0], "polonia":[41,41,51], "portogallo":[4,4,4],
                "puertoRico":[8,8,0], "qatar":[10,10,0], "regnoUnito":[2,2,4], 
                "repubblicaCeca":[41,41,51], "repubblicaCentrafricana":[0,11,0], 
                "repubblicaDominicana":[9,9,0], "romania":[42,42,52], "ruanda":[0,11,0],
                "russia":[6,6,0], "saintKittsENevis":[9,9,0], "saintVincentEGrenadine":[0,9,0],
                "samoa":[9,9,0], "sanMarino":[0,1,1], "senegal":[11,11,0], "serbia":[6,6,0],
                "seychelles":[0,11,0], "sierraLeone":[0,11,0], "singapore":[9,9,0],
                "slovacchia":[41,41,51], "slovenia":[41,41,5], "spagna":[3,3,4], "sriLanka":[9,9,0],
                "suriname":[11,11,0], "svezia":[4,4,5], "svizzera":[5,5,6], "swaziland":[0,11,0],
                "tagikistan":[0,11,0], "taiwan":[9,9,0], "tanzania":[0,11,0], "thailandia":[9,9,0],
                "timorEst":[0,11,0], "togo":[0,11,0], "tonga":[0,11,0], "trinidadETobago":[9,9,0],
                "tunisia":[11,11,0], "turchia":[12,12,0], "turkmenistan":[0,11,0], "tuvalu":[0,11,0],
                "ucraina":[6,6,0], "uganda":[0,11,0], "ungheria":[41,41,51], "uruguay":[0,10,0],
                "uzbekistan":[0,11,0], "vanuatu":[11,11,0], "venezuela":[0,10,0], 
                "vietnam":[11,11,0], "yemen":[0,11,0], "zambia":[0,11,0], "zimbabwe":[0,11,0]
            }

function calcolo_costo_UPS_express(){
    if(areaUPS == 1){
        if(pesoVolumetricoNP <= 1){
            costUPS_express = 12
        } else if(pesoVolumetricoNP > 1 && pesoVolumetricoNP <= 3){
            costUPS_express = 12.92
        } else if(pesoVolumetricoNP > x && pesoVolumetricoNP <= x){
            costUPS_express = x
        } else if(pesoVolumetricoNP > x && pesoVolumetricoNP <= x){
            costUPS_express = x
        } else if(pesoVolumetricoNP > x && pesoVolumetricoNP <= x){
            costUPS_express = x
        } else if(pesoVolumetricoNP > 70){
            costUPS_express = Math.floor(pesoVolumetricoNP)*0.80
        }
    }
    if(areaUPS == 2){
        if(pesoVolumetricoNP <= x){
            costUPS_express = x
        } else if(pesoVolumetricoNP > x && pesoVolumetricoNP <= x){
            costUPS_express = x
        } else if(pesoVolumetricoNP > x && pesoVolumetricoNP <= x){
            costUPS_express = x
        } else if(pesoVolumetricoNP > x && pesoVolumetricoNP <= x){
            costUPS_express = x
        } else if(pesoVolumetricoNP > 70){
            costUPS_express = Math.floor(pesoVolumetricoNP)*0.80
        }
    }
}














"afghanistan"
"albania"
"algeria"
"andorra"
"angola"
"antiguaEBarbuda"
"arabiaSaudita"
"argentina"
"armenia"
"australia"
"austria"
"azerbaigian"
"bahamas"
"bahrein"
"bangladesh"
"barbados"
"belgio"
"belize"
"benin"
"bhutan"
"bielorussia"
"birmania"
"bolivia"
"bosniaEdErzegovinaegovina"
"botswana"
"brasile"
"brunei"
"bulgaria"
"burkinaFaso"
"burundi"
"cambogia"
"camerun"
"canada"
"capoVerde"
"ciad"
"cile"
"cina"
"cipro"
"colombia"
"comore"
"repDelCongo"
"rdDelCongo"
"coreaDelNord"
"coreaDelSud"
"costaDAvorio"
"croazia"
"cuba"
"danimarca"
"dominica"
"ecuador"
"egitto"
"elSalvador"
"emiratiArabiUniti"
"eritrea"
"estonia"
"etiopia"
"figi"
"filippine"
"finlandia"
"francia"
"gabon"
"georgia"
"germania"
"ghana"
"giamaica"
"giappone"
"gibuti"
"giordania"
"grecia"
"grenada"
"guatemala"
"guinea"
"guineaBissau"
"guineaEquatoriale"
"guyana"
"haiti"
"honduras"
"india"
"indonesia"
"iran"
"iraq"
"irlanda"
"islanda"
"isoleMarshall"
"isoleSolomone"
"israele"
"Italia"
"kazakistan"
"kenya"
"kirghizistan"
"kuwait"
"laos"
"lesotho"
"lettonia"
"libano"
"liberia"
"libia"
"liechtenstein"
"lituania"
"lussemburgo"
"macedoniaDelNord"
"madagascar"
"malawi"
"maldive"
"malaysia"
"mali"
"malta"
"marocco"
"mauritania"
"mauritius"
"messico"
"micronesia"
"moldavia"
"monaco"
"mongolia"
"montenegro"
"mozambico"
"namibia"
"nauru"
"nepal"
"nicaragua"
"niger"
"nigeria"
"norvegia"
"nuovaZelanda"
"oman"
"paesiBassi"
"pakistan"
"palau"
"palestina"
"panama"
"papuaNuovaGuinea"
"paraguay"
"peru"
"polonia"
"portogallo"
"qatar"
"regnoUnito"
"repubblicaCeca"
"repubblicaCentrafricana"
"repubblicaDominicaDominicana"
"romania"
"ruanda"
"russia"
"saintKittsENevis"
"saintLucia"
"saintVincentEGrenadine"
"samoa"
"sanMarino"
"saoTomeEPrincipe"
"senegal"
"serbia"
"seychelles"
"sierraLeone"
"singapore"
"siria"
"slovacchia"
"slovenia"
"somalia"
"spagna"
"statiUniti"
"sudafrica"
"sudan"
"sudanDelSud"
"suriname"
"svezia"
"svizzera"
"swaziland"
"tagikistan"
"taiwan"
"tanzania"
"thailandia"
"timorEst"
"togo"
"tonga"
"trinidadETobago"
"tunisia"
"turchia"
"turkmenistan"
"tuvalu"
"ucraina"
"uganda"
"ungheria"
"uruguay"
"uzbekistan"
"vanuatu"
"cittaDelVaticano"
"venezuela"
"vietnam"
"yemen"
"zambia"
"zimbabwe"