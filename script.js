





$('.bxslider').bxSlider({
    hideControlOnEnd: true,
    slideWidth: 1190,
    infiniteLoop: true,
    hideControlOnEnd: true
  });

  // $( ".button" ).on( "click", function() {
  //   alert( "Handler for `click` called." );
  // } );

  $.fn.animate_Text = function() {
    let string = this.text();
    return this.each(function(){
     let $this = $(this);
     $this.html(string.replace(/./g, '<span class="new">$&</span>'));
     $this.find('span.new').each(function(i, el){
      setTimeout(function(){ $(el).addClass('div_opacity'); }, 20 * i);
     });
    });
   };
   $('#example').show();
   $('#example').animate_Text();


// карта скрыть/открыть

let containers;
function initDrawers() {
	containers = document.querySelectorAll(".map-container");
	setHeights();
	wireUpTriggers();
	window.addEventListener("resize", setHeights);
}

window.addEventListener("load", initDrawers);

function setHeights() {
	containers.forEach(container => {
		let content = container.querySelector(".map-responsive");
		content.removeAttribute("aria-hidden");
		let heightOfContent = content.getBoundingClientRect().height;
		container.style.setProperty("--containerHeight", `${heightOfContent}px`);
		setTimeout(e => {
			container.classList.add("height-is-set");
			content.setAttribute("aria-hidden", "true");
		}, 0);
	});
}

function wireUpTriggers() {
	containers.forEach(container => {
		let btn = container.querySelector(".triggerd");
		let content = container.querySelector(".map-responsive");
		btn.addEventListener("click", () => {
			container.setAttribute(
				"data-drawer-showing",
				container.getAttribute("data-drawer-showing") === "true" ? "false" : "true"
			);
			content.setAttribute(
				"aria-hidden",
				content.getAttribute("aria-hidden") === "true" ? "false" : "true"
			);
		});
	});
}

const hamb = document.querySelector("#hamb");
const popup = document.querySelector("#popup");
const body = document.body;
const tch = document.querySelector("#page-hero");
const tch1 = document.querySelector("#popup");
let condition = true;

// Клонируем меню, чтобы задать свои стили для мобильной версии
const menu = document.querySelector("#menu").cloneNode(true);

// При клике на иконку hamb вызываем ф-ию hambHandler
let start = 0;
let end = 0;
hamb.addEventListener("click", hambHandler);

tch.addEventListener("touchstart", function (event) {
  if (event instanceof TouchEvent) {
    start = event.touches[0].pageX;
  }
  console.log(start, end);
});
tch.addEventListener("touchend", function (event) {
  if (event instanceof TouchEvent) {
    end = event.changedTouches[0].pageX;
    if (end - start >= 100 && condition) {
      hambHandler(event);
    } else if (start - end >= 100 && !condition) {
      closeOnClick();
    }
  }
  console.log(start, end);
});

tch1.addEventListener("touchstart", function (event) {
  if (event instanceof TouchEvent) {
    start = event.touches[0].pageX;
  }
  console.log(start, end);
});
tch1.addEventListener("touchend", function (event) {
  if (event instanceof TouchEvent) {
    end = event.changedTouches[0].pageX;
    if (start - end >= 100 && condition) {
      hambHandler(event);
    } else if (end - start >= 100 && !condition) {
      closeOnClick();
    }
  }
  console.log(start, end);
});

// Выполняем действия при клике ..
function hambHandler(e) {
  e.preventDefault();
  // Переключаем стили элементов при клике
  popup.classList.toggle("open");
  hamb.classList.toggle("active");
  body.classList.toggle("noscroll");
  let condition = false;
  renderPopup();
}

// Здесь мы рендерим элементы в наш попап
function renderPopup() {
  popup.appendChild(menu);
}

// Код для закрытия меню при нажатии на ссылку
const links = Array.from(menu.children);

// Для каждого элемента меню при клике вызываем ф-ию
links.forEach((link) => {
  link.addEventListener("click", closeOnClick);
});

// Закрытие попапа при клике на меню
function closeOnClick() {
  let condition = true;
  popup.classList.remove("open");
  hamb.classList.remove("active");
  body.classList.remove("noscroll");
}
