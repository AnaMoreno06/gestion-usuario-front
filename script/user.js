
const urlBasic = "http://localhost:8080"

let user = JSON.parse(localStorage.getItem("usuario"))

if (user.id >= 1) {
    $("#contenedor").load('menu.html')
    verOpcionesMenu()

}
function salirCuenta() {
    localStorage.setItem("usuario", "")
    localStorage.clear()
    setTimeout(recargar, 50)
}



async function verOpcionesMenu() {
    //Obtengo el id del rol del usuario
    let rolId = JSON.parse(localStorage.getItem("usuario")).rol.id

    //Realizo la peticion para buscar las opciones del menu
    await fetch(urlBasic + "/rol/" + rolId + "/opcionMenu/lista")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let body = ``
            //Cargo en la vista

            for (let i = 0; i < data.length; i++) {
                body +=
                    `
                    <li><a class="dropdown-item" href="${data[i].opcionMenu.url}">
                    <i class="${data[i].opcionMenu.icono}"></i>
                    
                     ${data[i].opcionMenu.nombre}</a></li>
             
            `
            }
            document.getElementById('opcionesMenu').innerHTML = body
        })
        .catch(err => {
            console.log(err)
        })

}



function cargarMenu() {
    $("#contenedor").load('menu.html')

}


async function login() {

    let email = document.getElementById('email').value

    let pass = document.getElementById('password').value

    const data = {
        email,
        password: pass
    }


    console.log(data)
    await fetch(urlBasic + '/usuario/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json '
        }
    })
        .then(response => response.json())
        .then(data => {
            Swal.fire({
                icon: 'success',
                title: 'Bienvenido',
                timer: 1000,
            })
            console.log(data)
            localStorage.setItem("usuario", JSON.stringify(data))
            cargarMenu()
            verOpcionesMenu()
        })
        .catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Datos incorrectos LOL!',
                timer: 1000,
                footer: '<a href="">Why do I have this issue?</a>'
            })
        })

}





