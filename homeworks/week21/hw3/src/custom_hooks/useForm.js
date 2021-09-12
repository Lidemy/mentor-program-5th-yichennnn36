import { useState } from 'react';

const transferSuccessMessage = (data) => {
  const result = `
    送出成功，以下為您所填入的資料：
    ・暱稱：${data.name}
    ・電子郵件：${data.email}
    ・手機號碼：${data.phone}
    ・報名類型：${data.entryType === 'bed'? '躺在床上用想像力實作' : '趴在地上滑手機找現成的'}
    ・怎麼知道這個活動的：${data.referal}
    ・其他 對活動的一些建議：${data.suggestion}`;
  return result;
};

const useForm = () => {
  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    phone: '',
    entryType: '',
    referal: '',
    suggestion: '',
  });

  const [hasErr, setHasErr] = useState(false);
  const [isInValid, setIsInValid] = useState({
    email: false,
    phone: false,
  });

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleCheckValid = (e) => {
    const { name, value } = e.target;
    // 電話驗證
    // 09xxxxxxxx
    const phoneRule = /^09\d{8}$/;
    // email 驗證
    // 中間要有 '@', 前後至少 1 個字、至多 64 個字
    // '@' 前後可以是數字、字母、底線、.、-
    const emailRule = /^([\w\.\-]){1,64}\@([\w\.\-]){1,64}$/; //eslint-disable-line

    if (name === 'email' && value) {
      const emailBoolean = emailRule.test(value) ? false : true;
      return setIsInValid({...isInValid, email: emailBoolean})
    }
    if (name === 'phone' && value) {
      const phoneBoolean = phoneRule.test(value) ? false : true;
      return setIsInValid({...isInValid, phone: phoneBoolean})
    }
  }

  const { name, email, phone, entryType, referal } = inputValue;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !entryType || !referal) {
      return setHasErr(true);
    }
    setHasErr(false);
    alert(transferSuccessMessage(inputValue));
  }

  return {
    inputValue,
    setInputValue,
    hasErr,
    setHasErr,
    isInValid,
    setIsInValid,
    handleInputChange,
    handleCheckValid,
    handleSubmit,
  };
}

export default useForm;
