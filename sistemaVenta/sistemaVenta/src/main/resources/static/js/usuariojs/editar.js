

// Toggle para cambiar contraseña
document.getElementById('cambiarPasswordToggle')?.addEventListener('change', function() {
    const passwordFields = document.getElementById('passwordFields');
    if (this.checked) {
        passwordFields.style.display = 'block';
    } else {
        passwordFields.style.display = 'none';
        // Limpiar campos de contraseña
        document.getElementById('nuevaPassword').value = '';
        document.getElementById('confirmarPassword').value = '';
        document.getElementById('passwordMatchError').style.display = 'none';
    }
});

// Validación de coincidencia de contraseñas
document.getElementById('confirmarPassword')?.addEventListener('input', function() {
    const nuevaPassword = document.getElementById('nuevaPassword').value;
    const confirmarPassword = this.value;
    const errorElement = document.getElementById('passwordMatchError');
    const submitBtn = document.getElementById('submit-btn');

    if (confirmarPassword && nuevaPassword !== confirmarPassword) {
        errorElement.style.display = 'block';
        submitBtn.disabled = true;
    } else {
        errorElement.style.display = 'none';
        submitBtn.disabled = false;
    }
});

// Validación del formulario antes de enviar
document.getElementById('usuarioEditForm')?.addEventListener('submit', function(e) {
    const cambiarPassword = document.getElementById('cambiarPasswordToggle').checked;
    
    if (cambiarPassword) {
        const nuevaPassword = document.getElementById('nuevaPassword').value;
        const confirmarPassword = document.getElementById('confirmarPassword').value;
        
        if (nuevaPassword && nuevaPassword !== confirmarPassword) {
            e.preventDefault();
            alert('Las contraseñas no coinciden');
            return false;
        }
        
        // Validar fortaleza de contraseña si se está cambiando
        if (nuevaPassword && nuevaPassword.length > 0) {
            const hasUpper = /[A-Z]/.test(nuevaPassword);
            const hasLower = /[a-z]/.test(nuevaPassword);
            const hasNumber = /[0-9]/.test(nuevaPassword);
            const hasMinLength = nuevaPassword.length >= 8;
            
            const metRequirements = [hasUpper, hasLower, hasNumber, hasMinLength].filter(Boolean).length;
            if (metRequirements < 2) {
                e.preventDefault();
                alert('La nueva contraseña es demasiado débil. Debe cumplir al menos 2 de los 4 requisitos.');
                return false;
            }
        }
    }
});

// Inicializar tooltips de Bootstrap si están disponibles
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});