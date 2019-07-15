import React, {useReducer} from 'react';
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import types from "../types";

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    };

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    const searchUsers = async text => {
        setLoading();

        const resp = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${
            process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
            process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        dispatch({
            type: types.SEARCH_USERS,
            payload: resp.data.items
        });
    };

    const setLoading = () => {
        dispatch({type: types.SET_LOADING})
    };

    const clearUsers = () => {
        dispatch({type: types.CLEAR_USERS});
    };

    const getUser = async username => {
        setLoading();

        const resp = await axios.get(`https://api.github.com/users/${username}?client_id=${
            process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
            process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        dispatch({
            type: types.GET_USER,
            payload: resp.data
        });
    };

    return <GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser
        }}
    >
        {props.children}
    </GithubContext.Provider>
};

export default GithubState;