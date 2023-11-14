export class Chamas {
  constructor(positions, amplitudes, type) {
    this.amplitudes = amplitudes
    this.chamas = []
    for (const position of positions) {
      this.chamas.push(
        add([
          sprite(`chama-${type}`, { anim: "queimar" }),
          area({ shape: new Rect(vec2(0), 12, 12) }),
          anchor("center"),
          pos(position),
          scale(4),
          rotate(),
          state("lancar", ["lancar", "rotate", "fall"]),
          offscreen(),
          "chamas",
        ])
      )
    }
  }
  habilitarVulnerabilidade() {
    for (const chamas of this.chamas) {
      chamas.onCollide("chamas-jogador", () => {
        destroy(chamas)
        play("machado")
        play("fireball", { volume: 0 })
      })
    }
  }
  setPadraoMovimento() {
    for (const [index, chama] of this.chamas.entries()) {
      const lancar = chama.onStateEnter("lancar", async () => {
        if (!chama.isOffScreen()) play("fireball")
        await tween(
          chama.pos.y,
          chama.pos.y - this.amplitudes[index],
          2,
          (posY) => (chama.pos.y = posY),
          easings.linear
        )
        chama.enterState("rotate", "fall")
      })

      const rotate = chama.onStateEnter("rotate", (nextState) => {
        chama.rotateBy(180)
        chama.enterState(nextState)
      })

      const fall = chama.onStateEnter("fall", async () => {
        await tween(
          chama.pos.y,
          chama.pos.y + this.amplitudes[index],
          2,
          (posY) => (chama.pos.y = posY),
          easings.linear
        )
        chama.enterState("rotate", "lancar")
      })

      onSceneLeave(() => {
        lancar.cancel()
        rotate.cancel()
        fall.cancel()
      })
    }
  }
}
