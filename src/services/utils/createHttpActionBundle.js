import axios, {CancelToken} from "axios";

export function createHttpRequestActionBundle(axiosOptions, requestedActionName, receivedActionName, errorActionName,
                                              {
                                                  onSuccess = () => {
                                                  },
                                                  onError = () => {
                                                  },
                                                  dataRequestAction,
                                                  dataReceivedAction,
                                                  dataErrorAction
                                              } = {}) {
    const requestedAction = dataRequestAction || ((request, cancelTokenSource) => {
        return {
            type: requestedActionName,
            request,
            cancelTokenSource
        };
    });

    const receivedAction = dataReceivedAction || (data => {
        return {
            type: receivedActionName,
            data
        };
    });

    const errorAction = dataErrorAction || (error => {
        return {
            type: errorActionName,
            error
        };
    });

    const fetchAction = () => {
        const cancelTokenSource = CancelToken.source();
        let token = localStorage.getItem('token');
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        
        const apiRequest = axios({
            ...axiosOptions,
            url:`http://127.0.0.1:8000/${axiosOptions.url}`,
            timeout: axiosOptions.timeout || 60000,
            cancelToken: cancelTokenSource.token
        });

        return dispatch => {
            const request = apiRequest
                .then(response => {
                    dispatch(receivedAction(response.data));
                    onSuccess(dispatch, response);
                    return response;
                }).catch(error => {
                    if (axios.isCancel(error)) {
                        return error;
                    }
                    if (!!error.response && error.response.status === 401) {
                        // TODO redirect to login
                    } else {
                        dispatch(errorAction(error));
                        onError(dispatch, error);
                    }
                    throw error;
                });
            dispatch(requestedAction(request, cancelTokenSource));
            return request;
        };
    };

    return fetchAction;
}