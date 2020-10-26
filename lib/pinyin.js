import { map } from '../data/single'

export const pinyin = (value = '', options = {}) => {
  return map[value]
}
