document.querySelector('.sheet').addEventListener('submit', (e) => {
  e.preventDefault();
  let hasErr = false;
  const res = {};

  const elements = document.querySelectorAll('.ques__required');
  for (const element of elements) {
    const input = element.querySelector('input[type=text]');
    const email = element.querySelector('input[type=email]');
    const phone = element.querySelector('input[type=number]');
    const radio = element.querySelectorAll('input[type=radio]');
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
        const temp = element.querySelector('input[type=radio]:checked');
        const type = temp.nextSibling.innerText;
        res[temp.name] = type;
      }
    } else {
      continue;
    }

    if (!isValid) {
      element.querySelector('.warning__text').classList.remove('hide');
      hasErr = true;
    } else {
      element.querySelector('.warning__text').classList.add('hide');
    }
    // 即時驗證，有 input 的話 -> ('.warning__text').classList.add('hide')
    element.addEventListener('input', () => {
      const ImmediateValue = element.querySelector('input');
      if (!ImmediateValue.value) {
        element.querySelector('.warning__text').classList.remove('hide');
        hasErr = true;
      } else {
        element.querySelector('.warning__text').classList.add('hide');
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
