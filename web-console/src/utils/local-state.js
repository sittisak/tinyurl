

const keyState = 'state'

const localState = {
  load: () => {
    try {
      const state = localStorage.getItem(keyState)
      return JSON.parse(state) || {}
    } catch (error) {
      return {}
    }
  },
  save: (json) => {
    const state = JSON.stringify(json)
    localStorage.setItem(keyState, state)
  },
  clean: () => localStorage.removeItem(keyState),
}

export default localState