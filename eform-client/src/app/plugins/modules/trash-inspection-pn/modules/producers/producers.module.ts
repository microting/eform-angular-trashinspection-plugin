import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TranslateModule} from '@ngx-translate/core';
import {EformSharedModule} from 'src/app/common/modules/eform-shared/eform-shared.module';
import {ProducersRouting} from './producers.routing';
import {
  ProducerPageComponent,
  ProducerImportComponent,
  ProducerCreateComponent,
  ProducerDeleteComponent,
  ProducerEditComponent,
} from './components';
import {SharedPnModule} from 'src/app/plugins/modules/shared/shared-pn.module';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {producersPersistProvider} from './components/store';

@NgModule({
  imports: [
    CommonModule,
    SharedPnModule,
    MDBBootstrapModule,
    ProducersRouting,
    TranslateModule,
    FormsModule,
    NgSelectModule,
    EformSharedModule,
    FontAwesomeModule,
    NgxChartsModule,
  ],
  declarations: [
    ProducerPageComponent,
    ProducerImportComponent,
    ProducerCreateComponent,
    ProducerDeleteComponent,
    ProducerEditComponent,
  ],
  providers: [
    producersPersistProvider,
  ],
})
export class ProducersModule {
}