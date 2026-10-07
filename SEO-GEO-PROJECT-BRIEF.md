# SEO / GEO Project Brief — Calculadora de Sueño

Last reviewed: 2026-10-07

## 1. Project identity

- Project / brand: Calculadora de Sueño
- Production domain: https://xn--calculadoradesueo-uxb.org/
- Primary language: Spanish
- Target market: Spanish-speaking users; no country-specific localized variants are published
- Product type: browser-based sleep planning tools + educational guides
- Primary user task: estimate sleep/bedtime schedules and understand sleep-duration guidance
- Monetization: not assumed in this brief
- Cost constraint: static/low-cost architecture
- Primary focus: utility first, then evidence-backed explanatory content

## 2. Approved keyword source

The project owner approved optimization without replacing the site's established keyword targets. Numeric Volume/KD/CPC data was not supplied for this project, so it is intentionally left unknown.

| Keyword | Market | Volume | KD | CPC | Source | Owner status |
|---|---|---:|---:|---:|---|---|
| calculadora de sueño | Spanish | unknown | unknown | unknown | existing site scope | preserve |
| ciclos de sueño | Spanish | unknown | unknown | unknown | existing site scope | preserve |
| calcular los ciclos de sueño | Spanish | unknown | unknown | unknown | existing article target | preserve |
| como calcular mi ciclo de sueño | Spanish | unknown | unknown | unknown | existing article target | preserve |
| calculadora de horas de sueño | Spanish | unknown | unknown | unknown | existing route/article target | preserve |
| como calcular las horas de sueño | Spanish | unknown | unknown | unknown | existing article target | preserve |
| calculadora de siestas | Spanish | unknown | unknown | unknown | existing route intent | preserve |
| diario de sueño | Spanish | unknown | unknown | unknown | existing route intent | preserve |
| calculadora de sueño app | Spanish | unknown | unknown | unknown | existing comparison target | preserve |
| calculadora de sueño adidas | Spanish | unknown | unknown | unknown | existing comparison target | preserve |
| calculadora de sueño runtastic | Spanish | unknown | unknown | unknown | existing comparison target | preserve |
| ruido blanco sueño | Spanish | unknown | unknown | unknown | existing tool intent | preserve |

## 3. Intent ownership / canonical map

| Primary intent | Canonical route | Page type | Index | Notes |
|---|---|---|---|---|
| Calculate sleep/bedtime windows | / | primary tool | yes | owns calculadora de sueño / ciclos de sueño |
| Sleep hours by age | /calculadora-horas-de-sueno | tool + reference | yes | owns age-duration intent |
| Nap planning | /siestas | tool | yes | owns nap intent |
| Sleep diary | /diario-sueno | tool | yes | owns tracking intent |
| Compare apps/web/wearables | /app-calculadora-de-sueno | comparison | yes | owns app comparison intent |
| Educational guide hub | /blog | hub | yes | parent for three current guides |
| How to calculate a sleep cycle | /blog/como-calcular-mi-ciclo-de-sueno | guide | yes | formula + limitations |
| How to calculate sleep hours | /blog/como-calcular-las-horas-de-sueno | guide | yes | age ranges + examples |
| Calculator/app technology comparison | /blog/guia-ciclo-de-sueno-calculadora | guide | yes | technology intent |
| Sounds for sleep | /sonidos | tool | yes | sound generator intent |
| Methodology and source policy | /metodologia/ | trust/methodology | yes | distinct transparency intent |
| About/contact/legal | institutional routes | support | yes | not keyword landing pages |

No additional keyword-variant landing pages should be created unless a distinct user intent and unique value are demonstrated.

## 4. Indexation policy

- Canonical indexable routes appear in sitemap only.
- Missing URLs must return real 404 behavior.
- No query-parameter pages are intentionally indexable.
- Legacy hash navigation is compatibility-only, not a separate indexable URL system.
- Single Spanish version: no regional hreflang variants and no x-default fallback.
- /metodologia/ is a standalone static trust page copied into the production build.

## 5. Internal-link architecture

Primary hub:
- /

Secondary hubs:
- /blog
- /calculadora-horas-de-sueno
- /app-calculadora-de-sueno

