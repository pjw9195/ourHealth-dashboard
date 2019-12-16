import {ResponseModel} from './default'

export class Error extends ResponseModel {
  constructor(status, data) {
    super()
    this.status = status
    this.errorMessage = data.errorMessage ? data.errorMessage : data
  }
}