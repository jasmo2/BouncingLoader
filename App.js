import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import BouncingLoader from './lib/index.js'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BouncingLoader circles={3} delay={90} radius={15} speed={1200} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
})
