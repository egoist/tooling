module.exports = class AppError extends Error {
  constructor(msg) {
    super()
    this.message = msg
    this.name = this.constructor.name
  }
}
