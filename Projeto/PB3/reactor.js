Reactor = {
  computerCombination: [],
  playerCombination: [],
  computerCombinationPosition: 1,
  combinationMaxPosition: 5,
  memoryMaxCombination: 9,

  sound: {
    start: 'start.mp3',
    fail: 'fail.mp3',
    complete: 'complete.mp3',
    combinations: [
      '0.mp3',
      '1.mp3',
      '2.mp3',
      '3.mp3',
      '4.mp3',
      '5.mp3',
      '6.mp3',
      '7.mp3',
      '8.mp3'
    ],

    loadSound(filename) {
      const file = `./assets/sounds/${filename}?cb=${new Date().getTime}`
      const sound = new Audio(file)
      sound.load()
      return sound
    },

    loadSounds() {
      if (typeof Reactor.sound.start == 'object') return

      Reactor.sound.start = Reactor.sound.loadSound(Reactor.sound.start)
      Reactor.sound.complete = Reactor.sound.loadSound(Reactor.sound.complete)
      Reactor.sound.fail = Reactor.sound.loadSound(Reactor.sound.fail)
      Reactor.sound.combinations = Reactor.sound.combinations.map(sound =>
        Reactor.sound.loadSound(sound)
      )
    }
  },

  interface: {
    memoryPanel: document.querySelector('.panelMemory'),
    computerLedPanel: document.querySelector('.computerLedPanel'),
    playerLedPanel: document.querySelector('.playerLedPanel'),
    playerMemory: document.querySelector('.playerMemory'),
    playerMemoryButtons: document.getElementsByClassName('player_memory'),

    turnLedOn(index, ledPanel) {
      ledPanel.children[index].classList.add('ledOn')
    },

    turnAllLedsOff() {
      const computerLedPanel = Reactor.interface.computerLedPanel
      const playerLedPanel = Reactor.interface.playerLedPanel

      for (var i = 0; i < computerLedPanel.children.length; i++) {
        computerLedPanel.children[i].classList.remove('ledOn')
        playerLedPanel.children[i].classList.remove('ledOn')
      }
    },

    async start() {
      return Reactor.sound.start.play()
    },

    playItem(index, combinationPosition, location = 'computer') {
      const leds =
        location == 'computer'
          ? Reactor.interface.computerLedPanel
          : Reactor.interface.playerLedPanel
      const memPanel = Reactor.interface.memoryPanel.children[index]

      memPanel.classList.add('memoryActive')
      Reactor.interface.turnLedOn(combinationPosition, leds)
      Reactor.sound.combinations[index].play().then(() => {
        setTimeout(() => {
          memPanel.classList.remove('memoryActive')
        }, 150)
      })
    },

    endGame(type = 'fail') {
      const memPanel = Reactor.interface.memoryPanel
      const ledPanel = Reactor.interface.computerLedPanel
      const sound =
        type == 'complete' ? Reactor.sound.complete : Reactor.sound.fail
      const typeClasses =
        type == 'complete'
          ? ['playerMemoryComplete', 'playerLedComplete']
          : ['playerMemoryError', 'playerLedError']

      Reactor.interface.disableButtons()
      Reactor.interface.turnAllLedsOff()

      sound.play().then(() => {
        for (var i = 0; i < memPanel.children.length; i++) {
          if (memPanel.children[i].tagName == 'DIV')
            memPanel.children[i].classList.add(typeClasses[0])
        }

        for (var i = 0; i < ledPanel.children.length; i++) {
          if (ledPanel.children[i].tagName == 'DIV')
            ledPanel.children[i].classList.add(typeClasses[1])
        }

        setTimeout(() => {
          for (var i = 0; i < memPanel.children.length; i++) {
            if (memPanel.children[i].tagName == 'DIV')
              memPanel.children[i].classList.remove(typeClasses[0])
          }

          for (var i = 0; i < ledPanel.children.length; i++) {
            if (ledPanel.children[i].tagName == 'DIV')
              ledPanel.children[i].classList.remove(typeClasses[1])
          }
        }, 900)
      })
    },

    enableButtons() {
      const playerMemory = Reactor.interface.playerMemory
      playerMemory.classList.add('playerActive')

      for (var i = 0; i < playerMemory.children.length; i++) {
        if (playerMemory.children[i].tagName == 'DIV')
          playerMemory.children[i].classList.add('playerMemoryActive')
      }
    },

    disableButtons() {
      const playerMemory = Reactor.interface.playerMemory
      playerMemory.classList.remove('playerActive')

      for (var i = 0; i < playerMemory.children.length; i++) {
        if (playerMemory.children[i].tagName == 'DIV')
          playerMemory.children[i].classList.remove('playerMemoryActive')
      }
    }
  },

  async load() {
    return new Promise(resolve => {
      console.log('Loading Game...')
      Reactor.sound.loadSounds()

      const playerMemory = Reactor.interface.playerMemory
      const memory = Reactor.interface.playerMemoryButtons

      Array.prototype.forEach.call(memory, element => {
        element.addEventListener('click', () => {
          if (playerMemory.classList.contains('playerActive')) {
            Reactor.play(parseInt(element.dataset.memory))
            console.log('O elemento clicado foi: ' + element.dataset.memory)

            element.style.animation = 'playermemoryClick .4s'
            setTimeout(() => (element.style.animation = ''), 400)
          }
        })
      })
    })
  },

  start() {
    Reactor.computerCombination = Reactor.createCombination()
    Reactor.computerCombinationPosition = 1
    Reactor.playerCombination = []
    Reactor.interface.start().then(() => {
      setTimeout(() => {
        Reactor.playCombination()
      }, 500)
    })
  },

  createCombination() {
    let newCombination = []
    for (let n = 0; n < Reactor.combinationMaxPosition; n++) {
      const position = Math.floor(
        Math.random() * Reactor.memoryMaxCombination + 1
      )
      newCombination.push(position - 1)
    }
    return newCombination
  },

  play(index) {
    Reactor.interface.playItem(
      index,
      Reactor.playerCombination.length,
      'player'
    )
    Reactor.playerCombination.push(index)

    if (Reactor.rightCombination(Reactor.playerCombination.length)) {
      if (Reactor.playerCombination.length == Reactor.combinationMaxPosition) {
        Reactor.interface.endGame('complete')
        setTimeout(() => {
          Reactor.start()
        }, 1200)
        return
      }

      if (
        Reactor.playerCombination.length == Reactor.computerCombinationPosition
      ) {
        Reactor.computerCombinationPosition++
        setTimeout(() => {
          Reactor.playCombination()
        }, 1200)
        return
      }
    } else {
      Reactor.interface.endGame('fail')
      document.getElementById('title').textContent = 'Você é o impostor!'
      setTimeout(() => {
        document.getElementById('title').textContent = 'Start Reactor'
        Reactor.start()
      }, 1400)
      return
    }
  },

  playCombination() {
    Reactor.playerCombination = []
    Reactor.interface.disableButtons()
    Reactor.interface.turnAllLedsOff()

    for (let i = 0; i <= Reactor.computerCombinationPosition - 1; i++) {
      setTimeout(() => {
        Reactor.interface.playItem(Reactor.computerCombination[i], i)
      }, 400 * (i + 1))
    }

    setTimeout(() => {
      Reactor.interface.turnAllLedsOff()
      Reactor.interface.enableButtons()
    }, 600 * Reactor.computerCombinationPosition)
  },

  rightCombination(position) {
    let computerCombination = Reactor.computerCombination.slice(0, position)
    return (
      computerCombination.toString() == Reactor.playerCombination.toString()
    )
  }
}
