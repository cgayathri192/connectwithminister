export interface ConstituencyData {
  constituencyId: string;
  name: string;
  mobileNumber: string;
  constituency: string;
  mandal: string;
  village: string;
  gender: string;
  division: string;
  issue: string;
  status: string;
  aadharNumber: string;
  serialNo: number;
}

export interface ExciseData {
  exciseId: string;
  name: string;
  mobileNumber: string;
  address: string;
  status: string;
  serialNo: number;
  aadharNumber: string;
  breifOfRepresentation: string;
}

export interface MinesData {
  minesId: string;
  name: string;
  mobileNumber: string;
  address: string;
  status: string;
  serialNo: number;
  aadharNumber: string;
  breifOfRepresentation: string;
}

export interface MeetingData {
  meetingId: string;
  name: string;
  modeOfAppointment: string;
  mobileNumber: string;
  address: string;
  priorityOfMeeting: string;
  meetingStart: string;
  meetingEnd: string;
  meetingAgenda: string;
  serialNo: string;
  status: string;
}

export interface MINES_DATA_BY_ID {
  minesId: string;
  minesAndGeology: MinesAndGeology;
  documentDto: DocumentDto;
}

export interface MinesAndGeology {
  minesId: string;
  email: any;
  name: string;
  aadharNumber: string;
  mobileNumber: string;
  address: string;
  breifOfRepresentation: string;
}

export interface DocumentDto {
  contentType: string;
  imgBase64: string;
  documentId: number;
  documentName: string;
  documentColumnName: string;
  fileExtension: string;
  fileContentType: string;
}

export interface EXCISE_DATA_BY_ID {
  id: string;
  excise: Excise;
  documentDto: DocumentDto;
}

export interface Excise {
  exciseId: string;
  email: any;
  name: string;
  aadharNumber: string;
  mobileNumber: string;
  address: string;
  breifOfRepresentation: string;
}

export interface DocumentDto {
  contentType: string;
  imgBase64: string;
  documentId: number;
  documentName: string;
  documentColumnName: string;
  fileExtension: string;
  fileContentType: string;
}

export interface CONST_DATA_BY_ID {
  constituencyId: string;
  constituency: Constituency;
  documentDto: DocumentDto;
}

export interface Constituency {
  constituencyId: string;
  name: string;
  aadharNumber: string;
  mobileNumber: string;
  constituency: string;
  mandal: string;
  village: string;
  division: string;
  issue: string;
  gender: string;
  status: string;
  meetingAgenda: string;
}

export interface DocumentDto {
  response: any;
  contentType: string;
  imgBase64: string;
  documentId: number;
  documentName: string;
  documentColumnName: string;
  fileExtension: string;
  fileContentType: string;
}

export interface METING_DATA_BY_ID {
  meetingId: string;
  meetingSchedule: MeetingSchedule;
  documentDto: DocumentDto;
}

export interface MeetingSchedule {
  email: any;
  meetingid: string;
  name: string;
  modeOfCategory: string;
  modeOfAppointment: string;
  mobileNumber: string;
  address: string;
  priorityOfMeeting: string;
  meetingStart: string;
  meetingEnd: string;
  meetingAgenda: string;
}

export interface DocumentDto {
  response: any;
  contentType: string;
  imgBase64: string;
  documentId: number;
  documentName: string;
  documentColumnName: string;
  fileExtension: string;
  fileContentType: string;
}

export interface ApprovaIntf {
  category: string;
  status: string;
  id: string;
  email: string[];
}
