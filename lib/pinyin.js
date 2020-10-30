import { default_options } from './options'

import { getPinyin } from './utils'

export const pinyinFn = (value = '', options = default_options) => {
  return getPinyin(value, value.length)
}
