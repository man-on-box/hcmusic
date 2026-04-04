import type {
  HOMEPAGE_QUERY_RESULT,
  PAGE_QUERY_RESULT,
} from "./sanity.types.ts";
import { sanityClient } from "sanity:client";
import { defineQuery } from "groq";

const imageFragment = /* groq */ `
  asset->{
    _id,
    url,
    metadata { lqip, dimensions { width, height } }
  },
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
    textAlign
  }
`;

const pageBuilderFragment = /* groq */ `
  pageBuilder[] {
    _key, _type,
    ${heroBlockFragment},
    ${textBlockFragment}
  }
`;

const HOMEPAGE_QUERY = defineQuery(`*[_id == "home"][0]{
  ${pageBuilderFragment},
  heading,
  subheading,
  about,
  features,
  image { ${imageFragment} },
}`);

export const homepageQuery = async () => {
  const result =
    await sanityClient.fetch<HOMEPAGE_QUERY_RESULT>(HOMEPAGE_QUERY);
  if (!result) {
    throw new Error("Could not fetch homepage data");
  }

  return result;
};

const PAGE_QUERY = defineQuery(`*[_type == "page"] {
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
