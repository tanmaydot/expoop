import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';

const CameraPreview = ({ photo, onRetake, onSave }) => {
  return (
    <View style={{ backgroundColor: 'transparent', flex: 1, width: '100%', height: '100%' }}>
      <ImageBackground source={{ uri: photo && photo.uri }} style={{ flex: 1 }}>
        <View style={styles.overlay}>
          <TouchableOpacity onPress={onRetake} style={styles.retakeButton}>
            <Text style={styles.retakeButtonText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = {
  // Your styles here
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  retakeButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 50,
    marginBottom: 20,
  },
  retakeButtonText: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 50,
    marginTop: 10,
  },
  saveButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
};

export default CameraPreview;
