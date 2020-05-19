import React, { useState } from 'react'
import { View, TextInput, Button, Text } from 'react-native'
import { observer, useQuery, useValue, useSession, $root, useDoc } from 'startupjs'
import './index.styl'
import { } from '@startupjs/ui'
import RoomItem from './RoomItem'
import ErrorMessage from '../ErrorMessage'

export default observer(function RoomSelection ({ style }) {
  const [games, $games] = useQuery('gamesCollection', {})
  if (!games) throw $games.addSelf() // custom ORM method (see /model/)

  let error = ''

  /* CREATE ROOM */
  const [userId, $userId] = useSession('userId')

  const defaultRoom = {
    idGame: games.length + 1,
    creatorId: '',
    user1: '',
    user2: '',
    roundsUser1: [],
    roundsUser2: [],
    choiceUser1: '',
    choiceUser2: '',
    round: 1,
    status: 'open'
  }

  const [createRoom, $createRoom] = useValue(defaultRoom)

  function createRoomHandler () {
    $createRoom.set('creatorId', userId)
    $root.add('gamesCollection', createRoom)
  }
  /* / */

  /* ENTER THE GAME */
  let [selectedGame, setSelectedGame] = useState('')

  function setSelectedGameHandler (id) {
    setSelectedGame(id)
  }

  async function joinGameHandler () {
    const $game = $root.scope('gamesCollection.' + selectedGame)
    await $game.subscribe()
    const game = $game.get()

    if (!game) {
      alert('The game does not exist')
    } else {
      if (!game.user1) {
        $game.set('user1', userId)
      } else if (!game.user2) {
        $game.set('user2', userId)
      } else {
        alert('The game is started. Create a new game')
      }
    }
  }
  /* / */

  return pug`
    View.root

      Text.textStyle Create room

      View.createRoom
        Button(title = 'Create room' onPress = createRoomHandler)

      Text.textStyle or select an existing 
      
        ErrorMessage(error=error)
    
      View.enterBlock
        TextInput.inputField(
          placeholder = 'Enter the room number to join'
          value = selectedGame
          onChangeText  = setSelectedGameHandler)
        Button(title = 'Join' onPress = joinGameHandler)
      
      Text.textStyle Existing Rooms

      View.listRooms
        if games.length
          each game in games
            View.room(key = game.idGame)
              RoomItem(gameId=game.idGame status=game.status user1=game.user1 user2=game.user2 id=game.id)
        else
          Text Sorry, nothing found
            
  `
})
