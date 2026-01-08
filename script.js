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

const DATA = [
  {
    key: "ga",
    name: "General Admission (GA)",
    badge: "GENERAL ADMISSION",
    popular: true,
    price: 30,
    metaLeft: "Entry: 9:00 PM",
    metaRight: "Includes GA perks",
    description:
      "Your standard entry ticket provides access to the full experience beginning at 9:00 PM.",
    cta: { label: "Buy now", href: TICKET_LINK },
    features: [
      "One complimentary drink",
      "Tasting bites (while supplies last)",
      "Customized event cup",
      "Complimentary wristband",
      "All tickets are tax-deductible"
    ]
  },
  {
    key: "golden",
    name: "Golden Experience",
    badge: "VIP ADD-ON",
    popular: false,
    price: 60,
    metaLeft: "Add-on (requires GA)",
    metaRight: "Early entry: 7–9 PM",
    description:
      "An add-on that must be paired with a General Admission ticket. Unlock early entry and VIP-only experiences, plus guaranteed access to the 9 PM Roots Toast.",
    cta: { label: "Buy now", href: TICKET_LINK },
    features: [
      "VIP-only specialty cocktails sampling (7:00–9:00 PM)",
      "Priority check-in",
      "Access to limited bar seating (7:00–9:00 PM)",
      "Live cocktail-making demo",
      "Guaranteed participation in the 9 PM Annual Roots Toast",
      "Includes all GA perks",
      "All tickets are tax-deductible"
    ]
  },
  {
    key: "vip",
    name: "VIP",
    badge: "SECTION",
    popular: false,
    price: 500,
    metaLeft: "Group ticket (includes 7)",
    metaRight: "Entry: 7:00 PM",
    description:
      "The most elevated way to experience Roots & Proofs — private reserved section with guaranteed seating, early entry, and full VIP perks.",
    cta: { label: "Buy now", href: TICKET_LINK },
    features: [
      "Includes 7 tickets",
      "VIP priority check-in",
      "Private reserved section with guaranteed seating all night",
      "Upgraded customized cups",
      "Tasting bites (while supplies last)",
      "One complimentary drink",
      "Complimentary Wristbands",
      "Specialty cocktails sampling (7:00–9:00 PM)",
      "Access to the cocktail-making demo",
      "Guaranteed participation in the 9 PM Annual Roots Toast",
      "Branded swag bag",
      "All section ticket purchases are tax-deductible"
    ]
  }
];

// Shared GA benefits (used for Pour tickets)
/*const GA_BENEFITS = [
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
  }
];*/

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
        </div>
      </article>
    `;
  }).join("");
}

render();

/*const gridRoot = document.getElementById("ticketGrid");

const TICKET_GRID = {
  columns: ["General Admission (GA)", "Golden Experience", "VIP"],
  rows: [
    { label: "Early Bird Price", values: ["$30.00", "$60.00", "$500.00"] },
    { label: "General Admin Price", values: ["$50.00", "$80.00", "$500.00"] },
    { label: "Late Minute Price", values: ["$60.00", "$90.00", "$500.00"] },
    { label: "Entry Time", values: ["9:00 PM", "7:00 PM", "7:00 PM"] },
    { label: "Customized Cups", values: ["Yes", "Yes", "Yes (Upgraded Cups)"] },
    { label: "Tasting Bites (while supplies last)", values: ["Yes", "Yes", "Yes"] },
    { label: "Complimentary Wristbands", values: ["Yes", "Yes", "Yes"] },
    { label: "One complimentary drink", values: ["Yes", "Yes", "Yes"] },
    { label: "Exclusive Discount Code to Happy Cork", values: ["Yes", "Yes", "Yes"] },
    { label: "VIP priority check-in after 9 PM", values: ["No", "Yes", "Yes"] },
    { label: "Priority check-in after 9 PM", values: ["No", "Yes", "Yes"] },
    { label: "Access to Limited Bar Seating", values: ["No", "Yes - 7:00 PM - 9:00 PM", "Yes - 7:00 PM - 2:00 AM"] },
    { label: "Specialty Cocktails (between 7-9) Sampling", values: ["No", "Yes", "Yes"] },
    { label: "VIP Cocktail-Making Demo", values: ["No", "Yes", "Yes"] },
    { label: "Annual Roots Toast (9 PM)", values: ["No", "Yes", "Yes"] },
    { label: "Branded Gift Bag", values: ["No", "No", "Swag Bag"] },
    { label: "Reserved Seating / Private Section", values: ["No", "No", "Yes"] }
  ]
};

function renderTicketGrid(){
  if (!gridRoot) return;

  const headerCols = TICKET_GRID.columns.map(c => `<th>${c}</th>`).join("");

  const bodyRows = TICKET_GRID.rows.map(r => {
    const tds = r.values.map(v => `<td>${v}</td>`).join("");
    return `<tr><th class="rowhead">${r.label}</th>${tds}</tr>`;
  }).join("");

  gridRoot.innerHTML = `
    <div class="ticket-grid-wrap">
      <table class="ticket-grid" role="table" aria-label="Ticket package comparison">
        <thead>
          <tr>
            <th class="corner">Ticket Prices</th>
            ${headerCols}
          </tr>
        </thead>
        <tbody>
          ${bodyRows}
        </tbody>
      </table>
    </div>
  `;
}

renderTicketGrid();
*/
