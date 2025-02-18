import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from '../../../src/events/application/events.service';
import { EVENTS_PROVIDER } from '../../../src/events/events.provider';
import {
  EventStatus,
  EventStatusValues,
} from '../../../src/events/domain/value-objects/event-status.value-object';
import {
  TicketType,
  TicketTypesValues,
} from '../../../src/events/domain/value-objects/ticket-types.value-object';
import { EventAggregate } from '../../../src/events/domain/entities/event-aggregate.entity';
import { Title } from '../../../src/events/domain/value-objects/title.value-object';
import { DateValue } from '../../../src/shared/domain/value-objects/date-value.value-object';
import { Location } from '../../../src/events/domain/value-objects/location.value-object';
import { Number } from '../../../src/shared/domain/value-objects/number.value-object';
import { Benefits } from '../../../src/events/domain/value-objects/benefits.value-object';
import { EventTicket } from '../../../src/events/domain/entities/event-ticket.entity';
import { Description } from '../../../src/events/domain/value-objects/description.value-object';

describe('EventsService', () => {
  let service: EventsService;
  const findOneMock = jest.fn();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: EVENTS_PROVIDER.EventRepository,
          useValue: {
            findOne: findOneMock,
          },
        },
      ],
    }).compile();

    service = moduleFixture.get<EventsService>(EventsService);
  });
  describe('findOne', () => {
    const eventAggregate: EventAggregate = EventAggregate.create({
      userId: 'userId',
      title: Title.create('title'),
      description: Description.create('description'),
      status: EventStatus.create(EventStatusValues[0]),
      startDate: DateValue.createFromJSDate(new Date()),
      endDate: DateValue.createFromJSDate(new Date()),
      location: Location.create(0, 0),
      tickets: [
        EventTicket.create({
          type: TicketType.create(TicketTypesValues[0]),
          price: Number.create(10),
          available: Number.create(100),
          purchaseLimit: Number.create(10),
          benefits: Benefits.create(['benefit']),
        }),
      ],
    });
    it('should call findOne method from repository', async () => {
      findOneMock.mockResolvedValue(eventAggregate);
      const eventDto = await service.findOne(
        eventAggregate.id,
        eventAggregate.userId,
      );
      expect(findOneMock).toHaveBeenCalledTimes(1);
      expect(eventDto).toMatchSnapshot({
        id: expect.any(String),
        tickets: [{ id: expect.any(String) }],
      });
    });

    it('should throw ForbiddenException when user is not the owner', async () => {
      findOneMock.mockResolvedValue(eventAggregate);
      await expect(
        service.findOne(eventAggregate.id, 'otherUserId'),
      ).rejects.toThrow('You are not allowed to see this event');
    });
  });
});
