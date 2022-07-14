const uuid = require('uuid')
const path = require('path')
const { Clothes, ClothesInfo } = require('../models/models')
const ApiError = require('../error/ApiError')

class ClothesController {
	async create(req, res, next) {
		try {
			let { name, price, brandId, typeId, info } = req.body
			const { img } = req.files
			let fileName = uuid.v4() + '.jpg'
			img.mv(path.resolve(__dirname, '..', 'static', fileName))
			const Clothes = await Clothes.create({
				name,
				price,
				brandId,
				typeId,
				img: fileName,
			})

			if (info) {
				info = JSON.parse(info)
				info.forEach(i =>
					ClothesInfo.create({
						title: i.title,
						description: i.description,
						ClothesId: Clothes.id,
					})
				)
			}

			return res.json(Clothes)
		} catch (e) {
			next(ApiError.badRequest(e.message))
		}
	}

	async getAll(req, res) {
		let { brandId, typeId, limit, page } = req.query
		page = page || 1
		limit = limit || 9
		let offset = page * limit - limit
		let AllClothes
		if (!brandId && !typeId) {
			AllClothes = await Clothes.findAndCountAll({ limit, offset })
		}
		if (brandId && !typeId) {
			AllClothes = await Clothes.findAndCountAll({
				where: { brandId },
				limit,
				offset,
			})
		}
		if (!brandId && typeId) {
			AllClothes = await Clothes.findAndCountAll({
				where: { typeId },
				limit,
				offset,
			})
		}
		if (brandId && typeId) {
			AllClothes = await Clothes.findAndCountAll({
				where: { typeId, brandId },
				limit,
				offset,
			})
		}
		return res.json(AllClothes)
	}

	async getOne(req, res) {
		const { id } = req.params
		const Clothes = await Clothes.findOne({
			where: { id },
			include: [{ model: ClothesInfo, as: 'info' }],
		})
		return res.json(Clothes)
	}
}

module.exports = new ClothesController()
