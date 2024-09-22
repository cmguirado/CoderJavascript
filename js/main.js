let sigue = false;
let edad, metros,sexo, vo2max;
let seriePlanes = JSON.stringify([]);
leerLocalStorage();

const form = document.getElementById('inputForm');
const contenedor = document.getElementById('contenedor');
const form2 = document.getElementById('selectPlan');
const contenedorS = document.getElementById('idSeries');
const confirmButtonColorGral = getComputedStyle(document.documentElement).getPropertyValue('--confirm-button-color').trim();

crearHtmlLista(seriePlanes);

let planesDesdeOtroLugar=[];

/*
const planesEntrenamientos = [
    { id: 1, nombre: "5KM", distancia: 5, duracion: 4, img: "P5k.png" },
    { id: 2, nombre: "10KM", distancia: 10, duracion: 6, img: "P10k.png" },
    { id: 3, nombre: "15KM", distancia: 15, duracion: 6, img: "P15k.png" },
    { id: 4, nombre: "21KM", distancia: 21, duracion: 8, img: "P21k.png" },
    { id: 5, nombre: "30KM", distancia: 30, duracion: 10, img: "P30k.png" },
    { id: 6, nombre: "42KM", distancia: 42, duracion: 15, img: "P42k.png" },
     
];

//VER ACA NESTOR
//Quiero traer con fetch de la api los planesEntrenamientos para comentar el objeto de arriba
//La solucion de esto, es montar el sitio y navegarlo desde un WEB SERVER... en vez de accediendo los archivos locales... ahi lee correctamente el jeison
*/


const planesEntrenamientos=[];
fetch('./data/planes.json')
.then((response) => response.json())
.then((planes) => {
    planesEntrenamientos.push(...planes);
});

function calcular(edading,metrosing){
    return Math.round((((metrosing - 504) / 45)+(edading/100)) * 100) / 100
}

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    const edading = document.getElementById('edad').value;
    const sexoing = document.getElementById('sexo').value;
    const metrosing = document.getElementById('metros').value;

    if (edading < 12) {
        swal.fire({
            title: "La edad debe ser mayor a 12 años.",
            confirmButtonColor: confirmButtonColorGral,
          });
    } else {
        metros =metrosing;
        sexo=sexoing;
        edad=edading;
        vo2max = calcular(edad,metros);
        pedirPlanes(planesEntrenamientos)
        .then((response)=>{
            planesDesdeOtroLugar = response;
            crearHtml(planesDesdeOtroLugar);
        }).catch((error)=>{
            swal.fire({
                title: error,
                confirmButtonColor: confirmButtonColorGral,
            });
        })
        clasificacionPersonal(vo2max,sexo);
        agregarListenerHTML(form2);
        leerLocalStorage();
        crearHtmlLista(seriePlanes);
    }
});

btnLimpiar.addEventListener("click", () => {
    localStorage.removeItem("Serie");
    seriePlanes= JSON.stringify([]);
    leerLocalStorage();
    crearHtmlLista(seriePlanes);
});


function limpiarTodo(){
    localStorage.removeItem("Serie");
    seriePlanes= JSON.stringify([]);
    leerLocalStorage();
    return;
}
btnVerDetalle.addEventListener("click", () => {
    //VER ACA NESTOR
    //En este boton ver detalle no me sale sacar el id del plan del carrito 
    //Aca lo que pasa, es que en el carrito podes tener mas de una cosa...
    //el tema es que no deifniste ID en tus variables

    id = 1;
    limpiarTodo();
    leerLocalStorage();
    const planK = planesEntrenamientos.find(plan => plan.id === id); 
    const planGenerado = generarPlan(planK);
    mostrarPlan(planGenerado);
});

function agregarListenerHTML(formulario){
    let idBtnSel;
    formulario.addEventListener('submit', function(event) {
        
        event.preventDefault(); 
        idBtnSel=event.submitter.id;
        limpiarTodo();
        agregarASerie(idBtnSel);
        leerLocalStorage();
        crearHtmlLista(seriePlanes);
    });
}

