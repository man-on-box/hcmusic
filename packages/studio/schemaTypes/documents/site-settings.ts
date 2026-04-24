import {defineArrayMember, defineField, defineType} from 'sanity'
import {CogIcon, LinkIcon} from '@sanity/icons'

const BRANDING_GROUP = 'branding'
const NAV_GROUP = 'navigation'
const SEO_GROUP = 'seo'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: BRANDING_GROUP, title: 'Branding', default: true},
    {name: NAV_GROUP, title: 'Navigation'},
    {name: SEO_GROUP, title: 'Main SEO'},
  ],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site name',
      type: 'string',
      group: BRANDING_GROUP,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'siteTagline',
      title: 'Site tagline',
      type: 'string',
      group: BRANDING_GROUP,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainNav',
      title: 'Main navigation',
      type: 'array',
      group: NAV_GROUP,
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navLink',
          title: 'Link',
          icon: LinkIcon,
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'link',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'mainSeo',
      title: 'Main SEO',
      type: 'seo',
      group: SEO_GROUP,
      description:
        'Default site wide SEO settings - these will be used as the default values on pages that have no SEO values set',
    }),
  ],
})
