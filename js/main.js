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

function calcular(edading,metrosing){
    return ((metrosing - 504) / 45)+(edading/100)
}

let clasificacion
if(sigue){
    vo2max = calcular(edad,metros);
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
            //alert("Tu VO2 Max es de " + vo2max + " y clasifica como " + clasificacion + ". \nLa tabla es la siguiente:" +
            //    "\n Pobre <35 \n Regular 35 - 40 \n Buena 40 - 45 \n Muy Buena 45 - 50 \n Excelente >50");
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
            //alert("Tu VO2 Max es de " + vo2max + " y clasifica como " + clasificacion + ". \nLa tabla es la siguiente:" +
            //    "\n Pobre <30 \n Regular 30 - 35 \n Buena 35 - 40 \n Muy Buena 40 - 45 \n Excelente >45");
            break;
        default:
            alert("No ingresó un sexo válido");
            break;
    }
}

const planesEntrenamientos = [
    {id :1, nombre: "5KM", distancia:5, duracion:4},
    {id :2, nombre: "10KM", distancia:10, duracion:6},
    {id :3, nombre: "15KM", distancia:15, duracion:6},
    {id :4, nombre: "21KM", distancia:21, duracion:8},
    {id :5, nombre: "30KM", distancia:30, duracion:10},
    {id :6, nombre: "42KM", distancia:42, duracion:15},
];

function buscarPlan(arr,valorIngr){
    let sel = arr.find(el=> el.distancia == valorIngr);
    if ((sel != undefined) && (typeof sel === 'object')){
        return sel;
    }else{
        return false;
    }
}

let planSeleccionado;
var arraySeleccionado = false;

while (arraySeleccionado == false) {
    planSeleccionado = prompt("Ingrese la distancia del plan de entrenamiento que desea:" +
    "\n 5 KM \n 10 KM  \n 15 KM  \n 21 KM  \n 30 KM \n 42 KM ");

    arraySeleccionado = buscarPlan(planesEntrenamientos,planSeleccionado);
}

const planPersonalizado = [];
for (const i in arraySeleccionado){
    planPersonalizado.push(arraySeleccionado[i]);
    console.log(arraySeleccionado[i]);
}
planPersonalizado.push(edad);
planPersonalizado.push(metros);
planPersonalizado.push(sexo);
planPersonalizado.push(vo2max);
planPersonalizado.push(clasificacion);
console.log(planPersonalizado);

let arrayFechasDistancias = [];
let fechaInicial =  new Date();

function sumarDias(fecha, dias) {
    let nuevaFecha = new Date(fecha);
    nuevaFecha.setDate(nuevaFecha.getDate() + dias);
    return nuevaFecha;
}

let diasTotalesPlan = arraySeleccionado.duracion * 7
for (let i = 0; i < diasTotalesPlan; i++) {
    arrayFechasDistancias.push({
        fecha: sumarDias(fechaInicial, 2 * i),
        distancia: 10 + (i*2)
    });
}

var mensajeFinal = "";
arrayFechasDistancias.forEach(objeto => {
    console.log("Fecha: " + objeto.fecha.toLocaleDateString() + ", Distancia: " + objeto.distancia + " km");
    mensajeFinal += "Fecha: " + objeto.fecha.toLocaleDateString() + ", Distancia: " + objeto.distancia + " km \n "
});

alert("El plan de entrenamiento para " + planPersonalizado[1] + " es el siguiente \n " + mensajeFinal);
