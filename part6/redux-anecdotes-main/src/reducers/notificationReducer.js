
const notificationReducer = (state = null, action) => {
    console.log('state now: ', state)
    //console.log('action', action)
    switch(action.type){
      case 'SHOW_NOTIFICATION':
        return action.data.notification
      default:
        return state
    }
}

export const showNotification = (notification) => {
    return {
      type: 'SHOW_NOTIFICATION',
      data: {
         notification,
      }
    }
}

export const hideNotification = () => {
    return {
      type: 'SHOW_NOTIFICATION',
      data: { notification:null }
    }
}

export default notificationReducer