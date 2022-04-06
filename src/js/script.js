const body = document.getElementById('body');
const main = document.getElementById('main');

function initialScreen() {
    const section = document.createElement('section');
    const divCircle = document.createElement('div');
    const divScreen = document.createElement('div');
    const h1 = document.createElement('h1');
    const h3 = document.createElement('h3');
    const button = document.createElement('button');

    section.classList.add('initialGame');
    section.id = 'initialPage';
    divCircle.classList.add('circleLoading');
    divScreen.classList.add('screenInit');
    h1.innerText = 'JOGO GENIUS';
    h3.innerText = 'Acerte o máximo de cores que puder!!';
    button.type = 'button';
    button.id = 'buttonInit';
    button.classList.add('buttonInit');
    button.innerText = 'INICIAR JOGO';

    button.addEventListener("click", (e) => {

        section.classList.add('initialGameHidden');

        screenGame();
        initGame();
    });

    section.appendChild(divCircle);
    divScreen.appendChild(h1);
    divScreen.appendChild(h3);
    divScreen.appendChild(button);
    section.appendChild(divScreen);

    main.appendChild(section);
};
initialScreen();


function screenGame() {
    const section = document.createElement('section');
    const divButtonPurple = document.createElement('div');
    const divButtonPink = document.createElement('div');
    const divButtonYellow = document.createElement('div');
    const divButtonBlue = document.createElement('div');
    const divInfoButton = document.createElement('div');


    section.classList.add('buttonsLayout');
    section.setAttribute('id', 'gameScreen');
    divButtonPurple.classList.add('button', 'button--purple');
    divButtonPink.classList.add('button', 'button--pink');
    divButtonYellow.classList.add('button', 'button--yellow');
    divButtonBlue.classList.add('button', 'button--blue');
    divInfoButton.classList.add('infoButton');


    section.appendChild(divButtonPurple);
    section.appendChild(divButtonPink);
    section.appendChild(divButtonYellow);
    section.appendChild(divButtonBlue);
    section.appendChild(divInfoButton);

    main.appendChild(section);
};


let randomPlay = [];
let userPlay = [];

let counter = 0;

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function animation(button, color) {
    button.classList.add(`${color}--active`);

    setTimeout(() => {
        button.classList.remove(`${color}--active`);
    }, 1000);
};


function activateButton(button, color) {

    setTimeout(() => {
        animation(button, color);
    }, 2000);
};



function getButtonAnimation() {
    const randomNumber = getRandomNumber(0, 4);

    const button = document.querySelectorAll(".button")[randomNumber];
    const colorButton = button.classList[1].split('-')[2];

    randomPlay.push(button);

    let counterRepeat = 0;

    const animationInterval = setInterval(() => {

        if (randomPlay.length > 0) {

            setTimeout(() => {

                if (counterRepeat < randomPlay.length) {

                    let actualButton = randomPlay[counterRepeat];
                    let actualColor = actualButton.classList[1].split('-')[2];

                    activateButton(actualButton, actualColor);
                    counterRepeat++;
                } else {
                    counterRepeat = 0;
                    clearTimeout(animationInterval);
                };
            }, 1000);
        } else {
            activateButton(button, colorButton);
            clearInterval(animationInterval);
        };
    }, 2000);

};



function addEventButtons() {

    const buttons = document.querySelectorAll('.button');

    for (let i = 0; i < buttons.length; i++) {

        buttons[i].addEventListener('click', (e) => {

            const clickedButton = e.target;
            const clickedButtonColor = e.target.classList[1].split('-')[2];
            clickedButton.classList.add(`${clickedButtonColor}--active`);

            setTimeout(() => {
                clickedButton.classList.remove(`${clickedButtonColor}--active`);
            }, 500);

            userPlay.push(clickedButton);

            const swub = checkLost();
            if (swub) {
                userPlay = [];
                randomPlay = [];
                restartGame(counter);
                counter = 0;

            } else if (randomPlay.length === userPlay.length) {
                userPlay = [];
                counter++;
                getButtonAnimation();
            };
        });
    };
};

function checkLost() {

    for (let i = 0; i < userPlay.length; i++) {

        if (userPlay[i] !== randomPlay[i]) {
            return true;
        };

    };
    return false;
};

function restartGame(numberResult) {
    const section = document.createElement('section');
    const divCircle = document.createElement('div');
    const divScreen = document.createElement('div');
    const h1 = document.createElement('h1');
    const h3 = document.createElement('h3');
    const reloadButton = document.createElement('button');
    const gameScreen = document.getElementById('gameScreen');

    section.classList.add('restartGame');
    section.setAttribute('id', 'restartGameScreen')
    divCircle.classList.add('circleLoading');
    divScreen.classList.add('restartScreen');
    gameScreen.classList.add('buttonsLayoutHidden');
    reloadButton.classList.add('reloadButton');
    reloadButton.setAttribute('id', 'reloadGame');

    h1.innerText = 'Você perdeu!!';
    h3.innerText = 'Sua pontuação: ' + numberResult;
    reloadButton.innerText = 'REINICIAR JOGO';

    reloadButton.addEventListener('click', () => {

        const main = document.getElementById('main');
        main.innerHTML = '';

        screenGame();
        initGame();

    });

    divScreen.append(h1, h3, reloadButton);
    section.append(divCircle, divScreen);

    main.appendChild(section);

};

function initGame() {
    getButtonAnimation();
    addEventButtons();
};