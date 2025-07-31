# AdminApi

All URIs are relative to *http://localhost:8080*

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

# **adminStatisticsCourseCourseIdGet**
> string adminStatisticsCourseCourseIdGet()



### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

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
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

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
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

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
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

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
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

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
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

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
    AdminApi,
    Configuration,
    StaffRegisterRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

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
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

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
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

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
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

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
    AdminApi,
    Configuration,
    CreateStaffProfileRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

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
    AdminApi,
    Configuration,
    UpdateStaffProfileRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

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
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

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
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

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
    AdminApi,
    Configuration,
    CreateUserProfileRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

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
    AdminApi,
    Configuration,
    UpdateUserProfileRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

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
    AdminApi,
    Configuration,
    UpdateUserRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

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
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

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

