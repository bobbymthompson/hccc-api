import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { WeeklyMenu } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  WeeklyMenu.create(body)
    .then((weeklyMenu) => weeklyMenu.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  WeeklyMenu.find(query, select, cursor)
    .populate('_recipe', 'id name description')
    .then((weeklyMenus) => weeklyMenus.map((weeklyMenu) => weeklyMenu.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) => {

  let minDate = new Date(params.date)
  let maxDate = new Date(params.date)
  maxDate.setDate(maxDate.getDate() + 7)

  let q = {
    date: {
      $gte: minDate,
      $lt: maxDate
    }
  }

  WeeklyMenu.find(q, null, {sort: 'date'})
    .populate('_recipe', 'id name description')
    .then(notFound(res))
    .then((weeklyMenus) => weeklyMenus.map((weeklyMenu) => weeklyMenu.view()))
    .then(success(res))
    .catch(next)
}

export const update = ({ bodymen: { body }, params }, res, next) =>
  WeeklyMenu.findById(params.id)
    .then(notFound(res))
    .then((weeklyMenu) => weeklyMenu ? _.merge(weeklyMenu, body).save() : null)
    .then((weeklyMenu) => weeklyMenu ? weeklyMenu.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  WeeklyMenu.findById(params.id)
    .then(notFound(res))
    .then((weeklyMenu) => weeklyMenu ? weeklyMenu.remove() : null)
    .then(success(res, 204))
    .catch(next)
