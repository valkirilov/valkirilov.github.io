// Minimal focus trap for the dialogs: keeps Tab inside the container while open,
// focuses it on activate, and returns focus to the opener on release.

const FOCUSABLE =
  'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';

export function createTrap(container) {
  let opener = null;

  function visibleFocusables() {
    return Array.from(container.querySelectorAll(FOCUSABLE)).filter(
      (element) => element.offsetParent !== null,
    );
  }

  function onKeydown(event) {
    if (event.key !== "Tab") {
      return;
    }
    const items = visibleFocusables();
    if (!items.length) {
      event.preventDefault();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return {
    activate() {
      opener = document.activeElement;
      container.addEventListener("keydown", onKeydown);
      container.focus();
    },
    release() {
      container.removeEventListener("keydown", onKeydown);
      if (opener && typeof opener.focus === "function") {
        opener.focus();
      }
      opener = null;
    },
  };
}
