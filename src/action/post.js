import axios from 'axios'
import {setAlert} from './alert'

import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST
} from './types'

// get posts

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('https://devspave.herokuapp.com/api/posts')
        dispatch({
            type:GET_POSTS,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText, status: err.response.status}
        })
    }
}
//add like

export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`https://devspave.herokuapp.com/api/posts/like/${id}`)
        dispatch({
            type:UPDATE_LIKES,
            payload:{id, like:res.data}
        })
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText, status: err.response.status}
        })
    }
}
// del  like
export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`https://devspave.herokuapp.com/api/posts/unlike/${id}`)
        dispatch({
            type:UPDATE_LIKES,
            payload:{id, like:res.data}
        })
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText, status: err.response.status}
        })
    }
}
// delete post
export const deletePost = id => async dispatch => {
    try {
        const res = await axios.delete(`https://devspave.herokuapp.com/api/posts/${id}`)
        dispatch({
            type:DELETE_POST,
            payload:id
        })
        dispatch(setAlert('Post Removed', 'sucess'))
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText, status: err.response.status}
        })
    }
}
//Add posts
export const addPost = formData => async dispatch => {
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }

    try {
        const res = await axios.post(`https://devspave.herokuapp.com/api/posts`, formData, config)
        dispatch({
            type:ADD_POST,
            payload:res.data
        })
        dispatch(setAlert('Post Created', 'sucess'))
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText, status: err.response.status}
        })
    }
}