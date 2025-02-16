import { ValueObject } from 'src/shared/domain/value-objects/value-object';

interface LocationProps {
  latitude: number;
  longitude: number;
}

export class Location extends ValueObject<LocationProps> {
  get latitude(): number {
    return this.props.latitude;
  }

  get longitude(): number {
    return this.props.longitude;
  }

  private constructor(props: LocationProps) {
    super(props);
  }

  static create(latitude: number, longitude: number): Location {
    return new Location({ latitude, longitude });
  }
}
