import { Component, Input } from '@angular/core';
import { TBAMatch } from '@frc930/frc-data-lib';

import formatDistance from 'date-fns/formatDistance';

@Component({
  selector: 'app-event-schedule-component',
  templateUrl: './event-schedule-component.component.html',
  styleUrls: ['./event-schedule-component.component.css'],
})
export class EventScheduleComponentComponent {
  @Input() matches: TBAMatch[] = [];

  matchNumber(match: TBAMatch): string {
    if (match.comp_level === 'sf') return `SF${match.set_number}`;
    return `${match.comp_level}${match.match_number}`.toUpperCase();
  }

  allianceString(teamKeys: string[]): string {
    return teamKeys.map((k) => k.replace('frc', '')).join(' ');
  }

  timeToMatch(match: TBAMatch): string {
    if (match.predicted_time)
      return formatDistance(new Date(match.predicted_time * 1000), new Date(), {
        addSuffix: true,
      });
    return '';
  }
}
