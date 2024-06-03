// JavaScript para cargar dinámicamente los empleados, estados y prioridades desde el backend

// Función para cargar los empleados desde el backend y llenar el selector correspondiente
function cargarEmpleados() {
    fetch('http://localhost:8000/api/empleados')
        .then(response => response.json())
        .then(data => {
            const selectEmpleado = document.getElementById('idEmpleado');
            selectEmpleado.innerHTML = ''; // Limpiar el selector antes de agregar las opciones
            data.forEach(empleado => {
                const option = document.createElement('option');
                option.value = empleado.id;
                option.textContent = empleado.nombre;
                selectEmpleado.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar los empleados:', error));
}

// Función para cargar los estados desde el backend y llenar el selector correspondiente
function cargarEstados() {
    fetch('http://localhost:8000/api/estados')
        .then(response => response.json())
        .then(data => {
            const selectEstado = document.getElementById('idEstado');
            selectEstado.innerHTML = ''; // Limpiar el selector antes de agregar las opciones
            data.forEach(estado => {
                const option = document.createElement('option');
                option.value = estado.id;
                option.textContent = estado.nombre;
                selectEstado.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar los estados:', error));
}

// Función para cargar las prioridades desde el backend y llenar el selector correspondiente
function cargarPrioridades() {
    fetch('http://localhost:8000/api/prioridades')
        .then(response => response.json())
        .then(data => {
            const selectPrioridad = document.getElementById('idPrioridad');
            selectPrioridad.innerHTML = ''; // Limpiar el selector antes de agregar las opciones
            data.forEach(prioridad => {
                const option = document.createElement('option');
                option.value = prioridad.id;
                option.textContent = prioridad.nombre;
                selectPrioridad.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar las prioridades:', error));
}

// Llamar a las funciones para cargar los datos al cargar la página
window.onload = function() {
    cargarEmpleados();
    cargarEstados();
    cargarPrioridades();
};

// JavaScript para enviar datos del formulario al backend y crear una nueva tarea

// Función para enviar los datos del formulario al backend
function crearTarea(event) {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario

    const formData = new FormData(document.getElementById('formulario-tarea'));
    const tareaData = {
        titulo: formData.get('titulo'),
        descripcion: formData.get('descripcion'),
        fechaEstimadaFinalizacion: formData.get('fechaEstimadaFinalizacion'),
        creadorTarea: formData.get('creadorTarea'),
        idEmpleado: formData.get('idEmpleado'),
        idEstado: formData.get('idEstado'),
        idPrioridad: formData.get('idPrioridad'),
        observaciones: formData.get('observaciones')
    };

    fetch('http://localhost:8000/api/tareas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tareaData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al crear la tarea.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Tarea creada exitosamente:', data);
        // Aquí podrías redirigir al usuario a otra página o mostrar un mensaje de éxito
    })
    .catch(error => {
        console.error('Error al crear la tarea:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
    });
}

// Escuchar el evento submit del formulario y llamar a la función para crear la tarea
document.getElementById('formulario-tarea').addEventListener('submit', crearTarea);

