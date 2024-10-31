// Función para buscar series en la API de TVMaze
async function buscarSerie() {
    const nombreSerie = document.getElementById('serieInput').value;
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = ''; // Limpiar resultados anteriores
  
    try {
      const response = await fetch(`https://api.tvmaze.com/search/shows?q=${nombreSerie}`);
      const series = await response.json();
  
      if (series.length === 0) {
        resultadosDiv.innerHTML = `<p>No se encontraron resultados para "${nombreSerie}"</p>`;
        return;
      }
  
      // Mostrar los resultados
      series.forEach((item) => {
        const serie = item.show;
        const serieDiv = document.createElement('div');
        serieDiv.innerHTML = `
          <h2>${serie.name}</h2>
          <p><strong>Fecha de estreno:</strong> ${serie.premiered || 'Desconocida'}</p>
          <p><strong>Géneros:</strong> ${serie.genres.join(', ')}</p>
          <p><strong>Resumen:</strong> ${serie.summary || 'No disponible'}</p>
          ${serie.image ? `<img src="${serie.image.medium}" alt="${serie.name}">` : ''}
          <hr>
        `;
        resultadosDiv.appendChild(serieDiv);
      });
    } catch (error) {
      console.error('Error al buscar la serie:', error);
      resultadosDiv.innerHTML = `<p>Error al obtener los datos.</p>`;
    }
  }
  