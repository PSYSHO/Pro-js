// Задание 1
// Представьте, что у вас есть класс для управления библиотекой. В этом классе будет приватное свойство для хранения списка книг, а также методы для добавления книги, удаления книги и получения информации о наличии книги.

// Класс должен содержать приватное свойство #books, которое инициализируется пустым массивом и представляет собой список книг в библиотеке.

// Реализуйте геттер allBooks, который возвращает текущий список книг.

// Реализуйте метод addBook(title), который позволяет добавлять книгу в список. Если книга с таким названием уже существует в списке, выбросьте ошибку с соответствующим сообщением.

// Реализуйте метод removeBook(title), который позволит удалять книгу из списка по названию. Если книги с таким названием нет в списке, выбросьте ошибку с соответствующим сообщением.

// Реализуйте метод hasBook(title), который будет проверять наличие книги в библиотеке и возвращать true или false в зависимости от того, есть ли такая книга в списке или нет.

// Реализуйте конструктор, который принимает начальный список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив не содержит дубликатов; в противном случае выбрасывайте ошибку.


class Library {
    #books = [];

    //конструктор
    constructor(listOfBooks) {
        try {
            if (listOfBooks.length === 0) {
                throw new Error('Вы не передали книги в библиотеку!');
            } else {
                listOfBooks.forEach(book => {
                    if (this.#books.includes(book)) {
                        throw new Error(`В списке книг есть дубликаты: "${book}"!`);
                    } else {
                        this.#books.push(book);
                        return this.#books;
                    }
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    //возвращает текущий список книг
    get allBooks() {
        return this.#books;
    }

    //добавления книги
    addBook(title) {
        try {
            if (this.#books.includes(title)) {
                throw new Error(`Книга с названием "${title}" уже существует в списке!`);
            } else {
                this.#books.push(title);
                return this.#books;
            }
        } catch (error) {
            console.error(error);
        }
    }

    //удаления книги
    removeBook(title) {
        try {
            if (this.#books.includes(title)) {
                this.#books = this.#books.filter(bookTitle => bookTitle !== title);
                console.log(`Обновленный список книг: ${this.#books}`);
                return this.#books;
            } else {
                throw new Error(`Книги с названием "${title}" нет в списке!`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    //проверка наличия книги в библиотеке
    hasBook(title) {
        if (this.#books.includes(title)) {
            return true;
        } else {
            return false;
        }
    }
}
const library = new Library(["Ночь", "Три поросенка","Три медведя"]);
console.log(library.allBooks);

// console.log(library.addBook("Три поросенка"));
// console.log(library.addBook("Тень"));


// console.log(library.removeBook("Бременские музыканты"));
// console.log(library.removeBook("Тень"));
// console.log(library.removeBook("Три поросенка"));

// console.log(library.hasBook("Снежная королева"));
// console.log(library.hasBook("Три поросенка"));
// console.log(library.hasBook("Ночь"));
// console.log(library.hasBook("Три медведя"));


