const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const cardsRoot = document.getElementById("ticketCards");

// Replace with your Zeffy / ticket link (or keep one universal link).
const TICKET_LINK = "https://www.zeffy.com/en-US/ticketing/roots-and-proofs";

// Helper formatting
function money(n){
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}
function iconChar(type){
  if (type === "warn") return "!";
  if (type === "sold") return "×";
  return "✓";
}

// Shared GA benefits (used for Pour tickets)
const GA_BENEFITS = [
  "Entry at 9:00 PM",
  "One complimentary drink",
  "Tasting bites (while supplies last)",
  "Customized event cup",
  "Complimentary wristband",
  "Exclusive Happy Cork discount code (valid for one week beginning the night of the event)",
  "All tickets are tax-deductible"
];

const DATA = [
  {
    key: "early_pour",
    name: "Early Pour",
    badge: "EARLY BIRD",
    popular: true,
    price: 30,
    metaLeft: "Available until Jan 31",
    metaRight: "Entry: 9:00 PM",
    description:
      "Unlock exclusive early bird access to get inside Roots & Proofs: The Culture Amplified at the best possible price. This tier is extremely limited — once early birds sell out, they are gone!",
    cta: { label: "Get Early Pour", href: TICKET_LINK },
    features: GA_BENEFITS
  },
  {
    key: "standard_pour",
    name: "Standard Pour",
    badge: "STANDARD",
    popular: false,
    price: 50,
    metaLeft: "General admission",
    metaRight: "Entry: 9:00 PM",
    description:
      "Your standard entry ticket provides access to the full experience beginning at 9:00 PM. Same benefits as Early Bird — minus the discount in price.",
    cta: { label: "Get Standard Pour", href: TICKET_LINK },
    features: GA_BENEFITS
  },
  {
    key: "final_call",
    name: "Final Call!",
    badge: "LAST MINUTE",
    popular: false,
    price: 75,
    metaLeft: "Limited availability",
    metaRight: "Entry: 9:00 PM",
    description:
      "For those who wait until the last minute — late-purchase tickets include entry at 9:00 PM plus the full GA benefits. Do not wait!",
    cta: { label: "Get Final Call", href: TICKET_LINK },
    features: GA_BENEFITS
  },
  /*
  {
    key: "golden_experience",
    name: "Golden Experience",
    badge: "ADD-ON",
    popular: false,
    price: 30,
    metaLeft: "Add-on (requires admission)",
    metaRight: "Early entry: 7:00–9:00 PM",
    description:
      "Turn the night into a cultural journey. The Golden Experience is an add-on that must be paired with an Early/Standard/Final Call ticket and grants early entry from 7:00–9:00 PM with VIP-only benefits and guaranteed access to the 9 PM Annual Roots Toast. Begin your evening with first pours, first access, and benefits available only through The Golden Experience.",
    notice: {
      type: "warn",
      text:
        "Important: This is an add-on and does not guarantee entry. Entry requires an Early/Standard/Final Call ticket. If you purchase the add-on without admission, you will need to buy admission to enter."
    },
    cta: { label: "Add Golden Experience", href: TICKET_LINK },
    features: [
      "Early entry from 7:00–9:00 PM",
      "VIP-only specialty cocktails sampling (7:00–9:00 PM)",
      "Priority check-in",
      "Access to limited bar seating",
      "Live cocktail-making demo",
      "Guaranteed participation in the 9 PM Annual Roots Toast",
      "Includes all GA perks when paired with an admission ticket",
      "All tickets are tax-deductible"
    ]
  },
  {
    key: "gold_standard_section",
    name: "Gold Standard Section (Sold Out)",
    badge: "SOLD OUT",
    popular: false,
    price: 500,
    metaLeft: "Group ticket (includes 7 tickets)",
    metaRight: "Entry: 7:00 PM",
    description:
      "The most elevated way to experience Roots & Proofs. Ideal for groups, birthday celebrations, or supporters who want to experience culture from the best seats in the house.",
    soldOut: true,
    cta: { label: "Sold Out", href: "#" },
    features: [
      "Includes 7 tickets",
      "Early entry at 7:00 PM",
      "VIP priority check-in",
      "Private reserved section with guaranteed seating all night",
      "Upgraded customized cups",
      "Tasting bites (while supplies last)",
      "One complimentary drink",
      "Golden-menu specialty cocktails (7:00–9:00 PM)",
      "Access to the cocktail-making demo",
      "Guaranteed participation in the 9 PM Annual Roots Toast",
      "Exclusive branded swag bag",
      "All section ticket purchases are tax-deductible"
    ]
  }*/
];

function render(){
  if (!cardsRoot) return;

  cardsRoot.innerHTML = DATA.map(pkg => {
    const featuresHtml = pkg.features.map(t => `
      <div class="feature">
        <span class="icon" aria-hidden="true">${iconChar("ok")}</span>
        <span>${t}</span>
      </div>
    `).join("");

    const noticeHtml = pkg.notice ? `
      <div class="notice">
        <span class="notice-icon" aria-hidden="true">${iconChar(pkg.notice.type)}</span>
        <div class="notice-text">${pkg.notice.text}</div>
      </div>
    ` : "";

    const ctaClass = pkg.soldOut ? "btn-ghost btn-disabled" : (pkg.popular ? "btn-gold" : "btn-ghost");
    const ctaHref  = pkg.soldOut ? "javascript:void(0)" : pkg.cta.href;
    const ctaAttrs = pkg.soldOut ? `aria-disabled="true" tabindex="-1"` : `target="_blank" rel="noreferrer"`;

    return `
      <article class="card ${pkg.popular ? "popular" : ""} ${pkg.soldOut ? "sold" : ""}">
        <div class="badge">${pkg.badge}</div>

        <h3>${pkg.name}</h3>
        <p class="sub">${pkg.description}</p>

        <div class="price">
          <div class="amount">${money(pkg.price)}</div>
          <div class="tier">USD</div>
        </div>

        <div class="meta">
          <div class="meta-item">
            <span>${pkg.metaLeft || " "}</span>
            <span>${pkg.metaRight || " "}</span>
          </div>
        </div>

        ${noticeHtml}

        <div class="features">
          ${featuresHtml}
        </div>

        <div class="card-actions">
          <a class="btn ${ctaClass}" href="${ctaHref}" ${ctaAttrs}>
            ${pkg.cta.label}
          </a>
          <a class="btn btn-ghost" href="#details">Event Details</a>
        </div>
      </article>
    `;
  }).join("");
}

render();
