//API ENDPOINTS


export const BASE_API="https://demo.inplan-asp.com/NurseNova/Webservices/Resource-Server-WEB-API/api"
export const IMAGE_URL="https://demo.inplan-asp.com/NurseNova/Webservices/Resource-Server-WEB-API/"
export const AUTHORIZATION_URI="https://demo.inplan-asp.com/NurseNova/Webservices/Auth-Server-WEB-API/api"


export const LOGIN=                         BASE_API + "/Auth/LoginUser"                            //POST
export const SIGNUP=                        BASE_API+"/Auth/RegisterUser"                        //POST
export const OBTAIN_LOCAL_ACCESS_TOKEN=     BASE_API+"/Auth/LocalAccessToken"                        //POST
export const CONFIRM_EMAIL=                 BASE_API+"/accounts/ConfirmEmail"                       //GET
export const CHANGE_PASSWORD=               BASE_API+"/Auth/ChangePassword"                       //POST
export const FORGOT_PASSWORD=               BASE_API+"/Auth/ForgotPassword"                      //POST
export const RESET_PASSWORD=                BASE_API+"/Auth/ResetPassword"                      //POST
export const FACEBOOK_LOGIN=                BASE_API+"/accounts/ExternalLogin"                  //GET
export const REGISTER_FACEBOOK_LOGIN=       BASE_API+"/Auth/RegisterExternal"           //POST
export const GET_USER=                      BASE_API+"/auth/GetUser"           //POST
export const UPDATE_USER=                   BASE_API+"/auth/UpdateUser"           //POST
export const GET_MEDICAL_PROFILES=          BASE_API+"/medicalProfile/GetAll"           //POST
export const GET_USER_MEDICAL_PROFILE=      BASE_API+"/medicalProfile/GetByUser"           //POST
export const CREATE_USER_MEDICAL_PROFILE=   BASE_API+"/medicalProfile/Create"           //POST
export const UPDATE_USER_MEDICAL_PROFILE=   BASE_API+"/medicalProfile/Update"           //POST
export const DELETE_USER_MEDICAL_PROFILE=   BASE_API+"/medicalProfile/Delete"           //POST

export const GET_MEDICAL_RECORDS=          BASE_API+"/medicalRecord/GetAll"           //POST
export const GET_USER_MEDICAL_RECORD=      BASE_API+"/medicalRecord/GetByUser"           //POST
export const CREATE_USER_MEDICAL_RECORD=   BASE_API+"/medicalRecord/Create"           //POST
export const UPDATE_USER_MEDICAL_RECORD=   BASE_API+"/medicalRecord/Update"           //POST
export const DELETE_USER_MEDICAL_RECORD=   BASE_API+"/medicalRecord/Delete"           //POST
export const SHARE_USER_MEDICAL_RECORD=    BASE_API+"/medicalRecord/share"           //POST
export const GET_BY_ID_MEDICAL_RECORD=    BASE_API+"/medicalRecord/GetById"           //POST
export const GET_MEDICAL_RECORD_MULTI_DELETE =    BASE_API+"/medicalRecord/MultiDelete"           //POST

export const GET_FAMILY_MEMBERS=      BASE_API+"/familyMember/GetByUser"           //POST
export const CREATE_FAMILY_MEMBER=   BASE_API+"/familyMember/Create"           //POST
export const UPDATE_FAMILY_MEMBER=   BASE_API+"/familyMember/Update"           //POST
export const DELETE_FAMILY_MEMBER=   BASE_API+"/familyMember/Delete"           //POST
export const INVITE_FAMILY_MEMBER=   BASE_API+"/relationshipActivity/SendAccessInvitation"           //POST

export const GET_HEALTH_DAIRY_MEMBERS=      BASE_API+"/healthDiary/GetByUser"           //POST
export const CREATE_HEALTH_DAIRY_MEMBER=   BASE_API+"/healthDiary/Create"           //POST
export const UPDATE_HEALTH_DAIRY_MEMBER=   BASE_API+"/healthDiary/Update"           //POST
export const DELETE_HEALTH_DAIRY_MEMBER=   BASE_API+"/healthDiary/Delete"           //POST
export const MULTI_DELETE_HEALTH_DAIRY_MEMBER=   BASE_API+"/healthDiary/MultiDelete"           //POST
export const SHARE_HEALTH_DAIRY_RECORD=    BASE_API+"/healthDiary/share"
export const GET_BY_ID_HEALTH_DAIRY_RECORD=    BASE_API+"/healthDiary/GetById"           //POST

export const GET_REMINDERS=      BASE_API+"/reminder/GetByUser"           //POST
export const CREATE_REMINDERS=   BASE_API+"/reminder/Create"           //POST
export const UPDATE_REMINDERS=   BASE_API+"/reminder/update"           //POST
export const DELETE_REMINDERS=   BASE_API+"/reminder/delete"           //POST
export const SHARE_REMINDER=    BASE_API+"/reminder/share"
export const GET_BY_ID_REMINDER=    BASE_API+"/reminder/GetById"           //POST

