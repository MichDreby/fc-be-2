/* eslint-disable no-console */
import { chunk, forEach } from 'lodash'

export const logger = (...args) => {
  forEach(chunk(args, 2), ([item1, item2]) => {
    console.log('******\n', item1, item2 ?? 'item2 is empty')
  })
}
