
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
let timeoutID = 0
export const changeNotification = (notification, time) => {
    return async dispatch => {

        dispatch({
            type: 'SHOW_NOTIFICATION',
            data: {
               notification: notification,
            }
        })
        clearTimeout(timeoutID)
        timeoutID = setTimeout(()=> 
        dispatch({
            type: 'SHOW_NOTIFICATION',
            data: {
               notification: null,
            }
        }),
        1000*time)

      }
}

export default notificationReducer