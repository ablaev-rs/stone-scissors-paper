import React from 'react'
import { View, Text } from 'react-native'
import { observer } from 'startupjs'
import './index.styl'

export default observer(function ControlRoom ({ followGame, sumPoints }) {
  let roundsNum = 1
  let pointsUser1 = followGame.roundsUser1
  let pointsUser2 = followGame.roundsUser2

  return pug`
    Text.textStyle Result Table

    View.rounds
      View
        Text.header Round
      View
        Text.header Player 1
      View
        Text.header Player 2  
    
    View.rounds
      View
        while roundsNum < 6
          View.row
            Text= roundsNum++
          
      View
        each points1 in pointsUser1
          View.row
            Text= points1

      View
        each points2 in pointsUser2
          View.row
            Text= points2
    
    View.rounds
      View
        Text.results Sum
      View
        Text.results= sumPoints(followGame.roundsUser1)
      View
        Text.results= sumPoints(followGame.roundsUser2)
            
  `
})
