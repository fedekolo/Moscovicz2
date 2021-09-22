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

    
