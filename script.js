// ===============================
// Data awal resep (default)
// ===============================
const defaultRecipes = [
  {
    title: "Nasi Goreng Spesial",
    category: "makan siang",
    ingredients: "Nasi, telur, ayam, kecap manis, bawang putih, bawang merah, garam, minyak",
    steps: "1. Panaskan minyak. 2. Tumis bawang hingga harum. 3. Masukkan telur, ayam, dan nasi. 4. Tambahkan kecap dan garam, aduk rata."
  },
  {
    title: "Soto Ayam",
    category: "makan malam",
    ingredients: "Ayam, soun, tauge, telur rebus, bawang goreng, daun seledri, garam, bumbu halus",
    steps: "1. Rebus ayam dan buat kaldu. 2. Tumis bumbu halus lalu campur ke kaldu. 3. Sajikan dengan soun, tauge, dan telur rebus."
  },
  {
    title: "Telur Dadar",
    category: "sarapan",
    ingredients: "Telur, garam, daun bawang, minyak goreng",
    steps: "1. Kocok telur dengan garam dan daun bawang. 2. Panaskan minyak, goreng hingga matang kedua sisi."
  }
];

// ===============================
// Fungsi menyimpan & memuat dari localStorage
// ===============================
function loadRecipes() {
  const saved = localStorage.getItem("recipes");
  return saved ? JSON.parse(saved) : defaultRecipes;
}

function saveRecipes(recipes) {
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

// ===============================
// Render daftar resep
// ===============================
function renderRecipes(recipes) {
  const recipeList = document.getElementById("recipeList");
  recipeList.innerHTML = "";

  if (recipes.length === 0) {
    recipeList.innerHTML = "<p style='text-align:center;'>Tidak ada resep ditemukan.</p>";
    return;
  }

  recipes.forEach((recipe, index) => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <h3>${recipe.title}</h3>
      <p><strong>Kategori:</strong> ${recipe.category}</p>
      <button onclick="viewRecipe(${index})">Lihat</button>
      <button onclick="deleteRecipe(${index})" style="background-color:#d32f2f;">Hapus</button>
    `;
    recipeList.appendChild(card);
  });
}

// ===============================
// Lihat detail resep (modal)
// ===============================
function viewRecipe(index) {
  const recipe = recipes[index];
  document.getElementById("modalTitle").textContent = recipe.title;
  document.getElementById("modalCategory").textContent = recipe.category;
  document.getElementById("modalIngredients").textContent = recipe.ingredients;
  document.getElementById("modalSteps").textContent = recipe.steps;

  const modal = document.getElementById("recipeModal");
  modal.style.display = "flex";
}

document.getElementById("closeModal").onclick = function () {
  document.getElementById("recipeModal").style.display = "none";
};

window.onclick = function (event) {
  const modal = document.getElementById("recipeModal");
  if (event.target === modal) modal.style.display = "none";
};

// ===============================
// Tambah resep baru
// ===============================
const form = document.getElementById("addRecipeForm");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("recipeTitle").value.trim();
  const category = document.getElementById("recipeCategory").value.trim();
  const ingredients = document.getElementById("recipeIngredients").value.trim();
  const steps = document.getElementById("recipeSteps").value.trim();

  if (!title || !category || !ingredients || !steps) {
    alert("Harap isi semua kolom!");
    return;
  }

  const newRecipe = { title, category, ingredients, steps };
  recipes.push(newRecipe);
  saveRecipes(recipes);
  renderRecipes(recipes);
  form.reset();
});

// ===============================
// Hapus resep
// ===============================
function deleteRecipe(index) {
  if (confirm("Apakah kamu yakin ingin menghapus resep ini?")) {
    recipes.splice(index, 1);
    saveRecipes(recipes);
    renderRecipes(recipes);
  }
}

// ===============================
// Reset semua resep ke default
// ===============================
document.getElementById("resetButton").addEventListener("click", () => {
  if (confirm("Hapus semua resep dan kembalikan ke default?")) {
    localStorage.removeItem("recipes");
    recipes = [...defaultRecipes];
    renderRecipes(recipes);
  }
});

// ===============================
// Filter & pencarian
// ===============================
document.getElementById("searchInput").addEventListener("input", function (e) {
  const search = e.target.value.toLowerCase();
  const filtered = recipes.filter(
    (r) =>
      r.title.toLowerCase().includes(search) ||
      r.category.toLowerCase().includes(search)
  );
  renderRecipes(filtered);
});

document.getElementById("categoryFilter").addEventListener("change", function (e) {
  const cat = e.target.value;
  if (cat === "semua") {
    renderRecipes(recipes);
  } else {
    const filtered = recipes.filter((r) => r.category.toLowerCase() === cat);
    renderRecipes(filtered);
  }
});

// ===============================
// Inisialisasi awal
// ===============================
let recipes = loadRecipes();
renderRecipes(recipes);
