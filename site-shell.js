(function () {
  const config = window.QUBE_SITE_CONFIG;
  if (!config) return;

  const digits = value => String(value).replace(/\D/g, "");
  const ukDigits = value => {
    const number = digits(value);
    return number.startsWith("0") ? "44" + number.slice(1) : number.replace(/^00/, "");
  };
  const telHref = "tel:+" + ukDigits(config.phone);
  const whatsappHref = "https://wa.me/" + ukDigits(config.whatsapp) + "?text=" +
    encodeURIComponent(config.whatsappMessage);

  const svg = (path, label) => `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><title>${label}</title><path d="${path}"/></svg>`;
  const phoneIcon = "M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.36 2.3.56 3.6.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.26.2 2.46.56 3.6a1 1 0 0 1-.25 1z";
  const whatsappIcon = "M20.5 3.5A11.8 11.8 0 0 0 2 17.7L.5 23.5l6-1.6a11.8 11.8 0 0 0 14-18.4M12 21a9 9 0 0 1-4.6-1.3l-.3-.2-3.5.9.9-3.4-.2-.4A9 9 0 1 1 12 21m5-6.7c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-.9 1.1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.5-.5c.1-.2.2-.3.3-.5a.5.5 0 0 0 0-.5c-.1-.2-.7-1.7-1-2.3-.2-.5-.5-.4-.7-.4h-.6a1.2 1.2 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.4 13.4 0 0 0 5.1 4.5c.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4s-.2-.2-.5-.3";

  const nav = document.querySelector(".nav");
  if (!nav) return;

  const topbar = document.createElement("div");
  topbar.className = "contact-topbar";
  topbar.innerHTML = `<div class="contact-topbar__inner">
    <a class="contact-topbar__phone" href="${telHref}">${svg(phoneIcon, "Phone")}<span>Call us</span></a>
    <span class="contact-topbar__or" aria-hidden="true">OR</span>
    <a class="contact-topbar__booking" href="${config.bookingUrl}" target="_blank" rel="noopener noreferrer">${config.bookingLabel}</a>
  </div>`;
  nav.before(topbar);

  const pathParts = location.pathname.split("/").filter(Boolean);
  const directoryDepth = location.pathname.endsWith("/")
    ? pathParts.length
    : Math.max(0, pathParts.length - 1);
  const home = "../".repeat(directoryDepth) + "index.html";
  const links = [
    ["Home", home],
    ["For founders", home + "#founders"],
    ["For scaling teams", home + "#scaling"],
    ["For programmes", home + "#programmes"],
    ["Reviews", home + "#reviews"],
    ["Product Lab", "../".repeat(directoryDepth) + "lab.html"],
    ["Events", "../".repeat(directoryDepth) + "events.html"]
  ];
  const navLinks = nav.querySelector(".nav__links");
  if (navLinks) {
    navLinks.replaceChildren();
    links.forEach(([label, href]) => {
      const a = document.createElement("a");
      a.href = href;
      a.textContent = label;
      navLinks.append(a);
    });
    navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      document.body.classList.remove("nav--open");
      const button = nav.querySelector(".nav__hamburger");
      if (button) {
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-label", "Open navigation menu");
      }
    }));
  }

  nav.querySelector(".nav__cta")?.remove();
  nav.querySelector(".nav__cta-mobile")?.remove();
  const logo = nav.querySelector(".navlogo");
  if (logo) {
    let logoLink = logo.querySelector("a");
    if (!logoLink) {
      logoLink = document.createElement("a");
      logoLink.append(...Array.from(logo.childNodes));
      logo.append(logoLink);
    }
    logoLink.href = home;
    logoLink.setAttribute("aria-label", "Qube Catalyst home");
  }

  document.querySelectorAll("[data-site-booking]").forEach(link => {
    link.href = config.bookingUrl;
    if (link.hasAttribute("data-site-booking-label")) link.textContent = config.bookingLabel;
  });
  document.querySelectorAll("[data-site-phone]").forEach(link => {
    link.href = telHref;
    if (link.classList.contains("btn")) {
      link.innerHTML = `${svg(phoneIcon, "Phone")}<span>Call us</span>`;
    } else {
      link.textContent = "Call us";
    }
  });
  document.querySelectorAll("[data-site-whatsapp]").forEach(link => {
    link.href = whatsappHref;
    if (link.hasAttribute("data-whatsapp-label")) link.textContent = "WhatsApp";
  });
  document.querySelectorAll("[data-site-reviews]").forEach(link => link.href = config.googleReviewsUrl);
  document.querySelectorAll("[data-site-phone-number]").forEach(node => {
    node.textContent = config.phone;
    if (node.matches("a")) node.href = telHref;
  });

  document.querySelectorAll("a[href]").forEach(link => {
    try {
      const destination = new URL(link.href, location.href);
      if (destination.protocol.startsWith("http") && destination.origin !== location.origin) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
    } catch (_) {
      // Leave malformed or non-web links unchanged.
    }
  });

  document.querySelectorAll('script[type="application/ld+json"][data-site-schema]').forEach(script => {
    script.textContent = script.textContent
      .replaceAll("__SITE_PHONE__", config.phone)
      .replaceAll("__GOOGLE_REVIEWS__", config.googleReviewsUrl);
  });

  if (!document.querySelector(".floating-whatsapp")) {
    const floating = document.createElement("a");
    floating.className = "floating-whatsapp";
    floating.href = whatsappHref;
    floating.target = "_blank";
    floating.rel = "noopener noreferrer";
    floating.setAttribute("aria-label", "Message Pearl on WhatsApp");
    floating.innerHTML = svg(whatsappIcon, "WhatsApp");
    document.body.append(floating);
    const banner = document.getElementById("cookie-banner");
    const reposition = () => {
      const height = banner && !banner.hidden ? banner.getBoundingClientRect().height : 0;
      floating.style.bottom = `calc(${Math.ceil(height)}px + 1rem)`;
    };
    reposition();
    if (banner) new MutationObserver(reposition).observe(banner, { attributes: true, attributeFilter: ["hidden"] });
    window.addEventListener("resize", reposition);
  }
})();
