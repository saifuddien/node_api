import foods from "../models/foods.js";

export const addFoods = (req, res) => {
  const name = req.body.name
  const price = req.body.price
  const poster = req.body.poster

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

export const getFoods = (_, res) => {
  foods.find().then(result => {
    res.status(200).json({
      status: 'Ok',
      code: 200,
      data: result
    })
  }).catch(err => res.json(err))
}