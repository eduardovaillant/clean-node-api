export class EmailInUseError extends Error {
  constructor () {
    super('The received error is already in use')
    this.name = 'EmailInUseError'
  }
}
