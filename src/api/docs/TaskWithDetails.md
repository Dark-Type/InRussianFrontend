# TaskWithDetails


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [default to undefined]
**themeId** | **string** |  | [default to undefined]
**name** | **string** |  | [default to undefined]
**taskType** | **string** |  | [default to undefined]
**question** | **string** |  | [default to undefined]
**instructions** | **string** |  | [optional] [default to undefined]
**isTraining** | **boolean** |  | [default to undefined]
**orderNum** | **number** |  | [default to undefined]
**createdAt** | **string** |  | [default to undefined]
**content** | [**Array&lt;TaskContentItem&gt;**](TaskContentItem.md) |  | [default to undefined]
**answer** | [**TaskAnswerItem**](TaskAnswerItem.md) |  | [optional] [default to undefined]
**answerOptions** | [**Array&lt;TaskAnswerOptionItem&gt;**](TaskAnswerOptionItem.md) |  | [default to undefined]

## Example

```typescript
import { TaskWithDetails } from './api';

const instance: TaskWithDetails = {
    id,
    themeId,
    name,
    taskType,
    question,
    instructions,
    isTraining,
    orderNum,
    createdAt,
    content,
    answer,
    answerOptions,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
