import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Edit = ({ route, navigation, onEditQuizItem }) => {
  const { item } = route.params;
  const [qn, setQn] = useState(item.qn);
  const [options, setOptions] = useState(item.options);
  const [correctOption, setCorrectOption] = useState(item.correctOption);
  const [image, setImage] = useState(item.image);

  const handleOptionChange = (text, index) => {
    const updatedOptions = [...options];
    updatedOptions[index] = text;
    setOptions(updatedOptions);
  };

  const handleSaveChanges = () => {
    if (!qn || options.some(opt => opt === '') || !image) {
      alert('Please fill in all fields.');
      return;
    }
    const updatedQuizItem = {
      ...item,
      qn,
      image,
      options,
      correctOption,
    };
    onEditQuizItem(updatedQuizItem);
    navigation.goBack(); // Navigate back after saving
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Question</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
        <Text style={styles.buttonText}>Save Changes</Text>
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

export default Edit;
