document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    // Botón para limpiar el formulario
    const clearFormButton = document.getElementById("clearFormButton");
    clearFormButton.addEventListener("click", function () {
        form.reset(); // Limpia los campos del formulario

        // Mostrar el Toast de limpieza
        const toastLimpiarEl = document.getElementById("toastLimpiar");
        const toastLimpiar = new bootstrap.Toast(toastLimpiarEl, { delay: 3000 });
        toastLimpiar.show();
    });

    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const dateField = document.getElementById("date");
    const termsCheckbox = document.getElementById("terms");
    const subscribeCheckbox = document.getElementById("subscribe");

    // Contenedores de error
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const dateError = document.getElementById("dateError");
    const checkboxError = document.getElementById("checkboxError");

    // Validaciones personalizadas
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita el envío del formulario si hay errores
        let isValid = true;

        // Validar nombre (sin números ni caracteres especiales)
        const nameValue = nameField.value.trim();
        if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/.test(nameValue)) {
            nameError.classList.remove("d-none");
            isValid = false;
        } else {
            nameError.classList.add("d-none");
        }

        // Validar correo electrónico (formato correcto)
        const emailValue = emailField.value.trim();
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailValue)) {
            emailError.classList.remove("d-none");
            isValid = false;
        } else {
            emailError.classList.add("d-none");
        }

        // Validar fecha (debe ser futura)
        const dateValue = new Date(dateField.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Asegura que se compara solo la fecha, sin tiempo
        if (isNaN(dateValue) || dateValue <= today) {
            dateError.classList.remove("d-none");
            isValid = false;
        } else {
            dateError.classList.add("d-none");
        }

        // Validar al menos un checkbox seleccionado
        if (!termsCheckbox.checked && !subscribeCheckbox.checked) {
            checkboxError.classList.remove("d-none");
            isValid = false;
        } else {
            checkboxError.classList.add("d-none");
        }

        // Si todo es válido, muestra el toast de éxito
        if (isValid) {
            const toastEnviarEl = document.getElementById("toastEnviar");
            const toastEnviar = new bootstrap.Toast(toastEnviarEl, { delay: 4500 });
            toastEnviar.show();

            form.reset(); // Limpia los campos
        }
    });

    // Funcionalidad de Modo Oscuro/Claro
    const toggleThemeButton = document.getElementById("toggleTheme");
    toggleThemeButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        const navbar = document.querySelector(".navbar");
        const table = document.querySelector(".table");

        // Cambiar el color de la barra de navegación
        if (document.body.classList.contains("dark-mode")) {
            navbar.classList.add("navbar-dark-mode");
            toggleThemeButton.textContent = "Modo Claro";
        } else {
            navbar.classList.remove("navbar-dark-mode");
            toggleThemeButton.textContent = "Modo Oscuro";
        }

        // Cambiar el color de la tabla
        if (table) {
            table.classList.toggle("table-dark-mode");
        }
    });
});