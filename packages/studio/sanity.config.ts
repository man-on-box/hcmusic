import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'HelenCurtisMusic',

  projectId: 'x6ftvyem',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Homepage')
              .id('home')
              .child(S.document().schemaType('homepage').documentId('home')),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) => !['homepage'].includes(listItem.getId() as string),
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
