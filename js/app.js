document.addEventListener("DOMContentLoaded", function(){

    const content = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    //Seleccionar los elementosde la interfaz

    const inputEmail=document.querySelector('#email');
    const inputAsunto=document.querySelector('#asunto');
    const inputMensaje=document.querySelector('#mensaje');
    const Formulario=document.querySelector('#formulario');
    const btnSubmit=document.querySelector('#formulario button[type="submit"]');

    inputEmail.addEventListener("blur", validar);
    inputAsunto.addEventListener("blur", validar);
    inputMensaje.addEventListener("blur", validar);

    function validar(e) {
        if (e.target.value.trim()==="") {
            mostrarAlerta(`el campo ${e.target.id} es obligatorio`, e.target.parentElement);
            
            content[e.target.name] = '';
            comprobarInputs();
            return
        }

        if (e.target.id==='email' && !validarEmail(e.target.value)){
            mostrarAlerta(`el Email es Invalido`, e.target.parentElement);
            content[e.target.name] = '';
            comprobarInputs();

            return;
        };
        limpiarAlerta(e.target.parentElement);

        //asignar los valores dinamicamente
        content[e.target.name] = e.target.value.trim().toLow;

        comprobarInputs();
    }

    function mostrarAlerta(mj, posicion) {

        //Si ya existe una alerta
        limpiarAlerta(posicion) 
        const error = document.createElement("P");
        error.textContent = mj;
        error.classList.add("bg-red-600", "text-white", "p-2", "text-center");

        //inyectar en el HTML

        posicion.appendChild(error);
    }

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarInputs(){
        //devuelve un array con los valores del objeto content
        // y compara si alguna tiene string vacio
        if (Object.values(content).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
        }else{
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
        }
    }

});