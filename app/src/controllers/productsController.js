module.exports = {
    product: (req, res) => {
        res.render('products/product', {})
    },
    cart: (req, res) => {
        res.render('products/cart')
    },
}