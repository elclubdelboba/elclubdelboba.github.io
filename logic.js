const botonBarra = document.getElementById("boton-barra");
const barra = document.getElementById("barra-lateral");
const menu = document.getElementById("menu");
const head = document.getElementById("logo");
const flechaR = document.getElementById("flechaR");
const flechaL = document.getElementById("flechaL");
var inicio =  true;
var miniPermitido = true;
var topp = true;

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.scrollTo(0, 0);
document.documentElement.style.overflow = 'hidden';

document.addEventListener("DOMContentLoaded", function() {
    const logo = document.getElementById("logo");
    const imgLogo = document.getElementById("imgLogo");

    setTimeout(() => {
        imgLogo.classList.remove("carga");
        logo.classList.remove("carga");
    }, 1000); 

     setTimeout(() => {
        inicio = false;
        document.documentElement.style.overflow = 'auto';
        head.innerHTML = `<h4 id="text1Logo" class="up">BIENVENIDOS<br>AL CLUB</h4> 
        <img id="imgLogo" class="logo" src="/assets/elclubdelbobalogo.png " alt="">`
    }, 1300); 
});

document.addEventListener('pointerdown', function(evento) {
    if (!barra.contains(evento.target) && !botonBarra.contains(evento.target) && botonBarra.textContent == "×"){
        botonBarra.textContent = "☰"
        barra.classList.toggle("activo");
    }
});

botonBarra.addEventListener("click", function() {
    if(botonBarra.textContent == "×"){
        botonBarra.textContent = "☰"
    }
    else{
        botonBarra.textContent = "×"
    }
    barra.classList.toggle("activo");
});

window.addEventListener('scroll', () => {
    if (!miniPermitido) return;

    if (window.scrollY === 0) {
        head.innerHTML = `<h4 id="text1Logo" class="up">BIENVENIDOS<br>AL CLUB</h4>
        <img id="imgLogo" class="logo" src="/assets/elclubdelbobalogo.png " alt="">`
        logo.classList.remove("mini");
        imgLogo.classList.remove("mini");
        menu.classList.remove("mini");
        if (inicio === false) {
            topp = true;
        }
    } else {
        head.innerHTML = `<img id="imgLogo" class="logo" src="/assets/elclubdelbobalogo.png " alt="">`
        logo.classList.add("mini");
        imgLogo.classList.add("mini");
        menu.classList.add("mini");

        if(topp  === true){
            document.documentElement.style.overflow = 'hidden';
            window.scrollTo({
                top: 40
            });
            topp = false;
        }
        setTimeout(() => {
            document.documentElement.style.overflow = 'visible';
        },600)
    }
});

document.getElementById("btnSubir").addEventListener('click', function() {
    miniPermitido = false;
    document.documentElement.style.overflow = 'hidden';
    setTimeout(() => {
        miniPermitido = true;
        document.documentElement.style.overflow = 'visible';
    }, 300); 
});

const elementos = document.querySelectorAll('.enlace');

elementos.forEach(boton => {
    boton.addEventListener('click', () => {
        head.innerHTML = `<img id="imgLogo" class="logo" src="/assets/elclubdelbobalogo.png " alt="">`
        logo.classList.add("mini");
        imgLogo.classList.add("mini");
        menu.classList.add("mini");
        if(topp  === true){
            window.scrollTo({
                top: 10,
            });
            topp = false;
        }
    });
});

//CARRUSEL-----------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {

    const bancoImagenes = {
        "CLÁSICOS": [
            {src: "assets/choco.png", alt: "Choco Milk" },
            {src: "assets/coffee.png", alt: "Coffee Boba" },
            {src: "assets/choco2.png", alt: "Choco Milk 2" }
        ],
        "PUROS": [
            {src: "assets/dark.png", alt: "Dark Coffee" },
            {src: "assets/imperial.png", alt: "Pure Matcha" }

        ],
        "EXÓTICOS": [
            {src: "assets/peach.png", alt: "Peach Milk" },
            {src: "assets/strawberry.png", alt: "Strawberry Milk" }
        ],
        "MAJESTUOSOS": [
            {src: "assets/brownsugar.png", alt: "Strawberry Milk" },
            {src: "assets/obsidian.png", alt: "Cookie & Cream" },
            {src: "assets/latte1.png", alt: "Matcha Latte" },
            {src: "assets/latte2.png", alt: "Matcha Latte" }
        ],
        "PINK POP": [
            {src: "assets/pinkpop.png", alt: "Strawberry Milk" }
        ]
    };

    const contenedores = document.querySelectorAll(".contenedor");

    contenedores.forEach((seccion) => {
        const nombreCategoria = seccion.querySelector("h1").innerText;
        const listaDatos = bancoImagenes[nombreCategoria];

        if (!listaDatos) return;

        const carrusel = seccion.querySelector(".carrusel");
        const flechaL = seccion.querySelector(".L") !== null? seccion.querySelector(".L") : null;
        const flechaR = seccion.querySelector(".R") !== null? seccion.querySelector(".R") : null;

        listaDatos.forEach(datos => {
            const img = document.createElement("img");
            img.src = datos.src;
            img.alt = datos.alt;
            img.classList.add("foto");
            carrusel.appendChild(img);
        });

        const fotos = Array.from(carrusel.querySelectorAll(".foto"));
        const total = fotos.length;
        let centro = null;

        if(total > 1){
            centro = 1;
        }
        else{
           centro = 0; 
        }
        let rotarCarrusel = null;

        function actualizarCarrusel() {
            let izquierda = (centro - 1 + total) % total;
            let derecha = (centro + 1) % total;

            fotos.forEach((foto, indice) => {
                foto.classList.remove("principal", "izquierda", "derecha");
                if (indice === centro) {
                    foto.classList.add("principal");
                } else if (indice === izquierda) {
                    foto.classList.add("izquierda");
                } else if (indice === derecha) {
                    foto.classList.add("derecha");
                }
            });
        }

        function rotacionAutomatica() {
            if (rotarCarrusel !== null) clearInterval(rotarCarrusel);
            rotarCarrusel = setInterval(() => {
                centro = (centro + 1) % total;
                actualizarCarrusel();
            }, 3000);
        }

        if(flechaR !== null){
            flechaR.addEventListener("click", () => {
                centro = (centro + 1) % total;
                actualizarCarrusel();
                rotacionAutomatica();
            });

            flechaL.addEventListener("click", () => {
                centro = (centro - 1 + total) % total;
                actualizarCarrusel();
                rotacionAutomatica();
            });
        }

        actualizarCarrusel();
        rotacionAutomatica();
    });
});

const bloques = document.querySelectorAll(".contenedor");

bloques.forEach(bloques => {
    bloques.addEventListener('click', (evento) => {
        if(bloques.classList.contains("close")){
            bloques.classList.remove("close");
        }
        else{
            bloques.classList.add("close");
        }
    });
});