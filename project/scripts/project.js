const pokemonRoster = [
  {
    id: 1,
    name: `Pikachu`,
    type: `electric`,
    role: `Fast Attacker`,
    region: `Kanto`,
    starterFriendly: true,
    image: `images/pikachu.webp`,
    imageAlt: `Pikachu standing with electricity around its cheeks.`,
    description: `A quick electric option that pressures opponents with speed and reliable damage.`
  },
  {
    id: 2,
    name: `Charizard`,
    type: `fire`,
    role: `Special Sweeper`,
    region: `Kanto`,
    starterFriendly: true,
    image: `images/charizard.webp`,
    imageAlt: `Charizard spreading its wings and preparing to attack.`,
    description: `A powerful fire attacker that adds offensive pressure and strong coverage.`
  },
  {
    id: 3,
    name: `Blastoise`,
    type: `water`,
    role: `Defender`,
    region: `Kanto`,
    starterFriendly: true,
    image: `images/blastoise.webp`,
    imageAlt: `Blastoise facing forward with its water cannons visible.`,
    description: `A bulky water choice that helps absorb damage and gives a team better staying power.`
  },
  {
    id: 4,
    name: `Venusaur`,
    type: `grass`,
    role: `Status Support`,
    region: `Kanto`,
    starterFriendly: true,
    image: `images/venusaur.webp`,
    imageAlt: `Venusaur standing with the large flower on its back.`,
    description: `A balanced grass option that can apply pressure with status and strong utility.`
  },
  {
    id: 5,
    name: `Alakazam`,
    type: `psychic`,
    role: `Glass Cannon`,
    region: `Kanto`,
    starterFriendly: false,
    image: `images/alakazam.webp`,
    imageAlt: `Alakazam holding spoons in a battle pose.`,
    description: `A high-speed psychic attacker that hits hard but needs careful positioning.`
  },
  {
    id: 6,
    name: `Dragonite`,
    type: `dragon`,
    role: `Late-Game Cleaner`,
    region: `Kanto`,
    starterFriendly: false,
    image: `images/dragonite.webp`,
    imageAlt: `Dragonite smiling with wings open.`,
    description: `A durable dragon option that brings excellent all-around stats and late-game pressure.`
  },
  {
    id: 7,
    name: `Snorlax`,
    type: `normal`,
    role: `Tank`,
    region: `Kanto`,
    starterFriendly: true,
    image: `images/snorlax.webp`,
    imageAlt: `Snorlax sitting calmly with its large body forward.`,
    description: `A defensive wall that helps a team absorb hits and slow down aggressive opponents.`
  },
  {
    id: 8,
    name: `Lucario`,
    type: `steel`,
    role: `Flexible Striker`,
    region: `Sinnoh`,
    starterFriendly: true,
    image: `images/lucario.webp`,
    imageAlt: `Lucario in a fighting pose ready for battle.`,
    description: `A versatile fighter that can fit multiple roles and adds useful steel coverage.`
  }
];

document.addEventListener(`DOMContentLoaded`, () => {
  updateYear();
  setupMenu();
  renderFeaturedPokemon();
  renderRoster();
  renderFavorites();
  setupFilter();
  setupForm();
  preloadTrainerName();
});

function updateYear() {
  const yearSpan = document.querySelector(`#currentyear`);

  if (yearSpan) {
    yearSpan.textContent = `${new Date().getFullYear()}`;
  }
}

function setupMenu() {
  const button = document.querySelector(`.menu-toggle`);
  const nav = document.querySelector(`.site-nav`);

  if (!button || !nav) {
    return;
  }

  button.addEventListener(`click`, () => {
    const isOpen = nav.classList.toggle(`open`);
    button.setAttribute(`aria-expanded`, `${isOpen}`);
  });
}

function renderFeaturedPokemon() {
  const featuredContainer = document.querySelector(`#featured-pokemon`);

  if (!featuredContainer) {
    return;
  }

  const featured = pokemonRoster.filter((pokemon) => pokemon.starterFriendly).slice(0, 4);
  featuredContainer.innerHTML = `${featured.map((pokemon) => buildPokemonCard(pokemon)).join(``)}`;
  attachFavoriteButtons();
}

function renderRoster(filteredList = pokemonRoster) {
  const listContainer = document.querySelector(`#pokemon-list`);
  const summary = document.querySelector(`#results-summary`);

  if (!listContainer) {
    return;
  }

  listContainer.innerHTML = `${filteredList.map((pokemon) => buildPokemonCard(pokemon)).join(``)}`;

  if (summary) {
    summary.textContent = filteredList.length === pokemonRoster.length
      ? `Showing all available Pokémon.`
      : `Showing ${filteredList.length} Pokémon for the selected filter.`;
  }

  attachFavoriteButtons();
}

function buildPokemonCard(pokemon) {
  const favorites = getFavorites();
  const isSaved = favorites.some((favorite) => favorite.id === pokemon.id);

  return `
    <article class="pokemon-card">
      <div class="pokemon-image-wrapper">
        <img
          class="pokemon-image"
          src="${pokemon.image}"
          alt="${pokemon.imageAlt}"
          width="220"
          height="220"
          loading="lazy"
        >
      </div>
      <div class="card-top">
        <span class="type-badge">${pokemon.type}</span>
        <span class="role-badge">${pokemon.role}</span>
        <h3>${pokemon.name}</h3>
        <p><strong>Region:</strong> ${pokemon.region}</p>
      </div>
      <div class="card-body">
        <p>${pokemon.description}</p>
        <p><strong>Starter Friendly:</strong> ${pokemon.starterFriendly ? `Yes` : `No`}</p>
      </div>
      <div class="card-footer">
        <span>${pokemon.starterFriendly ? `Easy to build around` : `Advanced choice`}</span>
        <button class="favorite-button ${isSaved ? `saved` : ``}" type="button" data-id="${pokemon.id}">
          ${isSaved ? `Saved` : `Save Favorite`}
        </button>
      </div>
    </article>
  `;
}

