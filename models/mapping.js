import sequelize from '../sequelize.js'
import database from 'sequelize'

const { DataTypes } = database

const Brand = sequelize.define('brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
})

const CarModel = sequelize.define('car_model', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Product = sequelize.define('product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    old_price: { type: DataTypes.INTEGER, unique: true, allowNull: true },
    new_price: { type: DataTypes.INTEGER, unique: true, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    pattern_image: {type: DataTypes.STRING, allowNull:true},
    sale: { type: DataTypes.INTEGER, allowNull: true}
})

const Animal = sequelize.define('animal', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    old_price: { type: DataTypes.INTEGER, unique: true, allowNull: true },
    new_price: { type: DataTypes.INTEGER, unique: true, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
})

const Home = sequelize.define('home', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    old_price: { type: DataTypes.INTEGER, unique: true, allowNull: true },
    new_price: { type: DataTypes.INTEGER, unique: true, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
})

const Trunk = sequelize.define('trunk', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    old_price: { type: DataTypes.INTEGER, unique: true, allowNull: true },
    new_price: { type: DataTypes.INTEGER, unique: true, allowNull: false },
})

const Thirdrow = sequelize.define('thirdrow', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    old_price: { type: DataTypes.INTEGER, unique: true, allowNull: true },
    new_price: { type: DataTypes.INTEGER, unique: true, allowNull: false },
    image: { type: DataTypes.STRING, unique: true, allowNull: true}
})

const CellShape = sequelize.define('cellshape', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
})

const Material = sequelize.define('material', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    color: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
})

const Edging = sequelize.define('edging', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    color: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
})

const Saddle = sequelize.define('saddle', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    old_price: { type: DataTypes.INTEGER, unique: true, allowNull: true },
    new_price: { type: DataTypes.INTEGER, unique: true, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
})

const Steel = sequelize.define('steel', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    old_price: { type: DataTypes.INTEGER, unique: true, allowNull: true },
    new_price: { type: DataTypes.INTEGER, unique: true, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
})



const Organizer = sequelize.define('organizer', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    size: { type: DataTypes.STRING, allowNull: false },
    old_price: { type: DataTypes.INTEGER, unique: true, allowNull: true },
    new_price: { type: DataTypes.INTEGER, unique: true, allowNull: false },
})

const Body = sequelize.define('body', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
})

const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const BasketProduct = sequelize.define('basket_product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
    quantity_trunk: { type: DataTypes.INTEGER, allowNull: true },
    trunkId: {type: DataTypes.INTEGER, allowNull: true},
    animalId: {type: DataTypes.INTEGER, allowNull: true},
    homeId: {type: DataTypes.INTEGER, allowNull: true},
    saddleId: {type: DataTypes.INTEGER, allowNull: true},
    thirdrowId: {type: DataTypes.INTEGER, allowNull: true}
})

const Order = sequelize.define('order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: true},
    delivery: { type: DataTypes.INTEGER, allowNull: false},
    region: { type: DataTypes.STRING, allowNull: true},
    city: { type: DataTypes.STRING, allowNull: true},
    
    prettyCreatedAt: {
        type: DataTypes.VIRTUAL,
        get() {
            const value = this.getDataValue('createdAt')
            const day = value.getDate()
            const month = value.getMonth() + 1
            const year = value.getFullYear()
            const hours = value.getHours()
            const minutes = value.getMinutes()
            return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes
        }
    },
    prettyUpdatedAt: {
        type: DataTypes.VIRTUAL,
        get() {
            const value = this.getDataValue('updatedAt')
            const day = value.getDate()
            const month = value.getMonth() + 1
            const year = value.getFullYear()
            const hours = value.getHours()
            const minutes = value.getMinutes()
            return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes
        }
    },
})

const OrderItem = sequelize.define('order_item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quantity: { type: DataTypes.INTEGER, allowNull: true  },
    quantity_trunk: { type: DataTypes.INTEGER, allowNull: true },

})

const Admin = sequelize.define('admin', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    phone: { type: DataTypes.STRING, unique: true },
    role: { type: DataTypes.STRING, defaultValue: "ADMIN" },
    password: { type: DataTypes.STRING, allowNull: false },
})



Brand.hasMany(Product)
Product.belongsTo(Brand)

Brand.hasMany(CarModel)
CarModel.belongsTo(Brand)

CarModel.hasMany(Product)
Product.belongsTo(CarModel)

Product.hasMany(Trunk)
Trunk.belongsTo(Product)

Product.hasMany(Thirdrow)
Thirdrow.belongsTo(Product)

CellShape.hasMany(Material)
Material.belongsTo(CellShape)

Basket.belongsToMany(Product, { through: BasketProduct, onDelete: 'CASCADE' })
Product.belongsToMany(Basket, { through: BasketProduct, onDelete: 'CASCADE' })

Basket.belongsToMany(Material, { through: BasketProduct, onDelete: 'CASCADE' })
Material.belongsToMany(Basket, { through: BasketProduct, onDelete: 'CASCADE' })

