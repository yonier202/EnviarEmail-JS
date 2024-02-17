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
    const btnReset=document.querySelector('#formulario button[type="reset"]');
    const spinner=document.querySelector('#spinner');


    inputEmail.addEventListener("blur", validar);
    inputAsunto.addEventListener("blur", validar);
    inputMensaje.addEventListener("blur", validar);

    Formulario.addEventListener("submit", enviarEmail);
    
    btnReset.addEventListener("click", function(e) {
        e.preventDefault();
        resetFormulario();
    });


    function enviarEmail(e){
        e.preventDefault();

        spinner.classList.add("flex");
        spinner.classList.remove("hidden");

        setTimeout(() => {
                spinner.classList.remove("flex");
                spinner.classList.add("hidden");
                resetFormulario();
        }, 3000);

        //crear una alerta

        const alertaExito = document.createElement("P");
        alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center',
        'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
        alertaExito.textContent = 'Mensaje Enviado Correctamente';

        Formulario.appendChild(alertaExito);

        setTimeout(() => {
            alertaExito.remove();
        }, 3000);

    }
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

    function resetFormulario(){
        Formulario.reset();

        content.email = "";
        content.asunto = "";
        content.mensaje = "";

        comprobarInputs();
    }

});