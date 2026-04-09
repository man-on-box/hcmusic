import {homepageType} from './documents/homepage'
import {pageType} from './documents/page'
import {siteSettingsType} from './documents/site-settings'

import {blockTypes} from './blocks'
import {sharedTypes} from './shared'

export const schemaTypes = [homepageType, pageType, siteSettingsType, ...blockTypes, ...sharedTypes]
