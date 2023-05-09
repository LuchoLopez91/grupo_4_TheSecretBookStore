const { format } = require("mysql2");

let qs = (elemento) => {
    return document.querySelector(elemento);
}

window.addEventListener("load", ( )=>{

let $inputName = qs('#name'),
    $nameErrors = qs('"nameErrors'),
    $inputAuthor = qs('#author'),
    $authorErrors= qs('#authorErrors'),
    $inputPrice = qs('#price'),
    $priceErrors = qs ('#priceErrors'),
    $inputEditorial = qs('#editorial'),
    $editorialErrors = qs ('#editorialErrors'),
    $lenguaje = qs('#lenguaje'),
    $lenguajeErrors = qs ('lenguajeErrors'),
    $formato= qs('#formato'),
    $formatoErrors = qs ('#formatoErrors'),
    $genero= qs('#genre'),
    $generoErrors = qs('#formatoErrors'),
    $inputImage= qs('#image'),
    $inputDescripcion = qs ('#descripcion'),
    $descripcionErrors = qs ('#descripcionErrors'),
    regExAlpha = /^[a-zA-Z\sñáéíóúü\0-9 ]*$/,
    regExNum = /^[0-9]*$/;

    $inputName.addEventListener("blur", () =>{
        switch (true) {
            case !$inputName.value.trim():
                $nameErrors.innerText = "El nombre del libro es obligatorio";
                $inputName.classList.add("is-invalid")
                break;
            case !regExAlpha.test($inputName.value):
                    $nameErrors.innerText = "Uno o mas caracteres no estan permitidos";
                    $inputName.classList.add("is-invalid")
                    break;
            default:
                $inputName.classList.remove("is-invalid")
                $inputName.classList.add("is-valid")
                $nameErrors.innerText = "";
                break;
        }
    })
    $inputAuthor.addEventListener("blur", () =>{
        switch (true) {
            case !$inputAuthor.value.trim():
                $authorErrors.innerText = "El author es obligatorio";
                $inputAuthor.classList.add("is-invalid")
                break;
            case !regExAlpha.test($inputAuthor.value):
                    $authorErrors.innerText = "Uno o mas caracteres no estan permitidos";
                    $inputAuthor.classList.add("is-invalid")
                    break;
            default:
                $inputAuthor.classList.remove("is-invalid")
                $inputAuthor.classList.add("is-valid")
                $authorErrors.innerText = "";
                break;
        }
    })
    $inputPrice.addEventListener("blur", () =>{
        switch (true) {
            case !$inputPrice.value.trim():
                $priceErrors.innerText = "El precio es obligatorio";
                $inputPrice.classList.add("is-invalid")
                break;
            case !regExNum.test($inputPrice.value):
                    $priceErrors.innerText = "Ingresar solo numeros sin coma ni puntos";
                    $inputPrice.classList.add("is-invalid")
                    break;
            default:
                $inputPrice.classList.remove("is-invalid")
                $inputPrice.classList.add("is-valid")
                $priceErrors.innerText = "";
                break;
        }
    })
    $inputEditorial.addEventListener("blur", () =>{
        switch (true) {
            case !$inputEditorial.value.trim():
                $editorialErrors.innerText = "La editorial del libro es obligatorio";
                $inputEditorial.classList.add("is-invalid")
                break;
            case !regExAlpha.test($inputEditorial.value):
                    $editorialErrors.innerText = "Uno o mas caracteres no estan permitidos";
                    $inputEditorial.classList.add("is-invalid")
                    break;
            default:
                $inputEditorial.classList.remove("is-invalid")
                $inputEditorial.classList.add("is-valid")
                $editorialErrors.innerText = "";
                break;
        }
    })
    $lenguaje.addEventListener("blur", function(){
    if (!lenguaje.value.trim()) {
        $lenguajeErrors.innerHtml = "Debes elegir un lenguaje";
        $lenguaje.classList.add("is-invalid")
    } else {
        $lenguaje.classList.remove("is-invalid")
        $lenguaje.classList.add("is-valid")
        $lenguajeErrors.innerHtml = "";
    }
    })
    $formato.addEventListener("blur", function(){
        if (!formato.value.trim()) {
            $formatoErrors.innerHtml = "Debes elegir un formato";
            $formato.classList.add("is-invalid")
        } else {
            $formato.classList.remove("is-invalid")
            $formato.classList.add("is-valid")
            $formatoErrors.innerHtml = "";
        }
    })
    $genero.addEventListener("blur", function(){
        if (!genero.value.trim()) {
            $generoErrors.innerHtml = "Debes elegir un genero";
            $genero.classList.add("is-invalid")
        } else {
            $genero.classList.remove("is-invalid")
            $genero.classList.add("is-valid")
            $generoErrors.innerHtml = "";
        }
    })

    $inputDescripcion.addEventListener("blur", () =>{
        switch (true) {
            case !$inputDescripcion.value.trim():
                $descripcionErrors.innerText = "La descripcion del libro es obligatoria";
                $inputDescripcion.classList.add("is-invalid")
                break;
            case !regExAlpha.test($inputDescripcion.value):
                    $descripcionErrors.innerText = "Uno o mas caracteres no estan permitidos";
                    $inputDescripcion.classList.add("is-invalid")
                    break;
            default:
                $inputDescripcion.classList.remove("is-invalid")
                $inputDescripcion.classList.add("is-valid")
                $descripcionErrors.innerText = "";
                break;
        }
    })

    $form.addEventListener("submit", (event) => {
        event.preventDefault()
        const FORM_ELEMENTS = event.target.elements;

        for (let index = 0; index < FORM_ELEMENTS.length - 1; index++) {
            const element = FORM_ELEMENTS[index];
            if (element.value == "") {
                return alert("El libro no fue editado, debes completar los campos requeridos")
            }}
        let elementosConErrores = document.querySelectorAll("is-invalid")
        let errores = elementosConErrores.length > 0;

        if (errores) {
            submitErrors.innerText = "Hay errores en el formulario"
        } else {
            $form.submit()
        }
    })
    })