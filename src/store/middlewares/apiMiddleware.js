export default store => next => async action => {
  if (!action.api) {
    return next(action)
  }

  function makeAction(result) {
    let newAction = Object.assign({}, action, {payload: result})
    delete newAction.api
    return newAction
  }

  if (typeof action.api === 'object') {
    try {
      const {status, result} = await action.api.request(store.dispatch, store.getState)
      next(makeAction({status, result}))
    }
    catch (e) {
      console.log(e)
      throw e
    }
  }
  else {
    return next(action)
  }
}