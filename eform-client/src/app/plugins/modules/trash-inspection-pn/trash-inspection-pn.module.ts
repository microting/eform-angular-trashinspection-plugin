import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  TrashInspectionPnFractionsService,
  TrashInspectionPnInstallationsService,
  TrashInspectionPnProducersService,
  TrashInspectionPnSegmentsService,
  TrashInspectionPnSettingsService,
  TrashInspectionPnTransporterService,
  TrashInspectionPnTrashInspectionsService,
} from './services';
import { TrashInspectionPnLayoutComponent } from './layouts';
import { TrashInspectionPnRouting } from './trash-inspection-pn.routing.module';
import { SharedPnModule } from '../shared/shared-pn.module';
import { EformSharedModule } from 'src/app/common/modules/eform-shared/eform-shared.module';
import {
  FractionCreateComponent,
  FractionDeleteComponent,
  FractionEditComponent,
  FractionsPageComponent,
  FractionsPnImportComponent,
  FractionsReportPreviewTableComponent,
  InstallationCreateComponent,
  InstallationDeleteComponent,
  InstallationEditComponent,
  InstallationsPageComponent,
  ProducerCreateComponent,
  ProducerDeleteComponent,
  ProducerEditComponent,
  ProducerImportComponent,
  ProducerPageComponent,
  ProducersReportPreviewTableComponent,
  ReportGraphViewComponent,
  ReportPreviewTableContainerComponent,
  SegmentCreateComponent,
  SegmentDeleteComponent,
  SegmentEditComponent,
  SegmentsPageComponent,
  TransporterCreateComponent,
  TransporterDeleteComponent,
  TransporterEditComponent,
  TransporterImportComponent,
  TransporterPageComponent,
  TransportersReportPreviewTableComponent,
  TrashInspectionCreateComponent,
  TrashInspectionDeleteComponent,
  TrashInspectionEditComponent,
  TrashInspectionSettingsComponent,
  TrashInspectionsPageComponent,
  TrashInspectionVersionViewComponent,
} from './components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { trashInspectionStoreProviders } from './store-providers.config';
import { TrashInspectionsStateService } from './components/trash-inspections/store';
import { InstallationsStateService } from './components/installations/store';

@NgModule({
  imports: [
    CommonModule,
    SharedPnModule,
    MDBBootstrapModule,
    TrashInspectionPnRouting,
    TranslateModule,
    FormsModule,
    NgSelectModule,
    EformSharedModule,
    FontAwesomeModule,
    NgxChartsModule,
  ],
  declarations: [
    InstallationsPageComponent,
    InstallationDeleteComponent,
    InstallationCreateComponent,
    InstallationEditComponent,
    TrashInspectionsPageComponent,
    TrashInspectionCreateComponent,
    TrashInspectionEditComponent,
    TrashInspectionDeleteComponent,
    TrashInspectionPnLayoutComponent,
    TrashInspectionSettingsComponent,
    TrashInspectionVersionViewComponent,
    FractionCreateComponent,
    FractionDeleteComponent,
    FractionEditComponent,
    FractionsPnImportComponent,
    FractionsPageComponent,
    SegmentCreateComponent,
    SegmentDeleteComponent,
    SegmentEditComponent,
    SegmentsPageComponent,
    ProducerPageComponent,
    ProducerCreateComponent,
    ProducerDeleteComponent,
    ProducerEditComponent,
    ProducerImportComponent,
    TransporterPageComponent,
    TransporterCreateComponent,
    TransporterDeleteComponent,
    TransporterEditComponent,
    TransporterImportComponent,
    ReportPreviewTableContainerComponent,
    ReportGraphViewComponent,
    TransportersReportPreviewTableComponent,
    FractionsReportPreviewTableComponent,
    ProducersReportPreviewTableComponent,
  ],
  providers: [
    TrashInspectionPnFractionsService,
    TrashInspectionPnInstallationsService,
    TrashInspectionPnTrashInspectionsService,
    TrashInspectionPnSegmentsService,
    TrashInspectionPnSettingsService,
    TrashInspectionPnTransporterService,
    TrashInspectionPnProducersService,
    TrashInspectionsStateService,
    InstallationsStateService,
    ...trashInspectionStoreProviders,
  ],
})
export class TrashInspectionPnModule {}
