// genera de forma automática un índice de navegación dinámico a partir de los subtítulos h2 que poseen un id
const indiceAutomatico = document.querySelector("#indice-automatico");
const subtitulosH2 = document.querySelectorAll("main section h2");

subtitulosH2.forEach(function (h2) {
 if (h2.id) {
    const li = document.createElement("li");
    const enlace = document.createElement("a");
    
    enlace.href = `#${h2.id}`;
    enlace.textContent = h2.textContent;
    
    li.append(enlace);
    indiceAutomatico.append(li);
  }
});

//alterna el tema de la página entre claro y oscuro
const botonModoOscuro = document.querySelector("#modo-oscuro");

if (botonModoOscuro) {
  botonModoOscuro.addEventListener("click", function () {
    document.body.classList.toggle("oscuro");
    
    if (document.body.classList.contains("oscuro")) {
      botonModoOscuro.textContent = "Modo Claro";
    } else {
      botonModoOscuro.textContent = "Modo Oscuro";
    }
  });
}


//permite cambiar el tamaño de la letra entre pequeño, estandard y grande
const botonesTamanio = document.querySelectorAll(".btn-tamanio");

botonesTamanio.forEach(function (btn) {
 
  if (btn.getAttribute("data-tamanio") === "estandard") {
    btn.classList.add("activo");
    document.body.classList.add("tamanio-estandard");
  }

  btn.addEventListener("click", function () {
    
    botonesTamanio.forEach(function (boton) {
      boton.classList.remove("activo");
    });
    btn.classList.add("activo");

    const tamanioSeleccionado = btn.getAttribute("data-tamanio");
    
    document.body.classList.remove("tamanio-pequeno", "tamanio-estandard", "tamanio-grande");
    document.body.classList.add(`tamanio-${tamanioSeleccionado}`);
  });
});

//esto permite que al tocar el subtitulo  el contenido de cada seccion se oculte o se muestre
const secciones = document.querySelectorAll("main section");

secciones.forEach(function (seccion) {
  const h2 = seccion.querySelector("h2");
  if (h2) {
    h2.addEventListener("click", function () {
      seccion.classList.toggle("plegada");
    });
  }
});

//por último, esto permite validar la cantidad de caracteres, la validacion de campos, crear los comentarios y poder eliminarlos
const formComentario = document.querySelector("#form-comentario");
const nombreUsuario = document.querySelector("#nombre-usuario");
const textoComentario = document.querySelector("#texto-comentario");
const contadorCaracteres = document.querySelector("#contador-caracteres");
const avisoForm = document.querySelector("#aviso-form");
const listaComentarios = document.querySelector("#lista-comentarios");

const MAX_CARACTERES = 200;

if (textoComentario && contadorCaracteres) {
  textoComentario.addEventListener("input", function () {
    const caracteresActuales = textoComentario.value.length;
    contadorCaracteres.textContent = `${caracteresActuales} / ${MAX_CARACTERES}`;
  });
}

if (formComentario) {
  formComentario.addEventListener("submit", function (e) {
    e.preventDefault(); 

    avisoForm.textContent = "";
    nombreUsuario.classList.remove("error");
    textoComentario.classList.remove("error");

    const nombre = nombreUsuario.value.trim();
    const texto = textoComentario.value.trim();

    if (nombre === "") {
      avisoForm.textContent = "El nombre no puede estar vacío ni contener solo espacios.";
      nombreUsuario.classList.add("error");
      nombreUsuario.focus();
      return;
    }

    if (texto.length < 10 || texto.length > MAX_CARACTERES) {
      avisoForm.textContent = `El comentario debe tener entre 10 y ${MAX_CARACTERES} caracteres.`;
      textoComentario.classList.add("error");
      textoComentario.focus();
      return;
    }

    const li = document.createElement("li");

    const fuerteNombre = document.createElement("strong");
    fuerteNombre.textContent = `${nombre}: `;

    const spanTexto = document.createElement("span");
    spanTexto.textContent = texto; 
    const btnBorrar = document.createElement("button");
    btnBorrar.textContent = "Borrar";
    btnBorrar.className = "boton-borrar";

   
    btnBorrar.addEventListener("click", function () {
      li.remove();
    });

    li.append(fuerteNombre);
    li.append(spanTexto);
    li.append(btnBorrar);

    listaComentarios.append(li);

  
    formComentario.reset();
    if (contadorCaracteres) {
      contadorCaracteres.textContent = `0 / ${MAX_CARACTERES}`;
    }
  });
}