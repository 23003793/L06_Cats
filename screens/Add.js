import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Add = ({ navigation, onAddQuizItem }) => {
  const [qn, setQn] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState(0);
  const [image, setImage] = useState('');

  const handleOptionChange = (text, index) => {
    const updatedOptions = [...options];
    updatedOptions[index] = text;
    setOptions(updatedOptions);
  };

  const handleAddQuestion = () => {
    if (!qn || options.some(opt => opt === '') || !image) {
      alert('Please fill in all fields.');
      return;
    }
    const newQuizItem = {
      id: Date.now(),
      qn,
      image,
      options,
      correctOption,
    };
    onAddQuizItem(newQuizItem);
    navigation.goBack(); // Navigate back to the quiz list after adding
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Question</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Question"
        value={qn}
        onChangeText={setQn}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Image URL"
        value={image}
        onChangeText={setImage}
      />
      {options.map((option, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Option ${index + 1}`}
          value={option}
          onChangeText={(text) => handleOptionChange(text, index)}
        />
      ))}
      <Text style={styles.subtitle}>Select Correct Option (0-3):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter correct option index"
        value={String(correctOption)}
        onChangeText={(text) => setCorrectOption(Number(text))}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddQuestion}>
        <Text style={styles.buttonText}>Add Question</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Add;
