import { ValueObject } from 'src/shared/domain/value-objects/value-object';

interface BenefitsProps {
  value: string[];
}

export class Benefits extends ValueObject<BenefitsProps> {
  get value(): string[] {
    return this.props.value;
  }

  private constructor(props: BenefitsProps) {
    super(props);
  }

  static create(value: string[]): Benefits {
    return new Benefits({ value });
  }
}
