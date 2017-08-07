import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { ShoppingListItem } from '.'

export const create = (req, res, next) => {
  ShoppingListItem.create(req.body)
    .then(success(res, 201))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  ShoppingListItem.find(query, select, cursor)
    .then((shoppingListItems) => shoppingListItems.map((shoppingListItem) => shoppingListItem.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  ShoppingListItem.findById(params.id)
    .then(notFound(res))
    .then((shoppingListItem) => shoppingListItem ? shoppingListItem.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  ShoppingListItem.findById(params.id)
    .then(notFound(res))
    .then((shoppingListItem) => shoppingListItem ? _.merge(shoppingListItem, body).save() : null)
    .then((shoppingListItem) => shoppingListItem ? shoppingListItem.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  ShoppingListItem.findById(params.id)
    .then(notFound(res))
    .then((shoppingListItem) => shoppingListItem ? shoppingListItem.remove() : null)
    .then(success(res, 204))
    .catch(next)
