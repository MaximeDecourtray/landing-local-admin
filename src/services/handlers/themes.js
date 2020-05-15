import axios from 'axios'
import ROUTES from '../routes'
import { triggerNotification, NOTIFICATION } from '../events'

const getThemes = async (x) => {
  try {
    const result = await axios.get(
      ROUTES.THEMES.READ
    )

    // If no data => notify
    if (result.length === 0) {
      triggerNotification({
        variant: NOTIFICATION.WARNING,
        message: 'No desktop data to display'
      })
    }
    x = result.data
    console.log(result.data)
    console.log(x)
  } catch (error) {
    console.log(error)
    triggerNotification({
      variant: NOTIFICATION.ERROR,
      message: 'Oops.. Something went wrong...'
    })
    return false
  }
}

export default (getThemes)
