import { Router } from 'express'
import { addProduct, getProduct, getProductID } from '../controller/product.controller'


const route = Router()

route.post("/add", addProduct)
route.post("/get", getProduct)
route.post("/getid", getProductID)

export default route