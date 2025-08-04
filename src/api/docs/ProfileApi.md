# ProfileApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**profilesAvatarUserIdGet**](#profilesavataruseridget) | **GET** /profiles/avatar/{userId} | |
|[**profilesStaffGet**](#profilesstaffget) | **GET** /profiles/staff | |
|[**profilesStaffIdGet**](#profilesstaffidget) | **GET** /profiles/staff/{id} | |
|[**profilesStaffIdPut**](#profilesstaffidput) | **PUT** /profiles/staff/{id} | |
|[**profilesStaffPost**](#profilesstaffpost) | **POST** /profiles/staff | |
|[**profilesStaffPut**](#profilesstaffput) | **PUT** /profiles/staff | |
|[**profilesUserBasePut**](#profilesuserbaseput) | **PUT** /profiles/user/base | |
|[**profilesUserGet**](#profilesuserget) | **GET** /profiles/user | |
|[**profilesUserIdGet**](#profilesuseridget) | **GET** /profiles/user/{id} | |
|[**profilesUserIdPut**](#profilesuseridput) | **PUT** /profiles/user/{id} | |
|[**profilesUserLanguageSkillsGet**](#profilesuserlanguageskillsget) | **GET** /profiles/user/language-skills | |
|[**profilesUserLanguageSkillsPost**](#profilesuserlanguageskillspost) | **POST** /profiles/user/language-skills | |
|[**profilesUserLanguageSkillsSkillIdDelete**](#profilesuserlanguageskillsskilliddelete) | **DELETE** /profiles/user/language-skills/{skillId} | |
|[**profilesUserLanguageSkillsSkillIdPut**](#profilesuserlanguageskillsskillidput) | **PUT** /profiles/user/language-skills/{skillId} | |
|[**profilesUserPost**](#profilesuserpost) | **POST** /profiles/user | |
|[**profilesUserPut**](#profilesuserput) | **PUT** /profiles/user | |

# **profilesAvatarUserIdGet**
> string profilesAvatarUserIdGet()



### Example

```typescript
import {
    ProfileApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProfileApi(configuration);

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.profilesAvatarUserIdGet(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


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

# **profilesStaffGet**
> StaffProfileResponse profilesStaffGet()



### Example

```typescript
import {
    ProfileApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProfileApi(configuration);

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
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **profilesStaffIdGet**
> StaffProfileResponse profilesStaffIdGet()



### Example

```typescript
import {
    ProfileApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProfileApi(configuration);

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
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **profilesStaffIdPut**
> StaffProfileResponse profilesStaffIdPut(updateStaffProfileRequest)



### Example

```typescript
import {
    ProfileApi,
    Configuration,
    UpdateStaffProfileRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProfileApi(configuration);

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
    ProfileApi,
    Configuration,
    CreateStaffProfileRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProfileApi(configuration);

let createStaffProfileRequest: CreateStaffProfileRequest; //
let targetUserId: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.profilesStaffPost(
    createStaffProfileRequest,
    targetUserId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createStaffProfileRequest** | **CreateStaffProfileRequest**|  | |
| **targetUserId** | [**string**] |  | (optional) defaults to undefined|


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
|**403** | Forbidden |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **profilesStaffPut**
> StaffProfileResponse profilesStaffPut(updateStaffProfileRequest)



### Example

```typescript
import {
    ProfileApi,
    Configuration,
    UpdateStaffProfileRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProfileApi(configuration);

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
|**403** | Forbidden |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **profilesUserBasePut**
> string profilesUserBasePut(updateUserRequest)



### Example

```typescript
import {
    ProfileApi,
    Configuration,
    UpdateUserRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProfileApi(configuration);

let updateUserRequest: UpdateUserRequest; //
let targetUserId: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.profilesUserBasePut(
    updateUserRequest,
    targetUserId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateUserRequest** | **UpdateUserRequest**|  | |
| **targetUserId** | [**string**] |  | (optional) defaults to undefined|


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
|**403** | Forbidden |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **profilesUserGet**
> UserProfileResponse profilesUserGet()



### Example

```typescript
import {
    ProfileApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProfileApi(configuration);

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
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **profilesUserIdGet**
> UserProfileResponse profilesUserIdGet()



### Example

```typescript
import {
    ProfileApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProfileApi(configuration);

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
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **profilesUserIdPut**
> UserProfileResponse profilesUserIdPut(updateUserProfileRequest)



### Example

```typescript
import {
    ProfileApi,
    Configuration,
    UpdateUserProfileRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProfileApi(configuration);

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

# **profilesUserLanguageSkillsGet**
> string profilesUserLanguageSkillsGet()



### Example

```typescript
import {
    ProfileApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProfileApi(configuration);

let targetUserId: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.profilesUserLanguageSkillsGet(
    targetUserId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **targetUserId** | [**string**] |  | (optional) defaults to undefined|


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
|**403** | Forbidden |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **profilesUserLanguageSkillsPost**
> string profilesUserLanguageSkillsPost(userLanguageSkillRequest)



### Example

```typescript
import {
    ProfileApi,
    Configuration,
    UserLanguageSkillRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProfileApi(configuration);

let userLanguageSkillRequest: UserLanguageSkillRequest; //
let targetUserId: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.profilesUserLanguageSkillsPost(
    userLanguageSkillRequest,
    targetUserId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userLanguageSkillRequest** | **UserLanguageSkillRequest**|  | |
| **targetUserId** | [**string**] |  | (optional) defaults to undefined|


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
|**403** | Forbidden |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **profilesUserLanguageSkillsSkillIdDelete**
> string profilesUserLanguageSkillsSkillIdDelete()



### Example

```typescript
import {
    ProfileApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProfileApi(configuration);

let skillId: string; // (default to undefined)
let targetUserId: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.profilesUserLanguageSkillsSkillIdDelete(
    skillId,
    targetUserId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **skillId** | [**string**] |  | defaults to undefined|
| **targetUserId** | [**string**] |  | (optional) defaults to undefined|


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
|**403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **profilesUserLanguageSkillsSkillIdPut**
> string profilesUserLanguageSkillsSkillIdPut(userLanguageSkillRequest)



### Example

```typescript
import {
    ProfileApi,
    Configuration,
    UserLanguageSkillRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProfileApi(configuration);

let skillId: string; // (default to undefined)
let userLanguageSkillRequest: UserLanguageSkillRequest; //
let targetUserId: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.profilesUserLanguageSkillsSkillIdPut(
    skillId,
    userLanguageSkillRequest,
    targetUserId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userLanguageSkillRequest** | **UserLanguageSkillRequest**|  | |
| **skillId** | [**string**] |  | defaults to undefined|
| **targetUserId** | [**string**] |  | (optional) defaults to undefined|


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
|**400** | Bad Request |  -  |
|**200** | OK |  -  |
|**403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **profilesUserPost**
> UserProfileResponse profilesUserPost(createUserProfileRequest)



### Example

```typescript
import {
    ProfileApi,
    Configuration,
    CreateUserProfileRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProfileApi(configuration);

let createUserProfileRequest: CreateUserProfileRequest; //
let targetUserId: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.profilesUserPost(
    createUserProfileRequest,
    targetUserId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createUserProfileRequest** | **CreateUserProfileRequest**|  | |
| **targetUserId** | [**string**] |  | (optional) defaults to undefined|


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
|**403** | Forbidden |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **profilesUserPut**
> UserProfileResponse profilesUserPut(updateUserProfileRequest)



### Example

```typescript
import {
    ProfileApi,
    Configuration,
    UpdateUserProfileRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProfileApi(configuration);

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
|**403** | Forbidden |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

