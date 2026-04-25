import {defineField, defineType} from 'sanity'
import {ComposeSparklesIcon} from '@sanity/icons'

const MAIN_GROUP = 'main'
const CONTENT_GROUP = 'content'
const SEO_GROUP = 'seo'

export const blogsPageType = defineType({
  name: 'blogsPage',
  title: 'Blogs page',
  type: 'document',
  icon: ComposeSparklesIcon,
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

const BLOG_DESC_MAX = 160

export const blogArticleType = defineType({
  name: 'blogArticle',
  title: 'Blog article',
  type: 'document',
  icon: ComposeSparklesIcon,
  groups: [
    {name: MAIN_GROUP, title: 'Main', default: true},
    {name: CONTENT_GROUP, title: 'Article'},
  ],
  orderings: [
    {
      title: 'Date, Newest First',
      name: 'dateDesc',
      by: [{field: 'articleDate', direction: 'desc'}],
    },
    {
      title: 'Date, Oldest First',
      name: 'dateAsc',
      by: [{field: 'articleDate', direction: 'asc'}],
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Blog title',
      type: 'string',
      group: MAIN_GROUP,
    }),
    defineField({
      name: 'pageSlug',
      type: 'pageSlug',
      group: MAIN_GROUP,
    }),
    defineField({
      name: 'articleDate',
      title: 'Article date',
      type: 'date',
      group: MAIN_GROUP,
      options: {
        dateFormat: 'DD-MM-YYYY',
      },
    }),
    defineField({
      name: 'featureImage',
      title: 'Feature image',
      type: 'image',
      group: MAIN_GROUP,
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Article description',
      type: 'text',
      group: MAIN_GROUP,
      description:
        'Short descripion of the article. Used for SEO and the initial description on the blogs page.',
      validation: (rule) =>
        rule.max(BLOG_DESC_MAX).warning(`Should be under ${BLOG_DESC_MAX} characters`),
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Article Page Builder',
      type: 'pageBuilder',
      description: 'Page builder, hero is auto generated from blog title, date and feature image.',
      group: CONTENT_GROUP,
    }),
  ],
})
