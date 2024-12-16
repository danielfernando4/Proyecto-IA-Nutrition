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
  const detallesSection = document.getElementById('details-section');
  const imagen = document.getElementById('plato-imagen');
  const nombre = document.getElementById('plato-nombre'); 
  const dia = document.getElementById('plato-dia');
  const ingredientesList = document.getElementById('plato-ingredientes');
  const propiedadesList = document.getElementById('plato-propiedades');

  imagen.src = plato.imagen;
  nombre.textContent = plato.nombre;
  dia.innerText = plato.dia;
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

  detallesSection.style.display = 'block';
}

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
          <label for="star5-${plato.nombre}" title="text"></label>
          <input type="radio" id="star4-${plato.nombre}" name="rate-${plato.nombre}" value="4" />
          <label for="star4-${plato.nombre}" title="text"></label>
          <input type="radio" id="star3-${plato.nombre}" name="rate-${plato.nombre}" value="3" />
          <label for="star3-${plato.nombre}" title="text"></label>
          <input type="radio" id="star2-${plato.nombre}" name="rate-${plato.nombre}" value="2" />
          <label for="star2-${plato.nombre}" title="text"></label>
          <input checked type="radio" id="star1-${plato.nombre}" name="rate-${plato.nombre}" value="1" />
          <label for="star1-${plato.nombre}" title="text"></label>
      </div>
    </div>
  `;
  thumbnail.querySelector('.btn').addEventListener('click', () => mostrarDetalles(plato));
  thumbnailsContainer.appendChild(thumbnail);
});
