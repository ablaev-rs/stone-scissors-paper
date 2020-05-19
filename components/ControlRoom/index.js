import React from 'react'
import { View, Button, Text } from 'react-native'
import { observer } from 'startupjs'
import './index.styl'
import ResultTable from '../ResultTable'

export default observer(function ControlRoom ({ followGame, $followGame, sumPoints }) {
  let disabledBtn
  let round = followGame.round
  let choiceUser1 = followGame.choiceUser1
  let choiceUser2 = followGame.choiceUser2
  let roundsUser1 = followGame.roundsUser1
  let roundsUser2 = followGame.roundsUser2

  if ((roundsUser1.length === roundsUser2.length) && choiceUser1 && choiceUser2 && round < 5) {
    disabledBtn = ''
  } else {
    disabledBtn = 'disabled'
  }

  function nextRoundHandler () {
    $followGame.set('choiceUser1', '')
    $followGame.set('choiceUser2', '')
    round++
    $followGame.set('round', round)
  }

  function closeGameHandler () {
    $followGame.set('status', 'close')
  }

  return pug`
    View.root
      Text.textStyle Game control. Round #{round}
      
      if roundsUser1.length === 5 && roundsUser2.length === 5
        Button(title = 'Close Game' onPress = closeGameHandler)
      else
        Button(title = 'Next Round' onPress = nextRoundHandler disabled = disabledBtn)

      ResultTable(followGame=followGame sumPoints=sumPoints)
            
  `
})
