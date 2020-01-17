'use strict'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import api from '@/config/env'

export default {
    state: {
        API_PATH: api,
        showFooter: true,
        showHeader: true
    },
    mutations,
    actions,
    getters
}
