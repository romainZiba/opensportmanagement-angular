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
  @Input()
  isAdmin = false;

  @Output('participation')
  participationEmitter = new EventEmitter<boolean>();
  @Output('messages')
  messagesEmitter = new EventEmitter();
  @Output('settings')
  settingsEmitter = new EventEmitter();
  @Output('cancel')
  cancelEmitter = new EventEmitter();
  @Output('remind')
  reminderEmitter = new EventEmitter();
  @Output('open')
  openEmitter = new EventEmitter();

  currentUsername = localStorage.getItem(AppSettings.currentUsernameKey);

  isUserPresent(event: Event) {
    return event.presentMembers.map(member => member.username).indexOf(this.currentUsername) > -1;
  }

  isUserAbsent(event: Event) {
    return event.absentMembers.map(member => member.username).indexOf(this.currentUsername) > -1;
  }

  isPresentDisplayed() {
    return this.event.openForRegistration && !this.event.cancelled && !this.isUserPresent(this.event);
  }

  isAbsentDisplayed() {
    return this.event.openForRegistration && !this.event.cancelled && !this.isUserAbsent(this.event);
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

  onCancel() {
    this.cancelEmitter.emit();
  }

  onRemind() {
    this.reminderEmitter.emit();
  }

  onOpenRegistration() {
    this.openEmitter.emit();
  }
}
