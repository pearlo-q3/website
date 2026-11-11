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

  const pageTitle = document.title;
  const pageDescription = document.querySelector('meta[name="description"]')?.content || "";
  const canonicalUrl = document.querySelector('link[rel="canonical"]')?.href || location.href;
  const setMeta = (selector, attribute, value) => {
    let meta = document.querySelector(selector);
    if (!meta) {
      meta = document.createElement("meta");
      const [key, keyValue] = selector.match(/\[(name|property)="([^"]+)"\]/).slice(1);
      meta.setAttribute(key, keyValue);
      document.head.append(meta);
    }
    meta.setAttribute("content", value);
  };
  const articlePage = /^\/lab\/(?!game\/)[^/]+\.html$/.test(location.pathname);
  setMeta('meta[property="og:title"]', "property", pageTitle);
  setMeta('meta[property="og:description"]', "property", pageDescription);
  setMeta('meta[property="og:url"]', "property", canonicalUrl);
  setMeta('meta[property="og:type"]', "property", articlePage ? "article" : "website");
  setMeta('meta[property="og:image"]', "property", "https://qubecatalyst.com/assets/headshot.png");
  setMeta('meta[name="twitter:card"]', "name", "summary_large_image");
  setMeta('meta[name="twitter:title"]', "name", pageTitle);
  setMeta('meta[name="twitter:description"]', "name", pageDescription);
  setMeta('meta[name="twitter:image"]', "name", "https://qubecatalyst.com/assets/headshot.png");

  const businessDescription = "Pearl Oguchi helps tech founders, scaling teams and the programmes that back them find what's stopping product growth, and fix it. 22 years building software, 9 at Meta.";
  const personDescription = "Pearl Oguchi helps tech founders and the programmes that back them work out why nobody is using their app, and fix it. She started as a software tester, has 22 years in software including nine years at Meta working on product quality across Facebook and Messenger, and founded Black Women in Tech, a community of more than 52,000 members.";
  const businessAddress = {
    "@type": "PostalAddress",
    "addressLocality": "Leighton Buzzard",
    "addressRegion": "England",
    "addressCountry": "GB"
  };
  const normalizeSchema = value => {
    if (Array.isArray(value)) return value.map(normalizeSchema);
    if (!value || typeof value !== "object") return value;
    const node = Object.fromEntries(Object.entries(value).map(([key, item]) => [key, normalizeSchema(item)]));
    const types = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
    const qubeEntity = node["@id"] === "https://qubecatalyst.com/#organization" ||
      node.url?.startsWith("https://qubecatalyst.com") ||
      String(node.name || "").toLowerCase().includes("qube catalyst");
    if ((types.includes("Organization") || types.includes("LocalBusiness")) && qubeEntity) {
      node.name = "Qube Catalyst";
      node.email = "hello@qubecatalyst.com";
      node.telephone = "+44 7417 336694";
      node.description = businessDescription;
      node.address = businessAddress;
    }
    const pearlEntity = node["@id"] === "https://qubecatalyst.com/#person" ||
      node.url?.startsWith("https://qubecatalyst.com") ||
      node.name === "Pearl Oguchi";
    if (types.includes("Person") && pearlEntity) {
      node.name = "Pearl Oguchi";
      node.jobTitle = "Founder and Fractional CPO, Qube Catalyst";
      node.email = "hello@qubecatalyst.com";
      node.telephone = "+44 7417 336694";
      node.description = personDescription;
      node.address = businessAddress;
    }
    if (types.includes("WebPage") && /^https:\/\/qubecatalyst\.com\/(?:index\.html)?$/.test(node.url || "")) {
      node.name = "Why Is No One Using Your App? | Pearl Oguchi, Qube Catalyst";
    }
    return node;
  };
  document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
    try {
      script.textContent = JSON.stringify(normalizeSchema(JSON.parse(script.textContent)));
    } catch (_) {}
  });
  const sharedSchema = document.createElement("script");
  sharedSchema.type = "application/ld+json";
  sharedSchema.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://qubecatalyst.com/#organization",
        "name": "Qube Catalyst",
        "url": "https://qubecatalyst.com/",
        "email": "hello@qubecatalyst.com",
        "telephone": "+44 7417 336694",
        "description": businessDescription,
        "address": businessAddress,
      },
      {
        "@type": "Person",
        "@id": "https://qubecatalyst.com/#person",
        "name": "Pearl Oguchi",
        "jobTitle": "Founder and Fractional CPO, Qube Catalyst",
        "url": "https://qubecatalyst.com/",
        "email": "hello@qubecatalyst.com",
        "telephone": "+44 7417 336694",
        "description": personDescription,
        "address": businessAddress,
        "worksFor": { "@id": "https://qubecatalyst.com/#organization" }
      },
      {
        "@type": "WebPage",
        "name": location.pathname === "/" || /\/index\.html$/.test(location.pathname)
          ? "Why Is No One Using Your App? | Pearl Oguchi, Qube Catalyst" : pageTitle,
        "description": pageDescription,
        "url": canonicalUrl,
        "publisher": { "@id": "https://qubecatalyst.com/#organization" },
        "author": { "@id": "https://qubecatalyst.com/#person" }
      }
    ]
  });
  document.head.append(sharedSchema);

  const pathParts = location.pathname.split("/").filter(Boolean);
  const directoryDepth = location.pathname.endsWith("/")
    ? pathParts.length
    : Math.max(0, pathParts.length - 1);
  const home = "../".repeat(directoryDepth) + "index.html";
  const privacyUrl = home.replace(/index\.html$/, "privacy.html");

  const cookieBanner = document.createElement("div");
  cookieBanner.id = "cookie-banner";
  cookieBanner.setAttribute("role", "region");
  cookieBanner.setAttribute("aria-label", "Cookie notice");
  cookieBanner.hidden = Boolean(window.QUBE_CONSENT?.getChoice() !== "denied" ||
    (() => { try { return localStorage.getItem("cookieChoice"); } catch (_) { return false; } })());
  cookieBanner.style.cssText = "position:fixed;bottom:0;left:0;right:0;z-index:1000;background:#173b3d;border-top:1px solid rgba(255,255,255,.08);color:#f3f6f5";
  cookieBanner.innerHTML = `<div style="display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1rem;max-width:1160px;margin:0 auto">
    <p style="margin:0;font-size:14px"><a href="${privacyUrl}" style="color:inherit;text-decoration:underline">We use cookies to improve your experience on our site. Learn more</a></p>
    <div style="display:flex;align-items:center;gap:.75rem;flex-shrink:0">
      <button id="cookie-reject" type="button" style="padding:.65rem 1.25rem;border-radius:999px;font-weight:600;cursor:pointer;background:#1f4d50;color:#f3f6f5;border:1px solid rgba(255,255,255,.2);min-height:48px">Reject</button>
      <button id="cookie-accept" type="button" style="padding:.65rem 1.25rem;border-radius:999px;font-weight:700;cursor:pointer;background:#44d62c;color:#173b3d;border:0;min-height:48px">Accept</button>
    </div>
  </div>`;
  document.body.append(cookieBanner);
  cookieBanner.querySelector("#cookie-accept").addEventListener("click", () => {
    window.QUBE_CONSENT?.setChoice("accepted");
    cookieBanner.hidden = true;
  });
  cookieBanner.querySelector("#cookie-reject").addEventListener("click", () => {
    window.QUBE_CONSENT?.setChoice("rejected");
    cookieBanner.hidden = true;
  });

  function loadMarketingScripts() {
    if (window.QUBE_CONSENT?.getChoice() !== "accepted") return;
    if (!document.querySelector('script[src*="js-eu1.hs-scripts.com/148410884.js"]')) {
      const hubspot = document.createElement("script");
      hubspot.src = "https://js-eu1.hs-scripts.com/148410884.js";
      hubspot.async = true;
      hubspot.defer = true;
      document.head.append(hubspot);
    }
    if (!document.querySelector('script[src*="lftracker_v1_lAxoEaKQVo17OYGd"]')) {
      window.ldfdr = window.ldfdr || function () {
        (window.ldfdr._q = window.ldfdr._q || []).push([].slice.call(arguments));
      };
      const leadfeeder = document.createElement("script");
      leadfeeder.async = true;
      leadfeeder.src = "https://sc.lfeeder.com/lftracker_v1_lAxoEaKQVo17OYGd.js";
      document.head.append(leadfeeder);
    }
  }
  loadMarketingScripts();
  window.addEventListener("qube:consent", loadMarketingScripts);

  const trackLeadAction = (name, details = {}) => {
    try {
      window.gtag?.("event", name, { ...details, page: location.pathname });
    } catch (_) {}
  };
  let contactFormLeadSent = false;
  window.QUBE_FORM_SUCCESS = formId => {
    if (contactFormLeadSent || formId !== "a9988348-2b93-4285-9941-4bb6f8364a87") return;
    contactFormLeadSent = true;
    trackLeadAction("generate_lead", { form_id: formId, location: "contact_form" });
  };
  const actionLocation = element => {
    if (element.closest(".contact-topbar")) return "top_banner";
    if (element.closest("footer")) return "footer";
    const section = element.closest("section");
    if (section) return section.id || (section.classList[0] || "section");
    return "page";
  };
  document.addEventListener("click", event => {
    const element = event.target.closest("a, button");
    if (!element) return;
    const href = element.getAttribute("href") || "";
    const locationName = actionLocation(element);
    if (/^tel:/i.test(href) || element.hasAttribute("data-site-phone")) {
      trackLeadAction("call_click", { location: locationName });
    } else if (/meetings-eu1\.hubspot\.com/i.test(href) || element.hasAttribute("data-site-booking")) {
      trackLeadAction("booking_click", { location: locationName });
    } else if (/wa\.me/i.test(href) || element.classList.contains("floating-whatsapp") || element.hasAttribute("data-site-whatsapp")) {
      trackLeadAction("whatsapp_click", { location: locationName });
    } else if (element.hasAttribute("data-sa-url") || element.classList.contains("hero__quiz-button")) {
      trackLeadAction("quiz_open", { location: locationName });
    }
  });
  window.addEventListener("hs-form-event:on-submission:success", event => {
    const detail = event.detail || {};
    const formId = detail.formId || detail.form_id || detail.id || detail.data?.formId;
    if (formId === "a9988348-2b93-4285-9941-4bb6f8364a87") window.QUBE_FORM_SUCCESS(formId);
  });
  const topbar = document.createElement("div");
  topbar.className = "contact-topbar";
  topbar.innerHTML = `<div class="contact-topbar__inner">
    <a class="contact-topbar__phone" href="${telHref}">${svg(phoneIcon, "Phone")}<span>Call us <span class="contact-topbar__number">${config.phone}</span></span></a>
    <span class="contact-topbar__or" aria-hidden="true">OR</span>
    <a class="contact-topbar__booking" href="${config.bookingUrl}" target="_blank" rel="noopener noreferrer">${config.bookingLabel}</a>
  </div>`;
  nav.before(topbar);

  const links = [
    ["Home", home],
    ["For founders", home + "#founders"],
    ["For scaling teams", home + "#scaling"],
    ["For programmes", home + "#programmes"],
    ["Testimonials", home + "#testimonials"],
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
