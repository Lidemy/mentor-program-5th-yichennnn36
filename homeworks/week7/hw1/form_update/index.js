document.querySelector('.sheet').addEventListener('submit', (e) => {
  e.preventDefault();
  let hasErr = false;
  const res = {};

  const eles = document.querySelectorAll('.ques__required');
  for (const ele of eles) {
    const input = ele.querySelector('input[type=text]');
    const email = ele.querySelector('input[type=email]');
    const phone = ele.querySelector('input[type=number]');
    const radio = ele.querySelectorAll('input[type=radio]');
    let isValid = true;

    if (input) {
      res[input.name] = input.value;
      input.value ? isValid = true : isValid = false;
    } else if (email) {
      res[email.name] = email.value;
      email.value ? isValid = true : isValid = false;
    } else if (phone) {
      res[phone.name] = phone.value;
      phone.value ? isValid = true : isValid = false;
    } else if (radio.length) { // radio 一定會有內容（包括空陣列），使用radio.length來判斷
      isValid = [...radio].some((radio) => radio.checked); // 解構
      if (isValid) {
        const temp = ele.querySelector('input[type=radio]:checked');
        const type = temp.nextSibling.innerText;
        res[temp.name] = type;
      }
    } else {
      continue;
    }

    if (!isValid) {
      ele.querySelector('.warning__text').classList.remove('hide');
      hasErr = true;
    } else {
      ele.querySelector('.warning__text').classList.add('hide');
    }
    // 即時驗證，有 input 的話 -> ('.warning__text').classList.add('hide')
    ele.addEventListener('input', () => {
      const input = ele.querySelector('input');
      if (!input.value) {
        ele.querySelector('.warning__text').classList.remove('hide');
        hasErr = true;
      } else {
        ele.querySelector('.warning__text').classList.add('hide');
      }
    });
  }
  const other = document.querySelector('input[name=other]');
  other.value ? res[other.name] = other.value : res[other.name] = '';

  if (!hasErr) {
    alert(`
    暱稱： ${res.name}
    電子郵件： ${res.email}
    手機號碼： ${res.phone}
    報名類型： ${res.type}
    怎麼知道這個活動的： ${res.referal}
    其他（對活動的一些建議）：${res.other}`);
  }
});
