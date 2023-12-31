export const level2Config = {
  gravity: 1400,
  jogadorSpeed: 400,
  jumpForce: 650,
  nbLives: 7,
  jogadorStartPosX: 1500,
  jogadorStartPosY: 100,
  chamaPositions: [
    () => vec2(1000, 600),
    () => vec2(1075, 600),
    () => vec2(1175, 600),
    () => vec2(2775, 600),
    () => vec2(2875, 600),
    () => vec2(2965, 600),
    () => vec2(4100, 600),
    () => vec2(4220, 550),
    () => vec2(5200, 550),
    () => vec2(5300, 550),
    () => vec2(5700, 550),
    () => vec2(5800, 550),
    () => vec2(5900, 550),
  ],
  chamaAmplitudes: [300, 500, 400, 300, 500, 900, 800, 500, 500, 900, 800, 500],
  chamaType: 1,
  aranhaPositions: [
    () => vec2(2200, 100),
    () => vec2(1900, 0),
    () => vec2(3200, 200),
    () => vec2(3500, 300),
    () => vec2(4500, 300),
  ],
  aranhaAmplitudes: [300, 150, 150, 300, 300],
  aranhaSpeeds: [2, 1, 1, 2, 2],
  aranhaType: 2,
  machadosPositions: [
    () => vec2(2100, -50),
    () => vec2(7000, 10),
    () => vec2(7300, 10),
    () => vec2(7600, 10),
  ],
  machadosSwingTimes: [1, 2, 3, 2],
  serraPositions: [() => vec2(8000, 350), () => vec2(9000, 350)],
  serraRanges: [300, 500],
}
