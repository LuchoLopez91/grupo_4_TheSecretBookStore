const QS = element => document.querySelector(element);
const QSA = element => document.querySelectorAll(element);

window.onload = () => {

let $form = QS('form')
    $inputName = QS('#name'),
    $nameErrors = QS('#nameErrors'),
    $inputAuthor = QS('#author'),
    $authorErrors= QS('#authorErrors'),
    $inputPrice = QS('#price'),
    $priceErrors = QS ('#priceErrors'),
    $inputEditorial = QS('#editorial'),
    $editorialErrors = QS ('#editorialErrors'),
    $lenguaje = QS('#lenguaje'),
    $lenguajeErrors = QS ('#lenguajeErrors'),
    $formato= QS('#formato'),
    $formatoErrors = QS ('#formatoErrors'),
    $genero= QS('#genero'),
    $generoErrors = QS('#formatoErrors'),
    $inputImage= QS('#image'),
    $inputDescripcion = QS ('#descripcion'),
    $descripcionErrors = QS ('#descripcionErrors'),
    regExAlpha = /^[a-zA-Z\sñáéíóúü\0-9]*$/,
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
            default:
                $inputEditorial.classList.remove("is-invalid")
                $inputEditorial.classList.add("is-valid")
                $editorialErrors.innerText = "";
                break;
        }
    })
    $lenguaje.addEventListener("blur",  () =>{
        switch (true) {
            case !$lenguaje.value.trim():
                $lenguajeErrors.innerText = "El idioma del libro es obligatorio";
                $lenguaje.classList.add("is-invalid")
                break;
            default:
                $lenguaje.classList.remove("is-invalid")
                $lenguaje.classList.add("is-valid")
                $lenguajeErrors.innerText = "";
                break;
        }
    })
    $formato.addEventListener("blur", () =>{
        switch (true) {
            case !$formato.value.trim():
                $formatoErrors.innerText = "El formato del libro es obligatorio";
                $formato.classList.add("is-invalid")
                break;
            default:
                $formato.classList.remove("is-invalid")
                $formato.classList.add("is-valid")
                $formatoErrors.innerText = "";
                break;
        }
        
    })
    $genero.addEventListener("blur", () =>{
        switch (true) {
            case !$genero.value.trim():
                $generoErrors.innerText = "El genero del libro es obligatorio";
                $genero.classList.add("is-invalid")
                break;
            default:
                $genero.classList.remove("is-invalid")
                $genero.classList.add("is-valid")
                $generoErrors.innerText = "";
                break;
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
                return alert("El libro no fue registrado, debes completar los campos requeridos")
            }}
        let elementosConErrores = document.querySelectorAll("is-invalid")
        let errores = elementosConErrores.length > 0;

        if (errores) {
            submitErrors.innerText = "Hay errores en el formulario"
        } else {
            $form.submit()
        }
    })
    }




















