import { default_options } from './options'

import { dictSelect } from './utils'

export const pinyinFn = (value = '', options = default_options) => {
  const dict = dictSelect(value.length)
  return options.tone ? dict[value][1] : dict[value][0]
}
