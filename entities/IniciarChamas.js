// Defina a classe IniciarChamas
export class IniciarChamas {
  constructor(posicaoInicial) {
    this.bulletSpeed = 20
    this.minDistance = 1500
    this.distance = 0

    this.iniciarChamas = add([
      sprite("chamas-jogador", {
        anim: "burn",
        speed: 0.1,
      }),
      area({ shape: new Rect(vec2(0.5), 30, 50), collisionIgnore: ["player"] }),
      anchor("center"),
      pos(posicaoInicial),
      scale(1.3),
      rotate(),
      state("launch", ["launch", "rotate", "fall"]),
      offscreen(),
      "chamas-jogador",
    ])

    onUpdate(() => {})

    setTimeout(() => {
      destroy(this.iniciarChamas)
    }, 3000)
  }
}
