document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const colorPicker = document.getElementById("colorPicker");
    const table = document.querySelector(".table"); // Obtén la tabla

    // Cambiar el color de la tabla cuando se selecciona un nuevo color
    colorPicker.addEventListener("input", function () {
        const selectedColor = colorPicker.value; // Obtén el color seleccionado
        table.style.backgroundColor = selectedColor; // Cambia el color de fondo de la tabla
    });
    
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
        const clock = document.getElementById("digitalClock"); // Obtén el reloj

        // Cambiar el color de la barra de navegación
        if (document.body.classList.contains("dark-mode")) {
            navbar.classList.add("navbar-dark-mode");
            toggleThemeButton.textContent = "Modo Claro";
            clock.classList.add("clock-dark-mode"); // Agrega la clase para el reloj
        } else {
            navbar.classList.remove("navbar-dark-mode");
            toggleThemeButton.textContent = "Modo Oscuro";
            clock.classList.remove("clock-dark-mode"); // Elimina la clase para el reloj
        }

        // Cambiar el color de la tabla
        if (table) {
            table.classList.toggle("table-dark-mode");
        }
    });

    // Funcionalidad para agrandar la imagen al hacer clic
    const carouselImages = document.querySelectorAll('.carousel-item img');
    const modalImage = document.getElementById('modalImage');

    carouselImages.forEach(image => {
        image.addEventListener('click', function () {
            modalImage.src = this.src; // Establece la fuente de la imagen en el modal
        });
    });

    // Funcionalidad para cambiar las imágenes del carrusel dinámicamente
    const changeImagesButton = document.getElementById('changeImages');
    const newImages = [
        '../media/imagen-Cambiar1.png',
        '../media/imagen-Cambiar2.png',
        '../media/imagen-Cambiar3.png'
    ];

    changeImagesButton.addEventListener('click', function () {
        const carouselItems = document.querySelectorAll('.carousel-item');
        carouselItems.forEach((item, index) => {
            const img = item.querySelector('img');
            if (newImages[index]) {
                img.src = newImages[index]; // Cambia la fuente de la imagen
                img.alt = `Nueva Imagen ${index + 1}`; // Cambia el texto alternativo
            }
        });
    });

    // Funcionalidad para reiniciar el carrusel a las imágenes originales
    const originalImages = [
        '../media/playas1.jpg',
        '../media/fotografia.jpg',
        '../media/Montañas1.jpg'
    ];

    const resetCarouselButton = document.getElementById('resetCarousel');
    resetCarouselButton.addEventListener('click', function () {
        const carouselItems = document.querySelectorAll('.carousel-item');
        carouselItems.forEach((item, index) => {
            const img = item.querySelector('img');
            if (originalImages[index]) {
                img.src = originalImages[index]; // Cambia la fuente de la imagen a la original
                img.alt = `Imagen Original ${index + 1}`; // Cambia el texto alternativo
            }
        });
    });

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Mes empieza en 0
        const day = String(now.getDate()).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;

        document.getElementById('time').textContent = timeString;
        document.getElementById('date').textContent = dateString;
    }

    // Actualiza el reloj cada segundo
    setInterval(updateClock, 1000);
    // Llama a la función una vez para que el reloj se muestre inmediatamente
    updateClock();
});

// Obtener el selector de color
const colorPicker = document.getElementById("colorPicker");
const table = document.querySelector(".table"); // Obtén la tabla

// Cambiar el color de la tabla cuando se selecciona un nuevo color
colorPicker.addEventListener("input", function () {
    const selectedColor = colorPicker.value; // Obtén el color seleccionado
    table.style.backgroundColor = selectedColor; // Cambia el color de fondo de la tabla
});
