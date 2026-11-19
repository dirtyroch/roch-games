/** Original tile art for Roch Games. Each drawing is keyed by the `art` field in games.json. */

function shell(uid, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${inner}</svg>`;
}

function doodle(uid) {
  return shell(uid, `
    <rect width="640" height="400" fill="#ffd7a1"/>
    <circle cx="86" cy="74" r="36" fill="#ff8a3d"/>
    <circle cx="74" cy="62" r="10" fill="#fff" opacity=".45"/>
    <path d="M40 150c40 16 60-20 100-4" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".45"/>
    <g transform="translate(118 46) rotate(-4)">
      <rect x="0" y="18" width="360" height="280" rx="18" fill="#fffaf3" stroke="#2a1810" stroke-width="6"/>
      <g fill="none" stroke="#2a1810" stroke-width="5">
        <circle cx="36" cy="18" r="12"/>
        <circle cx="78" cy="18" r="12"/>
        <circle cx="120" cy="18" r="12"/>
        <circle cx="162" cy="18" r="12"/>
        <circle cx="204" cy="18" r="12"/>
        <circle cx="246" cy="18" r="12"/>
        <circle cx="288" cy="18" r="12"/>
        <circle cx="330" cy="18" r="12"/>
      </g>
      <path d="M28 78h120" stroke="#f0b429" stroke-width="8" stroke-linecap="round"/>
      <path d="M28 102h78" stroke="#7ec8e3" stroke-width="8" stroke-linecap="round"/>
      <circle cx="250" cy="120" r="36" fill="#ffe08a" stroke="#2a1810" stroke-width="5"/>
      <circle cx="250" cy="120" r="8" fill="#ff8a3d"/>
      <path d="M250 78v12M250 150v12M208 120h12M280 120h12" stroke="#2a1810" stroke-width="4" stroke-linecap="round"/>
      <path d="M70 200c18-28 40-28 54 0 10 20 8 36-8 40" fill="none" stroke="#e23d55" stroke-width="6" stroke-linecap="round"/>
      <path d="M78 214c10-16 26-16 36 0" fill="none" stroke="#e23d55" stroke-width="6" stroke-linecap="round"/>
      <path d="M150 230 l18 28 h-36z" fill="#7ec8e3" stroke="#2a1810" stroke-width="5" stroke-linejoin="round"/>
      <circle cx="210" cy="250" r="22" fill="#fff" stroke="#2a1810" stroke-width="5"/>
      <circle cx="202" cy="246" r="3" fill="#2a1810"/>
      <circle cx="218" cy="246" r="3" fill="#2a1810"/>
      <path d="M202 258c6 8 14 8 20 0" fill="none" stroke="#2a1810" stroke-width="4" stroke-linecap="round"/>
      <path d="M250 210c20-30 48-8 34 22-8 18-28 22-40 8" fill="#2f9e57" stroke="#2a1810" stroke-width="5" stroke-linejoin="round"/>
      <circle cx="276" cy="214" r="4" fill="#2a1810"/>
      <path d="M40 300c30-8 50 10 80 0" fill="none" stroke="#c2410c" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 10"/>
    </g>
    <g transform="translate(470 78) rotate(28)">
      <rect x="0" y="0" width="22" height="150" rx="8" fill="#f2c14e" stroke="#2a1810" stroke-width="5"/>
      <polygon points="0,150 22,150 11,186" fill="#f4a3b0" stroke="#2a1810" stroke-width="5" stroke-linejoin="round"/>
      <rect x="0" y="0" width="22" height="28" rx="6" fill="#e23d55" stroke="#2a1810" stroke-width="5"/>
    </g>
    <g transform="translate(500 250)">
      <rect x="0" y="20" width="70" height="90" rx="10" fill="#7ec8e3" stroke="#2a1810" stroke-width="5"/>
      <path d="M8 20c6-24 48-24 54 0" fill="none" stroke="#2a1810" stroke-width="5"/>
      <rect x="18" y="48" width="34" height="46" rx="6" fill="#c7eef8"/>
    </g>
  `);
}

function rex(uid) {
  return shell(uid, `
    <defs>
      <linearGradient id="${uid}-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#c8f5a4"/>
        <stop offset="1" stop-color="#e9fad6"/>
      </linearGradient>
    </defs>
    <rect width="640" height="400" fill="url(#${uid}-sky)"/>
    <circle cx="520" cy="78" r="42" fill="#ffe08a"/>
    <ellipse cx="320" cy="356" rx="280" ry="40" fill="#3d9a49"/>
    <ellipse cx="300" cy="348" rx="180" ry="18" fill="#67c56a"/>
    <path d="M430 250c70 20 120-10 150-50" fill="none" stroke="#3aaa4a" stroke-width="36" stroke-linecap="round"/>
    <path d="M548 198l16-22 8 20z" fill="#ffcf3a" stroke="#2a1810" stroke-width="4" stroke-linejoin="round"/>
    <ellipse cx="318" cy="268" rx="118" ry="96" fill="#4ec85f" stroke="#2a1810" stroke-width="6"/>
    <ellipse cx="318" cy="286" rx="74" ry="66" fill="#fff3c4" stroke="#2a1810" stroke-width="5"/>
    <path d="M270 270c20 8 70 8 96 0M268 292c22 8 76 8 100 0M274 314c18 6 64 6 84 0" fill="none" stroke="#e2bf6c" stroke-width="4" stroke-linecap="round"/>
    <path d="M210 168l28-52 22 40 30-58 24 48 28-42 20 38 24-28 16 36" fill="#ffcf3a" stroke="#2a1810" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>
    <ellipse cx="300" cy="132" rx="126" ry="92" fill="#62d672" stroke="#2a1810" stroke-width="6"/>
    <ellipse cx="246" cy="128" rx="24" ry="28" fill="#1d2230"/>
    <ellipse cx="338" cy="128" rx="24" ry="28" fill="#1d2230"/>
    <circle cx="254" cy="118" r="8" fill="#fff"/>
    <circle cx="346" cy="118" r="8" fill="#fff"/>
    <ellipse cx="196" cy="156" rx="16" ry="10" fill="#ff8fa0"/>
    <ellipse cx="390" cy="156" rx="16" ry="10" fill="#ff8fa0"/>
    <path d="M250 168c18 36 70 36 92 4" fill="#b8324a" stroke="#2a1810" stroke-width="5" stroke-linejoin="round"/>
    <path d="M268 176l8 12 8-10zM324 176l-8 12-8-10z" fill="#fff"/>
    <ellipse cx="230" cy="300" rx="36" ry="18" fill="#3aaa4a" stroke="#2a1810" stroke-width="5"/>
    <ellipse cx="390" cy="300" rx="36" ry="18" fill="#3aaa4a" stroke="#2a1810" stroke-width="5"/>
    <g fill="#fff4cf">
      <circle cx="210" cy="306" r="5"/><circle cx="226" cy="310" r="5"/><circle cx="242" cy="306" r="5"/>
      <circle cx="370" cy="306" r="5"/><circle cx="386" cy="310" r="5"/><circle cx="402" cy="306" r="5"/>
    </g>
    <g transform="translate(392 132) rotate(8)">
      <rect x="10" y="52" width="16" height="58" rx="8" fill="#2b2f45" stroke="#2a1810" stroke-width="4"/>
      <rect x="0" y="6" width="36" height="52" rx="16" fill="#f7f8fc" stroke="#2a1810" stroke-width="4"/>
      <path d="M7 22h22M7 32h22M7 42h22" stroke="#2a1810" stroke-width="3" stroke-linecap="round"/>
    </g>
    <path d="M120 250c-30-10-20-40 8-34" fill="none" stroke="#3aaa4a" stroke-width="16" stroke-linecap="round"/>
    <circle cx="112" cy="214" r="12" fill="#62d672" stroke="#2a1810" stroke-width="4"/>
  `);
}

function family(uid) {
  return shell(uid, `
    <defs>
      <linearGradient id="${uid}-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffb085"/>
        <stop offset=".55" stop-color="#ffcf9a"/>
        <stop offset="1" stop-color="#ffe7c4"/>
      </linearGradient>
    </defs>
    <rect width="640" height="400" fill="url(#${uid}-sky)"/>
    <circle cx="530" cy="92" r="48" fill="#ffe08a"/>
    <path d="M0 300c80-40 140-20 220-36 90-18 120 20 210 8 70-8 140-30 210-8v136H0z" fill="#6aaa58"/>
    <path d="M0 318c90-24 150-8 230-20 100-16 150 16 250 4v98H0z" fill="#7fbf68"/>
    <path d="M36 86c120 20 180-10 250 8 90 22 160-16 250 4" fill="none" stroke="#2a1810" stroke-width="3"/>
    <g fill="#f0b429" stroke="#2a1810" stroke-width="3">
      <circle cx="70" cy="92" r="8"/><circle cx="150" cy="98" r="8"/><circle cx="230" cy="90" r="8"/>
      <circle cx="320" cy="100" r="8"/><circle cx="410" cy="92" r="8"/><circle cx="500" cy="98" r="8"/><circle cx="580" cy="90" r="8"/>
    </g>
    <ellipse cx="320" cy="168" rx="70" ry="18" fill="#ffe08a" opacity=".85"/>
    <path d="M250 40h140l-70 150z" fill="#fff4cf" opacity=".55"/>
    <rect x="70" y="250" width="500" height="22" rx="8" fill="#c2410c" stroke="#2a1810" stroke-width="4"/>
    <rect x="90" y="272" width="16" height="48" fill="#9d3010"/>
    <rect x="534" y="272" width="16" height="48" fill="#9d3010"/>
    ${person(128, 214, "#f1c27d", "#2a1810", "short")}
    ${person(214, 206, "#e0ac7a", "#6b3a22", "bun")}
    ${person(320, 188, "#8d5524", "#24160f", "curly", true)}
    ${person(430, 208, "#ffdbc4", "#c47a3a", "bob")}
    ${person(522, 216, "#c68642", "#24160f", "short")}
    <g transform="translate(292 78)">
      <ellipse cx="28" cy="34" rx="26" ry="22" fill="#fff" stroke="#2a1810" stroke-width="4"/>
      <text x="28" y="42" text-anchor="middle" font-family="Georgia, serif" font-size="28" font-weight="700" fill="#c2410c">?</text>
    </g>
  `);
}

function person(x, y, skin, hair, style, hot) {
  const ring = hot
    ? `<circle cx="0" cy="28" r="46" fill="none" stroke="#f0b429" stroke-width="6"/>`
    : "";
  let hairShape = `<path d="M-22 8c-2-28 44-32 46-2v10h-46z" fill="${hair}"/>`;
  if (style === "bun") {
    hairShape = `<circle cx="0" cy="-16" r="12" fill="${hair}"/><path d="M-22 10c0-26 44-30 44-2v8h-44z" fill="${hair}"/>`;
  } else if (style === "curly") {
    hairShape = `<g fill="${hair}"><circle cx="-16" cy="-2" r="12"/><circle cx="0" cy="-12" r="13"/><circle cx="16" cy="-2" r="12"/><circle cx="-8" cy="8" r="10"/><circle cx="8" cy="8" r="10"/></g>`;
  } else if (style === "bob") {
    hairShape = `<path d="M-24 18c-6-34 54-38 50 2 0 16-8 22-14 18v-8h-24v10c-6 4-12-4-12-22z" fill="${hair}"/>`;
  }
  return `<g transform="translate(${x} ${y})" stroke="#2a1810" stroke-width="4" stroke-linejoin="round">
    ${ring}
    <rect x="-26" y="46" width="52" height="58" rx="18" fill="${hot ? "#f0b429" : "#fff6ea"}"/>
    <circle cx="0" cy="22" r="24" fill="${skin}"/>
    ${hairShape}
    <circle cx="-8" cy="22" r="2.4" fill="#2a1810" stroke="none"/>
    <circle cx="8" cy="22" r="2.4" fill="#2a1810" stroke="none"/>
    <path d="M-8 32c6 6 12 6 18 0" fill="none" stroke-width="3" stroke-linecap="round"/>
  </g>`;
}

function cookout(uid) {
  return shell(uid, `
    <defs>
      <linearGradient id="${uid}-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3c315c"/>
        <stop offset=".45" stop-color="#d76a45"/>
        <stop offset="1" stop-color="#ffc27a"/>
      </linearGradient>
    </defs>
    <rect width="640" height="400" fill="url(#${uid}-sky)"/>
    <circle cx="470" cy="150" r="58" fill="#ffe08a"/>
    <path d="M0 250c40-20 80-8 80 0v150H0zM560 230c50-24 80 0 80 16v154h-80z" fill="#24160f" opacity=".35"/>
    <rect x="40" y="286" width="560" height="114" fill="#3f7d45"/>
    <rect x="40" y="300" width="560" height="16" fill="#4e9454"/>
    <g transform="translate(70 168)">
      <ellipse cx="70" cy="150" rx="78" ry="16" fill="#24160f" opacity=".25"/>
      <path d="M28 78h84c6 28-8 52-42 52S22 106 28 78z" fill="#6e4328" stroke="#2a1810" stroke-width="5"/>
      <path d="M36 78h68c4 20-6 36-34 36S32 98 36 78z" fill="#3a2416"/>
      <ellipse cx="70" cy="78" rx="52" ry="16" fill="#8a5a34" stroke="#2a1810" stroke-width="5"/>
      <path d="M34 70h72" stroke="#2a1810" stroke-width="4"/>
      <path d="M48 66h8M64 64h8M80 66h8" stroke="#f0b429" stroke-width="4" stroke-linecap="round"/>
      <path d="M118 78c28 4 36 20 24 28" fill="none" stroke="#2a1810" stroke-width="6" stroke-linecap="round"/>
      <path d="M58 40c8-28 18-28 22-8" fill="none" stroke="#fff6ea" stroke-width="8" stroke-linecap="round" opacity=".8"/>
      <path d="M78 28c6-20 16-16 14 2" fill="none" stroke="#fff6ea" stroke-width="6" stroke-linecap="round" opacity=".7"/>
      <path d="M62 96c6 8 4 14-2 16M70 100c8 6 8 14 0 18M80 96c4 8 2 14-4 16" stroke="#ff8a3d" stroke-width="4" stroke-linecap="round" fill="none"/>
    </g>
    ${raccoon()}
    <g transform="translate(390 250)">
      <ellipse cx="40" cy="78" rx="36" ry="10" fill="#24160f" opacity=".2"/>
      <ellipse cx="40" cy="52" rx="28" ry="22" fill="#f4f1ea" stroke="#2a1810" stroke-width="4"/>
      <ellipse cx="18" cy="40" rx="8" ry="18" fill="#f4f1ea" stroke="#2a1810" stroke-width="4"/>
      <ellipse cx="62" cy="40" rx="8" ry="18" fill="#f4f1ea" stroke="#2a1810" stroke-width="4"/>
      <circle cx="30" cy="50" r="3" fill="#2a1810"/>
      <circle cx="50" cy="50" r="3" fill="#2a1810"/>
      <path d="M34 60c6 4 10 4 14 0" fill="none" stroke="#2a1810" stroke-width="3" stroke-linecap="round"/>
    </g>
    <g transform="translate(498 258)">
      <ellipse cx="36" cy="78" rx="30" ry="10" fill="#24160f" opacity=".18"/>
      <ellipse cx="30" cy="56" rx="24" ry="18" fill="#fff6ea" stroke="#2a1810" stroke-width="4"/>
      <circle cx="50" cy="42" r="14" fill="#fff6ea" stroke="#2a1810" stroke-width="4"/>
      <path d="M44 30l6-12 7 12z" fill="#e23d55" stroke="#2a1810" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="55" cy="40" r="2.4" fill="#2a1810"/>
      <path d="M62 44l12 3-12 4z" fill="#f0b429" stroke="#2a1810" stroke-width="3" stroke-linejoin="round"/>
      <path d="M16 70l-8 12M28 72v12M40 70l8 12" fill="none" stroke="#f0b429" stroke-width="3" stroke-linecap="round"/>
    </g>
    <g>
      <rect x="250" y="78" width="16" height="70" fill="#6e4328"/>
      <path d="M258 78c-20-30 24-34 8-62" fill="none" stroke="#f0b429" stroke-width="6" stroke-linecap="round"/>
    </g>
  `);
}

function raccoon() {
  return `<g transform="translate(268 156)">
    <path d="M78 78c34 16 62-4 70-30" fill="none" stroke="#b7bcc6" stroke-width="14" stroke-linecap="round"/>
    <path d="M118 58c12 4 20-8 12-16" fill="none" stroke="#2f3138" stroke-width="8" stroke-linecap="round"/>
    <ellipse cx="40" cy="132" rx="36" ry="10" fill="#24160f" opacity=".18"/>
    <ellipse cx="40" cy="96" rx="32" ry="34" fill="#cfd3dc" stroke="#2a1810" stroke-width="4"/>
    <ellipse cx="40" cy="108" rx="18" ry="16" fill="#fff6ea" stroke="#2a1810" stroke-width="3"/>
    <circle cx="40" cy="52" r="28" fill="#d9dde6" stroke="#2a1810" stroke-width="4"/>
    <path d="M16 40 L22 16 L36 36 Z" fill="#d9dde6" stroke="#2a1810" stroke-width="4" stroke-linejoin="round"/>
    <path d="M64 40 L58 16 L44 36 Z" fill="#d9dde6" stroke="#2a1810" stroke-width="4" stroke-linejoin="round"/>
    <path d="M14 50c4-10 48-10 52 0-2 12-10 16-16 12-6-6-14-6-20 0-6 4-14 0-16-12z" fill="#2f3138"/>
    <circle cx="28" cy="52" r="5.5" fill="#fff"/>
    <circle cx="52" cy="52" r="5.5" fill="#fff"/>
    <circle cx="29" cy="53" r="2.3" fill="#2a1810"/>
    <circle cx="53" cy="53" r="2.3" fill="#2a1810"/>
    <ellipse cx="40" cy="68" rx="11" ry="8" fill="#fff6ea" stroke="#2a1810" stroke-width="3"/>
    <ellipse cx="40" cy="66" rx="3.5" ry="2.6" fill="#2a1810"/>
    <path d="M24 88l14 7-14 7z" fill="#e23d55" stroke="#2a1810" stroke-width="3" stroke-linejoin="round"/>
    <path d="M56 88l-14 7 14 7z" fill="#e23d55" stroke="#2a1810" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="40" cy="95" r="4" fill="#9d3010" stroke="#2a1810" stroke-width="2"/>
    <g transform="translate(-6 96)">
      <ellipse cx="0" cy="22" rx="20" ry="7" fill="#c68642" stroke="#2a1810" stroke-width="3"/>
      <circle cx="-4" cy="14" r="6" fill="#e07a3d" stroke="#2a1810" stroke-width="2"/>
      <path d="M2 12h8" stroke="#3f7d45" stroke-width="3" stroke-linecap="round"/>
    </g>
  </g>`;
}

function daybreak(uid) {
  return shell(uid, `
    <defs>
      <linearGradient id="${uid}-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1c2748"/>
        <stop offset=".42" stop-color="#f08a4a"/>
        <stop offset=".72" stop-color="#ffd27a"/>
        <stop offset="1" stop-color="#ffe7b8"/>
      </linearGradient>
    </defs>
    <rect width="640" height="400" fill="url(#${uid}-sky)"/>
    <g fill="#fff" opacity=".85">
      <circle cx="80" cy="48" r="2"/><circle cx="140" cy="36" r="1.6"/><circle cx="210" cy="58" r="2"/>
      <circle cx="400" cy="40" r="1.5"/><circle cx="520" cy="54" r="2"/><circle cx="580" cy="32" r="1.6"/>
    </g>
    <circle cx="320" cy="230" r="78" fill="#ffe7a3"/>
    <circle cx="320" cy="230" r="58" fill="#fff6d4"/>
    <path d="M0 250c80 30 120-10 200 8 70 16 90-24 160-8 80 18 120-6 180 10 50 12 70-8 100 6v134H0z" fill="#6b3a12"/>
    <path d="M0 290c60 16 110-8 180 6 80 16 100-20 180-4 70 14 110-10 160 8 40 10 70 0 120 12v88H0z" fill="#8a4b18"/>
    <g fill="#c47a2a">
      <path d="M70 300l10-70 10 70z"/><path d="M96 308l8-54 8 54z"/><path d="M120 304l12-80 12 80z"/>
      <path d="M500 292l10-64 10 64z"/><path d="M528 300l8-48 8 48z"/><path d="M552 296l12-76 12 76z"/>
      <path d="M200 280l6-40 6 40z"/><path d="M420 276l6-36 6 36z"/>
    </g>
    <g fill="#24160f">
      <circle cx="250" cy="236" r="7"/>
      <rect x="246" y="242" width="8" height="18" rx="3"/>
      <circle cx="310" cy="228" r="8"/>
      <rect x="305" y="234" width="10" height="22" rx="3"/>
      <circle cx="368" cy="238" r="7"/>
      <rect x="364" y="244" width="8" height="16" rx="3"/>
    </g>
    <g transform="translate(48 78)">
      <rect x="0" y="16" width="92" height="58" rx="8" fill="#6e4328" stroke="#2a1810" stroke-width="4"/>
      <rect x="8" y="24" width="76" height="36" rx="4" fill="#fff6ea"/>
      <text x="46" y="50" text-anchor="middle" font-family="Georgia, serif" font-size="26" font-weight="700" fill="#2a1810">48</text>
    </g>
  `);
}

function plain() {
  return shell("plain", `
    <rect width="640" height="400" fill="#f0b429"/>
    <circle cx="320" cy="200" r="70" fill="#fff6ea" stroke="#2a1810" stroke-width="8"/>
    <path d="M320 150c8 18 28 24 28 46 0 16-12 26-28 26s-28-10-28-26c0-22 20-28 28-46z" fill="#c2410c"/>
  `);
}

const ARTS = { doodle, rex, family, cookout, daybreak, plain };

export function gameArt(name, uid = "art") {
  const draw = ARTS[name] || ARTS.plain;
  return draw(uid);
}

export const ART_IDS = Object.keys(ARTS);
