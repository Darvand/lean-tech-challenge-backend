import { UnprocessableEntityException } from '@nestjs/common';
import { DateTime } from 'luxon';
import { ValueObject } from 'src/shared/domain/value-objects/value-object';

interface DateValueProps {
  value: DateTime;
}

export class DateValue extends ValueObject<DateValueProps> {
  get value(): DateTime {
    return this.props.value;
  }

  get date(): Date {
    return this.props.value.toJSDate();
  }

  get ISO8601(): string {
    return this.props.value.toISO();
  }

  get formatedDate(): string {
    return this.props.value.toFormat('LLL dd');
  }

  private constructor(props: DateValueProps) {
    super(props);
  }

  static createFromString(value: string): DateValue {
    if (!value) {
      throw new UnprocessableEntityException(
        'Date with format  "yyyy-MM-dd" is required',
      );
    }
    const date = DateTime.fromFormat(value, 'yyyy-MM-dd');

    if (!date.isValid) {
      throw new UnprocessableEntityException(
        `Invalid date. Format should be "yyyy-MM-dd": ${value}`,
      );
    }
    return new DateValue({ value: date });
  }

  static createFromJSDate(value: Date): DateValue {
    const date = DateTime.fromJSDate(value);

    if (!date.isValid) {
      throw new UnprocessableEntityException(`Invalid date: ${value}`);
    }
    return new DateValue({ value: date });
  }

  static createFromDateTime(value: DateTime): DateValue {
    return new DateValue({ value });
  }

  isAfter(date: DateValue): boolean {
    return this.props.value > date.value;
  }
}
