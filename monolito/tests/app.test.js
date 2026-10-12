const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/db');

afterAll(async () => {
  await pool.end();
});

describe('Pruebas del Monolito - Endpoints de la API', () => {
  test('GET /health debe responder correctamente con estado 200', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ estado: 'ok' });
  });

  test('GET /db-test debe verificar la conexión con PostgreSQL', async () => {
    const response = await request(app).get('/db-test');
    expect(response.statusCode).toBe(200);
    expect(response.body.estado).toBe('ok');
    expect(response.body.mensaje).toBe('Conexión con PostgreSQL correcta');
    expect(response.body).toHaveProperty('fecha');
  });

  test('GET /usuarios debe responder 200 y devolver lista de usuarios con estructura válida', async () => {
    const response = await request(app).get('/usuarios');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('nombre');
    expect(response.body[0]).toHaveProperty('email');
  });

  test('GET /productos debe responder 200 y devolver lista de productos con estructura válida', async () => {
    const response = await request(app).get('/productos');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('nombre');
    expect(response.body[0]).toHaveProperty('precio');
  });

  test('GET /pedidos debe responder 200 y devolver pedidos vinculados con estructura válida', async () => {
    const response = await request(app).get('/pedidos');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('usuario_id');
    expect(response.body[0]).toHaveProperty('producto_id');
    expect(response.body[0]).toHaveProperty('cantidad');
  });
});
