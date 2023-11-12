import { cmSoundManager } from "./CMSoundManager.js"

class UI {
  exibirContagemVidas(player) {
    this.livesCountUI = add([
      text(`${player.lives}`, {
        font: "Round",
        size: 50,
      }),
      fixed(),
      pos(70, 10),
    ])

    this.livesCountUI.add([
      sprite("star-icon"),
      pos(-60, -5),
      scale(3),
      fixed(),
    ])
  }

  exibirContagemMoedas(player) {
    this.coinCountUI = add([
      text(`${player.coins} / ${this.fullCoinCount}`, {
        font: "Round",
        size: 50,
      }),
      {
        fullCoinCount: get("coin", { recursive: true }).length,
      },
      fixed(),
      pos(70, 70),
    ])

    this.coinCountUI.add([sprite("coin-icon"), pos(-60, 0), scale(3), fixed()])
  }

  exibirMenssagemAnimada(content, position) {
    const message = add([
      text(content, { size: 24, font: "Round" }),
      area(),
      color(255, 98, 0),
      anchor("center"),
      pos(position),
      opacity(),
      state("flash-up", ["flash-up", "flash-down"]),
    ])

    message.onStateEnter("flash-up", async () => {
      await tween(
        message.opacity,
        0,
        0.5,
        (opacity) => (message.opacity = opacity),
        easings.linear
      )
      message.enterState("flash-down")
    })

    message.onStateEnter("flash-down", async () => {
      await tween(
        message.opacity,
        1,
        0.5,
        (opacity) => (message.opacity = opacity),
        easings.linear
      )
      message.enterState("flash-up")
    })
  }
  exibirMenuPrincipal() {
    add([sprite("forest-background"), scale(2)])
    add([
      sprite("logo"),
      fixed(),
      area(),
      anchor("center"),
      pos(center().x, center().y - 100),
      scale(1),
    ])

    this.exibirMenssagemAnimada(
      "Precione [ Enter ] Para Iniciar o Jogo",

      vec2(center().x, center().y + 300)
    )

    onKeyPress("enter", () => {
      play("confirm-ui", { speed: 1.5 })
      go("controls")
    })
  }
  exibirMeuDeControles() {
    add([sprite("forest-background"), scale(4)])
    add([
      text("Controles", { font: "Round", size: 50 }),
      area(),
      anchor("center"),
      pos(center().x, center().y - 200),
    ])

    const painelControles = add([pos(center().x + 30, center().y)])
    painelControles.add([sprite("up"), pos(0, -80)])
    painelControles.add([sprite("down")])
    painelControles.add([sprite("left"), pos(-80, 0)])
    painelControles.add([sprite("right"), pos(80, 0)])
    painelControles.add([sprite("space"), pos(-200, 0)])
    painelControles.add([
      text("Pular", { font: "Round", size: 32 }),
      pos(-190, 100),
    ])
    painelControles.add([
      text("Mover", { font: "Round", size: 32 }),
      pos(10, 100),
    ])
    painelControles.add([
      text("Junte Todas as moedas para vencer o Jogo", {
        font: "Round",
        size: 22,
      }),
      pos(-250, 200),
    ])

    this.exibirMenssagemAnimada(
      "Precione [ Enter ] Para Iniciar o Jogo",
      vec2(center().x, center().y + 300)
    )

    onKeyPress("enter", () => {
      play("confirm-ui", { speed: 1.5 })
      go(1)
    })
  }

  exibirTelaDeFimDeJogo() {
    cmSoundManager.pauseAllSounds()
    add([rect(1280, 720), color(0, 0, 0)])
    add([
      text("Fim de Jogo!", { size: 50, font: "Round" }),
      area(),
      anchor("center"),
      pos(center()),
    ])

    this.exibirMenssagemAnimada(
      "Precione [ Enter ] Para Jogar Novamente",
      vec2(center().x, center().y + 100)
    )

    onKeyPress("enter", () => {
      play("confirm-ui")
      go(1)
    })
  }

  telaFimDeJogo() {
    cmSoundManager.pauseAllSounds()
    add([rect(1280, 720), color(0, 0, 0)])
    add([
      text("Você ganhou! Obrigado por jogar.", { size: 50, font: "Round" }),
      area(),
      anchor("center"),
      pos(center()),
    ])

    this.exibirMenssagemAnimada(
      "Precione [ Enter ] para jogar novamente",
      vec2(center().x, center().y + 100)
    )

    onKeyPress("enter", () => {
      play("confirm-ui")
      go("menu")
    })
  }

  addDarkBg() {
    add([rect(270, 130), color(0, 0, 0), fixed()])
  }
}

export const UIManager = new UI()
