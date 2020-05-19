import React, { useState } from 'react'
import { View, Button, Text } from 'react-native'
import { observer, useSession } from 'startupjs'
import { Radio, Alert } from '@startupjs/ui'
import './index.styl'
import ResultTable from '../ResultTable'

export default observer(function GameRoom ({ followGame, $followGame, sumPoints }) {
  let message
  let disabledBtn = ''
  let roundPoints = []
  let gameOver = false
  const [userId] = useSession('userId')
  const [selectedItem, setSelectedItem] = useState('Stone')
  if ((followGame.roundsUser1.length === 5) && (followGame.roundsUser2.length === 5)) {
    gameOver = true
  }

  if (userId === followGame.user1) {
    if (gameOver) {
      if (sumPoints(followGame.roundsUser1) > sumPoints(followGame.roundsUser2)) {
        message = 'You win!'
      } else if (sumPoints(followGame.roundsUser1) < sumPoints(followGame.roundsUser2)) {
        message = 'You lose!'
      } else {
        message = 'Draw'
      }
    } else if (followGame.choiceUser1) {
      disabledBtn = 'disabled'
      message = 'Wait please'
    }
  } else if (userId === followGame.user2) {
    if (gameOver) {
      if (sumPoints(followGame.roundsUser1) > sumPoints(followGame.roundsUser2)) {
        message = 'You lose!'
      } else if (sumPoints(followGame.roundsUser1) < sumPoints(followGame.roundsUser2)) {
        message = 'You win!'
      } else {
        message = 'Draw'
      }
    } else if (followGame.choiceUser2) {
      disabledBtn = 'disabled'
      message = 'Wait please'
    }
  }

  function getPoints (choise1, choise2) {
    if ((choise1 === 'Stone' && choise2 === 'Stone') || (choise2 === 'Stone' && choise1 === 'Stone')) {
      roundPoints.push(0, 0)
    } else if ((choise1 === 'Scissors' && choise2 === 'Scissors') || (choise2 === 'Scissors' && choise1 === 'Scissors')) {
      roundPoints.push(0, 0)
    } else if ((choise1 === 'Paper' && choise2 === 'Paper') || (choise2 === 'Paper' && choise1 === 'Paper')) {
      roundPoints.push(0, 0)
    } else if (choise1 === 'Stone' && choise2 === 'Scissors') {
      roundPoints.push(1, 0)
    } else if (choise1 === 'Scissors' && choise2 === 'Stone') {
      roundPoints.push(0, 1)
    } else if (choise1 === 'Stone' && choise2 === 'Paper') {
      roundPoints.push(0, 1)
    } else if (choise1 === 'Paper' && choise2 === 'Stone') {
      roundPoints.push(1, 0)
    } else if (choise1 === 'Scissors' && choise2 === 'Paper') {
      roundPoints.push(1, 0)
    } else if (choise1 === 'Paper' && choise2 === 'Scissors') {
      roundPoints.push(0, 1)
    }
    return roundPoints
  }

  function saveChoice () {
    if (userId === followGame.user1) {
      $followGame.set('choiceUser1', selectedItem)
    } else if (userId === followGame.user2) {
      $followGame.set('choiceUser2', selectedItem)
    } else {
      console.log('mistake')
    }

    if (followGame.choiceUser1 && followGame.choiceUser2) {
      getPoints(followGame.choiceUser1, followGame.choiceUser2)
      $followGame.push('roundsUser1', roundPoints[0])
      $followGame.push('roundsUser2', roundPoints[1])
    }
  }

  return pug`
    View.root
      if gameOver
        Text.textStyle Game Over
      else
        Text.textStyle Round #{followGame.round}
        Text.textStyle Make your choice

        Radio.versions(
          value = selectedItem
          onChange = (value) => setSelectedItem(value)
          data = [
            { value: 'Stone', label: 'Stone' }, 
            { value: 'Scissors', label: 'Scissors' }, 
            { value: 'Paper', label: 'Paper' }
          ])

      if message
        Alert(label=message)
      else
        Button.btn(title='Choose' onPress = saveChoice disabled = disabledBtn)

      ResultTable(followGame=followGame sumPoints=sumPoints)
  `
})
