import React, { useState, useMemo, useCallback } from 'react';

// Palette Intelcia fixe
const INTELCIA_PALETTE = [
  { hex: '#FFCC00', name: 'Jaune' },
  { hex: '#F5A623', name: 'Orange' },
  { hex: '#E91E8C', name: 'Rose' },
  { hex: '#9B59B6', name: 'Violet' },
  { hex: '#3498DB', name: 'Bleu' },
  { hex: '#1ABC9C', name: 'Turquoise' },
  { hex: '#2ECC71', name: 'Vert' },
];

// Composant Logo Intelcia
const IntelciaLogo = ({ color = '#ffffff', width = 400 }) => (
  <svg viewBox="0 0 592.16 184.4" width={width} style={{ display: 'block' }}>
    <path fill={color} d="M387.46,107.08l-.12-19.72c-.02-3.82.85-7.05,2.52-9.35,1.76-2.42,4.31-3.7,7.36-3.72l21.67-.13c9.75-.06,12.03-13.54,12.13-14.11l.1-.66-40.72.24c-15.47.09-21.39,12.16-21.76,22.46l.13,26.83.06,1.43.03.37c1.13,17.58,11.45,21.21,19.99,21.16l30.38-.18c9.24-.05,12.09-13.96,12.11-14.1l.14-.7-33.41.2s-.07,0-.11,0c-6.65,0-10.49-3.65-10.52-10.03Z"/>
    <path fill={color} d="M337.37,115.09c-2.05-1.76-2.07-4.5-2.09-9.02l-.43-71.7-.59.04c-.05,0-4.69.36-9.29,2.65-5.75,2.87-8.65,7.34-8.62,13.29l.38,63.67c.03,5.05,1.89,9.62,5.23,12.86,3.32,3.23,7.96,5,13.06,5,.04,0,.09,0,.13,0l15.62-.09c9.5-.06,12.02-13.58,12.12-14.15l.12-.67-13.68.08c-6.51.05-9.97-.24-11.96-1.96Z"/>
    <path fill={color} d="M514.04,74.23h.08c5,0,10.38,2.89,10.41,9.28l.02,2.74-31.29.19c-6.88.04-12.08,2.03-15.47,5.92-3.43,3.94-5.14,9.96-5.09,17.88.09,14.55,6.82,21.63,20.59,21.63.08,0,.16,0,.24,0l28.25-.17c16.05-.1,21.86-12.68,21.95-23.42l-.16-26.97c-.06-10.26-5.23-22.22-19.56-22.22-.05,0-.1,0-.15,0l-31.36.19c-8.44.05-11.64,10.53-12.15,13.81l-.21,1.34M514.26,116.68l-15.81.09h-.07c-2.01,0-3.55-.52-4.6-1.55h0c-1.77-1.75-1.78-4.55-1.79-6.06-.02-2.95,1.62-7.65,6.08-7.67l26.57-.16.02,3.18c.05,7.81-3.65,12.13-10.4,12.17Z"/>
    <path fill={color} d="M300.86,64.4c-3.39-3.51-8.55-5.29-15.33-5.29-.08,0-.15,0-.23,0l-28.25.17c-16.05.1-21.86,12.68-21.95,23.42l.16,26.97c.06,10.26,5.23,22.21,19.56,22.21.05,0,.1,0,.15,0l35.16-.21c8.44-.05,11.32-9.7,12.16-13.84l.08-.27.46-1.05-38.06.24h-.08c-5,0-10.37-2.89-10.41-9.28l-.02-2.74,31.29-.19c13.93-.08,20.65-7.87,20.56-23.8-.04-7.27-1.81-12.77-5.26-16.34ZM285.79,86.2c-1.07,2.11-2.86,3.28-5.03,3.29l-26.57.16-.02-3.18c-.02-3.83.85-6.83,2.59-8.91,1.8-2.14,4.42-3.24,7.81-3.26l15.81-.09c2.03,0,3.62.51,4.67,1.56,1.77,1.75,1.78,4.55,1.79,6.05,0,1.06-.27,2.84-1.05,4.39Z"/>
    <rect fill={color} x="441.79" y="59.43" width="18.56" height="72.39" transform="translate(-.56 2.68) rotate(-.34)"/>
    <path fill={color} d="M201.46,106.07h0s-.19-31.71-.19-31.71l19.78-.12-.09-14.72-19.78.12-.15-25.27-.59.04c-.05,0-4.69.36-9.29,2.66-5.75,2.87-8.65,7.34-8.62,13.28l.38,63.67c.06,10.37,7.75,17.86,18.29,17.86.04,0,.09,0,.13,0l15.61-.09c8.23-.05,12.08-13.96,12.11-14.1l.19-.72-13.75.08c-13.03.09-14-1.45-14.05-10.98Z"/>
    <path fill={color} d="M158.75,63.02c-6.09-2.64-12.29-2.92-12.69-2.94l-37.26.22.43,71.58,18.72-.11-.34-57.79,13.05-.08c4.28-.01,7.84,1.4,10.17,4.11,2.11,2.46,3.25,5.94,3.27,10.09l.26,43.52,17.03-.1-.3-50.88c-.05-8.16-4.2-14.08-12.34-17.61Z"/>
    <path fill={color} d="M77.78,80.61l.3,51.27,17.8-.11-.42-71.09c-4.76,1.64-17.76,7.29-17.68,19.93Z"/>
    <rect fill={color} x="77.96" y="34.37" width="17.73" height="17.73" rx="6.68" ry="6.68"/>
  </svg>
);

