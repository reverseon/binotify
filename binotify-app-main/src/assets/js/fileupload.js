function uploadFile(){
    const form = new FormData();
    const judul = document.getElementById("judul").value;
    const penyanyi = document.getElementById("penyanyi").value;
    const tanggal_terbit = document.getElementById("tanggal_terbit").value;
    const genre = document.getElementById("genre").value;
    const file = document.getElementById("fileinput").files;
    const image = document.getElementById("imageinput").files;
    const album = document.getElementById("album").value;
    
    form.append("judul", judul);
    form.append("penyanyi", penyanyi);
    form.append("tanggal_terbit", tanggal_terbit);
    form.append("genre", genre);
    form.append("file", file[0]);
    form.append("image", image[0]);
    form.append("album", album);

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "process/album_backend.php", true);
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200){ 
            console.log(this.responseText);
        }
    }
    
    xhttp.send(form);
}