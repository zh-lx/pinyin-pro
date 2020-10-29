import { dict1 } from '../data/dict1'
import { dict2 } from '../data/dict2'
import { dict3 } from '../data/dict3'
import { dict4 } from '../data/dict4'
import { dict5 } from '../data/dict5'

export const dictSelect = (length) => {
  switch (length) {
    case 1:
      return dict1
    case 2:
      return dict2
    case 3:
      return dict3
    case 4:
      return dict4
    default:
      return dict5
  }
}
