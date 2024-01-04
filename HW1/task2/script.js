const dishesAndCooks = new Map;
dishesAndCooks.set('Пицца "Маргарита"', 'повар: Виктор')
    .set('Пицца "Пепперони"', 'повар: Виктор')
    .set('Суши "Филадельфия"', 'повар: Ольга')
    .set('Суши "Калифорния"', 'повар: Ольга')
    .set('Десерт "Тирамису"', 'повар: Дмитрий')
    .set('Десерт "Чизкейк"', 'повар: Дмитрий');





///////////////////// Model /////////////////////

const restaurantModel = {
    listOfOrders: new Map(),
    allCooks: dishesAndCooks
}


///////////////////// View /////////////////////

const restaurantView = {

    pushOrderButton() {

        const makeOrderButton = document.querySelector(`[name="make-order"]`);
        makeOrderButton.addEventListener("click", (event) => {
            event.preventDefault();

            const clientName = document.querySelector(`[name="get-name"]`).value;
            const selectedDishes = document.querySelectorAll('input[type="checkbox"]:checked');

            const listOfSelectedDihes = [];
            selectedDishes.forEach(dish => {
                listOfSelectedDihes.push(dish.value);
            });

            if (clientName === '' || listOfSelectedDihes.length === 0) {
                const firstParagraph = document.querySelector('.your-order');
                firstParagraph.textContent = "Некорректное оформление заказа! Нажмите на кнопку 'Очистить форму' и заполните форму полностью!";
            } else {
                restaurantController.makeOrder(clientName, listOfSelectedDihes);
            }
            makeOrderButton.setAttribute('disabled', 'disabled');

        });
    },
    pushWatchCookButton(){
        const watchCookButton = document.querySelector(`[name="watch-cook"]`);
        watchCookButton.addEventListener("click", () => {
            const selectedDishes = document.querySelectorAll('input[type="checkbox"]:checked');
            const listOfSelectedDihes = [];
            selectedDishes.forEach(dish => {
                listOfSelectedDihes.push(dish.value);
            });

            if (listOfSelectedDihes.length === 0) {
                const ul = document.querySelector('.cook-name-list');
                const warningLi = document.createElement('li');
                warningLi.textContent = "Вы не можете просмотреть информацию о поварах, так как не оформили заказ!";
                ul.append(warningLi);
            } else {
                restaurantController.getCooksNames(listOfSelectedDihes);            }
            watchCookButton.setAttribute('disabled', 'disabled');
        });
    },

    pushFirstClearButton() {
        const firstClearButton = document.querySelector(`[name="clear-order"]`);
        firstClearButton.addEventListener('click', () => {
            const firstParagraph = document.querySelector('.your-order');
            firstParagraph.textContent = '';
            document.querySelector('.forma').reset();

            const makeOrderButton = document.querySelector(`[name="make-order"]`);
            makeOrderButton.removeAttribute('disabled', 'disabled');


            const showCooksUl = document.querySelector('.cook-name-list');
            const allLi = showCooksUl.querySelectorAll('li');
            allLi.forEach((child) => { child.remove() });

            const watchCookButton = document.querySelector(`[name="watch-cook"]`);
            watchCookButton.removeAttribute('disabled', 'disabled');

        });
    },

    showOrder() {
        const firstParagraph = document.querySelector('.your-order');
        for (const [key, value] of restaurantModel.listOfOrders) {
            firstParagraph.textContent = `Клиент ${key.name} заказал(а): ${value}`;
        }
    },

    showCooks(listOfCooks){
        const showCooksUl = document.querySelector('.cook-name-list');
        listOfCooks.forEach(cookInfo => {
            const li = document.createElement('li');
            li.textContent = cookInfo;
            showCooksUl.append(li);
        });

    },

    showSecondWarning(warning) {
        const secondParagraph = document.querySelector('.your-orders');
        if (warning) {
            const li = document.createElement('li');
            li.textContent = warning;
            secondParagraph.append(li);
        }
        const showOrdersButton = document.querySelector(`[name="show-all-orders"]`);
        showOrdersButton.setAttribute('disabled', 'disabled');
    },

    showAllOrders() {
        const showOrdersButton = document.querySelector(`[name="show-all-orders"]`);
        showOrdersButton.addEventListener("click", () => {

            let allOrdersList = [];
            allOrdersList = restaurantController.getAllOrders();

            const secondParagraph = document.querySelector('.your-orders');
            allOrdersList.forEach(order => {
                const li = document.createElement('li');
                li.textContent = `Клиент: ${order.client} заказал(а): ${order.orderedDishes}`;
                secondParagraph.append(li);
            });
            showOrdersButton.setAttribute('disabled', 'disabled');
        });
    },

    pushSecondClearButton() {
        const secondClearButton = document.querySelector(`[name="clear-all-orders"]`);
        secondClearButton.addEventListener('click', () => {
            const secondParagraph = document.querySelector('.your-orders');
            const allLi = secondParagraph.querySelectorAll("li");
            allLi.forEach((child) => { child.remove() });

            const showOrdersButton = document.querySelector(`[name="show-all-orders"]`);
            showOrdersButton.removeAttribute('disabled', 'disabled');
        });
    },


}
restaurantView.pushOrderButton();
restaurantView.pushWatchCookButton();
restaurantView.pushFirstClearButton();
restaurantView.pushSecondClearButton();
restaurantView.showOrder();
restaurantView.showAllOrders();


///////////////////// Controller /////////////////////

const restaurantController = {

    makeOrder(client, dishes) {

        const newClient = {
            id: Date.now().toString(36) + Math.random().toString(36).substring(2),
            name: client
        }

        restaurantModel.listOfOrders.set(newClient, dishes);
        restaurantView.showOrder();
    },

    getCooksNames(list){
        const arrayOfChekedDishes = list;
        const cooksAndDishes = [];

        arrayOfChekedDishes.forEach(dish => {
            restaurantModel.allCooks.forEach(function(value, key) {
                if (dish === key) {
                    const result = `Блюдо ${dish} приготовил(а) ${value}.`
                    return cooksAndDishes.push(result);
                }
            })
        });
        restaurantView.showCooks(cooksAndDishes);
    },

    getAllOrders() {
        const orders = [];
        if (restaurantModel.listOfOrders.size === 0) {
            const warning = "В данный момент список заказов пуст!";
            restaurantView.showSecondWarning(warning);
        } else {
            let counter = 0;
            for (const [key, value] of restaurantModel.listOfOrders) {
                counter++;
                let order = { client: key.name, orderedDishes: value };
                orders.push(order);
            }
            return orders;
        }
    }
}