export const GET_ALL_VACCINATIONS=      BASE_API+"/vaccination/GetAllStandardVaccinations"           //POST
export const GET_MY_VACCINATIONS=      BASE_API+"/vaccination/GetByUser"           //POST
export const GET_UPCOMING_VACCINATIONS=      BASE_API+"/vaccination/GetUpcoming"           //POST
export const GET_VACCINATED_VACCINATIONS=      BASE_API+"/vaccination/GetVaccinated"           //POST
export const GET_OVERDUE_VACCINATIONS=      BASE_API+"/vaccination/GetOverdue"           //POST
export const SWITCH_VACCINATED=      BASE_API+"/vaccination/SwitchToVaccinated"           //POST
export const SWITCH_TO_NON_VACCINATED=      BASE_API+"/vaccination/SwitchToNonVaccinated"           //POST
export const CREATE_VACCINATION=      BASE_API+"/vaccination/create"           //POST
export const UDPATE_VACCINATION=      BASE_API+"/vaccination/update"           //POST
export const DELETE_VACCINATION=      BASE_API+"/vaccination/delete"           //POST
export const MULTI_DELETE_VACCINATION=      BASE_API+"/vaccination/multiDelete"           //POST
export const SHARE_VACCINATION=      BASE_API+"/vaccination/share"           //POST


export const GET_ALL_SPECIALIZATIONS=      BASE_API+"/doctorSpecialization/GetMain"           //POST
export const GET_MORE_SPECIALIZATIONS=      BASE_API+"/doctorSpecialization/getAll"           //POST
export const GET_ALL_SPECIALIZATIONS_SEARCH =      BASE_API+"/doctorSpecialization/Search"           //POST

export const SEARCH_FOR_SPECIALITIES=    BASE_API+"/doctor/GetBySpecialtyByCountry"
export const SEARCH_FOR_NEAR_SPECIALITIES =    BASE_API+"/doctor/searchNearby"

export const SAVED_DOCTORS=    BASE_API+"/doctor/GetFavoriteDoctorsByUser"
export const SAVE_DOCTOR=    BASE_API+"/doctor/AddRemoveFavorite"
export const SHARE_DOCTOR=    BASE_API+"/doctor/share"

export const GET_ALL_TOPICS = BASE_API + "/topic/getAll"
export const GET_TOPIC_BY_USER = BASE_API + "/topic/getbyUser"
export const GET_TOPIC_BY_ID = BASE_API + "/topic/getbyID"
export const CREATE_TOPIC = BASE_API + "/topic/create"
export const UPDATE_TOPIC = BASE_API + "/topic/update"
export const DELETE_TOPIC = BASE_API + "/topic/delete"

export const GET_BY_TOPIC = BASE_API + "/article/getByTopic"
export const GET_ALL_ARTICLES = BASE_API + "/article/getAll"
export const GET_ARTICLES_BY_USER = BASE_API + "/article/getbyUser"
export const GET_ARTICLES_BY_ID = BASE_API + "/article/getbyID"
export const GET_BY_ARTICLE = BASE_API + "/article/getById"
export const GET_ARTICLES_BY_USER_BY_TOPIC = BASE_API + "/article/GetByUserByTopic"
export const GET_FAVORITE_ARTICLES_BY_USER = BASE_API + "/article/GetFavoriteArticlesByUser"
export const MARK_ARTICLE_LIKE = BASE_API + "/article/LikeUnlike"
export const MARK_ARTICLE_FAVORITE = BASE_API + "/article/AddRemoveFavorite"
export const ADD_COMMENT_TO_ARTICAL = BASE_API + "/article/addComment"
export const CREATE_ARTICLE = BASE_API + "/article/create"
export const UPDATE_ARTICLE = BASE_API + "/article/update"
export const DELETE_ARTICLE = BASE_API + "/article/delete"
export const DELETE_MULTIPLE_ARTICLES = BASE_API + "/article/multiDelete"
export const SHARE_ARTICLE = BASE_API + "/article/share"

export const REPORT = BASE_API + "/reportLog/Create"



export const GET_SEEDED_DATA = BASE_API + '/seededData/GetSeededDatasByGroups'
export const GET_SEEDED_DATA_RECORDS = BASE_API + '/seededData/GetSeededDatasByGroups'
export const GET_VACCINATION_BY_CATEGORY_DATA_RECORDS = BASE_API + '/vaccination/GetStandardVaccinationsByCategory'

export const CREATE_FEEDBACK = BASE_API + '/feedback/create'
export const DELETE_FEEDBACK = BASE_API + '/feedback/delete'

