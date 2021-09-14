const yeniGorev = document.querySelector(".input-gorev");
const yeniGorevEkleBtn = document.querySelector(".btn-gorev-ekle");
const gorevListesi = document.querySelector(".gorev-listesi");

yeniGorevEkleBtn.addEventListener("click", gorevEkle);
document.addEventListener("DOMContentLoaded", localStorageOku);

function gorevEkle(e) {
  e.preventDefault();

  gorevItemOlustur(yeniGorev.value);

  localStorageKaydet(yeniGorev.value);
  //localStorageOku();

  yeniGorev.value = "";
}

function localStorageKaydet(yeniGorev) {
  let gorevler = [];

  if (yeniGorev !== "") {
    if (localStorage.getItem("gorevler") === null) {
      gorevler = [];
    } else {
      gorevler = JSON.parse(localStorage.getItem("gorevler"));
    }

    gorevler.push(yeniGorev);
    localStorage.setItem("gorevler", JSON.stringify(gorevler));
  }
}

function localStorageOku(e) {
  /*  let okunanDeger = localStorage.getItem('gorevler').replace('"','');
  okunanDeger = okunanDeger.split('"').join('').split('[').join('').split(']').join('');
  let okunanDegerDizi = okunanDeger.split(',');
  console.log(okunanDegerDizi); */
  let gorevler = [];

  if (localStorage.getItem("gorevler" === null)) {
    gorevler = [];
  } else {
    gorevler = JSON.parse(localStorage.getItem("gorevler"));
  }

  gorevler.forEach((gorev) => {
    gorevItemOlustur(gorev);
  });
  return gorevler;
}

function gorevItemOlustur(yeniGorev) {
  const gorevDiv = document.createElement("div");
  const gorevLi = document.createElement("li");
  const gorevTamamlandiBtn = document.createElement("button");
  const gorevSilBtn = document.createElement("button");
  if (yeniGorev === "") {
    alert("Boş Değer Girilemez");
  } else {
    // Div Oluşturma
    gorevDiv.classList.add("gorev-item");
    gorevTamamlandiBtn.classList.add("gorev-btn");
    gorevTamamlandiBtn.classList.add("gorev-btn-tamamlandi");
    gorevTamamlandiBtn.innerHTML = '<i class="far fa-check-square"></i>';
    gorevSilBtn.classList.add("gorev-btn");
    gorevSilBtn.classList.add("gorev-btn-sil");
    gorevSilBtn.innerHTML = '<i class="far fa-trash-alt"></i>';

    gorevLi.classList.add("gorev-tanim");
    gorevLi.innerText = yeniGorev;
    gorevDiv.appendChild(gorevLi);
    gorevDiv.appendChild(gorevTamamlandiBtn);
    gorevDiv.appendChild(gorevSilBtn);
    gorevListesi.appendChild(gorevDiv);
  }

  gorevTamamlandiBtn.addEventListener("click", gorevTamamlandi);
  gorevSilBtn.addEventListener("click", gorevSil);

  // local storage kaydet
  function gorevTamamlandi(e) {
    e.preventDefault();
    gorevDiv.classList.toggle("gorev-tamamlandi"); // toogle Yoksa Ekle Varsa Sil
  }
  function gorevSil(e) {

if (confirm(`${gorevDiv.children[0].textContent} Silinecek Eminmisiniz!!!`)) {
  gorevDiv.classList.toggle("kaybol");
    localStorageSil(gorevDiv.children[0].textContent);
    console.log("Silinen Değer: " + gorevDiv.children[0].textContent);
    gorevDiv.addEventListener("transitionend", (e) => {
      gorevDiv.remove();
    });
}

    
  }
}

function localStorageSil(gorev) {
  let gorevler = [];
  if (localStorage.getItem("gorevler" === null)) {
    gorevler = [];
  } else {
    gorevler = JSON.parse(localStorage.getItem("gorevler"));
  }
  for (let i = 0; i < gorevler.length; i++) {
    if (gorevler[i] === gorev) {
      gorevler.splice(i, 1);
    }
  }
  localStorage.setItem("gorevler", JSON.stringify(gorevler));
}
