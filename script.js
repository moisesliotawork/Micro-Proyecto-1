function mostrarFormulario() {
  let popup = document.getElementById("popup");
  popup.style.display = "block";
}

function mostrarFondoOscuro() {
  var fondoOscuro = document.getElementById("fondoOscuro");
  fondoOscuro.style.display = "block";
}

function ocultarFondoOscuro() {
  var fondoOscuro = document.getElementById("fondoOscuro");
  fondoOscuro.style.display = "none";
}

// Llamar a la función cuando el documento esté listo
document.addEventListener("DOMContentLoaded", function () {
  llenarTablaDesdeLocalStorage();
});

// Cuando se envía el formulario
document
  .getElementById("formulario")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    if (validarNumero()) {
      // Obtener los valores del formulario
      let jugador1 = document.getElementById("jugador1").value;
      let jugador2 = document.getElementById("jugador2").value;
      let jugador3 = document.getElementById("jugador3").value;
      let jugador4 = document.getElementById("jugador4").value;
      let n = document.getElementById("n").value;

      let matriz1 = generarMatriz(parseInt(n));
      let matriz2 = generarMatriz(parseInt(n));
      let matriz3 = generarMatriz(parseInt(n));
      let matriz4 = generarMatriz(parseInt(n));
      // Generar las matrices y crear los objetos de jugador
      let j1 = { nombre: jugador1, matriz: matriz1, puntos: 0 };
      let j2 = { nombre: jugador2, matriz: matriz2, puntos: 0 };
      let j3 = { nombre: jugador3, matriz: matriz3, puntos: 0 };
      let j4 = { nombre: jugador4, matriz: matriz4, puntos: 0 };

      // Almacenar los valores en sessionStorage
      sessionStorage.setItem("j1", JSON.stringify(j1));
      sessionStorage.setItem("j2", JSON.stringify(j2));
      sessionStorage.setItem("j3", JSON.stringify(j3));
      sessionStorage.setItem("j4", JSON.stringify(j4));
      sessionStorage.setItem("maxMatriz", JSON.stringify(n));

      document.getElementById("popup").style.display = "none";
      // Redireccionar a la nueva página
      window.location.href = "page2.html";
    }
  });

function validarNumero() {
  var numero = document.getElementById("n").value;

  // Verificar si es un número y está entre 3 y 5
  if (!isNaN(numero) && numero >= 3 && numero <= 5) {
    // Número válido, se puede enviar el formulario
    return true;
  } else {
    // Mostrar mensaje de error
    alert("Por favor, ingrese un número entre 3 y 5.");
    return false;
  }
}

// Función para generar una matriz nxn con números aleatorios entre 1 y 50 sin repetir
function generarMatriz(n) {
  let matriz = [];
  let numerosDisponibles = [];

  // Inicializar números disponibles
  for (let i = 1; i <= 50; i++) {
    numerosDisponibles.push(i);
  }

  // Generar matriz
  for (let i = 0; i < n; i++) {
    matriz[i] = [];
    for (let j = 0; j < n; j++) {
      const randomIndex = Math.floor(Math.random() * numerosDisponibles.length);
      matriz[i][j] = numerosDisponibles[randomIndex];
      numerosDisponibles.splice(randomIndex, 1);
    }
  }

  return matriz;
}

function llenarTablaDesdeLocalStorage() {
  // Obtener referencia a la tabla
  var table = document.querySelector("table tbody");
  // Paso 1: Obtener todas las claves del localStorage
  var keys = Object.keys(localStorage);

  // Paso 2: Iterar sobre las claves y obtener los valores correspondientes
  var localStorageData = [];

  keys.forEach(function (key) {
    var value = localStorage.getItem(key);
    // Paso 3: Almacenar la clave y el valor en un objeto
    localStorageData.push({ key: key, value: value });
  });
  // Verificar si hay datos en el almacenamiento local
  if (localStorageData.length > 0) {
    // Limpiar el contenido existente de la tabla
    table.innerHTML = "";

    localStorageData.sort(function (a, b) {
      var valueA = parseInt(a.value);
      var valueB = parseInt(b.value);
      return valueB - valueA;
    });

    localStorageData.forEach(function (item) {
      var row = table.insertRow();
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell1.textContent = item.key; // Clave
      cell2.textContent = item.value;
    });
  }
}
