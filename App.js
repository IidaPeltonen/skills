import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import Slider from '@react-native-community/slider'
import { Col, Grid } from 'react-native-easy-grid'
import { useEffect, useState } from 'react'

const SKILLS = ['Fronend', 'Backend', 'Mobile', 'Databases']
const MIN = 0
const MAX = 5

export default function App () {
  //const [value, setValue] = useState(0)
  const [values, setValues] = useState(new Array(SKILLS.length).fill(0))
  const [average, setAverage] = useState(0)

  const setSkillValue = (val,i) => {
    let skillValues = [...values]
    skillValues[i] = val
    setValues(skillValues)
  }

  const calculateAverageSkill = () => {
    const sum = values.reduce((a,b) => a + b, 0)
    const avg = (sum / values.length) || 0
    setAverage(avg)
  }

  useEffect(() => {
    calculateAverageSkill()
  }, [values])

  const items = []
  for (let i = 0; i < SKILLS.length; i++) {
    items.push(
      <View key={'item' + i} style={styles.skills}>
        <Text style={styles.skill}>{SKILLS[i]}</Text>
        <Text style={styles.value}>Skill: {values[i]}</Text>
        <Grid style={styles.grid}>
          <Col size={5}><Text>{MIN}</Text></Col>
          <Col size={90}>
            <Slider
              style={styles.slider}
              minimumValue={MIN}
              maximumValue={MAX}
              step={1}
              value={values[i]}
              minimumTrackTintColor='#006666'
              maximumTrackTintColor='#ff9900'
              onValueChange={(val) => setSkillValue(val,i)}
            />
          </Col>
          <Col size={5}><Text>{MAX}</Text></Col>
        </Grid>
      </View>
    )
  }



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Skill set</Text>
        <View>{items}</View>
        <Text style={styles.averageHeader}>Average</Text>
        <Text style={styles.averageValue}>{average}</Text>
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 40,
    justifyContent: 'center'
  },
  skills: {
    alignItems: 'center'
  },
  header: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold'
  },
  grid: {
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center'
  },
  skill: {
    marginTop: 10,
    fontSize: 25
  },
  slider: {
    width: 280,
    height: 40
  },
  value: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 20
  },
  averageHeader: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 25
  },
  averageValue: {
    textAlign:   'center',
    marginTop: 10,
    fontSize: 40
  }
})
