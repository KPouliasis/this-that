import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  questionUpdate: ['field', 'text'],
  questionSubmit: ['questionText', 'leftText', 'rightText', 'leftImage', 'rightImage', 'respondents', 'expirationDate', 'expirationTime', 'userId'],
  questionSuccess: ['payload'],
  questionSetRespondents: ['respondents'],
  dispatchPhoto: ['photoUri'],
  questionFailure: null
})

export const QuestionFormTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  questionText: '',
  leftText: '',
  rightText: '',
  leftImage: '',
  rightImage: '',
  photoUri: '',
  respondents: [],
  expirationDate: '',
  expirationTime: '',
  isPublic: false
})

/* ------------- Reducers ------------- */

// update form text
export const update = (state, {field, text}) =>
  state.merge({ [field]: text })

// set respondents for question
export const submit = (state, {questionText, leftText, rightText, respondents, leftImage, rightImage, userId}) => state.merge({questionText, leftText, rightText, respondents, leftImage, rightImage})

// update form text
export const registerRespondents = (state, {respondents}) =>
  state.merge({respondents})

// send photo taken to question form
export const setPhotoUri = (state, {photoUri}) =>
  state.merge({photoUri})

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.QUESTION_UPDATE]: update,
  [Types.QUESTION_SET_RESPONDENTS]: registerRespondents,
  [Types.DISPATCH_PHOTO]: setPhotoUri,
  [Types.QUESTION_SUBMIT]: submit,
  [Types.QUESTION_REQUEST]: request,
  [Types.QUESTION_SUCCESS]: success,
  [Types.QUESTION_FAILURE]: failure
})
