import axios from "axios";

const geoExplorerApi = axios.create({
  baseURL: "https://geo-explorer-be.onrender.com/api",
});
export const getCategories = () => {
  return geoExplorerApi.get("/categories").then(({ data }) => data.categories);
};

export const getSubCategories = () => {
  return geoExplorerApi.get("/subcategories").then(({ data }) => {
    return data.subcategories;
  });
};

export const getUsers = () => {
  return geoExplorerApi.get("/users").then(({ data }) => {
    return data.users;
  });
};

export const getUserByUsername = (username) => {
  return geoExplorerApi.get(`/users/${username}`).then(({ data }) => {
    return data.user;
  });
};

export const postUser = (username, avatar_url) => {
  return geoExplorerApi
    .post(`/users`, {
      username: username,
      avatar_url: avatar_url,
    })
    .then(({ data }) => {
      return data.user;
    });
};

export const patchUserAvatar = (username, avatar_url) => {
  return geoExplorerApi
    .patch(`/users/${username}`, { avatar_url: avatar_url })
    .then(({ data }) => {
      return data.user;
    });
};

export const patchUserScore = (
  username,
  score,
  correctedAnswers,
  newQuiz,
  userLevelNature,
  userLevelTerritory
) => {
  return geoExplorerApi
    .patch(`/users/${username}`, {
      rating: score,
      correct_answers: correctedAnswers,
      quizz: newQuiz,
      level_nature: userLevelNature,
      level_territory: userLevelTerritory,
    })
    .then(({ data }) => {
      return data.user;
    });
};

export const getLearningCards = (continent, sub_category_id, page = 1) => {
  return geoExplorerApi
    .get(
      `/learning-cards?continent=${continent}&sub_category_id=${sub_category_id}&page=${page}`
    )
    .then(({ data }) => {
      return data.learningCards;
    });
};

export const getMatchingPairs = (category_id, continent, level) => {
  return geoExplorerApi
    .get(
      `/matching-pairs?category_id=${category_id}&continent=${continent}&level=${level}`
    )
    .then(({ data }) => {
      return data.matchingPairs;
    });
};

export const getMultichoiceQAs = (level, continent, category_id) => {
  return geoExplorerApi
    .get(
      `/multichoice-qa?level=${level}&continent=${continent}&category_id=${category_id}`
    )
    .then(({ data }) => {
      return data.multichoice_qa;
    });
};

// getMatchingPairs(1, "asia", "Beginner").then((res) => {
//   console.log(res, "matching pairs");
// });

// getSubCategories().then((res) => {
//   console.log(res, "subcategories");
// });

// getUsers().then((res) => {
//   console.log(res, "users");
// });

// getUserByUserId("john_s").then((res) => {
//   console.log(res, "users");
// });

// getLearningCards("asia", 1).then((res) => {
//   console.log(res, "learning cards");
// });

// getMultichoiceQAs("Beginner", "asia", 1).then((res) => {
//   console.log(res, "multichoice");
// });
