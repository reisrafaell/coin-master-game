export const load = {
  fonts: () => {
    loadFont("Round", "./assets/Round9x13.ttf")
  },
  assets: () => {
    // controls prompts
    loadSprite("up", "./assets/Arrow_Up_Key_Dark.png")
    loadSprite("down", "./assets/Arrow_Down_Key_Dark.png")
    loadSprite("left", "./assets/Arrow_Left_Key_Dark.png")
    loadSprite("right", "./assets/Arrow_Right_Key_Dark.png")
    loadSprite("space", "./assets/Space_Key_Dark.png")
    loadSprite("bullet", "./assets/bullet.png")
    loadSprite("moeda-icon", "./assets/Moedas_Ui.png")
    loadSprite("star-icon", "./assets/Stars_Ui.png")
    loadSprite("moeda", "./assets/Moeda.png")
    loadSprite("player-chamas", "./assets/flames.png", {
      sliceX: 9,
      sliceY: 1,
      anims: {
        burn: { from: 0, to: 8, loop: true, speed: 6 },
      },
    })
    loadSprite("logo", "./assets/Logo.png")
    loadSprite("player", "./assets/Player.png", {
      sliceX: 8,
      sliceY: 2,
      anims: {
        idle: {
          from: 0,
          to: 0,
          loop: true,
        },
        run: {
          from: 5,
          to: 7,
          loop: true,
        },
        "jump-up": 5,
        "jump-down": 4,
      },
    })
    loadSprite("bridge", "./assets/Bridge.png")
    loadSprite("aranha-1", "./assets/Aranha_1.png", {
      sliceX: 3,
      sliceY: 1,
      anims: {
        crawl: { from: 0, to: 2, loop: true },
        idle: 0,
      },
    })
    loadSprite("aranha-2", "./assets/Aranha_2.png", {
      sliceX: 3,
      sliceY: 1,
      anims: {
        crawl: { from: 0, to: 2, loop: true },
        idle: 0,
      },
    })
    loadSprite("forest-background", "./assets/Forest_Background_0.jpg")
    loadSprite("grass-tileset", "./assets/Grass_Tileset.png", {
      sliceX: 3,
      sliceY: 4,
      anims: {
        tl: 0,
        tm: 1,
        tr: 2,
        ml: 3,
        mm: 4,
        mr: 5,
        "ml-2": 6,
        "mm-2": 7,
        "mr-2": 8,
      },
    })
    loadSprite("grass-oneway-tileset", "./assets/Grass_Oneway.png", {
      sliceX: 3,
      sliceY: 4,
      anims: {
        tl: 0,
        tm: 1,
        tr: 2,
        ml: 3,
        mm: 4,
        mr: 5,
        "ml-2": 6,
        "mm-2": 7,
        "mr-2": 8,
      },
    })
    loadSprite("water", "./assets/Water.png", {
      sliceX: 8,
      sliceY: 1,
      anims: {
        wave: {
          from: 0,
          to: 7,
          speed: 16,
          loop: true,
        },
        "wave-reversed": {
          from: 7,
          to: 0,
          speed: 16,
          loop: true,
        },
      },
    })
    loadSprite("peixe-1", "./assets/Peixe_1.png", {
      sliceX: 2,
      sliceY: 1,
      anims: {
        swim: { from: 0, to: 1, loop: true },
      },
    })
    loadSprite("peixe-2", "./assets/Peixe_2.png", {
      sliceX: 2,
      sliceY: 1,
      anims: {
        swim: { from: 0, to: 1, loop: true },
      },
    })
    loadSprite("castle-background", "./assets/Castle_Background_0.png")
    loadSprite("brick-tileset", "./assets/Brick_Tileset.png", {
      sliceX: 3,
      sliceY: 4,
      anims: {
        tl: 0,
        tm: 1,
        tr: 2,
        ml: 3,
        mm: 4,
        mr: 5,
        "ml-2": 6,
        "mm-2": 7,
        "mr-2": 8,
      },
    })
    loadSprite("brick-oneway-tileset", "./assets/Brick_Oneway.png", {
      sliceX: 3,
      sliceY: 4,
      anims: {
        tl: 0,
        tm: 1,
        tr: 2,
        ml: 3,
        mm: 4,
        mr: 5,
        "ml-2": 6,
        "mm-2": 7,
        "mr-2": 8,
      },
    })

    loadSprite("lava", "./assets/Lava.png", {
      sliceX: 8,
      sliceY: 1,
      anims: {
        wave: {
          from: 0,
          to: 7,
          speed: 16,
          loop: true,
        },
        "wave-reversed": {
          from: 7,
          to: 0,
          speed: 16,
          loop: true,
        },
      },
    })
    loadSprite("flame-1", "./assets/Flame_1.png", {
      sliceX: 2,
      sliceY: 1,
      anims: {
        burn: { from: 0, to: 1, loop: true },
      },
    })

    loadSprite("flame-2", "./assets/Flame_2.png", {
      sliceX: 2,
      sliceY: 1,
      anims: {
        burn: { from: 0, to: 1, loop: true },
      },
    })
    loadSprite("axe", "./assets/Axe_Trap.png")
    loadSprite("saw", "./assets/Circular_Saw.png")

    loadSprite("sky-background-0", "./assets/Sky_Background_0.png")
    loadSprite("sky-background-1", "./assets/Sky_Background_1.png")
    loadSprite("sky-background-2", "./assets/Sky_Background_2.png")

    loadSprite("rock-tileset", "./assets/Grass_Rock_Tileset.png", {
      sliceX: 3,
      sliceY: 4,
      anims: {
        tl: 0,
        tm: 1,
        tr: 2,
        ml: 3,
        mm: 4,
        mr: 5,
        "ml-2": 6,
        "mm-2": 7,
        "mr-2": 8,
      },
    })
    loadSprite("rock-oneway-tileset", "./assets/Grass_Rock_Oneway.png", {
      sliceX: 3,
      sliceY: 4,
      anims: {
        tl: 0,
        tm: 1,
        tr: 2,
        ml: 3,
        mm: 4,
        mr: 5,
        "ml-2": 6,
        "mm-2": 7,
        "mr-2": 8,
      },
    })
    loadSprite("clouds", "./assets/Clouds.png", {
      sliceX: 8,
      sliceY: 1,
      anims: {
        wave: {
          from: 0,
          to: 7,
          speed: 16,
          loop: true,
        },
        "wave-reversed": {
          from: 7,
          to: 0,
          speed: 16,
          loop: true,
        },
      },
    })
    loadSprite("bird-1", "./assets/Bird_1.png", {
      sliceX: 3,
      sliceY: 1,
      anims: {
        fly: {
          from: 0,
          to: 2,
          speed: 9,
          loop: true,
        },
      },
    })
    loadSprite("bird-2", "./assets/Bird_2.png", {
      sliceX: 3,
      sliceY: 1,
      anims: {
        fly: {
          from: 0,
          to: 2,
          speed: 9,
          loop: true,
        },
      },
    })
  },
  sounds: () => {
    loadSound("jump", "./sounds/jump.wav")
    loadSound("moeda", "./sounds/moeda.wav")
    loadSound("water-ambience", "./sounds/water-ambience.mp3")
    loadSound("aranha-attack", "./sounds/aranha-attack.mp3")
    loadSound("hit", "./sounds/hit.wav")
    loadSound("lava-ambience", "./sounds/lava.wav")
    loadSound("confirm-ui", "./sounds/confirm-ui.wav")
    loadSound("balancar-machado", "./sounds/balancar-machado.mp3")
    loadSound("saw", "./sounds/saw.wav")
    loadSound("fireball", "./sounds/fireball.wav")
    loadSound("strong-wind", "./sounds/strong-wind.wav")
    loadSound("dive", "./sounds/dive.wav")
  },
}
