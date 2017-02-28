/**
 * Created by fiddlest on 2/24/2017.
 */
/**
 * This reducer takes care of  network request
 * @param state
 * @param action
 * @returns {*}
 */
export const requestReducer = (state = requestInitState, action)=> {
  if(action.type === "FETCH_DATA"){
    return Object.assign({},state,{
      isFetching:true,
      failed : false
    });
  }else if( action.type === "FETCH_DATA_SUCCESS"){
    return Object.assign({},state,{
      isFetching:false,
      failed : false,
      items: action.items
    })

  }else if(action.type === "FETCH_DATA_FAILURE"){
    return Object.assign({},state,{
      isFetching:false,
      failed : true,
    })
  }
  return state;
};
