import { data } from './data.js'
const listaKategorija = document.getElementById("navigation");
const proizvodi = document.getElementById("proizvodi");
let naslov = document.getElementById("naslov");
let cart_icon = document.getElementById("cart-icon");
let badge_cart = document.getElementById("badge-cart");
let index = 0;
let tren_kategorija = 0;
let kosarica = new Map();
let prviItem = true;
let uk_kolicina = 0;


initialize();

function promijeniKategoriju(id){
    if(id != tren_kategorija){
        let preth_kat_div = document.getElementById(`kategorija${tren_kategorija}`);
        let slj_kat_div = document.getElementById(`kategorija${id}`);
        let tekst_kat = document.getElementById(`kat${id}`);
        let tekst_preth_kat = document.getElementById(`kat${tren_kategorija}`);

        preth_kat_div.style.display = "none";
        slj_kat_div.style.display = "block";
        tekst_kat.style.fontWeight = "bold";
        tekst_preth_kat.style.fontWeight = "normal";
        tren_kategorija = id;
        naslov.textContent = data.categories[id].name;
    }
}

function dodajUKosaricu(ime, imgContainer, badge){
    if(kosarica.has(ime)){
        let kolicina = kosarica.get(ime) + 1;
        kosarica.set(ime, kolicina);

        badge.style.visibility = "visible";
        badge.textContent = kolicina;
    } else{
        kosarica.set(ime, 1);
        badge.style.visibility = "visible";
        badge.textContent = "1";
    }
    console.log(kosarica);

    uk_kolicina += 1;
    if(prviItem){
        badge_cart.style.visibility = "visible";
        prviItem = false;
    }
    else {
        badge_cart.textContent = uk_kolicina;
    }


}

function initialize(){
    naslov.textContent = data.categories[0].name;

    data.categories.forEach(kat => {
        const li = document.createElement("li");
        li.textContent = kat.name;
        li.classList.add("list");
        li.id = `kat${index}`;
        li.addEventListener('click', function() {
            promijeniKategoriju(li.id[3]);
        })
        listaKategorija.appendChild(li);

        const kategorijaDiv = document.createElement("div");
        kategorijaDiv.classList.add("kategorija-img");
        kategorijaDiv.id = `kategorija${index}`;
        kategorijaDiv.style.display = (index == 0) ? 'block' : 'none'; //prva kategorija displayed

        kat.products.forEach(product => {
            const imgContainer = document.createElement("div");
            imgContainer.classList.add("img-container");

            const img = document.createElement("img");
            img.classList.add("slike")
            img.src = `../images/${product.image}`;
            img.alt = product.name;

            const caption = document.createElement("p");
            caption.textContent = product.name;
            caption.classList.add("ime-proizvoda");

            const captionCategory = document.createElement("p");
            captionCategory.textContent = kat.name;
            captionCategory.classList.add("ime-kategorije");

            const hoverImg = document.createElement("img");
            hoverImg.src = "../images/shopping_cart.png";
            hoverImg.classList.add("hover-img");

            let badge = document.createElement("span");
            badge.classList.add("badge");
            badge.style.visibility = "hidden";
            
            hoverImg.addEventListener('click', function() {
                dodajUKosaricu(product.name, imgContainer, badge);
            });

            imgContainer.appendChild(img);
            imgContainer.appendChild(caption);
            imgContainer.appendChild(captionCategory);
            imgContainer.appendChild(hoverImg);
            imgContainer.appendChild(badge);

            kategorijaDiv.appendChild(imgContainer);

        });

        proizvodi.appendChild(kategorijaDiv);

        index += 1;
    });

    let tekst_kat = document.getElementById("kat0");
    tekst_kat.style.fontWeight = "bold";
    cart_icon.addEventListener("click", () => {
        localStorage.setItem("uk_kolicina", JSON.stringify(uk_kolicina));
        localStorage.setItem("kosarica", JSON.stringify([...kosarica])); //pretvaranje mape u niz parova
        window.location.href = "cart.html";
    })
}
