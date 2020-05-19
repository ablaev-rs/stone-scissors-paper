import React from 'react'
import { Text, View } from 'react-native'
import { observer } from 'startupjs'
import './index.styl'

export default observer(function RoomItem ({ gameId, status, user1, user2, id }) {
  let players
  if (user2) {
    players = 2
  } else if (user1) {
    players = 1
  } else { players = 0 }

  return pug`
    View.rounds
      View
        Text #{id}
    View.rounds
      View
        Text Players #{players}/2
      View
        Text Status: #{status}
            
  `
})
