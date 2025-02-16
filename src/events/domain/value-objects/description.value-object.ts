import { ValueObject } from 'src/shared/domain/value-objects/value-object';

interface DescriptionProps {
  value: string;
}

export class Description extends ValueObject<DescriptionProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: DescriptionProps) {
    super(props);
  }

  static create(value: string): Description {
    return new Description({ value });
  }
}
