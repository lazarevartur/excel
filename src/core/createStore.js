export class CreateStore {
  constructor(rootReducer, initalState = {}) {
    this.state = rootReducer({...initalState}, {type: '__INIT__'})
    this.listeners = []
    this.rootReducer = rootReducer
  }
  subscribe(fn) {
    this.listeners.push(fn)
    return {
      unsubscribe() {
        this.listeners = this.listeners.filter((l) => l !== fn)
      }
    }
  }
  dispatch(action) {
    this.state = this.rootReducer(this.state, action)
    this.listeners.forEach((l) => l(this.state))
  }
  getState() {
    return this.state
  }
}


/*
 export function createStore2(rootReducer, initalState = {}) {
   let state = rootReducer({...initalState}, {type: '__INIT__'})
   let listeners = []
   return {
     subscribe(fn) {
       listeners.push(fn)
       return {
         unsubscribe() {
           listeners = listeners.filter((listener) => listener !== fn )
         }
       }
     },
     dispatch(action) {
       state = rootReducer(state, action)
       listeners.forEach((listener) => listener(state))
     },
     getState() {
       return state
     }
   }
 }
*/
