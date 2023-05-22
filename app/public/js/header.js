const QS = element => document.querySelector(element);
const QSA = element => document.querySelectorAll(element);

window.onload = () => {
    let $signUp = QS(".fa-user"),
    $userMenu = QS(".menu-user"),
    $categoria = QS(".categoria"),
    $listadoCategorias = QS(".categories")

    $signUp.addEventListener("click", function (e) {
        $userMenu.classList.toggle("show");
    });
    $categoria.addEventListener("click", function (e) {
       e.preventDefault();
        $listadoCategorias.classList.toggle("mostrar");
    });
}