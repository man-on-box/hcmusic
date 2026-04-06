import type {StructureResolver} from 'sanity/structure'
import {CogIcon, HomeIcon} from '@sanity/icons'

const SINGLETONS = ['siteSettings', 'homepage']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singletons
      S.listItem()
        .title('Site Settings')
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

      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETONS.includes(listItem.getId() as string),
      ),
    ])
