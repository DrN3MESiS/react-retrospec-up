import {CHANGE_USER_STATUS as STAT} from './types'

export const CHANGE_USER_STATUS = (data) => {
  return {
    type: STAT,
    payload: data,
  };
}