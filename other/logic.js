const clave  = "MASCABADO500W";
let usuario;
let bobaUser;
let bobaStamps;

//localStorage.clear();

function consultarUsuario(user){
    bobaUser = localStorage.getItem('user_id');
    bobaStamps = parseInt(localStorage.getItem('recuento')) || 0;

    if (!bobaUser) {
        let rand = Math.floor(1000 + Math.random() * 9000);
        bobaUser = `${user}#${rand}`;
        localStorage.setItem('user_id', bobaUser);
        localStorage.setItem('recuento', bobaStamps);
        document.getElementById('username').innerText = bobaUser;
    }
    else{
        document.getElementById('username').innerText = bobaUser;
    }
}

    if (localStorage.getItem('user_id') === null) {
        const body = document.getElementById("body");

        let nuevoDiv = document.createElement("div");
        nuevoDiv.className = "iniciarUser";
        nuevoDiv.id = "creadorUser";
        nuevoDiv.innerHTML = `
            <h2>¡CREA TU TARJETA DE MIEMBRO FIEL DEL CLUB!</h2>
            <div class="inputs user">
            <input id="crearUser" class="input user" type="text" placeholder="CREA TU USUARIO">
            <button id="botonCrearUser" class="botonInput user">OK</button>
            </div>
            <h3>¡Con esta tarjeta digital cada bubble que compres se convierten en uno gratis!</h3>
        `;
        body.appendChild(nuevoDiv)
        const botonCrearUser = document.getElementById("botonCrearUser");

        botonCrearUser.addEventListener("click", function() {
            let crearUser = document.getElementById("crearUser");
            let userText = crearUser.value;
            if (!userText) {
                return;
            }
            usuario = userText;
            consultarUsuario(usuario);
            localStorage.setItem('registro', "ok");
            let desva = document.getElementById("creadorUser");
            desva.classList.add("off");
            setTimeout(() => {
                let iniciarUser = document.querySelectorAll(".iniciarUser");
                iniciarUser.forEach(elemento => {
                    elemento.remove();
                });
            }, 1600); 
        });
    }
    else{
        consultarUsuario(null);
    }


const boton = document.getElementById("botonCodigo");

actualizarInterfazDeCirculos();

function actualizarInterfazDeCirculos() {
    let boxes = document.querySelectorAll(".estampa");
    for (let i = 0; i < boxes.length; i++) {
        if (i < bobaStamps) {
            boxes[i].classList.add('activo');
        } else {
            boxes[i].classList.remove('activo');
            boxes[i].innerHTML = '';
        }
    }
}

function calcularToken(userId, targetStamp, clave){
    let hoy = new Date();
    let mes = String(hoy.getMonth() + 1).padStart(2, '0');
    let dia = String(hoy.getDate()).padStart(2, '0');
    let fechaFija = `${hoy.getFullYear()}-${mes}-${dia}`;
    
    let stringCombinado = userId + targetStamp + fechaFija + clave;
    
    let h1 = 0xdeadbeef;
    for (let i = 0; i < stringCombinado.length; i++) {
        let k1 = stringCombinado.charCodeAt(i);
        k1 = Math.imul(k1, 0xcc9e2d51);
        k1 = (k1 << 15) | (k1 >>> 17);
        k1 = Math.imul(k1, 0x1b873593);
        
        h1 ^= k1;
        h1 = (h1 << 13) | (h1 >>> 19);
        h1 = Math.imul(h1, 5) + 0xe6546b64;
    }
    
    h1 ^= stringCombinado.length;
    h1 ^= h1 >>> 16;
    h1 = Math.imul(h1, 0x85ebca6b);
    h1 ^= h1 >>> 13;
    h1 = Math.imul(h1, 0xc2b2ae35);
    h1 ^= h1 >>> 16;
    
    return Math.abs(h1).toString(36).padStart(6, '0').substring(0, 6).toUpperCase();
}

function validarSello() {

    let inputText = document.getElementById('codigoText');
    let inputToken = inputText.value;

    if (!inputToken) {
        return;
    }
    
    let siguientePerla = bobaStamps + 1;
    
    if (siguientePerla > 4) {
        localStorage.setItem('recuento', 0);
        bobaStamps = 0;
        actualizarInterfazDeCirculos();
        return;
    }

    let tokenCorrectoComputado = calcularToken(bobaUser, bobaStamps, clave);

    if (inputToken === tokenCorrectoComputado) {
        bobaStamps = siguientePerla;
        localStorage.setItem('boba_stamps_count', bobaStamps);
        actualizarInterfazDeCirculos();
        inputText.value = "";
    }
    else {
    }
}

boton.addEventListener("click", function() {
    validarSello();
});

window.addEventListener('DOMContentLoaded', () => {
    const parametrosUrl = new URLSearchParams(window.location.search);
    const tokenAtrapado = parametrosUrl.get('token');

    if (tokenAtrapado) {
        let siguientePerla = bobaStamps + 1;

        let tokenCorrectoComputado = calcularToken(bobaUser, bobaStamps, clave);

        if (tokenAtrapado.toUpperCase() === tokenCorrectoComputado) {
            bobaStamps = siguientePerla;
            localStorage.setItem('boba_stamps_count', bobaStamps);
            actualizarInterfazDeCirculos();
        
            window.history.replaceState({}, document.title, window.location.pathname);
            
            alert("¡BOOM! Perla inyectada automáticamente via QR. Sello verificado 🔮✨");
        }
        else{
            alert("El código QR ha expirado o es inválido para tu usuario, listillo.");
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }
});