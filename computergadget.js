const sheetID = "1BiBVZMqr1kG8ICpmjwsoiSM0JhM-4Qx4h7HTtEPDs9U";
        const sheetName = "Sheet1";
        const range = "A:C"; 
        const apiKey = "AIzaSyDAZ4Q1SvYGb0p-mKpNlqbbK8rBf0lA2Ac";

        async function fetchProductData() {
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${sheetName}!${range}?key=${apiKey}`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                updateProductInfo(data.values);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        }
        
        function buynow() {
        alert("Thanks for shopping!");
    }


        function updateProductInfo(sheetData) {
            const products = document.querySelectorAll(".product-card");

            products.forEach(card => {
                const productName = card.getAttribute("data-product");
                
                const productData = sheetData.find(row => row[0] === productName);
                
                if (productData) {
                    card.querySelector(".price-value").textContent = productData[1]; 
                    card.querySelector(".quantity-value").textContent = productData[2]; 
                }
            });
        }

        fetchProductData();

        function filterProducts() {
            const searchValue = document.getElementById('searchInput').value.toLowerCase();
            const products = document.querySelectorAll(".product-card");

            products.forEach(card => {
                const productName = card.querySelector("h3").textContent.toLowerCase();
                if (productName.includes(searchValue)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        }

        
        function sortProducts() {
            const sortOption = document.getElementById('sortSelect').value;
            const products = Array.from(document.querySelectorAll('.product-card'));

            if (sortOption === 'asc') {
                products.sort((a, b) => {
                    return parseFloat(a.querySelector('.price-value').textContent) - parseFloat(b.querySelector('.price-value').textContent);
                });
            } else if (sortOption === 'desc') {
                products.sort((a, b) => {
                    return parseFloat(b.querySelector('.price-value').textContent) - parseFloat(a.querySelector('.price-value').textContent);
                });
            }

            const productContainer = document.getElementById('productContainer');
            productContainer.innerHTML = '';
            products.forEach(product => {
                productContainer.appendChild(product);
            });
        }

        
        let cart = [];

        function addToCart(productName) {
            const productCard = document.querySelector(`[data-product="${productName}"]`);
            const quantity = productCard.querySelector('.quantity-input').value;
            cart.push({ name: productName, quantity: quantity });

            updateCart();
        }

        function updateCart() {
            const cartList = document.getElementById('cartList');
            cartList.innerHTML = '';
            cart.forEach((item, index) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `${item.name} (Qty: ${item.quantity}) <button onclick="removeFromCart(${index})">Remove</button>`;
                cartList.appendChild(listItem);
            });

            document.getElementById('cartModal').style.display = 'block';
        }

        function removeFromCart(index) {
            cart.splice(index, 1); 
            updateCart();
        }

        function closeCart() {
            document.getElementById('cartModal').style.display = 'none';
        }
