import type {StructureResolver} from 'sanity/structure'
import {CogIcon, HomeIcon} from '@sanity/icons'

const HIDDEN_TYPES = ['siteSettings', 'homepage', 'page']

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

      S.listItem()
        .title('Pages')
        .id('pages')
        .child(
          S.documentList()
            .title('Top Level Pages')
            .schemaType('page')
            .filter('_type == "page" && !defined(pageSlug.parent)')
            .initialValueTemplates([S.initialValueTemplateItem('page')])
            .child((documentId) =>
              S.list()
                .title(`Manage Page`)
                .items([
                  S.listItem()
                    .title('Edit Content')
                    .child(S.document().documentId(documentId).schemaType('page')),
                  S.divider(),
                  S.listItem()
                    .title('Child Pages')
                    .child(
                      S.documentList()
                        .title('Child Pages')
                        .schemaType('page')
                        .filter('_type == "page" && pageSlug.parent._ref == $parentId')
                        .params({parentId: documentId})
                        .initialValueTemplates([
                          S.initialValueTemplateItem('page-with-parent').parameters({
                            parentId: documentId,
                          }),
                        ]),
                    ),
                ]),
            ),
        ),

      // catch all for all remaining documents
      ...S.documentTypeListItems().filter((listItem) => {
        return !HIDDEN_TYPES.includes(listItem.getId() as string)
      }),
    ])
