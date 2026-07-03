type Listener = (online: boolean) => void;

const listeners = new Set<Listener>();
let isOnline = true;

function handleOnline() {
  isOnline = true;
  listeners.forEach((fn) => fn(true));
}

function handleOffline() {
  isOnline = false;
  listeners.forEach((fn) => fn(false));
}

export function subscribeToNetworkStatus(fn: Listener) {
  listeners.add(fn);
  fn(isOnline);

  if (listeners.size === 1) {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
  }

  return () => {
    listeners.delete(fn);
    if (listeners.size === 0) {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    }
  };
}
