import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  TBAMatch,
  TBAProvider,
  TBARanking,
  TBAEvent,
} from '@frc930/frc-data-lib';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  private tbaApi: TBAProvider;
  private eventKey = '2023ilch';

  public teamKey = 'frc930';
  public noTwitch = false;
  public brianMode = false;
  public ranking: TBARanking | null = null;
  public matches: TBAMatch[] = [];
  public upcomingMatches: TBAMatch[] = [];
  public event: TBAEvent | null = null;
  public lastMatches: TBAMatch[] = [];

  constructor(private activatedRoute: ActivatedRoute) {
    this.noTwitch = activatedRoute.snapshot.queryParamMap.has('noTwitch');
    this.brianMode = activatedRoute.snapshot.queryParamMap.has('brianMode');
    this.teamKey =
      activatedRoute.snapshot.queryParamMap.get('teamKey') || 'frc930';
    this.eventKey =
      activatedRoute.snapshot.queryParamMap.get('eventKey') || '2023ilch';

    this.tbaApi = new TBAProvider(
      'KRaTWas7TsHN2XyTQunY8XNciudd8uw4FTkFUAp6n2RLmUieqtQcyUzEukXtfADa'
    );
  }

  async ngOnInit() {
    await this.refreshData();
    const options = {
      width: '100%',
      height: '100%',
      channel: this.webcastUrl(),
      parent: ['main.d38ay2go4wu5n8.amplifyapp.com'],
    };
    if (!this.noTwitch) {
      const player = new (window as any).Twitch.Player(
        'twitch-container',
        options
      );
      player.volume = 0;
      player.pause();
    }
    setInterval(this.refreshData.bind(this), 60000);
  }

  async refreshData() {
    const sliceIndex = this.noTwitch ? -3 : -1;
    const matches = await this.tbaApi.matchesForEvent(this.eventKey);
    this.upcomingMatches = matches
      .filter((m) => !m.actual_time && m.alliances.blue.score === -1)
      .sort(this.sortMatches);

    this.lastMatches = matches
      .filter((m) => m.actual_time || m.alliances.blue.score >= 0)
      .sort(this.sortMatches)
      .slice(sliceIndex);

    if (!this.noTwitch) this.upcomingMatches = this.upcomingMatches.slice(0, 5);

    this.ranking = await this.tbaApi.rankingForTeamAtEvent(
      this.teamKey,
      this.eventKey
    );
    this.matches = (
      await this.tbaApi.matchesForTeamAtEvent(this.teamKey, this.eventKey)
    ).sort(this.sortMatches);
    this.event = await this.tbaApi.getEvent(this.eventKey);
  }

  private sortMatches(a: TBAMatch, b: TBAMatch): number {
    if (a.comp_level === 'sf' && b.comp_level === 'f') return -1;
    if (b.comp_level === 'sf' && a.comp_level === 'f') return 1;
    if (a.comp_level === 'sf' && b.comp_level === 'sf')
      return a.set_number - b.set_number;
    if (a.comp_level === b.comp_level) return a.match_number - b.match_number;
    if (a.comp_level === 'qm' && b.comp_level !== 'qm') return -1;
    return 0;
  }

  public webcastUrl(): string {
    if (this.event && this.event.webcasts.length > 0) {
      const webcasts = this.event.webcasts.filter((w) => w.type === 'twitch');
      const webcast = webcasts[webcasts.length - 1];
      return webcast.channel;
    }
    return 'firstinspires';
  }
}
