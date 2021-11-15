/* eslint-disable  no-unused-vars */

import { notification } from 'antd'
import { NotificationApi } from 'antd/lib/notification'

export const pushNotification = (
  type: NotificationApi[],
  title: string,
  description?: string,
  callBack = () => null,
) => {
  notification[type]({
    message: title,
    description,
    onClick: () => {
      callBack()
    },
  })
}
