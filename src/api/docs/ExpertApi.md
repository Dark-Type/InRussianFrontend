# ExpertApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**expertStatisticsCourseCourseIdAverageProgressGet**](#expertstatisticscoursecourseidaverageprogressget) | **GET** /expert/statistics/course/{courseId}/average-progress | |
|[**expertStatisticsCourseCourseIdAverageTimeGet**](#expertstatisticscoursecourseidaveragetimeget) | **GET** /expert/statistics/course/{courseId}/average-time | |
|[**expertStatisticsCourseCourseIdStudentsCountGet**](#expertstatisticscoursecourseidstudentscountget) | **GET** /expert/statistics/course/{courseId}/students-count | |
|[**expertStatisticsOverallAverageProgressGet**](#expertstatisticsoverallaverageprogressget) | **GET** /expert/statistics/overall-average-progress | |
|[**expertStatisticsOverallAverageTimeGet**](#expertstatisticsoverallaveragetimeget) | **GET** /expert/statistics/overall-average-time | |
|[**expertStatisticsStudentsOverallGet**](#expertstatisticsstudentsoverallget) | **GET** /expert/statistics/students/overall | |
|[**expertStudentsCountGet**](#expertstudentscountget) | **GET** /expert/students/count | |
|[**expertStudentsGet**](#expertstudentsget) | **GET** /expert/students | |

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

# **expertStatisticsCourseCourseIdStudentsCountGet**
> string expertStatisticsCourseCourseIdStudentsCountGet()



### Example

```typescript
import {
    ExpertApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ExpertApi(configuration);

let courseId: string; // (default to undefined)

const { status, data } = await apiInstance.expertStatisticsCourseCourseIdStudentsCountGet(
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

