import { patchUserScore } from "@/api";

export const handleFinishQuiz = (
  isSuccess,
  category,
  user,
  setUser,
  correctAnswersList
) => {
  if (isSuccess && user !== "guest") {
    const score = user.rating + correctAnswersList.length;
    const correct_answers = user.correct_answers
      ? user.correct_answers.split(",")
      : [];
    const newCorrectAnswers = correct_answers.concat(correctAnswersList).join();

    let userLevelNature = user.level_nature;
    let userLevelTerritory = user.level_territory;

    let userTerritoryQuiz = user.territory_quiz;
    let userNatureQuiz = user.nature_quiz;

    let levelProgression = {
      Beginner: "Intermediate",

      Intermediate: "Advanced",

      Advanced: "Advanced",
    };

    if (category === "1") {
      if (userNatureQuiz === 3) {
        userLevelNature = levelProgression[userLevelNature] || userLevelNature;
        userNatureQuiz = 1;
      } else if (userNatureQuiz < 3) {
        userNatureQuiz = userNatureQuiz + 1;
      }
    } else if (category == "2") {
      if (userTerritoryQuiz === 3) {
        userLevelTerritory =
          levelProgression[userLevelTerritory] || userLevelTerritory;
        userTerritoryQuiz = 1;
      } else if (userTerritoryQuiz < 3) {
        userTerritoryQuiz = userTerritoryQuiz + 1;
      }
    }

    patchUserScore(
      user.username,
      score,
      newCorrectAnswers,
      userNatureQuiz,
      userTerritoryQuiz,
      userLevelNature,
      userLevelTerritory
    )
      .then((updatedUser) => {
        setUser(updatedUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
