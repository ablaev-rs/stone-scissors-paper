import React from 'react'
import { } from 'react-native'
import { observer, useSession, useQueryDoc } from 'startupjs'
import './index.styl'
import RoomSelection from '../RoomSelection'
import ControlRoom from '../ControlRoom'
import GameRoom from '../GameRoom'

export default observer(function MainComponent ({ style }) {
  const [followUserId] = useSession('userId')
  const [isGameCreator, $isGameCreator] = useQueryDoc('gamesCollection', { creatorId: followUserId, status: 'open' })
  const [isUser1, $isUser1] = useQueryDoc('gamesCollection', { user1: followUserId, status: 'open' })
  const [isUser2, $isUser2] = useQueryDoc('gamesCollection', { user2: followUserId, status: 'open' })

  function sumPoints (points) {
    let sum = 0
    for (let i = 0; i < points.length; i++) {
      sum = sum + points[i]
    }
    return sum
  }

  return pug`
    if isGameCreator
      ControlRoom(followGame=isGameCreator $followGame=$isGameCreator sumPoints=sumPoints)
    else if isUser2 !== undefined && isUser2.user2
      GameRoom(followGame=isUser2 $followGame=$isUser2 sumPoints=sumPoints)  
    else if isUser1 !== undefined && isUser1.user1
      GameRoom(followGame=isUser1 $followGame=$isUser1 sumPoints=sumPoints)
    else
      RoomSelection
       
  `
})
