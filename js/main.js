const formulario = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');
const fecha = document.getElementById('inputDate');

const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}
const campos = {
    usuario: false,
    nombre: false,
    contrasenna: false,
    correo: false,
    telefono: false
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "usuario":
        validarCampo(expresiones.usuario, e.target, e.target.name);
        break;
        case "nombre":
        validarCampo(expresiones.nombre, e.target, e.target.name);
        break;
        case "contrasenna":
        validarCampo(expresiones.password, e.target, e.target.name);
        validarContrasenna2();
        break;
        case "contrasenna2":
        validarContrasenna2();
        break;
        case "correo":
        validarCampo(expresiones.correo, e.target, e.target.name);
        break;
        case "telefono":
        validarCampo(expresiones.telefono, e.target, e.target.name);
        break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove('is-invalid');
        document.getElementById(`grupo__${campo}`).classList.add('is-valid');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('is-invalid');
        document.getElementById(`grupo__${campo}`).classList.remove('is-valid');
        campos[campo] = false;
    }
}

const validarContrasenna2 = () => {
    const inputContrasenna1 = document.getElementById('contrasenna');
    const inputContrasenna2 = document.getElementById('contrasenna2');
    if(inputContrasenna1.value !== inputContrasenna2.value){
        document.getElementById(`grupo__contrasenna2`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__contrasenna2`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__contrasenna2 i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__contrasenna2 i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__contrasenna2 .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos['contrasenna'] = false;
    } else {
        document.getElementById(`grupo__contrasenna2`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__contrasenna2`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__contrasenna2 i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__contrasenna2 i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__contrasenna2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos['contrasenna'] = true;
    }
};

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const terminos = document.getElementById('terminos');
    if(campos.usuario && campos.nombre && campos.contrasenna && campos.correo && campos.telefono && terminos.checked){
        if(!fecha.value){
        alert("Inserta una fecha!");
        } else {
        alert(inputs[0].value + "\r" + inputs[1].value + "\r" + inputs[4].value + "\r" + inputs[5].value);
        formulario.reset();
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
        document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 5000);
            document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
        });
    }
    } else {
    document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
});
