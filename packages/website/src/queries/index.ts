import type {
  HOMEPAGE_QUERY_RESULT,
  PAGE_QUERY_RESULT,
} from "../types/sanity.types.ts";
import { sanityClient } from "sanity:client";
import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { defineQuery } from "groq";

const builder = createImageUrlBuilder(sanityClient);
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

const imageFragment = /* groq */ `
  image{
    ...,
    "blurData": asset->metadata.lqip,
    "dominantColor": asset->metadata.palette.dominant.background,
  }
`;

const HOMEPAGE_QUERY = defineQuery(`*[_id == "home"][0]{
  heading,
  subheading,
  poster,
  about,
  features,
  ${imageFragment}
}`);

export const homepageQuery = async () => {
  const result =
    await sanityClient.fetch<HOMEPAGE_QUERY_RESULT>(HOMEPAGE_QUERY);
  if (!result) {
    throw new Error("Could not fetch homepage data");
  }
  console.log({ result });
  return result;
};

const PAGE_QUERY = defineQuery(`*[_type == "page"] {
  heading,
  subheading,
  "slug": slug.current,
  ${imageFragment},
  content
}`);

export const pageQuery = async () => {
  const result = await sanityClient.fetch<PAGE_QUERY_RESULT>(PAGE_QUERY);
  if (!result) {
    throw new Error("Could not fetch page data");
  }
  console.log({ result });
  return result;
};
