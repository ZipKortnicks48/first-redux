const INITIAL_STATE = {
    request: null,
    data: null,
    error: null
};

export function createHttpRequestReducer(requestedActionName, receivedActionName, errorActionName,
                                         initialState = INITIAL_STATE) {
    return function (state = initialState, action) {
        switch (action.type) {
            case requestedActionName:
                state.cancelTokenSource && state.cancelTokenSource.cancel();
                return Object.assign({}, state, {
                    request: action.request,
                    cancelTokenSource: action.cancelTokenSource,
                    error: null,
                    data: state.data
                });
            case receivedActionName:
                return Object.assign({}, state, {
                    data: action.data,
                    cancelTokenSource: null,
                    request: null,
                    error: null
                });
            case errorActionName:
                return Object.assign({}, state, {
                    request: null,
                    cancelTokenSource: null,
                    data: initialState.data,
                    error: action.error
                });
            default:
                return state;
        }
    };
};