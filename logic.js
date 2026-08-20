const botonBarra = document.getElementById("boton-barra");
const barra = document.getElementById("barra-lateral");

console.log(barra.style.width);

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