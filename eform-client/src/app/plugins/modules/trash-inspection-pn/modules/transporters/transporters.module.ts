import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TranslateModule} from '@ngx-translate/core';
import {EformSharedModule} from 'src/app/common/modules/eform-shared/eform-shared.module';
import {TransportersRouting} from './transporters.routing';
import {
  TransporterImportComponent,
  TransporterPageComponent,
  TransporterCreateComponent,
  TransporterDeleteComponent,
  TransporterEditComponent,
} from './components';
import {SharedPnModule} from 'src/app/plugins/modules/shared/shared-pn.module';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {transportersPersistProvider} from './components/store';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MtxGridModule} from '@ng-matero/extensions/grid';

@NgModule({
  imports: [
    CommonModule,
    SharedPnModule,
    MDBBootstrapModule,
    TransportersRouting,
    TranslateModule,
    FormsModule,
    NgSelectModule,
    EformSharedModule,
    FontAwesomeModule,
    NgxChartsModule,
    MatButtonModule,
    MatTooltipModule,
    MtxGridModule,
  ],
  declarations: [
    TransporterImportComponent,
    TransporterPageComponent,
    TransporterCreateComponent,
    TransporterDeleteComponent,
    TransporterEditComponent,
  ],
  providers: [
    transportersPersistProvider,
  ],
})
export class TransportersModule {
}