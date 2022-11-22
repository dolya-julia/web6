 window.addEventListener('DOMContentLoaded', function (event) {
    console.log("DOM fully loaded and parsed");
    let b = document.getElementById("button1");
    b.addEventListener("click", click1);
     // Скрываем радиокнопки.
  let radioDiv = document.getElementById("radios");
  radioDiv.style.display = "none";
  // Находим select по имени в DOM.
  let s = document.getElementsByName("prodType");
  let select = s[0];
  // Назначаем обработчик на изменение select.
  select.addEventListener("change", function(event) {
    let target = event.target;
    console.log(target.value);
    updatePrice();
  });
  
  // Назначаем обработчик радиокнопок.  
  let radios = document.getElementsByName("prodOptions");
  radios.forEach(function(radio) {
    radio.addEventListener("change", function(event) {
      let r = event.target;
      console.log(r.value);
      updatePrice();
    });
  });

    // Назначаем обработчик чекбокса.  
  let checkboxes = document.querySelectorAll("#checkboxes input");
  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener("change", function(event) {
      let c = event.target;
      console.log(c.name);
      console.log(c.value);
      updatePrice();
    });
  });
  updatePrice();
});

function updatePrice() {
  // Находим select по имени в DOM.

  let s = document.getElementsByName("prodType");
  let select = s[0];
  let price = 0;
  let prices = getPrices();
  let priceIndex = parseInt(select.value) - 1;
  if (priceIndex >= 0) {
    price = prices.prodTypes[priceIndex];
  }
  
  // Скрываем или показываем радиокнопки.
  let radioDiv = document.getElementById("radios");
  radioDiv.style.display = (select.value == "2" ? "block" : "none");
  
  // Смотрим какая товарная опция выбрана.
  let radios = document.getElementsByName("prodOptions");
  radios.forEach(function(radio) {
    if (radio.checked) {
      let optionPrice = prices.prodOptions[radio.value];
      if (optionPrice !== undefined) {
        price += optionPrice;
      }
    }
  });

  // Скрываем или показываем чекбоксы.
  let checkDiv = document.getElementById("checkboxes");
  checkDiv.style.display = ((select.value == "1" || select.value == "2")  ? "none" : "block");

  // Смотрим какие товарные свойства выбраны.
  let checkboxes = document.querySelectorAll("#checkboxes input");
  checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
      let propPrice = prices.prodProperties[checkbox.name];
      if (propPrice !== undefined) {
        price += propPrice;
      }
    }
  });

  let prodPrice = document.getElementById("prodPrice");
  prodPrice.value = price;
  updateTotalPrice();
}
function updateTotalPrice() {
    let prodCount = document.getElementById("prodCount");
    let prodPrice = document.getElementById("prodPrice");
    let calc2Res = document.getElementById("calc2Res");
    var re = /^[1-9]+[0-9]*$/;
    var prov=re.test(prodCount.value);
    var prov1=re.test(prodPrice.value);
    if (prov &&  prov1) {
      calc2Res.innerHTML = prodCount.value * prodPrice.value;
    }
    else if(prodCount.value == "" || prodPrice.value == ""){
      console.log("Недостаточно данных");
  }
    else {
      alert("Неверные данные");   
    }
    return false;
}
function getPrices() {
  return {
    prodTypes: [100, 200, 150],
    prodOptions: {
      option2: 10,
      option3: 5,
    },
    prodProperties: {
      prop1: 1,
      prop2: 2,
    }
  };
}

function click1() {
  let f1 = document.getElementsByName("field1");
  let f2 = document.getElementsByName("field2");
  let r = document.getElementById("result");
  var re = /^[1-9]+[0-9]*$/;
  var prov=re.test(f1[0].value);
  var prov1=re.test(f2[0].value);
  if (prov &&  prov1) {
    r.innerHTML = f1[0].value * f2[0].value;
  }
  else {
    alert("Неверные данные");   
  }
  return false;
}
let prodCount = document.getElementById("prodCount");
let prodPrice = document.getElementById("prodPrice");
prodCount.addEventListener("change", function(event) {
  updateTotalPrice();
});
$(document).ready(function(){
  $('.slider').slick({
    arrows:true,
    dots:true,
    adaptiveHeight: true,
    slidesToShow:4,
    slidesToScroll:4,
    speed: 1000,
    responsive: [{
      breakpoint: 768,
      settings: {
      slidesToScroll:2,
      slidesToShow: 2
    }
    },
    {
      breakpoint: 550,
      settings: {
        slidesToShow: 2,
        slidesToScroll:2,
        arrows:true
      }
    }
  ]
 });
});
  let b3 = document.getElementById("button");
  b3.addEventListener("click", formSend);
  function formSend(){
    const form = document.getElementById('form');
    let error = formValidate(form);
    if (error === 0){
      $.ajax({
        url: 'https://formcarry.com/s/v3jx-pgWK',
        method: 'POST',
        data: $('#form').serialize(),
        dataType: 'json',
        beforeSend: function() { },
        success: function(data) { 
          console.log('Success!');
          document.getElementById("answer").innerHTML = "Успешно отправлено!";
          localStorage.removeItem('name');
          localStorage.removeItem('email');
          localStorage.removeItem('message');
       },
        error: function(err) { 
          console.log('Fail!' );
          document.getElementById("answer").innerHTML = "Ошибка!";
        }
      });
    }
    else{
      alert('Заполните обязательные поля');
    }
  }
  let input_name = document.getElementById("name");
  input_name.addEventListener("change", function(event) {
    localStorage.setItem('name', input_name.value);
    console.log(localStorage.getItem('name'));
  }); 
  let input_email = document.getElementById("email");
  input_email.addEventListener("change", function(event) {
    localStorage.setItem('email', input_email.value);
    console.log(localStorage.getItem('email'));
  }); 
  let input_message = document.getElementById("message");
  input_message.addEventListener("change", function(event) {
    localStorage.setItem('message', input_message.value);
    console.log(localStorage.getItem('message'));
  }); 
  const name = localStorage.getItem('name');
  input_name = document.getElementById("name");
  input_name.value = name;
  const email = localStorage.getItem('email');
  input_email = document.getElementById("email");
  input_email.value = email;
  const message = localStorage.getItem('message');
  input_message = document.getElementById("message");
  input_message.value = message;

  function formValidate(form){
    let error = 0;
    let formReq = document.querySelectorAll('.req');
    for (let i = 0; i < formReq.length; i++){
      const input = formReq[i];
      formRemoveError(input);
      if(input.classList.contains('_email')){
        if (emailTest(input)){
          formAddError(input);
          error++;
        }
      }
      else if(input.getAttribute("type") === "checkbox" && input.checked === false){
        formAddError(input);
        error++;
      }
      else {
        if (input.value === ''){
          formAddError(input);
          error++;
        }
    }
    return error;
  }
  function emailTest(input){
    return !/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(input.value);
  }
  function formAddError(input){
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }
  function formRemoveError(input){
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }

  
    //Скрыть PopUp при загрузке страницы    
    PopUpHide();

//Функция отображения PopUp
function PopUpShow(){
    $("#popup").show();
history.pushState({is_popup_opened: true}, "First work | Отправка на почту", "/index.html/popup");
}
//Функция скрытия PopUp
function PopUpHide(){
    $("#popup").hide();
history.back(); // 
}
// Обработка события нажатия кнопки назад в браузере
window.onpopstate = (event) => {
  if (event.state == null || event.state["is_popup_opened"]) {
    PopUpHide();
}
};