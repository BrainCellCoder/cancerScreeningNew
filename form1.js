import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, ScrollView } from 'react-native';
import { DataTable,RadioButton } from 'react-native-paper';

const Form1 = () => {
  const [person1, setPerson1] = useState({ name: '', sharingDetails: '', presentInSameAdd: false, ifNoWhere: '', age: '', gender: '', phNo: '', education: '', medicalHis: '', earningMem: '', occupation: '', salary: '', cancerHis: '', whenWasDiag:'', whichSite:'', conditionNow: '', lastTimeVis: '', howKnowCancer: '', howCancerCaused: '', areYouAware: false, cancerSymp: '', isCancerCommuni: false, awareCancerScreen: false, isCancerTreatable: false, foodHabit:'', waterSource:'', remark:''});
  const [person2, setPerson2] = useState({ name: '', sharingDetails: '', presentInSameAdd: false, ifNoWhere: '', age: '', gender: '', phNo: '', education: '', medicalHis: '', earningMem: '', occupation: '', salary: '', cancerHis: '', whenWasDiag:'', whichSite:'', conditionNow: '', lastTimeVis: '', howKnowCancer: '', howCancerCaused: '', areYouAware: false, cancerSymp: '', isCancerCommuni: false, awareCancerScreen: false, isCancerTreatable: false, foodHabit:'', waterSource:'', remark:'' });
  const [person3, setPerson3] = useState({ name: '', sharingDetails: '', presentInSameAdd: false, ifNoWhere: '', age: '', gender: '', phNo: '', education: '', medicalHis: '', earningMem: '', occupation: '', salary: '', cancerHis: '', whenWasDiag:'', whichSite:'', conditionNow: '', lastTimeVis: '', howKnowCancer: '', howCancerCaused: '', areYouAware: false, cancerSymp: '', isCancerCommuni: false, awareCancerScreen: false, isCancerTreatable: false, foodHabit:'', waterSource:'', remark:'' });
  const [person4, setPerson4] = useState({ name: '', sharingDetails: '', presentInSameAdd: false, ifNoWhere: '', age: '', gender: '', phNo: '', education: '', medicalHis: '', earningMem: '', occupation: '', salary: '', cancerHis: '', whenWasDiag:'', whichSite:'', conditionNow: '', lastTimeVis: '', howKnowCancer: '', howCancerCaused: '', areYouAware: false, cancerSymp: '', isCancerCommuni: false, awareCancerScreen: false, isCancerTreatable: false, foodHabit:'', waterSource:'', remark:'' });
    console.log(person1)
  return (
    <ScrollView style={formStyles.container} horizontal>
      <DataTable>
        <DataTable.Header style={formStyles.header}>
          <DataTable.Title style={formStyles.title} textStyle={{ color: "white" }}>Questions</DataTable.Title>
          <DataTable.Title style={formStyles.title} textStyle={{ color: "white" }}>Person 1</DataTable.Title>
          <DataTable.Title style={formStyles.title} textStyle={{ color: "white" }}>Person 2</DataTable.Title>
          <DataTable.Title style={formStyles.title} textStyle={{ color: "white" }}>Person 3</DataTable.Title>
          <DataTable.Title style={formStyles.title} textStyle={{ color: "white" }}>Person 4</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell style={formStyles.cell}>Name</DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person1.name}
              onChangeText={(text) => setPerson1({ ...person1, name: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.name}
              onChangeText={(text) => setPerson2({ ...person2, name: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.name}
              onChangeText={(text) => setPerson3({ ...person3, name: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.name}
              onChangeText={(text) => setPerson4({ ...person4, name: text })}
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
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.sharingDetails}
              onChangeText={(text) => setPerson2({ ...person2, sharingDetails: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.sharingDetails}
              onChangeText={(text) => setPerson3({ ...person3, sharingDetails: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.sharingDetails}
              onChangeText={(text) => setPerson4({ ...person4, sharingDetails: text })}
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
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person2.presentInSameAdd}
              onValueChange={(value) => setPerson2({ ...person2, presentInSameAdd: value })}
            />
            <Text>Yes</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person3.presentInSameAdd}
              onValueChange={(value) => setPerson3({ ...person3, presentInSameAdd: value })}
            />
            <Text>Yes</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person4.presentInSameAdd}
              onValueChange={(value) => setPerson4({ ...person4, presentInSameAdd: value })}
            />
            <Text>Yes</Text>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell style={formStyles.cell}>If yes where</DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person1.ifNoWhere}
              onChangeText={(text) => setPerson1({ ...person1, ifNoWhere: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.ifNoWhere}
              onChangeText={(text) => setPerson2({ ...person2, ifNoWhere: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.ifNoWhere}
              onChangeText={(text) => setPerson3({ ...person3, ifNoWhere: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.ifNoWhere}
              onChangeText={(text) => setPerson4({ ...person4, ifNoWhere: text })}
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
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.age}
              onChangeText={(text) => setPerson2({ ...person2, age: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.age}
              onChangeText={(text) => setPerson3({ ...person3, age: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.age}
              onChangeText={(text) => setPerson4({ ...person4, age: text })}
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
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={formStyles.cell}>Phone Number</DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person1.phNo}
              onChangeText={(text) => setPerson1({ ...person1, phNo: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.phNo}
              onChangeText={(text) => setPerson2({ ...person2, phNo: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.phNo}
              onChangeText={(text) => setPerson3({ ...person3, phNo: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.phNo}
              onChangeText={(text) => setPerson4({ ...person4, phNo: text })}
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
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.education}
              onChangeText={(text) => setPerson2({ ...person2, education: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.education}
              onChangeText={(text) => setPerson3({ ...person3, education: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.education}
              onChangeText={(text) => setPerson4({ ...person4, education: text })}
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
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.medicalHis}
              onChangeText={(text) => setPerson2({ ...person2, medicalHis: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.medicalHis}
              onChangeText={(text) => setPerson3({ ...person3, medicalHis: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.medicalHis}
              onChangeText={(text) => setPerson4({ ...person4, medicalHis: text })}
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
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.earningMem}
              onChangeText={(text) => setPerson2({ ...person2, earningMem: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.earningMem}
              onChangeText={(text) => setPerson3({ ...person3, earningMem: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.earningMem}
              onChangeText={(text) => setPerson4({ ...person4, earningMem: text })}
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
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.occupation}
              onChangeText={(text) => setPerson2({ ...person2, occupation: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.occupation}
              onChangeText={(text) => setPerson3({ ...person3, occupation: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.occupation}
              onChangeText={(text) => setPerson4({ ...person4, occupation: text })}
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
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.salary}
              onChangeText={(text) => setPerson2({ ...person2, salary: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.salary}
              onChangeText={(text) => setPerson3({ ...person3, salary: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.salary}
              onChangeText={(text) => setPerson4({ ...person4, salary: text })}
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
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.cancerHis}
              onChangeText={(text) => setPerson2({ ...person2, cancerHis: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.cancerHis}
              onChangeText={(text) => setPerson3({ ...person3, cancerHis: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.cancerHis}
              onChangeText={(text) => setPerson4({ ...person4, cancerHis: text })}
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
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.whenWasDiag}
              onChangeText={(text) => setPerson2({ ...person2, whenWasDiag: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.whenWasDiag}
              onChangeText={(text) => setPerson3({ ...person3, whenWasDiag: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.whenWasDiag}
              onChangeText={(text) => setPerson4({ ...person4, whenWasDiag: text })}
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
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.whichSite}
              onChangeText={(text) => setPerson2({ ...person2, whichSite: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.whichSite}
              onChangeText={(text) => setPerson3({ ...person3, whichSite: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.whichSite}
              onChangeText={(text) => setPerson4({ ...person4, whichSite: text })}
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
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.conditionNow}
              onChangeText={(text) => setPerson2({ ...person2, conditionNow: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.conditionNow}
              onChangeText={(text) => setPerson3({ ...person3, conditionNow: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.conditionNow}
              onChangeText={(text) => setPerson4({ ...person4, conditionNow: text })}
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
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.lastTimeVis}
              onChangeText={(text) => setPerson2({ ...person2, lastTimeVis: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.lastTimeVis}
              onChangeText={(text) => setPerson3({ ...person3, lastTimeVis: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.lastTimeVis}
              onChangeText={(text) => setPerson4({ ...person4, lastTimeVis: text })}
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
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.howKnowCancer}
              onChangeText={(text) => setPerson2({ ...person2, howKnowCancer: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.howKnowCancer}
              onChangeText={(text) => setPerson3({ ...person3, howKnowCancer: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.howKnowCancer}
              onChangeText={(text) => setPerson4({ ...person4, howKnowCancer: text })}
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
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.howCancerCaused}
              onChangeText={(text) => setPerson2({ ...person2, howCancerCaused: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.howCancerCaused}
              onChangeText={(text) => setPerson3({ ...person3, howCancerCaused: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.howCancerCaused}
              onChangeText={(text) => setPerson4({ ...person4, howCancerCaused: text })}
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
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person2.areYouAware}
              onValueChange={(value) => setPerson2({ ...person2, areYouAware: value })}
            />
            <Text>Yes</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person3.areYouAware}
              onValueChange={(value) => setPerson3({ ...person3, areYouAware: value })}
            />
            <Text>Yes</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person4.areYouAware}
              onValueChange={(value) => setPerson4({ ...person4, areYouAware: value })}
            />
            <Text>Yes</Text>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={formStyles.cell}>If yes, what are the symptoms of cancer</DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person1.cancerSymp}
              onChangeText={(text) => setPerson1({ ...person1, cancerSymp: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person2.cancerSymp}
              onChangeText={(text) => setPerson2({ ...person2, cancerSymp: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person3.cancerSymp}
              onChangeText={(text) => setPerson3({ ...person3, cancerSymp: text })}
            />
          </DataTable.Cell>
          <DataTable.Cell style={formStyles.cell}>
            <TextInput
              style={formStyles.input}
              value={person4.cancerSymp}
              onChangeText={(text) => setPerson4({ ...person4, cancerSymp: text })}
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
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person2.isCancerCommuni}
              onValueChange={(value) => setPerson2({ ...person2, isCancerCommuni: value })}
            />
            <Text>Yes</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person3.isCancerCommuni}
              onValueChange={(value) => setPerson3({ ...person3, isCancerCommuni: value })}
            />
            <Text>Yes</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person4.isCancerCommuni}
              onValueChange={(value) => setPerson4({ ...person4, isCancerCommuni: value })}
            />
            <Text>Yes</Text>
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
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person2.awareCancerScreen}
              onValueChange={(value) => setPerson2({ ...person2, awareCancerScreen: value })}
            />
            <Text>Yes</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person3.awareCancerScreen}
              onValueChange={(value) => setPerson3({ ...person3, awareCancerScreen: value })}
            />
            <Text>Yes</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person4.awareCancerScreen}
              onValueChange={(value) => setPerson4({ ...person4, awareCancerScreen: value })}
            />
            <Text>Yes</Text>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={formStyles.cell}>Is cancer treatable/curable</DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person1.isCancerTreatable}
              onValueChange={(value) => setPerson1({ ...person1, isCancerTreatable: value })}
            />
            <Text>Yes</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person2.isCancerTreatable}
              onValueChange={(value) => setPerson2({ ...person2, isCancerTreatable: value })}
            />
            <Text>Yes</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person3.isCancerTreatable}
              onValueChange={(value) => setPerson3({ ...person3, isCancerTreatable: value })}
            />
            <Text>Yes</Text>
          </DataTable.Cell>
          <DataTable.Cell style={[formStyles.cell, formStyles.yesNo]}>
          <Text>No</Text>
            <Switch
              value={person4.isCancerTreatable}
              onValueChange={(value) => setPerson4({ ...person4, isCancerTreatable: value })}
            />
            <Text>Yes</Text>
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
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell style={formStyles.cell}>Remark from the invigilator</DataTable.Cell>
            <DataTable.Cell>
            <TextInput
                label="Additional Information"
                value={person1.remark}
                onChangeText={(text) => setPerson1({...person1, remark: text})}
                style={formStyles.textArea}
                multiline
                numberOfLines={4}
            />
            </DataTable.Cell>
            <DataTable.Cell>
            <TextInput
                label="Additional Information"
                value={person2.remark}
                onChangeText={(text) => setPerson1({...person2, remark: text})}
                style={formStyles.textArea}
                multiline
                numberOfLines={4}
            />
            </DataTable.Cell>
            <DataTable.Cell>
            <TextInput
                label="Additional Information"
                value={person3.remark}
                onChangeText={(text) => setPerson1({...person3, remark: text})}
                style={formStyles.textArea}
                multiline
                numberOfLines={4}
            />
            </DataTable.Cell>
            <DataTable.Cell>
            <TextInput
                label="Additional Information"
                value={person3.remark}
                onChangeText={(text) => setPerson1({...person3, remark: text})}
                style={formStyles.textArea}
                multiline
                numberOfLines={4}
            />
            </DataTable.Cell>
            
          </DataTable.Row>
      </DataTable>
    </ScrollView>
  );
};

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
        width:300,
        textAlignVertical: 'top',
      },
  });
  

export default Form1;
