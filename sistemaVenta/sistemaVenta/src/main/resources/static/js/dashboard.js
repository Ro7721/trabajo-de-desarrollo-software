document.addEventListener('DOMContentLoaded', function() {
    // --- Funciones de Utilidad ---
    
    /**
     * Elimina la clase 'active' de todos los elementos del menú y submenú.
     */
    const removeAllActiveStates = () => {
        document.querySelectorAll('.menu-item, .submenu-item').forEach(item => {
            item.classList.remove('active');
        });
    };

    /**
     * Alterna la altura máxima (max-height) de un submenú para el efecto de transición CSS suave.
     * Cierra todos los demás submenús abiertos al mismo tiempo.
     * @param {HTMLElement} currentSubmenu El elemento de submenú a manipular.
     */
    const toggleSubmenu = (currentSubmenu) => {
        document.querySelectorAll('.submenu').forEach(sub => {
            // Cierra otros submenús abiertos
            if (sub !== currentSubmenu && sub.style.maxHeight) {
                sub.style.maxHeight = null;
            }
        });
        
        // Alterna el estado del submenú actual (abierto o cerrado)
        currentSubmenu.style.maxHeight = currentSubmenu.style.maxHeight ? null : `${currentSubmenu.scrollHeight}px`;
    };

    /**
     * Aplica la clase 'active' al enlace seleccionado y a su elemento de menú principal (si aplica).
     * @param {HTMLElement} activeLink El enlace de menú o submenú que debe estar activo.
     */
    const setActiveState = (activeLink) => {
        removeAllActiveStates();
        
        activeLink.classList.add('active');
        
        // Si es un elemento de submenú, activa también a su padre
        if (activeLink.classList.contains('submenu-item')) {
            const parentMenu = activeLink.closest('.has-submenu');
            if (parentMenu) {
                parentMenu.classList.add('active');
            }
        }
    };

    // --- Manejadores de Eventos ---
    
    // 1. Lógica de Alternancia de Submenús (Acordeón)
    document.querySelectorAll('.menu-item.has-submenu').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const submenu = this.nextElementSibling;
            
            // Asegúrate de que el siguiente elemento sea realmente un submenú
            if (submenu && submenu.classList.contains('submenu')) {
                toggleSubmenu(submenu);
            }
        });
    });

    // 2. Control de Navegación y Estado Activo al Hacer Clic
    document.querySelectorAll('.menu-item, .submenu-item').forEach(link => {
        link.addEventListener('click', function(e) {
            const url = this.getAttribute('href');
            
            // Ignorar enlaces vacíos, anclas (#) o cierre de sesión
            if (!url || url === "#" || url.startsWith("/logout")) return;
            
            e.preventDefault(); // Detener la navegación predeterminada del enlace
            
            setActiveState(this);
            window.location.href = url; // Navegar manualmente después de establecer el estado activo
        });
    });

    // --- Inicialización: Estado Activo al Cargar la Página ---

    /**
     * Establece el estado del menú activo basándose en la ruta URL actual.
     */
    const updateActiveMenuBasedOnUrl = () => {
        const currentPath = window.location.pathname;

        document.querySelectorAll('.menu-item, .submenu-item').forEach(item => {
            const itemUrl = item.getAttribute('href');
            
            // Usamos una comparación de igualdad precisa después de limpiar el path base
            const cleanItemUrl = itemUrl ? itemUrl.replace('/dashboard', '') : '';
            const cleanCurrentPath = currentPath.replace('/dashboard', '');

            if (itemUrl && cleanCurrentPath === cleanItemUrl) {
                setActiveState(item); // Usa la función centralizada para activar
                
                // Abrir el submenú padre si el elemento activo es un submenú
                if (item.classList.contains('submenu-item')) {
                    const parentMenu = item.closest('.has-submenu');
                    const submenu = parentMenu ? parentMenu.nextElementSibling : null;
                    
                    if (submenu && submenu.classList.contains('submenu')) {
                         // Abrir el submenú directamente (no usar toggle)
                         submenu.style.maxHeight = `${submenu.scrollHeight}px`;
                    }
                }
            }
        });
    };

    // Ejecutar la función de inicialización
    updateActiveMenuBasedOnUrl();
});