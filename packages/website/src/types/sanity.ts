import type {
  PAGE_QUERY_RESULT,
  SITE_SETTINGS_QUERY_RESULT,
} from "../sanity/sanity.types";

// ---------- Pages ----------
export type PageData = NonNullable<PAGE_QUERY_RESULT>[number];
export type SiteSettings = NonNullable<SITE_SETTINGS_QUERY_RESULT>;

// ---------- Shared Types ----------
export type NavItem = NonNullable<SiteSettings["mainNav"]>[number];
export type LinkType = NonNullable<NavItem["link"]>;

// ---------- Page Builder ----------
export type PageBuilderBlock = NonNullable<PageData["pageBuilder"]>[number];
export type HeroBlockData = Extract<PageBuilderBlock, { _type: "heroBlock" }>;
export type TextBlockData = Extract<PageBuilderBlock, { _type: "textBlock" }>;
export type FeatureCardsBlockData = Extract<
  PageBuilderBlock,
  { _type: "featureCardsBlock" }
>;
