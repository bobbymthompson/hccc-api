import request from 'supertest-as-promised'
import express from '../../services/express'
import routes, { WeeklyMenu } from '.'

const app = () => express(routes)

let weeklyMenu

beforeEach(async () => {
  weeklyMenu = await WeeklyMenu.create({})
})

test('POST /weekly-menus 201', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ date: 'test', recipe_id: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.date).toEqual('test')
  expect(body.recipe_id).toEqual('test')
})

test('GET /weekly-menus 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /weekly-menus/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${weeklyMenu.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(weeklyMenu.id)
})

test('GET /weekly-menus/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /weekly-menus/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`/${weeklyMenu.id}`)
    .send({ date: 'test', recipe_id: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(weeklyMenu.id)
  expect(body.date).toEqual('test')
  expect(body.recipe_id).toEqual('test')
})

test('PUT /weekly-menus/:id 404', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ date: 'test', recipe_id: 'test' })
  expect(status).toBe(404)
})

test('DELETE /weekly-menus/:id 204', async () => {
  const { status } = await request(app())
    .delete(`/${weeklyMenu.id}`)
  expect(status).toBe(204)
})

test('DELETE /weekly-menus/:id 404', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  expect(status).toBe(404)
})
