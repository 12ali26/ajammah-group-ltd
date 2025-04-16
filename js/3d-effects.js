/**
 * 3D effects using Three.js
 */

let scene, camera, renderer;
let particles, geometry, materials = [];
let mouseX = 0;
let mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

/**
 * Initialize the hero 3D background
 * @returns {boolean} - Whether initialization was successful
 */
export const initHero3DBackground = () => {
  const container = document.getElementById('hero-canvas');
  if (!container) return false;
  
  // Create scene
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 1000;
  
  // Create particles
  geometry = new THREE.BufferGeometry();
  const vertices = [];
  
  const textureLoader = new THREE.TextureLoader();
  const sprite = textureLoader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAF7mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTktMTItMzBUMDE6Mzc6MjArMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE5LTEyLTMwVDAxOjM4OjU3KzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTEyLTMwVDAxOjM4OjU3KzAxOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmIzMzBlMWI0LTk5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');
  
  // Create particles
  for (let i = 0; i < 500; i++) {
    const x = Math.random() * 2000 - 1000;
    const y = Math.random() * 2000 - 1000;
    const z = Math.random() * 2000 - 1000;
    vertices.push(x, y, z);
  }
  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  
  // Create material
  const material = new THREE.PointsMaterial({
    size: 20,
    map: sprite,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true,
    opacity: 0.7,
    color: 0x0099ff
  });
  
  // Create particle system
  particles = new THREE.Points(geometry, material);
  scene.add(particles);
  
  // Create renderer
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  
  // Add event listeners
  document.addEventListener('mousemove', onDocumentMouseMove);
  window.addEventListener('resize', onWindowResize);
  
  // Start animation loop
  animate();
  
  return true;
};

/**
 * Handle window resize
 */
function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * Handle mouse movement
 * @param {MouseEvent} event - Mouse event
 */
function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) * 0.05;
  mouseY = (event.clientY - windowHalfY) * 0.05;
}

/**
 * Animation loop
 */
function animate() {
  requestAnimationFrame(animate);
  render();
}

/**
 * Render scene
 */
function render() {
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);
  
  // Rotate particles
  if (particles) {
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.001;
  }
  
  renderer.render(scene, camera);
} 