function agregarASerie(idPlan){
    let planAAgregar = buscarPlan(planesEntrenamientos,idPlan);
    let planTemp = JSON.parse(seriePlanes);
    planTemp.push(planAAgregar);
    seriePlanes = JSON.stringify(planTemp);
    localStorage.setItem('Serie',seriePlanes)
}

function leerLocalStorage(){
    let LS = localStorage.getItem('Serie');
    if(LS==null){
        localStorage.setItem('Serie',seriePlanes)
    }
    else{
        seriePlanes = localStorage.getItem('Serie');
    }
}

function buscarPlan(arr,valorIngr){
    let sel = arr.find(el=> el.id == valorIngr);
    if ((sel != undefined) && (typeof sel === 'object')){
        return sel;
    }else{
        return false;
    }
}

let clasificacion
function clasificacionPersonal(vo2maxIngre,sexoSel){
    if (sexoSel == "masculino"){
        if(vo2maxIngre<35){
            clasificacion = "Pobre"     
        }else if(vo2maxIngre<40){
            clasificacion = "Regular"
        }else if(vo2maxIngre<45){
            clasificacion = "Buena"
        }else if(vo2maxIngre<50){
            clasificacion = "Muy Buena"
        }else{
            clasificacion = "Excelente"
        }
    }else {
        if(vo2maxIngre<30){
            clasificacion = "Pobre"     
        }else if(vo2maxIngre<35){
            clasificacion = "Regular"
        }else if(vo2maxIngre<40){
            clasificacion = "Buena"
        }else if(vo2maxIngre<45){
            clasificacion = "Muy Buena"
        }else{
            clasificacion = "Excelente"
        }
    }
    swal.fire({
        title: "Tu VO2 Max es de " + vo2max + " y clasifica como " + clasificacion,
        confirmButtonColor: confirmButtonColorGral,
    });
}

function crearHtml(arr) {
    contenedor.innerHTML = "";
    let html = '';
    for (const { id, nombre, duracion, img } of arr) {
        html += `
            <div class="card">
                <img src="./img/${img}" alt="${nombre}">
                <hr>
                <h3>${nombre}</h3>
                <p>Duración: ${duracion} semanas</p>
                <div class="card-action">
                    <button class="btn" id="${id}">Seleccionar</button>
                </div>
            </div>
        `;
    }
    contenedor.innerHTML = html;
}

const pedirPlanes = (arr) =>{
    contenedor.innerHTML = "GENERANDO....";
    return new Promise((resolve,reject)=> {
        setTimeout(()=>{
            if(arr){
                resolve(arr)
            }else{
                reject('error de datos')
            }
        },2000)
    })
}

function crearHtmlLista (arrJ) {
    arr=JSON.parse(arrJ);
    let html = '';
    for (const { id, nombre, duracion, img } of arr) {
        html += `
            <li>Nombre: ${nombre}, Duración: ${duracion} semanas</li>
        `;
    }
    contenedorS.innerHTML = html;
}

function generarPlan(plan) {
    const { duracion, distancia } = plan;
    const planSemanal = [];
    
    for (let semana = 1; semana <= duracion; semana++) {
        const factor = Math.sin((Math.PI * semana) / duracion); 
        const kmPorSemana = Math.round(distancia * factor); 
  
        const kmMartes = Math.round(kmPorSemana * 0.25);  
        const kmJueves = Math.round(kmPorSemana * 0.25); 
        const kmDomingo = kmPorSemana - (kmMartes + kmJueves); 
  
        planSemanal.push({
            semana: semana,
            dias: {
                martes: `${kmMartes} km`,
                jueves: `${kmJueves} km`,
                domingo: `${kmDomingo} km`
            }
        });
    }
    return planSemanal;
}
  
function mostrarPlan(plan) {
    const planList = document.getElementById("planList");
    //Hice el li un let, y saque el const de abajo por que no andaba si no.
    //Tampoco tenias un elemento planList en tu HTML, por eso no podia leerlo :(
    let li = "";
    plan.forEach(semana => {
        li = document.createElement("li");
        li.innerHTML = `
            <span> Semana ${semana.semana}: - Martes: ${semana.dias.martes} - Jueves: ${semana.dias.jueves} - Domingo: ${semana.dias.domingo}</span>
            
            
        `;
        planList.appendChild(li);
    });
}