import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {EventService} from '../services/event.service';
import {AppMessage} from '../model/AppMessage';
import {UserService} from '../services/user.service';
import {Observable} from 'rxjs/Observable';
import {StompService} from '@stomp/ng2-stompjs';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy, AfterViewChecked {
  subscriptions = new Subscription();
  messages: AppMessage[];
  username$: Observable<string>;
  userMessage: string;
  eventId: string;
  @ViewChild('scrollme') messageContainer: ElementRef;

  constructor(private route: ActivatedRoute,
              private eventService: EventService,
              private userService: UserService,
              private stompService: StompService) { }

  ngOnInit() {
    this.subscriptions.add(
      this.route.paramMap.pipe(
        switchMap((params: ParamMap) => {
          this.eventId = params.get('id');
          return this.eventService.getMessages(params.get('id'));
        })
      ).subscribe(messages => this.messages = messages)
    );
    this.username$ = this.userService.username$;
    // TODO: refactor this, client should not be supposed to know the way conversation id is built
    const wsSubscription = this.stompService.subscribe(`/topic/conversation_${this.eventId}`)
      .map(message => message.body)
      .subscribe((msg_body: string) => {
        const msg = JSON.parse(msg_body) as AppMessage;
        this.messages.push(msg);
      });
    this.subscriptions.add(wsSubscription);
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  sendMessage() {
    this.eventService.postMessage(this.eventId, this.userMessage)
      .subscribe();
    this.userMessage = '';
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
