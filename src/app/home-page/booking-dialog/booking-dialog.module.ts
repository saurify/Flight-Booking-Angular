import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCommonModule} from '@angular/material/core'
import { BookingDialogComponent} from './booking-dialog.component';

@NgModule({
    declarations: [ BookingDialogComponent],
    entryComponents: [BookingDialogComponent],
    imports:[
        FormsModule,
        MatButtonModule,
        MatCommonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
    ],
})
export class BookingDialogModule {}