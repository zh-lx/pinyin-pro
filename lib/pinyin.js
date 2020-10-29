import { default_options } from './options'

import { dictSelect } from './utils'

export const pinyinFn = (value = '', options = default_options) => {
  return dictSelect(value.length)
}
