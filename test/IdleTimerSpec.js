const sinon = require('sinon');
const expect = require('chai').expect;
const moment = require('moment');

const IdleTimer = require('../js/IdleTimer');

const IDLE_TIME = 5000;
const TEST_START_TIME = moment('2017-01-01T00:00:00-07:00').valueOf();

describe('IdleTimer', () => {
  let idleTimer;
  let idleAction;
  let sandbox;
  let clock;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    clock = sandbox.useFakeTimers(TEST_START_TIME);
    idleAction = sandbox.stub();
    idleTimer = new IdleTimer(idleAction, IDLE_TIME);
    expect(idleAction.callCount).to.equal(0);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('when idle time has passed', () => {
    describe('and there has been no activity', () => {
      beforeEach(() => {
        clock.tick(IDLE_TIME);
      });

      it('should call the passed in idle action', () => {
        expect(idleAction.callCount).to.equal(1);
      });

      describe('when idle time has passed again', () => {
        beforeEach(() => {
          clock.tick(IDLE_TIME);
        });

        it('should call the passed in idle action', () => {
          expect(idleAction.callCount).to.equal(2);
        });
      });
    });

    describe('and there has been activity before idle time has passed', () => {
      beforeEach(() => {
        clock.tick(IDLE_TIME - 1);
        idleTimer.handleActivity();
        clock.tick(1);
      });

      it('should not call the passed in idle action', () => {
        expect(idleAction.callCount).to.equal(0);
      });

      describe('when less than the idle time has passed since the last activity', () => {
        beforeEach(() => {
          clock.tick(IDLE_TIME - 2);
        });

        it('should not call the passed in idle action', () => {
          expect(idleAction.callCount).to.equal(0);
        });
      });

      describe('when idle time has passed since the last activity', () => {
        beforeEach(() => {
          clock.tick(IDLE_TIME);
        });

        it('should call the passed in idle action', () => {
          expect(idleAction.callCount).to.equal(1);
        });
      });
    });

    describe('and there has been activity after idle time has passed', () => {
      beforeEach(() => {
        clock.tick(IDLE_TIME);
        idleTimer.handleActivity();
      });

      it('should call the passed in idle action', () => {
        expect(idleAction.callCount).to.equal(1);
      });

      describe('when idle time has passed again', () => {
        beforeEach(() => {
          clock.tick(IDLE_TIME);
        });

        it('should call the passed in idle action', () => {
          expect(idleAction.callCount).to.equal(2);
        });
      });
    });
  });
});
