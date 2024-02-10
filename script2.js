let count = 1; // Variable global
// En la nueva página
document.addEventListener("DOMContentLoaded", function () {
  // Obtener los valores almacenados en sessionStorage
  let jugador1 = JSON.parse(sessionStorage.getItem("j1"));
  let jugador2 = JSON.parse(sessionStorage.getItem("j2"));
  let jugador3 = JSON.parse(sessionStorage.getItem("j3"));
  let jugador4 = JSON.parse(sessionStorage.getItem("j4"));

  let n = sessionStorage.getItem("n");

  // Mostrar los valores en la página
  document.getElementById("jugador").textContent =
    "Jugador " + count + ": " + jugador1.nombre;
  //document.getElementById("jugador2").textContent = jugador2;
  //document.getElementById("jugador3").textContent = jugador3;
  //document.getElementById("jugador4").textContent = jugador4;

  console.log(sessionStorage.getItem("j1"));
  let j1String = sessionStorage.getItem("j1");
  // Convertir la cadena JSON de vuelta a un objeto JavaScript
  let j1c = JSON.parse(j1String);
  // Acceder al atributo 'matriz' del objeto j1
  let matriz = j1c.matriz;

  mostrarMatrizEnHTML(matriz);
});

function mostrarMatrizEnHTML(matriz) {
  let matrizContainer = document.getElementById("matriz-container");
  let tabla = document.createElement("table");

  for (let i = 0; i < matriz.length; i++) {
    let fila = document.createElement("tr");

    for (let j = 0; j < matriz[i].length; j++) {
      let celda = document.createElement("td");
      celda.textContent = matriz[i][j];
      fila.appendChild(celda);
    }

    tabla.appendChild(fila);
  }

  matrizContainer.appendChild(tabla);
}

function ModificarMatriz(matriz) {
  const element = document.getElementById("matriz-container");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  let matrizContainer = document.getElementById("matriz-container");
  let tabla = document.createElement("table");

  for (let i = 0; i < matriz.length; i++) {
    let fila = document.createElement("tr");

    for (let j = 0; j < matriz[i].length; j++) {
      let celda = document.createElement("td");
      celda.textContent = matriz[i][j];
      fila.appendChild(celda);
    }

    tabla.appendChild(fila);
  }

  matrizContainer.appendChild(tabla);
}

function siguienteJugador() {
  count = count + 1;
  let elementos = Object.values(sessionStorage);
  // Obtener el índice del elemento actual o inicializar en 0 si no existe
  let indiceActual = parseInt(sessionStorage.getItem("indiceActual")) || 0;

  // Avanzar al siguiente elemento o volver al primero si llegamos al último
  indiceActual = (indiceActual + 1) % elementos.length;
  if (indiceActual === 0) {
    indiceActual = 1;
  }
  // Mostrar el elemento correspondiente
  let elementoActual = elementos[indiceActual];
  //console.log(elementoActual); // Aquí puedes hacer lo que desees con el elemento
  elementact = JSON.parse(elementoActual);
  document.getElementById("jugador").textContent =
    "Jugador " + count + ": " + elementact.nombre;
  ModificarMatriz(elementact.matriz);

  // Actualizar el índice actual en sessionStorage
  sessionStorage.setItem("indiceActual", indiceActual);

  if (count === 4) {
    count = 1;
  }
}
