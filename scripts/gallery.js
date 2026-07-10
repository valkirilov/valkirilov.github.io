// Project screenshot gallery (the thumbnail row in the modal) and the full-screen lightbox.

import { createTrap } from "./focus.js";

let modal;
let lightbox;
let lightboxImage;
let trap;
let lightboxImages = [];
let lightboxIndex = 0;

export function initGallery() {
  modal = document.getElementById("modal");
  lightbox = document.getElementById("lightbox");
  lightboxImage = lightbox.querySelector(".lightbox-img");
  trap = createTrap(lightbox);

  lightbox
    .querySelector(".lightbox-close")
    .addEventListener("click", closeLightbox);
  lightbox
    .querySelector(".lightbox-nav.prev")
    .addEventListener("click", function (event) {
      event.stopPropagation();
      stepLightbox(-1);
    });
  lightbox
    .querySelector(".lightbox-nav.next")
    .addEventListener("click", function (event) {
      event.stopPropagation();
      stepLightbox(1);
    });
  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

// Main screenshot as a banner, plus a row of thumbnails that open the lightbox.
export function buildGallery(project) {
  const gallery = modal.querySelector(".modal-gallery");
  const screenshotImage = modal.querySelector(".modal-shot");
  const thumbnailsContainer = modal.querySelector(".modal-thumbs");
  thumbnailsContainer.innerHTML = "";

  if (!project.screenshot) {
    gallery.hidden = true;
    return;
  }

  screenshotImage.src = project.screenshot;
  screenshotImage.alt = project.title + " screenshot";
  gallery.hidden = false;

  if (project.screenshots && project.screenshots.length) {
    project.screenshots.forEach(function (source, index) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "modal-thumb";
      const image = document.createElement("img");
      image.src = source;
      image.alt = project.title + " screenshot";
      button.appendChild(image);
      button.addEventListener("click", function () {
        openLightbox(project.screenshots, index, project.title);
      });
      thumbnailsContainer.appendChild(button);
    });
    thumbnailsContainer.hidden = false;
  } else {
    thumbnailsContainer.hidden = true;
  }
}

function openLightbox(images, index, title) {
  lightboxImages = images;
  lightboxIndex = index;
  lightboxImage.alt = (title || "") + " screenshot";
  lightboxImage.src = lightboxImages[lightboxIndex];
  lightbox.hidden = false;
  trap.activate();
}

export function stepLightbox(direction) {
  if (!lightboxImages.length) {
    return;
  }
  lightboxIndex =
    (lightboxIndex + direction + lightboxImages.length) % lightboxImages.length;
  lightboxImage.src = lightboxImages[lightboxIndex];
}

export function closeLightbox() {
  lightbox.hidden = true;
  trap.release();
}

export function isLightboxOpen() {
  return !lightbox.hidden;
}
