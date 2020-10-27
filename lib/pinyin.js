import { map } from '../data/single'

export const pinyinFn = (value = '', options = {}) => {
  return map[value]
}
