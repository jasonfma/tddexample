class IdleTimer {
  constructor(idleAction, idleTime) {
    this.idleAction = idleAction;
    this.idleTime = idleTime;

    this.restartTimer();
  }

  restartTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(() => this.handleIdle(), this.idleTime);
  }

  handleIdle() {
    this.idleAction();
  }

  handleActivity() {
    this.restartTimer();
  }
}

module.exports = IdleTimer;
