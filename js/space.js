document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnBuscar").addEventListener("click", function () {
        let  busqueda = document.getElementById("inputBuscar").value;
  
      fetch("https://images-api.nasa.gov/search?q=" + busqueda)
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Error en la solicitud");
          }
          return response.json();
        })
        .then(function (data) {
            let  contenedor = document.getElementById("box");
          contenedor.innerHTML = "";
  
          if (data.collection && data.collection.items) {
            data.collection.items.forEach(function (item) {
              let imagen = item.links[0].href;
              let  titulo = item.data[0].title;
              let  descripcion = item.data[0].description;
              let  fecha = item.data[0].date_created;
  
              let  imgElement = document.createElement("img");
              imgElement.src = imagen;
  
              let  tituloElement = document.createElement("h2");
              tituloElement.textContent = titulo;
              let  descripcionElement = document.createElement("p");
              descripcionElement.textContent = descripcion; 
              let  fechaElement = document.createElement("p");
              fechaElement.textContent = "Fecha de creación: " + fecha;
  
              let  imagenContainer = document.createElement("div");
              imagenContainer.classList.add("imagen-container");
              imagenContainer.appendChild(imgElement);
              imagenContainer.appendChild(tituloElement);
              imagenContainer.appendChild(descripcionElement);
              imagenContainer.appendChild(fechaElement);
  
            
              contenedor.appendChild(imagenContainer);
            });
          } else {
            
            contenedor.innerHTML = "<p>No se encontraron imágenes.</p>";
          }
        })
        .catch(function (error) {
         
          var contenedor = document.getElementById("contenedor");
          contenedor.innerHTML = "<p>Error al cargar las imágenes.</p>";
          console.error(error);
        });
    });
  });