import { ApiRoute } from "./index";

export const DATE_READ = 'DATE_READ'

export const getList = () => {
  return async (dispatch, state) => {
    try{
      const { result } = await new ApiRoute({
        url : process.env.REACT_APP_DATE_URL,
        headers : {
          "x-api-key": process.env.REACT_APP_API_DATE_KEY,
          "Accept": "application/json",
        }
      }).request(dispatch, state)
      dispatch({type : DATE_READ, payload : result})
    }catch(err){
      console.log(err)
    }
  }
}

