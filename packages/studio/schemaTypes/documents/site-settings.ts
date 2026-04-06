import {defineArrayMember, defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

const BRANDING_GROUP = 'branding'
const NAV_GROUP = 'navigation'
export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: BRANDING_GROUP, title: 'Branding', default: true},
    {name: NAV_GROUP, title: 'Navigation'},
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
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Link',
              type: 'reference',
              validation: (rule) => rule.required(),
              to: [{type: 'page'}],
            }),
          ],
        }),
      ],
    }),
  ],
})
