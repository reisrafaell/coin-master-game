export class Aranhas {
  rangeX = 0
  rangeY = 800

  constructor(positions, amplitudes, velocities, type) {
    this.amplitudes = amplitudes
    this.velocities = velocities
    this.aranhas = []
    for (const position of positions) {
      this.aranhas.push(
        add([
          sprite(`aranha-${type}`, { anim: "crawl" }),
          pos(position),
          area({
            shape: new Rect(vec2(0, 4.5), 20, 6),
            collisionIgnore: ["aranhas"],
          }),
          anchor("center"),
          body(),
          scale(4),
          state("idle", ["idle", "crawl-left", "crawl-right"]),
          offscreen(),
          "aranhas",
        ])
      )
    }
  }

  async crawl(aranha, moveBy, duration) {
    if (aranha.currAnim !== "crawl") aranha.play("crawl")

    await tween(
      aranha.pos.x,
      aranha.pos.x + moveBy,
      duration,
      (posX) => (aranha.pos.x = posX),
      easings.easeOutSine
    )
  }

  setPadraoMovimento() {
    for (const [index, aranha] of this.aranhas.entries()) {
      const idle = aranha.onStateEnter("idle", async (previousState) => {
        if (aranha.currAnim !== "idle") aranha.play("idle")

        await new Promise((resolve) => {
          setTimeout(() => resolve(), 1000)
        })

        if (previousState === "crawl-left") {
          aranha.enterState("crawl-right")
        } else {
          aranha.jump()
          if (!aranha.isOffScreen()) {
            play("aranha-attack", { volume: 0.6 })
          }

          aranha.enterState("crawl-left")
        }
      })

      const crawlLeft = aranha.onStateEnter("crawl-left", async () => {
        aranha.flipX = false

        await this.crawl(
          aranha,
          -this.amplitudes[index],
          this.velocities[index]
        )
        aranha.enterState("idle", "crawl-left")
      })

      const crawlRight = aranha.onStateEnter("crawl-right", async () => {
        aranha.flipX = true

        await this.crawl(aranha, this.amplitudes[index], this.velocities[index])
        aranha.enterState("idle", "crawl-right")
      })

      onSceneLeave(() => {
        idle.cancel()
        crawlLeft.cancel()
        crawlRight.cancel()
      })
    }
  }

  habilitarVulnerabilidade() {
    for (const aranha of this.aranhas) {
      aranha.onCollide("player-flames", () => {
        destroy(aranha)
        play("balancar-machado")
        play("aranha-attack", { volume: 0 })
      })
    }
  }

  ativarPassagem() {
    for (const aranha of this.aranhas) {
      aranha.onBeforePhysicsResolve((collision) => {
        if (collision.target.is("passthrough") && aranha.isJumping()) {
          collision.preventResolution()
        }
      })
    }
  }
}
