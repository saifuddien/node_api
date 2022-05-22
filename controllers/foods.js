import foods from "../models/foods.js";
import path from 'path'
import fs from 'fs'

export const addFoods = (req, res) => {
  const name = req.body.name
  const price = req.body.price
  const poster = req.file.path

  const results = new foods({
    name,
    price,
    poster
  })

  results.save().then(result => {
    res.status(201).json({
      status: 'Success!',
      code: 201,
      desc: `${req.body.name} has added`,
      data: result
    })
  }).catch(err => res.json(err))
}

export const getFoods = (req, res) => {
  foods.find().then(result => {
    res.status(200).json({
      status: 'Ok',
      code: 200,
      data: result
    })
  }).catch(err => res.json(err))
}

export const getOneFoods = (req, res) => {
  foods.findOne({ _id: req.params.id }).then(result => {
    res.status(200).json({
      status: 'Ok',
      code: 200,
      data: result
    })
  }).catch(err => res.json(err))
}

export const deleteFoods = (req, res) => {
  foods.findByIdAndRemove(req.params.id)
    .then(result => {
      fs.unlink(path.join(result.poster), response => {
        res.status(200).json({
          status: 'Delete Success',
          code: 200,
          message: `Data with name ${result.name} has been deleted!`,
          response
        })
      })
    }).catch(err => res.json({ message: 'Delete Failed', err: err.message }))
}