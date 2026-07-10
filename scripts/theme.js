// Dark/light theme toggle. The page auto-follows the system (via CSS color-scheme);
// the toggle only stores an override in localStorage when it differs from the system.

function systemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function toggleTheme() {
  const root = document.documentElement;
  const current = root.getAttribute("data-theme") || systemTheme();
  const next = current === "dark" ? "light" : "dark";
  if (next === systemTheme()) {
    // Picking the system's own theme clears the override so it auto-follows again.
    root.removeAttribute("data-theme");
    try {
      localStorage.removeItem("theme");
    } catch (error) {}
  } else {
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (error) {}
  }
}

export function initTheme() {
  // If a saved theme already matches the system, drop it so the page keeps auto-following.
  if (document.documentElement.getAttribute("data-theme") === systemTheme()) {
    document.documentElement.removeAttribute("data-theme");
    try {
      localStorage.removeItem("theme");
    } catch (error) {}
  }
  document
    .getElementById("theme-toggle")
    .addEventListener("click", toggleTheme);
}
