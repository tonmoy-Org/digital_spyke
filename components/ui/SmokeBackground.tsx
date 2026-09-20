'use client';

import React, { useEffect, useRef, useState } from 'react';

interface SmokeBackgroundProps {
  className?: string;
  intensity?: number;
}

export default function SmokeBackground({
  className = '',
  intensity = 1.0,
}: SmokeBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Check WebGL availability
    const gl =
      canvas.getContext('webgl', {
        alpha: false,
        antialias: false,
        powerPreference: 'high-performance',
      }) ||
      canvas.getContext('experimental-webgl', {
        alpha: false,
        antialias: false,
        powerPreference: 'high-performance',
      });

    if (!gl) {
      setWebGlSupported(false);
      return;
    }

    const glCtx = gl as WebGLRenderingContext;

    // Vertex shader source
    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader source
    const fsSource = `
      precision highp float;

      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_intensity;

      // Hash & noise functions
      vec2 hash2(vec2 p) {
        p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
        return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
              dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
          mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
              dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      // Fractional Brownian Motion with rotation matrix to avoid grid artifacts
      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.52;
        mat2 rot = mat2(0.80, 0.60, -0.60, 0.80);
        for (int i = 0; i < 5; i++) {
          v += a * noise(p);
          p = rot * p * 2.05 + vec2(10.5, 4.3);
          a *= 0.48;
        }
        return v;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        // Normalized coordinates centered with aspect ratio correction
        vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

        // Smooth mouse influence
        vec2 m = (u_mouse * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        float dMouse = length(p - m);
        vec2 mouseDrift = (p - m) * exp(-dMouse * 2.2) * 0.18;
        p += mouseDrift;

        // Elegant slow smoke flow
        float t = u_time * 0.085;

        // Dual domain warping for volumetric smoke billows & fluid tendrils
        vec2 q = vec2(
          fbm(p + vec2(0.0, 0.0) + vec2(t * 0.32, t * 0.22)),
          fbm(p + vec2(5.2, 1.3) + vec2(-t * 0.25, t * 0.28))
        );

        vec2 r = vec2(
          fbm(p + 3.2 * q + vec2(1.7, 9.2) + vec2(t * 0.16, -t * 0.12)),
          fbm(p + 3.2 * q + vec2(8.3, 2.8) + vec2(-t * 0.14, t * 0.18))
        );

        float f = fbm(p + 3.5 * r + vec2(t * 0.07, t * 0.05));

        // Refine smoke billow shape
        float smoke = clamp(f * 0.5 + 0.5, 0.0, 1.0);
        float smokeCurve = smoothstep(0.12, 0.86, smoke);
        float swirl = clamp(length(q) * 0.65 + length(r) * 0.45, 0.0, 1.0);

        // Color Palette tailored to match the reference:
        // Deep obsidian navy / black base
        vec3 cBg = vec3(0.012, 0.022, 0.045);          // Deep midnight #03060c
        // Deep ocean navy
        vec3 cDeepNavy = vec3(0.035, 0.095, 0.24);     // #09183d
        // Rich royal indigo
        vec3 cRoyalNavy = vec3(0.07, 0.22, 0.52);      // #123885
        // Vibrant electric blue smoke crests
        vec3 cVibrantBlue = vec3(0.14, 0.44, 0.95);    // #2470f2
        // Glowing cyan-blue mist highlights
        vec3 cCyanWisp = vec3(0.28, 0.72, 1.0);        // #47b8ff

        // Layered smoke shading
        vec3 color = mix(cBg, cDeepNavy, smokeCurve);
        color = mix(color, cRoyalNavy, clamp(pow(r.x * 1.25, 2.0), 0.0, 1.0));
        color = mix(color, cVibrantBlue, clamp(pow(smokeCurve, 2.2) * swirl * 1.25 * u_intensity, 0.0, 1.0));
        color += cCyanWisp * pow(clamp(f * swirl, 0.0, 1.0), 3.0) * 0.55 * u_intensity;

        // Center attenuation for clean typography readability
        float distFromCenter = length(uv - vec2(0.5, 0.5));
        float centerGlow = smoothstep(0.0, 0.8, distFromCenter);
        color = mix(color * 0.82, color * 1.08, centerGlow);

        // Soft peripheral fade
        float vignette = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
        vignette = clamp(pow(16.0 * vignette, 0.22), 0.0, 1.0);
        color *= (0.4 + 0.6 * vignette);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Compile helper
    const createShader = (type: number, source: string) => {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.error('Shader compile error:', glCtx.getShaderInfoLog(shader));
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(glCtx.VERTEX_SHADER, vsSource);
    const fs = createShader(glCtx.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) {
      setWebGlSupported(false);
      return;
    }

    const program = glCtx.createProgram();
    if (!program) return;
    glCtx.attachShader(program, vs);
    glCtx.attachShader(program, fs);
    glCtx.linkProgram(program);

    if (!glCtx.getProgramParameter(program, glCtx.LINK_STATUS)) {
      console.error('Program link error:', glCtx.getProgramInfoLog(program));
      return;
    }

    glCtx.useProgram(program);

    // Fullscreen quad
    const positionBuffer = glCtx.createBuffer();
    glCtx.bindBuffer(glCtx.ARRAY_BUFFER, positionBuffer);
    glCtx.bufferData(
      glCtx.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      glCtx.STATIC_DRAW
    );

    const aPosition = glCtx.getAttribLocation(program, 'a_position');
    glCtx.enableVertexAttribArray(aPosition);
    glCtx.vertexAttribPointer(aPosition, 2, glCtx.FLOAT, false, 0, 0);

    const uResolution = glCtx.getUniformLocation(program, 'u_resolution');
    const uTime = glCtx.getUniformLocation(program, 'u_time');
    const uMouse = glCtx.getUniformLocation(program, 'u_mouse');
    const uIntensity = glCtx.getUniformLocation(program, 'u_intensity');

    // Mouse positions & smoothing
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
      targetMouseY = (rect.height - (e.clientY - rect.top)) * (canvas.height / rect.height);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle resizing smoothly
    let animationFrameId: number;
    const startTime = performance.now();
    let isVisible = true;

    const resize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // Optimized for ultra smooth 60fps
      const w = Math.max(1, Math.floor(rect.width * dpr));
      const h = Math.max(1, Math.floor(rect.height * dpr));

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        glCtx.viewport(0, 0, w, h);
        targetMouseX = w / 2;
        targetMouseY = h / 2;
        currentMouseX = w / 2;
        currentMouseY = h / 2;
      }
    };

    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);

    // Pause when scrolled out of view for great performance
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Render loop
    const render = () => {
      if (isVisible) {
        const elapsed = (performance.now() - startTime) * 0.001;

        // Smooth mouse lerp
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        glCtx.uniform2f(uResolution, canvas.width, canvas.height);
        glCtx.uniform1f(uTime, elapsed);
        glCtx.uniform2f(uMouse, currentMouseX, currentMouseY);
        glCtx.uniform1f(uIntensity, intensity);

        glCtx.drawArrays(glCtx.TRIANGLES, 0, 6);
      }
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (glCtx) {
        glCtx.deleteProgram(program);
        glCtx.deleteShader(vs);
        glCtx.deleteShader(fs);
        glCtx.deleteBuffer(positionBuffer);
      }
    };
  }, [intensity]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {webGlSupported ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
          style={{ opacity: 0.98 }}
        />
      ) : (
        // CSS Fallback for browsers without WebGL
        <div className="absolute inset-0 bg-gradient-to-b from-[#02050e] via-[#07173b] to-[#020409] animate-pulse" />
      )}

      {/* Atmospheric depth overlays */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-40 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />
    </div>
  );
}
