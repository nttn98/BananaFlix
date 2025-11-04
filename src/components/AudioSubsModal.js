import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import React from 'react';

export default function AudioSubsModal({ visible, onApply, onCancel }) {

  const language = ['EN', 'VN', 'BR', 'DE', 'JP', 'KR', 'CN', 'RU'];
  const audio = ['EN', 'VN', 'JP'];

  return (
    <Modal visible={visible} transparent={true} statusBarTranslucent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View >
          <View style={styles.modalContent}>
            <View style={styles.column}>
              <Text style={styles.modalTitle}>Audio Track</Text>
              <ScrollView style={styles.tracksContainer}>
                {audio.map((track, index) => (
                  <TouchableOpacity key={`audio-${index}`}>
                    <View style={styles.trackItem}>
                      <Text style={styles.trackText}>{`Audio ${index + 1} - ${track}`}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <View style={styles.column}>
              <Text style={styles.modalTitle}>Subtitles</Text>
              <ScrollView style={styles.tracksContainer}>
                {language.map((subtitle, index) => (
                  <TouchableOpacity key={`audio-${index}`}>
                    <View style={styles.trackItem}>
                      <Text style={styles.trackText}>{`Audio ${index + 1} - ${subtitle}`}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.applyButton} onPress={onApply}>
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal >
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flexDirection: 'row',
    backgroundColor: '#303134',
    width: '90%',
    height: '80%',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    marginHorizontal: 10,
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  tracksContainer: {
    maxHeight: '70%',
    marginBottom: 20,
  },
  trackItem: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#404040',
  },
  trackText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%', // Adjust to control button container width
    alignSelf: 'center', // Center align the container
    marginTop: 20, // Add some spacing from the tracks
  },
  applyButton: {
    backgroundColor: '#EB1825',
    paddingVertical: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#555',
    paddingVertical: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
