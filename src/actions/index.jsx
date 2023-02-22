import { DELETE_USER_DATA, SET_DATAUSERS, SET_LOADING } from "./types"

export const setLoading = (payload) => ({
    type: SET_LOADING,
    payload
})

export const setDataUsers = (payload) => ({
    type: SET_DATAUSERS,
    payload,
})


export const deleteUserData = (payload) => ({
    type: DELETE_USER_DATA,
    payload,
})

