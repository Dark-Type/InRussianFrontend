# DefaultApi

All URIs are relative to *http://InRussianBackend*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**adminStatisticsCourseCourseIdGet**](#adminstatisticscoursecourseidget) | **GET** /admin/statistics/course/{courseId} | |
|[**adminStatisticsOverallGet**](#adminstatisticsoverallget) | **GET** /admin/statistics/overall | |
|[**adminStatisticsStudentsCourseCourseIdGet**](#adminstatisticsstudentscoursecourseidget) | **GET** /admin/statistics/students/course/{courseId} | |
|[**adminStatisticsStudentsOverallGet**](#adminstatisticsstudentsoverallget) | **GET** /admin/statistics/students/overall | |
|[**adminUsersCountGet**](#adminuserscountget) | **GET** /admin/users/count | |
|[**adminUsersGet**](#adminusersget) | **GET** /admin/users | |
|[**adminUsersStaffPost**](#adminusersstaffpost) | **POST** /admin/users/staff | |
|[**adminUsersUserIdGet**](#adminusersuseridget) | **GET** /admin/users/{userId} | |
|[**adminUsersUserIdProfileStaffDelete**](#adminusersuseridprofilestaffdelete) | **DELETE** /admin/users/{userId}/profile/staff | |
|[**adminUsersUserIdProfileStaffGet**](#adminusersuseridprofilestaffget) | **GET** /admin/users/{userId}/profile/staff | |
|[**adminUsersUserIdProfileStaffPost**](#adminusersuseridprofilestaffpost) | **POST** /admin/users/{userId}/profile/staff | |
|[**adminUsersUserIdProfileStaffPut**](#adminusersuseridprofilestaffput) | **PUT** /admin/users/{userId}/profile/staff | |
|[**adminUsersUserIdProfileUserDelete**](#adminusersuseridprofileuserdelete) | **DELETE** /admin/users/{userId}/profile/user | |
|[**adminUsersUserIdProfileUserGet**](#adminusersuseridprofileuserget) | **GET** /admin/users/{userId}/profile/user | |
|[**adminUsersUserIdProfileUserPost**](#adminusersuseridprofileuserpost) | **POST** /admin/users/{userId}/profile/user | |
|[**adminUsersUserIdProfileUserPut**](#adminusersuseridprofileuserput) | **PUT** /admin/users/{userId}/profile/user | |
|[**adminUsersUserIdPut**](#adminusersuseridput) | **PUT** /admin/users/{userId} | |
|[**adminUsersUserIdStatusPut**](#adminusersuseridstatusput) | **PUT** /admin/users/{userId}/status | |
|[**authAdminCreateInitialPost**](#authadmincreateinitialpost) | **POST** /auth/admin/create-initial | |
|[**authLoginPost**](#authloginpost) | **POST** /auth/login | |
|[**authLogoutPost**](#authlogoutpost) | **POST** /auth/logout | |
|[**authMeGet**](#authmeget) | **GET** /auth/me | |
|[**authRefreshPost**](#authrefreshpost) | **POST** /auth/refresh | |
|[**authStaffRegisterPost**](#authstaffregisterpost) | **POST** /auth/staff/register | |
|[**authStudentRegisterPost**](#authstudentregisterpost) | **POST** /auth/student/register | |
|[**contentCoursesCourseIdDelete**](#contentcoursescourseiddelete) | **DELETE** /content/courses/{courseId} | |
|[**contentCoursesCourseIdGet**](#contentcoursescourseidget) | **GET** /content/courses/{courseId} | |
|[**contentCoursesCourseIdPut**](#contentcoursescourseidput) | **PUT** /content/courses/{courseId} | |
|[**contentCoursesGet**](#contentcoursesget) | **GET** /content/courses | |
|[**contentCoursesPost**](#contentcoursespost) | **POST** /content/courses | |
|[**contentMediaGet**](#contentmediaget) | **GET** /content/media | |
|[**contentMediaMediaIdDelete**](#contentmediamediaiddelete) | **DELETE** /content/media/{mediaId} | |
|[**contentMediaMediaIdGet**](#contentmediamediaidget) | **GET** /content/media/{mediaId} | |
|[**contentMediaMediaIdPut**](#contentmediamediaidput) | **PUT** /content/media/{mediaId} | |
|[**contentMediaPost**](#contentmediapost) | **POST** /content/media | |
|[**contentReportsGet**](#contentreportsget) | **GET** /content/reports | |
|[**contentReportsPost**](#contentreportspost) | **POST** /content/reports | |
|[**contentReportsReportIdDelete**](#contentreportsreportiddelete) | **DELETE** /content/reports/{reportId} | |
|[**contentReportsReportIdGet**](#contentreportsreportidget) | **GET** /content/reports/{reportId} | |
|[**contentSectionsByCourseCourseIdGet**](#contentsectionsbycoursecourseidget) | **GET** /content/sections/by-course/{courseId} | |
|[**contentSectionsPost**](#contentsectionspost) | **POST** /content/sections | |
|[**contentSectionsSectionIdDelete**](#contentsectionssectioniddelete) | **DELETE** /content/sections/{sectionId} | |
|[**contentSectionsSectionIdGet**](#contentsectionssectionidget) | **GET** /content/sections/{sectionId} | |
|[**contentSectionsSectionIdPut**](#contentsectionssectionidput) | **PUT** /content/sections/{sectionId} | |
|[**contentStatsCourseCourseIdTasksCountGet**](#contentstatscoursecourseidtaskscountget) | **GET** /content/stats/course/{courseId}/tasks-count | |
|[**contentStatsGet**](#contentstatsget) | **GET** /content/stats | |
|[**contentStatsSectionSectionIdTasksCountGet**](#contentstatssectionsectionidtaskscountget) | **GET** /content/stats/section/{sectionId}/tasks-count | |
|[**contentStatsThemeThemeIdTasksCountGet**](#contentstatsthemethemeidtaskscountget) | **GET** /content/stats/theme/{themeId}/tasks-count | |
|[**contentTasksPost**](#contenttaskspost) | **POST** /content/tasks | |
|[**contentTasksTaskIdAnswerDelete**](#contenttaskstaskidanswerdelete) | **DELETE** /content/tasks/{taskId}/answer | |
|[**contentTasksTaskIdAnswerGet**](#contenttaskstaskidanswerget) | **GET** /content/tasks/{taskId}/answer | |
|[**contentTasksTaskIdAnswerPost**](#contenttaskstaskidanswerpost) | **POST** /content/tasks/{taskId}/answer | |
|[**contentTasksTaskIdAnswerPut**](#contenttaskstaskidanswerput) | **PUT** /content/tasks/{taskId}/answer | |
|[**contentTasksTaskIdContentContentIdDelete**](#contenttaskstaskidcontentcontentiddelete) | **DELETE** /content/tasks/{taskId}/content/{contentId} | |
|[**contentTasksTaskIdContentContentIdGet**](#contenttaskstaskidcontentcontentidget) | **GET** /content/tasks/{taskId}/content/{contentId} | |
|[**contentTasksTaskIdContentContentIdPut**](#contenttaskstaskidcontentcontentidput) | **PUT** /content/tasks/{taskId}/content/{contentId} | |
|[**contentTasksTaskIdContentPost**](#contenttaskstaskidcontentpost) | **POST** /content/tasks/{taskId}/content | |
|[**contentTasksTaskIdDelete**](#contenttaskstaskiddelete) | **DELETE** /content/tasks/{taskId} | |
|[**contentTasksTaskIdGet**](#contenttaskstaskidget) | **GET** /content/tasks/{taskId} | |
|[**contentTasksTaskIdOptionsOptionIdDelete**](#contenttaskstaskidoptionsoptioniddelete) | **DELETE** /content/tasks/{taskId}/options/{optionId} | |
|[**contentTasksTaskIdOptionsOptionIdGet**](#contenttaskstaskidoptionsoptionidget) | **GET** /content/tasks/{taskId}/options/{optionId} | |
|[**contentTasksTaskIdOptionsOptionIdPut**](#contenttaskstaskidoptionsoptionidput) | **PUT** /content/tasks/{taskId}/options/{optionId} | |
|[**contentTasksTaskIdOptionsPost**](#contenttaskstaskidoptionspost) | **POST** /content/tasks/{taskId}/options | |
|[**contentTasksTaskIdPut**](#contenttaskstaskidput) | **PUT** /content/tasks/{taskId} | |
|[**contentThemesBySectionSectionIdGet**](#contentthemesbysectionsectionidget) | **GET** /content/themes/by-section/{sectionId} | |
|[**contentThemesPost**](#contentthemespost) | **POST** /content/themes | |
|[**contentThemesThemeIdDelete**](#contentthemesthemeiddelete) | **DELETE** /content/themes/{themeId} | |
|[**contentThemesThemeIdGet**](#contentthemesthemeidget) | **GET** /content/themes/{themeId} | |
|[**contentThemesThemeIdPut**](#contentthemesthemeidput) | **PUT** /content/themes/{themeId} | |
|[**contentThemesThemeIdTasksGet**](#contentthemesthemeidtasksget) | **GET** /content/themes/{themeId}/tasks | |
|[**expertContentCoursesCourseIdGet**](#expertcontentcoursescourseidget) | **GET** /expert/content/courses/{courseId} | |
|[**expertContentCoursesGet**](#expertcontentcoursesget) | **GET** /expert/content/courses | |
|[**expertContentReportsGet**](#expertcontentreportsget) | **GET** /expert/content/reports | |
|[**expertContentStatsGet**](#expertcontentstatsget) | **GET** /expert/content/stats | |
|[**expertStatisticsCourseCourseIdAverageProgressGet**](#expertstatisticscoursecourseidaverageprogressget) | **GET** /expert/statistics/course/{courseId}/average-progress | |
|[**expertStatisticsCourseCourseIdAverageTimeGet**](#expertstatisticscoursecourseidaveragetimeget) | **GET** /expert/statistics/course/{courseId}/average-time | |
|[**expertStatisticsOverallAverageProgressGet**](#expertstatisticsoverallaverageprogressget) | **GET** /expert/statistics/overall-average-progress | |
|[**expertStatisticsOverallAverageTimeGet**](#expertstatisticsoverallaveragetimeget) | **GET** /expert/statistics/overall-average-time | |
|[**expertStatisticsStudentsCourseCourseIdGet**](#expertstatisticsstudentscoursecourseidget) | **GET** /expert/statistics/students/course/{courseId} | |
|[**expertStatisticsStudentsOverallGet**](#expertstatisticsstudentsoverallget) | **GET** /expert/statistics/students/overall | |
|[**expertStudentsCountGet**](#expertstudentscountget) | **GET** /expert/students/count | |
|[**expertStudentsCourseCourseIdGet**](#expertstudentscoursecourseidget) | **GET** /expert/students/course/{courseId} | |
|[**expertStudentsGet**](#expertstudentsget) | **GET** /expert/students | |
|[**expertStudentsWithProfilesGet**](#expertstudentswithprofilesget) | **GET** /expert/students/with-profiles | |
|[**profilesMediaMediaIdGet**](#profilesmediamediaidget) | **GET** /profiles/media/{mediaId} | |
|[**profilesMediaPost**](#profilesmediapost) | **POST** /profiles/media | |
|[**profilesStaffGet**](#profilesstaffget) | **GET** /profiles/staff | |
|[**profilesStaffIdGet**](#profilesstaffidget) | **GET** /profiles/staff/{id} | |
|[**profilesStaffIdPut**](#profilesstaffidput) | **PUT** /profiles/staff/{id} | |
|[**profilesStaffPost**](#profilesstaffpost) | **POST** /profiles/staff | |
|[**profilesStaffPut**](#profilesstaffput) | **PUT** /profiles/staff | |
|[**profilesUserGet**](#profilesuserget) | **GET** /profiles/user | |
|[**profilesUserIdGet**](#profilesuseridget) | **GET** /profiles/user/{id} | |
|[**profilesUserIdPut**](#profilesuseridput) | **PUT** /profiles/user/{id} | |
|[**profilesUserPost**](#profilesuserpost) | **POST** /profiles/user | |
|[**profilesUserPut**](#profilesuserput) | **PUT** /profiles/user | |
|[**profilesUserUserLanguageSkillsPost**](#profilesuseruserlanguageskillspost) | **POST** /profiles/user/user/language-skills | |
|[**studentBadgesGet**](#studentbadgesget) | **GET** /student/badges | |
|[**studentBadgesPost**](#studentbadgespost) | **POST** /student/badges | |
|[**studentCoursesCourseIdEnrollDelete**](#studentcoursescourseidenrolldelete) | **DELETE** /student/courses/{courseId}/enroll | |
|[**studentCoursesCourseIdEnrollPost**](#studentcoursescourseidenrollpost) | **POST** /student/courses/{courseId}/enroll | |
|[**studentCoursesCourseIdProgressGet**](#studentcoursescourseidprogressget) | **GET** /student/courses/{courseId}/progress | |
|[**studentCoursesCourseIdSectionsGet**](#studentcoursescourseidsectionsget) | **GET** /student/courses/{courseId}/sections | |
|[**studentCoursesCourseIdThemesGet**](#studentcoursescourseidthemesget) | **GET** /student/courses/{courseId}/themes | |
|[**studentCoursesGet**](#studentcoursesget) | **GET** /student/courses | |
|[**studentEnrollmentsGet**](#studentenrollmentsget) | **GET** /student/enrollments | |
|[**studentMediaGet**](#studentmediaget) | **GET** /student/media | |
|[**studentMediaMediaIdGet**](#studentmediamediaidget) | **GET** /student/media/{mediaId} | |
|[**studentSectionsSectionIdProgressGet**](#studentsectionssectionidprogressget) | **GET** /student/sections/{sectionId}/progress | |
|[**studentTaskQueueGet**](#studenttaskqueueget) | **GET** /student/task-queue | |
|[**studentTaskQueueNextGet**](#studenttaskqueuenextget) | **GET** /student/task-queue/next | |
|[**studentTaskQueuePost**](#studenttaskqueuepost) | **POST** /student/task-queue | |
|[**studentTaskQueueQueueIdDelete**](#studenttaskqueuequeueiddelete) | **DELETE** /student/task-queue/{queueId} | |
|[**studentTaskQueueQueueIdPositionPatch**](#studenttaskqueuequeueidpositionpatch) | **PATCH** /student/task-queue/{queueId}/position | |
|[**studentTasksTaskIdAnswerGet**](#studenttaskstaskidanswerget) | **GET** /student/tasks/{taskId}/answer | |
|[**studentTasksTaskIdCompletePost**](#studenttaskstaskidcompletepost) | **POST** /student/tasks/{taskId}/complete | |
|[**studentTasksTaskIdContentGet**](#studenttaskstaskidcontentget) | **GET** /student/tasks/{taskId}/content | |
|[**studentTasksTaskIdProgressGet**](#studenttaskstaskidprogressget) | **GET** /student/tasks/{taskId}/progress | |
|[**studentTasksTaskIdProgressPatch**](#studenttaskstaskidprogresspatch) | **PATCH** /student/tasks/{taskId}/progress | |
|[**studentTasksTaskIdProgressPost**](#studenttaskstaskidprogresspost) | **POST** /student/tasks/{taskId}/progress | |
|[**studentTasksTaskIdQueryGet**](#studenttaskstaskidqueryget) | **GET** /student/tasks/{taskId}/query | |
|[**studentTasksTaskIdReportPost**](#studenttaskstaskidreportpost) | **POST** /student/tasks/{taskId}/report | |
|[**studentTasksTaskIdVariantsGet**](#studenttaskstaskidvariantsget) | **GET** /student/tasks/{taskId}/variants | |
|[**studentThemesThemeIdTasksGet**](#studentthemesthemeidtasksget) | **GET** /student/themes/{themeId}/tasks | |

# **adminStatisticsCourseCourseIdGet**
> string adminStatisticsCourseCourseIdGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let courseId: string; // (default to undefined)

const { status, data } = await apiInstance.adminStatisticsCourseCourseIdGet(
    courseId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **courseId** | [**string**] |  | defaults to undefined|


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **adminStatisticsOverallGet**
> string adminStatisticsOverallGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.adminStatisticsOverallGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **adminStatisticsStudentsCourseCourseIdGet**
> string adminStatisticsStudentsCourseCourseIdGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let courseId: string; // (default to undefined)

const { status, data } = await apiInstance.adminStatisticsStudentsCourseCourseIdGet(
    courseId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **courseId** | [**string**] |  | defaults to undefined|


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **adminStatisticsStudentsOverallGet**
> string adminStatisticsStudentsOverallGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.adminStatisticsStudentsOverallGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **adminUsersCountGet**
> string adminUsersCountGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let role: string; // (optional) (default to undefined)
let createdFrom: string; // (optional) (default to undefined)
let createdTo: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.adminUsersCountGet(
    role,
    createdFrom,
    createdTo
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **role** | [**string**] |  | (optional) defaults to undefined|
| **createdFrom** | [**string**] |  | (optional) defaults to undefined|
| **createdTo** | [**string**] |  | (optional) defaults to undefined|


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **adminUsersGet**
> Array<User> adminUsersGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let page: number; // (optional) (default to undefined)
let size: number; // (optional) (default to undefined)
let role: string; // (optional) (default to undefined)
let sortBy: string; // (optional) (default to undefined)
let sortOrder: string; // (optional) (default to undefined)
let createdFrom: string; // (optional) (default to undefined)
let createdTo: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.adminUsersGet(
    page,
    size,
    role,
    sortBy,
    sortOrder,
    createdFrom,
    createdTo
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **size** | [**number**] |  | (optional) defaults to undefined|
| **role** | [**string**] |  | (optional) defaults to undefined|
| **sortBy** | [**string**] |  | (optional) defaults to undefined|
| **sortOrder** | [**string**] |  | (optional) defaults to undefined|
| **createdFrom** | [**string**] |  | (optional) defaults to undefined|
| **createdTo** | [**string**] |  | (optional) defaults to undefined|


### Return type

**Array<User>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **adminUsersStaffPost**
> LoginResponse adminUsersStaffPost(staffRegisterRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    StaffRegisterRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let staffRegisterRequest: StaffRegisterRequest; //

const { status, data } = await apiInstance.adminUsersStaffPost(
    staffRegisterRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **staffRegisterRequest** | **StaffRegisterRequest**|  | |


### Return type

**LoginResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **adminUsersUserIdGet**
> User adminUsersUserIdGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.adminUsersUserIdGet(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**User**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **adminUsersUserIdProfileStaffDelete**
> MessageResponse adminUsersUserIdProfileStaffDelete()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.adminUsersUserIdProfileStaffDelete(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**MessageResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **adminUsersUserIdProfileStaffGet**
> StaffProfileResponse adminUsersUserIdProfileStaffGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.adminUsersUserIdProfileStaffGet(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**StaffProfileResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **adminUsersUserIdProfileStaffPost**
> StaffProfileResponse adminUsersUserIdProfileStaffPost(createStaffProfileRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    CreateStaffProfileRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let userId: string; // (default to undefined)
let createStaffProfileRequest: CreateStaffProfileRequest; //

const { status, data } = await apiInstance.adminUsersUserIdProfileStaffPost(
    userId,
    createStaffProfileRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createStaffProfileRequest** | **CreateStaffProfileRequest**|  | |
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**StaffProfileResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**201** | Created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **adminUsersUserIdProfileStaffPut**
> StaffProfileResponse adminUsersUserIdProfileStaffPut(updateStaffProfileRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    UpdateStaffProfileRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let userId: string; // (default to undefined)
let updateStaffProfileRequest: UpdateStaffProfileRequest; //

const { status, data } = await apiInstance.adminUsersUserIdProfileStaffPut(
    userId,
    updateStaffProfileRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateStaffProfileRequest** | **UpdateStaffProfileRequest**|  | |
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**StaffProfileResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **adminUsersUserIdProfileUserDelete**
> MessageResponse adminUsersUserIdProfileUserDelete()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.adminUsersUserIdProfileUserDelete(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**MessageResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **adminUsersUserIdProfileUserGet**
> UserProfileResponse adminUsersUserIdProfileUserGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.adminUsersUserIdProfileUserGet(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**UserProfileResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **adminUsersUserIdProfileUserPost**
> UserProfileResponse adminUsersUserIdProfileUserPost(createUserProfileRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    CreateUserProfileRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let userId: string; // (default to undefined)
let createUserProfileRequest: CreateUserProfileRequest; //

const { status, data } = await apiInstance.adminUsersUserIdProfileUserPost(
    userId,
    createUserProfileRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createUserProfileRequest** | **CreateUserProfileRequest**|  | |
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**UserProfileResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**201** | Created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **adminUsersUserIdProfileUserPut**
> UserProfileResponse adminUsersUserIdProfileUserPut(updateUserProfileRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    UpdateUserProfileRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let userId: string; // (default to undefined)
let updateUserProfileRequest: UpdateUserProfileRequest; //

const { status, data } = await apiInstance.adminUsersUserIdProfileUserPut(
    userId,
    updateUserProfileRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateUserProfileRequest** | **UpdateUserProfileRequest**|  | |
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**UserProfileResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **adminUsersUserIdPut**
> User adminUsersUserIdPut(updateUserRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    UpdateUserRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let userId: string; // (default to undefined)
let updateUserRequest: UpdateUserRequest; //

const { status, data } = await apiInstance.adminUsersUserIdPut(
    userId,
    updateUserRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateUserRequest** | **UpdateUserRequest**|  | |
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**User**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **adminUsersUserIdStatusPut**
> MessageResponse adminUsersUserIdStatusPut(body)



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let userId: string; // (default to undefined)
let body: string; //

const { status, data } = await apiInstance.adminUsersUserIdStatusPut(
    userId,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **string**|  | |
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**MessageResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authAdminCreateInitialPost**
> AdminCreatedResponse authAdminCreateInitialPost()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.authAdminCreateInitialPost();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**AdminCreatedResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authLoginPost**
> LoginResponse authLoginPost(loginRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    LoginRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let loginRequest: LoginRequest; //

const { status, data } = await apiInstance.authLoginPost(
    loginRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **loginRequest** | **LoginRequest**|  | |


### Return type

**LoginResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authLogoutPost**
> MessageResponse authLogoutPost()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.authLogoutPost();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**MessageResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authMeGet**
> UserInfoResponse authMeGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.authMeGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**UserInfoResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authRefreshPost**
> string authRefreshPost(refreshTokenRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    RefreshTokenRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let refreshTokenRequest: RefreshTokenRequest; //

const { status, data } = await apiInstance.authRefreshPost(
    refreshTokenRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **refreshTokenRequest** | **RefreshTokenRequest**|  | |


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authStaffRegisterPost**
> LoginResponse authStaffRegisterPost(staffRegisterRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    StaffRegisterRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let staffRegisterRequest: StaffRegisterRequest; //

const { status, data } = await apiInstance.authStaffRegisterPost(
    staffRegisterRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **staffRegisterRequest** | **StaffRegisterRequest**|  | |


### Return type

**LoginResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authStudentRegisterPost**
> LoginResponse authStudentRegisterPost(studentRegisterRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    StudentRegisterRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let studentRegisterRequest: StudentRegisterRequest; //

const { status, data } = await apiInstance.authStudentRegisterPost(
    studentRegisterRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **studentRegisterRequest** | **StudentRegisterRequest**|  | |


### Return type

**LoginResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentCoursesCourseIdDelete**
> string contentCoursesCourseIdDelete()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let courseId: string; // (default to undefined)

const { status, data } = await apiInstance.contentCoursesCourseIdDelete(
    courseId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **courseId** | [**string**] |  | defaults to undefined|


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentCoursesCourseIdGet**
> Course contentCoursesCourseIdGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let courseId: string; // (default to undefined)

const { status, data } = await apiInstance.contentCoursesCourseIdGet(
    courseId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **courseId** | [**string**] |  | defaults to undefined|


### Return type

**Course**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentCoursesCourseIdPut**
> Course contentCoursesCourseIdPut(updateCourseRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    UpdateCourseRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let courseId: string; // (default to undefined)
let updateCourseRequest: UpdateCourseRequest; //

const { status, data } = await apiInstance.contentCoursesCourseIdPut(
    courseId,
    updateCourseRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateCourseRequest** | **UpdateCourseRequest**|  | |
| **courseId** | [**string**] |  | defaults to undefined|


### Return type

**Course**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentCoursesGet**
> Array<Course> contentCoursesGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.contentCoursesGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<Course>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentCoursesPost**
> Course contentCoursesPost(createCourseRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    CreateCourseRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let createCourseRequest: CreateCourseRequest; //

const { status, data } = await apiInstance.contentCoursesPost(
    createCourseRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createCourseRequest** | **CreateCourseRequest**|  | |


### Return type

**Course**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**401** | Unauthorized |  -  |
|**201** | Created |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentMediaGet**
> Array<MediaFileMeta> contentMediaGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.contentMediaGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<MediaFileMeta>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentMediaMediaIdDelete**
> string contentMediaMediaIdDelete()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let mediaId: string; // (default to undefined)

const { status, data } = await apiInstance.contentMediaMediaIdDelete(
    mediaId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **mediaId** | [**string**] |  | defaults to undefined|


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**404** | Not Found |  -  |
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentMediaMediaIdGet**
> object contentMediaMediaIdGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let mediaId: string; // (default to undefined)

const { status, data } = await apiInstance.contentMediaMediaIdGet(
    mediaId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **mediaId** | [**string**] |  | defaults to undefined|


### Return type

**object**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*, application/*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK &lt;br&gt; A file response |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentMediaMediaIdPut**
> MediaFileMeta contentMediaMediaIdPut()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let mediaId: string; // (default to undefined)
let uploadedBy: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.contentMediaMediaIdPut(
    mediaId,
    uploadedBy
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **mediaId** | [**string**] |  | defaults to undefined|
| **uploadedBy** | [**string**] |  | (optional) defaults to undefined|


### Return type

**MediaFileMeta**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**404** | Not Found |  -  |
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentMediaPost**
> MediaFileMeta contentMediaPost()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.contentMediaPost();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**MediaFileMeta**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentReportsGet**
> Array<Report> contentReportsGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.contentReportsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<Report>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentReportsPost**
> Report contentReportsPost(createReportRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    CreateReportRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let createReportRequest: CreateReportRequest; //

const { status, data } = await apiInstance.contentReportsPost(
    createReportRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createReportRequest** | **CreateReportRequest**|  | |


### Return type

**Report**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**401** | Unauthorized |  -  |
|**201** | Created |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentReportsReportIdDelete**
> string contentReportsReportIdDelete()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let reportId: string; // (default to undefined)

const { status, data } = await apiInstance.contentReportsReportIdDelete(
    reportId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reportId** | [**string**] |  | defaults to undefined|


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentReportsReportIdGet**
> Report contentReportsReportIdGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let reportId: string; // (default to undefined)

const { status, data } = await apiInstance.contentReportsReportIdGet(
    reportId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reportId** | [**string**] |  | defaults to undefined|


### Return type

**Report**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentSectionsByCourseCourseIdGet**
> Array<Section> contentSectionsByCourseCourseIdGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let courseId: string; // (default to undefined)

const { status, data } = await apiInstance.contentSectionsByCourseCourseIdGet(
    courseId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **courseId** | [**string**] |  | defaults to undefined|


### Return type

**Array<Section>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentSectionsPost**
> Section contentSectionsPost(createSectionRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    CreateSectionRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let createSectionRequest: CreateSectionRequest; //

const { status, data } = await apiInstance.contentSectionsPost(
    createSectionRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createSectionRequest** | **CreateSectionRequest**|  | |


### Return type

**Section**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentSectionsSectionIdDelete**
> string contentSectionsSectionIdDelete()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let sectionId: string; // (default to undefined)

const { status, data } = await apiInstance.contentSectionsSectionIdDelete(
    sectionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sectionId** | [**string**] |  | defaults to undefined|


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentSectionsSectionIdGet**
> Section contentSectionsSectionIdGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let sectionId: string; // (default to undefined)

const { status, data } = await apiInstance.contentSectionsSectionIdGet(
    sectionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sectionId** | [**string**] |  | defaults to undefined|


### Return type

**Section**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentSectionsSectionIdPut**
> Section contentSectionsSectionIdPut(updateSectionRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    UpdateSectionRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let sectionId: string; // (default to undefined)
let updateSectionRequest: UpdateSectionRequest; //

const { status, data } = await apiInstance.contentSectionsSectionIdPut(
    sectionId,
    updateSectionRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateSectionRequest** | **UpdateSectionRequest**|  | |
| **sectionId** | [**string**] |  | defaults to undefined|


### Return type

**Section**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentStatsCourseCourseIdTasksCountGet**
> string contentStatsCourseCourseIdTasksCountGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let courseId: string; // (default to undefined)

const { status, data } = await apiInstance.contentStatsCourseCourseIdTasksCountGet(
    courseId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **courseId** | [**string**] |  | defaults to undefined|


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentStatsGet**
> CountStats contentStatsGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.contentStatsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**CountStats**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentStatsSectionSectionIdTasksCountGet**
> string contentStatsSectionSectionIdTasksCountGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let sectionId: string; // (default to undefined)

const { status, data } = await apiInstance.contentStatsSectionSectionIdTasksCountGet(
    sectionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sectionId** | [**string**] |  | defaults to undefined|


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentStatsThemeThemeIdTasksCountGet**
> string contentStatsThemeThemeIdTasksCountGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let themeId: string; // (default to undefined)

const { status, data } = await apiInstance.contentStatsThemeThemeIdTasksCountGet(
    themeId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **themeId** | [**string**] |  | defaults to undefined|


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentTasksPost**
> TaskWithDetails contentTasksPost(createTaskRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    CreateTaskRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let createTaskRequest: CreateTaskRequest; //

const { status, data } = await apiInstance.contentTasksPost(
    createTaskRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createTaskRequest** | **CreateTaskRequest**|  | |


### Return type

**TaskWithDetails**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentTasksTaskIdAnswerDelete**
> string contentTasksTaskIdAnswerDelete()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let taskId: string; // (default to undefined)

const { status, data } = await apiInstance.contentTasksTaskIdAnswerDelete(
    taskId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **taskId** | [**string**] |  | defaults to undefined|


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentTasksTaskIdAnswerGet**
> TaskAnswerItem contentTasksTaskIdAnswerGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let taskId: string; // (default to undefined)

const { status, data } = await apiInstance.contentTasksTaskIdAnswerGet(
    taskId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **taskId** | [**string**] |  | defaults to undefined|


### Return type

**TaskAnswerItem**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentTasksTaskIdAnswerPost**
> TaskAnswerItem contentTasksTaskIdAnswerPost(createTaskAnswerRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    CreateTaskAnswerRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let taskId: string; // (default to undefined)
let createTaskAnswerRequest: CreateTaskAnswerRequest; //

const { status, data } = await apiInstance.contentTasksTaskIdAnswerPost(
    taskId,
    createTaskAnswerRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createTaskAnswerRequest** | **CreateTaskAnswerRequest**|  | |
| **taskId** | [**string**] |  | defaults to undefined|


### Return type

**TaskAnswerItem**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**201** | Created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentTasksTaskIdAnswerPut**
> TaskAnswerItem contentTasksTaskIdAnswerPut(updateTaskAnswerRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    UpdateTaskAnswerRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let taskId: string; // (default to undefined)
let updateTaskAnswerRequest: UpdateTaskAnswerRequest; //

const { status, data } = await apiInstance.contentTasksTaskIdAnswerPut(
    taskId,
    updateTaskAnswerRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateTaskAnswerRequest** | **UpdateTaskAnswerRequest**|  | |
| **taskId** | [**string**] |  | defaults to undefined|


### Return type

**TaskAnswerItem**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentTasksTaskIdContentContentIdDelete**
> string contentTasksTaskIdContentContentIdDelete()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let contentId: string; // (default to undefined)
let taskId: string; // (default to undefined)

const { status, data } = await apiInstance.contentTasksTaskIdContentContentIdDelete(
    contentId,
    taskId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **contentId** | [**string**] |  | defaults to undefined|
| **taskId** | [**string**] |  | defaults to undefined|


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentTasksTaskIdContentContentIdGet**
> TaskContentItem contentTasksTaskIdContentContentIdGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let contentId: string; // (default to undefined)
let taskId: string; // (default to undefined)

const { status, data } = await apiInstance.contentTasksTaskIdContentContentIdGet(
    contentId,
    taskId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **contentId** | [**string**] |  | defaults to undefined|
| **taskId** | [**string**] |  | defaults to undefined|


### Return type

**TaskContentItem**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentTasksTaskIdContentContentIdPut**
> TaskContentItem contentTasksTaskIdContentContentIdPut(updateTaskContentRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    UpdateTaskContentRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let contentId: string; // (default to undefined)
let taskId: string; // (default to undefined)
let updateTaskContentRequest: UpdateTaskContentRequest; //

const { status, data } = await apiInstance.contentTasksTaskIdContentContentIdPut(
    contentId,
    taskId,
    updateTaskContentRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateTaskContentRequest** | **UpdateTaskContentRequest**|  | |
| **contentId** | [**string**] |  | defaults to undefined|
| **taskId** | [**string**] |  | defaults to undefined|


### Return type

**TaskContentItem**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentTasksTaskIdContentPost**
> TaskContentItem contentTasksTaskIdContentPost(createTaskContentRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    CreateTaskContentRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let taskId: string; // (default to undefined)
let createTaskContentRequest: CreateTaskContentRequest; //

const { status, data } = await apiInstance.contentTasksTaskIdContentPost(
    taskId,
    createTaskContentRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createTaskContentRequest** | **CreateTaskContentRequest**|  | |
| **taskId** | [**string**] |  | defaults to undefined|


### Return type

**TaskContentItem**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**201** | Created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentTasksTaskIdDelete**
> string contentTasksTaskIdDelete()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let taskId: string; // (default to undefined)

const { status, data } = await apiInstance.contentTasksTaskIdDelete(
    taskId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **taskId** | [**string**] |  | defaults to undefined|


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentTasksTaskIdGet**
> TaskWithDetails contentTasksTaskIdGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let taskId: string; // (default to undefined)

const { status, data } = await apiInstance.contentTasksTaskIdGet(
    taskId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **taskId** | [**string**] |  | defaults to undefined|


### Return type

**TaskWithDetails**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentTasksTaskIdOptionsOptionIdDelete**
> string contentTasksTaskIdOptionsOptionIdDelete()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let optionId: string; // (default to undefined)
let taskId: string; // (default to undefined)

const { status, data } = await apiInstance.contentTasksTaskIdOptionsOptionIdDelete(
    optionId,
    taskId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **optionId** | [**string**] |  | defaults to undefined|
| **taskId** | [**string**] |  | defaults to undefined|


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentTasksTaskIdOptionsOptionIdGet**
> TaskAnswerOptionItem contentTasksTaskIdOptionsOptionIdGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let optionId: string; // (default to undefined)
let taskId: string; // (default to undefined)

const { status, data } = await apiInstance.contentTasksTaskIdOptionsOptionIdGet(
    optionId,
    taskId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **optionId** | [**string**] |  | defaults to undefined|
| **taskId** | [**string**] |  | defaults to undefined|


### Return type

**TaskAnswerOptionItem**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentTasksTaskIdOptionsOptionIdPut**
> TaskAnswerOptionItem contentTasksTaskIdOptionsOptionIdPut(updateTaskAnswerOptionRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    UpdateTaskAnswerOptionRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let optionId: string; // (default to undefined)
let taskId: string; // (default to undefined)
let updateTaskAnswerOptionRequest: UpdateTaskAnswerOptionRequest; //

const { status, data } = await apiInstance.contentTasksTaskIdOptionsOptionIdPut(
    optionId,
    taskId,
    updateTaskAnswerOptionRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateTaskAnswerOptionRequest** | **UpdateTaskAnswerOptionRequest**|  | |
| **optionId** | [**string**] |  | defaults to undefined|
| **taskId** | [**string**] |  | defaults to undefined|


### Return type

**TaskAnswerOptionItem**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentTasksTaskIdOptionsPost**
> TaskAnswerOptionItem contentTasksTaskIdOptionsPost(createTaskAnswerOptionRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    CreateTaskAnswerOptionRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let taskId: string; // (default to undefined)
let createTaskAnswerOptionRequest: CreateTaskAnswerOptionRequest; //

const { status, data } = await apiInstance.contentTasksTaskIdOptionsPost(
    taskId,
    createTaskAnswerOptionRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createTaskAnswerOptionRequest** | **CreateTaskAnswerOptionRequest**|  | |
| **taskId** | [**string**] |  | defaults to undefined|


### Return type

**TaskAnswerOptionItem**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**201** | Created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentTasksTaskIdPut**
> TaskWithDetails contentTasksTaskIdPut(updateTaskRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    UpdateTaskRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let taskId: string; // (default to undefined)
let updateTaskRequest: UpdateTaskRequest; //

const { status, data } = await apiInstance.contentTasksTaskIdPut(
    taskId,
    updateTaskRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateTaskRequest** | **UpdateTaskRequest**|  | |
| **taskId** | [**string**] |  | defaults to undefined|


### Return type

**TaskWithDetails**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentThemesBySectionSectionIdGet**
> Array<Theme> contentThemesBySectionSectionIdGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let sectionId: string; // (default to undefined)

const { status, data } = await apiInstance.contentThemesBySectionSectionIdGet(
    sectionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sectionId** | [**string**] |  | defaults to undefined|


### Return type

**Array<Theme>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentThemesPost**
> Theme contentThemesPost(createThemeRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    CreateThemeRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let createThemeRequest: CreateThemeRequest; //

const { status, data } = await apiInstance.contentThemesPost(
    createThemeRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createThemeRequest** | **CreateThemeRequest**|  | |


### Return type

**Theme**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentThemesThemeIdDelete**
> string contentThemesThemeIdDelete()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let themeId: string; // (default to undefined)

const { status, data } = await apiInstance.contentThemesThemeIdDelete(
    themeId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **themeId** | [**string**] |  | defaults to undefined|


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentThemesThemeIdGet**
> Theme contentThemesThemeIdGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let themeId: string; // (default to undefined)

const { status, data } = await apiInstance.contentThemesThemeIdGet(
    themeId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **themeId** | [**string**] |  | defaults to undefined|


### Return type

**Theme**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentThemesThemeIdPut**
> Theme contentThemesThemeIdPut(updateThemeRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    UpdateThemeRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let themeId: string; // (default to undefined)
let updateThemeRequest: UpdateThemeRequest; //

const { status, data } = await apiInstance.contentThemesThemeIdPut(
    themeId,
    updateThemeRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateThemeRequest** | **UpdateThemeRequest**|  | |
| **themeId** | [**string**] |  | defaults to undefined|


### Return type

**Theme**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **contentThemesThemeIdTasksGet**
> Array<TaskWithDetails> contentThemesThemeIdTasksGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let themeId: string; // (default to undefined)

const { status, data } = await apiInstance.contentThemesThemeIdTasksGet(
    themeId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **themeId** | [**string**] |  | defaults to undefined|


### Return type

**Array<TaskWithDetails>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **expertContentCoursesCourseIdGet**
> Course expertContentCoursesCourseIdGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let courseId: string; // (default to undefined)

const { status, data } = await apiInstance.expertContentCoursesCourseIdGet(
    courseId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **courseId** | [**string**] |  | defaults to undefined|


### Return type

**Course**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **expertContentCoursesGet**
> Array<Course> expertContentCoursesGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.expertContentCoursesGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<Course>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **expertContentReportsGet**
> Array<Report> expertContentReportsGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.expertContentReportsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<Report>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **expertContentStatsGet**
> CountStats expertContentStatsGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.expertContentStatsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**CountStats**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **expertStatisticsCourseCourseIdAverageProgressGet**
> string expertStatisticsCourseCourseIdAverageProgressGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let courseId: string; // (default to undefined)

const { status, data } = await apiInstance.expertStatisticsCourseCourseIdAverageProgressGet(
    courseId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **courseId** | [**string**] |  | defaults to undefined|


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **expertStatisticsCourseCourseIdAverageTimeGet**
> string expertStatisticsCourseCourseIdAverageTimeGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let courseId: string; // (default to undefined)

const { status, data } = await apiInstance.expertStatisticsCourseCourseIdAverageTimeGet(
    courseId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **courseId** | [**string**] |  | defaults to undefined|


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **expertStatisticsOverallAverageProgressGet**
> string expertStatisticsOverallAverageProgressGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.expertStatisticsOverallAverageProgressGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **expertStatisticsOverallAverageTimeGet**
> string expertStatisticsOverallAverageTimeGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.expertStatisticsOverallAverageTimeGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **expertStatisticsStudentsCourseCourseIdGet**
> string expertStatisticsStudentsCourseCourseIdGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let courseId: string; // (default to undefined)

const { status, data } = await apiInstance.expertStatisticsStudentsCourseCourseIdGet(
    courseId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **courseId** | [**string**] |  | defaults to undefined|


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **expertStatisticsStudentsOverallGet**
> string expertStatisticsStudentsOverallGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.expertStatisticsStudentsOverallGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **expertStudentsCountGet**
> string expertStudentsCountGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let createdFrom: string; // (optional) (default to undefined)
let createdTo: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.expertStudentsCountGet(
    createdFrom,
    createdTo
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createdFrom** | [**string**] |  | (optional) defaults to undefined|
| **createdTo** | [**string**] |  | (optional) defaults to undefined|


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **expertStudentsCourseCourseIdGet**
> Array<User> expertStudentsCourseCourseIdGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let courseId: string; // (default to undefined)

const { status, data } = await apiInstance.expertStudentsCourseCourseIdGet(
    courseId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **courseId** | [**string**] |  | defaults to undefined|


### Return type

**Array<User>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **expertStudentsGet**
> Array<User> expertStudentsGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let page: number; // (optional) (default to undefined)
let size: number; // (optional) (default to undefined)
let sortBy: string; // (optional) (default to undefined)
let sortOrder: string; // (optional) (default to undefined)
let createdFrom: string; // (optional) (default to undefined)
let createdTo: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.expertStudentsGet(
    page,
    size,
    sortBy,
    sortOrder,
    createdFrom,
    createdTo
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **size** | [**number**] |  | (optional) defaults to undefined|
| **sortBy** | [**string**] |  | (optional) defaults to undefined|
| **sortOrder** | [**string**] |  | (optional) defaults to undefined|
| **createdFrom** | [**string**] |  | (optional) defaults to undefined|
| **createdTo** | [**string**] |  | (optional) defaults to undefined|


### Return type

**Array<User>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **expertStudentsWithProfilesGet**
> Array<object> expertStudentsWithProfilesGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let page: number; // (optional) (default to undefined)
let size: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.expertStudentsWithProfilesGet(
    page,
    size
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **size** | [**number**] |  | (optional) defaults to undefined|


### Return type

**Array<object>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **profilesMediaMediaIdGet**
> object profilesMediaMediaIdGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let mediaId: string; // (default to undefined)

const { status, data } = await apiInstance.profilesMediaMediaIdGet(
    mediaId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **mediaId** | [**string**] |  | defaults to undefined|


### Return type

**object**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*, application/*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK &lt;br&gt; A file response |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **profilesMediaPost**
> MediaFileMeta profilesMediaPost()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.profilesMediaPost();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**MediaFileMeta**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **profilesStaffGet**
> StaffProfileResponse profilesStaffGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.profilesStaffGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**StaffProfileResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **profilesStaffIdGet**
> StaffProfileResponse profilesStaffIdGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.profilesStaffIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**StaffProfileResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **profilesStaffIdPut**
> StaffProfileResponse profilesStaffIdPut(updateStaffProfileRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    UpdateStaffProfileRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let id: string; // (default to undefined)
let updateStaffProfileRequest: UpdateStaffProfileRequest; //

const { status, data } = await apiInstance.profilesStaffIdPut(
    id,
    updateStaffProfileRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateStaffProfileRequest** | **UpdateStaffProfileRequest**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**StaffProfileResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **profilesStaffPost**
> StaffProfileResponse profilesStaffPost(createStaffProfileRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    CreateStaffProfileRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let createStaffProfileRequest: CreateStaffProfileRequest; //

const { status, data } = await apiInstance.profilesStaffPost(
    createStaffProfileRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createStaffProfileRequest** | **CreateStaffProfileRequest**|  | |


### Return type

**StaffProfileResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **profilesStaffPut**
> StaffProfileResponse profilesStaffPut(updateStaffProfileRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    UpdateStaffProfileRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let updateStaffProfileRequest: UpdateStaffProfileRequest; //

const { status, data } = await apiInstance.profilesStaffPut(
    updateStaffProfileRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateStaffProfileRequest** | **UpdateStaffProfileRequest**|  | |


### Return type

**StaffProfileResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **profilesUserGet**
> UserProfileResponse profilesUserGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.profilesUserGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**UserProfileResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **profilesUserIdGet**
> UserProfileResponse profilesUserIdGet()



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.profilesUserIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**UserProfileResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **profilesUserIdPut**
> UserProfileResponse profilesUserIdPut(updateUserProfileRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    UpdateUserProfileRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let id: string; // (default to undefined)
let updateUserProfileRequest: UpdateUserProfileRequest; //

const { status, data } = await apiInstance.profilesUserIdPut(
    id,
    updateUserProfileRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateUserProfileRequest** | **UpdateUserProfileRequest**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**UserProfileResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **profilesUserPost**
> UserProfileResponse profilesUserPost(createUserProfileRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    CreateUserProfileRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let createUserProfileRequest: CreateUserProfileRequest; //

const { status, data } = await apiInstance.profilesUserPost(
    createUserProfileRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createUserProfileRequest** | **CreateUserProfileRequest**|  | |


### Return type

**UserProfileResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **profilesUserPut**
> UserProfileResponse profilesUserPut(updateUserProfileRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    UpdateUserProfileRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let updateUserProfileRequest: UpdateUserProfileRequest; //

const { status, data } = await apiInstance.profilesUserPut(
    updateUserProfileRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateUserProfileRequest** | **UpdateUserProfileRequest**|  | |


### Return type

**UserProfileResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **profilesUserUserLanguageSkillsPost**
> string profilesUserUserLanguageSkillsPost(userLanguageSkillRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    UserLanguageSkillRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let userLanguageSkillRequest: UserLanguageSkillRequest; //

const { status, data } = await apiInstance.profilesUserUserLanguageSkillsPost(
    userLanguageSkillRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userLanguageSkillRequest** | **UserLanguageSkillRequest**|  | |


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **studentBadgesGet**
> Array<Badge> studentBadgesGet()

Обновить query задачи (PATCH) <br> Получить бейджи пользователя

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.studentBadgesGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<Badge>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **studentBadgesPost**
> boolean studentBadgesPost(body)



### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let body: string; //

const { status, data } = await apiInstance.studentBadgesPost(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **string**|  | |


### Return type

**boolean**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **studentCoursesCourseIdEnrollDelete**
> boolean studentCoursesCourseIdEnrollDelete()

Отписаться от курса

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let courseId: string; // (default to undefined)

const { status, data } = await apiInstance.studentCoursesCourseIdEnrollDelete(
    courseId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **courseId** | [**string**] |  | defaults to undefined|


### Return type

**boolean**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **studentCoursesCourseIdEnrollPost**
> boolean studentCoursesCourseIdEnrollPost()

Записаться на курс

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let courseId: string; // (default to undefined)

const { status, data } = await apiInstance.studentCoursesCourseIdEnrollPost(
    courseId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **courseId** | [**string**] |  | defaults to undefined|


### Return type

**boolean**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **studentCoursesCourseIdProgressGet**
> CourseProgressItem studentCoursesCourseIdProgressGet()

Получить прогресс курса

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let courseId: string; // (default to undefined)

const { status, data } = await apiInstance.studentCoursesCourseIdProgressGet(
    courseId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **courseId** | [**string**] |  | defaults to undefined|


### Return type

**CourseProgressItem**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **studentCoursesCourseIdSectionsGet**
> Array<Section> studentCoursesCourseIdSectionsGet()

Получить секции курса

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let courseId: string; // (default to undefined)

const { status, data } = await apiInstance.studentCoursesCourseIdSectionsGet(
    courseId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **courseId** | [**string**] |  | defaults to undefined|


### Return type

**Array<Section>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **studentCoursesCourseIdThemesGet**
> Array<Theme> studentCoursesCourseIdThemesGet()

Получить темы курса

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let courseId: string; // (default to undefined)

const { status, data } = await apiInstance.studentCoursesCourseIdThemesGet(
    courseId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **courseId** | [**string**] |  | defaults to undefined|


### Return type

**Array<Theme>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **studentCoursesGet**
> Array<Course> studentCoursesGet()

Получить курсы с языком, совпадающим с системным языком пользователя

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.studentCoursesGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<Course>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **studentEnrollmentsGet**
> Array<UserCourseEnrollmentItem> studentEnrollmentsGet()

Получить все курсы пользователя

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.studentEnrollmentsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<UserCourseEnrollmentItem>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **studentMediaGet**
> Array<MediaFile> studentMediaGet()

Получить медиафайлы

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.studentMediaGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<MediaFile>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **studentMediaMediaIdGet**
> MediaFile studentMediaMediaIdGet()

Получить медиафайл по id

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let mediaId: string; // (default to undefined)

const { status, data } = await apiInstance.studentMediaMediaIdGet(
    mediaId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **mediaId** | [**string**] |  | defaults to undefined|


### Return type

**MediaFile**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **studentSectionsSectionIdProgressGet**
> SectionProgressItem studentSectionsSectionIdProgressGet()

Получить прогресс секции

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let sectionId: string; // (default to undefined)

const { status, data } = await apiInstance.studentSectionsSectionIdProgressGet(
    sectionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sectionId** | [**string**] |  | defaults to undefined|


### Return type

**SectionProgressItem**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **studentTaskQueueGet**
> Array<UserTaskQueueItem> studentTaskQueueGet()

Получить очередь задач пользователя

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.studentTaskQueueGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<UserTaskQueueItem>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **studentTaskQueueNextGet**
> UserTaskQueueItem studentTaskQueueNextGet()

Получить следующую задачу в очереди

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.studentTaskQueueNextGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**UserTaskQueueItem**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **studentTaskQueuePost**
> UserTaskQueueItem studentTaskQueuePost(createTaskQueueRequest)



### Example

```typescript
import {
    DefaultApi,
    Configuration,
    CreateTaskQueueRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let createTaskQueueRequest: CreateTaskQueueRequest; //

const { status, data } = await apiInstance.studentTaskQueuePost(
    createTaskQueueRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createTaskQueueRequest** | **CreateTaskQueueRequest**|  | |


### Return type

**UserTaskQueueItem**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **studentTaskQueueQueueIdDelete**
> boolean studentTaskQueueQueueIdDelete()

Удалить задачу из очереди

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let queueId: string; // (default to undefined)

const { status, data } = await apiInstance.studentTaskQueueQueueIdDelete(
    queueId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **queueId** | [**string**] |  | defaults to undefined|


### Return type

**boolean**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **studentTaskQueueQueueIdPositionPatch**
> boolean studentTaskQueueQueueIdPositionPatch(body)

Обновить позицию задачи в очереди

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let queueId: string; // (default to undefined)
let body: string; //

const { status, data } = await apiInstance.studentTaskQueueQueueIdPositionPatch(
    queueId,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **string**|  | |
| **queueId** | [**string**] |  | defaults to undefined|


### Return type

**boolean**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **studentTasksTaskIdAnswerGet**
> TaskAnswerItem studentTasksTaskIdAnswerGet()

Получить ответ задачи

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let taskId: string; // (default to undefined)

const { status, data } = await apiInstance.studentTasksTaskIdAnswerGet(
    taskId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **taskId** | [**string**] |  | defaults to undefined|


### Return type

**TaskAnswerItem**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **studentTasksTaskIdCompletePost**
> UserTaskProgressItem studentTasksTaskIdCompletePost(body)

Отметить задачу как выполненную

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let taskId: string; // (default to undefined)
let body: string; //

const { status, data } = await apiInstance.studentTasksTaskIdCompletePost(
    taskId,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **string**|  | |
| **taskId** | [**string**] |  | defaults to undefined|


### Return type

**UserTaskProgressItem**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **studentTasksTaskIdContentGet**
> Array<TaskContentItem> studentTasksTaskIdContentGet()

Получить весь контент задачи

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let taskId: string; // (default to undefined)

const { status, data } = await apiInstance.studentTasksTaskIdContentGet(
    taskId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **taskId** | [**string**] |  | defaults to undefined|


### Return type

**Array<TaskContentItem>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **studentTasksTaskIdProgressGet**
> UserTaskProgressItem studentTasksTaskIdProgressGet()

Получить прогресс задачи

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let taskId: string; // (default to undefined)

const { status, data } = await apiInstance.studentTasksTaskIdProgressGet(
    taskId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **taskId** | [**string**] |  | defaults to undefined|


### Return type

**UserTaskProgressItem**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **studentTasksTaskIdProgressPatch**
> UserTaskProgressItem studentTasksTaskIdProgressPatch(updateTaskProgressRequest)

Обновить прогресс задачи

### Example

```typescript
import {
    DefaultApi,
    Configuration,
    UpdateTaskProgressRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let taskId: string; // (default to undefined)
let updateTaskProgressRequest: UpdateTaskProgressRequest; //

const { status, data } = await apiInstance.studentTasksTaskIdProgressPatch(
    taskId,
    updateTaskProgressRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateTaskProgressRequest** | **UpdateTaskProgressRequest**|  | |
| **taskId** | [**string**] |  | defaults to undefined|


### Return type

**UserTaskProgressItem**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **studentTasksTaskIdProgressPost**
> UserTaskProgressItem studentTasksTaskIdProgressPost()

Создать прогресс задачи

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let taskId: string; // (default to undefined)

const { status, data } = await apiInstance.studentTasksTaskIdProgressPost(
    taskId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **taskId** | [**string**] |  | defaults to undefined|


### Return type

**UserTaskProgressItem**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **studentTasksTaskIdQueryGet**
> TaskWithDetails studentTasksTaskIdQueryGet()

Получить query задачи

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let taskId: string; // (default to undefined)

const { status, data } = await apiInstance.studentTasksTaskIdQueryGet(
    taskId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **taskId** | [**string**] |  | defaults to undefined|


### Return type

**TaskWithDetails**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **studentTasksTaskIdReportPost**
> Report studentTasksTaskIdReportPost(body)

Создать отчёт на задачу

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let taskId: string; // (default to undefined)
let body: string; //

const { status, data } = await apiInstance.studentTasksTaskIdReportPost(
    taskId,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **string**|  | |
| **taskId** | [**string**] |  | defaults to undefined|


### Return type

**Report**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **studentTasksTaskIdVariantsGet**
> Array<TaskAnswerOptionItem> studentTasksTaskIdVariantsGet()

Получить варианты задачи

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let taskId: string; // (default to undefined)

const { status, data } = await apiInstance.studentTasksTaskIdVariantsGet(
    taskId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **taskId** | [**string**] |  | defaults to undefined|


### Return type

**Array<TaskAnswerOptionItem>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **studentThemesThemeIdTasksGet**
> Array<TaskWithDetails> studentThemesThemeIdTasksGet()

Получить задачи темы

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let themeId: string; // (default to undefined)

const { status, data } = await apiInstance.studentThemesThemeIdTasksGet(
    themeId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **themeId** | [**string**] |  | defaults to undefined|


### Return type

**Array<TaskWithDetails>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

