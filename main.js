import kaboom from "./libs/kaboom.mjs"
import { Player } from "./entities/Player.js"
import { Peixe } from "./entities/Peixe.js"
import { Chamas } from "./entities/Chamas.js"
import { Aranhas } from "./entities/Aranhas.js"
import { Camera } from "./utils/Camera.js"
import { level1Layout, level1Mappings } from "./content/level1/level1Layout.js"
import { level1Config } from "./content/level1/config.js"
import { level2Config } from "./content/level2/config.js"
import { UIManager } from "./utils/UIManager.js"
import { level2Layout, level2Mappings } from "./content/level2/level2Layout.js"
import { Level } from "./utils/Level.js"
import { Machado } from "./entities/Machado.js"
import { Serra } from "./entities/Serra.js"
import { load } from "./utils/loader.js"
import { cmSoundManager } from "./utils/CMSoundManager.js"

kaboom({
  width: 1280,
  height: 720,
  letterbox: true,
  debug: false,
})

load.fonts()
load.assets()
load.sounds()

const scenes = {
  menu: () => {
    UIManager.exibirMenuPrincipal()
  },
  controls: () => {
    UIManager.exibirMeuDeControles()
  },
  1: () => {
    cmSoundManager.addSound("water-ambience", {
      volume: 0.02,
      loop: true,
    })
    cmSoundManager.play("water-ambience")
    const level1 = new Level()
    setGravity(level1Config.gravity)
    level1.drawBackground("forest-background")
    level1.drawMapLayout(level1Layout, level1Mappings)

    const player = new Player(
      level1Config.playerStartPosX,
      level1Config.playerStartPosY,
      level1Config.playerSpeed,
      level1Config.jumpForce,
      level1Config.nbLives,
      1,
      false
    )
    player.enablePassthrough()
    player.enableMoedaPickUp()
    player.enableMobVunerability()

    const peixe = new Peixe(
      level1Config.peixePositions.map((peixePos) => peixePos()),
      level1Config.peixeAmplitudes,
      level1Config.peixeType
    )
    peixe.setMovementPattern()
    peixe.enableMobVunerability()

    const aranhas = new Aranhas(
      level1Config.spiderPositions.map((spiderPos) => spiderPos()),
      level1Config.spiderAmplitudes,
      level1Config.spiderSpeeds,
      level1Config.spiderType
    )
    aranhas.setMovementPattern()
    aranhas.enablePassthrough()
    aranhas.enableMobVunerability()

    level1.drawWaves("water", "wave")

    const camera = new Camera()
    camera.attach(player.gameObj, 0, -200, null, 200)
    UIManager.addDarkBg()
    UIManager.exibirContagemVidas(player)
    UIManager.exibirContagemMoedas(player)

    player.updateLives(UIManager.livesCountUI)
    player.updateMoedaCount(UIManager.moedaCountUI)
  },
  2: () => {
    cmSoundManager.pauseAllSounds()
    cmSoundManager.addSound("lava-ambience", { loop: true })
    cmSoundManager.play("lava-ambience")
    setGravity(level2Config.gravity)

    const level2 = new Level()
    level2.drawBackground("castle-background")
    level2.drawMapLayout(level2Layout, level2Mappings)

    const player = new Player(
      level2Config.playerStartPosX,
      level2Config.playerStartPosY,
      level2Config.playerSpeed,
      level2Config.jumpForce,
      level2Config.nbLives,
      2,
      false
    )
    player.enablePassthrough()
    player.enableMoedaPickUp()
    player.enableMobVunerability()

    const chamas = new Chamas(
      level2Config.flamePositions.map((flamePos) => flamePos()),
      level2Config.flameAmplitudes,
      level2Config.flameType
    )
    chamas.setMovementPattern()
    chamas.enableMobVunerability()

    const aranhas = new Aranhas(
      level2Config.spiderPositions.map((spiderPos) => spiderPos()),
      level2Config.spiderAmplitudes,
      level2Config.spiderSpeeds,
      level2Config.spiderType
    )
    aranhas.setMovementPattern()
    aranhas.enablePassthrough()
    aranhas.enableMobVunerability()

    const machado = new Machado(
      level2Config.machadoPositions.map((machadoPos) => machadoPos()),
      level2Config.machadoSwingTimes
    )
    machado.setMovementPattern()
    machado.enableMobVunerability()

    const serra = new Serra(
      level2Config.sawPositions.map((sawPos) => sawPos()),
      level2Config.sawRanges
    )
    serra.rotate()
    serra.enableMobVunerability()

    level2.drawWaves("lava", "wave")

    const camera = new Camera()
    camera.attach(player.gameObj, 0, -200, null, 200)

    UIManager.addDarkBg()
    UIManager.exibirContagemVidas(player)
    UIManager.exibirContagemMoedas(player)

    player.updateLives(UIManager.livesCountUI)
    player.updateMoedaCount(UIManager.moedaCountUI)
  },
  3: () => UIManager.telaFimDeJogo(),
  gameover: async () => UIManager.exibirTelaDeFimDeJogo(),
}

for (const key in scenes) {
  scene(key, scenes[key])
}

// go("menu")
go(2)
