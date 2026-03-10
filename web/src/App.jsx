import { useState, useRef, useEffect, useCallback } from 'react'
import './App.css'

// EBOB (En Büyük Ortak Bölen) - Öklid Algoritması
const gcd = (a, b) => {
  while (b) {
    [a, b] = [b, a % b]
  }
  return a
}

// Köşegenin geçtiği hücreleri hesapla
const getCrossedCells = (height, width) => {
  const cells = new Set()
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      // Hücre sınırları: x ∈ [col, col+1], y ∈ [row, row+1]
      // Köşegen: y = (height/width) * x
      const yAtLeft = (height / width) * col
      const yAtRight = (height / width) * (col + 1)
      const xAtBottom = (width / height) * row
      const xAtTop = (width / height) * (row + 1)

      const yMin = Math.min(yAtLeft, yAtRight)
      const yMax = Math.max(yAtLeft, yAtRight)
      const xMin = Math.min(xAtBottom, xAtTop)
      const xMax = Math.max(xAtBottom, xAtTop)

      if (yMax > row && yMin < row + 1 && xMax > col && xMin < col + 1) {
        cells.add(`${col},${row}`)
      }
    }
  }
  return cells
}

// Hızlı örnekler
const PRESETS = [
  [3, 4],
  [5, 7],
  [6, 6],
  [8, 12],
  [10, 15],
  [7, 11],
  [9, 6],
  [12, 8],
]

