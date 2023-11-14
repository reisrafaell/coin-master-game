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
          state("lancar", ["lancar", "rotate", "fall"]),
          offscreen(),
          "peixe",
        ])
      )
    }
  }

  setPadraoMovimento() {
    for (const [index, peixe] of this.peixe.entries()) {
      const lancar = peixe.onStateEnter("lancar", async () => {
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
        peixe.enterState("rotate", "lancar")
      })

      onSceneLeave(() => {
        lancar.cancel()
        rotate.cancel()
        fall.cancel()
      })
    }
  }

  habilitarVulnerabilidade() {
    for (const peixe of this.peixe) {
      peixe.onCollide("chamas-jogador", () => {
        destroy(peixe)
        play("machado")
      })
    }
  }
}
