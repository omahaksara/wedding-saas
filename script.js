function getID() {
    return new URLSearchParams(window.location.search).get("id");
}

function bukaUndangan() {
    document.getElementById("cover").style.transform = "translateY(-100%)";
    document.getElementById("main-content").classList.remove("hidden");
    const audio = document.getElementById("musik_bg");
    audio.play();
}

fetch("data.json")
    .then(res => res.json())
    .then(data => {
        const id = getID();
        const user = data[id];
        if (!user) return;

        // Cover Mapping
        document.getElementById("nama_pria_cover").innerText = user.pria.panggilan;
        document.getElementById("nama_wanita_cover").innerText = user.wanita.panggilan;
        document.getElementById("tgl_cover").innerText = user.acara.akad.tanggal;
        document.getElementById("cover").style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${user.bg_cover}')`;

        // Couple Mapping
        document.getElementById("foto_pria").src = user.pria.foto;
        document.getElementById("nama_pria_lengkap").innerText = user.pria.lengkap;
        document.getElementById("ortu_pria").innerText = `Putra dari ${user.pria.ayah} & ${user.pria.ibu}`;

        document.getElementById("foto_wanita").src = user.wanita.foto;
        document.getElementById("nama_wanita_lengkap").innerText = user.wanita.lengkap;
        document.getElementById("ortu_wanita").innerText = `Putri dari ${user.wanita.ayah} & ${user.wanita.ibu}`;

        // Event Mapping
        document.getElementById("tgl_akad").innerText = user.acara.akad.tanggal;
        document.getElementById("lokasi_akad").innerText = user.acara.akad.tempat;

        document.getElementById("musik_bg").src = user.musik;
    });
