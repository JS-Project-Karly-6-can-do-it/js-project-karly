import { attr, deleteStorage, addClass, getNodes, removeClass, getNode, renderItemList, } from '../lib/index.js';
import  { } from '../lib/dom/swiper.js';
import {  } from '../lib/dom/header.js';



renderItemList();


/*-------------장바구니 추가 ------------------------------------------*/
const cartTotal = getNode('.cartTotal');
const swiperWrapper2 = getNode('.swiperWrapper2')
const swiperWrapper3 = getNode('.swiperWrapper3')

let totalCart = 0;
let index = 0;

/* 모달 열릴때마다 초기화 확인 */
let isModalInitialized = false;

function handleAddCartModal(e) {
  const button = e.target.closest('button')

  const addCartModal = getNode('.addCartModalContainer');
  const modalClose = getNode('.addCartModal__button__modalClose');
  const modalAdd = getNode('.addCartModal__button__modalAdd');


  // 클릭한 대상의 data-index값 불러오기
  const cartIndex = e.target.closest('button')
  index = attr(cartIndex,'data-index');

  fetchData();
  if(button){
    if (!isModalInitialized) {
      modalClose.addEventListener('click', () => {
        addClass(addCartModal, 'hidden');
      });
  
      modalAdd.addEventListener('click', () => {
        ++totalCart;
        addClass(cartTotal, 'h-6');
        addClass(cartTotal, 'w-5');
        cartTotal.textContent = `${totalCart}`;
        // localStorage.setItem('cart',`${totalCart}`)
        addClass(addCartModal, 'hidden');
      });
  
      isModalInitialized = true;
    }
    removeClass(addCartModal, 'hidden');
    
  }
  
}

swiperWrapper2.addEventListener('click', handleAddCartModal)
swiperWrapper3.addEventListener('click', handleAddCartModal)




/* 모달창에 data 띄우기 */
const productCount = getNode('.productCount');
let productCountTextContent = 1;

async function fetchData() {
  try {
    const productName = getNode('.addCartModal__productName');
    const productCost = getNode('.modalProduct');
    const productTotal = getNode('.addCartModal__total__cost');
    const response = await fetch('http://localhost:3000/products');
    const jsondata = await response.json();

    productName.textContent = jsondata[index - 1].name;
    productCost.textContent = numberComma(jsondata[index - 1].price) + `원`;
    productTotal.textContent = numberComma((jsondata[index - 1].price) * productCountTextContent) + `원`;
  } catch (error) {
    console.error('Error:', error);
  }
}

const addProduct = getNode('.addProduct');

function handleModalCartCountUp() {
  ++productCountTextContent;
  productCount.textContent = productCountTextContent;
  fetchData();
}

addProduct.addEventListener('click', handleModalCartCountUp);

/* 물건 갯수 빼기 */
const removeProduct = getNode('.removeProduct')
function handleModalCartCountDown(){
  if(productCountTextContent > 1){
    --productCountTextContent;
    productCount.textContent = productCountTextContent;
    fetchData();
  } 
}
removeProduct.addEventListener('click',handleModalCartCountDown)





/* 장바구니 모달창 갯수 초기화 */
const resetCount = getNode('.addCartModal__button');
function handleModalCartCountReset() {
  productCountTextContent = 1;
  productCount.textContent = productCountTextContent;
}
resetCount.addEventListener('click', handleModalCartCountReset);



/* 숫자 세 자리 마다 , 찍기 */
function numberComma(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}



