import {documentTypes} from './documents'
import {blockTypes} from './blocks'
import {sharedTypes} from './shared'

export const schemaTypes = [...documentTypes, ...blockTypes, ...sharedTypes]
