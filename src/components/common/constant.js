export const services = {
  baseUrl: process.env.REACT_APP_BACKEND_SERVICE_URL,
  projectList: "/nodebackend/project/get",
  reqList: "/nodebackend/reqtype/get",
  historyList: "/nodebackend/request/get",
  deleteRequestById: "/nodebackend/request/deleteById",
  roles: "/nodebackend/role/get",
  createEngineeringRequest: "/nodebackend/eng-request/post",
  updateEngineeringRequest: "/nodebackend/eng-request/put",
  deleteEngineeringRequest: "/nodebackend/eng-request/delete",
  getEngineeringRequests: "/nodebackend/eng-request/get",
  getEngineeringRequest: "/nodebackend/eng-request/getById",
  addEngineeringRequestToCrm: "/nodebackend/eng-request/addToCrm",
  createRequest: "/nodebackend/request/post",
  updateRequest: "/nodebackend/request/put",
  updateRequestById: "/nodebackend/request/putById",
  categoryList: "/nodebackend/req-cat-map/req-wise-cat",
  mapRequestCategory: "/nodebackend/req-cat-map/post",
  categoryUpdate: "/nodebackend/category/put",
  categoryCreate: "/nodebackend/category/post",
  shipmentTypesList: "/nodebackend/shipment-method-list/shipment-method-list",
  login: "/nodebackend/user/login",
  signUp: "/nodebackend/user/signup",
  subscribe: "/nodebackend/subscribe/post",
  getById: "/nodebackend/request/getById",
  submitComment: "/nodebackend/tour/post",
  getTour: "/nodebackend/tour/getWeeklyTours",
  getTraining: "/nodebackend/training/get",
  getEquipments: "/nodebackend/equipment/get",
  getActions: "/nodebackend/action/get",
  getSeverity: "/nodebackend/severity/get",
  submitIncident: "/nodebackend/incident/post",
  getIncident: "/nodebackend/incident/get",
  monthWise: "/nodebackend/incident/monthlyCount",
  getStatus: "/nodebackend/status/get",
  getLearning: "/nodebackend/user/training/get",
  getContactUser: "/nodebackend/incident/contactUsers",
  getUsersList: "/nodebackend/user/list",
  getRequestsByUserId: "/nodebackend/request/getByUserId",
  changeRequestsById: "/nodebackend/request/changeById",
  changeTrainingStatus: "/nodebackend/user/training/updateStatus",
  changeUser: "/nodebackend/user/change/user",
  tourDelete: "/nodebackend/tour/delete",
  changeApprover: "/nodebackend/user/change/approver",
  addToCrm: "/nodebackend/request/addToCrm",
  getFilesOfCRMcase: "/nodebackend/request/getFilesOfCRMcase",
  // add addtocrm route
  // getFTEUsers: '/nodebackend/getFTEUsers'
  // this comment for rebuild trigger
};

export const Constants = {
  HARDWARE_LAB_CABINET: 4
};
