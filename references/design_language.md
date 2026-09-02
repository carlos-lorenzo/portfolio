# Design System Specification: Engineering Dark (Arch Hyprland + Muted Dracula)

A precise design specification for a web portfolio modeled after a modern Arch Linux environment running the Hyprland tiling window manager. The visual language blends high-end hardware/engineering aesthetic with subtle, restrained Dracula accent tones.

---

## 1. Core Visual Concept

* **Aesthetic Direction:** Muted UNIX Workstation / System Engineering Interface.
* **Layout Paradigm:** Tiling window grid (Hyprland style) with tight gap management, structural window borders, and a system-level top bar (Waybar).
* **Atmosphere:** Deep matte charcoal background, restrained 1px container borders, translucent glassmorphism, and surgical color accents.

---

## 2. Color Palette & Token Architecture

### 2.1 Surface & Structural Colors
* **Canvas Background:** `#0d0e12` (Matte Obsidian)
* **Window Base:** `#141620` at `80%` opacity (`rgba(20, 22, 32, 0.8)`)
* **Window Border (Inactive):** `#272a3b`
* **Window Border (Active):** `rgba(189, 147, 249, 0.4)` (Muted Dracula Purple glow)
* **Dividers & Lines:** `rgba(255, 255, 255, 0.08)`

### 2.2 Dracula Accent Tokens (Used Exclusively for Data & Context)
* **Dracula Purple (`#bd93f9`):** Primary highlights, active state borders, directory badges.
* **Dracula Pink (`#ff79c6`):** Git branch indicators, key accents, alert badges.
* **Dracula Cyan (`#8be9fd`):** Hardware, signal processing, and low-level engineering tags.
* **Dracula Green (`#50fa7b`):** Terminal prompt success state, live status indicators.
* **Dracula Yellow (`#f1fa8c`):** Code inline highlights, structural warnings.

### 2.3 Typography Colors
* **Primary Text:** `#e2e8f0` (High readability, soft white)
* **Secondary Text:** `#94a3b8` (Muted slate gray)
* **Code / Dim Text:** `#6272a4` (Dracula Comment Gray)

---

## 3. Typography Rules

* **Primary Monospace Font:** `JetBrains Mono`
* **Font Sizing & Hierarchy:**
  * **System / Status Bar:** `11px` (`0.6875rem`), tracked wide (`letter-spacing: 0.05em`).
  * **Window Headers:** `12px` (`0.75rem`), semi-bold.
  * **Body / Terminal Text:** `14px` (`0.875rem`), line-height `1.6`.
  * **Headings (H1/H2):** `18px` – `24px` (`1.125rem` – `1.5rem`), bold.

---

## 4. Layout Architecture & Wireframe

+-------------------------------------------------------------------------+
| [1:~] [2:about] [3:experience] [4:projects]  | carlos@archlinux | wofi ⌘K |  <- Waybar Header
+-------------------------------------------------------------------------+
|                                                                         |
|  +-----------------------------------+   +---------------------------+  |
|  | Window 1: Terminal / Neofetch     |   | Window 2: Telemetry / Stats| |  <- Tiling Window
|  | [kitty - bash 5.3]                |   | [biosignal_stream.py]     |  |     Grid Layout
|  +-----------------------------------+   +---------------------------+  |
|                                                                         |
|  +-------------------------------------------------------------------+  |
|  | Window 3: Main Content / Projects & Markdown Render               |  |
|  +-------------------------------------------------------------------+  |
|                                                                         |
+-------------------------------------------------------------------------+


---

## 5. Element & Component Guidelines

### 5.1 Tiling Window Container (`.hypr-window`)
* **Background:** `rgba(20, 22, 32, 0.8)` with `backdrop-filter: blur(12px)`.
* **Border:** `1px solid #272a3b`.
* **Border Radius:** `8px`.
* **Margin/Gap:** `12px` gap between tiled modules.
* **Active State:** On hover or focus, transition border color to `rgba(189, 147, 249, 0.4)` over `0.2s ease`.

### 5.2 Waybar Status Bar
* **Position:** Fixed top, full width, `height: 36px`.
* **Background:** `rgba(13, 14, 18, 0.9)`, border bottom `1px solid rgba(255, 255, 255, 0.08)`.
* **Left Section:** Workspace buttons styled as muted pill tags (`[1:~]`, `[2:about]`).
* **Center Section:** Shell host identity (`carlos@archlinux:~/portfolio`).
* **Right Section:** Quick launcher button (`wofi ⌘K`) and window manager tag.

### 5.3 Shell Prompt (Starship Style)
* **Structure:** Segmented inline badges with subtle background fills.
* **User Badge:** Dark tint with light gray text.
* **Path Badge:** `rgba(189, 147, 249, 0.15)` fill with `#bd93f9` text.
* **Branch Badge:** `rgba(255, 121, 198, 0.15)` fill with `#ff79c6` text.
* **Prompt Symbol:** `#ff79c6` colored `❯` symbol followed by user command input.

### 5.4 Micro Technical Badges
* Used for displaying technologies, frameworks, and domain tags.
* **Style:** Micro pills (`font-size: 10px`, `padding: 2px 8px`).
* **Fill:** Dark glass (`rgba(255, 255, 255, 0.04)`), border `1px solid rgba(255, 255, 255, 0.08)`.
* **Text:** Categorized using Dracula accent colors (e.g., `#8be9fd` for hardware, `#50fa7b` for low-level systems).

---

## 6. Motion & Interactive Details

1. **Window Focus Transition:** Linear border and soft glow shift (`transition: border-color 0.2s ease, box-shadow 0.2s ease`).
2. **Keyboard Shortcut Modal (Wofi):** Overlay floating panel triggered via `Cmd+K` or `Ctrl+K` with background blur and real-time input filtering.
3. **Pulse Animation:** Minimal `1.5s` opacity fade on live execution indicators or active telemetry nodes.

---