import { SyncLoader } from 'react-spinners';
import theme from '../../../styles/theme';

const LoadingSpinner = () => {
  return (
    <SyncLoader
      size={10}
      margin={4}
      color={theme.colors.write_white200}
      loading={true}
      cssOverride={{ animationFillMode: 'forwards' }}
      speedMultiplier={0.7}
    />
  );
};

export default LoadingSpinner;