Basket.belongsToMany(CellShape, { through: BasketProduct, onDelete: 'CASCADE' })
CellShape.belongsToMany(Basket, { through: BasketProduct, onDelete: 'CASCADE' })

Basket.belongsToMany(Edging, { through: BasketProduct, onDelete: 'CASCADE' })
Edging.belongsToMany(Basket, { through: BasketProduct, onDelete: 'CASCADE' })

Basket.belongsToMany(Body, { through: BasketProduct, onDelete: 'CASCADE' })
Body.belongsToMany(Basket, { through: BasketProduct, onDelete: 'CASCADE' })

Basket.belongsToMany(Saddle, { through: BasketProduct, onDelete: 'CASCADE' })
Saddle.belongsToMany(Basket, { through: BasketProduct, onDelete: 'CASCADE' })

Basket.belongsToMany(Steel, { through: BasketProduct, onDelete: 'CASCADE' })
Steel.belongsToMany(Basket, { through: BasketProduct, onDelete: 'CASCADE' })

Basket.belongsToMany(Organizer, { through: BasketProduct, onDelete: 'CASCADE' })
Organizer.belongsToMany(Basket, { through: BasketProduct, onDelete: 'CASCADE' })


Basket.belongsToMany(Trunk, { through: BasketProduct, onDelete: 'CASCADE' })
Trunk.belongsToMany(Basket, { through: BasketProduct, onDelete: 'CASCADE' })

Basket.belongsToMany(Thirdrow, { through: BasketProduct, onDelete: 'CASCADE' })
Thirdrow.belongsToMany(Basket, { through: BasketProduct, onDelete: 'CASCADE' })

Basket.belongsToMany(Animal, { through: BasketProduct, onDelete: 'CASCADE' })
Animal.belongsToMany(Basket, { through: BasketProduct, onDelete: 'CASCADE' })

Basket.belongsToMany(Home, { through: BasketProduct, onDelete: 'CASCADE' })
Home.belongsToMany(Basket, { through: BasketProduct, onDelete: 'CASCADE' })

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)

Material.hasMany(BasketProduct)
BasketProduct.belongsTo(Material)

CellShape.hasMany(BasketProduct)
BasketProduct.belongsTo(CellShape)

Edging.hasMany(BasketProduct)
BasketProduct.belongsTo(Edging)

Body.hasMany(BasketProduct)
BasketProduct.belongsTo(Body)

Saddle.hasMany(BasketProduct)
BasketProduct.belongsTo(Saddle)

Steel.hasMany(BasketProduct)
BasketProduct.belongsTo(Steel)

Organizer.hasMany(BasketProduct)
BasketProduct.belongsTo(Organizer)

Trunk.hasMany(BasketProduct)
BasketProduct.belongsTo(Trunk)

Thirdrow.hasMany(BasketProduct)
BasketProduct.belongsTo(Thirdrow)

Animal.hasMany(BasketProduct)
BasketProduct.belongsTo(Animal)

Home.hasMany(BasketProduct)
BasketProduct.belongsTo(Home)


Order.hasMany(OrderItem, {  onDelete: 'CASCADE', hooks: true })
OrderItem.belongsTo(Order)

Product.hasMany(OrderItem, {as: 'items', onDeelete: 'CASCADE'})
OrderItem.belongsTo(Product)

Material.hasMany(OrderItem, {as: 'items', onDeelete: 'CASCADE'})
OrderItem.belongsTo(Material)

Edging.hasMany(OrderItem, {as: 'items', onDeelete: 'CASCADE'})
OrderItem.belongsTo(Edging)

CellShape.hasMany(OrderItem, {as: 'items', onDeelete: 'CASCADE'})
OrderItem.belongsTo(CellShape)

Body.hasMany(OrderItem, {as: 'items', onDeelete: 'CASCADE'})
OrderItem.belongsTo(Body)

Saddle.hasMany(OrderItem, {as: 'items', onDeelete: 'CASCADE'})
OrderItem.belongsTo(Saddle)

Steel.hasMany(OrderItem, {as: 'items', onDeelete: 'CASCADE'})
OrderItem.belongsTo(Steel)

Organizer.hasMany(OrderItem, {as: 'items', onDeelete: 'CASCADE'})
OrderItem.belongsTo(Organizer)

Trunk.hasMany(OrderItem, {as: 'items', onDeelete: 'CASCADE'})
OrderItem.belongsTo(Trunk)

Thirdrow.hasMany(OrderItem, {as: 'items', onDeelete: 'CASCADE'})
OrderItem.belongsTo(Thirdrow)

Animal.hasMany(OrderItem, {as: 'items', onDeelete: 'CASCADE'})
OrderItem.belongsTo(Animal)

Home.hasMany(OrderItem, {as: 'items', onDeelete: 'CASCADE'})
OrderItem.belongsTo(Home)



export {
    Brand,
    Product,
    Trunk,
    Thirdrow,
    CarModel,
    Material,
    Edging,
    CellShape,
    Body,
    Saddle,
    Steel,
    Organizer,
    Basket,
    BasketProduct,
    Order, 
    OrderItem,
    Admin,
    Animal,
    Home
}