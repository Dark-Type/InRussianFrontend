# ExpertApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
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

# **expertContentCoursesCourseIdGet**
> Course expertContentCoursesCourseIdGet()



### Example

```typescript
import {
    ExpertApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ExpertApi(configuration);

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
    ExpertApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ExpertApi(configuration);

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
    ExpertApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ExpertApi(configuration);

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
    ExpertApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ExpertApi(configuration);

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
    ExpertApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ExpertApi(configuration);

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
    ExpertApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ExpertApi(configuration);

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
    ExpertApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ExpertApi(configuration);

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
    ExpertApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ExpertApi(configuration);

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
    ExpertApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ExpertApi(configuration);

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
    ExpertApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ExpertApi(configuration);

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
    ExpertApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ExpertApi(configuration);

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
    ExpertApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ExpertApi(configuration);

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
    ExpertApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ExpertApi(configuration);

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
    ExpertApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ExpertApi(configuration);

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

