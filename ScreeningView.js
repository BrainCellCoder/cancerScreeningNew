import React, { useState, useCallback } from 'react';
import { Button, Modal, Platform, ScrollView, StyleSheet, Text, Alert, View,Clipboard, TouchableOpacity } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { useFocusEffect } from '@react-navigation/native';
import PExam from '../components/PExam';

// import Clipboard from '@react-native-clipboard/clipboard';
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

const ScreeningView = () => {
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [exam, setExam] = useState("");
    
  const closeModal = async () => {
    setModalVisible(false);
    retrieveData();
  };

    const retrieveData= () => {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM FamilyTable;',
            [],
            (tx, results) => {
              const rows = results.rows;
              let users = [];
    
              for (let i = 0; i < rows.length; i++) {
                users.push(rows.item(i));
              }
    
              setData(users);
            },
            error => console.log(error)
          );
        });
      };
      const copyToClipboard = (id) => {
        Clipboard.setString(id);
        Alert.alert('ID Copied to Clipboard', `${id}`);
      };

      useFocusEffect(
        useCallback(() => {
            retrieveData();
        }, [])
      );
    return (
      <ScrollView>
            <ScrollView style={styles.tableContainer} horizontal={true}>
      <View style={styles.table}>
        
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>FamilyID<Text style={{width:100, color: "yellow"}}>(Press ID to Copy)</Text></Text>
          <Text style={styles.tableHeader}>Family Head</Text>
          <Text style={styles.tableHeader}>Current Address</Text>
          <Text style={styles.tableHeader}>Permanent Address</Text>
          <Text style={styles.tableHeader}>House No.</Text>
          <Text style={styles.tableHeader}>Religion</Text>
          <Text style={styles.tableHeader}>Social Group</Text>
        </View>
        {data.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <TouchableOpacity style={styles.tableCell} onPress={() =>copyToClipboard(item.FamilyID)}><Text style={{color:"green", fontWeight:"bold"}}>{item.FamilyID}</Text></TouchableOpacity>
            <Text style={styles.tableCell}>{item.Family_Head}</Text>
            <Text style={styles.tableCell}>{item.Current_Address}</Text>
            <Text style={styles.tableCell}>{item.Permanent_Address}</Text>
            <Text style={styles.tableCell}>{item.House_No}</Text>
            <Text style={styles.tableCell}>{item.Religion}</Text>
            <Text style={styles.tableCell}>{item.Social_Group}</Text>
            {/* <TouchableOpacity onPress={()=>handleButtonPress("PPE",item)} style={styles.examBtn}><Text>View PPE</Text></TouchableOpacity> */}
          </View>
        ))}
      </View>
    </ScrollView>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent} >
              {exam == "PPE" && <PExam/>}
            <Button color="red" title={`Close ${exam}`} onPress={closeModal} />
          </View>
        </View>
      </Modal>
      </ScrollView>
    );
  };

  const styles = StyleSheet.create({
    flex:{
      display:"flex",
    },
    examBtn:{
      margin:2,
      backgroundColor: "lightblue",
      justifyContent: "center",
      alignItems:"center",
      flex: 1,
      width:130
    },
    modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      // width: 100,
      borderRadius: 20,
      // paddingBottom: 100,
      height: "90%",
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    container: {
      padding: 20,
    },
    title: {
      margin: "auto",
      color: "black",
      fontSize: 30
    },
    subTitle: {
      margin: "auto",
      color: "black",
      fontSize: 30,
      marginBottom: 10
    },
    input: {
      marginBottom: 10,
      borderBottomWidth: 0.5,
      borderBottomColor: 'black',
      flex:1,
      marginRight:5
    },
    inputGroup:{
      display: "flex",
      flexDirection:"row",
    },
    buttonWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    downloadedTxt: {
      fontSize: 25,
      color: 'green',
    },
    tableContainer: {
    //   height: 350, // Fixed height for the table container
      marginTop: 20,
    },
    table: {
      borderWidth: 1,
      borderColor: '#ddd', // Border color
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: '#ddd', // Border color
    },
    tableHeader: {
      width:150,
      padding: 5,
      margin:0.5,
      fontWeight: 'bold',
      flex: 1,
      color:"white",
      backgroundColor: '#6c757d', // Background color
      // textAlign: 'center', // Align text to center
    },
    tableCell: {
      margin: 2,
      padding: 5,
      flex: 1,
      width:130,
      fontSize:15,
      fontWeight: "bold",
      backgroundColor:"#dee2e6",
      // textAlign: 'center', // Align text to center
    },
    education:{
      display:"flex",
      flexDirection:"row",
      alignItems:"center"
    },
    button: {
      backgroundColor: '#4CAF50', // Green color
      paddingVertical: 12,
      paddingHorizontal: 24,
      alignSelf: 'center',
      justifyContent:"center",
      marginVertical: 10,
      width:260,
      height:50
    },
    buttonText: {
      color: 'white', // White text color
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center',
    },
  });
  export default ScreeningView;
