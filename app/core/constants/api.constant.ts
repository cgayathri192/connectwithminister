export const API_CONST: { [index: string]: string } = {
  /**
   * Add api urls here
   * example "MINES_FORM": "submitForm" -> api sub-resource url
   */
  MINES: 'mines',
  CONSTITUENCY: 'constituency',
  EXCISE: 'excise',
  MEETING: 'meeting',
  DASBOARD_LIST: 'dasboardList',
  MINES_BY_ID: 'getMinesAndGeologyData',
  EXCISE_BY_ID: 'getExciseData',
  CONST_BY_ID: 'getConstituencyData',
  MEETING_BY_ID: 'getMeetingScheduleData',
  FORM_SUBMIT: 'addData',
  UPDATE_STATUS: 'update/updateStatus',
};
