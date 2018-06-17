import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Event} from '../../model/event';
import {AppSettings} from '../../app-settings';

@Component({
  selector: 'event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {

  @Input()
  event: Event;

  @Output('participation')
  participationEmitter = new EventEmitter<boolean>();
  @Output('messages')
  messagesEmitter = new EventEmitter();
  @Output('settings')
  settingsEmitter = new EventEmitter();

  presence = Presence;

  isUserPresent(event: Event): Presence {
    const currentUsername = localStorage.getItem(AppSettings.currentUsernameKey);
    if (event.presentMembers.map(member => member.username).indexOf(currentUsername) > -1) {
      return Presence.Present;
    } else if (event.absentMembers.map(member => member.username).indexOf(currentUsername) > -1) {
      return Presence.Absent;
    }
    return Presence.Unknown;
  }

  onParticipate(isParticipating: boolean) {
    this.participationEmitter.emit(isParticipating);
  }

  onShowMessages() {
    this.messagesEmitter.emit();
  }

  onShowSettings() {
    this.settingsEmitter.emit();
  }
}

enum Presence {
  Present = 'Present',
  Absent = 'Absent',
  Unknown = 'Unknown'
}