function setupFilter() {
  const filterSelect = document.querySelector(`#type-filter`);

  if (!filterSelect) {
    return;
  }

  filterSelect.addEventListener(`change`, (event) => {
    const selectedType = event.target.value;
    filterRoster(selectedType);
  });
}

function filterRoster(selectedType) {
  if (selectedType === `all`) {
    renderRoster(pokemonRoster);
    return;
  }

  const filteredPokemon = pokemonRoster.filter((pokemon) => pokemon.type === selectedType);
  renderRoster(filteredPokemon);
}

function attachFavoriteButtons() {
  const buttons = document.querySelectorAll(`.favorite-button`);

  buttons.forEach((button) => {
    button.addEventListener(`click`, () => {
      const pokemonId = Number(button.dataset.id);
      toggleFavorite(pokemonId);
    });
  });

  const removeButtons = document.querySelectorAll(`.remove-button`);

  removeButtons.forEach((button) => {
    button.addEventListener(`click`, () => {
      const pokemonId = Number(button.dataset.id);
      removeFavorite(pokemonId);
    });
  });
}

function getFavorites() {
  const storedFavorites = localStorage.getItem(`pokemonFavorites`);
  return storedFavorites ? JSON.parse(storedFavorites) : [];
}

function saveFavorites(favorites) {
  localStorage.setItem(`pokemonFavorites`, JSON.stringify(favorites));
}

function toggleFavorite(pokemonId) {
  const currentFavorites = getFavorites();
  const existingFavorite = currentFavorites.find((pokemon) => pokemon.id === pokemonId);

  if (existingFavorite) {
    const updatedFavorites = currentFavorites.filter((pokemon) => pokemon.id !== pokemonId);
    saveFavorites(updatedFavorites);
  } else {
    if (currentFavorites.length >= 6) {
      alert(`You can save up to six favorite Pokémon for your team.`);
      return;
    }

    const selectedPokemon = pokemonRoster.find((pokemon) => pokemon.id === pokemonId);

    if (selectedPokemon) {
      const updatedFavorites = [...currentFavorites, selectedPokemon];
      saveFavorites(updatedFavorites);
    }
  }

  renderFeaturedPokemon();
  renderRoster();
  renderFavorites();
}

function removeFavorite(pokemonId) {
  const currentFavorites = getFavorites();
  const updatedFavorites = currentFavorites.filter((pokemon) => pokemon.id !== pokemonId);
  saveFavorites(updatedFavorites);
  renderFeaturedPokemon();
  renderRoster();
  renderFavorites();
}

function renderFavorites() {
  const panel = document.querySelector(`#favorites-panel`);

  if (!panel) {
    return;
  }

  const favorites = getFavorites();

  if (favorites.length === 0) {
    panel.innerHTML = `<p class="favorite-empty">No favorites saved yet. Visit the Team Builder and save up to six Pokémon.</p>`;
    return;
  }

  panel.innerHTML = `
    <div class="favorite-list">
      ${favorites.map((pokemon) => `
        <div class="favorite-item">
          <div>
            <p><strong>${pokemon.name}</strong></p>
            <p>${pokemon.type} | ${pokemon.role}</p>
          </div>
          <button class="remove-button" type="button" data-id="${pokemon.id}">Remove</button>
        </div>
      `).join(``)}
    </div>
  `;

  attachFavoriteButtons();
}

function setupForm() {
  const form = document.querySelector(`#trainer-form`);
  const response = document.querySelector(`#form-response`);

  if (!form || !response) {
    return;
  }

  form.addEventListener(`submit`, (event) => {
    event.preventDefault();

    const trainerName = document.querySelector(`#trainer-name`).value.trim();
    const email = document.querySelector(`#email`).value.trim();
    const favoriteType = document.querySelector(`input[name="favorite-type"]:checked`);
    const topPokemon = document.querySelector(`#top-pokemon`).value;
    const message = document.querySelector(`#message`).value.trim();
    const wantsUpdates = document.querySelector(`#updates`).checked;

    if (!trainerName || !email || !favoriteType || !topPokemon || !message) {
      response.textContent = `Please complete all required form fields before submitting your trainer message.`;
      return;
    }

    const trainerSubmission = {
      trainerName: trainerName,
      email: email,
      favoriteType: favoriteType.value,
      topPokemon: topPokemon,
      message: message,
      wantsUpdates: wantsUpdates
    };

    localStorage.setItem(`lastTrainerSubmission`, JSON.stringify(trainerSubmission));
    localStorage.setItem(`lastTrainerName`, trainerName);

    response.textContent = wantsUpdates
      ? `Thanks, ${trainerName}. Your message was saved, and you requested future team-building updates.`
      : `Thanks, ${trainerName}. Your message was saved successfully.`;

    form.reset();
  });
}

function preloadTrainerName() {
  const nameInput = document.querySelector(`#trainer-name`);
  const response = document.querySelector(`#form-response`);
  const savedTrainerName = localStorage.getItem(`lastTrainerName`);

  if (!nameInput || !savedTrainerName) {
    return;
  }

  nameInput.value = `${savedTrainerName}`;

  if (response) {
    response.textContent = `Welcome back, ${savedTrainerName}. You can send another trainer message below.`;
  }
}