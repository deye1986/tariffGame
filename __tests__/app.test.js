const { endParticles, particles } = require('../app.js');

test('hides particles', () => {
  endParticles();
  expect(particles.style.display).toBe('none');
})