# BellSant QA Engineer Coding Challenge

## Steps of process

Firstly, I want to thank you for considering me for this challenge. Following that, I began the project with exploratory testing, using a white-box approach to define testing strategies and approaches.

Initially, I used the app.apk and the machineData.json to understand the expected results. To improve data visibility, I organized it into a table as shown above:

### Welding Robot

| Parameter           | Normal Range | Abnormal Range | Optimal Range |
|---------------------|--------------|----------------|---------------|
| Error Rate          | 0.1 - 1.0    | 1.1 - 2.0      | 0.0 - 0.1     |
| Vibration Level     | 1.0 - 5.0    | 5.1 - 10.0     | 0.0 - 1.0     |
| Electrode Wear      | 0.1 - 1.0    | 1.1 - 2.0      | 0.0 - 0.1     |
| Shielding Pressure  | 10.0 - 15.0  | 15.1 - 20.0    | 5.0 - 10.0    |
| Wire Feed Rate      | 5.0 - 10.0   | 10.1 - 15.0    | 0.0 - 5.0     |
| Arc Stability       | 90.0 - 95.0  | 95.1 - 100.0   | 85.0 - 90.0   |
| Seam Width          | 1.0 - 2.0    | 2.1 - 3.0      | 0.5 - 1.0     |
| Cooling Efficiency  | 80.0 - 90.0  | 90.1 - 100.0   | 70.0 - 80.0   |

### Painting Station

| Parameter        | Normal Range | Abnormal Range | Optimal Range |
|------------------|--------------|----------------|---------------|
| Flow Rate        | 20.0 - 30.0  | 30.1 - 40.0    | 10.0 - 20.0   |
| Pressure         | 50.0 - 60.0  | 60.1 - 70.0    | 40.0 - 50.0   |
| Color Consistency| 90.0 - 95.0  | 95.1 - 100.0   | 85.0 - 90.0   |
| Nozzle Condition | 0 - 1        | 2 - 3          | 0 - 0         |

### Assembly Line

| Parameter         | Normal Range | Abnormal Range | Optimal Range |
|-------------------|--------------|----------------|---------------|
| Alignment Accuracy| 0.1 - 1.0    | 1.1 - 2.0      | 0.0 - 0.1     |
| Speed             | 5.0 - 10.0   | 10.1 - 15.0    | 0.0 - 5.0     |
| Fitting Tolerance | 0.01 - 0.05  | 0.06 - 0.1     | 0.0 - 0.01    |
| Belt Speed        | 1.0 - 2.0    | 2.1 - 3.0      | 0.5 - 1.0     |

### Quality Control Station

| Parameter         | Normal Range | Abnormal Range | Optimal Range |
|-------------------|--------------|----------------|---------------|
| Camera Calibration| 0 - 1        | 2 - 3          | 0 - 0         |
| Light Intensity   | 90.0 - 95.0  | 95.1 - 100.0   | 85.0 - 90.0   |
| Software Version  | v1.0 - v2.0  | v2.1 - v3.0    | v1.0 - v2.0   |
| Criteria Settings | 0 - 1        | 2 - 3          | 0 - 0         |


With the data gathered and exploratory testing completed, I began designing the backend testing using BDD.

## Test cases of backend

### Unit Test

|calculation.ts
|------------------------------------------------------------------|
|Input minimum Value                                               |
|------------------------------------------------------------------|
|Given the linear scale calculator is initialized                  |
|When I input the minimum possible value                           |
|Then I expect the result to be 0                                  |
|------------------------------------------------------------------|
|Input Clamp Value                                                 |
|------------------------------------------------------------------|
|Given the linear scale calculator is initialized                  |
|When I input the maximum allowed value                            |
|Then I expect the result to be 10                                 |
|------------------------------------------------------------------|
|Input clamped to the nearest range limit                          |
|------------------------------------------------------------------|
|Given the linear scale calculator is initialized                  |
|When I input a value that is outside of the defined range         |
|Then I expect the result to be clamped to the nearest range limit |
|------------------------------------------------------------------|
|Calculate unknown machine type                                    |
|------------------------------------------------------------------|
|Given an unknown machine type is provided                         |
|When I attempt to calculate part health                           |
|Then I expect the result to be 0                                  |
|------------------------------------------------------------------|
|Calculate unknown part type                                       |
|------------------------------------------------------------------|
|Given an unknown part type is provided                            |
|When I attempt to calculate part health                           |
|Then I expect the result to be -1                                 |
|------------------------------------------------------------------|
|Calculate health range                                            |
|------------------------------------------------------------------|
|Given valid machine and part information                          |
|When the part value is within range                               |
|Then the health score should be calculated accordingly            |
|And the calculated health level should be returned                |
|------------------------------------------------------------------|
|Calculate the overall machine health                              |
|------------------------------------------------------------------|
|Given a machine with multiple parts                               |
|When I calculate the overall machine health                       |
|Then the average health score should be computed                  |
|And all known parts should contribute to the final score          |
|------------------------------------------------------------------|

|machineHealth.ts                                                  |
|------------------------------------------------------------------|
|Unknow machine type                                               |
|------------------------------------------------------------------|
|Given an unknow machine type provide                              |
|When requested                                                    |
|then is expected return a error message                           |
|------------------------------------------------------------------|
|Calculating scores for each machine                               |
|------------------------------------------------------------------|
|Given valid machine data for multiple machines                    |
|When the health score calculation for each machine is requested   |
|Then individual health scores for each machine are expected       |
|And the scores should accurately reflect the health based on the input data
|------------------------------------------------------------------|
|Calculating health within the range                               |
|------------------------------------------------------------------|
|Given a machine with parts in various health ranges               |
|When the health score calculation for parts is requested          |
|Then the scores should be calculated proportionally within their respective ranges
|And the final health score should reflect the normal, abnormal, and optimal ranges
|------------------------------------------------------------------|
|Calculating Average Health Score for Multiple Parts               |
|------------------------------------------------------------------|
|Given a machine with multiple parts in various health states      |
|When the overall health score calculation is requested            |
|Then the average score across all parts should be calculated      |
|And parts with unknown types should not affect the average score  |
|------------------------------------------------------------------|

### Integration Testing

|------------------------------------------------------------------|
|Calculating normal health                                         |
|------------------------------------------------------------------|
|Given a normal heath machine                                      |
|When I input the number with normal health                        |
|Then I expect the result to be 50                                 |
|------------------------------------------------------------------|
|Calculating abnormal health                                       |
|------------------------------------------------------------------|
|Given an abnormal value for heath machine                         |
|When I input the number with abnormal health                      |
|Then I expect the result to be 0                                  |
|------------------------------------------------------------------|
|Calculating optimal health                                        |
|------------------------------------------------------------------|
|Given an optimal value for heath machine                          |
|When I input the number with abnormal health                      |
|Then I expect the result to be 0                                  |
|------------------------------------------------------------------|
|Calculating unknow machine health                                 |
|------------------------------------------------------------------|
|Given an unknow machine                                           |
|When I input any number                                           |
|Then I expect error message                                       |
|------------------------------------------------------------------|

### API Testing

|------------------------------------------------------------------|
|Calculating machine health for a single machine                   |
|------------------------------------------------------------------|
|Given machine health requested                                    |
|When the inputs is correctly                                      |
|Than results expected is health machine                           |
|And Status 200                                                    |
|------------------------------------------------------------------|
|Calculating an unknow machine health                              |
|------------------------------------------------------------------|
|Given machine health requested                                    |
|When the inputs is unknow                                         |
|Than results expected is an error message                         |
|And status 400                                                    |
|------------------------------------------------------------------|