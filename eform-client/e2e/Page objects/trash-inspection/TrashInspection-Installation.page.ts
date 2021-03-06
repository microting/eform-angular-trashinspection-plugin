import Page from '../Page';
import loginPage from '../../Page objects/Login.page';

export class TrashInspectionInstallationPage extends Page {
  constructor() {
    super();
  }
  public get rowNum(): number {
    browser.pause(500);
    return $$('#tableBody > tr').length;
  }
  // public get paginationElement() {
  //   return $(`//*[contains`)
  // }
  public trashInspectionDropDown() {
    const ele = $(`//*[contains(@class, 'dropdown')]//*[contains(text(), 'Affaldsinspektion')]`);
    ele.waitForDisplayed({timeout: 20000});
    ele.waitForClickable({timeout: 20000});
    ele.click();
  }
  public get installationBtn() {
    $('#trash-inspection-pn-installations').waitForDisplayed({timeout: 20000});
    $('#trash-inspection-pn-installations').waitForClickable({timeout: 20000});
    return $('#trash-inspection-pn-installations');
  }
  public get installationCreateBtn() {
    $('#createInstallationBtn').waitForDisplayed({timeout: 20000});
    $('#createInstallationBtn').waitForClickable({timeout: 20000});
    return $('#createInstallationBtn');
  }
  public get installationEditBtn() {
    $('#updateInstallationBtn').waitForDisplayed({timeout: 20000});
    $('#updateInstallationBtn').waitForClickable({timeout: 20000});
    return $('#updateInstallationBtn');
  }
  public get installationDeleteBtn() {
    console.log('waiting for deleteInstallationBtn to be visible');
    $('#deleteInstallationBtn').waitForDisplayed({timeout: 20000});
    console.log('waiting for deleteInstallationBtn to be clickable');
    $('#deleteInstallationBtn').waitForClickable({timeout: 20000});
    console.log('returning the element deleteInstallationBtn');
    return $('#deleteInstallationBtn');
  }
  public get installationCreateNameBox() {
    $('#createInstallationName').waitForDisplayed({timeout: 20000});
    $('#createInstallationName').waitForClickable({timeout: 20000});
    return $('#createInstallationName');
  }
  public get installationCreateSiteCheckbox() {
    $('#checkbox').waitForDisplayed({timeout: 20000});
    $('#checkbox').waitForClickable({timeout: 20000});
    return $('#checkbox');
  }
  public get installationCreateSaveBtn() {
    $('#installationCreateSaveBtn').waitForDisplayed({timeout: 20000});
    $('#installationCreateSaveBtn').waitForClickable({timeout: 20000});
    return $('#installationCreateSaveBtn');
  }
  public get installationCreateCancelBtn() {
    $('#installationCreateCancelBtn').waitForDisplayed({timeout: 20000});
    $('#installationCreateCancelBtn').waitForClickable({timeout: 20000});
    return $('#installationCreateCancelBtn');
  }
  public get installationUpdateNameBox() {
    $('#updateInstallationName').waitForDisplayed({timeout: 20000});
    $('#updateInstallationName').waitForClickable({timeout: 20000});
    return $('#updateInstallationName');
  }
  public get installationUpdateSiteCheckbox() {
    $('#checkbox').waitForDisplayed({timeout: 20000});
    $('#checkbox').waitForClickable({timeout: 20000});
    return $('#checkbox');
  }
  public get installationUpdateSaveBtn() {
    $('#installationUpdateSaveBtn').waitForDisplayed({timeout: 20000});
    $('#installationUpdateSaveBtn').waitForClickable({timeout: 20000});
    return $('#installationUpdateSaveBtn');
  }
  public get installationUpdateCancelBtn() {
    $('#installationUpdateCancelBtn').waitForDisplayed({timeout: 20000});
    $('#installationUpdateCancelBtn').waitForClickable({timeout: 20000});
    return $('#installationUpdateCancelBtn');
  }
  public get installationDeleteId() {
    $('#selectedInstallationId').waitForDisplayed({timeout: 20000});
    $('#selectedInstallationId').waitForClickable({timeout: 20000});
    return $('#selectedInstallationId');
  }
  public get installationDeleteName() {
    $('#selectedInstallationName').waitForDisplayed({timeout: 20000});
    $('#selectedInstallationName').waitForClickable({timeout: 20000});
    return $('#selectedInstallationName');
  }
  public get installationDeleteDeleteBtn() {
    $('#installationDeleteDeleteBtn').waitForDisplayed({timeout: 20000});
    $('#installationDeleteDeleteBtn').waitForClickable({timeout: 20000});
    return $('#installationDeleteDeleteBtn');
  }
  public get installationDeleteCancelBtn() {
    $('#installationDeleteCancelBtn').waitForDisplayed({timeout: 20000});
    $('#installationDeleteCancelBtn').waitForClickable({timeout: 20000});
    return $('#installationDeleteCancelBtn');
  }
  public get page2Object() {
    const ele = $(`//*[div]//*[contains(@class, 'd-flex justify-content-center')]//*[ul]//*[contains(@class, 'page-item')]//*[contains(text(), '2')]`);
    //ele.waitForDisplayed({timeout: 20000});
    //ele.waitForClickable({timeout: 20000});
    return ele;
  }
  goToInstallationsPage() {
    this.trashInspectionDropDown();
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
    this.installationBtn.click();
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
  }
  createInstallation_AddSite(name: string) {
    this.installationCreateBtn.click();
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
    this.installationCreateNameBox.addValue(name);
    this.installationCreateSiteCheckbox.click();
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
    this.installationCreateSaveBtn.click();
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
  }
  createInstallation_DoesntAddSite(name: string) {
    this.installationCreateBtn.click();
    // $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
    $('#createInstallationName').waitForDisplayed({timeout: 10000});
    this.installationCreateNameBox.addValue(name);
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
    this.installationCreateSaveBtn.click();
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
    $('#createInstallationBtn').waitForDisplayed({timeout: 10000});
  }
  createInstallation_AddSite_Cancels(name: string) {
    this.installationCreateBtn.click();
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
    this.installationCreateNameBox.addValue(name);
    this.installationCreateSiteCheckbox.click();
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
    this.installationCreateCancelBtn.click();
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
  }
  createInstallation_DoesntAddSite_Cancels(name: string) {
    this.installationCreateBtn.click();
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
    this.installationCreateNameBox.addValue(name);
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
    this.installationCreateCancelBtn.click();
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
  }
  createInstallation_cancels() {
    this.installationCreateBtn.click();
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
    this.installationCreateNameBox.addValue(name);
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
    this.installationCreateCancelBtn.click();
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
  }

