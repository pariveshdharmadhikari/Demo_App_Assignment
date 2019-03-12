import API from '../apis/UsersAPI'

//constant header for api which is used in all api calling.
const headers = {
    'Content-Type': 'application/json',
}

//action creator for registration of user.
export const createUser = (formvalues, callBackResponse) => (dispatch) => { 
    const response = API.post('/wp/v2/users/register', formvalues, { headers: headers });
    response.then((res) => {
        callBackResponse(res);
    });
    response.catch((error) => {
        callBackResponse(error.response);
    });
    dispatch({
        type: 'CREATE_USER',
        payload: response
    });
}

//action creator for valid Login of user.
export const login = (formvalues, callBackResponse) => () => {
    const response = API.post('/jwt-auth/v1/token', formvalues, { headers: headers });
    response.then((res) => {
        callBackResponse(res);
    });
    response.catch((error) => {
        callBackResponse(error.response);
    });
}

//action creator to fetch single post for edit the post by authorized user.
//Authorization is checked by TOKEN.
export const fetchPost= (id, callBackResponse) => async () => {
    headers['Authorization']=`Bearer ${localStorage.getItem("token")}`
    const response = await API.get(`/wp/v2/posts/${id}`, { headers: headers });
    callBackResponse(response.data);
}
 
//action creator to create new post by authorized user.
//Authorization is checked by TOKEN.
export const createPost = (formvalues, callBackResponse) => () => {
    headers['Authorization']=`Bearer ${localStorage.getItem("token")}`;
    const response = API.post('/wp/v2/posts', formvalues, { headers: headers });
    response.then((res) => {
        callBackResponse(res);
    });
    response.catch((error) => {
        callBackResponse(error.response);
    });
}

//action creator to fetch all post list.
//Authorization is checked by TOKEN.
export const fetchPosts = (callBackResponse) => (dispatch) => {
    headers['Authorization']=`Bearer ${localStorage.getItem("token")}`;
    const response = API.get('/wp/v2/posts', { headers: headers });
    response.then((res) => {
        callBackResponse(res);
        dispatch({
            type: 'FETCH_POST',
            payload: res.data
        });
    });
    response.catch((error) => {
        callBackResponse(error.response);
    });
}

//action creator to delete a post by authorized user.
//Authorization is checked by TOKEN.
export const deletePost = (id, callBackResponse) => () => {
    headers['Authorization']=`Bearer ${localStorage.getItem("token")}`;
    const response = API.delete(`/wp/v2/posts/${id}`, { headers: headers });
    response.then((res) => {
        callBackResponse(res);
    });
    response.catch((error) => {
        callBackResponse(error.response);
    });
}

//action creator for updating the fetched post for editing purpose by authorized user.
//Authorization is checked by TOKEN.
export const updatePost = (id,formvalues,callBackResponse) => () => {
    headers['Authorization']=`Bearer ${localStorage.getItem("token")}`;
    const response = API.put(`/wp/v2/posts/${id}`,formvalues, { headers: headers });
    response.then((res) => {
        callBackResponse(res);
    });
    response.catch((error) => {
        callBackResponse(error.response);
    });
}