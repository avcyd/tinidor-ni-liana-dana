import { useState, useEffect, useCallback } from "react";
import { subscribeToNetworkStatus } from "../../services/networkStatus";

function ConnectionBanner() {
  const [offline, setOffline] = useState(false);

  const handleChange = useCallback((online: boolean) => {
    setOffline(!online);
  }, []);

  useEffect(() => {
    const unsub = subscribeToNetworkStatus(handleChange);
    return unsub;
  }, [handleChange]);

  if (!offline) return null;

  return (
    <div className="connection-banner" role="alert">
      <p>
        You're currently offline. Some features may be unavailable while
        we reconnect to the server.
      </p>
    </div>
  );
}

export default ConnectionBanner;
