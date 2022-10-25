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

