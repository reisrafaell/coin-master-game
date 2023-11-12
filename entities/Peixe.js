export class Peixe {
  constructor(positions, amplitudes, type) {
    this.amplitudes = amplitudes
    this.peixe = []
    for (const position of positions) {
      this.peixe.push(
        add([
          sprite(`peixe-${type}`, { anim: "swim" }),
          area({ shape: new Rect(vec2(0), 12, 12) }),
          anchor("center"),
          pos(position),
          scale(4),
          rotate(90),
          state("launch", ["launch", "rotate", "fall"]),
          offscreen(),
          "peixe",
        ])
      )
    }
  }

  setMovementPattern() {
    for (const [index, peixe] of this.peixe.entries()) {
      const launch = peixe.onStateEnter("launch", async () => {
        await tween(
          peixe.pos.y,
          peixe.pos.y - this.amplitudes[index],
          2,
          (posY) => (peixe.pos.y = posY),
          easings.easeOutSine
        )
        peixe.enterState("rotate", "fall")
      })

      const rotate = peixe.onStateEnter("rotate", (nextState) => {
        peixe.rotateBy(180)
        peixe.enterState(nextState)
      })

      const fall = peixe.onStateEnter("fall", async () => {
        await tween(
          peixe.pos.y,
          peixe.pos.y + this.amplitudes[index],
          2,
          (posY) => (peixe.pos.y = posY),
          easings.easeOutSine
        )
        peixe.enterState("rotate", "launch")
      })

      onSceneLeave(() => {
        launch.cancel()
        rotate.cancel()
        fall.cancel()
      })
    }
  }

  enableMobVunerability() {
    for (const peixe of this.peixe) {
      peixe.onCollide("player-chamas", () => {
        destroy(peixe)
        play("balancar-machado")
      })
    }
  }
}
