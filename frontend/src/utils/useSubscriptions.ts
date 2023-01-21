import * as React from 'react';
import { Subscription } from 'rxjs';

export function useSubscriptions() {
  const subsRef = React.useRef([] as Subscription[]);

  React.useEffect(() => () => subsRef.current.forEach((s: Subscription): void => s.unsubscribe()), []);

  const addSubscription = (sub: Subscription): void => {
    subsRef.current = subsRef.current.concat([sub]);
  };

  return React.useCallback(addSubscription, [subsRef]);
}