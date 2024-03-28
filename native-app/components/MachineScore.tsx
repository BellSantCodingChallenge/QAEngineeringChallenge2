import React, {useCallback, useEffect, useState} from 'react';
import {Button, Platform, StyleSheet, TextInput} from 'react-native';

import {Text, View} from './Themed';
import axios from 'axios';
import Constants from 'expo-constants';
import RNPickerSelect from 'react-native-picker-select';
import machineData from '../data/machineData.json';
import {MachineType, machineNames} from '../data/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMachineData} from '../app/useMachineData';
import {useFocusEffect} from 'expo-router';

export const MachineScore = ({
  machineName,
  score,
}: {
  machineName: string;
  score: string;
}) => {
  return (
    <>
      {score && (
        <>
          <Text
            testID ='machine-health-score'
            style={styles.text}
          >{`${machineNames[machineName]}: ${score}` } </Text >
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  text: {},
});
