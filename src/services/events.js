const NOTIFICATION = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  EVENT: 'TRIGGER_NOTIFICATION'
}

const triggerNotification = ({ variant, message }) => {
  const duration = variant === NOTIFICATION.SUCCESS || NOTIFICATION.WARNING ? 5000 : null

  const triggerNotificationEvent = new CustomEvent(NOTIFICATION.EVENT, {
    detail: {
      variant,
      message,
      duration
    }
  })
  document.dispatchEvent(triggerNotificationEvent)
}

export { triggerNotification, NOTIFICATION }
