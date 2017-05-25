class IdleTimer {
  constructor(idleAction, idleTime) {
    this.idleAction = idleAction;
    this.idleTime = idleTime;

    setInterval(() => this.handleIdle(), this.idleTime);
  }

  handleIdle() {
    if (!this.activity) {
      this.idleAction();
    }
  }

  handleActivity() {
    this.activity = true;
  }
}

module.exports = IdleTimer;
