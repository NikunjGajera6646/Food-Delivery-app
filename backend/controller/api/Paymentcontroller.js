

module.exports.payments = async (req, res) => {
    try {
        const { product, token } = req.body;
        console.log("PRODUCT", product);
        console.log("PRICE", product.price);
        const idempontencyKey = uuid()

        return stript.customers.create({
            email: token.email,
            source: token.id
        }).then(customer => {
            stript.charges.create({
                amount: product.price * 100,
                currency: "inr",
                customer: customer.id,
                receipt_email: token.email,
                description: `purchase product.name`,
                shipping: {
                    name: token.card.name,
                    address: {
                        country: token.card.address_country
                    }
                }
            }, { idempontencyKey })
        })
            .then(result => res.status(200).json(result))
    } catch (error) {
        res.json("Restaurant Not Found")
    }
}