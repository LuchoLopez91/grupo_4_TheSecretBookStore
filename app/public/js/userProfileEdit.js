const QS = element => document.querySelector(element);
const QSA = element => document.querySelectorAll(element);

window.onload = () => {
    let $inputFirstName = QS("#firstName"),
        $firstNameError = QS("#firstNameError"),
        $inputLastName = QS("#lastName"),
        $lastNameError = QS("#lastNameError"),
        $inputEmail = QS("#email"),
        $emailError = QS("#emailError"),
        $inputPhone = QS("#phone"),
        $phoneError = QS("#phoneError"),
        $inputAdress = QS("#adress"),
        $adressError = QS("#adressError"),
        $inputPostalCode = QS("#postalCode"),
        $postalCodeError = QS("#postalCodeError"),
        $selectProvinces = QS("#province"),
        $selectCity = QS("#city"),
        $form = QS("#form"),
        $formError = QS("#formError"),
        regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
        regExDNI = /^[0-9]{7,8}$/,
        regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
        regExPhone = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/,
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

    // validación de teléfono
    $inputPhone.onblur = () => {
        switch (true) {
            case !$inputPhone.value.trim():
                $phoneError.innerText = "El campo de teléfono es obligatorio";
                $inputPhone.classList.remove("is-valid");
                $inputPhone.classList.add("is-invalid");
                break;
            case !regExPhone.test($inputPhone.value):
                $phoneError.innerText = "El teléfono es invalido";
                $inputPhone.classList.remove("is-valid");
                $inputPhone.classList.add("is-invalid");
                break;
            default:
                $inputPhone.classList.remove("is-invalid");
                $inputPhone.classList.add("is-valid");
                $phoneError.innerText = "";
                break;
        };
    };

    // validación de domicilio
    $inputAdress.onblur = () => {
        switch (true) {
            case !$inputAdress.value.trim():
                $adressError.innerText = "El campo de domicilio es obligatorio";
                $inputAdress.classList.remove("is-valid");
                $inputAdress.classList.add("is-invalid");
                break;
            default:
                $inputAdress.classList.remove("is-invalid");
                $inputAdress.classList.remove("is-valid");
                $inputAdress.classList.add("is-valid");
                $adressError.innerText = "";
                break;
        };
    };

    // validación de código postal
    $inputPostalCode.onblur = () => {
        switch (true) {
            case !$inputPostalCode.value.trim():
                $postalCodeError.innerText = "El campo de código postal es obligatorio";
                $inputPostalCode.classList.remove("is-valid");
                $inputPostalCode.classList.add("is-invalid");
                break;
            case !$inputPostalCode.value.trim() == 4:
                $postalCodeError.innerText = "El código postal debe tener 4 números";
                $inputPostalCode.classList.remove("is-valid");
                $inputPostalCode.classList.add("is-invalid");
            default:
                $inputPostalCode.classList.remove("is-invalid");
                $inputPostalCode.classList.add("is-valid");
                $postalCodeError.innerText = "";
                break;
        };
    };

    // api de selección de ciudad
    $selectProvinces.onchange = (event) => {
        let provinceId = event.target.value;

        fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${provinceId}&campos=id,nombre&max=5000`)
            .then(response => response.json())
            .then((data) => {
                $selectCity.innerHTML = "";
                const { localidades } = data;

                localidades.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
                localidades.forEach(localidad => {
                    $selectCity.innerHTML += `<option value='${localidad.nombre}'>${localidad.nombre}</option>`;
                });
            })
            .catch((error) => console.log(error));
    };

    // previene que no se manden datos si hay errores
    $form.onsubmit = (e) => {
        e.preventDefault();
        const FORM_ELEMENTS = e.target.elements;

        for (let i = 0; i < FORM_ELEMENTS.length - 2; i++) {
            let element = FORM_ELEMENTS[i];
            if (element.value === "") {
                element.classList.add("is-invalid");
            };
        };

        let errors = QSA(".is-invalid");
        if (errors.length !== 0) {
            $formError.innerText = "Revise los errores";
        } else {
            $form.submit();
        };
    };

};