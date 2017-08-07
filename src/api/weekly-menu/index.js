import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, showByDate, update, destroy } from './controller'
import { schema } from './model'
export WeeklyMenu, { schema } from './model'

const router = new Router()
const { date, _recipe } = schema.tree

/**
 * @api {post} /weekly-menus Create weekly menu
 * @apiName CreateWeeklyMenu
 * @apiGroup WeeklyMenu
 * @apiParam date Weekly menu's date.
 * @apiParam recipe_id Weekly menu's recipe_id.
 * @apiSuccess {Object} weeklyMenu Weekly menu's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Weekly menu not found.
 */
router.post('/', body({ date, _recipe }),
  create)

/**
 * @api {get} /weekly-menus Retrieve weekly menus
 * @apiName RetrieveWeeklyMenus
 * @apiGroup WeeklyMenu
 * @apiUse listParams
 * @apiSuccess {Object[]} weeklyMenus List of weekly menus.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', query(), index)

/**
 * @api {get} /weekly-menus/:id Retrieve weekly menu
 * @apiName RetrieveWeeklyMenu
 * @apiGroup WeeklyMenu
 * @apiSuccess {Object} weeklyMenu Weekly menu's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Weekly menu not found.
 */
router.get('/:date', show)

/**
 * @api {put} /weekly-menus/:id Update weekly menu
 * @apiName UpdateWeeklyMenu
 * @apiGroup WeeklyMenu
 * @apiParam date Weekly menu's date.
 * @apiParam recipe_id Weekly menu's recipe_id.
 * @apiSuccess {Object} weeklyMenu Weekly menu's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Weekly menu not found.
 */
router.put('/:id',
  body({ date, _recipe }),
  update)

/**
 * @api {delete} /weekly-menus/:id Delete weekly menu
 * @apiName DeleteWeeklyMenu
 * @apiGroup WeeklyMenu
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Weekly menu not found.
 */
router.delete('/:id',
  destroy)

export default router
