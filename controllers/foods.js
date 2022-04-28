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
  foods.findByIdAndDelete(req.params.id).then(result => {
    // const file = path.join(__dirname + '/../' + result.data.poster)
    // fs.unlink(file, res => console.log('success', res))
    console.log(path.join(result.data.poster))
    res.status(200).json({
      status: 'Delete SUccess',
      code: 200,
      data: result.data.poster
    })
  }).catch(err => res.json({ mas: 'hahah', err: err.message }))
}