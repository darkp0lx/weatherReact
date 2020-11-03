//const
const dataInitial = {
  location:{},
  data:{}
};
//type
const GET_LOCATION_SUCCESS="GET_LOCATION_SUCCESS"
const GET_DATA_SUCCESS="GET_DATA_SUCCESS"
/* reducer */
export default function weatherReducer(state = dataInitial, action) {
  switch (action.type) {
    case GET_LOCATION_SUCCESS:
      return{
        ...state,
        location:action.payload
      }
    case GET_DATA_SUCCESS:{
      return{
        ...state,
        data:action.payload
      }
    }
    default:
      return state
  }
}

/* actions */
export const obtenerLocation=(res)=>(dispatch)=>(
  dispatch({
    type:GET_LOCATION_SUCCESS,
    payload:res,
  })
)
export const getData=(res)=>(dispatch)=>{
  dispatch({
    type:GET_DATA_SUCCESS,
    payload:res
  })
}