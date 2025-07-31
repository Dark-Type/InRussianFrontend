# ContentApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**contentCoursesCourseIdDelete**](#contentcoursescourseiddelete) | **DELETE** /content/courses/{courseId} | |
|[**contentCoursesCourseIdGet**](#contentcoursescourseidget) | **GET** /content/courses/{courseId} | |
|[**contentCoursesCourseIdPut**](#contentcoursescourseidput) | **PUT** /content/courses/{courseId} | |
|[**contentCoursesGet**](#contentcoursesget) | **GET** /content/courses | |
|[**contentCoursesPost**](#contentcoursespost) | **POST** /content/courses | |
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

# **contentCoursesCourseIdDelete**
> string contentCoursesCourseIdDelete()



### Example

```typescript
import {
    ContentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration,
    UpdateCourseRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration,
    CreateCourseRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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

# **contentReportsGet**
> Array<Report> contentReportsGet()



### Example

```typescript
import {
    ContentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration,
    CreateReportRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration,
    CreateSectionRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration,
    UpdateSectionRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration,
    CreateTaskRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration,
    CreateTaskAnswerRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration,
    UpdateTaskAnswerRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration,
    UpdateTaskContentRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration,
    CreateTaskContentRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration,
    UpdateTaskAnswerOptionRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration,
    CreateTaskAnswerOptionRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration,
    UpdateTaskRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration,
    CreateThemeRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration,
    UpdateThemeRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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
    ContentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

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

