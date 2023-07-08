fetch('/js_json/smartphones.json')
  .then(response => response.json())
  .then(data => {
    const smartphoneList = document.getElementById('smartphone-list');

    data.smartphones.forEach(smartphone => {
      if (smartphone.destacado === true) {
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

        // Agregar evento de clic al enlace del celular
        enlace.addEventListener('click', (event) => {
          // Evitar que se siga el enlace por defecto
          event.preventDefault();
          // Redirigir a la página específica del celular
          window.location.href = enlace.href;
        });

        smartphoneList.appendChild(smartphoneContainer);
      }
    });
  })
  .catch(error => console.log(error));
