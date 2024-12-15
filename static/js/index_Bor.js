const platos = [
  {
    nombre: 'Panqueques de Plátano',
    imagen: '/static/images/comida1.jpg',
    dia: 'Lunes',
    propiedades: ['Proteínas: 20g', 'Grasas: 10g', 'Calorías: 350'],
    ingredientes: ['Ingrediente 1', 'Ingrediente 2', 'Ingrediente 3']
  },
  {
    nombre: 'Avena con Frutas y Miel',
    imagen: '/static/images/comida10.jpg',
    dia: 'Martes',
    propiedades: ['Proteínas: 25g', 'Grasas: 15g', 'Calorías: 400'],
    ingredientes: ['Ingrediente A', 'Ingrediente B', 'Ingrediente C']
  },
  {
    nombre: 'Avena con Frutas y Miel',
    imagen: '/static/images/comida11.jpg',
    dia: 'Miercoles',
    propiedades: ['Proteínas: 25g', 'Grasas: 15g', 'Calorías: 400'],
    ingredientes: ['Ingrediente A', 'Ingrediente B', 'Ingrediente C']
  },
  {
    nombre: 'Avena con Frutas y Miel',
    imagen: '/static/images/comida14.jpg',
    dia: 'Jueves',
    propiedades: ['Proteínas: 25g', 'Grasas: 15g', 'Calorías: 400'],
    ingredientes: ['Ingrediente A', 'Ingrediente B', 'Ingrediente C']
  },
  {
    nombre: 'Avena con Frutas y Miel',
    imagen: '/static/images/comida18.jpg',
    dia: 'Viernes',
    propiedades: ['Proteínas: 25g', 'Grasas: 15g', 'Calorías: 400'],
    ingredientes: ['Ingrediente A', 'Ingrediente B', 'Ingrediente C']
  },
  {
    nombre: 'Avena con Frutas y Miel',
    imagen: '/static/images/comida20.jpg',
    dia: 'Sábado',
    propiedades: ['Proteínas: 25g', 'Grasas: 15g', 'Calorías: 400'],
    ingredientes: ['Ingrediente A', 'Ingrediente B', 'Ingrediente C']
  },
  {
    nombre: 'Avena con Frutas y Miel',
    imagen: '/static/images/comida21.jpg',
    dia: 'Domingo',
    propiedades: ['Proteínas: 25g', 'Grasas: 15g', 'Calorías: 400'],
    ingredientes: ['Ingrediente A', 'Ingrediente B', 'Ingrediente C']
  },
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
    <img src="${plato.imagen}" alt="${plato.nombre}" style="width:100px; height:100px;">
    <div class="thumbnail-name">${plato.nombre}</div>
  `;
  thumbnail.addEventListener('click', () => mostrarDetalles(plato));
  thumbnailsContainer.appendChild(thumbnail);
});


