let sigue = false;
let edad;
let metros;

for (let i = 1; i <= 3; i = i + 1){
    edad = prompt("Ingresa tu edad. Mayor de 12 años");
    if (edad == ""){
        alert("Debe ingresar la edad");
    }else{
        if (edad < 12){
            alert("La edad debe ser mayor a 12 años");
        }else{
            sigue = true;
            break;
        }
    }
}

if(sigue){
    sigue = false

    for (let i = 1; i <= 3; i = i + 1){
        metros = prompt("Ingrese los metros que corrió en 12 minutos");
        if (metros == ""){
            alert("Debe ingresar los metros");
        }else{
            sigue = true;
            break;
        }
    }
}

function calcular(metrosing){
    return (metrosing - 504) / 45
}

if(sigue){
    alert(calcular(metros));
}

