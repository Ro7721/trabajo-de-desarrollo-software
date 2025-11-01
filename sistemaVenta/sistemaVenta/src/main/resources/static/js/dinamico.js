document.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.getElementById("container-dinamic");
    const menuItems = document.querySelectorAll(".menu-item, .submenu-item");

    // Asignar evento a cada item del menú
    menuItems.forEach(item => {
        const onClick = item.getAttribute("onclick");

        // Solo manejar los que llaman a loadContent('...')
        if (onClick && onClick.includes("loadContent")) {
            const match = onClick.match(/loadContent\('(.+?)'\)/);
            if (match) {
                const page = match[1];

                item.addEventListener("click", (e) => {
                    e.preventDefault();
                    cargarContenido(page);
                });
            }
        }
    });

    // Función principal para cargar contenido dinámico
    function cargarContenido(pagina) {
        mainContent.classList.add("fade-out");

        setTimeout(() => {
            const url = `/dashboard/${pagina}`;
            console.log("Cargando:", url);

            fetch(url)
                .then(response => {
                    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
                    return response.text();
                })
                .then(html => {
                    mainContent.innerHTML = html;
                    mainContent.classList.remove("fade-out");
                    actualizarMenuActivo(pagina);
                    window.history.pushState(null, "", url);
                })
                .catch(error => {
                    mainContent.innerHTML = `
                        <div class="alert alert-danger mt-4 text-center">
                            <i class="fas fa-exclamation-triangle"></i> 
                            No se pudo cargar el contenido.<br>
                            <small>${error.message}</small>
                        </div>`;
                    mainContent.classList.remove("fade-out");
                });
        }, 400);
    }

    // Actualizar menú activo
    function actualizarMenuActivo(pagina) {
        document.querySelectorAll(".menu-item, .submenu-item").forEach(item => {
            item.classList.remove("active");
        });

        const activo = document.querySelector(`[onclick="loadContent('${pagina}')"]`);
        if (activo) activo.classList.add("active");
    }

    // Manejo del historial (botones atrás/adelante)
    window.addEventListener("popstate", () => {
        const path = window.location.pathname;
        if (path.startsWith("/dashboard/")) {
            const pagina = path.replace("/dashboard/", "");
            cargarContenido(pagina);
        }
    });

    // Cargar página inicial
    const pathActual = window.location.pathname;
    const paginaInicial = pathActual.startsWith("/dashboard/") ? pathActual.replace("/dashboard/", "") : "main";
    cargarContenido(paginaInicial);
});
