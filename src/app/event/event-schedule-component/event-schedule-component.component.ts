import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TBAMatch } from '@frc930/frc-data-lib';

import formatDistance from 'date-fns/formatDistance';
import differenceInMinutes from 'date-fns/differenceInMinutes';

@Component({
  selector: 'app-event-schedule-component',
  templateUrl: './event-schedule-component.component.html',
  styleUrls: ['./event-schedule-component.component.css'],
})
export class EventScheduleComponentComponent implements OnChanges {
  @Input() lastMatches: TBAMatch[] = [];
  @Input() matches: TBAMatch[] = [];
  @Input() matchDelay: number = 0;
  private delay = 0;

  ngOnChanges() {
    if (this.matches.length > 0) {
      const nextMatch = this.matches[0];
      if (nextMatch.predicted_time) {
        const difference = differenceInMinutes(
          new Date(nextMatch.predicted_time * 1000),
          new Date(),
          { roundingMethod: 'floor' }
        );
        this.delay = Math.abs(Math.min(0, difference));
      }
    }
  }

  matchNumber(match: TBAMatch): string {
    if (match.comp_level === 'sf') return `SF${match.set_number}`;
    return `${match.comp_level}${match.match_number}`.toUpperCase();
  }

  allianceString(teamKeys: string[]): string {
    return teamKeys.map((k) => k.replace('frc', '')).join(' ');
  }

  timeToMatch(match: TBAMatch): string {
    if (match.predicted_time) {
      return formatDistance(
        new Date((match.predicted_time + this.delay * 60) * 1000),
        new Date(),
        {
          addSuffix: true,
        }
      );
    }
    return '';
  }
}