function App() {
  const [height, setHeight] = useState(5)
  const [width, setWidth] = useState(7)
  const [hoveredCell, setHoveredCell] = useState(null)
  const [showFormula, setShowFormula] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [animatedCells, setAnimatedCells] = useState(new Set())
  const canvasRef = useRef(null)
  const animTimeouts = useRef([])

  const crossedCount = height + width - gcd(height, width)
  const gcdValue = gcd(height, width)
  const crossedCells = getCrossedCells(height, width)

  // Yükseklik değişimi
  const handleHeight = (val) => {
    const v = Math.max(1, Math.min(100, parseInt(val) || 1))
    setHeight(v)
    clearAnimation()
  }

  // Genişlik değişimi
  const handleWidth = (val) => {
    const v = Math.max(1, Math.min(100, parseInt(val) || 1))
    setWidth(v)
    clearAnimation()
  }

  // Animasyonu temizle
  const clearAnimation = () => {
    animTimeouts.current.forEach(t => clearTimeout(t))
    animTimeouts.current = []
    setAnimating(false)
    setAnimatedCells(new Set())
  }

  // Animasyonu başlat
  const runAnimation = () => {
    clearAnimation()
    setAnimating(true)
    setAnimatedCells(new Set())

    const cellArray = Array.from(crossedCells).sort((a, b) => {
      const [ax, ay] = a.split(',').map(Number)
      const [bx, by] = b.split(',').map(Number)
      return (ax + ay) - (bx + by) || ax - bx
    })

    const delay = Math.max(30, Math.min(80, 800 / cellArray.length))

    cellArray.forEach((cell, i) => {
      const t = setTimeout(() => {
        setAnimatedCells(prev => new Set([...prev, cell]))
        if (i === cellArray.length - 1) {
          const t2 = setTimeout(() => setAnimating(false), 400)
          animTimeouts.current.push(t2)
        }
      }, i * delay)
      animTimeouts.current.push(t)
    })
  }

  // Canvas çizimi
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1

    const container = canvas.parentElement
    const maxW = container.clientWidth - 24
    const maxH = container.clientHeight - 24 || 450

    const padding = 24

    // Hücre boyutunu hesapla
    const cellSize = Math.min(
      Math.floor((maxW - padding * 2) / width),
      Math.floor((maxH - padding * 2) / height),
      Math.max(12, Math.min(60, 600 / Math.max(width, height)))
    )

    const gridW = cellSize * width
    const gridH = cellSize * height
    const totalW = gridW + padding * 2
    const totalH = gridH + padding * 2

    canvas.width = totalW * dpr
    canvas.height = totalH * dpr
    canvas.style.width = totalW + 'px'
    canvas.style.height = totalH + 'px'
    ctx.scale(dpr, dpr)

    const ox = padding
    const oy = padding

    // Arka plan
    ctx.fillStyle = '#0a0a0f'
    ctx.fillRect(0, 0, totalW, totalH)

    // Hücreleri çiz
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const key = `${col},${row}`
        const isCrossed = crossedCells.has(key)
        const isAnimated = animatedCells.has(key)
        const isHovered = hoveredCell && hoveredCell[0] === col && hoveredCell[1] === row

        const x = ox + col * cellSize
        const y = oy + row * cellSize

        if (isCrossed && (!animating || isAnimated)) {
          const grad = ctx.createLinearGradient(x, y, x + cellSize, y + cellSize)
          grad.addColorStop(0, 'rgba(255, 94, 58, 0.35)')
          grad.addColorStop(1, 'rgba(255, 149, 0, 0.22)')
          ctx.fillStyle = grad
          ctx.fillRect(x, y, cellSize, cellSize)

          if (isHovered) {
            ctx.fillStyle = 'rgba(255, 120, 50, 0.2)'
            ctx.fillRect(x, y, cellSize, cellSize)
          }
        } else if (isHovered) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.04)'
          ctx.fillRect(x, y, cellSize, cellSize)
        }
      }
    }

    // Izgara çizgileri
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)'
    ctx.lineWidth = 0.5
    for (let i = 0; i <= width; i++) {
      ctx.beginPath()
      ctx.moveTo(ox + i * cellSize, oy)
      ctx.lineTo(ox + i * cellSize, oy + gridH)
      ctx.stroke()
    }
    for (let i = 0; i <= height; i++) {
      ctx.beginPath()
      ctx.moveTo(ox, oy + i * cellSize)
      ctx.lineTo(ox + gridW, oy + i * cellSize)
      ctx.stroke()
    }

    // Dış kenar
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
    ctx.lineWidth = 2
    ctx.strokeRect(ox, oy, gridW, gridH)

    // EBOB kesişim noktaları ve çizgileri
    if (gcdValue > 1) {
      const stepX = width / gcdValue
      const stepY = height / gcdValue
      ctx.setLineDash([3, 3])
      ctx.strokeStyle = 'rgba(100, 210, 255, 0.12)'
      ctx.lineWidth = 1
      for (let i = 1; i < gcdValue; i++) {
        const px = ox + stepX * i * cellSize
        const py = oy + stepY * i * cellSize
        ctx.beginPath()
        ctx.moveTo(px, oy)
        ctx.lineTo(px, oy + gridH)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(ox, py)
        ctx.lineTo(ox + gridW, py)
        ctx.stroke()
      }
      ctx.setLineDash([])

      // EBOB noktaları
      for (let i = 1; i < gcdValue; i++) {
        const px = ox + stepX * i * cellSize
        const py = oy + stepY * i * cellSize
        ctx.fillStyle = 'rgba(100, 210, 255, 0.7)'
        ctx.beginPath()
        ctx.arc(px, py, Math.max(2.5, cellSize * 0.06), 0, Math.PI * 2)
        ctx.fill()
        // Glow
        ctx.fillStyle = 'rgba(100, 210, 255, 0.15)'
        ctx.beginPath()
        ctx.arc(px, py, Math.max(6, cellSize * 0.15), 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Köşegen - glow
    ctx.beginPath()
    ctx.moveTo(ox, oy)
    ctx.lineTo(ox + gridW, oy + gridH)
    ctx.strokeStyle = 'rgba(255, 94, 58, 0.2)'
    ctx.lineWidth = Math.max(6, cellSize * 0.15)
    ctx.stroke()

    // Köşegen - ana çizgi
    ctx.beginPath()
    ctx.moveTo(ox, oy)
    ctx.lineTo(ox + gridW, oy + gridH)
    ctx.strokeStyle = '#ff5e3a'
    ctx.lineWidth = 2
    ctx.stroke()

    // Köşe noktaları
    const dotR = Math.max(3, cellSize * 0.06)
    ctx.fillStyle = '#fff'
    ctx.beginPath()
    ctx.arc(ox, oy, dotR, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(ox + gridW, oy + gridH, dotR, 0, Math.PI * 2)
    ctx.fill()

    // Boyut etiketleri (sadece yeterli alan varsa)
    if (cellSize >= 20) {
      ctx.font = `600 ${Math.min(13, cellSize * 0.3)}px "JetBrains Mono", monospace`
      ctx.textAlign = 'center'
      // Genişlik etiketi (üst)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
      ctx.fillText(`n = ${width}`, ox + gridW / 2, oy - 8)
      // Yükseklik etiketi (sol)
      ctx.save()
      ctx.translate(ox - 8, oy + gridH / 2)
      ctx.rotate(-Math.PI / 2)
      ctx.fillText(`m = ${height}`, 0, 0)
      ctx.restore()
    }

  }, [height, width, crossedCells, animatedCells, animating, hoveredCell, gcdValue])

  // Mouse event handler
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const padding = 24
    const container = canvas.parentElement
    const maxW = container.clientWidth - 24
    const maxH = container.clientHeight - 24 || 450
    const cellSize = Math.min(
      Math.floor((maxW - padding * 2) / width),
      Math.floor((maxH - padding * 2) / height),
      Math.max(12, Math.min(60, 600 / Math.max(width, height)))
    )

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left - padding
      const my = e.clientY - rect.top - padding
      const col = Math.floor(mx / cellSize)
      const row = Math.floor(my / cellSize)
      if (col >= 0 && col < width && row >= 0 && row < height) {
        setHoveredCell([col, row])
      } else {
        setHoveredCell(null)
      }
    }

    const handleLeave = () => setHoveredCell(null)

    canvas.addEventListener('mousemove', handleMouse)
    canvas.addEventListener('mouseleave', handleLeave)
    return () => {
      canvas.removeEventListener('mousemove', handleMouse)
      canvas.removeEventListener('mouseleave', handleLeave)
    }
  }, [height, width])

  return (
    <div className="app-container">
      {/* Header */}
      <div className="app-header">
        <div className="header-title-row">
          <h1 className="header-title">Köşegen Teoremi</h1>
          <span className="header-subtitle">Diagonal Lattice Theorem</span>
        </div>
        <p className="header-desc">
          Bir dikdörtgenin köşegeni kaç birim kareden geçer?
        </p>
        <div className="header-university">
          <img src="assets/Istanbul_Universitesi.png" alt="İstanbul Üniversitesi" />
          <span>Istanbul University - 2009</span>
        </div>
      </div>

      {/* Main */}
      <div className="main-content">
        {/* Controls */}
        <div className="controls-panel">
          {/* Yükseklik */}
          <div className="control-group">
            <label>Yükseklik (m)</label>
            <div className="slider-row">
              <input
                type="range"
                min={1}
                max={50}
                value={Math.min(height, 50)}
                onChange={e => handleHeight(e.target.value)}
              />
              <span className="slider-value">{height}</span>
            </div>
            <div className="number-input-row">
              <input
                type="number"
                className="number-input"
                min={1}
                max={100}
                value={height}
                onChange={e => handleHeight(e.target.value)}
                placeholder="1-100"
              />
            </div>
          </div>

          {/* Genişlik */}
          <div className="control-group">
            <label>Genişlik (n)</label>
            <div className="slider-row">
              <input
                type="range"
                min={1}
                max={50}
                value={Math.min(width, 50)}
                onChange={e => handleWidth(e.target.value)}
              />
              <span className="slider-value">{width}</span>
            </div>
            <div className="number-input-row">
              <input
                type="number"
                className="number-input"
                min={1}
                max={100}
                value={width}
                onChange={e => handleWidth(e.target.value)}
                placeholder="1-100"
              />
            </div>
          </div>

          <div className="divider" />

          {/* Sonuç */}
          <div className="result-box">
            <div className="result-label">Sonuç</div>
            <div className="result-value">{crossedCount}</div>
            <div className="result-unit">birim kareden geçer</div>
          </div>

          {/* Hesaplama detayları */}
          <div className="calc-details">
            <div className="calc-row">
              <span>m + n</span>
              <span className="value">{height} + {width} = {height + width}</span>
            </div>
            <div className="calc-row">
              <span>EBOB(m, n)</span>
              <span className="value cyan">gcd({height}, {width}) = {gcdValue}</span>
            </div>
            <div className="calc-divider" />
            <div className="calc-row">
              <span>m + n − gcd</span>
              <span className="value orange">{height + width} − {gcdValue} = {crossedCount}</span>
            </div>
          </div>

          {/* Formül açıklaması */}
          <button className="formula-toggle" onClick={() => setShowFormula(!showFormula)}>
            {showFormula ? '▾' : '▸'} Formül Açıklaması
          </button>

          {showFormula && (
            <div className="formula-content">
              <p>
                Bir <strong>m × n</strong> dikdörtgenin köşegeninin geçtiği
                birim kare sayısı:
              </p>
              <div className="formula-box">
                m + n − gcd(m, n)
              </div>
              <p>
                Köşegen her yatay veya dikey ızgara çizgisini geçtiğinde yeni bir kareye girer.
                Toplamda <strong>m + n</strong> çizgi geçişi olur, ancak köşegen bir ızgara
                noktasından (köşe noktası) geçtiğinde iki çizgiyi aynı anda geçer.
                Bu <strong>gcd(m, n)</strong> kez olur, bu yüzden çıkarılır.
              </p>
              <p style={{ marginTop: 8, color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>
                Not: EBOB(m,n) = 1 ise köşegen hiçbir iç ızgara noktasından geçmez (aralarında asal).
              </p>
            </div>
          )}

          {/* Animasyon butonu */}
          <button
            className={`animate-btn ${animating ? 'disabled' : ''}`}
            onClick={animating ? undefined : runAnimation}
          >
            {animating ? '⏳ Animasyon...' : '▶  Animasyonu Başlat'}
          </button>

          {/* Hızlı örnekler */}
          <div>
            <div className="presets-label">Hızlı Örnekler</div>
            <div className="presets-grid">
              {PRESETS.map(([h, w]) => (
                <button
                  key={`${h}x${w}`}
                  className={`preset-btn ${height === h && width === w ? 'active' : ''}`}
                  onClick={() => { setHeight(h); setWidth(w); clearAnimation() }}
                >
                  {h}×{w}
                </button>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="legend">
            <div><span className="legend-dot orange" /> Köşegenin geçtiği kareler</div>
            <div><span className="legend-dot cyan" /> EBOB kesişim noktaları</div>
          </div>
        </div>

        {/* Canvas */}
        <div className="canvas-area">
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  )
}

export default App
