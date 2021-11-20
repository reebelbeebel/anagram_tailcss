"use strict"

// Примеры слов для ознакомления
const mainWord = ["каток", "лоток", "поток"];
const answers = [
    ["кот", "ток", "кто"],
    ["лот", "ток", "толк", "кот", "кто"],
    ["кто", "ток", "пот", "кот"]
];

const spisok = document.querySelector(".spisokul")
const formEl = document.querySelector(".forma");
const word = document.querySelector(".main_word");
const inputWords = document.querySelector(".words");
const inputButton = document.querySelector(".btn_input");
const answerToUser = document.querySelector(".answer");
const nextWord = document.querySelector(".next_word");
const listPart = document.querySelector(".list_part");

nextWord.style.visibility = "hidden"; // прячем кнопку след слова

let countWord = 0; // счетчик главных слов
let countAnswer = 0; // счетчик ответов
let levelAnswers = []; // массив с введенными ответами, очищать после левела

nextWord.onclick = e => {
    e.preventDefault();
    countWord++;
    countAnswer++;
    word.textContent = mainWord[countWord];
    levelAnswers = []; // Очищаем массив для следующего слова
    nextWord.style.visibility = "hidden";
    spisok.textContent = "";
    inputWords.focus();
};

word.textContent = mainWord[countWord];
inputWords.focus();

inputButton.onclick = e => {
    e.preventDefault();
    const input = inputWords.value.toLowerCase();
    let inArrWord = answers[countAnswer].filter((answer) => answer === input);

    const doubleWord = levelAnswers.includes(input); // проверяем дубликаты
    formEl.reset();

    if (inArrWord[0] === input && levelAnswers.find((i) => i === input) === undefined) {
        levelAnswers.push(input); // добавляем элементы в массив с готовыми ответами
        let p = document.createElement("li") // создаем элементы списка
        spisok.append(p);
        p.setAttribute('class', 'mr-8 mt-8 text-xl text-white');
        p.textContent = `${input}`; // добавляем слово в список, прошедшее проверку
        answerToUser.textContent = "Верно!";
        setTimeout(() => {
            answerToUser.textContent = "";
        }, 1500);
    } else {
        answerToUser.textContent = "Неверно!";
        setTimeout(() => {
            answerToUser.textContent = "";
        }, 1500);
    }

    if (doubleWord) {
        answerToUser.textContent = "Такое слово уже есть!"; // показываем если слово повторяется
        setTimeout(() => {
            answerToUser.textContent = "";
        }, 1500);
    }
    //console.log(levelAnswers);
    if (levelAnswers.length >= 3) {
        nextWord.style.visibility = "visible"; //показываем кнопку если угадано 3 и более слов
    }

    inputWords.focus();
};
