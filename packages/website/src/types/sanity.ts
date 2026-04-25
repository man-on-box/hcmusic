import type {
  PAGES_QUERY_RESULT,
  SITE_SETTINGS_QUERY_RESULT,
  BLOGS_PAGE_QUERY_RESULT,
} from "../sanity/sanity.types";

// ---------- Pages ----------
export type PageData = NonNullable<PAGES_QUERY_RESULT>[number];
export type SiteSettings = NonNullable<SITE_SETTINGS_QUERY_RESULT>;
export type BlogsPageData = NonNullable<BLOGS_PAGE_QUERY_RESULT>;

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

// ---------- Blogs ----------
export type BlogArticleCardData = NonNullable<
  BlogsPageData["articles"]
>[number];
