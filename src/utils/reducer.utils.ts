import { isEmpty } from 'lodash'

export const handleErrorMessage = (payload: object | any) => {
    try {
      if (payload.arrayErrors && !isEmpty(payload.arrayErrors)) {
        return payload.arrayErrors[0]
      } else if (!payload.e.response) {
        return payload.e.message
      }
      return payload.e.response
    } catch (e) {
      return 'Server error'
    }
  }