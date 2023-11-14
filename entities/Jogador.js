import { IniciarChamas } from "./IniciarChamas.js"
export class Jogador {
  heightDelta = 0

  isMoving = false

  isRespawning = false

  bulletDistance = 30

  lives = 5

  moedas = 0

  hasJumpedOnce = false

  coyoteLapse = 0.1

  constructor(
    posX,
    posY,
    speed,
    jumpForce,
    nbLives,
    currentLevelScene,
    isInTerminalScene
  ) {
    this.isInTerminalScene = isInTerminalScene
    this.currentLevelScene = currentLevelScene
    this.contruirJogador(posX, posY)
    this.speed = speed
    this.jumpForce = jumpForce
    this.lives = nbLives
    this.previousHeight = this.gameObj.pos.y
    this.setJogadorControls()
    this.update()
  }

  contruirJogador(x, y) {
    this.initialX = x
    this.initialY = y
    this.gameObj = add([
      sprite("jogador", { anim: "idle" }),
      area({ shape: new Rect(vec2(0, 3), 47, 47) }),
      anchor("center"),
      pos(x, y),
      scale(1.5),
      body(),
      "jogador",
      { dir: vec2(1, 0), muzzleOffset: vec2(this.bulletDistance, 0) },
    ])
  }

  ativarPassagem() {
    this.gameObj.onBeforePhysicsResolve((collision) => {
      if (collision.target.is("passthrough") && this.gameObj.isJumping()) {
        collision.preventResolution()
      }

      if (collision.target.is("passthrough") && isKeyDown("down")) {
        collision.preventResolution()
      }
    })
  }

  ativarColetaMoedas() {
    this.gameObj.onCollide("moeda", (moeda) => {
      this.moedas++
      destroy(moeda)
      play("moeda")
    })
  }

  setJogadorControls() {
    onKeyDown("left", () => {
      if (this.gameObj.paused) return
      if (this.gameObj.curAnim() !== "run") this.gameObj.play("run")
      this.gameObj.flipX = true
      if (!this.isRespawning) this.gameObj.move(-this.speed, 0)
      this.isMoving = true
    })

    onKeyDown("right", () => {
      if (this.gameObj.paused) return
      if (this.gameObj.curAnim() !== "run") this.gameObj.play("run")
      this.gameObj.flipX = false
      if (!this.isRespawning) this.gameObj.move(this.speed, 0)
      this.isMoving = true
    })

    onKeyDown("x", () => {
      if (this.gameObj.paused) return
      this.shoot()
    })
    onKeyDown("space", () => {
      if (this.gameObj.paused) return
      if (this.gameObj.isGrounded() && !this.isRespawning) {
        this.hasJumpedOnce = true
        this.gameObj.jump(this.jumpForce)
        play("jump")
      }

      if (
        !this.gameObj.isGrounded() &&
        time() - this.timeSinceLastGrounded < this.coyoteLapse &&
        !this.hasJumpedOnce
      ) {
        this.hasJumpedOnce = true
        this.gameObj.jump(this.jumpForce)
        play("jump")
      }
    })

    onKeyRelease(() => {
      if (this.gameObj.paused) return
      if (isKeyReleased("right") || isKeyReleased("left")) {
        this.gameObj.play("idle")
        this.isMoving = false
      }
    })
  }

  shoot() {
    const heroiPosition = this.gameObj.pos.add(this.gameObj.muzzleOffset)
    const direcaoInicial = this.gameObj.dir

    return new IniciarChamas(heroiPosition, direcaoInicial)
  }

  respawnJogador() {
    if (this.lives > 0) {
      this.gameObj.pos = vec2(this.initialX, this.initialY)
      this.lives--
      this.isRespawning = true
      setTimeout(() => (this.isRespawning = false), 1000)
      return
    }

    go("gameover")
  }

  habilitarVulnerabilidade() {
    function hitAndRespawn(context) {
      play("hit", { speed: 1.5 })
      context.respawnJogador()
    }
    this.gameObj.onCollide("peixe", () => hitAndRespawn(this))
    this.gameObj.onCollide("aranhas", () => hitAndRespawn(this))
    this.gameObj.onCollide("chamas", () => hitAndRespawn(this))
    this.gameObj.onCollide("machados", () => hitAndRespawn(this))
    this.gameObj.onCollide("serras", () => hitAndRespawn(this))
    this.gameObj.onCollide("passaro", () => hitAndRespawn(this))
    this.gameObj.onCollide("chamas-jogador", () => hitAndRespawn(this))
  }

  update() {
    onUpdate(() => {
      if (this.gameObj.isGrounded()) {
        this.hasJumpedOnce = false
        this.timeSinceLastGrounded = time()
      }

      this.heightDelta = this.previousHeight - this.gameObj.pos.y
      this.previousHeight = this.gameObj.pos.y

      if (!this.isMoving && this.gameObj.curAnim() !== "idle") {
        this.gameObj.play("idle")
      }

      if (
        !this.gameObj.isGrounded() &&
        this.heightDelta > 0 &&
        this.gameObj.curAnim() !== "jump-up"
      ) {
        this.gameObj.play("jump-up")
      }

      if (
        !this.gameObj.isGrounded() &&
        this.heightDelta < 0 &&
        this.gameObj.curAnim() !== "jump-down"
      ) {
        this.gameObj.play("jump-down")
      }

      if (this.gameObj.pos.y > 1000) {
        play("hit", { speed: 1.5 })
        this.respawnJogador()
      }
    })
  }

  atualizarVidas(contagemVidasUI) {
    onUpdate(() => {
      contagemVidasUI.text = `${this.lives}`
    })
  }

  atualizarMoedas(contagemMoedasUI) {
    onUpdate(() => {
      contagemMoedasUI.text = `${this.moedas} / ${contagemMoedasUI.contagemTotalMoedas}`
      if (this.moedas === contagemMoedasUI.contagemTotalMoedas) {
        go(this.isInTerminalScene ? "end" : this.currentLevelScene + 1)
      }
    })
  }
}
