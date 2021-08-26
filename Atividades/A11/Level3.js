function init(robot) {
  console.log('Robot initializing...')
  robot.jumpNext = true
}

function loop(robot) {
  if (robot.jumpNext) {
    robot.action = { type: 'jump', amount: 10 }
    robot.jumpNext = false
  } else {
    robot.action = { type: 'move', amount: 40 }
    robot.jumpNext = true
  }
}
