console.log('====================================');
console.log("Connected");
console.log('====================================');

const img_arr = [
    "https://images.unsplash.com/photo-1605885948690-27db84d97268?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OHw4NTk1MjAzM3x8ZW58MHx8fHx8",
    " https://images.unsplash.com/photo-1605885977820-bdc20a3bdf7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OXw4NTk1MjAzM3x8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1605886015798-0f20066483a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTB8ODU5NTIwMzN8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1605884103680-f97ae60c18c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw4NTk1MjAzM3x8ZW58MHx8fHx8"
]

const url = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448"

const fetchData = async (url) => {
    // data fatch from url 
    const data = await fetch(url);
    const json = await data.json();
    console.log(json, "body");
    const detail = json?.product;

    const imageElements = document.querySelectorAll(".small_img");
    const primary_img = document.querySelector(".pri_img");
    const vendor = document.querySelector(".product_vendor");
    const title = document.querySelector(".product_title")
    const price = document.querySelector(".product_price");
    const comp_price = document.querySelector(".product_Comp_price");
    const color = document.querySelector(".product_color");
    const size = document.querySelector(".product_size");
    const disc = document.querySelector(".discount");
    const desc = document.querySelector(".product_desc");


    const color_box = detail.options[0]?.values;
    const size_box = detail.options[1]?.values;
    console.log(size_box);

    vendor.innerHTML = detail.vendor;
    title.innerHTML = detail.title;
    price.innerHTML = detail.price + ".00";
    comp_price.innerHTML = detail.compare_at_price + ".00";


    // Calculate the percentage discount

    let discount = 19999 - 12999;
    let discountPercentage = 0;
    discountPercentage = (discount / 19999) * 100;

    console.log(discountPercentage);

    disc.innerHTML = Math.trunc(discountPercentage) + "%" + " Off";


    // Update the src attribute for each image class small_img
    img_arr.forEach((url, index) => {
        imageElements[index].src = url;
    });
    console.log(detail.images[0].src);

    imageElements.forEach(imageElement => {
        imageElement.addEventListener('click', function () {
            const newSrc = this.src;
            primary_img.src = newSrc;
        });
    });


    let selectedButtons = null;
    let selectedButtonColor = null;
    //  Each color display  
    color_box.forEach((colorObj) => {
        const colorName = Object.keys(colorObj)[0];
        const colorValue = colorObj[colorName];
        // creating div 
        const color_Cont = document.createElement('div');
        color_Cont.classList.add('color_cont');
        color_Cont.style.background = colorValue;

        color_Cont.addEventListener('click', function () {
            if (selectedButtons !== null) {
                selectedButtons.classList.remove('clicked');
            }
            this.classList.add('clicked');
            selectedButtons = this;
            selectedButtonColor = colorName;
            console.log(selectedButtonColor);
        });

        // append to color_cont
        color.appendChild(color_Cont);
    })

    // Each size display 
    let selectedButton = null;
    let selectedButtonValue = null;

    size_box.forEach((sizeObj) => {
        const sizeName = Object.keys(sizeObj)[0];
        const sizeValue = sizeObj[sizeName];

        const size_cont = document.createElement('button');
        size_cont.classList.add('Size_cont');
        size_cont.textContent = `${sizeValue}`;

        size_cont.addEventListener('click', function () {
            if (selectedButton !== null) {
                selectedButton.classList.remove('selected');
            }
            this.classList.add('selected');
            selectedButton = this;
            selectedButtonValue = sizeValue;
            console.log(selectedButtonValue);
        });

        size.appendChild(size_cont);
    })

    // add to cart display 
    const addToCartButton = document.querySelector('.addtobag');
    const cartMessage = document.getElementById('cartMessage');

    addToCartButton.addEventListener('click', function () {
        if (selectedButtonColor && selectedButtonValue && counterValue >=1) {
            cartMessage.textContent = `Embrace Sideboard with Color ${selectedButtonColor} and Size ${selectedButtonValue} added to cart`;
            cartMessage.style.display = 'block';
        } else {
            alert('Please select Quantity, Color and Size before adding to cart.');
        }
    });

    desc.innerHTML = detail.description;
};
fetchData(url);

// counter of add quantity of product 
let counterValue = 0;
const counterElement = document.getElementById('counter');
function updateCounterDisplay() {
    counterElement.textContent = counterValue;
}

function addProduct() {
    counterValue++;
    updateCounterDisplay();
}

function subProduct() {
    if (counterValue > 0) {
        counterValue--;
        updateCounterDisplay();
    }
}

