document.addEventListener("DOMContentLoaded", function(){

    //Seleccionar los elementosde la interfaz

    const inputEmail=document.querySelector('#email');
    const inputAsunto=document.querySelector('#asunto');
    const inputMensaje=document.querySelector('#mensaje');
    const Formulario=document.querySelector('#formulario');

    inputEmail.addEventListener("blur", validar);
    inputAsunto.addEventListener("blur", validar);
    inputMensaje.addEventListener("blur", validar);

    function validar(e) {
        if (e.target.value.trim()==="") {
            mostrarAlerta(`el campo ${e.target.id} es obligatorio`, e.target.parentElement);
            return
        }
        limpiarAlerta(e.target.parentElement);
    }

    function mostrarAlerta(mj, posicion) {

        //Si ya existe una alerta
        limpiarAlerta(posicion) 
        const error = document.createElement("P");
        error.textContent = mj;
        error.classList.add("bg-red-600", "text-white", "p-2", "text-center");

        //inyectar ene el HTML

        posicion.appendChild(error);
    }

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove();
        }
    }

});