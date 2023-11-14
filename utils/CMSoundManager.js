class CMSoundManager {
  mapaSom = {}

  addSound(key, options) {
    this.mapaSom[key] = play(key, options)
  }

  play(key) {
    this.mapaSom[key].seek = 0
    this.mapaSom[key].paused = false
  }

  pause(key) {
    this.mapaSom[key].paused = true
    this.mapaSom[key].seek = 0
  }

  pauseAllSounds() {
    for (const key in this.mapaSom) {
      this.mapaSom[key].paused = true
      this.mapaSom[key].seek = 0
    }
  }
}

export const cmSoundManager = new CMSoundManager()
