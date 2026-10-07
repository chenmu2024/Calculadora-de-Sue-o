# SEO / GEO Release Evidence — 2026-10-07

## Scope

Repository: chenmu2024/Calculadora-de-Sue-o

Release goals:
- remove unsupported YMYL claims and synthetic authority signals
- make core content crawlable in raw HTML
- create unique article URLs and canonical ownership
- make key answers extractable and attributable
- document calculation assumptions and editorial methodology
- add deterministic SEO build checks

## Deterministic evidence already verified

- TypeScript check: passed on GitHub Actions.
- Vite production build: passed on GitHub Actions.
- Prerender: 11 core routes + 3 article routes generated before this GEO expansion.
- Real 404/noindex output: validated in CI.
- Article canonical output: validated in CI.
- Sitemap core/article coverage: validated in CI.
- Placeholder publisher ID removed.
- Unsupported aggregate rating removed.
- Fake reviewer identities removed.
- Fake VideoObject/media URLs removed.
- Soft-404 SPA catch-all removed.
- PWA service worker added and registered.

## GEO / trust changes in this release

- Added source registry with NHLBI and AASM primary/consensus sources.
- Replaced legacy homepage SEO block with answer-first, source-linked content.
- Rewrote all three article bodies while preserving their slugs and established keyword intents.
- Added datePublished/dateModified fields for article schema.
- Added /metodologia/ with calculation assumptions, sourcing, correction policy and automation disclosure.
- Added direct-answer fields to the canonical route configuration for raw-HTML prerendering.
- Removed x-default from the single-language site.
- Removed FAQPage markup as an obsolete rich-result tactic.
- Preserved only truthful Organization/WebSite/SoftwareApplication/BlogPosting/WebPage relationships.

## Remaining production-only evidence

Not yet measurable from the connected tooling:
- live Cloudflare response/status for production pages
- live production canonical/raw HTML
- Rich Results Test against the deployed URLs
- Lighthouse/PSI production lab results
- Google URL Inspection and sitemap status

Reason:
- the production domain is not currently available as a connected Google Search Console property, and the public fetch environment could not resolve the IDN/punycode domain reliably.

## Next L3 trigger

Run when the production property is connected in Search Console or after enough post-release data exists:
- URL Inspection for homepage, main tools, methodology and all three articles
- submitted vs indexed sitemap review
- query/page/country/device performance
- generative-AI feature reporting when present
- multimodal/image-input reporting if the site receives relevant traffic
- cannibalization review for calculadora de sueño / ciclos de sueño / horas de sueño clusters
