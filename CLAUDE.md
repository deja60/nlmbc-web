# NLMBC Web — Claude Guidelines

## Project Overview

**New Light Missionary Baptist Church** (NLMBC), Greensboro, NC. Founded 1891.
**Tagline:** "Exalting the Savior • Equipping the Saints • Evangelizing the Sinners"

Static site (HTML/CSS/JS, no framework). Pages: index, about, services, leadership, media, contact, new-visitor, admin.

---

## Design Context

### Users

Two equally important audiences:

- **First-time visitors** — checking out the church, need clarity and a warm welcome. Key CTAs: Plan Your Visit, service times, what to expect.
- **Regular members** — the congregation, need fast access to schedules, announcements, giving, media, and staff info.

Many members access the site on mobile. Mobile experience is the priority platform.

### Brand Personality

Four pillars, held in balance:

1. **Warm & welcoming** — visitors feel at home immediately; community-first
2. **Dignified & reverent** — reflects 130+ years of ministry and spiritual gravity
3. **Modern & accessible** — contemporary enough to reach younger generations
4. **Bold & Spirit-filled** — energy and vitality of a living, active congregation

In three words: **Rooted. Radiant. Alive.**

### Aesthetic Direction

**Refine what exists** — do not redesign. Elevate quality and consistency within the established system:

- **Palette:** Navy (`#1a2744`) + Gold (`#c9a84c`) + Cream (`#f9f6f0`) — preserve these as the core brand colors
- **Typography:** Playfair Display (headings/display) + Inter (body/UI) — maintain this pairing
- **Layout:** Card-based, section-eyebrow + heading + body pattern, generous whitespace
- **Motion:** Subtle hover effects (`0.25s ease`, `-4px translateY`, gold glow shadows) — keep restrained and purposeful

Anti-references: avoid anything that looks like a generic corporate site, overly dark "nightclub" aesthetics, or cluttered evangelical mega-church design with too many competing CTAs.

### Design Tokens

```css
:root {
  --navy:       #1a2744;
  --navy-dark:  #0d1526;
  --gold:       #c9a84c;
  --gold-light: #e8c97a;
  --cream:      #f9f6f0;
  --white:      #ffffff;
  --text:       #2c3047;
  --text-light: #6b7280;
  --radius:     12px;
  --shadow:     0 4px 24px rgba(0,0,0,0.10);
  --shadow-lg:  0 8px 48px rgba(0,0,0,0.15);
  --transition: 0.25s ease;
}
```

Fonts loaded via Google Fonts: `Playfair Display` (400, 600, 700) and `Inter` (300, 400, 500, 600).

### Design Principles

1. **Clarity serves both audiences.** Every page should be immediately scannable for a first-time visitor AND provide fast paths for a returning member. Never sacrifice one for the other.

2. **Heritage without heaviness.** The gold-and-navy palette carries 130 years of history — use it with confidence, but keep layouts open and breathing. Tradition should feel like a foundation, not a burden.

3. **Mobile is the primary canvas.** Design and evaluate every component at mobile size first. Touch targets, readability, and navigation must be excellent on a phone.

4. **Restraint in motion and decoration.** Hover effects, animations, and decorative elements should be subtle and purposeful. The content — scripture, community, schedules — is the hero.

5. **Consistent system over one-off solutions.** Lean on the existing card patterns, eyebrow labels, button hierarchy, and spacing scale. Introduce new patterns only when the existing system genuinely cannot serve the need.
