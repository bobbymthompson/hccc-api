import request from 'supertest-as-promised'
import express from '../../services/express'
import routes, { Recipe } from '.'

const app = () => express(routes)

let recipe

beforeEach(async () => {
  recipe = await Recipe.create({})
})

test('POST /recipes 201', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ name: 'test', description: 'test', category: 'test', totalTime: 'test', cookTime: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.category).toEqual('test')
  expect(body.totalTime).toEqual('test')
  expect(body.cookTime).toEqual('test')
})

test('GET /recipes 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /recipes/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${recipe.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(recipe.id)
})

test('GET /recipes/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /recipes/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`/${recipe.id}`)
    .send({ name: 'test', description: 'test', category: 'test', totalTime: 'test', cookTime: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(recipe.id)
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.category).toEqual('test')
  expect(body.totalTime).toEqual('test')
  expect(body.cookTime).toEqual('test')
})

test('PUT /recipes/:id 404', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ name: 'test', description: 'test', category: 'test', totalTime: 'test', cookTime: 'test' })
  expect(status).toBe(404)
})

test('DELETE /recipes/:id 204', async () => {
  const { status } = await request(app())
    .delete(`/${recipe.id}`)
  expect(status).toBe(204)
})

test('DELETE /recipes/:id 404', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  expect(status).toBe(404)
})
