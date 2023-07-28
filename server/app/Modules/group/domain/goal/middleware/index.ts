import { Recurrence } from '@core/domain/enums/Recurrence';
import { addDays, addWeeks, addMonths } from 'date-fns';

export function calculateEndDate(startDate: Date, frequency: number, recurrence: Recurrence): Date {
  let endDate: Date;

  switch (recurrence) {
    case Recurrence.DAILY:
      endDate = addDays(startDate, frequency);
      break;
    case Recurrence.WEEKLY:
      endDate = addWeeks(startDate, frequency);
      break;
    case Recurrence.MONTHLY:
      endDate = addMonths(startDate, frequency);
      break;
    default:
      throw new Error('Recurrence not supported');
  }

  return endDate;
}
