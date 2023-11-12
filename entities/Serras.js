export class Serras {
  constructor(positions, ranges) {
    this.positions = positions
    this.ranges = ranges
    this.serras = []
    for (const position of this.positions) {
      this.serras.push(
        add([
          sprite("serra"),
          area(),
          anchor("center"),
          pos(position),
          scale(4),
          rotate(),
          state("rotate-left", ["rotate-left", "rotate-right"]),
          offscreen(),
          "serras",
        ])
      )
    }
  }
  enableMobVunerability() {
    for (const serras of this.serras) {
      serras.onCollide("chamas-jogador", () => {
        destroy(serras)
        play("machado")
        play("serra", { volume: 0 })
      })
    }
  }
  rotate() {
    for (const [index, serra] of this.serras.entries()) {
      const rotateLeft = serra.onStateEnter("rotate-left", async () => {
        if (!serra.isOffScreen()) play("serra", { volume: 0.6, seek: 10 })
        await Promise.all([
          tween(
            serra.pos.x,
            serra.pos.x - this.ranges[index],
            1,
            (posX) => (serra.pos.x = posX),
            easings.linear
          ),
          tween(
            serra.angle,
            360,
            2,
            (currAngle) => (serra.angle = currAngle),
            easings.linear
          ),
        ])

        serra.angle = 0
        serra.enterState("rotate-right")
      })

      const rotateRight = serra.onStateEnter("rotate-right", async () => {
        if (!serra.isOffScreen()) play("serra", { volume: 0.8, seek: 10 })
        await Promise.all([
          tween(
            serra.pos.x,
            serra.pos.x + this.ranges[index],
            1,
            (posX) => (serra.pos.x = posX),
            easings.linear
          ),
          tween(
            serra.angle,
            360,
            2,
            (currAngle) => (serra.angle = currAngle),
            easings.linear
          ),
        ])

        serra.angle = 0
        serra.enterState("rotate-left")
      })

      onSceneLeave(() => {
        rotateRight.cancel()
        rotateLeft.cancel()
      })
    }
  }
}
