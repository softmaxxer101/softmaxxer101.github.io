# 𝒶𝓁𝒾𝓈 · journal

A spiral-notebook portfolio. Four spreads you flip through like a real book:

| # | spread | what it holds |
| - | ------ | ------------- |
| 1 | **home** | about + *currently* / *looking for* on the left, **the road so far** on the right |
| 2 | **things i do** | a selectable list of projects on the left, the mini description + code link on the right |
| 3 | **writings** | long-form notes only — the newest one is highlighted automatically |
| 4 | **stack + say hi** | technical stack + hardware on the left, contact links + the *dear alis* letter on the right |

No build step, no dependencies, no framework. Three files.

```
index.html   the book (page prose, the road so far, the letter form)
styles.css   paper, cover, spiral binding, edge tabs, dark mode
app.js       flip engine + the lists (projects, writings, stack, contacts)
```

## run it locally

```bash
python3 -m http.server 8000
# open http://127.0.0.1:8000
```

Opening `index.html` directly from disk works too.

## deploy to GitHub Pages

Everything is static. Push these files to the repo that backs
`softmaxxer101.github.io` and it is live — or, for a project repo, point
Settings → Pages at the branch root.

## how it works

- **Desktop (>900px)** — a two-page spread. Turning a page rotates a leaf in 3D
  (`perspective` + `backface-visibility`), so the next spread is revealed
  underneath exactly when the leaf passes 90°.
- **Mobile (≤900px)** — a top-bound notepad. One page at a time, the two halves
  of a spread stacked in a scrollable column, with the spine bar fixed at the bottom.
- **Navigation** — edge tabs, the ↑/↓ buttons, `↑ ↓ PageUp PageDown Home End`,
  the number keys `1`–`4`, a scroll wheel, and a swipe. The URL hash tracks the
  section (`#home`, `#projects`, `#writings`, `#stack`).
- **Light by default, dark on demand** — the ☾ button (top-right) toggles a
  `data-theme="dark"` attribute and remembers the choice in `localStorage`
  (`alis-theme`).

## editing it

| what | where |
| ---- | ----- |
| page prose, the road so far, page numbers | `index.html` |
| projects, writings, stack, contact links | the data arrays at the top of `app.js` |
| the email shown on the stack page | `DISPLAY_EMAIL` in `app.js` |
| where the *dear alis* letters are sent | `CONTACT_EMAIL` in `app.js` |
| the endpoint that delivers the letters | `FORM_ENDPOINT` in `app.js` |
| colours, paper, cover | the `:root` block in `styles.css` |
| dark palette | the `html[data-theme="dark"]` block at the end of `styles.css` |

**Two addresses, deliberately.** The stack page *shows* `DISPLAY_EMAIL`
(currently the placeholder `your.email@domain.com`). Every letter the form builds
is mailed to `CONTACT_EMAIL` (`softmaxxer101@gmail.com`). Set `DISPLAY_EMAIL` to
the real address when you want it public.

**Writings sort themselves.** Each entry in `WRITINGS` has an `iso` date. The
list is sorted newest-first on load, the first entry becomes the highlighted
block and the rest fall into the quiet list — add a post and it lands in the
right place on its own.

**The letter form delivers twice.** On submit it POSTs everything the visitor
typed (name, reply address, message) to `FORM_ENDPOINT` in `app.js` — so the
message reaches the inbox even if they never press send in their own mail app —
and it *also* keeps the `mailto:` hand-off, offered afterwards as
"or send it from your own mail app". If the direct delivery fails, the mail app
is opened automatically instead.

`FORM_ENDPOINT` defaults to `https://formsubmit.co/ajax/softmaxxer101@gmail.com`,
which needs no account. **Activate it once:** submit the form yourself; FormSubmit
emails an activation link to `CONTACT_EMAIL` — click it and every later letter is
delivered automatically. Swap the constant for any endpoint that accepts JSON
(Formspree, Web3Forms, or your own function), or set it to `''` to use only the
mailto hand-off.

## notes

- **Every link is the specific thing, not a profile.** Each writing opens its own
  PDF or blog post. Change the `href` / `url` on the entry in `app.js` to repoint one.
- The **Inference Engine** entry has no repo yet, so its detail panel shows a quiet
  "code coming soon" instead of a link. Give it an `href` in the `PROJECTS` array
  when the repo exists.
- The **home-page photo** is `assets/me.png`, shown inside the polaroid. Swap that file to change it.
- Fonts (Fraunces, Hanken Grotesk, Caveat, JetBrains Mono) come from Google Fonts.
- The page grid, red margin rule, punch holes and spiral rings are pure CSS.
- Every page is measured to fit its 544×756 sheet with no clipping — if you add
  copy and something looks cut off, that is the reason.
# softmaxxer101.github.io
