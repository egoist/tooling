module.exports = class AppError extends Error {
  constructor(msg) {
    super()
    this.msg = msg
    this.name = this.constructor.name
  }
}
