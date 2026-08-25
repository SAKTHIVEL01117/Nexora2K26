import os
import subprocess

# 1. NEXORA SVG
nexora_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <defs>
    <!-- Gradients -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#02050f"/>
      <stop offset="50%" stop-color="#040b1e"/>
      <stop offset="100%" stop-color="#010308"/>
    </linearGradient>

    <linearGradient id="leftLegGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00beff"/>
      <stop offset="60%" stop-color="#0066ff"/>
      <stop offset="100%" stop-color="#0038b3"/>
    </linearGradient>

    <linearGradient id="rightLegGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00c8ff"/>
      <stop offset="70%" stop-color="#0052cc"/>
      <stop offset="100%" stop-color="#002b80"/>
    </linearGradient>

    <linearGradient id="diagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="30%" stop-color="#cbeffe"/>
      <stop offset="70%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>

    <linearGradient id="cyanAccent" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00f0ff"/>
      <stop offset="100%" stop-color="#0088ff"/>
    </linearGradient>

    <!-- Glow filters -->
    <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="6" result="blur1"/>
      <feGaussianBlur stdDeviation="15" result="blur2"/>
      <feMerge>
        <feMergeNode in="blur2"/>
        <feMergeNode in="blur1"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <filter id="intenseGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="10" result="blur1"/>
      <feGaussianBlur stdDeviation="25" result="blur2"/>
      <feMerge>
        <feMergeNode in="blur2"/>
        <feMergeNode in="blur1"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Dark Background -->
  <rect width="500" height="500" fill="url(#bgGrad)"/>

  <!-- Radial ambient glow behind emblem -->
  <circle cx="250" cy="240" r="180" fill="#0284c7" opacity="0.22" filter="url(#intenseGlow)"/>

  <!-- Main 'N' Logo Geometry -->
  <g transform="translate(10, 10)">
    <!-- Left Vertical Bar with angled top/bottom -->
    <path d="M 120 80 L 170 80 L 170 420 L 120 420 Z" fill="url(#leftLegGrad)"/>
    <!-- Top angled bevel cut on left leg -->
    <path d="M 120 80 L 170 130 L 170 80 Z" fill="#ffffff" opacity="0.4"/>

    <!-- Right Vertical Bar -->
    <path d="M 310 80 L 360 80 L 360 420 L 310 420 Z" fill="url(#rightLegGrad)"/>
    <!-- Top sharp angle on right leg -->
    <path d="M 310 80 L 360 170 L 310 420 Z" fill="url(#cyanAccent)" opacity="0.6"/>

    <!-- Central Diagonal Band -->
    <path d="M 120 80 L 360 360 L 360 420 L 310 420 L 120 180 Z" fill="url(#diagGrad)"/>

    <!-- Inner Chevron / Diagonal Cross Cutout -->
    <path d="M 190 230 L 310 350 L 360 300 L 240 180 Z" fill="url(#cyanAccent)"/>
    <path d="M 190 230 L 260 210 L 360 300 L 290 320 Z" fill="#00d8ff" opacity="0.9"/>
  </g>

  <!-- Glowing Light Arc Beam sweeping across -->
  <path d="M -20 400 Q 180 280 520 170" fill="none" stroke="#00e1ff" stroke-width="8" filter="url(#neonGlow)" opacity="0.95"/>
  <path d="M -20 400 Q 180 280 520 170" fill="none" stroke="#ffffff" stroke-width="3" filter="url(#neonGlow)"/>

  <!-- Light Particle Flares -->
  <!-- Left Endpoint Dot -->
  <circle cx="5" cy="392" r="7" fill="#00ffff" filter="url(#intenseGlow)"/>
  <circle cx="5" cy="392" r="3" fill="#ffffff"/>

  <!-- Right Endpoint Dot -->
  <circle cx="505" cy="174" r="8" fill="#00ffff" filter="url(#intenseGlow)"/>
  <circle cx="505" cy="174" r="4" fill="#ffffff"/>
