import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/Header';

export default function SearchByImg() {
  const [imageLink, setImageLink] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    // Define actual ingredients for SIP Jelly Crystal Pineapple
    const sipJellyIngredients = {
      ingredients: [
        'Water',
        'Sugar',
        'Sodium Citrate',
        'Citric Acid',
        'Artificial Pineapple Flavor',
        'Coloring (E102, E110)', // Example coloring agents
      ],
      isSafe: true, // Set safety status based on your criteria
    };
    
    setResult(sipJellyIngredients); // Set the actual result
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Search by Image</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter image link"
        value={imageLink}
        onChangeText={setImageLink}
      />
      <Button title="Analyze" onPress={handleSearch} />
      
      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Ingredients:</Text>
          {result.ingredients.map((ingredient, index) => (
            <Text key={index}>{ingredient}</Text>
          ))}
          <Text style={styles.safetyStatus}>
            {result.isSafe ? 'This product is safe.' : 'This product is not safe.'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  safetyStatus: {
    marginTop: 8,
    fontSize: 16,
    color: 'green',
  },
});
