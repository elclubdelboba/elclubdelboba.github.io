const botonBarra = document.getElementById("boton-barra");
const barra = document.getElementById("barra-lateral");
const menu = document.getElementById("menu");
const head = document.getElementById("logo");
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
                top: 10,
            });
            topp = false;
        }
        setTimeout(() => {
            document.documentElement.style.overflow = 'visible';
        },600)
    }
});

document.querySelector('.btn-subir').addEventListener('click', function(e) {
    e.preventDefault();
    miniPermitido = false;
    window.scrollTo({
        top: 0, 
        behavior: 'smooth'
    });
    setTimeout(() => {
        miniPermitido = true;
    }, 700); 
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