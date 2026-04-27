function getID(){
  const url = new URL(window.location.href);
  return url.searchParams.get("id");
}

fetch("data.json")
.then(res => res.json())
.then(data => {

  const id = getID();

  if(!id || !data[id]){
    document.body.innerHTML = "Undangan tidak ditemukan";
    return;
  }

  const user = data[id];

  document.getElementById("nama_pria").innerText = user.nama_pria;
  document.getElementById("nama_wanita").innerText = user.nama_wanita;

  document.getElementById("detail").innerText =
    user.tanggal + " | " + user.lokasi;

});