</svg>
"""

# 2. HITECH SVG
hitech_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 480" width="360" height="480">
  <!-- Card Outer Background -->
  <rect x="5" y="5" width="350" height="470" rx="24" ry="24" fill="#ffffff" stroke="#1f2937" stroke-width="3"/>
  
  <!-- Top Text: HINDUSTHAN -->
  <text x="180" y="52" font-family="Georgia, 'Times New Roman', serif" font-weight="900" font-size="28" fill="#111827" text-anchor="middle" letter-spacing="2">HINDUSTHAN</text>
  
  <!-- Subtext: EDUCATIONAL AND -->
  <text x="180" y="78" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="16" fill="#1f2937" text-anchor="middle" letter-spacing="3">EDUCATIONAL AND</text>

  <!-- Vertical Right Text: CHARITABLE TRUST -->
  <g transform="translate(325, 230) rotate(90)">
    <text x="0" y="0" font-family="Georgia, 'Times New Roman', serif" font-weight="800" font-size="18" fill="#111827" text-anchor="middle" letter-spacing="4">CHARITABLE TRUST</text>
  </g>

  <!-- Yellow Tombstone Arch Shield -->
  <path d="M 60 115 A 65 65 0 0 1 240 115 L 240 370 L 60 370 Z" fill="#FEDB00" stroke="#111827" stroke-width="2.5"/>

  <!-- Hand & Torch Graphic inside yellow arch -->
  <g transform="translate(15, 10)">
    <!-- Flame Outer -->
    <path d="M 135 150 C 120 120, 130 90, 150 75 C 160 90, 175 80, 180 65 C 200 85, 215 105, 205 130 C 220 115, 225 125, 215 145 C 205 165, 175 175, 135 150 Z" fill="#E63946" stroke="#111827" stroke-width="2"/>
    <!-- Flame Inner Core -->
    <path d="M 150 145 C 142 130, 150 110, 165 95 C 172 105, 182 100, 185 90 C 198 105, 205 118, 198 135 C 188 150, 170 155, 150 145 Z" fill="#F4A261" stroke="#111827" stroke-width="1.5"/>

    <!-- Torch Bowl -->
    <polygon points="120,180 210,180 195,200 135,200" fill="#6C757D" stroke="#111827" stroke-width="2.5"/>

    <!-- Torch Handle Column -->
    <rect x="150" y="200" width="30" height="130" fill="#495057" stroke="#111827" stroke-width="2.5"/>
    <ellipse cx="165" cy="330" rx="18" ry="8" fill="#343A40" stroke="#111827" stroke-width="2"/>

    <!-- Hands Holding Torch -->
    <!-- Left Arm/Hand -->
    <path d="M 70 340 Q 120 300 150 225 L 175 225 C 165 260, 140 310, 110 360 Z" fill="#ffffff" stroke="#111827" stroke-width="2.5"/>
    <ellipse cx="112" cy="318" rx="8" ry="12" fill="#111827" transform="rotate(-30 112 318)"/>

    <!-- Right Arm/Hand -->
    <path d="M 260 320 Q 210 280 180 235 L 160 235 C 175 270, 195 305, 220 350 Z" fill="#ffffff" stroke="#111827" stroke-width="2.5"/>

    <!-- Hand Grips (Fingers) on handle -->
    <rect x="145" y="228" width="40" height="8" rx="3" fill="#ffffff" stroke="#111827" stroke-width="2"/>
    <rect x="145" y="238" width="40" height="8" rx="3" fill="#ffffff" stroke="#111827" stroke-width="2"/>
    <rect x="145" y="248" width="40" height="8" rx="3" fill="#ffffff" stroke="#111827" stroke-width="2"/>
    <rect x="145" y="258" width="40" height="8" rx="3" fill="#ffffff" stroke="#111827" stroke-width="2"/>
  </g>

  <!-- Bottom Text: HITECH -->
  <text x="180" y="445" font-family="Georgia, 'Times New Roman', serif" font-weight="900" font-size="38" fill="#111827" text-anchor="middle" letter-spacing="6">HITECH</text>
</svg>
"""

with open("public/nexora.svg", "w") as f:
    f.write(nexora_svg)

with open("public/hitech.svg", "w") as f:
    f.write(hitech_svg)

print("SVG files generated successfully!")
