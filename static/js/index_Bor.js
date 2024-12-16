const platos = [
  {
    nombre: 'Panqueques de Plátano',
    imagen: '/static/images/comida1.jpg',
    dia: 'Lunes',
    propiedades: ['Proteínas: 20g', 'Grasas: 10g', 'Calorías: 350'],
    ingredientes: ['Ingrediente 1', 'Ingrediente 2', 'Ingrediente 3'],
    descripcion: 'Deliciosos panqueques hechos con plátanos frescos y otros ingredientes naturales.'
  },
  {
    nombre: 'Avena con Frutas y Miel',
    imagen: '/static/images/comida10.jpg',
    dia: 'Martes',
    propiedades: ['Proteínas: 25g', 'Grasas: 15g', 'Calorías: 400'],
    ingredientes: ['Ingrediente A', 'Ingrediente B', 'Ingrediente C'],
    descripcion: 'Avena nutritiva acompañada con una mezcla de frutas frescas y miel.'
  },
  // Agrega más recetas aquí
  // ...
];

function mostrarDetalles(plato) {
  const imagen = document.getElementById('plato-imagen');
  const nombre = document.getElementById('plato-nombre'); 
  const dia = document.getElementById('plato-dia');
  const ingredientesList = document.getElementById('plato-ingredientes');
  const propiedadesList = document.getElementById('plato-propiedades');
  const descripcion = document.getElementById('plato-descripcion');  // Nuevo

  imagen.src = plato.imagen;
  nombre.textContent = plato.nombre;
  dia.innerText = plato.dia;
  descripcion.textContent = plato.descripcion;  // Nuevo
  ingredientesList.innerHTML = '';
  propiedadesList.innerHTML = '';

  plato.ingredientes.forEach(ingrediente => {
    const li = document.createElement('li');
    li.textContent = ingrediente;
    ingredientesList.appendChild(li);
  });

  plato.propiedades.forEach(propiedad => {
    const li = document.createElement('li');
    li.textContent = propiedad;
    propiedadesList.appendChild(li);
  });

  // Mostrar el pop-up y la superposición
  document.getElementById('recipe-popup').classList.add('open');
  document.getElementById('modal_overlay').classList.add('open');
}

function closePopup() {
  document.getElementById('recipe-popup').classList.remove('open');
  document.getElementById('modal_overlay').classList.remove('open');
}

document.addEventListener('DOMContentLoaded', function () {
  const thumbnailsContainer = document.querySelector('.plan-thumbnails');
  platos.forEach(plato => {
    const thumbnail = document.createElement('div');
    thumbnail.classList.add('thumbnail');
    thumbnail.innerHTML = `
      <img src="${plato.imagen}" alt="${plato.nombre}" class="thumbnail-img">
      <div class="thumbnail-content">
        <h3 class="thumbnail-title">${plato.nombre}</h3>
        <p class="thumbnail-description">${plato.descripcion}</p>
        <div class="thumbnail-footer">
            <span>Más información</span>
            <button class="btn" data-recipe-id="${plato.nombre}">Ver receta</button>
        </div>
        <div class="rating">
            <input type="radio" id="star5-${plato.nombre}" name="rate-${plato.nombre}" value="5" />
            <label for="star5-${plato.nombre}" title="5 estrellas"></label>
            <input type="radio" id="star4-${plato.nombre}" name="rate-${plato.nombre}" value="4" />
            <label for="star4-${plato.nombre}" title="4 estrellas"></label>
            <input type="radio" id="star3-${plato.nombre}" name="rate-${plato.nombre}" value="3" />
            <label for="star3-${plato.nombre}" title="3 estrellas"></label>
            <input type="radio" id="star2-${plato.nombre}" name="rate-${plato.nombre}" value="2" />
            <label for="star2-${plato.nombre}" title="2 estrellas"></label>
            <input type="radio" id="star1-${plato.nombre}" name="rate-${plato.nombre}" value="1" />
            <label for="star1-${plato.nombre}" title="1 estrella"></label>
        </div>
      </div>
    `;
    thumbnail.querySelector('.btn').addEventListener('click', () => mostrarDetalles(plato));
    thumbnailsContainer.appendChild(thumbnail);
  });

  // Añadir evento al botón de cerrar pop-up
  document.getElementById('close-popup').addEventListener('click', closePopup);
  document.getElementById('modal_overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal_overlay')) {
      closePopup();
    }
  });
});
