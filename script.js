// Main controls
const categorySelect = document.getElementById('category-select');
const variationButtons = document.getElementById('variation-buttons');
const armyImage = document.getElementById('army-image');
const modeToggle = document.getElementById('mode-toggle');
const fullscreenToggle = document.getElementById('fullscreen-toggle');

// ========== FULLSCREEN TOGGLE FOR MOBILE ==========
const imageContainer = document.getElementById('image-container');

if (fullscreenToggle) {
  fullscreenToggle.addEventListener('click', () => {
    if (!document.body.classList.contains('fullscreen-mode')) {
      if (imageContainer.requestFullscreen) {
        imageContainer.requestFullscreen();
      } else if (imageContainer.webkitRequestFullscreen) {
        imageContainer.webkitRequestFullscreen();
      } else if (imageContainer.msRequestFullscreen) {
        imageContainer.msRequestFullscreen();
      }
      document.body.classList.add('fullscreen-mode');
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      document.body.classList.remove('fullscreen-mode');
    }
  });
}

// Image map data
const imageMap = {
  german: {
    "German Army": "german.jpg",
    "German Army Winter Camo": "german_winter.jpg",
    "German Africa Corps": "german_africa.jpg"
  },
  us: {
    "United States Army": "us.jpg",
    "United States Army Winter Camo": "us_winter.jpg"
  },
  soviet: {
    "Soviet Armed Forces": "soviet.jpg"
  },
  british: {
    "British Army": "british.jpg",
    "British Eighth Army": "british_eighth.jpg"
  }
};

let currentCategory = 'german';
let currentVariation = '';
let fromMapBlock = false; // Track if faction change came from map block

// Update variations
function updateVariations() {
  const category = categorySelect.value;
  currentCategory = category;
  const variations = imageMap[category];

  variationButtons.innerHTML = "";
  Object.keys(variations).forEach((variation, index) => {
    const btn = document.createElement('button');
    btn.textContent = variation;
    btn.onclick = () => {
      showImage(category, variation);
      currentVariation = variation;
      document.querySelectorAll('#variation-buttons button')
              .forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    };
    variationButtons.appendChild(btn);

    if (!fromMapBlock && index === 0) {
      btn.click(); // Auto-select first variation only from dropdown
    }
  });

  fromMapBlock = false;
}

// Show the image based on the selected variation
function showImage(category, variation) {
  armyImage.classList.remove('visible'); // Hide image initially
  armyImage.src = imageMap[category][variation];
  armyImage.alt = variation;

  // Trigger image fade-in after it's loaded
  setTimeout(() => {
    armyImage.classList.add('visible');
  }, 100);
}

// Toggle between dark and light mode
function toggleMode() {
  const isLight = document.body.classList.toggle('light-mode');
  modeToggle.textContent = isLight ? '☀️' : '🌙';
}

// Map-selector logic
const mapSelect = document.getElementById('map-select');
const mapResult = document.getElementById('map-result');

const mapData = {
  "Carentan": {
    allies: { category: 'us', variation: 'United States Army' },
    axis:   { category: 'german', variation: 'German Army' }
  },
  "Driel": {
    allies: { category: 'british', variation: 'British Army' },
    axis:   { category: 'german', variation: 'German Army' }
  },
  "El Alamein": {
    allies: { category: 'british', variation: 'British Eighth Army' },
    axis:   { category: 'german', variation: 'German Africa Corps' }
  },
  "Elsenborn Ridge": {
    allies: { category: 'us', variation: 'United States Army Winter Camo' },
    axis:   { category: 'german', variation: 'German Army Winter Camo' }
  },
  "Foy": {
    allies: { category: 'us', variation: 'United States Army Winter Camo' },
    axis:   { category: 'german', variation: 'German Army Winter Camo' }
  },
  "Hill 400": {
    allies: { category: 'us', variation: 'United States Army Winter Camo' },
    axis:   { category: 'german', variation: 'German Army Winter Camo' }
  },
  "Hürtgen Forest": {
    allies: { category: 'us', variation: 'United States Army Winter Camo' },
    axis:   { category: 'german', variation: 'German Army Winter Camo' }
  },
  "Kharkov": {
    allies: { category: 'soviet', variation: 'Soviet' },
    axis:   { category: 'german', variation: 'German Army Winter Camo' }
  },
  "Kursk": {
    allies: { category: 'soviet', variation: 'Soviet' },
    axis:   { category: 'german', variation: 'German Army' }
  },
  "Mortain": {
    allies: { category: 'us', variation: 'United States Army' },
    axis:   { category: 'german', variation: 'German Army' }
  },
  "Omaha Beach": {
    allies: { category: 'us', variation: 'United States Army' },
    axis:   { category: 'german', variation: 'German Army' }
  },
  "Purple Heart Lane": {
    allies: { category: 'us', variation: 'United States Army' },
    axis:   { category: 'german', variation: 'German Army' }
  },
  "Remagen": {
    allies: { category: 'us', variation: 'United States Army' },
    axis:   { category: 'german', variation: 'German Army' }
  },
  "Sainte-Marie-du-Mont": {
    allies: { category: 'us', variation: 'United States Army' },
    axis:   { category: 'german', variation: 'German Army' }
  },
  "Sainte-Mère-Église": {
    allies: { category: 'us', variation: 'United States Army' },
    axis:   { category: 'german', variation: 'German Army' }
  },
  "Stalingrad": {
    allies: { category: 'soviet', variation: 'Soviet' },
    axis:   { category: 'german', variation: 'German Army Winter Camo' }
  },
  "Tobruk": {
    allies: { category: 'british', variation: 'British Eighth Army' },
    axis:   { category: 'german', variation: 'German Africa Corps' }
  },
  "Utah Beach": {
    allies: { category: 'us', variation: 'United States Army' },
    axis:   { category: 'german', variation: 'German Army' }
  }
};

mapSelect.addEventListener('change', () => {
  const map = mapSelect.value;
  if (!mapData[map]) {
    mapResult.innerHTML = '';
    return;
  }
  const { allies, axis } = mapData[map];

  mapResult.innerHTML = `
    <p>This map is played by:</p>
    <div class="map-line">
      <span>ALLIES:</span>
      <button class="map-answer" data-cat="${allies.category}" data-var="${allies.variation}">
        ${allies.variation}
      </button>
    </div>
    <div class="map-line">
      <span>AXIS:</span>
      <button class="map-answer" data-cat="${axis.category}" data-var="${axis.variation}">
        ${axis.variation}
      </button>
    </div>
  `;

  document.querySelectorAll('.map-answer').forEach(btn => {
    btn.addEventListener('click', () => {
      fromMapBlock = true;
      categorySelect.value = btn.dataset.cat;
      updateVariations();

      document.querySelectorAll('#variation-buttons button').forEach(vb => {
        if (vb.textContent === btn.dataset.var) {
          vb.click();
        }
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  categorySelect.value = 'german';
  updateVariations();
});




