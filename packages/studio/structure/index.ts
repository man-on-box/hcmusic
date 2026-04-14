import type {StructureResolver} from 'sanity/structure'
import {DocumentIcon, CogIcon, HomeIcon, ProjectsIcon} from '@sanity/icons'

const HIDDEN_TYPES = ['siteSettings', 'homepage', 'page', 'project']

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

      // catch all for all remaining documents
      ...S.documentTypeListItems().filter((listItem) => {
        return !HIDDEN_TYPES.includes(listItem.getId() as string)
      }),
    ])
