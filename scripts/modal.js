// The project modal: opens from a card, renders the gallery + description + link buttons,
// and lets you step between projects with the side arrows (hidden on mobile via CSS).

import { projects } from "./config.js";
import { buildGallery } from "./gallery.js";
import { createTrap } from "./focus.js";

const projectKeys = Object.keys(projects);
let modal;
let trap;
let currentProjectIndex = 0;

export function initModal() {
  modal = document.getElementById("modal");
  trap = createTrap(modal);

  document.querySelectorAll(".card[data-project]").forEach(function (card) {
    card.addEventListener("click", function () {
      openModal(card.getAttribute("data-project"));
    });
  });

  modal.addEventListener("click", function (event) {
    if (
      event.target === modal ||
      event.target.classList.contains("modal-close")
    ) {
      closeModal();
    }
  });

  // Prev/next controls live both in the side track (desktop) and the header (mobile).
  modal.querySelectorAll("[data-step]").forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      stepProject(parseInt(button.getAttribute("data-step"), 10));
    });
  });
}

export function openModal(key) {
  const project = projects[key];
  if (!project) {
    return;
  }

  const wasOpen = !modal.hidden;
  currentProjectIndex = projectKeys.indexOf(key);
  modal.querySelector(".modal-title").textContent = project.title;
  modal.querySelector(".modal-body").textContent = project.body;

  buildGallery(project);
  buildActions(project);

  modal.hidden = false;
  // Don't re-trap when just stepping between projects.
  if (!wasOpen) {
    trap.activate();
  }
}

// Move to the previous/next project while the modal stays open (wraps around).
export function stepProject(direction) {
  currentProjectIndex =
    (currentProjectIndex + direction + projectKeys.length) % projectKeys.length;
  openModal(projectKeys[currentProjectIndex]);
}

export function closeModal() {
  modal.hidden = true;
  trap.release();
}

export function isModalOpen() {
  return !modal.hidden;
}

// Render one button per link: the first is filled, the rest are outlined (colors in CSS).
function buildActions(project) {
  const actions = modal.querySelector(".modal-actions");
  actions.innerHTML = "";
  (project.links || []).forEach(function (link, index) {
    const anchor = document.createElement("a");
    anchor.className = "modal-link " + (index === 0 ? "primary" : "secondary");
    anchor.href = link.url;
    anchor.target = "_blank";
    anchor.rel = "noopener";
    anchor.textContent = link.label;
    actions.appendChild(anchor);
  });
}
