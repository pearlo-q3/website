/* Shared quiz placement and ScoreApp loader. Include this before </body> on pages with a footer. */
(function () {
  const quizUrl = "https://25f81234-0be7-41d6-ab10-5e81cf37d7c1.scoreapp.com/?sa_target=_top";
  const makeButton = () => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "hero__quiz-button";
    button.dataset.saUrl = quizUrl;
    button.dataset.saView = "popup";
    button.dataset.saSize = "full";
    button.innerHTML = "<span>Take The Product Traction Quiz</span>";
    return button;
  };

  if (!document.querySelector(".quiz-footer-band")) {
    const band = document.createElement("section");
    band.className = "quiz-footer-band";
    band.id = "quiz-footer";
    band.setAttribute("aria-labelledby", "quiz-footer-title");
    band.innerHTML = `
      <div class="container quiz-footer-band__inner">
        <div>
          <h2 id="quiz-footer-title">Is your product stuck, or just not seen yet?</h2>
          <p>Take the traction quiz. A few minutes, and you'll know where to focus.</p>
        </div>
      </div>`;
    band.querySelector(".quiz-footer-band__inner").append(makeButton());
    const footers = document.querySelectorAll("footer.footer, footer.site-footer, footer");
    const footer = footers[footers.length - 1];
    if (footer) footer.before(band);
    else document.body.append(band);
  }

  if (document.querySelector("[data-sa-url]") &&
      !document.querySelector('script[src*="static.scoreapp.com/js/integration/v1/embedding.js"]')) {
    const embed = document.createElement("script");
    embed.src = "https://static.scoreapp.com/js/integration/v1/embedding.js?v=SaJvyM";
    embed.async = true;
    embed.defer = true;
    document.body.append(embed);
  }
})();
