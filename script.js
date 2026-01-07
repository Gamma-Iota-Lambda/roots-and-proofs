const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

const tierButtons = Array.from(document.querySelectorAll(".tier-btn"));
const tierLabel = document.getElementById("tierLabel");
const cardsRoot = document.getElementById("ticketCards");

const DATA = {
  tiers: {
    early:   { label: "Early Bird", suffix: "Early Bird" },
    general: { label: "General",    suffix: "General" },
    late:    { label: "Late Minute",suffix: "Late Minute" }
  },
  packages: [
    {
      key: "ga",
      name: "General Admission (GA)",
      badge: "ENTRY",
      popular: false,
      prices: { early: 30, general: 50, late: 60 },
      entryTime: "9:00 PM",
      highlights: [
        "Customized cups",
        "Tasting bites (while supplies last)",
        "Complimentary wristbands",
        "One complimentary drink",
        "Exclusive discount code to Happy Cork"
      ],
      features: [
        { text: "Customized cups", ok: true },
        { text: "Tasting bites (while supplies last)", ok: true },
        { text: "Complimentary wristbands", ok: true },
        { text: "One complimentary drink", ok: true },
        { text: "Exclusive discount code to Happy Cork", ok: true },
        { text: "VIP priority check-in after 9 PM", ok: false },
        { text: "Priority check-in after 9 PM", ok: false },
        { text: "Access to limited bar seating", ok: false },
        { text: "Specialty cocktails sampling (7–9)", ok: false },
        { text: "VIP cocktail-making demo", ok: false },
        { text: "Annual Roots Toast (9 PM)", ok: false },
        { text: "Branded gift bag", ok: false },
        { text: "Reserved seating / private section", ok: false }
      ]
    },
    {
      key: "golden",
      name: "Golden Experience",
      badge: "MOST POPULAR",
      popular: true,
      prices: { early: 60, general: 80, late: 90 },
      entryTime: "7:00 PM",
      highlights: [
        "Everything in GA",
        "Priority/VIP check-in after 9 PM",
        "Limited bar seating access (7–9 PM)",
        "Specialty cocktails sampling (7–9)",
        "Cocktail-making demo + Roots Toast"
      ],
      features: [
        { text: "Customized cups", ok: true },
        { text: "Tasting bites (while supplies last)", ok: true },
        { text: "Complimentary wristbands", ok: true },
        { text: "One complimentary drink", ok: true },
        { text: "Exclusive discount code to Happy Cork", ok: true },
        { text: "VIP priority check-in after 9 PM", ok: true },
        { text: "Priority check-in after 9 PM", ok: true },
        { text: "Access to limited bar seating (7:00 PM – 9:00 PM)", ok: true },
        { text: "Specialty cocktails sampling (7–9)", ok: true },
        { text: "VIP cocktail-making demo", ok: true },
        { text: "Annual Roots Toast (9 PM)", ok: true },
        { text: "Branded gift bag", ok: false },
        { text: "Reserved seating / private section", ok: false }
      ]
    },
    {
      key: "vip",
      name: "VIP",
      badge: "PREMIUM",
      popular: false,
      prices: { early: 500, general: 500, late: 500 },
      entryTime: "7:00 PM",
      highlights: [
        "Upgraded cups",
        "Reserved seating / private section",
        "Extended limited bar seating (7 PM – 2 AM)",
        "Swag bag",
        "All Golden Experience benefits"
      ],
      features: [
        { text: "Customized cups (upgraded)", ok: true },
        { text: "Tasting bites (while supplies last)", ok: true },
        { text: "Complimentary wristbands", ok: true },
        { text: "One complimentary drink", ok: true },
        { text: "Exclusive discount code to Happy Cork", ok: true },
        { text: "VIP priority check-in after 9 PM", ok: true },
        { text: "Priority check-in after 9 PM", ok: true },
        { text: "Access to limited bar seating (7:00 PM – 2:00 AM)", ok: true },
        { text: "Specialty cocktails sampling (7–9)", ok: true },
        { text: "VIP cocktail-making demo", ok: true },
        { text: "Annual Roots Toast (9 PM)", ok: true },
        { text: "Swag bag", ok: true },
        { text: "Reserved seating / private section", ok: true }
      ]
    }
  ]
};

let currentTier = "early";

function money(n){
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

function icon(ok){
  return ok ? "✓" : "–";
}

function renderCards(){
  const tierMeta = DATA.tiers[currentTier];
  tierLabel.textContent = tierMeta.label;

  cardsRoot.innerHTML = DATA.packages.map(pkg => {
    const price = pkg.prices[currentTier];
    const featureRows = pkg.features.map(f => `
      <div class="feature">
        <span class="icon" aria-hidden="true">${icon(f.ok)}</span>
        <span>${f.text}</span>
      </div>
    `).join("");

    const highlightText = pkg.highlights.join(" • ");

    return `
      <article class="card ${pkg.popular ? "popular" : ""}">
        <div class="badge">${pkg.badge}</div>
        <h3>${pkg.name}</h3>
        <p class="sub">${highlightText}</p>

        <div class="price">
          <div class="amount">${money(price)}</div>
          <div class="tier">${tierMeta.suffix}</div>
        </div>

        <div class="meta">
          <div class="meta-item">
            <span>Entry time</span>
            <span>${pkg.entryTime}</span>
          </div>
          <div class="meta-item">
            <span>Includes</span>
            <span>See benefits below</span>
          </div>
        </div>

        <div class="features">
          ${featureRows}
        </div>

        <div class="card-actions">
          <!-- Replace href with your ticket link -->
          <a class="btn ${pkg.popular ? "btn-gold" : "btn-ghost"}"
             href="https://example.com"
             target="_blank" rel="noreferrer">
            Buy ${pkg.name}
          </a>
          <a class="btn btn-ghost" href="#faq">FAQ</a>
        </div>
      </article>
    `;
  }).join("");
}

function setTier(nextTier){
  currentTier = nextTier;

  tierButtons.forEach(btn => {
    const isActive = btn.dataset.tier === nextTier;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  renderCards();
}

tierButtons.forEach(btn => {
  btn.addEventListener("click", () => setTier(btn.dataset.tier));
});

renderCards();
