import { Component, Input } from '@angular/core';
import { TBARanking } from '@frc930/frc-data-lib';

@Component({
  selector: 'app-rank-component',
  templateUrl: './rank-component.component.html',
  styleUrls: ['./rank-component.component.css'],
})
export class RankComponentComponent {
  @Input() brianMode: boolean = false;
  @Input() ranking: TBARanking | null = null;

  rank(): string {
    if (this.brianMode) return 'LAST PLACE';
    return `Rank ${this.ranking?.qual?.ranking?.rank ?? '0'}`;
  }

  rankScore(): number {
    if (!this.ranking || !this.ranking.qual || !this.ranking.qual.ranking) {
      return 0;
    }

    return this.ranking.qual.ranking.sort_orders[0];
  }

  matchScore(): number {
    if (!this.ranking || !this.ranking.qual || !this.ranking.qual.ranking) {
      return 0;
    }

    return this.ranking.qual.ranking.sort_orders[1];
  }

  chargeStation(): number {
    if (!this.ranking || !this.ranking.qual || !this.ranking.qual.ranking) {
      return 0;
    }

    return this.ranking.qual.ranking.sort_orders[2];
  }

  auto(): number {
    if (!this.ranking || !this.ranking.qual || !this.ranking.qual.ranking) {
      return 0;
    }

    return this.ranking.qual.ranking.sort_orders[3];
  }

  rankpoints(): string {
    if (!this.ranking || !this.ranking.qual || !this.ranking.qual.ranking) {
      return '';
    }

    return (
      this.ranking.qual.ranking.sort_orders[0] *
      this.ranking.qual.ranking.matches_played
    ).toFixed(0);
  }

  record(): string {
    if (!this.ranking || !this.ranking.qual || !this.ranking.qual.ranking) {
      return '';
    }
    const record = this.ranking.qual.ranking.record;
    let recordString = `${record.wins}W-${record.losses}L`;
    if (record.ties > 0) recordString += `-${record.ties}T`;

    return recordString;
  }
}
