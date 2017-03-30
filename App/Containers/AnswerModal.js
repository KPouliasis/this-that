import React from 'react'
import { View, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Form, Item, Input } from 'native-base'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
// import styles from './Styles/AnswerModalStyle'

export default class AnswerModal extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      modal: false
    }
    this.modalOn = this.modalOn.bind(this)
    this.modalCancel = this.modalCancel.bind(this)
  }
  componentDidMount () {
    this.setState({modal: this.props.modal})
    console.log('COMPONENT DID MOUNT', this.state)
  }
  modalOn () {
    this.setState({modal: true})
  }
  modalCancel () {
    this.setState({modal: false})
    Actions.pop()
  }
  render () {
    console.log('RENDERING MODAL', this.state)
    if (this.state.modal) {
      return (
        <View>
          <Form>
            <Item last>
              <Input placeholder='Add Comment Here' />
            </Item>
          </Form>
          <Text onPress={this.modalCancel}> CANCEL </Text>
          <Text onPress={
            () => {
              this.props.onClickSubmit(this.state.comment)
              Actions.pop()
            }}> Submit </Text>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }
}
