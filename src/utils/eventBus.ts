// Event Bus for cross-component communication
class EventBus {
  private events: { [key: string]: Function[] } = {};

  // Subscribe to an event
  on(event: string, callback: Function) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  // Unsubscribe from an event
  off(event: string, callback: Function) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }

  // Emit an event
  emit(event: string, data?: any) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => callback(data));
  }

  // Clear all events
  clear() {
    this.events = {};
  }
}

// Export singleton instance
export const eventBus = new EventBus();

// Event types
export const EVENTS = {
  VEHICLES_UPDATED: 'vehicles:updated',
  CONTACT_INFO_UPDATED: 'contact:updated',
  TESTIMONIALS_UPDATED: 'testimonials:updated',
} as const;
