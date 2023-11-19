const Place = require('../models/place.model')
const asyncWrapper = require('../middlewares/asyncWrapper')
const httpStatusText = require('../utils/httpStatusText')
const appError = require('../utils/appError')
const checkPermission = require('../utils/checkPermission')
const imageDownloader = require('image-downloader')
const fs = require('fs')

uploadByLink = asyncWrapper(async (req, res) => {
    const { link } = req.body
    if (!link)
        return next(appError.create('link is required', 400, httpStatusText.FAIL))

    const newName = 'photo' + Date.now() + '.jpg'
    const dir = __dirname.slice(0, -11)

    await imageDownloader.image({
        url: link,
        dest: dir + '/uploads/' + newName,
    })
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { newName } })
})

uploadLocal = (req, res) => {
    const uploaded = []
    for (const name of req.files)
        uploaded.push(name.filename)
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { photos: uploaded } })
}

addPlace = asyncWrapper(async (req, res) => {
    const id = req.currentUser.id
    const place = await Place.create({
        owner: id,
        ...req.body
    })
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { place } })
})

getAllPlacesForUser = asyncWrapper(async (req, res) => {
    const places = await Place.find({ owner: req.currentUser.id })
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { places } })
})

updatePlace = asyncWrapper(async (req, res) => {
    Place.findByIdAndUpdate(req.params.id, req.body).then((place) => {
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { place } })
    })
})

getPlace = asyncWrapper(async (req, res) => {
    Place.findById(req.params.id).then((place) => {
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { place } })
    })
})

getAllPlaces = asyncWrapper(async (req, res) => {
    const limit = req.query.limit || 5
    const page = req.query.page || 1
    const skip = limit * (page - 1)
    const places = await Place.find({}, { __v: false }).limit(limit).skip(skip)
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { places } })
})

module.exports = {
    uploadByLink,
    uploadLocal,
    addPlace,
    getAllPlacesForUser,
    updatePlace,
    getPlace,
    getAllPlaces,
}