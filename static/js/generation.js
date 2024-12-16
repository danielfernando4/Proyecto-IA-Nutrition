/*async function getInformation() {
  try {
    const response = await fetch("/generation");

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error en el POST:", response.statusText);
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}
const recetasfinal = getInformation();
const postContainer = document.querySelector(".recipe-cards");

const postMethods = (recetas) => {
  postContainer.innerHTML = "";
  recetasfinal.map((postData) => {
    // Crear un elemento HTML para cada receta

    const card = document.createElement("div");
    card.classList.add("recipe-card", "bounce-in-top");

    // Agregar contenido a la tarjeta
    card.innerHTML = `
    <div class = "recipe-card-content">
      <img src="${postData.image}" alt="${postData.title}" class = "recipe-card" />
      
        <h3 class="recipe-card-title">${postData.title}</h3>
        
        <div class="recipe-card-footer">
          <button class="btn-ready" onclick = desvanecer() >Agregar a plan</button>
      </div>
    </div>
  `;
    // Añadir la tarjeta al contenedor

    postContainer.appendChild(card);
  });
};
*/












/*
// Esperar a que el DOM cargue completamente
document.addEventListener('DOMContentLoaded', () => {
  // Seleccionar el formulario y el botón
  const form = document.getElementById('generationForm');
  const submitButton = document.getElementById('submitButton');

  // Escuchar el evento de clic del botón
  submitButton.addEventListener('click', () => {
      // Crear un objeto para almacenar los datos del formulario
      const formData = {};

      // Leer los valores de los campos de entrada
      const peso = form.elements['peso'].value;
      const edad = form.elements['edad'].value;
      const altura = form.elements['altura'].value;
      const sexo = form.elements['sexo'].value;

      // Guardar los valores en el objeto
      formData.peso = peso;
      formData.edad = edad;
      formData.altura = altura;
      formData.sexo = sexo;

      // Mostrar los valores en un cuadro de diálogo
      alert(`Peso: ${formData.peso} kg\nEdad: ${formData.edad}\nAltura: ${formData.altura} cm\nSexo: ${formData.sexo}`);
  });
});
*/





















//ESTA SI ME EJECUTA EL POST TODO BIEN
/*

// Esperar a que el DOM cargue completamente
document.addEventListener('DOMContentLoaded', () => {
  // Seleccionar el formulario y el botón
  const form = document.getElementById('generationForm');
  const submitButton = document.getElementById('submitButton');

  // Escuchar el evento de clic del botón
  submitButton.addEventListener('click', () => {
      // Crear un objeto para almacenar los datos del formulario
      const formData = {};

      // Leer los valores de los campos de entrada
      const peso = form.elements['peso'].value;
      const edad = form.elements['edad'].value;
      const altura = form.elements['altura'].value;
      const sexo = form.elements['sexo'].value;

      // Guardar los valores en el objeto
      formData.peso = peso;
      formData.edad = edad;
      formData.altura = altura;
      formData.sexo = sexo;

      // Mostrar los valores en un cuadro de diálogo
      alert(`Peso: ${formData.peso} kg\nEdad: ${formData.edad}\nAltura: ${formData.altura} cm\nSexo: ${formData.sexo}`);

      // Enviar los datos al endpoint /generation
      fetch('/generation', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Error en la solicitud');
          }
          return response.json();
      })
      .then(data => {
          console.log('Respuesta del servidor:', data);
      })
      .catch(error => {
          console.error('Error:', error);
      });
  });
});
*/


















/*
//ESTE RETORNA EL JSON

// Esperar a que el DOM cargue completamente
document.addEventListener('DOMContentLoaded', () => {
  // Seleccionar el formulario y el botón
  const form = document.getElementById('generationForm');
  const submitButton = document.getElementById('submitButton');

  // Escuchar el evento de clic del botón
  submitButton.addEventListener('click', () => {
      // Crear un objeto para almacenar los datos del formulario
      const formData = {};

      // Leer los valores de los campos de entrada
      const peso = form.elements['peso'].value;
      const edad = form.elements['edad'].value;
      const altura = form.elements['altura'].value;
      const sexo = form.elements['sexo'].value;

      // Guardar los valores en el objeto
      formData.peso = peso;
      formData.edad = edad;
      formData.altura = altura;
      formData.sexo = sexo;

      // Mostrar los valores en un cuadro de diálogo
      alert(`Peso: ${formData.peso} kg\nEdad: ${formData.edad}\nAltura: ${formData.altura} cm\nSexo: ${formData.sexo}`);

      // Enviar los datos al endpoint /generation
      fetch('/generation', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Error en la solicitud');
          }
          return response.json();
      })
      .then(data => {
          console.log('Respuesta del servidor:', data);
          
          // Mostrar los valores del JSON en un cuadro de diálogo
          alert(`Respuesta del servidor:\n${JSON.stringify(data, null, 2)}`);
      })
      .catch(error => {
          console.error('Error:', error);
      });
  });
});
*/












