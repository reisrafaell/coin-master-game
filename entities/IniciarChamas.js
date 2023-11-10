// Defina a classe IniciarChamas
export class IniciarChamas {
  constructor(posicaoInicial) {
    this.bulletSpeed = 20
    this.minDistance = 1500
    this.distance = 0

    this.iniciarChamas = add([
      sprite("player-flames", {
        anim: "burn",
        speed: 0.1,
      }),
      area({ shape: new Rect(vec2(0), 15, 15), collisionIgnore: ["player"] }),
      anchor("center"),
      pos(posicaoInicial),
      scale(1),
      rotate(),
      state("launch", ["launch", "rotate", "fall"]),
      offscreen(),
      "player-flames",
    ])

    // Use onUpdate para controlar o movimento da chama
    onUpdate(() => {
      // this.distance += this.bulletSpeed * dt()
      // if (this.distance >= this.minDistance) {
      //   destroy(this.IniciarChamas) // Desaparece após atingir a distância mínima
      // } else {
      //   this.IniciarChamas.move(initialDirection.scale(this.bulletSpeed * dt()))
      // }
    })

    setTimeout(() => {
      destroy(this.iniciarChamas)
    }, 3000)
  }
}
