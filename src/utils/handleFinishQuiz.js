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

    const quiz = user.quizz < 3 ? user.quizz + 1 : user.quizz;

    let userLevelNature = user.level_nature;
    let userLevelTerritory = user.level_territory;

    let levelProgression = {
      Beginner: "Intermediate",

      Intermediate: "Advanced",

      Advanced: "Advanced",
    };

    if (user.quizz === 3) {
      if (category === "1") {
        if (levelProgression[userLevelNature]) {
          userLevelNature = levelProgression[userLevelNature];
        }
      } else if (category === "2") {
        if (levelProgression[userLevelTerritory]) {
          userLevelTerritory = levelProgression[userLevelTerritory];
        }
      }
    }

    patchUserScore(
      user.username,
      score,
      newCorrectAnswers,
      quiz,
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
