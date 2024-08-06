let sigue = false;
let edad;
let metros;
let sexo;
let vo2max;

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

if(sigue){
    sigue = false
    for (let i = 1; i <= 3; i = i + 1){
        sexo = prompt("Ingrese el sexo. \n 'F' - Femenino \n 'M' - Masculino");
        if (sexo == ""){
            alert("Debe ingresar el sexo");
        }else{
            sigue = true;
            break;
        }
    }
}

if(sigue){
    function calcular(edading,metrosing){
        return ((metrosing - 504) / 45)+(edading/100)
    }

    vo2max = calcular(edad,metros);
    let clasificacion
    switch (sexo){
        case "M":
            if(vo2max<35){
                clasificacion = "Pobre"     
            }else if(vo2max<40){
                clasificacion = "Regular"
            }else if(vo2max<45){
                clasificacion = "Buena"
            }else if(vo2max<50){
                clasificacion = "Muy Buena"
            }else{
                clasificacion = "Excelente"
            }
            alert("Tu VO2 Max es de " + vo2max + " y clasifica como " + clasificacion + ". \nLa tabla es la siguiente:" +
                "\n Pobre <35 \n Regular 35 - 40 \n Buena 40 - 45 \n Muy Buena 45 - 50 \n Excelente >50"
            );
            break;
        case "F":
            if(vo2max<30){
                clasificacion = "Pobre"     
            }else if(vo2max<35){
                clasificacion = "Regular"
            }else if(vo2max<40){
                clasificacion = "Buena"
            }else if(vo2max<45){
                clasificacion = "Muy Buena"
            }else{
                clasificacion = "Excelente"
            }
            alert("Tu VO2 Max es de " + vo2max + " y clasifica como " + clasificacion + ". \nLa tabla es la siguiente:" +
                "\n Pobre <30 \n Regular 30 - 35 \n Buena 35 - 40 \n Muy Buena 40 - 45 \n Excelente >45"
            );
            break;
        default:
            alert("No ingresó un sexo válido");
            break;
    }
}

