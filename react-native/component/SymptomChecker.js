import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import RNMultiSelect, {
  IMultiSelectDataTypes,
} from '@freakycoder/react-native-multiple-select'
import settings from './infermedica/setting'
import { Picker } from '@react-native-picker/picker'

export default function SymptomChecker(props) {
  const [response, updateResponse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [patient, setPatient] = useState({
    sex: 'male',
    age: 20,
    evidence: [],
  })
  const [newQuestionStartIndex, setNewQuestionStartIndex] = useState(0)

  // console.log(patient)
  // console.log(response)
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height

  React.useEffect(() => {
    const addEvidence = () => {
      if (!response || response['should_stop']) {
        return
      }
      const question = response['question']
      if (question['type'] == 'group_single ') {
      } else {
        var newEvidence = patient['evidence']
        setNewQuestionStartIndex(newEvidence.length)
        for (const q of question['items']) {
          newEvidence.push({ id: q['id'], choice_id: q['choices'][0]['id'] })
        }
        setPatient({ ...patient, evidence: newEvidence })
        setLoading(false)
      }
    }
    addEvidence()
  }, [response])

  function diagnosis(obj) {
    fetch('https://api.infermedica.com/covid19/diagnosis', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'App-Id': settings['app-id'],
        'App-Key': settings['app-key'],
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        setLoading(true)
        updateResponse(data)
      })
  }

  function SetAgeAndGender() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Symtom Checker
          </Text>
        </View>
        <View style={styles.text}>
          <Text>Age</Text>
        </View>
        <View style={styles.input}>
          <Input
            placeholder={'20'}
            onChangeText={(value) =>
              setPatient({ ...patient, age: parseFloat(value) })
            }
          />
        </View>

        <View style={styles.text}>
          <Text>Gender</Text>
        </View>
        <View style={{ marginLeft: 12 }}>
          <Picker
            selectedValue={patient.sex}
            style={{ height: 60, width: 380 }}
            onValueChange={(itemValue, itemIndex) => {
              setPatient({ ...patient, sex: itemValue })
            }}
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>

        <NextButton />
      </View>
    )
  }

  function NextButton() {
    return (
      <View style={styles.loginButton}>
        <Button title="Next" onPress={() => diagnosis(patient)} />
      </View>
    )
  }

  function getSelectedValue(choiceId, choices) {
    // console.log(choices)
    for (const c of choices) {
      if (c['id'] == choiceId) {
        return c['label']
      }
    }
    console.log('error in getSelectedValue')
  }

  function GroupedSingleQuestion() {
    return <></>
  }

  function GroupedMulQuestion(props) {
    // console.log(loading)
    // console.log(patient.evidence)
    return (
      <View style={styles.container}>
        {props.question['items'].map((item, i) => (
          <View key={i}>
            <View style={styles.text}>
              <Text>{item['name']}</Text>
            </View>
            <View style={{ marginLeft: 20 }}>
              <Picker
                style={{ height: 60, width: 380 }}
                selectedValue={
                  patient.evidence[newQuestionStartIndex + i]['choice_id']
                }
                onValueChange={(itemValue, itemIndex) => {
                  var newEvidence = patient['evidence']
                  newEvidence[newQuestionStartIndex + i][
                    'choice_id'
                  ] = itemValue
                  setPatient({ ...patient, evidence: newEvidence })
                }}
              >
                {item['choices'].map((choice, j) => (
                  <Picker.Item
                    key={j}
                    label={choice['label']}
                    value={choice['id']}
                  />
                ))}
              </Picker>
            </View>
          </View>
        ))}
        <NextButton />
      </View>
    )
  }

  function Result() {
    return <></>
  }

  function FollowUp() {
    if (response['should_stop']) {
      return <Result />
    }
    if (loading) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      )
    }
    const question = response['question']
    if (question['type'] == 'group_multiple') {
      return <GroupedMulQuestion question={question} />
    } else if (question['type'] == 'single') {
      return <GroupedMulQuestion question={question} />
    } else {
      return <GroupedSingleQuestion question={question} />
    }
  }

  return !response ? (
    <SetAgeAndGender />
  ) : (
    <>
      <FollowUp />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },

  scrollView: {
    marginBottom: 20,
  },

  title: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  input: { marginLeft: 10, marginRight: 10 },

  loginButton: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 20,
  },

  text_link: {
    color: '#6EC5E9',
  },
})
