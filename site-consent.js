/* Run synchronously in <head>, before Google Analytics is configured. */
(function () {
  const key = "cookieChoice";
  const granted = {
    analytics_storage: "granted",
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted"
  };
  const denied = {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  };
  let choice = "denied";
  try {
    choice = localStorage.getItem(key) === "accepted" ? "accepted" :
      localStorage.getItem(key) === "rejected" ? "rejected" : "denied";
  } catch (_) {}

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag("consent", "default", { ...denied, wait_for_update: 500 });
  if (choice === "accepted") window.gtag("consent", "update", granted);
  else if (choice === "rejected") window.gtag("consent", "update", denied);
  window.gtag("js", new Date());
  window.gtag("config", "G-4FJNXE3M7L");

  const googleTag = document.createElement("script");
  googleTag.async = true;
  googleTag.src = "https://www.googletagmanager.com/gtag/js?id=G-4FJNXE3M7L";
  document.head.append(googleTag);

  window.QUBE_CONSENT = {
    getChoice: () => choice,
    setChoice(nextChoice) {
      if (nextChoice !== "accepted" && nextChoice !== "rejected") return;
      choice = nextChoice;
      try { localStorage.setItem(key, nextChoice); } catch (_) {}
      window.gtag("consent", "update", nextChoice === "accepted" ? granted : denied);
      window.dispatchEvent(new CustomEvent("qube:consent", { detail: { choice } }));
    }
  };
})();
