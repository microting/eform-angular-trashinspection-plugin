import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ProducerPnModel} from '../../../models/producer';
import {TransporterPnModel} from '../../../models/transporter';
import {TrashInspectionPnTransporterService} from '../../../services';

@Component({
  selector: '<app-trash-inspection-pn-transporter-edit',
  templateUrl: './transporter-edit.component.html',
  styleUrls: ['./transporter-edit.component.scss']
})
export class TransporterEditComponent implements OnInit {
  @ViewChild('frame') frame;
  @Output() onProducerUpdated: EventEmitter<void> = new EventEmitter<void>();
  spinnerStatus = false;
  selectedTransporter: TransporterPnModel = new TransporterPnModel();
  constructor(private trashInspectionPnTransporterService: TrashInspectionPnTransporterService) { }

  ngOnInit() {
  }
  show(transporterModel: TransporterPnModel) {
    this.getSelectedProducer(transporterModel.id);
    this.frame.show();
  }

  getSelectedProducer(id: number) {
    this.spinnerStatus = false;
    this.trashInspectionPnTransporterService.getSingleTransporter(id).subscribe((data) => {
      if (data && data.success) {
        this.selectedTransporter = data.model;
      } this.spinnerStatus = false;
    });
  }
  editTransporter() {
    this.spinnerStatus = true;
    this.trashInspectionPnTransporterService.updateTransporter(this.selectedTransporter).subscribe((data) => {
      if (data && data.success) {
        this.onProducerUpdated.emit();
        this.selectedTransporter = new ProducerPnModel();
        this.frame.hide();
      } this.spinnerStatus = false;
    });
  }
}
