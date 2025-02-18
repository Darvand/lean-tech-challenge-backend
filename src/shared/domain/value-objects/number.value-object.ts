import { ValueObject } from './value-object';

interface NumberProps {
  value: number;
}

export class Number extends ValueObject<NumberProps> {
  get value(): number {
    return this.props.value;
  }

  private constructor(props: NumberProps) {
    super(props);
  }

  static create(value: number): Number {
    if (value < 0) {
      throw new Error(`Invalid number: ${value}`);
    }
    return new Number({ value });
  }
}
