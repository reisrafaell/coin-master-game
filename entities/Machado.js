export class Machado {
  constructor(positions, swingTimes) {
    this.swingTimes = swingTimes
    this.positions = positions
    this.machado = []
    for (const position of positions) {
      this.machado.push(
        add([
          sprite("axe"),
          area({
            shape: new Rect(vec2(0, 40), 30, 10),
            collisionIgnore: ["aranhas", "chamas"],
          }),
          pos(position),
          scale(4),
          anchor(vec2(0, -0.75)),
          state("swing-left", ["swing-left", "swing-right"]),
          rotate(),
          offscreen(),
          "machado",
        ])
      )
    }
  }

  async swing(axe, angle, swingTime) {
    if (!axe.isOffScreen()) play("balancar-machado")

    await tween(
      axe.angle,
      angle,
      swingTime,
      (val) => (axe.angle = val),
      easings.easeInOutSine
    )
  }

  enableMobVunerability() {
    for (const machado of this.machado) {
      machado.onCollide("player-chamas", () => {
        destroy(machado)
        play("balancar-machado")
      })
    }
  }
  setMovementPattern() {
    for (const [index, axe] of this.machado.entries()) {
      const swingLeft = axe.onStateEnter("swing-left", async () => {
        await this.swing(axe, 90, this.swingTimes[index])
        axe.enterState("swing-right")
      })

      const swingRight = axe.onStateEnter("swing-right", async () => {
        await this.swing(axe, -90, this.swingTimes[index])
        axe.enterState("swing-left")
      })

      onSceneLeave(() => {
        swingLeft.cancel()
        swingRight.cancel()
      })
    }
  }
}
