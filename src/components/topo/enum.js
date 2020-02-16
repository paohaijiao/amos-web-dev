let type = {
  INPUT: 'INPUT',
  FUNCTION: 'FUNCTION',
  ACTION: 'ACTION'
}

let bgColor = {
  INPUT: '#169ce4',
  FUNCTION: '#409EFF',
  ACTION: '#ffc539'
}

let icon = {
  DEVICE: require('./images/report.png'),
  CUSTOM_DATA: require('./images/online.png'),
  LOGIC_RULE: require('./images/condition.png'),
  ARITHMETIC: require('./images/caculator.png'),
  APP: require('./images/post.png'),
  HTTP: require('./images/http.png'),
  EMAIL: require('./images/email.png')
}

let portDelta = {
  INPUT_X: 0,
  Y: 15
}

export { type, bgColor, icon, portDelta }
