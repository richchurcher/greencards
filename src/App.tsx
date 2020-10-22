import React, { FC, useState } from "react";
import { ThemeProvider } from "styled-components";
import AppContainer from "./components/AppContainer";
import Error from "./components/Error";
import Loading from "./components/Loading";
import Quiz from "./components/Quiz";
import QuizControls from "./components/QuizControls";
import QuizHeader from "./components/QuizHeader";
import { useCategories } from "./hooks/useCategories";
import QuizProvider from "./store/QuizProvider";
import theme from "./theme";

const App: FC = () => {
  const { error, loading, categories } = useCategories();
  const [quizVisible, setQuizVisible] = useState(false);

  if (error) {
    return <Error>{error}</Error>;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <QuizProvider>
        <QuizHeader />
        <AppContainer>
          {quizVisible ? (
            <Quiz stop={() => setQuizVisible(false)} />
          ) : (
            <QuizControls
              categories={categories}
              start={() => setQuizVisible(true)}
            />
          )}
        </AppContainer>
      </QuizProvider>
    </ThemeProvider>
  );
};

export default App;
