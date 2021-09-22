import { ReactComponent as LoadingIcon } from '../../images/rotate_right.svg';
import { LoadingBlock } from './LoadingStyle'; 

const Loading = () => {
  return (
    <LoadingBlock>
      <LoadingIcon />
      <div>Loading...</div>
    </LoadingBlock>
  )
};

export default Loading;