import {EnvelopeIcon} from '@sanity/icons'
import {defineType} from 'sanity'

export const mailchimpFormType = defineType({
  name: 'mailchimpForm',
  title: 'Mailchimp Mailing List',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    {
      name: 'note',
      type: 'string',
      initialValue: 'Standard Mailchimp signup form',
      readOnly: true,
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Mailchimp Mailing List Form',
        subtitle: 'Renders the newsletter signup form',
        media: EnvelopeIcon,
      }
    },
  },
})
