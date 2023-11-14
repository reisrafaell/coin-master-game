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
    loadSprite("tecla-x", "./assets/tecla-x.png")
    loadSprite("moeda-icon", "./assets/Moeda_Ui.png")
    loadSprite("star-icon", "./assets/Stars_Ui.png")
    loadSprite("moeda", "./assets/Moeda.png")
    loadSprite("creditos", "./assets/creditos.png")
    loadSprite("uniacademia-logo", "./assets/uniacademia-logo.png")
    loadSprite("chamas-jogador", "./assets/chamas.png", {
      sliceX: 9,
      sliceY: 1,
      anims: {
        queimar: { from: 0, to: 8, loop: true, speed: 6 },
      },
    })
    loadSprite("logo", "./assets/Logo.png")
    loadSprite("jogador", "./assets/Player.png", {
      sliceX: 9,
      sliceY: 4,
      anims: {
        idle: {
          from: 19,
          to: 25,
          loop: true,
        },
        run: {
          from: 28,
          to: 35,
          loop: true,
        },
        "jump-up": 2,
        "jump-down": 19,
      },
    })
    loadSprite("ponte", "./assets/Ponte.png")
    loadSprite("aranha-1", "./assets/aranha_1.png", {
      sliceX: 3,
      sliceY: 1,
      anims: {
        crawl: { from: 0, to: 2, loop: true },
        idle: 0,
      },
    })
    loadSprite("aranha-2", "./assets/aranha_2.png", {
      sliceX: 3,
      sliceY: 1,
      anims: {
        crawl: { from: 0, to: 2, loop: true },
        idle: 0,
      },
    })
    loadSprite("bg-principal", "./assets/bg-principal.png")
    loadSprite("grass-peca", "./assets/bloco-cinza-2.png", {
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
    loadSprite("grass-oneway-peca", "./assets/bloco-cinza.png", {
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
    loadSprite("bg-secundario", "./assets/bg-secundario.jpg")
    loadSprite("brick-peca", "./assets/tijolo_peca.png", {
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
    loadSprite("brick-oneway-peca", "./assets/tijolo_unico.png", {
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
    loadSprite("chama-1", "./assets/Chama_1.png", {
      sliceX: 2,
      sliceY: 1,
      anims: {
        queimar: { from: 0, to: 1, loop: true },
      },
    })

    loadSprite("chama-2", "./assets/Chama_2.png", {
      sliceX: 2,
      sliceY: 1,
      anims: {
        queimar: { from: 0, to: 1, loop: true },
      },
    })
    loadSprite("machado", "./assets/machado.png")
    loadSprite("serra", "./assets/Circular_serra.png")
    loadSprite("rock-peca", "./assets/bloco-cinza-2.png", {
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
    loadSprite("rock-oneway-peca", "./assets/bloco-cinza.png", {
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
  },
  sounds: () => {
    loadSound("jump", "./sounds/jump.wav")
    loadSound("moeda", "./sounds/moeda.wav")
    loadSound("water-ambience", "./sounds/water-ambience.mp3")
    loadSound("aranha-attack", "./sounds/aranha-attack.mp3")
    loadSound("hit", "./sounds/hit.wav")
    loadSound("lava-ambience", "./sounds/lava.wav")
    loadSound("confirm-ui", "./sounds/confirm-ui.wav")
    loadSound("machado", "./sounds/machado.mp3")
    loadSound("serra", "./sounds/serra.wav")
    loadSound("fireball", "./sounds/fireball.wav")
    loadSound("strong-wind", "./sounds/strong-wind.wav")
    loadSound("dive", "./sounds/dive.wav")
    loadSound("musica-fundo", "./sounds/musica-fundo.wav")
  },
}
