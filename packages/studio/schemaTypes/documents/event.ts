import {defineField, defineType, defineArrayMember} from 'sanity'
import {CalendarIcon} from '@sanity/icons'

const CONTENT_GROUP = 'content'
const SEO_GROUP = 'seo'

export const eventPageType = defineType({
  name: 'eventsPage',
  title: 'Events page',
  type: 'document',
  icon: CalendarIcon,
  groups: [
    {name: CONTENT_GROUP, title: 'Content', default: true},
    {name: SEO_GROUP, title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page title',
      type: 'string',
      group: CONTENT_GROUP,
    }),
    defineField({
      name: 'pageSlug',
      type: 'pageSlug',
      group: CONTENT_GROUP,
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'pageBuilder',
      group: CONTENT_GROUP,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: SEO_GROUP,
      description: 'Optional SEO fields for this page',
    }),
  ],
})

export const eventItemType = defineType({
  name: 'eventItem',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  orderings: [
    {
      title: 'Date, Newest First',
      name: 'dateDesc',
      by: [{field: 'eventDatetime', direction: 'desc'}],
    },
    {
      title: 'Date, Oldest First',
      name: 'dateAsc',
      by: [{field: 'eventDatetime', direction: 'asc'}],
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Event title',
      type: 'string',
    }),
    defineField({
      name: 'eventDatetime',
      title: 'Date and time',
      type: 'datetime',
      options: {
        dateFormat: 'DD-MM-YYYY',
        timeFormat: 'HH:mm',
        timeStep: 5,
      },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description:
        'Optional short descripion of the event. You could also link to where to find more information about the event.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Strike', value: 'strike-through'},
            ],
          },
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title', date: 'eventDatetime', location: 'location'},
    prepare({title, date, location}) {
      const dateString = date ? new Date(date).toLocaleDateString() : 'No date'
      return {
        title,
        subtitle: `${dateString} · ${location}`,
      }
    },
  },
})
