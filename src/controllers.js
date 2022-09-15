const { transformData } = require("./models")
const struct = require("./structs")

function survivorCount(req, res, next) {
  try {

    const { binField, binBoundaries, data } = req.body

    const { counts } = transformData({ binField, binBoundaries, data })

    res.status(200).json({
      counts
    })

  } catch (error) {
    next(error)
  }
}

function validation(req, res, next) {
  try {
    const { binField, binBoundaries } = req.body

    // TODO: check if payload is submitted as binField: String and binBoundaries: Array and data matches the expected struct

    const field = {
      isNumerical: struct["survivorCount"][binField] === Number
    }

    const bins = {
      isAscending: binBoundaries.slice(1).every((e, i) => e > binBoundaries[i]),
      isNumerical: binBoundaries.every(e => typeof e === 'number')
    }
    const errors = []

    if (!field.isNumerical) {
      errors.push(`binField: '${binField}' is not a valid field.`)
    }
    if (!bins.isAscending) {
      errors.push("binBoundaries: need to be in ascending order.")
    }
    if (!bins.isNumerical) {
      errors.push("binBoundaries: should only contain numeric values.")
    }

    // Returning 400 instead of the scoped 404 
    if (errors.length > 0) {
      return res.status(400).send({
        errors
      })
    }

    next()

  } catch (error) {
    next(error)
  }
}

/* istanbul ignore next */
function notFound(req, res, next) {
  res.status(404).send("Not Found")
}

/* istanbul ignore next */
function errorHandler(error, req, res, next) {
  console.error(error)
  res.status(500).send("Internal Server Error")
}

module.exports = exports = {
  survivorCount,
  validation,
  notFound,
  errorHandler
}