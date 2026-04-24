import type { LinkType } from "../types/sanity";

export const pathResolver = (documentType: string) => {
  switch (documentType) {
    case "project":
      return "/projects/";
    default:
      return "/";
  }
};

type InternalLink = {
  linkType: "internal";
  page: { _type: string; slug: string | null } | null;
  anchor: string | null;
  url: null;
};

type ExternalLink = {
  linkType: "external";
  page: null;
  anchor: null;
  url: string | null;
};

const isExternalLink = (link: LinkType | null): link is ExternalLink =>
  link?.linkType === "external";

const isInternalLink = (link: LinkType | null): link is InternalLink =>
  link?.linkType === "internal";

export const linkResolver = (
  link: LinkType | null,
): { href: string; linkType: "internal" | "external" } => {
  if (isExternalLink(link)) {
    return { href: link.url || "", linkType: "external" };
  }

  if (isInternalLink(link)) {
    const path = pathResolver(link.page?._type ?? "");
    const slug = link.page?.slug ?? "";
    const anchor = link.anchor ? `#${link.anchor.replace("#", "")}` : "";
    return { href: `${path}${slug}${anchor}`, linkType: "internal" };
  }

  return { href: "#", linkType: "internal" };
};
