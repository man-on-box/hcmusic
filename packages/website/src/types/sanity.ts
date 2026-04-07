import type { PAGE_QUERY_RESULT } from "../sanity/sanity.types";

// ---------- Pages ----------
export type PageData = NonNullable<PAGE_QUERY_RESULT>[number];

// ---------- Page Builder ----------
export type PageBuilderBlock = NonNullable<PageData["pageBuilder"]>[number];
export type HeroBlockData = Extract<PageBuilderBlock, { _type: "heroBlock" }>;
export type TextBlockData = Extract<PageBuilderBlock, { _type: "textBlock" }>;
export type FeatureCardsBlockData = Extract<
  PageBuilderBlock,
  { _type: "featureCardsBlock" }
>;
