import { ApiRoute } from "./index";

export const BOARD_READ = 'BOARD_READ'

export const getList = () => {
  return async (dispatch, state) => {
    try{
      const { result } = await new ApiRoute({
        url : process.env.REACT_APP_API_BOARD_KEY,
        headers : {
          "x-api-key": process.env.REACT_APP_API_BOARD_KEY,
          "Accept": "application/json",
        }
      }).request(dispatch, state)
      dispatch({type : BOARD_READ, payload : result})
    }catch(err){
      console.log(err)
    }
  }
}

