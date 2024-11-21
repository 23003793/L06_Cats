import React, { useState } from 'react';
import { View, Text, StatusBar, SectionList, Button, Alert, StyleSheet } from 'react-native';
import Cat from './component/Cat';
import Navigation from './navigation';

const quizzes = [
  {
    data: [
      {
        qn: "What is this cat breed?",
        image: require('./img/british.jpg'),
        correctAnswer: 'British Short Hair',
        options: ['Siberian', 'Bengal', 'Persian', 'British Short Hair']
      },
      {
        qn: "What is this cat breed?",
        image: require('./img/mainecoon.png'),
        correctAnswer: 'Mainecoon',
        options: ['Norwegian Forest Cat', 'Mainecoon', 'Abyssinian', 'Burmese']
      },
      {
        qn: "What is this cat breed?",
        image: require('./img/munchkin.jpg'),
        correctAnswer: 'Munchkin',
        options: ['Munchkin', 'Savannah', 'Sphynx', 'Himalayan']
      },
      {
        qn: "What is this cat breed?",
        image: require('./img/siamese.jpg'),
        correctAnswer: 'Siamese',
        options: ['Burmese', 'Siamese', 'Oriental Shorthair', 'Birman']
      },
      {
        qn: "What is this cat breed?",
        image: require('./img/sphynx.jpg'),
        correctAnswer: 'Sphynx',
        options: ['Sphynx', 'Cornish Rex', 'Peterbald', 'Tonkinese']
      }
    ]
  }
];

const App = () => {
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  const handleAnswerSelected = (selectedAnswer, questionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = selectedAnswer;

    const correctAnswer = quizzes[0].data[questionIndex].correctAnswer;
    if (selectedAnswer === correctAnswer && !answers[questionIndex]) {
      setScore(score + 1);
    } else if (answers[questionIndex] === correctAnswer && selectedAnswer !== correctAnswer) {
      setScore(score - 1);
    }

    setAnswers(newAnswers);
  };

  const handleFinishQuiz = () => {
    Alert.alert(`You scored: ${score} out of ${quizzes[0].data.length}`);
    setAnswers([]);
    setScore(0);
  };

  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Guess the Cat Breeds!</Text>
          <Text style={styles.score}>Score: {score}</Text>
        </View>

        <SectionList
          sections={quizzes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Cat
              qn={item.qn}
              image={item.image}
              options={item.options}
              onAnswerSelected={(answer) => handleAnswerSelected(answer, index)}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionTitle}>{title}</Text>
          )}
          contentContainerStyle={styles.sectionListContainer}
        />

        <View style={styles.submitButton}>
          <Button title="Submit Answers" onPress={handleFinishQuiz} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA07A',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 10,
    width: '100%',
  },
  headerContainer: {
    backgroundColor: '#FFA07A',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ADD8E6',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ADD8E6',
    textAlign: 'center',
  },
  score: {
    fontSize: 20,
    color: '#FF6347',
    fontWeight: '600',
    marginTop: 5,
  },
  sectionListContainer: {
    flexGrow: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#555',
    marginTop: 15,
    marginBottom: 5,
    textAlign: 'center',
  },
  submitButton: {
    width: '80%',
    marginBottom: 20,
  },
});

export default App;
