import React from 'react';

import { Icon } from './styles';

function Loading({ ...props }) {
  // const [loading, setLoading] = useState(isLoading);

  // useEffect(() => {
  //   setLoading(isLoading);
  // }, [isLoading]);

  return <Icon {...props} />;
}

export default Loading;
