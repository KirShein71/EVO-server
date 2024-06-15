import {Product as ProductMapping} from './mapping.js'; 
import { Trunk as TrunkMapping} from './mapping.js'
import { Thirdrow as ThirdrowMapping } from './mapping.js';
import FileService from '../services/File.js'


class Product {

async getAll() {
    const products = await ProductMapping.findAll({
        include: [
            {model: TrunkMapping,
            attributes: ['id']},
            {model: ThirdrowMapping,
                attributes: ['id']
            }
        ],
        order: [
            ['name', 'ASC'],
        ],
    })
    return products
}

async getAllByBrandId(brandId) {
    const products = await ProductMapping.findAll({
        where: {
            brandId: brandId
        },
        order: [
            ['name', 'ASC'],
        ],
    })
    return products
}

async getSaleProduct() {
    const products = await ProductMapping.findAll({
        where: {
            sale: 1
        },
    })
    return products
}

async deleteSaleProduct(id) {
    const product = await ProductMapping.findByPk(id);
    
    if (!product) {
        throw new Error('Строка не найдена в БД');
    }
    await product.update({ sale: null });
    return product;
}

async getOne(id) {
    const product = await ProductMapping.findByPk(id)
    if (!product) { 
        throw new Error('Товар не найден в БД')
    }
    return product
}

async create(data, img, patternImg) {
    // поскольку image не допускает null, задаем пустую строку
    const image = FileService.save(img) || ''
    const pattern_image = FileService.save(patternImg) || ''
    const {name, old_price, new_price, brandId, carModelId} = data
    const product = await ProductMapping.create({ name, old_price, new_price, brandId, carModelId, image, pattern_image})
    
    const created = await ProductMapping.findByPk(product.id) 
    return created
}



async createSale(id, data) {
    const product = await ProductMapping.findByPk(id);
    if (!product) {
        throw new Error('Товар не найден в БД');
    }

    const { sale = 1 } = data; 

    await product.update({ sale });
    await product.reload();
    
    return product;
}




async update(id, data, img, patternImg) {
    const product = await ProductMapping.findByPk(id)
    if (!product) {
        throw new Error('Товар не найден в БД')
    }
    const file = FileService.save(img)
    if (file && product.image ) {
        FileService.delete(product.image)
    }
    const filePattern = FileService.save(patternImg) 
    if ( filePattern && product.pattern_image) {
        FileService.delete(product.pattern_image)
    }
    const {
        name = product.name,
        old_price = product.old_price,
        new_price = product.new_price,
        image = file ? file : product.image,
        pattern_image = filePattern ? filePattern : product.pattern_image
    } = data
    await product.update({name, image, pattern_image, old_price, new_price})
    await product.reload()
    return product
}

async updatePrice(id, data) {
    const product = await ProductMapping.findByPk(id)
    if (!product) {
        throw new Error('Товар не найден в БД')
    }
    const {
        old_price = product.old_price,
        new_price = product.new_price,
    } = data
    await product.update({ old_price, new_price})
    await product.reload()
    return product
}

async delete(id) {
    const product = await ProductMapping.findByPk(id)
    if (!product) {
        throw new Error('Проект не найден в БД')
    }
    await product.destroy()

    const image = product.image
    FileService.delete(image)
    
    const pattern_image = product.pattern_image
    FileService.delete(pattern_image)

    return product
}

}

export default new Product;