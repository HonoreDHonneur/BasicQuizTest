const express = require("express");
const router = express.Router();
const { Questions } = require("../models");
const axios = require("axios");
const { decode } = require("html-entities");

async function fetchAndStoreQuestions() {
  try {
    const response = await axios.get(
      "https://opentdb.com/api.php?amount=10&type=multiple"
    );
    const data = response.data;

    if (data.response_code === 0 && data != null) {
      // Ensure the response is successful

      await Questions.truncate({ restartIdentity: true });
      for (const entry of data.results) {
        console.log(entry);

        const correctAnswer = decode(entry.correct_answer);
        const incorrectAnswers = entry.incorrect_answers.map((answer) =>
          decode(answer)
        );

        // Combine correct answer with incorrect answers
        const answers = [correctAnswer, ...incorrectAnswers];
        answers.sort(() => Math.random() - 0.5);

        console.log(answers);
        await Questions.create({
          type: decode(entry.type),
          difficulty: decode(entry.difficulty),
          category: decode(entry.category),
          question: decode(entry.question),
          correct_answer: correctAnswer,
          answers: answers,
        });
      }
      console.log("Data inserted successfully!");
    } else {
      console.error("Failed to fetch data from API.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchAndStoreQuestions();

router.get("/answers-without-correct", async (req, res) => {
  try {
    const listOfQuestions = await Questions.findAll({
      attributes: {
        exclude: ["correct_answer", "createdAt", "updatedAt"],
      },
    });
    res.json(listOfQuestions);
  } catch (error) {
    console.log("ERROR!");
  }
});
router.get("/correct-answers", async (req, res) => {
  try {
    const listOfQuestions = await Questions.findAll({
      attributes: ["correct_answer", "question"],
    });
    res.json(listOfQuestions);
  } catch (error) {
    console.log("ERROR!");
  }
});
router.post("/", async (req, res) => {
  try {
    const question = req.body;
    await Questions.create(question);
    res.send(question);
  } catch (error) {
    console.log("ERROR!");
  }
});

module.exports = router;
