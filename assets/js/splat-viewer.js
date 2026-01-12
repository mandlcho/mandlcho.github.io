(function () {
  'use strict';

  // WebGL shader programs adapted from antimatter15/splat
  const vertexShaderSource = `
    precision highp float;
    precision highp int;

    attribute vec2 position;
    attribute float index;

    uniform mat4 projection, view;
    uniform vec2 focal;
    uniform vec2 viewport;

    uniform sampler2D u_texture;

    varying vec4 vColor;
    varying vec2 vPosition;

    void main () {
      gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
      int splatIndex = int(index);
      int texWidth = 2048;
      int texHeight = textureSize(u_texture, 0).y;
      int y = splatIndex / texWidth;
      int x = splatIndex - y * texWidth;

      vec4 center = vec4(
        float(texelFetch(u_texture, ivec2(x * 3, y), 0).r),
        float(texelFetch(u_texture, ivec2(x * 3 + 1, y), 0).r),
        float(texelFetch(u_texture, ivec2(x * 3 + 2, y), 0).r),
        1
      );

      vec4 cam = view * center;
      vec4 pos2d = projection * cam;

      float clip = 1.2 * pos2d.w;
      if (pos2d.z < -clip || pos2d.x < -clip || pos2d.x > clip || pos2d.y < -clip || pos2d.y > clip) {
        gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
        return;
      }

      vec4 cov3d0 = vec4(
        float(texelFetch(u_texture, ivec2(x * 3, y + texHeight / 4), 0).r),
        float(texelFetch(u_texture, ivec2(x * 3 + 1, y + texHeight / 4), 0).r),
        float(texelFetch(u_texture, ivec2(x * 3 + 2, y + texHeight / 4), 0).r),
        float(texelFetch(u_texture, ivec2(x * 3, y + texHeight / 4 * 2), 0).r)
      );
      vec4 cov3d1 = vec4(
        float(texelFetch(u_texture, ivec2(x * 3 + 1, y + texHeight / 4 * 2), 0).r),
        float(texelFetch(u_texture, ivec2(x * 3 + 2, y + texHeight / 4 * 2), 0).r),
        0.0, 0.0
      );

      mat3 Vrk = mat3(
        cov3d0.x, cov3d0.y, cov3d0.z,
        cov3d0.y, cov3d0.w, cov3d1.x,
        cov3d0.z, cov3d1.x, cov3d1.y
      );

      mat3 J = mat3(
        focal.x / cam.z, 0., -(focal.x * cam.x) / (cam.z * cam.z),
        0., -focal.y / cam.z, (focal.y * cam.y) / (cam.z * cam.z),
        0., 0., 0.
      );

      mat3 W = transpose(mat3(view));
      mat3 T = W * J;
      mat3 cov = transpose(T) * Vrk * T;

      vec2 vCenter = vec2(pos2d) / pos2d.w;
      float diagonal1 = cov[0][0] + 0.3;
      float offDiagonal = cov[0][1];
      float diagonal2 = cov[1][1] + 0.3;

      float mid = 0.5 * (diagonal1 + diagonal2);
      float radius = length(vec2((diagonal1 - diagonal2) / 2.0, offDiagonal));
      float lambda1 = mid + radius;
      float lambda2 = max(mid - radius, 0.1);
      vec2 diagonalVector = normalize(vec2(offDiagonal, lambda1 - diagonal1));
      vec2 v1 = min(sqrt(2.0 * lambda1), 1024.0) * diagonalVector;
      vec2 v2 = min(sqrt(2.0 * lambda2), 1024.0) * vec2(diagonalVector.y, -diagonalVector.x);

      uint colorUint = uint(texelFetch(u_texture, ivec2(x * 3, y + texHeight / 4 * 3), 0).r);
      vColor = vec4(
        float(colorUint & uint(0xFF)) / 255.0,
        float((colorUint >> uint(8)) & uint(0xFF)) / 255.0,
        float((colorUint >> uint(16)) & uint(0xFF)) / 255.0,
        float(colorUint >> uint(24)) / 255.0
      );

      vec2 vPosition = position;
      gl_Position = vec4(
        vCenter + position.x * v1 / viewport * 2.0 + position.y * v2 / viewport * 2.0,
        pos2d.z / pos2d.w,
        1.0
      );
    }
  `;

  const fragmentShaderSource = `
    precision highp float;

    varying vec4 vColor;
    varying vec2 vPosition;

    void main () {
      float A = -dot(vPosition, vPosition);
      if (A < -4.0) discard;
      float B = exp(A) * vColor.a;
      gl_FragColor = vec4(B * vColor.rgb, B);
    }
  `;

  // Matrix math utilities
  function multiply4(a, b) {
    return [
      b[0] * a[0] + b[1] * a[4] + b[2] * a[8] + b[3] * a[12],
      b[0] * a[1] + b[1] * a[5] + b[2] * a[9] + b[3] * a[13],
      b[0] * a[2] + b[1] * a[6] + b[2] * a[10] + b[3] * a[14],
      b[0] * a[3] + b[1] * a[7] + b[2] * a[11] + b[3] * a[15],
      b[4] * a[0] + b[5] * a[4] + b[6] * a[8] + b[7] * a[12],
      b[4] * a[1] + b[5] * a[5] + b[6] * a[9] + b[7] * a[13],
      b[4] * a[2] + b[5] * a[6] + b[6] * a[10] + b[7] * a[14],
      b[4] * a[3] + b[5] * a[7] + b[6] * a[11] + b[7] * a[15],
      b[8] * a[0] + b[9] * a[4] + b[10] * a[8] + b[11] * a[12],
      b[8] * a[1] + b[9] * a[5] + b[10] * a[9] + b[11] * a[13],
      b[8] * a[2] + b[9] * a[6] + b[10] * a[10] + b[11] * a[14],
      b[8] * a[3] + b[9] * a[7] + b[10] * a[11] + b[11] * a[15],
      b[12] * a[0] + b[13] * a[4] + b[14] * a[8] + b[15] * a[12],
      b[12] * a[1] + b[13] * a[5] + b[14] * a[9] + b[15] * a[13],
      b[12] * a[2] + b[13] * a[6] + b[14] * a[10] + b[15] * a[14],
      b[12] * a[3] + b[13] * a[7] + b[14] * a[11] + b[15] * a[15]
    ];
  }

  function invert4(a) {
    let b00 = a[0] * a[5] - a[1] * a[4];
    let b01 = a[0] * a[6] - a[2] * a[4];
    let b02 = a[0] * a[7] - a[3] * a[4];
    let b03 = a[1] * a[6] - a[2] * a[5];
    let b04 = a[1] * a[7] - a[3] * a[5];
    let b05 = a[2] * a[7] - a[3] * a[6];
    let b06 = a[8] * a[13] - a[9] * a[12];
    let b07 = a[8] * a[14] - a[10] * a[12];
    let b08 = a[8] * a[15] - a[11] * a[12];
    let b09 = a[9] * a[14] - a[10] * a[13];
    let b10 = a[9] * a[15] - a[11] * a[13];
    let b11 = a[10] * a[15] - a[11] * a[14];
    let det =
      b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) return null;
    return [
      (a[5] * b11 - a[6] * b10 + a[7] * b09) / det,
      (a[2] * b10 - a[1] * b11 - a[3] * b09) / det,
      (a[13] * b05 - a[14] * b04 + a[15] * b03) / det,
      (a[10] * b04 - a[9] * b05 - a[11] * b03) / det,
      (a[6] * b08 - a[4] * b11 - a[7] * b07) / det,
      (a[0] * b11 - a[2] * b08 + a[3] * b07) / det,
      (a[14] * b02 - a[12] * b05 - a[15] * b01) / det,
      (a[8] * b05 - a[10] * b02 + a[11] * b01) / det,
      (a[4] * b10 - a[5] * b08 + a[7] * b06) / det,
      (a[1] * b08 - a[0] * b10 - a[3] * b06) / det,
      (a[12] * b04 - a[13] * b02 + a[15] * b00) / det,
      (a[9] * b02 - a[8] * b04 - a[11] * b00) / det,
      (a[5] * b07 - a[4] * b09 - a[6] * b06) / det,
      (a[0] * b09 - a[1] * b07 + a[2] * b06) / det,
      (a[13] * b01 - a[12] * b03 - a[14] * b00) / det,
      (a[8] * b03 - a[9] * b01 + a[10] * b00) / det
    ];
  }

  function rotate4(a, rad, x, y, z) {
    let len = Math.sqrt(x * x + y * y + z * z);
    x /= len;
    y /= len;
    z /= len;
    let s = Math.sin(rad);
    let c = Math.cos(rad);
    let t = 1 - c;
    let b00 = x * x * t + c;
    let b01 = y * x * t + z * s;
    let b02 = z * x * t - y * s;
    let b10 = x * y * t - z * s;
    let b11 = y * y * t + c;
    let b12 = z * y * t + x * s;
    let b20 = x * z * t + y * s;
    let b21 = y * z * t - x * s;
    let b22 = z * z * t + c;
    return [
      a[0] * b00 + a[4] * b01 + a[8] * b02,
      a[1] * b00 + a[5] * b01 + a[9] * b02,
      a[2] * b00 + a[6] * b01 + a[10] * b02,
      a[3] * b00 + a[7] * b01 + a[11] * b02,
      a[0] * b10 + a[4] * b11 + a[8] * b12,
      a[1] * b10 + a[5] * b11 + a[9] * b12,
      a[2] * b10 + a[6] * b11 + a[10] * b12,
      a[3] * b10 + a[7] * b11 + a[11] * b12,
      a[0] * b20 + a[4] * b21 + a[8] * b22,
      a[1] * b20 + a[5] * b21 + a[9] * b22,
      a[2] * b20 + a[6] * b21 + a[10] * b22,
      a[3] * b20 + a[7] * b21 + a[11] * b22,
      a[12], a[13], a[14], a[15]
    ];
  }

  function translate4(a, x, y, z) {
    return [
      a[0], a[1], a[2], a[3],
      a[4], a[5], a[6], a[7],
      a[8], a[9], a[10], a[11],
      a[0] * x + a[4] * y + a[8] * z + a[12],
      a[1] * x + a[5] * y + a[9] * z + a[13],
      a[2] * x + a[6] * y + a[10] * z + a[14],
      a[3] * x + a[7] * y + a[11] * z + a[15]
    ];
  }

  function getProjectionMatrix(fx, fy, width, height) {
    const znear = 0.2;
    const zfar = 200;
    return [
      [(2 * fx) / width, 0, 0, 0],
      [0, -(2 * fy) / height, 0, 0],
      [0, 0, zfar / (zfar - znear), 1],
      [0, 0, -(zfar * znear) / (zfar - znear), 0]
    ].flat();
  }

  // Main Splat Viewer Class
  class SplatViewer {
    constructor(canvas, plyUrl) {
      this.canvas = canvas;
      this.plyUrl = plyUrl;
      this.gl = null;
      this.program = null;
      this.startTime = Date.now();
      this.vertexCount = 0;
      this.rafId = null;
      this.viewMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
      this.centerX = 0;
      this.centerY = 0;
      this.centerZ = 0;
    }

    async init() {
      // Initialize WebGL 2 context
      this.gl = this.canvas.getContext('webgl2', {
        antialias: false,
        alpha: true,
        premultipliedAlpha: false
      });

      if (!this.gl) {
        throw new Error('WebGL 2 not supported');
      }

      const gl = this.gl;

      // Compile shaders
      const vertexShader = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vertexShader, vertexShaderSource);
      gl.compileShader(vertexShader);
      if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        throw new Error('Vertex shader compilation error: ' + gl.getShaderInfoLog(vertexShader));
      }

      const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragmentShader, fragmentShaderSource);
      gl.compileShader(fragmentShader);
      if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        throw new Error('Fragment shader compilation error: ' + gl.getShaderInfoLog(fragmentShader));
      }

      this.program = gl.createProgram();
      gl.attachShader(this.program, vertexShader);
      gl.attachShader(this.program, fragmentShader);
      gl.linkProgram(this.program);
      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
        throw new Error('Program linking error: ' + gl.getProgramInfoLog(this.program));
      }

      gl.useProgram(this.program);

      // Load and parse PLY
      const data = await this.loadPLY(this.plyUrl);

      // Upload data to GPU
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.R32F,
        data.width,
        data.height,
        0,
        gl.RED,
        gl.FLOAT,
        data.buffer
      );

      // Set up vertex buffers
      const triangleVertices = new Float32Array([-2, -2, 2, -2, 2, 2, -2, 2]);
      const vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, triangleVertices, gl.STATIC_DRAW);

      const positionLocation = gl.getAttribLocation(this.program, 'position');
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      const indexBuffer = gl.createBuffer();
      const indexes = new Float32Array(data.vertexCount);
      for (let i = 0; i < data.vertexCount; i++) indexes[i] = i;
      gl.bindBuffer(gl.ARRAY_BUFFER, indexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, indexes, gl.STATIC_DRAW);

      const indexLocation = gl.getAttribLocation(this.program, 'index');
      gl.enableVertexAttribArray(indexLocation);
      gl.vertexAttribPointer(indexLocation, 1, gl.FLOAT, false, 0, 0);
      gl.vertexAttribDivisor(indexLocation, 1);

      this.vertexCount = data.vertexCount;
      this.centerX = data.centerX;
      this.centerY = data.centerY;
      this.centerZ = data.centerZ;

      // Set up WebGL state
      gl.disable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      gl.blendFuncSeparate(gl.ONE_MINUS_DST_ALPHA, gl.ONE, gl.ONE_MINUS_DST_ALPHA, gl.ONE);
      gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);

      // Start render loop
      this.startTime = Date.now();
      this.render();
    }

    async loadPLY(url) {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to load PLY file: ' + response.statusText);
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      // Parse PLY header
      let offset = 0;
      let line = '';
      let vertexCount = 0;
      const properties = [];

      while (offset < buffer.length) {
        const char = String.fromCharCode(buffer[offset++]);
        if (char === '\n') {
          if (line.startsWith('element vertex ')) {
            vertexCount = parseInt(line.split(' ')[2]);
          } else if (line.startsWith('property ')) {
            const parts = line.split(' ');
            properties.push({ type: parts[1], name: parts[2] });
          } else if (line === 'end_header') {
            break;
          }
          line = '';
        } else {
          line += char;
        }
      }

      // Parse vertex data
      const rowLength = 3 * 4 + 3 * 4 + 4 + 4;
      const positionsView = new Float32Array(arrayBuffer, offset, vertexCount * 3);

      // Calculate center
      let sumX = 0, sumY = 0, sumZ = 0;
      for (let i = 0; i < vertexCount; i++) {
        sumX += positionsView[i * 3];
        sumY += positionsView[i * 3 + 1];
        sumZ += positionsView[i * 3 + 2];
      }
      const centerX = sumX / vertexCount;
      const centerY = sumY / vertexCount;
      const centerZ = sumZ / vertexCount;

      // Pack data into texture format
      const texWidth = 2048;
      const texHeight = Math.ceil((vertexCount * 4) / texWidth);
      const data = new Float32Array(texWidth * texHeight);

      for (let i = 0; i < vertexCount; i++) {
        const dataView = new DataView(arrayBuffer, offset + i * rowLength);

        // Position data
        data[i * 3] = dataView.getFloat32(0, true);
        data[i * 3 + 1] = dataView.getFloat32(4, true);
        data[i * 3 + 2] = dataView.getFloat32(8, true);

        // Covariance data
        data[texWidth * Math.floor(texHeight / 4) + i * 3] = dataView.getFloat32(12, true);
        data[texWidth * Math.floor(texHeight / 4) + i * 3 + 1] = dataView.getFloat32(16, true);
        data[texWidth * Math.floor(texHeight / 4) + i * 3 + 2] = dataView.getFloat32(20, true);

        data[texWidth * Math.floor(texHeight / 4 * 2) + i * 3] = dataView.getFloat32(24, true);
        data[texWidth * Math.floor(texHeight / 4 * 2) + i * 3 + 1] = dataView.getFloat32(28, true);
        data[texWidth * Math.floor(texHeight / 4 * 2) + i * 3 + 2] = dataView.getFloat32(32, true);

        // Color data (packed RGBA)
        data[texWidth * Math.floor(texHeight / 4 * 3) + i * 3] = dataView.getUint32(36, true);
      }

      return {
        buffer: data,
        width: texWidth,
        height: texHeight,
        vertexCount: vertexCount,
        centerX: centerX,
        centerY: centerY,
        centerZ: centerZ
      };
    }

    render() {
      const gl = this.gl;

      // Update canvas size
      const rect = this.canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = Math.floor(rect.width * dpr);
      const height = Math.floor(rect.height * dpr);

      if (this.canvas.width !== width || this.canvas.height !== height) {
        this.canvas.width = width;
        this.canvas.height = height;
        gl.viewport(0, 0, width, height);
      }

      // Calculate auto-rotation
      const t = (Date.now() - this.startTime) / 5000;
      const rotationY = Math.sin(t) * Math.PI * 0.3;

      // Build view matrix with rotation
      let viewMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
      viewMatrix = translate4(viewMatrix, 0, 0, -5);
      viewMatrix = rotate4(viewMatrix, rotationY, 0, 1, 0);
      viewMatrix = translate4(viewMatrix, -this.centerX, -this.centerY, -this.centerZ);

      const projectionMatrix = getProjectionMatrix(
        1000,
        1000,
        width,
        height
      );

      // Set uniforms
      gl.uniformMatrix4fv(
        gl.getUniformLocation(this.program, 'projection'),
        false,
        projectionMatrix
      );
      gl.uniformMatrix4fv(
        gl.getUniformLocation(this.program, 'view'),
        false,
        viewMatrix
      );
      gl.uniform2f(
        gl.getUniformLocation(this.program, 'focal'),
        1000,
        1000
      );
      gl.uniform2f(
        gl.getUniformLocation(this.program, 'viewport'),
        width,
        height
      );

      // Clear and render
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArraysInstanced(gl.TRIANGLE_FAN, 0, 4, this.vertexCount);

      // Continue render loop
      this.rafId = requestAnimationFrame(() => this.render());
    }

    destroy() {
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
      if (this.gl) {
        const ext = this.gl.getExtension('WEBGL_lose_context');
        if (ext) ext.loseContext();
      }
      this.canvas = null;
      this.gl = null;
    }
  }

  // Initialize splat viewers for all cards with data-splat-model
  function initSplatViewers() {
    const mediaSections = document.querySelectorAll('[data-splat-model]');

    mediaSections.forEach(mediaSection => {
      const splatUrl = mediaSection.dataset.splatModel;
      if (!splatUrl || !window.WebGL2RenderingContext) return;

      // Lazy load with Intersection Observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadViewer(mediaSection, splatUrl);
            observer.disconnect();
          }
        });
      }, { rootMargin: '200px' });

      observer.observe(mediaSection);
    });
  }

  function loadViewer(mediaSection, splatUrl) {
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.className = 'splat-viewer__canvas';
    canvas.setAttribute('aria-hidden', 'true');

    // Create loading overlay
    const loader = document.createElement('div');
    loader.className = 'splat-viewer__loader';
    loader.innerHTML = '<span>Loading 3D model...</span>';

    mediaSection.appendChild(loader);
    mediaSection.appendChild(canvas);
    mediaSection.classList.add('has-splat-viewer');

    // Initialize viewer
    const viewer = new SplatViewer(canvas, splatUrl);

    viewer.init()
      .then(() => {
        loader.remove();
        canvas.style.opacity = '1';
      })
      .catch(error => {
        console.warn('[splat-viewer] Failed to load:', error);
        loader.innerHTML = '<span>3D model unavailable</span>';
        loader.style.background = 'rgba(200, 0, 0, 0.2)';
        setTimeout(() => loader.remove(), 3000);
      });

    window.addEventListener('beforeunload', () => viewer.destroy());
  }

  // Initialize when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSplatViewers);
  } else {
    initSplatViewers();
  }
})();
