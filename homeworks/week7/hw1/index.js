document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  let hasErr = false;
  const res = {};

  const inputs = document.querySelectorAll('.required__input');
  for (const input of inputs) {
    if (input) {
      res[input.name] = input.value;
    } if (!input.value) {
      input.closest('.required').classList.remove('hide__err');
      hasErr = true;
    } else {
      input.closest('.required').classList.add('hide__err');
    }
  }
  // 報名類型一開始怎樣都寫不對，看了檢討影片學了 some()
  const radios = document.querySelectorAll('input[type=radio]');
  for (const radio of radios) {
    if ([...radios].some((radio) => radio.checked)) {
      radio.closest('.required').classList.add('hide__err');
      res[radio.type] = radio.nextSibling.innerText;
    } else {
      radio.closest('.required').classList.remove('hide__err');
    }
  }

  const other = document.querySelector('.other');
  if (other.value) res[other.name] = other.value;
  if (!hasErr) {
    alert(`
    暱稱：${res.name}
    電子郵件：${res.email}
    手機號碼：${res.phone}
    報名類型：${res.radio}
    怎麼知道這個活動的：${res.referal}
    其他 對活動的一些建議：${res.other}
  `);
  }
});
