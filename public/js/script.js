// POPUP VIEJO

    var altura=600;
    var anchura=800;
    
    var y=parseInt((window.screen.height/2)-(altura/2));
    var x=parseInt((window.screen.width/2)-(anchura/2));

    function ventanaSecundaria (URL){ 
        window.open(URL,"ventana1",'width='+anchura+',height='+altura+',top='+y+',left='+x+',toolbar=no,location=no,status=no,menubar=no,scrollbars=no,directories=no,resizable=no') 
    } 

// POPUP NUEVO

    // function popup() {
    //     document.querySelector('.cuadro-imagen').classList.add('cuadro-imagen-popup');
        
    // }

    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = document.querySelector(".cuadro-imagen");
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");

    img.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
    }

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() { 
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

