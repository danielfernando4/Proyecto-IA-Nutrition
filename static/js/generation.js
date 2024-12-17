<<<<<<< HEAD
/*async function getInformation() {
  try {
    const response = await fetch("/generation");

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error en el POST:", response.statusText);
      });
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
=======
>>>>>>> 2d03b5dbc461b51d28017e1afd45ee236752b164
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("generationForm");
  const submitButton = document.getElementById("submitButton");

  const postContainer = document.querySelector(".recipe-cards");

  const tarjetasRenderizadas = {};
  const diasSemana = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  let recetaIndex = 0; // Controla la asignación de días

  submitButton.addEventListener("click", () => {
    const formData = {
      peso: form.elements["peso"].value,
      edad: form.elements["edad"].value,
      altura: form.elements["altura"].value,
      sexo: form.elements["sexo"].value,
    };

    fetch("/generation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error en la solicitud");
        return response.json();
      })
      .then((data) => {
        console.log("Respuesta del servidor:", data);

        const recetas = data.map((comida) => ({
          nombre_comida: comida.nombre_comida || "No disponible",
          url_imagen: comida.url_imagen || "No disponible",
          calorias: comida.calorias || 0,
          proteinas: comida.proteinas || 0,
        }));

        postMethods(recetas);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  const postMethods = (recetas) => {
    postContainer.innerHTML = ""; // Limpiar contenedor

    recetas.forEach((postData) => {
      const card = document.createElement("div");
      card.classList.add("recipe-card", "bounce-in-top");

      card.innerHTML = `
        <div class="recipe-card-content">
          <img src="${postData.url_imagen}.jpg" alt="${
        postData.nombre_comida
      }" class="recipe-card-image" />
          <h3 class="recipe-card-title">${postData.nombre_comida}</h3>
          <p class="recipe-card-description">Calorías: ${postData.calorias.toFixed(
            2
          )} | Proteínas: ${postData.proteinas}</p>
        </div>
      `;

      postContainer.appendChild(card);

      // Asignar la receta al día de la semana
      const diaAsignado = diasSemana[recetaIndex % diasSemana.length];
      tarjetasRenderizadas[diaAsignado] = postData.nombre_comida;
      recetaIndex++; // Incrementar índice para el siguiente día
    });

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("recipe-card-footer");

    buttonContainer.innerHTML = `
      <button class="btn-ready" id="agregarAPlan">Agregar al plan</button>
    `;

<<<<<<< HEAD
    
      // Añadir la tarjeta al contenedor
      postContainer.appendChild(card);
    });
  };
});
const enviarDatos = () => {
  document.addEventListener("DOMContentLoaded", () => {
    // Seleccionar el formulario y el botón
    const plan = document.getElementById("agregarAPlan");
  
    // Contenedor donde se mostrarán las tarjetas
    const postContainer = document.querySelector(".recipe-cards");
  
    // Escuchar el evento de clic del botón
    plan.addEventListener("click", () => {
      // Crear un objeto para almacenar los datos del formulario
      const planNutricional = {};
  
      // Leer los valores de los campos de entrada
      const pesop = form.elements["peso"].value;
      const edad = form.elements["edad"].value;
      const altura = form.elements["altura"].value;
      const sexo = form.elements["sexo"].value;
  
      // Guardar los valores en el objeto
      formData.peso = peso;
      formData.edad = edad;
      formData.altura = altura;
      formData.sexo = sexo;
  
      // Enviar los datos al endpoint /generation
      fetch("/generation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(planNutricional),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error en la solicitud");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Respuesta del servidor:", data);
  
          // Aquí obtenemos las comidas que nos retorna el servidor
          const recetas = data.map((comida) => ({
            nombre_comida: comida.nombre_comida || "No disponible",
            url_imagen: comida.url_imagen || "No disponible",
            calorias: comida.calorias || 0,
            proteinas: comida.proteinas || 0,
          }));

          postContainer.innerHTML = ""; 
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  });
}
=======
    postContainer.appendChild(buttonContainer);

    const agregarAPlanButton = document.getElementById("agregarAPlan");
    agregarAPlanButton.addEventListener("click", enviarTarjetasABaseDeDatos);
  };

  const enviarTarjetasABaseDeDatos = () => {
    console.log("Tarjetas a enviar:", tarjetasRenderizadas);
    fetch("/guardar_tarjetas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tarjetasRenderizadas),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al guardar las tarjetas");
        return response.json();
      })
      .then((result) => {
        console.log("Tarjetas guardadas exitosamente:", result);
        alert("Las tarjetas se guardaron correctamente en la base de datos.");
      })
      .catch((error) => {
        console.error("Error al guardar las tarjetas:", error);
      });
  };
});
>>>>>>> 2d03b5dbc461b51d28017e1afd45ee236752b164
