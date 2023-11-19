const express = require("express")
const router = express.Router()
const placeController = require('../controller/place.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const authPermission = require('../middlewares/authPermission.middleware')
const userRoles = require('../utils/userRoles')

const multer = require('multer')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        const ext = file.mimetype.split('/')[1]
        cb(null, `photo${Date.now()}.${ext}`)
    },
});

const upload = multer({ storage, limits: { fieldSize: 25 * 1024 * 1024 } });


router.post('/upload-by-link', placeController.uploadByLink)
router.post('/upload', upload.array('photos', 100), placeController.uploadLocal)

router.post('/', authMiddleware, placeController.addPlace)
router.get('/user', authMiddleware, placeController.getAllPlacesForUser)
router.get('/', placeController.getAllPlaces)
router.get('/:id', placeController.getPlace)
router.patch('/:id', authMiddleware, placeController.updatePlace)

module.exports = router
