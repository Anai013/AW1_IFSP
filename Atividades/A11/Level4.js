function init(robot) {
  console.log('Robot initializing...')
}

function loop(robot) {
  if (400 < robot.info().x && robot.info().x < 500) {
    robot.action = { type: 'jump', amount: 10 }
  } else {
    robot.action = { type: 'move', amount: 40 }
  }
}
