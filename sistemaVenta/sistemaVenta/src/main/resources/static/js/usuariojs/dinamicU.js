document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("container-dinamic");

    /**
     * ✅ Función genérica para cargar contenido dinámico
     */
    function cargarContenido(url) {
        if (!container) {
            console.error("No se encontró el contenedor #container-dinamic");
            return;
        }

        console.log("Cargando contenido desde:", url);

        // Efecto de carga
        container.classList.add("fade-out");
        container.innerHTML = `
            <div class="text-center mt-5">
                <div class="spinner-border text-primary" role="status"></div>
                <p class="mt-2">Cargando...</p>
            </div>
        `;

        // Cargar contenido vía fetch
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
                return response.text();
            })
            .then(html => {
                container.innerHTML = html;
                container.classList.remove("fade-out");
                
                // Actualizar la URL sin recargar la página
                window.history.pushState({ url: url }, "", url);
                console.log("Contenido cargado exitosamente");
            })
            .catch(error => {
                console.error("Error al cargar el contenido:", error);
                container.innerHTML = `
                    <div class="alert alert-danger mt-4 text-center">
                        <i class="fas fa-exclamation-triangle"></i>
                        No se pudo cargar el contenido.<br>
                        <small>${error.message}</small>
                    </div>
                `;
                container.classList.remove("fade-out");
            });
    }

    // ✅ Detectar clicks globalmente - VERSIÓN COMPLETA
    document.addEventListener("click", (e) => {
        // Botón Ver Detalles
        const btnDetalle = e.target.closest(".btn-view");
        if (btnDetalle) {
            e.preventDefault();
            const id = btnDetalle.dataset.id;
            const baseUrl = btnDetalle.dataset.url || "/dashboard/usuarios/view/";
            const url = `${baseUrl}${id}`;
            console.log("Cargando detalles del usuario ID:", id, "URL:", url);
            cargarContenido(url);
            return;
        }

        // Botón Editar
        const btnEditar = e.target.closest(".btn-editar");
        if (btnEditar) {
            e.preventDefault();
            const id = btnEditar.dataset.id;
            const baseUrl = btnEditar.dataset.url || "/dashboard/usuarios/edit/";
            const url = `${baseUrl}${id}`;
            console.log("Cargando edición del usuario ID:", id);
            cargarContenido(url);
            return;
        }

        // Botón Nuevo Usuario
        const btnNuevo = e.target.closest(".btn-nuevo-usuario");
        if (btnNuevo) {
            e.preventDefault();
            const url = btnNuevo.dataset.url || "/dashboard/usuarios/create";
            console.log("Cargando formulario de nuevo usuario");
            cargarContenido(url);
            return;
        }

        // Botón Eliminar
        const btnEliminar = e.target.closest(".btn-eliminar");
        if (btnEliminar) {
            e.preventDefault();
            const id = btnEliminar.dataset.id;
            const baseUrl = btnEliminar.dataset.url || "/usuarios/delete/";
            
            if (confirm('¿Está seguro de eliminar este usuario?')) {
                const url = `${baseUrl}${id}`;
                console.log("Eliminando usuario ID:", id);
                
                // Para eliminación, podrías hacer un POST y luego recargar la lista
                fetch(url, { method: 'POST' })
                    .then(response => {
                        if (response.ok) {
                            // Recargar la lista después de eliminar
                            cargarContenido("/dashboard/usuarios");
                        } else {
                            alert('Error al eliminar el usuario');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('Error al eliminar el usuario');
                    });
            }
            return;
        }

        // Botón Volver
        const btnVolver = e.target.closest(".btn-volver");
        if (btnVolver) {
            e.preventDefault();
            cargarContenido("/dashboard/usuarios");
            return;
        }
    });

    // ✅ Permite usar el botón "atrás" del navegador
    window.addEventListener("popstate", (event) => {
        if (event.state?.url) {
            cargarContenido(event.state.url);
        } else {
            cargarContenido("/dashboard/usuarios");
        }
    });

    // ✅ Estado inicial - solo cargar si el container está vacío
    if (container && (!container.innerHTML || container.innerHTML.trim() === "")) {
        cargarContenido("/dashboard/usuarios");
    }
});