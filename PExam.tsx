import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Platform, Alert, Button, Image } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';

const dbFileName = Platform.select({
  // ios: 'MainDB.db', // On iOS, add the .db extension
  android: 'MainDB.db', // On Android, add the .db extension
});
const db = SQLite.openDatabase(
  {
    name: dbFileName,
    location: 'default',
  },
  () => console.log('Database opened'),
  error => console.log(error)
);
// const dbFileName = Platform.select({
//   android: 'MainDB.db', // On Android, add the .db extension
// });

// const downloadsDir = RNFS.DownloadDirectoryPath;

// // Define destination path (Downloads folder)
// const destPath = `${downloadsDir}/${dbFileName}`;
// console.log(destPath)
// // Open database directly in Downloads folder
// const db = SQLite.openDatabase(
//   {
//     name: dbFileName,
//     location: destPath,
//   },
//   () => console.log('Database opened'),
//   error => console.log(error)
// );

interface UserData {
  ID: number;
  Name: string;
  Address: string,
  DOB: string,
  Village: string,
  Gender: string,
  PIN: string,
  DOE: string,
  Contact: string,
  Occupation: string,
  MonthlyIncome: string,
  Education: string,
  CancerHistory: string,
  Latitude: string,
  Longitude: string,
}
const PExam = () => {
    const [patientID, setPatientID] = useState("");
    const [tobaccoYear, setTobaccoYear] = useState("");
    const [tobaccoMonth, setTobaccoMonth] = useState("");
    const [gutkhaYear, setGutkhaYear] = useState("");
    const [gutkhaMonth, setGutkhaMonth] = useState("");
    const [bidiYear, setBidiYear] = useState("");
    const [bidiMonth, setBidiMonth] = useState("");
    const [cigaretteYear, setCigaretteYear] = useState("");
    const [cigaretteMonth, setCigaretteMonth] = useState("");
    const [betelYear, setBetelYear] = useState("");
    const [betelMonth, setBetelMonth] = useState("");
    const [paanYear, setPaanYear] = useState("");
    const [paanMonth, setPaanMonth] = useState("");
    const [aCommercialYear, setACommercialYear] = useState("");
    const [aCommercialMonth, setACommercialMonth] = useState("");
    const [aBrewedYear, setABrewedYear] = useState("");
    const [aBrewedMonth, setABrewedMonth] = useState("");

    const [data, setData] = useState<UserData[]>([]);


    const [tobaccoFrequencySelectedOption, setTobacooFrequencySelectedOption] = useState(null);
    const [gutkhaFrequencySelectedOption, setGutkhaFrequencySelectedOption] = useState(null);
    const [bidiFrequencySelectedOption, setBidiFrequencySelectedOption] = useState(null);
    const [cigaretteFrequencySelectedOption, setCigaretteFrequencySelectedOption] = useState(null);
    const [betelFrequencySelectedOption, setBetelFrequencySelectedOption] = useState(null);
    const [paanFrequencySelectedOption, setPaanFrequencySelectedOption] = useState(null);
    const [aCommercialFrequencySelectedOption, setACommercialFrequencySelectedOption] = useState(null);
    const [aBrewedFrequencySelectedOption, setAbrewedFrequencySelectedOption] = useState(null);

    const [tobacooTried, setTobacooTried] = useState(null);
    const [gutkhaTried, setGutkhaTried] = useState(null);
    const [bidiTried, setBidiTried] = useState(null);
    const [cigretteTried, setCigaretteTried] = useState(null);
    const [betelTried, setBetelTried] = useState(null);
    const [paanTried, setPaanTried] = useState(null);
    const [aCommercialTried, setAcommercialTried] = useState(null);
    const [aBrewedTried, setAbrewedTried] = useState(null);

    const [tobacooWilling, setTobacooWilling] = useState(null);
    const [gutkhaWilling, setGutkhaWilling] = useState(null);
    const [bidiWilling, setBidiWilling] = useState(null);
    const [cigretteWilling, setCigaretteWilling] = useState(null);
    const [betelWilling, setBetelWilling] = useState(null);
    const [paanWilling, setPaanWilling] = useState(null);
    const [aCommercialWilling, setAcommercialWilling] = useState(null);
    const [aBrewedWilling, setAbrewedWilling] = useState(null);
    const [loadingData, setLoadingData] = useState(true);

    const [doctor, setDoctor] = useState(null)
    const [awerness ,setAwareness] = useState("");
    const [screening ,setScreening] = useState("");
    const [causes ,setCauses] = useState("");
    const [curable ,setCurable] = useState("");
  const frequencyOptions = [
    { value: 'Heavy', label: 'Heavy' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Occasional', label: 'Occasional' }
  ];
  const triedOptions = [
    { value: "Yes", label: 'Yes' },
    { value: "No", label: 'No' },
  ];
  const willingOptions = [
    { value: "Yes", label: 'Yes' },
    { value: "No", label: 'No' },
  ];

  const handleTobaccoYearText = (text) =>{
    setTobaccoYear(text)
  }
  const handleTobaccoMonthText = (text) =>{
    setTobaccoMonth(text)
  }
  const handleGutkhaYearText = (text) =>{
    setGutkhaYear(text)
  }
  const handleGutkhaMonthText = (text) =>{
    setGutkhaMonth(text)
  }
  const handleBidiYearText = (text) =>{
    setBidiYear(text)
  }
  const handleBidiMonthText = (text) =>{
    setBidiMonth(text)
  }
  const handleCigaretteYearText = (text) =>{
    setCigaretteYear(text)
  }
  const handleCigaretteMonthText = (text) =>{
    setCigaretteMonth(text)
  }
  const handleBetelYearText = (text) =>{
    setBetelYear(text)
  }
  const handleBetelMonthText = (text) =>{
    setBetelMonth(text)
  }
  const handlePaanYearText = (text) =>{
    setPaanYear(text)
  }
  const handlePaanMonthText = (text) =>{
    setPaanMonth(text)
  }
  const handleACommercialYearText = (text) =>{
    setACommercialYear(text)
  }
  const handleACommercialMonthText = (text) =>{
    setACommercialMonth(text)
  }
  const handleABrewedYearText = (text) =>{
    setABrewedYear(text)
  }
  const handleABrewedMonthText = (text) =>{
    setABrewedMonth(text)
  }
  


  const handleTobacooFrequencySelectOption = (optionId) => {
    setTobacooFrequencySelectedOption(optionId);
  };
  const handleGutkhaFrequencySelectOption = (optionId) => {
    setGutkhaFrequencySelectedOption(optionId);
  };
  const handleBidiFrequencySelectOption = (optionId) => {
    setBidiFrequencySelectedOption(optionId);
  };
  const handleCigaretteTobacooFrequencySelectOption = (optionId) => {
    setCigaretteFrequencySelectedOption(optionId);
  };
  const handleBetelFrequencySelectOption = (optionId) => {
    setBetelFrequencySelectedOption(optionId);
  };
  const handlePaanFrequencySelectOption = (optionId) => {
    setPaanFrequencySelectedOption(optionId);
  };
  const handleAcommercialFrequencySelectOption = (optionId) => {
    setACommercialFrequencySelectedOption(optionId);
  };
  const handleaBrewedFrequencySelectOption = (optionId) => {
    setAbrewedFrequencySelectedOption(optionId);
  };

  const handleTobacooTried = (optionId) => {
    setTobacooTried(optionId);
  };
  const handleGutkhaTried = (optionId) => {
    setGutkhaTried(optionId);
  };
  const handleBidiTried = (optionId) => {
    setBidiTried(optionId);
  };
  const handleCigaretteTried = (optionId) => {
    setCigaretteTried(optionId);
  };
  const handleBetelTried = (optionId) => {
    setBetelTried(optionId);
  };
  const handlePaanTried = (optionId) => {
    setPaanTried(optionId);
  };
  const handleAcommercialTried = (optionId) => {
    setAcommercialTried(optionId);
  };
  const handleaBrewedTried = (optionId) => {
    setAbrewedTried(optionId);
  };

  const handleTobacooWilling = (optionId) => {
    setTobacooWilling(optionId);
  };
  const handleGutkhaWilling = (optionId) => {
    setGutkhaWilling(optionId);
  };
  const handleBidiWilling = (optionId) => {
    setBidiWilling(optionId);
  };
  const handleCigaretteWilling = (optionId) => {
    setCigaretteWilling(optionId);
  };
  const handleBetelWilling = (optionId) => {
    setBetelWilling(optionId);
  };
  const handlePaanWilling = (optionId) => {
    setPaanWilling(optionId);
  };
  const handleAcommercialWilling = (optionId) => {
    setAcommercialWilling(optionId);
  };
  const handleaBrewedWilling = (optionId) => {
    setAbrewedWilling(optionId);
  };

  const awarenessOptions = [
    { value: "Yes", label: 'Yes' },
    { value: "No", label: 'No' },
  ];
  const handleIAwarenessOption = (optionId) => {
      setAwareness(optionId);
    };

    const screeningOptions = [
      { value: "Yes", label: 'Yes' },
      { value: "No", label: 'No' },
    ];
    const handleScreeningOption = (optionId) => {
        setScreening(optionId);
      };
      const causesOptions = [
        { value: "Yes", label: 'Yes' },
        { value: "No", label: 'No' },
      ];
      const handleCausesOption = (optionId) => {
          setCauses(optionId);
        };
        const curableOptions = [
          { value: "Yes", label: 'Yes' },
          { value: "No", label: 'No' },
        ];
        const handleCurableOption = (optionId) => {
            setCurable(optionId);
          };

  const updatePatient = () => {
      const id = patientID 
      db.transaction((tx) => {
        tx.executeSql(
           'UPDATE CancerScreeningMain SET TobaccoYears=?, TobaccoMon=?, TobaccoF=?, TobaccoT=?, TobaccoW=?, GutkaYears=?, GutkaMon=?, GutkaF=?, GutkaT=?, GutkaW=?, BidiYears=?, BidiMon=?, BidiF=?, BidiT=?, BidiW=?, CigaretteYears=?, CigaretteMon=?, CigaretteF=?, CigaretteT=?, CigaretteW=?, BetelnutYears=?, BetelnutMon=?, BetelnutF=?, BetelnutT=?, BetelnutW=?, PaanMasalaYears=?, PaanMasalaMon=?, PaanMasalaF=?, PaanMasalaT=?, PaanMasalaW=?, AlcoholCommercialYears=?, AlcoholCommercialMon=?, AlcoholCommercialF=?, AlcoholCommercialT=?, AlcoholCommercialW=?, AlcoholHomeBrewedYears=?, AlcoholHomeBrewedMon=?, AlcoholHomeBrewedF=?, AlcoholHomeBrewedT=?, AlcoholHomeBrewedW=?,AwareHarmeffectofTobbacco=?,UndergoneCancerScreening=?,TobaccoCausesCancer=?,CancerIsCurable=? WHERE id=?',                                                                                        
            [tobaccoYear, tobaccoMonth, tobaccoFrequencySelectedOption,tobacooTried,tobacooWilling,gutkhaYear,gutkhaMonth, gutkhaFrequencySelectedOption, gutkhaTried, gutkhaWilling, bidiYear, bidiMonth, bidiFrequencySelectedOption, bidiTried, bidiWilling, cigaretteYear, cigaretteMonth, cigaretteFrequencySelectedOption, cigretteTried, cigretteWilling, betelYear, betelMonth, betelFrequencySelectedOption, betelTried, betelWilling, paanYear, paanMonth, paanFrequencySelectedOption, paanTried, paanWilling, aCommercialYear,aCommercialMonth,aCommercialFrequencySelectedOption, aCommercialTried, aCommercialWilling, aBrewedYear, aBrewedMonth, aBrewedFrequencySelectedOption,aBrewedTried,aBrewedWilling,awerness,screening,causes,curable, id],
          (txObj, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              Alert.alert('Success', 'Patient data updated successfully');
            } else {
              Alert.alert('Error', 'Failed to update patient data');
            }
          },
          (txObj, error) => {
            console.log('Error updating patient data:', error);
          }
        );
      });    
  };

  const retrieveData = (): void => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM CancerScreeningMain;',
        [],
        (tx, results) => {
          const rows = results.rows;
          console.log(rows)
          let users: UserData[] = [];

          for (let i = 0; i < rows.length; i++) {
            users.push(rows.item(i));
          }

          setData(users);
        },
        error => console.log(error)
      );
    });
  };
  const retrievePatientData = async () =>{
    try{
    const jsonValue = await AsyncStorage.getItem('patientData');
    const data = await JSON.parse(jsonValue);
    setLoadingData(true)
    setPatientID(data.ID)
    data.TobaccoYears && setTobaccoYear(data.TobaccoYears)
    data.TobaccoMon && setTobaccoMonth(data.TobaccoMon);
    data.TobaccoF && setTobacooFrequencySelectedOption(data.TobaccoF);
    data.TobaccoT && setTobacooTried(data.TobaccoT);
    data.TobaccoW && setTobacooWilling(data.TobaccoW);
    data.GutkaYears && setGutkhaYear(data.GutkaYears);
    data.GutkaMon && setGutkhaMonth(data.GutkaMon);
    data.GutkaF && setGutkhaFrequencySelectedOption(data.GutkaF);
    data.GutkaT && setGutkhaTried(data.GutkaT);
    data.GutkaW && setGutkhaWilling(data.GutkaW);
    data.BidiYears && setBidiYear(data.BidiYears);
    data.BidiMon && setBidiMonth(data.BidiMon);
    data.BidiF && setBidiFrequencySelectedOption(data.BidiF);
    data.BidiT && setBidiTried(data.BidiT);
    data.BidiW && setBidiWilling(data.BidiW);
    data.CigaretteYears && setCigaretteYear(data.CigaretteYears);
    data.CigaretteMon && setCigaretteMonth(data.CigaretteMon);
    data.CigaretteF && setCigaretteFrequencySelectedOption(data.CigaretteF);
    data.CigaretteT && setCigaretteTried(data.CigaretteT);
    data.CigaretteW && setCigaretteWilling(data.CigaretteW);
    data.BetelnutYears && setBetelYear(data.BetelnutYears);
    data.BetelnutMon && setBetelMonth(data.BetelnutMon);
    data.BetelnutF && setBetelFrequencySelectedOption(data.BetelnutF);
    data.BetelnutT && setBetelTried(data.BetelnutT);
    data.BetelnutW && setBetelWilling(data.BetelnutW);
    data.PaanMasalaYears && setPaanYear(data.PaanMasalaYears);
    data.PaanMasalaMon && setPaanMonth(data.PaanMasalaMon);
    data.PaanMasalaF && setPaanFrequencySelectedOption(data.PaanMasalaF);
    data.PaanMasalaT && setPaanTried(data.PaanMasalaT);
    data.PaanMasalaW && setPaanWilling(data.PaanMasalaW);
    data.AlcoholCommercialYears && setACommercialYear(data.AlcoholCommercialYears);
    data.AlcoholCommercialMon && setACommercialMonth(data.AlcoholCommercialMon);
    data.AlcoholCommercialF && setACommercialFrequencySelectedOption(data.AlcoholCommercialF);
    data.AlcoholCommercialT && setAcommercialTried(data.AlcoholCommercialT);
    data.AlcoholCommercialW && setAcommercialWilling(data.AlcoholCommercialW);
    data.AlcoholHomeBrewedYears && setABrewedYear(data.AlcoholHomeBrewedYears);
    data.AlcoholHomeBrewedMon && setABrewedMonth(data.AlcoholHomeBrewedMon);
    data.AlcoholHomeBrewedF && setAbrewedFrequencySelectedOption(data.AlcoholHomeBrewedF);
    data.AlcoholHomeBrewedT && setAbrewedTried(data.AlcoholHomeBrewedT);
    data.AlcoholHomeBrewedW && setAbrewedWilling(data.AlcoholHomeBrewedW);
    data.AwareHarmeffectofTobbacco && setAwareness(data.AwareHarmeffectofTobbacco);
    data.UndergoneCancerScreening && setScreening(data.UndergoneCancerScreening);
    data.TobaccoCausesCancer && setCauses(data.TobaccoCausesCancer);
    data.CancerIsCurable && setCurable(data.CancerIsCurable)
    console.log(loadingData)
    setLoadingData(false);
    }catch(err){
      console.log("Failed to load data")
    }
  }
  const getDocData = async () =>{
    try{
      const jsonValue = await AsyncStorage.getItem('doctorData');
      const data = await JSON.parse(jsonValue);
      setDoctor(data)
    }catch(err){
      setDoctor(null)
    }
  }
  useFocusEffect(
    useCallback(() => {
    getDocData();
    }, [])
  );
  useEffect(()=>{
    retrievePatientData();
  },[])
    return (
        <ScrollView>
        {!doctor && <Text style={styles.pleaseLogin}>Please login to save/update patient data</Text>}
          {loadingData && <Text style={styles.fetchingData}>Fetching Data... Please wait!</Text>}
        <ScrollView style={styles.tableContainer} horizontal={true}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>HABIT</Text>
            <Text style={styles.tableHeader}>DURATION(YEAR)</Text>
            <Text style={styles.tableHeader}>DURATION(MONTH)</Text>
            <Text style={styles.tableHeader}>FREQUENCY(HEAVY)</Text>
            <Text style={styles.tableHeader}>FREQUENCY(MEDIUM)</Text>
            <Text style={styles.tableHeader}>FREQUENCY(OCCASIONAL)</Text>
            <Text style={styles.tableHeader}>TRIED TO QUIT(YES)</Text>
            <Text style={styles.tableHeader}>TRIED TO QUIT(NO)</Text>
            <Text style={styles.tableHeader}>WILLING TO QUIT(YES)</Text>
            <Text style={styles.tableHeader}>WILLING TO QUIT(NO)</Text>
          </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell,styles.habit]}>Tobacco Chewing</Text>
              <TextInput style={[styles.tableCell,styles.input]} value={tobaccoYear ? tobaccoYear : ""} onChangeText={handleTobaccoYearText} keyboardType='numeric'/>
              <TextInput style={[styles.tableCell,styles.input]} value={tobaccoMonth ? tobaccoMonth : ""} onChangeText={handleTobaccoMonthText} keyboardType='numeric'/>
              {frequencyOptions.map(option => (
                <TouchableOpacity
                key={option.value}
                onPress={() => handleTobacooFrequencySelectOption(option.value)}
                style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:"#fffae5", margin: 2, width:200}}>
                <View
                    style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                    }}>
                    {tobaccoFrequencySelectedOption === option.value && (
                    <View
                        style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#000'
                        }}
                    />
                    )}
                </View>
                <Text>{option.label}</Text>
                </TouchableOpacity>
            ))}
              {triedOptions.map(option => (
                <TouchableOpacity
                key={option.value}
                onPress={() => handleTobacooTried(option.value)}
                style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:"#b7efc5", margin: 2, width:200}}>
                <View
                    style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                    }}>
                    {tobacooTried === option.value && (
                    <View
                        style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#000'
                        }}
                    />
                    )}
                </View>
                <Text>{option.label}</Text>
                </TouchableOpacity>
            ))}
              {willingOptions.map(option => (
                <TouchableOpacity
                key={option.value}
                onPress={() => handleTobacooWilling(option.value)}
                style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:"#bde0fe", margin: 2, width:200}}>
                <View
                    style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                    }}>
                    {tobacooWilling === option.value && (
                    <View
                        style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#000'
                        }}
                    />
                    )}
                </View>
                <Text>{option.label}</Text>
                </TouchableOpacity>
            ))}
            </View>
            <View style={styles.tableRow}>
            <Text style={[styles.tableCell,styles.habit]}>Gutkha</Text>
            <TextInput style={[styles.tableCell,styles.input]} value={gutkhaYear ? gutkhaYear : ""} onChangeText={handleGutkhaYearText} keyboardType='numeric'/>
              <TextInput style={[styles.tableCell,styles.input]} value={gutkhaMonth ? gutkhaMonth : ""} onChangeText={handleGutkhaMonthText} keyboardType='numeric'/>
              {frequencyOptions.map(option => (
                <TouchableOpacity
                key={option.value}
                onPress={() => handleGutkhaFrequencySelectOption(option.value)}
                style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:"#fffae5", margin: 2, width:200}}>
                <View
                    style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                    }}>
                    {gutkhaFrequencySelectedOption === option.value && (
                    <View
                        style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#000'
                        }}
                    />
                    )}
                </View>
                <Text>{option.label}</Text>
                </TouchableOpacity>
            ))}
              {triedOptions.map(option => (
                <TouchableOpacity
                key={option.value}
                onPress={() => handleGutkhaTried(option.value)}
                style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:"#b7efc5", margin: 2, width:200}}>
                <View
                    style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                    }}>
                    {gutkhaTried === option.value && (
                    <View
                        style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#000'
                        }}
                    />
                    )}
                </View>
                <Text>{option.label}</Text>
                </TouchableOpacity>
            ))}
              {willingOptions.map(option => (
                <TouchableOpacity
                key={option.value}
                onPress={() => handleGutkhaWilling(option.value)}
                style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:"#bde0fe", margin: 2, width:200}}>
                <View
                    style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                    }}>
                    {gutkhaWilling === option.value && (
                    <View
                        style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#000'
                        }}
                    />
                    )}
                </View>
                <Text>{option.label}</Text>
                </TouchableOpacity>
            ))}
            </View>
            <View style={styles.tableRow}>
            <Text style={[styles.tableCell,styles.habit]}>Bidi</Text>
            <TextInput style={[styles.tableCell,styles.input]}value={bidiYear ? bidiYear : ""} onChangeText={handleBidiYearText} keyboardType='numeric'/>
              <TextInput style={[styles.tableCell,styles.input]}value={bidiMonth ? bidiMonth : ""} onChangeText={handleBidiMonthText} keyboardType='numeric'/>
              {frequencyOptions.map(option => (
                <TouchableOpacity
                key={option.value}
                onPress={() => handleBidiFrequencySelectOption(option.value)}
                style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:"#fffae5", margin: 2, width:200}}>
                <View
                    style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                    }}>
                    {bidiFrequencySelectedOption === option.value && (
                    <View
                        style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#000'
                        }}
                    />
                    )}
                </View>
                <Text>{option.label}</Text>
                </TouchableOpacity>
            ))}
              {triedOptions.map(option => (
                <TouchableOpacity
                key={option.value}
                onPress={() => handleBidiTried(option.value)}
                style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:"#b7efc5", margin: 2, width:200}}>
                <View
                    style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                    }}>
                    {bidiTried === option.value && (
                    <View
                        style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#000'
                        }}
                    />
                    )}
                </View>
                <Text>{option.label}</Text>
                </TouchableOpacity>
            ))}
              {willingOptions.map(option => (
                <TouchableOpacity
                key={option.value}
                onPress={() => handleBidiWilling(option.value)}
                style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:"#bde0fe", margin: 2, width:200}}>
                <View
                    style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                    }}>
                    {bidiWilling === option.value && (
                    <View
                        style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#000'
                        }}
                    />
                    )}
                </View>
                <Text>{option.label}</Text>
                </TouchableOpacity>
            ))}
            </View>
            <View style={styles.tableRow}>
            <Text style={[styles.tableCell,styles.habit]}>Cigarette</Text>
            <TextInput style={[styles.tableCell,styles.input]} value={cigaretteYear ? cigaretteYear : ""} onChangeText={handleCigaretteYearText} keyboardType='numeric'/>
              <TextInput style={[styles.tableCell,styles.input]} value={cigaretteMonth ? cigaretteMonth : ""} onChangeText={handleCigaretteMonthText} keyboardType='numeric'/>
              {frequencyOptions.map(option => (
                <TouchableOpacity
                key={option.value}
                onPress={() => handleCigaretteTobacooFrequencySelectOption(option.value)}
                style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:"#fffae5", margin: 2, width:200}}>
                <View
                    style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                    }}>
                    {cigaretteFrequencySelectedOption === option.value && (
                    <View
                        style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#000'
                        }}
                    />
                    )}
                </View>
                <Text>{option.label}</Text>
                </TouchableOpacity>
            ))}
              {triedOptions.map(option => (
                <TouchableOpacity
                key={option.value}
                onPress={() => handleCigaretteTried(option.value)}
                style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:"#b7efc5", margin: 2, width:200}}>
                <View
                    style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                    }}>
                    {cigretteTried === option.value && (
                    <View
                        style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#000'
                        }}
                    />
                    )}
                </View>
                <Text>{option.label}</Text>
                </TouchableOpacity>
            ))}
              {willingOptions.map(option => (
                <TouchableOpacity
                key={option.value}
                onPress={() => handleCigaretteWilling(option.value)}
                style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:"#bde0fe", margin: 2, width:200}}>
                <View
                    style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                    }}>
                    {cigretteWilling === option.value && (
                    <View
                        style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#000'
                        }}
                    />
                    )}
                </View>
                <Text>{option.label}</Text>
                </TouchableOpacity>
            ))}
            </View>
            <View style={styles.tableRow}>
            <Text style={[styles.tableCell,styles.habit]}>Betel Nut, Paan and Tobacco</Text>
            <TextInput style={[styles.tableCell,styles.input]} value={betelYear ? betelYear : ""} onChangeText={handleBetelYearText} keyboardType='numeric'/>
              <TextInput style={[styles.tableCell,styles.input]} value={betelMonth ? betelMonth : ""} onChangeText={handleBetelMonthText} keyboardType='numeric'/>
              {frequencyOptions.map(option => (
                <TouchableOpacity
                key={option.value}
                onPress={() => handleBetelFrequencySelectOption(option.value)}
                style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:"#fffae5", margin: 2, width:200}}>
                <View
                    style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                    }}>
                    {betelFrequencySelectedOption === option.value && (
                    <View
                        style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#000'
                        }}
                    />
                    )}
                </View>
                <Text>{option.label}</Text>
                </TouchableOpacity>
            ))}
              {triedOptions.map(option => (
                <TouchableOpacity
                key={option.value}
                onPress={() => handleBetelTried(option.value)}
                style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:"#b7efc5", margin: 2, width:200}}>
                <View
                    style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                    }}>
                    {betelTried === option.value && (
                    <View
                        style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#000'
                        }}
                    />
                    )}
                </View>
                <Text>{option.label}</Text>
                </TouchableOpacity>
            ))}
              {willingOptions.map(option => (
                <TouchableOpacity
                key={option.value}
                onPress={() => handleBetelWilling(option.value)}
                style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:"#bde0fe", margin: 2, width:200}}>
                <View
                    style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                    }}>
                    {betelWilling === option.value && (
                    <View
                        style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#000'
                        }}
                    />
                    )}
                </View>
                <Text>{option.label}</Text>
                </TouchableOpacity>
            ))}
            </View>
            <View style={styles.tableRow}>
            <Text style={[styles.tableCell,styles.habit]}>Pann Masala</Text>
            <TextInput style={[styles.tableCell,styles.input]} value={paanYear ? paanYear : ""} onChangeText={handlePaanYearText} keyboardType='numeric'/>
              <TextInput style={[styles.tableCell,styles.input]} value={paanMonth ? paanMonth : ""} onChangeText={handlePaanMonthText} keyboardType='numeric'/>
              {frequencyOptions.map(option => (
                <TouchableOpacity
                key={option.value}
                onPress={() => handlePaanFrequencySelectOption(option.value)}
                style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:"#fffae5", margin: 2, width:200}}>
                <View
                    style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                    }}>
                    {paanFrequencySelectedOption === option.value && (
                    <View
                        style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#000'
                        }}
                    />
                    )}
                </View>
                <Text>{option.label}</Text>
                </TouchableOpacity>
            ))}
              {triedOptions.map(option => (
                <TouchableOpacity
                key={option.value}
                onPress={() => handlePaanTried(option.value)}
                style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:"#b7efc5", margin: 2, width:200}}>
                <View
                    style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                    }}>
                    {paanTried === option.value && (
                    <View
                        style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#000'
                        }}
                    />
                    )}
                </View>
                <Text>{option.label}</Text>
                </TouchableOpacity>
            ))}
              {willingOptions.map(option => (
                <TouchableOpacity
                key={option.value}
                onPress={() => handlePaanWilling(option.value)}
                style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:"#bde0fe", margin: 2, width:200}}>
                <View
                    style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                    }}>
                    {paanWilling === option.value && (
                    <View
                        style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#000'
                        }}
                    />
                    )}
                </View>
                <Text>{option.label}</Text>
                </TouchableOpacity>
            ))}
            </View>
            <View style={styles.tableRow}>
            <Text style={[styles.tableCell,styles.habit]}>Alcohol (Commercial)</Text>
            <TextInput style={[styles.tableCell,styles.input]} value={aCommercialYear ? aCommercialYear : ""} onChangeText={handleACommercialYearText} keyboardType='numeric'/>
              <TextInput style={[styles.tableCell,styles.input]} value={aCommercialMonth ? aCommercialMonth : ""} onChangeText={handleACommercialMonthText} keyboardType='numeric'/>
              {frequencyOptions.map(option => (
                <TouchableOpacity
                key={option.value}
                onPress={() => handleAcommercialFrequencySelectOption(option.value)}
                style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:"#fffae5", margin: 2, width:200}}>
                <View
                    style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                    }}>
                    {aCommercialFrequencySelectedOption === option.value && (
                    <View
                        style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#000'
                        }}
                    />
                    )}
                </View>
                <Text>{option.label}</Text>
                </TouchableOpacity>
            ))}
              {triedOptions.map(option => (
                <TouchableOpacity
                key={option.value}
                onPress={() => handleAcommercialTried(option.value)}
                style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:"#b7efc5", margin: 2, width:200}}>
                <View
                    style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                    }}>
                    {aCommercialTried === option.value && (
                    <View
                        style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#000'
                        }}
                    />
                    )}
                </View>
                <Text>{option.label}</Text>
                </TouchableOpacity>
            ))}
              {willingOptions.map(option => (
                <TouchableOpacity
                key={option.value}
                onPress={() => handleAcommercialWilling(option.value)}
                style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:"#bde0fe", margin: 2, width:200}}>
                <View
                    style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                    }}>
                    {aCommercialWilling === option.value && (
                    <View
                        style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#000'
                        }}
                    />
                    )}
                </View>
                <Text>{option.label}</Text>
                </TouchableOpacity>
            ))}
            </View>
            <View style={styles.tableRow}>
            <Text style={[styles.tableCell,styles.habit]}>Alcohol (Home Brewed)</Text>
            <TextInput style={[styles.tableCell,styles.input]} value={aBrewedYear ? aBrewedYear : ""} onChangeText={handleABrewedYearText} keyboardType='numeric'/>
              <TextInput style={[styles.tableCell,styles.input]} value={aBrewedMonth ? aBrewedMonth : ""} onChangeText={handleABrewedMonthText} keyboardType='numeric'/>
              {frequencyOptions.map(option => (
                <TouchableOpacity
                key={option.value}
                onPress={() => handleaBrewedFrequencySelectOption(option.value)}
                style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:"#fffae5", margin: 2, width:200}}>
                <View
                    style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                    }}>
                    {aBrewedFrequencySelectedOption === option.value && (
                    <View
                        style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#000'
                        }}
                    />
                    )}
                </View>
                <Text>{option.label}</Text>
                </TouchableOpacity>
            ))}
              {triedOptions.map(option => (
                <TouchableOpacity
                key={option.value}
                onPress={() => handleaBrewedTried(option.value)}
                style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:"#b7efc5", margin: 2, width:200}}>
                <View
                    style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                    }}>
                    {aBrewedTried === option.value && (
                    <View
                        style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#000'
                        }}
                    />
                    )}
                </View>
                <Text>{option.label}</Text>
                </TouchableOpacity>
            ))}
              {willingOptions.map(option => (
                <TouchableOpacity
                key={option.value}
                onPress={() => handleaBrewedWilling(option.value)}
                style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:"#bde0fe", margin: 2, width:200}}>
                <View
                    style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                    }}>
                    {aBrewedWilling === option.value && (
                    <View
                        style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#000'
                        }}
                    />
                    )}
                </View>
                <Text>{option.label}</Text>
                </TouchableOpacity>
            ))}
            </View>
        </View>
      </ScrollView>
      <View style={stylesNew.container}>
              <Text style={stylesNew.title}>Awareness of the harmful effects of tobacco</Text>
              {awarenessOptions.map(option => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => handleIAwarenessOption(option.value)}
                  style={stylesNew.optionContainer}>
                  <View style={[stylesNew.optionIndicator, awerness === option.value && stylesNew.selectedIndicator]}>
                    {awerness === option.value && <View style={stylesNew.selectedIndicatorInner} />}
                  </View>
                  <Text style={stylesNew.optionText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
      </View>
      <View style={stylesNew.container}>
              <Text style={stylesNew.title}>Have You Undergone a cancer screening in your lifetime</Text>
              {screeningOptions.map(option => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => handleScreeningOption(option.value)}
                  style={stylesNew.optionContainer}>
                  <View style={[stylesNew.optionIndicator, screening === option.value && stylesNew.selectedIndicator]}>
                    {screening === option.value && <View style={stylesNew.selectedIndicatorInner} />}
                  </View>
                  <Text style={stylesNew.optionText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
      </View>
      <View style={stylesNew.container}>
              <Text style={stylesNew.title}>Do You Think Tobacco Causes Cancer</Text>
              {causesOptions.map(option => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => handleCausesOption(option.value)}
                  style={stylesNew.optionContainer}>
                  <View style={[stylesNew.optionIndicator, causes === option.value && stylesNew.selectedIndicator]}>
                    {causes === option.value && <View style={stylesNew.selectedIndicatorInner} />}
                  </View>
                  <Text style={stylesNew.optionText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
      </View>
      <View style={stylesNew.container}>
              <Text style={stylesNew.title}>Do You Think Cancer is Curable</Text>
              {curableOptions.map(option => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => handleCurableOption(option.value)}
                  style={stylesNew.optionContainer}>
                  <View style={[stylesNew.optionIndicator, curable === option.value && stylesNew.selectedIndicator]}>
                    {curable === option.value && <View style={stylesNew.selectedIndicatorInner} />}
                  </View>
                  <Text style={stylesNew.optionText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
      </View>
      {doctor && <TouchableOpacity
        style={styles.button}
        onPress={updatePatient}
      >
        <Text style={styles.saveBtn}>Save Data</Text>
      </TouchableOpacity>}
       
        </ScrollView>
      );
};

const styles = StyleSheet.create({
  video: {
    width: 300,
    height: 200,
  },
    tableContainer: {
          marginTop: 20,
        },
        table: {
          borderWidth: 1,
          borderColor: '#ddd',
        },
        tableRow: {
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: '#ddd',
        },
        tableHeader: {
            padding: 10,
            flex: 1,
            width:200,
            margin:1,
            color: "white",
            fontWeight: "bold",
          backgroundColor: '#6c757d',
        },
        tableCell: {
          padding: 10,
          flex: 1,
          width:200,
          margin:1,
          backgroundColor:"white"
        },
        habit:{
          backgroundColor:"#dee2e6",
          fontWeight: "bold"
        },
        input:{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          padding: 10,
          backgroundColor:"white",
      flex: 1
        },
        button: {
          backgroundColor: '#4CAF50', // Green color
          paddingVertical: 12,
          paddingHorizontal: 24,
          alignSelf: 'center',
          justifyContent:"center",
          marginVertical: 10,
          width:200,
          height:50,
          marginBottom:70
        },
        saveBtn:{
          color:"white",
          fontSize:20,
          textAlign:"center"
        },
        buttonText: {
          color: 'white', // White text color
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center',
        },
        fetchingData:{
          textAlign:"center",
          fontSize:30,
          color:"green"
        },
        pleaseLogin:{
          color:"red",
          padding:10,
          textAlign:"center",
          fontSize:20
        }
});
const stylesNew = StyleSheet.create({
  container: {
    marginBottom: 20,
    backgroundColor:"#caf0f8",
    margin:10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    backgroundColor:"#90e0ef",
    padding:10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    padding:5
  },
  optionIndicator: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedIndicator: {
    borderColor: '#000',
  },
  selectedIndicatorInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
});

export default PExam;
