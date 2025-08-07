# ContentApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**contentCoursesCourseIdGet**](#contentcoursescourseidget) | **GET** /content/courses/{courseId} | |
|[**contentCoursesGet**](#contentcoursesget) | **GET** /content/courses | |
|[**contentReportsGet**](#contentreportsget) | **GET** /content/reports | |
|[**contentReportsPost**](#contentreportspost) | **POST** /content/reports | |
|[**contentReportsReportIdGet**](#contentreportsreportidget) | **GET** /content/reports/{reportId} | |
|[**contentSectionsByCourseCourseIdGet**](#contentsectionsbycoursecourseidget) | **GET** /content/sections/by-course/{courseId} | |
|[**contentSectionsSectionIdGet**](#contentsectionssectionidget) | **GET** /content/sections/{sectionId} | |
|[**contentStatsCourseCourseIdTasksCountGet**](#contentstatscoursecourseidtaskscountget) | **GET** /content/stats/course/{courseId}/tasks-count | |
|[**contentStatsGet**](#contentstatsget) | **GET** /content/stats | |
|[**contentStatsSectionSectionIdTasksCountGet**](#contentstatssectionsectionidtaskscountget) | **GET** /content/stats/section/{sectionId}/tasks-count | |
|[**contentStatsThemeThemeIdTasksCountGet**](#contentstatsthemethemeidtaskscountget) | **GET** /content/stats/theme/{themeId}/tasks-count | |
|[**contentTasksTaskIdAnswerGet**](#contenttaskstaskidanswerget) | **GET** /content/tasks/{taskId}/answer | |
|[**contentTasksTaskIdContentContentIdGet**](#contenttaskstaskidcontentcontentidget) | **GET** /content/tasks/{taskId}/content/{contentId} | |
|[**contentTasksTaskIdGet**](#contenttaskstaskidget) | **GET** /content/tasks/{taskId} | |
|[**contentTasksTaskIdOptionsOptionIdGet**](#contenttaskstaskidoptionsoptionidget) | **GET** /content/tasks/{taskId}/options/{optionId} | |
|[**contentThemesBySectionSectionIdGet**](#contentthemesbysectionsectionidget) | **GET** /content/themes/by-section/{sectionId} | |
|[**contentThemesThemeIdGet**](#contentthemesthemeidget) | **GET** /content/themes/{themeId} | |
|[**contentThemesThemeIdTasksGet**](#contentthemesthemeidtasksget) | **GET** /content/themes/{themeId}/tasks | |

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

