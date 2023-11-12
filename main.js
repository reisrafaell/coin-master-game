import kaboom from "./libs/kaboom.mjs"
import { Jogador } from "./entities/Jogador.js"
import { Peixe } from "./entities/Peixe.js"
import { Chama } from "./entities/Chamas.js"
import { Aranha } from "./entities/Aranha.js"
import { Camera } from "./utils/Camera.js"
import { level1Layout, level1Mappings } from "./content/level1/level1Layout.js"
import { level1Config } from "./content/level1/config.js"
import { level2Config } from "./content/level2/config.js"
import { UIManager } from "./utils/UIManager.js"
import { level2Layout, level2Mappings } from "./content/level2/level2Layout.js"
import { Level } from "./utils/Level.js"
import { Machado } from "./entities/Machado.js"
import { Serras } from "./entities/Serras.js"
import { load } from "./utils/loader.js"
import { bgSoundManager } from "./utils/BGSoundManager.js"

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
    bgSoundManager.addSound("water-ambience", {
      volume: 0.02,
      loop: true,
    })
    bgSoundManager.play("water-ambience")
    const level1 = new Level()
    setGravity(level1Config.gravity)
    level1.drawBackground("bg-principal")
    level1.drawMapLayout(level1Layout, level1Mappings)

    const jogador = new Jogador(
      level1Config.jogadorStartPosX,
      level1Config.jogadorStartPosY,
      level1Config.jogadorSpeed,
      level1Config.jumpForce,
      level1Config.nbLives,
      1,
      false
    )
    jogador.ativarPassagem()
    jogador.ativarColetaMoedas()
    jogador.enableMobVunerability()

    const peixe = new Peixe(
      level1Config.peixePositions.map((peixePos) => peixePos()),
      level1Config.peixeAmplitudes,
      level1Config.peixeType
    )
    peixe.setMovementPattern()
    peixe.enableMobVunerability()

    const aranha = new Aranha(
      level1Config.aranhaPositions.map((aranhaPos) => aranhaPos()),
      level1Config.aranhaAmplitudes,
      level1Config.aranhaSpeeds,
      level1Config.aranhaType
    )
    aranha.setMovementPattern()
    aranha.ativarPassagem()
    aranha.enableMobVunerability()

    level1.drawWaves("water", "wave")

    const camera = new Camera()
    camera.attach(jogador.gameObj, 0, -200, null, 200)
    UIManager.exibirContagemVidas(jogador)
    UIManager.exibirContagemMoedas(jogador)

    jogador.updateLives(UIManager.contagemVidasUI)
    jogador.updateCoinCount(UIManager.contagemMoedasUI)
  },
  2: () => {
    bgSoundManager.pauseAllSounds()
    bgSoundManager.addSound("lava-ambience", { loop: true })
    bgSoundManager.play("lava-ambience")
    setGravity(level2Config.gravity)

    const level2 = new Level()
    level2.drawBackground("bg-secundario")
    level2.drawMapLayout(level2Layout, level2Mappings)

    const jogador = new Jogador(
      level2Config.jogadorStartPosX,
      level2Config.jogadorStartPosY,
      level2Config.jogadorSpeed,
      level2Config.jumpForce,
      level2Config.nbLives,
      2,
      false
    )
    jogador.ativarPassagem()
    jogador.ativarColetaMoedas()
    jogador.enableMobVunerability()

    const chamas = new Chama(
      level2Config.chamaPositions.map((chamaPos) => chamaPos()),
      level2Config.chamaAmplitudes,
      level2Config.chamaType
    )
    chamas.setMovementPattern()
    chamas.enableMobVunerability()

    const aranha = new Aranha(
      level2Config.aranhaPositions.map((aranhaPos) => aranhaPos()),
      level2Config.aranhaAmplitudes,
      level2Config.aranhaSpeeds,
      level2Config.aranhaType
    )
    aranha.setMovementPattern()
    aranha.ativarPassagem()
    aranha.enableMobVunerability()

    const machados = new Machado(
      level2Config.machadosPositions.map((machadoPos) => machadoPos()),
      level2Config.machadosSwingTimes
    )
    machados.setMovementPattern()
    machados.enableMobVunerability()

    const serras = new Serras(
      level2Config.serraPositions.map((serraPos) => serraPos()),
      level2Config.serraRanges
    )
    serras.rotate()
    serras.enableMobVunerability()

    level2.drawWaves("lava", "wave")

    const camera = new Camera()
    camera.attach(jogador.gameObj, 0, -200, null, 200)

    UIManager.exibirContagemVidas(jogador)
    UIManager.exibirContagemMoedas(jogador)

    jogador.updateLives(UIManager.contagemVidasUI)
    jogador.updateCoinCount(UIManager.contagemMoedasUI)
  },
  3: () => UIManager.telaFimDeJogo(),
  gameover: async () => UIManager.exibirTelaDeFimDeJogo(),
}

for (const key in scenes) {
  scene(key, scenes[key])
}

// go("menu")
go(2)
