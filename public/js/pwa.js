export function setupInstall() {
  const button = document.querySelector("#install-btn");
  let promptEvent = null;

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    promptEvent = event;
    if (button) button.hidden = false;
  });

  button?.addEventListener("click", async () => {
    if (!promptEvent) return;
    promptEvent.prompt();
    try {
      await promptEvent.userChoice;
    } catch {
      /* the browser dismissed the sheet */
    }
    promptEvent = null;
    button.hidden = true;
  });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }
}
