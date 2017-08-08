import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export ShoppingListItem, { schema } from './model'
import bodyParser from 'body-parser'

const router = new Router()
const { description } = schema.tree

/**
 * @api {post} /shopping-list-items Create shopping list item
 * @apiName CreateShoppingListItem
 * @apiGroup ShoppingListItem
 * @apiParam description Shopping list item's description.
 * @apiSuccess {Object} shoppingListItem Shopping list item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shopping list item not found.
 */
router.post('/', bodyParser.json(), create)

/**
 * @api {get} /shopping-list-items Retrieve shopping list items
 * @apiName RetrieveShoppingListItems
 * @apiGroup ShoppingListItem
 * @apiUse listParams
 * @apiSuccess {Object[]} shoppingListItems List of shopping list items.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /shopping-list-items/:id Retrieve shopping list item
 * @apiName RetrieveShoppingListItem
 * @apiGroup ShoppingListItem
 * @apiSuccess {Object} shoppingListItem Shopping list item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shopping list item not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /shopping-list-items/:id Update shopping list item
 * @apiName UpdateShoppingListItem
 * @apiGroup ShoppingListItem
 * @apiParam description Shopping list item's description.
 * @apiSuccess {Object} shoppingListItem Shopping list item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shopping list item not found.
 */
router.put('/:id', bodyParser.json(), update)

/**
 * @api {delete} /shopping-list-items/:id Delete shopping list item
 * @apiName DeleteShoppingListItem
 * @apiGroup ShoppingListItem
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Shopping list item not found.
 */
router.delete('/:id',
  destroy)

export default router