Required relationships:
- Home links to core tools, blog, and methodology.
- Articles link back to the primary calculator, relevant tool, blog hub, and methodology.
- Tool pages are represented in the crawlable prerender snapshot.
- Methodology links back to home/about/contact.
- Sitemap is generated from canonical indexable routes plus /metodologia/.

Orphan prevention:
- Any new indexable page must receive at least one crawlable HTML link from an existing indexable parent before sitemap inclusion.

## 6. GEO / AI-search answer plan

| Route | Direct extractable answer | Original value | Evidence need |
|---|---|---|---|
| / | what the calculator can/cannot estimate | interactive calculator | NHLBI + AASM |
| /calculadora-horas-de-sueno | age-based ranges | interactive age tool | AASM pediatric/adult |
| /siestas | what nap calculator estimates | interactive nap planner | circadian context |
| /diario-sueno | what a sleep diary records | local tracking tool | methodology |
| /app-calculadora-de-sueno | web vs apps vs wearables | comparison | NHLBI measurement limits |
| /blog/* | answer-first guide passages | examples + tool integration | claim-specific primary sources |
| /metodologia/ | calculation assumptions and editorial rules | first-party methodology | source registry |

Rules:
- No AI-only duplicate pages.
- No invented AI visibility score.
- No special Google AI schema.
- llms.txt is not required for Google and is not included solely for ranking.
- Facts should remain understandable when quoted without surrounding marketing copy.

## 7. Evidence / source registry

| Topic | Primary source | Checked | Refresh trigger |
|---|---|---|---|
| Sleep stages and 80–100 minute cycle range | NHLBI / NIH — Sleep phases and stages | 2026-10-07 | source materially changes |
| Adult sleep duration | AASM + Sleep Research Society consensus | 2026-10-07 | consensus updated/replaced |
| Pediatric sleep duration | AASM child sleep duration advisory/consensus | 2026-10-07 | recommendation updated |
| Circadian/sleep-wake concepts | NHLBI / NIH — Sleep/Wake Cycle | 2026-10-07 | source materially changes |

Visible source registry: /metodologia/

## 8. Entity map

| Entity | Type | Canonical name | Stable ID |
|---|---|---|---|
| Brand | Organization | Calculadora de Sueño | https://xn--calculadoradesueo-uxb.org/#organization |
| Site | WebSite | Calculadora de Sueño | https://xn--calculadoradesueo-uxb.org/#website |
| Primary tool | SoftwareApplication | Calculadora de Sueño | https://xn--calculadoradesueo-uxb.org/ |
| Guides | BlogPosting | page-specific title | canonical article URL |

No unverifiable medical-person entities are used.

## 9. Structured-data plan

- Home: Organization + WebSite + SoftwareApplication where visible/truthful.
- Core routes: WebPage + BreadcrumbList generated from the canonical route map.
- Articles: BlogPosting with headline, description, datePublished, dateModified, publisher, canonical mainEntityOfPage.
- Methodology: WebPage.
- FAQ schema is not used as a Google rich-result tactic.
- No fabricated ratings, reviewers, videos, medical credentials, or unsupported rich-result claims.

## 10. International SEO

- One Spanish content version.
- hreflang: es only where emitted.
- No es-ES/es-MX/es-AR duplicates without real localization.
- No x-default because there is no selector/fallback page.

## 11. Programmatic SEO

N/A. Current articles and routes are manually scoped. Do not mass-generate sleep keyword variants.

## 12. Media / multimodal

- Existing icons/favicon retained.
- No fake video assets or VideoObject.
- Future original diagrams should include nearby explanatory text and meaningful alt text.
- Review Search Console multimodal performance only after the property is connected and data exists.

## 13. Search / AI crawler policy

- Googlebot/Bing search crawling: allowed.
- No search crawler block is introduced.
- Google-Extended/training controls are a separate business decision and are not used as ranking levers.

## 14. Release verification

L1:
- TypeScript check
- production build
- prerender output checks
- canonical/sitemap/404 checks
- article route and methodology checks

L2:
- production URL crawl/status verification
- mobile/visual QA
- lab performance
- schema validation

L3:
- Search Console indexing, queries, AI feature reporting and multimodal reporting when the property is connected and has enough data

## 15. Sign-off status

- Existing core keyword set preserved: yes
- Intent map implemented: yes
- Indexation policy implemented in build: yes
- GEO answer/source architecture implemented: yes
- Production verification: pending external production access / GSC connection
