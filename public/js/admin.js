// POPUP UPLOAD CUADROS ADMIN

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
    
    // Comprueba que el tamaño del archivo sea menor a 200kb
    if (e.target.files[0].size > 200000) {
        document.getElementById('file').value = "";
        return document.getElementById('error-text').innerText = "El archivo debe pesar 200KB o menos.";
    }
    
    // Creamos el objeto de la clase FileReader
    let reader = new FileReader();
  
    // Leemos el archivo subido y se lo pasamos a nuestro fileReader
    reader.readAsDataURL(e.target.files[0]);
  
    // Le decimos que cuando este listo ejecute el código interno
    reader.onload = function(){
        let preview = document.getElementById('preview');
        let iconPreview = document.getElementById('icon-preview');
        image = document.createElement('img');
        
        image.src = reader.result;
        
        preview.innerHTML = '';
        document.getElementById('error-text').innerText = "";
        iconPreview.style.display = 'none';
        preview.append(image);
    };
}

// BTN RESET DE CUADROS POR SUBIR

let btnResetCuadro = document.getElementById('btn-reset');
let resetCuadro = () => { 
    document.getElementById('nombre').value = "";
    document.getElementById('descripcion').value = "";
    document.getElementById('file').value = "";
    document.getElementById('icon-preview').style.display = "block";
    let preview = document.getElementById('preview');
    preview.innerHTML = '';
};
btnResetCuadro.addEventListener('click',resetCuadro);