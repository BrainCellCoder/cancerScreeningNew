import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView,Platform, Switch, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import SQLite from 'react-native-sqlite-storage';
import { DataTable,RadioButton } from 'react-native-paper';
import uuid from 'react-native-uuid';
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

const FormScreen = () => {
  const [currentAddress, setCurrentAddress] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [religion, setReligion] = useState('');
  const [socialGroup, setSocialGroup] = useState('');
  const [socialGroupOther, setSocialGroupOther] = useState('');
  const [headOfFamily, setHeadOfFamily] = useState('');
  const [remark, setRemark] = useState('');
  const [loading, setLoading] = useState(false);
  const [viewSubmitResetBtn, setViewSubmitResetBtn] = useState(true);
  const [stopSubmit, setStopSubmit] = useState(false);
  const [searchFamilyId, setSearchFamilyId] = useState("");
  const [searching, setSearching] = useState(false);

  let initialState = { name: '', sharingDetails: '', presentInSameAdd: false, ifNoWhere: '', age: '', gender: '', phNo: '', education: '', medicalHis: '', earningMem: '', occupation: '', salary: '', cancerHis: '', whenWasDiag:'', whichSite:'', conditionNow: '', lastTimeVis: '', howKnowCancer: '', howCancerCaused: '', areYouAware: false, cancerSymp: '', isCancerCommuni: false, awareCancerScreen: false, isCancerTreatable: false, foodHabit:'', waterSource:''}

  const [person1, setPerson1] = useState({...initialState});
  const [person2, setPerson2] = useState({...initialState});
  const [person3, setPerson3] = useState({...initialState});
  const [person4, setPerson4] = useState({...initialState});
  const [person5, setPerson5] = useState({...initialState});
  const [person6, setPerson6] = useState({...initialState});
  const [person7, setPerson7] = useState({...initialState});
  const [person8, setPerson8] = useState({...initialState});
  const [person9, setPerson9] = useState({...initialState});
  const [person10, setPerson10] = useState({...initialState});

    const insertFamilyData = () => {
      if(currentAddress == "" || permanentAddress == "" || houseNumber == "" || religion == "" || socialGroup == "" || headOfFamily == ""){
        setStopSubmit(true);
        return;
      }
      Alert.alert(
        'Submit Confirmation',
        'Are you sure you want to submit data?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Submit',
            onPress: () => {
              const newFamilyID = uuid.v4();
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO FamilyTable (FamilyID, Current_Address, Permanent_Address, House_No, Religion, Social_Group, Social_GroupOther, Family_Head, Reamrk) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            newFamilyID,
            currentAddress,
            permanentAddress,
            houseNumber,
            religion,
            socialGroup,
            socialGroupOther,
            headOfFamily,
            remark
          ],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              insertMemberData(newFamilyID);
              Alert.alert('Success', 'Family data inserted successfully');
              
            } else {
              Alert.alert('Error', 'Failed to insert family data');
            }
          },
          error => {
            console.log(error);
            Alert.alert('Error', 'Failed to insert family data');
          }
        );
      });
            },
            style: 'destructive',
          },
        ]
      );
    };

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
    'CREATE TABLE IF NOT EXISTS FamilyTable (FamilyID TEXT PRIMARY KEY, Current_Address TEXT, Permanent_Address TEXT, House_No TEXT, Religion TEXT, Social_Group TEXT, Social_GroupOther TEXT, Family_Head TEXT, Reamrk TEXT);',
        [],
        () => console.log('Main Table created successfully'),
        error => console.log(error)
      );
    });
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS MemberTable (PersonID INTEGER PRIMARY KEY AUTOINCREMENT, FamilyID TEXT, Name TEXT, DetailsSharedBy TEXT, PresentInSameAdd TEXT, IfYesWhere TEXT, Age TEXT, Gender TEXT, PhNo TEXT, Education TEXT, MedHistory TEXT, EarningMember TEXT, Occupation TEXT, Salary TEXT, CancerHistory TEXT, WhenDiagnosed TEXT, WhichSite TEXT, ConditionNow TEXT, LastTimeHospVistedForCancer TEXT, WhereKnowAboutCancer TEXT, HowCancerCaused TEXT, AwareSymptoms TEXT, IfYesWhatSymptoms TEXT, CancerCommunicable TEXT, AwareCancerScreening TEXT, CancerTreatable TEXT, FoodHabit TEXT, WaterSource TEXT, FOREIGN KEY (FamilyID) REFERENCES FamilyTable(FamilyID));',
        [],
        () => console.log('Member Table created successfully'),
        error => console.log(error)
      );
    });
  };

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
              },
              (error) => {
                console.error('Error deleting database:', error);
              }
            );
          },
          style: 'destructive',
        },
      ]
    );
  };
  const insertMemberData = (familyID) => {
    setStopSubmit(false);
    const members = [person1, person2, person3, person4, person5, person6, person7, person8, person9, person10];
    members.forEach(member => {
      if (member.name) {
        db.transaction(tx => {
          tx.executeSql(
            `INSERT INTO MemberTable (
              FamilyID, Name, DetailsSharedBy, PresentInSameAdd, IfYesWhere, Age, Gender, PhNo, Education, MedHistory, EarningMember, Occupation, Salary, CancerHistory, WhenDiagnosed, WhichSite, ConditionNow, LastTimeHospVistedForCancer, WhereKnowAboutCancer, HowCancerCaused, AwareSymptoms, IfYesWhatSymptoms, CancerCommunicable, AwareCancerScreening, CancerTreatable, FoodHabit, WaterSource
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              familyID,
              member.name,
              member.sharingDetails,
              member.presentInSameAdd ? 'Yes' : 'No',
              member.ifNoWhere,
              member.age,
              member.gender,
              member.phNo,
              member.education,
              member.medicalHis,
              member.earningMem,
              member.occupation,
              member.salary,
              member.cancerHis,
              member.whenWasDiag,
              member.whichSite,
              member.conditionNow,
              member.lastTimeVis,
              member.howKnowCancer,
              member.howCancerCaused,
              member.areYouAware ? 'Yes' : 'No',
              member.cancerSymp,
              member.isCancerCommuni ? 'Yes' : 'No',
              member.awareCancerScreen ? 'Yes' : 'No',
              member.isCancerTreatable ? 'Yes' : 'No',
              member.foodHabit,
              member.waterSource,
            ],
            (tx, results) => {
              if (results.rowsAffected > 0) {
                console.log(`Member ${member.name} inserted successfully`);
              } else {
                console.log(`Failed to insert member ${member.name}`);
              }
            },
            error => {
              console.log(error);
              Alert.alert('Error', 'Failed to insert member data');
            }
          );
        });
      }
    });
  };

  const resetForm = () => {
    Alert.alert(
      'Reset Confirmation',
      'Are you sure you want to reset the form?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            setLoading(true);
            setTimeout(() => {
              currentAddress && setCurrentAddress('');
              permanentAddress && setPermanentAddress('');
              houseNumber && setHouseNumber('');
              religion && setReligion('');
              socialGroup && setSocialGroup('');
              socialGroupOther && setSocialGroupOther('');
              headOfFamily && setHeadOfFamily('');
              setSearchFamilyId('');
              setPerson1(initialState);
              setPerson2(initialState);
              setPerson3(initialState);
              setPerson4(initialState);
              setPerson5(initialState);
              setPerson6(initialState);
              setPerson7(initialState);
              setPerson8(initialState);
              setPerson9(initialState);
              setPerson10(initialState);
              setLoading(false);
            }, 1000); 
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleViewPress = () =>{
    setViewSubmitResetBtn(!viewSubmitResetBtn);
  }

  const handleSearchBtn = () =>{
    // const familyId ='36fc2607-693d-44e5-b8ef-3b8c7d76204f'; reset 5.47 search 5.94
    setSearching(true);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM FamilyTable WHERE FamilyID = ?',
        [searchFamilyId],
        (tx, results) => {
          if (results.rows.length > 0) {
            const row = results.rows.item(0);
            setCurrentAddress(row.Current_Address);
            setPermanentAddress(row.Permanent_Address);
            setHouseNumber(row.House_No);
            setReligion(row.Religion);
            setSocialGroup(row.Social_Group);
            setSocialGroupOther(row.Social_GroupOther);
            setHeadOfFamily(row.Family_Head);
            setRemark(row.Remark);
          } else {
            console.log('No family found with the given FamilyID');
          }
        },
        error => {
          console.log('Error fetching data from FamilyTable:', error);
        }
      );
    });

    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM MemberTable WHERE FamilyID = ?',
        [searchFamilyId],
        (tx, results) => {
          const members = [];
          for (let i = 0; i < results.rows.length; i++) {
            members.push(results.rows.item(i));
          }
          if (members[0]) setPerson1(mapMemberToState(members[0]));
          if (members[1]) setPerson2(mapMemberToState(members[1]));
          if (members[2]) setPerson3(mapMemberToState(members[2]));
          if (members[3]) setPerson4(mapMemberToState(members[3]));
          if (members[4]) setPerson5(mapMemberToState(members[4]));
          if (members[5]) setPerson6(mapMemberToState(members[5]));
          if (members[6]) setPerson7(mapMemberToState(members[6]));
          if (members[7]) setPerson8(mapMemberToState(members[7]));
          if (members[8]) setPerson9(mapMemberToState(members[8]));
          if (members[9]) setPerson10(mapMemberToState(members[9]));

          setLoading(false);
          setSearching(false);
        },
        error => {
          console.log('Error fetching data from MemberTable:', error);
          setLoading(false);
          setSearching(false);
        }
      );
    });
    // setTimeout(() =>{
    //   setSearching(false);
    // },5000)
  }

  const mapMemberToState = member => ({
    name: member.Name,
    sharingDetails: member.DetailsSharedBy,
    presentInSameAdd: member.PresentInSameAdd === 'Yes',
    ifNoWhere: member.IfYesWhere,
    age: member.Age,
    gender: member.Gender,
    phNo: member.PhNo,
    education: member.Education,
    medicalHis: member.MedHistory,
    earningMem: member.EarningMember,
    occupation: member.Occupation,
    salary: member.Salary,
    cancerHis: member.CancerHistory,
    whenWasDiag: member.WhenDiagnosed,
    whichSite: member.WhichSite,
    conditionNow: member.ConditionNow,
    lastTimeVis: member.LastTimeHospVistedForCancer,
    howKnowCancer: member.WhereKnowAboutCancer,
    howCancerCaused: member.HowCancerCaused,
    areYouAware: member.AwareSymptoms === 'Yes',
    cancerSymp: member.IfYesWhatSymptoms,
    isCancerCommuni: member.CancerCommunicable === 'Yes',
    awareCancerScreen: member.AwareCancerScreening === 'Yes',
    isCancerTreatable: member.CancerTreatable === 'Yes',
    foodHabit: member.FoodHabit,
    waterSource: member.WaterSource,
  });
  
  useEffect(() =>{
    createTable()
  },[])

  return (
    <>
      <View style={styles.top}>
        {/* <Text style={styles.header}>Enter Details</Text> */}
        <Button  color={"red"} title='RESET FORM' onPress={resetForm} />
        <Button color={`${viewSubmitResetBtn ? '' : 'green'}`} title={`${viewSubmitResetBtn ? 'VIEW' : 'ADD'} DETAILS`} onPress={handleViewPress} />
        {viewSubmitResetBtn && <Button color={"green"} title='SUBMIT FORM' onPress={insertFamilyData} />}
      </View>
    <ScrollView style={styles.container}>
    {!viewSubmitResetBtn && <View style={{display: "flex", flexDirection:"row", alignItems: "center",marginTop:10}}>
        <TextInput style={styles.searchData} value={searchFamilyId} placeholder='Enter Family ID' onChangeText={text => setSearchFamilyId(text)}/>
        <Button title='Search' onPress={handleSearchBtn} />
      </View>}
      { loading ? <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="red" />
          <Text style={styles.loadingText}>Resetting, please wait...</Text>
        </View>:
      <>
      <View style={styles.form}>
        {searching && <Text style={{color: "green", fontSize:20}} >Searching Data please wait...</Text>}
        {stopSubmit && <Text style={{color: "red"}}>Please enter family address details to submit the record</Text>}
      <Text style={styles.label}>Current Address:</Text>
      <TextInput
        style={styles.input}
        value={currentAddress}
        onChangeText={text => setCurrentAddress(text)}
        placeholder="Enter current address"
      />

      <Text style={styles.label}>Permanent Address:</Text>
      <TextInput
        style={styles.input}
        value={permanentAddress}
        onChangeText={text => setPermanentAddress(text)}
        placeholder="Enter permanent address"
      />

      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>House Number:</Text>
          <TextInput
            style={styles.input}
            value={houseNumber}
            onChangeText={text => setHouseNumber(text)}
            placeholder="Enter house number"
          />
        </View>
        
        <View style={styles.halfWidth}>
          <Text style={styles.label}>Religion:</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            value={religion}
            onValueChange={(value) => setReligion(value)}
            placeholder={{ label: 'Select religion', value: null }}
            items={[
              { label: 'Hinduism', value: 'Hinduism' },
              { label: 'Islam', value: 'Islam' },
              { label: 'Buddhism', value: 'Buddhism' },
              { label: 'Christianity', value: 'Christianity' },
              { label: 'Others', value: 'Others' },
            ]}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>Social Group:</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            value={socialGroup}
            onValueChange={(value) => setSocialGroup(value)}
            placeholder={{ label: 'Select social group', value: null }}
            items={[
              { label: 'General', value: 'General' },
              { label: 'OBC', value: 'OBC' },
              { label: 'Scheduled Tribe', value: 'Scheduled Tribe' },
              { label: 'Scheduled Caste', value: 'Scheduled Caste' },
              { label: 'Others', value: 'Others' },
            ]}
          />
        </View>
        
        <View style={styles.halfWidth}>
        <Text style={styles.label}>Other Social Group</Text>
          <TextInput
            style={styles.input}
            value={socialGroupOther}
            onChangeText={text => setSocialGroupOther(text)}
            placeholder="Enter other social group"
            editable={socialGroup == "Others"}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>Head of the Family:</Text>
          <TextInput
            style={styles.input}
            value={headOfFamily}
            onChangeText={text => setHeadOfFamily(text)}
            placeholder="Enter head of the family"
          />
        </View>
      </View>
      </View>

      <ScrollView style={formStyles.container} horizontal>
      <DataTable>
        <DataTable.Header style={formStyles.header}>
          <DataTable.Title style={formStyles.title} textStyle={{ color: "white" }}>Questions</DataTable.Title>
          <DataTable.Title style={formStyles.title} textStyle={{ color: "white" }}>Person 1</DataTable.Title>
          <DataTable.Title style={formStyles.title} textStyle={{ color: "white" }}>Person 2</DataTable.Title>
          <DataTable.Title style={formStyles.title} textStyle={{ color: "white" }}>Person 3</DataTable.Title>
          <DataTable.Title style={formStyles.title} textStyle={{ color: "white" }}>Person 4</DataTable.Title>
          <DataTable.Title style={formStyles.title} textStyle={{ color: "white" }}>Person 5</DataTable.Title>
          <DataTable.Title style={formStyles.title} textStyle={{ color: "white" }}>Person 6</DataTable.Title>
          <DataTable.Title style={formStyles.title} textStyle={{ color: "white" }}>Person 7</DataTable.Title>
          <DataTable.Title style={formStyles.title} textStyle={{ color: "white" }}>Person 8</DataTable.Title>
          <DataTable.Title style={formStyles.title} textStyle={{ color: "white" }}>Person 9</DataTable.Title>
          <DataTable.Title style={formStyles.title} textStyle={{ color: "white" }}>Person 10</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell style={formStyles.cell}>Name</DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person1.name}
              onChangeText={(text) => setPerson1({ ...person1, name: text })}
              placeholder='Name'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.name}
              onChangeText={(text) => setPerson2({ ...person2, name: text })}
              placeholder='Name'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.name}
              onChangeText={(text) => setPerson3({ ...person3, name: text })}
              placeholder='Name'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.name}
              onChangeText={(text) => setPerson4({ ...person4, name: text })}
              placeholder='Name'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person5.name}
              onChangeText={(text) => setPerson5({ ...person5, name: text })}
              placeholder='Name'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person6.name}
              onChangeText={(text) => setPerson6({ ...person6, name: text })}
              placeholder='Name'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person7.name}
              onChangeText={(text) => setPerson7({ ...person7, name: text })}
              placeholder='Name'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person8.name}
              onChangeText={(text) => setPerson8({ ...person8, name: text })}
              placeholder='Name'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person9.name}
              onChangeText={(text) => setPerson9({ ...person9, name: text })}
              placeholder='Name'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person10.name}
              onChangeText={(text) => setPerson10({ ...person10, name: text })}
              placeholder='Name'
            />
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell style={formStyles.cell}>Who is sharing the details</DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person1.sharingDetails}
              onChangeText={(text) => setPerson1({ ...person1, sharingDetails: text })}
              placeholder='Who is sharing details'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.sharingDetails}
              onChangeText={(text) => setPerson2({ ...person2, sharingDetails: text })}
              placeholder='Who is sharing details'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.sharingDetails}
              onChangeText={(text) => setPerson3({ ...person3, sharingDetails: text })}
              placeholder='Who is sharing details'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.sharingDetails}
              onChangeText={(text) => setPerson4({ ...person4, sharingDetails: text })}
              placeholder='Who is sharing details'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person5.sharingDetails}
              onChangeText={(text) => setPerson5({ ...person5, sharingDetails: text })}
              placeholder='Who is sharing details'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person6.sharingDetails}
              onChangeText={(text) => setPerson6({ ...person6, sharingDetails: text })}
              placeholder='Who is sharing details'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person7.sharingDetails}
              onChangeText={(text) => setPerson7({ ...person7, sharingDetails: text })}
              placeholder='Who is sharing details'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person8.sharingDetails}
              onChangeText={(text) => setPerson8({ ...person8, sharingDetails: text })}
              placeholder='Who is sharing details'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person9.sharingDetails}
              onChangeText={(text) => setPerson9({ ...person9, sharingDetails: text })}
              placeholder='Who is sharing details'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person10.sharingDetails}
              onChangeText={(text) => setPerson10({ ...person10, sharingDetails: text })}
              placeholder='Who is sharing details'
            />
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell style={formStyles.cell}>Present in the same address</DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
            <Text>No</Text>
            <Switch
              value={person1.presentInSameAdd}
              onValueChange={(value) => setPerson1({ ...person1, presentInSameAdd: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}}>      (Present in same address?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person2.presentInSameAdd}
              onValueChange={(value) => setPerson2({ ...person2, presentInSameAdd: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}}>      (Present in same address?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person3.presentInSameAdd}
              onValueChange={(value) => setPerson3({ ...person3, presentInSameAdd: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}}>      (Present in same address?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person4.presentInSameAdd}
              onValueChange={(value) => setPerson4({ ...person4, presentInSameAdd: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}}>      (Present in same address?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person5.presentInSameAdd}
              onValueChange={(value) => setPerson5({ ...person5, presentInSameAdd: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}}>      (Present in same address?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person6.presentInSameAdd}
              onValueChange={(value) => setPerson6({ ...person6, presentInSameAdd: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}}>      (Present in same address?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person7.presentInSameAdd}
              onValueChange={(value) => setPerson7({ ...person7, presentInSameAdd: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}}>      (Present in same address?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person8.presentInSameAdd}
              onValueChange={(value) => setPerson8({ ...person8, presentInSameAdd: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}}>      (Present in same address?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person9.presentInSameAdd}
              onValueChange={(value) => setPerson9({ ...person9, presentInSameAdd: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}}>      (Present in same address?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person10.presentInSameAdd}
              onValueChange={(value) => setPerson10({ ...person10, presentInSameAdd: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}}>      (Present in same address?)</Text>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell style={formStyles.cell}>If no where</DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person1.ifNoWhere}
              onChangeText={(text) => setPerson1({ ...person1, ifNoWhere: text })}
              placeholder='If no where?'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.ifNoWhere}
              onChangeText={(text) => setPerson2({ ...person2, ifNoWhere: text })}
              placeholder='If no where?'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.ifNoWhere}
              onChangeText={(text) => setPerson3({ ...person3, ifNoWhere: text })}
              placeholder='If no where?'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.ifNoWhere}
              onChangeText={(text) => setPerson4({ ...person4, ifNoWhere: text })}
              placeholder='If no where?'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person5.ifNoWhere}
              onChangeText={(text) => setPerson5({ ...person5, ifNoWhere: text })}
              placeholder='If no where?'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person6.ifNoWhere}
              onChangeText={(text) => setPerson6({ ...person6, ifNoWhere: text })}
              placeholder='If no where?'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person7.ifNoWhere}
              onChangeText={(text) => setPerson7({ ...person7, ifNoWhere: text })}
              placeholder='If no where?'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person8.ifNoWhere}
              onChangeText={(text) => setPerson8({ ...person8, ifNoWhere: text })}
              placeholder='If no where?'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person9.ifNoWhere}
              onChangeText={(text) => setPerson9({ ...person9, ifNoWhere: text })}
              placeholder='If no where?'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person10.ifNoWhere}
              onChangeText={(text) => setPerson10({ ...person10, ifNoWhere: text })}
              placeholder='If no where?'
            />
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={formStyles.cell}>Age</DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person1.age}
              onChangeText={(text) => setPerson1({ ...person1, age: text })}
              placeholder='Age'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.age}
              onChangeText={(text) => setPerson2({ ...person2, age: text })}
              placeholder='Age'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.age}
              onChangeText={(text) => setPerson3({ ...person3, age: text })}
              placeholder='Age'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.age}
              onChangeText={(text) => setPerson4({ ...person4, age: text })}
              placeholder='Age'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person5.age}
              onChangeText={(text) => setPerson5({ ...person5, age: text })}
              placeholder='Age'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person6.age}
              onChangeText={(text) => setPerson6({ ...person6, age: text })}
              placeholder='Age'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person7.age}
              onChangeText={(text) => setPerson7({ ...person7, age: text })}
              placeholder='Age'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person8.age}
              onChangeText={(text) => setPerson8({ ...person8, age: text })}
              placeholder='Age'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person9.age}
              onChangeText={(text) => setPerson9({ ...person9, age: text })}
              placeholder='Age'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person10.age}
              onChangeText={(text) => setPerson10({ ...person10, age: text })}
              placeholder='Age'
            />
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={formStyles.cell}>Gender</DataTable.Cell>
          <DataTable.Cell style={formStyles.gender}>
          <View style={formStyles.radioButtonContainer}>
              <RadioButton.Item style={formStyles.genderOp} label="Male" value="male" status={person1.gender === 'male' ? 'checked' : 'unchecked'} onPress={() => setPerson1({ ...person1, gender: 'male' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Female" value="female" status={person1.gender === 'female' ? 'checked' : 'unchecked'} onPress={() => setPerson1({ ...person1, gender: 'female' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Others" value="others" status={person1.gender === 'others' ? 'checked' : 'unchecked'} onPress={() => setPerson1({ ...person1, gender: 'others' })} />
            </View>
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.gender}>
          <View style={formStyles.radioButtonContainer}>
              <RadioButton.Item style={formStyles.genderOp} label="Male" value="male" status={person2.gender === 'male' ? 'checked' : 'unchecked'} onPress={() => setPerson2({ ...person2, gender: 'male' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Female" value="female" status={person2.gender === 'female' ? 'checked' : 'unchecked'} onPress={() => setPerson2({ ...person2, gender: 'female' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Others" value="others" status={person2.gender === 'others' ? 'checked' : 'unchecked'} onPress={() => setPerson2({ ...person2, gender: 'others' })} />
            </View>
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.gender}>
          <View style={formStyles.radioButtonContainer}>
              <RadioButton.Item style={formStyles.genderOp} label="Male" value="male" status={person3.gender === 'male' ? 'checked' : 'unchecked'} onPress={() => setPerson3({ ...person3, gender: 'male' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Female" value="female" status={person3.gender === 'female' ? 'checked' : 'unchecked'} onPress={() => setPerson3({ ...person3, gender: 'female' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Others" value="others" status={person3.gender === 'others' ? 'checked' : 'unchecked'} onPress={() => setPerson3({ ...person3, gender: 'others' })} />
            </View>
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.gender}>
          <View style={formStyles.radioButtonContainer}>
              <RadioButton.Item style={formStyles.genderOp} label="Male" value="male" status={person4.gender === 'male' ? 'checked' : 'unchecked'} onPress={() => setPerson4({ ...person4, gender: 'male' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Female" value="female" status={person4.gender === 'female' ? 'checked' : 'unchecked'} onPress={() => setPerson4({ ...person4, gender: 'female' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Others" value="others" status={person4.gender === 'others' ? 'checked' : 'unchecked'} onPress={() => setPerson4({ ...person4, gender: 'others' })} />
            </View>
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.gender}>
          <View style={formStyles.radioButtonContainer}>
              <RadioButton.Item style={formStyles.genderOp} label="Male" value="male" status={person5.gender === 'male' ? 'checked' : 'unchecked'} onPress={() => setPerson5({ ...person5, gender: 'male' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Female" value="female" status={person5.gender === 'female' ? 'checked' : 'unchecked'} onPress={() => setPerson5({ ...person5, gender: 'female' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Others" value="others" status={person5.gender === 'others' ? 'checked' : 'unchecked'} onPress={() => setPerson5({ ...person5, gender: 'others' })} />
            </View>
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.gender}>
          <View style={formStyles.radioButtonContainer}>
              <RadioButton.Item style={formStyles.genderOp} label="Male" value="male" status={person6.gender === 'male' ? 'checked' : 'unchecked'} onPress={() => setPerson6({ ...person6, gender: 'male' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Female" value="female" status={person6.gender === 'female' ? 'checked' : 'unchecked'} onPress={() => setPerson6({ ...person6, gender: 'female' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Others" value="others" status={person6.gender === 'others' ? 'checked' : 'unchecked'} onPress={() => setPerson6({ ...person6, gender: 'others' })} />
            </View>
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.gender}>
          <View style={formStyles.radioButtonContainer}>
              <RadioButton.Item style={formStyles.genderOp} label="Male" value="male" status={person7.gender === 'male' ? 'checked' : 'unchecked'} onPress={() => setPerson7({ ...person7, gender: 'male' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Female" value="female" status={person7.gender === 'female' ? 'checked' : 'unchecked'} onPress={() => setPerson7({ ...person7, gender: 'female' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Others" value="others" status={person7.gender === 'others' ? 'checked' : 'unchecked'} onPress={() => setPerson7({ ...person7, gender: 'others' })} />
            </View>
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.gender}>
          <View style={formStyles.radioButtonContainer}>
              <RadioButton.Item style={formStyles.genderOp} label="Male" value="male" status={person8.gender === 'male' ? 'checked' : 'unchecked'} onPress={() => setPerson8({ ...person8, gender: 'male' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Female" value="female" status={person8.gender === 'female' ? 'checked' : 'unchecked'} onPress={() => setPerson8({ ...person8, gender: 'female' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Others" value="others" status={person8.gender === 'others' ? 'checked' : 'unchecked'} onPress={() => setPerson8({ ...person8, gender: 'others' })} />
            </View>
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.gender}>
          <View style={formStyles.radioButtonContainer}>
              <RadioButton.Item style={formStyles.genderOp} label="Male" value="male" status={person9.gender === 'male' ? 'checked' : 'unchecked'} onPress={() => setPerson9({ ...person9, gender: 'male' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Female" value="female" status={person9.gender === 'female' ? 'checked' : 'unchecked'} onPress={() => setPerson9({ ...person9, gender: 'female' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Others" value="others" status={person9.gender === 'others' ? 'checked' : 'unchecked'} onPress={() => setPerson9({ ...person9, gender: 'others' })} />
            </View>
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.gender}>
          <View style={formStyles.radioButtonContainer}>
              <RadioButton.Item style={formStyles.genderOp} label="Male" value="male" status={person10.gender === 'male' ? 'checked' : 'unchecked'} onPress={() => setPerson10({ ...person10, gender: 'male' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Female" value="female" status={person10.gender === 'female' ? 'checked' : 'unchecked'} onPress={() => setPerson10({ ...person10, gender: 'female' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Others" value="others" status={person10.gender === 'others' ? 'checked' : 'unchecked'} onPress={() => setPerson10({ ...person10, gender: 'others' })} />
            </View>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={formStyles.cell}>Phone Number</DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person1.phNo}
              onChangeText={(text) => setPerson1({ ...person1, phNo: text })}
              placeholder='Phone No.'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.phNo}
              onChangeText={(text) => setPerson2({ ...person2, phNo: text })}
              placeholder='Phone No.'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.phNo}
              onChangeText={(text) => setPerson3({ ...person3, phNo: text })}
              placeholder='Phone No.'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.phNo}
              onChangeText={(text) => setPerson4({ ...person4, phNo: text })}
              placeholder='Phone No.'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person5.phNo}
              onChangeText={(text) => setPerson5({ ...person5, phNo: text })}
              placeholder='Phone No.'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person6.phNo}
              onChangeText={(text) => setPerson6({ ...person6, phNo: text })}
              placeholder='Phone No.'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person7.phNo}
              onChangeText={(text) => setPerson7({ ...person7, phNo: text })}
              placeholder='Phone No.'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person8.phNo}
              onChangeText={(text) => setPerson8({ ...person8, phNo: text })}
              placeholder='Phone No.'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person9.phNo}
              onChangeText={(text) => setPerson9({ ...person9, phNo: text })}
              placeholder='Phone No.'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person10.phNo}
              onChangeText={(text) => setPerson10({ ...person10, phNo: text })}
              placeholder='Phone No.'
            />
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={formStyles.cell}>Education</DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person1.education}
              onChangeText={(text) => setPerson1({ ...person1, education: text })}
              placeholder='Education'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.education}
              onChangeText={(text) => setPerson2({ ...person2, education: text })}
              placeholder='Education'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.education}
              onChangeText={(text) => setPerson3({ ...person3, education: text })}
              placeholder='Education'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.education}
              onChangeText={(text) => setPerson4({ ...person4, education: text })}
              placeholder='Education'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person5.education}
              onChangeText={(text) => setPerson5({ ...person5, education: text })}
              placeholder='Education'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person6.education}
              onChangeText={(text) => setPerson6({ ...person6, education: text })}
              placeholder='Education'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person7.education}
              onChangeText={(text) => setPerson7({ ...person7, education: text })}
              placeholder='Education'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person8.education}
              onChangeText={(text) => setPerson8({ ...person8, education: text })}
              placeholder='Education'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person9.education}
              onChangeText={(text) => setPerson9({ ...person9, education: text })}
              placeholder='Education'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person10.education}
              onChangeText={(text) => setPerson10({ ...person10, education: text })}
              placeholder='Education'
            />
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={formStyles.cell}>Medical History</DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person1.medicalHis}
              onChangeText={(text) => setPerson1({ ...person1, medicalHis: text })}
              placeholder='Medical History'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.medicalHis}
              onChangeText={(text) => setPerson2({ ...person2, medicalHis: text })}
              placeholder='Medical History'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.medicalHis}
              onChangeText={(text) => setPerson3({ ...person3, medicalHis: text })}
              placeholder='Medical History'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.medicalHis}
              onChangeText={(text) => setPerson4({ ...person4, medicalHis: text })}
              placeholder='Medical History'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person5.medicalHis}
              onChangeText={(text) => setPerson5({ ...person5, medicalHis: text })}
              placeholder='Medical History'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person6.medicalHis}
              onChangeText={(text) => setPerson6({ ...person6, medicalHis: text })}
              placeholder='Medical History'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person7.medicalHis}
              onChangeText={(text) => setPerson7({ ...person7, medicalHis: text })}
              placeholder='Medical History'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person8.medicalHis}
              onChangeText={(text) => setPerson8({ ...person8, medicalHis: text })}
              placeholder='Medical History'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person9.medicalHis}
              onChangeText={(text) => setPerson9({ ...person9, medicalHis: text })}
              placeholder='Medical History'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person10.medicalHis}
              onChangeText={(text) => setPerson10({ ...person10, medicalHis: text })}
              placeholder='Medical History'
            />
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={formStyles.cell}>Earning member</DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person1.earningMem}
              onChangeText={(text) => setPerson1({ ...person1, earningMem: text })}
              placeholder='Earning member'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.earningMem}
              onChangeText={(text) => setPerson2({ ...person2, earningMem: text })}
              placeholder='Earning member'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.earningMem}
              onChangeText={(text) => setPerson3({ ...person3, earningMem: text })}
              placeholder='Earning member'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.earningMem}
              onChangeText={(text) => setPerson4({ ...person4, earningMem: text })}
              placeholder='Earning member'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person5.earningMem}
              onChangeText={(text) => setPerson5({ ...person5, earningMem: text })}
              placeholder='Earning member'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person6.earningMem}
              onChangeText={(text) => setPerson6({ ...person6, earningMem: text })}
              placeholder='Earning member'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person7.earningMem}
              onChangeText={(text) => setPerson7({ ...person7, earningMem: text })}
              placeholder='Earning member'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person8.earningMem}
              onChangeText={(text) => setPerson8({ ...person8, earningMem: text })}
              placeholder='Earning member'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person9.earningMem}
              onChangeText={(text) => setPerson9({ ...person9, earningMem: text })}
              placeholder='Earning member'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person10.earningMem}
              onChangeText={(text) => setPerson10({ ...person10, earningMem: text })}
              placeholder='Earning member'
            />
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={formStyles.cell}>Occupation</DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person1.occupation}
              onChangeText={(text) => setPerson1({ ...person1, occupation: text })}
              placeholder='Occupation'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.occupation}
              onChangeText={(text) => setPerson2({ ...person2, occupation: text })}
              placeholder='Occupation'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.occupation}
              onChangeText={(text) => setPerson3({ ...person3, occupation: text })}
              placeholder='Occupation'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.occupation}
              onChangeText={(text) => setPerson4({ ...person4, occupation: text })}
              placeholder='Occupation'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person5.occupation}
              onChangeText={(text) => setPerson5({ ...person5, occupation: text })}
              placeholder='Occupation'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person6.occupation}
              onChangeText={(text) => setPerson6({ ...person6, occupation: text })}
              placeholder='Occupation'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person7.occupation}
              onChangeText={(text) => setPerson7({ ...person7, occupation: text })}
              placeholder='Occupation'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person8.occupation}
              onChangeText={(text) => setPerson8({ ...person8, occupation: text })}
              placeholder='Occupation'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person9.occupation}
              onChangeText={(text) => setPerson9({ ...person9, occupation: text })}
              placeholder='Occupation'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person10.occupation}
              onChangeText={(text) => setPerson10({ ...person10, occupation: text })}
              placeholder='Occupation'
            />
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={formStyles.cell}>Salary</DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person1.salary}
              onChangeText={(text) => setPerson1({ ...person1, salary: text })}
              placeholder='Salary'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.salary}
              onChangeText={(text) => setPerson2({ ...person2, salary: text })}
              placeholder='Salary'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.salary}
              onChangeText={(text) => setPerson3({ ...person3, salary: text })}
              placeholder='Salary'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.salary}
              onChangeText={(text) => setPerson4({ ...person4, salary: text })}
              placeholder='Salary'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person5.salary}
              onChangeText={(text) => setPerson5({ ...person5, salary: text })}
              placeholder='Salary'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person6.salary}
              onChangeText={(text) => setPerson6({ ...person6, salary: text })}
              placeholder='Salary'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person7.salary}
              onChangeText={(text) => setPerson7({ ...person7, salary: text })}
              placeholder='Salary'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person8.salary}
              onChangeText={(text) => setPerson8({ ...person8, salary: text })}
              placeholder='Salary'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person9.salary}
              onChangeText={(text) => setPerson9({ ...person9, salary: text })}
              placeholder='Salary'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person10.salary}
              onChangeText={(text) => setPerson10({ ...person10, salary: text })}
              placeholder='Salary'
            />
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={formStyles.cell}>Cancer History</DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person1.cancerHis}
              onChangeText={(text) => setPerson1({ ...person1, cancerHis: text })}
              placeholder='Cancer History'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.cancerHis}
              onChangeText={(text) => setPerson2({ ...person2, cancerHis: text })}
              placeholder='Cancer History'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.cancerHis}
              onChangeText={(text) => setPerson3({ ...person3, cancerHis: text })}
              placeholder='Cancer History'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.cancerHis}
              onChangeText={(text) => setPerson4({ ...person4, cancerHis: text })}
              placeholder='Cancer History'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person5.cancerHis}
              onChangeText={(text) => setPerson5({ ...person5, cancerHis: text })}
              placeholder='Cancer History'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person6.cancerHis}
              onChangeText={(text) => setPerson6({ ...person6, cancerHis: text })}
              placeholder='Cancer History'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person7.cancerHis}
              onChangeText={(text) => setPerson7({ ...person7, cancerHis: text })}
              placeholder='Cancer History'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person8.cancerHis}
              onChangeText={(text) => setPerson8({ ...person8, cancerHis: text })}
              placeholder='Cancer History'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person9.cancerHis}
              onChangeText={(text) => setPerson9({ ...person9, cancerHis: text })}
              placeholder='Cancer History'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person10.cancerHis}
              onChangeText={(text) => setPerson10({ ...person10, cancerHis: text })}
              placeholder='Cancer History'
            />
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={formStyles.cell}>When was diagnosed</DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person1.whenWasDiag}
              onChangeText={(text) => setPerson1({ ...person1, whenWasDiag: text })}
              placeholder='When was diagnosed'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.whenWasDiag}
              onChangeText={(text) => setPerson2({ ...person2, whenWasDiag: text })}
              placeholder='When was diagnosed'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.whenWasDiag}
              onChangeText={(text) => setPerson3({ ...person3, whenWasDiag: text })}
              placeholder='When was diagnosed'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.whenWasDiag}
              onChangeText={(text) => setPerson4({ ...person4, whenWasDiag: text })}
              placeholder='When was diagnosed'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person5.whenWasDiag}
              onChangeText={(text) => setPerson5({ ...person5, whenWasDiag: text })}
              placeholder='When was diagnosed'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person6.whenWasDiag}
              onChangeText={(text) => setPerson6({ ...person6, whenWasDiag: text })}
              placeholder='When was diagnosed'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person7.whenWasDiag}
              onChangeText={(text) => setPerson7({ ...person7, whenWasDiag: text })}
              placeholder='When was diagnosed'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person8.whenWasDiag}
              onChangeText={(text) => setPerson8({ ...person8, whenWasDiag: text })}
              placeholder='When was diagnosed'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person9.whenWasDiag}
              onChangeText={(text) => setPerson9({ ...person9, whenWasDiag: text })}
              placeholder='When was diagnosed'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person10.whenWasDiag}
              onChangeText={(text) => setPerson10({ ...person10, whenWasDiag: text })}
              placeholder='When was diagnosed'
            />
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={formStyles.cell}>Which site</DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person1.whichSite}
              onChangeText={(text) => setPerson1({ ...person1, whichSite: text })}
              placeholder='Which site'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.whichSite}
              onChangeText={(text) => setPerson2({ ...person2, whichSite: text })}
              placeholder='Which site'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.whichSite}
              onChangeText={(text) => setPerson3({ ...person3, whichSite: text })}
              placeholder='Which site'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.whichSite}
              onChangeText={(text) => setPerson4({ ...person4, whichSite: text })}
              placeholder='Which site'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person5.whichSite}
              onChangeText={(text) => setPerson5({ ...person5, whichSite: text })}
              placeholder='Which site'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person6.whichSite}
              onChangeText={(text) => setPerson6({ ...person6, whichSite: text })}
              placeholder='Which site'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person7.whichSite}
              onChangeText={(text) => setPerson7({ ...person7, whichSite: text })}
              placeholder='Which site'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person8.whichSite}
              onChangeText={(text) => setPerson8({ ...person8, whichSite: text })}
              placeholder='Which site'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person9.whichSite}
              onChangeText={(text) => setPerson9({ ...person9, whichSite: text })}
              placeholder='Which site'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person10.whichSite}
              onChangeText={(text) => setPerson10({ ...person10, whichSite: text })}
              placeholder='Which site'
            />
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={formStyles.cell}>Condition now</DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person1.conditionNow}
              onChangeText={(text) => setPerson1({ ...person1, conditionNow: text })}
              placeholder='Condition now'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.conditionNow}
              onChangeText={(text) => setPerson2({ ...person2, conditionNow: text })}
              placeholder='Condition now'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.conditionNow}
              onChangeText={(text) => setPerson3({ ...person3, conditionNow: text })}
              placeholder='Condition now'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.conditionNow}
              onChangeText={(text) => setPerson4({ ...person4, conditionNow: text })}
              placeholder='Condition now'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person5.conditionNow}
              onChangeText={(text) => setPerson5({ ...person5, conditionNow: text })}
              placeholder='Condition now'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person6.conditionNow}
              onChangeText={(text) => setPerson6({ ...person6, conditionNow: text })}
              placeholder='Condition now'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person7.conditionNow}
              onChangeText={(text) => setPerson7({ ...person7, conditionNow: text })}
              placeholder='Condition now'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person8.conditionNow}
              onChangeText={(text) => setPerson8({ ...person8, conditionNow: text })}
              placeholder='Condition now'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person9.conditionNow}
              onChangeText={(text) => setPerson9({ ...person9, conditionNow: text })}
              placeholder='Condition now'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person10.conditionNow}
              onChangeText={(text) => setPerson10({ ...person10, conditionNow: text })}
              placeholder='Condition now'
            />
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={formStyles.cell}>Last time visited hospital for cancer</DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person1.lastTimeVis}
              onChangeText={(text) => setPerson1({ ...person1, lastTimeVis: text })}
              placeholder='Last time visited hospital for cancer'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.lastTimeVis}
              onChangeText={(text) => setPerson2({ ...person2, lastTimeVis: text })}
              placeholder='Last time visited hospital for cancer'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.lastTimeVis}
              onChangeText={(text) => setPerson3({ ...person3, lastTimeVis: text })}
              placeholder='Last time visited hospital for cancer'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.lastTimeVis}
              onChangeText={(text) => setPerson4({ ...person4, lastTimeVis: text })}
              placeholder='Last time visited hospital for cancer'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person5.lastTimeVis}
              onChangeText={(text) => setPerson5({ ...person5, lastTimeVis: text })}
              placeholder='Last time visited hospital for cancer'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person6.lastTimeVis}
              onChangeText={(text) => setPerson6({ ...person6, lastTimeVis: text })}
              placeholder='Last time visited hospital for cancer'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person7.lastTimeVis}
              onChangeText={(text) => setPerson7({ ...person7, lastTimeVis: text })}
              placeholder='Last time visited hospital for cancer'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person8.lastTimeVis}
              onChangeText={(text) => setPerson8({ ...person8, lastTimeVis: text })}
              placeholder='Last time visited hospital for cancer'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person9.lastTimeVis}
              onChangeText={(text) => setPerson9({ ...person9, lastTimeVis: text })}
              placeholder='Last time visited hospital for cancer'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person10.lastTimeVis}
              onChangeText={(text) => setPerson10({ ...person10, lastTimeVis: text })}
              placeholder='Last time visited hospital for cancer'
            />
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={formStyles.cell}>How did you know/hear about cancer?</DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person1.howKnowCancer}
              onChangeText={(text) => setPerson1({ ...person1, howKnowCancer: text })}
              placeholder='How did you know/hear about cancer?'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.howKnowCancer}
              onChangeText={(text) => setPerson2({ ...person2, howKnowCancer: text })}
              placeholder='How did you know/hear about cancer?'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.howKnowCancer}
              onChangeText={(text) => setPerson3({ ...person3, howKnowCancer: text })}
              placeholder='How did you know/hear about cancer?'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.howKnowCancer}
              onChangeText={(text) => setPerson4({ ...person4, howKnowCancer: text })}
              placeholder='How did you know/hear about cancer?'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person5.howKnowCancer}
              onChangeText={(text) => setPerson5({ ...person5, howKnowCancer: text })}
              placeholder='How did you know/hear about cancer?'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person6.howKnowCancer}
              onChangeText={(text) => setPerson6({ ...person6, howKnowCancer: text })}
              placeholder='How did you know/hear about cancer?'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person7.howKnowCancer}
              onChangeText={(text) => setPerson7({ ...person7, howKnowCancer: text })}
              placeholder='How did you know/hear about cancer?'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person8.howKnowCancer}
              onChangeText={(text) => setPerson8({ ...person8, howKnowCancer: text })}
              placeholder='How did you know/hear about cancer?'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person9.howKnowCancer}
              onChangeText={(text) => setPerson9({ ...person9, howKnowCancer: text })}
              placeholder='How did you know/hear about cancer?'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person10.howKnowCancer}
              onChangeText={(text) => setPerson10({ ...person10, howKnowCancer: text })}
              placeholder='How did you know/hear about cancer?'
            />
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={formStyles.cell}>How do you think cancer is caused?</DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person1.howCancerCaused}
              onChangeText={(text) => setPerson1({ ...person1, howCancerCaused: text })}
              placeholder='How do you think cancer is caused?'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.howCancerCaused}
              onChangeText={(text) => setPerson2({ ...person2, howCancerCaused: text })}
              placeholder='How do you think cancer is caused?'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.howCancerCaused}
              onChangeText={(text) => setPerson3({ ...person3, howCancerCaused: text })}
              placeholder='How do you think cancer is caused?'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.howCancerCaused}
              onChangeText={(text) => setPerson4({ ...person4, howCancerCaused: text })}
              placeholder='How do you think cancer is caused?'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person5.howCancerCaused}
              onChangeText={(text) => setPerson5({ ...person5, howCancerCaused: text })}
              placeholder='How do you think cancer is caused?'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person6.howCancerCaused}
              onChangeText={(text) => setPerson6({ ...person6, howCancerCaused: text })}
              placeholder='How do you think cancer is caused?'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person7.howCancerCaused}
              onChangeText={(text) => setPerson7({ ...person7, howCancerCaused: text })}
              placeholder='How do you think cancer is caused?'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person8.howCancerCaused}
              onChangeText={(text) => setPerson8({ ...person8, howCancerCaused: text })}
              placeholder='How do you think cancer is caused?'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person9.howCancerCaused}
              onChangeText={(text) => setPerson9({ ...person9, howCancerCaused: text })}
              placeholder='How do you think cancer is caused?'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person10.howCancerCaused}
              onChangeText={(text) => setPerson10({ ...person10, howCancerCaused: text })}
              placeholder='How do you think cancer is caused?'
            />
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={formStyles.cell}>Are you aware of the symptoms of cancer?</DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person1.areYouAware}
              onValueChange={(value) => setPerson1({ ...person1, areYouAware: value })}
            />
            <Text>Yes</Text>
            <Text style={{color:"grey"}} >  (Aware of the symptoms of cancer?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person2.areYouAware}
              onValueChange={(value) => setPerson2({ ...person2, areYouAware: value })}
            />
            <Text>Yes</Text>
            <Text style={{color:"grey"}} >  (Aware of the symptoms of cancer?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person3.areYouAware}
              onValueChange={(value) => setPerson3({ ...person3, areYouAware: value })}
            />
            <Text>Yes</Text>
            <Text style={{color:"grey"}} >  (Aware of the symptoms of cancer?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person4.areYouAware}
              onValueChange={(value) => setPerson4({ ...person4, areYouAware: value })}
            />
            <Text>Yes</Text>
            <Text style={{color:"grey"}} >  (Aware of the symptoms of cancer?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person5.areYouAware}
              onValueChange={(value) => setPerson5({ ...person5, areYouAware: value })}
            />
            <Text>Yes</Text>
            <Text style={{color:"grey"}} >  (Aware of the symptoms of cancer?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person6.areYouAware}
              onValueChange={(value) => setPerson6({ ...person6, areYouAware: value })}
            />
            <Text>Yes</Text>
            <Text style={{color:"grey"}} >  (Aware of the symptoms of cancer?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person7.areYouAware}
              onValueChange={(value) => setPerson7({ ...person7, areYouAware: value })}
            />
            <Text>Yes</Text>
            <Text style={{color:"grey"}} >  (Aware of the symptoms of cancer?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person8.areYouAware}
              onValueChange={(value) => setPerson8({ ...person8, areYouAware: value })}
            />
            <Text>Yes</Text>
            <Text style={{color:"grey"}} >  (Aware of the symptoms of cancer?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person9.areYouAware}
              onValueChange={(value) => setPerson9({ ...person9, areYouAware: value })}
            />
            <Text>Yes</Text>
            <Text style={{color:"grey"}} >  (Aware of the symptoms of cancer?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person10.areYouAware}
              onValueChange={(value) => setPerson10({ ...person10, areYouAware: value })}
            />
            <Text>Yes</Text>
            <Text style={{color:"grey"}} >  (Aware of the symptoms of cancer?)</Text>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={formStyles.cell}>If yes, what are the symptoms of cancer</DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person1.cancerSymp}
              onChangeText={(text) => setPerson1({ ...person1, cancerSymp: text })}
              placeholder='If yes, what are the symptoms of cancer'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.cancerSymp}
              onChangeText={(text) => setPerson2({ ...person2, cancerSymp: text })}
              placeholder='If yes, what are the symptoms of cancer'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.cancerSymp}
              onChangeText={(text) => setPerson3({ ...person3, cancerSymp: text })}
              placeholder='If yes, what are the symptoms of cancer'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.cancerSymp}
              onChangeText={(text) => setPerson4({ ...person4, cancerSymp: text })}
              placeholder='If yes, what are the symptoms of cancer'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person5.cancerSymp}
              onChangeText={(text) => setPerson5({ ...person5, cancerSymp: text })}
              placeholder='If yes, what are the symptoms of cancer'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person6.cancerSymp}
              onChangeText={(text) => setPerson6({ ...person6, cancerSymp: text })}
              placeholder='If yes, what are the symptoms of cancer'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person7.cancerSymp}
              onChangeText={(text) => setPerson7({ ...person7, cancerSymp: text })}
              placeholder='If yes, what are the symptoms of cancer'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person8.cancerSymp}
              onChangeText={(text) => setPerson8({ ...person8, cancerSymp: text })}
              placeholder='If yes, what are the symptoms of cancer'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person9.cancerSymp}
              onChangeText={(text) => setPerson9({ ...person9, cancerSymp: text })}
              placeholder='If yes, what are the symptoms of cancer'
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person10.cancerSymp}
              onChangeText={(text) => setPerson10({ ...person10, cancerSymp: text })}
              placeholder='If yes, what are the symptoms of cancer'
            />
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={formStyles.cell}>Do you think cancer is a communicable disease?</DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person1.isCancerCommuni}
              onValueChange={(value) => setPerson1({ ...person1, isCancerCommuni: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}} >   (Is cancer is a communicable disease?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person2.isCancerCommuni}
              onValueChange={(value) => setPerson2({ ...person2, isCancerCommuni: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}} >   (Is cancer is a communicable disease?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person3.isCancerCommuni}
              onValueChange={(value) => setPerson3({ ...person3, isCancerCommuni: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}} >   (Is cancer is a communicable disease?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person4.isCancerCommuni}
              onValueChange={(value) => setPerson4({ ...person4, isCancerCommuni: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}} >   (Is cancer is a communicable disease?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person5.isCancerCommuni}
              onValueChange={(value) => setPerson5({ ...person5, isCancerCommuni: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}} >   (Is cancer is a communicable disease?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person6.isCancerCommuni}
              onValueChange={(value) => setPerson6({ ...person6, isCancerCommuni: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}} >   (Is cancer is a communicable disease?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person7.isCancerCommuni}
              onValueChange={(value) => setPerson7({ ...person7, isCancerCommuni: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}} >   (Is cancer is a communicable disease?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person8.isCancerCommuni}
              onValueChange={(value) => setPerson8({ ...person8, isCancerCommuni: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}} >   (Is cancer is a communicable disease?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person9.isCancerCommuni}
              onValueChange={(value) => setPerson9({ ...person9, isCancerCommuni: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}} >   (Is cancer is a communicable disease?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person10.isCancerCommuni}
              onValueChange={(value) => setPerson10({ ...person10, isCancerCommuni: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}} >   (Is cancer is a communicable disease?)</Text>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={formStyles.cell}>Are you aware of cancer screening methods?</DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person1.awareCancerScreen}
              onValueChange={(value) => setPerson1({ ...person1, awareCancerScreen: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}} >   (Aware of cancer screening methods?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person2.awareCancerScreen}
              onValueChange={(value) => setPerson2({ ...person2, awareCancerScreen: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}} >   (Aware of cancer screening methods?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person3.awareCancerScreen}
              onValueChange={(value) => setPerson3({ ...person3, awareCancerScreen: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}} >   (Aware of cancer screening methods?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person4.awareCancerScreen}
              onValueChange={(value) => setPerson4({ ...person4, awareCancerScreen: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}} >   (Aware of cancer screening methods?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person5.awareCancerScreen}
              onValueChange={(value) => setPerson5({ ...person5, awareCancerScreen: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}} >   (Aware of cancer screening methods?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person6.awareCancerScreen}
              onValueChange={(value) => setPerson6({ ...person6, awareCancerScreen: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}} >   (Aware of cancer screening methods?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person7.awareCancerScreen}
              onValueChange={(value) => setPerson7({ ...person7, awareCancerScreen: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}} >   (Aware of cancer screening methods?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person8.awareCancerScreen}
              onValueChange={(value) => setPerson8({ ...person8, awareCancerScreen: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}} >   (Aware of cancer screening methods?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person9.awareCancerScreen}
              onValueChange={(value) => setPerson9({ ...person9, awareCancerScreen: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}} >   (Aware of cancer screening methods?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person10.awareCancerScreen}
              onValueChange={(value) => setPerson10({ ...person10, awareCancerScreen: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}} >   (Aware of cancer screening methods?)</Text>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={formStyles.cell}>Is cancer treatable/curable ?</DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person1.isCancerTreatable}
              onValueChange={(value) => setPerson1({ ...person1, isCancerTreatable: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}} >   (Is cancer treatable/curable?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person2.isCancerTreatable}
              onValueChange={(value) => setPerson2({ ...person2, isCancerTreatable: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}} >   (Is cancer treatable/curable?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person3.isCancerTreatable}
              onValueChange={(value) => setPerson3({ ...person3, isCancerTreatable: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}} >   (Is cancer treatable/curable?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person4.isCancerTreatable}
              onValueChange={(value) => setPerson4({ ...person4, isCancerTreatable: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}} >   (Is cancer treatable/curable?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person5.isCancerTreatable}
              onValueChange={(value) => setPerson5({ ...person5, isCancerTreatable: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}} >   (Is cancer treatable/curable?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person6.isCancerTreatable}
              onValueChange={(value) => setPerson6({ ...person6, isCancerTreatable: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}} >   (Is cancer treatable/curable?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person7.isCancerTreatable}
              onValueChange={(value) => setPerson7({ ...person7, isCancerTreatable: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}} >   (Is cancer treatable/curable?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person8.isCancerTreatable}
              onValueChange={(value) => setPerson8({ ...person8, isCancerTreatable: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}} >   (Is cancer treatable/curable?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person9.isCancerTreatable}
              onValueChange={(value) => setPerson9({ ...person9, isCancerTreatable: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}} >   (Is cancer treatable/curable?)</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person10.isCancerTreatable}
              onValueChange={(value) => setPerson10({ ...person10, isCancerTreatable: value })}
            />
            <Text>Yes</Text>
            <Text style={{color: "grey"}} >   (Is cancer treatable/curable?)</Text>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
        <DataTable.Cell style={formStyles.cell}>Food Habbit</DataTable.Cell>
          <DataTable.Cell style={formStyles.gender}>
          <View style={formStyles.radioButtonContainer}>
              <RadioButton.Item style={formStyles.genderOp} label="Veg" value="veg" status={person1.foodHabit === 'veg' ? 'checked' : 'unchecked'} onPress={() => setPerson1({ ...person1, foodHabit: 'veg' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Non veg" value="non-veg" status={person1.foodHabit === 'non-veg' ? 'checked' : 'unchecked'} onPress={() => setPerson1({ ...person1, foodHabit: 'non-veg' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Red meat" value="red-meat" status={person1.foodHabit === 'red-meat' ? 'checked' : 'unchecked'} onPress={() => setPerson1({ ...person1, foodHabit: 'red-meat' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Snail" value="snail" status={person1.foodHabit === 'snail' ? 'checked' : 'unchecked'} onPress={() => setPerson1({ ...person1, foodHabit: 'snail' })} />
            </View>
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.gender}>
          <View style={formStyles.radioButtonContainer}>
          <RadioButton.Item style={formStyles.genderOp} label="Veg" value="veg" status={person2.foodHabit === 'veg' ? 'checked' : 'unchecked'} onPress={() => setPerson2({ ...person2, foodHabit: 'veg' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Non veg" value="non-veg" status={person2.foodHabit === 'non-veg' ? 'checked' : 'unchecked'} onPress={() => setPerson2({ ...person2, foodHabit: 'non-veg' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Red meat" value="red-meat" status={person2.foodHabit === 'red-meat' ? 'checked' : 'unchecked'} onPress={() => setPerson2({ ...person2, foodHabit: 'red-meat' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Snail" value="snail" status={person2.foodHabit === 'snail' ? 'checked' : 'unchecked'} onPress={() => setPerson2({ ...person2, foodHabit: 'snail' })} />
            </View>
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.gender}>
          <View style={formStyles.radioButtonContainer}>
          <RadioButton.Item style={formStyles.genderOp} label="Veg" value="veg" status={person3.foodHabit === 'veg' ? 'checked' : 'unchecked'} onPress={() => setPerson3({ ...person3, foodHabit: 'veg' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Non veg" value="non-veg" status={person3.foodHabit === 'non-veg' ? 'checked' : 'unchecked'} onPress={() => setPerson3({ ...person3, foodHabit: 'non-veg' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Red meat" value="red-meat" status={person3.foodHabit === 'red-meat' ? 'checked' : 'unchecked'} onPress={() => setPerson3({ ...person3, foodHabit: 'red-meat' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Snail" value="snail" status={person3.foodHabit === 'snail' ? 'checked' : 'unchecked'} onPress={() => setPerson3({ ...person3, foodHabit: 'snail' })} />
            </View>
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.gender}>
          <View style={formStyles.radioButtonContainer}>
          <RadioButton.Item style={formStyles.genderOp} label="Veg" value="veg" status={person4.foodHabit === 'veg' ? 'checked' : 'unchecked'} onPress={() => setPerson4({ ...person4, foodHabit: 'veg' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Non veg" value="non-veg" status={person4.foodHabit === 'non-veg' ? 'checked' : 'unchecked'} onPress={() => setPerson4({ ...person4, foodHabit: 'non-veg' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Red meat" value="red-meat" status={person4.foodHabit === 'red-meat' ? 'checked' : 'unchecked'} onPress={() => setPerson4({ ...person4, foodHabit: 'red-meat' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Snail" value="snail" status={person4.foodHabit === 'snail' ? 'checked' : 'unchecked'} onPress={() => setPerson4({ ...person4, foodHabit: 'snail' })} />
            </View>
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.gender}>
          <View style={formStyles.radioButtonContainer}>
          <RadioButton.Item style={formStyles.genderOp} label="Veg" value="veg" status={person5.foodHabit === 'veg' ? 'checked' : 'unchecked'} onPress={() => setPerson5({ ...person5, foodHabit: 'veg' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Non veg" value="non-veg" status={person5.foodHabit === 'non-veg' ? 'checked' : 'unchecked'} onPress={() => setPerson5({ ...person5, foodHabit: 'non-veg' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Red meat" value="red-meat" status={person5.foodHabit === 'red-meat' ? 'checked' : 'unchecked'} onPress={() => setPerson5({ ...person5, foodHabit: 'red-meat' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Snail" value="snail" status={person5.foodHabit === 'snail' ? 'checked' : 'unchecked'} onPress={() => setPerson5({ ...person5, foodHabit: 'snail' })} />
            </View>
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.gender}>
          <View style={formStyles.radioButtonContainer}>
          <RadioButton.Item style={formStyles.genderOp} label="Veg" value="veg" status={person6.foodHabit === 'veg' ? 'checked' : 'unchecked'} onPress={() => setPerson6({ ...person6, foodHabit: 'veg' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Non veg" value="non-veg" status={person6.foodHabit === 'non-veg' ? 'checked' : 'unchecked'} onPress={() => setPerson6({ ...person6, foodHabit: 'non-veg' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Red meat" value="red-meat" status={person6.foodHabit === 'red-meat' ? 'checked' : 'unchecked'} onPress={() => setPerson6({ ...person6, foodHabit: 'red-meat' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Snail" value="snail" status={person6.foodHabit === 'snail' ? 'checked' : 'unchecked'} onPress={() => setPerson6({ ...person6, foodHabit: 'snail' })} />
            </View>
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.gender}>
          <View style={formStyles.radioButtonContainer}>
          <RadioButton.Item style={formStyles.genderOp} label="Veg" value="veg" status={person7.foodHabit === 'veg' ? 'checked' : 'unchecked'} onPress={() => setPerson7({ ...person7, foodHabit: 'veg' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Non veg" value="non-veg" status={person7.foodHabit === 'non-veg' ? 'checked' : 'unchecked'} onPress={() => setPerson7({ ...person7, foodHabit: 'non-veg' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Red meat" value="red-meat" status={person7.foodHabit === 'red-meat' ? 'checked' : 'unchecked'} onPress={() => setPerson7({ ...person7, foodHabit: 'red-meat' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Snail" value="snail" status={person7.foodHabit === 'snail' ? 'checked' : 'unchecked'} onPress={() => setPerson7({ ...person7, foodHabit: 'snail' })} />
            </View>
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.gender}>
          <View style={formStyles.radioButtonContainer}>
          <RadioButton.Item style={formStyles.genderOp} label="Veg" value="veg" status={person8.foodHabit === 'veg' ? 'checked' : 'unchecked'} onPress={() => setPerson8({ ...person8, foodHabit: 'veg' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Non veg" value="non-veg" status={person8.foodHabit === 'non-veg' ? 'checked' : 'unchecked'} onPress={() => setPerson8({ ...person8, foodHabit: 'non-veg' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Red meat" value="red-meat" status={person8.foodHabit === 'red-meat' ? 'checked' : 'unchecked'} onPress={() => setPerson8({ ...person8, foodHabit: 'red-meat' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Snail" value="snail" status={person8.foodHabit === 'snail' ? 'checked' : 'unchecked'} onPress={() => setPerson8({ ...person8, foodHabit: 'snail' })} />
            </View>
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.gender}>
          <View style={formStyles.radioButtonContainer}>
          <RadioButton.Item style={formStyles.genderOp} label="Veg" value="veg" status={person9.foodHabit === 'veg' ? 'checked' : 'unchecked'} onPress={() => setPerson9({ ...person9, foodHabit: 'veg' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Non veg" value="non-veg" status={person9.foodHabit === 'non-veg' ? 'checked' : 'unchecked'} onPress={() => setPerson9({ ...person9, foodHabit: 'non-veg' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Red meat" value="red-meat" status={person9.foodHabit === 'red-meat' ? 'checked' : 'unchecked'} onPress={() => setPerson9({ ...person9, foodHabit: 'red-meat' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Snail" value="snail" status={person9.foodHabit === 'snail' ? 'checked' : 'unchecked'} onPress={() => setPerson9({ ...person9, foodHabit: 'snail' })} />
            </View>
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.gender}>
          <View style={formStyles.radioButtonContainer}>
          <RadioButton.Item style={formStyles.genderOp} label="Veg" value="veg" status={person10.foodHabit === 'veg' ? 'checked' : 'unchecked'} onPress={() => setPerson10({ ...person10, foodHabit: 'veg' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Non veg" value="non-veg" status={person10.foodHabit === 'non-veg' ? 'checked' : 'unchecked'} onPress={() => setPerson10({ ...person10, foodHabit: 'non-veg' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Red meat" value="red-meat" status={person10.foodHabit === 'red-meat' ? 'checked' : 'unchecked'} onPress={() => setPerson10({ ...person10, foodHabit: 'red-meat' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Snail" value="snail" status={person10.foodHabit === 'snail' ? 'checked' : 'unchecked'} onPress={() => setPerson10({ ...person10, foodHabit: 'snail' })} />
            </View>
          </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
        <DataTable.Cell style={formStyles.cell}>Water Source</DataTable.Cell>
          <DataTable.Cell style={formStyles.gender}>
          <View style={formStyles.radioButtonContainer}>
              <RadioButton.Item style={formStyles.genderOp} label="Well" value="well" status={person1.waterSource === 'well' ? 'checked' : 'unchecked'} onPress={() => setPerson1({ ...person1, waterSource: 'well' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Pond" value="pond" status={person1.waterSource === 'pond' ? 'checked' : 'unchecked'} onPress={() => setPerson1({ ...person1, waterSource: 'pond' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Ground Water" value="ground-water" status={person1.waterSource === 'ground-water' ? 'checked' : 'unchecked'} onPress={() => setPerson1({ ...person1, waterSource: 'ground-water' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Tap Water" value="tap-water" status={person1.waterSource === 'tap-water' ? 'checked' : 'unchecked'} onPress={() => setPerson1({ ...person1, waterSource: 'tap-water' })} />
            </View>
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.gender}>
          <View style={formStyles.radioButtonContainer}>
              <RadioButton.Item style={formStyles.genderOp} label="Well" value="well" status={person2.waterSource === 'well' ? 'checked' : 'unchecked'} onPress={() => setPerson2({ ...person2, waterSource: 'well' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Pond" value="pond" status={person2.waterSource === 'pond' ? 'checked' : 'unchecked'} onPress={() => setPerson2({ ...person2, waterSource: 'pond' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Ground Water" value="ground-water" status={person2.waterSource === 'ground-water' ? 'checked' : 'unchecked'} onPress={() => setPerson2({ ...person2, waterSource: 'ground-water' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Tap Water" value="tap-water" status={person2.waterSource === 'tap-water' ? 'checked' : 'unchecked'} onPress={() => setPerson2({ ...person2, waterSource: 'tap-water' })} />
            </View>
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.gender}>
          <View style={formStyles.radioButtonContainer}>
              <RadioButton.Item style={formStyles.genderOp} label="Well" value="well" status={person3.waterSource === 'well' ? 'checked' : 'unchecked'} onPress={() => setPerson3({ ...person3, waterSource: 'well' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Pond" value="pond" status={person3.waterSource === 'pond' ? 'checked' : 'unchecked'} onPress={() => setPerson3({ ...person3, waterSource: 'pond' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Ground Water" value="ground-water" status={person3.waterSource === 'ground-water' ? 'checked' : 'unchecked'} onPress={() => setPerson3({ ...person3, waterSource: 'ground-water' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Tap Water" value="tap-water" status={person3.waterSource === 'tap-water' ? 'checked' : 'unchecked'} onPress={() => setPerson3({ ...person3, waterSource: 'tap-water' })} />
            </View>
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.gender}>
          <View style={formStyles.radioButtonContainer}>
              <RadioButton.Item style={formStyles.genderOp} label="Well" value="well" status={person4.waterSource === 'well' ? 'checked' : 'unchecked'} onPress={() => setPerson4({ ...person4, waterSource: 'well' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Pond" value="pond" status={person4.waterSource === 'pond' ? 'checked' : 'unchecked'} onPress={() => setPerson4({ ...person4, waterSource: 'pond' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Ground Water" value="ground-water" status={person4.waterSource === 'ground-water' ? 'checked' : 'unchecked'} onPress={() => setPerson4({ ...person4, waterSource: 'ground-water' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Tap Water" value="tap-water" status={person4.waterSource === 'tap-water' ? 'checked' : 'unchecked'} onPress={() => setPerson4({ ...person4, waterSource: 'tap-water' })} />
            </View>
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.gender}>
          <View style={formStyles.radioButtonContainer}>
              <RadioButton.Item style={formStyles.genderOp} label="Well" value="well" status={person5.waterSource === 'well' ? 'checked' : 'unchecked'} onPress={() => setPerson5({ ...person5, waterSource: 'well' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Pond" value="pond" status={person5.waterSource === 'pond' ? 'checked' : 'unchecked'} onPress={() => setPerson5({ ...person5, waterSource: 'pond' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Ground Water" value="ground-water" status={person5.waterSource === 'ground-water' ? 'checked' : 'unchecked'} onPress={() => setPerson5({ ...person5, waterSource: 'ground-water' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Tap Water" value="tap-water" status={person5.waterSource === 'tap-water' ? 'checked' : 'unchecked'} onPress={() => setPerson5({ ...person5, waterSource: 'tap-water' })} />
            </View>
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.gender}>
          <View style={formStyles.radioButtonContainer}>
              <RadioButton.Item style={formStyles.genderOp} label="Well" value="well" status={person6.waterSource === 'well' ? 'checked' : 'unchecked'} onPress={() => setPerson6({ ...person6, waterSource: 'well' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Pond" value="pond" status={person6.waterSource === 'pond' ? 'checked' : 'unchecked'} onPress={() => setPerson6({ ...person6, waterSource: 'pond' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Ground Water" value="ground-water" status={person6.waterSource === 'ground-water' ? 'checked' : 'unchecked'} onPress={() => setPerson6({ ...person6, waterSource: 'ground-water' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Tap Water" value="tap-water" status={person6.waterSource === 'tap-water' ? 'checked' : 'unchecked'} onPress={() => setPerson6({ ...person6, waterSource: 'tap-water' })} />
            </View>
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.gender}>
          <View style={formStyles.radioButtonContainer}>
              <RadioButton.Item style={formStyles.genderOp} label="Well" value="well" status={person7.waterSource === 'well' ? 'checked' : 'unchecked'} onPress={() => setPerson7({ ...person7, waterSource: 'well' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Pond" value="pond" status={person7.waterSource === 'pond' ? 'checked' : 'unchecked'} onPress={() => setPerson7({ ...person7, waterSource: 'pond' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Ground Water" value="ground-water" status={person7.waterSource === 'ground-water' ? 'checked' : 'unchecked'} onPress={() => setPerson7({ ...person7, waterSource: 'ground-water' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Tap Water" value="tap-water" status={person7.waterSource === 'tap-water' ? 'checked' : 'unchecked'} onPress={() => setPerson7({ ...person7, waterSource: 'tap-water' })} />
            </View>
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.gender}>
          <View style={formStyles.radioButtonContainer}>
              <RadioButton.Item style={formStyles.genderOp} label="Well" value="well" status={person8.waterSource === 'well' ? 'checked' : 'unchecked'} onPress={() => setPerson8({ ...person8, waterSource: 'well' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Pond" value="pond" status={person8.waterSource === 'pond' ? 'checked' : 'unchecked'} onPress={() => setPerson8({ ...person8, waterSource: 'pond' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Ground Water" value="ground-water" status={person8.waterSource === 'ground-water' ? 'checked' : 'unchecked'} onPress={() => setPerson8({ ...person8, waterSource: 'ground-water' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Tap Water" value="tap-water" status={person8.waterSource === 'tap-water' ? 'checked' : 'unchecked'} onPress={() => setPerson8({ ...person8, waterSource: 'tap-water' })} />
            </View>
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.gender}>
          <View style={formStyles.radioButtonContainer}>
              <RadioButton.Item style={formStyles.genderOp} label="Well" value="well" status={person9.waterSource === 'well' ? 'checked' : 'unchecked'} onPress={() => setPerson9({ ...person9, waterSource: 'well' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Pond" value="pond" status={person9.waterSource === 'pond' ? 'checked' : 'unchecked'} onPress={() => setPerson9({ ...person9, waterSource: 'pond' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Ground Water" value="ground-water" status={person9.waterSource === 'ground-water' ? 'checked' : 'unchecked'} onPress={() => setPerson9({ ...person9, waterSource: 'ground-water' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Tap Water" value="tap-water" status={person9.waterSource === 'tap-water' ? 'checked' : 'unchecked'} onPress={() => setPerson9({ ...person9, waterSource: 'tap-water' })} />
            </View>
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.gender}>
          <View style={formStyles.radioButtonContainer}>
              <RadioButton.Item style={formStyles.genderOp} label="Well" value="well" status={person10.waterSource === 'well' ? 'checked' : 'unchecked'} onPress={() => setPerson10({ ...person10, waterSource: 'well' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Pond" value="pond" status={person10.waterSource === 'pond' ? 'checked' : 'unchecked'} onPress={() => setPerson10({ ...person10, waterSource: 'pond' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Ground Water" value="ground-water" status={person10.waterSource === 'ground-water' ? 'checked' : 'unchecked'} onPress={() => setPerson10({ ...person10, waterSource: 'ground-water' })} />
              <RadioButton.Item style={formStyles.genderOp} label="Tap Water" value="tap-water" status={person10.waterSource === 'tap-water' ? 'checked' : 'unchecked'} onPress={() => setPerson10({ ...person10, waterSource: 'tap-water' })} />
            </View>
          </DataTable.Cell>
          </DataTable.Row>
      </DataTable>
    </ScrollView>
      <TextInput
                label="Remark"
                value={remark}
                onChangeText={(text) => setRemark(text)}
                style={formStyles.textArea}
                multiline
                numberOfLines={4}
                placeholder='Remark from the invigilator...'
            />
      </>
          }
    </ScrollView>
      {/* <TouchableOpacity style={styles.submit} onPress={insertFamilyData} >
        <Text style={{color: "white", fontSize: 20}}>SUBMIT</Text>
      </TouchableOpacity> */}
    </>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 10,
  },
});

const styles = StyleSheet.create({
  top:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#d4a373",
    paddingHorizontal:10,
    marginHorizontal:10,
    marginVertical: 10
  },
  form:{
    backgroundColor: "#caf0f8",
    padding:10,
    marginVertical:20,
    borderRadius:20,
    elevation: 10,
    shadowRadius:20,
    borderColor: "#8ecae6",
    borderWidth: 4
  },
  container: {
    flex: 1,
    paddingHorizontal:10,
    backgroundColor: '#f5ebe0',
    color: "#d5bdaf",
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
    color: '#d4a373',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  halfWidth: {
    flex: 1,
    marginRight: 10,
  },
  submit:{
    backgroundColor: "green",
    padding:20,
    display: "flex",
    alignItems: "center",
    // margin:20,
    // borderRadius: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  searchData:{
    backgroundColor: "white",
    flex: 1,
    height:38,
    marginRight:10,
    borderRadius:10
  }
});

const formStyles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#d6ccc2",
  //   marginBottom:10
  },
  title: {
    width: 300, // Adjust as needed
    color: "white"
  },
  header: {
    backgroundColor: "#7f5539",
    color: "white"
  },
  cell: {
    width: 300, // Set the width of all cells
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    width: 300 // Adjust input width as needed
  },
  gender:{
      paddingHorizontal:10,
      // display:'flex',
      // flexWrap: "wrap",
  },
  genderOp:{
      backgroundColor:"#c2c5aa",
      margin:2,
      paddingHorizontal:2,
      paddingVertical:1,
      borderRadius:10,

  },
  radioButtonContainer: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: 'row',
      width: 300,
    },
    yesNo:{
      display: "flex",
      alignItems:"center"
    },
    textArea: {
      margin: 10,
      borderRadius:10,
      backgroundColor: 'white',
      height: 100,
      width:"70%",
      textAlignVertical: 'top',
      marginHorizontal:"auto"
    },
});

export default FormScreen;
