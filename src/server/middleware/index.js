// NOTE: If this file gets big, I would start breaking out these functions to their own files

export const cors = (_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )
  next()
}

export const isAuthenticated = (req, res, next) => {
  if (!!req.user) {
    return next();
  }
  res.status(401)
  res.json({
    status: 401,
    data: 'You must login',
  })
}