import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'HelenCurtisMusic',

  projectId: 'x6ftvyem',
  dataset: 'production',

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
      {
        id: 'page-with-parent',
        title: 'Page with Parent',
        schemaType: 'page',
        parameters: [{name: 'parentId', type: 'string'}],
        value: (params: any) => ({
          parent: {
            _type: 'reference',
            _ref: params.parentId,
          },
        }),
      },
    ],
  },
})
