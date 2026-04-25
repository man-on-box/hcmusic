import type {StructureResolver} from 'sanity/structure'
import {
  DocumentIcon,
  CogIcon,
  HomeIcon,
  ProjectsIcon,
  CalendarIcon,
  ComposeSparklesIcon,
} from '@sanity/icons'
import {SINGLETON_TYPES} from '../schemaTypes/constants'

const HIDDEN_TYPES = [
  ...SINGLETON_TYPES,
  'page',
  'project',
  'eventsPage',
  'eventItem',
  'blogArticle',
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singletons
      S.listItem()
        .title('Site settings')
        .id('siteSettings')
        .icon(CogIcon)
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings').title('Site Settings'),
        ),

      S.listItem()
        .title('Homepage')
        .id('home')
        .icon(HomeIcon)
        .child(S.document().schemaType('homepage').documentId('home').title('Homepage')),

      S.divider(),

      S.listItem().title('Pages').icon(DocumentIcon).child(S.documentTypeList('page')),

      S.listItem().title('Projects').icon(ProjectsIcon).child(S.documentTypeList('project')),

      S.listItem()
        .title('Events')
        .icon(CalendarIcon)
        .child(
          S.list()
            .title('Events')
            .items([
              S.listItem().title('Events Page').icon(DocumentIcon).child(
                S.document().schemaType('eventsPage').documentId('eventsPage'), // fixed ID = singleton
              ),
              S.divider(),
              S.documentTypeListItem('eventItem').title('Events'),
            ]),
        ),

      S.listItem()
        .title('Blogs')
        .icon(ComposeSparklesIcon)
        .child(
          S.list()
            .title('Blogs')
            .items([
              S.listItem().title('Blogs Page').icon(DocumentIcon).child(
                S.document().schemaType('blogsPage').documentId('blogsPage'), // fixed ID = singleton
              ),
              S.divider(),
              S.documentTypeListItem('blogArticle').title('Articles'),
            ]),
        ),

      // catch all for all remaining documents
      ...S.documentTypeListItems().filter((listItem) => {
        return !HIDDEN_TYPES.includes(listItem.getId() as string)
      }),
    ])
