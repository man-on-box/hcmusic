import type {
  HOMEPAGE_QUERY_RESULT,
  PAGE_QUERY_RESULT,
  PROJECT_QUERY_RESULT,
  SITE_SETTINGS_QUERY_RESULT,
} from "./sanity.types.ts";
import { sanityClient } from "sanity:client";
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

const SITE_SETTINGS_QUERY =
  defineQuery(`*[_id == "siteSettings" && defined(siteName)][0]{
  siteName,
  siteTagline,
  "mainNav": coalesce(mainNav[defined(label)] {
    "label": coalesce(label, ""),
    "link": link { ${linkFragment} }
  }, [])
}`);

export const siteSettingsQuery = async () => {
  const result =
    await sanityClient.fetch<SITE_SETTINGS_QUERY_RESULT>(SITE_SETTINGS_QUERY);
  if (!result) {
    throw new Error("Could not site settings data");
  }

  return result;
};

const HOMEPAGE_QUERY = defineQuery(`*[_id == "home"][0]{
  ${pageBuilderFragment},
}`);

export const homepageQuery = async () => {
  const result =
    await sanityClient.fetch<HOMEPAGE_QUERY_RESULT>(HOMEPAGE_QUERY);
  if (!result) {
    throw new Error("Could not fetch homepage data");
  }

  return result;
};

const PAGE_QUERY =
  defineQuery(`*[_type == "page" && defined(pageSlug.slug.current)] {
  _type,
  title,
  ${pageSlugFragment},
  ${pageBuilderFragment}
}`);

export const pageQuery = async () => {
  const result = await sanityClient.fetch<PAGE_QUERY_RESULT>(PAGE_QUERY);
  if (!result) {
    throw new Error("Could not fetch page data");
  }

  return result;
};

const PROJECT_QUERY =
  defineQuery(`*[_type == "project" && defined(pageSlug.slug.current)] {
  _type,
  title,
  ${pageSlugFragment},
  ${pageBuilderFragment}
}`);

export const projectQuery = async () => {
  const result = await sanityClient.fetch<PROJECT_QUERY_RESULT>(PROJECT_QUERY);
  if (!result) {
    throw new Error("Could not fetch project data");
  }

  return result;
};
