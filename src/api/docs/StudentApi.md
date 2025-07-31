# StudentApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**studentBadgesGet**](#studentbadgesget) | **GET** /student/badges | |
|[**studentBadgesPost**](#studentbadgespost) | **POST** /student/badges | |
|[**studentCoursesCourseIdEnrollDelete**](#studentcoursescourseidenrolldelete) | **DELETE** /student/courses/{courseId}/enroll | |
|[**studentCoursesCourseIdEnrollPost**](#studentcoursescourseidenrollpost) | **POST** /student/courses/{courseId}/enroll | |
|[**studentCoursesCourseIdProgressGet**](#studentcoursescourseidprogressget) | **GET** /student/courses/{courseId}/progress | |
|[**studentCoursesCourseIdSectionsGet**](#studentcoursescourseidsectionsget) | **GET** /student/courses/{courseId}/sections | |
|[**studentCoursesCourseIdThemesGet**](#studentcoursescourseidthemesget) | **GET** /student/courses/{courseId}/themes | |
|[**studentCoursesGet**](#studentcoursesget) | **GET** /student/courses | |
|[**studentEnrollmentsGet**](#studentenrollmentsget) | **GET** /student/enrollments | |
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

# **studentBadgesGet**
> Array<Badge> studentBadgesGet()

Обновить query задачи (PATCH) <br> Получить бейджи пользователя

### Example

```typescript
import {
    StudentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StudentApi(configuration);

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
    StudentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StudentApi(configuration);

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
    StudentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StudentApi(configuration);

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
    StudentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StudentApi(configuration);

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
    StudentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StudentApi(configuration);

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



### Example

```typescript
import {
    StudentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StudentApi(configuration);

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
    StudentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StudentApi(configuration);

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
    StudentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StudentApi(configuration);

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
    StudentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StudentApi(configuration);

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

# **studentSectionsSectionIdProgressGet**
> SectionProgressItem studentSectionsSectionIdProgressGet()

Получить прогресс секции

### Example

```typescript
import {
    StudentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StudentApi(configuration);

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
    StudentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StudentApi(configuration);

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
    StudentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StudentApi(configuration);

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
    StudentApi,
    Configuration,
    CreateTaskQueueRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new StudentApi(configuration);

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
    StudentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StudentApi(configuration);

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
    StudentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StudentApi(configuration);

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
    StudentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StudentApi(configuration);

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
    StudentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StudentApi(configuration);

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
    StudentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StudentApi(configuration);

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
    StudentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StudentApi(configuration);

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
    StudentApi,
    Configuration,
    UpdateTaskProgressRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new StudentApi(configuration);

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
    StudentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StudentApi(configuration);

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
    StudentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StudentApi(configuration);

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



### Example

```typescript
import {
    StudentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StudentApi(configuration);

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
    StudentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StudentApi(configuration);

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
    StudentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StudentApi(configuration);

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

