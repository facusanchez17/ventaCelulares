fetch('js_json/smartphones.json')
  .then(response => response.json())
  .then(data => {
    const smartphoneList = document.getElementById('smartphone-list');

    function mostrarSeleccion() {
        var dropdown = document.getElementById("marcaFiltrada");
        var opcionSeleccionada = dropdown.value.toUpperCase();
        mostrarCelulares(opcionSeleccionada);
    }
    document.getElementById("marcaFiltrada").addEventListener("change", mostrarSeleccion);
      
    function mostrarCelulares(opcionSeleccionada){
        smartphoneList.innerHTML = ""; // Limpiar la lista antes de mostrar los celulares filtrados

        data.smartphones.forEach(smartphone => {
            const smartphoneContainer = document.createElement('div');
            smartphoneContainer.classList.add('smartphone-container', 'col-lg-4', 'col-md-6', 'col-sm-12');
    
            const image = document.createElement('img');
            image.src = smartphone.imagen;
            image.alt = smartphone.nombre;
            image.classList.add('smartphone-image', 'mx-auto'); // Agrega la clase 'mx-auto' para centrar horizontalmente la imagen
    
    
            const name = document.createElement('h3');
            name.classList.add('smartphone-name');
            name.textContent = smartphone.nombre;
    
            const enlace = document.createElement('a');
            enlace.href = smartphone.pagina;
            enlace.appendChild(image);
            enlace.appendChild(name);
    
            smartphoneContainer.appendChild(enlace);
    
            const info = document.createElement('div');
            info.classList.add('smartphone-details');
    
            const price = document.createElement('div');
            price.classList.add('smartphone-price');
            price.textContent = `Precio: ${smartphone.precio}`;
            info.appendChild(price);
    
            const specs = document.createElement('div');
            specs.classList.add('smartphone-specs');
            specs.textContent = `Especificaciones: ${smartphone.especificaciones}`;
            info.appendChild(specs);
    
            smartphoneContainer.appendChild(info);

            // Verificar si la opción seleccionada es "todos" o no se ha seleccionado ninguna opción
            if (opcionSeleccionada === "TODOS" || opcionSeleccionada === "") {
                smartphoneList.appendChild(smartphoneContainer);
            } else {
                // Verificar si el nombre del celular contiene la opción seleccionada
                if (smartphone.nombre.toUpperCase().includes(opcionSeleccionada)) {
                    smartphoneList.appendChild(smartphoneContainer);
                }
            }
        });
    }

    // Mostrar todos los celulares inicialmente
    mostrarCelulares("");

    // Obtén referencias a los botones de ordenamiento
const ordenarAscendenteBtn = document.getElementById('ordenarAscendente');
const ordenarDescendenteBtn = document.getElementById('ordenarDescendente');

// Agrega un evento de clic al botón de ordenamiento ascendente
ordenarAscendenteBtn.addEventListener('click', () => {
  ordenarCelulares('ascendente');
});

// Agrega un evento de clic al botón de ordenamiento descendente
ordenarDescendenteBtn.addEventListener('click', () => {
  ordenarCelulares('descendente');
});

// Función para ordenar los celulares
function ordenarCelulares(orden) {
  // Obtiene la lista de celulares
  const smartphoneList = document.getElementById('smartphone-list');

  // Convierte la lista de celulares en un array para poder ordenarlos
  const celulares = Array.from(smartphoneList.children);

  // Ordena los celulares según el precio
  celulares.sort((a, b) => {
    const precioA = obtenerPrecioCelular(a);
    const precioB = obtenerPrecioCelular(b);

    if (orden === 'ascendente') {
      return precioA - precioB;
    } else {
      return precioB - precioA;
    }
  });

  // Elimina los celulares existentes de la lista
  while (smartphoneList.firstChild) {
    smartphoneList.removeChild(smartphoneList.firstChild);
  }

  // Agrega los celulares ordenados a la lista
  celulares.forEach((celular) => {
    smartphoneList.appendChild(celular);
  });
}

// Función para obtener el precio de un celular
function obtenerPrecioCelular(celular) {
  const precioText = celular.querySelector('.smartphone-price').textContent;
  const precio = parseInt(precioText.replace(/\D/g, ''));
  return precio;
}

  })
  .catch(error => console.log(error));
