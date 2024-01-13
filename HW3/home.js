import { saveDataToLS, getDataFromLS } from './src/modules/localStorageMethods.js';

// localStorage.clear();

const initialData = [
    {
        id: 'Apple iPhone 13',
        product: "Apple iPhone 13",
        reviews: [
            {
                id: 1,
                text: "Отличный телефон! Батарея держится долго.",
            },
            {
                id: 2,
                text: "Камера супер, фото выглядят просто потрясающе.",
            },
        ],
    },
    {
        id: 'Samsung Galaxy Z Fold 3',
        product: "Samsung Galaxy Z Fold 3",
        reviews: [
            {
                id: 3,
                text: "Интересный дизайн, но дорогой.",
            },
        ],
    },
    {
        id: 'Sony PlayStation 5',
        product: "Sony PlayStation 5",
        reviews: [
            {
                id: 4,
                text: "Люблю играть на PS5, графика на высоте.",
            },
        ],
    },
    {
        id: 'Nokia 110',
        product: "Nokia 110",
        reviews: [
            {
                id: 5,
                text: "Не интересный дизайн, но дорогой.",
            }

        ],
    },
];

saveDataToLS('reviewsOfDifferentProducts', initialData);


const makeReviewButton = document.querySelector('.addButton');
makeReviewButton.addEventListener("click", (event) => {
    event.preventDefault();

    let textOfReview = getReviewText();

    createNewReview(textOfReview);
    resetForm();
});


function resetForm() {
    const nameInput = document.querySelector(`[name="productname"]`)
    nameInput.value = '';

    const textArea = document.querySelector('.textarea')
    textArea.value = '';
}


function getProductName() {
    const productName = document.querySelector('input[name="productname"]');
    try {
        if (productName) {
            return productName.value;
        } else {
            throw new Error('Вы не выбрали товар для отзыва!');
        }
    } catch (error) {
        console.log(error);
    }
}

function getReviewText() {
    const textArea = document.querySelector('.textarea').value.trim();
    try {
        if (textArea.length < 50) {
            throw new Error('Комментарий слишком короткий');
        }
        else if (textArea.length > 500) {
            throw new Error('Комментарий слишком длинный');
        } else {
            return textArea;
        }
    } catch (error) {
        console.log(error);
    }
}

let globalId = 6;
function createNewReview(text) {
    if (text) {
        let newReview = {
            id: ++globalId,
            text: text
        }
        saveNewReview(newReview);
    }
}

function saveNewReview(review) {
    let nameOfProduct = getProductName();
    console.log(nameOfProduct);
    const reviewForSaving = review;
    console.log(reviewForSaving);

    const productsArrayWithReviews = getDataFromLS('reviewsOfDifferentProducts');
    const targetProductIndex = productsArrayWithReviews.findIndex(product => product.product === nameOfProduct);
    console.log(targetProductIndex);
    if (targetProductIndex >= 0) {
        productsArrayWithReviews[targetProductIndex].reviews.push(reviewForSaving);
        saveDataToLS('reviewsOfDifferentProducts', productsArrayWithReviews);

    } else {
        const fullReview = {
            id: nameOfProduct,
            product: nameOfProduct,
            reviews: [reviewForSaving],
        }
        console.log(fullReview);
        productsArrayWithReviews.push(fullReview);
        saveDataToLS('reviewsOfDifferentProducts', productsArrayWithReviews);
    }
}






