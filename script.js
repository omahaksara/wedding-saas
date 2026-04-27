function getID(){
    const url = new URL(window.location.href);
    return url.searchParams.get("id");
}

function bukaUndangan() {
    const cover = document.getElementById("cover");
    cover.style.transform = "translateY(-100%)";
    document.getElementById("main-content").classList.remove("hidden");
    window.scrollTo(0, 0);
}

fetch("data.json")
    .then(res => res.json())
    .then(data => {
        const id = getID();
        if(!id || !data[id]){
            document.body.innerHTML = "<h1>Undangan tidak ditemukan</h1>";
            return;
        }
        const user = data[id];

        // Isi Data Cover
        document.getElementById("nama_pria_cover").innerText = user.nama_pria.split(' ')[0];
        document.getElementById("nama_wanita_cover").innerText = user.nama_wanita.split(' ')[0];
        document.getElementById("tgl_cover").innerText = user.tanggal;

        // Isi Data Mempelai
        document.getElementById("nama_pria").innerText = user.nama_pria;
        document.getElementById("foto_pria").src = user.foto_pria;
        document.getElementById("ortu_pria").innerText = user.ortu_pria;

        document.getElementById("nama_wanita").innerText = user.nama_wanita;
        document.getElementById("foto_wanita").src = user.foto_wanita;
        document.getElementById("ortu_wanita").innerText = user.ortu_wanita;

        // Isi Data Acara
        document.getElementById("tanggal_acara").innerText = user.tanggal;
        document.getElementById("jam_acara").innerText = user.jam;
        document.getElementById("lokasi_acara").innerText = user.lokasi;
    });
