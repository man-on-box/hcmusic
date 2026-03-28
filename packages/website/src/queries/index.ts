import type { SanityDocument } from "@sanity/client";
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

export const homepageQuery = async () => {
  const query = defineQuery(`*[_id == "home"][0]{
heading,
subheading,
poster,
about,
features,
}`);

  return await sanityClient.fetch<SanityDocument>(query);
};
