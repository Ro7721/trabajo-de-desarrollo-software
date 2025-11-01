function checkPasswordStrength(password) {
    const strengthBar = document.getElementById('password-strength-bar');
    const reqLength = document.getElementById('req-length');
    const reqUpper = document.getElementById('req-upper');
    const reqLower = document.getElementById('req-lower');
    const reqNumber = document.getElementById('req-number');

    // Reset classes
    reqLength.classList.remove('met');
    reqUpper.classList.remove('met');
    reqLower.classList.remove('met');
    reqNumber.classList.remove('met');
    strengthBar.style.width = '0%';
    strengthBar.style.backgroundColor = '#e9ecef';

    let strength = 0;

    // Check length
    if (password.length >= 8) {
        reqLength.classList.add('met');
        strength += 25;
    }

    // Check uppercase
    if (/[A-Z]/.test(password)) {
        reqUpper.classList.add('met');
        strength += 25;
    }

    // Check lowercase
    if (/[a-z]/.test(password)) {
        reqLower.classList.add('met');
        strength += 25;
    }

    // Check number
    if (/[0-9]/.test(password)) {
        reqNumber.classList.add('met');
        strength += 25;
    }

    // Update strength bar
    strengthBar.style.width = strength + '%';
    if (strength <= 25) {
        strengthBar.style.backgroundColor = '#dc3545';
    } else if (strength <= 50) {
        strengthBar.style.backgroundColor = '#ffc107';
    } else if (strength <= 75) {
        strengthBar.style.backgroundColor = '#17a2b8';
    } else {
        strengthBar.style.backgroundColor = '#28a745';
    }
}

function checkPasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorDiv = document.getElementById('password-match-error');
    const submitBtn = document.getElementById('submit-btn');

    if (password !== confirmPassword) {
        errorDiv.style.display = 'block';
        submitBtn.disabled = true;
    } else {
        errorDiv.style.display = 'none';
        submitBtn.disabled = false;
    }
}

// Validación de DNI (solo números)
document.addEventListener('DOMContentLoaded', function() {
    const dniInput = document.querySelector('input[th\\:field*="nroDocumento"]');
    if (dniInput) {
        dniInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    // Establecer fecha máxima (hoy - 18 años)
    const fechaInput = document.querySelector('input[type="date"]');
    if (fechaInput) {
        const today = new Date();
        const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
        const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        fechaInput.min = minDate.toISOString().split('T')[0];
        fechaInput.max = maxDate.toISOString().split('T')[0];
    }

    // Mostrar mensaje de error si existe
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    if (errorText.textContent.trim() !== '') {
        errorMessage.style.display = 'block';
    }
});

// Validación del formulario antes de enviar
document.getElementById('usuarioForm').addEventListener('submit', function(e) {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const rolSelected = document.querySelector('select[th\\:field*="rol"]').value;
    const sexoSelected = document.querySelector('select[th\\:field*="sexo"]').value;

    if (!sexoSelected) {
        e.preventDefault();
        showError('Por favor, seleccione el sexo');
        return;
    }

    if (!rolSelected) {
        e.preventDefault();
        showError('Por favor, seleccione un rol');
        return;
    }

    if (password !== confirmPassword) {
        e.preventDefault();
        showError('Las contraseñas no coinciden');
        return;
    }
});

function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    errorText.textContent = message;
    errorMessage.style.display = 'block';
    
    // Scroll to error message
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}