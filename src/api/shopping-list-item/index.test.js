import request from 'supertest-as-promised'
import express from '../../services/express'
import routes, { ShoppingListItem } from '.'

const app = () => express(routes)

let shoppingListItem

beforeEach(async () => {
  shoppingListItem = await ShoppingListItem.create({})
})

test('POST /shopping-list-items 201', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ description: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.description).toEqual('test')
})

test('GET /shopping-list-items 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /shopping-list-items/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${shoppingListItem.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(shoppingListItem.id)
})

test('GET /shopping-list-items/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /shopping-list-items/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`/${shoppingListItem.id}`)
    .send({ description: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(shoppingListItem.id)
  expect(body.description).toEqual('test')
})

test('PUT /shopping-list-items/:id 404', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ description: 'test' })
  expect(status).toBe(404)
})

test('DELETE /shopping-list-items/:id 204', async () => {
  const { status } = await request(app())
    .delete(`/${shoppingListItem.id}`)
  expect(status).toBe(204)
})

test('DELETE /shopping-list-items/:id 404', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  expect(status).toBe(404)
})
