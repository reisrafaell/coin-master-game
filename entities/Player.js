import { IniciarChamas } from "./IniciarChamas.js"
export class Player {
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
    this.makePlayer(posX, posY)
    this.speed = speed
    this.jumpForce = jumpForce
    this.lives = nbLives
    this.previousHeight = this.gameObj.pos.y
    this.setPlayerControls()
    this.update()
  }

  makePlayer(x, y) {
    this.initialX = x
    this.initialY = y
    this.gameObj = add([
      sprite("player", { anim: "idle" }),
      area({ shape: new Rect(vec2(0, 3), 47, 47) }),
      anchor("center"),
      pos(x, y),
      scale(1.5),
      body(),
      "player",
      { dir: vec2(1, 0), muzzleOffset: vec2(this.bulletDistance, 0) },
    ])
  }

  enablePassthrough() {
    this.gameObj.onBeforePhysicsResolve((collision) => {
      if (collision.target.is("passthrough") && this.gameObj.isJumping()) {
        collision.preventResolution()
      }

      if (collision.target.is("passthrough") && isKeyDown("down")) {
        collision.preventResolution()
      }
    })
  }

  enableMoedaPickUp() {
    this.gameObj.onCollide("moeda", (moeda) => {
      this.moedas++
      destroy(moeda)
      play("moeda")
    })
  }

  setPlayerControls() {
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
      // play("shoot-sound");
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
    const muzzlePosition = this.gameObj.pos.add(this.gameObj.muzzleOffset)
    const initialDirection = this.gameObj.dir

    return new IniciarChamas(muzzlePosition, initialDirection)
  }

  respawnPlayer() {
    if (this.lives > 0) {
      this.gameObj.pos = vec2(this.initialX, this.initialY)
      this.lives--
      this.isRespawning = true
      setTimeout(() => (this.isRespawning = false), 1000)
      return
    }

    go("gameover")
  }

  enableMobVunerability() {
    function hitAndRespawn(context) {
      play("hit", { speed: 1.5 })
      context.respawnPlayer()
    }
    this.gameObj.onCollide("peixe", () => hitAndRespawn(this))
    this.gameObj.onCollide("aranhas", () => hitAndRespawn(this))
    this.gameObj.onCollide("chamas", () => hitAndRespawn(this))
    this.gameObj.onCollide("machado", () => hitAndRespawn(this))
    this.gameObj.onCollide("serra", () => hitAndRespawn(this))
    this.gameObj.onCollide("passaro", () => hitAndRespawn(this))
    this.gameObj.onCollide("player-chamas", () => hitAndRespawn(this))
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
        this.respawnPlayer()
      }
    })
  }

  updateLives(livesCountUI) {
    onUpdate(() => {
      livesCountUI.text = `${this.lives}`
    })
  }

  updateMoedaCount(moedaCountUI) {
    onUpdate(() => {
      moedaCountUI.text = `${this.moedas} / ${moedaCountUI.fullMoedaCount}`
      if (this.moedas === moedaCountUI.fullMoedaCount) {
        go(this.isInTerminalScene ? "end" : this.currentLevelScene + 1)
      }
    })
  }
}
