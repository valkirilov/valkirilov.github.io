// Entry point: wires the modules together, plus the intro animation.

import { initModal, closeModal, isModalOpen, stepProject } from "./modal.js";
import {
  initGallery,
  isLightboxOpen,
  closeLightbox,
  stepLightbox,
} from "./gallery.js";
import { initTheme } from "./theme.js";

function init() {
  initModal();
  initGallery();
  initMoreToggle();
  initTheme();
  initKeyboard();
  centerHero();
  typeTagline();
}

function initMoreToggle() {
  const toggle = document.getElementById("more-toggle");
  const moreProjects = document.getElementById("more-projects");
  toggle.addEventListener("click", function () {
    moreProjects.hidden = !moreProjects.hidden;
    toggle.textContent = moreProjects.hidden ? "More projects" : "Show less";
  });
}

// Lightbox handles keys first (arrows + escape); otherwise escape/arrows drive the modal.
function initKeyboard() {
  document.addEventListener("keydown", function (event) {
    if (isLightboxOpen()) {
      if (event.key === "Escape") {
        closeLightbox();
      } else if (event.key === "ArrowLeft") {
        stepLightbox(-1);
      } else if (event.key === "ArrowRight") {
        stepLightbox(1);
      }
      return;
    }
    if (isModalOpen()) {
      if (event.key === "Escape") {
        closeModal();
      } else if (event.key === "ArrowLeft") {
        stepProject(-1);
      } else if (event.key === "ArrowRight") {
        stepProject(1);
      }
    }
  });
}

/* ---------------- Intro ---------------- */

// Type the tagline, fast for the lead-in, slower for the "writing code." accent,
// then reveal the sections below one after another.
function typeTagline() {
  const tagline = document.querySelector(".tagline");
  const segments = [
    {
      element: tagline.querySelector(".type-normal"),
      text: "I'm trying to make the world a better place by ",
      speed: 16,
    },
    {
      element: tagline.querySelector(".type-accent"),
      text: "writing code.",
      speed: 55,
    },
  ];
  let segmentIndex = 0;
  let position = 0;

  function step() {
    if (segmentIndex >= segments.length) {
      tagline.classList.remove("typing");
      tagline.classList.add("done");
      liftAndReveal();
      return;
    }
    const segment = segments[segmentIndex];
    segment.element.textContent += segment.text.charAt(position);
    position++;
    if (position >= segment.text.length) {
      segmentIndex++;
      position = 0;
    }
    setTimeout(step, segment.speed);
  }

  setTimeout(function () {
    tagline.classList.add("typing");
    step();
  }, 1300); // start after the initial delay + hero fade-in
}

// Translate the hero down to the viewport centre for the intro. Pure transform, so the
// page height and scroll position stay put (no scrollbar). Only moves down, never up.
function centerHero() {
  const stage = document.querySelector(".stage");
  const rect = stage.getBoundingClientRect();
  const offset = (window.innerHeight - rect.height) / 2 - rect.top;
  if (offset > 0) {
    stage.style.transform = "translateY(" + offset + "px)";
  }
}

// Hold a beat on the finished slogan, glide the hero up to the top, then fade the rest in.
function liftAndReveal() {
  const stage = document.querySelector(".stage");
  const projectsSection = document.querySelector(".projects");
  const contactsSection = document.querySelector(".contacts");
  setTimeout(function () {
    stage.style.transition = "transform .9s cubic-bezier(.7,0,.2,1)";
    stage.style.transform = "translateY(0)";
  }, 350); // pause, then lift
  setTimeout(function () {
    projectsSection.classList.add("show");
  }, 350 + 900); // after the lift settles
  setTimeout(function () {
    contactsSection.classList.add("show");
  }, 350 + 1080);
}

init();
