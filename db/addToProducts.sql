INSERT INTO ecomerce_products
    (item_id, name, price, description, img_url, quantity)
VALUES($1, $2, $3, $4, $5, $6)
RETURNING *;