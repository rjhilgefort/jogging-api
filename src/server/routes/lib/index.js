import * as R from 'ramda'

export const respond = R.curry((res, status, data) => {
  res.status(status)
  res.json({
    status,
    data,
  })
})

export const requiredParam = R.curry((res, name) =>
  respond(res, 400, `\`${name}\` is required`),
)
