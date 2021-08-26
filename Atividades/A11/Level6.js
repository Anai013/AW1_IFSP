function init(robot) {
  console.log('Robot initializing...')
}

function loop(robot) {
  robot.action = { type: 'move', amount: 40 }
  if (robot.info().coins % 2 == 1) {
    robot.action.amount = -40
  }
}
