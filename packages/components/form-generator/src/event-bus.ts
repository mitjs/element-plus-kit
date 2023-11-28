export const eventBus: Record<string, any> = {
  events: {},
  on(event: string, cb: () => void) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(cb);
  },
  emit(event: string, ...args: any[]) {
    if (this.events[event]) {
      this.events[event].forEach((callback: () => void) => {
        callback(...args);
      });
    }
  },
};
