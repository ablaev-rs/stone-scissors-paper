import React from 'react'
import { Text } from 'react-native'
import { observer } from 'startupjs'
import './index.styl'

export default observer(function ErrorMessage ({ error }) {

  return pug`
    Text= error
  `
})
