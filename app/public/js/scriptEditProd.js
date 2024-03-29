const QS = element => document.querySelector(element);
const QSA = element => document.querySelectorAll(element);
window.onload = () => {

let $inputName = QS('#name'),
    $nameErrors = QS('#nameErrors'),
    $inputAuthor = QS('#author'),
    $authorErrors= QS('#authorErrors'),
    $inputISBN = QS('#isbn13'),
    $isbnErrors= QS('#isbn13Errors'),
    $inputPrice = QS('#price'),
    $priceErrors = QS ('#priceErrors'),
    $inputEditorial = QS('#editorial'),
    $editorialErrors = QS ('#editorialErrors'),
    $lenguaje = QS('#lenguaje'),
    $lenguajeErrors = QS ('#lenguajeErrors'),
    $formato= QS('#formato'),
    $formatoErrors = QS ('#formatoErrors'),
    $genero= QS('#genre'),
    $generoErrors = QS('#formatoErrors'),
    $inputImage= QS('#image'),
    $inputDescripcion = QS ('#descripcion'),
    $descripcionErrors = QS ('#descripcionErrors'),
    $form = QS("#form"),
    $formError = QS("#formError"),
    regExAlpha = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ,.“”?':;¡!¿?\s]+$/,
    regExISBN = /^\d{9}[\d|Xx]|\d{13}$/,
    regExPrice = /^(?!0)\d+$/;

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
                $authorErrors.innerText = "El autor es obligatorio";
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
            case !regExPrice.test($inputPrice.value):
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

    $inputISBN.addEventListener("blur", () => {
        switch (true) {
            case !$inputISBN.value.trim():
                $isbnErrors.innerText = "El ISBN13 es necesario";
                $inputISBN.classList.add("is-invalid")
                break;
            case !regExISBN.test($inputISBN.value):
                $isbnErrors.innerText = "El ISBN13 debe ser numérico, y contener 13 dígitos";
                $inputISBN.classList.add("is-invalid")
                break;
            default:
                $inputISBN.classList.remove("is-invalid")
                $inputISBN.classList.add("is-valid")
                $isbnErrors.innerText = "";
                break;
        }
    })


    // previene que se envíen datos si hay errores
  /*  $form.onsubmit = (e) => {
        e.preventDefault();
        const FORM_ELEMENTS = e.target.elements;

        for (let i = 0 ; i < FORM_ELEMENTS.length - 1 ; i++){
            let element = FORM_ELEMENTS[i];
            if(element.value === ""){
                element.classList.add("is-invalid");
            };
        };

        let errors = QSA("is-invalid");
        if (errors.length > 0){
            $formError.innerText = "Revise los errores";
        } else {
            $form.submit();
        };
    };
*/
$form.addEventListener("submit", (evento) => {
    evento.preventDefault()
    const FORM_ELEMENTS = evento.target.elements;

    for (let index = 0; index < FORM_ELEMENTS.length - 1; index++) {
        const element = FORM_ELEMENTS[index];
        if(element.value === "" && element.type !== "file") {
            element.classList.add("is-invalid")
        }
        /* element.dispatchEvent(new Event("blur")) */
    }

    let elementosConErrores = document.querySelectorAll(".is-invalid");
    let errores = elementosConErrores.length > 0; 

    if(errores) {
        $formError.innerText = "Hay errores en el formulario"
    } else {
        $form.submit()
    }})

    }