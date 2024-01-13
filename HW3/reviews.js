import { getDataFromLS, saveDataToLS } from './src/modules/localStorageMethods.js';

function renderInitialData() {

    let productsArray = getDataFromLS('reviewsOfDifferentProducts');
    const divReviews = document.querySelector('.reviews');
    divReviews.innerHTML = ''; //чтобы не было задвоения

    productsArray.forEach(productItem => {
        const detailsDiv = document.createElement('details');
        detailsDiv.classList.add('review_details')

        const summaryDiv = document.createElement('summary');
        summaryDiv.classList.add('review_summary')
        summaryDiv.textContent = `${productItem.product}`;

        detailsDiv.append(summaryDiv);

        productItem.reviews.forEach(reviewItem => {
            const reviewContainer = document.createElement('div');
            reviewContainer.classList.add('review_box');
            reviewContainer.id = `${reviewItem.id}`;

            const reviewText = document.createElement('p');
            reviewText.classList.add('review_text');
            reviewText.textContent = `${reviewItem.text}`;

            const removeButton = document.createElement('button');
            removeButton.classList.add('review_remove-button');
            removeButton.type = 'button';
            removeButton.textContent = 'Удалить';

            reviewContainer.append(reviewText);
            reviewContainer.append(removeButton);

            detailsDiv.append(reviewContainer);
            divReviews.append(detailsDiv);

        })
    })
}
renderInitialData();


const reviewsDiv = document.querySelector('.reviews');
reviewsDiv.addEventListener('click', function (event) {

    if (event.target.className != 'review_remove-button') return;

    let reviewBoxId = event.target.closest('.review_box').id;
    let reviewBox = event.target.closest('.review_box');
    let parent = reviewBox.parentElement;
    let productName = parent.firstChild.textContent;
    reviewBox.remove();
    removeReviewFromLS(productName, reviewBoxId);
});

function removeReviewFromLS (productName, id) {
    const productsArrayWithReviews = getDataFromLS('reviewsOfDifferentProducts');
    const targetProductIndex = productsArrayWithReviews.findIndex(product => product.product === productName);
    const targetReviewId = productsArrayWithReviews[targetProductIndex].reviews.findIndex(review => review.id === id);
    productsArrayWithReviews[targetProductIndex].reviews.splice(targetReviewId, 1);
    saveDataToLS('reviewsOfDifferentProducts', productsArrayWithReviews);
    return productsArrayWithReviews[targetProductIndex].reviews.length;
}


