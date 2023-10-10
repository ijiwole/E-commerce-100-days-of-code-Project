const {CustomAPIError} = require('../errors')
const { StatusCodes} = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    if (err instanceof CustomAPIError) {
        return res.Status(err.StatusCodes).json({ msg: err.message})
    }
    return res.Status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err})

}
module.exports = errorHandlerMiddleware