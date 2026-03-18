//JavaScript
document.addEventListener("DOMContentLoaded", () => {

// DATA
const dinos = [
{ name:"Tyrannosaurus Rex", diet:"carnivore", habitat:"jungle", size:"12m", era:"Late Cretaceous", prey:"Triceratops", notes:"Apex predator"},
{ name:"Velociraptor", diet:"carnivore", habitat:"sandstone", size:"2m", era:"Late Cretaceous", prey:"Protoceratops", notes:"Fast hunter"},
{ name:"Pyroraptor", diet:"carnivore", habitat:"jungle", size:"2m", era:"Late Cretaceous", prey:"Small animals", notes:"Feathered"},
{ name:"Sinosauropteryx", diet:"carnivore", habitat:"jungle", size:"1m", era:"Early Cretaceous", prey:"Insects", notes:"Striped tail"},
{ name:"Allosaurus", diet:"carnivore", habitat:"sandstone", size:"8m", era:"Jurassic", prey:"Stegosaurus", notes:"Top predator"},
{ name:"Triceratops", diet:"herbivore", habitat:"jungle", size:"9m", era:"Late Cretaceous", prey:"Plants", notes:"Three horns"},
{ name:"Stegosaurus", diet:"herbivore", habitat:"sandstone", size:"9m", era:"Jurassic", prey:"Plants", notes:"Plates"},
{ name:"Brachiosaurus", diet:"herbivore", habitat:"jungle", size:"25m", era:"Jurassic", prey:"Plants", notes:"Tall neck"},
{ name:"Spinosaurus", diet:"carnivore", habitat:"ocean", size:"15m", era:"Cretaceous", prey:"Fish", notes:"Semi-aquatic"},
{ name:"Mosasaurus", diet:"carnivore", habitat:"ocean", size:"15m", era:"Cretaceous", prey:"Fish", notes:"Marine apex"},
{ name:"Pteranodon", diet:"carnivore", habitat:"sky", size:"7m wingspan", era:"Cretaceous", prey:"Fish", notes:"Glider"},
{ name:"Quetzalcoatlus", diet:"carnivore", habitat:"sky", size:"10m wingspan", era:"Cretaceous", prey:"Small animals", notes:"Huge flyer"},
{ name:"Yutyrannus", diet:"carnivore", habitat:"snow", size:"9m", era:"Cretaceous", prey:"Herbivores", notes:"Feathered"},
{ name:"Cryolophosaurus", diet:"carnivore", habitat:"snow", size:"7m", era:"Jurassic", prey:"Dinosaurs", notes:"Crest"}
];

// STATE
let selectedHabitats = [];
let selectedDiets = [];

// CREATE CARDS
function createCards(){

const container = document.getElementById("dinoContainer");
container.innerHTML = "";

const searchValue = document.getElementById("searchbar").value.toLowerCase();

const filtered = dinos.filter(d => {

const habitatMatch =
selectedHabitats.length === 0 || selectedHabitats.includes(d.habitat);

const dietMatch =
selectedDiets.length === 0 || selectedDiets.includes(d.diet);

const searchMatch =
d.name.toLowerCase().includes(searchValue);

return habitatMatch && dietMatch && searchMatch;

});

filtered.forEach(dino => {

const card = document.createElement("div");
card.classList.add("dino-card", dino.habitat);

card.innerHTML = `
<div class="card-top">
<h2>${dino.name}</h2>

<div class="diet-icon">
<img src="${dino.diet}.jpg">
</div>
</div>

<div class="card-info">
<p><strong>Size:</strong> ${dino.size}</p>
<p><strong>Habitat:</strong> ${capitalize(dino.habitat)}</p>
<p><strong>Era:</strong> ${dino.era}</p>
<p><strong>Diet:</strong> ${capitalize(dino.diet)}</p>
<p><strong>Prey:</strong> ${dino.prey}</p>
<p><strong>Notes:</strong> ${dino.notes}</p>
</div>

<button class="toggle-btn">More Info</button>
`;

container.appendChild(card);
});

addToggle();
}

// TOGGLE
function addToggle(){
document.querySelectorAll(".toggle-btn").forEach(btn => {
btn.onclick = () => {
const card = btn.parentElement;
card.classList.toggle("active");
btn.textContent = card.classList.contains("active") ? "Less Info" : "More Info";
};
});
}

// FILTER HABITAT (MULTI SELECT)
window.filterHabitat = function(h){

const index = selectedHabitats.indexOf(h);

if(index > -1){
    selectedHabitats.splice(index, 1);
}else{
    selectedHabitats.push(h);
}

updateButtons();
createCards();
}

// FILTER DIET (MULTI SELECT)
window.filterDiet = function(d){

const index = selectedDiets.indexOf(d);

if(index > -1){
    selectedDiets.splice(index, 1);
}else{
    selectedDiets.push(d);
}

updateButtons();
createCards();
}

// UPDATE BUTTON COLORS
function updateButtons(){

document.querySelectorAll(".habitat").forEach(btn => {
const value = btn.dataset.value;
btn.classList.toggle("active-btn", selectedHabitats.includes(value));
});

document.querySelectorAll(".diet").forEach(btn => {
const value = btn.dataset.value;
btn.classList.toggle("active-btn", selectedDiets.includes(value));
});

}

// SEARCH
document.getElementById("searchbar").addEventListener("keyup", createCards);

// HELPER
function capitalize(text){
return text.charAt(0).toUpperCase() + text.slice(1);
}

// INIT
createCards();

});
