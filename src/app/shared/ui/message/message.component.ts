import { Component, input } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { MessageType } from '../../data/message-type.enum';

@Component({
    selector: 'app-message',
    imports: [MessageModule],
    templateUrl: './message.component.html',
    styleUrl: './message.component.css',
})
export class MessageComponent {
    type = input.required<MessageType>();
    message = input.required<string>();
}
