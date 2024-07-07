import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView,Alert, Dimensions } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';
import Geolocation from '@react-native-community/geolocation';
import { check, PERMISSIONS, request,RESULTS } from 'react-native-permissions';
import { Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
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
  Age: string,
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

interface Location {
  latitude: number;
  longitude: number;
}

const CancerScreening: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [village, setVillage] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [pin, setPin] = useState<string>('');
  const [doe, setDoe] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [occupation, setOccupation] = useState<string>('');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('');
  const [education, setEducation] = useState<string>('');
  const [cancerHistory, setCancerHistory] = useState<string>('');
  const [data, setData] = useState<UserData[]>([]);
  const [isDownloaded,setIsDownloaded] = useState<boolean>(false);
  const [isDeleted,setIsDeleted] = useState<boolean>(false);
  const [isSaved,setIsSaved] = useState<boolean>(false);
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [doctor,setDoctor] = useState(null);

 
  const createTable = (): void => {
    db.transaction(tx => {
      tx.executeSql(
        // 'CREATE TABLE IF NOT EXISTS PatientInfo (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER, Sex TEXT, Disease TEXT);',
	// [LMP] [varchar](max) NULL,
    'CREATE TABLE IF NOT EXISTS CancerScreeningMain (ID TEXT PRIMARY KEY, Name TEXT, Address TEXT, Age TEXT, Village TEXT, Gender TEXT, PIN TEXT, DOE TEXT, Contact TEXT, Occupation TEXT, MonthlyIncome TEXT, Education TEXT, CancerHistory TEXT, Latitude TEXT, Longitude TEXT, Pulse TEXT, BP TEXT, Height TEXT, Weight TEXT, SugarLvl TEXT, MedicalHistory TEXT, FCancerHistory TEXT, FamIncome TEXT, TobaccoYears TEXT, TobaccoMon TEXT, TobaccoF TEXT, TobaccoT TEXT, TobaccoW TEXT, GutkaYears TEXT, GutkaMon TEXT, GutkaF TEXT, GutkaT TEXT, GutkaW TEXT, BidiYears TEXT, BidiMon TEXT, BidiF TEXT, BidiT TEXT, BidiW TEXT, CigaretteYears TEXT, CigaretteMon TEXT, CigaretteF TEXT, CigaretteT TEXT, CigaretteW TEXT, BetelnutYears TEXT, BetelnutMon TEXT, BetelnutF TEXT, BetelnutT TEXT, BetelnutW TEXT, PaanMasalaYears TEXT, PaanMasalaMon TEXT, PaanMasalaF TEXT, PaanMasalaT TEXT, PaanMasalaW TEXT, AlcoholCommercialYears TEXT, AlcoholCommercialMon TEXT, AlcoholCommercialF TEXT, AlcoholCommercialT TEXT, AlcoholCommercialW TEXT, AlcoholHomeBrewedYears TEXT, AlcoholHomeBrewedMon TEXT, AlcoholHomeBrewedF TEXT, AlcoholHomeBrewedT TEXT, AlcoholHomeBrewedW TEXT, AwareHarmeffectofTobbacco TEXT, UndergoneCancerScreening TEXT, TobaccoCausesCancer TEXT, CancerIsCurable TEXT, OralCavity TEXT, IfAbnormal TEXT, OralHygiene TEXT, REFFHC TEXT, OVEClinicalDiagnosis TEXT, OVETreatment TEXT, OVEDoctor TEXT, Skin TEXT, Nipple TEXT, Size TEXT, LBreast TEXT, RBreast TEXT, CBERHC TEXT, CBEInvestigation TEXT, CBEDoctor TEXT, LMP TEXT, ObstetricHis TEXT, ChiefComplaints TEXT, AppearanceCervix TEXT, ExternalOS TEXT, NabothianCyst TEXT, Polyp TEXT, VaginalWC TEXT, FindingsViaTest TEXT, CCSImpression TEXT, CCSRHC TEXT,PATDoctor TEXT, NILM TEXT, EpithermalCA TEXT, SquamousCA TEXT,PAPComment TEXT, GlanDuralCA TEXT, CCSInvestigation TEXT, CCSDoctor TEXT, LTDorsum TEXT, RTDorsum TEXT, LTVentral TEXT, RTVentral TEXT, Date TEXT, Time TEXT,IPAddress TEXT,  PAPReport TEXT, PPE_FLAG TEXT, OVE_FLAG TEXT, OBE_FLAG TEXT, CCE_FLAG TEXT );',
        [],
        () => console.log('Table created successfully'),
        error => console.log(error)
      );
    });
  };
  function getCurrentDate() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = currentDate.getFullYear();
  
    return `${day}-${month}-${year}`;
  }
  function getCurrentTime() {
    const currentTime = new Date();
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    const seconds = String(currentTime.getSeconds()).padStart(2, '0');
  
    return `${hours}:${minutes}:${seconds}`;
  }

  const insertData = (): void => {
    // if (!name || !address || !age || !gender || !doe || !education || !cancerHistory || !location) {
    //   console.log('Please fill all required* fields');
    //   Alert.alert(
    //     'Rqequired',
    //     'Please fill all fields',
    //     [{ text: 'OK' }]
    //   );
    //   return;
    // }
    const ID = uuid.v4();
    const date = getCurrentDate();
    const time = getCurrentTime()
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO CancerScreeningMain (ID, Name, Address , Age , Village , Gender , PIN , DOE , Contact , Occupation , MonthlyIncome , Education , CancerHistory, Date, Time ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [ID, name, address, age, village, gender, pin, doe, contact, occupation, monthlyIncome, education, cancerHistory, date, time],
        () => {
          console.log('Data inserted successfully');
          Alert.alert(
            'Success',
            'Patient Data Inserted',
            [{ text: 'OK' }]
          );
          retrieveData(); // Refresh the list after insertion
          setName("");
          setAddress("");
          setAge("");
          setVillage("")
          setGender("")
          setPin("")
          setDoe("")
          setContact("")
          setOccupation("")
          setMonthlyIncome("")
          setEducation("")
          setCancerHistory("")
          setLocation(null);
          setIsSaved(true);
        },
        error => console.log(error)
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
  const exportData = async (): Promise<void> => {
    const headerString = 'ID, Name, Address, Age, Village, Gender, PIN, DOE, Contact_NO, Occupation, Education, Cancer_History, Latitude, Longitude \n';
    const rowString = data
      .map(d => `${d.ID}, ${d.Name}, ${d.Address}, ${d.Age}, ${d.Village}, ${d.Gender}, ${d.PIN}, ${d.DOE}, ${d.Contact}, ${d.Occupation}, ${d.Education}, ${d.CancerHistory}, ${d.Latitude},${d.Longitude}`)
      .join('\n');
    const csvString = `${headerString}${rowString}`;
    console.log(csvString);
    const path = `${RNFS.DownloadDirectoryPath}/patient_info.csv`;
    try {
      await RNFS.writeFile(path, csvString, 'utf8');
      console.log(`File written to ${path}`);
      setIsDownloaded(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDateChange = (text) => {
    // Remove any non-numeric characters
    const cleanedText = text.replace(/[^0-9]/g, '');

    // Format the date with slashes
    let formattedDate = '';
    if (cleanedText.length <= 2) {
      formattedDate = cleanedText;
    } else if (cleanedText.length <= 4) {
      formattedDate = cleanedText.slice(0, 2) + '/' + cleanedText.slice(2);
    } else {
      formattedDate =
        cleanedText.slice(0, 2) +
        '/' +
        cleanedText.slice(2, 4) +
        '/' +
        cleanedText.slice(4, 8);
    }

    // Update the state with the formatted date
    setDoe(formattedDate);
  };

  const hideText = () => {
    setTimeout(() => {
      setIsDownloaded(false);
      setIsSaved(false)
    }, 3000);
  };

  const requestLocationPermission = async () => {
    try {
      const permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (permissionStatus !== RESULTS.GRANTED) {
        const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

        if (result === RESULTS.GRANTED) {
          // getLocation();
          return;
        } else {
          // Permission denied, show explanation and prompt again
          Alert.alert(
            'Location Permission Required',
            'This app requires access to your location to function properly. Please grant the location permission in settings.',
            [{ text: 'OK' }]
          );
        }
      } else {
        // getLocation();
        return
      }
    } catch (err) {
      setError('Error checking location permission');
    }
  };
  const getLocation =  () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude)
        setLocation({ latitude, longitude });
      },
      error => setError(error.message)
    );
  };
  const handleEducationChange = (value: string) => {
    setEducation(value);
  };
  const handleHistoryChange = (value:string) =>{
    setCancerHistory(value)
  }
  const deleteAllData = () => {
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete all data?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            SQLite.deleteDatabase(
              { name: 'MainDB.db', location: 'default' },
              () => {
                console.log('Database deleted successfully');
                setError(null);
              },
              (error) => {
                console.error('Error deleting database:', error);
                setError('Error deleting database');
              }
            );
          },
          style: 'destructive',
        },
      ]
    );
  };
  const handleGenderChange = (value: string) => {
    setGender(value);
  };
  const getDocData = async () =>{
    try{
      const jsonValue = await AsyncStorage.getItem('doctorData');
      const data = await JSON.parse(jsonValue);
      setDoctor(data)
      console.log("SETRTTT")
    }catch(err){
      setDoctor(null)
    }
  }
  useEffect(() =>{
    hideText();
  },[isDownloaded, isSaved])

  useEffect(() => {
    requestLocationPermission();
  }, []);
  useFocusEffect(
    useCallback(() => {
      createTable();
      // deleteAllData()
    getDocData();
    }, [])
  );
  return (
    <ScrollView style={{ flex: 1,backgroundColor: '#edf6f9',}}>
      {/* {!doctor && <View style={styles.notLogged}>
          <Text style={styles.notLoggedTxt}>You are not Logged in</Text>
          <Text style={styles.notLoggedTxt}>Please login to save patient data</Text>
        </View>} */}
  <View style={styles.container}>
        <Text style={styles.title}>Enter Patient Data</Text>
        <View style={styles.labelGroup}>
              <Text style={styles.formLabel}><Text style={styles.req}>* </Text>Name:</Text>
              <Text style={styles.formLabel}><Text style={styles.req}>* </Text>Age:</Text>
        </View>
    <View style={styles.inputGroup}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        />
      
        <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        style={styles.input}
        keyboardType="numeric"
        maxLength={3}
        />
    </View>
    <View style={styles.labelGroup}>
              <Text style={styles.formLabel}><Text style={styles.req}>* </Text>Address:</Text>
        </View>
    <View style={styles.inputGroup}>
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
        />
    </View>
    <View style={styles.labelGroup}>
              <Text style={styles.formLabel}><Text style={styles.req}>* </Text>Gender:</Text>
        </View>
    <View style={styles.education}>
    <RNPickerSelect
        value={gender}
        onValueChange={handleGenderChange}
        placeholder={{
          label: 'Select Gender',
          value: null,
        }}
        items={[
          { label: 'Male', value: 'Male' },
          { label: 'Female', value: 'Female' },
        ]}
        />
    </View>
    <View style={styles.labelGroup}>
              <Text style={styles.formLabel}><Text style={styles.req}>* </Text>DOE:</Text>
              <Text style={styles.formLabel}>Contact No:</Text>
        </View>
    <View style={styles.inputGroup}>
      <TextInput
        placeholder="DD/MM/YYYY"
        value={doe}
        onChangeText={handleDateChange}
        style={styles.input}
        keyboardType="numeric"
        />
      <TextInput
        placeholder="Contact No"
        value={contact}
        onChangeText={setContact}
        style={styles.input}
        keyboardType="numeric"
        maxLength={10}
        />
    </View>
    <View style={styles.labelGroup}>
              <Text style={styles.formLabel}>Occupation:</Text>
        </View>
    <TextInput
        placeholder="Occupation"
        value={occupation}
        onChangeText={setOccupation}
        style={styles.input}
      />
        <View style={styles.labelGroup}>
              <Text style={styles.formLabel}><Text style={styles.req}>* </Text>Education:</Text>
        </View>

        <View style={styles.education}>
        <RNPickerSelect
            value={education}
            onValueChange={handleEducationChange}
            placeholder={{
              label: 'Select Education',
              value: null,
            }}
            items={[
              { label: 'No Schooling', value: 'No Schooling' },
              { label: 'Primary Schooling', value: 'Primary Schooling' },
              { label: "Secondary Schooling", value: "Secondary Schooling" },
              { label: "College", value: "College" },
              { label: "University", value: "University" },
              { label: "Professional and higher education", value: "Professional and higher education" },
            ]}
            />
        </View>
        <View style={styles.labelGroup}>
              <Text style={styles.formLabel}><Text style={styles.req}>* </Text>Cancer History:</Text>
        </View>
        <View style={styles.education}>
        <RNPickerSelect
            value={cancerHistory}
            onValueChange={handleHistoryChange}
            placeholder={{
              label: 'Select Cancer History',
              value: null,
            }}
            items={[
              { label: 'No', value: 'No' },
              { label: 'Yes', value: 'Yes' },
             
            ]}
            />
        </View>
          {/* <Button color="orange" title="Get Current Location" onPress={getLocation} /> */}
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="SAVE" onPress={insertData} />
        </View>
        
        {isSaved && <Text style={styles.downloadedTxt}>Data Saved!</Text>}
</ScrollView>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      height:"100%",
      margin: 10,
      padding: 10,
      backgroundColor: '#b7e4c7',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 10,
      color:"black",
      textAlign:"center"
    },
    subTitle: {
      fontSize: 18,
      marginBottom: 20,
    },
    inputGroup: {
      marginBottom: 20,
      display: "flex",
      flexDirection:"row"
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      backgroundColor:"white",
      flex: 1
    },
    education: {
      marginBottom: 20,
      backgroundColor:"white",
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
    },
    buttonWrapper: {
      marginTop:20,
      marginBottom: 20,
    },
    downloadedTxt: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'green',
      marginBottom: 20,
    },
    locationContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    formLabel:{
      flex:1,
      fontSize: 16,
      fontWeight:"bold"
    },
    labelGroup:{
      display:"flex",
      flexDirection:"row"
    },
    notLogged:{
      margin:10,
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      borderWidth:1,
      borderColor:"red",
      backgroundColor:"#ffccd5"
    },
    notLoggedTxt:{
      color:"red",
      fontSize: 20
    },
    req:{
      color:"red"
    }
  });
  export const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
      width:250,
      borderWidth: 1,
      borderColor: '#ccc',
      backgroundColor:"white",
      borderRadius: 5,
      paddingVertical: 8,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
  });

export default CancerScreening;
