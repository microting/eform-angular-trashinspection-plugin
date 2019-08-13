export class ProducerYearPnModel {
  total: number;
  statsByYearList: Array<ProducerYearModel> = [];
}

export class ProducerYearModel {
  name: string;
  weighings: number;
  amountOfWeighingsControlled: number;
  approvedPercentage: number;
  conditionalApprovedPercentage: number;
  notApprovedPercentage: number;
  controlPercentage: number;
}
