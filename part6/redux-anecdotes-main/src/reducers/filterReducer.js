
const filterReducer = (state = "", action) => {
    console.log('state now: ', state)
    //console.log('action', action)
    switch(action.type){
      case 'SHOW_FILTER':
        return action.data.filter
      default:
        return state
    }
}

export const changeFilter = (filter) => {
    return {
      type: 'SHOW_FILTER',
      data: {
        filter,
      }
    }
}

export default filterReducer