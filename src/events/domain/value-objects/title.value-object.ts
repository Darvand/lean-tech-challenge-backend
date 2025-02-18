import { ValueObject } from '../../../shared/domain/value-objects/value-object';

interface TitleProps {
  value: string;
}

export class Title extends ValueObject<TitleProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: TitleProps) {
    super(props);
  }

  static create(value: string): Title {
    return new Title({ value });
  }
}
