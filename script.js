'use strict'

// Интерфейс

// form
const form = document.querySelector('.form');
const formInputWidth = document.getElementById('width');
const formInputHeight = document.getElementById('height');
const formInputImage = document.querySelector('.form__input-image');
const formInputText = document.querySelector('.form__input-text');
const formButtonSend = document.querySelector('.form__btn');
const formButtonSave = document.querySelector('.app-banner__btn-save');
const formInputFile = document.querySelector('#fileInput');

// banner
const bannerUI = document.querySelector('.banner');
const bannerImage = document.querySelector('.banner__image');
const bannerText = document.querySelector('.banner__text');
// buttons
const btnCreateBanner = document.querySelector("input[type='submit']");
const buttons = document.querySelector('.buttons');


// canvas
const canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");

canvas.width = 400;

getPreviewCanvas();

// первоначальное изображение на canvas
function getPreviewCanvas() {
	let img = new Image(); // Создаем объект изображения
	img.src = 'https://adbutton.net/content/ru/articles/81.jpg'; // Загружаем файл изображения
	img.onload = function() {
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Отрисовка изображения на холсте (только когда изображение загрузилось уже)
		// ctx.font = "30px Arial";
		// ctx.fillStyle = "red";
		// ctx.textAlign = "center";
		// ctx.textBaseline = "middle";
		// // Выравниваем текст по центру
		// ctx.fillText("Ваш текст",canvas.width / 2,canvas.height / 2);
	};
}


// ~~~~~ Выбор картинки пользователем ~~~~~

formInputFile.addEventListener('change', onSelectFiles);

function onSelectFiles(e) {
	const file = e.currentTarget.files[0];
	let source = URL.createObjectURL(file);
	// вешаем на канвас
	let img = new Image(); // Создаем объект изображения
	img.src = source; // Загружаем файл изображения
	img.onload = function() {
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height); 
	};
	// отображаем в input text
	formInputImage.value = source;
}

// перенос строки (сторонняя)
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  var words = text.split(' ');
  var line = '';

  for(var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = ctx.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    }
    else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

function getBanner() {
	let img = new Image(); // Создаем объект изображения
	img.setAttribute('crossorigin', 'anonymous');
	img.src = formInputImage.value; // Загружаем файл изображения
	img.onload = function() {
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Отрисовка изображения на холсте (только когда изображение загрузилось уже)
		
		ctx.font = "30px Arial";
		ctx.fillStyle = "red";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		// Выравниваем текст по центру
		wrapText(ctx, formInputText.value, canvas.width / 2, canvas.height / 2, canvas.width, 24);
		// ctx.fillText(formInputText.value,canvas.width / 2,canvas.height / 2);

		function dataHandler(info) {
			let dataUrl = canvas.toDataURL();
		}

		
	};
}


// Данные баннера
let banner = {
	width: 800,
	height: 400,
	image: undefined,
	text: undefined 
}



// СКАЧАТЬ БАННЕР В ВИДЕ PNG
formButtonSend.addEventListener('click', formButtonSendHandler);

function formButtonSendHandler(e) {
	// отключаем обновление страницы
	e.preventDefault();
	if(formInputImage.value === '' || formInputText.value === '' || formInputWidth.value === '' || formInputHeight.value === '') {
		alert('Не все поля заполнены!');
	} else {
		// Валидация введенных данных


		// обновляем данные баннера
		banner.image = formInputImage.value;
		banner.text = formInputText.value;
		banner.width = formInputWidth.value;
		banner.height = formInputHeight.value;

		// обновляем интерфейс баннера
		getBanner();
		
		
		// bannerUI.style.width = banner.width + 'px';
		// bannerUI.style.height = banner.height + 'px';


		// Делаем другие кнопки активными
		for(let btn of buttons.children) {
			btn.removeAttribute('disabled');
			btn.classList.remove('disabled');
			btn.classList.add('active');
		}

		// Скрываем кнопку создания баннера
		// btnCreateBanner.style.display = 'none';
	}
}


// formButtonSave
formButtonSave.addEventListener('click', saveCanvasPng);

function saveCanvasPng() {
	console.log(canvas);
	// Canvas2Image.saveAsPNG(canvas, 400, 400);
}



