import { single_map } from '../data/single'
import { single_map_tone } from '../data/single_tone'

import { default_options } from './options'

export const pinyinFn = (value = '', options = default_options) => {
  // 目前仅对单字开启多音模式
  if (options.tone && value.length === 1) {
    return single_map_tone[value]
  }
  return single_map[value]
}
