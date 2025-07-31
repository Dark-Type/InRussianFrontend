# UserTaskProgressItem


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**userId** | **string** |  | [default to undefined]
**taskId** | **string** |  | [default to undefined]
**status** | **string** |  | [default to undefined]
**attemptCount** | **number** |  | [default to undefined]
**isCorrect** | **boolean** |  | [optional] [default to undefined]
**lastAttemptAt** | **string** |  | [optional] [default to undefined]
**completedAt** | **string** |  | [optional] [default to undefined]
**shouldRetryAfterTasks** | **number** |  | [optional] [default to undefined]

## Example

```typescript
import { UserTaskProgressItem } from './api';

const instance: UserTaskProgressItem = {
    userId,
    taskId,
    status,
    attemptCount,
    isCorrect,
    lastAttemptAt,
    completedAt,
    shouldRetryAfterTasks,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
