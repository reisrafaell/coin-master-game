export class Machado {
  constructor(positions, swingTimes) {
    this.swingTimes = swingTimes
    this.positions = positions
    this.machados = []
    for (const position of positions) {
      this.machados.push(
        add([
          sprite("machado"),
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
          "machados",
        ])
      )
    }
  }

  async swing(machado, angle, swingTime) {
    if (!machado.isOffScreen()) play("machado")

    await tween(
      machado.angle,
      angle,
      swingTime,
      (val) => (machado.angle = val),
      easings.easeInOutSine
    )
  }

  habilitarVulnerabilidade() {
    for (const machados of this.machados) {
      machados.onCollide("chamas-jogador", () => {
        destroy(machados)
        play("machado")
      })
    }
  }
  setPadraoMovimento() {
    for (const [index, machado] of this.machados.entries()) {
      const swingLeft = machado.onStateEnter("swing-left", async () => {
        await this.swing(machado, 90, this.swingTimes[index])
        machado.enterState("swing-right")
      })

      const swingRight = machado.onStateEnter("swing-right", async () => {
        await this.swing(machado, -90, this.swingTimes[index])
        machado.enterState("swing-left")
      })

      onSceneLeave(() => {
        swingLeft.cancel()
        swingRight.cancel()
      })
    }
  }
}
