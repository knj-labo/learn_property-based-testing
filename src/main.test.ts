import { Greeter } from './main';

test('test', () => {
    expect(new Greeter('Taro').getMessage()).toBe('Hello Taro');
});