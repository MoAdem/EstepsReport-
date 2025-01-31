import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Card } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from "@expo/vector-icons";

const EDSSCard = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Card style={styles.card}>
        <View style={styles.header}>
          <MaterialIcons name="run-circle" size={30} color="#007AFF" />
          <Text style={styles.headerText}>Your EDSS level is 4.0</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <FontAwesome name="info-circle" style={styles.info} />
          </TouchableOpacity>
        </View>

        <Text style={styles.subHeader}>
          Significant disability but you can walk without an aid for 500 metres
        </Text>

        <View style={styles.chartContainer}>
          {/* Chart Grid */}
          <View style={styles.gridLines}>
            {Array.from({ length: 6 }, (_, i) => (
              <Text key={i} style={styles.gridText}>
                {12_000 - i * 2_400}
              </Text>
            ))}
          </View>

          {/* Marker and Step Indicator */}
          <View style={styles.markerContainer}>
            <View style={styles.chartLine} />
            <View style={styles.marker}></View>
            <Text style={styles.stepText}>3,200 steps</Text>
          </View>
        </View>
      </Card>

      {/* Modal for Info */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>About EDSS</Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <FontAwesome name="close" size={20} color="#333" />
              </Pressable>
            </View>
            <Text style={styles.modalText}>
              The EDSS (Expanded Disability Status Scale) graph offers a visual representation of an individual's disability progression in Multiple Sclerosis. It's a standard method used globally to understand the disease's stages and the effectiveness of treatments. By observing changes over time, individuals and healthcare professionals can gain insights into the current state of the disease and make informed decisions about care.
            </Text>
            <TouchableOpacity style={styles.learnMoreButton}>
              <Text style={styles.learnMoreButtonText}>Learn more</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    elevation: 4,
    backgroundColor: '#FFFFFF',
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  info: {
    fontSize: 18,
    color: '#667085',
    padding:10 ,
  },
  headerText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#007AFF',
  },
  subHeader: {
    fontSize: 14,
    color: '#4A4A4A',
    marginVertical: 8,
  },
  chartContainer: {
    marginVertical: 16,
    height: 200,
    position: 'relative',
  },
  gridLines: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  gridText: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  markerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartLine: {
    height: 2,
    width: '100%',
    backgroundColor: '#FF5C5C',
    position: 'absolute',
    top: '65%',
  },
  marker: {
    width: 40,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#D2F5ED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerText: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  stepText: {
    position: 'absolute',
    top: '70%',
    fontSize: 12,
    color: '#FF5C5C',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    color: '#007AFF',
  },
  modalText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
  learnMoreButton: {
    backgroundColor: '#F2FBF9',
    paddingVertical: 12,
    borderRadius: 90,
    borderColor: '#3AB09E',
    alignItems: 'center',
  },
  learnMoreButtonText: {
    color: 'black',
    fontSize: 16,   
  },
});

export default EDSSCard;
