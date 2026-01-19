
const expres = require('express');
const app = express();
const PORT = 3000;
const bodyparser = require("body-parser");

app.use(bodyparser.json());


app.get("/product", (req, res) => {
    const { name, sku, price, warehouse_id, initial_quantity } = req.body;


    try {
        if (!name || !sku || !price || !warehouse_id || !initial_quantity) {
            return res.status(400).json({ message: 'missing values, required all fields' });
        }

        if (initial_quantity <= 0) {
            return res.status(400).json({
                message: 'quantity should not be 0'
            })
        }
        //find the product if its existed 
        const existingProduct = products.find(sku == sku);
        if (existingProduct) {
            const invItem = inventory.find(product_id == existingProduct && warehouse_id == warehouse_id);

            if (invItem) {
                invItem.quantity = invItem.quantity + initial_quantity;


            } else {
                inventory.push({
                    product_id: existingProduct.id,
                    warehouse_id: warehouse_id,
                    quantity: initial_quantity

                });
            }
        } return res.status(200).json({
            message: 'inventory updated for existing product', product_id: existingProduct.id
        })
    else {
            const newProduct = {
                id: nextProductId++,
                name,
                sku,
                price: parseFloat(price),
                warehouse_id: warehouse_id
            };
            product.push(newProduct);

            inventory.push({
                product_id: product_id,
                warehouse_id: warehouse_id,
                quantity: initial_quantity
            });

            return res.status(201).json({

                message: 'new product created', product_id: newProduct.id
            })
        }

    } catch (error) {
        console.log('API Error', error.message)
        return res.status(500).json({
            message: 'internal server error'
        })
    }


});
