import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const QuizScreen = ({ navigation }) => {
  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      qn: 'What is this cat breed?',
      image: 'british.jpg',
      correctAnswer: 'British Short Hair',
      options: ['Siberian', 'Bengal', 'Persian', 'British Short Hair'],
    },
    {
      id: 2,
      qn: 'What is this cat breed?',
      image: 'mainecoon.png',
      correctAnswer: 'Mainecoon',
      options: ['Norwegian Forest Cat', 'Mainecoon', 'Abyssinian', 'Burmese'],
    },
  ]);
  const [editMode, setEditMode] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);

  const addCat = () => {
    const newCat = {
      id: quizzes.length + 1,
      qn: 'New Question',
      image: 'new_cat.jpg',
      correctAnswer: '',
      options: [],
    };
    setQuizzes([...quizzes, newCat]);
  };

  const editCat = (quiz) => {
    setEditMode(true);
    setCurrentQuiz({ ...quiz });
  };

  const deleteCat = (id) => {
    setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
  };

  const saveChanges = () => {
    if (!currentQuiz.qn || !currentQuiz.correctAnswer || !currentQuiz.options.length) {
      Alert.alert('Validation', 'Please fill in all fields!');
      return;
    }
    setQuizzes(
      quizzes.map((quiz) =>
        quiz.id === currentQuiz.id ? { ...quiz, ...currentQuiz } : quiz
      )
    );
    setEditMode(false);
    setCurrentQuiz(null);
  };

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.goBack()}>
          <Text style={styles.navText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Quiz Screen</Text>
        <View style={styles.navButton}></View>
      </View>

      {/* Add/Edit Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.topButton} onPress={addCat}>
          <Text style={styles.buttonText}>Add Cat</Text>
        </TouchableOpacity>
        {editMode && (
          <TouchableOpacity style={styles.topButton} onPress={saveChanges}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        )}
        {!editMode && (
          <TouchableOpacity style={styles.topButton} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        )}
      </View>

      {editMode && currentQuiz ? (
        <View style={styles.editContainer}>
          <Text style={styles.editTitle}>Edit Cat Quiz</Text>
          <TextInput
            style={styles.input}
            placeholder="Question"
            value={currentQuiz.qn}
            onChangeText={(text) => setCurrentQuiz({ ...currentQuiz, qn: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Image"
            value={currentQuiz.image}
            onChangeText={(text) => setCurrentQuiz({ ...currentQuiz, image: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Correct Answer"
            value={currentQuiz.correctAnswer}
            onChangeText={(text) => setCurrentQuiz({ ...currentQuiz, correctAnswer: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Options (comma separated)"
            value={currentQuiz.options.join(', ')}
            onChangeText={(text) =>
              setCurrentQuiz({
                ...currentQuiz,
                options: text.split(',').map((option) => option.trim()),
              })
            }
          />
        </View>
      ) : (
        <FlatList
          data={quizzes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.quizItem}>
              <Text style={styles.quizText}>{item.qn}</Text>
              <TouchableOpacity onPress={() => editCat(item)}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteCat(item.id)}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#1E90FF',
    alignItems: 'center',
  },
  navButton: {
    width: 50,
  },
  navText: {
    fontSize: 16,
    color: '#fff',
  },
  navTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonContainer: {
    margin: 20,
  },
  topButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  editContainer: {
    margin: 20,
  },
  editTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  quizItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  quizText: {
    fontSize: 16,
  },
  editText: {
    color: 'green',
  },
  deleteText: {
    color: 'red',
  },
});

export default QuizScreen;
