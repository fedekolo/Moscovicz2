// POPUP VISUALIZACION CUADROS

// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

// Get the <span> element that closes the modal
var closeModal = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
closeModal.onclick = function() { 
modal.style.display = "none";
}

// POPUP UPLOAD CUADROS

// configuracion para abrir modal
let modalUpload = document.getElementById("modal-upload");
let btnModalUpload = document.getElementById("btn-modal");
btnModalUpload.onclick = function(){
    modalUpload.style.display = "block";
}

// boton para cerrar modal
var closeUpload = document.getElementsByClassName("close")[0];
closeUpload.onclick = function() { 
modalUpload.style.display = "none";
}

// PREVISUALIZACION DE CUADROS POR SUBIR

document.getElementById("file").onchange = function(e) {
    // Creamos el objeto de la clase FileReader
    let reader = new FileReader();
  
    // Leemos el archivo subido y se lo pasamos a nuestro fileReader
    reader.readAsDataURL(e.target.files[0]);
  
    // Le decimos que cuando este listo ejecute el código interno
    reader.onload = function(){
      let preview = document.getElementById('preview'),
              image = document.createElement('img');
  
      image.src = reader.result;
  
      preview.innerHTML = '';
      preview.append(image);
    };
  }


// LOGO MOBILE

window.addEventListener('scroll', function() {
    if (window.scrollY > 160) {
        if (!document.querySelector('.logoMenu').classList.contains('show')){
            document.querySelector('.logoMenu').classList.add('show');
        }
    } else {
        document.querySelector('.logoMenu').classList.remove('show');
    }
});

    
