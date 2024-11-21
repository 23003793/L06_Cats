import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Cat = ({ qn, image, options, onAnswerSelected }) => {
  return (
    <View style={styles.quizContainer}>
      <Text style={styles.question}>{qn}</Text>
      <Image source={image} style={styles.image} />
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => onAnswerSelected(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  quizContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 200,
    alignSelf: 'center',
    marginBottom: 10,
  },
  optionsContainer: {
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Cat;
