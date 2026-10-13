---
name: Learnspace
description: A course catalog for focused software engineering study.
colors:
  academic: "#315b7c"
  academic-hover: "#244660"
  academic-soft: "#eaf0f5"
  ink-blue: "#182d43"
  nav-text: "#dce6ef"
  nav-muted: "#b0c1d1"
  nav-selected: "#304c65"
  nav-hover: "#243d54"
  paper: "#f4f3ef"
  surface: "#ffffff"
  soft-surface: "#f5f5f2"
  text: "#253345"
  muted: "#586574"
  border: "#d9ddde"
  blue: "#315b7c"
  blue-soft: "#eaf0f5"
  lavender-soft: "#efedf2"
  amber-soft: "#f5eee2"
  warning: "#87520f"
  danger: "#a23a31"
  nav-focus: "#e5c887"
  field-focus: "#315b7c"
  dark-paper: "#141e28"
  dark-surface: "#1c2935"
  dark-text: "#e8edf0"
  dark-muted: "#b6c2cd"
  dark-border: "#3c4a57"
  dark-academic: "#aac6e0"
  dark-academic-soft: "#293b4e"
  dark-blue: "#aac6e0"
  dark-blue-soft: "#293b4e"
  dark-lavender-soft: "#353445"
  dark-amber-soft: "#42382c"
  dark-soft-surface: "#22313e"
  dark-ink-blue: "#111d2a"
  dark-nav-text: "#e4edf5"
  dark-warning: "#edc589"
  dark-danger: "#ffb4a8"
typography:
  headline:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "30px"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  section:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "19px"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "-0.015em"
  current-task:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "23px"
    fontWeight: 750
    lineHeight: 1.4
    letterSpacing: "-0.02em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.7
  reading:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "15px"
    lineHeight: 1.7
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "12px"
  button:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "13px"
    fontWeight: 600
rounded:
  record: "0px"
  tag: "4px"
  status: "5px"
  nav: "6px"
  button: "7px"
  field: "8px"
  panel: "12px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  panel: "28px"
  xl: "32px"
  section: "36px"
components:
  button-primary:
    backgroundColor: "{colors.academic}"
    textColor: "{colors.surface}"
    rounded: "{rounded.button}"
    typography: "{typography.button}"
    padding: "10px 16px"
  button-primary-hover:
    backgroundColor: "{colors.academic-hover}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.button}"
    padding: "10px 16px"
  search-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.field}"
    padding: "11px 13px"
  navigation:
    backgroundColor: "{colors.ink-blue}"
    textColor: "{colors.nav-text}"
    rounded: "{rounded.nav}"
    padding: "10px 12px"
  status-done:
    backgroundColor: "{colors.academic-soft}"
    textColor: "{colors.academic}"
    rounded: "{rounded.status}"
  current-task:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.panel}"
    padding: "28px"
  track-record:
    textColor: "{colors.text}"
    rounded: "{rounded.record}"
    padding: "24px 0"
---

# Design System: Learnspace

## Overview

**Creative North Star: "Course catalog"**

Learnspace uses an orderly academic catalog to support sustained study. Ink-blue navigation anchors warm paper and white work surfaces; restrained academic-blue actions make the next step clear. The character is practical, calm, and readable.

Aligned records, visible rules, and conventional controls carry the interface. Task identity, outcome, schedule, and evidence remain recognizable across browsing and working. Motion stays subtle during work; switching themes provides the expressive exception with a reduced-motion fallback.

**Key Characteristics:**
- Ink-blue navigation and warm reading ground.
- Compact ruled records with explicit semantic states.
- Sans-serif hierarchy and readable working density.
- Flat surfaces with visible keyboard focus.

## Colors

Academic blue identifies actions and completion; ink blue anchors navigation while neutral paper separates the application ground from working surfaces.

### Primary
- **Academic Blue:** primary action fills and light-theme emphasis. Academic Blue Hover darkens the action on hover; Academic Blue Soft holds completion states.

### Secondary
- **Ink Blue:** persistent navigation ground. Navigation Text and Navigation Muted separate destinations from group labels; Navigation Selected and Navigation Hover identify state.
- **Academic Blue:** in-progress state and active study context, paired with Blue Soft.

### Neutral
- **Warm Paper:** application background. **White Surface:** working and reading panels. **Soft Surface:** secondary information and row hover.
- **Slate Text**, **Muted Slate**, and **Rule Gray:** primary text, supporting text, and boundaries.
- **Amber** and **Danger:** blocked or overloaded work and overdue or overtime information. State labels remain visible alongside color.

Dark-prefixed tokens record the implemented dark theme. The runtime swaps semantic custom properties; navigation muted and selected values stay shared. Primary filled actions retain the light-theme Academic Blue fill and white text in both themes. Lavender Soft remains available to inherited secondary surfaces.

