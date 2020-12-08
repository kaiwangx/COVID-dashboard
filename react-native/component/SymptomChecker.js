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
  const [result, updateResult] = useState(null)

  console.log(patient)
  // console.log(response)
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height

  React.useEffect(() => {
    const addEvidence = () => {
      if (!response || response['should_stop']) {
        return
      }
      const question = response['question']
      var newEvidence = patient['evidence']
      setNewQuestionStartIndex(newEvidence.length)
      if (question['type'] == 'group_single') {
        newEvidence.push({
          id: question['items'][0]['id'],
          choice_id: 'present',
        })
      } else {
        for (const q of question['items']) {
          newEvidence.push({ id: q['id'], choice_id: q['choices'][1]['id'] })
        }
      }
      setPatient({ ...patient, evidence: newEvidence })
      setLoading(false)
    }
    addEvidence()
  }, [response])

  function reset() {
    updateResponse(null)
    setLoading(true)
    setPatient({
      sex: 'male',
      age: 20,
      evidence: [],
    })
    updateResult(null)
    setNewQuestionStartIndex(0)
  }

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

  function getResult(obj) {
    fetch('https://api.infermedica.com/covid19/triage', {
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
        // setLoading(true)
        updateResult(data)
      })
  }

  function SetAgeAndGender() {
    const [age, setAge] = useState(20)
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
            Symptom Checker
          </Text>
        </View>
        <View style={styles.text}>
          <Text>Age</Text>
        </View>
        <View style={styles.input}>
          <Input
            placeholder={'20'}
            onChangeText={(value) => setAge(parseFloat(value))}
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

        <View style={styles.loginButton}>
          <Button
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            title="Next"
            onPress={() => {
              setPatient({ ...patient, age: age })
              diagnosis(patient)
            }}
          />
        </View>
      </View>
    )
  }

  function NextButton() {
    return (
      <View style={styles.loginButton}>
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          title="Next"
          onPress={() => diagnosis(patient)}
        />
      </View>
    )
  }

  function StartOverButton() {
    return (
      <View style={styles.loginButton}>
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          title="Start over"
          onPress={() => reset()}
        />
      </View>
    )
  }

  function GroupedSingleQuestion(props) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.title}>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
              Choose one of the following
            </Text>
          </View>
          <View style={{ marginLeft: 20 }}>
            <Picker
              style={{ height: 60, width: 380 }}
              selectedValue={patient.evidence[newQuestionStartIndex]['id']}
              onValueChange={(itemValue, itemIndex) => {
                var newEvidence = patient['evidence']
                newEvidence[newQuestionStartIndex]['id'] = itemValue
                // newEvidence[newQuestionStartIndex]['choice_id'] = 'present'
                setPatient({ ...patient, evidence: newEvidence })
              }}
            >
              {props.question['items'].map((symptom, j) => (
                <Picker.Item
                  key={j}
                  label={symptom['name']}
                  value={symptom['id']}
                />
              ))}
            </Picker>
          </View>
          <NextButton />
          <StartOverButton />
        </ScrollView>
      </View>
    )
  }

  function GroupedMulQuestion(props) {
    // console.log(loading)
    // console.log(patient.evidence)
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.title}>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
              {props.question['text']}
            </Text>
          </View>
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
          <StartOverButton />
        </ScrollView>
      </View>
    )
  }

  function Result() {
    console.log(result)
    return result ? (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            {result['label']}
          </Text>
        </View>
        <View style={styles.text}>
          <Text>{result['description']}</Text>
        </View>
        <StartOverButton />
      </View>
    ) : (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text>Loading</Text>
        </View>
      </View>
    )
  }

  function FollowUp() {
    if (response['should_stop']) {
      if (!result) {
        getResult(patient)
      }
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
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
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

  button: {
    backgroundColor: '#fcc9c0',
  },

  buttonTitle: {
    color: '#000',
    fontSize: 18,
  },

  text_link: {
    color: '#6EC5E9',
  },
})
