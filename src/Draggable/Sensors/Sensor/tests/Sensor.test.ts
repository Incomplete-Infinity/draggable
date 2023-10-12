import Sensor from '../Sensor';
import {DragStartSensorEvent} from '../../SensorEvent';

describe('Sensor', () => {
  describe('#constructor', () => {
    it('should initialize with default containers and options', () => {
      const sensor = new Sensor();

      expect(sensor.containers).toMatchObject([]);
      expect(sensor.options).toMatchObject({});
    });

    it('should initialize with containers and options', () => {
      const expectedContainers = [document.body];
      const expectedOptions = {delay: 0};
      const sensor = new Sensor(expectedContainers, expectedOptions);

      expect(sensor.containers).toStrictEqual(expectedContainers);
      expect(sensor.options).toStrictEqual(expectedOptions);
    });

    describe('should initialize with correct delay', () => {
      it('unset', () => {
        const sensor = new Sensor(undefined, {});

        expect(sensor.delay).toStrictEqual({
          mouse: 0,
          drag: 0,
          touch: 100,
        });
      });

      it('number', () => {
        const sensor = new Sensor(undefined, {delay: 42});

        expect(sensor.delay).toStrictEqual({
          mouse: 42,
          drag: 42,
          touch: 42,
        });
      });

      it('object', () => {
        const sensor = new Sensor(undefined, {delay: {mouse: 42, drag: 142}});

        expect(sensor.delay).toStrictEqual({
          mouse: 42,
          drag: 142,
          touch: 100,
        });
      });
    });
  });

  describe('#attach', () => {
    it('should return self', () => {
      const sensor = new Sensor();
      const returnValue = sensor.attach();

      expect(returnValue).toBe(sensor);
    });
  });

  describe('#detach', () => {
    it('should return self', () => {
      const sensor = new Sensor();
      const returnValue = sensor.attach();

      expect(returnValue).toBe(sensor);
    });
  });

  describe('#addContainer', () => {
    it('adds container to sensor', () => {
      const containers = [document.documentElement, document.body];
      const sensor = new Sensor();

      expect(sensor.containers).toStrictEqual([]);

      sensor.addContainer(...containers);

      expect(sensor.containers).toStrictEqual(containers);
    });
  });

  describe('#removeContainer', () => {
    it('removes container to sensor', () => {
      const containers = [document.documentElement, document.body];
      const sensor = new Sensor(containers);

      expect(sensor.containers).toStrictEqual(containers);

      sensor.removeContainer(...containers);

      expect(sensor.containers).toStrictEqual([]);
    });
  });

  describe('#trigger', () => {
    it('should dispatch event on element', () => {
      const sensor = new Sensor();
      const element = document.createElement('div');

      let eventDispatched;

      element.addEventListener(
        'drag:start',
        (event) => {
          eventDispatched = event;
        },
        true,
      );

      const expectedEvent = new DragStartSensorEvent({
        clientX: 0,
        clientY: 0,
        target: element,
        container: document.body,
        originalSource: element,
        originalEvent: eventDispatched,
      });

      const returnValue = sensor.trigger(element, expectedEvent);

      expect(eventDispatched!.detail).toBe(expectedEvent);
      expect(eventDispatched!.type).toBe('drag:start');
      expect(eventDispatched!.target).toBe(element);
      expect(returnValue).toBe(expectedEvent);
      expect(sensor.lastEvent).toBe(expectedEvent);
    });
  });
});