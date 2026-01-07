const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

const cardsRoot = document.getElementById("ticketCards");

const TICKET_LINK = "https://example.com"; // <-- replace with Zeffy / ticket link

const ALL_TICKETS_INCLUDE = [
  "Customized cups",
  "Tasting bites (as supplies last)",
  "Complimentary wristbands",
  "One complimentary drink",
  "Exclusive discount code to a local Black-owned liquor store (valid for one week beginning the night of the event)",
  "All tickets are tax-deductible, supporting a 501(c)(3) charitable mission"
];

const DATA = [
  {
    key: "early",
    name: "Early Pour Admission",
    badge: "VERY LIMITED",
    popular: true,
    price: 30,
    entry: "9:00 PM (Golden Add-On unlocks 7–9 PM early entry)",
    note: "Very limited — expected to sell out fast.",
    features: ALL_TICKETS_INCLUDE
  },
  {
    key: "standard",
    name: "Standard Pour Admission",
    badge: "STANDARD",
    popular: false,
    price: 50,
    entry: "9:00 PM (Golden Add-On unlocks 7–9 PM early entry)",
    note: "Full experience at standard pricing.",
    features: ALL_TICKETS_INCLUDE
  },
  {
    key: "late",
    name: "Late Pour Admission",
    badge: "LAST CALL",
    popular: false,
    price: 75,
    entry: "9:00 PM (Golden Add-On unlocks 7–9 PM early entry)",
    note: "For late deciders — secure before it increases again.",
    features: ALL_TICKETS_INCLUDE
  },
  {
    key: "golden_addon",
    name: "Golden Experience Add-On",
    badge: "ADD-ON",
    popular: false,
    price: 30,
    entry: "7:00 PM – 9:00 PM early access",
    note: "Must be paired with an Early, Standard, or Late Pour ticket.",
    features: [
      "Early entry from 7–9 PM",
      "VIP-only cocktail menu sampling",
      "Priority re-entry",
      "Live mixology demo",
      "Early access to limited bar seating",
      "Guaranteed participation in the annual 9 PM Roots Toast",
      "Extremely limited — once they’re gone, they’re gone"
    ]
  }
];

function money(n){
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

function icon(){
  return "✓";
}

function render(){
  cardsRoot.innerHTML = DATA.map(pkg => {
    const featureRows = pkg.features.map(text => `
      <div class="feature">
        <span class="icon" aria-hidden="true">${icon()}</span>
        <span>${text}</span>
      </div>
    `).join("");

    return `
      <article class="card ${pkg.popular ? "popular" : ""}">
        <div class="badge">${pkg.badge}</div>
        <h3>${pkg.name}</h3>
        <p class="sub">${pkg.note}</p>

        <div class="price">
          <div class="amount">${money(pkg.price)}</div>
          <div class="tier">USD</div>
        </div>

        <div class="meta">
          <div class="meta-item">
            <span>Entry</span>
            <span>${pkg.entry}</span>
          </div>
          <div class="meta-item">
            <span>Venue</span>
            <span>The House BK</span>
          </div>
        </div>

        <div class="features">
          ${featureRows}
        </div>

        <div class="card-actions">
          <a class="btn ${pkg.popular ? "btn-gold" : "btn-ghost"}"
             href="${TICKET_LINK}"
             target="_blank" rel="noreferrer">
            Get ${pkg.name}
          </a>
          <a class="btn btn-ghost" href="#details">Event Details</a>
        </div>
      </article>
    `;
  }).join("");
}

render();