// Fonctions de conversion couleur
const hexToHSL = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
};

const hslToHex = (h, s, l) => {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

const getAverageLuminosity = (colors) => {
  const totalL = colors.reduce((sum, hex) => sum + hexToHSL(hex).l, 0);
  return totalL / colors.length;
};

export default function App() {
  // Couleurs sélectionnées (autorisées pour la génération)
  const [selectedColors, setSelectedColors] = useState(
    INTELCIA_PALETTE.map(c => c.hex) // Par défaut toutes sélectionnées
  );
  
  // Gradient actuellement généré
  const [generatedColors, setGeneratedColors] = useState({
    accent: INTELCIA_PALETTE[0].hex,
    start: INTELCIA_PALETTE[1].hex,
    end: INTELCIA_PALETTE[2].hex
  });
  
  const [useAccent, setUseAccent] = useState(true);
  const [angle, setAngle] = useState(90);
  const [steps, setSteps] = useState(2);
  const [easing, setEasing] = useState('linear');
  const [showLogo, setShowLogo] = useState(true);
  const [copiedCSS, setCopiedCSS] = useState(false);

  // Toggle une couleur dans la sélection
  const toggleColor = (hex) => {
    setSelectedColors(prev => {
      if (prev.includes(hex)) {
        // Ne pas permettre moins de 2 couleurs (ou 3 si accent activé)
        const minColors = useAccent ? 3 : 2;
        if (prev.length <= minColors) return prev;
        return prev.filter(c => c !== hex);
      } else {
        return [...prev, hex];
      }
    });
  };

  // Sélectionner toutes les couleurs
  const selectAll = () => {
    setSelectedColors(INTELCIA_PALETTE.map(c => c.hex));
  };

  // Désélectionner au minimum requis
  const selectMinimum = () => {
    const minColors = useAccent ? 3 : 2;
    setSelectedColors(INTELCIA_PALETTE.slice(0, minColors).map(c => c.hex));
  };

  // Génère un gradient aléatoire depuis les couleurs sélectionnées uniquement
  const generateGradient = () => {
    if (selectedColors.length < (useAccent ? 3 : 2)) return;
    
    const shuffled = [...selectedColors].sort(() => Math.random() - 0.5);
    
    setGeneratedColors({
      accent: shuffled[0],
      start: useAccent ? shuffled[1] : shuffled[0],
      end: useAccent ? shuffled[2] : shuffled[1]
    });
  };

  // Génération des stops du gradient
  const generateGradientStops = useCallback(() => {
    const { accent, start, end } = generatedColors;
    
    if (steps <= 2) {
      if (useAccent) {
        return `${accent} 0%, ${start} 15%, ${end} 100%`;
      }
      return `${start} 0%, ${end} 100%`;
    }

    const startHSL = hexToHSL(start);
    const endHSL = hexToHSL(end);
    const stops = [];

    if (useAccent) {
      stops.push(`${accent} 0%`);
    }

    for (let i = 0; i <= steps - 1; i++) {
      let t = i / (steps - 1);
      
      switch (easing) {
        case 'ease-in': t = t * t; break;
        case 'ease-out': t = 1 - (1 - t) * (1 - t); break;
        case 'ease-in-out': t = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; break;
        default: break;
      }

      let h = startHSL.h + (endHSL.h - startHSL.h) * t;
      if (Math.abs(endHSL.h - startHSL.h) > 180) {
        if (startHSL.h < endHSL.h) {
          h = startHSL.h - (360 - endHSL.h + startHSL.h) * t;
        } else {
          h = startHSL.h + (360 - startHSL.h + endHSL.h) * t;
        }
      }
      h = (h + 360) % 360;

      const s = startHSL.s + (endHSL.s - startHSL.s) * t;
      const l = startHSL.l + (endHSL.l - startHSL.l) * t;
      const color = hslToHex(h, s, l);
      const position = useAccent ? 15 + (i / (steps - 1)) * 85 : (i / (steps - 1)) * 100;
      stops.push(`${color} ${position.toFixed(0)}%`);
    }

    return stops.join(', ');
  }, [generatedColors, useAccent, steps, easing]);

  const gradientCSS = useMemo(() => {
    const stops = generateGradientStops();
    return `linear-gradient(${angle}deg, ${stops})`;
  }, [generateGradientStops, angle]);

  const logoColor = useMemo(() => {
    const colors = useAccent 
      ? [generatedColors.accent, generatedColors.start, generatedColors.end]
      : [generatedColors.start, generatedColors.end];
    const avgLuminosity = getAverageLuminosity(colors);
    return avgLuminosity > 55 ? '#000000' : '#ffffff';
  }, [generatedColors, useAccent]);

  const copyCSS = () => {
    const css = `background: ${gradientCSS};`;
    navigator.clipboard.writeText(css);
    setCopiedCSS(true);
    setTimeout(() => setCopiedCSS(false), 2000);
  };

  const minColorsRequired = useAccent ? 3 : 2;
  const canGenerate = selectedColors.length >= minColorsRequired;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#09090b',
      color: '#fff',
      fontFamily: "'IBM Plex Sans', -apple-system, sans-serif",
      padding: '2rem'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=Space+Mono&display=swap');
        
        * { box-sizing: border-box; }
        
        .panel {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 1.5rem;
        }
        
        .label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.4);
          margin-bottom: 0.75rem;
          font-weight: 500;
        }
        
        .slider-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .slider {
          -webkit-appearance: none;
          width: 100%;
          height: 4px;
          border-radius: 2px;
          background: rgba(255,255,255,0.1);
          outline: none;
        }
        
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        
        .slider-value {
          font-family: 'Space Mono', monospace;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.6);
        }
        
        .btn {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.75rem;
          font-weight: 500;
          transition: all 0.2s;
          font-family: inherit;
        }
        
        .btn:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.15);
        }
        
        .btn-generate {
          background: #fff;
          color: #000;
          border: none;
          font-size: 0.9rem;
          padding: 1rem 2rem;
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        
        .btn-generate:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(255,255,255,0.2);
        }
        
        .btn-generate:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        
        .select {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          color: #fff;
          padding: 0.55rem 0.75rem;
          border-radius: 8px;
          font-size: 0.8rem;
          cursor: pointer;
          outline: none;
          width: 100%;
          font-family: inherit;
        }
        
        .select option {
          background: #18181b;
          color: #fff;
        }
        
        .code-block {
          background: rgba(0,0,0,0.4);
          border-radius: 8px;
          padding: 1rem;
          font-family: 'Space Mono', monospace;
          font-size: 0.68rem;
          color: #86efac;
          overflow-x: auto;
          white-space: pre-wrap;
          word-break: break-all;
          line-height: 1.5;
        }
        
        .toggle-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .toggle {
          position: relative;
          width: 40px;
          height: 22px;
          background: rgba(255,255,255,0.1);
          border-radius: 11px;
          cursor: pointer;
          transition: background 0.3s;
        }
        
        .toggle.active {
          background: #3498DB;
        }
        
        .toggle-knob {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 18px;
          height: 18px;
          background: #fff;
          border-radius: 50%;
          transition: transform 0.3s;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .toggle.active .toggle-knob {
          transform: translateX(18px);
        }
        
        .palette-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
          gap: 8px;
        }
        
        .palette-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        
        .palette-color {
          width: 100%;
          aspect-ratio: 1;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
          border: 3px solid transparent;
          position: relative;
          opacity: 0.35;
        }
        
        .palette-color.selected {
          opacity: 1;
          border-color: #fff;
          box-shadow: 0 0 0 2px rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.3);
        }
        
        .palette-color:hover {
          transform: scale(1.05);
        }
        
        .palette-color-check {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 24px;
          height: 24px;
          background: rgba(255,255,255,0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          opacity: 0;
          transition: opacity 0.2s;
        }
        
        .palette-color.selected .palette-color-check {
          opacity: 1;
        }
        
        .palette-name {
          font-size: 0.6rem;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .palette-color.selected + .palette-name {
          color: rgba(255,255,255,0.7);
        }

        .selection-actions {
          display: flex;
          gap: 8px;
          margin-top: 1rem;
        }

        .generated-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0.75rem;
          background: rgba(0,0,0,0.2);
          border-radius: 8px;
        }
        
        .color-dot {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          border: 2px solid rgba(255,255,255,0.1);
        }
        
        .arrow {
          color: rgba(255,255,255,0.2);
          font-size: 0.7rem;
        }
        
        .preview-modes {
          display: flex;
          gap: 4px;
          background: rgba(0,0,0,0.3);
          padding: 4px;
          border-radius: 8px;
        }
        
        .preview-mode-btn {
          flex: 1;
          padding: 0.5rem;
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.5);
          font-size: 0.75rem;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s;
          font-family: inherit;
        }
        
        .preview-mode-btn.active {
          background: rgba(255,255,255,0.1);
          color: #fff;
        }
        
        .selection-count {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.4);
          margin-top: 0.5rem;
        }

        .grid-layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        
        @media (max-width: 860px) {
          .grid-layout {
            grid-template-columns: 1fr;
          }
        }
        
        .controls-panel {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .preview-panel {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
      `}</style>

      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ 
          fontSize: '1.1rem', 
          fontWeight: 300, 
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginBottom: '0.25rem',
          color: 'rgba(255,255,255,0.6)'
        }}>
          Gradient Generator
        </h1>
      </header>

      <div className="grid-layout">
        {/* Panneau de contrôles */}
        <div className="controls-panel">
          
          {/* Sélection des couleurs */}
          <div className="panel">
            <div className="label">Couleurs autorisées</div>
            <div className="palette-grid">
              {INTELCIA_PALETTE.map((color, i) => (
                <div key={i} className="palette-item">
                  <div 
                    className={`palette-color ${selectedColors.includes(color.hex) ? 'selected' : ''}`}
                    style={{ background: color.hex }}
                    onClick={() => toggleColor(color.hex)}
                  >
                    <div className="palette-color-check">✓</div>
                  </div>
                  <span className="palette-name">{color.name}</span>
                </div>
              ))}
            </div>
            
            <div className="selection-actions">
              <button className="btn" onClick={selectAll} style={{ flex: 1 }}>
                Toutes
              </button>
              <button className="btn" onClick={selectMinimum} style={{ flex: 1 }}>
                Minimum
              </button>
            </div>
            
            <div className="selection-count">
              {selectedColors.length} couleur{selectedColors.length > 1 ? 's' : ''} sélectionnée{selectedColors.length > 1 ? 's' : ''}
              {selectedColors.length < minColorsRequired && (
                <span style={{ color: '#ef4444', marginLeft: '8px' }}>
                  (min. {minColorsRequired} requises)
                </span>
              )}
            </div>
          </div>

          {/* Bouton Generate */}
          <button 
            onClick={generateGradient} 
            className="btn btn-generate" 
            style={{ width: '100%' }}
            disabled={!canGenerate}
          >
            Generate
          </button>

          {/* Résultat actuel */}
          <div className="generated-indicator">
            <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginRight: '4px' }}>Actuel:</span>
            {useAccent && (
              <>
                <div className="color-dot" style={{ background: generatedColors.accent }} />
                <span className="arrow">→</span>
              </>
            )}
            <div className="color-dot" style={{ background: generatedColors.start }} />
            <span className="arrow">→</span>
            <div className="color-dot" style={{ background: generatedColors.end }} />
          </div>

          {/* Configuration */}
          <div className="panel">
            <div className="label">Configuration</div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="toggle-container">
                <div 
                  className={`toggle ${useAccent ? 'active' : ''}`}
                  onClick={() => setUseAccent(!useAccent)}
                >
                  <div className="toggle-knob" />
                </div>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
                  Accent distinct
                </span>
              </div>

              <div className="slider-container">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>Angle</span>
                  <span className="slider-value">{angle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(parseInt(e.target.value))}
                  className="slider"
                />
              </div>

              <div className="slider-container">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>Étapes</span>
                  <span className="slider-value">{steps}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="8"
                  value={steps}
                  onChange={(e) => setSteps(parseInt(e.target.value))}
                  className="slider"
                />
              </div>

              <div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.4rem' }}>Interpolation</div>
                <select 
                  value={easing} 
                  onChange={(e) => setEasing(e.target.value)}
                  className="select"
                >
                  <option value="linear">Linéaire</option>
                  <option value="ease-in">Ease In</option>
                  <option value="ease-out">Ease Out</option>
                  <option value="ease-in-out">Ease In-Out</option>
                </select>
              </div>
            </div>
          </div>

          {/* Code CSS */}
          <div className="panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div className="label" style={{ margin: 0 }}>CSS</div>
              <button onClick={copyCSS} className="btn" style={{ padding: '0.35rem 0.7rem', fontSize: '0.7rem' }}>
                {copiedCSS ? '✓' : 'Copier'}
              </button>
            </div>
            <div className="code-block">
{`background: ${gradientCSS};`}
            </div>
          </div>
        </div>

        {/* Panneau de preview */}
        <div className="preview-panel">
          {/* Toggle Logo / Background only */}
          <div className="preview-modes">
            <button 
              className={`preview-mode-btn ${showLogo ? 'active' : ''}`}
              onClick={() => setShowLogo(true)}
            >
              Avec logo
            </button>
            <button 
              className={`preview-mode-btn ${!showLogo ? 'active' : ''}`}
              onClick={() => setShowLogo(false)}
            >
              Background seul
            </button>
          </div>

          {/* Preview principal */}
          <div 
            style={{ 
              background: gradientCSS,
              borderRadius: '16px',
              aspectRatio: '16 / 9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.4s ease'
            }}
          >
            {showLogo && (
              <IntelciaLogo color={logoColor} width={360} />
            )}
          </div>

          {/* Previews secondaires */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div 
              style={{ 
                background: gradientCSS,
                borderRadius: '12px',
                aspectRatio: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.4s ease'
              }}
            >
              {showLogo && <IntelciaLogo color={logoColor} width={120} />}
            </div>
            <div 
              style={{ 
                background: gradientCSS,
                borderRadius: '12px',
                aspectRatio: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.4s ease'
              }}
            >
              {showLogo && <IntelciaLogo color={logoColor} width={80} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
