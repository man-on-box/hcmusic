import type {
  HOMEPAGE_QUERY_RESULT,
  PAGE_QUERY_RESULT,
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
    "ctaPath": "/" + linkToPage->slug.current,
    textAlign,
    leadInText,
    featureImage { ${imageFragment} },
    imageAlign
  }
`;

const pageBuilderFragment = /* groq */ `
  pageBuilder[] {
    _key, _type,
    ${heroBlockFragment},
    ${textBlockFragment}
  }
`;

const SITE_SETTINGS_QUERY =
  defineQuery(`*[_id == "siteSettings" && defined(siteName)][0]{
  siteName,
  siteTagline,
  "mainNav": coalesce(mainNav[defined(label) && defined(href->slug.current)] {
    "label": coalesce(label, ""),
    "href": coalesce(("/" + href->slug.current), "")
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
  features,
}`);

export const homepageQuery = async () => {
  const result =
    await sanityClient.fetch<HOMEPAGE_QUERY_RESULT>(HOMEPAGE_QUERY);
  if (!result) {
    throw new Error("Could not fetch homepage data");
  }

  return result;
};

const PAGE_QUERY = defineQuery(`*[_type == "page" && defined(slug.current)] {
  title,
  "slug": slug.current,
  ${pageBuilderFragment},
}`);

export const pageQuery = async () => {
  const result = await sanityClient.fetch<PAGE_QUERY_RESULT>(PAGE_QUERY);
  if (!result) {
    throw new Error("Could not fetch page data");
  }

  return result;
};
