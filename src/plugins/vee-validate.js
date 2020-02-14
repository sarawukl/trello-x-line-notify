import { extend, localize } from 'vee-validate'
import en from 'vee-validate/dist/locale/en.json'
import { required, regex } from 'vee-validate/dist/rules'

// Install rules
localize('en', en)
extend('required', required)
extend('regex', regex)