/*
// Esperar a que el DOM cargue completamente
document.addEventListener('DOMContentLoaded', () => {
  // Seleccionar el formulario y el botón
  const form = document.getElementById('generationForm');
  const submitButton = document.getElementById('submitButton');

  // Escuchar el evento de clic del botón
  submitButton.addEventListener('click', () => {
      // Crear un objeto para almacenar los datos del formulario
      const formData = {};

      // Leer los valores de los campos de entrada
      const peso = form.elements['peso'].value;
      const edad = form.elements['edad'].value;
      const altura = form.elements['altura'].value;
      const sexo = form.elements['sexo'].value;

      // Guardar los valores en el objeto
      formData.peso = peso;
      formData.edad = edad;
      formData.altura = altura;
      formData.sexo = sexo;

      // Mostrar los valores en un cuadro de diálogo
      alert(`Peso: ${formData.peso} kg\nEdad: ${formData.edad}\nAltura: ${formData.altura} cm\nSexo: ${formData.sexo}`);

      // Enviar los datos al endpoint /generation
      fetch('/generation', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Error en la solicitud');
          }
          return response.json();
      })
      .then(data => {
          console.log('Respuesta del servidor:', data);

          // Iterar sobre el array de comidas y mostrar el nombre_comida y url_imagen
          let dialogContent = 'Comidas:\n';
          data.forEach(comida => {
              const nombreComida = comida.nombre_comida || 'No disponible';
              const urlImagen = comida.url_imagen || 'No disponible';
              dialogContent += `\nNombre de la comida: ${nombreComida}\nURL de la imagen: ${urlImagen}\n`;
          });

          // Mostrar el contenido del cuadro de diálogo
          alert(dialogContent);
      })
      .catch(error => {
          console.error('Error:', error);
      });
  });
});
*/

















// Suponiendo que el servidor te retorna un array de objetos con 'nombre_comida' y 'url_imagen'
document.addEventListener('DOMContentLoaded', () => {
  // Seleccionar el formulario y el botón
  const form = document.getElementById('generationForm');
  const submitButton = document.getElementById('submitButton');

  // Contenedor donde se mostrarán las tarjetas
  const postContainer = document.querySelector(".recipe-cards");

  // Escuchar el evento de clic del botón
  submitButton.addEventListener('click', () => {
      // Crear un objeto para almacenar los datos del formulario
      const formData = {};

      // Leer los valores de los campos de entrada
      const peso = form.elements['peso'].value;
      const edad = form.elements['edad'].value;
      const altura = form.elements['altura'].value;
      const sexo = form.elements['sexo'].value;

      // Guardar los valores en el objeto
      formData.peso = peso;
      formData.edad = edad;
      formData.altura = altura;
      formData.sexo = sexo;

      // Enviar los datos al endpoint /generation
      fetch('/generation', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Error en la solicitud');
          }
          return response.json();
      })
      .then(data => {
          console.log('Respuesta del servidor:', data);

          // Aquí obtenemos las comidas que nos retorna el servidor
          const recetas = data.map(comida => ({
            nombre_comida: comida.nombre_comida || 'No disponible',
            url_imagen: comida.url_imagen || 'No disponible',
            calorias: comida.calorias || 0,
            proteinas: comida.proteinas || 0
          }));

          // Llamar a la función para renderizar las tarjetas
          postMethods(recetas);
      })
      .catch(error => {
          console.error('Error:', error);
      });
  });

  // Función para renderizar las tarjetas
  const postMethods = (recetas) => {
    postContainer.innerHTML = ""; // Limpiar contenedor

    // Iterar sobre las recetas
    recetas.forEach((postData) => {
      // Crear un elemento HTML para cada receta
      const card = document.createElement("div");
      card.classList.add("recipe-card", "bounce-in-top");

      card.innerHTML = `
      <div class="recipe-card-content">
        <img src="${postData.url_imagen}.jpg" alt="${postData.nombre_comida}" class="recipe-card-image" />
        <h3 class="recipe-card-title">${postData.nombre_comida}</h3>
        <p class="recipe-card-description">Calorías: ${postData.calorias.toFixed(2)} | Proteínas: ${postData.proteinas}</p>
        <div class="recipe-card-footer">
          <button class="btn-ready" onclick="desvanecer()">Agregar a plan</button>
        </div>
      </div>
    `;
      // Añadir la tarjeta al contenedor
      postContainer.appendChild(card);
    });
  };
});

