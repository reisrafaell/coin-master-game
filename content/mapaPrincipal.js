export function gerarMapas(tileType) {
  return {
    0: () => [
      sprite(`${tileType}-peca`, { anim: "tl" }),
      area(),
      body({ isStatic: true }),
      offscreen(),
    ],
    1: () => [
      sprite(`${tileType}-peca`, { anim: "tm" }),
      area(),
      body({ isStatic: true }),
      offscreen(),
    ],
    2: () => [
      sprite(`${tileType}-peca`, { anim: "tr" }),
      area(),
      body({ isStatic: true }),
      offscreen(),
    ],
    3: () => [
      sprite(`${tileType}-peca`, { anim: "ml" }),
      area(),
      body({ isStatic: true }),
      offscreen(),
    ],
    4: () => [sprite(`${tileType}-peca`, { anim: "mm" }), offscreen()],
    5: () => [
      sprite(`${tileType}-peca`, { anim: "mr" }),
      area(),
      body({ isStatic: true }),
      offscreen(),
    ],
    6: () => [sprite(`${tileType}-peca`, { anim: "ml-2" }), offscreen()],
    7: () => [sprite(`${tileType}-peca`, { anim: "mm-2" }), offscreen()],
    8: () => [sprite(`${tileType}-peca`, { anim: "mr-2" }), offscreen()],
    9: () => [
      sprite(`${tileType}-oneway-peca`, { anim: "tl" }),
      area({ shape: new Rect(vec2(0), 16, 3) }),
      "passthrough",
      body({ isStatic: true }),
      offscreen(),
    ],
    a: () => [
      sprite(`${tileType}-oneway-peca`, { anim: "tm" }),
      area({ shape: new Rect(vec2(0), 16, 3) }),
      "passthrough",
      body({ isStatic: true }),
      offscreen(),
    ],
    b: () => [
      sprite(`${tileType}-oneway-peca`, { anim: "tr" }),
      area({ shape: new Rect(vec2(0), 16, 3) }),
      "passthrough",
      body({ isStatic: true }),
      offscreen(),
    ],
    c: () => [sprite(`${tileType}-oneway-peca`, { anim: "ml" }), offscreen()],
    d: () => [sprite(`${tileType}-oneway-peca`, { anim: "mm" }), offscreen()],
    e: () => [sprite(`${tileType}-oneway-peca`, { anim: "mr" }), offscreen()],
    o: () => [sprite("ponte"), area(), body({ isStatic: true }), offscreen()],
    "@": () => [sprite("moeda"), area(), "moeda", offscreen()],
  }
}
