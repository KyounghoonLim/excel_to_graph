import { BoxGeometry, Camera, Mesh, MeshBasicMaterial, Scene, WebGLRenderer } from 'three'
import { ThemeType } from '../../enum/themeEnum'

/**
 * 기본적인 랜더러, 씬, 카메라를 초기화하고 랜더 루프를 진행하는 클래스
 */
export class ThreeClient {
  private renderer: WebGLRenderer
  private scene: Scene
  private camera: Camera

  private rAF: unknown

  private debounce: unknown
  private observer: ResizeObserver

  private theme: ThemeType | undefined

  constructor(theme?: ThemeType) {
    this.theme = theme

    this.scene = new Scene()
    this.camera = new Camera()

    const geometry = new BoxGeometry(1, 1, 1)
    const material = new MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new Mesh(geometry, material)
    this.scene.add(cube)

    this.observer = new ResizeObserver(([entry]) => {
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        const { width, height } = entry.contentRect
        this.setRendererSize(width * 2, height * 2)
      }, 16.7)
    })
  }

  initRenderer(canvas: HTMLCanvasElement) {
    if (this.renderer) return
    else {
      this.renderer = new WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        precision: 'highp',
      })
      this.observer.observe(this.renderer.domElement)
    }
  }

  setRendererSize(w: number, h: number) {
    if (!this.renderer) return
    else this.renderer.setSize(w, h, false)
  }

  startRenderLoop(self = this) {
    if (!self.rAF) console.log('✅ THREE: start render loop')

    if (self.renderer && self.scene && self.camera) {
      self.renderer?.render(self?.scene, self?.camera)
      self.rAF = requestAnimationFrame(() => self.startRenderLoop(self))
    } else {
      console.log(this)
      console.warn(
        '❌ THREE: can not start render loop (renderer || scene || camera does not exist!)'
      )
    }
  }

  stopRenderLoop() {
    console.log('✅ THREE: stop render loop')
    cancelAnimationFrame(this.rAF)
    this.rAF = null
  }

  destroy() {
    try {
      this.stopRenderLoop()
      this.renderer.dispose()
      this.observer.disconnect()
      this.scene.remove()
      console.log('✅ THREE: destroy completed!')
    } catch {}
  }
}
