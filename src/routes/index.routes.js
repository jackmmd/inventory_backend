"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const validateSchema_1 = __importDefault(require("../middlewares/validateSchema"));
const schemas_1 = require("../others/schemas/schemas");
const CategoryController_1 = __importDefault(require("../controllers/CategoryController"));
const others_1 = require("../others/schemas/others");
const passport_1 = __importDefault(require("passport"));
const ProductController_1 = __importDefault(require("../controllers/ProductController"));
const OrderController_1 = __importDefault(require("../controllers/OrderController"));
const router = (0, express_1.Router)();
const auth = new AuthController_1.default();
router.post('/auth/login', (0, validateSchema_1.default)(schemas_1.loginShema), auth.login);
router.post('/auth/register', (0, validateSchema_1.default)(schemas_1.userSchema), auth.register);
const category = new CategoryController_1.default();
router.post('/category', passport_1.default.authenticate('jwt', { session: false }), (0, validateSchema_1.default)(others_1.nameShema), category.create);
router.get('/categories', passport_1.default.authenticate('jwt', { session: false }), category.list);
router.delete('/category/:id', passport_1.default.authenticate('jwt', { session: false }), category.delete);
router.patch('/category/:id', passport_1.default.authenticate('jwt', { session: false }), category.update);
const product = new ProductController_1.default();
router.post('/product', passport_1.default.authenticate('jwt', { session: false }), (0, validateSchema_1.default)(schemas_1.productSchema), product.create);
router.get('/products', passport_1.default.authenticate('jwt', { session: false }), product.list);
const order = new OrderController_1.default();
router.post('/order', passport_1.default.authenticate('jwt', { session: false }), (0, validateSchema_1.default)(schemas_1.orderSchema), order.create);
router.get('/orders', passport_1.default.authenticate('jwt', { session: false }), order.list);
exports.default = router;
