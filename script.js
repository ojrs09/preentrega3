// Login para profesores, y agregar notas

// Array de objetos para base de datos de usuarios

const maestros = [{
    nombre: 'Edna',
    mail: 'ednakrabappel@gmail.com',
    pass: 'maestraBart'
},
{
    nombre: 'Denzel',
    mail: 'denzelcrocker@gmail.com',
    pass: 'maestroTimmy'
},
{
    nombre: 'Roshi',
    mail: 'maestroRoshi@gmail.com',
    pass: 'maestroGoku'
}]

// Array de objetos para base de datos alumnos

const estudiantes = [{
    nombre: 'Omar',
    apellido: 'Romero',
    edad: 15,
    estatura: 1.62,
    img: './multimedia/web_of_Spider-Man_Vol_1_129.1_Sin_texto.webp'
    },
    {
    nombre: 'Karla',
    apellido: 'Casanas',
    edad: 14,
    estatura: 1.25,
    img: './multimedia/sailor-moon.jpg'
    },
    {
    nombre: 'Edward',
    apellido: 'Bastidas',
    edad: 12,
    estatura:1.45,
    img: './multimedia/guUYd44L_400x400.png'
    },
    {
    nombre: 'Yeespri',
    apellido: 'Morales',
    edad: 17,
    estatura: 1.65,
    img: './multimedia/descarga.jpg'
    },
    {nombre: 'Diosa',
    apellido: 'Yglesias',
    edad: 15, 
    estatura: 1.49,
    img: './multimedia/Jean_Francois_Armand_Felix_Bernard_-_Fortuna.jpg'
    },
    {
    nombre: 'Juan',
    apellido: 'Casanas',
    edad: 12,
    estatura: 1.27,
    img: './multimedia/Unnamed_29.webp'
}]

// Elementos del DOM que voy a usar

const 
    mailLogin = document.getElementById('emailLogin'),
    passLogin = document.getElementById('passwordLogin'),
    btnLogin = document.getElementById('login'),
    btnAgregar=document.getElementById('agregarNota')
    contTarjetas = document.getElementById('tarjetas'),
    toggles = document.querySelectorAll('.toggles'),
    modal = document.getElementById('modal');



// Validación de usuario

function validarUsuario(maestros, mail, pass) {
    
    let encontrado = maestros.find((maestros) => maestros.mail == mail);

    if (typeof encontrado === 'undefined') {
        return false;
    } else {
        if (encontrado.pass != pass) {
            return false;
        } else {
            return encontrado;
        }
    }
}


//Guardamos los datos que recuperamos de la database en el local storage

    btnLogin.addEventListener('click',()=>{
        localStorage.setItem('email',emailLogin.value),
        localStorage.setItem('pass', passwordLogin.value)
        })



//Recupero los datos que se guardaron y los retorno

function recuperarUsuario(localstorage) {
    let usuarioEnStorage = JSON.parse(localstorage.getItem('email'));
    return usuarioEnStorage;
}

function recuperarClave(localstorage) {
    let claveEnStorage = JSON.parse(localstorage.getItem('pass'));
    return claveEnStorage;
}


// --------------------------------CREA HTML--------------------

function mostrarInfoEstudiantes(array) {
    contTarjetas.innerHTML = '';
    array.forEach(element => {
        let html = `<div class="card cardEstudiante" id="tarjeta${element.nombre}">
                <h3 class="card-header" id="nombreEstudiante">Nombre: ${element.nombre}</h3>
                <img src="${element.img}" alt="${element.nombre}" class="card-img-bottom" id="fotoEstudiante">
                <div class="card-body">
                    <p class="card-text" id="apellidoEstudiante">Apellido: ${element.apellido} </p>
                    <p class="card-text" id="edadEstudiante">Edad: ${element.edad} años</p>
                    <button type="submit" class="btn btn-primary" id="agregarNota" >agregarNota</button> 
                </div>
            </div>`;
        contTarjetas.innerHTML += html;

    });
}

// Para agregar notas

// btnAgregar.addEventListener('click',()=>{
//     alert('Hola');
//     })

// 


// ---------------------------VISUALIZACIÓN-----------------------------

function presentarInfo(array, clase) {
    array.forEach(element => {
        element.classList.toggle(clase);
    });
}

// --------------------------------------------------------------------


// Llamamamos al botón de login con el objeto del evento y usar preventDefault

btnLogin.addEventListener('click', (evt) => {
    evt.preventDefault();

    //Validamos que ambos campos estén completos.

    if (!mailLogin.value || !passLogin.value) {
        alert('Todos los campos son requeridos');
    } else {
        
        let data = validarUsuario(maestros, mailLogin.value, passLogin.value);

        if (!data) {
            alert(`Usuario o contraseña erróneos`);
        } else {
            //Muestro la info para usuarios logueados (con toggles)
            mostrarInfoEstudiantes(estudiantes);
            presentarInfo(toggles, 'd-none');
        }
    }
});

//Limpiar los storages

function borrarDatos() {
    localStorage.clear();
    sessionStorage.clear();
}
