const express = require("express");
const router = express.Router();
const ProductsService = require('../../services/products');

// Instanciamos la clase
const productService = new ProductsService();

router.get('/', async function(req, res, next) {
  const { tags } = req.query;

  try {
    const products = await productService.getProducts({ tags });

    res.status(200).json({
      data: products,
      message: 'products listed'
    });
  } catch(err) {
    next(err);
  };
});

router.get('/:productId', async function(req, res, next) {
  const { productId } = req.params;

  try {
    const product = await productService.getProduct({ productId });

    res.status(200).json({
      data: product,
      message: 'product retrieved'
    });
  } catch(err) {
    next(err);
  };

});

router.post('/', async function(req, res, next) {
  const { body: product } = req

  try {
    const createdProduct = await productService.createProduct({ product });

    res.status(201).json({
      data: createdProduct,
      message: 'product created'
    });
  } catch(err) {
    next(err);
  };
});

router.put('/:productId', async function(req, res, next) {
  const { productId } = req.params;
  const { body: product } = req

  try {
    const updateProduct = await productService.updateProduct({ productId, product });

    res.status(200).json({
      data: updateProduct,
      message: 'products updated'
    });
  } catch(err) {
    next(err);
  };
});

router.delete('/:productId', async function(req, res, next) {
  const { productId } = req.params;

  try {
    const product = await productService.deleteProduct({ productId });

    res.status(200).json({
      data: product,
      message: 'product deleted'
    });
  } catch(err) {
    next(err);
  };
});

module.exports = router