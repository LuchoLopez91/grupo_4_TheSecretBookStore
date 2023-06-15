const QueryS = element => document.querySelector(element);
const QuerySA = element => document.querySelectorAll(element);

window.onload = () => {
    let $signUp = QueryS(".fa-user"),
    $userMenu = QueryS(".menu-user"),
    $categoria = QueryS(".generos"),
    $listadoCategorias = QueryS(".categories")

    $signUp.addEventListener("click", function (e) {
        $userMenu.classList.toggle("show");
    });
    $categoria.addEventListener("click", function (e) {
       e.preventDefault();
        $listadoCategorias.classList.toggle("mostrar");
    });
}
