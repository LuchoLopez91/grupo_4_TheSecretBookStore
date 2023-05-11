const QS = element => document.querySelector(element);
const QSA = element => document.querySelectorAll(element);

window.onload = () => {
    let $inputEmail = QS("#email"),
        $emailError = QS("#emailError"),
        $form = QS("#form"),
        $formError = QS("#formError"),
        regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
        regExDNI = /^[0-9]{7,8}$/,
        regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
        regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

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

    $form.onsubmit = (e) => {
        e.preventDefault();
        const FORM_ELEMENTS = e.target.elements;

        for (let i = 0 ; i < FORM_ELEMENTS.length - 1 ; i++){
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