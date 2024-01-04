// Задание 2
// Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные сообщения, вы решаете установить некоторые ограничения.

// Создайте HTML-структуру с текстовым полем для ввода отзыва, кнопкой для отправки и контейнером, где будут отображаться отзывы.

// Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. Однако если длина введенного отзыва менее 50 или более 500 символов, функция должна генерировать исключение.

// При добавлении отзыва, он должен отображаться на странице под предыдущими отзывами, а не заменять их.

// Вы можете использовать этот массив initialData для начальной загрузки данных при запуске вашего приложения.

const initialData = [
    {
        id: 'apple',
        product: "Apple iPhone 13",
        reviews: [
            {
                id: "1",
                user: "Ирина",
                text: "Отличный телефон! Батарея держится долго.",
            },
            {
                id: "2",
                user: "Борис",
                text: "Камера супер, фото выглядят просто потрясающе.",
            },
        ],
    },
    {
        id: 'samsung',
        product: "Samsung Galaxy Z Fold 3",
        reviews: [
            {
                id: "3",
                user: "Алла",
                text: "Интересный дизайн, но дорогой.",
            },
        ],
    },
    {
        id: 'sony',
        product: "Sony PlayStation 5",
        reviews: [
            {
                id: "4",
                user: "Николай",
                text: "Люблю играть на PS5, графика на высоте.",
            },
        ],
    },
];

const radios = document.querySelectorAll('input[type=radio]');
radios.forEach(radio => radio.addEventListener('change', () => {
    if (radio.checked) {
        removeOtherProductReviews();
        renderAllReviews(radio.value);
    }
}));

function removeOtherProductReviews() {
    const reviewsItems = document.querySelector('.reviews_items');
    while (reviewsItems.firstChild) {
        reviewsItems.removeChild(reviewsItems.firstChild);
    }

}

function renderAllReviews(radio) {
    const nameOfProduct = radio;

    const sectionOfReviews = document.querySelector('.reviews');
    const sectionTitle = document.querySelector('.reviews_title');
    const reviewsItems = document.querySelector('.reviews_items');

    initialData.forEach((review) => {
        if (nameOfProduct === review.id) {
            sectionTitle.textContent = 'Отзывы о товаре: ' + review.product;
            sectionOfReviews.append(sectionTitle);

            for (let i = 0; i < review.reviews.length; i++) {
                const element = review.reviews[i];

                let receivedReview = createReview(nameOfProduct, element.user, element.text);

                let receivedReviewsItems = renderReview(receivedReview);
                sectionOfReviews.append(receivedReviewsItems);
            }
        }
    });
}

let globalId = 4;

const makeReviewButton = document.querySelector('.button');
makeReviewButton.addEventListener("click", (event) => {
    event.preventDefault();

    let nameOfProduct = getProductName();
    let nameOfClient = getUserName();
    let textOfReview = getReviewText();

    let createdNewReview = createReview(nameOfProduct, nameOfClient, textOfReview);

    console.log(createdNewReview);
    renderReview(createdNewReview);
    saveReview(createdNewReview);
    resetForm();
});


function resetForm() {
    const nameInput = document.querySelector(`[name="get-name"]`)
    nameInput.value = '';

    const textArea = document.querySelector('.textarea')
    textArea.value = '';
}

function getUserName() {
    const clientName = document.querySelector(`[name="get-name"]`).value;
    try {
        if (clientName === '') {
            throw new Error('Вы забыли ввести свое имя!');
        } else {
            return clientName;
        }
    } catch (error) {
        console.log(error);
    }
}

function getProductName() {
    const selectedProduct = document.querySelector('input[name="choice"]:checked');
    try {
        let checkedProduct;
        if (selectedProduct) {
            checkedProduct = selectedProduct.value;
            return checkedProduct;
        } else {
            throw new Error('Вы не выбрали товар для отзыва!');
        }
    } catch (error) {
        console.log(error);
    }
}

function getReviewText() {
    const textArea = document.querySelector('.textarea').value;
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

function createReview(product, name, text) {
    if (product && name && text) {
        let newReview = {
            id: ++globalId,
            user: name,
            text: text
        }
        return newReview;
    }
}

function saveReview(review) {
    const reviewForSaving = review;
    const nameOfProduct = getProductName();

    for (const reviewItem of initialData) {
        if (reviewItem.id === nameOfProduct) {
            reviewItem.reviews.push(reviewForSaving);
        }
    }
}

function renderReview(review) {
    const reviewsItems = document.querySelector('.reviews_items');
    const reviewItem = document.createElement('div');
    reviewItem.classList.add('reviews_item');

    const reviewUser = document.createElement('p');
    reviewUser.textContent = 'Покупатель: ' + review.user;

    const reviewText = document.createElement('p');
    reviewText.textContent = 'Текст отзыва: ' + review.text;

    reviewItem.append(reviewUser);
    reviewItem.append(reviewText);
    reviewsItems.append(reviewItem);

    return reviewsItems;
}