**The Semantic State Rule.** Pair state color with a readable state label; color alone does not carry task status.

## Typography

**Display and body font:** self-hosted DM Sans with a sans-serif fallback. Headlines use a restrained sans hierarchy rather than decorative display type. The frontmatter records the catalog's operative roles; legacy specialty metrics retain some Manrope declarations in earlier stylesheets.

Page headings use the headline role; section headings use section. The current-task heading sits between these. Body copy uses body; learning prose uses reading with a measure up to 78ch, and supporting page descriptions use up to 70ch. Task labels and metadata use label. Time, study metrics, and definition values use tabular numerals. On mobile, main headings reduce to 26px, the current-task title to 21px, and form controls use 16px text.

## Layout

The desktop shell has a 240px navigation rail and an 80px collapsed state. Main content has a 1560px maximum width and 32px 36px 48px padding. At 1550px and above the padding becomes 36px 48px 56px; at 1100px and below horizontal padding is 24px.

The overview pairs a fluid work column with a 280px schedule column and a 32px gap. Below 1100px the secondary column is 240px with a 24px gap; below 950px these columns stack. Ready tasks remain a single vertical list at every width. Curriculum links form three columns, two below 1100px, and one below 760px.

At 760px and below, navigation becomes a 270px drawer, the main padding becomes 24px 18px 36px, and the topbar minimum height becomes 64px instead of 72px. Track browsing uses full-width ruled records: flexible description, 180px metadata column, and a 20px arrow column. Below 640px metadata moves under the description.

## Elevation & Depth

Primary panels and catalog records are flat, without card shadows or hover lift. Tonal surfaces and one-pixel borders establish structure. Existing overlays retain functional elevation: navigation tooltip uses `0 5px 18px #12212f24`, and the mobile drawer uses `8px 0 35px #172b3c1c`. The topbar is opaque and has no backdrop blur; the mobile scrim retains its blur.

**The Flat Work Surface Rule.** Keep study panels and catalog records grounded; reserve shadow for overlays.

## Shapes

Panels use softly rounded corners, with tighter corners on buttons, navigation, fields, and status tags as recorded in the radius tokens. Full-width track and search records have square corners and bottom rules. Progress bars are narrow (3px). Icons are supporting line symbols, usually without colored enclosing tiles.

## Components

### Buttons
Conventional and compact. Primary and secondary actions have a minimum height of 42px. Primary keeps a Academic Blue fill, white text, and matching border; hover darkens the fill. Secondary uses Surface with a Border stroke and Text, moving to Soft Surface and a Muted border on hover. Disabled controls have 0.55 opacity. Focus uses a 2px Academic Blue outline offset by 3px.

### Chips
Status tags use small rounded corners and 11px text. Neutral means not started; Academic Blue means in progress; Academic Blue means done; Amber means blocked. Preserve the text label in compact and mobile rows.

### Cards / Containers
Current-task and reading panels use Surface, a one-pixel Border stroke, and Panel corners. The current task has Panel padding, reducing to 20px on mobile. Search results and track browsing use ruled records rather than freestanding tiles. Ready-task rows form one vertical reading path.

### Inputs / Fields
Search fields use Surface and a one-pixel Border stroke with Field corners. Their inner input is transparent; placeholders use Muted. The search wrapper retains the inherited Field Focus outline, 2px with a 2px offset. General keyboard focus uses Academic Blue. On mobile, form text grows to 16px.

### Navigation
Group destinations by daily work, curriculum, and settings. Expanded destinations use 13px text and a 40px minimum height. The selected destination has a solid Navigation Selected background, white text, and 650 weight. Hover uses Navigation Hover; keyboard focus uses Navigation Focus. Collapsed navigation supplies labels through tooltips; mobile uses a dismissible drawer.

### Theme control and motion
The theme control is a 38px square with Field corners. Hover changes the background without rotation. Navigation color changes use 150ms ease; desktop sidebar geometry uses 280ms cubic-bezier(0.22, 1, 0.36, 1). Theme changes reveal radially from the control over 520ms with cubic-bezier(.2,.7,.2,1). Reduced motion and unsupported view transitions apply the theme immediately. No decorative page entrance is part of the catalog world.

## Do's and Don'ts

### Do:
- Do retain task identity, outcome, schedule, and evidence alignment.
- Do use semantic custom properties so light and dark surfaces stay coherent.
- Do preserve readable state labels, keyboard focus, and reduced-motion behavior.
- Do use ruled lists for catalog records and keep ready tasks in one column.

### Don't:
- Don't reintroduce promotional roadmap heroes or decorative metric-card compositions.
- Don't add hover lift or shadow to catalog work surfaces.
- Don't shrink mobile text to preserve a desktop column layout.
