import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'

export class CompareFieldsValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly fielNameToCompare: string
  ) {}

  validate (input: any): Error {
    if (input[this.fieldName] !== input[this.fielNameToCompare]) {
      return new InvalidParamError(this.fielNameToCompare)
    }
  }
}
