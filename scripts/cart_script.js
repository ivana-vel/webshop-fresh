
let proizvodi = document.getElementById("proizvodi_u_kosarici");
let kolicina = document.getElementById("kolicina");
let badge_cart = document.getElementById("badge-cart");

const string = localStorage.getItem("kosarica");
const kosarica = new Map(JSON.parse(string));

let string_kolicina = localStorage.getItem("uk_kolicina");
let uk_kolicina = JSON.parse(string_kolicina);

console.log(uk_kolicina)

console.log(kosarica);

printKosarica();

function printKosarica(){
    
    kosarica.forEach((kol, proiz) => {
        let list = document.createElement("li");
        list.classList.add("lista-proiz");
        list.textContent = proiz;

        proizvodi.appendChild(list);

        let listKol = document.createElement("li");
        listKol.classList.add("lista-kol");

        let tekstKol = document.createElement("span");
        tekstKol.classList.add("tekst-kol");
        tekstKol.textContent = kol;

        let plusBtn = document.createElement("button");
        plusBtn.classList.add("button");
        plusBtn.textContent = "+";

        plusBtn.addEventListener("click", () => {
            kol += 1;
            tekstKol.textContent = kol;
            uk_kolicina += 1;
            badge_cart.textContent = uk_kolicina;
        });

        let minusBtn = document.createElement("button");
        minusBtn.classList.add("button");
        minusBtn.textContent = "-";

        minusBtn.addEventListener("click", () => {
            kol -= 1;
            if (kol < 0){
                kol = 0;
            } 
            else{
                uk_kolicina -= 1;
                if (uk_kolicina < 0) uk_kolicina = 0;
                badge_cart.textContent = uk_kolicina;
            }
            tekstKol.textContent = kol;
            
            
        });

        listKol.appendChild(minusBtn);
        listKol.appendChild(tekstKol);
        listKol.appendChild(plusBtn);

        kolicina.appendChild(listKol);

    });

    if(uk_kolicina > 0){
        badge_cart.textContent = uk_kolicina;
        badge_cart.style.visibility = "visible";
    }

}

