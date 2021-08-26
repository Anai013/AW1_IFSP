function init(robot) {
  console.log('Robot initializing...')
  robot.iterationsAfterCoin = 0
}

function loop(robot) {
  if (robot.iterationsAfterCoin > 4) {
    robot.action = { type: 'jump', amount: 10 }
  }
  if (robot.info().coins > 0) {
    robot.iterationsAfterCoin++
  }
}
