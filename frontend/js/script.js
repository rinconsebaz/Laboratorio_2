document.addEventListener('DOMContentLoaded', function() {
    // URL de la API
    const apiUrl = 'http://localhost:8000/api';

    // Cargar empleados y prioridades al cargar la página
    fetchEmployees();
    fetchPriorities();

    // Cargar tareas al cargar la página
    fetchTasks();

    // Crear tarea al enviar el formulario
    document.getElementById('create-task-form').addEventListener('submit', function(event) {
        event.preventDefault();
        createTask();
    });

    // Filtrar tareas al enviar el formulario
    document.getElementById('filter-task-form').addEventListener('submit', function(event) {
        event.preventDefault();
        fetchFilteredTasks();
    });

    function fetchEmployees() {
        fetch(`${apiUrl}/empleados`)
            .then(response => response.json())
            .then(data => {
                const select = document.getElementById('idEmpleado');
                select.innerHTML = '';
                data.forEach(empleado => {
                    const option = document.createElement('option');
                    option.value = empleado.id;
                    option.textContent = empleado.nombre;
                    select.appendChild(option);
                });
            });
    }

    function fetchPriorities() {
        fetch(`${apiUrl}/prioridades`)
            .then(response => response.json())
            .then(data => {
                const select = document.getElementById('idPrioridad');
                const filterSelect = document.getElementById('filterPrioridad');
                select.innerHTML = '';
                filterSelect.innerHTML = '';
                data.forEach(prioridad => {
                    const option = document.createElement('option');
                    option.value = prioridad.id;
                    option.textContent = prioridad.nombre;
                    select.appendChild(option);
                    filterSelect.appendChild(option.cloneNode(true));
                });
            });
    }

    function fetchTasks() {
        fetch(`${apiUrl}/tareas`)
            .then(response => response.json())
            .then(displayTasks);
    }

    function displayTasks(tasks) {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            if (task.idEstado === 4) { // 4 es 'En impedimento'
                taskDiv.classList.add('impedimento');
            }
            taskDiv.innerHTML = `
                <h3>${task.titulo}</h3>
                <p>${task.descripcion}</p>
                <p>Responsable: ${task.empleado.nombre}</p>
                <p>Prioridad: ${task.prioridad.nombre}</p>
                <p>Estado: ${task.estado.nombre}</p>
            `;
            taskList.appendChild(taskDiv);
        });
    }

    function createTask() {
        const form = document.getElementById('create-task-form');
        const formData = new FormData(form);
        fetch(`${apiUrl}/tareas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
        })
        .then(response => {
            if (response.ok) {
                fetchTasks();
                form.reset();
            } else {
                alert('Error al crear la tarea');
            }
        });
    }

    function fetchFilteredTasks() {
        const form = document.getElementById('filter-task-form');
        const formData = new FormData(form);
        const params = new URLSearchParams(Object.fromEntries(formData));
        fetch(`${apiUrl}/tareas?${params.toString()}`)
            .then(response => response.json())
            .then(displayTasks);
    }
});
