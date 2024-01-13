import { getDataFromLS } from './localStorageMethods.js';

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

            // return  divReviews;


            // if (reviewItem === null) {

            //     const reviewContainer = document.createElement('div');
            //     reviewContainer.classList.add('review_box');

            //     const reviewText = document.createElement('p');
            //     reviewText.classList.add('review_warning');
            //     reviewText.textContent = 'Отзывы о данном товаре пока отсутствуют!';

            // const removeButton = document.createElement('button');
            // removeButton.classList.add('review_remove-button');
            // removeButton.type = 'button';
            // removeButton.textContent = 'Удалить';

            // reviewContainer.append(reviewText);
            // // reviewContainer.append(removeButton);

            // detailsDiv.append(reviewContainer);
            // divReviews.append(detailsDiv);
            // const reviewContainer = document.createElement('div');
            // reviewContainer.classList.add('review_box');

            // const warning = document.createElement('p');
            // warning.classList.add('review_warning-text');
            // warning.textContent = 'Отзывы о данном товаре пока отсутствуют!'
            // reviewContainer.append(warning);
            // detailsDiv.append(reviewContainer);
            // divReviews.append(detailsDiv);///////


            // } else {
            // const reviewContainer = document.createElement('div');
            // reviewContainer.classList.add('review_box');

            // const reviewText = document.createElement('p');
            // reviewText.classList.add('review_text');
            // reviewText.textContent = `${reviewItem.text}`;

            // const removeButton = document.createElement('button');
            // removeButton.classList.add('review_remove-button');
            // removeButton.type = 'button';
            // removeButton.textContent = 'Удалить';

            // reviewContainer.append(reviewText);
            // reviewContainer.append(removeButton);

            // detailsDiv.append(reviewContainer);
            // divReviews.append(detailsDiv);

            // }
        })
    })
   
}
renderInitialData();


const reviewsDiv = document.querySelector('.reviews');
reviewsDiv.addEventListener('click', function (event) {

    if (event.target.className != 'review_remove-button') return;
    let reviewBox = event.target.closest('.review_box');
    reviewBox.remove();

    removeReviewFromLS();

});

function removeReviewFromLS (productName, id) {
    const productsArrayWithReviews = getDataFromLS('reviewsOfDifferentProducts');
    const targetProductId = productsArrayWithReviews.findIndex(el => el.product === productName);
    const targetReviewId = productsArrayWithReviews[targetProductId].reviews.findIndex(review => review.id === id);
    data[targetProductId].reviews.splice(targetReviewId, 1);
    saveDataToLS('productReviews', productsArrayWithReviews);
    return productsArrayWithReviews[targetProductId].reviews.length;
}



// const renderInitialData = () => {

//     productsArray = getDataFromLS('reviewsOfDifferentProducts');

//     const divReviews = document.querySelector('.reviews');
//     // divReviews.innerHTML = ''; //чтобы не было задвоение товаров

//     productsArray.forEach(productItem => {
//         const detailsDiv = document.createElement('details');
//         summaryDiv.classList.add('review_details')

//         const summaryDiv = document.createElement('summary');
//         summaryDiv.classList.add('review_summary')
//         summaryDiv.textContent = `${productItem.product}`;

//         detailsDiv.append(summaryDiv);

//         productItem.reviews.forEach(reviewItem => {
//             if (reviewItem.length === 0) {
//                 const warning = document.createElement('p');
//                 warning.classList.add('review_warning-text');
//                 warning.textContent = 'Отзывы о данном товаре пока отсутствуют!'
//                 detailsDiv.append(warning);
//             } else {
//                 const reviewContainer = document.createElement('div');
//                 reviewContainer.classList.add('review_box');

//                 const reviewText = document.createElement('p');
//                 reviewText.classList.add('review_text');
//                 reviewText.textContent = `${reviewItem.text}`;

//                 const removeButton = document.createElement('button');
//                 removeButton.classList.add('review_remove-button');
//                 removeButton.type = 'button';
//                 removeButton.textContent = 'Удалить';

//                 reviewContainer.append(reviewText);
//                 reviewContainer.append(removeButton);

//                 detailsDiv.append(reviewContainer);
//                 divReviews.append(detailsDiv);

//             }
//         })

//     })
// }