  editInstallation_AddSite(name: string) {
    this.installationEditBtn.click();
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
    this.installationUpdateNameBox.addValue(name);
    this.installationUpdateSiteCheckbox.click();
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
    this.installationUpdateSaveBtn.click();
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
  }
  editInstallation_RemovesSite(name: string) {
    this.installationEditBtn.click();
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
    this.installationUpdateNameBox.addValue(name);
    this.installationUpdateSiteCheckbox.click();
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
    this.installationUpdateSaveBtn.click();
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
  }
  editInstallation_OnlyEditsName(name: string) {
    this.installationEditBtn.click();
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
    // $('#updateInstallationName').waitForDisplayed({timeout: 10000});
    this.installationUpdateNameBox.clearValue();
    this.installationUpdateNameBox.addValue(name);
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
    this.installationUpdateSaveBtn.click();
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
    $('#createInstallationBtn').waitForDisplayed({timeout: 10000});
  }
  editInstallation_OnlyEditsName_Cancels(name: string) {
    this.installationEditBtn.click();
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
    // $('#updateInstallationName').waitForDisplayed({timeout: 10000});
    this.installationUpdateNameBox.clearValue();
    this.installationUpdateNameBox.addValue(name);
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
    this.installationUpdateCancelBtn.click();
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
    $('#createInstallationBtn').waitForDisplayed({timeout: 10000});
  }
  editInstallation_AddSite_Cancels(name: string) {
    this.installationEditBtn.click();
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
    this.installationUpdateNameBox.addValue(name);
    this.installationUpdateSiteCheckbox.click();
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
    this.installationUpdateCancelBtn.click();
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
  }
  editInstallation_RemovesSite_Cancels(name: string) {
    this.installationEditBtn.click();
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
    this.installationUpdateNameBox.addValue(name);
    this.installationUpdateSiteCheckbox.click();
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
    this.installationUpdateCancelBtn.click();
    $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
  }

  deleteInstallation_Deletes() {
    console.log('in here');
    this.installationDeleteBtn.click();
    // $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
    $('#installationDeleteDeleteBtn').waitForDisplayed({timeout: 10000});
    this.installationDeleteDeleteBtn.click();
  }
  deleteInstallation_Cancels() {
    this.installationDeleteBtn.click();
    // $('#spinner-animation').waitForDisplayed({timeout: 20000, reverse: true});
    $('#installationDeleteDeleteBtn').waitForDisplayed({timeout: 10000});
    this.installationDeleteCancelBtn.click();
  }
  getFirstRowObject(): InstallationPageRowObject {
    browser.pause(500);
    return new InstallationPageRowObject(1);
  }
  getInstallation(num): InstallationPageRowObject {
    return new InstallationPageRowObject(num);
  }
}

const installationPage = new TrashInspectionInstallationPage();
export default installationPage;

export class InstallationPageRowObject {
  constructor(rowNum) {
    if ($$('#installationId')[rowNum - 1]) {
      this.id = $$('#installationId')[rowNum - 1];
      try {
        this.name = $$('#installationName')[rowNum - 1].getText();
      } catch (e) {}
      this.editBtn = $$('#updateInstallationBtn')[rowNum - 1];
      this.deleteBtn = $$('#deleteInstallationBtn')[rowNum - 1];
    }
  }

  id;
  name;
  editBtn;
  deleteBtn;
}
