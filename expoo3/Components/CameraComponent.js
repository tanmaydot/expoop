import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import CameraPreview from './CameraPreview';

const CameraComponent = () => {
  const [startCamera, setStartCamera] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    __startCamera();
  }, []);

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      setStartCamera(true);
    } else {
      Alert.alert('Access denied');
    }
  };

  const __takePicture = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const __savePhoto = async () => {
    if (capturedImage) {
      try {
        await MediaLibrary.saveToLibraryAsync(capturedImage.uri);
        Alert.alert('Success', 'Photo saved to camera roll');
      } catch (error) {
        console.error('Error saving photo to camera roll: ', error);
        Alert.alert('Error', 'Failed to save photo');
      }
    }
  };

  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
  };

  const __switchCamera = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const { width, height } = Dimensions.get('window'); // Get the screen dimensions
  const aspectRatio = width / height; // Calculate the aspect ratio

  return (
    <View style={{ flex: 1, width: '100%' }}>
      {previewVisible && capturedImage ? (
        <CameraPreview photo={capturedImage} onRetake={__retakePicture} onSave={__savePhoto} />
      ) : (
        <Camera
          
          type={cameraType}
        >
          <View
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                zIndex: 1,
              }}
            >
              <TouchableOpacity onPress={__switchCamera} style={styles.cameraSwitchButton}>
                <Text style={styles.cameraSwitchButtonText}>Switch Camera</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                flexDirection: 'row',
                flex: 1,
                width: '100%',
                padding: 20,
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity onPress={__takePicture} style={styles.captureButton} />
            </View>
          </View>
        </Camera>
      )}
    </View>
  );
};

const styles = {
  // Your styles here
  camera: {
    flex: 1,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
  cameraSwitchButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
  },
  cameraSwitchButtonText: {
    fontSize: 16,
    color: '#fff',
    margin: 10,
    backgroundColor: 'black',
  },
};

export default CameraComponent;
