import { defineQuery } from "groq";

const imageFragment = /* groq */ `
  asset->{
    _id,
    _type,
    url,
    metadata { lqip, dimensions { width, height } }
  },
  crop,
  hotspot,
  alt,
  "dominantColor": asset->metadata.palette.dominant.background
`;

const pageSlugFragment = /* groq */ `
    "slug": select(
      defined(pageSlug.parent) => pageSlug.parent->pageSlug.slug.current + "/" + pageSlug.slug.current,
      pageSlug.slug.current
    )
  `;

const linkFragment = /* groq */ `
  linkType,
  linkType == 'internal' => {
    "page": page-> {
      _type,
      "slug": pageSlug.slug.current,
    },
    "anchor": anchor.current,
    "url": null,
  },
  linkType == 'external' => {
    "page": null,
    "anchor": null,
    "url": external,
  }
`;

const heroBlockFragment = /* groq */ `
  _type == "heroBlock" => {
    heading,
    subtitle,
    size,
    backgroundImage { ${imageFragment} },
  }
`;

const textBlockFragment = /* groq */ `
  _type == "textBlock" => {
    content,
    cta,
    "ctaLink": ctaLink { ${linkFragment} },
    textAlign,
    leadInText,
    featureImage { ${imageFragment} },
    imageAlign,
    sectionId
  }
`;

const featureCardsBlockFragment = /* groq */ `
  _type == "featureCardsBlock" => {
    heading,
    background, 
    cards[] {
      title,
      description,
      cardImage { ${imageFragment} },
      "link": link { ${linkFragment} }
    }
  }
`;

const pageBuilderFragment = /* groq */ `
  pageBuilder[] {
    _key, _type,
    ${heroBlockFragment},
    ${textBlockFragment},
    ${featureCardsBlockFragment}
  }
`;

export const SITE_SETTINGS_QUERY =
  defineQuery(`*[_id == "siteSettings" && defined(siteName)][0]{
  siteName,
  siteTagline,
  "mainNav": coalesce(mainNav[defined(label)] {
    "label": coalesce(label, ""),
    "link": link { ${linkFragment} }
  }, [])
}`);

export const HOMEPAGE_QUERY = defineQuery(`*[_id == "home"][0]{
  ${pageBuilderFragment},
}`);

const pageFragment = /* groq */ `
  _type,
  title,
  ${pageSlugFragment},
  ${pageBuilderFragment}
  `;

export const PAGES_QUERY =
  defineQuery(`*[_type == "page" && defined(pageSlug.slug.current)] {
  ${pageFragment}
}`);

export const PAGE_QUERY =
  defineQuery(`*[_type == "page" && pageSlug.slug.current == $slug][0] {
  ${pageFragment}
}`);

const projectFragment = /* groq */ `
  _type,
  title,
  ${pageSlugFragment},
  ${pageBuilderFragment}
  `;

export const PROJECTS_QUERY =
  defineQuery(`*[_type == "project" && defined(pageSlug.slug.current)] {
  ${projectFragment}
}`);

export const PROJECT_QUERY =
  defineQuery(`*[_type == "project" && pageSlug.slug.current == $slug][0] {
  ${projectFragment}
}`);

export const EVENTS_PAGE_QUERY = defineQuery(`*[_id == "eventsPage"][0]{
  _type,
  title,
  ${pageBuilderFragment},
}`);

export const EVENT_ITEMS_QUERY =
  defineQuery(`*[_type == "eventItem"] | order(eventDatetime desc) {
  _type,
  title,
  eventDatetime,
  location,
  description
}`);
