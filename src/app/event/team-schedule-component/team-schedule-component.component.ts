import { Component, Input } from '@angular/core';
import { TBAMatch } from '@frc930/frc-data-lib';

@Component({
  selector: 'app-team-schedule-component',
  templateUrl: './team-schedule-component.component.html',
  styleUrls: ['./team-schedule-component.component.css'],
})
export class TeamScheduleComponentComponent {
  @Input() matches: TBAMatch[] = [];
  @Input() teamKey: string = '';

  matchNumber(match: TBAMatch): string {
    if (match.comp_level === 'sf') return `SF${match.set_number}`;
    return `${match.comp_level}${match.match_number}`.toUpperCase();
  }

  allianceString(teamKeys: string[]): string {
    return teamKeys.map((k) => k.replace('frc', '')).join(' ');
  }

  matchScoreBackground(match: TBAMatch): string {
    if (!match.actual_time && match.alliances.blue.score === -1)
      return 'p-3 text-center text-2xl text-black';
    if (match.winning_alliance === '')
      return 'bg-stone-400 p-3 text-center text-xl text-black';
    if (
      (match.alliances.blue.team_keys.includes(this.teamKey) &&
        match.winning_alliance === 'blue') ||
      (match.alliances.red.team_keys.includes(this.teamKey) &&
        match.winning_alliance === 'red')
    )
      return 'bg-green-500 p-3 text-center text-xl';
    return 'bg-red-500 p-3 text-center text-xl';
  }

  rowBackground(match: TBAMatch): string {
    if (!match.actual_time && match.alliances.blue.score === -1) {
      if (match.alliances.blue.team_keys.includes(this.teamKey)) {
        return 'bg-blue-200 border border-blue-200';
      }
      return 'bg-red-200 border border-red-200';
    }

    return 'even:bg-gray-900/50 border border-gray-700';
  }
}
