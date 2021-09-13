import styled from 'styled-components';
import PropTypes from 'prop-types';

const QuestionBlock = styled.div`
  margin-top: 50px;

  & div {
    font-size: ${props => props.theme.fontSize.fs_5};
    margin-bottom: 10px;
  }

  & div span {
    color: ${props => props.theme.colors.alert};
    font-size: ${props => props.theme.fontSize.fs_4};
    font-weight: bold;
  }

  & input {
    border: solid 1px #d0d0d0;
    font-size: ${props => props.theme.fontSize.fs_6};
    padding: 6px;
    width: 50%
  }

  & label {
    display: flex;
    font-size: ${props => props.theme.fontSize.fs_6};
  }

  & label ~ label {
    margin-top: 10px;
  }

  & label input {
    padding: 6px;
    width: 20px;
  }
`;

const Alert = styled.p`
  margin-top: 12px;
  color: ${props => props.theme.colors.alert};
  font-size: ${props => props.theme.fontSize.fs_6};
  font-weight: bold;
`;

const InputBlock = ({
  question,
  required,
  type,
  name,
  placeholder,
  value,
  handleInputChange,
  handleCheckValid,
  hasErr,
  isInValid,
  errMessage,
}) => {
  return (
    <QuestionBlock>
      <div>
        {question}
        {required && <span> *</span>}
      </div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onBlur={handleCheckValid}
      />
      {required && hasErr && !value && <Alert>{errMessage[0]}</Alert>}
      {isInValid && isInValid[name] && <Alert>{errMessage[1]}</Alert>}
    </QuestionBlock>
  );
};

InputBlock.propTypes = {
  question: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  handleInputChange: PropTypes.func,
  handleCheckValid: PropTypes.func,
  hasErr: PropTypes.bool,
  isInValid: PropTypes.object,
  errMessage: PropTypes.array,
};

const RadioBlock = ({
  question,
  value,
  handleInputChange,
  required,
  hasErr,
  errMessage
}) => {
  return (
    <QuestionBlock>
      <div>
        {question}
        {required && <span> *</span>}
      </div>
      <label>
        <input
          type="radio"
          name="entryType"
          value="bed"
          onChange={handleInputChange}
        />躺在床上用想像力實作
      </label>
      <label>
        <input
          type="radio"
          name="entryType"
          value="floor"
          onChange={handleInputChange}
        />趴在地上滑手機找現成的
      </label>
      {required && hasErr && !value && <Alert>{errMessage}</Alert>}
    </QuestionBlock>
  )
};

RadioBlock.propTypes = {
  question: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  handleInputChange: PropTypes.func,
  hasErr: PropTypes.bool,
  errMessage: PropTypes.array,
};

export { InputBlock, RadioBlock };