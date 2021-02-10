import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import "./App.css";

import {
  QUESTIONS,
  QUESTION,
  MULTIPLE_CHOICE,
  ANSWERS,
  CONTENT,
  SINGLE_CHOICE,
  IS_ANSWER,
} from "./constants";
import InputField from "./components/InputField";
import { IQuestion, IAnswer } from "./types";

export const initialQuestionState: IQuestion = {
  question: "",
  answers: [
    { content: "", isAnswer: false },
    { content: "", isAnswer: false },
    { content: "", isAnswer: false },
  ],
  questionType: MULTIPLE_CHOICE,
};

const initialAnswerState: IAnswer = { content: "", isAnswer: false };

const initialState = {
  questions: [initialQuestionState],
};

const App = () => {
  const [showQuestionTypeOptions, setShowQuestionTypeOptions] = useState(false);

  return (
    <div className="App">
      <h2>Quizzes</h2>
      <Form
        mutators={{
          ...arrayMutators,
        }}
        initialValues={initialState}
        onSubmit={(values) => console.log(values)}
        render={({
          handleSubmit,
          form: {
            mutators: { push },
          },
          pristine,
          submitting,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <div className="row">
                <div className="col-75">
                  <Field
                    name="quizTitle"
                    component="input"
                    type="text"
                    placeholder={"Untitled Quiz"}
                  />
                </div>
              </div>
            </div>
            {/* <i className="fa fa-close"></i> <i className="fa fa-trash"></i> */}

            <a
              href="#"
              className="float"
              id="menu-add"
              onClick={() => setShowQuestionTypeOptions(true)}
            >
              <i className="fa fa-plus float-add"></i>
            </a>
            {showQuestionTypeOptions && (
              <ul className="fa-ul">
                <li
                  onClick={() => {
                    push(QUESTIONS, {
                      ...initialQuestionState,
                      questionType: SINGLE_CHOICE,
                    });
                    setShowQuestionTypeOptions(false);
                  }}
                >
                  <i className="fa fa-dot-circle-o"></i>
                  Single choice
                </li>
                <li
                  onClick={() => {
                    push(QUESTIONS, {
                      ...initialQuestionState,
                      questionType: MULTIPLE_CHOICE,
                    });
                    setShowQuestionTypeOptions(false);
                  }}
                >
                  <i className="fa fa-check-square"></i>
                  Multiple Choice
                </li>
              </ul>
            )}

            <FieldArray name={QUESTIONS}>
              {({ fields }) =>
                fields.map((questionName, questionIndex) => (
                  <div className={"card"} key={questionIndex}>
                    <InputField
                      name={`${questionName}.${QUESTION}`}
                      placeholder={`Question ${questionIndex + 1}`}
                    />

                    <FieldArray name={`${questionName}.${ANSWERS}`}>
                      {({ fields }) =>
                        fields.map((answerName, answerIndex) => (
                          <div className={"card-answers"}>
                            <div>
                              {values.questions[questionIndex].questionType ===
                              MULTIPLE_CHOICE ? (
                                <Field
                                  name={`${answerName}.${IS_ANSWER}`}
                                  component={"input"}
                                  type={"checkbox"}
                                />
                              ) : (
                                <Field
                                  name={`${answerName}.${IS_ANSWER}`}
                                  component={"input"}
                                  type={"radio"}
                                />
                              )}
                            </div>

                            <InputField
                              key={questionIndex + answerIndex}
                              name={`${answerName}.${CONTENT}`}
                              placeholder={`Option ${answerIndex + 1}`}
                              className="answer"
                            />
                          </div>
                        ))
                      }
                    </FieldArray>
                    <span>Add option</span>
                  </div>
                ))
              }
            </FieldArray>
            <div>
              <button type="submit" disabled={pristine || submitting}>
                Submit
              </button>
            </div>
            {/* <hr />
            <div>
              <ol>
                {values.questions.map((question: IQuestion) => (
                  <>
                    <li>
                      {question.question} {question.questionType}
                    </li>
                    <ul>
                      {question.answers.map((answer) => (
                        <li> {answer.content}</li>
                      ))}
                    </ul>
                  </>
                ))}
              </ol>
            </div> */}
          </form>
        )}
      />
    </div>
  );
};

export default App;
