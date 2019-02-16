// Methods
export const log = console.log
export const debug = (...args) => console.log('🐛: ', ...args)
export const info = (...args) => console.log('ℹ️: ', ...args)
export const warn = (...args) => console.warn('⚠️️: ', ...args)
export const error = (...args) => console.error('❌️️: ', ...args)