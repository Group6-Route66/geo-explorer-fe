import axios from "axios";

const geoExplorerApi = axios.create({
    baseURL: "https://geo-explorer-be.onrender.com/api"
});

export const getSubCategories = () => {
    return geoExplorerApi.get("/subcategories").then(({data}) => {
       return(data.subcategories);
    });
};

export const getUsers = () => {
    return geoExplorerApi.get("/users").then(({data}) => {
       return(data.users);
    });
};

export const getUserByUsername = (username) => {
    return geoExplorerApi.get(`/users/${username}`).then(({data}) => {
       return(data.user);
    });
};

export const getLeasrningCards = () => {
    return geoExplorerApi.get("/learning-cards").then(({data}) => {
       return(data.learningCards);
    });
};

export const getMatchingPairs = () => {
    return geoExplorerApi.get("/matching-pairs").then(({data}) => {
       return(data.matchingPairs);
    });
};

export const getMultichoiceQAs = () => {
    return geoExplorerApi.get("/multichoice_qa").then(({data}) => {
       return(data.multichoice_qa);
    });
};