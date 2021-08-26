function init(robot) {
  console.log('Robot initializing...')
}

function loop(robot) {
  if (
    (360 < robot.info().x && robot.info().x < 500) ||
    (560 < robot.info().x && robot.info().x < 760)
  ) {
    robot.action = { type: 'jump', amount: 10 }
  } else {
    robot.action = { type: 'move', amount: 40 }
  }
}
