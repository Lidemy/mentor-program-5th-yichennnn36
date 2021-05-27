/* eslint-disable */
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault(); 
  let hasErr = false;
  let res = {};
  const eles = document.querySelectorAll('.required')
  for (let ele of eles) {
    const input = ele.querySelector('.required__input')
    const radios = ele.querySelectorAll('input[type=radio]')
    
    if (input) {
      res[input.name] = input.value
      if (!input.value) {
        ele.classList.remove('hide__err');
        hasErr = true;
      } else {
        ele.classList.add('hide__err');
      }
    }
    if (!radios.length) continue;
    let isValue = [...radios].some(radios => radios.checked) //一開始還在想到底要怎麼要才取的到布林值，卡關在這裡
    if (isValue) {
      let r = ele.querySelector('input[type=radio]:checked');
      let radioRes = r.nextElementSibling.innerText;
      res[r.name] = radioRes;
      ele.classList.add('hide-error');
    } else {
      ele.classList.remove('hide-error');
      hasErr = true;
    }
  }

})

