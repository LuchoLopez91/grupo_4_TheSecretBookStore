const QS = element => document.querySelector(element);
const QSA = element => document.querySelectorAll(element);

window.onload = () => {

    let $inputFirstName = QS("#firstName"),
        $firstNameError = QS("#firstNameError"),
        $inputLastName = QS("#lastName"),
        $lastNameError = QS("#lastNameError"),
        $inputEmail = QS("#email"),
        $emailError = QS("#emailError"),
        $inputPassword = QS("#password"),
        $passwordError = QS("#passwordError"),
        $inputPass2 = QS("#pass2"),
        $pass2Error = QS("#pass2Error"),
        $form = QS("#form"),
        $formError = QS("#formError"),

        regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
        regExDNI = /^[0-9]{7,8}$/,
        regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
        regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

    // validación de nombre
    $inputFirstName.onblur = () => {
        switch (true) {
            case !$inputFirstName.value.trim():
                $firstNameError.innerText = "El nombre es requerido";
                $inputFirstName.classList.remove("is-valid");
                $inputFirstName.classList.add("is-invalid");
                break;
            case !regExAlpha.test($inputFirstName.value):
                $firstNameError.innerText = "El nombre contiene carácteres inválidos";
                $inputFirstName.classList.remove("is-valid");
                $inputFirstName.classList.add("is-invalid");
                break;
            default:
                $inputFirstName.classList.remove("is-invalid");
                $inputFirstName.classList.add("is-valid");
                $firstNameError.innerText = "";
                break;
        };
    };
    
    // validación de apellido
    $inputLastName.onblur = () => {
        switch (true) {
            case !$inputLastName.value.trim():
                $lastNameError.innerText = "El apellido es requerido";
                $inputLastName.classList.remove("is-valid");
                $inputLastName.classList.add("is-invalid");
                break;
            case !regExAlpha.test($inputLastName.value):
                $lastNameError.innerText = "El apellido contiene carácteres inválidos";
                $inputLastName.classList.remove("is-valid");
                $inputLastName.classList.add("is-invalid");
                break;
            default:
                $inputLastName.classList.remove("is-invalid");
                $inputLastName.classList.add("is-valid");
                $lastNameError.innerText = "";
                break;
        };
    };

    // validación de correo
    $inputEmail.onblur = () => {
        switch (true) {
            case !$inputEmail.value.trim():
                $emailError.innerText = "El campo de correo es obligatorio";
                $inputEmail.classList.remove("is-valid");
                $inputEmail.classList.add("is-invalid");
                break;
            case !regExEmail.test($inputEmail.value):
                $emailError.innerText = "Email invalido";
                $inputEmail.classList.remove("is-valid");
                $inputEmail.classList.add("is-invalid");
                break;
            default:
                $inputEmail.classList.remove("is-invalid");
                $inputEmail.classList.add("is-valid");
                $emailError.innerText = "";
                break;
        };
    };

    // validación de contraseña
    $inputPassword.onblur = () => {
        switch (true) {
            case !$inputPassword.value.trim():
                $passwordError.innerText = 'El campo contraseña es obligatorio';
                $inputPassword.classList.remove("is-valid");
                $inputPassword.classList.add('is-invalid');
                break;
            case !regExPass.test($inputPassword.value):
                $passwordError.innerText = 'La contraseña debe tener: entre 6 o 12 caracteres, al menos una mayúscula, una minúscula y un número';
                $inputPassword.classList.remove("is-valid");
                $inputPassword.classList.add('is-invalid');
                break;
            default:
                $inputPassword.classList.remove('is-invalid');
                $inputPassword.classList.add('is-valid');
                $passwordError.innerText = '';
                break;
        };
    };

    // verificación de ambas contraseñas
    $inputPass2.onblur = () => {
        switch (true) {
            case !$inputPass2.value.trim():
                $pass2Error.innerText = 'Debes reingresar la contraseña';
                $inputPass2.classList.remove("is-valid");
                $inputPass2.classList.add('is-invalid');
                break;
            case $inputPass2.value != $inputPassword.value:
                $pass2Error.innerText = 'Las contraseñas no coinciden';
                $inputPass2.classList.remove("is-valid");
                $inputPass2.classList.add('is-invalid');
                break;
            default:
                $inputPass2.classList.remove('is-invalid');
                $inputPass2.classList.add('is-valid');
                $pass2Error.innerText = '';
                break;
        };
    };

    // verifica que no haya errores
    $form.onsubmit = (e) => {
        e.preventDefault();
        const FORM_ELEMENTS = e.target.elements;

        for (let i = 0 ; i < FORM_ELEMENTS.length - 2 ; i++){
            let element = FORM_ELEMENTS[i];
            if(element.value === ""){
                element.classList.add("is-invalid");
            };
        };

        let errors = QSA(".is-invalid");
        if (errors.length !== 0){
            $formError.innerText = "Revise los errores";
        } else {
            $form.submit();
        };
    };
};